// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The pet_fountain drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
const ntBlur = (id, s) => `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${s}"/></filter>`;
// Pet feeders and fountain, drawn after real products. Every piece of kibble
// is placed by a fixed jitter, so a drawing never changes between two redraws.
let pfN = 0;
const pfId = () => `pf${++pfN}`;
const pfF = (v) => v.toFixed(2);
const pfSoftShadow = (cx, cy, rx, ry) => { const id = pfId(); return `<filter id="${id}" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".22" filter="url(#${id})"/>`; };
// Fountain, after the PetKit Eversweet: a tank with a steel top where the
// water wells up from the centre and runs off its edges, a window on the
// tank and a light ring under the plate. Round, after the PetKit Eversweet
// Solo: a white drum with a steel rim, the water welling up in the middle of
// a round plate and a light at the foot of the front (#70). The jet stands
// taller than the real one, so it reads at the size of a card (#70).
function ftSvg(f) {
  pfN = 0;
  const b = pfId(), plate = pfId(), w = pfId(), win = pfId(), gl = pfId();
  const lvl = f.lvl, run = f.running, wy0 = 68, wy1 = 92, top = wy1 - (wy1 - wy0) * lvl;
  const cy = f.round ? 43.4 : 44.4;
  const spray = run ? [0, 1, 2, 3].map((k) => `<circle class="ft-spray ${k % 2 ? "r" : "l"} ftd${k + 1}" cx="${k % 2 ? 61.6 : 58.4}" cy="${pfF(cy - 13)}" r=".85" fill="#b3e5fc"/>`).join("") : "";
  const jet = run ? `<ellipse class="ft-ring" cx="60" cy="${cy}" rx="6" ry="2" fill="none" stroke="#fff" stroke-width=".8"/><ellipse class="ft-ring ftd2" cx="60" cy="${cy}" rx="6" ry="2" fill="none" stroke="#fff" stroke-width=".8"/>`
    + `<path class="ft-dome" d="M54.6 ${cy} Q55.6 ${pfF(cy - 7)} 58 ${pfF(cy - 11.4)} Q60 ${pfF(cy - 14.6)} 62 ${pfF(cy - 11.4)} Q64.4 ${pfF(cy - 7)} 65.4 ${cy} Z" fill="url(#${w}d)"/>`
    + `<path class="ft-dome" d="M57 ${pfF(cy - 1.6)} Q57.4 ${pfF(cy - 7.6)} 59.2 ${pfF(cy - 11.6)}" stroke="#fff" stroke-width=".9" stroke-linecap="round" fill="none" opacity=".85"/>${spray}` : "";
  const badge = f.low ? `<g transform="translate(106 20)"><circle r="5.4" fill="#e53935" stroke="#fff" stroke-width="1.2"/><path d="M0 -2.8 V.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cy="2.6" r=".9" fill="#fff"/></g>`
    : f.due ? `<g transform="translate(106 20)"><circle r="6" fill="#ffb300" stroke="#fff" stroke-width="1.2"/><path d="M-3 -2.4h6M-3 0h6M-3 2.4h6" stroke="#fff" stroke-width="1"/></g>` : "";
  const defs = `<defs>
<linearGradient id="${b}" x1="0" x2="1"><stop offset="0" style="stop-color: var(--ac-body-lo, #c6ccd3)"/><stop offset=".42" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c6ccd3)"/></linearGradient>
<radialGradient id="${plate}" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".6" stop-color="#c3cad2"/><stop offset="1" stop-color="#8e98a2"/></radialGradient>
<radialGradient id="${w}" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#e1f5fe" stop-opacity=".9"/><stop offset="1" stop-color="#81d4fa" stop-opacity=".55"/></radialGradient>
<linearGradient id="${w}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e1f5fe" stop-opacity=".95"/><stop offset="1" stop-color="#4fc3f7" stop-opacity=".75"/></linearGradient>
<linearGradient id="${win}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#81d4fa"/><stop offset="1" stop-color="#1e88e5"/></linearGradient>${ntBlur(gl, 1.2)}</defs>`;
  if (f.round) {
    const bowl = "M36 44 A24 6.6 0 0 1 84 44 A24 6.6 0 0 1 36 44 Z";
    return `<svg class="ft-svg ft-round" viewBox="0 -10 120 135" aria-hidden="true">${defs}
<g transform="translate(60 70) scale(1.3) translate(-60 -70)">
${pfSoftShadow(60, 102, 36, 5)}
<path class="ft-body" d="M28 44 V94 A32 7.6 0 0 0 92 94 V44 Z" fill="url(#${b})"/>
<path d="M28.6 92 A31.4 7.4 0 0 0 91.4 92 V95 A31.4 7.4 0 0 1 28.6 95 Z" fill="#000" opacity=".07"/>
<rect x="31" y="48" width="3" height="40" rx="1.5" fill="#fff" opacity=".7"/>
<ellipse cx="60" cy="44" rx="32" ry="8.6" style="fill: var(--ac-body, #eef1f4)" stroke="#cfd6dd" stroke-width=".5"/>
<ellipse cx="60" cy="44" rx="28.4" ry="7.6" fill="url(#${plate})"/>
<ellipse cx="60" cy="44.6" rx="25" ry="6.4" fill="#7d8892" opacity=".35"/>
<path d="${bowl}" fill="#e9eef2"/>
${f.dry ? "" : `<path class="ft-pool" d="${bowl}" fill="url(#${w})"/>`}
<ellipse cx="60" cy="${cy}" rx="4.4" ry="1.6" fill="#dfe5ea" stroke="#9aa3ad" stroke-width=".5"/>
<ellipse cx="60" cy="${pfF(cy - .2)}" rx="2" ry=".8" fill="${run ? "#e1f5fe" : "#b0bac4"}"/>
${jet}
<ellipse class="ft-glow" cx="60" cy="46" rx="18" ry="4.4" fill="none" stroke-width="1" filter="url(#${gl})"/>
<circle class="ft-led" cx="60" cy="98.2" r="1.6"/>
</g>
${badge}
</svg>`;
  }
  const dish = "M28 45.5 Q28 39 36 38.5 H84 Q92 39 92 45.5 Q92 50 84 50.5 H36 Q28 50 28 45.5 Z";
  return `<svg class="ft-svg" viewBox="0 -10 120 135" aria-hidden="true">${defs}
<g transform="translate(60 70) scale(1.3) translate(-60 -70)">
${pfSoftShadow(60, 104, 38, 5)}
<path class="ft-body" d="M24 48 Q24 40 34 40 H86 Q96 40 96 48 V92 Q96 102 86 102 H34 Q24 102 24 92 Z" fill="url(#${b})"/>
<rect x="27" y="48" width="3" height="48" rx="1.5" fill="#fff" opacity=".7"/>
<path d="M22 46 Q22 36 34 35 H86 Q98 36 98 46 Q98 52 86 53 H34 Q22 52 22 46 Z" style="fill: var(--ac-body, #eef1f4)" stroke="#cfd6dd" stroke-width=".5"/>
<path d="${dish}" fill="url(#${plate})"/>
${f.dry ? "" : `<path class="ft-pool" d="${dish}" fill="url(#${w})"/>`}
<ellipse cx="60" cy="44.5" rx="7" ry="2.6" fill="#dfe5ea" stroke="#9aa3ad" stroke-width=".5"/>
<ellipse cx="60" cy="44.2" rx="3" ry="1.1" fill="${run ? "#e1f5fe" : "#b0bac4"}"/>
${jet}
<ellipse class="ft-glow" cx="60" cy="47" rx="16" ry="4" fill="none" stroke-width="1" filter="url(#${gl})"/>
<rect class="ft-win" x="74" y="${wy0}" width="12" height="${wy1 - wy0}" rx="4" fill="#dbe7ef" stroke="#b9c7d2" stroke-width=".5"/>
<clipPath id="${win}c"><rect x="74.5" y="${wy0 + .5}" width="11" height="${wy1 - wy0 - 1}" rx="3.6"/></clipPath>
<g clip-path="url(#${win}c)"><rect class="ft-water" data-level="${Math.round(lvl * 100)}" x="74" y="${pfF(top)}" width="12" height="${pfF(wy1 - top)}" fill="url(#${win})"/><path d="M74 ${pfF(top)} h12" stroke="#e1f5fe" stroke-width=".8"/></g>
<path d="M76 72 h3 M76 80 h3 M76 88 h3" stroke="#8aa0ae" stroke-width=".5"/>
<circle class="ft-led" cx="40" cy="92" r="1.8"/>
</g>
${badge}
</svg>`;
}
// pieces along its top. Generated, so each disc sits a little askew and no row
// lines up with the next.


