// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The air_fryer drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// The unit's own screen shows the mode by a symbol next to the setpoint: the
// Material Design icons Home Assistant itself uses for them.
const AC_ICONS = {
  cool: "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",
  heat: "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",
  dry: "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  fan: "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",
  auto: "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
  sun: "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13",
  moon: "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95Z",
  rocket: "M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46Z",
  laundry: "M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21",
  shake: "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z",
  pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
  check: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  clock: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
  warm: "M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2Z",
};
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
function miniLcd(cls, icon, text) {
  const svg = AC_ICONS[icon] ? `<svg viewBox="0 0 24 24"><path d="${AC_ICONS[icon]}"/></svg>` : "";
  return `<div class="mini-lcd ${cls}">${svg}<span>${esc(text || "")}</span></div>`;
}
// Three wavy lines, drawn from the bottom up.
function airFlow(cls, w, h, down) {
  const line = (x) => `<path d="M${x} ${h} C${x - w * 0.1} ${h * 0.66} ${x + w * 0.1} ${h * 0.33} ${x} 0"/>`;
  return `<svg class="air-flow ${cls} ${down ? "down" : ""}" viewBox="0 0 ${w} ${h}">${line(w * 0.25)}${line(w * 0.5)}${line(w * 0.75)}</svg>`;
}

// Which way a basket is drawn: cooking hot, keeping warm, ready, pulled out
// or resting.
function fryerZoneOf(mode) {
  if (["preheating", "cooking", "shake"].includes(mode)) return "hot";
  if (mode === "keep_warm") return "warm";
  if (mode === "done" || mode === "preheated") return "ready";
  if (mode === "basket_out") return "out";
  return "off";
}


