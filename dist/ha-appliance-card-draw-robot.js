// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The robot drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
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

// The new drawings' motion: nothing moves until the machine runs (nt-on),
// except a meter's LED and an alarm's beacon. Each part's stagger is its --d0.
const NT_CSS = `
        svg.nt-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .machine.nt:not(.nt-on) .nt-run{display:none}
        .machine.nt-unav{opacity:.45;filter:grayscale(1)}
        .ntd1{--d0:.3s}.ntd2{--d0:.7s}.ntd3{--d0:1.1s}.ntd4{--d0:1.5s}.ntd5{--d0:1.9s}.ntd6{--d0:2.3s}
        .nt-on .nta-spin{transform-box:fill-box;transform-origin:center;animation:nt-spin .6s linear infinite}
        .nt-on .nta-spin-slow{transform-box:fill-box;transform-origin:center;animation:nt-spin 4s linear infinite}
        .nt-on .nta-flow{animation:nt-flow .8s linear infinite}
        .nt-on .nta-flow-fast{animation:nt-flow .4s linear infinite}
        .nt-on .nta-rise{transform-box:fill-box;animation:nt-rise 2.4s ease-in infinite}
        .nt-on .nta-steam{transform-box:fill-box;transform-origin:center bottom;animation:nt-steam 2.8s ease-out infinite}
        .nt-on .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-k-sump .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-on .nta-twinkle{animation:nt-twinkle 1.3s ease-in-out infinite}
        .nt-on .nta-frost{transform-box:fill-box;transform-origin:center;animation:nt-frost 2.4s ease-in-out infinite}
        .nt-on .nta-shimmer{animation:nt-shimmer 3s ease-in-out infinite}
        .nta-glow{animation:nt-glow 1.8s ease-in-out infinite}
        .nt-on .nta-warm{animation:nt-warm 2.6s ease-in-out infinite}
        .nt-on .nta-pop{transform-box:fill-box;transform-origin:center;animation:nt-pop 1.6s ease-out infinite}
        .nt-on .nta-sway{transform-box:fill-box;transform-origin:center bottom;animation:nt-sway 3.2s ease-in-out infinite}
        .nt-on .nta-vib{animation:nt-vib .12s linear infinite}
        .nt-on .nta-heat{transform-box:fill-box;animation:nt-heat 2.2s ease-out infinite}
        .nt-on .nta-bob{animation:nt-bob 1.2s ease-in-out infinite}
        .nt-on .nta-swim{transform-box:fill-box;transform-origin:center;animation:nt-swim 8s ease-in-out infinite}
        .nt-on .nta-swimB{transform-box:fill-box;transform-origin:center;animation:nt-swimB 6.5s ease-in-out infinite}
        .nt-on .nta-rays{animation:nt-rays 4s ease-in-out infinite}
        .nta-caust{opacity:.35}
        .nt-on .nta-caust{opacity:0;animation:nt-shimmer 3s ease-in-out infinite}
        .nta-blink{animation:nt-blink 2.4s linear infinite}
        .nt-on .nta-feed{animation:nt-feed .625s linear infinite}
        .nt-on .nta-led,.nt-on .nta-next{animation:nt-glow 1.25s ease-in-out infinite}
        .nt-on .nta-bar1{animation:nt-bar1 5s steps(1) infinite}.nt-on .nta-bar2{animation:nt-bar2 5s steps(1) infinite}
        .nt-on .nta-bar3{animation:nt-bar3 5s steps(1) infinite}.nt-on .nta-bar4{animation:nt-bar4 5s steps(1) infinite}
        @keyframes nt-feed{to{stroke-dashoffset:12}}
        @keyframes nt-bar1{0%{opacity:.15}12%,100%{opacity:1}}
        @keyframes nt-bar2{0%{opacity:.15}30%,100%{opacity:1}}
        @keyframes nt-bar3{0%{opacity:.15}48%,100%{opacity:1}}
        @keyframes nt-bar4{0%{opacity:.15}66%,100%{opacity:1}}
        .nta-blinkfast{animation:nt-blinkfast .45s linear infinite}
        .nta-rain{transform-box:fill-box;animation:nt-fall 1.4s ease-in infinite}
        .nta-rdrop{animation:nt-rdrop .6s linear infinite}.nta-rsplash{transform-box:fill-box;transform-origin:center;opacity:0;animation:nt-rsplash .6s ease-out infinite}
        @keyframes nt-rdrop{0%{transform:translate(0,0);opacity:0}10%{opacity:1}100%{transform:translate(-16px,80px);opacity:1}}
        @keyframes nt-rsplash{0%,80%{transform:scale(.2);opacity:0}85%{opacity:1}100%{transform:scale(1.3);opacity:0}}
        .nt-on .nta-smoke{transform-box:fill-box;transform-origin:center;animation:nt-smoke 4.2s ease-out infinite}
        .nt-on .nta-spreadL{transform-box:fill-box;transform-origin:center;animation:nt-spreadL 4.2s ease-out infinite}
        .nt-on .nta-spreadR{transform-box:fill-box;transform-origin:center;animation:nt-spreadR 4.2s ease-out infinite}
        .nt-on .nta-drip{animation:nt-drip 1.5s ease-in infinite}
        .nt-on .nta-splash{transform-box:fill-box;transform-origin:center;animation:nt-splash 1.5s ease-out infinite}
        .nt-on .nta-lrcycle{transform-box:view-box;transform-origin:60px 38px;animation:nt-lrcycle 7s ease-in-out infinite}
        /* The watering, litter box, detector and speaker drawings share one 7 s
           cycle, every motion fitting it a whole number of times. */
        .nt-c7 .nta-flow{animation-duration:.875s}.nt-c7 .nta-fall{animation-duration:1.75s}.nt-c7 .nta-spin-slow{animation-duration:3.5s}
        .nt-c7 .nta-smoke,.nt-c7 .nta-spreadL,.nt-c7 .nta-spreadR{animation-duration:3.5s}.nt-c7 .nta-drip,.nt-c7 .nta-splash,.nt-c7 .nta-pop,.nt-c7 .nta-glow{animation-duration:1.75s}
        .nt-c7 .nta-rise,.nt-c7 .nta-blink{animation-duration:2.333s}.nt-c7 .nta-blinkfast{animation-duration:.4375s}.nt-c7 .nta-shimmer{animation-duration:3.5s}
        .nt-on .nta-littilt{transform-box:view-box;animation:nt-littilt 7s ease-in-out infinite}
        .nt-on .nta-clump{animation:nt-clump 7s ease-in-out infinite}
        .nta-smoke,.nta-spreadL,.nta-spreadR,.nta-drip,.nta-splash{opacity:0}
        @keyframes nt-smoke{0%{transform:translateY(0) scale(.4);opacity:0}18%{opacity:.8}100%{transform:translateY(-66px) scale(2.1);opacity:0}}
        @keyframes nt-spreadL{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(-34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-spreadR{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-drip{0%{transform:translateY(-52px);opacity:0}12%{opacity:1}84%{transform:translateY(0);opacity:1}86%,100%{transform:translateY(0);opacity:0}}
        @keyframes nt-splash{0%,82%{transform:scale(.2);opacity:0}86%{opacity:.95}100%{transform:scale(1.7);opacity:0}}
        @keyframes nt-lrcycle{0%,6%{transform:rotate(0)}42%,54%{transform:rotate(-240deg)}80%,86%{transform:rotate(20deg)}96%,100%{transform:rotate(0)}}
        @keyframes nt-littilt{0%,6%{transform:rotate(0)}24%{transform:rotate(-14deg)}42%,54%{transform:rotate(-8deg)}68%{transform:rotate(6deg)}80%,84%{transform:rotate(10deg)}92%{transform:rotate(-3deg)}100%{transform:rotate(0)}}
        @keyframes nt-clump{0%,18%{opacity:1;transform:translate(0,0)}34%{opacity:1;transform:translate(-10px,3px)}44%{opacity:0;transform:translate(-14px,6px)}97%{opacity:0;transform:translate(0,0)}100%{opacity:1}}
        .nta-beacon{animation:nt-glow .7s ease-in-out infinite}
        @keyframes nt-spin{to{transform:rotate(360deg)}}
        @keyframes nt-flow{to{stroke-dashoffset:-24}}
        @keyframes nt-rise{0%{transform:translateY(0);opacity:0}15%{opacity:.95}100%{transform:translateY(-30px);opacity:0}}
        @keyframes nt-steam{0%{transform:translateY(0) scaleX(1);opacity:0}30%{opacity:.6}100%{transform:translateY(-20px) scaleX(1.7);opacity:0}}
        @keyframes nt-fall{0%{transform:translateY(-2px);opacity:0}35%{opacity:.85}100%{transform:translateY(12px);opacity:0}}
        @keyframes nt-twinkle{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes nt-blink{0%,70%,100%{opacity:.15}78%,92%{opacity:1}}
        .nt-on .nta-roll{animation:nt-roll 4s linear infinite}
        @keyframes nt-roll{to{transform:translateY(var(--roll,-90px))}}
        @keyframes nt-blinkfast{0%,100%{opacity:.15}45%,55%{opacity:1}}
        @keyframes nt-frost{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}
        @keyframes nt-shimmer{0%,100%{opacity:0}50%{opacity:.5}}
        @keyframes nt-glow{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes nt-warm{0%,100%{opacity:.1}50%{opacity:.26}}
        @keyframes nt-pop{0%{transform:scale(.2);opacity:0}40%{opacity:.95}100%{transform:scale(1.4);opacity:0}}
        @keyframes nt-sway{0%,100%{transform:skewX(-7deg)}50%{transform:skewX(7deg)}}
        @keyframes nt-vib{0%,100%{transform:translate(0,0)}25%{transform:translate(.35px,-.2px)}75%{transform:translate(-.35px,.2px)}}
        @keyframes nt-heat{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-14px);opacity:0}}
        @keyframes nt-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}
        @keyframes nt-swim{0%{transform:translateX(0) scaleX(1)}46%{transform:translateX(34px) scaleX(1)}50%{transform:translateX(34px) scaleX(-1)}96%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
        @keyframes nt-swimB{0%{transform:translateX(0) scaleX(-1)}46%{transform:translateX(-30px) scaleX(-1)}50%{transform:translateX(-30px) scaleX(1)}96%{transform:translateX(0) scaleX(1)}100%{transform:translateX(0) scaleX(-1)}}
        @keyframes nt-rays{0%,100%{opacity:.18}50%{opacity:.38}}
        .machine.nt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
`;

