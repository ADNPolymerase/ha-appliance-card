// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The hair_dryer drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing(deps) {
// A page still running the card of an earlier release: an arrow to reload.
if (!deps || deps.__v !== "5.8.0") return { draw: () => '<div class="machine" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.5">\u21bb</div>', css: "" };
let { ARC_BUTTONS, ARC_COLORS, BATTERY_LAYOUTS, CAMERA_LAYOUTS, CHARGER_MODES, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FT_FLAVORS, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, STAIR_MATERIALS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntTint, numberOrNull, t, thsColor, zoneColumns } = deps;
// A hair dryer seen from the side, nozzle to the right, or a ring dryer seen
// from the front. The air leaves the nozzle in a fan of lines, or the ring in
// widening circles: blue while cool, orange while hot, more of it on high.
// A hair straightener (#139): two arms on their hinge, a little open at the
// tip, the plates facing each other. Heating, the plates glow and the
// display blinks; hot, waves rise in turn from eight places along the
// plates, as many at once as the temperature says.
function straightenerSvg(c) {
  const k = `st${String(c.body || "d").replace(/[^a-z0-9]/gi, "")}`;
  // Without a temperature, on is all it says: warm plates, a little heat.
  const hot = c.mode === "heating" || c.mode === "ready" || c.mode === "on";
  const body = c.body || "#2b2f36", bodyHi = c.bodyHi || "#4a505b";
  const plate = `url(#${k}${c.mode === "ready" ? "stPlateHot" : c.mode === "heating" || c.mode === "on" ? "stPlateWarm" : "stPlate"})`;
  const temp = c.temp !== null && c.temp !== undefined ? `${Math.round(c.temp)}\u00b0` : "";
  return `<svg class="hd-svg" viewBox="0 0 96 108"><defs>
<linearGradient id="${k}stArm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bodyHi}"/><stop offset="1" stop-color="${body}"/></linearGradient>
<linearGradient id="${k}stPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9d2c4"/><stop offset="1" stop-color="#b8ae9c"/></linearGradient>
<linearGradient id="${k}stPlateWarm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb74d"/><stop offset="1" stop-color="#d9c7a8"/></linearGradient>
<linearGradient id="${k}stPlateHot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#ffb74d"/></linearGradient>
<filter id="${k}stGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter></defs>
<ellipse cx="50" cy="86" rx="40" ry="3" fill="#000" opacity=".14" filter="url(#${k}stGlow)"/>
<g transform="rotate(-24 50 54)">
${hot ? `<rect x="3" y="43" width="44" height="16" rx="5" fill="#ff7a1a" opacity="${c.mode === "ready" ? .5 : .3}" filter="url(#${k}stGlow)">${c.mode === "heating" ? `<animate attributeName="opacity" values=".15;.5;.15" dur="1.6s" repeatCount="indefinite"/>` : ""}</rect>` : ""}
<g transform="rotate(-3 86 49)"><path d="M8 50 H82 Q86 50 87 53.5 L87 54.5 Q86 58 82 58 H8 Q3 58 3 54 Q3 50 8 50 Z" fill="${body}"/>
<rect x="7" y="49.3" width="38" height="2.6" rx=".8" fill="${plate}"/><path d="M8 56.8 H80" stroke="#000" stroke-width=".6" opacity=".25"/></g>
<g transform="rotate(2.4 86 49)"><path d="M8 40 H82 Q86 40 87 43.5 L87 44.5 Q86 48 82 48 H8 Q3 48 3 44 Q3 40 8 40 Z" fill="url(#${k}stArm)"/>
<rect x="7" y="46.1" width="38" height="2.6" rx=".8" fill="${plate}"/>
<path d="M8 41.3 H80" stroke="#fff" stroke-width=".6" opacity=".22"/>
<rect x="47" y="41.8" width="13" height="4.4" rx="1" fill="#0d1014"/>
<text x="53.5" y="45.3" font-size="3.6" text-anchor="middle" fill="${hot ? "#ffb74d" : "#3a3f46"}" font-family="monospace" font-weight="700">${hot ? temp : ""}${c.mode === "heating" ? `<animate attributeName="opacity" values="1;.3;1" dur="1s" repeatCount="indefinite"/>` : ""}</text>
<circle cx="63.5" cy="44" r="1.1" fill="${c.mode === "ready" ? "#4caf50" : c.mode === "heating" ? "#ff7043" : "#3a3f46"}"/>
<rect x="67" y="42.8" width="5" height="2.4" rx="1.2" fill="#14171c"/><rect x="73.5" y="42.8" width="5" height="2.4" rx="1.2" fill="#14171c"/></g>
<circle cx="87.5" cy="49" r="3.6" fill="#1a1d22"/><circle cx="87.5" cy="49" r="1.7" fill="#2c3037"/>
<path d="M91.5 50.5 q8 1 9 12" stroke="#1a1d22" stroke-width="2.4" fill="none" stroke-linecap="round"/>
</g>
${hot ? (() => {
  // Where the top arm's upper edge is on screen: its own turn on the hinge,
  // then the whole iron's.
  const rot = ([x, y], a, cx, cy) => { const r = a * Math.PI / 180, dx = x - cx, dy = y - cy; return [cx + dx * Math.cos(r) - dy * Math.sin(r), cy + dx * Math.sin(r) + dy * Math.cos(r)]; };
  const at = (x) => rot(rot([x, 39.5], 2.4, 86, 49), -24, 50, 54);
  const n = c.temp === null || c.temp === undefined ? 2 : Math.max(1, Math.min(4, Math.round((c.temp - 40) / 50)));
  // Eight places along the plates; a wave rises at one, then the next one
  // comes up somewhere else, n at a time. Each place waits its turn.
  const slots = 8, rise = 2.2, period = slots * rise / n, f = rise / period;
  const order = [0, 5, 2, 7, 4, 1, 6, 3];
  return Array.from({ length: slots }, (_, i) => { const [px, py] = at(9 + (i + .5) * 34 / slots); const d = (order.indexOf(i) * period / slots).toFixed(2);
    return `<path d="M${px.toFixed(1)} ${(py - 2).toFixed(1)} c-1.6 -2 1.6 -4 0 -6 c-1.6 -2 1.6 -4 0 -6" stroke="#ff8a3d" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0"><animate attributeName="opacity" values="0;.85;0;0" keyTimes="0;${(f * .35).toFixed(3)};${f.toFixed(3)};1" dur="${period.toFixed(2)}s" begin="${d}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 2;0 -8;0 -8" keyTimes="0;${f.toFixed(3)};1" dur="${period.toFixed(2)}s" begin="${d}s" repeatCount="indefinite"/></path>`; }).join("");
})() : ""}
</svg>`;
}

function hairDryerHtml(cls, hd) {
  if (hd.layout === "straightener") return `
        <div class="machine ${cls} hd-straightener mode-${hd.mode || "off"}">${straightenerSvg(hd)}</div>`;
  const mode = hd.mode || "off";
  const level = hd.level || 0;
  const defs = `<defs>
            <linearGradient id="hd-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="hd-s-hi"/><stop offset="1" class="hd-s-body"/></linearGradient>
            <linearGradient id="hd-air" gradientUnits="userSpaceOnUse" x1="72" y1="0" x2="96" y2="0"><stop offset="0" class="hd-a0"/><stop offset="1" class="hd-a1"/></linearGradient>
            <radialGradient id="hd-heat"><stop offset="0" stop-color="#ffb74d"/><stop offset="1" stop-color="#ff5722" stop-opacity="0"/></radialGradient>
            <radialGradient id="hd-rheat"><stop offset="0.55" stop-color="#ff5722" stop-opacity="0"/><stop offset="0.8" stop-color="#ff9800" stop-opacity="0.9"/><stop offset="1" stop-color="#ff5722" stop-opacity="0"/></radialGradient>
          </defs>`;
  if (hd.layout === "ring") {
    const ring = "M20 34a22 22 0 1 0 44 0a22 22 0 1 0 -44 0ZM30 34a12 12 0 1 1 24 0a12 12 0 1 1 -24 0Z";
    const circles = level ? Array.from({ length: level >= 3 ? 3 : 2 }, (_, i) =>
      `<circle cx="42" cy="34" r="24" style="animation-delay: calc(${(i * 0.45).toFixed(2)}s + var(--anim-offset, 0s))"/>`).join("") : "";
    return `
        <div class="machine ${cls} hd-ring mode-${mode}">
          <svg class="hd-svg" viewBox="0 0 96 108">${defs}
            <g class="hd-rings">${circles}</g>
            <path class="hd-part" d="M36 52L48 52L50 96Q50 101 45 101L39 101Q34 101 34 96Z"/>
            ${[0, 1, 2, 3, 4].map((i) => `<line class="hd-grip" x1="36.5" y1="${80 + i * 3.5}" x2="47.5" y2="${80 + i * 3.5}"/>`).join("")}
            <circle class="hd-led" cx="42" cy="62" r="1.8"/><rect class="hd-btn" x="39.5" y="66" width="5" height="8" rx="2.5"/>
            <path class="hd-part" fill-rule="evenodd" d="${ring}"/>
            <path class="hd-heat" fill-rule="evenodd" fill="url(#hd-rheat)" d="${ring}"/>
            <circle class="hd-inner" cx="42" cy="34" r="17"/>
          </svg>
        </div>`;
  }
  // The lines start at the mouth of the nozzle and fan out to the edge.
  const lines = [];
  for (let i = 0; i < level; i++) {
    const f = level === 1 ? 0.5 : i / (level - 1);
    const y0 = (24.5 + f * 10).toFixed(1);
    const y1 = (17 + f * 25).toFixed(1);
    lines.push(`<path d="M72.5 ${y0}C80 ${y0} 86 ${y1} 95 ${y1}" style="animation-delay: calc(${(-i * 0.17).toFixed(2)}s + var(--anim-offset, 0s))"/>`);
  }
  return `
        <div class="machine ${cls} hd-pistol mode-${mode}">
          <svg class="hd-svg" viewBox="0 0 96 108">${defs}
            <g transform="translate(-2 2) scale(0.9)">
              <path class="hd-part" d="M40 46L50 46L56 92Q56 98 50 98L44 98Q38 98 38 92Z"/>
              <rect class="hd-btn" x="44.5" y="58" width="5" height="11" rx="2.5"/><circle class="hd-led" cx="47" cy="75" r="1.8"/>
              <path class="hd-cord" d="M47 98q0 6 -6 9"/>
              <rect class="hd-part" x="8" y="14" width="58" height="34" rx="16"/>
              <path class="hd-nozzle" d="M64 18L80 22Q82 23 82 25L82 35Q82 37 80 38L64 44Z"/>
              <ellipse class="hd-heat" cx="76" cy="30" rx="7" ry="9" fill="url(#hd-heat)"/>
              <rect class="hd-btn" x="80" y="23" width="2.5" height="14" rx="1"/>
              <circle class="hd-grille" cx="14" cy="31" r="10"/>
              ${[0, 1, 2].map((i) => `<line class="hd-grip" x1="${9 + i * 5}" y1="24" x2="${9 + i * 5}" y2="38"/>`).join("")}
            </g>
            <g class="hd-air" stroke="url(#hd-air)">${lines.join("")}</g>
          </svg>
        </div>`;
}


return {
draw: (cls, ctx) => hairDryerHtml(cls, ctx.hairDryer || {}),
css: () => `
        .hd-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .hd-s-hi { stop-color: var(--ac-body-hi, #ffffff); }
        .hd-s-body { stop-color: var(--ac-body, #e3e6ea); }
        .hd-part { fill: url(#hd-body); stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; }
        .hd-nozzle, .hd-grille { fill: var(--ac-body, #e3e6ea); stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; }
        .hd-btn { fill: var(--ac-body-lo, #b9bec6); }
        .hd-grip { stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1.2; opacity: 0.8; }
        .hd-cord { fill: none; stroke: var(--ac-body-lo, #b9bec6); stroke-width: 2.2; stroke-linecap: round; }
        .hd-inner { fill: none; stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; opacity: 0.5; }
        .hd-led { fill: #9e9e9e; }
        .machine.mode-cool { --hd-air: #29b6f6; }
        .machine.mode-hot, .machine.mode-on { --hd-air: #ff7a2f; }
        .machine.mode-cool .hd-led { fill: #4fc3f7; }
        .machine.mode-hot .hd-led, .machine.mode-on .hd-led { fill: #ff8a3d; }
        .hd-a0 { stop-color: var(--hd-air, #ff7a2f); stop-opacity: 1; }
        .hd-a1 { stop-color: var(--hd-air, #ff7a2f); stop-opacity: 0; }
        .hd-air path {
          fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 5 6;
          animation: hd-flow 0.55s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.mode-cool .hd-air path { animation-duration: 0.9s; }
        .hd-heat { opacity: 0; }
        .machine.mode-hot .hd-heat, .machine.mode-on .hd-heat {
          opacity: 1; animation: hd-glow 1.4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s);
        }
        .hd-rings circle {
          fill: none; stroke: var(--hd-air, #ff7a2f); stroke-width: 2; opacity: 0.5;
          transform-box: fill-box; transform-origin: center;
          animation: hd-ring 1.4s ease-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes hd-flow { to { stroke-dashoffset: -11; } }
        @keyframes hd-glow { from { opacity: 0.55; } to { opacity: 1; } }
        @keyframes hd-ring { 0% { transform: scale(0.9); opacity: 0.9; } 100% { transform: scale(1.45); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .hd-air path, .hd-heat, .hd-rings circle { animation-name: none; } }
  `,
};
}
