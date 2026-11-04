// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The pool_pump drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// A pool pump's drawing: the sand filter on the left with its valve and its
// gauge, the pump in front of the pool, the pipes between them, and the tank
// and long tube of a chlorine dosing pump when there is one. The water flows
// while the pump filters, a jet turns in the strainer, the gauge reads the
// pressure. A backwash sends the dirty water to the drain, never to the pool.
const POOL_SVG = `<svg class="pl-pp" viewBox="0 -6 96 108">
<defs>
<linearGradient id="pl-g-body" x1="0" x2="1"><stop offset="0" stop-color="var(--bl)"/><stop offset=".25" stop-color="var(--b)"/><stop offset=".45" stop-color="var(--bh)"/><stop offset=".7" stop-color="var(--b)"/><stop offset="1" stop-color="var(--bl)"/></linearGradient>
<linearGradient id="pl-g-motor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#555d65"/><stop offset=".35" stop-color="#3a4147"/><stop offset="1" stop-color="#1f2327"/></linearGradient>
<linearGradient id="pl-g-alu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f3"/><stop offset=".35" stop-color="#c4cbd1"/><stop offset="1" stop-color="#7d868e"/></linearGradient>
<linearGradient id="pl-g-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3e5fc"/><stop offset="1" stop-color="#29b6f6"/></linearGradient>
<linearGradient id="pl-g-pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fc3f7"/><stop offset="1" stop-color="#0288d1"/></linearGradient>
<radialGradient id="pl-g-glow"><stop offset="0" stop-color="#fff59d" stop-opacity=".95"/><stop offset="1" stop-color="#fff59d" stop-opacity="0"/></radialGradient>
</defs>
<ellipse cx="48" cy="94.6" rx="46" ry="2.6" fill="rgba(0,0,0,.18)"/>
<path d="M57 1 H95 L97 22 H55 Z" fill="#e7e1d3" stroke="#c9c1ae" stroke-width=".6"/>
<path class="pl-pool" d="M60 4 H92 L93.4 19.5 H58.6 Z"/>
<path d="M60 4 H92 L91.2 7.2 H60.8 Z" fill="rgba(0,60,110,.38)"/>
<ellipse class="pl-glow" cx="76" cy="10" rx="13" ry="9" fill="url(#pl-g-glow)"/>
<path class="pl-rip" d="M63 8.5 q2.5 -1.2 5 0 t5 0 t5 0 t5 0 t5 0"/><path class="pl-rip" d="M63 13 q2.5 -1.2 5 0 t5 0 t5 0 t5 0 t5 0" style="animation-delay:-.8s"/>
<ellipse class="pl-spot" cx="76" cy="5.7" rx="2.6" ry="1.4"/><ellipse cx="76" cy="5.7" rx="1.1" ry=".6" fill="rgba(255,255,255,.65)"/>
<path d="M84 3 Q84 0 86 0 Q88 0 88 3 V13 M88.5 3 Q88.5 0 90.5 0 Q92.5 0 92.5 3 V13" fill="none" stroke="#b7c0c7" stroke-width="1.1"/>
<path d="M88 7 H92.5 M88 10.5 H92.5" stroke="#b7c0c7" stroke-width=".9"/>
<path class="pl-pvc-o" d="M13 26 H8 Q5.5 26 5.5 23.5 V8.5 Q5.5 6 8 6 H55"/><path class="pl-pvc" d="M13 26 H8 Q5.5 26 5.5 23.5 V8.5 Q5.5 6 8 6 H55"/>
<path class="pl-pvc-o" d="M31 26 H36 Q40 26 40 30 V36 Q40 40 44 40 H59.5 Q63.5 40 63.5 44 V53"/><path class="pl-pvc" d="M31 26 H36 Q40 26 40 30 V36 Q40 40 44 40 H59.5 Q63.5 40 63.5 44 V53"/>
<path d="M15 31 H4.5 Q2.2 31 2.2 33.3 V93" fill="none" stroke="#8e979f" stroke-width="4.6"/><path d="M15 31 H4.5 Q2.2 31 2.2 33.3 V93" fill="none" stroke="#bfc6cc" stroke-width="3.2"/>
<rect x="-2.3" y="92.6" width="9" height="3" rx=".8" fill="#2b3137"/><path d="M-.8 94.1 H5.2" stroke="#596169" stroke-width=".7" stroke-dasharray="1 .8"/>
<path class="pl-flow pl-o" d="M63.5 53 V44 Q63.5 40 59.5 40 H44 Q40 40 40 36 V30 Q40 26 36 26 H31"/>
<path class="pl-flow pl-r" d="M13 26 H8 Q5.5 26 5.5 23.5 V8.5 Q5.5 6 8 6 H55"/>
<path class="pl-flow pl-w" d="M15 31 H4.5 Q2.2 31 2.2 33.3 V93"/>
<rect class="pl-pvc-j" x="30" y="3.1" width="3" height="5.8" rx=".8"/>
<rect x="53.6" y="1.6" width="3.6" height="8.8" rx="1" fill="#b6bec5" stroke="#7d868e" stroke-width=".7"/><circle cx="55.4" cy="3.3" r=".45" fill="#7d868e"/><circle cx="55.4" cy="8.7" r=".45" fill="#7d868e"/>
<ellipse cx="61.6" cy="6" rx="1.2" ry="1.6" fill="#e9eef1" stroke="#9aa3ab" stroke-width=".5"/>
<g class="pl-ice"><path d="M10 3.5 l2 -2 M20 4 l1.5 -2.5 M38 3.5 l2 -2.4 M46 4 l1.5 -2.5 M54 3.5 l2 -2.4 M48 37.5 l1.5 -2.5 M58 38 l2 -2.4 M66 47 l2 -1.5" stroke="#e1f5fe" stroke-width="1.2" stroke-linecap="round"/></g>
<rect class="pl-body-d" x="6" y="87" width="32" height="7" rx="2"/>
<path class="pl-body" d="M8 41 Q8 31 22 30 Q36 31 36 41 L36 89 Q22 92 8 89 Z"/>
<path class="pl-ring" d="M8 52 Q22 55 36 52 M8 76 Q22 79 36 76"/>
<g class="pl-sand"><circle cx="15" cy="70" r="1.3"/><circle cx="22" cy="66" r="1.1"/><circle cx="29" cy="71" r="1.3"/></g>
<rect x="11" y="23" width="3" height="6" rx="1" fill="var(--bl)"/><rect x="30" y="23" width="3" height="6" rx="1" fill="var(--bl)"/>
<rect x="14" y="20.5" width="16" height="10" rx="2.5" fill="#2b3137"/>
<rect x="12" y="16.5" width="20" height="3.2" rx="1.6" fill="#1f2428"/><rect x="20.5" y="18.5" width="3" height="3" fill="#1f2428"/>
<path d="M30 20.5 L33 17.5" stroke="#8e979f" stroke-width="1.2"/>
<circle cx="34" cy="14.5" r="4.6" fill="#f5f6f7" stroke="#8e979f" stroke-width=".9"/>
<path d="M30.8 14.5 A3.2 3.2 0 0 1 37.2 14.5" fill="none" stroke="#c0c6cb" stroke-width=".6"/>
<path class="pl-needle" d="M34 14.5 L34 11.5"/><circle cx="34" cy="14.5" r=".7" fill="#333"/>
<path class="pl-pvc-o" d="M41.5 73 H41 Q39 73 39 75 V95"/><path class="pl-pvc" d="M41.5 73 H41 Q39 73 39 75 V95"/>
<path class="pl-flow pl-s" d="M39 95 V75 Q39 73 41 73 H41.5"/>
<ellipse cx="39" cy="95" rx="3.6" ry="1" fill="#2b3137"/>
<g class="pl-cl"><path class="pl-tube" d="M74 46 V36.5 Q74 34 71.5 34 H52.5 Q50 34 50 31.5 V8.4"/>
<path class="pl-drip" d="M74 46 V36.5 Q74 34 71.5 34 H52.5 Q50 34 50 31.5 V8.4"/>
<rect x="48.3" y="7.6" width="3.4" height="2.4" rx=".6" fill="#2b3137"/>
<path class="pl-can" d="M69 47 h10 a1.5 1.5 0 0 1 1.5 1.5 v10 a1.5 1.5 0 0 1 -1.5 1.5 h-10 a1.5 1.5 0 0 1 -1.5 -1.5 v-10 a1.5 1.5 0 0 1 1.5 -1.5z"/>
<rect class="pl-can-l" x="68.1" y="52" width="11.8" height="7.5" rx="1"/><rect x="72.6" y="45.2" width="2.8" height="2.2" rx=".6" fill="#ef6c00"/>
<circle class="pl-can-led" cx="70.4" cy="49" r=".9"/></g>
<path d="M44 89 H61 V93.5 H44 Z M70 88 H90 L91 93.5 H69 Z" fill="#1d2125"/>
<path class="pl-body" d="M44 66 H61 V86 Q61 90.5 56 90.5 H49 Q44 90.5 44 86 Z"/>
<path d="M44.5 77.5 H60.5 M44.5 80.5 H60.5 M44.5 83.5 H60.5 M45 86.5 H60" stroke="rgba(0,0,0,.45)" stroke-width=".8"/>
<path d="M44.5 78.3 H60.5 M44.5 81.3 H60.5 M44.5 84.3 H60.5" stroke="rgba(255,255,255,.08)" stroke-width=".5"/>
<rect class="pl-body" x="40.5" y="69.5" width="5" height="7" rx="1"/><rect x="39.8" y="69" width="1.8" height="8" rx=".6" fill="#aeb6bd"/>
<path d="M42.6 62 H62.4 V66.4 H42.6 Z" fill="#23282d"/>
<path d="M44 62 V56 Q44 50.5 52.5 50.5 Q61 50.5 61 56 V62 Z" fill="rgba(220,235,245,.5)" stroke="#9fb0bd" stroke-width=".8"/>
<rect class="pl-lid-water" x="44.8" y="54" width="15.4" height="8" rx="1.2"/>
<path d="M47 55 V61.5 M50.5 55 V61.5 M54 55 V61.5 M57.5 55 V61.5" stroke="rgba(255,255,255,.4)" stroke-width=".6"/>
<path d="M47.5 51.8 Q52.5 49.6 57.5 51.8 M49 51.2 V53.4 M52.5 50.6 V53 M56 51.2 V53.4" fill="none" stroke="rgba(255,255,255,.85)" stroke-width=".7"/>
<g class="pl-swirl"><path d="M52.5 61.5 V54.2"/><path d="M52.5 54.2 Q49 53 47.4 60"/><path d="M52.5 54.2 Q56 53 57.6 60"/><path d="M52.5 54.8 Q50.6 54.6 49.8 60.5"/><path d="M52.5 54.8 Q54.4 54.6 55.2 60.5"/></g>
<path class="pl-body" d="M59 62 H67.5 Q71 62 71 66 V90.5 H59 Z"/>
<circle cx="65" cy="77" r="6" fill="none" stroke="var(--bl)" stroke-width=".8" opacity=".6"/>
<rect class="pl-body" x="60.6" y="52.5" width="5.8" height="10" rx=".8"/><rect x="60.2" y="51.6" width="6.6" height="2.4" rx=".6" fill="#aeb6bd"/>
<rect x="70" y="69" width="2.5" height="18" rx=".6" fill="#23282d"/>
<rect x="72" y="68" width="15" height="20" rx="2" fill="url(#pl-g-alu)"/>
<path d="M72.5 71 H86.5 M72.5 73.5 H86.5 M72.5 76 H86.5 M72.5 78.5 H86.5 M72.5 81 H86.5 M72.5 83.5 H86.5 M72.5 86 H86.5" stroke="rgba(60,70,78,.55)" stroke-width=".55"/>
<path d="M86.5 69 H90 Q93.5 69 93.5 73 V83 Q93.5 87 90 87 H86.5 Z" fill="#1d2125"/>
<path d="M89.5 70.5 V85.5 M91.5 71.5 V84.5" stroke="#3b4248" stroke-width=".6"/>
<rect x="73" y="62.5" width="11" height="6" rx="1" fill="#22272b"/><circle cx="75" cy="64.3" r=".5" fill="#69727a"/><circle cx="82" cy="64.3" r=".5" fill="#69727a"/>
<circle class="pl-led" cx="78.5" cy="65.6" r=".9"/>
<g class="pl-snow" transform="translate(89 42)"><path d="M0 -4.5 V4.5 M-3.9 -2.25 L3.9 2.25 M-3.9 2.25 L3.9 -2.25 M-1.2 -3.4 L0 -2.4 L1.2 -3.4 M-1.2 3.4 L0 2.4 L1.2 3.4" stroke="#4fc3f7" stroke-width="1.2" stroke-linecap="round" fill="none"/></g>
<g transform="translate(79 43) scale(.55)"><g class="pl-smoke"><g class="pl-pf pl-pf1"><circle class="pl-o" cx="13" cy="23" r="6.9"/><circle class="pl-o" cx="20" cy="18" r="7.9"/><circle class="pl-o" cx="27" cy="22" r="6.4"/><circle class="pl-o" cx="17" cy="12" r="5.9"/><circle class="pl-o" cx="24" cy="11" r="5.4"/><circle class="pl-f" cx="13" cy="23" r="5.5"/><circle class="pl-f" cx="20" cy="18" r="6.5"/><circle class="pl-f" cx="27" cy="22" r="5"/><circle class="pl-f" cx="17" cy="12" r="4.5"/><circle class="pl-f" cx="24" cy="11" r="4"/><path class="pl-hl" d="M15 9 q2 -2 4 -1 M17 15 q2 -2.5 5 -1.5"/></g><g class="pl-pf pl-pf2"><circle class="pl-o" cx="9.049999999999999" cy="21.55" r="6.074999999999999"/><circle class="pl-o" cx="15" cy="17.299999999999997" r="6.924999999999999"/><circle class="pl-o" cx="20.95" cy="20.7" r="5.65"/><circle class="pl-o" cx="12.45" cy="12.2" r="5.225"/><circle class="pl-o" cx="18.4" cy="11.35" r="4.8"/><circle class="pl-f" cx="9.049999999999999" cy="21.55" r="4.675"/><circle class="pl-f" cx="15" cy="17.299999999999997" r="5.5249999999999995"/><circle class="pl-f" cx="20.95" cy="20.7" r="4.25"/><circle class="pl-f" cx="12.45" cy="12.2" r="3.8249999999999997"/><circle class="pl-f" cx="18.4" cy="11.35" r="3.4"/><path class="pl-hl" d="M10.75 9.649999999999999 q2 -2 4 -1 M12.45 14.75 q2 -2.5 5 -1.5"/></g></g></g><g transform="translate(89.5 63.5)"><g class="pl-ang"><path d="M3.5 1.5 Q3.5 4 1 4"/><path d="M6 1.5 Q6 4 8.5 4"/><path d="M3.5 9.5 Q3.5 7 1 7"/><path d="M6 9.5 Q6 7 8.5 7"/></g></g>
</svg>`;
function poolHtml(cls, p) {
  const mode = p.mode || "off";
  let svg = POOL_SVG;
  if (p.needle !== null && p.needle !== undefined && mode !== "error") {
    svg = svg.replace('<path class="pl-needle"', `<path class="pl-needle" style="transform: rotate(${p.needle}deg)"`);
  }
  if (p.can !== null && p.can !== undefined) {
    const h = Math.round(7.5 * Math.max(0, Math.min(100, p.can))) / 100;
    svg = svg.replace('<rect class="pl-can-l" x="68.1" y="52" width="11.8" height="7.5"',
      `<rect class="pl-can-l" x="68.1" y="${Math.round((59.5 - h) * 100) / 100}" width="11.8" height="${h}"`);
  }
  return `
        <div class="machine ${cls} pl pl-m-${mode}${p.dosing ? " pl-chlore" : ""}${p.lit ? " pl-lamp" : ""}${p.chlorine ? "" : " pl-nocl"}">${svg}</div>`;
}