return {
draw: (cls, ctx) => {
    // Without a level the tank keeps a resting height rather than reading as
    // empty. No water comes up a pump that is off or that has run dry.
    const f = ctx.fountain || {};
    const fill = f.low ? 12 : f.fill === null || f.fill === undefined ? 55 : Math.max(0, Math.min(100, Math.round(f.fill)));
    const led = f.offline ? "" : f.low ? "led-low" : f.due ? "led-due" : f.flowing ? "led-on" : "";
    const running = f.flowing && !f.low;
    const svg = ftSvg({ round: !!f.round, lvl: fill / 100, running, dry: !!f.low, low: !!f.low && !f.offline, due: !!f.due && !f.low && !f.offline });
    return `
        <div class="machine ${cls} ${running ? "flowing" : ""} ${f.low ? "ft-dry" : ""}${f.offline ? " ft-offline" : ""} ${led}">${svg}
        </div>`;
  },
css: () => `
        svg.ft-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        /* While the pump runs, the water wells up into a dome over the outlet,
           rings spread across the plate and drops spray off its edges. */
        .ft-dome { transform-box: fill-box; transform-origin: center bottom; }
        .machine.flowing .ft-dome { animation: ft-dome 1.1s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ft-dome { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.2); } }
        .ft-ring { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .machine.flowing .ft-ring { animation: ft-ring 2s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flowing .ft-ring.ftd2 { animation-delay: calc(-1s + var(--anim-offset, 0s)); }
        @keyframes ft-ring { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }
        .ft-spray { opacity: 0; }
        .machine.flowing .ft-spray.l { animation: ft-spray-l 1.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flowing .ft-spray.r { animation: ft-spray-r 1.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flowing .ft-spray.ftd2 { animation-delay: calc(-0.35s + var(--anim-offset, 0s)); }
        .machine.flowing .ft-spray.ftd3 { animation-delay: calc(-0.7s + var(--anim-offset, 0s)); }
        .machine.flowing .ft-spray.ftd4 { animation-delay: calc(-1.05s + var(--anim-offset, 0s)); }
        @keyframes ft-spray-l { 0% { transform: translate(0, 0); opacity: 0; } 15% { opacity: 1; } 45% { transform: translate(-4.5px, -2px); } 100% { transform: translate(-9px, 11px); opacity: 0; } }
        @keyframes ft-spray-r { 0% { transform: translate(0, 0); opacity: 0; } 15% { opacity: 1; } 45% { transform: translate(4.5px, -2px); } 100% { transform: translate(9px, 11px); opacity: 0; } }
        /* The light under the plate and the dot at the front: blue while it
           runs, orange when the filter or the pump wants a hand, red and
           blinking when the water runs low, out when it is off. */
        .ft-glow { stroke: #9aa3ad; opacity: 0.3; }
        .ft-led { fill: #9aa3ad; }
        .machine.led-on .ft-glow { stroke: #29b6f6; opacity: 0.8; }
        .machine.led-on .ft-led { fill: #29b6f6; }
        .machine.led-due .ft-glow { stroke: #ffb300; opacity: 0.8; }
        .machine.led-due .ft-led { fill: #ffb300; }
        .machine.led-low .ft-glow { stroke: #e53935; opacity: 0.8; }
        .machine.led-low .ft-led { fill: #e53935; animation: ft-blink 1s steps(2) infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.led-low .ft-win { stroke: #e53935; stroke-width: 1; }
        @keyframes ft-blink { 50% { opacity: 0.25; } }
        /* Offline, the fountain says nothing: no light, no jet, the water
           drawn grey rather than as a level the card cannot know. */
        .machine.ft-offline .ft-water, .machine.ft-offline .ft-pool { filter: grayscale(1); opacity: 0.55; }
  `,
};
}
