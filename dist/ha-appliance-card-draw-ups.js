// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The ups drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
// A UPS's drawing: the wall socket and its plug on the left, the UPS with its
// screen, its three lights and its battery gauge, and the box it keeps alive
// on the right. On mains the energy flows from the wall through the UPS; on
// battery the wall goes dark, crossed out, the UPS beeps and its screen
// counts the time left. The gauge fills by fifths, the next one breathing
// while it charges.
function upsSvg(u) {
  const segs = [0, 1, 2, 3, 4].map((i) => `<rect class="up-seg${i < u.segs ? " up-lit" : ""}${i === Math.min(u.segs, 4) ? " up-next" : ""}" x="${Math.round((38.2 + i * 4.1) * 10) / 10}" y="62.2" width="3.4" height="6.6" rx=".6"/>`).join("");
  const vents = [0, 1, 2, 3, 4].map((i) => `<rect x="36" y="${Math.round((77 + i * 2.6) * 10) / 10}" width="26" height=".9" rx=".45"/>`).join("");
  return `<svg class="up-svg" viewBox="0 0 96 108">
<defs><linearGradient id="up-g-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--bh)"/><stop offset="1" stop-color="var(--bl)"/></linearGradient></defs>
<ellipse cx="50" cy="99.5" rx="46" ry="2.6" fill="rgba(0,0,0,.18)"/>
<rect x="2" y="46" width="17" height="17" rx="3.2" fill="#f4f6f8" stroke="#b9c1ca" stroke-width=".6"/>
<circle cx="10.5" cy="54.5" r="5.6" fill="#e3e7eb" stroke="#c3cad2" stroke-width=".5"/>
<circle cx="10.5" cy="54.5" r="4" fill="#262a30"/><rect x="8.8" y="58.2" width="3.4" height="2.4" rx=".7" fill="#262a30"/>
<g class="up-nomains"><path d="M12 33 l-3.4 4.8 h2.6 l-1.3 4 l3.9 -5.2 h-2.6 z" fill="#9aa3ad"/><path d="M5.5 33.5 L16 43" stroke="#e53935" stroke-width="1.3" stroke-linecap="round"/></g>
<path class="up-cable up-in" d="M10.5 60.6 C10.5 84 22 92 31 92"/><path class="up-flow up-in" d="M10.5 60.6 C10.5 84 22 92 31 92"/>
<path class="up-cable" d="M67 92 C73 92 75 91 79 91"/><path class="up-flow up-out" d="M67 92 C73 92 75 91 79 91"/>
<rect x="32" y="20" width="36" height="78" rx="4" fill="rgba(0,0,0,.15)"/>
<rect class="up-body" x="31" y="18" width="36" height="78" rx="4"/>
<path d="M34 18.6 H64" stroke="var(--bh)" stroke-width=".7" stroke-linecap="round"/>
<rect x="33" y="24" width="32" height="16" rx="2" fill="#0e1b2c" stroke="#27394f" stroke-width=".5"/>
<text class="up-lcd" x="49" y="36">${u.lcd || "--"}</text>
<circle class="up-led up-l-on" cx="42" cy="46" r="1.3"/><circle class="up-led up-l-bat" cx="49" cy="46" r="1.3"/><circle class="up-led up-l-flt" cx="56" cy="46" r="1.3"/>
<circle cx="49" cy="54" r="3.4" fill="#30353d" stroke="#565e69" stroke-width=".5"/>
<path d="M47.4 52.8 A2.1 2.1 0 1 0 50.6 52.8 M49 51.4 V54" fill="none" stroke="#9aa3ad" stroke-width=".7" stroke-linecap="round"/>
<rect x="37" y="61" width="22" height="9" rx="1.2" fill="#161a1f" stroke="#c9d1da" stroke-width=".6"/><rect x="59" y="63.5" width="1.8" height="4" rx=".5" fill="#c9d1da"/>
${segs}
<g fill="rgba(0,0,0,.45)">${vents}</g>
<path class="up-beep" d="M70 24 a4 4 0 0 1 0 7"/><path class="up-beep up-b2" d="M72.6 21.5 a7 7 0 0 1 0 12"/>
<rect x="80" y="62" width="15" height="33" rx="2" fill="rgba(0,0,0,.15)"/>
<rect x="79" y="61" width="15" height="33" rx="2" fill="#23272d" stroke="#3c434c" stroke-width=".5"/>
<rect x="81" y="65" width="11" height="7" rx=".8" fill="#31363e"/><rect x="81" y="74" width="11" height="7" rx=".8" fill="#31363e"/>
<circle class="up-dled" cx="90.2" cy="68.5" r=".8"/><circle class="up-dled up-d2" cx="90.2" cy="77.5" r=".8"/><circle class="up-dled up-pwr" cx="82" cy="90" r=".9"/>
</svg>`;
}
function upsHtml(cls, u) {
  const mode = u.mode || "off";
  return `
        <div class="machine ${cls} up up-m-${mode} up-lv-${u.level || "ok"}${u.alert ? " up-alert" : ""}${u.charging ? " up-charging" : ""}" style="--up-pace: ${u.pace || 1.2}s">${upsSvg(u)}</div>`;
}