return {
draw: (cls, ctx) => {
    const f = ctx.fryer || {};
    const mode = f.mode || "off";
    const layout = f.layout || "basket";
    const z1 = fryerZoneOf(mode);
    const z2 = fryerZoneOf(f.mode2 || mode);
    // A dual fryer is on as long as one of its baskets is.
    const shown = layout === "dual" && mode === "off" ? f.mode2 || "off" : mode;
    const drawer = (n, inner) => `<div class="af-gap g${n}"></div>`
      + `<div class="af-drawer d${n}">${inner}<div class="af-handle"><div class="af-btn"></div></div></div>`;
    const top = `<div class="af-body"></div><div class="af-vent"></div>${miniLcd("af-lcd", f.icon, f.screen)}`;
    const feet = `<div class="af-foot f1"></div><div class="af-foot f2"></div>`;
    if (layout === "dual") {
      return `
        <div class="machine ${cls} af-dual mode-${shown} z1-${z1} z2-${z2}">
          ${airFlow("af-air a1", 34, 22, false)}${airFlow("af-air a2", 34, 22, false)}
          ${top}<div class="af-vent v2"></div>
          <div class="af-led l1"></div><div class="af-led l2"></div>
          <div class="af-seam s1"></div><div class="af-seam s2"></div>
          ${drawer(1, `<div class="af-zn">1</div>`)}${drawer(2, `<div class="af-zn">2</div>`)}
          <div class="af-div"></div>${feet}
        </div>`;
    }
    const win = layout === "window"
      ? `<div class="af-win"><div class="af-glow"></div><div class="af-coil"></div><div class="af-fries"><i></i><i></i><i></i><i></i><i></i></div></div>`
      : "";
    return `
        <div class="machine ${cls} af-${layout} mode-${mode} z1-${z1}">
          ${airFlow("af-air a1", 40, 22, false)}
          ${top}<div class="af-led l1"></div><div class="af-seam s1"></div>
          ${drawer(1, win)}${feet}
        </div>`;
  },
css: () => `${MINI_LCD_CSS}
        .machine .mini-lcd { color: #ffab76; }
        .machine.mode-keep_warm .mini-lcd, .machine.z1-warm .mini-lcd { color: #ffd54f; }
        .machine.mode-done .mini-lcd, .machine.mode-preheated .mini-lcd { color: #81c784; }
        .machine.mode-delayed .mini-lcd { color: #ce93d8; }
        .machine.mode-paused .mini-lcd, .machine.mode-basket_out .mini-lcd, .machine.mode-shake .mini-lcd { color: #ffb74d; }
        .machine.mode-error .mini-lcd { display: none; }
        .af-body {
          position: absolute; border-radius: 16px 16px 7px 7px;
          background: linear-gradient(90deg, var(--ac-body-lo, #1f2327), var(--ac-body-hi, #4a5158) 30%, var(--ac-body, #34393e) 70%, var(--ac-body-lo, #1f2327));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18);
        }
        .af-vent { position: absolute; height: 4px; border-radius: 2px; background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.45) 0 1.2px, transparent 1.2px 3px); }
        .af-seam { position: absolute; height: 1.5px; background: rgba(0, 0, 0, 0.35); }
        .af-drawer {
          position: absolute; border-radius: 3px 3px 8px 8px; transform-origin: 50% 0;
          background: linear-gradient(90deg, var(--ac-body-lo, #1f2327), var(--ac-body, #34393e) 35%, var(--ac-body-hi, #4a5158) 60%, var(--ac-body-lo, #1f2327));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
        }
        .af-handle { position: absolute; border-radius: 3px; background: linear-gradient(180deg, #5f666e, #2b3036); box-shadow: 0 1px 1px rgba(0, 0, 0, 0.35); }
        .af-btn { position: absolute; width: 5px; height: 2px; border-radius: 1px; background: #90a4ae; }
        .af-foot { position: absolute; bottom: 5px; width: 9px; height: 3px; border-radius: 0 0 3px 3px; background: #1d2126; }
        .af-led { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: rgba(0, 0, 0, 0.25); }
        .af-gap { position: absolute; background: #0f1215; display: none; border-radius: 2px; }
        .af-air path { stroke: #ff8a65; }
        /* One basket: the whole machine says what it does. */
        .machine.z1-hot .af-seam.s1, .machine.z2-hot .af-seam.s2 { background: #ff7043; box-shadow: 0 0 3px #ff7043; animation: af-pulse 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.z1-warm .af-seam.s1, .machine.z2-warm .af-seam.s2 { background: #ffb300; box-shadow: 0 0 2px #ffb300; }
        .machine.z1-hot .af-air.a1, .machine.z2-hot .af-air.a2, .machine.z1-warm .af-air.a1, .machine.z2-warm .af-air.a2 { display: block; }
        .machine.z1-warm .af-air.a1 path, .machine.z2-warm .af-air.a2 path { stroke: #ffca28; animation-duration: 2.6s; opacity: 0.7; }
        .machine.mode-preheating .af-air path { animation-duration: 2s; opacity: 0.8; }
        .machine.z1-hot .af-led.l1, .machine.z2-hot .af-led.l2 { background: #ff7043; box-shadow: 0 0 3px #ff7043; }
        .machine.z1-warm .af-led.l1, .machine.z2-warm .af-led.l2 { background: #ffb300; box-shadow: 0 0 3px #ffb300; }
        .machine.z1-ready .af-led.l1, .machine.z2-ready .af-led.l2 { background: #66bb6a; box-shadow: 0 0 3px #66bb6a; animation: af-blink 1.2s steps(2) infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.z1-out .af-gap.g1, .machine.z2-out .af-gap.g2 { display: block; }
        .machine.z1-out .af-drawer.d1, .machine.z2-out .af-drawer.d2 { transform: translateY(5px) scale(1.07); filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.35)); }
        .machine.mode-shake .af-drawer.d1 { animation: af-shake 1s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }

        .af-basket .af-body { left: 21px; right: 21px; top: 20px; bottom: 9px; }
        .af-basket .af-vent { left: 34px; right: 34px; top: 24px; }
        .af-basket .mini-lcd { left: 36px; top: 31px; min-width: 22px; }
        .af-basket .af-led { left: 46.5px; top: 43px; }
        .af-basket .af-seam { left: 21px; right: 21px; top: 52px; }
        .af-basket .af-gap { left: 23px; right: 23px; top: 52px; height: 6px; }
        .af-basket .af-drawer { left: 21px; right: 21px; top: 53px; bottom: 9px; }
        .af-basket .af-handle { left: 15px; width: 24px; top: 13px; height: 13px; }
        .af-basket .af-btn { left: 9.5px; top: 1.5px; }
        .af-basket .af-foot.f1, .af-window .af-foot.f1 { left: 25px; }
        .af-basket .af-foot.f2, .af-window .af-foot.f2 { right: 25px; }
        .af-basket .af-air, .af-window .af-air { left: 28px; top: -1px; width: 40px; height: 22px; }

        .af-window .af-body { left: 20px; right: 20px; top: 18px; bottom: 9px; }
        .af-window .af-vent { left: 34px; right: 34px; top: 22px; }
        .af-window .mini-lcd { left: 36px; top: 29px; min-width: 22px; }
        .af-window .af-led { left: 46.5px; top: 40px; }
        .af-window .af-seam { left: 20px; right: 20px; top: 47px; }
        .af-window .af-gap { left: 22px; right: 22px; top: 47px; height: 6px; }
        .af-window .af-drawer { left: 20px; right: 20px; top: 48px; bottom: 9px; }
        .af-window .af-handle { left: 12px; width: 32px; top: 33px; height: 7px; }
        .af-window .af-btn { left: 13.5px; top: 1px; }
        .af-win { position: absolute; left: 7px; right: 7px; top: 4px; height: 25px; border-radius: 5px; overflow: hidden; background: #15181c; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15); }
        .af-glow { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse at 50% 10%, #ffb74d, #ff7043 40%, rgba(120, 30, 10, 0.6) 75%, transparent); }
        .machine.z1-hot .af-glow { opacity: 1; animation: af-pulse 2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.z1-warm .af-glow { opacity: 0.55; background: radial-gradient(ellipse at 50% 10%, #ffd54f, #ffb300 45%, transparent 80%); }
        .af-coil { position: absolute; left: 4px; right: 4px; top: 2px; height: 2px; border-radius: 1px; background: #5d4037; }
        .machine.z1-hot .af-coil { background: #ff5722; box-shadow: 0 0 3px #ff5722; }
        .af-fries { position: absolute; left: 4px; right: 4px; bottom: 2px; height: 12px; }
        .af-fries i { position: absolute; bottom: 0; width: 3px; height: 10px; border-radius: 1px; background: linear-gradient(180deg, #ffe082, #f9a825); }
        .af-fries i:nth-child(1) { left: 4px; }
        .af-fries i:nth-child(2) { left: 9px; height: 8px; }
        .af-fries i:nth-child(3) { left: 14px; }
        .af-fries i:nth-child(4) { left: 19px; height: 9px; }
        .af-fries i:nth-child(5) { left: 24px; height: 7px; }
        .machine.z1-ready .af-fries i, .machine.z1-warm .af-fries i { background: linear-gradient(180deg, #ffcc80, #e08a1e); }
        .machine.mode-cooking .af-fries i { animation: af-toss 0.9s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-cooking .af-fries i:nth-child(2) { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .machine.mode-cooking .af-fries i:nth-child(3) { animation-delay: calc(-0.6s + var(--anim-offset, 0s)); }
        .machine.mode-cooking .af-fries i:nth-child(4) { animation-delay: calc(-0.15s + var(--anim-offset, 0s)); }
        .machine.mode-cooking .af-fries i:nth-child(5) { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }

        .af-dual .af-body { left: 6px; right: 6px; top: 30px; bottom: 9px; border-radius: 12px 12px 6px 6px; }
        .af-dual .af-vent { left: 14px; width: 20px; top: 34px; }
        .af-dual .af-vent.v2 { left: auto; right: 14px; }
        .af-dual .mini-lcd { left: 37px; top: 33px; min-width: 22px; }
        .af-dual .af-seam { top: 52px; width: 40px; }
        .af-dual .af-seam.s1, .af-dual .af-drawer.d1, .af-dual .af-gap.g1 { left: 6px; }
        .af-dual .af-seam.s2, .af-dual .af-drawer.d2, .af-dual .af-gap.g2 { right: 6px; }
        .af-dual .af-gap { top: 52px; width: 38px; height: 6px; }
        .af-dual .af-drawer { top: 53px; bottom: 9px; width: 40px; }
        .af-div { position: absolute; left: 47.25px; top: 52px; bottom: 9px; width: 1.5px; background: rgba(0, 0, 0, 0.35); }
        .af-dual .af-handle { left: 9px; width: 22px; top: 11px; height: 12px; }
        .af-dual .af-btn { left: 8.5px; top: 1.5px; }
        .af-zn { position: absolute; left: 18px; top: 3px; font: 700 5px/6px sans-serif; color: rgba(140, 146, 152, 0.9); }
        .af-dual .af-led { top: 47px; }
        .af-dual .af-led.l1 { left: 24.5px; }
        .af-dual .af-led.l2 { right: 24.5px; }
        .af-dual .af-foot.f1 { left: 12px; }
        .af-dual .af-foot.f2 { right: 12px; }
        .af-dual .af-air { top: 9px; width: 34px; height: 22px; }
        .af-dual .af-air.a1 { left: 7px; }
        .af-dual .af-air.a2 { right: 7px; }
        @keyframes af-pulse { 50% { opacity: 0.35; } }
        @keyframes af-blink { 50% { opacity: 0.2; } }
        @keyframes af-shake { 0%, 100% { transform: rotate(0); } 20% { transform: rotate(-4deg); } 40% { transform: rotate(4deg); } 60% { transform: rotate(-3deg); } 80% { transform: rotate(3deg); } }
        @keyframes af-toss { 0%, 100% { transform: translateY(0) rotate(0); } 30% { transform: translateY(-3px) rotate(25deg); } 60% { transform: translateY(-1px) rotate(-15deg); } }
  `,
};
}
