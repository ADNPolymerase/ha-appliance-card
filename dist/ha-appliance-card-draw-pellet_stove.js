// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The pellet_stove drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {


return {
draw: (cls, ctx) => {
    // The hopper keeps a resting level when the card cannot know one, rather
    // than reading a stove with no level entity as an empty one.
    const s = ctx.stove || {};
    const fill = s.fill === null || s.fill === undefined ? 60 : Math.round(s.fill);
    const lcd = ctx.display ? esc(ctx.display) : "";
    return `
        <div class="machine ${cls} mode-${s.mode || "off"} ${s.empty ? "empty" : ""}" style="--ps-fill: ${fill}%">
          <div class="ps-smoke"><i></i><i></i></div>
          <div class="ps-air"><i class="a1"></i><i class="a2"></i><i class="a3"></i></div>
          <div class="ps-pipe"></div>
          <div class="ps-body"></div>
          <div class="ps-lid"></div>
          <div class="ps-lcd">${lcd}</div>
          <div class="ps-grille"></div>
          <div class="ps-door"><div class="ps-glass">
            <div class="ps-glow"></div><div class="ps-flame"></div><div class="ps-spark"></div>
            <div class="ps-ash"><i></i><i></i><i></i></div>
            <div class="ps-pot"></div><div class="ps-shine"></div>
          </div></div>
          <div class="ps-handle"></div>
          <div class="ps-hopper"><div class="ps-pellets"></div></div>
          <div class="ps-foot f1"></div><div class="ps-foot f2"></div>
        </div>`;
  },
css: () => `
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
};
}
