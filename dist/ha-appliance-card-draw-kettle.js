// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The kettle drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
// The kettle, as one drawing in two looks: the classic jug, in the colour of
// the appliance, and a stainless one with its black handle. The ids carry a
// number of their own, as each card draws its gradients again.
let kettleN = 0;
function kettleSvg(layout) {
  const g = `kt${kettleN++}`;
  const glow = `<radialGradient id="${g}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff8a50"/><stop offset="1" stop-color="#ff7043" stop-opacity="0"/></radialGradient>`;
  const water = `<linearGradient id="${g}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a4dcf9"/><stop offset="1" stop-color="#3b9fd8"/></linearGradient>`;
  const steam = (x1, y1, x2, y2) => `<path class="kt-steam s1" d="M${x1} ${y1} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`
    + `<path class="kt-steam s2" d="M${x2} ${y2} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`;
  const bubbles = (x, y) => `<circle class="kt-bub" cx="${x}" cy="${y}" r="1"/><circle class="kt-bub b2" cx="${x - 0.6}" cy="${y - 1}" r=".8"/><circle class="kt-bub b3" cx="${x + 0.4}" cy="${y + 1}" r=".7"/>`;
  if (layout === "steel") {
    return `<svg class="kt-svg" viewBox="0 0 96 96"><defs>${glow}${water}
<linearGradient id="${g}b" x1="0" x2="1"><stop offset="0" stop-color="#727c86"/><stop offset=".22" stop-color="#c8d0d7"/><stop offset=".42" stop-color="#f6f8fa"/><stop offset=".62" stop-color="#bcc4cc"/><stop offset="1" stop-color="#5f6872"/></linearGradient></defs>
<ellipse class="kt-glow" cx="47" cy="87" rx="34" ry="7" fill="url(#${g}g)"/>
<path d="M19 82 H75 Q79 82 79 85.5 V87 Q79 90 75 90 H19 Q15 90 15 87 V85.5 Q15 82 19 82 Z" fill="#24282d"/>
<rect class="kt-ring" x="21" y="87.6" width="52" height="1.4" rx=".7" fill="#ff7043"/>
${steam(16, 22, 21, 21)}
<path d="M63 33 C79 31 84 42 82 55 C80 67 75 73 67 76" fill="none" stroke="#24282d" stroke-width="7" stroke-linecap="round"/>
<path d="M34 38 C27 36 21 31.5 16.6 27 Q14.2 25.2 14.6 28.4 C16.5 36 22 46 31 54 Z" fill="url(#${g}b)" stroke="#59626b" stroke-width=".7" stroke-linejoin="round"/>
<path class="kt-body" d="M36 30 H58 Q63 30 64.5 36 C69 48 72 62 70.5 74 Q70 82 63 82 H31 Q24 82 23.5 74 C22 62 25 48 29.5 36 Q31 30 36 30 Z" fill="url(#${g}b)" stroke="#59626b" stroke-width=".7"/>
<path d="M27.5 70 C35 73 59 73 66.5 70" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
<rect x="58.5" y="42" width="5.6" height="30" rx="2.8" fill="#1d2126"/>
<rect x="59.3" y="56" width="4" height="15" rx="2" fill="url(#${g}w)"/>
${bubbles(61.3, 69)}
<path d="M33 30.5 Q47 22 61 30.5 Z" fill="#24282d"/>
<rect x="43" y="20.5" width="8" height="4.4" rx="2.2" fill="#24282d"/>
<rect class="kt-led" x="66" y="72" width="5.6" height="3" rx="1.5"/>
</svg>`;
  }
  const line = "rgba(0,0,0,.22)";
  return `<svg class="kt-svg" viewBox="0 0 96 96"><defs>${glow}${water}
<linearGradient id="${g}b" x1="0" x2="1"><stop offset="0" style="stop-color:var(--ac-body-lo,#dfe4e9)"/><stop offset=".42" style="stop-color:var(--ac-body-hi,#ffffff)"/><stop offset=".7" style="stop-color:var(--ac-body,#f1f4f6)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c3cad1)"/></linearGradient></defs>
<ellipse class="kt-glow" cx="46" cy="87" rx="34" ry="7" fill="url(#${g}g)"/>
<path d="M17 82 H75 Q78 82 78 85 V87 Q78 90 74 90 H18 Q14 90 14 87 V85 Q14 82 17 82 Z" fill="#3a4047"/>
<rect class="kt-ring" x="20" y="88" width="52" height="1.4" rx=".7" fill="#ff7043"/>
${steam(13, 20, 17, 20)}
<path d="M64 31 C80 29 84 40 83 53 C82 66 77 73 68 77" fill="none" stroke="${line}" stroke-width="8" stroke-linecap="round"/>
<path d="M64 31 C80 29 84 40 83 53 C82 66 77 73 68 77" fill="none" stroke="url(#${g}b)" stroke-width="6.4" stroke-linecap="round"/>
<path d="M32 33 C25 31.5 19 27 14.6 22.8 Q12.2 21 12.6 24 C14.5 32 20 42 29 50 Z" fill="url(#${g}b)" stroke="${line}" stroke-width=".8" stroke-linejoin="round"/>
<path class="kt-body" d="M32 26 H62 Q66 26 66.6 30 L71.5 76 Q72 82 66 82 H27 Q21 82 21.5 76 L27.4 30 Q28 26 32 26 Z" fill="url(#${g}b)" stroke="${line}" stroke-width=".8"/>
<rect x="57" y="36" width="6.4" height="40" rx="3.2" fill="#e3e9ee" stroke="${line}" stroke-width=".6"/>
<rect x="57.9" y="55" width="4.6" height="20.2" rx="2.3" fill="url(#${g}w)"/>
<path d="M57.2 45 h2 M57.2 55 h2 M57.2 65 h2" stroke="#9aa3ad" stroke-width=".6"/>
${bubbles(60.2, 73)}
<path d="M29.5 26.5 Q47 17 64.5 26.5 Z" style="fill:var(--ac-body,#e8edf1)" stroke="${line}" stroke-width=".8" stroke-linejoin="round"/>
<rect x="42.5" y="16.5" width="9" height="4.4" rx="2.2" fill="#8f98a2"/>
<rect class="kt-led" x="66.5" y="73.6" width="6" height="3" rx="1.5"/>
</svg>`;
}


