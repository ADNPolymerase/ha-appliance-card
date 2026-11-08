// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The fan drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
// Air quality on four levels: good, fair, poor, bad. A PM2.5 reading in
// micrograms, a US AQI, Philips's allergen index from 1 to 12, or the words of
// the integrations, which run from VeSync's four to Matter's six. A small
// whole number on an AQI sensor is an index of its own (Govee's), and a scale
// the card cannot place says nothing rather than something wrong.
const AQ_COLORS = { 1: "#4caf50", 2: "#fdd835", 3: "#ff9800", 4: "#f44336" };
// The air lines a purifier and a fan blow: five of them, listed so that the
// first two, then three, are evenly spread; the speed hides the rest. Up, down
// or sideways, the dashes run from the start of each line to its end.
function windLines(cls, x, y, w, h, dir) {
  const at = [0.08, 0.92, 0.5, 0.29, 0.71];
  const line = (f) => {
    if (dir === "side") {
      const v = (h * f).toFixed(1);
      return `<path d="M1 ${v} C${w * 0.3} ${v - 4} ${w * 0.6} ${+v + 4} ${w - 1} ${v - 1}"/>`;
    }
    const u = (w * f).toFixed(1);
    return dir === "up"
      ? `<path d="M${u} ${h - 1} C${u - 4} ${h * 0.66} ${+u + 4} ${h * 0.33} ${u} 1"/>`
      : `<path d="M${u} 1 C${u - 4} ${h * 0.33} ${+u + 4} ${h * 0.66} ${u} ${h - 1}"/>`;
  };
  return `<svg class="wind ${cls}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px" viewBox="0 0 ${w} ${h}">${at.map(line).join("")}</svg>`;
}
// Blades round a hub, in an SVG of their own: an invisible circle keeps the
// group centred on the hub, so a turn does not make them wobble, and r0 lets
// them start at the rim of a motor rather than at its centre.
function fanBlades(cx, cy, n, len, w, r0) {
  return `<g class="fn-rot"><circle cx="${cx}" cy="${cy}" r="${r0 + len + w}" fill="none"/>`
    + Array.from({ length: n }, (_, k) => `<path class="fn-blade" transform="rotate(${k * 360 / n} ${cx} ${cy}) translate(0 ${-r0})" d="M${cx} ${cy} `
      + `C${cx - w} ${cy - len * 0.35} ${cx - w * 0.8} ${cy - len} ${cx + w * 0.25} ${cy - len} C${cx + w * 0.9} ${cy - len * 0.7} ${cx + w * 0.5} ${cy - len * 0.3} ${cx} ${cy}Z"/>`).join("")
    + `</g>`;
}
// The air lines, shared by the purifier and the fan. How many show depends on
// the speed (lv1 to lv3), how fast they run on --spd; the night dims them and
// heat turns them orange.
const AIR_CSS = `
        .wind { position: absolute; display: none; overflow: visible; z-index: 7; }
        .wind path {
          fill: none; stroke: var(--air, #42a5f5); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 6;
          animation: wind-flow var(--spd, 1.6s) linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .wind path:nth-child(2) { animation-delay: calc(var(--spd, 1.6s) * -0.33 + var(--anim-offset, 0s)); }
        .wind path:nth-child(3) { animation-delay: calc(var(--spd, 1.6s) * -0.66 + var(--anim-offset, 0s)); }
        .wind path:nth-child(4) { animation-delay: calc(var(--spd, 1.6s) * -0.5 + var(--anim-offset, 0s)); }
        .wind path:nth-child(5) { animation-delay: calc(var(--spd, 1.6s) * -0.16 + var(--anim-offset, 0s)); }
        .machine.lv1 .wind path:nth-child(n+3), .machine.lv2 .wind path:nth-child(n+4) { display: none; }
        .machine.on .wind { display: block; }
        .machine.mode-heat, .machine.warm { --air: #ff7043; }
        .machine.mode-night .wind { opacity: 0.45; }
        .machine.mode-offline { opacity: 0.45; filter: grayscale(1); }
        @keyframes wind-flow { to { stroke-dashoffset: -20; } }
        @keyframes wind-r { 0%, 35%, 100% { opacity: 1; } 50%, 85% { opacity: 0; } }
        @keyframes wind-l { 0%, 35%, 100% { opacity: 0; } 50%, 85% { opacity: 1; } }
`;