// The drawings of the panels and the battery, built once: only their classes
// change with what they do, and the battery's level and reserve.
const ENERGY_SMOKE = (x, y, k) => {
  const C = [[13, 23, 5.5], [20, 18, 6.5], [27, 22, 5], [17, 12, 4.5], [24, 11, 4]];
  const puff = (c, dx, dy, kk) => `<g class="en-pf ${c}">${C.map(([cx, cy, r]) => `<circle class="en-o" cx="${(cx * kk + dx).toFixed(1)}" cy="${(cy * kk + dy).toFixed(1)}" r="${(r * kk + 1.4).toFixed(1)}"/>`).join("")}${C.map(([cx, cy, r]) => `<circle class="en-f" cx="${(cx * kk + dx).toFixed(1)}" cy="${(cy * kk + dy).toFixed(1)}" r="${(r * kk).toFixed(1)}"/>`).join("")}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${k})"><g class="en-smoke">${puff("en-pf1", 0, 0, 1)}${puff("en-pf2", -2, 2, 0.85)}</g></g>`;
};
const ENERGY_ANGER = (x, y) => `<g transform="translate(${x} ${y})"><g class="en-ang"><path d="M3.5 1.5 Q3.5 4 1 4"/><path d="M6 1.5 Q6 4 8.5 4"/><path d="M3.5 9.5 Q3.5 7 1 7"/><path d="M6 9.5 Q6 7 8.5 7"/></g></g>`;
// A robot's drawing. It leaves its base and goes back and forth over its
// floor: a rug for a vacuum, tiles for a mop, a lawn for a mower, which is
// drawn in profile with the grass cut under it. Its ring says what it does,
// like the real ones: green on the base, blue at work, amber in a pause,
// orange for a full bin or an empty tank, red in an error, where a puff of
// smoke and an anger mark say it the way a cartoon would.
const ROBOT_MANGA = `<svg class="rbt-smoke" viewBox="0 0 40 30"><g class="rbt-pf rbt-pf1"><circle class="rbt-o" cx="13.0" cy="23.0" r="6.9"/><circle class="rbt-o" cx="20.0" cy="18.0" r="7.9"/><circle class="rbt-o" cx="27.0" cy="22.0" r="6.4"/><circle class="rbt-o" cx="17.0" cy="12.0" r="5.9"/><circle class="rbt-o" cx="24.0" cy="11.0" r="5.4"/><circle class="rbt-f" cx="13.0" cy="23.0" r="5.5"/><circle class="rbt-f" cx="20.0" cy="18.0" r="6.5"/><circle class="rbt-f" cx="27.0" cy="22.0" r="5.0"/><circle class="rbt-f" cx="17.0" cy="12.0" r="4.5"/><circle class="rbt-f" cx="24.0" cy="11.0" r="4.0"/><path class="rbt-hl" d="M15.0 9.0 q2 -2 4 -1 M17.0 15.0 q2 -2.5 5 -1.5"/></g><g class="rbt-pf rbt-pf2"><circle class="rbt-o" cx="9.0" cy="21.6" r="6.1"/><circle class="rbt-o" cx="15.0" cy="17.3" r="6.9"/><circle class="rbt-o" cx="20.9" cy="20.7" r="5.7"/><circle class="rbt-o" cx="12.4" cy="12.2" r="5.2"/><circle class="rbt-o" cx="18.4" cy="11.3" r="4.8"/><circle class="rbt-f" cx="9.0" cy="21.6" r="4.7"/><circle class="rbt-f" cx="15.0" cy="17.3" r="5.5"/><circle class="rbt-f" cx="20.9" cy="20.7" r="4.2"/><circle class="rbt-f" cx="12.4" cy="12.2" r="3.8"/><circle class="rbt-f" cx="18.4" cy="11.3" r="3.4"/><path class="rbt-hl" d="M10.8 9.6 q2 -2 4 -1 M12.4 14.8 q2 -2.5 5 -1.5"/></g></svg>`;
const ROBOT_ANGER = `<svg class="rbt-angm" viewBox="29.5 0.5 9.5 10"><g class="rbt-ang"><path d="M33 1.5 Q33 4 30.5 4"/><path d="M35.5 1.5 Q35.5 4 38 4"/><path d="M33 9.5 Q33 7 30.5 7"/><path d="M35.5 9.5 Q35.5 7 38 7"/></g></svg>`;
const ROBOT_MOWER_SVG = `<svg viewBox="0 0 62 35">
 <ellipse cx="31" cy="34" rx="29" ry="2" fill="rgba(0,0,0,.25)"/>
 <path d="M5 27 C3 20 6 12 14 10 L33 8 C41 8 47 12 53 18 C57 21 59 24 58 27 Z" style="fill: var(--b)"/>
 <path d="M11 13 C17 10 29 9 35 9.5 C41 10 46 13 50 16.5 C42 15 28 14.5 12 16 Z" style="fill:var(--bh)" opacity=".9"/>
 <rect x="5" y="25" width="54" height="3.5" rx="1.5" fill="#1b1e21"/>
 <path d="M24 21.5 H53" stroke="#ff8f1f" stroke-width="1.6" stroke-linecap="round"/>
 <ellipse cx="25" cy="10.2" rx="7" ry="1.5" style="fill:var(--bl)"/>
 <ellipse class="rbt-led" cx="35" cy="10" rx="1.6" ry=".9"/>
 <path d="M48 13.2 l4.5 3.4 l-1.6 1.5 l-4.4 -3 Z" fill="#1b1e21"/><circle cx="50.2" cy="15.6" r=".8" fill="#4fc3f7"/>
 <path d="M3.5 22 A12.5 12.5 0 0 1 28.5 22" fill="none" style="stroke:var(--bl)" stroke-width="2.4"/>
 <g class="rbt-whl"><circle cx="16" cy="25.5" r="9" fill="#1b1e21"/><circle cx="16" cy="25.5" r="8.2" fill="none" stroke="#3a3f45" stroke-width="1.8" stroke-dasharray="1.5 1.2"/>
  <circle cx="16" cy="25.5" r="4" fill="#4a5057"/><path d="M16 21.5 V29.5 M12 25.5 H20" stroke="#2b2f34" stroke-width="1.2"/><circle cx="16" cy="25.5" r="1.3" fill="#ff8f1f"/></g>
 <g class="rbt-whl"><circle cx="51" cy="31.3" r="3.4" fill="#1b1e21"/><circle cx="51" cy="31.3" r="1.3" fill="#555c63"/></g>
</svg>`;
// A Segway Navimow i series (#67): a low grey shell, a black glossy top with
// its round chrome lid on a ring of light, the red stop button, and big front
// wheels with orange treads, a small caster behind.
const ROBOT_NAVIMOW_SVG = `<svg viewBox="0 0 62 35">
 <ellipse cx="31" cy="34" rx="29" ry="2" fill="rgba(0,0,0,.25)"/>
 <g class="rbt-whl"><circle cx="9" cy="31.2" r="3.3" fill="#1b1e21"/><circle cx="9" cy="31.2" r="1.2" fill="#555c63"/></g>
 <path d="M3 20.5 H59.6 V26.6 C59.6 28.9 58.2 30.2 55.8 30.4 L8 31.4 C4.8 31.4 3 30 3 27.6 Z" fill="#2b2f34"/>
 <path d="M3.2 22.4 C2.4 14.6 6.6 10 13.6 9.4 L38 8.4 C46.4 8.1 53.4 9.2 57.2 12.6 C59.6 14.9 60.2 18.4 59.8 22.4 Z" fill="#b9c1c9"/>
 <path d="M6.6 13.2 C10.4 10.8 26 10 40 9.7 C48 9.6 53.6 10.8 56.2 13.4 C46 12.4 24 12.4 6.6 14.4 Z" fill="#e1e6ea"/>
 <path d="M4.8 20.6 C20 19.8 44 19.8 58.6 20.4" stroke="#8d969f" stroke-width=".6" fill="none"/>
 <path d="M13.6 9.6 C19.6 7.6 40 7.2 49.6 8.1 C52.6 8.4 54.6 9.3 55.6 10.4 C45 9.6 25 9.6 13.6 10.6 Z" fill="#14171a"/>
 <rect class="rbt-led" x="19.6" y="5.6" width="21" height="3" rx="1.5"/>
 <path d="M20.6 5.9 C20.6 3.4 39.4 3.4 39.4 5.9 C39.4 6.9 20.6 6.9 20.6 5.9 Z" fill="#c4cad0"/>
 <ellipse cx="30" cy="4.3" rx="7.6" ry="1.1" fill="#f1f3f5"/>
 <path d="M26.6 4.1 H33.4" stroke="#3a3f45" stroke-width=".7" stroke-linecap="round"/>
 <rect x="42.6" y="6.4" width="4.2" height="2" rx=".6" fill="#e53935"/>
 <rect x="57.4" y="14.4" width="2.4" height="4.4" rx=".6" fill="#14171a"/><circle cx="58.6" cy="16.6" r=".55" fill="#4fc3f7"/>
 <g class="rbt-whl"><circle cx="44" cy="23" r="11.5" fill="#ff5a1f"/><circle cx="44" cy="23" r="11.1" fill="none" stroke="#c23d0d" stroke-width="1.9" stroke-dasharray="1.8 1.5"/>
  <circle cx="44" cy="23" r="8.2" fill="#1b1e21"/><path d="M44 16.4 L45.8 21.2 L50.6 23 L45.8 24.8 L44 29.6 L42.2 24.8 L37.4 23 L42.2 21.2 Z" fill="#30353a"/><circle cx="44" cy="23" r="1.6" fill="#5a6168"/></g>
 <path d="M30.6 19.2 A14 14 0 0 1 57.4 19.2" stroke="#b9c1c9" stroke-width="2.6" fill="none"/>
 <path d="M31.6 20.4 A12.9 12.9 0 0 1 56.4 20.4" stroke="#2b2f34" stroke-width=".7" fill="none"/>
</svg>`;
let robotCloudN = 0;
function robotRain() {
  const cg = `rbt-cg${robotCloudN++}`;
  let drops = "";
  for (let i = 0; i < 18; i++) {
    const x = 18 + ((i * 37) % 60);
    const d = 0.5 + ((i * 7) % 5) * 0.06;
    const dl = -((i * 0.23) % d);
    drops += `<b style="left: ${x}px; --d: ${d.toFixed(2)}s; --d0: ${dl.toFixed(2)}s"></b>`
      + `<u style="left: ${x - 15}px; top: ${86 + (i % 4) * 3}px; --d: ${d.toFixed(2)}s; --d0: ${dl.toFixed(2)}s"></u>`;
  }
  return `<div class="rbt-cloud"><svg viewBox="0 0 72 26"><defs><linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="26" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7dde2"/><stop offset=".55" stop-color="#a9b2ba"/><stop offset="1" stop-color="#7f8a94"/></linearGradient></defs><path d="M12 25.5 C5 25.5 3 18 9 15.5 C8 9 15 6 20 9 C23 2 35 0 40 7 C45 3 54 6 54 12 C61 11 67 16 64 21 C66 24 63 25.5 60 25.5 Z" fill="url(#${cg})"/><path d="M14 13 C15 10 18 9 21 10.5 M27 7 C30 4 35 4 38 7.5" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.4" stroke-linecap="round"/></svg></div><div class="rbt-rain">${drops}</div>`;
}

// A wall socket the stand's cable goes into: the stand stays plugged in
// whether the vacuum is on it or not.
const STICK_SOCKET = (x, y) => `<rect x="${x}" y="${y}" width="7" height="9" rx="1.6" fill="#f4f5f6" stroke="#9aa1a7" stroke-width=".6"/><circle cx="${x + 3.5}" cy="${y + 4.5}" r="2.2" fill="#e2e5e8" stroke="#b5bbc0" stroke-width=".4"/><rect x="${x + 1.4}" y="${y + 3.2}" width="4.2" height="2.6" rx="1" fill="#2b3137"/>`;

