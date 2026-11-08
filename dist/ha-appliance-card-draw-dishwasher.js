// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The dishwasher drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {


return {
draw: (cls, ctx) => {
    return `
        <div class="machine ${cls}">
          <div class="dw-body">
            <div class="dw-controls"><div class="dw-screen"></div></div>
            <div class="dw-cavity">
              <div class="dw-dishes" aria-hidden="true">
                <span class="dw-plate dw-plate-a"></span>
                <span class="dw-plate dw-plate-b"></span>
                <span class="dw-plate dw-plate-c"></span>
                <span class="dw-plate dw-plate-d"></span>
              </div>
              <div class="dw-rack"></div>
              <div class="dw-spray" aria-hidden="true"><span class="dw-spray-hub"></span></div>
              <div class="dw-drops" aria-hidden="true">
                <i class="dw-drop dw-drop-a"></i><i class="dw-drop dw-drop-b"></i>
                <i class="dw-drop dw-drop-c"></i><i class="dw-drop dw-drop-d"></i>
                <i class="dw-drop dw-drop-e"></i>
              </div>
              <div class="dw-water" aria-hidden="true">
                <span class="dw-wave dw-wave-a"></span><span class="dw-wave dw-wave-b"></span>
              </div>
                          </div>
            <div class="dw-heat" aria-hidden="true">
              <i class="dw-heat-a"></i><i class="dw-heat-b"></i><i class="dw-heat-c"></i><i class="dw-heat-d"></i><i class="dw-heat-e"></i>
            </div>
            <div class="dw-door ${ctx.doorOpen ? "open" : ""}" aria-hidden="true"></div>
          </div>
        </div>`;
  },
css: (color) => `
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
};
}