return {
draw: (cls, ctx) => {
    // No timer and no progress: the drawing is the whole readout.
    const layout = ctx.kettleLayout === "steel" ? "steel" : "classic";
    const lcd = ctx.display ? `<div class="kt-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls} kt-${layout} ${ctx.spinning ? "on" : ""}">
          ${kettleSvg(layout)}${lcd}
        </div>`;
  },
css: () => `
        .kt-svg { position: absolute; left: 0; top: 10px; width: 96px; height: 96px; overflow: visible; }
        .kt-lcd {
          position: absolute; left: 33px; top: 52px; width: 20px; height: 10px; z-index: 2;
          border-radius: 2px; background: #14161a; color: #4b5260; text-align: center;
          font: 600 6.6px/10px ui-monospace, "SF Mono", monospace; overflow: hidden; white-space: nowrap;
        }
        .kt-steel .kt-lcd { left: 34px; top: 56px; }
        .machine.on .kt-lcd { color: #ff7043; }
        .kt-led { fill: #8f98a2; }
        .machine.on .kt-led { fill: #ff7043; filter: drop-shadow(0 0 1.5px #ff7043); }
        /* Heating: the base glows, the water bubbles in the gauge and steam
           leaves the spout. */
        .kt-ring { opacity: 0; transition: opacity 0.4s; }
        .machine.on .kt-ring { opacity: 1; }
        .kt-glow { opacity: 0; }
        .machine.on .kt-glow { opacity: 0.55; animation: kt-glow 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes kt-glow { 50% { opacity: 0.9; } }
        .kt-bub { fill: #fff; opacity: 0; }
        .machine.on .kt-bub { animation: kt-rise 1.5s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on .kt-bub.b2 { animation-delay: calc(-0.55s + var(--anim-offset, 0s)); }
        .machine.on .kt-bub.b3 { animation-delay: calc(-1.1s + var(--anim-offset, 0s)); }
        @keyframes kt-rise {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.95; }
          100% { transform: translateY(-14px); opacity: 0; }
        }
        .kt-steam {
          fill: none; stroke: rgba(150, 165, 180, 0.75); stroke-width: 2.2; stroke-linecap: round; opacity: 0;
          transform-box: fill-box; transform-origin: 50% 100%;
        }
        .machine.on .kt-steam { animation: kt-steam 2.4s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on .kt-steam.s2 { animation-delay: calc(-1.1s + var(--anim-offset, 0s)); }
        @keyframes kt-steam {
          0% { transform: translate(0, 5px) scale(0.7); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translate(-2px, -9px) scale(1.15); opacity: 0; }
        }
  `,
};
}