// A Dyson-like stick vacuum on its wall dock, leaning: the purple filter,
// the gold cyclone, the clear bin, the handle with its screen, the long
// wand and the soft roller head. Its screen's three bars fill while it
// charges.
function dysonSvg(battery) {
  const lit = battery === null || battery === undefined ? null : Math.max(0, Math.min(3, Math.ceil(battery / 34)));
  const bar = (n, y) => `<rect class="stk-bar b${n}${lit === null ? " full" : lit >= n ? " on" : ""}" x="7" y="${y}" width="3.6" height="1.4" rx=".4"/>`;
  return `<svg class="stk-svg" viewBox="0 0 96 108"><defs>
<linearGradient id="stk-nk" x1="0" x2="1"><stop offset="0" style="stop-color:var(--bl)"/><stop offset=".35" style="stop-color:var(--bh)"/><stop offset=".6" style="stop-color:var(--b)"/><stop offset="1" style="stop-color:var(--bl)"/></linearGradient>
<linearGradient id="stk-gm" x1="0" x2="1"><stop offset="0" stop-color="#3f454b"/><stop offset=".4" stop-color="#8f979e"/><stop offset="1" stop-color="#3a4046"/></linearGradient>
<linearGradient id="stk-pu" x1="0" x2="1"><stop offset="0" stop-color="#5b3fe0"/><stop offset=".4" stop-color="#c7b8ff"/><stop offset=".7" stop-color="#8e74ff"/><stop offset="1" stop-color="#4f36c8"/></linearGradient>
<linearGradient id="stk-au" x1="0" x2="1"><stop offset="0" stop-color="#a87a14"/><stop offset=".4" stop-color="#f7d870"/><stop offset=".7" stop-color="#d9a92e"/><stop offset="1" stop-color="#9a6f10"/></linearGradient>
<linearGradient id="stk-cl" x1="0" x2="1"><stop offset="0" stop-color="rgba(170,185,195,.55)"/><stop offset=".3" stop-color="rgba(250,252,253,.85)"/><stop offset=".7" stop-color="rgba(215,225,232,.6)"/><stop offset="1" stop-color="rgba(150,165,178,.6)"/></linearGradient>
<linearGradient id="stk-gd" x1="0" x2="1"><stop offset="0" stop-color="#8d959c"/><stop offset=".5" stop-color="#bfc5ca"/><stop offset="1" stop-color="#7d858c"/></linearGradient>
<linearGradient id="stk-yr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe36b"/><stop offset=".5" stop-color="#f2c21b"/><stop offset="1" stop-color="#c89a08"/></linearGradient>
<clipPath id="stk-rc"><rect x="16" y="94" width="31" height="7.5" rx="3.75"/></clipPath></defs>
${STICK_SOCKET(85, 59)}
<path class="stk-cab" d="M88.5 63.5 H86 Q82 63.5 80.5 57 Q78.5 49 72 44"/><path class="stk-ef" d="M88.5 63.5 H86 Q82 63.5 80.5 57 Q78.5 49 72 44"/>
<g transform="translate(60 30) rotate(22) scale(.76)">
<rect x="13" y="-20" width="8" height="30" rx="2" fill="url(#stk-gd)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="14.6" y="-17" width="4.8" height="24" rx="1.2" fill="rgba(255,255,255,.12)"/>
<circle class="stk-led" cx="17" cy="5" r="1.1"/>
</g>
<g class="stk-mach">
<ellipse cx="40" cy="103.5" rx="30" ry="2" fill="rgba(0,0,0,.14)"/>
<g transform="translate(60 30) rotate(22) scale(.76)">
<path d="M12 -6 H14 V2 H12" fill="#5f666d"/>
<path d="M5 -16 Q13 -16 13 -8 V10 Q13 14 9 14 H5 Z" fill="url(#stk-gm)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="5.5" y="-23" width="6.5" height="8" rx="1.5" fill="#0d1210" stroke="#2b2f34" stroke-width=".6"/>
${bar(1, -17.6)}${bar(2, -19.6)}${bar(3, -21.6)}
<path d="M5 -2 L2.5 2" stroke="#d32f2f" stroke-width="2" stroke-linecap="round"/>
<rect x="-6.5" y="-34" width="13" height="13" rx="4" fill="url(#stk-pu)" stroke="rgba(40,20,120,.5)" stroke-width=".6"/>
<path d="M0 -32 V-23 M2 -32 V-23 M4 -31.5 V-23.5" stroke="rgba(255,255,255,.45)" stroke-width=".5"/>
<ellipse cx="0" cy="-33.4" rx="5.2" ry="1.1" fill="rgba(255,255,255,.35)"/>
<rect x="-6.5" y="-22" width="13" height="8" fill="url(#stk-nk)" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
<path d="M-9.5 -14 H9.5 V-8.5 Q8.1 -6.3 6.6 -8.5 Q5.2 -6.3 3.7 -8.5 Q2.3 -6.3 .8 -8.5 Q-.6 -6.3 -2 -8.5 Q-3.4 -6.3 -4.9 -8.5 Q-6.3 -6.3 -7.8 -8.5 Q-8.6 -7.3 -9.5 -8.5 Z" fill="url(#stk-au)" stroke="rgba(110,70,0,.55)" stroke-width=".5"/>
<path d="M-9.5 -12 H9.5" stroke="rgba(255,240,180,.6)" stroke-width=".6"/>
<rect x="-8.5" y="-7.5" width="17" height="1.6" fill="#d32f2f"/>
<rect x="-8.5" y="-6" width="17" height="25" rx="2.5" fill="url(#stk-cl)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="-4.2" y="-6" width="8.4" height="19" fill="url(#stk-nk)" stroke="rgba(0,0,0,.2)" stroke-width=".4"/>
<rect x="-4.2" y="4" width="8.4" height="1" fill="#d32f2f"/>
<path d="M-7.5 14 Q0 11.5 7.5 14 V18 H-7.5 Z" fill="rgba(150,135,110,.45)"/>
<rect x="-8.5" y="17.5" width="17" height="3.2" rx="1.4" fill="url(#stk-gm)"/>
<rect x="-1.6" y="20.5" width="3.2" height="3" rx="1" fill="#d32f2f"/>
<rect x="-2.2" y="23" width="4.4" height="63" rx="2.2" fill="url(#stk-gm)"/>
<rect x="-2.5" y="74" width="5" height="3.2" rx="1" fill="#d32f2f"/>
<rect x="-2.8" y="82" width="5.6" height="8" rx="1.6" fill="url(#stk-nk)"/>
</g>
<path d="M15 95.5 Q15 91.5 20 91.5 H45 Q49 91.5 50 95 L49 96.5 H16 Z" fill="url(#stk-nk)" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
<path d="M18 93 H46" stroke="rgba(255,255,255,.6)" stroke-width=".6"/>
<path d="M31.5 93 Q33 89 35.5 89.5" stroke="#3a4046" stroke-width="3.2" fill="none" stroke-linecap="round"/>
<circle cx="31.5" cy="92.6" r="2" fill="#3d4fd6" stroke="rgba(0,0,0,.3)" stroke-width=".4"/>
<g clip-path="url(#stk-rc)"><rect x="16" y="94" width="31" height="7.5" fill="url(#stk-yr)"/>
<path d="M14 103 L26 92 M30 103 L42 92" stroke="#1b1e21" stroke-width="1.6"/>
<path d="M22 103 L34 92 M38 103 L50 92" stroke="#1b1e21" stroke-width=".7" opacity=".7"/>
<rect x="16" y="94" width="31" height="2.2" fill="rgba(255,255,255,.35)"/><rect x="16" y="99.5" width="31" height="2" fill="rgba(0,0,0,.18)"/></g>
<rect x="16" y="94" width="31" height="7.5" rx="3.75" fill="none" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
<ellipse cx="47.3" cy="97.75" rx="2.1" ry="3.9" fill="url(#stk-nk)" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
<ellipse cx="16" cy="97.75" rx="1.6" ry="3.6" fill="#3d4fd6" stroke="rgba(0,0,0,.3)" stroke-width=".4"/>
${ENERGY_SMOKE(44, -4, 0.55)}${ENERGY_ANGER(62, 4)}
</g></svg>`;
}

// A Tineco-like floor washer standing in its station: the handle, the wand,
// the head with its round screen, the dark dirty water tank, and the soft
// roller in the station's tray. The screen's ring fills while it charges and
// turns while the station washes the roller.
function washerSvg(battery) {
  const pct = battery === null || battery === undefined ? null : Math.max(0, Math.min(100, battery));
  const off = pct === null ? "" : ` style="--fw-off: ${Math.round((1 - pct / 100) * 189) / 10}"`;
  return `<svg class="stk-svg" viewBox="0 0 96 108"><defs>
<linearGradient id="fw-tb" x1="0" x2="1"><stop offset="0" style="stop-color:var(--bl)"/><stop offset=".45" style="stop-color:var(--bh)"/><stop offset="1" style="stop-color:var(--b)"/></linearGradient>
<linearGradient id="fw-tw" x1="0" x2="1"><stop offset="0" stop-color="#c9ced2"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#d5dade"/></linearGradient>
<linearGradient id="fw-tk" x1="0" x2="1"><stop offset="0" stop-color="rgba(60,66,72,.9)"/><stop offset=".3" stop-color="rgba(150,160,168,.55)"/><stop offset=".55" stop-color="rgba(40,45,50,.85)"/><stop offset="1" stop-color="rgba(25,28,32,.95)"/></linearGradient>
<linearGradient id="fw-ro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ecee"/><stop offset=".55" stop-color="#c3c9ce"/><stop offset="1" stop-color="#9aa2a9"/></linearGradient>
<pattern id="fw-fz" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="rgba(255,255,255,.55)"/><circle cx="2.4" cy="2.2" r=".4" fill="rgba(110,120,128,.35)"/></pattern>
<clipPath id="fw-rc"><rect x="21.5" y="93" width="31" height="6" rx="3"/></clipPath></defs>
${STICK_SOCKET(84, 90)}
<path class="stk-cab" d="M87.5 94.5 Q80 95 76 101.5 H68"/><path class="stk-ef" d="M87.5 94.5 Q80 95 76 101.5 H68"/>
<ellipse cx="42" cy="104.5" rx="30" ry="1.6" fill="rgba(0,0,0,.15)"/>
<path d="M14 100 Q14 97 18 97 H64 Q68 97 68 100 V102 Q68 104 64 104 H18 Q14 104 14 102 Z" fill="url(#fw-tb)" stroke="rgba(0,0,0,.4)" stroke-width=".5"/>
<path d="M20 98.6 H58" stroke="rgba(255,255,255,.18)" stroke-width=".6"/>
<circle class="stk-led" cx="62" cy="100.5" r="1"/>
<g class="fw-bub"><circle cx="30" cy="96.5" r=".9"/><circle cx="38" cy="97" r=".7"/><circle cx="46" cy="96.6" r=".8"/></g>
<g class="stk-mach">
<g transform="translate(39 90) rotate(14) scale(.84)">
<rect x="1.4" y="-104" width="3" height="40" rx="1.5" fill="url(#fw-tb)"/>
<path d="M-.5 -106 Q-.5 -114 4.5 -114 Q9.5 -114 9.5 -108 L8.2 -97 Q7.6 -94 5.3 -94 H3 Z" fill="url(#fw-tb)" stroke="rgba(0,0,0,.4)" stroke-width=".5"/>
<path d="M2.6 -110.5 Q4.6 -112 7.2 -110 L6.4 -99 Q6 -97 4.6 -97.5 Z" fill="url(#fw-tw)"/>
<rect x="-8.5" y="-70" width="16" height="25" rx="5.5" fill="url(#fw-tb)" stroke="rgba(0,0,0,.4)" stroke-width=".5"/>
<path d="M5 -67 V-47" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>
<circle cx="-1" cy="-59" r="4.4" fill="#0b0e11" stroke="#565e66" stroke-width=".5"/>
<circle class="fw-ring" cx="-1" cy="-59" r="3"/><circle class="fw-ringf" cx="-1" cy="-59" r="3" transform="rotate(-90 -1 -59)"${off}/>
<rect x="-8.5" y="-46" width="17" height="4.5" rx="1" fill="url(#fw-tb)"/>
<rect class="fw-clean" x="-3" y="-51" width="5" height="2.5" rx="1" fill="#7fd0ff"/>
<rect x="-9.5" y="-42" width="13.5" height="35" rx="3" fill="url(#fw-tk)" stroke="rgba(0,0,0,.45)" stroke-width=".5"/>
<path class="fw-dirt" d="M-9 -26 Q-3 -28 3.5 -26 V-10 Q3.5 -7.5 1 -7.5 H-6.5 Q-9 -7.5 -9 -10 Z" fill="rgba(125,95,55,.75)"/>
<path d="M-7 -39 V-11" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
<rect x="-6" y="-31" width="5.5" height="4" rx="1.4" fill="url(#fw-tb)"/>
<path d="M4 -41.5 H8.5 V-6 Q8.5 -4 6.5 -4 H4 Z" fill="url(#fw-tw)" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
<path d="M-9 -8 H8.5 L7 -1 H-6 Z" fill="url(#fw-tw)" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
</g>
<path d="M22 92 L27 88.5 H51 L54 91.5 V94 H22 Z" fill="url(#fw-tb)" stroke="rgba(0,0,0,.45)" stroke-width=".5"/>
<path d="M28 89.8 H50" stroke="rgba(255,255,255,.22)" stroke-width=".6"/>
<rect x="21.5" y="93" width="31" height="6" rx="3" fill="url(#fw-ro)"/>
<g clip-path="url(#fw-rc)"><rect class="fw-roll" x="18.5" y="93" width="37" height="6" fill="url(#fw-fz)"/></g>
<circle cx="53.5" cy="96" r="3.6" fill="url(#fw-tw)" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>
<circle cx="53.5" cy="96" r="1.9" fill="url(#fw-tb)"/>
${ENERGY_SMOKE(30, 14, 0.55)}${ENERGY_ANGER(56, 22)}
</g></svg>`;
}

