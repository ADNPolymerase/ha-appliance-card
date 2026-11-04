// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The air_purifier drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
// Air quality on four levels: good, fair, poor, bad. A PM2.5 reading in
// micrograms, a US AQI, Philips's allergen index from 1 to 12, or the words of
// the integrations, which run from VeSync's four to Matter's six. A small
// whole number on an AQI sensor is an index of its own (Govee's), and a scale
// the card cannot place says nothing rather than something wrong.
const AQ_COLORS = { 1: "#4caf50", 2: "#fdd835", 3: "#ff9800", 4: "#f44336" };
// The air lines a purifier and a fan blow: five of them, listed so that the
// first two, then three, are evenly spread; the speed hides the rest. Up, down
// or sideways, the dashes run from the start of each line to its end.
function windLines(cls, x, y, w, h, dir) {
  const at = [0.08, 0.92, 0.5, 0.29, 0.71];
  const line = (f) => {
    if (dir === "side") {
      const v = (h * f).toFixed(1);
      return `<path d="M1 ${v} C${w * 0.3} ${v - 4} ${w * 0.6} ${+v + 4} ${w - 1} ${v - 1}"/>`;
    }
    const u = (w * f).toFixed(1);
    return dir === "up"
      ? `<path d="M${u} ${h - 1} C${u - 4} ${h * 0.66} ${+u + 4} ${h * 0.33} ${u} 1"/>`
      : `<path d="M${u} 1 C${u - 4} ${h * 0.33} ${+u + 4} ${h * 0.66} ${u} ${h - 1}"/>`;
  };
  return `<svg class="wind ${cls}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px" viewBox="0 0 ${w} ${h}">${at.map(line).join("")}</svg>`;
}
// The air lines, shared by the purifier and the fan. How many show depends on
// the speed (lv1 to lv3), how fast they run on --spd; the night dims them and
// heat turns them orange.
const AIR_CSS = `
        .wind { position: absolute; display: none; overflow: visible; z-index: 7; }
        .wind path {
          fill: none; stroke: var(--air, #42a5f5); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 6;
          animation: wind-flow var(--spd, 1.6s) linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .wind path:nth-child(2) { animation-delay: calc(var(--spd, 1.6s) * -0.33 + var(--anim-offset, 0s)); }
        .wind path:nth-child(3) { animation-delay: calc(var(--spd, 1.6s) * -0.66 + var(--anim-offset, 0s)); }
        .wind path:nth-child(4) { animation-delay: calc(var(--spd, 1.6s) * -0.5 + var(--anim-offset, 0s)); }
        .wind path:nth-child(5) { animation-delay: calc(var(--spd, 1.6s) * -0.16 + var(--anim-offset, 0s)); }
        .machine.lv1 .wind path:nth-child(n+3), .machine.lv2 .wind path:nth-child(n+4) { display: none; }
        .machine.on .wind { display: block; }
        .machine.mode-heat, .machine.warm { --air: #ff7043; }
        .machine.mode-night .wind { opacity: 0.45; }
        .machine.mode-offline { opacity: 0.45; filter: grayscale(1); }
        @keyframes wind-flow { to { stroke-dashoffset: -20; } }
        @keyframes wind-r { 0%, 35%, 100% { opacity: 1; } 50%, 85% { opacity: 0; } }
        @keyframes wind-l { 0%, 35%, 100% { opacity: 0; } 50%, 85% { opacity: 1; } }
`;

// Inline geometry: left, top, width, height.
function airBox(cls, x, y, w, h, inner = "") {
  return `<div class="${cls}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px">${inner}</div>`;
}
const AQ_BAR = "<i></i><i></i><i></i><i></i>";
// The classes and the variables every purifier and fan drawing carries.
function airMachine(cls, a, extra) {
  const on = ["run", "night", "heat"].includes(a.mode);
  const c = [cls, extra, `mode-${a.mode || "off"}`, on ? "on" : "", `lv${a.level || 2}`, a.aq ? `aq${a.aq}` : "",
    a.osc ? "osc" : "", a.back ? "back" : "", a.warm ? "warm" : "", a.natural ? "nat" : "", a.winter ? "rev" : "",
    a.lamp ? "lamp" : "", a.lit ? "lit" : "", a.wood ? "wood" : ""].filter(Boolean).join(" ");
  const style = `--spd: ${a.spd || 1.6}s; --rot: ${a.rot || 0.6}s${a.aq ? `; --aq: ${AQ_COLORS[a.aq]}` : ""}`;
  return `<div class="machine ${c}" style="${style}">`;
}