return {
draw: (cls, ctx) => poolHtml(cls, ctx.pool || {}),
css: () => `
        .machine.pl { --b: var(--ac-body, #3f4a54); --bh: var(--ac-body-hi, #62707c); --bl: var(--ac-body-lo, #252c33); }
        svg.pl-pp{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .pl-body{fill:url(#pl-g-body)}
        .pl-body-d{fill:var(--bl)}
        .pl-ring{fill:none;stroke:var(--bl);stroke-width:1;opacity:.6}
        .pl-pvc{fill:none;stroke:#cfd5da;stroke-width:4.6;stroke-linecap:butt}
        .pl-pvc-o{fill:none;stroke:#8e979f;stroke-width:6;stroke-linecap:butt}
        .pl-pvc-j{fill:#dfe3e6;stroke:#8e979f;stroke-width:.8}
        .pl-flow{fill:none;stroke:#4fc3f7;stroke-width:2.2;stroke-dasharray:3 4;stroke-linecap:round;opacity:0}
        .pl-m-running .pl-flow,.pl-m-backwash .pl-flow.pl-o,.pl-m-frost .pl-flow{opacity:1;animation:pl-flow .6s linear infinite}
        .pl-m-running .pl-flow.pl-w,.pl-m-frost .pl-flow.pl-w{opacity:0;animation:none}
        .pl-m-backwash .pl-flow.pl-w{opacity:1;stroke:#8d6e63;animation:pl-flow .45s linear infinite}
        .pl-m-backwash .pl-flow.pl-s{opacity:1;animation:pl-flow .45s linear infinite}
        .pl-m-backwash .pl-flow.pl-o{animation-duration:.45s}
        .pl-m-frost .pl-flow{stroke:#b3e5fc;animation-duration:1.2s}
        @keyframes pl-flow{to{stroke-dashoffset:-14}}
        @keyframes pl-spin{to{transform:rotate(360deg)}}
        .pl-needle{transform-box:view-box;transform-origin:34px 14.5px;transform:rotate(-120deg);stroke:#c62828;stroke-width:1;stroke-linecap:round;transition:transform .6s}
        .pl-m-running .pl-needle,.pl-m-frost .pl-needle{transform:rotate(-20deg)}
        .pl-m-backwash .pl-needle{transform:rotate(25deg)}
        .pl-m-error .pl-needle{transition:none;animation:pl-gauge 1.2s ease-in-out infinite}
        @keyframes pl-gauge{0%,100%{transform:rotate(-120deg)}50%{transform:rotate(120deg)}}
        .pl-lid-water{fill:url(#pl-g-water);opacity:.85}
        .pl-swirl{opacity:0}
        .pl-swirl path{fill:none;stroke:rgba(255,255,255,.9);stroke-width:.75;stroke-linecap:round;stroke-dasharray:1.6 1.6}
        .pl-m-running .pl-swirl,.pl-m-backwash .pl-swirl,.pl-m-frost .pl-swirl{opacity:1}
        .pl-m-running .pl-swirl path,.pl-m-backwash .pl-swirl path,.pl-m-frost .pl-swirl path{animation:pl-jet .5s linear infinite}
        @keyframes pl-jet{to{stroke-dashoffset:-3.2}}
        .pl-pool{fill:url(#pl-g-pool)}
        .pl-rip{fill:none;stroke:rgba(255,255,255,.7);stroke-width:.7;stroke-linecap:round;stroke-dasharray:3 4}
        .pl-m-running .pl-rip,.pl-m-frost .pl-rip{animation:pl-flow 2.2s linear infinite}
        .pl-spot{fill:#cfd8dc;stroke:#90a4ae;stroke-width:.8}
        .pl-glow{opacity:0}
        .pl-lamp .pl-spot{fill:#fff6c2;stroke:#ffd54f}
        .pl-lamp .pl-glow{opacity:1;animation:pl-breathe 3s ease-in-out infinite}
        .pl-can{fill:#f4f6f7;stroke:#9aa3ab;stroke-width:.8}
        .pl-can-l{fill:#d4e157}
        .pl-tube{fill:none;stroke:rgba(140,150,160,.85);stroke-width:1.2}
        .pl-drip{fill:none;stroke:#cddc39;stroke-width:1.6;stroke-dasharray:1.6 3.4;stroke-linecap:round;opacity:0}
        .pl-chlore .pl-drip{opacity:1;animation:pl-flow .9s linear infinite}
        .pl-chlore .pl-can-led{fill:#2ecc71;animation:pl-breathe 1.2s ease-in-out infinite}
        .pl-can-led{fill:#7c858d}
        .pl-ice{opacity:0}
        .pl-m-frost .pl-ice{opacity:1}
        .pl-snow{opacity:0}
        .pl-m-frost .pl-snow{opacity:1;animation:pl-breathe 2.4s ease-in-out infinite}
        .pl-sand{opacity:0}
        .pl-m-backwash .pl-sand{opacity:1}
        .pl-sand circle{fill:#d9c08f;animation:pl-churn 1.2s ease-in-out infinite}
        .pl-sand circle:nth-child(2){--d0:-.4s}
        .pl-sand circle:nth-child(3){--d0:-.8s}
        @keyframes pl-churn{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .machine.pl-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes pl-blink{50%{opacity:.15}}
        @keyframes pl-breathe{0%,100%{opacity:.4}50%{opacity:1}}
        .pl-led{fill:#5a636b}
        .pl-m-running .pl-led,.pl-m-backwash .pl-led,.pl-m-frost .pl-led{fill:#2ecc71}
        .pl-m-error .pl-led{fill:#f44336;animation:pl-blink 1s steps(1) infinite}
        .pl-smoke{display:none}
        .pl-m-error .pl-smoke{display:block}
        .pl-smoke .pl-pf{transform-box:fill-box;transform-origin:50% 100%;animation:pl-puff 2s ease-out infinite}
        .pl-smoke .pl-pf2{--d0:-1s}
        .pl-smoke .pl-o{fill:#111417}
        .pl-smoke .pl-f{fill:#6b737b}
        .pl-smoke .pl-hl{fill:none;stroke:rgba(255,255,255,.75);stroke-width:1;stroke-linecap:round}
        @keyframes pl-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        .pl-ang{display:none;fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:pl-ang .7s ease-in-out infinite alternate}
        .pl-m-error .pl-ang{display:block}
        @keyframes pl-ang{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .pl-nocl .pl-cl { display: none; }
        .machine.pl * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.pl * { animation-name: none !important; } }
  `,
};
}
