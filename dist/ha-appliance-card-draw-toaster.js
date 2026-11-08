// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The toaster drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
// The small screen and the air lines the dehumidifier and the two heaters
// share. Warm air rises; the air a dehumidifier or a fan blows goes the other
// way along the same lines.
const MINI_LCD_CSS = `
        .mini-lcd {
          position: absolute; height: 9px; padding: 0 1.5px; border-radius: 1.5px;
          display: flex; align-items: center; justify-content: center; gap: 1px;
          background: rgba(10, 14, 18, 0.88); color: #7fdcff; text-shadow: 0 0 2px currentColor;
          font: 700 6.5px/9px ui-monospace, "SF Mono", Menlo, monospace;
        }
        .mini-lcd svg { width: 7px; height: 7px; flex: none; fill: currentColor; }
        .mini-lcd span:empty { display: none; }
        .machine.mode-off .mini-lcd { display: none; }
        .air-flow { position: absolute; display: none; overflow: visible; }
        .air-flow path {
          fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 5;
          animation: air-up 1.4s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .air-flow path:nth-child(2) { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .air-flow path:nth-child(3) { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .air-flow.down path { animation-name: air-down; }
        @keyframes air-up { to { stroke-dashoffset: -18; } }
        @keyframes air-down { to { stroke-dashoffset: 18; } }
`;
// Three wavy lines, drawn from the bottom up.
function airFlow(cls, w, h, down) {
  const line = (x) => `<path d="M${x} ${h} C${x - w * 0.1} ${h * 0.66} ${x + w * 0.1} ${h * 0.33} ${x} 0"/>`;
  return `<svg class="air-flow ${cls} ${down ? "down" : ""}" viewBox="0 0 ${w} ${h}">${line(w * 0.25)}${line(w * 0.5)}${line(w * 0.75)}</svg>`;
}

function toasterHtml(cls, tp) {
  const L = TOASTER_LAYOUTS[tp.layout] || TOASTER_LAYOUTS.two;
  const box = (c, x, y, w, h, r) => `<div class="${c}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px;${r ? ` border-radius: ${r};` : ""}"></div>`;
  const [ax, ay, aw, ah] = L.air;
  return `
        <div class="machine ${cls} tp-${tp.layout || "two"} mode-${tp.mode || "off"}">
          <div style="position: absolute; left: ${ax}px; top: ${ay}px; width: ${aw}px; height: ${ah}px">${airFlow("tp-air", aw, ah, false).replace("<svg ", '<svg style="width: 100%; height: 100%" ')}</div>
          ${box("tp-top", ...L.top)}${box("tp-face", ...L.face, "3px 3px 9px 9px")}
          ${L.slots.map(([x, y, w]) => box("tp-slot", x, y, w, 3.5)).join("")}
          ${L.toasts.map(([c, x, y, w, h]) => box(`tp-toast${c ? ` ${c}` : ""}`, x, y, w, h)).join("")}
          ${L.levers.map(([x, up, low]) => `${box("tp-track", x + 3.7, up + 1, 2.5, low - up + 3)}<div class="tp-lever" style="left: ${x}px; top: ${up}px; --tp-low: ${low}px"></div>`).join("")}
          ${L.dials.map(([x, y, d]) => box("tp-dial", x, y, d, d)).join("")}
          ${L.btns.map(([x, y]) => `<div class="tp-btn" style="left: ${x}px; top: ${y}px"></div>`).join("")}
          <div class="tp-led" style="left: ${L.led[0]}px; top: ${L.led[1]}px"></div>
          ${box("tp-tray", L.tray[0], L.tray[1], L.tray[2], 2)}
          ${L.feet.map((x) => `<div class="tp-foot" style="left: ${x}px"></div>`).join("")}
        </div>`;
}


return {
draw: (cls, ctx) => toasterHtml(cls, ctx.toaster || {}),
css: () => `${MINI_LCD_CSS}
        .tp-top, .tp-face, .tp-slot, .tp-toast, .tp-track, .tp-lever, .tp-dial, .tp-btn, .tp-led, .tp-tray, .tp-foot { position: absolute; }
        .tp-top { z-index: 2; background: linear-gradient(180deg, var(--ac-body, #eceff1), var(--ac-body-hi, #ffffff) 70%); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14); }
        .tp-face {
          z-index: 2; background: linear-gradient(180deg, var(--ac-body-hi, #ffffff), var(--ac-body, #eceff1) 45%, var(--ac-body-lo, #cfd6db));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14), 0 2px 3px rgba(0, 0, 0, 0.12);
        }
        .tp-slot { z-index: 3; height: 3.5px; border-radius: 2px; background: linear-gradient(180deg, #0b0d10, #2c3137); box-shadow: inset 0 1px 1px #000; }
        .machine.mode-toasting .tp-slot {
          background: linear-gradient(180deg, #ffb74d, #e64a19); box-shadow: 0 0 4px #ff7043;
          animation: tp-glow 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .tp-toast {
          z-index: 4; display: none; border-radius: 45% 45% 3px 3px / 35% 35% 3px 3px;
          background: radial-gradient(ellipse at 50% 55%, #e8b06a 0 40%, #c98443 72%, #93521f 100%); box-shadow: inset 0 0 0 1.5px #7c4219;
        }
        .tp-toast.back { filter: brightness(0.88); }
        .machine.mode-done .tp-toast { display: block; animation: tp-pop 0.55s cubic-bezier(0.3, 1.7, 0.6, 1) both; animation-delay: var(--anim-offset, 0s); }
        .tp-track { z-index: 3; width: 2.5px; border-radius: 1.5px; background: rgba(0, 0, 0, 0.45); }
        .tp-lever { z-index: 4; width: 10px; height: 5px; border-radius: 2px; background: linear-gradient(#e3e8eb, #8a99a3); box-shadow: 0 1px 1px rgba(0, 0, 0, 0.45); }
        .machine.mode-toasting .tp-lever { top: var(--tp-low) !important; }
        .tp-dial { z-index: 3; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ffffff, #b7c1c7 70%); box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(0, 0, 0, 0.2); }
        .tp-dial::after {
          content: ""; position: absolute; left: 50%; top: 1.5px; width: 1.4px; height: 42%; border-radius: 1px; background: #455a64;
          transform: translateX(-50%) rotate(40deg); transform-origin: 50% 100%;
        }
        .tp-btn { z-index: 3; width: 8px; height: 4px; border-radius: 2px; background: rgba(0, 0, 0, 0.18); }
        .tp-led { z-index: 3; width: 3px; height: 3px; border-radius: 50%; background: rgba(0, 0, 0, 0.25); }
        .machine.mode-idle .tp-led { background: #4db6ac; box-shadow: 0 0 3px #4db6ac; }
        .machine.mode-toasting .tp-led { background: #ff7043; box-shadow: 0 0 3px #ff7043; }
        .machine.mode-done .tp-led { background: #66bb6a; box-shadow: 0 0 3px #66bb6a; }
        .tp-tray { z-index: 3; height: 2px; border-radius: 1px; background: rgba(0, 0, 0, 0.28); }
        .tp-foot { z-index: 1; top: 93px; width: 8px; height: 4px; border-radius: 0 0 3px 3px; background: #2b2f33; }
        .machine.mode-toasting .air-flow { display: block; }
        .air-flow path { stroke: #ff7043; }
        @keyframes tp-glow { 50% { opacity: 0.6; } }
        @keyframes tp-pop { from { transform: translateY(20px); } to { transform: none; } }
  `,
};
}
