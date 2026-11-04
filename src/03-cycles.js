const STATE_KEYWORDS = {
  // "ready" covers the "Ready To Start" spelling as well as Home Connect's
  // OperationState.Ready. "inactive" has to be listed here rather than left
  // to "active" under running: that keyword cannot match inside a word, and
  // would mean the opposite of the state if it could.
  idle: ["idle", "off", "standby", "veille", "eteint", "arret", "inactif", "inactive", "ready"],
  // Before "running": ovens report "Preheating", and the "heating" keyword
  // below cannot match it anyway (no word boundary inside "preheating").
  preheating: ["preheat", "pre-heat", "pre_heat", "prechauff", "vorheiz", "precalent", "voorverwarm"],
  // A rice cooker sits in this state for hours after it has finished, and so
  // does an oven on its warming setting. MIoT reports it as status 4,
  // "Keep-warm", and it is neither running nor done.
  keep_warm: ["keep.?warm", "keepwarm", "warming", "maintien", "au chaud",
    "warmhalten", "mantener caliente", "mantenimento", "warmhouden"],
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on", "active", "marche", "actif",
    "cooking\\b(?!\\s*(?:complete|finished|done))", "cuisson\\b(?!\\s*termin)", "brewing", "baking",
    // Aborting is a cancelled cycle still draining, not an error and not
    // finished: the appliance is doing something until it stops.
    "abort"],
  paused: ["pause", "hold", "suspended"],
  done: ["end", "done", "finish", "complete", "termin"],
  delayed: ["delay", "differ", "scheduled", "programmed"],
  error: ["error", "fault", "alarm", "erreur"],
};

// States where the appliance is actually doing something: they drive the
// animations, the progress latch and the heat glow alike.
const ACTIVE_STATES = ["running", "preheating"];
function isActiveState(norm) {
  return ACTIVE_STATES.includes(norm);
}

// Where a state stands in a cycle, for timing the progress bar. A pause and a
// gap in the data (Home Assistant restarting, the integration reconnecting)
// belong to the cycle they interrupt. Anything else ends it.
function cycleRole(norm) {
  if (isActiveState(norm)) return "active";
  if (norm === "paused") return "paused";
  if (norm === "unknown") return "gap";
  return "out";
}

// How far back the card looks for the start of a cycle it opened in the
// middle of. The longest programs, eco dishwashers and washer-dryers, stay
// well under it.
const CYCLE_HISTORY_MS = 12 * 60 * 60 * 1000;

// Rebuilds the cycle in progress from the state history Home Assistant keeps,
// in its compressed format: { s: state, lu: last updated, lc: last changed },
// times in seconds. Walks back from the latest state to the first one of the
// streak the machine is still in, and adds up the pauses already over. A
// pause still going on is the current state, which the card times itself.
function cycleFromHistory(entries, normOf) {
  if (!Array.isArray(entries)) return null;
  const rows = entries
    .map((e) => ({ role: cycleRole(normOf(e && e.s)), t: 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu)) }))
    .filter((r) => Number.isFinite(r.t));
  const last = rows.length - 1;
  if (last < 0 || rows[last].role === "out") return null;
  let i = last;
  while (i > 0 && rows[i - 1].role !== "out") i--;
  // A gap cannot open a cycle: the machine was idle, then dropped out of
  // sight, and the cycle began when it came back running.
  while (i < last && rows[i].role === "gap") i++;
  let pausedMs = 0;
  for (let j = i; j < last; j++) {
    if (rows[j].role === "paused") pausedMs += rows[j + 1].t - rows[j].t;
  }
  return { start: rows[i].t, pausedMs };
}

// Home Assistant's own long press lasts half a second.
const HOLD_MS = 500;
// How long a control asking to be confirmed waits for the second tap.
const CONFIRM_MS = 3000;
// YAML reads a bare off as false (issue #28): the card takes it for the lock
// it was meant to be, never for the default.
function activationOf(v) {
  if (v === false) return "off";
  const s = String(v == null ? "" : v).trim().toLowerCase();
  return s === "hold" || s === "off" || s === "confirm" ? s : "tap";
}

// The last cycle is looked for further back than a cycle in progress: a
// washing machine may sit for days between two. A power meter reports every
// few seconds, so its history is kept to two days.
const LAST_CYCLE_STATE_MS = 7 * 24 * 60 * 60 * 1000;
const LAST_CYCLE_POWER_MS = 48 * 60 * 60 * 1000;
// A plug that draws for less than a minute has not run a cycle.
const LAST_CYCLE_MIN_MS = 60 * 1000;

