const ENERGY_CSS = `
        svg.en-e{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .en-sun,.en-moon,.en-stars,.en-clouds{display:none}
        .en-sky-day .en-sun,.en-sky-low .en-sun{display:block}
        .en-sky-low .en-clouds{display:block}
        .en-sky-night .en-moon,.en-sky-night .en-stars{display:block}
        .en-rays{transform-box:fill-box;transform-origin:center;animation:en-spin 12s linear infinite}
        .en-sky-low .en-rays{animation:none;opacity:.5}
        .en-cloud{animation:en-drift 6s ease-in-out infinite}
        .en-cloud.en-c2{--d0:-3s}
        .en-stars circle{fill:#f5d76e;animation:en-twinkle 2.4s ease-in-out infinite}
        .en-stars circle:nth-child(2){--d0:-.8s}
        .en-stars circle:nth-child(3){--d0:-1.6s}
        .en-shine{opacity:0;animation:en-shine 4s ease-in-out infinite}
        .sol-m-day .en-shine{opacity:.55}
        .sol-m-low .en-shine{opacity:.25;animation-duration:7s}
        .en-wire{fill:none;stroke:#2b3137;stroke-width:1.4}
        .sol-ef{fill:none;stroke:#ffca28;stroke-width:1.8;stroke-dasharray:2.4 3.6;stroke-linecap:round;opacity:0}
        .sol-m-day .sol-ef{opacity:1;animation:en-flow .6s linear infinite}
        .sol-m-low .sol-ef{opacity:1;animation:en-flow 1.6s linear infinite}
        .sol-led{fill:#5a636b}
        .sol-m-day .sol-led,.sol-m-low .sol-led{fill:#2ecc71}
        .sol-m-error .sol-led{fill:#f44336;animation:en-blink 1s steps(1) infinite}
        .machine.sol-m-unav,.machine.bat-m-unav{opacity:.45;filter:grayscale(1)}
        .bat-lvl{fill:#43a047}
        .bat-m-discharging .bat-lvl{fill:#fb8c00}
        .bat-low .bat-lvl{fill:#f44336}
        .bat-m-error .bat-lvl{fill:#9aa1a8}
        .bat-m-unav .bat-lvl{fill:none}
        .bat-sweep{opacity:0}
        .bat-m-charging .bat-sweep{opacity:1;animation:en-sweep 2.2s ease-in-out infinite}
        .bat-reserve{stroke:#ffb300}
        .bat-bf{fill:none;stroke-width:2;stroke-dasharray:3 4;stroke-linecap:round;opacity:0}
        .bat-m-charging .bat-bf.bat-in{opacity:1;stroke:#43a047;animation:en-flow .7s linear infinite}
        .bat-m-discharging .bat-bf.bat-out{opacity:1;stroke:#ff9800;animation:en-flow .7s linear infinite}
        .bat-led{fill:#5a636b}
        .bat-m-charging .bat-led{fill:#43a047;animation:en-breathe 1.6s ease-in-out infinite}
        .bat-m-discharging .bat-led{fill:#ff9800}
        .bat-m-idle .bat-led,.bat-m-full .bat-led{fill:#43a047}
        .bat-m-error .bat-led{fill:#f44336;animation:en-blink 1s steps(1) infinite}
        .bat-lcd{font:700 10px/1 Roboto,Arial,sans-serif;fill:#7fe3ff;text-anchor:middle}
        .bat-m-charging .bat-lcd,.bat-m-full .bat-lcd{fill:#9cf09a}
        .bat-m-discharging .bat-lcd{fill:#ffcc80}
        .bat-low .bat-lcd{fill:#ff8a80}
        .bat-bolt{display:none}
        .bat-m-charging .bat-bolt{display:block;animation:en-breathe 1.6s ease-in-out infinite}
        .en-smoke,.en-ang{display:none}
        .sol-m-error .en-smoke,.sol-m-error .en-ang,.bat-m-error .en-smoke,.bat-m-error .en-ang{display:block}
        .en-smoke .en-pf{transform-box:fill-box;transform-origin:50% 100%;animation:en-puff 2s ease-out infinite}
        .en-smoke .en-pf2{--d0:-1s}
        .en-smoke .en-o{fill:#111417}
        .en-smoke .en-f{fill:#6b737b}
        .en-ang path{fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round}
        .en-ang{transform-box:fill-box;transform-origin:center;animation:en-angp .7s ease-in-out infinite alternate}
        @keyframes en-spin{to{transform:rotate(360deg)}}
        @keyframes en-drift{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
        @keyframes en-twinkle{0%,100%{opacity:.25}50%{opacity:1}}
        @keyframes en-shine{0%{transform:translateX(-70px)}60%,100%{transform:translateX(90px)}}
        @keyframes en-flow{to{stroke-dashoffset:-14}}
        @keyframes en-blink{50%{opacity:.15}}
        @keyframes en-breathe{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes en-sweep{from{transform:translateY(0)}to{transform:translateY(-40px)}}
        @keyframes en-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        @keyframes en-angp{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .machine.en * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.en * { animation-name: none !important; } }
`;

// Shared by the washer, the dryer, the oven and the microwave.
const AP_CSS = `
        svg.ap-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .ap-steam path { opacity: 0; transform-box: fill-box; transform-origin: center bottom; }
        @keyframes ap-glow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes ap-steam { 0% { transform: translateY(0) scaleX(1); opacity: 0; } 30% { opacity: 0.6; } 100% { transform: translateY(-14px) scaleX(1.6); opacity: 0; } }
`;

// A thermostat's light and flame, and a valve's radiator giving off its heat.
const TH_CSS = `
        @keyframes th-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .th-heat .th-pulse { animation: th-pulse 2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .th-flame { transform-box: fill-box; transform-origin: center bottom; }
        .th-heat .th-flame { animation: th-flick 0.9s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes th-flick { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.12); } }
        .th-wave { opacity: 0; }
        .th-heat .th-wave { animation: th-wave 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .th-heat .th-wave.w2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .th-heat .th-wave.w3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes th-wave { 0% { transform: translateY(4px); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translateY(-10px); opacity: 0; } }
        .th-svg text, .bl-svg text { font-family: inherit; }
`;

