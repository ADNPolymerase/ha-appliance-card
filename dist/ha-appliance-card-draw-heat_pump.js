// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The heat_pump drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {


return {
draw: (cls, ctx) => {
    const mode = ctx.hpMode || "idle";
    // The fan turns whenever the pump works; it stops to defrost, as the real
    // one does while it melts the ice off its coil.
    const fan = ["space_heating", "hot_water", "cooling", "running"].includes(mode) && !ctx.compressorOff;
    // Water runs while the pump works a circuit: down the flow pipe and back
    // up the return, to the tank for hot water and to the emitter otherwise.
    const flowing = ["space_heating", "hot_water", "cooling"].includes(mode) && !ctx.compressorOff;
    const lcd = ctx.display ? `<div class="hp-lcd">${esc(ctx.display)}</div>` : "";
    const pipes = (circuit) => `<div class="hp-pipe ${circuit} flow"></div><div class="hp-pipe ${circuit} ret"></div>`;
    // A pump that heats no domestic hot water has no tank to draw, and what
    // takes its heat is a radiator or the floor.
    const tank = ctx.noTank ? "" : `
          ${pipes("tank")}
          <div class="hp-tank"><i></i></div>`;
    const emitter = ctx.underfloor
      ? `<div class="hp-floor"><i></i><i></i><i></i><div class="hp-slab"><div class="hp-coil"><b></b><b></b><b></b></div></div></div>`
      : `<div class="hp-rad"><i></i><i></i><i></i><i></i><i></i></div>`;
    return `
        <div class="machine ${cls} mode-${mode} ${fan ? "fan" : ""} ${flowing ? "flowing" : ""} ${ctx.noTank ? "no-tank" : ""} ${ctx.underfloor ? "underfloor" : ""}">
          <div class="hp-unit">
            <div class="hp-grille"><div class="hp-fan"></div><div class="hp-hub"></div><div class="hp-guard"></div><div class="hp-frost"></div></div>
            <div class="hp-side">${lcd}<div class="hp-fins"></div></div>
          </div>
          <div class="hp-foot f1"></div><div class="hp-foot f2"></div>${tank}
          ${pipes("rad")}
          ${emitter}
        </div>`;
  },
css: () => `
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
};
}
