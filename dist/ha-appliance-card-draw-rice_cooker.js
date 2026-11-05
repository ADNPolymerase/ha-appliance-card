// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The rice_cooker drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// Five appliances drawn in volume: a cooker with a clear jug, a Japanese rice
// cooker, a wall boiler (or one with a burner window), a bean-to-cup coffee
// machine (silver, or black and chrome) and a towel warmer (a white ladder, or
// flat anthracite panels). The ids carry a number of their own, as each card
// draws its gradients again; the words on their screens stay in HTML.
let drawN = 0;
const svgGrad = (id, stops, x2 = 1, y2 = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" style="stop-color:${c}"/>`).join("")}</linearGradient>`;
const svgWisp = (cls, x, y) => `<path class="${cls}" d="M${x} ${y} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`;
// The body in the appliance's colour, white unless one is chosen.
const BODY_STOPS = [[0, "var(--ac-body-lo,#dfe4e9)"], [0.45, "var(--ac-body-hi,#ffffff)"], [0.75, "var(--ac-body,#f1f4f6)"], [1, "var(--ac-body-lo,#cdd3d8)"]];

function riceSvg() {
  const g = `dw${drawN++}`;
  return `<svg class="rk-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}w`, BODY_STOPS)}${svgGrad(`${g}l`, [[0, "var(--ac-body-hi,#ffffff)"], [1, "var(--ac-body-lo,#dde2e7)"]], 0, 1)}${svgGrad(`${g}v`, [[0, "rgba(255,255,255,0)"], [0.7, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,.10)"]], 0, 1)}
<radialGradient id="${g}o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".7" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="48" cy="100.4" rx="38" ry="4" fill="url(#${g}o)"/>
<path d="M18 100.6 H78" stroke="rgba(0,0,0,.16)" stroke-width="1.2" stroke-linecap="round"/>
<path d="M14 50 V92 Q14 97.6 21 98.6 Q48 102 75 98.6 Q82 97.6 82 92 V50 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<path d="M14 50 V92 Q14 97.6 21 98.6 Q48 102 75 98.6 Q82 97.6 82 92 V50 Z" fill="url(#${g}v)"/>
<path d="M14.4 91 Q48 96.5 81.6 91 V92 Q82 97.6 75 98.6 Q48 102 21 98.6 Q14 97.6 14.4 92 Z" fill="rgba(70,80,90,.28)"/>
<path d="M19 57 Q18.4 74 19.4 88" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.6" stroke-linecap="round"/>
<path d="M26 63.6 Q48 61.4 70 63.6 Q72 63.8 72 66 V84.4 Q72 86.6 70 86.8 Q48 89 26 86.8 Q24 86.6 24 84.4 V66 Q24 63.8 26 63.6 Z" fill="#2a2f35"/>
<rect x="29" y="68" width="24" height="10" rx="2" fill="#14161a"/>
<circle class="rk-led rk-cook" cx="60" cy="71" r="2"/><circle class="rk-led rk-warm" cx="67" cy="71" r="2"/>
<rect x="29" y="81" width="11" height="4" rx="2" fill="#4a5158"/><rect x="43" y="81.3" width="11" height="4" rx="2" fill="#4a5158"/><rect class="rk-key" x="57" y="81" width="11" height="4" rx="2"/>
<path d="M12 50 Q12 46.6 15.4 45 Q21 30.4 48 29.4 Q75 30.4 80.6 45 Q84 46.6 84 50 Q48 56.6 12 50 Z" fill="url(#${g}l)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M13.4 50.6 Q48 57.4 82.6 50.6" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="1.2"/>
<path d="M22 41 Q27 33.6 39 31.6" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1.4" stroke-linecap="round"/>
<path d="M42 49.4 Q48 50.6 54 49.4 V51.6 Q48 52.8 42 51.6 Z" fill="#c3cad1" stroke="rgba(0,0,0,.18)" stroke-width=".5"/>
<path d="M58.4 28.4 V31.6 Q63.4 33 68.4 31.6 V28.4" fill="#e3e8ec" stroke="#aeb6bd" stroke-width=".7"/>
<ellipse cx="63.4" cy="28.4" rx="5" ry="1.5" fill="#f6f8f9" stroke="#aeb6bd" stroke-width=".7"/>
<ellipse cx="63.4" cy="28.4" rx="2.4" ry=".7" fill="#8f98a2"/>
${svgWisp("rk-steam w1", 62, 28)}${svgWisp("rk-steam w2", 66.5, 28)}</svg>`;
}


return {
draw: (cls, ctx) => {
    return `
        <div class="machine ${cls} ${ctx.keepWarm ? "warm" : ""}">${riceSvg()}${ctx.display ? `<div class="rk-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },
css: (color) => `
        svg.rk-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .rk-disp {
          position: absolute; left: 29px; top: 68px; width: 24px; height: 10px; border-radius: 2px;
          color: ${color}; text-align: center; overflow: hidden; white-space: nowrap;
          font: 600 6.5px/10px ui-monospace, "SF Mono", monospace;
        }
        /* Two lights, as on the real ones: red while it cooks, orange while it
           keeps warm. */
        .rk-led { fill: #5d6570; }
        .machine.heating .rk-cook { fill: #ff5252; filter: drop-shadow(0 0 1.5px #ff5252); }
        .machine.warm .rk-warm { fill: #ffb300; filter: drop-shadow(0 0 1.5px #ffb300); animation: rk-glow 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes rk-glow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .rk-key { fill: #4a5158; }
        .machine.heating .rk-key { fill: #ff7043; }
        .machine.warm .rk-key { fill: #ffb300; }
        .rk-steam { fill: none; stroke: rgba(150, 165, 180, 0.7); stroke-width: 2.2; stroke-linecap: round; opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; }
        .machine.heating .rk-steam { animation: rk-puff 2.3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .rk-steam.w2 { animation-delay: calc(-1.15s + var(--anim-offset, 0s)); }
        .machine.warm .rk-steam.w1 { animation: rk-puff 4.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes rk-puff {
          0% { transform: translate(0, 7px) scale(0.6); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translate(-2px, -9px) scale(1.25); opacity: 0; }
        }
  `,
};
}