const ILLUSTRATION_CSS = {
  thermostat: () => `${AP_CSS}${TH_CSS}`,
  nt: () => NT_CSS,
  printer_3d: (color) => `
        .p3-case {
          position: absolute; left: 6px; right: 6px; top: 2px; bottom: 5px; border-radius: 6px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .p3-window {
          position: absolute; left: 6px; right: 6px; top: 6px; bottom: 18px; border-radius: 3px; overflow: hidden;
          background: #1b1e23; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
        }
        .machine.lit .p3-window { background: #2b3038; box-shadow: inset 0 6px 12px rgba(255, 236, 179, 0.35); }
        .p3-glass { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.10), transparent 45%); pointer-events: none; }
        .p3-rail { position: absolute; left: 3px; right: 3px; top: 8px; height: 3px; border-radius: 1px; background: #5f666e; }
        .p3-head {
          position: absolute; left: 50%; top: 4px; width: 14px; height: 12px; margin-left: -7px; z-index: 2;
          border-radius: 2px; background: linear-gradient(180deg, #e0e3e6, #aab0b6);
        }
        .p3-nozzle {
          position: absolute; left: 3px; bottom: -4px; width: 0; height: 0;
          border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid #8a9096;
        }
        .machine.nozzle-hot .p3-nozzle { border-top-color: #ff7043; }
        .p3-enclosed .p3-bed {
          position: absolute; left: 8px; right: 8px; top: calc(21px + var(--p3-h, 0px)); height: 4px; border-radius: 1px;
          background: #8f969d;
        }
        .p3-enclosed.parked .p3-bed { top: auto; bottom: 8px; }
        .machine.bed-hot .p3-bed { background: linear-gradient(180deg, #ffab91, #ff7043); box-shadow: 0 0 6px rgba(255, 112, 67, 0.55); }
        .p3-part {
          position: absolute; left: 50%; bottom: 100%; width: 26px; margin-left: -13px; height: var(--p3-h, 0px);
          overflow: hidden;
        }
        .p3-shape {
          position: absolute; left: 0; bottom: 0; width: 100%; height: 40px; border-radius: 1px 1px 0 0;
          background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px 3px), ${color};
        }
        .p3-part i { position: absolute; left: 0; right: 0; bottom: calc(var(--p3-h, 0px) - 2px); height: 2px; opacity: 0; background: rgba(255, 255, 255, 0.85); }
        .p3-part-pyramid .p3-part { width: 32px; margin-left: -16px; }
        .p3-part-pyramid .p3-shape { border-radius: 0; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
        /* A rubber duck in one outline: tail, head, beak, and a round front. */
        .p3-part-duck .p3-part { width: 34px; margin-left: -17px; }
        .p3-part-duck .p3-shape {
          border-radius: 0;
          clip-path: path("M1 20 L10 24 Q13 23 15 20 C12 14 15 5 22 5 C27 5 29 8 29.5 10 L34 12.5 L34 14 L29.5 16 Q28 19 25 21 C31 22 33 26 33 30 C33 37 27 40 17 40 C7 40 2 36 2 31 C2 27 1 24 1 20 Z");
        }
        .p3-eye { position: absolute; left: 22px; top: 9px; width: 3px; height: 3px; border-radius: 50%; background: rgba(0, 0, 0, 0.55); }
        .p3-lcd {
          position: absolute; left: 10px; bottom: 4px; width: 30px; height: 9px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center; font: 600 7px/9px ui-monospace, "SF Mono", monospace;
        }
        .p3-knob { position: absolute; right: 10px; bottom: 5px; width: 7px; height: 7px; border-radius: 50%; background: #3b4048; }
        .p3-foot { position: absolute; bottom: 1px; width: 12px; height: 4px; border-radius: 0 0 2px 2px; background: #3b4048; }
        .p3-foot.f1 { left: 14px; }
        .p3-foot.f2 { right: 14px; }
        /* Open frame: two uprights and a top bar, a gantry that climbs with the
           part, and a bed on the base. */
        .p3-post { position: absolute; top: 6px; bottom: 17px; width: 4px; border-radius: 1px; background: #5f666e; }
        .p3-post.l { left: 12px; }
        .p3-post.r { right: 12px; }
        .p3-top { position: absolute; left: 12px; right: 12px; top: 6px; height: 4px; border-radius: 1px; background: #5f666e; }
        .p3-gantry { position: absolute; left: 12px; right: 12px; height: 16px; bottom: calc(22px + var(--p3-h, 0px)); }
        .p3-gantry::before { content: ""; position: absolute; left: 0; right: 0; top: 4px; height: 3px; border-radius: 1px; background: #5f666e; }
        .p3-gantry .p3-head { top: 0; }
        .p3-open .p3-bed { position: absolute; left: 18px; right: 18px; bottom: 18px; height: 4px; border-radius: 1px; background: #8f969d; }
        .p3-base {
          position: absolute; left: 6px; right: 6px; bottom: 3px; height: 14px; border-radius: 3px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .p3-base .p3-lcd { bottom: 2px; }
        .p3-base .p3-knob { bottom: 3px; }
        svg.p3r, svg.p3a { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        svg.p3a { z-index: 3; }
        .p3r-part { fill: ${color}; }
        .p3r-glow { fill: #2a2d31; }
        .machine.bed-hot .p3r-glow { fill: #ff7043; }
        .p3r-nz { fill: #8a9096; }
        .machine.nozzle-hot .p3r-nz { fill: #ff7043; }
        .p3r-light { opacity: 0.3; }
        .machine.lit .p3r-light { opacity: 1; }
        .p3r-led { opacity: 0.35; }
        .machine.moving .p3r-led { opacity: 0.9; }
        .machine.moving .p3r-hd { animation: p3r-hd 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.moving .p3r-slide { transform-box: fill-box; transform-origin: 50% 100%; animation: p3r-slide 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.moving .p3r-fan { transform-box: fill-box; transform-origin: 50% 50%; animation: p3r-fan 0.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes p3r-hd { 0%, 100% { transform: translateX(-16px); } 50% { transform: translateX(16px); } }
        @keyframes p3r-slide { 0%, 100% { transform: scale(0.965); } 50% { transform: scale(1.03); } }
        @keyframes p3r-fan { to { transform: rotate(360deg); } }
        .p3a-on { fill: #2ecc71; }
        .p3a-turn { transform-box: fill-box; transform-origin: 50% 50%; }
        .machine.moving .p3a-turn { animation: p3r-fan 2.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .p3a-flow { stroke-dasharray: 2 10; }
        .machine.moving .p3a-flow { animation: p3a-flow 1.2s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes p3a-flow { to { stroke-dashoffset: -12; } }
        .p3a-h { fill: none; stroke: #ff6d00; stroke-width: 1.5; stroke-linecap: round; opacity: 0; animation: p3a-heat 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes p3a-heat { 0% { opacity: 0; transform: translateY(3px); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes p3-move { from { transform: translateX(-14px); } to { transform: translateX(14px); } }
        @keyframes p3-draw { 0% { opacity: 0; } 30% { opacity: 0.9; } 100% { opacity: 0; } }
        .machine.moving .p3-head { animation: p3-move 1.6s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .machine.moving.has-part .p3-part i { animation: p3-draw 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
      `,
  laundry: (color) => `${AP_CSS}
        /* The water takes the colour of the state; the laundry turns with
           the drum, much faster on a spin, and a dryer's drum glows warm. */
        .ap-lcd { fill: #4fc3f7; }
        .machine.drying .ap-lcd { fill: #ffb74d; }
        .ap-dial { stroke: #4fc3f7; }
        .ap-water { fill: ${color}; opacity: 0.8; transform-box: fill-box; transform-origin: center; transition: fill 1s linear; }
        .ap-load { transform-box: fill-box; transform-origin: center; }
        .ap-warm { opacity: 0; }
        .machine.spinning .ap-load { animation: ap-tumble 2.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning.spin-cycle .ap-load { animation-duration: 0.7s; }
        .machine.spinning .ap-water { animation: ap-slosh 1.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .ap-warm { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ap-tumble { to { transform: rotate(360deg); } }
        @keyframes ap-slosh { 0%, 100% { transform: translateX(-2px) rotate(-3deg); } 50% { transform: translateX(2px) rotate(3deg); } }
  `,
  dishwasher: (color) => `
        /* A dishwasher is front-loading, but its door hinges at the bottom.
           Keep the same compact, CSS-only visual language as the other types. */
        .dw-body {
          position: absolute; inset: 0; border-radius: 10px 10px 6px 6px;
          background: linear-gradient(145deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)), var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
          perspective: 260px;
        }
        .dw-controls {
          position: absolute; top: 6px; left: 8px; right: 8px; height: 12px;
          border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 3px;
          background: rgba(20, 22, 23, 0.78);
        }
        .dw-controls::before,
        .dw-controls::after {
          content: ""; position: absolute; top: 3px; width: 4px; height: 4px;
          border-radius: 50%; background: #697078;
        }
        .dw-controls::before { right: 5px; }
        .dw-controls::after { right: 12px; }
        .dw-screen {
          position: absolute; top: 2px; left: 4px; width: 24px; height: 6px;
          border-radius: 2px; background: #16292e;
          box-shadow: inset 0 0 0 1px rgba(129, 213, 205, 0.3);
        }
        .dw-cavity {
          position: absolute; top: 22px; right: 8px; bottom: 8px; left: 8px;
          overflow: hidden; border: 3px solid #34383b; border-radius: 4px;
          background: linear-gradient(180deg, #33474f, #7d8f95);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.34);
        }
        .machine.done .dw-plate {
          border-color: #b9f6ca;
          background: linear-gradient(90deg, transparent 0 22%, rgba(185, 246, 202, 0.62) 50%, transparent 78%);
          box-shadow: inset 0 0 0 1px rgba(185, 246, 202, 0.55), 0 0 8px rgba(105, 240, 174, 0.65);
        }
        .dw-rack {
          position: absolute; right: 10%; bottom: 13%; left: 10%; height: 34%;
          border-top: 1px solid rgba(222, 232, 235, 0.76);
          border-bottom: 1px solid rgba(222, 232, 235, 0.5);
          background: repeating-linear-gradient(90deg, transparent 0 7px, rgba(222, 232, 235, 0.58) 8px 9px);
          transform: perspective(100px) rotateX(18deg);
        }
        .dw-dishes {
          position: absolute; right: 15%; bottom: 17%; left: 15%; z-index: 1; height: 43%;
        }
        .dw-plate {
          position: absolute; bottom: 0; width: 9px; height: 18px;
          border: 1px solid rgba(240, 242, 244, 0.62); border-radius: 50%;
          background: linear-gradient(90deg, transparent 0 28%, rgba(240, 242, 244, 0.14) 50%, transparent 72%);
          box-shadow: inset 0 0 0 1px rgba(240, 242, 244, 0.12);
        }
        .dw-plate-a { left: 0; transform: rotate(-12deg); }
        .dw-plate-b { left: 23%; transform: rotate(-5deg); }
        .dw-plate-c { left: 47%; transform: rotate(5deg); }
        .dw-plate-d { right: 0; transform: rotate(12deg); }
        .dw-spray {
          position: absolute; top: 21%; left: 10%; width: 80%; height: 5px; z-index: 3;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0 3%, ${color} 10% 90%, transparent 97%);
          box-shadow: 0 0 6px ${color};
          /* Visible at rest too, in the state colour: once the glass clears for
             a paused or finished load, a half-faded arm reads as a rendering
             glitch rather than as an arm standing still. */
          opacity: 0.85; transform-origin: 50% 50%; transition: opacity 0.3s ease;
        }
        .dw-spray::before,
        .dw-spray::after {
          content: ""; position: absolute; top: 1px; width: 2px; height: 1px;
          border-radius: 50%; background: ${color};
        }
        .dw-spray::before { left: 22%; }
        .dw-spray::after { right: 22%; }
        .dw-spray-hub {
          position: absolute; top: 50%; left: 50%; width: 7px; height: 7px;
          border: 1px solid ${color}; border-radius: 50%; background: #2c2c2c;
          transform: translate(-50%, -50%);
        }
        .dw-drops { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
        .dw-drop {
          position: absolute; top: 22%; width: 3px; height: 5px; border-radius: 60%;
          background: ${color}; opacity: 0; transform: translateY(-4px) scale(0.8);
        }
        .dw-drop-a { left: 25%; }
        .dw-drop-b { left: 38%; }
        .dw-drop-c { left: 51%; }
        .dw-drop-d { left: 64%; }
        .dw-drop-e { left: 75%; }
        .dw-water {
          position: absolute; right: 9%; bottom: 5%; left: 9%; z-index: 2; height: 12px;
          overflow: hidden; border-top: 1px solid ${color}; border-radius: 50% 50% 20% 20%;
          background: linear-gradient(180deg, rgba(33, 150, 243, 0.22), transparent 86%);
          opacity: 0.5; transition: opacity 0.3s ease;
        }
        .dw-wave {
          position: absolute; left: -8%; width: 116%; height: 7px;
          border-top: 1px solid ${color}; border-radius: 50%;
        }
        .dw-wave-a { top: 2px; }
        .dw-wave-b { top: 6px; left: 8%; opacity: 0.6; }
                /* Promoted to its own layer: a thin bar carrying a box-shadow is
           otherwise repainted at every angle, and the glow resampling reads as
           a vibration rather than as rotation. */
        .machine.spinning .dw-spray {
          opacity: 1; will-change: transform; backface-visibility: hidden;
          animation: dw-spray-spin 2.8s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.spinning .dw-drop { animation: dw-drop-fall 1.65s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .dw-drop-a { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-b { animation-delay: calc(-0.95s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-c { animation-delay: calc(-0.58s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-d { animation-delay: calc(-1.15s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-e { animation-delay: calc(-0.76s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-water { opacity: 0.82; animation: dw-water-pulse 2.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .dw-wave-a { animation: dw-wave-drift 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .dw-wave-b { animation: dw-wave-drift 2.4s ease-in-out infinite reverse; animation-delay: var(--anim-offset, 0s); }
        .dw-heat {
          position: absolute; top: 22px; right: 8px; bottom: 8px; left: 8px; z-index: 6;
          overflow: hidden; border-radius: 4px; opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .dw-heat i {
          position: absolute; bottom: 0; width: 15px; height: 34px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 183, 77, 0), rgba(255, 183, 77, 0.9) 45%, rgba(255, 138, 60, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
          filter: blur(0.5px);
        }
        .dw-heat-a { left: 3%; }
        .dw-heat-b { left: 24%; height: 27px !important; }
        .dw-heat-c { left: 44%; height: 22px !important; }
        .dw-heat-d { left: 64%; height: 29px !important; }
        .dw-heat-e { right: 3%; height: 24px !important; }
        /* Both drying phases show the same thing: heat rising across the full width
           of the machine. They differ only in where it sits, inside the cavity
           while drying and up at the door once the door is cracked open. The wash
           animation is paused underneath, since nothing is spraying any more. */
        .machine.phase-drying .dw-cavity,
        .machine.phase-ado_drying .dw-cavity {
          box-shadow: inset 0 0 20px rgba(255, 112, 67, 0.28);
        }
        .machine.phase-drying .dw-heat,
        .machine.phase-ado_drying .dw-heat { opacity: 1; }
        /* Ado drying pushes the steam further up the door, which is the only
           thing separating it from the plain drying phase. */
        .machine.phase-ado_drying .dw-heat i { height: 44px !important; }
        .machine.phase-drying .dw-heat i,
        .machine.phase-ado_drying .dw-heat i {
          animation: dw-heat-rise 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.phase-drying .dw-heat i.dw-heat-b,
        .machine.phase-ado_drying .dw-heat i.dw-heat-b { animation-delay: calc(-0.48s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-heat i.dw-heat-c,
        .machine.phase-ado_drying .dw-heat i.dw-heat-c { animation-delay: calc(-0.96s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-heat i.dw-heat-d,
        .machine.phase-ado_drying .dw-heat i.dw-heat-d { animation-delay: calc(-1.44s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-heat i.dw-heat-e,
        .machine.phase-ado_drying .dw-heat i.dw-heat-e { animation-delay: calc(-1.92s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-spray,
        .machine.phase-drying .dw-water,
        .machine.phase-drying .dw-wave-a,
        .machine.phase-drying .dw-wave-b,
        .machine.phase-ado_drying .dw-spray,
        .machine.phase-ado_drying .dw-water,
        .machine.phase-ado_drying .dw-wave-a,
        .machine.phase-ado_drying .dw-wave-b {
          animation-play-state: paused; opacity: 0.12;
        }
        /* No water at all while drying: the drops are gone, not dimmed, and
           the rising steam takes the space they used to occupy. */
        .machine.phase-drying .dw-drops,
        .machine.phase-ado_drying .dw-drops { display: none; }
        /* The arm stays lit while drying, but in heat colour: blue reads as
           water, and there is no water left at this point in the cycle. */
        .machine.phase-drying .dw-spray,
        .machine.phase-ado_drying .dw-spray {
          background: linear-gradient(90deg, transparent, #ffa726, transparent);
          box-shadow: 0 0 5px rgba(255, 167, 38, 0.55);
          opacity: 0.6;
        }
        .machine.phase-drying .dw-spray-hub,
        .machine.phase-ado_drying .dw-spray-hub {
          border-color: #ffa726;
        }
        .machine.phase-drying .dw-door,
        .machine.phase-ado_drying .dw-door {
          box-shadow: inset 0 0 0 1px rgba(225, 235, 236, 0.3),
            inset 0 0 15px rgba(255, 112, 67, 0.32), 0 0 8px rgba(255, 112, 67, 0.3);
        }
        /* Pre-wash: a short cold spray that loosens what is stuck on the
           dishes before the main wash. Cold blue instead of the state colour,
           the arm turning slower, quick thin jets, little water in the sump,
           and specks on the plates fading away as the jets wash them off. */
        .machine.phase-prewash .dw-cavity { background: linear-gradient(180deg, #2f4a57, #6f8f9b); }
        .machine.phase-prewash .dw-spray {
          background: linear-gradient(90deg, transparent 0 3%, #81d4fa 10% 90%, transparent 97%);
          box-shadow: 0 0 6px #81d4fa;
        }
        .machine.phase-prewash .dw-spray-hub { border-color: #81d4fa; }
        .machine.phase-prewash .dw-spray::before,
        .machine.phase-prewash .dw-spray::after,
        .machine.phase-prewash .dw-drop { background: #b3e5fc; }
        .machine.phase-prewash.spinning .dw-spray { animation-duration: 4.2s; }
        .machine.phase-prewash .dw-drop { width: 2px; height: 8px; border-radius: 1px; }
        .machine.phase-prewash.spinning .dw-drop { animation-name: dw-jet; animation-duration: 0.9s; }
        .machine.phase-prewash .dw-water { height: 7px; border-top-color: #81d4fa; }
        .machine.phase-prewash .dw-wave { border-top-color: #81d4fa; }
        .machine.phase-prewash .dw-plate::after {
          content: ""; position: absolute; inset: 3px 1px; border-radius: 50%;
          background:
            radial-gradient(circle at 40% 25%, #a1887f 0 1px, transparent 1.6px),
            radial-gradient(circle at 65% 55%, #8d6e63 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 35% 78%, #a1887f 0 1px, transparent 1.6px);
        }
        .machine.phase-prewash.spinning .dw-plate::after { animation: dw-soil-off 3.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.phase-prewash.spinning .dw-plate-b::after { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .machine.phase-prewash.spinning .dw-plate-c::after { animation-delay: calc(-1.8s + var(--anim-offset, 0s)); }
        .machine.phase-prewash.spinning .dw-plate-d::after { animation-delay: calc(-2.7s + var(--anim-offset, 0s)); }
        .dw-door {
          position: absolute; top: 22px; right: 8px; bottom: 8px; left: 8px; z-index: 5;
          padding: 0; border: 3px solid #34383b; border-radius: 4px;
          background: linear-gradient(180deg, rgba(14, 20, 24, 0.5), rgba(14, 20, 24, 0.74));
          box-shadow: inset 0 0 0 1px rgba(225, 235, 236, 0.3), 0 3px 5px rgba(0, 0, 0, 0.25);
          transform-origin: 50% 100%;
          transition: transform 0.42s cubic-bezier(.2, .75, .25, 1), box-shadow 0.42s ease;
        }
        .dw-door::after {
          content: ""; position: absolute; inset: 0; z-index: 1; border-radius: 2px;
          pointer-events: none;
          background: linear-gradient(116deg, rgba(255, 255, 255, 0.17) 0 17%, rgba(255, 255, 255, 0) 40%);
        }
        .dw-door::before {
          content: ""; position: absolute; top: 4px; right: 18%; left: 18%; height: 2px;
          border-radius: 8px; background: rgba(225, 231, 232, 0.6);
        }
        /* Clear whenever there is something in the tub worth seeing: a running
           cycle, a paused one, or a finished load waiting to be emptied. Opaque
           only at rest, and that contrast is what separates a shut door from an
           open one at a glance. */
        .machine.spinning .dw-door,
        .machine.done .dw-door,
        .machine.paused .dw-door {
          background: linear-gradient(180deg, rgba(18, 26, 30, 0.08), rgba(18, 26, 30, 0.3));
        }
        .dw-door.open {
          background: linear-gradient(180deg, #2c343a, #14191c);
          transform: rotateX(81deg) translateY(13px) translateZ(9px);
          box-shadow: 0 16px 14px rgba(0, 0, 0, 0.45);
        }
        @keyframes dw-spray-spin { to { transform: rotate(360deg); } }
        @keyframes dw-drop-fall {
          0% { opacity: 0; transform: translateY(-4px) scale(0.75); }
          22% { opacity: 0.85; }
          82% { opacity: 0.62; }
          100% { opacity: 0; transform: translateY(28px) scale(1); }
        }
        @keyframes dw-jet {
          0% { opacity: 0; transform: translateY(-4px); }
          18% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(30px); }
        }
        @keyframes dw-soil-off { 0%, 20% { opacity: 1; } 70%, 85% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes dw-water-pulse { 0%, 100% { transform: scaleX(0.97); } 50% { transform: scaleX(1.02); } }
        @keyframes dw-wave-drift { 0%, 100% { transform: translateX(-3%); } 50% { transform: translateX(3%); } }
        @keyframes dw-heat-rise {
          /* Translation only. Animating scaleY on an element that is both
             clip-path shaped and blurred forces the polygon to be recomputed
             and the blur resampled every frame, which reads as a vibration
             rather than as steam. The volutes already differ by height. */
          0% { opacity: 0; transform: translateY(16px); }
          20% { opacity: 0.72; }
          75% { opacity: 0.72; }
          100% { opacity: 0; transform: translateY(-32px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .machine.spinning .dw-spray, .machine.spinning .dw-drop, .machine.spinning .dw-water,
          .machine.spinning .dw-wave-a, .machine.spinning .dw-wave-b,
          .machine.phase-drying .dw-heat i, .machine.phase-ado_drying .dw-heat i {
          animation-duration: 0.001ms !important; animation-iteration-count: 1 !important;
          }
        }
  `,
  oven: () => `${AP_CSS}
        /* Heating: the cavity glows, the top element pulses and a little
           steam rises from the dish. */
        .ap-lcd { fill: #9aa4ae; }
        .machine.heating .ap-lcd { fill: #ff8a65; }
        .machine.heating .ap-elem { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ap-glow { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ap-steam path { animation: ap-steam 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ap-steam .apd2 { animation-delay: calc(-0.87s + var(--anim-offset, 0s)); }
        .machine.heating .ap-steam .apd3 { animation-delay: calc(-1.73s + var(--anim-offset, 0s)); }
  `,
  microwave: () => `${AP_CSS}
        /* Running, the plate turns the dish round an ellipse, seen from the
           front: two eased swings a quarter turn apart, left to right and
           back to front, a touch smaller at the back. */
        .ap-lcd { fill: #9aa4ae; }
        .machine.spinning .ap-lcd { fill: #69f0ae; }
        .ap-start { fill: #2e7d32; }
        .machine.spinning .ap-start { fill: #43a047; }
        .machine.spinning .ap-ttx { animation: ap-ttx 3s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .ap-tty { transform-box: fill-box; transform-origin: center bottom; }
        .machine.spinning .ap-tty { animation: ap-tty 3s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .ap-tty { animation-delay: calc(-1.5s + var(--anim-offset, 0s)); }
        .machine.spinning .ap-steam path { animation: ap-steam 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .ap-steam .apd2 { animation-delay: calc(-0.87s + var(--anim-offset, 0s)); }
        @keyframes ap-ttx { from { transform: translateX(-7px); } to { transform: translateX(7px); } }
        @keyframes ap-tty { from { transform: translateY(1.6px) scale(1.04); } to { transform: translateY(-1.6px) scale(0.9); } }
  `,
  hood: (color) => `
        .hd-chimney {
          position: absolute; left: 50%; transform: translateX(-50%); top: 2px; width: 26px; height: 32px;
          border-radius: 3px 3px 0 0; background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hd-canopy {
          position: absolute; left: 5px; right: 5px; top: 33px; height: 26px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border-bottom: 1px solid var(--divider-color, #c7c7c7);
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
        }
        .hd-under { position: absolute; left: 5px; right: 5px; top: 58px; height: 6px; border-radius: 0 0 3px 3px; background: #2b2f36; }
        .hd-lamp { position: absolute; top: 61px; width: 7px; height: 3px; border-radius: 2px; background: #4c525b; }
        .hd-lamp.l1 { left: 22px; }
        .hd-lamp.l2 { right: 22px; }
        .machine.lit .hd-lamp { background: #ffd166; box-shadow: 0 0 7px 1px #ffd166; }
        .hd-beam {
          position: absolute; top: 64px; width: 30px; height: 40px; opacity: 0;
          background: linear-gradient(to bottom, rgba(255, 209, 102, 0.4), rgba(255, 209, 102, 0));
          clip-path: polygon(34% 0, 66% 0, 100% 100%, 0 100%);
          transition: opacity 0.3s ease;
        }
        .hd-beam.b1 { left: 11px; }
        .hd-beam.b2 { right: 11px; }
        .machine.lit .hd-beam { opacity: 1; }
        .hd-air {
          position: absolute; width: 9px; height: 9px; bottom: 6px;
          border-top: 2px solid ${color}; border-left: 2px solid ${color};
          border-radius: 1px; opacity: 0;
        }
        .hd-air.a1 { left: 26px; }
        .hd-air.a2 { left: 44px; }
        .hd-air.a3 { left: 62px; }
        .machine.fan .hd-air { animation: hd-rise linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.fan .hd-air.a2 { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .machine.fan .hd-air.a3 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .machine.v1 .hd-air { animation-duration: 2.4s; }
        .machine.v2 .hd-air { animation-duration: 1.5s; }
        .machine.v3 .hd-air { animation-duration: 1s; }
        .machine.boost .hd-air { animation-duration: 0.55s; border-color: var(--warning-color, #ff9800); }
        /* At the lowest speed a single chevron reads as "barely moving"; three would
           look the same as full speed to anyone glancing at the card. */
        .machine.v1 .hd-air.a1, .machine.v1 .hd-air.a3 { display: none; }
        @keyframes hd-rise {
          0% { transform: translateY(0) rotate(45deg); opacity: 0; }
          25% { opacity: 0.95; }
          100% { transform: translateY(-30px) rotate(45deg); opacity: 0; }
        }
  `,
  cooktop: () => `
        .ck-top {
          position: absolute; inset: 4px 1px; border-radius: 9px; background: #1a1c20;
          border: 1px solid var(--divider-color, #c7c7c7); box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.55);
        }
        .ck-zones {
          position: absolute; left: 6px; right: 6px; top: 8px; bottom: 22px;
          display: grid; gap: 3px; align-items: center; justify-items: center;
        }
        .ck-zones.g1 { grid-template-columns: minmax(0, 1fr); }
        .ck-zones.g2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .ck-zones.g3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .ck-zone {
          width: 30px; height: 30px; box-sizing: border-box;
          border-radius: 50%; border: 1.5px solid #383d45;
          display: flex; align-items: center; justify-content: center; color: #4c525b;
          font: 600 11px/1 ui-monospace, "SF Mono", monospace;
        }
        .ck-zones.g3 .ck-zone { width: 22px; height: 22px; font-size: 9px; }
        .ck-zone.on {
          border-color: #ff7043; color: #ff7043;
          background: radial-gradient(circle, rgba(255, 112, 67, 0.42), transparent 70%);
          box-shadow: 0 0 11px rgba(255, 112, 67, 0.55);
          opacity: calc(0.5 + var(--zi, 1) * 0.5);
          animation: ck-ember 3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .ck-zone.max {
          border-color: #ff3d00; color: #ff3d00;
          background: radial-gradient(circle, rgba(255, 61, 0, 0.55), transparent 72%);
          box-shadow: 0 0 15px rgba(255, 61, 0, 0.7);
        }
        /* Powered off but still hot: the one thing a cooktop card is actually for. */
        .ck-zone.residual {
          border-color: #7a3b2c; color: #b1543d; background: none;
          box-shadow: none; animation: none; animation-delay: var(--anim-offset, 0s); opacity: 1;
        }
        @keyframes ck-ember { 0%, 100% { filter: brightness(0.85); } 50% { filter: brightness(1.12); } }
        .ck-ctrl { position: absolute; left: 12px; right: 22px; bottom: 10px; display: flex; gap: 5px; justify-content: center; }
        .ck-ctrl i { display: block; width: 11px; height: 3px; border-radius: 2px; background: #383d45; }
        .ck-ctrl i.act { background: #ff7043; box-shadow: 0 0 6px #ff7043; }
        .ck-lock {
          position: absolute; right: 8px; bottom: 8px; width: 9px; height: 7px;
          border-radius: 1px; background: var(--warning-color, #ff9800);
        }
        .ck-lock::before {
          content: ""; position: absolute; left: 2px; top: -4px; width: 5px; height: 5px;
          border: 1.5px solid var(--warning-color, #ff9800); border-bottom: none; border-radius: 3px 3px 0 0;
        }
  `,
  fridge: () => NT_CSS + `
        .fr3 { position: absolute; inset: 0; }
        svg.fr-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .fr-cube { transform-box: fill-box; }
        .machine.ice .fr-cube.drop { animation: fr-drop 1.6s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.ice .fr-cube.d2 { animation-delay: calc(-0.55s + var(--anim-offset, 0s)); }
        .machine.ice .fr-cube.d3 { animation-delay: calc(-1.1s + var(--anim-offset, 0s)); }
        @keyframes fr-drop {
          0% { transform: translateY(-2px); opacity: 0; } 12% { opacity: 1; }
          70% { transform: translateY(var(--fall, 14px)); opacity: 1; } 100% { transform: translateY(var(--fall, 14px)); opacity: 0; }
        }
        .machine.ice .fr-glint { animation: fr-glint 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes fr-glint { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.9; } }
        /* Cold air rolling out of an open fridge, mist rising out of a chest. */
        .fr-mist { animation: fr-cold 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fr-mist.m2 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .fr-mist.m3 { animation-delay: calc(-1.7s + var(--anim-offset, 0s)); }
        @keyframes fr-cold { 0% { transform: translateY(0); opacity: 0; } 30% { opacity: 0.7; } 100% { transform: translateY(8px); opacity: 0; } }
        .fr-steam { animation: fr-rise 2.8s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fr-steam.m2 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .fr-steam.m3 { animation-delay: calc(-1.8s + var(--anim-offset, 0s)); }
        .fr-steam.m4 { animation-delay: calc(-2.3s + var(--anim-offset, 0s)); }
        /* While a fridge cools, snowflakes come and go on its shut doors. */
        .fr-flake { transform-box: fill-box; transform-origin: center; opacity: 0; animation: fr-flake 3.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fr-flake.fr-f2 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .fr-flake.fr-f3 { animation-delay: calc(-1.8s + var(--anim-offset, 0s)); }
        .fr-flake.fr-f4 { animation-delay: calc(-2.7s + var(--anim-offset, 0s)); }
        @keyframes fr-flake { 0% { opacity: 0; transform: scale(0.5) rotate(0deg); } 35% { opacity: 1; transform: scale(1) rotate(30deg); } 70% { opacity: 0.9; } 100% { opacity: 0; transform: scale(0.8) rotate(60deg); } }
        @keyframes fr-rise { 0% { transform: translateY(0); opacity: 0; } 30% { opacity: 0.75; } 100% { transform: translateY(-10px); opacity: 0; } }
  `,
  water_heater: () => `
        .wh-bracket { position: absolute; left: 40px; right: 40px; top: 1px; height: 5px; border-radius: 2px; background: #3b4048; }
        .wh-tank {
          position: absolute; left: 23px; right: 23px; top: 4px; bottom: 15px;
          border-radius: 25px / 14px; overflow: hidden;
          background: linear-gradient(90deg, var(--ac-body-lo, #aeb2b5), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 30%,
            var(--ac-body-hi, #e6e6e6) 50%, var(--ac-body, var(--secondary-background-color, #d7d7d7)) 72%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .wh-glass {
          position: absolute; left: 8px; right: 8px; top: 13px; bottom: 10px; border-radius: 7px; overflow: hidden;
          background: rgba(20, 24, 30, 0.10); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14);
        }
        .wh-water { position: absolute; inset: 0; background: rgba(79, 195, 247, 0.38); }
        .wh-hot {
          position: absolute; left: 0; right: 0; top: 0; height: calc(var(--wh-hot, 0) * 100%);
          background: linear-gradient(180deg, rgba(255, 87, 51, 0.72), rgba(255, 138, 60, 0.42));
          transition: height 1s ease;
        }
        .wh-lcd {
          position: absolute; left: 50%; transform: translateX(-50%); top: 22px; z-index: 3;
          height: 11px; min-width: 22px; padding: 0 3px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center;
          font: 600 7px/11px ui-monospace, "SF Mono", monospace;
        }
        .machine.heating .wh-lcd { color: #ff7043; }
        /* The element: a hairpin at the foot of the tank, where a real one sits.
           border-box, or the borders push it off the tank's axis. */
        .wh-coil {
          position: absolute; left: 50%; bottom: -3px; z-index: 2;
          box-sizing: border-box; width: 18px; height: 19px; margin-left: -9px;
          border: 3px solid #5f6770; border-bottom: none; border-radius: 7px 7px 0 0;
        }
        .machine.heating .wh-coil {
          border-color: #ff3d00;
          animation: wh-glow 1.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes wh-glow {
          0%, 100% { box-shadow: 0 0 5px 1px rgba(255, 61, 0, 0.55), inset 0 0 3px rgba(255, 61, 0, 0.5); }
          50% { box-shadow: 0 0 10px 3px rgba(255, 61, 0, 0.9), inset 0 0 5px rgba(255, 61, 0, 0.8); }
        }
        .wh-heat { position: absolute; inset: 0; z-index: 1; opacity: 0; pointer-events: none; }
        .machine.heating .wh-heat { opacity: 1; }
        .wh-heat i {
          position: absolute; bottom: 6px; width: 11px; height: 32px; margin-left: -5.5px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 112, 67, 0), rgba(255, 112, 67, 0.85) 45%, rgba(255, 61, 0, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
        }
        .wh-heat i.wh-h1 { left: 22%; }
        .wh-heat i.wh-h2 { left: 50%; }
        .wh-heat i.wh-h3 { left: 78%; }
        .machine.heating .wh-heat i { animation: wh-rise 2.4s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .wh-heat i.wh-h2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .machine.heating .wh-heat i.wh-h3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes wh-rise {
          0% { transform: translateY(6px); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        .wh-pipe { position: absolute; bottom: 3px; width: 4px; height: 14px; border-radius: 0 0 2px 2px; }
        .wh-pipe.cold { left: 37px; background: #5aa9d6; }
        .wh-pipe.hot { right: 37px; background: #d9674a; }
  `,
  boiler: () => `${TH_CSS}
        .bl-th.bl-l-wall .bl-lcd { transform-origin: 0 0; transform: translate(-11.15px, 15.66px) scale(0.78); }
        .bl-th.bl-l-window .bl-lcd { transform-origin: 0 0; transform: translate(-12.36px, 16.32px) scale(0.78); }
        svg.bl-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .bl-lcd {
          position: absolute; left: 33px; top: 47px; width: 18px; height: 10px; border-radius: 2px;
          color: #4fc3f7; text-align: center; overflow: hidden; white-space: nowrap;
          font: 600 6.5px/10px ui-monospace, "SF Mono", monospace;
        }
        .bl-l-wall .bl-lcd { left: 32.5px; width: 14.5px; }
        .bl-l-window .bl-lcd { left: 38px; top: 44px; width: 20px; height: 10px; line-height: 10px; border-radius: 4px; }
        .bl-glow { opacity: 0; transition: opacity 0.4s; }
        .machine.flame .bl-glow { opacity: 1; }
        .machine.flame .bl-lcd { color: #ff7043; }
        .bl-flame { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; }
        .machine.flame .bl-flame { opacity: 1; animation: bl-flicker 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flame .bl-flame.f2 { animation-duration: 0.5s; animation-delay: calc(-0.2s + var(--anim-offset, 0s)); }
        .machine.flame .bl-flame.f3 { animation-duration: 0.7s; animation-delay: calc(-0.4s + var(--anim-offset, 0s)); }
        /* Lighting: a small flame, still growing. */
        .machine.mode-starting .bl-flame { scale: 0.55; }
        @keyframes bl-flicker {
          0%, 100% { transform: scale(1, 1); }
          30% { transform: scale(0.92, 1.1); }
          60% { transform: scale(1.06, 0.9); }
        }
        .bl-needle { transform-box: view-box; transform-origin: 40px 28px; transform: rotate(-35deg); transition: transform 0.6s; }
        .machine.flame .bl-needle { transform: rotate(15deg); }
        .bl-ico { fill: #3d4550; }
        .machine.mode-space_heating .bl-ico-ch, .machine.mode-hot_water .bl-ico-hw { fill: #ff8a50; }
        /* The pipe that carries the heat turns red: to the tap for hot water,
           to the radiator for the heating. */
        .bl-tap, .bl-flow { stroke: #9aa3ad; }
        .machine.mode-hot_water .bl-tap, .machine.mode-space_heating .bl-flow { stroke: #ef5350; }
        .bl-drop { fill: #4fc3f7; opacity: 0; }
        .machine.mode-hot_water .bl-drop { animation: bl-drip 0.9s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-hot_water .bl-drop.d2 { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .machine.mode-hot_water .bl-drop.d3 { animation-delay: calc(-0.6s + var(--anim-offset, 0s)); }
        @keyframes bl-drip {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(11px); opacity: 0; }
        }
        .bl-rad { fill: var(--ac-body-lo, #d5dbe0); }
        .machine.mode-space_heating .bl-rad { fill: #ffb08f; }
        .bl-wave { fill: none; stroke: #ff8a50; stroke-width: 1.6; stroke-linecap: round; opacity: 0; }
        .machine.mode-space_heating .bl-wave { animation: bl-rise 2.4s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .bl-wave.w2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .machine.mode-space_heating .bl-wave.w3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes bl-rise {
          0% { transform: translateY(6px); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
  `,
  // A pellet stove from the front: the flue on top, a small screen, the warm
  // air grille, the door with the fire behind its glass, and the hopper beside
  // it, whose window shows how much is left. The warm air leaves by the
  // grille, the smoke by the flue, and only when the stove makes some.
  // A split's indoor unit on the wall: a long rounded box, its screen and
  // lights, and the flap over the outlet, which opens as far as the vane
  // points down. The air leaves in strokes that lean with the side vanes and
  // run faster with the fan; drying, the water rises back into the unit.
  air_conditioner: () => `
        .ac-unit {
          position: absolute; left: 2px; right: 2px; top: 16px; height: 38px; border-radius: 7px 7px 11px 11px;
          background: linear-gradient(180deg, var(--ac-body-hi, #ffffff), var(--ac-body, #f1f3f4) 55%, var(--ac-body-lo, #d8dcde));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.08);
        }
        .ac-unit::before {
          content: ""; position: absolute; left: 5px; right: 5px; top: 3px; height: 4px; border-radius: 2px;
          background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.13) 0 1px, transparent 1px 3px);
        }
        .ac-seam { position: absolute; left: 0; right: 0; top: 25px; height: 1px; background: rgba(0, 0, 0, 0.1); }
        .ac-mouth { position: absolute; left: 7px; right: 7px; bottom: 2px; height: 7px; border-radius: 0 0 7px 7px; background: linear-gradient(180deg, #0e1013, #2a2f35); }
        .ac-flap {
          position: absolute; left: -1px; right: -1px; top: 0; height: 7px; border-radius: 0 0 7px 7px; transform-origin: 50% 0;
          background: linear-gradient(180deg, var(--ac-body-lo, #d8dcde), var(--ac-body, #f1f3f4) 60%, var(--ac-body-hi, #ffffff));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14), 0 1px 1px rgba(0, 0, 0, 0.12);
          transform: translateY(calc(var(--ac-flap, 0) * 1px)) scaleY(calc(1 - var(--ac-flap, 0) * 0.09));
        }
        .ac-lcd {
          position: absolute; right: 9px; top: 11px; min-width: 9px; height: 9px; padding: 0 1.5px; border-radius: 1.5px;
          display: flex; align-items: center; justify-content: center; gap: 1px;
          background: rgba(10, 14, 18, 0.85); color: #7fdcff; text-shadow: 0 0 2px currentColor;
          font: 700 6.5px/9px ui-monospace, "SF Mono", Menlo, monospace;
        }
        .ac-lcd span:empty { display: none; }
        .ac-lcd svg { width: 7px; height: 7px; flex: none; fill: currentColor; }
        .machine.icon-heat .ac-lcd { color: #ffab76; }
        .machine.icon-dry .ac-lcd { color: #80deea; }
        .machine.icon-fan .ac-lcd { color: #e0e0e0; }
        .machine.icon-auto .ac-lcd { color: #a5d6a7; }
        .machine.mode-off .ac-lcd { display: none; }
        .ac-leds { position: absolute; left: 10px; top: 14px; display: flex; gap: 2.5px; }
        .ac-leds i { width: 3px; height: 3px; border-radius: 50%; background: #43a047; box-shadow: 0 0 3px #43a047; }
        .machine.mode-off .ac-leds i { background: rgba(0, 0, 0, 0.15); box-shadow: none; }
        .ac-leds i.ion { background: #29b6f6; box-shadow: 0 0 3px #29b6f6; }
        .ac-leds i.eco { background: #8bc34a; box-shadow: 0 0 3px #8bc34a; }
        .ac-leds i.quiet { background: #ab8cff; box-shadow: 0 0 3px #ab8cff; }
        .ac-leds i.boost { background: #ff7043; box-shadow: 0 0 3px #ff7043; }
        .ac-air { position: absolute; left: 0; top: 56px; width: 96px; height: 50px; overflow: visible; display: none; }
        .machine.mode-cool .ac-air, .machine.mode-heat .ac-air, .machine.mode-dry .ac-air, .machine.mode-fan .ac-air,
        .machine.mode-auto .ac-air, .machine.mode-run .ac-air { display: block; }
        .ac-stream { transform-origin: 48px 0; transform: skewX(var(--ac-skew, 0deg)) scaleY(var(--ac-reach, 1)); }
        .ac-stream path {
          fill: none; stroke: var(--ac-air, #4fc3f7); stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 5 5; opacity: 0.9;
          animation: ac-flow var(--ac-speed, 1.2s) linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .ac-stream path:nth-child(2) { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .ac-stream path:nth-child(3) { animation-delay: calc(-0.6s + var(--anim-offset, 0s)); }
        .ac-stream path:nth-child(4) { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .machine.mode-cool { --ac-air: #42a5f5; }
        .machine.mode-heat { --ac-air: #ff7043; }
        .machine.mode-dry { --ac-air: #4dd0e1; }
        .machine.mode-fan { --ac-air: #90a4ae; }
        .machine.mode-auto { --ac-air: #81c784; }
        .machine.mode-run { --ac-air: #90caf9; }
        /* Drying: the water drawn out of the room goes up into the unit. */
        .ac-drop { fill: #4fc3f7; opacity: 0; transform-box: fill-box; transform-origin: center; display: none; }
        .machine.mode-dry .ac-drop { display: inline; animation: ac-drop 2s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-dry .ac-drop.d2 { animation-delay: calc(-0.7s + var(--anim-offset, 0s)); }
        .machine.mode-dry .ac-drop.d3 { animation-delay: calc(-1.35s + var(--anim-offset, 0s)); }
        /* Swinging: the flap and the air sweep together. */
        .machine.swing-v .ac-flap { animation: ac-swing-v 4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.swing-v .ac-stream { animation: ac-reach 4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.swing-h .ac-stream { animation: ac-sweep 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        /* Defrosting: frost on the unit and no air, the fan is stopped. */
        .ac-frost {
          position: absolute; left: 2px; right: 2px; top: 16px; height: 38px; border-radius: 7px 7px 11px 11px; display: none;
          background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.5px),
            radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.5px);
          background-size: 9px 8px; box-shadow: inset 0 0 6px rgba(129, 212, 250, 0.9);
        }
        .machine.mode-defrost .ac-frost { display: block; }
        @keyframes ac-flow { to { stroke-dashoffset: -20; } }
        @keyframes ac-drop {
          0% { opacity: 0; transform: translateY(34px) scale(1.2); }
          25% { opacity: 0.9; }
          85% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(2px) scale(0.6); }
        }
        @keyframes ac-swing-v { 0%, 100% { transform: translateY(1px) scaleY(0.91); } 50% { transform: translateY(5px) scaleY(0.55); } }
        @keyframes ac-reach {
          0%, 100% { transform: skewX(var(--ac-skew, 0deg)) scaleY(0.45); }
          50% { transform: skewX(var(--ac-skew, 0deg)) scaleY(1); }
        }
        @keyframes ac-sweep {
          0%, 100% { transform: skewX(-35deg) scaleY(var(--ac-reach, 1)); }
          50% { transform: skewX(35deg) scaleY(var(--ac-reach, 1)); }
        }
  `,
  pet_fountain: () => `
        svg.ft-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        /* While the pump runs, the water wells up into a dome over the outlet,
           rings spread across the plate and drops spray off its edges. */
        .ft-dome { transform-box: fill-box; transform-origin: center bottom; }
        .machine.flowing .ft-dome { animation: ft-dome 1.1s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ft-dome { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.2); } }
        .ft-ring { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .machine.flowing .ft-ring { animation: ft-ring 2s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flowing .ft-ring.ftd2 { animation-delay: calc(-1s + var(--anim-offset, 0s)); }
        @keyframes ft-ring { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }
        .ft-spray { opacity: 0; }
        .machine.flowing .ft-spray.l { animation: ft-spray-l 1.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flowing .ft-spray.r { animation: ft-spray-r 1.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flowing .ft-spray.ftd2 { animation-delay: calc(-0.35s + var(--anim-offset, 0s)); }
        .machine.flowing .ft-spray.ftd3 { animation-delay: calc(-0.7s + var(--anim-offset, 0s)); }
        .machine.flowing .ft-spray.ftd4 { animation-delay: calc(-1.05s + var(--anim-offset, 0s)); }
        @keyframes ft-spray-l { 0% { transform: translate(0, 0); opacity: 0; } 15% { opacity: 1; } 45% { transform: translate(-4.5px, -2px); } 100% { transform: translate(-9px, 11px); opacity: 0; } }
        @keyframes ft-spray-r { 0% { transform: translate(0, 0); opacity: 0; } 15% { opacity: 1; } 45% { transform: translate(4.5px, -2px); } 100% { transform: translate(9px, 11px); opacity: 0; } }
        /* The light under the plate and the dot at the front: blue while it
           runs, orange when the filter or the pump wants a hand, red and
           blinking when the water runs low, out when it is off. */
        .ft-glow { stroke: #9aa3ad; opacity: 0.3; }
        .ft-led { fill: #9aa3ad; }
        .machine.led-on .ft-glow { stroke: #29b6f6; opacity: 0.8; }
        .machine.led-on .ft-led { fill: #29b6f6; }
        .machine.led-due .ft-glow { stroke: #ffb300; opacity: 0.8; }
        .machine.led-due .ft-led { fill: #ffb300; }
        .machine.led-low .ft-glow { stroke: #e53935; opacity: 0.8; }
        .machine.led-low .ft-led { fill: #e53935; animation: ft-blink 1s steps(2) infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.led-low .ft-win { stroke: #e53935; stroke-width: 1; }
        @keyframes ft-blink { 50% { opacity: 0.25; } }
        /* Offline, the fountain says nothing: no light, no jet, the water
           drawn grey rather than as a level the card cannot know. */
        .machine.ft-offline .ft-water, .machine.ft-offline .ft-pool { filter: grayscale(1); opacity: 0.55; }
  `,
  // A portable dehumidifier on its feet: the air leaves by the grille on top,
  // the screen gives the humidity, and the tank at the bottom shows the water
  // it has taken out of the room through a window, drop by drop.
  dehumidifier: () => `${MINI_LCD_CSS}
        .dh-body {
          position: absolute; left: 24px; right: 24px; top: 22px; bottom: 8px; border-radius: 9px 9px 6px 6px;
          background: linear-gradient(90deg, var(--ac-body-lo, #d7dbde), var(--ac-body-hi, #ffffff) 30%, var(--ac-body, #eef0f2) 70%, var(--ac-body-lo, #d7dbde));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
        .dh-grille { position: absolute; left: 29px; right: 29px; top: 25px; height: 10px; border-radius: 3px; background: repeating-linear-gradient(180deg, #3a4047 0 1.2px, #6e767e 1.2px 2.6px); }
        .dh-lcd { left: 38px; top: 40px; min-width: 16px; }
        .dh-led { position: absolute; left: 31px; top: 43px; width: 3px; height: 3px; border-radius: 50%; background: #43a047; box-shadow: 0 0 3px #43a047; }
        .machine.mode-off .dh-led { background: rgba(0, 0, 0, 0.15); box-shadow: none; }
        .machine.mode-full .dh-led { background: #e53935; box-shadow: 0 0 3px #e53935; animation: dh-blink 1s steps(2) infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-full .dh-lcd { color: #ff6b6b; }
        .dh-seam { position: absolute; left: 24px; right: 24px; top: 64px; height: 1px; background: rgba(0, 0, 0, 0.12); }
        .dh-grip { position: absolute; left: 40px; width: 16px; top: 66px; height: 3px; border-radius: 0 0 3px 3px; background: rgba(0, 0, 0, 0.14); }
        .dh-win {
          position: absolute; left: 33px; right: 33px; top: 72px; height: 20px; border-radius: 3px; overflow: hidden;
          background: linear-gradient(180deg, rgba(210, 225, 235, 0.9), rgba(190, 210, 222, 0.9)); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
        }
        .machine.mode-full .dh-win { box-shadow: inset 0 0 0 1.5px #e53935; }
        .dh-water { position: absolute; left: 0; right: 0; bottom: 0; height: var(--dh-fill, 35%); background: linear-gradient(180deg, #64b5f6, #1e88e5); }
        .dh-water::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1.5px; background: rgba(255, 255, 255, 0.6); }
        .dh-drip i { position: absolute; top: -3px; width: 2px; height: 3px; border-radius: 50%; background: #42a5f5; opacity: 0; }
        .dh-drip i:nth-child(1) { left: 9px; }
        .dh-drip i:nth-child(2) { left: 15px; }
        .machine.mode-drying .dh-drip i, .machine.mode-laundry .dh-drip i { animation: dh-drip 1.3s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-drying .dh-drip i:nth-child(2), .machine.mode-laundry .dh-drip i:nth-child(2) { animation-delay: calc(-0.65s + var(--anim-offset, 0s)); }
        .dh-foot { position: absolute; bottom: 4px; width: 7px; height: 5px; border-radius: 0 0 3px 3px; background: #3b4048; }
        .dh-foot.f1 { left: 28px; }
        .dh-foot.f2 { right: 28px; }
        .dh-air { left: 28px; top: -2px; width: 40px; height: 24px; }
        .machine.mode-drying .dh-air, .machine.mode-laundry .dh-air { display: block; }
        .dh-air path { stroke: #81d4fa; }
        .machine.mode-laundry .dh-air path { stroke: #1565c0; }
        @keyframes dh-drip { 0% { opacity: 0; transform: translateY(0); } 15% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; transform: translateY(16px); } }
        @keyframes dh-blink { 50% { opacity: 0.25; } }
  `,
  // A small room heater, in two models. The fan heater glows behind its
  // grille and its fan turns; the oil-filled radiator warms up from the
  // bottom of its fins. Warm air rises above both, and a fan heater set to
  // blow only sends grey air the other way.
  space_heater: () => `${MINI_LCD_CSS}
        .machine.mode-heating .mini-lcd { color: #ffab76; }
        .machine.mode-idle .mini-lcd { color: #a5d6a7; }
        .machine.mode-fan .mini-lcd { color: #e0e0e0; }
        .machine.mode-heating .air-flow, .machine.mode-fan .air-flow { display: block; }
        .air-flow path { stroke: #ff8a65; }
        .machine.mode-fan .air-flow path { stroke: #90a4ae; }
        .hf-body {
          position: absolute; left: 25px; right: 25px; top: 36px; bottom: 10px; border-radius: 12px 12px 8px 8px;
          background: linear-gradient(160deg, var(--ac-body-hi, #ffffff), var(--ac-body, #eceff1) 55%, var(--ac-body-lo, #cfd6db));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
        .hf-handle { position: absolute; left: 41px; width: 14px; top: 40px; height: 4px; border-radius: 2px; background: rgba(0, 0, 0, 0.28); }
        .hf-lcd { left: 38px; top: 48px; min-width: 16px; }
        .hf-grill { position: absolute; left: 31px; top: 61px; width: 34px; height: 31px; border-radius: 7px; overflow: hidden; background: #20252b; }
        .hf-grill::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(180deg, rgba(30, 34, 40, 0.95) 0 1.4px, transparent 1.4px 4px); }
        .hf-glow { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse at 50% 55%, #ffb74d, #ff7043 45%, #8d2d0e 80%); }
        .machine.mode-heating .hf-glow { opacity: 1; animation: sh-glow 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .hf-fan { position: absolute; left: 50%; top: 50%; width: 22px; height: 22px; margin: -11px 0 0 -11px; opacity: 0.5; fill: #78909c; }
        .machine.mode-heating .hf-fan, .machine.mode-fan .hf-fan { animation: sh-spin 0.5s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .hf-foot { position: absolute; bottom: 6px; width: 10px; height: 4px; border-radius: 0 0 3px 3px; background: #3b4048; }
        .hf-foot.f1 { left: 30px; }
        .hf-foot.f2 { right: 30px; }
        .hf-air { left: 27px; top: 6px; width: 42px; height: 30px; }
        .ho-fins { position: absolute; left: 14px; top: 30px; width: 58px; height: 62px; display: flex; gap: 1.5px; }
        .ho-fins i {
          flex: 1; border-radius: 4px; position: relative; overflow: hidden;
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 45%, var(--ac-body, #e6eaed));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
        .ho-fins i::after { content: ""; position: absolute; inset: 0; opacity: 0; background: linear-gradient(0deg, rgba(255, 112, 67, 0.55), rgba(255, 171, 145, 0.15) 70%, transparent); }
        .machine.mode-heating .ho-fins i::after { opacity: 1; animation: sh-glow 3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .ho-box {
          position: absolute; left: 73px; top: 34px; width: 12px; height: 26px; border-radius: 3px;
          background: linear-gradient(90deg, var(--ac-body, #e6eaed), var(--ac-body-lo, #cfd6db)); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
        .ho-knob { position: absolute; left: 76px; top: 48px; width: 6px; height: 6px; border-radius: 50%; background: #90a4ae; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2); }
        .ho-lcd { left: 74px; top: 37px; min-width: 9px; padding: 0 1px; }
        .ho-base { position: absolute; left: 18px; width: 50px; top: 92px; height: 3px; border-radius: 2px; background: #5f666e; }
        .ho-wheel { position: absolute; top: 94px; width: 6px; height: 6px; border-radius: 50%; background: #3b4048; }
        .ho-wheel.w1 { left: 18px; }
        .ho-wheel.w2 { left: 62px; }
        .ho-air { left: 14px; top: 2px; width: 58px; height: 28px; }
        @keyframes sh-spin { to { transform: rotate(360deg); } }
        @keyframes sh-glow { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.25); } }
  `,
  // A towel warmer on the bathroom wall: two rails, the bars between them, a
  // towel over one, and the control box underneath. The bars warm with the
  // mode, the heat rises above them, and drying, the towel steams.
  towel_warmer: () => `${MINI_LCD_CSS}
        .machine.mode-comfort .mini-lcd, .machine.mode-boost .mini-lcd, .machine.mode-drying .mini-lcd { color: #ffab76; }
        .machine.mode-eco .mini-lcd { color: #b39ddb; }
        .machine.mode-frost .mini-lcd { color: #81d4fa; }
        svg.tw-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .tw-bar { fill: var(--ac-body, #eef1f3); }
        .tw-l-panel .tw-bar { fill: var(--ac-body, #3a4047); }
        .machine.mode-comfort .tw-bar, .machine.mode-drying .tw-bar { fill: #ffab91; }
        .machine.mode-boost .tw-bar { fill: #ff5722; filter: drop-shadow(0 0 1.5px rgba(255, 87, 34, 0.8)); }
        .machine.mode-eco .tw-bar { fill: #ffccbc; }
        .tw-l-panel.mode-comfort .tw-bar, .tw-l-panel.mode-drying .tw-bar { fill: #8a4a3a; }
        .tw-l-panel.mode-boost .tw-bar { fill: #c0452a; }
        .tw-l-panel.mode-eco .tw-bar { fill: #5f4a45; }
        .tw-lcd { left: 68.5px; top: 92.5px; min-width: 13px; }
        .tw-l-panel .tw-lcd { left: 64px; top: 93.5px; }
        .tw-air { left: 22px; top: 0; width: 52px; height: 14px; }
        .machine.mode-comfort .tw-air, .machine.mode-boost .tw-air, .machine.mode-eco .tw-air { display: block; }
        .tw-air path, .tw-steam path { stroke: #ff8a65; }
        .machine.mode-eco .tw-air path { animation-duration: 2.6s; opacity: 0.6; }
        .machine.mode-boost .tw-air path { animation-duration: 0.7s; }
        .tw-steam { left: 33px; top: 24px; width: 30px; height: 22px; }
        .tw-l-panel .tw-steam { left: 40px; top: -6px; }
        .machine.mode-drying .tw-steam { display: block; }
  `,
  // An air fryer, in three models: a basket under a top panel, the same with
  // a window onto the fries, and two baskets side by side. The heat rises
  // above it while it cooks, the seam over the basket glows, and a basket
  // pulled out comes forward.
  air_fryer: () => `${MINI_LCD_CSS}
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
  pellet_stove: () => `
        .ps-pipe {
          position: absolute; left: 43px; top: 0; width: 10px; height: 14px; border-radius: 2px 2px 0 0;
          background: linear-gradient(90deg, #5d646b, #8a9096, #5d646b);
        }
        .ps-body {
          position: absolute; left: 15px; right: 15px; top: 13px; bottom: 5px; border-radius: 7px 7px 4px 4px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .ps-lid { position: absolute; left: 15px; right: 15px; top: 13px; height: 5px; border-radius: 7px 7px 0 0; background: rgba(0, 0, 0, 0.08); }
        .ps-lcd {
          position: absolute; left: 21px; top: 21px; width: 28px; height: 10px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center; overflow: hidden;
          font: 600 7px/10px ui-monospace, "SF Mono", monospace;
        }
        .machine.mode-ignition .ps-lcd, .machine.mode-burning .ps-lcd, .machine.mode-modulating .ps-lcd { color: #ff7043; }
        .machine.mode-eco .ps-lcd { color: #81c784; }
        .machine.mode-cooling .ps-lcd { color: #90caf9; }
        .machine.mode-cleaning .ps-lcd { color: #ffca28; }
        .machine.mode-alarm .ps-lcd { color: #ef5350; animation: ps-blink 1s steps(2) infinite; animation-delay: var(--anim-offset, 0s); }
        .ps-grille { position: absolute; left: 54px; top: 22px; width: 22px; height: 8px; opacity: 0.7; background: repeating-linear-gradient(180deg, #6b737c 0 1px, transparent 1px 3px); }
        .ps-door { position: absolute; left: 21px; top: 35px; width: 44px; height: 52px; border-radius: 5px; background: #2b2f35; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4); }
        .ps-glass { position: absolute; inset: 4px; border-radius: 3px; background: #14161a; overflow: hidden; }
        .ps-shine { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 45%); pointer-events: none; }
        .ps-handle { position: absolute; left: 61px; top: 52px; width: 3px; height: 16px; border-radius: 2px; background: #8a9096; }
        .ps-pot { position: absolute; left: 50%; bottom: 3px; width: 22px; height: 6px; margin-left: -11px; border-radius: 1px 1px 3px 3px; background: #4a4f55; }
        .ps-glow {
          position: absolute; left: 50%; bottom: 8px; width: 26px; height: 8px; margin-left: -13px; border-radius: 50%; opacity: 0;
          background: radial-gradient(ellipse, rgba(255, 112, 67, 0.95), rgba(255, 87, 34, 0.25) 60%, transparent 72%);
        }
        .ps-spark { position: absolute; left: 50%; bottom: 5px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; opacity: 0; background: #ffcc80; box-shadow: 0 0 6px 3px rgba(255, 152, 0, 0.9); }
        /* The boiler's flame, without the blue root of a gas burner. */
        .ps-flame {
          position: absolute; left: 50%; bottom: 8px; width: 28px; height: 34px; margin-left: -14px; transform-origin: 50% 100%; opacity: 0;
          background: linear-gradient(0deg, #ff6d00 0%, #ffa000 25%, #ffca28 55%, #fff176 100%);
          clip-path: polygon(46% 0%, 58% 30%, 70% 10%, 76% 44%, 90% 28%, 94% 64%, 86% 88%, 66% 100%, 34% 100%, 14% 88%, 6% 62%, 12% 32%, 26% 50%, 30% 18%, 42% 36%);
        }
        .ps-ash i { position: absolute; bottom: 9px; width: 3px; height: 3px; border-radius: 50%; background: #9e9e9e; opacity: 0; }
        .ps-ash i:nth-child(1) { left: 14px; }
        .ps-ash i:nth-child(2) { left: 19px; }
        .ps-ash i:nth-child(3) { left: 23px; }
        .ps-hopper { position: absolute; left: 69px; top: 37px; width: 6px; height: 48px; border-radius: 3px; background: #14161a; overflow: hidden; box-shadow: 0 0 0 1px var(--ac-body-lo, #aeb2b5); }
        .ps-pellets {
          position: absolute; left: 0; right: 0; bottom: 0; height: var(--ps-fill, 60%);
          background: radial-gradient(circle at 1.5px 1.5px, #c08a52 1.1px, transparent 1.4px) 0 0 / 3px 3px, #8d5a2b;
        }
        .machine.empty .ps-hopper { box-shadow: 0 0 0 1.5px #ef5350; }
        .ps-foot { position: absolute; bottom: 1px; width: 10px; height: 4px; border-radius: 0 0 2px 2px; background: #3b4048; }
        .ps-foot.f1 { left: 21px; }
        .ps-foot.f2 { right: 21px; }
        .ps-air { position: absolute; left: 52px; top: -14px; width: 30px; height: 34px; overflow: hidden; pointer-events: none; }
        .ps-air i {
          position: absolute; bottom: 0; width: 9px; height: 26px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 112, 67, 0), rgba(255, 112, 67, 0.85) 45%, rgba(255, 87, 34, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
        }
        .ps-air i.a1 { left: 1px; }
        .ps-air i.a2 { left: 11px; }
        .ps-air i.a3 { left: 21px; }
        .ps-smoke i { position: absolute; left: 44px; top: -2px; width: 8px; height: 8px; border-radius: 50%; background: rgba(140, 145, 150, 0.55); opacity: 0; }
        .machine.mode-burning .ps-flame { opacity: 1; animation: ps-flicker 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-burning .ps-glow, .machine.mode-modulating .ps-glow, .machine.mode-ignition .ps-glow { opacity: 1; }
        .machine.mode-burning .ps-air i { animation: ps-rise 2.2s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-burning .ps-air i.a2 { animation-delay: calc(-0.73s + var(--anim-offset, 0s)); }
        .machine.mode-burning .ps-air i.a3 { animation-delay: calc(-1.46s + var(--anim-offset, 0s)); }
        /* Modulating: the same fire, smaller, and less warm air. */
        .machine.mode-modulating .ps-flame { opacity: 1; width: 16px; height: 18px; margin-left: -8px; animation: ps-flicker 0.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-modulating .ps-air i.a2 { animation: ps-rise 3s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        /* Lighting: the igniter glows, a first flame, and smoke at the flue. */
        .machine.mode-ignition .ps-spark { opacity: 1; animation: ps-spark 0.5s steps(2) infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-ignition .ps-flame { opacity: 1; width: 9px; height: 10px; margin-left: -4.5px; animation: ps-flicker 0.35s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-ignition .ps-smoke i, .machine.mode-cleaning .ps-smoke i { animation: ps-puff 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-ignition .ps-smoke i:nth-child(2), .machine.mode-cleaning .ps-smoke i:nth-child(2) { animation-delay: calc(-1.3s + var(--anim-offset, 0s)); }
        /* Eco: the fire is out and the embers breathe. */
        .machine.mode-eco .ps-glow { animation: ps-breathe 3.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        /* Cooling down: the last embers, and the fans blow the heat out, cool. */
        .machine.mode-cooling .ps-glow { opacity: 0.25; }
        .machine.mode-cooling .ps-air i {
          background: linear-gradient(180deg, rgba(144, 202, 249, 0), rgba(144, 202, 249, 0.8) 45%, rgba(100, 181, 246, 0.9));
          animation: ps-rise 2.8s ease-in infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.mode-cooling .ps-air i.a2 { animation-delay: calc(-0.93s + var(--anim-offset, 0s)); }
        .machine.mode-cooling .ps-air i.a3 { animation-delay: calc(-1.86s + var(--anim-offset, 0s)); }
        /* Cleaning the burn pot: the ash is blown up out of it. */
        .machine.mode-cleaning .ps-ash i { animation: ps-ash 1.1s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-cleaning .ps-ash i:nth-child(2) { animation-delay: calc(-0.37s + var(--anim-offset, 0s)); }
        .machine.mode-cleaning .ps-ash i:nth-child(3) { animation-delay: calc(-0.74s + var(--anim-offset, 0s)); }
        @keyframes ps-flicker {
          0%, 100% { transform: scale(1, 1); }
          30% { transform: scale(0.92, 1.1); }
          60% { transform: scale(1.06, 0.9); }
        }
        @keyframes ps-rise {
          0% { transform: translateY(18px); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-8px); opacity: 0; }
        }
        @keyframes ps-spark { 0% { opacity: 1; } 100% { opacity: 0.2; } }
        @keyframes ps-puff {
          0% { transform: translate(0, 4px) scale(0.6); opacity: 0; }
          25% { opacity: 0.8; }
          100% { transform: translate(6px, -14px) scale(1.6); opacity: 0; }
        }
        @keyframes ps-breathe { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.6; } }
        @keyframes ps-ash {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(4px, -22px); opacity: 0; }
        }
        @keyframes ps-blink { 0% { opacity: 1; } 100% { opacity: 0.25; } }
  `,
  heat_pump: () => `
        .hp-unit {
          position: absolute; left: 2px; right: 2px; top: 4px; height: 60px; border-radius: 5px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hp-grille {
          position: absolute; left: 5px; top: 5px; width: 48px; height: 48px; border-radius: 50%;
          background: #14161a; overflow: hidden; box-shadow: 0 0 0 2px var(--ac-body-lo, #aeb2b5);
        }
        .hp-fan {
          position: absolute; inset: 5px; border-radius: 50%;
          background: conic-gradient(#6b737c 0 16%, transparent 16% 33.3%, #6b737c 33.3% 49.3%, transparent 49.3% 66.6%, #6b737c 66.6% 82.6%, transparent 82.6%);
        }
        .hp-hub { position: absolute; left: 50%; top: 50%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #8a9096; }
        .hp-guard { position: absolute; inset: 0; border-radius: 50%; background: repeating-radial-gradient(circle, transparent 0 5px, rgba(255, 255, 255, 0.14) 5px 6px); }
        .hp-frost { position: absolute; inset: 0; border-radius: 50%; opacity: 0; background: radial-gradient(circle, rgba(225, 245, 254, 0.15) 35%, rgba(225, 245, 254, 0.9) 100%); }
        .hp-side { position: absolute; left: 58px; right: 4px; top: 5px; bottom: 5px; }
        .hp-lcd {
          position: absolute; left: 0; right: 0; top: 0; height: 10px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center; font: 600 7px/10px ui-monospace, "SF Mono", monospace;
        }
        .hp-fins { position: absolute; left: 0; right: 0; top: 14px; bottom: 0; background: repeating-linear-gradient(180deg, var(--ac-body-lo, #aeb2b5) 0 1px, transparent 1px 4px); }
        .hp-foot { position: absolute; top: 65px; width: 10px; height: 4px; border-radius: 0 0 2px 2px; background: #3b4048; }
        .hp-foot.f1 { left: 6px; }
        .hp-foot.f2 { right: 6px; }
        /* Two pipes a circuit, the flow and the return. */
        .hp-pipe { position: absolute; top: 66px; width: 3px; height: 14px; background: #8a9096; overflow: hidden; }
        .hp-pipe.tank.flow { left: 20px; }
        .hp-pipe.tank.ret { left: 25px; }
        .hp-pipe.rad.flow { left: 62px; }
        .hp-pipe.rad.ret { left: 67px; }
        .hp-tank {
          position: absolute; left: 12px; top: 78px; width: 24px; height: 28px; border-radius: 8px / 5px; overflow: hidden;
          background: linear-gradient(90deg, var(--ac-body-lo, #aeb2b5), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 35%, var(--ac-body-hi, #e6e6e6) 55%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hp-tank i { position: absolute; left: 0; right: 0; bottom: 0; height: 0; background: linear-gradient(180deg, rgba(255, 87, 51, 0.75), rgba(255, 138, 60, 0.45)); }
        .hp-rad { position: absolute; left: 58px; right: 2px; top: 80px; height: 26px; }
        .hp-rad i {
          position: absolute; top: 0; bottom: 0; width: 5px; border-radius: 2px;
          background: var(--ac-body-lo, #aeb2b5); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
        .hp-rad i:nth-child(1) { left: 0; }
        .hp-rad i:nth-child(2) { left: 7px; }
        .hp-rad i:nth-child(3) { left: 14px; }
        .hp-rad i:nth-child(4) { left: 21px; }
        .hp-rad i:nth-child(5) { left: 28px; }
        /* Underfloor heating as its symbol draws it (mdi:heating-coil): a pipe
           snaking across a slab seen from above at an angle, and the heat
           rising off it. The coil is drawn flat in a square and laid down at
           the slab's angle, so its runs lean exactly like the slab's edges. */
        .hp-floor { position: absolute; left: 56px; right: 2px; top: 78px; height: 28px; }
        .hp-slab { position: absolute; left: -2px; right: -2px; bottom: 2px; height: 15px; }
        .hp-coil {
          position: absolute; left: 50%; top: 50%; width: 30px; height: 30px; margin: -15px 0 0 -15px;
          background: var(--ac-body-lo, #9aa0a6); transform: scaleY(0.357) rotate(45deg);
        }
        /* Four runs and three bends, one bend a box: its two long borders are
           two runs, and its rounded side the bend between them. */
        .hp-coil b {
          position: absolute; left: 3px; right: 3px; height: 10px; box-sizing: border-box;
          border: 3px solid #6b737c; border-left: 0; border-radius: 0 5px 5px 0;
        }
        .hp-coil b:nth-child(1) { top: 2px; }
        .hp-coil b:nth-child(2) { top: 9px; border-left: 3px solid #6b737c; border-right: 0; border-radius: 5px 0 0 5px; }
        .hp-coil b:nth-child(3) { top: 16px; }
        .hp-floor i {
          position: absolute; bottom: 17px; width: 6px; height: 13px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 183, 77, 0), rgba(255, 138, 60, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
        }
        .hp-floor i:nth-child(1) { left: 9px; }
        .hp-floor i:nth-child(2) { left: 19px; height: 16px; }
        .hp-floor i:nth-child(3) { left: 29px; height: 11px; }
        .machine.mode-space_heating .hp-floor i { animation: hp-rise 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .hp-floor i:nth-child(2) { animation-delay: calc(-0.87s + var(--anim-offset, 0s)); }
        .machine.mode-space_heating .hp-floor i:nth-child(3) { animation-delay: calc(-1.74s + var(--anim-offset, 0s)); }
        @keyframes hp-rise {
          0% { opacity: 0; transform: translateY(5px) scaleY(0.75); }
          35% { opacity: 0.85; }
          100% { opacity: 0; transform: translateY(-9px) scaleY(1.1); }
        }
        /* The pipes drop onto the near edge of the slab. */
        .machine.underfloor .hp-pipe.rad.flow { left: 54px; height: 30px; }
        .machine.underfloor .hp-pipe.rad.ret { left: 59px; height: 28px; }
        /* With no tank on the left, what is left stands in the middle. */
        .machine.no-tank .hp-pipe.rad.flow { left: 35px; }
        .machine.no-tank .hp-pipe.rad.ret { left: 40px; }
        .machine.no-tank .hp-rad { left: 31px; right: 29px; }
        .machine.no-tank .hp-floor { left: 31px; right: 27px; }
        .machine.no-tank.underfloor .hp-pipe.rad.flow { left: 29px; }
        .machine.no-tank.underfloor .hp-pipe.rad.ret { left: 34px; }
        .machine.fan .hp-fan { animation: hp-spin 1.1s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes hp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .machine.mode-space_heating .hp-lcd,
        .machine.mode-hot_water .hp-lcd { color: #ff7043; }
        /* Out hot and back cooler while it heats, out cold and back warmer
           while it cools: the two colours say which way the heat goes. */
        .machine.mode-space_heating .hp-pipe.rad.flow { background: #ff7043; }
        .machine.mode-space_heating .hp-pipe.rad.ret,
        .machine.mode-hot_water .hp-pipe.tank.ret { background: #4fc3f7; }
        .machine.mode-space_heating .hp-rad i { background: linear-gradient(180deg, #ffab91, #ff7043); animation: hp-glow 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-hot_water .hp-pipe.tank.flow { background: #ef5350; }
        .machine.mode-hot_water .hp-tank i { height: 100%; animation: hp-glow 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .hp-coil { background: #ffe0d6; }
        .machine.mode-space_heating .hp-coil b { border-color: #ff7043; }
        .machine.mode-cooling .hp-pipe.rad.flow { background: #29b6f6; }
        .machine.mode-cooling .hp-pipe.rad.ret { background: #ff8a65; }
        .machine.mode-cooling .hp-rad i { background: linear-gradient(180deg, #b3e5fc, #29b6f6); }
        .machine.mode-cooling .hp-coil { background: #d8f1fd; }
        .machine.mode-cooling .hp-coil b { border-color: #29b6f6; }
        /* The water itself: light dashes running down the flow pipe and back
           up the return, on the circuit the pump is working. */
        .machine.flowing.mode-hot_water .hp-pipe.tank::after,
        .machine.flowing.mode-space_heating .hp-pipe.rad::after,
        .machine.flowing.mode-cooling .hp-pipe.rad::after {
          content: ""; position: absolute; inset: 0;
          background: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0 2px, transparent 2px 6px);
          animation: hp-flow 0.8s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.flowing .hp-pipe.ret::after { animation-direction: reverse; }
        @keyframes hp-flow { from { background-position: 0 0; } to { background-position: 0 6px; } }
        @keyframes hp-glow { 0%, 100% { filter: brightness(0.9); } 50% { filter: brightness(1.15); } }
        .machine.mode-defrost .hp-frost { animation: hp-frost 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-defrost .hp-fins { background: repeating-linear-gradient(180deg, #b3e5fc 0 1px, transparent 1px 4px); }
        @keyframes hp-frost { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.9; } }
  `,
  pet_feeder: () => `
        /* Drawn from the feeders people actually buy: a tank with a window on
           the kibble, a small dark panel with a lit screen and a steel bowl in
           a tray moulded like the shell. The shell takes the appliance colour,
           dark by default, white for the round tank and the two-hopper one,
           the way they are sold. */
        .machine { --pf-lo: var(--ac-body-lo, #16191d); --pf-hi: var(--ac-body-hi, #4b535d); --pf-body: var(--ac-body, #2b3037); --pf-gloss: 0.1; }
        .machine.canister, .machine.dual_split { --pf-lo: var(--ac-body-lo, #b4bcc5); --pf-hi: var(--ac-body-hi, #ffffff); --pf-body: var(--ac-body, #f1f4f7); --pf-gloss: 0.6; }
        svg.pf-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .pf-lcd { fill: #69f0ae; }
        .machine.feeding .pf-lcd { fill: #4fc3f7; }
        .machine.alert .pf-lcd { fill: #ff5252; }
        /* While a meal is served, kibble drops from the chute into the bowl,
           and the turning tray of the wet-food feeder brings the next dish. */
        .pf-drop { opacity: 0; transform-box: fill-box; }
        .machine.feeding .pf-drop { animation: pf-fall 0.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.feeding .pfd2 { animation-delay: calc(-0.22s + var(--anim-offset, 0s)); }
        .machine.feeding .pfd3 { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .machine.feeding .pfd4 { animation-delay: calc(-0.67s + var(--anim-offset, 0s)); }
        @keyframes pf-fall { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(var(--pf-fall, 9px)); opacity: 0; } }
        .machine.rotary.feeding .pf-turn { animation: pf-turn 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes pf-turn { 0%, 55% { transform: translateX(0); } 100% { transform: translateX(-32px); } }
        /* The cat, when there is something to be cross about: an empty tank or a
           jam. Its proportions are the ones every grumpy cat is drawn with: a
           head that takes half the height and nearly all the width, a small
           body tucked under it, and the tail curled round the front. */
        .pf-cat { position: absolute; left: 0; bottom: 3px; width: 42px; height: 44px; }
        .pf-cat .body {
          position: absolute; left: 9px; bottom: 0; width: 24px; height: 17px;
          border-radius: 12px 12px 9px 9px; background: #e7dbcf;
        }
        .pf-cat .paw {
          position: absolute; bottom: 0; width: 8px; height: 5px; border-radius: 4px 4px 3px 3px;
          background: #f6efe6;
        }
        .pf-cat .paw.l { left: 13px; }
        .pf-cat .paw.r { right: 13px; }
        .pf-cat .head {
          position: absolute; left: 1px; bottom: 12px; width: 40px; height: 30px;
          border-radius: 50% 50% 46% 46% / 46% 46% 54% 54%; background: #efe5da;
        }
        /* Small ears, set wide and tilted out, with the darker point a seal
           point cat carries. */
        .pf-cat .ear {
          position: absolute; bottom: 34px; width: 12px; height: 11px; background: #a1887f;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-cat .ear span {
          position: absolute; left: 50%; bottom: 0; width: 6px; height: 6px; margin-left: -3px;
          background: #d8b7ad; clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-cat .ear.l { left: 0; transform: rotate(-18deg); }
        .pf-cat .ear.r { right: 0; transform: rotate(18deg); }
        /* The lids do the sulking: thick, level, and low over the eye. */
        /* The eye is a low almond, and most of it is lid: on a grumpy cat the
           open part is a slit, which is what makes the stare. */
        .pf-cat .eye {
          position: absolute; top: 10px; width: 11px; height: 7px; border-radius: 1px 1px 5px 5px;
          background: #bcd6e6; border-top: 4px solid #4a4a46; overflow: hidden;
        }
        /* A big pupil, cut off at the top by the lid: on both drawings it takes
           most of what the eye still shows. */
        .pf-cat .eye span {
          position: absolute; left: 50%; top: -1px; width: 6px; height: 6px; margin-left: -3px;
          border-radius: 50%; background: #3a3f45;
        }
        .pf-cat .eye.l { left: 5px; transform: rotate(7deg); }
        .pf-cat .eye.r { right: 5px; transform: rotate(-7deg); }
        .pf-cat .muzzle {
          position: absolute; left: 50%; bottom: 2px; width: 21px; height: 13px; margin-left: -10.5px;
          border-radius: 50%; background: #faf4ec;
        }
        .pf-cat .nose {
          position: absolute; left: 50%; bottom: 8px; width: 5px; height: 4px; margin-left: -2.5px;
          background: #c98f8f; clip-path: polygon(50% 100%, 100% 0, 0 0);
        }
        .pf-cat .mouth {
          position: absolute; bottom: 3px; width: 7px; height: 5px;
          border-top: 1.8px solid #7a675d; border-radius: 50%;
        }
        .pf-cat .mouth.l { left: 50%; margin-left: -7px; }
        .pf-cat .mouth.r { left: 50%; margin-left: 0; }
        .pf-cat .whisk {
          position: absolute; bottom: 8px; width: 12px; height: 1px; border-radius: 1px;
          background: rgba(122, 103, 93, 0.5);
        }
        .pf-cat .whisk.l { left: -5px; transform: rotate(9deg); box-shadow: 1px 4px 0 0 rgba(122, 103, 93, 0.4); }
        .pf-cat .whisk.r { right: -5px; transform: rotate(-9deg); box-shadow: -1px 4px 0 0 rgba(122, 103, 93, 0.4); }
        /* The tail comes round the front, as a sitting cat lays it. */
        .pf-cat .tail {
          position: absolute; left: -3px; bottom: -1px; width: 17px; height: 13px;
          border: 4.5px solid #d9ccbf; border-top-color: transparent; border-right-color: transparent;
          border-radius: 0 0 0 12px;
        }
        /* The warning sits straight above its head: the two say the same thing,
           so they are read together. */
        .pf-alert { position: absolute; left: 12px; top: 38px; width: 18px; height: 16px; }
        .pf-alert::before {
          content: ""; position: absolute; inset: 0; background: var(--error-color, #f44336);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-alert i { position: absolute; left: 50%; background: #fff; }
        .pf-alert .bar { top: 5.5px; width: 2.5px; height: 5px; margin-left: -1.25px; border-radius: 1.25px; }
        .pf-alert .dot { top: 12px; width: 2.5px; height: 2.5px; margin-left: -1.25px; border-radius: 50%; }
        /* On the round tank, the double, the two hoppers and the wet-food
           feeder, the cat sits on the right. */
        .machine.canister .pf-cat, .machine.double .pf-cat, .machine.dual_split .pf-cat, .machine.rotary .pf-cat { left: auto; right: 0; }
        .machine.canister .pf-alert, .machine.double .pf-alert, .machine.dual_split .pf-alert, .machine.rotary .pf-alert { left: auto; right: 12px; }
  `,
  kettle: () => `
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
  cooker: (color) => `
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
  coffee: (color) => `
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
  rice_cooker: (color) => `
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
  // An air purifier in one of three shapes: a cylinder blowing out of its
  // top, a square box with its fan on top, or a bladeless ring that blows
  // forward, sideways while it oscillates, or backwards. Clean air is blue,
  // warm air orange, the night dims both, and a four-step gauge reads the
  // quality of the air.
  air_purifier: () => `${AIR_CSS}
        .pf-bar { position: absolute; z-index: 5; display: flex; gap: 0.8px; }
        .pf-bar i { flex: 1; border-radius: 1px; background: rgba(0, 0, 0, 0.16); }
        .machine.on.aq1 .pf-bar i:nth-child(-n+1), .machine.on.aq2 .pf-bar i:nth-child(-n+2), .machine.on.aq3 .pf-bar i:nth-child(-n+3), .machine.on.aq4 .pf-bar i {
          background: var(--aq); box-shadow: 0 0 2px var(--aq);
        }
        .pf-lcd {
          position: absolute; z-index: 5; border-radius: 2px; background: rgba(10, 14, 18, 0.92); color: #e3f2fd; text-align: center;
          font: 700 6.5px/9px ui-monospace, "SF Mono", Menlo, monospace; text-shadow: 0 0 2px currentColor;
        }
        .dy-round {
          position: absolute; z-index: 6; border-radius: 50%; background: radial-gradient(circle at 50% 40%, #1b2025, #07090b);
          box-shadow: 0 0 0 0.9px #b9bfc4, 0 0 0 1.4px rgba(0, 0, 0, 0.3);
        }
        .dy-round span {
          position: absolute; inset: 0; color: #e3f2fd; text-align: center; text-shadow: 0 0 1.5px currentColor;
          font: 700 10px/20px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; letter-spacing: -0.2px;
        }
        /* Off, the screen still reads the room, dimmed, as a Dyson's does on
           its standby: only a purifier out of reach shows nothing. */
        .machine:not(.on) .pf-lcd span, .machine:not(.on) .dy-round span { opacity: 0.45; text-shadow: none; }
        .machine.mode-offline .pf-lcd span, .machine.mode-offline .dy-round span { display: none; }
        .machine.mode-night .pf-bar { opacity: 0.35; }
        .machine.mode-night .pf-lcd, .machine.mode-night .dy-round span { opacity: 0.7; }
        .cy-body, .cy-ring, .cy-ctrl, .cy-perf, .co-top, .co-fan, .co-hub, .co-lid, .co-body, .co-perf { position: absolute; }
        .cy-body {
          z-index: 2; border-radius: 14px 14px 11px 11px / 10px 10px 7px 7px;
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 30%, var(--ac-body, #eceff1) 66%, var(--ac-body-lo, #cfd6db));
          box-shadow: inset 0 0 0 0.8px rgba(0, 0, 0, 0.14), 0 2px 3px rgba(0, 0, 0, 0.14);
        }
        .cy-ring { z-index: 3; border-radius: 50%; background: repeating-conic-gradient(from 0deg, #6b7379 0 3deg, #c4cacf 3deg 8deg); box-shadow: 0 0 0 1.2px #8a9298, inset 0 0 0 1px rgba(0, 0, 0, 0.25); }
        .cy-ctrl { z-index: 4; border-radius: 50%; background: radial-gradient(ellipse at 50% 40%, #3a4147, #15191c); box-shadow: 0 0 0 0.8px #6f777d; }
        .cy-perf { z-index: 3; -webkit-mask-image: linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent); mask-image: linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent); }
        .cy-perf i {
          position: absolute; inset: 0; background: radial-gradient(circle, rgba(0, 0, 0, 0.42) 0.75px, transparent 1px) 0 0 / 3px 3px;
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 45%); mask-image: linear-gradient(180deg, transparent, #000 45%);
        }
        .co-top {
          z-index: 3; border-radius: 7px 7px 2px 2px / 5px 5px 1px 1px;
          background: linear-gradient(180deg, var(--ac-body, #eceff1), var(--ac-body-hi, #ffffff) 80%); box-shadow: inset 0 0 0 0.8px rgba(0, 0, 0, 0.14);
        }
        .co-fan { z-index: 4; border-radius: 50%; background: repeating-conic-gradient(from 0deg, #8e969c 0 3deg, #e3e7ea 3deg 9deg); box-shadow: 0 0 0 1px #b3babf, inset 0 0 0 1px rgba(0, 0, 0, 0.15); }
        .co-fan::before { content: ""; position: absolute; inset: 22%; border-radius: 50%; box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.25); }
        .co-hub { z-index: 5; border-radius: 50%; background: radial-gradient(ellipse at 50% 35%, #ffffff, #d5dadd); box-shadow: 0 0 0 0.7px rgba(0, 0, 0, 0.25); }
        .co-lid {
          z-index: 3; border-radius: 1px; box-shadow: inset 0 0 0 0.8px rgba(0, 0, 0, 0.14), 0 1px 0 rgba(0, 0, 0, 0.18);
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 22%, var(--ac-body, #eceff1) 75%, var(--ac-body-lo, #cfd6db));
        }
        .co-body {
          z-index: 2; border-radius: 1px 1px 5px 5px / 1px 1px 3px 3px; box-shadow: inset 0 0 0 0.8px rgba(0, 0, 0, 0.12), 0 2px 3px rgba(0, 0, 0, 0.14);
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 18%, var(--ac-body, #eceff1) 75%, var(--ac-body-lo, #cfd6db));
        }
        .co-perf {
          z-index: 3; background: radial-gradient(circle, rgba(0, 0, 0, 0.42) 0.7px, transparent 0.95px) 0 0 / 2.8px 2.8px;
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 40%); mask-image: linear-gradient(180deg, transparent, #000 40%);
        }
        .dy-loop, .dy-back { position: absolute; }
        .dy-head { position: absolute; left: 0; top: 0; width: 96px; height: 108px; z-index: 5; transform-origin: 48px 50%; }
        .dy-loop {
          z-index: 5; box-sizing: border-box; border: 4.5px solid; border-radius: 16px;
          border-color: var(--ac-body-hi, #ffffff) var(--ac-body-lo, #cfd6db) var(--ac-body-lo, #cfd6db) var(--ac-body, #eceff1);
          box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.35), inset 0 0 0 1.7px #c9ced3, inset 0.6px 0.6px 0 2.2px rgba(255, 255, 255, 0.75), inset 0 0 0 2.6px rgba(0, 0, 0, 0.25);
        }
        .dy-back { z-index: 4; overflow: hidden; border-radius: 12px; display: none; }
        .dy-back b {
          position: absolute; inset: 0; border: 1.6px solid var(--air, #42a5f5); border-radius: 12px; opacity: 0;
          animation: pf-aspire var(--spd, 1.6s) ease-in infinite; animation-delay: var(--anim-offset, 0s);
        }
        .dy-back b:nth-child(2) { animation-delay: calc(var(--spd, 1.6s) * -0.5 + var(--anim-offset, 0s)); }
        .dy-back b:nth-child(3) { animation-delay: calc(var(--spd, 1.6s) * -0.25 + var(--anim-offset, 0s)); }
        .dy-back b:nth-child(4) { animation-delay: calc(var(--spd, 1.6s) * -0.75 + var(--anim-offset, 0s)); }
        .machine.on.back .dy-back { display: block; }
        .machine.lv1 .dy-back b:nth-child(n+3), .machine.lv2 .dy-back b:nth-child(n+4) { display: none; }
        .machine.mode-night .dy-back { opacity: 0.45; }
        .machine[class*="pf-ring"] .wind.l { transform: scaleX(-1); display: none; }
        .hu-foot, .hu-tank, .hu-mist, .hu-body { position: absolute; }
        .hu-body { left: 0; top: 0; display: block; overflow: visible; pointer-events: none; }
        .hu-body { z-index: 3; }
        .hu-foot {
          z-index: 1; border-radius: 50%; box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.35), inset 0 -1px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(0, 0, 0, 0.35);
          background: linear-gradient(90deg, #66696d, #d6d8db 34%, #a4a7ab 68%, #606367);
        }
        .machine[class*="pf-ring"] .dy-round { box-shadow: 0 0 0 0.7px #6f7276; }
        .machine.on[class*="pf-ring"] .dy-round { box-shadow: 0 0 0 0.9px var(--aq, #6f7276); }
        .machine[class*="pf-ring"] .dy-round span { font-size: 9.6px; line-height: 18px; letter-spacing: -0.4px; }
        .machine[class*="pf-ring"] .dy-loop { border-color: var(--ac-body-hi, #ffffff); }
        .machine[class*="pf-ring"] .dy-loop.nk { border-color: #d3d6d9 #c3c6ca #b0b4b8 #c3c6ca; }
        .machine.pf-ring_desk .dy-loop, .machine.pf-ring_desk .dy-back, .machine.pf-ring_desk .dy-back b { border-radius: 50%; }
        .hu-foot.w { background: linear-gradient(90deg, #a9afb5, #ffffff 34%, #e6e9eb 68%, #a0a6ac); }
        .machine[class*="pf-ring"] .dy-loop::before, .machine[class*="pf-ring"] .dy-loop::after { content: ""; position: absolute; top: 13px; bottom: 13px; width: 0.6px; background: rgba(0, 0, 0, 0.42); }
        .machine[class*="pf-ring"] .dy-loop::before { left: -2.6px; }
        .machine[class*="pf-ring"] .dy-loop::after { right: -2.6px; }
        .hu-tank {
          z-index: 2; overflow: hidden; border-radius: 0 0 15.5px 15.5px / 0 0 2.4px 2.4px; background: rgba(175, 210, 230, 0.18);
          box-shadow: inset 0 0 0 0.55px rgba(255, 255, 255, 0.35), inset 0 -1px 1px rgba(0, 0, 0, 0.25);
        }
        .hu-tank::after { content: ""; position: absolute; left: 13%; top: 4px; bottom: 2px; width: 2.2px; border-radius: 1px; background: rgba(255, 255, 255, 0.45); }
        .hu-tank u { position: absolute; left: 37%; width: 26%; top: 3.5px; bottom: 3px; border-radius: 1.5px 1.5px 0 0; background: linear-gradient(90deg, #5f7482, #c6d5de 40%, #7f95a3); opacity: 0.85; }
        .hu-tank u::after { content: ""; position: absolute; left: -48%; right: -48%; bottom: -1.5px; height: 5px; border-radius: 2px; background: linear-gradient(90deg, #5f7482, #c6d5de 40%, #7f95a3); }
        .hu-tank.out u, .hu-tank.out b { display: none; }
        .hu-water { position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, #a9dcf3, #63b9e6); opacity: 0.72; box-shadow: inset 0 0.6px 0 rgba(255, 255, 255, 0.75); }
        .hu-tank.low .hu-water { background: linear-gradient(180deg, #ffb74d, #fb8c00); }
        .hu-tank.out { background: transparent; box-shadow: inset 0 0 0 0.8px rgba(229, 57, 53, 0.7); }
        .hu-tank b { position: absolute; bottom: 1px; width: 2px; height: 2px; border-radius: 50%; background: rgba(255, 255, 255, 0.85); opacity: 0; }
        .hu-tank b:nth-of-type(1) { left: 22%; } .hu-tank b:nth-of-type(2) { left: 50%; } .hu-tank b:nth-of-type(3) { left: 76%; }
        .machine.hum .hu-tank b { animation: hu-rise 2.1s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .hu-mist { left: 0; top: 0; width: 96px; height: 60px; z-index: 6; pointer-events: none; }
        .hu-mist.l { display: none; transform: scaleX(-1); }
        .machine.on.osc .hu-mist { animation: wind-r 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .hu-mist.l { display: block; animation: wind-l 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .hu-mist s { position: absolute; left: 60px; width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle, rgba(190, 232, 252, 0.95), rgba(150, 215, 245, 0.45) 45%, rgba(150, 215, 245, 0) 72%); opacity: 0; animation: hu-drift 2.4s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .hu-mist s:nth-child(1) { top: 16px; } .hu-mist s:nth-child(2) { top: 27px; animation-delay: calc(-0.6s + var(--anim-offset, 0s)); } .hu-mist s:nth-child(3) { top: 38px; animation-delay: calc(-1.2s + var(--anim-offset, 0s)); } .hu-mist s:nth-child(4) { top: 47px; animation-delay: calc(-1.8s + var(--anim-offset, 0s)); }
        .machine.hum .hu-tank b:nth-of-type(2) { animation-delay: calc(-0.7s + var(--anim-offset, 0s)); } .machine.hum .hu-tank b:nth-of-type(3) { animation-delay: calc(-1.4s + var(--anim-offset, 0s)); }
        @keyframes hu-rise { 0% { transform: translateY(0); opacity: 0; } 25% { opacity: 1; } 100% { transform: translateY(-12px); opacity: 0; } }
        @keyframes hu-drift { 0% { transform: translate(0, 0) scale(0.5); opacity: 0; } 22% { opacity: 0.95; } 100% { transform: translate(30px, -7px) scale(2.3); opacity: 0; } }
        .machine.on.osc .dy-head { animation: pf-pivot 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.r { animation: wind-r 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.l { display: block; animation: wind-l 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.back .wind, .machine.back.osc .wind.l { display: none; }
        @keyframes pf-pivot { 0%, 50%, 100% { transform: scaleX(1); } 25%, 75% { transform: scaleX(0.68); } }
        @keyframes pf-aspire { 0% { transform: scale(1); opacity: 0.95; } 100% { transform: scale(0.08); opacity: 0; } }
  `,
  // A fan on its stand or on a desk, a cage with its blades turning behind
  // it, or a ceiling fan seen from a little below: in summer it draws the air
  // up, in winter it sends the warm air under the ceiling back down.
  fan: () => `${AIR_CSS}
        .fn-rot { transform-origin: 50% 50%; transform-box: fill-box; }
        .machine.on .fn-rot { animation: fn-spin var(--rot, 0.6s) linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.nat .fn-rot { animation: fn-spin-nat 3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.fn-ceiling .fn-rot { animation-direction: reverse; }
        .machine.fn-ceiling.rev .fn-rot { animation-direction: normal; }
        .machine.fn-ceiling.nat .fn-rot { animation-direction: reverse; }
        .machine.fn-ceiling.rev.nat .fn-rot { animation-direction: normal; }
        .machine.nat .wind path { animation-name: wind-flow, fn-gust; animation-duration: var(--spd, 1.6s), 3s; animation-timing-function: linear, ease-in-out; }
        .fn-blade { fill: var(--ac-body-lo, #cfd6db); fill-opacity: 0.85; stroke: rgba(0, 0, 0, 0.35); stroke-width: 0.6; }
        .fn-cage { fill: none; stroke: var(--ac-body-lo, #cfd6db); stroke-width: 0.6; opacity: 0.9; }
        .fn-cage .rim { stroke-width: 2.2; }
        .fn-hub { fill: var(--ac-body, #eceff1); stroke: rgba(0, 0, 0, 0.3); stroke-width: 0.6; }
        .fn-head { position: absolute; z-index: 2; transform-origin: 50% 50%; }
        .fn-pole, .fn-foot, .fn-ceil, .fn-canopy, .fn-housing, .fn-globe, .fn-plane, .fn-halo { position: absolute; }
        .fn-pole { z-index: 1; background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 40%, var(--ac-body-lo, #cfd6db)); box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.2); }
        .fn-foot {
          z-index: 1; border-radius: 50%; box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 0.6px rgba(0, 0, 0, 0.3);
          background: radial-gradient(ellipse at 50% 35%, var(--ac-body-hi, #ffffff), var(--ac-body, #eceff1) 55%, var(--ac-body-lo, #cfd6db));
        }
        .machine.fn-stand .wind.l, .machine.fn-table .wind.l { transform: scaleX(-1); display: none; }
        .machine.on.osc .fn-head { animation: fn-turn 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.r { animation: wind-r 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.l { display: block; animation: wind-l 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fn-ceil { z-index: 1; height: 1px; background: rgba(0, 0, 0, 0.18); }
        .fn-canopy { z-index: 2; border-radius: 0 0 6px 6px / 0 0 3px 3px; background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 40%, var(--ac-body-lo, #cfd6db)); box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.25); }
        .fn-plane { z-index: 3; transform: scaleY(0.26); }
        .fn-plane.front { z-index: 5; clip-path: path(evenodd, "M-60 -60H148V44H-60Z M37 28.6H51V44H37Z"); }
        .fn-plane .fn-blade { fill: var(--ac-body, #eceff1); fill-opacity: 1; stroke-width: 1.4; }
        .machine.wood .fn-plane .fn-blade { fill: url(#fn-wood); stroke: #4e2c14; }
        .fn-housing {
          z-index: 4; border-radius: 45% 45% 20% 20% / 40% 40% 30% 30%; box-shadow: inset 0 0 0 0.6px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15);
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 35%, var(--ac-body, #eceff1) 68%, var(--ac-body-lo, #cfd6db));
        }
        .fn-globe { z-index: 6; border-radius: 0 0 50% 50% / 0 0 100% 100%; background: linear-gradient(180deg, #eef1f3, #c9d0d5); box-shadow: inset 0 0 0 0.6px rgba(0, 0, 0, 0.25); }
        .machine.lit .fn-globe { background: radial-gradient(ellipse at 50% 30%, #fffde7, #ffd54f 70%); box-shadow: 0 0 6px 2px rgba(255, 213, 79, 0.75), inset 0 0 0 0.6px rgba(0, 0, 0, 0.15); }
        .fn-halo { display: none; z-index: 0; border-radius: 50%; background: radial-gradient(circle, rgba(255, 213, 79, 0.28), transparent 70%); }
        .machine.lit .fn-halo { display: block; }
        .machine.fn-ceiling.rev { --air: #ff7043; }
        @keyframes fn-spin { to { transform: rotate(360deg); } }
        @keyframes fn-spin-nat { to { transform: rotate(1080deg); } }
        @keyframes fn-gust { 0%, 100% { stroke-opacity: 0.2; } 50% { stroke-opacity: 1; } }
        @keyframes fn-turn { 0%, 35%, 100% { transform: translateX(2px) scaleX(0.78); } 50%, 85% { transform: translateX(-2px) scaleX(0.78); } }
  `,
  // A network device, dark like most of them: the LEDs say everything.
  network: () => `
        .machine.nt > * { position: absolute; }
        .nt-body {
          background: linear-gradient(180deg, var(--ac-body-hi, #4a5157), var(--ac-body, #33383d) 45%, var(--ac-body-lo, #1f2327));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.22), 0 2px 3px rgba(0, 0, 0, 0.14); border-radius: 3px;
        }
        .nt-u {
          background: linear-gradient(180deg, var(--ac-body-hi, #4a5157), var(--ac-body, #33383d) 55%, var(--ac-body-lo, #1f2327));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.28); border-radius: 1px;
        }
        .nt-hi { height: 1px; background: rgba(255, 255, 255, 0.12); }
        .nt-led { width: 2.6px; height: 2.6px; border-radius: 50%; background: #3d434a; }
        .nt-port { background: #111417; border-radius: 0.8px; }
        .nt-port i { position: absolute; height: 1.5px; border-radius: 0.5px; background: #3d434a; }
        .nt-bay { background: #16191c; border-radius: 1.5px; }
        .nt-tray { background: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0 1px, transparent 1px 3px); }
        .nt-handle { background: rgba(255, 255, 255, 0.16); border-radius: 1px; }
        .nt-key { border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.45); background: var(--ac-body-lo, #2a2e33); }
        .nt-dark { background: #121417; border-radius: 1px; }
        .nt-jack { background: #0d0f11; border-radius: 0.5px; }
        .nt-vent { background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.45) 0 1.2px, transparent 1.2px 3px); opacity: 0.6; }
        .nt-fan {
          border-radius: 50%;
          background: radial-gradient(circle, #2a2e33 0 18%, transparent 19%),
            conic-gradient(#555c63 0 12%, #1b1e21 12% 25%, #555c63 25% 37%, #1b1e21 37% 50%, #555c63 50% 62%, #1b1e21 62% 75%, #555c63 75% 87%, #1b1e21 87%);
        }
        .nt-glass { border-radius: 2px; background: linear-gradient(115deg, rgba(255, 255, 255, 0.18) 0 20%, rgba(255, 255, 255, 0.03) 20% 100%); box-shadow: inset 0 0 0 1.5px rgba(0, 0, 0, 0.35); }
        .nt-floor { height: 5px; border-radius: 50%; background: radial-gradient(closest-side, rgba(0, 0, 0, 0.22), transparent); }
        .nt-on .nt-pw, .nt-busy .nt-pw { background: #2ecc71; box-shadow: 0 0 3px #2ecc71; }
        .nt-on .nt-lan { background: #2ecc71; animation: nt-flick 2.4s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-lan { background: #2ecc71; animation: nt-flick 0.4s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .nt-port.up i.a, .nt-busy .nt-port.up i.a { background: #2ecc71; }
        .nt-on .nt-port.up i.b { background: #ffb300; animation: nt-flick 3.2s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-port.up i.b { background: #ffb300; animation: nt-flick 0.45s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-ok, .nt-busy .d-ok { background: #2ecc71; }
        .nt-on .d-sleep, .nt-busy .d-sleep { background: #2ecc71; animation: nt-breathe 4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-gen { background: #4fc3f7; animation: nt-flick 2.8s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-busy, .nt-busy .d-busy, .nt-busy .d-gen { background: #4fc3f7; animation: nt-flick 0.35s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-warn, .nt-busy .d-warn { background: #ff9800; box-shadow: 0 0 3px #ff9800; }
        .nt-on .d-fail, .nt-busy .d-fail { background: #f44336; box-shadow: 0 0 3px #f44336; animation: nt-blink 1s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .nt-fan:not(.stop) { animation: nt-spin 1.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-fan:not(.stop) { animation: nt-spin 0.5s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-fan { animation: nt-spinstop 3.2s cubic-bezier(0.3, 0, 0.35, 1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-led, .nt-alert .nt-port.up i { background: #f44336; box-shadow: 0 0 3px #f44336; animation: nt-blink 1s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-led.d-empty { background: #3d434a; box-shadow: none; animation: none; animation-delay: var(--anim-offset, 0s); }
        .nt-ant { background: linear-gradient(90deg, var(--ac-body-lo, #1f2327), var(--ac-body-hi, #4a5157)); border-radius: 1.6px 1.6px 0.8px 0.8px; }
        .nt-wave { border: 2px solid transparent; border-top-color: #4fc3f7; border-radius: 50%; opacity: 0; }
        .nt-on .nt-wave, .nt-busy .nt-wave { animation: nt-wave 2.4s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-wave { animation-duration: 1.2s; }
        .nt-nowifi .nt-wave { display: none; }
        .nt-on .nt-wan, .nt-busy .nt-wan { background: #2ecc71; }
        .nt-on .nt-wl, .nt-busy .nt-wl { background: #4fc3f7; box-shadow: 0 0 2px #4fc3f7; }
        .nt-nowifi .nt-wl { background: #3d434a; box-shadow: none; }
        @keyframes nt-wave { 0% { opacity: 0; } 30% { opacity: 0.9; } 100% { opacity: 0; } }
        .machine.nt-unav { opacity: 0.45; filter: grayscale(1); }
        @keyframes nt-blink { 50% { opacity: 0.15; } }
        @keyframes nt-flick { 0%, 100% { opacity: 1; } 30% { opacity: 0.1; } 55% { opacity: 1; } 70% { opacity: 0.2; } }
        @keyframes nt-breathe { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.8; } }
        @keyframes nt-spin { to { transform: rotate(360deg); } }
        @keyframes nt-spinstop { 0% { transform: rotate(0); } 55%, 100% { transform: rotate(900deg); } }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
  `,
  // A pool pump, its sand filter, its pipes and its pool.
  pool_pump: () => `
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
  // Solar panels and a home battery share their sky, their cables and their
  // cartoon error.
  solar: () => ENERGY_CSS,
  home_battery: () => ENERGY_CSS,
  // A bathroom scale, its glass top and its screen.
  scale: () => `
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
  // A diffuser: its mist rising, steadily or in puffs, its light on the
  // floor and in its band, the flames of a flame diffuser.
  diffuser: () => `
        svg.dif-svg{position:absolute;left:-12px;top:-6px;width:120px;height:120px;overflow:hidden}
        .dif-puffs ellipse{fill:color-mix(in srgb,var(--secondary-text-color,#727272) 45%,transparent);opacity:0;transform-box:fill-box;transform-origin:50% 50%;filter:blur(1.2px)}
        .dif-m-mist .dif-puffs ellipse{animation:dif-mist 2.6s ease-out infinite}
        .dif-m-low .dif-puffs{opacity:.55}
        .dif-m-low .dif-puffs ellipse{animation:dif-mist 4s ease-out infinite}
        .dif-m-inter .dif-puffs ellipse{animation:dif-puff 5s ease-out infinite}
        .dif-puffs ellipse:nth-child(2){--dx:-6px;animation-delay:.6s!important}
        .dif-puffs ellipse:nth-child(3){--dx:7px;animation-delay:1.2s!important}
        .dif-puffs ellipse:nth-child(4){--dx:-2px;animation-delay:1.8s!important}
        .dif-halo{opacity:0}
        .dif-lit .dif-halo{opacity:1;animation:dif-breathe 3s ease-in-out infinite}
        .dif-band{fill:#f4f4f2}
        .dif-lit .dif-band{fill:var(--dif-lc)}
        .dif-glass{fill:var(--dif-lc);opacity:0}
        .dif-lit .dif-glass{opacity:.85}
        .dif-empty{display:none}
        .dif-m-empty .dif-empty{display:inline;animation:dif-blink 1s steps(1) infinite}
        .dif-fl{opacity:0;transform-box:fill-box;transform-origin:50% 100%}
        .dif-m-mist .dif-fl{opacity:.95;animation:dif-flame .9s ease-in-out infinite}
        .dif-m-low .dif-fl{opacity:.6;animation:dif-flame 1.3s ease-in-out infinite}
        .dif-m-inter .dif-fl{opacity:.95;animation:dif-flame .9s ease-in-out infinite,dif-breathe 5s ease-in-out infinite}
        .dif-fl.dif-f2{animation-delay:.3s}
        .machine.dif-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes dif-mist{0%{opacity:0;transform:translate(0,6px) scale(.5)}25%{opacity:.85}100%{opacity:0;transform:translate(var(--dx,0px),-28px) scale(1.7)}}
        @keyframes dif-puff{0%,55%{opacity:0;transform:translate(0,6px) scale(.5)}62%{opacity:.85}100%{opacity:0;transform:translate(var(--dx,0px),-28px) scale(1.7)}}
        @keyframes dif-flame{0%,100%{transform:scaleY(1) skewX(0)}30%{transform:scaleY(1.12) skewX(4deg)}60%{transform:scaleY(.92) skewX(-3deg)}}
        @keyframes dif-breathe{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes dif-blink{50%{opacity:.15}}
        @media (prefers-reduced-motion: reduce) { .machine.dif * { animation-name: none !important; } }
  `,
  // A ventilation unit: two streams through the exchanger, their fans, the
  // bypass, the frost of a defrost, the filter's warning. Wider than the
  // others, since four temperatures sit at the ends of its ducts.
  hrv: () => `
        .machine.hv{width:200px;height:112px}
        svg.hv-svg{position:absolute;left:0;top:0;width:200px;height:112px;overflow:hidden}
        .hv-box{fill:var(--ac-body,#f1f3f4);stroke:var(--ac-body-lo,#b9c1c8)}
        .hv-wall{fill:#d9cbb7}
        .hv-tube{fill:#eef1f3;stroke:#aab3bb}
        .hv-fanbody{fill:var(--ac-body-lo,#d5dade);stroke:#9aa3ad;stroke-width:.8}
        .hv-fan{transform-box:view-box}
        .hv-fan path{fill:#5d6873}
        .hv-on .hv-fan{animation:hv-spin var(--hv-pace,1.4s) linear infinite}
        .hv-flow{fill:none;stroke-width:5;stroke-linecap:round}
        .hv-dash{fill:none;stroke:#fff;stroke-width:2;stroke-dasharray:4 8;opacity:.75}
        .hv-on .hv-dash{animation:hv-flow var(--hv-pace,1.4s) linear infinite}
        .hv-on .hv-dash.hv-rev{animation-name:hv-flowr}
        .hv-on .hv-fan.hv-fs,.hv-on .hv-dash.hv-ds{animation-duration:var(--hv-sp,var(--hv-pace,1.4s))}
        .hv-on .hv-fan.hv-fe,.hv-on .hv-dash.hv-de{animation-duration:var(--hv-ep,var(--hv-pace,1.4s))}
        .hv-sx .hv-fs,.hv-sx .hv-ds,.hv-ex .hv-fe,.hv-ex .hv-de{animation-play-state:paused}
        .hv-rc,.hv-damper{display:none}
        .hv-m-rec .hv-rc{display:inline}
        .hv-m-rec .hv-damper{display:inline;fill:none;stroke:#5d6873;stroke-width:2.4;stroke-linecap:round}
        .hv-m-rec .hv-out{opacity:.12}
        .hv-hum,.hv-int{display:none}
        .hv-hb .hv-hum,.hv-m-inter .hv-int{display:inline}
        .hv-badge{font:700 8px Arial,sans-serif;fill:#fff}
        .machine.hv:not(.hv-on) .hv-flow{opacity:.2}
        .machine.hv:not(.hv-on) .hv-dash{display:none}
        .hv-zoff .hv-flow{opacity:.15}
        .hv-zoff .hv-dash{display:none}
        .hv-bypass{display:none}
        .hv-by .hv-bypass{display:inline}
        .hv-by .hv-through{opacity:.15}
        .hv-frost{display:none;font-size:12px;fill:#4fc3f7}
        .hv-df .hv-frost{display:inline;animation:hv-breathe 1.6s ease-in-out infinite}
        .hv-led{fill:#9e9e9e}
        .hv-on .hv-led{fill:#43a047}
        .hv-filt{display:none}
        .hv-filt circle{fill:#ff9800}
        .hv-filt text{font:700 9px Arial,sans-serif;fill:#fff}
        .hv-fd .hv-filt{display:inline;animation:hv-blink 1s steps(1) infinite}
        .hv-t{font:600 9px Arial,sans-serif;fill:var(--primary-text-color,#212121)}
        .hv-n{font:400 8px Arial,sans-serif;fill:var(--secondary-text-color,#727272)}
        .hv-cfm{font-size:7.5px;font-weight:600}
        .hv-lcd{font:700 6px Arial,sans-serif;fill:#7fe3ff}
        .hv-pa,.hv-pb{opacity:0}
        .hv-on .hv-pa{animation:hv-pa 140s linear infinite;animation-delay:var(--anim-offset,0s)}
        .hv-on .hv-pb{animation:hv-pb 140s linear infinite;animation-delay:var(--anim-offset,0s)}
        .machine.hv-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes hv-spin{to{transform:rotate(360deg)}}
        @keyframes hv-flow{to{stroke-dashoffset:-24}}
        @keyframes hv-flowr{to{stroke-dashoffset:24}}
        @keyframes hv-breathe{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes hv-blink{50%{opacity:.15}}
        @keyframes hv-pa{0%,49.5%{opacity:1}50%,100%{opacity:0}}
        @keyframes hv-pb{0%,49.5%{opacity:0}50%,100%{opacity:1}}
        @media (prefers-reduced-motion: reduce) { .machine.hv * { animation-name: none !important; } .hv-on .hv-pa{opacity:1} }
  `,
  // A camera: its status light, the glow of a live view, the REC tag, the
  // waves of a motion and the red ring of its infrared.
  camera: () => `
        svg.cam-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:hidden}
        .cam-led{fill:#9aa3ad}
        .cam-m-idle .cam-led{fill:#4caf50}
        .cam-m-live .cam-led{fill:#03a9f4}
        .cam-m-rec .cam-led{fill:#f44336;animation:cam-blink 1s steps(1) infinite;animation-delay:var(--anim-offset,0s)}
        .cam-m-motion .cam-led{fill:#ff9800;animation:cam-blink .5s steps(1) infinite;animation-delay:var(--anim-offset,0s)}
        .cam-glow{opacity:0}
        .cam-m-live .cam-glow{opacity:1;animation:cam-breathe 2s ease-in-out infinite;animation-delay:var(--anim-offset,0s)}
        .cam-waves{opacity:0}
        .cam-m-motion .cam-waves{opacity:1}
        .cam-waves path{fill:none;stroke:#ff9800;stroke-width:2.4;stroke-linecap:round;transform-box:fill-box;transform-origin:0% 50%;opacity:0;animation:cam-wave 1.6s ease-out infinite}
        .cam-waves path:nth-child(2){animation-delay:.4s}
        .cam-waves path:nth-child(3){animation-delay:.8s}
        .cam-rec{opacity:0}
        .cam-m-rec .cam-rec{opacity:1}
        .cam-rec circle{animation:cam-blink 1s steps(1) infinite}
        .cam-ir circle{fill:#5a1a1a}
        .cam-night .cam-ir circle{fill:#ff3b30;animation:cam-ir 1.6s ease-in-out infinite;filter:drop-shadow(0 0 1.5px #ff3b30)}
        .cam-off{display:none}
        .cam-m-off .cam-on{display:none}
        .cam-m-off .cam-off{display:inline}
        .machine.cam-m-unav{opacity:.45;filter:grayscale(1)}
        .cam-al0{stop-color:#8d959d}.cam-al1{stop-color:#eef1f3}.cam-al2{stop-color:#c3c9cf}.cam-al3{stop-color:#848c94}
        .cam-al-top{fill:#c3c9cf}
        .cam-dark .cam-al0{stop-color:#25292d}.cam-dark .cam-al1{stop-color:#4c535a}.cam-dark .cam-al2{stop-color:#33393f}.cam-dark .cam-al3{stop-color:#1a1d20}
        .cam-dark .cam-al-top{fill:#33393f}
        @keyframes cam-blink { 50% { opacity: .15; } }
        @keyframes cam-breathe { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        @keyframes cam-wave { 0% { opacity: 0; transform: scale(.6); } 30% { opacity: 1; } 100% { opacity: 0; transform: scale(1.25); } }
        @keyframes cam-ir { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
        .cam-dbring{fill:none;stroke:#4fc3f7;stroke-width:2.4;opacity:.45}
        .cam-m-ring .cam-dbring{opacity:1;stroke:#29b6f6;animation:cam-dbpulse 1s ease-in-out infinite;animation-delay:var(--anim-offset,0s)}
        .cam-m-off .cam-dbring,.cam-m-unav .cam-dbring{opacity:0}
        .cam-dbhalo{fill:#4fc3f7;opacity:0;transform-box:fill-box;transform-origin:center}
        .cam-m-ring .cam-dbhalo{animation:cam-dbhalo 1s ease-out infinite;animation-delay:var(--anim-offset,0s)}
        .cam-bell{opacity:0}
        .cam-m-ring .cam-bell{opacity:1}
        .cam-bell path{fill:none;stroke:#29b6f6;stroke-width:1.8;stroke-linecap:round;opacity:0;animation:cam-dbwave 1s ease-out infinite}
        .cam-bell path:nth-child(2n){animation-delay:.2s}
        .cam-m-ring .cam-led{fill:#03a9f4}
        @keyframes cam-dbpulse { 50% { stroke-width: 3.6; } }
        @keyframes cam-dbhalo { 0% { opacity: .55; transform: none; } 100% { opacity: 0; transform: scale(1.75); } }
        @keyframes cam-dbwave { 0% { opacity: 0; } 20% { opacity: 1; } 100% { opacity: 0; transform: translateX(var(--dx, 4px)); } }
        @media (prefers-reduced-motion: reduce) { .machine.cam * { animation-name: none !important; } }
  `,
  // A mailbox: its letters, the one that comes in, the light through an open
  // door, and the doors swinging on their hinges.
  mailbox: () => `
        svg.mb-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:hidden}
        .mb-lbl{fill:var(--secondary-text-color,#8a929b)}
        .mb-light,.mb-light-f{opacity:0;transition:opacity .4s}
        .mb-back .mb-light,.mb-front .mb-light-f{opacity:.85}
        .mb-badge{transform-box:fill-box;transform-origin:center}
        .mb-post{opacity:0}
        .mb-swing{transform-box:fill-box}
        .mb-swing.hl{transform-origin:right center}
        .mb-swing.hr{transform-origin:left center}
        .mb-swing-f .mb-swing.hl,.mb-swing-b .mb-swing.hr{animation:mb-swing .5s ease-out both}
        .mb-arrive .mb-new{animation:mb-in 1.5s ease-in-out both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-post{animation:mb-post 1.1s ease-in both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-glass{animation:mb-fade .4s both;animation-delay:calc(var(--mb-ago,0s) + 1s)}
        .mb-arrive .mb-badge{animation:mb-pop .45s both;animation-delay:calc(var(--mb-ago,0s) + 1.3s)}
        .mb-arrive .mb-jam{animation:mb-fade .3s both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-spill{animation:mb-spill .7s cubic-bezier(.5,0,1,.5) both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-spill:nth-child(2){animation-delay:calc(var(--mb-ago,0s) + .15s)}
        .mb-arrive .mb-spill:nth-child(3){animation-delay:calc(var(--mb-ago,0s) + .3s)}
        .machine.mb-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes mb-swing { from { transform: scaleX(.12); } to { transform: none; } }
        @keyframes mb-in { 0% { transform: translate(var(--dx), var(--dy)); opacity: 0; } 8% { opacity: 1; } 55% { transform: translate(0px, var(--dy)); animation-timing-function: cubic-bezier(.55,0,1,.45); } 86% { transform: translate(0px, 0px); } 93% { transform: translate(0px, -1.6px); } 100% { transform: none; } }
        @keyframes mb-post { 0% { transform: translateY(-22px); opacity: 0; } 25% { opacity: 1; } 55% { transform: translateY(0px); } 100% { transform: translateY(13px); opacity: 1; } }
        @keyframes mb-spill { 0% { transform: translateY(-34px); opacity: 0; } 20% { opacity: 1; } 85% { transform: translateY(1px); } 100% { transform: none; } }
        @keyframes mb-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mb-pop { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.15); opacity: 1; } 100% { transform: none; } }
        @media (prefers-reduced-motion: reduce) { .machine.mb * { animation-name: none !important; } }
  `,
  // A lamp: the light's colour on its glass, its halo and the cone it
  // throws, dimmed with its brightness; an effect turns the segments' hue.
  lamp: () => `
        svg.lp-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:hidden}
        .lp-halo{opacity:calc(var(--lb,1) * .85);transition:opacity .4s}
        .lp-beam{opacity:calc(var(--lb,1) * .55);transition:opacity .4s}
        .lp-wash{opacity:calc(var(--lb,1) * .5)}
        .lp-lit{fill:var(--lc)}
        .lp-litS{stroke:var(--lc)}
        .lp-stop{stop-color:var(--lc)}
        .lp-wall{fill:color-mix(in srgb,var(--primary-text-color,#212121) 6%,transparent)}
        .lp-ceiling{fill:color-mix(in srgb,var(--primary-text-color,#212121) 9%,transparent)}
        .lp-m-off .lp-halo,.lp-m-off .lp-beam,.lp-m-off .lp-wash,.lp-m-unav .lp-halo,.lp-m-unav .lp-beam,.lp-m-unav .lp-wash{opacity:0}
        .lp-m-off .lp-lit,.lp-m-unav .lp-lit{fill:#d9dee3}
        .lp-m-off .lp-litS,.lp-m-unav .lp-litS{stroke:#c5ccd3}
        .lp-m-off .lp-stop,.lp-m-unav .lp-stop{stop-color:#e3e7eb}
        .machine.lp-m-unav{opacity:.45;filter:grayscale(1)}
        .lp-fx .lp-seg{animation:lp-hue 3s linear infinite;animation-delay:var(--anim-offset,0s)}
        .lp-fx .lp-seg:nth-child(2n){animation-delay:-.6s}
        .lp-fx .lp-seg:nth-child(3n){animation-delay:-1.3s}
        .lp-fx .lp-seg:nth-child(5n){animation-delay:-2.1s}
        @keyframes lp-hue{to{filter:hue-rotate(360deg)}}
        .lp-m-on .lp-tw{animation:lp-tw 3s ease-in-out infinite}
        .lp-m-on .lp-tw:nth-child(2n){animation-delay:-.9s}
        .lp-m-on .lp-tw:nth-child(3n){animation-delay:-1.7s}
        .lp-m-on .lp-tw:nth-child(5n){animation-delay:-2.3s}
        .lp:not(.lp-fx) .lp-tw,.lp:not(.lp-fx) .lp-px{filter:none !important}
        .lp-fx.lp-m-on .lp-tw{animation:lp-tw 1.5s ease-in-out infinite,lp-hue 3s linear infinite}
        @keyframes lp-tw{0%,100%{opacity:1}50%{opacity:.45}}
        @media (prefers-reduced-motion: reduce) { .machine.lp * { animation-name: none !important; } }
  `,
  // A UPS between the wall socket and the box it protects.
  ups: () => `
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
  // A robot and its floor, its base and its station.
  robot: () => `${NT_CSS}${MINI_LCD_CSS}
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
        .rbt-rb .rbt-pad{left:8px;bottom:-1.5px;width:36px;height:4px;border-radius:0 0 7px 7px;background:#cfd8dc}
        .rbt-m-cleaning .rbt-rb .rbt-pad{background:#81d4fa}
        .rbt-cm-vacuum.rbt-m-cleaning .rbt-rb .rbt-pad{background:#cfd8dc}
        .rbt-cm-mop.rbt-m-cleaning .rbt-rb .rbt-brush i{animation:none}
        .rbt-rb .rbt-tank{left:6px;top:5px;width:11px;height:7px;border-radius:2.5px;background:rgba(15,18,22,.35);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
        .rbt-rb .rbt-tank i{position:absolute;left:0;right:0;bottom:0;height:var(--lvl,70%);background:linear-gradient(180deg,#81d4fa,#29b6f6)}
        .rbt-m-empty .rbt-rb .rbt-tank i{background:#ff9800;height:12%}
        .rbt-l-combo.rbt-m-empty .rbt-rb{transform:translate(-16px,14px)}
        .rbt-l-combo .rbt-mdock .rbt-tk{height:19px}
        .rbt-mdock .rbt-bin{left:13px;top:26px;width:26px;height:14px}
        .rbt-l-combo .rbt-mdock .rbt-dled{top:42px}
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
        .rbt-vapor path{stroke:#ff6d00}
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
        .rbt-cap{display:none;position:absolute;background:linear-gradient(180deg,#fff,#e6eef5);border-radius:50% 50% 30% 30%/80% 80% 20% 20%;box-shadow:0 1px 1px rgba(60,90,120,.35),inset 0 -1px 0 #c7d8e6}
        .rbt-m-winter .rbt-cap{display:block}
        .rbt-cap-mw{left:40px;top:52px;width:36px;height:7px}
        .rbt-cap-st{left:79px;top:62.5px;width:16px;height:6px}
        .rbt-m-winter .rbt-lawn{background:radial-gradient(ellipse at 50% 0,#f2f7fb,#d9e6f0 60%,#bdd0df)}
        .rbt-m-winter .rbt-tall,.rbt-m-winter .rbt-stub{display:none}
        .rbt-m-winter .rbt-mw{filter:saturate(.55) brightness(1.04)}
        .rbt-snow{position:absolute;left:0;top:0;width:96px;height:100px;overflow:hidden;pointer-events:none}
        .rbt-snow b{position:absolute;top:-6px;width:var(--s);height:var(--s);border-radius:50%;background:#eaf3fa;box-shadow:0 0 0 .5px #8fb0c9;animation:rbt-flake var(--d) linear var(--d0) infinite}
        @keyframes rbt-flake{0%{transform:translate(0,0)}25%{transform:translate(3px,25px)}50%{transform:translate(-2px,50px)}75%{transform:translate(3px,75px)}100%{transform:translate(0,100px)}}
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
        .rbt-l-vacuum .rbt-floor,.rbt-l-mop .rbt-floor,.rbt-l-combo .rbt-floor{left:0;width:78px;clip-path:none;overflow:hidden;transform:skewX(-28deg);transform-origin:50% 100%}
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
  // A hair dryer: its body in the appliance colour, the heater glowing in the
  // nozzle or the ring, and the air it blows.
  hair_dryer: () => `
        .hd-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .hd-s-hi { stop-color: var(--ac-body-hi, #ffffff); }
        .hd-s-body { stop-color: var(--ac-body, #e3e6ea); }
        .hd-part { fill: url(#hd-body); stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; }
        .hd-nozzle, .hd-grille { fill: var(--ac-body, #e3e6ea); stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; }
        .hd-btn { fill: var(--ac-body-lo, #b9bec6); }
        .hd-grip { stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1.2; opacity: 0.8; }
        .hd-cord { fill: none; stroke: var(--ac-body-lo, #b9bec6); stroke-width: 2.2; stroke-linecap: round; }
        .hd-inner { fill: none; stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; opacity: 0.5; }
        .hd-led { fill: #9e9e9e; }
        .machine.mode-cool { --hd-air: #29b6f6; }
        .machine.mode-hot, .machine.mode-on { --hd-air: #ff7a2f; }
        .machine.mode-cool .hd-led { fill: #4fc3f7; }
        .machine.mode-hot .hd-led, .machine.mode-on .hd-led { fill: #ff8a3d; }
        .hd-a0 { stop-color: var(--hd-air, #ff7a2f); stop-opacity: 1; }
        .hd-a1 { stop-color: var(--hd-air, #ff7a2f); stop-opacity: 0; }
        .hd-air path {
          fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 5 6;
          animation: hd-flow 0.55s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.mode-cool .hd-air path { animation-duration: 0.9s; }
        .hd-heat { opacity: 0; }
        .machine.mode-hot .hd-heat, .machine.mode-on .hd-heat {
          opacity: 1; animation: hd-glow 1.4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s);
        }
        .hd-rings circle {
          fill: none; stroke: var(--hd-air, #ff7a2f); stroke-width: 2; opacity: 0.5;
          transform-box: fill-box; transform-origin: center;
          animation: hd-ring 1.4s ease-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes hd-flow { to { stroke-dashoffset: -11; } }
        @keyframes hd-glow { from { opacity: 0.55; } to { opacity: 1; } }
        @keyframes hd-ring { 0% { transform: scale(0.9); opacity: 0.9; } 100% { transform: scale(1.45); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .hd-air path, .hd-heat, .hd-rings circle { animation-name: none; } }
  `,
  // A toaster seen from a little above: the slots open in its top, the lever
  // and the browning dial on its face. The slots glow while it toasts, the
  // heat rises above them, and the slices pop up once it is done.
  toaster: () => `${MINI_LCD_CSS}
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
  // A screen: a television on its feet, on a stand or on the wall, a
  // projector under its screen, or a computer and its tower. Lit, the glass
  // shows a picture; on standby only its light is on.
  screen: () => `
        .scr-zoom { position: absolute; width: 96px; height: 108px; transform-origin: 0 0; }
        .scr-bezel, .scr-glass, .scr-led, .scr-foot, .scr-neck, .scr-base, .scr-shade, .scr-wall, .scr-rod, .scr-beam,
        .scr-body, .scr-lens, .scr-vent, .scr-feet, .scr-tower, .scr-slot { position: absolute; }
        .lap-shadow, .lap-cam, .lap-hinge, .lap-deck, .lap-keys, .lap-pad, .lap-edge, .lap-notch, .lap-cable, .lap-brand, .lap-btns, .lap-sticker, .lap-vent { position: absolute; }
        .lap-brand { border-radius: 0.5px; background: rgba(255, 255, 255, 0.28); }
        .lap-btns { clip-path: polygon(0 0, 100% 0, 101% 100%, -1% 100%); background: linear-gradient(90deg, rgba(0, 0, 0, 0.16) 0 49%, transparent 49% 51%, rgba(0, 0, 0, 0.16) 51%); }
        .lap-sticker { border-radius: 0.4px; background: linear-gradient(135deg, #1e88e5, #0d47a1); box-shadow: inset 0 0 0 0.3px rgba(255, 255, 255, 0.5); }
        .lap-vent { background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0 0.8px, transparent 0.8px 1.6px); }
        .scr-laptop.lap-st-classic .lap-lid { border-radius: 2px 2px 0 0; background: linear-gradient(180deg, #2c3035, #191c20); }
        .lap-lid { border-radius: 3px 3px 0 0; }
        .lap-cam { border-radius: 50%; background: #0c0e11; box-shadow: 0 0 0 0.4px rgba(255, 255, 255, 0.2); }
        .lap-hinge { background: linear-gradient(180deg, #2a2e33, #7d848b); }
        .lap-deck { clip-path: polygon(11.9% 0, 88.1% 0, 100% 100%, 0 100%); background: linear-gradient(180deg, var(--ac-body-hi, #eef0f2), var(--ac-body, #c9ced4)); }
        .lap-keys { position: absolute; left: 0; top: 0; width: 96px; height: 106px; overflow: visible; fill: #23272c; }
        .scr-laptop .lap-lid { background: linear-gradient(180deg, #3a3f45, #1d2125 60%, #121518); }
        .lap-pad { clip-path: polygon(4% 0, 96% 0, 100% 100%, 0 100%); background: rgba(0, 0, 0, 0.1); box-shadow: inset 0 0 0 0.4px rgba(0, 0, 0, 0.18); }
        .lap-edge { border-radius: 0 0 3px 3px; background: linear-gradient(180deg, var(--ac-body, #c9ced4), var(--ac-body-lo, #8e959c)); }
        .lap-notch { border-radius: 0 0 3px 3px; background: rgba(0, 0, 0, 0.22); }
        .machine.lap-silver { --ac-body: #c9ced4; --ac-body-hi: #eef0f2; --ac-body-lo: #8e959c; }
        .machine.lap-space_grey { --ac-body: #7d8187; --ac-body-hi: #a3a7ac; --ac-body-lo: #55595e; }
        .machine.lap-midnight { --ac-body: #2e3440; --ac-body-hi: #4a5263; --ac-body-lo: #1b1f27; }
        .machine.lap-gold { --ac-body: #e3cfae; --ac-body-hi: #f6ead6; --ac-body-lo: #b89f78; }
        .machine.lap-rose { --ac-body: #e6c3bb; --ac-body-hi: #f6e1dc; --ac-body-lo: #b9918a; }
        .machine.lap-black { --ac-body: #3a3f45; --ac-body-hi: #575d64; --ac-body-lo: #202428; }
        .machine.lap-midnight .lap-keys, .machine.lap-space_grey .lap-keys, .machine.lap-black .lap-keys { fill: #15181c; }
        .lap-shadow { border-radius: 50%; background: radial-gradient(ellipse at 50% 40%, rgba(0, 0, 0, 0.22), transparent 70%); }
        .lap-cable { border-radius: 1px; background: #2b2f34; }
        .scr-laptop .scr-led { border-radius: 0.6px; }
        .scr-laptop .tab-bolt { position: absolute; width: 6px; height: 8.4px; }
        .scr-bezel {
          border-radius: 2px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body, #3b4045) 50%, var(--ac-body-lo, #22262a));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.18);
        }
        .scr-glass { border-radius: 1.5px; overflow: hidden; background: linear-gradient(155deg, #2a2f36 0%, #0c0e11 55%, #16191d 100%); }
        .scr-glass::after, .scr-wall::after {
          content: ""; position: absolute; inset: 0; z-index: 5; pointer-events: none;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.13) 0 22%, transparent 22% 100%);
        }
        .scr-wall::after { display: none; }
        .scr-pic { position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s; overflow: hidden; }
        .scr-pic > * { position: absolute; inset: 0; overflow: hidden; }
        .machine.scr-lit .scr-pic { opacity: 1; }
        .machine.mode-paused .scr-pic * { animation-play-state: paused; }
        .scr-cover { object-fit: cover; width: 100%; height: 100%; }
        .scr-led { width: 2.4px; height: 2.4px; border-radius: 50%; background: #3a3f46; }
        .machine.mode-standby .scr-led { background: #ff3b30; box-shadow: 0 0 3px #ff3b30; }
        .machine.scr-lit .scr-led { background: transparent; }
        .machine.scr-laptop.mode-standby .scr-led, .machine.scr-computer.mode-standby .scr-led { background: #ffb300; box-shadow: 0 0 3px #ffb300; animation: scr-breathe 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.scr-computer.scr-lit .scr-led, .machine.scr-laptop.scr-lit .scr-led { background: #e3f2fd; box-shadow: 0 0 3px #90caf9; }
        .machine.scr-laptop.charging:not(.scr-lit) .scr-led { background: #ffb300; box-shadow: 0 0 3px #ffb300; }
        .machine.scr-computer.tw-on .scr-led { background: #e3f2fd; box-shadow: 0 0 3px #90caf9; animation-name: none; }
        .machine.scr-computer.tw-off .scr-led { background: #3a3f46; box-shadow: none; animation-name: none; }
        .scr-badge { position: absolute; z-index: 6; right: 4%; bottom: 6%; width: 16%; max-width: 9px; opacity: 0.9; display: none; }
        .scr-badge svg { display: block; width: 100%; height: auto; }
        .machine.mode-playing .scr-badge.play, .machine.mode-paused .scr-badge.pause, .machine.scr-lit.muted .scr-badge.mute { display: block; }
        .machine.muted .scr-badge.play { display: none !important; }
        .machine.mode-paused .scr-badge.pause { right: auto; bottom: auto; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 22%; max-width: 12px; }
        .scr-lock { position: absolute; inset: 0; z-index: 4; background: linear-gradient(160deg, #263238, #37474f); }
        .scr-lock::before {
          content: ""; position: absolute; left: 50%; top: 26%; width: 14%; height: 20%; transform: translateX(-50%); box-sizing: border-box;
          border: 1.5px solid #cfd8dc; border-bottom: none; border-radius: 50% 50% 0 0;
        }
        .scr-lock::after { content: ""; position: absolute; left: 50%; top: 44%; width: 22%; height: 26%; transform: translateX(-50%); background: #cfd8dc; border-radius: 1px; }
        .scr-foot { border-radius: 1px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body-lo, #22262a)); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }
        .scr-foot.l { transform: skewX(-28deg); } .scr-foot.r { transform: skewX(28deg); }
        .scr-neck { background: linear-gradient(90deg, var(--ac-body-lo, #22262a), var(--ac-body, #3b4045), var(--ac-body-lo, #22262a)); }
        .scr-base { border-radius: 50%; background: radial-gradient(ellipse at 50% 30%, var(--ac-body-hi, #515860), var(--ac-body-lo, #22262a)); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); }
        .scr-computer .scr-base { border-radius: 2px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body-lo, #22262a)); }
        .scr-shade { border-radius: 4px; background: rgba(0, 0, 0, 0.1); filter: blur(2.5px); }
        .scr-wall { overflow: hidden; border-radius: 1px; background: #f6f7f9; box-shadow: inset 0 0 0 1px #d4d9df, 0 1px 2px rgba(0, 0, 0, 0.12); }
        .scr-rod { background: #9aa2ab; }
        .scr-beam { opacity: 0; transition: opacity 0.4s; clip-path: polygon(0 0, 100% 0, 57% 100%, 51% 100%); background: linear-gradient(0deg, rgba(255, 250, 230, 0.85), rgba(255, 250, 230, 0.12)); }
        .machine.scr-lit .scr-beam { opacity: 0.9; }
        .scr-body {
          border-radius: 4px 4px 3px 3px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body, #3b4045) 45%, var(--ac-body-lo, #22262a));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18), 0 2px 3px rgba(0, 0, 0, 0.12);
        }
        .scr-lens { border-radius: 50%; background: radial-gradient(circle at 40% 38%, #5d6670, #15181c 70%); box-shadow: 0 0 0 1.5px var(--ac-body-lo, #22262a), inset 0 0 0 1px #000; }
        .machine.scr-lit .scr-lens { background: radial-gradient(circle at 50% 50%, #fffbe8 0 30%, #ffe7a3 55%, #8d7a4a 80%); box-shadow: 0 0 0 1.5px var(--ac-body-lo, #22262a), 0 0 6px #ffe7a3; }
        .scr-vent { opacity: 0.6; background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0 1px, transparent 1px 3px); }
        .scr-feet { border-radius: 0 0 1px 1px; background: #2b2f34; }
        .scr-tower { border-radius: 2px; background: linear-gradient(90deg, var(--ac-body-lo, #22262a), var(--ac-body, #3b4045) 30%, var(--ac-body-hi, #515860) 60%, var(--ac-body-lo, #22262a)); }
        .scr-slot { border-radius: 0.5px; background: rgba(0, 0, 0, 0.35); }
        /* A wall tablet (#62), on its patch of wall. */
        .tab-wallbg, .tab-shadow, .tab-body, .tab-wood, .tab-mat, .tab-lightbar, .tab-cam, .tab-cable, .tab-bolt { position: absolute; }
        .tab-wallbg { border-radius: 4px; background: linear-gradient(180deg, rgba(127, 127, 127, 0.1), rgba(127, 127, 127, 0.2)); }
        .tab-shadow { border-radius: 3px; background: rgba(0, 0, 0, 0.18); filter: blur(2px); }
        .tab-body { border-radius: 4.5px; background: linear-gradient(145deg, #3a3f46, #1d2126); }
        .tab-body.light { border-radius: 4px; background: linear-gradient(145deg, #f4f5f6, #c9ced3); box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.08); }
        .tab-wood { border-radius: 2px; background: linear-gradient(135deg, #c98f55, #8d5a30); box-shadow: inset 0 0 0 0.75px rgba(0, 0, 0, 0.18); }
        .tab-mat { background: #f6f3ee; box-shadow: inset 0 0.5px 1.5px rgba(0, 0, 0, 0.25); }
        .machine.tablet .tab-glass { background: #121519; }
        .tab-lightbar { border-radius: 1px; background: #b9bfc5; }
        .machine.tablet.scr-lit .tab-lightbar { background: #43a047; box-shadow: 0 0 2.5px rgba(67, 160, 71, 0.8); }
        .machine.tablet.seen .tab-lightbar { background: #29b6f6; box-shadow: 0 0 2.5px rgba(41, 182, 246, 0.9); }
        .tab-cam { border-radius: 50%; background: #3a4048; }
        .machine.tablet.seen .tab-cam { background: #29b6f6; box-shadow: 0 0 2px 0.5px rgba(41, 182, 246, 0.8); animation: tab-blink 1.2s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .tab-cable { border-radius: 1px; background: #cfd3d7; }
        .tab-bolt { width: 5px; height: 7px; fill: var(--success-color, #43a047); }
        .si-dash { box-sizing: border-box; background: #f3f4f6; padding: 9% 6% 6%; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 5%; }
        .scr-tablet_portrait .si-dash { grid-template-columns: repeat(2, 1fr); }
        .si-dash::before { content: ""; position: absolute; left: 6%; right: 6%; top: 3%; height: 3%; border-radius: 1px; background: #039be5; }
        .si-dash i { position: relative; border-radius: 1px; background: #fff; box-shadow: 0 0 0 0.25px #d5d9de; }
        .si-dash i::after { content: ""; position: absolute; left: 14%; top: 22%; width: 26%; height: 26%; border-radius: 50%; background: var(--c, #ffb300); }
        .si-dash i:nth-child(2) { --c: #43a047; } .si-dash i:nth-child(3) { --c: #1e88e5; } .si-dash i:nth-child(4) { --c: #8e24aa; }
        .si-dash i:nth-child(5) { --c: #e53935; } .si-dash i:nth-child(6) { --c: #00897b; }
        .si-dash i:nth-child(2)::after { animation: tab-blink 2.4s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .si-saver { background: radial-gradient(circle at 30% 30%, #18263a, #06080c 70%); }
        .si-saver b {
          position: absolute; left: 50%; top: 46%; transform: translate(-50%, -50%); white-space: nowrap; line-height: 1.1;
          color: #cfe3ff; font-weight: 300; font-size: 9px; letter-spacing: 0.02em; animation: tab-drift 9s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .scr-tablet_portrait .si-saver b { font-size: 6.5px; }
        .si-saver b small { display: block; font-size: 0.42em; text-align: center; color: #7f97b5; letter-spacing: 0.04em; }
        @keyframes tab-blink { 50% { opacity: 0.25; } }
        @keyframes tab-drift { 0%, 100% { margin-left: -6%; } 50% { margin-left: 6%; } }

        /* The pictures. */
        .si-sunset { background: linear-gradient(115deg, #1e3c72, #2a7fba 25%, #f4a261 50%, #e76f51 70%, #264653); background-size: 300% 300%; animation: scr-drift 9s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-sunset b { position: absolute; width: 16%; aspect-ratio: 1; border-radius: 50%; left: 58%; top: 24%; background: #ffe9a8; box-shadow: 0 0 8px #ffd166; }
        .si-sunset i { position: absolute; left: -10%; width: 120%; bottom: -30%; height: 62%; border-radius: 50%; background: #1d3b2a; opacity: 0.9; }
        .si-aquarium { background: linear-gradient(180deg, #4fc3f7, #0277bd 70%, #01579b); }
        .si-aquarium .sand { position: absolute; left: 0; right: 0; bottom: 0; height: 14%; background: #e0c38c; border-radius: 40% 60% 0 0 / 100% 100% 0 0; }
        .si-aquarium .weed { position: absolute; bottom: 8%; width: 3%; height: 40%; border-radius: 50% 50% 0 0; background: #2e7d32; transform-origin: bottom; animation: scr-sway 3s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-aquarium .fish { position: absolute; width: 13%; height: 12%; border-radius: 50%; background: var(--f); animation: scr-swim var(--sw) linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-aquarium .fish::after { content: ""; position: absolute; left: -30%; top: 10%; width: 40%; height: 80%; background: var(--f); clip-path: polygon(0 0, 100% 50%, 0 100%); }
        .si-aquarium .fish::before { content: ""; position: absolute; right: 18%; top: 28%; width: 12%; aspect-ratio: 1; border-radius: 50%; background: #111; }
        .si-aquarium .bub { position: absolute; bottom: 10%; width: 3%; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.7); animation: scr-rise 3s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .si-bars { background: linear-gradient(90deg, #c0c0c0 0 14.3%, #c0c000 0 28.6%, #00c0c0 0 42.9%, #00c000 0 57.2%, #c000c0 0 71.5%, #c00000 0 85.8%, #0000c0 0); }
        .si-bars::before {
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 22%;
          background: linear-gradient(90deg, #0000c0 0 14.3%, #131313 0 28.6%, #c000c0 0 42.9%, #131313 0 57.2%, #00c0c0 0 71.5%, #131313 0 85.8%, #c0c0c0 0);
        }
        .si-bars b { position: absolute; left: 50%; top: 40%; width: 30%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 1px solid #fff; box-shadow: 0 0 0 1px #000; }
        /* The match as television shows it: the stand full, the pitch mown in
           stripes, a goal at each end and two teams after the ball. */
        .si-football { background: repeating-linear-gradient(180deg, #43a047 0 9%, #388e3c 9% 18%); }
        .si-football .crowd {
          position: absolute; left: 0; right: 0; top: 0; height: 22%; background-color: #263238;
          background-image: radial-gradient(circle, #ef5350 0 0.7px, transparent 0.9px), radial-gradient(circle, #ffee58 0 0.7px, transparent 0.9px), radial-gradient(circle, #e0e0e0 0 0.7px, transparent 0.9px), radial-gradient(circle, #42a5f5 0 0.7px, transparent 0.9px);
          background-size: 4px 3px, 5px 3px, 3px 4px, 6px 3px; background-position: 0 0, 2px 1px, 1px 2px, 3px 0;
        }
        .si-football .lines { position: absolute; left: 6%; right: 6%; top: 30%; bottom: 8%; border: 1px solid rgba(255, 255, 255, 0.8); }
        .si-football .lines::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1px solid rgba(255, 255, 255, 0.8); }
        .si-football .lines::after { content: ""; position: absolute; left: 50%; top: 50%; width: 20%; height: 44%; transform: translate(-50%, -50%); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 50%; }
        .si-football .goal { position: absolute; top: 48%; width: 4%; height: 24%; border: 1px solid #fff; background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.35) 0 1px, transparent 1px 2px); }
        .si-football .goal.l { left: 2%; border-right: none; } .si-football .goal.r { right: 2%; border-left: none; }
        .si-football .pl { position: absolute; width: 3.4%; height: 13%; border-radius: 1px 1px 0.5px 0.5px; background: linear-gradient(180deg, transparent 0 30%, var(--k) 30% 72%, #f5f5f5 72% 84%, #222 84%); animation: scr-chase 3.4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-football .pl::before { content: ""; position: absolute; left: 12%; top: 0; width: 76%; height: 30%; border-radius: 50%; background: #f1c27d; }
        .si-football .ball { position: absolute; width: 3.6%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 50% 50%, #222 0 22%, #fff 26%); box-shadow: 0 0 0 0.4px #222; animation: scr-chase 3.4s ease-in-out infinite alternate, scr-hop 0.85s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-football .score { position: absolute; left: 3%; top: 3%; padding: 0 1.5px; background: #111; color: #fff; font: 700 4.5px/1.4 Arial, sans-serif; border-left: 2px solid #e53935; }
        .si-space {
          background: radial-gradient(circle at 20% 30%, #fff 0 0.6%, transparent 0.8%), radial-gradient(circle at 70% 20%, #fff 0 0.5%, transparent 0.7%), radial-gradient(circle at 85% 70%, #fff 0 0.6%, transparent 0.8%),
            radial-gradient(circle at 40% 80%, #fff 0 0.4%, transparent 0.6%), radial-gradient(circle at 55% 45%, #fff 0 0.4%, transparent 0.6%), radial-gradient(circle at 10% 75%, #fff 0 0.5%, transparent 0.7%), linear-gradient(160deg, #0b1030, #1a0f3a);
        }
        .si-space b { position: absolute; right: 8%; top: 18%; width: 26%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ffcc80, #e65100); }
        .si-space b::after { content: ""; position: absolute; left: -30%; right: -30%; top: 42%; height: 16%; border: 1px solid rgba(255, 224, 178, 0.8); border-radius: 50%; transform: rotate(-15deg); }
        .si-space i { position: absolute; width: 5%; height: 16%; border-radius: 50% 50% 15% 15%; background: #eceff1; animation: scr-fly 5s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-space i::after { content: ""; position: absolute; left: 20%; right: 20%; top: 100%; height: 60%; border-radius: 0 0 50% 50%; background: linear-gradient(#ffeb3b, #ff5722 60%, transparent); }
        /* The old screensaver of a DVD player: the logo bounces off the
           edges, and once in about two minutes it lands right in a corner. */
        .si-bounce { background: #050505; }
        .si-bounce .logo {
          position: absolute; width: 14px; height: 9px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;
          font: 900 6px/1 Arial, sans-serif; letter-spacing: -0.3px; border-radius: 2px; color: #03a9f4; border: 1px solid currentColor;
          animation: scr-bx 4.1s linear infinite alternate, scr-by 2.9s linear infinite alternate, scr-hue 5.4s steps(6) infinite, scr-pop 118.9s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .si-bounce .flash { position: absolute; inset: 0; z-index: 2; background: #fff; opacity: 0; animation: scr-flash 118.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-bounce .bit { position: absolute; top: -12%; width: 3%; height: 5%; background: var(--c); opacity: 0; animation: scr-confetti 118.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-desktop { background: linear-gradient(160deg, #5b8def, #7e57c2 60%, #4a3a8a); }
        .si-desktop i { position: absolute; border-radius: 1px; background: rgba(255, 255, 255, 0.92); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }
        .si-desktop i::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: #cfd8e3; }
        .si-desktop i.mv { animation: scr-drag 4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-desktop u { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: rgba(20, 22, 30, 0.55); }
        .si-code { background: #1e1e2e; }
        .si-code .lines { position: absolute; left: 6%; right: 6%; top: 0; height: 200%; animation: scr-scroll 6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-code .lines i { display: block; height: 1.6px; margin: 0 0 2.2px var(--x); width: var(--w); border-radius: 1px; background: var(--c); }
        .si-pong { background: #000; }
        .si-pong::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1px dashed rgba(255, 255, 255, 0.5); }
        .si-pong .pad { position: absolute; width: 3%; height: 24%; background: #fff; animation: scr-pad 1.9s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-pong .pad.r { animation-duration: 2.3s; animation-direction: alternate-reverse; }
        .si-pong .ball { position: absolute; width: 4%; aspect-ratio: 1; background: #fff; animation: scr-pbx 1.6s linear infinite alternate, scr-pby 1.1s linear infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-pong .score { position: absolute; top: 6%; left: 0; right: 0; text-align: center; color: #fff; font: 700 5px/1 monospace; letter-spacing: 6px; }
        .si-home { background: linear-gradient(160deg, #141821, #232a38); }
        .si-home i { position: absolute; width: 20%; height: 24%; border-radius: 1.5px; background: var(--c); }
        .si-home i.f { outline: 1px solid #fff; outline-offset: 0.5px; }
        .si-home u { position: absolute; left: 6%; top: 9%; width: 40%; height: 7%; border-radius: 1px; background: rgba(255, 255, 255, 0.35); }
        @keyframes scr-breathe { 50% { opacity: 0.25; } }
        @keyframes scr-drift { to { background-position: 100% 50%; } }
        @keyframes scr-sway { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
        @keyframes scr-swim { from { left: -20%; } to { left: 110%; } }
        @keyframes scr-rise { to { bottom: 105%; opacity: 0.2; } }
        @keyframes scr-chase { from { left: 14%; } to { left: 80%; } }
        @keyframes scr-hop { from { top: 58%; } to { top: 74%; } }
        @keyframes scr-fly { from { left: -10%; top: 90%; transform: rotate(55deg); } to { left: 105%; top: -20%; transform: rotate(55deg); } }
        @keyframes scr-bx { from { left: 0; } to { left: calc(100% - 14px); } }
        @keyframes scr-by { from { top: 0; } to { top: calc(100% - 9px); } }
        @keyframes scr-hue { to { filter: hue-rotate(360deg); } }
        @keyframes scr-pop { 0% { transform: scale(1.5); } 1.2%, 100% { transform: none; } }
        @keyframes scr-flash { 0% { opacity: 0.85; } 0.8%, 100% { opacity: 0; } }
        @keyframes scr-confetti { 0% { opacity: 1; transform: translateY(0) rotate(0); } 1.6% { opacity: 1; transform: translateY(70px) rotate(540deg); } 1.61%, 100% { opacity: 0; } }
        @keyframes scr-drag { to { transform: translate(-20%, -8%); } }
        @keyframes scr-scroll { to { transform: translateY(-50%); } }
        @keyframes scr-pad { from { top: 10%; } to { top: 66%; } }
        @keyframes scr-pbx { from { left: 8%; } to { left: 88%; } }
        @keyframes scr-pby { from { top: 6%; } to { top: 88%; } }
        @media (prefers-reduced-motion: reduce) { .machine .scr-pic *, .machine .scr-led, .machine .tab-cam { animation: none !important; animation-delay: var(--anim-offset, 0s); } }
  `,
  // The iron and the steam generator: the soleplate turns red and steam
  // billows from under it, each cloud on its own beat and its own path; the
  // lamp of the generator glows and steam runs along its hose. Left on, a row
  // of small flames licks the whole soleplate and the steam turns to smoke.
  iron: () => `${AP_CSS}
        .ir-vapo { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .machine.heating .ir-vapo, .machine.left-on .ir-vapo { animation: ir-vapo 2s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.ready .ir-vapo { animation: ir-vapo 3.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); opacity: 0; }
        .machine.ready:not(.left-on) .ir-vapo g, .machine.ready:not(.left-on) .ir-vapo circle { fill-opacity: 0.6; }
        @keyframes ir-vapo {
          0% { transform: translate(0, -3px) scale(0.35); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(var(--dx, -5px), var(--dy, 6px)) scale(var(--sc, 1.5)); opacity: 0; }
        }
        .ir-flick { transform-box: fill-box; transform-origin: center bottom; }
        .machine.left-on .ir-flick { animation: ir-flick 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.left-on .ir-f1 .ir-flick { animation-delay: calc(-0.25s + var(--anim-offset, 0s)); }
        .machine.left-on .ir-f2 .ir-flick { animation-delay: calc(-0.5s + var(--anim-offset, 0s)); }
        @keyframes ir-flick {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          33% { transform: scaleY(1.12) skewX(-4deg); }
          66% { transform: scaleY(0.92) skewX(4deg); }
        }
        .machine.heating .ir-glow { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ir-flow { animation: ir-flow 0.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ir-flow { to { stroke-dashoffset: 12; } }
  `,
  // An EV charger on the wall, from the front: the box, its dark face with a
  // bolt and the light above it, the holster on its side with a CCS plug
  // parked in it head first, and the cable looping down between the two. The light takes the
  // colour of the state, the one the state line is written in, and goes dark
  // when the charger is offline. With a car at it, the plug leaves its holster
  // and the cable runs off towards the car; while it charges, the cable
  // carries the state's colour and the energy runs along it.
  ev_charger: (color) => `
        .ev-box {
          position: absolute; left: 20px; width: 44px; top: 4px; height: 66px; border-radius: 10px;
          background: linear-gradient(160deg, var(--ac-body-hi, #ffffff), var(--ac-body, #eef0f1) 50%, var(--ac-body-lo, #c9ced2));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14);
        }
        .ev-face {
          position: absolute; left: 6px; right: 6px; top: 7px; bottom: 10px; border-radius: 7px;
          background: linear-gradient(180deg, #30353b, #16191d); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4);
        }
        .ev-led {
          position: absolute; left: 50%; top: 6px; width: 18px; height: 3px; margin-left: -9px; border-radius: 2px;
          background: ${color}; box-shadow: 0 0 4px ${color}, 0 0 9px ${color};
        }
        .machine.mode-offline .ev-led, .machine.mode-unknown .ev-led { background: #4a5057; box-shadow: none; }
        /* The bolt is the box's sign: large on the face and in the state's
           colour, like the light, so the state reads from across the room. */
        .ev-bolt {
          position: absolute; left: 50%; top: 15px; width: 24px; height: 30px; margin-left: -12px;
          fill: ${color}; filter: drop-shadow(0 0 2px ${color}) drop-shadow(0 0 5px ${color});
        }
        .machine.mode-offline .ev-bolt, .machine.mode-unknown .ev-bolt { fill: #4a5057; filter: none; }
        .ev-holster {
          position: absolute; left: 61px; top: 27px; width: 16px; height: 16px; border-radius: 3px 6px 6px 3px;
          background: linear-gradient(160deg, var(--ac-body-hi, #ffffff), var(--ac-body, #eef0f1) 50%, var(--ac-body-lo, #c9ced2));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14);
        }
        /* A CCS plug, drawn lying down with the cable on the left: the strain
           relief, the grip, a collar in the colour of the box, and the taller
           head, its Type 2 part above the two DC pins and the release latch
           on top. It turns about the point where the cable enters it: head up
           into the holster, head first into the car. */
        .ev-plug { position: absolute; left: 69px; top: 51px; width: 26px; height: 12px; transform-origin: 0 6px; transform: rotate(-90deg); }
        .ev-plug > i { position: absolute; display: block; }
        .pl-boot {
          left: 0; top: 3px; width: 6px; height: 6px; clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 75%);
          background: linear-gradient(180deg, #4a5056, #2b2f34);
        }
        .pl-grip {
          left: 5px; top: 2.5px; width: 10px; height: 7px; border-radius: 3px;
          background: linear-gradient(180deg, #5b6168, #3a3f45 45%, #24282c);
        }
        .pl-collar {
          left: 14.5px; top: 1px; width: 2px; height: 10px; border-radius: 1px; box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.3);
          background: linear-gradient(180deg, var(--ac-body-hi, #ffffff), var(--ac-body, #eef0f1) 50%, var(--ac-body-lo, #c9ced2));
        }
        .pl-head {
          left: 16px; top: 0.5px; width: 9px; height: 11px; border-radius: 2px 3px 3px 2px;
          background: linear-gradient(180deg, #50565c, #2f3439 50%, #1d2125);
        }
        .pl-ac, .pl-dc { left: 24.5px; width: 1.5px; background: #15181b; }
        .pl-ac { top: 1.2px; height: 5.6px; border-radius: 0 2px 2px 0; }
        .pl-dc { top: 7.6px; height: 3.2px; border-radius: 0 1.5px 1.5px 0; }
        .pl-latch { left: 18px; top: -0.5px; width: 4px; height: 1.5px; border-radius: 1px 1px 0 0; background: #5f656c; }
        .ev-cable { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .ev-cable path { fill: none; stroke: #3b4048; stroke-width: 3.5; stroke-linecap: round; }
        .ev-cable .ev-out, .ev-cable .ev-live, .machine.plugged .ev-cable .ev-loop { display: none; }
        .machine.plugged .ev-cable .ev-out { display: inline; }
        .ev-cable .ev-live { stroke: ${color}; stroke-width: 2.4; }
        .machine.plugged.mode-charging .ev-cable .ev-live { display: inline; }
        /* While it charges, the energy runs down the cable from the box to the
           car: light dashes on the coloured core, the path drawn in that order,
           a lap of the dashes the faster the more power goes through. */
        .ev-cable .ev-flow { display: none; stroke: rgba(255, 255, 255, 0.9); stroke-width: 1.6; stroke-dasharray: 3 7; }
        .machine.plugged.mode-charging .ev-cable .ev-flow {
          display: inline; animation: ev-flow var(--ev-flow, 0.6s) linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes ev-flow { to { stroke-dashoffset: -10; } }
        /* Paused, the energy stands still on the cable, in the pause's colour
           and without the halo: nothing flows. */
        .machine.plugged.mode-paused .ev-cable .ev-live, .machine.plugged.mode-paused .ev-cable .ev-flow { display: inline; }
                .machine.mode-paused .ev-cable .ev-flow { opacity: 0.6; }
        /* A fault turns the whole cable red, in its holster or at the car. */
        .machine.mode-error .ev-cable .ev-loop, .machine.mode-error .ev-cable .ev-out {
          stroke: ${color};
        }
        /* The glow is a blurred copy of the cable in an svg of its own, under
           it: WebKit (Safari and the Home Assistant apps) blurs an svg but not
           a path inside one, so a filter on the cable's own paths shows
           nowhere there. It lights while charging, and on a fault. */
        .ev-halo { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; filter: blur(1.5px); }
        .ev-halo path { display: none; fill: none; stroke: ${color}; stroke-width: 3.5; stroke-linecap: round; }
        .machine.plugged.mode-charging .ev-halo .eh-out, .machine.plugged.mode-error .ev-halo .eh-out,
        .machine.mode-error:not(.plugged) .ev-halo .eh-loop { display: inline; }
        /* Discharging, the energy runs the other way, from the car to the box,
           at the pace of the power given back, and the halo turns into a glow
           along the whole cable, wider and lighter than the state's colour,
           that shimmers. */
        .machine.plugged.mode-discharging .ev-cable .ev-live { display: inline; }
        .machine.plugged.mode-discharging .ev-cable .ev-flow {
          display: inline; animation: ev-flow var(--ev-flow, 0.6s) linear infinite reverse; animation-delay: var(--anim-offset, 0s);
        }
        .machine.plugged.mode-discharging .ev-halo { filter: blur(2px); }
        .machine.plugged.mode-discharging .ev-halo .eh-out {
          display: inline; stroke: #a886df; stroke: color-mix(in srgb, ${color} 70%, #ffffff); stroke-width: 9;
          animation: ev-shimmer 1.3s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes ev-shimmer { 0%, 31%, 64%, 100% { opacity: 1; } 23% { opacity: 0.7; } 57% { opacity: 0.8; } 86% { opacity: 0.75; } }
        @media (prefers-reduced-motion: reduce) {
          .machine.plugged.mode-charging .ev-cable .ev-flow { animation-play-state: paused; }
          .ev-led, .ev-cable path, .ev-energy, .ev-halo, .ev-halo path, .ev-plug, .ev-ghost {
            animation-duration: 0.001ms !important; animation-iteration-count: 1 !important;
          }
        }
        .machine.plugged .ev-plug { left: 70px; top: 96px; transform: none; }
        /* The light speaks as a real box's does: it breathes while the car
           charges, and slowly while it waits for its start time; it blinks
           for a card at the reader, and faster on a fault. */
        .machine.mode-charging .ev-led { animation: ev-breathe 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-discharging .ev-led { animation: ev-breathe 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-scheduled .ev-led { animation: ev-breathe 4.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-awaiting_auth .ev-led { animation: ev-blink 1.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-error .ev-led { animation: ev-blink 0.8s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ev-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes ev-blink { 0%, 40% { opacity: 1; } 50%, 90% { opacity: 0.15; } 100% { opacity: 1; } }
        /* What happens while the card is open plays once, from the moment it
           happened: the plug pulled down out of its holster and riding the
           cable out to the car, then clicking in; back the other way, the
           cable winding in to the box and the plug pushed up into its holster;
           at the end of a charge, the light flashing and the energy fading. */
        .ev-ghost {
          display: none; position: absolute; left: 69px; top: 51px; width: 26px; height: 12px;
          transform-origin: 0 6px; transform: rotate(-90deg);
        }
        .ev-ghost > i { position: absolute; display: block; }
        .machine.plug-in .ev-ghost, .machine.plug-in .ev-plug, .machine.plug-in .ev-loop, .machine.plug-in .ev-out, .machine.plug-in .ev-energy, .machine.plug-in .ev-halo,
        .machine.plug-out .ev-ghost, .machine.plug-out .ev-plug, .machine.plug-out .ev-cable path,
        .machine.just-done .ev-led, .machine.just-done .ev-cable path, .machine.just-done .ev-halo { --anim-offset: var(--ev-since, 0s); }
        .machine.plug-in .ev-ghost { display: block; animation: ev-pull 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.plug-in .ev-cable .ev-loop { display: inline; animation: ev-fade 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.plug-in .ev-cable .ev-out { stroke-dasharray: 80; animation: ev-run-out 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.plug-in .ev-plug { animation: ev-ride-in 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        /* A car that charges as soon as it is plugged in gets its energy once
           the cable has reached it. */
        .machine.plug-in .ev-energy, .machine.plug-in .ev-halo { animation: ev-reach 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.plug-out .ev-ghost {
          display: block; left: 70px; top: 96px; transform: none;
          animation: ev-ride-back 0.9s linear both; animation-delay: var(--anim-offset, 0s);
        }
        .machine.plug-out .ev-cable .ev-out { display: inline; stroke-dasharray: 80; animation: ev-wind-in 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.plug-out .ev-cable .ev-loop { stroke-dasharray: 80; animation: ev-coil 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.plug-out .ev-plug { animation: ev-stow 0.9s linear both; animation-delay: var(--anim-offset, 0s); }
        .machine.just-done .ev-led { animation: ev-done 1.4s ease-out both; animation-delay: var(--anim-offset, 0s); }
        .machine.just-done.plugged .ev-cable .ev-live { display: inline; animation: ev-drain 1.4s ease-in both; animation-delay: var(--anim-offset, 0s); }
        .machine.just-done.plugged .ev-cable .ev-flow {
          display: inline; animation: ev-flow var(--ev-flow, 0.6s) linear infinite, ev-drain 1.4s ease-in both; animation-delay: var(--anim-offset, 0s);
        }
        /* The halo fades with them after a charge; out of a pause, where it was
           not lit, it stays out. */
        .machine.just-done.from-charging.plugged .ev-halo .eh-out { display: inline; animation: ev-drain 1.4s ease-in both; animation-delay: var(--anim-offset, 0s); }
        @keyframes ev-pull { 0% { opacity: 1; transform: rotate(-90deg); } 12%, 100% { opacity: 0; transform: translateY(6px) rotate(-90deg); } }
        @keyframes ev-fade { 0% { opacity: 1; } 12%, 100% { opacity: 0; } }
        @keyframes ev-drain { from { opacity: 1; } to { opacity: 0; } }
        @keyframes ev-reach { 0%, 80% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes ev-run-out {
          0%, 12% { stroke-dashoffset: 80; } 19% { stroke-dashoffset: 69.43; } 26% { stroke-dashoffset: 60.18; } 33% { stroke-dashoffset: 52.22; } 40% { stroke-dashoffset: 45.51; } 47% { stroke-dashoffset: 40.03; } 54% { stroke-dashoffset: 35.71; } 61% { stroke-dashoffset: 32.52; } 68% { stroke-dashoffset: 30.39; } 75% { stroke-dashoffset: 29.23; } 82% { stroke-dashoffset: 28.91; } 100% { stroke-dashoffset: 0; }
        }
        /* The plug's pose along the cable, worked out from the curve the
           cable is drawn with, so that it stays on the tip of the line. */
        @keyframes ev-ride-in {
          0%, 12% { opacity: 0; transform: translate(-28px, -32.98px) rotate(89.99deg); }
          19% { opacity: 1; transform: translate(-27.47px, -22.44px) rotate(83.45deg); }
          26% { transform: translate(-25.55px, -13.42px) rotate(70.71deg); }
          33% { transform: translate(-21.65px, -6.54px) rotate(48.07deg); }
          40% { transform: translate(-16.27px, -2.61px) rotate(24.87deg); }
          47% { transform: translate(-11.05px, -0.93px) rotate(11.87deg); }
          54% { transform: translate(-6.79px, -0.3px) rotate(5.62deg); }
          61% { transform: translate(-3.61px, -0.07px) rotate(2.5deg); }
          68% { transform: translate(-1.48px, -0.01px) rotate(0.91deg); }
          75% { transform: translate(-0.31px, 0px) rotate(0.18deg); }
          82% { transform: translate(0px, 0px) rotate(0deg); }
          90% { transform: translate(1.5px, 0px) rotate(0deg); }
          100% { opacity: 1; transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes ev-ride-back {
          0% { opacity: 1; transform: translate(0px, 0px) rotate(0deg); }
          5.6% { transform: translate(-1.59px, -0.01px) rotate(0.99deg); }
          11.3% { transform: translate(-6.38px, -0.26px) rotate(5.16deg); }
          16.9% { transform: translate(-14.19px, -1.78px) rotate(18.77deg); }
          22.5% { transform: translate(-23.02px, -8.3px) rotate(55.69deg); }
          28.1% { transform: translate(-26.92px, -18.69px) rotate(79.44deg); }
          33.8% { opacity: 1; transform: translate(-27.83px, -26.61px) rotate(86.66deg); }
          39.4% { transform: translate(-27.99px, -31.39px) rotate(89.29deg); }
          45%, 100% { opacity: 0; transform: translate(-28px, -32.98px) rotate(89.99deg); }
        }
        @keyframes ev-wind-in {
          0% { stroke-dashoffset: 28.91; } 5.6% { stroke-dashoffset: 30.5; } 11.3% { stroke-dashoffset: 35.29; } 16.9% { stroke-dashoffset: 43.28; } 22.5% { stroke-dashoffset: 54.45; } 28.1% { stroke-dashoffset: 65.63; } 33.8% { stroke-dashoffset: 73.61; } 39.4% { stroke-dashoffset: 78.4; } 45%, 100% { stroke-dashoffset: 80; }
        }
        @keyframes ev-coil {
          0%, 40% { stroke-dashoffset: 80; animation-timing-function: ease-out; }
          85%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes ev-stow {
          0%, 55% { opacity: 0; transform: translateY(9px) rotate(-90deg); animation-timing-function: ease-out; }
          85% { opacity: 1; transform: translateY(-1px) rotate(-90deg); }
          100% { opacity: 1; transform: rotate(-90deg); }
        }
        @keyframes ev-done {
          0%, 36%, 72%, 100% { box-shadow: 0 0 4px ${color}, 0 0 9px ${color}; filter: none; }
          18%, 54% { box-shadow: 0 0 6px ${color}, 0 0 20px ${color}; filter: brightness(1.7); }
        }
  `,
};

