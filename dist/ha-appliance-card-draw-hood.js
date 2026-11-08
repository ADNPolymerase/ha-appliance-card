// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The hood drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {


return {
draw: (cls, ctx) => {
    const level = ctx.fanLevel || 0;
    const fanCls = `${level > 0 ? "fan" : ""} v${level} ${ctx.boost ? "boost" : ""}`;
    return `
        <div class="machine ${cls} ${fanCls}">
          <div class="hd-chimney"></div>
          <div class="hd-canopy"></div>
          <div class="hd-under"></div>
          <div class="hd-lamp l1"></div>
          <div class="hd-lamp l2"></div>
          <div class="hd-beam b1"></div>
          <div class="hd-beam b2"></div>
          <div class="hd-air a1"></div>
          <div class="hd-air a2"></div>
          <div class="hd-air a3"></div>
        </div>`;
  },
css: (color) => `
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
};
}
