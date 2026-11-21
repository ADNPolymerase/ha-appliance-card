// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The scale drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing(deps) {
// A page still running the card of an earlier release: an arrow to reload.
if (!deps || deps.__v !== "4.43.0") return { draw: () => '<div class="machine" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.5">\u21bb</div>', css: "" };
let { BATTERY_LAYOUTS, CAMERA_LAYOUTS, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntFlake, ntTint, numberOrNull, shdBlur, t, thsColor, zoneColumns } = deps;
const softShadow = (cx, cy, rx, ry, op = .26, b = 1.6) => { const id = `shd-${cx}-${cy}-${rx}`.replace(/\./g, "_"); return `${shdBlur(id, b)}<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// A bathroom scale in perspective: its glass top, the two pads the feet go
// on, and the screen with the last weight. The screen glows for an hour after
// a weighing, green with a tick once the goal is reached.
function scaleHtml(cls, s) {
  const mode = s.mode || "unav";
  return `
        <div class="machine ${cls} sc sc-m-${mode}${s.fresh ? " sc-fresh" : ""}"><svg class="sc-svg" viewBox="0 0 96 108">
<defs><linearGradient id="sc-g-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset="1" stop-color="#d5dbe1"/></linearGradient>
<linearGradient id="sc-g-edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aab3bc"/><stop offset="1" stop-color="#7d8790"/></linearGradient></defs>
${softShadow(48, 97.4, 35.2, 3.8, 0.32)}
<path d="M6 88 H90 V92 Q90 95 87 95 H9 Q6 95 6 92 Z" fill="url(#sc-g-edge)"/>
<path d="M20 50 Q21 46 25 46 H71 Q75 46 76 50 L90 86 Q91 89 87 89 H9 Q5 89 6 86 Z" fill="url(#sc-g-glass)" stroke="#b9c1ca" stroke-width=".6"/>
<path d="M25 48 H42 L28 86 H12 Z" fill="#fff" opacity=".35"/>
<ellipse class="sc-pad" cx="33" cy="76" rx="9" ry="6.5"/><ellipse class="sc-pad" cx="63" cy="76" rx="9" ry="6.5"/>
<rect x="25" y="50" width="46" height="16" rx="2" fill="#0e1b2c" stroke="#27394f" stroke-width=".4"/>
<path class="sc-check" d="M28 58 l2 2 l4 -4.5" fill="none" stroke="#7ee08a" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<text class="sc-lcd" x="47" y="62">${s.text || "--"}</text><text class="sc-unit" x="69" y="62">${s.unit || ""}</text>
</svg></div>`;
}


return {
draw: (cls, ctx) => scaleHtml(cls, ctx.scale || {}),
css: () => `
        svg.sc-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .sc-lcd{fill:#9fb7cc;font:700 11px/1 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;letter-spacing:-0.2px;text-anchor:middle}
        .sc-unit{fill:#9fb7cc;font:600 6px/1 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;text-anchor:end}
        .sc-fresh .sc-lcd, .sc-fresh .sc-unit { fill: #7fe3ff; animation: sc-glow 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .sc-m-goal .sc-lcd, .sc-m-goal .sc-unit { fill: #7ee08a; }
        .sc-check{opacity:0}
        .sc-m-goal .sc-check{opacity:1}
        .sc-pad{fill:rgba(60,70,80,.07)}
        .sc-fresh .sc-pad { fill: rgba(79,195,247,.2); animation: sc-glow 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.sc-m-unav{opacity:.45;filter:grayscale(1)}
        .sc-m-unav .sc-lcd{fill:#3b4a5c}
        @keyframes sc-glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @media (prefers-reduced-motion: reduce) { .machine.sc * { animation-name: none !important; } }
  `,
};
}
