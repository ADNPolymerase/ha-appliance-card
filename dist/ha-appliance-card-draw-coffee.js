// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The coffee drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// Five appliances drawn in volume: a cooker with a clear jug, a Japanese rice
// cooker, a wall boiler (or one with a burner window), a bean-to-cup coffee
// machine (silver, or black and chrome) and a towel warmer (a white ladder, or
// flat anthracite panels). The ids carry a number of their own, as each card
// draws its gradients again; the words on their screens stay in HTML.
let drawN = 0;
const svgGrad = (id, stops, x2 = 1, y2 = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" style="stop-color:${c}"/>`).join("")}</linearGradient>`;
// A soft shadow on the floor with a contact line, so the appliance stands
// on it rather than floating above it.
const svgFloor = (g, cx, rx, cy) => `<radialGradient id="${g}o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".7" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="url(#${g}o)"/><path d="M${cx - rx + 6} ${cy + 0.4} H${cx + rx - 6}" stroke="rgba(0,0,0,.16)" stroke-width="1.2" stroke-linecap="round"/>`;
const svgWisp = (cls, x, y) => `<path class="${cls}" d="M${x} ${y} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`;
function coffeeCup(x, y, n) {
  const c = x + 6.5;
  return `<g class="cf-cup c${n}"><ellipse cx="${c}" cy="${y + 15.3}" rx="7.4" ry="1.7" fill="#e9edf0" stroke="#b9c1c8" stroke-width=".5"/>
<path d="M${x + 13} ${y + 3.5} q4 0 4 4 q0 4 -4 4" fill="none" stroke="#c3cad1" stroke-width="1.4"/>
<path d="M${x} ${y + 1.2} L${x + 1.5} ${y + 13} Q${x + 2} ${y + 15} ${x + 4} ${y + 15} H${x + 9} Q${x + 11} ${y + 15} ${x + 11.5} ${y + 13} L${x + 13} ${y + 1.2} Z" fill="#fafafa" stroke="#c3cad1" stroke-width=".6"/>
<path class="cf-fill" d="M${x + 1.2} ${y + 3} H${x + 11.8} L${x + 11} ${y + 12.5} Q${x + 10.6} ${y + 14} ${x + 9} ${y + 14} H${x + 4} Q${x + 2.4} ${y + 14} ${x + 2} ${y + 12.5} Z" fill="#6d4126"/>
<path d="M${x + 2.2} ${y + 4} Q${x + 2.8} ${y + 9} ${x + 3.6} ${y + 12.6}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width=".9" stroke-linecap="round"/>
<ellipse cx="${c}" cy="${y + 1.2}" rx="6.5" ry="1.6" fill="#d7dde2" stroke="#c3cad1" stroke-width=".6"/>
<ellipse class="cf-crema" cx="${c}" cy="${y + 1.5}" rx="5.4" ry="1.15" fill="#b07a4f"/>
${svgWisp(`cf-steam p${n}`, x + 6, y - 1)}</g>`;
}
function coffeeWater(x, top, w, h, pct) {
  const p = pct === null || pct === undefined ? 62 : Math.max(4, Math.min(100, pct));
  const fh = Math.round(h * p) / 100;
  return `<rect class="cf-water" x="${x}" y="${(top + h - fh).toFixed(2)}" width="${w}" height="${fh.toFixed(2)}" rx="1.5" data-pct="${pct === null || pct === undefined ? "" : Math.round(p)}"/>`;
}
// The cavity the coffee runs into, drawn with its back and side walls so it
// reads as a hollow rather than a dark patch, and the drip tray on its floor.
function coffeeBay(g, l, t, r, b, wall, tray) {
  const d = 5;
  return `<path d="M${l} ${t} H${r} V${b} H${l} Z" fill="url(#${g}k)"/>
<path d="M${l} ${t} L${l + d} ${t + 4} V${b - 4} L${l} ${b} Z" fill="${wall}"/><path d="M${r} ${t} L${r - d} ${t + 4} V${b - 4} L${r} ${b} Z" fill="${wall}" opacity=".7"/>
<path d="M${l} ${t} H${r} L${r - d} ${t + 4} H${l + d} Z" fill="rgba(0,0,0,.45)"/>
<path class="cf-tray" d="M${l + d} ${b - 4} H${r - d} L${r} ${b} H${l} Z"/>
<path d="M${l + d + 3} ${b - 2.4} H${r - d - 3} M${l + d + 1} ${b - 0.9} H${r - d - 1}" stroke="rgba(0,0,0,.35)" stroke-width=".5" stroke-dasharray="1.6 1.6"/>
${tray}`;
}
function coffeeSvg(layout, two, pct) {
  const g = `dw${drawN++}`;
  const beans = (x, y) => `<g class="cf-beans">${[0, 1, 2].map((i) => `<ellipse class="cf-bean b${i + 1}" cx="${x + i * 6}" cy="${y}" rx="2.2" ry="1.5"/>`).join("")}</g>`;
  const water = `${svgGrad(`${g}h`, [[0, "#a4dcf9"], [1, "#3b9fd8"]], 0, 1)}${svgGrad(`${g}k`, [[0, "#050607"], [0.55, "#1a1d21"], [1, "#2a2e33"]], 0, 1)}${svgGrad(`${g}d`, [[0, "rgba(60,40,30,.75)"], [1, "rgba(25,20,18,.55)"]], 0, 1)}`;
  if (layout === "black") {
    const cups = two
      ? `<path class="cf-stream p1" d="M41.5 56 V73"/><path class="cf-stream p2" d="M54.5 56 V73"/>${coffeeCup(34.5, 71, 1)}${coffeeCup(48.5, 71, 2)}`
      : `<path class="cf-stream p1" d="M46 56 V73"/><path class="cf-stream p2" d="M50 56 V73"/>${coffeeCup(41.5, 71, 1)}`;
    return `<svg class="cf-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}b`, [[0, "#14161a"], [0.5, "#2c3136"], [1, "#101215"]])}${svgGrad(`${g}c`, [[0, "#6c757d"], [0.25, "#e9edf0"], [0.5, "#aeb6bd"], [0.75, "#f1f3f4"], [1, "#6c757d"]])}${water}</defs>
${svgFloor(g, 48, 37, 101)}
<rect class="cf-tank" x="80" y="30" width="6" height="58" rx="2" fill="rgba(200,228,245,.5)" stroke="#9fb6c6" stroke-width=".7"/>
${coffeeWater(81, 31, 4, 56, pct).replace("<rect", `<rect fill="url(#${g}h)"`)}
<rect x="19" y="98" width="7" height="3.4" rx="1.2" fill="#0a0b0d"/><rect x="70" y="98" width="7" height="3.4" rx="1.2" fill="#0a0b0d"/>
<path d="M16 98 V16 Q16 8 24 8 H72 Q80 8 80 16 V98 Q80 101 77 101 H19 Q16 101 16 98 Z" fill="url(#${g}b)"/>
<path d="M19 12 Q19.4 9.6 23 9.4 H73 Q76.6 9.6 77 12" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1"/>
<path d="M29 8.4 Q30.4 1.8 48 1.4 Q65.6 1.8 67 8.4 Z" fill="url(#${g}d)" stroke="rgba(255,255,255,.18)" stroke-width=".6"/>${beans(42, 6)}
<path d="M33 5 Q38 2.8 45 2.6" fill="none" stroke="rgba(255,255,255,.45)" stroke-width=".8" stroke-linecap="round"/>
<rect x="22" y="12" width="52" height="30" rx="5" fill="url(#${g}c)"/>
<path d="M25 13 H71" stroke="rgba(255,255,255,.8)" stroke-width=".8" stroke-linecap="round"/>
<circle cx="48" cy="26" r="10" fill="#0d0f12" stroke="#3d434a" stroke-width=".8"/>
<circle class="cf-key k1" cx="30" cy="20" r="2.2"/><circle class="cf-key k2" cx="30" cy="32" r="2.2"/><circle class="cf-key k3 cf-alert" cx="66" cy="20" r="2.2"/><circle class="cf-key k4" cx="66" cy="32" r="2.2"/>
${coffeeBay(g, 22, 46, 74, 88, "#24282d", "")}
<rect x="38" y="46" width="20" height="10" rx="3" fill="url(#${g}c)"/>
<path d="M40 47 H56" stroke="rgba(255,255,255,.8)" stroke-width=".6"/>
${cups}
<rect x="20" y="88" width="56" height="7" rx="2" fill="url(#${g}c)"/><path d="M22 89 H74" stroke="rgba(255,255,255,.75)" stroke-width=".6"/>
<path class="cf-warn cf-warn-b" d="M27.4 9.2 Q29 0.2 48 -0.2 Q67 0.2 68.6 9.2 Z"/><rect class="cf-warn cf-warn-w" x="79" y="29" width="8" height="60" rx="2.5"/><rect class="cf-warn cf-warn-t" x="19" y="83" width="58" height="13" rx="3"/></svg>`;
  }
  const cups = two
    ? `<path class="cf-stream p1" d="M39.5 50 V72"/><path class="cf-stream p2" d="M54.5 50 V72"/>${coffeeCup(33, 70, 1)}${coffeeCup(48, 70, 2)}`
    : `<path class="cf-stream p1" d="M45.5 50 V72"/><path class="cf-stream p2" d="M49.5 50 V72"/>${coffeeCup(41, 70, 1)}`;
  return `<svg class="cf-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}s`, [[0, "var(--ac-body-lo,#8f98a2)"], [0.3, "var(--ac-body-hi,#e9edf0)"], [0.6, "var(--ac-body,#c3cad1)"], [1, "var(--ac-body-lo,#7d868f)"]])}${water}</defs>
${svgFloor(g, 48, 40, 100.6)}
<rect class="cf-tank" x="80" y="22" width="10" height="68" rx="2.5" fill="rgba(200,228,245,.5)" stroke="#9fb6c6" stroke-width=".8"/>
${coffeeWater(81.5, 23.5, 7, 65, pct).replace("<rect", `<rect fill="url(#${g}h)"`)}
<path d="M82.6 26 V86" stroke="rgba(255,255,255,.7)" stroke-width=".8" stroke-linecap="round"/>
<rect x="15" y="97" width="7" height="3.6" rx="1.2" fill="#4a5158"/><rect x="72" y="97" width="7" height="3.6" rx="1.2" fill="#4a5158"/>
<path d="M12 96 V18 Q12 12 18 12 H76 Q82 12 82 18 V96 Q82 99 78 99 H16 Q12 99 12 96 Z" fill="url(#${g}s)" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
<path d="M15 15 Q15.4 13 18 13 H76 Q78.6 13 79 15" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1"/>
<path d="M14.6 20 V92" stroke="rgba(255,255,255,.55)" stroke-width="1.2" stroke-linecap="round"/>
<path d="M17 12.4 Q18 4.2 34 3.8 Q50 4.2 51 12.4 Z" fill="url(#${g}d)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>${beans(28, 9.4)}
<path d="M21 9 Q25 6 32 5.4" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".8" stroke-linecap="round"/>
<rect x="18" y="16" width="58" height="16" rx="3" fill="#20242a"/>
<path d="M20 17 H74" stroke="rgba(255,255,255,.18)" stroke-width=".7"/>
<rect x="22" y="19" width="22" height="10" rx="2" fill="#0d0f12"/>
<circle class="cf-key k1" cx="52" cy="24" r="2.6"/><circle class="cf-key k2" cx="60" cy="24" r="2.6"/><circle class="cf-key k3 cf-alert" cx="68" cy="24" r="2.6"/>
${coffeeBay(g, 18, 38, 76, 88, "#2b2f34", "")}
<rect x="34" y="38" width="26" height="9" rx="2" fill="url(#${g}s)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="${two ? 38 : 44}" y="46" width="3" height="4" rx="1" fill="#8f98a2"/><rect x="${two ? 53 : 48}" y="46" width="3" height="4" rx="1" fill="#8f98a2"/>
${cups}
<rect x="16" y="88" width="62" height="7" rx="2" fill="url(#${g}s)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<path d="M18 89 H76" stroke="rgba(255,255,255,.7)" stroke-width=".6"/>
<path class="cf-warn cf-warn-b" d="M15.4 13.2 Q16.6 2.6 34 2.2 Q51.4 2.6 52.6 13.2 Z"/><rect class="cf-warn cf-warn-w" x="79" y="21" width="12" height="70" rx="3"/><rect class="cf-warn cf-warn-t" x="15" y="83" width="64" height="13" rx="3"/></svg>`;
}


return {
draw: (cls, ctx) => {
    const layout = ctx.coffeeLayout === "black" ? "black" : "silver";
    const flags = [
      `cf-l-${layout}`,
      ctx.spinning ? "pouring" : "",
      ctx.noWater ? "no-water" : "",
      ctx.noBeans ? "no-beans" : "",
      ctx.trayFull ? "tray-full" : "",
      ctx.cups >= 2 ? "two-cups" : "",
      `st${ctx.strength || 3}`,
    ].filter(Boolean).join(" ");
    return `
        <div class="machine ${cls} ${flags}">${coffeeSvg(layout, ctx.cups >= 2, ctx.waterPct)}${ctx.display ? `<div class="cf-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },
css: (color) => `
        svg.cf-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .cf-disp {
          position: absolute; left: 22px; top: 19px; width: 22px; height: 10px; border-radius: 2px;
          color: ${color}; text-align: center; overflow: hidden; white-space: nowrap;
          font: 600 6px/10px ui-monospace, "SF Mono", monospace;
        }
        .cf-l-black .cf-disp { left: 39px; top: 21px; width: 18px; border-radius: 4px; }
        .cf-bean { fill: #8d6e63; }
        /* Empty hopper: the beans stay, greyed, so the drawing still reads as a
           bean machine rather than losing a part. */
        .machine.no-beans .cf-bean { fill: var(--disabled-text-color, #9e9e9e); opacity: 0.35; }
        /* Strength shows as how full the hopper looks. */
        .machine.st1 .cf-bean.b2, .machine.st1 .cf-bean.b3 { display: none; }
        .machine.st2 .cf-bean.b3 { display: none; }
        .cf-key { fill: #4a5158; }
        .machine.pouring .cf-key.k2 { fill: ${color}; }
        .cf-water { transform-box: fill-box; transform-origin: 50% 100%; transition: transform 0.6s; }
        .machine.no-water .cf-water { transform: scaleY(0.12); fill: var(--warning-color, #ff9800); opacity: 0.7; }
        .cf-stream { fill: none; stroke: #6d4c41; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 3 3; opacity: 0; }
        .machine.pouring .cf-stream { opacity: 0.95; animation: cf-pour 0.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.pouring .cf-stream.p2 { animation-delay: calc(-0.2s + var(--anim-offset, 0s)); }
        @keyframes cf-pour {
          0% { stroke-dashoffset: 6; }
          100% { stroke-dashoffset: 0; }
        }
        .cf-fill { transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(0); transition: transform 0.6s linear; }
        .machine.pouring .cf-fill { transform: scaleY(0.62); }
        .cf-steam { fill: none; stroke: rgba(150, 165, 180, 0.7); stroke-width: 2; stroke-linecap: round; opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; }
        .machine.pouring .cf-steam { animation: cf-wisp 2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.pouring .cf-steam.p2 { animation-delay: calc(-1s + var(--anim-offset, 0s)); }
        @keyframes cf-wisp {
          0% { transform: translate(0, 4px) scale(0.6); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translate(-1px, -8px) scale(1.2); opacity: 0; }
        }
        .cf-tray { fill: #3d434a; }
        .machine.tray-full .cf-tray { fill: #8d5a3b; }
        .cf-warn { display: none; fill: none; stroke: var(--warning-color, #ff9800); stroke-width: 1.5; }
        .machine.no-water .cf-warn-w, .machine.tray-full .cf-warn-t, .machine.no-beans .cf-warn-b { display: inline; }
        /* One of the panel dots turns orange and blinks while the machine
           wants water, beans or an empty tray. */
        .machine.no-water .cf-alert, .machine.tray-full .cf-alert, .machine.no-beans .cf-alert { fill: var(--warning-color, #ff9800); filter: drop-shadow(0 0 2.5px var(--warning-color, #ff9800)); animation: cf-blink 1.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes cf-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        /* The crema shows on the coffee while it runs. */
        .cf-crema { opacity: 0; transition: opacity 0.6s; }
        .machine.pouring .cf-crema { opacity: 1; }
  `,
};
}
