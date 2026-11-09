// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The air_purifier drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
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
        .machine.mode-heat .wind path:nth-child(3n+1), .machine.warm .wind path:nth-child(3n+1) { stroke: #ffa726; }
        .machine.mode-heat .wind path:nth-child(3n+2), .machine.warm .wind path:nth-child(3n+2) { stroke: #ff7043; }
        .machine.mode-heat .wind path:nth-child(3n), .machine.warm .wind path:nth-child(3n) { stroke: #e53935; }
        .machine.hum { --air: #4fc3f7; }
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
// A Dyson column as the real machines have it: a nickel cone under the loop, a
// perforated drum and a nickel band. x and w give the column, the rest its levels.
function dysonColumn(x, w, coneTop, drumTop, drumBottom, band, drum) {
  const x1 = x + w, r = w / 2, coneBottom = drumTop + 3.5;
  const drumPath = `M${x} ${drumTop}V${drumBottom}A${r} 2.3 0 0 0 ${x1} ${drumBottom}V${drumTop}Z`;
  const front = (y) => `M${x} ${y}A${r} 2.3 0 0 0 ${x1} ${y}`;
  return `<svg class="hu-body" viewBox="0 0 96 108" width="96" height="108" aria-hidden="true">
            <defs>
              <linearGradient id="hc-gold"><stop offset="0" stop-color="#7f633b"/><stop offset="0.14" stop-color="#b8965f"/><stop offset="0.34" stop-color="#e3c592"/><stop offset="0.66" stop-color="#c6a26e"/><stop offset="1" stop-color="#7c6039"/></linearGradient>
              <linearGradient id="hc-silver"><stop offset="0" stop-color="#83878c"/><stop offset="0.16" stop-color="#c3c7cb"/><stop offset="0.36" stop-color="#f1f3f4"/><stop offset="0.66" stop-color="#c9ccd0"/><stop offset="1" stop-color="#7f8388"/></linearGradient>
              <linearGradient id="hc-nickel"><stop offset="0" stop-color="#6f7276"/><stop offset="0.16" stop-color="#a9acb0"/><stop offset="0.36" stop-color="#e4e6e8"/><stop offset="0.68" stop-color="#a8abaf"/><stop offset="1" stop-color="#686b6f"/></linearGradient>
              <pattern id="hc-holes" width="1.5" height="1.5" patternUnits="userSpaceOnUse"><circle cx="0.37" cy="0.37" r="0.3" fill="#2b2415" fill-opacity="0.75"/><circle cx="1.12" cy="1.12" r="0.3" fill="#2b2415" fill-opacity="0.75"/></pattern>
            </defs>
            <path d="${drumPath}" fill="url(#${drum})"/>
            <path d="${drumPath}" fill="url(#hc-holes)"/>
            <path d="${front(drumBottom)}V${drumBottom + band}A${r} 2.3 0 0 1 ${x} ${drumBottom + band}Z" fill="url(#hc-nickel)"/>
            <path d="${front(drumBottom)}" fill="none" stroke="#000" stroke-opacity="0.45" stroke-width="0.55"/>
            <path d="${front(drumBottom + band)}" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="0.5"/>
            <path d="M${x} ${coneBottom}C${x + 0.5} ${coneBottom - 6.5} ${x + 3.5} ${coneTop + 4} ${x + 7} ${coneTop}H${x1 - 7}C${x1 - 3.5} ${coneTop + 4} ${x1 - 0.5} ${coneBottom - 6.5} ${x1} ${coneBottom}A${r} 2.3 0 0 1 ${x} ${coneBottom}Z" fill="url(#hc-nickel)"/>
            <path d="${front(coneBottom)}" fill="none" stroke="#000" stroke-opacity="0.42" stroke-width="0.55"/>
          </svg>`;
}
// The white pillar of the filterless Dyson fans, with its dark air intake band.
function dysonPillar(x, w, top, shoulder, bottom, grille, grilleH) {
  const x1 = x + w, r = w / 2;
  const front = (y) => `A${r} 1.8 0 0 0 ${x1} ${y}`;
  const band = `M${x} ${grille}${front(grille)}V${grille + grilleH}A${r} 1.8 0 0 1 ${x} ${grille + grilleH}Z`;
  return `<svg class="hu-body" viewBox="0 0 96 108" width="96" height="108" aria-hidden="true">
            <defs>
              <linearGradient id="hc-white"><stop offset="0" stop-color="#aeb4ba"/><stop offset="0.3" stop-color="#ffffff"/><stop offset="0.68" stop-color="#e9ecee"/><stop offset="1" stop-color="#a4aab0"/></linearGradient>
              <linearGradient id="hc-band"><stop offset="0" stop-color="#55595e"/><stop offset="0.34" stop-color="#b9bcc0"/><stop offset="1" stop-color="#4f5358"/></linearGradient>
              <pattern id="hc-slits" width="1.5" height="4" patternUnits="userSpaceOnUse"><rect width="0.75" height="4" fill="#23262a" fill-opacity="0.8"/></pattern>
            </defs>
            <path d="M${x} ${bottom}V${shoulder}C${x + 0.5} ${top + 3} ${x + 3} ${top} ${x + 6} ${top}H${x1 - 6}C${x1 - 3} ${top} ${x1 - 0.5} ${top + 3} ${x1} ${shoulder}V${bottom}A${r} 1.8 0 0 1 ${x} ${bottom}Z" fill="url(#hc-white)" stroke="#000" stroke-opacity="0.22" stroke-width="0.4"/>
            <path d="${band}" fill="url(#hc-band)"/>
            <path d="${band}" fill="url(#hc-slits)"/>
          </svg>`;
}
// The round screen of a Dyson: small as on the machine, and out of scale only
// when it has a value to show, hanging down over the drum so the loop keeps its
// height.
function dysonDial(screen, bigTop, smallTop) {
  return screen !== undefined
    ? airBox("dy-round", 39, bigTop, 18, 18, `<span>${esc(screen)}</span>`)
    : airBox("dy-round", 44, smallTop, 8, 8);
}
// The classes and the variables every purifier and fan drawing carries.
function airMachine(cls, a, extra) {
  const on = ["run", "night", "heat"].includes(a.mode);
  const c = [cls, extra, `mode-${a.mode || "off"}`, on ? "on" : "", `lv${a.level || 2}`, a.aq ? `aq${a.aq}` : "", a.hum ? "hum" : "",
    a.osc ? "osc" : "", a.back ? "back" : "", a.warm ? "warm" : "", a.natural ? "nat" : "", a.winter ? "rev" : "",
    a.lamp ? "lamp" : "", a.lit ? "lit" : "", a.wood ? "wood" : ""].filter(Boolean).join(" ");
  const style = `--spd: ${a.spd || 1.6}s; --rot: ${a.rot || 0.6}s${a.aq ? `; --aq: ${AQ_COLORS[a.aq]}` : ""}`;
  return `<div class="machine ${c}" style="${style}">`;
}

function purifierHtml(cls, p) {
  const layout = p.layout || "cylinder";
  const open = airMachine(cls, p, `pf-${layout}`);
  if (layout === "ring_humidify") {
    // The same column, with the clear water tank between the drum and the disc.
    const level = p.tankOut ? 0 : p.tankLow ? 12 : p.water === null || p.water === undefined ? 68 : Math.max(8, Math.round(p.water * 100));
    return `${open}
          ${airBox("hu-foot", 30, 100.5, 36, 7)}
          <div class="hu-tank${p.tankOut ? " out" : ""}${p.tankLow ? " low" : ""}" style="left: 32.5px; top: 90px; width: 31px; height: 15px"><i class="hu-water" style="height: ${level}%"></i><u></u><b></b><b></b><b></b></div>
          ${dysonColumn(32.5, 31, 47, 62, 87.5, 3.5, p.gold ? "hc-gold" : "hc-silver")}
          ${dysonDial(p.screen, 56.5, 56)}
          <div class="dy-head">${airBox("dy-loop", 33, 1, 30, 54)}${airBox("dy-back", 37, 5, 22, 46, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 65, 9, 30, 42, "side")}${windLines("l", 1, 9, 30, 42, "side")}
          ${p.hum && !p.tankOut ? `<div class="hu-mist"><s></s><s></s><s></s><s></s></div><div class="hu-mist l"><s></s><s></s><s></s><s></s></div>` : ""}
        </div>`;
  }
  if (layout === "ring") {
    // The loop pivots on itself while it oscillates; the column stays put.
    return `${open}
          ${airBox("hu-foot", 29, 100, 38, 7)}
          ${dysonColumn(31, 34, 69, 77.5, 100, 2.5, p.gold ? "hc-gold" : "hc-silver")}
          ${dysonDial(p.screen, 76, 74)}
          <div class="dy-head">${airBox("dy-loop", 32, 1, 32, 72)}${airBox("dy-back", 36, 5, 24, 64, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 65, 13, 30, 48, "side")}${windLines("l", 1, 13, 30, 48, "side")}
        </div>`;
  }
  if (layout === "ring_heat") {
    // A Hot+Cool: shorter than the tower, with a wider loop on the same column.
    return `${open}
          ${airBox("hu-foot", 29, 100, 38, 7)}
          ${dysonColumn(31, 34, 58, 67, 100, 2.5, p.gold ? "hc-gold" : "hc-silver")}
          ${dysonDial(p.screen, 66, 63.5)}
          <div class="dy-head">${airBox("dy-loop", 30, 1, 36, 62)}${airBox("dy-back", 34, 5, 28, 54, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 68, 9, 27, 44, "side")}${windLines("l", 1, 9, 27, 44, "side")}
        </div>`;
  }
  if (layout === "ring_desk") {
    // A desk fan: a round loop on a narrow white pillar.
    return `${open}
          ${airBox("hu-foot w", 32, 100.5, 32, 6)}
          ${dysonPillar(38, 20, 58, 66, 103, 82, 6)}
          ${dysonDial(p.screen, 64, 68)}
          <div class="dy-head">${airBox("dy-loop nk", 19, 1, 58, 58)}${airBox("dy-back", 23, 5, 50, 50, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 78, 12, 18, 36, "side")}${windLines("l", 0, 12, 18, 36, "side")}
        </div>`;
  }
  if (layout === "ring_heater") {
    // A fan heater without a filter: a slim silver loop on a white column.
    return `${open}
          ${airBox("hu-foot w", 28, 101, 40, 6)}
          ${dysonPillar(33, 30, 54, 64, 103.5, 84, 7)}
          ${dysonDial(p.screen, 62, 66)}
          <div class="dy-head">${airBox("dy-loop nk", 35, 1, 26, 58)}${airBox("dy-back", 39, 5, 18, 50, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 63, 9, 32, 42, "side")}${windLines("l", 1, 9, 32, 42, "side")}
        </div>`;
  }
  if (layout === "ring_tower") {
    // A tower fan: a very tall, very slim loop on a short white neck.
    return `${open}
          ${airBox("hu-foot w", 30, 101, 36, 6)}
          ${dysonPillar(39, 18, 78, 86, 104, 92, 4)}
          ${dysonDial(p.screen, 84, 85)}
          <div class="dy-head">${airBox("dy-loop nk", 36, 1, 24, 84)}${airBox("dy-back", 40, 5, 16, 76, "<b></b><b></b><b></b><b></b>")}</div>
          ${windLines("r", 62, 16, 33, 54, "side")}${windLines("l", 1, 16, 33, 54, "side")}
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
};
}
