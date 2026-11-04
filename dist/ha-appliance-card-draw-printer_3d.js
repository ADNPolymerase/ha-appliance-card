// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The printer_3d drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// Height of a finished part on the drawing, in pixels.
const P3_PART_MAX = 40;

return {
draw: (cls, ctx) => {
    const p = ctx.p3 || { layout: "enclosed", height: 0 };
    // The part grows with the job. On an enclosed printer the bed drops as it
    // grows, the head staying at the top; on an open frame the gantry climbs.
    const h = Math.round(Math.max(0, Math.min(1, p.height || 0)) * P3_PART_MAX);
    const lcd = ctx.display ? `<div class="p3-lcd">${esc(ctx.display)}</div>` : "";
    const flags = [
      `p3-${p.layout === "open" ? "open" : "enclosed"}`,
      `p3-part-${p.part || "cube"}`,
      p.moving ? "moving" : "",
      p.nozzleHot ? "nozzle-hot" : "",
      p.bedHot ? "bed-hot" : "",
      h > 0 ? "has-part" : "",
      p.parked ? "parked" : "",
    ].filter(Boolean).join(" ");
    const head = `<div class="p3-head"><div class="p3-nozzle"></div></div>`;
    // The whole part is drawn and only what is printed shows, from the bottom
    // up, the way a printer lays it down.
    const eye = p.part === "duck" ? `<b class="p3-eye"></b>` : "";
    const bed = `<div class="p3-bed"><div class="p3-part"><div class="p3-shape">${eye}<i></i></div></div></div>`;
    if (p.layout === "open") {
      return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px">
          <div class="p3-post l"></div>
          <div class="p3-post r"></div>
          <div class="p3-top"></div>
          <div class="p3-gantry">${head}</div>
          ${bed}
          <div class="p3-base">${lcd}<div class="p3-knob"></div></div>
        </div>`;
    }
    return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px">
          <div class="p3-case">
            <div class="p3-window">
              <div class="p3-rail"></div>
              ${head}
              ${bed}
              <div class="p3-glass"></div>
            </div>
            ${lcd}
            <div class="p3-knob"></div>
          </div>
          <div class="p3-foot f1"></div>
          <div class="p3-foot f2"></div>
        </div>`;
  },
css: (color) => `
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
        @keyframes p3-move { from { transform: translateX(-14px); } to { transform: translateX(14px); } }
        @keyframes p3-draw { 0% { opacity: 0; } 30% { opacity: 0.9; } 100% { opacity: 0; } }
        .machine.moving .p3-head { animation: p3-move 1.6s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .machine.moving.has-part .p3-part i { animation: p3-draw 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
      `,
};
}