const SHELTER_SVG = '<svg class="rbt-sh" viewBox="0 0 96 106">';
let shelterN = 0;
function shelterHtml(style, color) {
  const g = `rbt-sh${shelterN++}`;
  const drip = (x, y) => `<circle class="rbt-sh-drip" cx="${x}" cy="${y}" r="1"/>`;
  if (style === "garage") {
    // A garage like the Navimow or Husqvarna ones: a back wall behind the
    // station that curves into a long roof reaching over the mower, on a
    // dark mat (#67).
    const [t0, t1, t2, r0, r1, s0, s1, ln, , hl] = SHELTER_COLORS[color] || SHELTER_COLORS.black;
    const dots = Array.from({ length: 10 }, (_, i) => `<circle cx="${30 + i * 6.4}" cy="${90.6 - i * .07}" r=".45"/>`).join("");
    const back = `${SHELTER_SVG}<path d="M22 94.4 L92 93.4 L96.4 88.2 L27.6 88.8 Z" fill="#2a2e33"/>
<path d="M22 94.4 L92 93.4 L92 94.6 L22 95.6 Z" fill="#1b1e21"/><g fill="rgba(255,255,255,.14)">${dots}</g>
<path d="M27.6 88.8 L96.4 88.2 L96 87 L30 87.4 Z" fill="rgba(0,0,0,.22)"/></svg>`;
    const front = `${SHELTER_SVG}<defs>
<linearGradient id="${g}t" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${t2}"/><stop offset=".5" stop-color="${t1}"/><stop offset="1" stop-color="${t0}"/></linearGradient>
<linearGradient id="${g}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${r0}"/><stop offset="1" stop-color="${r1}"/></linearGradient>
<linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" stop-color="${s0}"/><stop offset="1" stop-color="${s1}"/></linearGradient></defs>
<path d="M92.6 55 C92.6 48 88 44.8 80 45.6 L20 52 L26 46 L86 39.6 C94 38.8 98.6 42 98.6 49 L98.6 86.4 L92.6 92.4 Z" fill="url(#${g}t)"/>
<path d="M92.6 55 L98.6 49 L98.6 86.4 L92.6 92.4 Z" fill="url(#${g}s)"/>
<path d="M26 46 L86 39.6 C94 38.8 98.6 42 98.6 49" fill="none" stroke="${hl}" stroke-width=".8" stroke-linecap="round"/>
<path d="M20 52 L80 45.6 C88 44.8 92.6 48 92.6 55 L92.6 92.4 L87.8 93 L87.8 56 C87.8 51.6 85.6 49.6 81 50 L20 56.4 Z" fill="url(#${g}r)" stroke="${ln}" stroke-width=".4"/>
<path d="M20.6 53.1 L80 46.8 C87 46.1 91.4 48.9 91.4 55 V92" fill="none" stroke="rgba(255,255,255,.3)" stroke-width=".5"/>
<rect class="rbt-sh-led" x="89.5" y="64" width="1.4" height="3" rx=".6"/>${drip(20.6, 57.4)}</svg>`;
    return { back, front };
  }
  if (style === "shell") {
    const [t0, t1, t2, r0, r1, s0, s1, ln, lip, hl, inn] = SHELTER_COLORS[color] || SHELTER_COLORS.white;
    const back = `${SHELTER_SVG}<defs><linearGradient id="${g}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${inn}" stop-opacity=".75"/><stop offset=".55" stop-color="${inn}" stop-opacity=".35"/><stop offset="1" stop-color="${inn}" stop-opacity="0"/></linearGradient></defs>
<path d="M26 93.6 L93 92.8 L97 87.8 L30 88.6 Z" fill="rgba(0,0,0,.18)"/>
<path d="M32.5 55 C35.5 44 50 37 65 36.5 C79 36 90.5 40 92.5 48 L92.5 87.6 L32.5 88.4 Z" fill="url(#${g}i)"/></svg>`;
    const front = `${SHELTER_SVG}<defs>
<linearGradient id="${g}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t0}"/><stop offset=".6" stop-color="${t1}"/><stop offset="1" stop-color="${t2}"/></linearGradient>
<linearGradient id="${g}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${r0}"/><stop offset="1" stop-color="${r1}"/></linearGradient>
<linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" stop-color="${s0}"/><stop offset="1" stop-color="${s1}"/></linearGradient></defs>
<path d="M92 52 L96 47 L96 87 L92 92 Z" fill="url(#${g}s)"/>
<path d="M25 59 C28 46 44 38.5 61 38 C77 37.5 90 42 92 52 L96 47 C94 37 81 32.5 65 33 C48 33.5 32 41 29 54 Z" fill="url(#${g}t)"/>
<path d="M30 50.5 C34 40.5 48 35.4 64 35 C78 34.6 89 38.4 93 45" fill="none" stroke="${hl}" stroke-width="1.2" stroke-linecap="round"/>
<path d="M25 59 L28.5 60 L32.5 55 L29 54 Z" fill="${lip}"/>
<path d="M25 59 C28 46 44 38.5 61 38 C77 37.5 90 42 92 52 L92 92 L88.5 92 L88.5 53 C86.5 45 75 41 61 41.5 C46 42 31.5 49 28.5 60 Z" fill="url(#${g}r)" stroke="${ln}" stroke-width=".4"/>
<path d="M26.2 58 C29.5 46.5 44.5 39.3 61 38.8 C76.5 38.3 89 42.6 91.2 52 V91.4" fill="none" stroke="rgba(255,255,255,.4)" stroke-width=".6"/>
<rect class="rbt-sh-led" x="89.6" y="66" width="1.4" height="3" rx=".6"/>${drip(25.5, 61)}</svg>`;
    return { back, front };
  }
  const back = `${SHELTER_SVG}<defs><linearGradient id="${g}k" x1="0" x2="1"><stop offset="0" stop-color="#6e4624"/><stop offset="1" stop-color="#8f5f33"/></linearGradient></defs>
<path d="M24 93.4 L92 92.6 L96 87.6 L28 88.4 Z" fill="rgba(0,0,0,.17)"/>
<rect x="28" y="49.6" width="3.5" height="39.4" fill="url(#${g}k)"/>
<rect x="91.5" y="42" width="3.5" height="46.6" fill="url(#${g}k)"/>
<path d="M28 47.2 L95 39.6 L95 42 L28 49.6 Z" fill="#7a4f29"/>
<path d="M92.5 52 L86 46.4" stroke="#7a4f29" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  const front = `${SHELTER_SVG}<defs>
<linearGradient id="${g}w" x1="0" x2="1"><stop offset="0" stop-color="#9a6838"/><stop offset=".55" stop-color="#c38e57"/><stop offset="1" stop-color="#a87442"/></linearGradient>
<linearGradient id="${g}t" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b4bec7"/><stop offset="1" stop-color="#808b95"/></linearGradient></defs>
<rect x="25" y="54.6" width="3.5" height="39.4" fill="url(#${g}w)"/>
<path d="M28.5 54.6 L29.6 53.2 V92.6 L28.5 94 Z" fill="#6e4624"/>
<rect x="87.5" y="47" width="3.5" height="46.4" fill="url(#${g}w)"/>
<path d="M91 47 L92.1 45.6 V92 L91 93.4 Z" fill="#6e4624"/>
<path d="M28 61 L33.5 54 M88 55 L81.5 47.8" stroke="#b07b47" stroke-width="1.8" stroke-linecap="round"/>
<path d="M24 52.2 L91 44.6 L91 47 L24 54.6 Z" fill="url(#${g}w)"/>
<path d="M22 49.2 L93 41.2 L97 36.2 L26 44.2 Z" fill="url(#${g}t)"/>
<path d="M23 47.95 L94 39.95 M24 46.7 L95 38.7 M25 45.45 L96 37.45" stroke="rgba(255,255,255,.35)" stroke-width=".5"/>
<path d="M23.3 48.4 L94.3 40.4 M24.3 47.15 L95.3 39.15 M25.3 45.9 L96.3 37.9" stroke="rgba(0,0,0,.18)" stroke-width=".5"/>
<path d="M22 49.2 L93 41.2 L93 44.4 L22 52.4 Z" fill="#4c565f"/>
<path d="M28 48.5 V51.7 M34 47.8 V51 M40 47.2 V50.4 M46 46.5 V49.7 M52 45.8 V49 M58 45.1 V48.3 M64 44.4 V47.6 M70 43.8 V47 M76 43.1 V46.3 M82 42.4 V45.6 M88 41.8 V45" stroke="rgba(255,255,255,.18)" stroke-width=".5"/>
<path d="M93 41.2 L97 36.2 L97 39.4 L93 44.4 Z" fill="#3b444c"/>
<path d="M22 49.2 L26 44.2" stroke="rgba(255,255,255,.4)" stroke-width=".5"/>
<rect class="rbt-sh-led" x="88.6" y="64" width="1.4" height="3" rx=".6"/>${drip(22.5, 53.5)}</svg>`;
  return { back, front };
}

// A rectangular station seen three-quarters (#69): the robot sits half in
// its low bay, the two water tanks show their level on the front, the dust
// bin behind its panel, the lids on top. White, black or with a gold front.
const ROBOT_BOX_SKINS = {
  white: { f0: "#ffffff", f1: "#e4e9ed", side: "#c9d1d7", top: "#f6f8f9", edge: "rgba(0,0,0,.2)", panel: "#eef1f3", bay: "#8e99a2", bay2: "#d3dae0" },
  black: { f0: "#4a5158", f1: "#2b3035", side: "#1d2125", top: "#565d64", edge: "rgba(0,0,0,.5)", panel: "#383e44", bay: "#0f1114", bay2: "#24282c" },
  gold: { f0: "#ffffff", f1: "#e4e9ed", side: "#c9d1d7", top: "#f6f8f9", edge: "rgba(0,0,0,.2)", panel: "gold", bay: "#8e99a2", bay2: "#d3dae0" },
};
// A tank's level to draw: its number, or full or low when its sensor says
// so, or the usual level when nothing says it.
function tankLevel(tk, usual, raisedPct) {
  if (!tk) return usual;
  return tk.pct !== null ? tk.pct : tk.raised ? raisedPct : usual;
}
function tankVars(r) {
  const v = [];
  if (r.cleanTank) v.push(`--clean: ${Math.round(tankLevel(r.cleanTank, 75, 5))}%`);
  if (r.dirtyTank) v.push(`--dirty: ${Math.round(tankLevel(r.dirtyTank, 20, 95))}%`);
  return v.length ? ` style="${v.join("; ")}"` : "";
}
let robotBoxN = 0;
function robotBoxHtml(color, tanks) {
  const k = ROBOT_BOX_SKINS[color] ? color : "white";
  const c = ROBOT_BOX_SKINS[k];
  const g = `rbx${robotBoxN++}`;
  const X0 = 17, X1 = 79, Y0 = 10, Y1 = 74, DX = 9, DY = -5.5, BT = 52;
  const panel = c.panel === "gold" ? `url(#${g}g)` : c.panel;
  // A level window: its frame, then the water at its height.
  const tank = (cls, x, pct) => `<rect x="${x}" y="15" width="4.4" height="16" rx="1.8" fill="rgba(0,0,0,.2)" stroke="${c.edge}" stroke-width=".35"/>`
    + `<rect class="rbx-lv ${cls}" x="${x + .7}" y="${15.7 + 14.6 * (1 - pct / 100)}" width="3" height="${14.6 * pct / 100}" rx="1.2"/>`;
  const gauges = tanks ? tank("rbx-c", X0 + 5, tanks[0]) + tank("rbx-d", X1 - 9.4, tanks[1]) : "";
  return `<svg class="rbx" viewBox="0 0 96 106" aria-hidden="true"><defs>
<linearGradient id="${g}g" x1="0" x2="1"><stop offset="0" stop-color="#c9b68a"/><stop offset=".45" stop-color="#f1e6c8"/><stop offset="1" stop-color="#b6a274"/></linearGradient>
<linearGradient id="${g}f" x1="0" x2="1"><stop offset="0" stop-color="${c.f1}"/><stop offset=".35" stop-color="${c.f0}"/><stop offset="1" stop-color="${c.f1}"/></linearGradient>
<linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.bay}"/><stop offset="1" stop-color="${c.bay2}"/></linearGradient></defs>
<path d="M${X1} ${Y0} L${X1 + DX} ${Y0 + DY} V${Y1 + DY} L${X1} ${Y1} Z" fill="${c.side}" stroke="${c.edge}" stroke-width=".45"/>
<path d="M${X0} ${Y0} L${X0 + DX} ${Y0 + DY} H${X1 + DX} L${X1} ${Y0} Z" fill="${c.top}" stroke="${c.edge}" stroke-width=".45"/>
<path d="M20.5 9.2 L24.5 5.3 H52 L48 9.2 Z M50 9.2 L54 5.3 H85 L81 9.2 Z" fill="none" stroke="${c.edge}" stroke-width=".5"/>
<rect x="33" y="6.6" width="5" height="1.2" rx=".6" fill="${c.side}"/><rect x="64" y="6.6" width="5" height="1.2" rx=".6" fill="${c.side}"/>
<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" fill="url(#${g}f)" stroke="${c.edge}" stroke-width=".45"/>${gauges}
<circle cx="48" cy="20" r="2.6" fill="none" stroke="${c.edge}" stroke-width=".6"/>
<rect x="22" y="34" width="52" height="13" rx="2.4" fill="${panel}" stroke="${c.edge}" stroke-width=".45"/>
<g class="rbx-win"><rect x="25" y="36.4" width="46" height="8.2" rx="1.6" fill="rgba(40,46,52,.55)"/><rect class="rbx-dustlv" x="25" y="40.6" width="46" height="4" rx="1" fill="rgba(150,125,90,.8)"/>
<g class="rbx-dust" fill="#a1886a"><circle cx="38" cy="50" r=".9"/><circle cx="47" cy="51" r=".8"/><circle cx="56" cy="50" r=".9"/></g></g>
<rect class="rbx-led" x="45" y="48.4" width="6" height="1.4" rx=".7"/>
<rect x="20" y="${BT}" width="56" height="${Y1 - BT}" rx="3" fill="url(#${g}b)"/>
<path d="M22.5 ${BT + 2.4} H73.5" stroke="rgba(255,255,255,.14)" stroke-width=".7"/>
<path d="M20 ${Y1} H83 L75 89 H12 Z" fill="${c.side}" stroke="${c.edge}" stroke-width=".45" opacity=".9"/>
<path d="M24 77.5 H79 M19 82.5 H77" stroke="rgba(0,0,0,.1)" stroke-width=".5"/></svg>`;
}

function robotHtml(cls, r) {
  if (r.layout === "pool") return ntHtml(`${cls} rbt rbt-l-pool rbt-m-${r.mode || "docked"}`, { kind: "pool", on: r.mode === "cleaning", lcd: r.poolTime || "" });
  if (r.layout === "stick" || r.layout === "floor_washer") {
    return `
        <div class="machine ${cls} rbt rbt-l-${r.layout} rbt-m-${r.mode || "docked"}">${r.layout === "stick" ? dysonSvg(r.battery) : washerSvg(r.battery)}</div>`;
  }
  const layout = ROBOT_LAYOUTS.includes(r.layout) ? r.layout : "vacuum";
  // The floor it works on: the one of its kind, or the one chosen (#49).
  const floor = ROBOT_FLOORS.includes(r.floor) ? r.floor : layout === "mop" ? "tiles" : "rug";
  const floorCls = `rbt-floor rbt-${floor}`;
  const mode = r.mode || "idle";
  const draw = mode === "edgecut" ? "cleaning" : mode === "docked" ? "charging" : mode === "rain" ? "charging rbt-m-raining" : mode;
  const err = ROBOT_MANGA + ROBOT_ANGER;
  // The camera module some robots carry on their bumper (#69).
  const cam = r.camera ? `<i class="rbt-cam"></i><i class="rbt-camb"></i>` : "";
  let inner;
  if (layout === "mower") {
    const sh = r.shelter ? shelterHtml(r.shelter, r.shelterColor) : { back: "", front: "" };
    inner = `<div class="rbt-lawn"></div><div class="rbt-stub"></div>${robotRain()}
          <div class="rbt-st-base"></div><div class="rbt-st-tower"></div><i class="rbt-st-led"></i>${sh.back}
          <div class="rbt-mw">${r.mowerStyle === "navimow" ? ROBOT_NAVIMOW_SVG : ROBOT_MOWER_SVG}${err}<div class="rbt-clip">${"<b></b>".repeat(6)}</div></div>
          <div class="rbt-tall"></div>${sh.front}`;
  } else if (layout === "mop") {
    const lvl = r.water !== null && r.water !== undefined ? ` style="--lvl: ${Math.round(r.water)}%"` : "";
    const tk = tankVars(r);
    const dock = r.box ? robotBoxHtml(r.boxColor, [tankLevel(r.cleanTank, 75, 5), tankLevel(r.dirtyTank, 20, 95)])
      : `<div class="rbt-mcap"></div><div class="rbt-mdock"${tk}><div class="rbt-tk rbt-c"><i></i></div><div class="rbt-tk rbt-d"><i></i></div><i class="rbt-dled"></i></div>
          <div class="rbt-plate"></div><div class="rbt-pcap"></div>`;
    inner = `<div class="${floorCls}"><i class="rbt-trace rbt-t1 rbt-wet"></i><i class="rbt-trace rbt-t2 rbt-wet"></i></div>
          ${dock}
          <div class="rbt-rm"${lvl}><div class="rbt-pad"></div><div class="rbt-sd"></div><div class="rbt-tp"></div><div class="rbt-tank"><i></i></div><div class="rbt-ring"></div>${cam}${err}</div>
          ${airFlow("rbt-vapor", 44, 17)}
          <div class="rbt-bubbles">${"<b></b>".repeat(4)}</div>`;
  } else {
    const tanks = r.cleanTank || r.dirtyTank ? [tankLevel(r.cleanTank, 75, 5), tankLevel(r.dirtyTank, 20, 95)] : null;
    const dock = r.box ? robotBoxHtml(r.boxColor, tanks)
      : `<div class="rbt-dock"><i class="rbt-dled"></i><div class="rbt-bin"><div class="rbt-fill"></div>${"<b></b>".repeat(3)}</div></div><div class="rbt-dcap"></div>
          <div class="rbt-plate"></div><div class="rbt-pcap"></div>`;
    inner = `<div class="${floorCls}"></div>
          ${dock}
          <div class="rbt-rb"><div class="rbt-brush"><i></i></div><div class="rbt-sd"></div><div class="rbt-bmp"></div><div class="rbt-tp"></div><div class="rbt-lidw"></div><div class="rbt-lid"></div><div class="rbt-ring"></div>${cam}${err}</div>`;
  }
  return `
        <div class="machine ${cls} rbt rbt-l-${layout} rbt-m-${draw}${r.base ? " rbt-base" : ""}${r.box && layout !== "mower" ? ` rbt-box rbx-${ROBOT_BOX_SKINS[r.boxColor] ? r.boxColor : "white"}` : ""}${r.shelter ? ` rbt-roof rbt-sh-${r.shelter}` : ""}">
          ${inner}
        </div>`;
}


return {
draw: (cls, ctx) => robotHtml(cls, ctx.robot || {}),
css: () => `${NT_CSS}${MINI_LCD_CSS}
        .machine.rbt { --b: var(--ac-body, #3a3f45); --bh: var(--ac-body-hi, #5a6168); --bl: var(--ac-body-lo, #1d2024); --dk: #2b2f34; --dkh: #41474e; }
        .machine.rbt > *, .rbt-dock > *, .rbt-mdock > *, .rbt-bin > *, .rbt-tk > * { position: absolute; }
        .stk-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .rbt-l-stick { --b: var(--ac-body, #c3c9ce); --bh: var(--ac-body-hi, #eef0f2); --bl: var(--ac-body-lo, #7d858c); }
        .rbt-l-floor_washer { --b: var(--ac-body, #2a2f34); --bh: var(--ac-body-hi, #50575e); --bl: var(--ac-body-lo, #16191c); }
        .stk-cab{fill:none;stroke:#2b3137;stroke-width:1.4;stroke-linecap:round}
        .stk-ef{fill:none;stroke:#ffca28;stroke-width:1.8;stroke-dasharray:2.4 3.6;stroke-linecap:round;opacity:0}
        .rbt-m-charging .stk-ef{opacity:1;animation:stk-flow .6s linear infinite}
        @keyframes stk-flow{to{stroke-dashoffset:-12}}
        .rbt-m-away .stk-mach{opacity:.5;filter:grayscale(1)}
        .stk-bar{fill:#1f2a1f}
        .stk-bar.on,.rbt-m-docked .stk-bar.full{fill:#43d65a}
        .rbt-m-charging .stk-bar{animation:stk-bar1 2.4s steps(1) infinite}
        .rbt-m-charging .stk-bar.b2{animation-name:stk-bar2}
        .rbt-m-charging .stk-bar.b3{animation-name:stk-bar3}
        @keyframes stk-bar1{0%,100%{fill:#43d65a}}
        @keyframes stk-bar2{0%{fill:#1f2a1f}33%,100%{fill:#43d65a}}
        @keyframes stk-bar3{0%{fill:#1f2a1f}66%,100%{fill:#43d65a}}
        .fw-ring{fill:none;stroke:#2a3036;stroke-width:1.2}
        .fw-ringf{fill:none;stroke:#43a047;stroke-width:1.2;stroke-linecap:round;stroke-dasharray:18.9;stroke-dashoffset:var(--fw-off,0)}
        .rbt-m-charging .fw-ringf{animation:fw-fill 2.4s ease-in-out infinite}
        .rbt-m-off .fw-ringf,.rbt-m-unav .fw-ringf{stroke-dashoffset:18.9}
        .rbt-m-washing .fw-ringf{stroke:#29b6f6;animation:fw-spin 1.2s linear infinite;stroke-dasharray:6 12.9}
        @keyframes fw-fill{0%{stroke-dashoffset:18.9}80%,100%{stroke-dashoffset:0}}
        @keyframes fw-spin{to{stroke-dashoffset:-18.9}}
        .fw-dirt{display:none}
        .rbt-m-full .fw-dirt{display:block}
        .rbt-m-empty .fw-clean{fill:#5c656d}
        .fw-fz{animation:none}
        .rbt-m-washing .fw-roll{animation:fw-roll .5s linear infinite}
        @keyframes fw-roll{to{transform:translateX(-3px)}}
        .fw-bub{opacity:0}
        .rbt-m-washing .fw-bub{opacity:1}
        .fw-bub circle{fill:rgba(170,220,255,.85);stroke:rgba(80,160,220,.6);stroke-width:.3;animation:fw-bub 1.4s ease-in infinite}
        .fw-bub circle:nth-child(2){--d0:-.5s}
        .fw-bub circle:nth-child(3){--d0:-.9s}
        @keyframes fw-bub{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-9px);opacity:0}}
        .stk-led{fill:#5a636b}
        .rbt-m-charging .stk-led{fill:#43a047;animation:stk-breathe 1.6s ease-in-out infinite}
        .rbt-m-docked .stk-led,.rbt-m-away .stk-led,.rbt-m-washing .stk-led{fill:#43a047}
        .rbt-m-error .stk-led{fill:#f44336;animation:rbt-blink 1s steps(1) infinite}
        @keyframes stk-breathe{0%,100%{opacity:.35}50%{opacity:1}}
        .rbt-l-stick .en-smoke,.rbt-l-stick .en-ang,.rbt-l-floor_washer .en-smoke,.rbt-l-floor_washer .en-ang{display:none}
        .rbt-m-error .en-smoke,.rbt-m-error .en-ang{display:block}
        .en-smoke .en-pf{transform-box:fill-box;transform-origin:50% 100%;animation:en-puff 2s ease-out infinite}
        .en-smoke .en-pf2{--d0:-1s}
        .en-smoke .en-o{fill:#111417}
        .en-smoke .en-f{fill:#6b737b}
        .en-ang path{fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round}
        .en-ang{transform-box:fill-box;transform-origin:center;animation:en-angp .7s ease-in-out infinite alternate}
        @keyframes en-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        @keyframes en-angp{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .machine.rbt-l-stick.rbt-m-unav,.machine.rbt-l-floor_washer.rbt-m-unav{opacity:.45;filter:grayscale(1)}
        .rbt-floor{left:2px;right:2px;top:72px;height:34px;clip-path:polygon(12% 0,88% 0,100% 100%,0 100%)}
        .rbt-parquet{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='12'%3E%3Crect width='30' height='6' fill='%23c99b67'/%3E%3Crect y='6' width='30' height='6' fill='%23b98854'/%3E%3Cpath d='M0 0 V6 M15 6 V12 M0 6 H30 M0 12 H30' stroke='%237a5130' stroke-opacity='.45' stroke-width='.8'/%3E%3Cpath d='M3 2 H11 M19 3.5 H27 M6 9 H13 M20 8.5 H25' stroke='%239c6c3c' stroke-opacity='.35' stroke-width='.5'/%3E%3C/svg%3E") 0 0/30px 12px}
        .rbt-smooth{background:radial-gradient(ellipse at 50% 15%,rgba(255,255,255,.75),transparent 60%),linear-gradient(180deg,#e7ebee,#cfd6dc)}
        .rbt-rug{background:repeating-linear-gradient(90deg,#c8b79c 0 3px,#bfae92 3px 6px)}
        .rbt-tiles{background:linear-gradient(90deg,rgba(0,0,0,.08) 1px,transparent 1px) 0 0/12px 100%,linear-gradient(180deg,rgba(0,0,0,.08) 1px,transparent 1px) 0 0/100% 9px,#dfe4e8}
        .rbt-lawn{left:0;right:0;top:60px;height:46px;clip-path:polygon(10% 0,90% 0,100% 100%,0 100%);background:radial-gradient(ellipse at 50% 0,#6db457,#559d41 70%,#4a8f37)}
        .rbt-trace{height:9px;width:0;opacity:0}
        .rbt-trace.rbt-t1{left:6px;top:80px}
        .rbt-trace.rbt-t2{right:6px;top:88px}
        .rbt-floor .rbt-trace{position:absolute}
        .rbt-floor .rbt-trace.rbt-t1{left:2px;top:8px}
        .rbt-floor .rbt-trace.rbt-t2{right:2px;top:16px}
        .rbt-rugtrace{background:repeating-linear-gradient(90deg,#d6c7ae 0 3px,#cdbca1 3px 6px)}
        .rbt-wet{background:linear-gradient(180deg,rgba(79,195,247,.15),rgba(79,195,247,.45),rgba(79,195,247,.15));border-radius:3px}
        .rbt-cut{background:repeating-linear-gradient(90deg,#8fcf6f 0 1.5px,#9fd97e 1.5px 3.5px)}
        .rbt-m-cleaning .rbt-t1{animation:rbt-t1 9s linear infinite}
        .rbt-m-cleaning .rbt-t2{animation:rbt-t2 9s linear infinite}
        @keyframes rbt-t1{0%{width:0;opacity:1}45%{width:72px;opacity:1}95%{width:72px;opacity:.5}100%{width:72px;opacity:0}}
        @keyframes rbt-t2{0%,50%{width:0;opacity:1}95%{width:74px;opacity:1}100%{width:74px;opacity:0}}
        /* Back and forth on the floor, which leans: the far row sits further
           right than the near one (#69). */
        @keyframes rbt-path{0%{transform:translate(-9px,8px)}45%{transform:translate(17px,8px)}50%{transform:translate(12px,16px)}95%{transform:translate(-14px,16px)}100%{transform:translate(-9px,8px)}}
        @keyframes rbt-ret{0%{transform:translate(12px,16px)}65%,100%{transform:translate(0,0)}}
        .rbt-dock{left:28px;top:14px;width:40px;height:56px;border-radius:0 0 20px 20px/0 0 6px 6px;background:linear-gradient(90deg,var(--bl),var(--b) 18%,var(--bh) 38%,var(--b) 68%,var(--bl))}
        .rbt-dcap{left:28px;top:8px;width:40px;height:12px;border-radius:50%;background:radial-gradient(ellipse at 45% 40%,var(--bh),var(--b) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}
        .rbt-plate{left:30px;top:72px;width:36px;height:5px;border-radius:0 0 18px 18px/0 0 4px 4px;background:linear-gradient(90deg,var(--bl),var(--dk) 40%,var(--bl))}
        .rbt-pcap{left:30px;top:66px;width:36px;height:9px;border-radius:50%;background:radial-gradient(ellipse at 50% 35%,var(--dkh),var(--dk) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)}
        .rbt-pcap::before,.rbt-pcap::after{content:"";position:absolute;top:4px;width:6px;height:1.5px;border-radius:1px;background:#b0b7be}
        .rbt-pcap::before{left:9px}
        .rbt-pcap::after{right:9px}
        .rbt-dled{left:18px;top:4px;width:4px;height:2px;border-radius:1px;background:#3d434a}
        .rbt-bin{left:9px;top:10px;width:22px;height:24px;border-radius:4px;background:rgba(15,18,22,.55);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
        .rbt-bin .rbt-fill{left:0;right:0;bottom:0;height:var(--fill,30%);background:linear-gradient(180deg,#a99b86,#8d806d);transition:height 1s}
        .rbt-bin b{position:absolute;bottom:0;width:2px;height:2px;border-radius:50%;background:#bdb09a;opacity:0}
        .rbt-bin b:nth-child(2){left:6px}
        .rbt-bin b:nth-child(3){left:11px;--d0:.3s}
        .rbt-bin b:nth-child(4){left:16px;--d0:.6s}
        .rbt-m-emptying .rbt-bin b{animation:rbt-dust .9s linear infinite}
        .rbt-m-emptying .rbt-bin .rbt-fill{animation:rbt-fillup 6s ease-in-out infinite}
        @keyframes rbt-dust{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-22px);opacity:0}}
        @keyframes rbt-fillup{0%{height:30%}100%{height:62%}}
        .rbt-m-charging .rbt-dled,.rbt-m-emptying .rbt-dled{background:#2ecc71;box-shadow:0 0 3px #2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-rb{left:22px;top:60px;width:52px;height:27px}
        .rbt-rb>*{position:absolute}
        .rbt-rb .rbt-sd{left:0;top:9px;width:52px;height:18px;border-radius:0 0 26px 26px/0 0 9px 9px;background:linear-gradient(90deg,var(--bl),var(--b) 20%,var(--bh) 40%,var(--b) 65%,var(--bl));box-shadow:0 2px 3px rgba(0,0,0,.25)}
        .rbt-rb .rbt-bmp{left:0;top:9px;width:52px;height:14px;box-sizing:border-box;border-radius:0 0 26px 26px/0 0 9px 9px;border-bottom:1px solid rgba(0,0,0,.4)}
        .rbt-rb .rbt-tp{left:0;top:0;width:52px;height:18px;border-radius:50%;background:radial-gradient(ellipse at 45% 40%,var(--bh),var(--b) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)}
        .rbt-rb .rbt-lidw{left:20px;top:3px;width:12px;height:5px;border-radius:0 0 6px 6px/0 0 2.5px 2.5px;background:linear-gradient(90deg,#15181b,#3b4148 40%,#15181b)}
        .rbt-rb .rbt-lid{left:20px;top:.5px;width:12px;height:5px;border-radius:50%;background:radial-gradient(ellipse at 45% 40%,#4a5057,#24282c 80%)}
        .rbt-rb .rbt-ring{left:20px;top:10px;width:12px;height:4.5px;border-radius:50%;box-shadow:0 0 0 1.3px #59606a;background:var(--dk)}
        .rbt-rb .rbt-brush{left:0;bottom:0;width:24px;height:24px;transform:scaleY(.38);transform-origin:bottom}
        .rbt-rb .rbt-brush i{position:absolute;inset:0;border-radius:50%;background:conic-gradient(#1c1f23 0 6%,transparent 6% 33%,#1c1f23 33% 39%,transparent 39% 66%,#1c1f23 66% 72%,transparent 72%)}
        .rbt-m-cleaning .rbt-rb{animation:rbt-path 9s linear infinite}
        .rbt-m-cleaning .rbt-rb .rbt-brush i{animation:rbt-spin .35s linear infinite}
        .rbt-m-returning .rbt-rb{animation:rbt-ret 4.5s ease-in-out infinite}
        .rbt-m-paused .rbt-rb,.rbt-m-error .rbt-rb{transform:translate(-16px,14px)}
        .rbt-m-error .rbt-rb{transform:translate(-16px,14px) rotate(-9deg)}
        .rbt-ring{box-shadow:0 0 0 1.3px #59606a}
        .rbt-m-charging .rbt-ring{box-shadow:0 0 0 1.3px #2ecc71,0 0 4px #2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-cleaning .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7,0 0 4px #4fc3f7}
        .rbt-m-returning .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7,0 0 4px #4fc3f7;animation:rbt-blink 1.2s steps(1) infinite}
        .rbt-m-paused .rbt-ring{box-shadow:0 0 0 1.3px #ffb300}
        .rbt-m-full .rbt-ring,.rbt-m-empty .rbt-ring{box-shadow:0 0 0 1.3px #ff9800,0 0 4px #ff9800}
        .rbt-m-emptying .rbt-ring{box-shadow:0 0 0 1.3px #2ecc71}
        .rbt-m-error .rbt-ring{box-shadow:0 0 0 1.3px #f44336,0 0 5px #f44336;animation:rbt-blink 1s steps(1) infinite}
        .rbt-rm{left:24px;top:60px;width:48px;height:27px}
        .rbt-rm>*{position:absolute}
        .rbt-rm .rbt-sd{left:0;top:9px;width:48px;height:16px;border-radius:0 0 12px 12px/0 0 8px 8px;background:linear-gradient(90deg,var(--bl),var(--b) 20%,var(--bh) 40%,var(--b) 65%,var(--bl));box-shadow:0 2px 3px rgba(0,0,0,.25)}
        .rbt-rm .rbt-pad{left:4px;bottom:-1px;width:40px;height:4px;border-radius:0 0 6px 6px;background:#cfd8dc}
        .rbt-m-cleaning .rbt-rm .rbt-pad{background:#81d4fa}
        .rbt-rm .rbt-tp{left:0;top:0;width:48px;height:18px;border-radius:12px/8px;background:radial-gradient(ellipse at 40% 30%,var(--bh),var(--b) 70%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.18)}
        .rbt-rm .rbt-tank{left:6px;top:4px;width:18px;height:9px;border-radius:3px;background:rgba(15,18,22,.35);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
        .rbt-rm .rbt-tank i{position:absolute;left:0;right:0;bottom:0;height:var(--lvl,70%);background:linear-gradient(180deg,#81d4fa,#29b6f6)}
        .rbt-m-empty .rbt-rm .rbt-tank i{background:#ff9800;height:12%}
        .rbt-rm .rbt-ring{left:30px;top:6px;width:11px;height:5px;border-radius:50%;background:var(--dk)}
        .rbt-m-cleaning .rbt-rm{animation:rbt-path 9s linear infinite}
        .rbt-m-returning .rbt-rm{animation:rbt-ret 4.5s ease-in-out infinite}
        .rbt-m-paused .rbt-rm,.rbt-m-empty .rbt-rm{transform:translate(-16px,14px)}
        .rbt-m-error .rbt-rm{transform:translate(-16px,14px) rotate(-9deg)}
        .rbt-mdock{left:22px;top:16px;width:52px;height:56px;border-radius:0 0 6px 6px;background:linear-gradient(90deg,var(--bl),var(--bh) 35%,var(--b) 70%,var(--bl));box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
        .rbt-mdock .rbt-tk{top:4px;width:19px;height:26px;border-radius:4px;overflow:hidden;background:rgba(15,18,22,.45);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
        .rbt-mdock .rbt-tk.rbt-c{left:5px}
        .rbt-mdock .rbt-tk.rbt-d{right:5px}
        .rbt-mdock .rbt-tk i{position:absolute;left:0;right:0;bottom:0}
        .rbt-mdock .rbt-tk.rbt-c i{height:var(--clean,75%);background:linear-gradient(180deg,#81d4fa,#29b6f6)}
        .rbt-mdock .rbt-tk.rbt-d i{height:var(--dirty,20%);background:linear-gradient(180deg,#a1887f,#795548)}
        .rbt-mdock .rbt-dled{left:24px;top:35px}
        .rbt-mcap{left:22px;top:9px;width:52px;height:13px;border-radius:8px/6px;background:linear-gradient(180deg,var(--bh),var(--b));box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}
        .rbt-m-washing .rbt-mdock .rbt-tk.rbt-c i{animation:rbt-drain 6s linear infinite}
        .rbt-m-washing .rbt-mdock .rbt-tk.rbt-d i{animation:rbt-fillup 6s linear infinite}
        @keyframes rbt-drain{0%{height:75%}100%{height:45%}}
        .rbt-bubbles{left:24px;top:76px;width:48px;height:8px;opacity:0}
        .rbt-m-washing .rbt-bubbles{opacity:1}
        .rbt-bubbles b{position:absolute;bottom:0;width:4px;height:4px;border-radius:50%;border:1px solid rgba(129,212,250,.9);animation:rbt-bub 1.3s ease-out infinite}
        .rbt-bubbles b:nth-child(1){left:4px}
        .rbt-bubbles b:nth-child(2){left:16px;--d0:.4s}
        .rbt-bubbles b:nth-child(3){left:28px;--d0:.8s}
        .rbt-bubbles b:nth-child(4){left:40px;--d0:.2s}
        @keyframes rbt-bub{0%{transform:translateY(0) scale(.5);opacity:0}30%{opacity:1}100%{transform:translateY(-12px) scale(1);opacity:0}}
        .rbt-vapor{left:26px;top:70px;width:44px;height:17px}
        .rbt-m-drying .rbt-vapor{display:block}
        .rbt-vapor path{stroke:#ff8a65}
        .rbt-smoke{position:absolute;display:none;overflow:visible;left:6px;top:-30px;width:40px;height:30px}
        .rbt-m-error .rbt-smoke{display:block}
        .rbt-smoke .rbt-pf{transform-box:fill-box;transform-origin:50% 100%;animation:rbt-puff 2s ease-out infinite}
        .rbt-smoke .rbt-pf2{--d0:-1s}
        .rbt-smoke .rbt-o{fill:#111417}
        .rbt-smoke .rbt-f{fill:#6b737b}
        .rbt-smoke .rbt-hl{fill:none;stroke:rgba(255,255,255,.75);stroke-width:1;stroke-linecap:round}
        @keyframes rbt-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        .rbt-angm{position:absolute;display:none;width:12px;height:12px;overflow:visible;z-index:2}
        .rbt-m-error .rbt-angm{display:block}
        .rbt-rb .rbt-angm{left:38px;top:-4px}
        .rbt-rm .rbt-angm{left:35px;top:-3px}
        .rbt-mw .rbt-angm{left:44px;top:6px;width:12px;height:12px}
        .rbt-angm .rbt-ang{fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:rbt-ang .7s ease-in-out infinite alternate}
        @keyframes rbt-ang{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .rbt-rb .rbt-smoke,.rbt-rm .rbt-smoke{left:2px;top:-26px}
        .rbt-mw .rbt-smoke{left:4px;top:-22px}
        .rbt-smoke{transform-origin:50% 100%}
        .rbt-m-error .rbt-rb .rbt-smoke,.rbt-m-error .rbt-rm .rbt-smoke{transform:rotate(9deg)}
        .rbt-m-error .rbt-mw .rbt-smoke{transform:rotate(7deg)}
        .rbt-vapor{opacity:.8}
        .rbt-m-drying .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-washing .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7;animation:rbt-breathe 1.2s ease-in-out infinite}
        .rbt-st-base{left:40px;top:83px;width:56px;height:8px;border-radius:50%;background:radial-gradient(ellipse at 50% 35%,var(--dkh),var(--dk) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
        .rbt-st-tower{left:80px;top:66px;width:14px;height:22px;border-radius:7px 7px 2px 2px;background:linear-gradient(90deg,var(--bl),var(--b) 30%,var(--bh) 50%,var(--b) 75%,var(--bl))}
        .rbt-st-tower::after{content:"";position:absolute;left:-3px;top:13px;width:4px;height:3px;border-radius:1px;background:#b0b7be}
        .rbt-sh{position:absolute;left:0;top:0;width:96px;height:106px;overflow:visible;pointer-events:none}
        .rbt-roof .rbt-st-tower,.rbt-roof .rbt-st-led{display:none}
        .rbt-sh-led{fill:#3d434a}
        .rbt-m-charging .rbt-sh-led{fill:#2ecc71;filter:drop-shadow(0 0 1px #2ecc71);animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-sh-drip{fill:rgba(150,195,240,.95);display:none}
        .rbt-m-raining .rbt-sh-drip{display:block;animation:rbt-sh-drip 1.6s ease-in infinite}
        @keyframes rbt-sh-drip{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(26px);opacity:0}}
        .rbt-sh-lean_to .rbt-rain{clip-path:path(evenodd,'M-20 -20 H140 V140 H-20 Z M22 49.2 L26 44.2 L97 36.2 V140 H22 Z')}
        .rbt-sh-garage .rbt-rain{clip-path:path(evenodd,'M-20 -20 H140 V140 H-20 Z M20 52 L26 46 L86 39.6 C94 38.8 98.6 42 98.6 49 V140 H20 Z')}
        .rbt-sh-shell .rbt-rain{clip-path:path(evenodd,'M-20 -20 H140 V140 H-20 Z M25 59 L29 54 C32 41 48 33.5 65 33 C81 32.5 94 37 96 47 V140 H25 Z')}
        .rbt-st-led{left:86px;top:70px;width:2px;height:4px;border-radius:1px;background:#3d434a}
        .rbt-m-charging .rbt-st-led{background:#2ecc71;box-shadow:0 0 3px #2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-mw{left:30px;top:53px;width:62px;height:35px;transform-origin:50% 100%}
        .rbt-mw svg{position:absolute;left:0;top:0;width:62px;height:35px;overflow:visible}
        .rbt-mw .rbt-whl{transform-box:fill-box;transform-origin:center}
        .rbt-mw .rbt-led{fill:#59606a}
        .rbt-m-charging .rbt-mw .rbt-led{fill:#2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-cleaning .rbt-mw .rbt-led{fill:#4fc3f7}
        .rbt-m-returning .rbt-mw .rbt-led{fill:#4fc3f7;animation:rbt-blink 1.2s steps(1) infinite}
        .rbt-m-paused .rbt-mw .rbt-led{fill:#ffb300}
        .rbt-m-error .rbt-mw .rbt-led{fill:#f44336;animation:rbt-blink 1s steps(1) infinite}
        @keyframes rbt-mowpath{0%{transform:translate(-40px,8px)}45%{transform:translate(-4px,8px)}48%{transform:translate(-4px,8px) scaleX(-1)}95%{transform:translate(-40px,8px) scaleX(-1)}98%,100%{transform:translate(-40px,8px)}}
        @keyframes rbt-mowret{0%{transform:translate(-32px,8px)}70%,100%{transform:translate(0,0)}}
        .rbt-m-cleaning .rbt-mw{transform:translate(-14px,8px);animation:rbt-bob .5s ease-in-out infinite}
        @keyframes rbt-bob{50%{transform:translate(-14px,7.6px)}}
        .rbt-m-cleaning .rbt-st-base,.rbt-m-cleaning .rbt-st-tower,.rbt-m-cleaning .rbt-st-led,.rbt-m-cleaning .rbt-sh{display:none}
        .rbt-m-cleaning .rbt-mw .rbt-whl{animation:rbt-spin .9s linear infinite}
        .rbt-m-returning .rbt-mw{animation:rbt-mowret 4.5s ease-in-out infinite}
        .rbt-m-returning .rbt-mw .rbt-whl{animation:rbt-whlret 4.5s ease-in-out infinite}
        @keyframes rbt-whlret{0%{transform:rotate(0)}70%,100%{transform:rotate(1080deg)}}
        .rbt-m-paused .rbt-mw{transform:translate(-30px,8px)}
        .rbt-m-error .rbt-mw{transform:translate(-30px,8px) rotate(-7deg)}
        .rbt-stub{left:2px;top:92px;height:5px;width:46px;border-radius:2px;background:repeating-linear-gradient(90deg,#8bcf6c 0 1px,#79bf5c 1px 2.5px);display:none}
        .rbt-m-cleaning .rbt-stub{display:block;animation:rbt-scroll 1.4s linear infinite}
        .rbt-tall{left:48px;top:81px;width:47px;height:16px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='16'%3E%3Cpath d='M0.0 16 Q-0.7 10.2 -0.9 6.4 Q1.2 11.2 1.7 16Z' fill='%233f8a2e'/%3E%3Cpath d='M1.8 16 Q2.0 11.3 3.2 8.2 Q3.8 12.1 3.7 16Z' fill='%234f9b3a'/%3E%3Cpath d='M2.6 16 Q1.8 9.7 1.1 5.5 Q3.3 10.8 3.9 16Z' fill='%236fbd55'/%3E%3Cpath d='M3.5 16 Q4.4 9.1 6.6 4.5 Q5.9 10.2 5.2 16Z' fill='%23468f33'/%3E%3Cpath d='M5.4 16 Q5.2 9.0 5.9 4.4 Q7.3 10.2 7.4 16Z' fill='%233f8a2e'/%3E%3Cpath d='M6.9 16 Q6.7 11.2 7.3 7.9 Q8.4 12.0 8.5 16Z' fill='%23468f33'/%3E%3Cpath d='M8.1 16 Q7.4 7.9 7.3 2.5 Q9.3 9.2 9.7 16Z' fill='%234f9b3a'/%3E%3Cpath d='M9.3 16 Q8.4 9.2 7.8 4.6 Q9.9 10.3 10.6 16Z' fill='%234f9b3a'/%3E%3Cpath d='M10.7 16 Q11.3 9.2 12.9 4.7 Q12.7 10.4 12.3 16Z' fill='%236fbd55'/%3E%3Cpath d='M12.0 16 Q11.3 10.6 11.3 7.0 Q13.3 11.5 13.8 16Z' fill='%233f8a2e'/%3E%3Cpath d='M13.4 16 Q14.2 9.3 16.2 4.8 Q15.8 10.4 15.2 16Z' fill='%235fae47'/%3E%3Cpath d='M15.0 16 Q15.0 11.4 15.7 8.4 Q16.3 12.2 16.3 16Z' fill='%235fae47'/%3E%3Cpath d='M16.0 16 Q15.0 9.5 14.5 5.1 Q17.0 10.5 17.7 16Z' fill='%23468f33'/%3E%3Cpath d='M17.4 16 Q17.1 7.6 17.4 2.0 Q18.9 9.0 19.2 16Z' fill='%23468f33'/%3E%3Cpath d='M18.8 16 Q18.0 8.0 17.3 2.6 Q19.5 9.3 20.1 16Z' fill='%235fae47'/%3E%3Cpath d='M20.2 16 Q19.3 8.6 18.9 3.7 Q21.3 9.8 22.0 16Z' fill='%23468f33'/%3E%3Cpath d='M22.2 16 Q21.8 7.9 21.9 2.4 Q23.4 9.2 23.7 16Z' fill='%235fae47'/%3E%3Cpath d='M23.0 16 Q22.4 9.6 22.0 5.3 Q23.8 10.7 24.3 16Z' fill='%233f8a2e'/%3E%3Cpath d='M24.1 16 Q24.6 10.4 26.0 6.7 Q26.0 11.4 25.6 16Z' fill='%236fbd55'/%3E%3Cpath d='M25.0 16 Q25.1 9.6 26.2 5.4 Q27.0 10.7 26.9 16Z' fill='%236fbd55'/%3E%3Cpath d='M26.8 16 Q26.7 10.5 27.1 6.8 Q28.2 11.4 28.3 16Z' fill='%236fbd55'/%3E%3Cpath d='M28.8 16 Q28.1 11.1 27.8 7.8 Q29.7 11.9 30.2 16Z' fill='%234f9b3a'/%3E%3Cpath d='M29.6 16 Q29.0 7.8 28.7 2.4 Q30.5 9.2 31.0 16Z' fill='%234f9b3a'/%3E%3Cpath d='M30.9 16 Q31.0 10.0 32.2 6.0 Q33.0 11.0 32.9 16Z' fill='%23468f33'/%3E%3Cpath d='M32.8 16 Q33.3 8.7 34.8 3.8 Q34.8 9.9 34.4 16Z' fill='%23468f33'/%3E%3Cpath d='M34.1 16 Q33.3 9.9 33.0 5.8 Q35.2 10.9 35.8 16Z' fill='%233f8a2e'/%3E%3Cpath d='M35.1 16 Q35.0 7.1 35.5 1.1 Q36.3 8.6 36.4 16Z' fill='%23468f33'/%3E%3Cpath d='M36.0 16 Q35.3 11.8 34.9 9.0 Q36.7 12.5 37.3 16Z' fill='%235fae47'/%3E%3Cpath d='M37.5 16 Q36.9 11.5 36.8 8.4 Q38.6 12.2 39.0 16Z' fill='%235fae47'/%3E%3C/svg%3E") repeat-x 0 0/40px 16px;display:none}
        .rbt-m-cleaning .rbt-tall{display:block;animation:rbt-scroll 1.4s linear infinite}
        @keyframes rbt-scroll{to{background-position-x:-40px}}
        .rbt-clip{left:22px;top:24px;width:20px;height:12px;opacity:0}
        .rbt-m-cleaning .rbt-clip{opacity:1}
        .rbt-clip b{position:absolute;bottom:0;width:2.2px;height:1.1px;border-radius:1px;background:#8fdc6f;animation:rbt-clip .8s ease-out infinite}
        .rbt-clip b:nth-child(1){left:12px}
        .rbt-clip b:nth-child(2){left:14px;--d0:.13s}
        .rbt-clip b:nth-child(3){left:16px;--d0:.27s}
        .rbt-clip b:nth-child(4){left:13px;--d0:.4s}
        .rbt-clip b:nth-child(5){left:15px;--d0:.53s}
        .rbt-clip b:nth-child(6){left:17px;--d0:.67s}
        @keyframes rbt-clip{0%{transform:translate(0,2px) rotate(0);opacity:1}60%{opacity:1}100%{transform:translate(-9px,-4px) rotate(160deg);opacity:0}}
        .rbt-cloud{left:12px;top:2px;width:72px;height:26px;display:none}
        .rbt-m-raining .rbt-cloud{display:block}
        .rbt-cloud svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}
        .rbt-rain{left:0;top:0;width:96px;height:100px;display:none;overflow:hidden}
        .rbt-m-raining .rbt-rain{display:block}
        .rbt-rain b{position:absolute;top:24px;width:.8px;height:7px;border-radius:1px;background:linear-gradient(180deg,rgba(160,200,240,0),rgba(150,195,240,.9));transform:rotate(12deg);animation:rbt-drop var(--d,.6s) linear infinite}
        .rbt-rain u{position:absolute;width:6px;height:2px;border-radius:50%;border:.8px solid rgba(180,215,245,.9);opacity:0;animation:rbt-splash var(--d,.6s) ease-out infinite}
        @keyframes rbt-drop{0%{transform:translate(0,0) rotate(12deg);opacity:0}10%{opacity:1}100%{transform:translate(-13px,64px) rotate(12deg);opacity:1}}
        @keyframes rbt-splash{0%,80%{transform:scale(.2);opacity:0}85%{opacity:1}100%{transform:scale(1.3);opacity:0}}
        .rbt-vapor path:nth-child(2) { --d0: -0.45s; }
        .rbt-vapor path:nth-child(3) { --d0: -0.9s; }
        .rbx{position:absolute;left:0;top:0;width:96px;height:106px;overflow:visible}
        .rbt-l-vacuum .rbt-floor,.rbt-l-mop .rbt-floor{left:0;width:78px;clip-path:none;overflow:hidden;transform:skewX(-28deg);transform-origin:50% 100%}
        .machine.rbt.rbx-white,.machine.rbt.rbx-gold{--b:var(--ac-body,#eef1f3);--bh:var(--ac-body-hi,#ffffff);--bl:var(--ac-body-lo,#aab3ba);--dk:#3a4046;--dkh:#555c63}
        .rbx-lv.rbx-c{fill:#29b6f6}
        .rbx-lv.rbx-d{fill:#8d6e4f}
        .rbx-win{display:none}
        .rbt-m-emptying .rbx-win,.rbt-m-full .rbx-win{display:inline}
        .rbx-dustlv{transform-box:fill-box;transform-origin:50% 100%}
        .rbt-m-emptying .rbx-dustlv{animation:rbx-fill 6s ease-in-out infinite}
        .rbt-m-full .rbx-dustlv{transform:scaleY(1.85)}
        .rbt-m-full .rbx-dust{display:none}
        .rbx-dust circle{opacity:0;animation:rbx-dust .9s linear infinite}
        .rbx-dust circle:nth-child(2){--d0:.3s}
        .rbx-dust circle:nth-child(3){--d0:.6s}
        @keyframes rbx-dust{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-10px);opacity:0}}
        @keyframes rbx-fill{0%{transform:scaleY(1)}100%{transform:scaleY(1.7)}}
        .rbx-led{fill:#9aa3ab}
        .rbx-black .rbx-led{fill:#5a636b}
        .rbt-m-charging .rbx-led,.rbt-m-emptying .rbx-led,.rbt-m-washing .rbx-led,.rbt-m-drying .rbx-led{fill:#2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-full .rbx-led,.rbt-m-empty .rbx-led{fill:#ff9800}
        .rbt-m-error .rbx-led{fill:#f44336;animation:rbt-blink 1s steps(1) infinite}
        .rbt-cam{display:block;left:19px;top:18.5px;width:14px;height:5px;border-radius:2px;background:#111417;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.22)}
        .rbt-cam::before{content:"";position:absolute;left:3.4px;top:1.2px;width:2.6px;height:2.6px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#9fd3f0,#2d6b8f 45%,#0d1b24)}
        .rbt-cam::after{content:"";position:absolute;left:8.6px;top:1.8px;width:1.4px;height:1.4px;border-radius:50%;background:#e53935}
        .rbt-rm .rbt-cam{left:17px;top:18.2px;height:4.6px}
        .rbt-camb{display:none;left:9px;top:23.5px;width:34px;height:11px;clip-path:polygon(32% 0,68% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(79,195,247,.4),rgba(79,195,247,0))}
        .rbt-rm .rbt-camb{left:7px;top:22.8px}
        .rbt-m-cleaning .rbt-camb{display:block;animation:rbt-breathe 1.6s ease-in-out infinite}
        .rbt-m-cleaning .rbt-cam::after{animation:rbt-blink 1s steps(1) infinite}
        .rbt-base .rbt-dock, .rbt-base .rbt-dcap, .rbt-base .rbt-mdock, .rbt-base .rbt-mcap, .rbt-base .rbt-bubbles, .rbt-base .rbt-vapor { display: none; }
        .rbt-m-idle .rbt-rb, .rbt-m-idle .rbt-rm { transform: translate(-16px, 14px); }
        .rbt-m-idle .rbt-mw { transform: translate(-30px, 8px); }
        .machine.rbt-m-unav { opacity: 0.45; filter: grayscale(1); }
        @keyframes rbt-blink { 50% { opacity: 0.15; } }
        @keyframes rbt-breathe { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes rbt-spin { to { transform: rotate(360deg); } }
        .machine.rbt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.rbt * { animation-name: none !important; } }
  `,
};
}