return {
draw: (cls, ctx) => upsHtml(cls, ctx.ups || { segs: 0 }),
css: () => `
        .machine.up { --b: var(--ac-body, #2f343b); --bh: var(--ac-body-hi, #4a515b); --bl: var(--ac-body-lo, #1a1d22); }
        svg.up-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .up-body{fill:url(#up-g-body);stroke:var(--bh);stroke-width:.5}
        .up-cable{fill:none;stroke:color-mix(in srgb,var(--primary-text-color,#212121) 70%,transparent);stroke-width:2.2;stroke-linecap:round;transition:opacity .6s}
        .up-m-battery .up-cable.up-in,.up-m-off .up-cable.up-in{opacity:.35}
        .up-flow{fill:none;stroke:#ffd54f;stroke-width:1.1;stroke-dasharray:1 3.5;stroke-linecap:round;opacity:0}
        .up-m-online .up-flow,.up-m-bypass .up-flow,.up-m-battery .up-flow.up-out{opacity:.95;animation:up-flow var(--up-pace,1.2s) linear infinite}
        .up-m-battery .up-flow.up-out{stroke:#fb8c00}
        @keyframes up-flow{to{stroke-dashoffset:-9}}
        .up-nomains{opacity:0}
        .up-m-battery .up-nomains{opacity:1}
        .up-lcd{fill:#7fe3ff;font:700 11px/1 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;letter-spacing:-0.2px;text-anchor:middle}
        .up-m-battery .up-lcd{fill:#ffb74d}
        .up-alert .up-lcd{fill:#ff8a80}
        .up-m-off .up-lcd,.up-m-unav .up-lcd{fill:#3b4a5c}
        .up-led{fill:#3a4049}
        .up-m-online .up-l-on,.up-m-bypass .up-l-on{fill:#43a047}
        .up-m-battery .up-l-bat{fill:#fb8c00;animation:up-blink 1s steps(1) infinite}
        .up-alert .up-l-flt{fill:#f44336;animation:up-blink .7s steps(1) infinite}
        .up-seg{fill:#2a3038}
        .up-seg.up-lit{fill:var(--up-lvl,#43a047)}
        .up-lv-mid{--up-lvl:#fb8c00}
        .up-lv-low{--up-lvl:#f44336}
        .up-charging .up-seg.up-next{fill:var(--up-lvl,#43a047);animation:up-breathe 1.2s ease-in-out infinite}
        .up-beep{fill:none;stroke:#fb8c00;stroke-width:.8;stroke-linecap:round;opacity:0}
        .up-m-battery .up-beep{animation:up-beep 1.6s ease-out infinite}
        .up-b2{--d0:.2s}
        @keyframes up-beep{0%,40%{opacity:0}50%{opacity:.9}100%{opacity:0}}
        .up-dled{fill:#2f3640}
        .up-m-online .up-dled,.up-m-bypass .up-dled,.up-m-battery .up-dled{fill:#4fc3f7;animation:up-blink 1.3s steps(1) infinite}
        .up-d2{--d0:-.5s}
        .up-m-online .up-pwr,.up-m-bypass .up-pwr,.up-m-battery .up-pwr{animation:none}
        .machine.up-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes up-blink{50%{opacity:.2}}
        @keyframes up-breathe{0%,100%{opacity:.35}50%{opacity:1}}
        .machine.up * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.up * { animation-name: none !important; } }
  `,
};
}
