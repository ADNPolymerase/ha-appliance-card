// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The water_heater drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {


return {
draw: (cls, ctx) => {
    // Hot water sits on top of a real tank, so the warm layer grows down from
    // the dome as the water heats: 15 degrees is a cold tank, 65 a full one.
    const hot = ctx.tankTemp === null || ctx.tankTemp === undefined
      ? 0 : Math.max(0, Math.min(1, (ctx.tankTemp - 15) / 50));
    const lcd = ctx.display ? `<div class="wh-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls}" style="--wh-hot: ${hot.toFixed(2)}">
          <div class="wh-bracket"></div>
          <div class="wh-tank">
            <div class="wh-glass">
              <div class="wh-water"></div>
              <div class="wh-hot"></div>
              <div class="wh-heat"><i class="wh-h1"></i><i class="wh-h2"></i><i class="wh-h3"></i></div>
              <div class="wh-coil"></div>
            </div>
          </div>
          ${lcd}
          <div class="wh-pipe cold"></div>
          <div class="wh-pipe hot"></div>
        </div>`;
  },
css: () => `
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
};
}
