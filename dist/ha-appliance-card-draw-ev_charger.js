// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The ev_charger drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// The parts of the CCS plug, as the CSS above lays them out.
const EV_PLUG_PARTS = '<i class="pl-boot"></i><i class="pl-grip"></i><i class="pl-collar"></i><i class="pl-head"></i>'
  + '<i class="pl-ac"></i><i class="pl-dc"></i><i class="pl-latch"></i>';


return {
draw: (cls, ctx) => {
    const e = ctx.ev || {};
    const shot = e.shot ? ` ${e.shot} from-${e.from}` : "";
    const since = e.shot ? `; --ev-since: ${e.since}s` : "";
    return `
        <div class="machine ${cls} mode-${e.mode || "unknown"}${e.plugged ? " plugged" : ""}${shot}" style="--ev-flow: ${e.flow || EV_FLOW_DEFAULT}s${since}">
          <svg class="ev-halo" viewBox="0 0 96 108" aria-hidden="true"><path class="eh-loop" d="M42 69 C42 104 69 104 69 57"/><path class="eh-out" d="M42 69 C42 96 50 102 70 102"/></svg>
          <svg class="ev-cable" viewBox="0 0 96 108" aria-hidden="true"><path class="ev-loop" d="M42 69 C42 104 69 104 69 57"/><path class="ev-out" d="M42 69 C42 96 50 102 70 102"/><g class="ev-energy"><path class="ev-live" d="M42 69 C42 96 50 102 70 102"/><path class="ev-flow" d="M42 69 C42 96 50 102 70 102"/></g></svg>
          <div class="ev-box"><div class="ev-face"><div class="ev-led"></div>
            <svg class="ev-bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 15H6L13 1V9H18L11 23V15Z"/></svg>
          </div></div>
          <div class="ev-plug">${EV_PLUG_PARTS}</div>
          <div class="ev-ghost">${EV_PLUG_PARTS}</div>
          <div class="ev-holster"></div>
        </div>`;
  },
css: (color) => `
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
}