// The cycles a state history went through, as { start, end }: from the first
// state inside a cycle to the one that took the machine out of it. A gap does
// not open one, and a cycle still under way at the end is left out.
function stateRuns(entries, normOf, windowStartMs) {
  if (!Array.isArray(entries)) return [];
  const runs = [];
  let cur = null;
  entries.forEach((e) => {
    const t = 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
    if (!Number.isFinite(t)) return;
    const role = cycleRole(normOf(e && e.s));
    if (role === "out") {
      if (cur && cur.active) runs.push({ start: cur.start, end: t });
      cur = null;
    } else if (!cur && role !== "gap") {
      // A cycle already going when the window opens has no known start:
      // Home Assistant dates that first state to the window itself.
      cur = { start: t, active: false, cut: t <= windowStartMs + 1000 };
    }
    if (cur && role === "active" && !cur.cut) cur.active = true;
  });
  return runs;
}

// The runs of a power meter, as { start, end }: above the threshold, with the
// dips shorter than gapMs counted as pauses of the same run. The last one has
// no end while the plug still draws, or while its dip is shorter than gapMs;
// in that second case closesAt says when the dip becomes the end.
function powerRuns(entries, threshold, gapMs, nowMs, windowStartMs) {
  if (!Array.isArray(entries)) return [];
  const runs = [];
  let cur = null;
  entries.forEach((e) => {
    const t = 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
    const w = parseFloat(e && e.s);
    if (!Number.isFinite(t) || !Number.isFinite(w)) return;
    if (w >= threshold) {
      if (cur && cur.end !== null && t - cur.end < gapMs) cur.end = null;
      else if (!cur || cur.end !== null) {
        cur = { start: t, end: null, cut: t <= windowStartMs + 1000 };
        runs.push(cur);
      }
    } else if (cur && cur.end === null) {
      cur.end = t;
    }
  });
  runs.forEach((r) => {
    if (r.end !== null && nowMs - r.end < gapMs) {
      r.closesAt = r.end + gapMs;
      r.end = null;
    }
  });
  return runs;
}

// The last cycle that ran to its end, long enough to be one.
function lastFinishedRun(runs) {
  for (let i = runs.length - 1; i >= 0; i--) {
    const r = runs[i];
    if (r.end !== null && !r.cut && r.end - r.start >= LAST_CYCLE_MIN_MS) return r;
  }
  return null;
}

// The runs of a state history, the one still under way included, its end
// then null: what an appliance did today, it is still doing.
function stateRunsOpen(entries, normOf, windowStartMs) {
  if (!Array.isArray(entries)) return [];
  const runs = [];
  let cur = null;
  entries.forEach((e) => {
    const t = 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
    if (!Number.isFinite(t)) return;
    const role = cycleRole(normOf(e && e.s));
    if (role === "out") {
      if (cur) cur.end = t;
      cur = null;
    } else if (!cur && role !== "gap") {
      cur = { start: t, end: null, cut: t <= windowStartMs + 1000 };
      runs.push(cur);
    }
  });
  return runs;
}

// How long the runs lasted since fromMs, and how many began after it.
function runsSince(runs, fromMs, nowMs) {
  let ms = 0;
  let starts = 0;
  runs.forEach((r) => {
    const end = r.end === null ? nowMs : r.end;
    const start = Math.max(r.start, fromMs);
    if (end > start) ms += end - start;
    if (!r.cut && r.start >= fromMs) starts += 1;
  });
  return { ms, starts };
}

function stripAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Matching requires a word boundary before the keyword (but not necessarily
// after), so "on" matches "On"/"Ongoing" but not the "on" inside "Done" or
// "Pending". And "wash"/"dry"/"spin" still match gerund forms like
// "Washing"/"Drying"/"Spinning".
const STATE_KEYWORD_PATTERNS = Object.fromEntries(
  Object.entries(STATE_KEYWORDS).map(([norm, keywords]) => [
    norm,
    keywords.map((kw) => new RegExp(`\\b${kw}`, "i")),
  ])
);

// A state_map names its target category by hand, so a typo lands a value no
// other part of the card knows: no colour, no label, no animation. Rejecting it
// here covers all three at once, rather than adding a fallback at every read.
const MAPPABLE_STATES = Object.keys(STATE_KEYWORDS).concat("unknown");

// The steps a washer, a dryer or a dishwasher names while it runs, which the
// state line shows in place of "Running".
const CYCLE_STEPS = ["prewash", "soaking", "weighing", "filling", "washing", "rinsing",
  "draining", "spinning", "drying", "cooling", "anti_crease", "steam"];

// A state_map may name a step as well as a category, for a machine whose state
// is the step: "Drying" is a machine that is running, and which step it is at
// is read from the same entry.
const PHASE_STATE_TARGETS = Object.fromEntries(CYCLE_STEPS.map((step) => [step, "running"]));

