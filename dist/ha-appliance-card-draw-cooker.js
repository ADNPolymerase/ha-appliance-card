// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The cooker drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
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

function cookerSvg() {
  const g = `dw${drawN++}`;
  return `<svg class="rc-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}w`, BODY_STOPS)}${svgGrad(`${g}s`, [[0, "#ffd08a"], [1, "#e8913a"]], 0, 1)}${svgGrad(`${g}v`, [[0, "rgba(255,255,255,.9)"], [1, "rgba(0,0,0,.10)"]], 0, 1)}
<radialGradient id="${g}d" cx=".4" cy=".35"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d0d6"/></radialGradient>
<radialGradient id="${g}o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".7" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<clipPath id="${g}c"><path d="M28.9 58.4 L26.5 28.5 H65.5 L63.1 58.4 Q46 62.4 28.9 58.4 Z"/></clipPath></defs>
<ellipse cx="48" cy="100" rx="36" ry="4" fill="url(#${g}o)"/>
<path d="M21 100.2 H75" stroke="rgba(0,0,0,.18)" stroke-width="1.2" stroke-linecap="round"/>
<path class="rc-base" d="M19 99.6 Q16 99.6 17 95.6 L20 70 Q21 64 27.5 64 H68.5 Q75 64 76 70 L79 95.6 Q80 99.6 77 99.6 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<path d="M19 95.4 H77" stroke="rgba(0,0,0,.08)" stroke-width="1"/>
<path d="M22 71 H74" stroke="rgba(0,0,0,.05)" stroke-width=".8"/>
<rect x="28" y="73" width="40" height="12.5" rx="3.5" fill="#14161a"/>
<circle cx="48" cy="92" r="4.4" fill="url(#${g}d)" stroke="#aeb6bd" stroke-width=".7"/>
<circle class="rc-ring" cx="48" cy="92" r="6" fill="none" stroke-width="1.4"/>
<g transform="translate(46 64.5) scale(1.2) translate(-46 -58.5)">
<path d="M65 32 C80 32 82 52 65.2 54" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="7" stroke-linecap="round"/>
<path d="M65 32 C80 32 82 52 65.2 54" fill="none" stroke="url(#${g}w)" stroke-width="5" stroke-linecap="round"/>
<path d="M28.6 58.5 L25.4 28 Q25.4 25.5 28.4 25.5 H63.6 Q66.6 25.5 66.6 28 L63.4 58.5 Q46 63 28.6 58.5 Z" fill="rgba(200,228,245,.55)" stroke="#9fb6c6" stroke-width=".9"/>
<g clip-path="url(#${g}c)">
<path class="rc-food" d="M20 43.4 H72 V63 H20 Z" fill="url(#${g}s)"/>
<ellipse class="rc-food" cx="46" cy="43.4" rx="18.6" ry="3" fill="#ffdca6" stroke="rgba(200,110,30,.35)" stroke-width=".6"/>
<path class="rc-dip" d="M37 43.4 Q46 52 55 43.4 Q46 44.6 37 43.4 Z" fill="rgba(160,70,10,.3)"/>
<ellipse class="rc-swirl" cx="46" cy="43.4" rx="16.6" ry="2.3" fill="none" stroke="#b4501a" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 4.33"/>
<ellipse class="rc-swirl s2" cx="46" cy="49.5" rx="13" ry="1.8" fill="none" stroke="rgba(170,70,15,.75)" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2.5 4.83"/>
<g class="rc-blade"><path d="M38 54 L54 54 M46 50 L46 58" stroke="#6c757d" stroke-width="2" stroke-linecap="round"/></g>
<circle cx="46" cy="54" r="1.6" fill="#495057"/>
<path d="M25 28.6 H67" stroke="rgba(0,0,0,.10)" stroke-width="1.6"/>
<path d="M20 57 Q46 61 72 57" fill="none" stroke="rgba(120,60,10,.22)" stroke-width="2.2"/>
</g>
<path d="M29.4 56.2 Q46 59.8 62.6 56.2" fill="none" stroke="rgba(255,255,255,.7)" stroke-width=".9"/>
<path class="rc-rim" d="M28.4 59.4 Q46 64 63.6 59.4" fill="none" stroke-width="1.4" stroke-linecap="round"/>
<path d="M57.5 34 H62 M58 41 H62 M58.5 48 H62 M59 55 H62" stroke="#9fb6c6" stroke-width=".7"/>
<path d="M31 30 L29.6 55" stroke="rgba(255,255,255,.75)" stroke-width="1.4" stroke-linecap="round"/>
<path d="M22.5 28.2 Q22.5 24.4 26.5 24 H65.5 Q69.5 24.4 69.5 28.2 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M25.2 24.2 Q27 16.4 46 15.6 Q65 16.4 66.8 24.2 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M25.2 24.2 Q27 16.4 46 15.6 Q65 16.4 66.8 24.2 Z" fill="url(#${g}v)" opacity=".55"/>
<path d="M30 21.8 Q33 18.2 40 17.2" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1.2" stroke-linecap="round"/>
<path d="M39.8 11.8 V16.6 Q46 18.4 52.2 16.6 V11.8" fill="#e3e8ec" stroke="#b9c1c8" stroke-width=".8"/>
<ellipse cx="46" cy="11.8" rx="6.2" ry="1.8" fill="#f6f8f9" stroke="#b9c1c8" stroke-width=".8"/>
<ellipse cx="46" cy="11.8" rx="3.6" ry=".9" fill="#c9d0d6"/>
${svgWisp("rc-steam v1", 43, 11)}${svgWisp("rc-steam v2", 48.5, 11)}
</g></svg>`;
}


return {
draw: (cls, ctx) => {
    const sp = ctx.speed || 0;
    return `
        <div class="machine ${cls} ${sp > 0 ? "mixing" : ""} s${sp}">${cookerSvg()}${ctx.display ? `<div class="rc-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },
css: (color) => `
        svg.rc-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .rc-disp {
          position: absolute; left: 28px; top: 73px; width: 40px; height: 12.5px; border-radius: 3px;
          color: ${color}; text-align: center; overflow: hidden; white-space: nowrap;
          font: 600 7px/12.5px ui-monospace, "SF Mono", monospace;
        }
        /* The element is under the jug, and the ring of the dial says it too. */
        .rc-ring { stroke: rgba(0, 0, 0, 0.08); }
        .rc-rim { stroke: rgba(0, 0, 0, 0.22); }
        .machine.heating .rc-ring, .machine.heating .rc-rim { stroke: #ff7043; filter: drop-shadow(0 0 2px #ff7043); }
        .machine.heating .rc-food { filter: saturate(1.35) brightness(0.95); }
        /* The blade turns about its hub, clipped to the jug so it never shows
           below it. */
        .rc-blade { transform-box: fill-box; transform-origin: 50% 50%; }
        .machine.mixing .rc-blade { animation: rc-spin linear infinite; animation-delay: var(--anim-offset, 0s); }
        /* The speed shows in how often the turn comes round, not in how fast
           the blade travels: a turn too quick to follow reads as a glitch. */
        .machine.s1 .rc-blade { animation-duration: 2.6s; }
        .machine.s2 .rc-blade { animation-duration: 1.6s; }
        .machine.s3 .rc-blade { animation-duration: 0.9s; }
        @keyframes rc-spin {
          0% { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.4, 0, 0.3, 1); }
          68% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
        /* The soup goes round the jug rather than spinning like the blade: its
           ripples travel along the surface, and it hollows the faster it goes. */
        .machine.mixing .rc-swirl { animation: rc-swirl linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mixing .rc-swirl.s2 { animation-delay: calc(-0.5s + var(--anim-offset, 0s)); }
        .machine.s1 .rc-swirl { animation-duration: 3.2s; }
        .machine.s2 .rc-swirl { animation-duration: 1.9s; }
        .machine.s3 .rc-swirl { animation-duration: 1.1s; }
        @keyframes rc-swirl {
          to { stroke-dashoffset: -22; }
        }
        .rc-dip { transform-box: fill-box; transform-origin: 50% 0; transform: scaleY(0); transition: transform 0.5s; }
        .machine.mixing.s1 .rc-dip { transform: scaleY(0.45); }
        .machine.mixing.s2 .rc-dip { transform: scaleY(0.85); }
        .machine.mixing.s3 .rc-dip { transform: scaleY(1.25); }
        .rc-steam { fill: none; stroke: rgba(150, 165, 180, 0.7); stroke-width: 2.2; stroke-linecap: round; opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; }
        .machine.heating .rc-steam { animation: rc-vapour 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .rc-steam.v2 { animation-delay: calc(-1.2s + var(--anim-offset, 0s)); }
        @keyframes rc-vapour {
          0% { transform: translate(0, 6px) scale(0.7); opacity: 0; }
          40% { opacity: 0.85; }
          100% { transform: translate(-2px, -10px) scale(1.2); opacity: 0; }
        }
  `,
};
}
