// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The cooktop drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {


return {
draw: (cls, ctx) => {
    const zones = ctx.zones || [];
    const zonesHtml = zones
      .map((z) => {
        const zc = [z.on ? "on" : "", z.max ? "max" : "", z.residual ? "residual" : ""]
          .filter(Boolean)
          .join(" ");
        const title = z.title ? ` title="${esc(z.title)}"` : "";
        return `<div class="ck-zone ${zc}" style="--zi:${z.intensity.toFixed(2)}"${title}>${esc(z.label || "")}</div>`;
      })
      .join("");
    const act = ctx.anyZoneOn ? "act" : "";
    return `
        <div class="machine ${cls}">
          <div class="ck-top">
            <div class="ck-zones g${ctx.zoneColumns || 2}">${zonesHtml}</div>
            <div class="ck-ctrl"><i class="${act}"></i><i class="${act}"></i><i class="${act}"></i></div>
            ${ctx.childLock ? `<div class="ck-lock"></div>` : ""}
          </div>
        </div>`;
  },
css: () => `
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
};
}