// Inline geometry: left, top, width, height.
function airBox(cls, x, y, w, h, inner = "") {
  return `<div class="${cls}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px">${inner}</div>`;
}
// The classes and the variables every purifier and fan drawing carries.
function airMachine(cls, a, extra) {
  const on = ["run", "night", "heat"].includes(a.mode);
  const c = [cls, extra, `mode-${a.mode || "off"}`, on ? "on" : "", `lv${a.level || 2}`, a.aq ? `aq${a.aq}` : "",
    a.osc ? "osc" : "", a.back ? "back" : "", a.warm ? "warm" : "", a.natural ? "nat" : "", a.winter ? "rev" : "",
    a.lamp ? "lamp" : "", a.lit ? "lit" : "", a.wood ? "wood" : ""].filter(Boolean).join(" ");
  const style = `--spd: ${a.spd || 1.6}s; --rot: ${a.rot || 0.6}s${a.aq ? `; --aq: ${AQ_COLORS[a.aq]}` : ""}`;
  return `<div class="machine ${c}" style="${style}">`;
}

// The wood of a ceiling fan's blades: a grain along each blade, which turns
// with it.
const FAN_WOOD = `<defs><pattern id="fn-wood" width="3.2" height="88" patternUnits="userSpaceOnUse"><rect width="3.2" height="88" fill="#a86b3c"/>`
  + `<rect x="2.2" width=".7" height="88" fill="#7d4a24" opacity=".7"/><rect x=".6" width=".4" height="88" fill="#c88a55" opacity=".6"/></pattern></defs>`;
function fanHtml(cls, f) {
  const layout = f.layout || "stand";
  const open = airMachine(cls, f, `fn-${layout}`);
  if (layout === "ceiling") {
    // The blades turn in a flattened plane. The half nearer the ceiling passes
    // in front of the motor, the other half behind it, and they start at the
    // motor's rim so its inside never shows.
    const plane = (front) => `<div class="fn-plane${front ? " front" : ""}" style="left: 4px; top: -5px; width: 88px; height: 88px">`
      + `<svg width="88" height="88" viewBox="0 0 88 88">${front ? "" : FAN_WOOD}${fanBlades(44, 44, 5, 34, 9, 6)}</svg></div>`;
    return `${open}
          ${airBox("fn-halo", 18, 40, 60, 60)}${airBox("fn-ceil", 2, 8, 92, 1)}${airBox("fn-canopy", 43, 9, 10, 3.5)}${airBox("fn-pole", 46.75, 12, 2.5, 21)}
          ${plane(false)}${plane(true)}
          ${airBox("fn-housing", 41, 32, 14, 9)}${f.lamp ? airBox("fn-globe", 42.5, 40.6, 11, 5.2) : ""}
          ${windLines("", 12, 49, 72, 57, f.winter ? "down" : "up")}
        </div>`;
  }
  // A cage on a pole: a tall one for the floor, a short one for a desk.
  const table = layout === "table";
  const spokes = Array.from({ length: 16 }, (_, k) => {
    const a = k * Math.PI / 8;
    return `<line x1="${(30 + 5 * Math.cos(a)).toFixed(2)}" y1="${(28.5 + 5 * Math.sin(a)).toFixed(2)}" x2="${(30 + 27 * Math.cos(a)).toFixed(2)}" y2="${(28.5 + 27 * Math.sin(a)).toFixed(2)}"/>`;
  }).join("");
  const top = table ? 26 : 2;
  return `${open}
          ${table ? airBox("fn-pole", 46, 52, 4, 46) + airBox("fn-foot", 33, 96, 30, 7) : airBox("fn-pole", 46, 28, 4, 70) + airBox("fn-foot", 29, 96, 38, 8)}
          ${airBox("fn-head", 21, top, 54, 52, `<svg width="54" height="52" viewBox="0 0 60 58">${fanBlades(30, 28.5, 3, 23, 10, 0)}`
            + `<g class="fn-cage"><circle class="rim" cx="30" cy="28.5" r="27"/><circle cx="30" cy="28.5" r="18"/><circle cx="30" cy="28.5" r="9"/>${spokes}</g>`
            + `<circle class="fn-hub" cx="30" cy="28.5" r="5"/></svg>`)}
          ${windLines("r", 72, top + 4, 24, 44, "side")}${windLines("l", 0, top + 4, 24, 44, "side")}
        </div>`;
}