function purifierHtml(cls, p) {
  const layout = p.layout || "cylinder";
  const open = airMachine(cls, p, `pf-${layout}`);
  if (layout === "ring") {
    // The loop pivots on itself while it oscillates; the stand stays put. The
    // round screen above the gauge is the optional one.
    return `${open}
          ${airBox("dy-foot", 29, 99, 38, 7)}${airBox("dy-base", 36, 70, 24, 31)}${airBox("dy-cap", 36, 68.5, 24, 3.5)}
          ${airBox("dy-disp", 40, 94, 16, 4.5, AQ_BAR)}
          ${p.screen !== undefined ? airBox("dy-round", 38, 73, 20, 20, `<span>${esc(p.screen)}</span>`) : ""}
          <div class="dy-head">${airBox("dy-loop", 32, 1, 32, 72)}${airBox("dy-back", 36, 5, 24, 64, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 65, 13, 30, 48, "side")}${windLines("l", 1, 13, 30, 48, "side")}
        </div>`;
  }
  if (layout === "box") {
    return `${open}
          ${windLines("", 28, 0, 40, 15, "up")}
          ${airBox("co-body", 23, 34, 50, 70)}${airBox("co-lid", 22, 27, 52, 8)}${airBox("co-top", 22, 13, 52, 15)}
          ${airBox("co-fan", 31, 14.5, 34, 12)}${airBox("co-hub", 42, 18.6, 12, 4)}
          ${airBox("pf-bar", 40.5, 38.5, 15, 2.4, AQ_BAR)}
          ${p.screen !== undefined ? airBox("pf-lcd", 38, 45, 20, 9, `<span>${esc(p.screen)}</span>`) : ""}
          ${airBox("co-perf", 27, 62, 42, 38)}
        </div>`;
  }
  return `${open}
          ${windLines("", 28, 0, 40, 20, "up")}
          ${airBox("cy-body", 25, 21, 46, 83)}${airBox("cy-ring", 28, 21.5, 40, 9)}${airBox("cy-ctrl", 40, 23.8, 16, 4.4)}
          ${airBox("pf-bar", 40.5, 39.5, 15, 2.4, AQ_BAR)}
          ${p.screen !== undefined ? airBox("pf-lcd", 40, 45, 16, 9, `<span>${esc(p.screen)}</span>`) : ""}
          ${airBox("cy-perf", 26, 62, 44, 38, "<i></i>")}
        </div>`;
}


return {
draw: (cls, ctx) => purifierHtml(cls, ctx.purifier || {}),
css: () => `${AIR_CSS}
        .pf-bar { position: absolute; z-index: 5; display: flex; gap: 0.8px; }
        .pf-bar i { flex: 1; border-radius: 1px; background: rgba(0, 0, 0, 0.16); }
        .machine.on.aq1 .pf-bar i:nth-child(-n+1), .machine.on.aq2 .pf-bar i:nth-child(-n+2), .machine.on.aq3 .pf-bar i:nth-child(-n+3), .machine.on.aq4 .pf-bar i,
        .machine.on.aq1 .dy-disp i:nth-child(-n+1), .machine.on.aq2 .dy-disp i:nth-child(-n+2), .machine.on.aq3 .dy-disp i:nth-child(-n+3), .machine.on.aq4 .dy-disp i {
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
        .machine.mode-night .pf-bar, .machine.mode-night .dy-disp i { opacity: 0.35; }
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
        .dy-foot, .dy-base, .dy-cap, .dy-disp, .dy-loop, .dy-back { position: absolute; }
        .dy-foot {
          z-index: 3; border-radius: 50%; box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 0.6px rgba(0, 0, 0, 0.3);
          background: radial-gradient(ellipse at 50% 35%, var(--ac-body-hi, #ffffff), var(--ac-body, #eceff1) 55%, var(--ac-body-lo, #cfd6db));
        }
        .dy-base {
          z-index: 4; border-radius: 3px 3px 2px 2px / 2px 2px 1px 1px; box-shadow: inset 0 0 0 0.6px rgba(0, 0, 0, 0.3);
          background: linear-gradient(90deg, var(--ac-body-lo, #cfd6db), var(--ac-body-hi, #ffffff) 30%, var(--ac-body, #eceff1) 62%, var(--ac-body-lo, #cfd6db));
        }
        .dy-cap { z-index: 4; border-radius: 50%; background: linear-gradient(180deg, var(--ac-body-hi, #ffffff), var(--ac-body, #eceff1)); box-shadow: inset 0 0 0 0.6px rgba(0, 0, 0, 0.3); }
        .dy-disp {
          z-index: 5; display: flex; gap: 0.6px; padding: 1.5px 1.3px; box-sizing: border-box; border-radius: 1px;
          background: #0d1013; box-shadow: 0 0 0 0.6px rgba(255, 255, 255, 0.25);
        }
        .dy-disp i { flex: 1; border-radius: 0.4px; background: rgba(255, 255, 255, 0.1); }
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
        .machine.pf-ring .wind.l { transform: scaleX(-1); display: none; }
        .machine.on.osc .dy-head { animation: pf-pivot 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.r { animation: wind-r 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on.osc .wind.l { display: block; animation: wind-l 5s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.back .wind, .machine.back.osc .wind.l { display: none; }
        @keyframes pf-pivot { 0%, 50%, 100% { transform: scaleX(1); } 25%, 75% { transform: scaleX(0.68); } }
        @keyframes pf-aspire { 0% { transform: scale(1); opacity: 0.95; } 100% { transform: scale(0.08); opacity: 0; } }
  `,
};
}