return {
draw: (cls, ctx) => fanHtml(cls, ctx.fan || {}),
css: () => `${AIR_CSS}
        .fn-rot { transform-origin: 50% 50%; transform-box: fill-box; }
        .machine.on .fn-rot { animation: fn-spin var(--rot, 0.6s) linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.nat .fn-rot { animation: fn-spin-nat 3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.fn-ceiling .fn-rot { animation-direction: reverse; }
        .machine.fn-ceiling.rev .fn-rot { animation-direction: normal; }
        .machine.fn-ceiling.nat .fn-rot { animation-direction: reverse; }
        .machine.fn-ceiling.rev.nat .fn-rot { animation-direction: normal; }
        .machine.nat .wind path { animation-name: wind-flow, fn-gust; animation-duration: var(--spd, 1.6s), 3s; animation-timing-function: linear, ease-in-out; }
        .fn-blade { fill: var(--ac-body-lo, #cfd6db); fill-opacity: 0.85; stroke: rgba(0, 0, 0, 0.35); stroke-width: 0.6; }
        .fn-cage { fill: none; stroke: var(--ac-body-lo, #cfd6db); stroke-width: 0.6; opacity: 0.9; }
        .fn-cage .rim { stroke-width: 2.2; }
        .fn-hub { fill: var(--ac-body, #eceff1); stroke: rgba(0, 0, 0, 0.3); stroke-width: 0.6; }
        .fn-head { position: absolute; z-index: 2; transform-origin: 50% 50%; }
        .fn-pole, .fn-foot, .fn-ceil, .fn-canopy, .fn-housing, .fn-globe, .fn-plane, .fn-halo { position: absolute; }
        .fn-pole { z-index: 1; background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 40%, var(--ac-body-lo, #cfd6db)); box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.2); }
        .fn-foot {
          z-index: 1; border-radius: 50%; box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 0.6px rgba(0, 0, 0, 0.3);
          background: radial-gradient(ellipse at 50% 35%, var(--ac-body-hi, #ffffff), var(--ac-body, #eceff1) 55%, var(--ac-body-lo, #cfd6db));
        }
        .machine.fn-stand .wind.l, .machine.fn-table .wind.l { transform: scaleX(-1); display: none; }
        .machine.on.osc .fn-head { animation: fn-turn 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.r { animation: wind-r 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.l { display: block; animation: wind-l 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fn-ceil { z-index: 1; height: 1px; background: rgba(0, 0, 0, 0.18); }
        .fn-canopy { z-index: 2; border-radius: 0 0 6px 6px / 0 0 3px 3px; background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 40%, var(--ac-body-lo, #cfd6db)); box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.25); }
        .fn-plane { z-index: 3; transform: scaleY(0.26); }
        .fn-plane.front { z-index: 5; clip-path: path(evenodd, "M-60 -60H148V44H-60Z M37 28.6H51V44H37Z"); }
        .fn-plane .fn-blade { fill: var(--ac-body, #eceff1); fill-opacity: 1; stroke-width: 1.4; }
        .machine.wood .fn-plane .fn-blade { fill: url(#fn-wood); stroke: #4e2c14; }
        .fn-housing {
          z-index: 4; border-radius: 45% 45% 20% 20% / 40% 40% 30% 30%; box-shadow: inset 0 0 0 0.6px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15);
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 35%, var(--ac-body, #eceff1) 68%, var(--ac-body-lo, #cfd6db));
        }
        .fn-globe { z-index: 6; border-radius: 0 0 50% 50% / 0 0 100% 100%; background: linear-gradient(180deg, #eef1f3, #c9d0d5); box-shadow: inset 0 0 0 0.6px rgba(0, 0, 0, 0.25); }
        .machine.lit .fn-globe { background: radial-gradient(ellipse at 50% 30%, #fffde7, #ffd54f 70%); box-shadow: 0 0 6px 2px rgba(255, 213, 79, 0.75), inset 0 0 0 0.6px rgba(0, 0, 0, 0.15); }
        .fn-halo { display: none; z-index: 0; border-radius: 50%; background: radial-gradient(circle, rgba(255, 213, 79, 0.28), transparent 70%); }
        .machine.lit .fn-halo { display: block; }
        .machine.fn-ceiling.rev { --air: #ff7043; }
        @keyframes fn-spin { to { transform: rotate(360deg); } }
        @keyframes fn-spin-nat { to { transform: rotate(1080deg); } }
        @keyframes fn-gust { 0%, 100% { stroke-opacity: 0.2; } 50% { stroke-opacity: 1; } }
        @keyframes fn-turn { 0%, 35%, 100% { transform: translateX(2px) scaleX(0.78); } 50%, 85% { transform: translateX(-2px) scaleX(0.78); } }
  `,
};
}
