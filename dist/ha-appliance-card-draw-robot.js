// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The robot drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing(deps) {
// A page still running the card of an earlier release: an arrow to reload.
if (!deps || deps.__v !== "4.45.0") return { draw: () => '<div class="machine" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.5">\u21bb</div>', css: "" };
let { BATTERY_LAYOUTS, CAMERA_LAYOUTS, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntFlake, ntTint, numberOrNull, shdBlur, t, thsColor, zoneColumns } = deps;
// The small screen and the air lines the dehumidifier and the two heaters
// share. Warm air rises; the air a dehumidifier or a fan blows goes the other
// way along the same lines.
const MINI_LCD_CSS = `
        .mini-lcd {
          position: absolute; height: 9px; padding: 0 1.5px; border-radius: 1.5px;
          display: flex; align-items: center; justify-content: center; gap: 1px;
          background: rgba(10, 14, 18, 0.88); color: #7fdcff; text-shadow: 0 0 2px currentColor;
          font: 700 6.5px/9px ui-monospace, "SF Mono", Menlo, monospace;
        }
        .mini-lcd svg { width: 7px; height: 7px; flex: none; fill: currentColor; }
        .mini-lcd span:empty { display: none; }
        .machine.mode-off .mini-lcd { display: none; }
        .air-flow { position: absolute; display: none; overflow: visible; }
        .air-flow path {
          fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 5;
          animation: air-up 1.4s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .air-flow path:nth-child(2) { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .air-flow path:nth-child(3) { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .air-flow.down path { animation-name: air-down; }
        @keyframes air-up { to { stroke-dashoffset: -18; } }
        @keyframes air-down { to { stroke-dashoffset: 18; } }
`;
// Three wavy lines, drawn from the bottom up.
function airFlow(cls, w, h, down) {
  const line = (x) => `<path d="M${x} ${h} C${x - w * 0.1} ${h * 0.66} ${x + w * 0.1} ${h * 0.33} ${x} 0"/>`;
  return `<svg class="air-flow ${cls} ${down ? "down" : ""}" viewBox="0 0 ${w} ${h}">${line(w * 0.25)}${line(w * 0.5)}${line(w * 0.75)}</svg>`;
}

const softShadow = (cx, cy, rx, ry, op = .26, b = 1.6) => { const id = `shd-${cx}-${cy}-${rx}`.replace(/\./g, "_"); return `${shdBlur(id, b)}<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// Drawing helpers
let ntN = 0;
const ntId = () => `nt${++ntN}`;
const NT_FONT = `font-family="Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"`;
const ntV = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const ntBlur = (id, s) => `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${s}"/></filter>`;
const ntShadow = (cx, cy, rx) => softShadow(cx, cy - .6, +(rx * .8).toFixed(1), 4, .26);
const ntFoot = (pts, op = .22) => { const id = ntId(); return `<filter id="${id}" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.5"/></filter><polygon points="${pts}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// A display in large bold figures, so the value and its unit read at card size.
const ntLcd = (x, y, w, h, text, lit, color = "#4fc3f7", fs = 8.5) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.8" fill="#141a21" stroke="#0a0d11" stroke-width=".5"/>` +
  `<rect x="${x + .8}" y="${y + .8}" width="${w - 1.6}" height="${(h * .38).toFixed(2)}" rx="1.2" fill="#fff" opacity=".05"/>` +
  (text ? `<text x="${x + w / 2}" y="${(y + h / 2 + fs * .36).toFixed(2)}" font-size="${fs}" font-weight="700" text-anchor="middle" fill="${lit ? color : "#5d6773"}" ${NT_FONT}>${esc(text)}</text>` : "");
// The text of a display fits its width: a long reading is drawn smaller.
const ntFit = (text, width, fs) => Math.min(fs, (width - 3) / Math.max(1, String(text || "").length * .6));

// Booster set: the pump on its pressure tank and its electronic controller
function ntBooster(c) {
  const m = ntId(), t = ntId(), cs = ntId(), b = ntId(), p = ntId(), pv = ntId();
  const on = c.on;
  const fins = [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${62 + i * 5}" y="51.5" width="1.6" height="21" rx=".8" fill="#123f78" opacity=".5"/>`).join("");
  const slots = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M100 ${54 + i * 3}h5.4" stroke="#7a838f" stroke-width="1" stroke-linecap="round"/>`).join("");
  const txt = c.lcd || "";
  return `<defs>${ntV(m, "#62a8f0", "#1b56a0")}${ntV(t, "#3f8fe4", "#16457f")}${ntV(cs, "#e3e7ec", "#8b95a1")}${ntV(b, "#f5d77e", "#b4842a")}${ntV(p, "#5a636e", "#262b31")}${ntV(pv, "#eceff2", "#b6bec8")}</defs>
${ntShadow(63, 107.2, 44)}
<path d="M24 98 v9 h9 v-9 M92 98 v9 h9 v-9" fill="#3f4752"/>
<rect x="16" y="80" width="94" height="20" rx="10" fill="url(#${t})"/>
<rect x="24" y="82.6" width="78" height="3" rx="1.5" fill="#fff" opacity=".28"/>
<path d="M30 80.4v19.2M96 80.4v19.2" stroke="#0f3563" stroke-width=".7"/>
<rect x="34" y="74" width="72" height="6" rx="1.2" fill="#555e69"/>
<g class="nta-vib">
<rect x="58" y="50" width="42" height="24" rx="4" fill="url(#${m})"/>${fins}
<rect x="58" y="51.5" width="42" height="3" fill="#fff" opacity=".2"/>
<rect x="97.5" y="51.5" width="9.5" height="21" rx="3" fill="#353c46"/>${slots}
<rect x="67" y="42.5" width="20" height="8.2" rx="1.5" fill="#2b3139"/>
<rect x="70" y="44.2" width="6" height="4.6" rx="1" fill="${on ? "#43a047" : "#59626e"}"/>
<circle cx="82" cy="46.5" r="1.4" fill="${on ? "#76ff03" : "#59626e"}"/>
<path d="M38 50 Q34 46 41 46 H53 Q59 46 59 52 V71 Q59 76 53 76 H41 Q35 76 35 70 Z" fill="url(#${cs})"/>
<path d="M38 52 Q38 48 42 48 H48" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>
<rect x="55.5" y="47.5" width="4.4" height="28" rx="1" fill="#7a848f"/>
<circle cx="57.7" cy="51" r="1" fill="#4a525e"/><circle cx="57.7" cy="72" r="1" fill="#4a525e"/>
<circle cx="46" cy="62" r="5.2" fill="#9aa3ae" stroke="#6d7682" stroke-width=".6"/><circle cx="46" cy="62" r="1.6" fill="#59626e"/>
<rect x="37" y="74" width="5" height="3" rx=".6" fill="url(#${b})"/>
</g>
<rect x="0" y="57.5" width="36" height="9" fill="url(#${p})"/>
<rect x="20" y="56" width="8" height="12" rx="1" fill="url(#${b})"/><path d="M22 56v12M24 56v12M26 56v12" stroke="#9a7020" stroke-width=".5"/>
<rect x="42.5" y="30" width="7" height="17" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<rect x="62" y="17" width="58" height="7" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<g class="nt-run"><path class="nta-flow" d="M1 62H35" stroke="#81d4fa" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/>
<path class="nta-flow" d="M46 46V32" stroke="#81d4fa" stroke-width="2.2" stroke-dasharray="4 4" fill="none"/>
<path class="nta-flow" d="M69 20.5H119" stroke="#81d4fa" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/></g>
<rect x="28" y="4" width="41" height="28" rx="3" fill="#eef1f4" stroke="#aab2bc" stroke-width=".6"/>
<rect x="28" y="4" width="41" height="4" rx="2" fill="#1e88e5"/>
${ntLcd(31, 9.5, 35, 13, txt, true, on ? "#4fc3f7" : "#90a4ae", ntFit(txt, 35, 8.6))}
<circle cx="34" cy="27" r="1.3" fill="#43a047"/><circle cx="52" cy="27" r="1.3" fill="${on ? "#43a047" : "#b0b7c1"}"/>`;
}

// Sump pit in cross-section: the float pivots on its cable with the water
function ntSump(c) {
  const s = ntId(), w = ntId(), con = ntId(), pu = ntId(), pv = ntId();
  const angleOf = (y) => Math.max(-8, Math.min(90, Math.asin(Math.max(-1, Math.min(1, (86 - y + 1) / 24))) * 180 / Math.PI));
  // The water: the level read when there is one, high on an alarm, falling
  // while it pumps, mid-pit at rest.
  const known = c.level !== null && c.level !== undefined;
  const lv = known ? 108 - Math.max(0, Math.min(1, c.level)) * 80 : c.alarm ? 40 : 64;
  const moving = c.on && !known && !c.alarm;
  const water = moving
    ? `<rect x="31" y="62" width="58" height="46" fill="url(#${w})"><animate attributeName="y" values="62;88;62" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/><animate attributeName="height" values="46;20;46" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/></rect>`
    : `<rect x="31" y="${lv.toFixed(1)}" width="58" height="${(108 - lv).toFixed(1)}" fill="url(#${w})"/><path d="M31 ${lv.toFixed(1)}h58" stroke="#b3e5fc" stroke-width=".8"/>`;
  const swing = moving ? `<animateTransform attributeName="transform" type="rotate" values="${angleOf(62)} 52 86;${angleOf(88)} 52 86;${angleOf(62)} 52 86" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/>` : "";
  const soil = [[8, 40], [14, 70], [6, 96], [18, 110], [100, 44], [108, 66], [114, 90], [102, 104], [20, 54], [112, 30], [9, 84]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="1" fill="#4e342e" opacity=".5"/>`).join("");
  const grass = Array.from({ length: 24 }, (_, i) => { const x = i * 5 + 1; return x > 23 && x < 97 ? "" : `<path d="M${x} 24 l1 -3.4 M${x + 2} 24 l-.6 -2.6" stroke="#558b2f" stroke-width=".8"/>`; }).join("");
  const txt = c.lcd || "";
  return `<defs>${ntV(s, "#8d6e63", "#5d4037")}${ntV(w, "#4fc3f7", "#0d5c9e")}${ntV(con, "#c4c7cc", "#9a9ea6")}${ntV(pu, "#4a5b55", "#1d2623")}${ntV(pv, "#eceff2", "#b6bec8")}</defs>
<rect x="0" y="24" width="120" height="96" fill="url(#${s})"/>${soil}
<rect x="0" y="21.5" width="24" height="3.5" fill="#7cb342"/><rect x="96" y="21.5" width="24" height="3.5" fill="#7cb342"/>${grass}
<rect x="26" y="24" width="68" height="90" fill="url(#${con})"/>
<rect x="31" y="26" width="58" height="82" fill="#3a4148"/><rect x="31" y="26" width="58" height="6" fill="#000" opacity=".25"/>
${water}
<path d="M31 46h9" stroke="#ef5350" stroke-width=".9" stroke-dasharray="1.6 1"/><text x="33" y="44.6" font-size="5" font-weight="700" fill="#ef5350" ${NT_FONT}>max</text>
<path d="M31 90h9" stroke="#ffb74d" stroke-width=".9" stroke-dasharray="1.6 1"/><text x="33" y="88.6" font-size="5" font-weight="700" fill="#ffb74d" ${NT_FONT}>min</text>
<rect x="0" y="29" width="32" height="7" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<g class="nta-fall"><circle cx="33" cy="38" r="1.1" fill="#81d4fa"/></g><g class="nta-fall ntd2"><circle cx="33.6" cy="38" r=".9" fill="#81d4fa"/></g>
<rect x="57" y="7" width="6" height="71" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<rect x="57" y="6" width="63" height="6" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<g class="nt-run"><path class="nta-flow" d="M60 76V9H119" stroke="#81d4fa" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/></g>
<rect x="54.5" y="48" width="11" height="10" rx="1.4" fill="#37474f"/><path d="M60 56.5v-6.5M57.6 52.4 60 50l2.4 2.4" stroke="#cfd8dc" stroke-width=".9" fill="none" stroke-linecap="round"/>
<rect x="24" y="19.5" width="72" height="5" rx="1" fill="#5b6470"/><path d="M30 20.5v3M36 20.5v3M42 20.5v3M48 20.5v3M70 20.5v3M76 20.5v3M82 20.5v3M88 20.5v3" stroke="#3a414b" stroke-width="1.2"/>
<g class="nta-vib">
<path d="M55 80 Q55 75 60 75 Q65 75 65 80 Z" fill="#2c3834"/>
<rect x="52" y="79" width="16" height="22" rx="2.4" fill="url(#${pu})"/>
<rect x="53.5" y="81" width="2" height="18" rx="1" fill="#fff" opacity=".18"/>
<rect x="50" y="100" width="20" height="8" rx="1.4" fill="#37474f"/>
<path d="M53 101.5v5M56 101.5v5M59 101.5v5M62 101.5v5M65 101.5v5M68 101.5v5" stroke="#90a4ae" stroke-width=".8"/>
</g>
<g transform="rotate(${moving ? 0 : angleOf(lv).toFixed(1)} 52 86)">${swing}
<path d="M52 86 H32" stroke="#212121" stroke-width=".9"/>
<ellipse cx="28" cy="86" rx="5.4" ry="3.6" fill="#ffca28" stroke="#c49000" stroke-width=".5"/><ellipse cx="26.6" cy="84.8" rx="2" ry=".9" fill="#fff" opacity=".6"/>
</g>
<rect x="11.5" y="17" width="3" height="6" fill="#5b6470"/>
<rect x="0" y="2" width="27" height="16" rx="2" fill="#eceff2" stroke="#aab2bc" stroke-width=".5"/>
${ntLcd(2, 4.2, 23, 11.6, txt, true, c.alarm ? "#ff5252" : "#4fc3f7", ntFit(txt, 23, 7.6))}
${c.alarm ? `<rect x="29" y="9" width="7" height="3" rx=".6" fill="#5b6470"/><path d="M29.6 9 Q32.5 1.5 35.4 9 Z" fill="#e53935"/><circle class="nta-beacon" cx="32.5" cy="6" r="6" fill="#ff5252" opacity=".5"/>` : ""}`;
}

// Pool robot: the cable from the deck follows it to and fro
function ntPoolRobot(c) {
  const tp = ntId(), w = ntId(), bd = ntId(), dk = ntId();
  const on = c.on, x0 = 34, x1 = 88;
  const cable = (x) => `M90 21 C83 21 80 27 76 35.5 C${x + 16} 42 ${x + 7} 62 ${x} 79`;
  const keys = "0;.45;.5;.95;1";
  const cablePath = on
    ? `<path d="${cable(x0)}" stroke="#263238" stroke-width="1.2" fill="none"><animate attributeName="d" values="${[x0, x1, x1, x0, x0].map(cable).join(";")}" keyTimes="${keys}" dur="9s" repeatCount="indefinite"/></path>`
    : `<path d="${cable(46)}" stroke="#263238" stroke-width="1.2" fill="none"/>`;
  const brush = (cx) => `<g transform="translate(${cx} 1)"><g class="nta-spin"><circle r="4.2" fill="#1e88e5"/>${[0, 45, 90, 135].map((a) => `<path d="M-4 0H4" transform="rotate(${a})" stroke="#90caf9" stroke-width=".9"/>`).join("")}</g><circle r="1.2" fill="#0d47a1"/></g>`;
  const robot = `<rect x="-15" y="-2" width="30" height="8.2" rx="4" fill="#263238"/>
<path class="nta-flow-fast" d="M-12 6H12" stroke="#78909c" stroke-width="1.6" stroke-dasharray="1.6 1.6"/>
${brush(-13.5)}${brush(13.5)}
<path d="M-15 -1 Q-15 -14 0 -14 Q15 -14 15 -1 Z" fill="url(#${bd})" stroke="#90a4ae" stroke-width=".5"/>
<path d="M-15 -3 H15" stroke="#1e88e5" stroke-width="2"/>
<rect x="-7" y="-11" width="14" height="5" rx="1.5" fill="#37474f"/><path d="M-5.5 -8.5h11" stroke="#78909c" stroke-width=".6" stroke-dasharray="1 .8"/>
<path d="M-6 -13.4 Q0 -21 6 -13.4" stroke="#455a64" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<circle cx="10" cy="-6.5" r="1" fill="${on ? "#76ff03" : "#78909c"}"/>`;
  const anim = on ? `<animateTransform attributeName="transform" type="translate" values="${x0} 98;${x1} 98;${x1} 98;${x0} 98;${x0} 98" keyTimes="${keys}" dur="9s" repeatCount="indefinite"/>` : "";
  const flip = on ? `<animateTransform attributeName="transform" type="scale" values="1 1;1 1;-1 1;-1 1;1 1" keyTimes="${keys}" calcMode="discrete" dur="9s" repeatCount="indefinite"/>` : "";
  const bubbles = [0, 1, 2].map((i) => `<circle class="nta-rise ntd${i + 1}" cx="${-2 + i * 2}" cy="-16" r="${1 - i * .15}" fill="#e1f5fe" opacity="0"/>`).join("");
  const caust = [14, 30, 52, 70, 92].map((x, i) => `<path class="nta-caust ntd${i + 1}" d="M${x} 102 q3 -2 6 0 q3 2 6 0" stroke="#e1f5fe" stroke-width=".8" fill="none"/>`).join("");
  const txt = on ? c.lcd || "" : "";
  // Put away for the winter: the water lowered under its cover, snow on the
  // cover and the deck, the robot out of the pool.
  if (c.winter) return `<defs><pattern id="${tp}" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#8fd0ec"/><path d="M5 0V5M0 5H5" stroke="#6fbbe0" stroke-width=".5"/></pattern>
${ntV(w, "#4fc3f7", "#0277bd")}${ntV(dk, "#efe5d0", "#d6c7a7")}</defs>
<rect x="0" y="20" width="120" height="8" fill="url(#${dk})"/><rect x="0" y="27" width="120" height="1.2" fill="#b9a988"/>
<rect x="6" y="28" width="108" height="80" fill="#cfd8dc"/><rect x="8" y="28" width="104" height="78" fill="url(#${tp})"/>
<rect x="8" y="58" width="104" height="48" fill="url(#${w})" opacity=".45"/>
<rect x="8" y="28" width="104" height="78" fill="#4b5d68" opacity=".32"/>
<rect x="6" y="106" width="108" height="3" fill="#90a4ae"/>
<path d="M2 26 Q60 50 118 26 L118 32 Q60 56 2 32 Z" fill="#2f5446" stroke="#1f3a30" stroke-width=".7"/>
<path d="M18 31 V36 M38 36.6 V41.6 M60 38.6 V43.6 M82 36.6 V41.6 M102 31 V36" stroke="#4d7a68" stroke-width=".9"/>
<path d="M6 27.6 Q60 51 114 27.6 Q60 43 6 27.6 Z" fill="#f7fbfd" stroke="#d6e6ef" stroke-width=".4"/>
<ellipse cx="60" cy="40.6" rx="20" ry="3" fill="#ffffff" opacity=".9"/>
${ntSnowCap(0, 120, 19.6, 2.6)}
<g transform="translate(26 20) scale(1.35)"><rect x="-13" y="-6.4" width="26" height="6.4" rx="3.2" fill="#263238"/><circle cx="-10" cy="-1.2" r="2.6" fill="#1e88e5"/><circle cx="10" cy="-1.2" r="2.6" fill="#1e88e5"/><path d="M-13 -5.6 Q-13 -16 0 -16 Q13 -16 13 -5.6 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width=".5"/><path d="M-13 -7.4 H13" stroke="#1e88e5" stroke-width="1.6"/><path d="M-12.4 -8.6 Q-13 -18.4 0 -18.6 Q13 -18.4 12.4 -8.6 Q9 -11.4 5 -10.4 Q1 -12 -3 -10.6 Q-8 -11.8 -12.4 -8.6 Z" fill="#ffffff" stroke="#b9cfdc" stroke-width=".5"/><path d="M-12.6 -8.8 Q-14 -6 -12.8 -4" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>
<rect x="86" y="5" width="32" height="16" rx="2" fill="#eceff2" stroke="#aab2bc" stroke-width=".5"/>
${ntLcd(88.5, 7, 27, 11.6, "", false, "#4fc3f7", 7.8)}
<circle cx="116" cy="19" r=".9" fill="#9aa1ab"/>${ntSnowCap(86, 118, 4.6, 1.8)}`;
  return `<defs><pattern id="${tp}" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#8fd0ec"/><path d="M5 0V5M0 5H5" stroke="#6fbbe0" stroke-width=".5"/></pattern>
${ntV(w, "#4fc3f7", "#0277bd")}${ntV(bd, "#ffffff", "#b0bec5")}${ntV(dk, "#efe5d0", "#d6c7a7")}</defs>
<rect x="0" y="20" width="120" height="8" fill="url(#${dk})"/><rect x="0" y="27" width="120" height="1.2" fill="#b9a988"/>
<rect x="6" y="28" width="108" height="80" fill="#cfd8dc"/>
<rect x="8" y="28" width="104" height="78" fill="url(#${tp})"/>
<rect x="8" y="35" width="104" height="71" fill="url(#${w})" opacity=".72"/>
<path class="nta-bob" d="M8 35 q6.5 -1.6 13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0" stroke="#e1f5fe" stroke-width="1.2" fill="none"/>
${caust}
<rect x="6" y="106" width="108" height="3" fill="#90a4ae"/>
${cablePath}
<ellipse cx="76" cy="35.4" rx="3" ry="1.8" fill="#ffca28" stroke="#c49000" stroke-width=".4"/>
<g transform="translate(${on ? x0 : 46} 98)">${anim}<g>${flip}${robot}<g class="nt-run">${bubbles}</g></g></g>
<rect x="86" y="5" width="32" height="16" rx="2" fill="#eceff2" stroke="#aab2bc" stroke-width=".5"/>
${ntLcd(88.5, 7, 27, 11.6, txt, on, "#4fc3f7", ntFit(txt, 27, 7.8))}
<circle cx="116" cy="19" r=".9" fill="${on ? "#76ff03" : "#9aa1ab"}"/>`;
}

// Underfloor heating: a corner of the room, the tiles cut open over the loop
function ntFloor(c) {
  const wl = ntId(), tl = ntId(), gl = ntId();
  const on = c.on, electric = c.electric;
  const P = (u, v) => [22 + 96 * u - 20 * v, 60 + 36 * v];
  const pt = (u, v) => P(u, v).map((x) => x.toFixed(1)).join(" ");
  const poly = (pts, fill, extra = "") => `<polygon points="${pts.map(([u, v]) => pt(u, v)).join(" ")}" fill="${fill}" ${extra}/>`;
  const grout = [1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${pt(i / 8, 0)} L${pt(i / 8, 1)}" stroke="#bfb5a4" stroke-width=".5"/>`).join("") +
    [1, 2, 3, 4].map((j) => `<path d="M${pt(0, j / 5)} L${pt(1, j / 5)}" stroke="#bfb5a4" stroke-width=".5"/>`).join("");
  const u0 = .4, v0 = .34;
  const runs = [.44, .54, .64, .74, .84, .94];
  let d = `M${pt(.47, runs[0])}`;
  runs.forEach((v, i) => {
    const end = i % 2 ? .47 : .95;
    d += ` L${pt(end, v)}`;
    if (i < runs.length - 1) d += ` Q${pt(end === .95 ? 1.01 : .41, (v + runs[i + 1]) / 2)} ${pt(end, runs[i + 1])}`;
  });
  const pipeColor = electric ? (on ? "#ff7043" : "#8d6e63") : (on ? "#e53935" : "#b0857c");
  const mesh = electric
    ? Array.from({ length: 7 }, (_, i) => { const u = u0 + (1 - u0) * (i + .5) / 7; return `<path d="M${pt(u, v0)} L${pt(u, 1)}" stroke="#fff" stroke-width=".35" opacity=".8"/>`; }).join("") +
      Array.from({ length: 6 }, (_, j) => { const v = v0 + (1 - v0) * (j + .5) / 6; return `<path d="M${pt(u0, v)} L${pt(1, v)}" stroke="#fff" stroke-width=".35" opacity=".8"/>`; }).join("")
    : "";
  const layers = electric
    ? [[0, 2, "#d9cfbf"], [2, 4, "#9e9e9e"], [4, 12, "#a8a196"], [12, 17, "#f2e3a0"], [17, 20, "#8a8f96"]]
    : [[0, 2, "#d9cfbf"], [2, 11, "#a8a196"], [11, 17, "#f2e3a0"], [17, 20, "#8a8f96"]];
  const front = layers.map(([a, b, col]) => `<rect x="2" y="${96 + a}" width="96" height="${b - a}" fill="${col}"/>`).join("") +
    layers.map(([a, b, col]) => `<polygon points="98 ${96 + a} 118 ${60 + a} 118 ${60 + b} 98 ${96 + b}" fill="${col}" opacity=".78"/>`).join("");
  const dots = electric
    ? Array.from({ length: 12 }, (_, i) => `<circle cx="${7 + i * 8}" cy="99" r=".9" fill="${pipeColor}"/>`).join("")
    : Array.from({ length: 12 }, (_, i) => `<circle cx="${7 + i * 8}" cy="102.5" r="1.7" fill="${i % 2 ? (on ? "#1e88e5" : "#7f97ad") : pipeColor}" stroke="#fff" stroke-width=".3"/>`).join("");
  const studs = electric ? "" : Array.from({ length: 16 }, (_, i) => `<rect x="${3 + i * 6}" y="105.5" width="3" height="1.4" rx=".5" fill="#e0cf7c"/>`).join("");
  const manifold = electric ? "" : `<rect x="18" y="20" width="9" height="11" rx="2" fill="#c62828"/><circle cx="22.5" cy="25.5" r="3" fill="#ef9a9a"/>
<g class="${on ? "nta-spin-slow" : ""}">${ntFlake(22.5, 25.5, 2.2, "#b71c1c", .7)}</g>
<rect x="27" y="24" width="33" height="3.6" rx="1.2" fill="#d32f2f"/>
<rect x="27" y="36" width="33" height="3.6" rx="1.2" fill="#1e88e5"/>
${[0, 1, 2, 3].map((k) => { const x = 33 + k * 7.5; return `<rect x="${x - 1.4}" y="15.5" width="2.8" height="8.5" rx="1" fill="#e3f2fd" stroke="#90a4ae" stroke-width=".4"/>
<rect class="nta-bob" x="${x - 1}" y="${on ? 17.6 : 21.4}" width="2" height="2" fill="#e53935"/>
<circle cx="${x + 2.6}" cy="41.6" r="1.6" fill="#263238"/>
<path d="M${x - 1.2} 27.6 V60" stroke="${on ? "#ef5350" : "#c08a84"}" stroke-width="1.6"/><path d="M${x + 1.2} 39.6 V60" stroke="${on ? "#42a5f5" : "#8fa6bb"}" stroke-width="1.6"/>`; }).join("")}`;
  const waves = [[.18, .3], [.5, .2], [.75, .5], [.32, .7], [.62, .8], [.88, .15]].map(([u, v], i) => { const [x, y] = P(u, v); return `<path class="nta-heat ntd${i + 1}" d="M${x.toFixed(1)} ${y.toFixed(1)} q-1.6 -2.6 0 -5.2 q1.6 -2.6 0 -5.2" stroke="#ff8a65" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0"/>`; }).join("");
  const txt = c.lcd || "";
  return `<defs>${ntV(wl, "#f5f7fa", "#e3e8ee")}${ntV(tl, "#f1ece3", "#ddd4c4")}${ntBlur(gl, 1.1)}</defs>
<polygon points="22 4 118 4 118 60 22 60" fill="url(#${wl})"/>
<rect x="22" y="56" width="96" height="4" fill="#fff" stroke="#d7dce3" stroke-width=".4"/>
${manifold}
${poly([[0, 0], [1, 0], [1, 1], [0, 1]], `url(#${tl})`)}${grout}
<g class="nt-run">${poly([[0, 0], [1, 0], [1, 1], [0, 1]], "#ff7043", `class="nta-warm" opacity=".1"`)}</g>
${poly([[u0, v0], [1, v0], [1, 1], [u0, 1]], electric ? "#9e9e9e" : "#a8a196")}
${mesh}
<g class="nt-run"><path d="${d}" stroke="${pipeColor}" stroke-width="${electric ? 3.4 : 4.4}" fill="none" opacity=".45" filter="url(#${gl})"/></g>
<path d="${d}" stroke="${pipeColor}" stroke-width="${electric ? 1.1 : 2.2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
${electric ? "" : `<g class="nt-run"><path class="nta-flow" d="${d}" stroke="#ffcdd2" stroke-width=".8" stroke-dasharray="2 5" fill="none"/></g>`}
<polygon points="${pt(u0, v0)} ${pt(1, v0)} ${P(1, v0)[0].toFixed(1)} ${(P(1, v0)[1] + 1.8).toFixed(1)} ${P(u0, v0)[0].toFixed(1)} ${(P(u0, v0)[1] + 1.8).toFixed(1)}" fill="#a39886"/>
<polygon points="${pt(u0, v0)} ${pt(u0, 1)} ${(P(u0, 1)[0] + 1.6).toFixed(1)} ${P(u0, 1)[1].toFixed(1)} ${(P(u0, v0)[0] + 1.6).toFixed(1)} ${(P(u0, v0)[1] + 1.8).toFixed(1)}" fill="#b8ad9b"/>
${front}${dots}${studs}
<g class="nt-run">${waves}</g>
<rect x="82" y="14" width="33" height="30" rx="3" fill="#ffffff" stroke="#c3c9d1" stroke-width=".6"/>
${ntLcd(84.5, 17, 28, 13, txt, true, on ? "#ffb74d" : "#90a4ae", ntFit(txt, 28, 7.4))}
<path d="M89 39 q-2 -2.6 0 -5 q.6 2 2 2.4 q1 1.4 0 2.6 Z" fill="${on ? "#ff7043" : "#c3c9d1"}"/>
<circle cx="101" cy="37" r="2.2" fill="#eceff1" stroke="#b0bec5" stroke-width=".4"/><circle cx="108" cy="37" r="2.2" fill="#eceff1" stroke="#b0bec5" stroke-width=".4"/>
<path d="M99.8 37h2.4M106.8 37h2.4M108 35.8v2.4" stroke="#607d8b" stroke-width=".5"/>
${electric ? `<path d="M98.5 44 V58" stroke="#78909c" stroke-width=".9"/>` : ""}`;
}

// Square spa, three-quarter view
function ntSpa(c) {
  const wa = ntId(), rim = ntId(), cl = ntId(), gl = ntId(), sd = ntId();
  const P = (u, v) => [30 + 80 * u - 22 * v, 40 + 22 * v];
  const pt = (u, v) => P(u, v).map((x) => x.toFixed(1)).join(" ");
  const roundQuad = (a0, a1, b0, b1, dy = 0) => {
    const k = [[a0, b0], [a1, b0], [a1, b1], [a0, b1]].map(([u, v]) => { const [x, y] = P(u, v); return [x, y + dy]; });
    const lerp = (a, b, q) => [a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q];
    let d = "";
    k.forEach((p, i) => { const prev = k[(i + 3) % 4], next = k[(i + 1) % 4]; const a = lerp(p, prev, .16), b = lerp(p, next, .16); d += `${i ? "L" : "M"}${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `; });
    return d + "Z";
  };
  const glow = c.lit || c.bubbles;
  const slatsF = Array.from({ length: 13 }, (_, i) => `<path d="M${14 + i * 6} 63.5 V96" stroke="#3e3128" stroke-width=".6" opacity=".55"/>`).join("");
  const slatsS = Array.from({ length: 5 }, (_, i) => { const q = (i + 1) / 6; return `<path d="M${(88 + 22 * q).toFixed(1)} ${(63.5 - 22 * q).toFixed(1)} V${(96 - 22 * q).toFixed(1)}" stroke="#2f251e" stroke-width=".6" opacity=".55"/>`; }).join("");
  const bubbles = [[.3, .4], [.5, .3], [.7, .45], [.4, .62], [.62, .66], [.22, .55], [.8, .6], [.52, .5]].map(([u, v], i) => { const [x, y] = P(u, v); return `<circle class="nta-pop ntd${(i % 6) + 1}" cx="${x.toFixed(1)}" cy="${(y + 2).toFixed(1)}" r="${1.4 + (i % 3) * .5}" fill="none" stroke="#e0f7fa" stroke-width=".7" opacity="0"/>`; }).join("");
  const steam = [[.35, .4], [.55, .35], [.72, .5]].map(([u, v], i) => { const [x, y] = P(u, v); return `<path class="nta-steam ntd${i + 1}" d="M${x.toFixed(1)} ${(y - 2).toFixed(1)} q-2 -3 0 -6 q2 -3 0 -6" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0"/>`; }).join("");
  const jets = [.25, .4, .6, .75].map((u) => { const [x, y] = P(u, .14); return `<circle cx="${x.toFixed(1)}" cy="${(y + .8).toFixed(1)}" r=".8" fill="#78909c"/>`; }).join("");
  const [hx1, hy1] = P(.12, .15), [hx2, hy2] = P(.86, .15);
  const [gx, gy] = P(.5, .52);
  const txt = c.lcd || "";
  return `<defs>${ntV(wa, glow ? "#4dd0e1" : "#4f8fa3", glow ? "#0097a7" : "#1f5568")}${ntV(rim, "#f4f6f8", "#cfd6dd")}${ntV(cl, "#6d5848", "#4a3b30")}${ntBlur(gl, 3)}${ntV(sd, "#5a483b", "#3a2e26")}</defs>
${ntFoot("7 97.2 89 97.2 111.5 74.8 30 74.8")}${ntFoot("9.5 106 40 106 49 96.8 20 96.8")}
<polygon points="88 62 110 40 110 74 88 96" fill="url(#${sd})"/>${slatsS}
<rect x="8" y="62" width="80" height="34" fill="url(#${cl})"/>${slatsF}
<rect x="8" y="62" width="4" height="34" fill="#3a2e26"/><rect x="84" y="62" width="4" height="34" fill="#3a2e26"/>
<polygon points="8 62 88 62 88 64.4 8 64.4" fill="#9ea7b0"/>
<polygon points="20 89 48 89 39 98 11 98" fill="#8a7260"/>
<polygon points="11 98 39 98 39 105 11 105" fill="#5a483b"/><path d="M11 101.5h28" stroke="#2f251e" stroke-width=".45" opacity=".6"/>
<polygon points="39 98 48 89 48 96 39 105" fill="#3f322a"/>
<polygon points="20 82 48 82 43.5 86.5 15.5 86.5" fill="#9a8270"/>
<polygon points="15.5 86.5 43.5 86.5 43.5 93.5 15.5 93.5" fill="#5a483b"/><path d="M15.5 90h28" stroke="#2f251e" stroke-width=".45" opacity=".6"/>
<polygon points="43.5 86.5 48 82 48 89 43.5 93.5" fill="#3f322a"/>
<path d="M20 82H48M11 98H39" stroke="#b39d8a" stroke-width=".5"/>
<polygon points="88 62 110 40 110 42.4 88 64.4" fill="#8a939c"/>
<polygon points="${pt(0, 0)} ${pt(1, 0)} ${pt(1, 1)} ${pt(0, 1)}" fill="url(#${rim})" stroke="#aab4be" stroke-width=".5"/>
<path d="${roundQuad(.07, .93, .12, .88)}" fill="#dfe8ed" stroke="#b0bec5" stroke-width=".5"/>
${jets}
<path d="${roundQuad(.1, .9, .18, .85, 2)}" fill="url(#${wa})"/>
${glow ? `<ellipse class="nta-glow" cx="${gx.toFixed(1)}" cy="${(gy + 2).toFixed(1)}" rx="20" ry="5" fill="#b2ebf2" filter="url(#${gl})"/>` : ""}
<path d="${roundQuad(.17, .83, .3, .74, 2)}" fill="none" stroke="#ffffff" stroke-width=".6" opacity=".35"/>
<rect x="${(hx1 - 3).toFixed(1)}" y="${(hy1 - 1.4).toFixed(1)}" width="7" height="3" rx="1.5" fill="#37474f"/>
<rect x="${(hx2 - 3).toFixed(1)}" y="${(hy2 - 1.4).toFixed(1)}" width="7" height="3" rx="1.5" fill="#37474f"/>
${c.bubbles ? `<g class="nt-run">${bubbles}</g>` : ""}${c.steam ? `<g class="nt-run">${steam}</g>` : ""}
<rect x="58" y="67" width="27" height="15" rx="1.8" fill="#263238"/>
${ntLcd(59.5, 68.5, 24, 12, txt, true, c.heating ? "#ffb74d" : "#80deea", ntFit(txt, 24, 8.6))}`;
}

// Sauna cabin with a glass door: the stones glow and steam rises inside
// A pellet smoker in three-quarter view (#101), after Traeger's photographs of
// the Timberline: the barrel lid with its end cap, the steel shelf across the
// front, the hopper with its wooden board and controller. Drawn on the
// photograph's own 900 grid. The display and the pellet window are larger than
// life so they read at card size.
function ntPelletTimberline(c) {
  const lid = ntId(), cap = ntId(), box = ntId(), side = ntId(), steel = ntId(), wood = ntId(), gl = ntId(), win = ntId(), pel = ntId();
  const st = c.st || "off", hot = ["ignite", "preheat", "cook"].includes(st);
  const edge = `stroke="#5f666e" stroke-width="2.4" stroke-linejoin="round"`;
  const lvl = c.pellet === null || c.pellet === undefined ? null : Math.max(0, Math.min(100, c.pellet));
  const yl = lvl === null ? 0 : 486 - lvl * .86;
  const wisps = { ignite: 2, preheat: 3, cook: 4, cool: 2 }[st] || 0;
  const count = c.smoke && hot ? 7 : wisps;
  const smoke = [78, 69, 85, 61, 74, 90, 65].slice(0, count).map((x, i) =>
    `<path class="ntg-smoke ntd${(i % 6) + 1}${c.smoke && hot ? " ntg-dense" : ""}" d="M${x} 13 q-3.4 -4.5 0 -9 q3.4 -4.5 0 -9" stroke="#aab2ba" stroke-width="${c.smoke && hot ? 3.4 : 2.4}" fill="none" stroke-linecap="round" opacity="0"/>`).join("");
  const flecks = lvl === null ? "" : [[622, 470], [650, 486], [680, 462], [706, 490], [731, 472], [640, 452], [694, 440], [720, 452], [610, 490], [664, 430]]
    .filter(([, y]) => y > yl + 8).map(([x, y]) => `<rect x="${x}" y="${y}" width="15" height="6" rx="3" fill="#7d4e1d" transform="rotate(${(x * 7) % 60 - 30} ${x} ${y})"/>`).join("");
  const screen = c.alert ? "#ffd9d3" : "#dceefc", ink = c.alert ? "#c62828" : "#14232e";
  const lit = st !== "off" && !c.unav;
  const txt = lit ? c.lcd || "" : "";
  return `<defs>${ntV(lid, "#50565d", "#1f2125")}${ntV(cap, "#3b4047", "#191b1e")}${ntV(box, "#34383e", "#17191c")}${ntV(side, "#24272b", "#101214")}${ntV(wood, "#e6ab62", "#c98a3f")}${ntV(pel, "#d59a4d", "#a66d2a")}${ntBlur(gl, 7)}
<linearGradient id="${steel}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#aeb6be"/></linearGradient>
<clipPath id="${win}"><polygon points="602,400 750,408 750,503 602,486"/></clipPath></defs>
${ntFoot("15 110 66 118 110 100 56 91")}
<g transform="translate(1.25 2.1) scale(.13)">
<polygon points="320,478 352,482 322,640 300,636" fill="#25282c" ${edge}/>
<circle cx="301" cy="650" r="17" fill="#17191c" ${edge}/>
<polygon points="225,644 322,512 322,566 228,664" fill="#2c3035"/>
<polygon points="615,505 645,510 712,680 690,690" fill="#25282c" ${edge}/>
<ellipse cx="702" cy="672" rx="40" ry="54" fill="#17191c" ${edge}/><ellipse cx="702" cy="672" rx="19" ry="28" fill="#2c3035"/>
<polygon points="600,634 655,578 668,640 612,714" fill="url(#${steel})"/>
<path d="M618 650 l14 -18 l9 8 l10 -14" stroke="#7d868f" stroke-width="3.4" fill="none"/>
<polygon points="78,240 196,210 196,262 80,262" fill="url(#${steel})" stroke="#8c959e" stroke-width="2"/>
<path d="M112 244v10M136 240v14M160 235v19" stroke="#6f7881" stroke-width="5" stroke-linecap="round"/>
<polygon points="142,262 196,262 196,302" fill="#aeb6be"/>
<polygon points="228,420 284,430 178,732 136,722" fill="#24272b" ${edge}/>
<path d="M225 330 L572 372 L574 506 L520 500 L262 470 Q226 420 225 330 Z" fill="url(#${box})" ${edge}/>
<polygon points="768,196 825,170 825,502 768,528" fill="url(#${side})" ${edge}/>
<polygon points="578,183 768,196 768,528 574,505" fill="url(#${box})" ${edge}/>
<polygon points="590,186 768,200 768,224 590,212" fill="#23262a"/>
<polygon points="607,178 670,155 815,163 768,194" fill="url(#${wood})"/><polygon points="607,178 768,194 768,203 607,187" fill="#9c6227"/>
<polygon points="136,722 176,730 170,756 134,746" fill="#111315"/>
<circle cx="154" cy="756" r="23" fill="#17191c" ${edge}/><circle cx="154" cy="756" r="8" fill="#6f7881"/>
<polygon points="512,350 562,356 614,772 568,780" fill="#24272b" ${edge}/>
</g>
<g class="nt-run">${smoke}</g>
<g transform="translate(1.25 2.1) scale(.13)">
<path d="M596 38 Q620 36 636 52 C652 80 660 150 660 236 L570 308 L576 150 C578 110 585 70 596 38 Z" fill="url(#${cap})" ${edge}/>
<path d="M608 66 L648 88 L652 122 L604 104 Z" fill="#101214" stroke="#50565d" stroke-width="2.4"/>
<path d="M200 284 C195 190 205 90 245 48 Q258 32 280 30 L596 38 C585 70 578 110 576 150 L570 308 Z" fill="url(#${lid})" ${edge}/>
<path d="M226 150 C232 90 250 56 284 46 L560 52" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".1"/>
<circle cx="592" cy="60" r="3.4" fill="#e8ecef"/><circle cx="589" cy="74" r="3.4" fill="#e8ecef"/><circle cx="586" cy="88" r="3.4" fill="#e8ecef"/>
${lit && !c.small ? "" : `<path d="M318 98 L356 74 L380 86 L408 66 L442 94 L454 86" stroke="#6b7279" stroke-width="3.6" fill="none" stroke-linejoin="round"/>`}
<polygon points="200,284 570,308 570,350 205,316" fill="#15171a" ${edge}/>
${hot ? `<path class="nta-glow" d="M206 287 L564 311" stroke="#ff7a1a" stroke-width="11" stroke-linecap="round" filter="url(#${gl})"/>` : ""}
${c.warm && hot ? `<path class="nta-glow" d="M210 306 L560 330" stroke="#ffb74d" stroke-width="16" stroke-linecap="round" filter="url(#${gl})"/>` : ""}
<path d="M264 264v-14M432 290v-14" stroke="#8c959e" stroke-width="9"/>
<path d="M254 262 L446 292" stroke="#8c959e" stroke-width="24" stroke-linecap="round"/>
<path d="M254 259 L446 289" stroke="url(#${steel})" stroke-width="18" stroke-linecap="round"/>
<circle cx="448" cy="292" r="9" fill="#f28c28"/>
<polygon points="175,322 218,311 545,338 722,350 745,358" fill="#e4e8ec"/>
<polygon points="175,322 745,358 745,386 718,384 178,346" fill="url(#${steel})" stroke="#8c959e" stroke-width="2"/>
<polygon points="730,386 745,386 745,414" fill="#aeb6be"/>
${c.small || c.probeTemp === null || c.probeTemp === undefined ? `<polygon points="296,418 458,440 458,472 296,450" fill="#121416"/>
<polygon points="310,428 440,446 440,462 310,444" fill="#b4582a" stroke="#f0d8c6" stroke-width="2.4"/>
<path d="M322 437 L428 451" stroke="#fff" stroke-width="5" stroke-dasharray="15 5"/>` : ""}
<polygon points="598,226 758,236 758,348 598,340" fill="#101214" stroke="#50565d" stroke-width="2.4"/>
<polygon points="606,306 750,314 750,342 606,334" fill="#d9dee3"/>
<circle cx="634" cy="321" r="11" fill="url(#${steel})" stroke="#6f7881" stroke-width="2"/>
<path d="M660 322h14M682 323h14" stroke="#4b5259" stroke-width="6" stroke-linecap="round"/>
<rect x="710" y="317" width="30" height="13" rx="3" fill="#d32f2f"/>
${c.probe ? `<path d="M608 332 C592 452 492 448 486 322" stroke="${c.probeDone ? "#66bb6a" : "#e8ecef"}" stroke-width="4.6" fill="none" stroke-linecap="round"/><circle cx="608" cy="332" r="6.5" fill="#8c959e"/>` : ""}
${lvl === null ? "" : `<polygon points="602,400 750,408 750,503 602,486" fill="#0d0e10"/><g clip-path="url(#${win})"><path d="M602 ${yl} q37 -7 74 3 t74 5 V510 H602 Z" fill="url(#${pel})"/>${flecks}</g><polygon points="602,400 750,408 750,503 602,486" fill="none" stroke="${lvl <= 15 ? "#e53935" : "#7d868f"}" stroke-width="4"/>`}
<ellipse cx="582" cy="828" rx="59" ry="61" fill="#17191c" ${edge}/>
${Array.from({ length: 16 }, (_, i) => `<path d="M582 770v9" stroke="#3a3f45" stroke-width="5" transform="rotate(${i * 22.5} 582 828)"/>`).join("")}
<circle cx="582" cy="828" r="36" fill="#23262a"/><circle cx="582" cy="828" r="31" fill="none" stroke="#f59e2a" stroke-width="5"/>
</g>
<rect x="80.1" y="33" width="18.6" height="8.6" rx="1" fill="${lit ? screen : "#0b0d0f"}" stroke="#000" stroke-width=".3"${c.alert ? ` class="nta-glow"` : ""}/>
${txt ? `<text x="89.4" y="${(37.3 + ntFit(txt, 18.6, 7.6) * .36).toFixed(2)}" font-size="${ntFit(txt, 18.6, 7.6).toFixed(2)}" font-weight="700" text-anchor="middle" fill="${ink}" ${NT_FONT}>${esc(txt)}</text>` : ""}
${grillTemps(c, 50, 26, 19, 49.5, 52.2, "light")}`;
}
// What the three drawings below share: the smoke, the display, the window
// on the pellets and the shading, on the 120 x 135 field.
function grillSmoke(c, xs, y) {
  const hot = ["ignite", "preheat", "cook"].includes(c.st);
  const dense = c.smoke && hot;
  const count = dense ? xs.length : ({ ignite: 2, preheat: 3, cook: 4, cool: 2 }[c.st] || 0);
  return `<g class="nt-run">${xs.slice(0, count).map((x, i) => `<path class="ntg-smoke ntd${(i % 6) + 1}${dense ? " ntg-dense" : ""}" d="M${x} ${y} q-3.4 -4.5 0 -9 q3.4 -4.5 0 -9" stroke="#aab2ba" stroke-width="${dense ? 3.4 : 2.4}" fill="none" stroke-linecap="round" opacity="0"/>`).join("")}</g>`;
}
function grillLcd(c, x, y, w, h) { const out = grillLcdRaw(c, x, y, w, h); return out ? ntKeep(out) : ""; }
function grillLcdRaw(c, x, y, w, h) {
  const lit = c.st !== "off" && !c.unav;
  const txt = lit ? c.lcd || "" : "";
  const fs = ntFit(txt, w, 7.6);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${!lit ? "#0b0d0f" : c.alert ? "#ffd9d3" : "#dceefc"}" stroke="#000" stroke-width=".3"${c.alert ? ` class="nta-glow"` : ""}/>${txt ? `<text x="${x + w / 2}" y="${(y + h / 2 + fs * .36).toFixed(2)}" font-size="${fs.toFixed(2)}" font-weight="700" text-anchor="middle" fill="${c.alert ? "#c62828" : "#14232e"}" ${NT_FONT}>${esc(txt)}</text>` : ""}`;
}
function grillWindow(c, x, y, w, h) {
  if (c.pellet === null || c.pellet === undefined) return "";
  const lvl = Math.max(0, Math.min(100, c.pellet)), cp = ntId(), pel = ntId();
  const top = y + h - h * lvl / 100;
  return `<defs>${ntV(pel, "#d59a4d", "#a66d2a")}<clipPath id="${cp}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8"/></clipPath></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="#0d0e10"/><g clip-path="url(#${cp})"><path d="M${x} ${top.toFixed(1)} q${w / 4} -1.2 ${w / 2} .3 t${w / 2} .3 V${y + h} H${x} Z" fill="url(#${pel})"/></g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="none" stroke="${lvl <= 15 ? "#e53935" : "#7d868f"}" stroke-width=".55"/>`;
}
const grillHot = (c) => ["ignite", "preheat", "cook"].includes(c.st);
// The temperatures, large enough to read across the room: the grill's on the
// body in the colour of what it is doing, the probe's on a badge of its own
// with a gauge towards its target. The controller then shows the setpoint.
function grillTemps(c, x, y, fs, px, py, ink, plate) {
  if (c.st === "off" || c.unav || c.small) return "";
  const t = c.temp === null || c.temp === undefined ? null : Math.round(c.temp);
  const near = c.aim > 0 && Math.abs(c.temp - c.aim) <= Math.max(6, c.aim * .04);
  const hot = grillHot(c), light = ink === "light";
  const col = c.alert ? (light ? "#ff8a80" : "#c62828") : c.st === "cool" ? (light ? "#81d4fa" : "#0277bd") : hot && near ? (light ? "#a5e6a8" : "#2e7d32") : hot ? (light ? "#ffb74d" : "#d84315") : (light ? "#eef2f5" : "#263238");
  const halo = light ? "#000" : "#fff";
  const big = t === null ? "" : `${plate ? `<rect x="${x - fs * 1.32}" y="${y - fs * .93}" width="${fs * 2.64}" height="${fs * 1.14}" rx="2.4" fill="#101214" opacity=".78"/>` : ""}<text x="${x}" y="${y}" font-size="${fs}" font-weight="800" text-anchor="middle" fill="${col}" stroke="${halo}" stroke-opacity=".45" stroke-width="1.5" style="paint-order:stroke" ${NT_FONT}>${t}\u00b0</text>`;
  if (c.probeTemp === null || c.probeTemp === undefined) return big;
  const w = 30, h = 11.5, x0 = px - w / 2, pv = Math.round(c.probeTemp);
  const pct = c.probeAim > 0 ? Math.max(0, Math.min(1, c.probeTemp / c.probeAim)) : null;
  const done = c.probeDone || (pct !== null && pct >= 1);
  return `${big}<rect x="${x0}" y="${py}" width="${w}" height="${h}" rx="3" fill="#101214" stroke="${done ? "#66bb6a" : "#5f666e"}" stroke-width=".6"/>
<path d="M${x0 + 6} ${py + 2.2}v5" stroke="#e8ecef" stroke-width="1.5" stroke-linecap="round"/><circle cx="${x0 + 6}" cy="${py + 8}" r="1.9" fill="${done ? "#66bb6a" : "#ff8a65"}"/>
<text x="${x0 + 18.5}" y="${py + (pct === null ? 8.4 : 7.4)}" font-size="9" font-weight="800" text-anchor="middle" fill="${done ? "#a5e6a8" : "#fff"}" ${NT_FONT}>${pv}\u00b0</text>
${pct === null ? "" : `<rect x="${x0 + 10}" y="${py + 8.9}" width="17" height="1.3" rx=".6" fill="#3a3f45"/><rect x="${x0 + 10}" y="${py + 8.9}" width="${(17 * pct).toFixed(1)}" height="1.3" rx=".6" fill="${done ? "#66bb6a" : "#ff8a65"}"/>`}`;
}
const GRILL_EDGE = `stroke="#5f666e" stroke-width="2.4" stroke-linejoin="round"`;
// A classic drum on legs, as Pit Boss and Z Grills build it: the hopper and
// its controller on the left, the chimney on the right.
function ntPelletDrum(c) {
  const lid = ntId(), cap = ntId(), box = ntId(), steel = ntId(), gl = ntId();
  const edge = GRILL_EDGE;
  return `<defs>${ntV(lid, "#50565d", "#1f2125")}${ntV(cap, "#3b4047", "#191b1e")}${ntV(box, "#34383e", "#17191c")}${ntBlur(gl, 7)}
<linearGradient id="${steel}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#aeb6be"/></linearGradient></defs>
${ntFoot("14 112 96 116 112 104 34 98")}
<g transform="translate(1.25 2.1) scale(.13)">
<polygon points="300,560 340,560 318,770 286,770" fill="#1c1e22"/><polygon points="600,560 640,560 668,770 636,770" fill="#1c1e22"/>
<circle cx="303" cy="782" r="17" fill="#17191c" ${edge}/><circle cx="652" cy="782" r="17" fill="#17191c" ${edge}/>
<polygon points="222,690 740,690 770,722 196,722" fill="#2c3035" ${edge}/>
<path d="M250 706H728" stroke="#50565d" stroke-width="3" stroke-dasharray="12 8"/>
<polygon points="212,500 272,500 232,812 190,812" fill="#24272b" ${edge}/>
<polygon points="672,500 732,500 782,812 740,812" fill="#24272b" ${edge}/>
<circle cx="208" cy="826" r="23" fill="#17191c" ${edge}/><circle cx="208" cy="826" r="8" fill="#6f7881"/>
<circle cx="762" cy="818" r="46" fill="#17191c" ${edge}/><circle cx="762" cy="818" r="24" fill="#c9d0d6"/><circle cx="762" cy="818" r="9" fill="#17191c"/>
<path d="M628 566 q0 -22 26 -22 q26 0 26 22" stroke="#aeb6be" stroke-width="4" fill="none"/>
<polygon points="622,566 686,566 678,642 630,642" fill="url(#${steel})" stroke="#8c959e" stroke-width="2"/>
<rect x="648" y="128" width="40" height="150" fill="url(#${box})" ${edge}/>
<rect x="634" y="112" width="68" height="20" rx="4" fill="#111315" ${edge}/>
</g>
${grillSmoke(c, [86.5, 84, 89, 85, 88, 83, 90], 15)}
<g transform="translate(1.25 2.1) scale(.13)">
<polygon points="682,418 866,418 884,446 682,446" fill="#3b4047" ${edge}/>
<path d="M610 500 L610 300 C610 256 590 224 560 216 L600 216 Q650 222 674 274 C686 306 688 400 688 500 Z" fill="url(#${cap})" ${edge}/>
<path d="M216 500 L216 330 C216 250 262 214 336 214 L560 216 C590 224 610 256 610 300 L610 500 Z" fill="url(#${lid})" ${edge}/>
<path d="M240 300 C246 262 276 236 330 232 L548 234" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".1"/>
<circle cx="412" cy="258" r="13" fill="#d9dee3"/>
<path d="M216 372 L610 372 L688 372" stroke="#0c0d0f" stroke-width="5"/>
${grillHot(c) ? `<path class="nta-glow" d="M222 373 L606 373" stroke="#ff7a1a" stroke-width="11" stroke-linecap="round" filter="url(#${gl})"/>` : ""}
${c.warm && grillHot(c) ? `<path class="nta-glow" d="M226 392 L602 392" stroke="#ffb74d" stroke-width="16" stroke-linecap="round" filter="url(#${gl})"/>` : ""}
<path d="M312 340v-20M508 340v-20" stroke="#8c959e" stroke-width="9"/>
<path d="M300 322 Q410 306 520 322" stroke="url(#${steel})" stroke-width="18" stroke-linecap="round" fill="none"/>
<polygon points="210,500 690,500 690,540 210,540" fill="#17191c" ${edge}/>
<polygon points="34,316 62,288 240,288 224,316" fill="#3b4047" ${edge}/>
<polygon points="34,316 224,316 224,596 42,596" fill="url(#${box})" ${edge}/>
<rect x="52" y="334" width="156" height="128" rx="6" fill="#101214" stroke="#50565d" stroke-width="2.4"/>
<circle cx="80" cy="440" r="11" fill="url(#${steel})" stroke="#6f7881" stroke-width="2"/><path d="M108 441h14M130 441h14" stroke="#7d868f" stroke-width="6" stroke-linecap="round"/><rect x="160" y="434" width="34" height="13" rx="3" fill="#d32f2f"/>
${c.probe ? `<path d="M210 450 C226 520 258 516 262 392" stroke="${c.probeDone ? "#66bb6a" : "#e8ecef"}" stroke-width="4.6" fill="none" stroke-linecap="round"/><circle cx="210" cy="450" r="6.5" fill="#8c959e"/>` : ""}
</g>
${grillLcd(c, 9.4, 46.8, 21, 9.4)}${grillWindow(c, 9.6, 64.5, 20.4, 12)}
${grillTemps(c, 56, 65, 16, 62, 76, "light")}`;
}
// A recteq on its cart: the lid black above, steel below, the two horn
// handles, the hopper on the right and a shelf under the frame.
function ntPelletCart(c) {
  const lid = ntId(), low = ntId(), cap = ntId(), box = ntId(), steel = ntId(), gl = ntId();
  const edge = GRILL_EDGE;
  const horn = (x, f) => `<path d="M${x} 320 C${x + f * 30} 300 ${x + f * 66} 336 ${x + f * 104} 316" stroke="url(#${steel})" stroke-width="13" stroke-linecap="round" fill="none"/>`;
  return `<defs>${ntV(lid, "#3f444a", "#14161a")}${ntV(low, "#f1f3f5", "#b4bcc4")}${ntV(cap, "#c7ced5", "#8e979f")}${ntV(box, "#34383e", "#17191c")}${ntBlur(gl, 7)}
<linearGradient id="${steel}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#aeb6be"/></linearGradient></defs>
${ntFoot("14 112 102 114 114 104 34 98")}
${grillSmoke(c, [70, 62, 76, 56, 66, 80, 59], 25)}
<g transform="translate(1.25 2.1) scale(.13)">
<polygon points="268,590 306,590 306,770 274,770" fill="#1c1e22"/><polygon points="664,590 702,590 708,770 672,770" fill="#1c1e22"/>
<circle cx="290" cy="782" r="17" fill="#17191c" ${edge}/><circle cx="690" cy="782" r="17" fill="#17191c" ${edge}/>
<polygon points="168,694 776,694 796,728 150,728" fill="#2c3035" ${edge}/>
<path d="M186 711H764" stroke="#7d868f" stroke-width="3" stroke-dasharray="10 6"/>
<polygon points="158,540 206,540 182,812 142,812" fill="#24272b" ${edge}/>
<polygon points="742,540 790,540 826,812 786,812" fill="#24272b" ${edge}/>
<circle cx="160" cy="826" r="23" fill="#17191c" ${edge}/><circle cx="160" cy="826" r="8" fill="#6f7881"/>
<circle cx="806" cy="826" r="23" fill="#17191c" ${edge}/><circle cx="806" cy="826" r="8" fill="#6f7881"/>
<path d="M212 568 q0 -20 22 -20 q22 0 22 20" stroke="#aeb6be" stroke-width="4" fill="none"/>
<polygon points="206,568 262,568 256,636 212,636" fill="url(#${steel})" stroke="#8c959e" stroke-width="2"/>
<polygon points="630,296 668,262 838,262 816,296" fill="#50565d" ${edge}/>
<polygon points="630,296 816,296 816,482 630,482" fill="url(#${box})" ${edge}/>
<polygon points="816,296 838,262 838,446 816,482" fill="#17191c" ${edge}/>
<rect x="646" y="312" width="156" height="128" rx="6" fill="#101214" stroke="#50565d" stroke-width="2.4"/>
<circle cx="674" cy="418" r="11" fill="url(#${steel})" stroke="#6f7881" stroke-width="2"/><path d="M700 419h14M722 419h14" stroke="#7d868f" stroke-width="6" stroke-linecap="round"/><rect x="752" y="412" width="34" height="13" rx="3" fill="#d32f2f"/>
<path d="M556 482 L556 300 C556 240 536 196 498 186 L560 188 Q612 196 636 262 C646 300 648 400 648 482 Z" fill="url(#${cap})" ${edge}/>
<path d="M126 482 L126 300 C126 232 164 186 238 186 L498 186 C536 196 556 240 556 300 L556 482 Z" fill="url(#${low})" ${edge}/>
<path d="M126 360 L126 300 C126 232 164 186 238 186 L498 186 C536 196 556 240 556 300 L556 360 Z" fill="url(#${lid})" stroke="#5f666e" stroke-width="2.4"/>
<path d="M148 290 C152 244 186 208 240 204 L490 206" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".1"/>
<circle cx="340" cy="228" r="24" fill="#e6eaee" stroke="#8c959e" stroke-width="3"/><path d="M340 228 L352 214" stroke="#c62828" stroke-width="4"/>
${grillHot(c) ? `<path class="nta-glow" d="M132 361 L552 361" stroke="#ff7a1a" stroke-width="11" stroke-linecap="round" filter="url(#${gl})"/>` : ""}
${c.warm && grillHot(c) ? `<path class="nta-glow" d="M136 386 L548 386" stroke="#ffb74d" stroke-width="16" stroke-linecap="round" filter="url(#${gl})"/>` : ""}
${horn(182, 1)}${horn(392, 1)}
<polygon points="118,482 820,482 820,560 118,560" fill="#17191c" ${edge}/>
<rect x="404" y="506" width="90" height="28" rx="3" fill="#2c3035" stroke="#8c959e" stroke-width="2"/>
${c.probe ? `<path d="M640 430 C624 530 560 540 546 392" stroke="${c.probeDone ? "#2e7d32" : "#4b5259"}" stroke-width="4.6" fill="none" stroke-linecap="round"/><circle cx="640" cy="430" r="6.5" fill="#8c959e"/>` : ""}
</g>
${grillLcd(c, 86.4, 43.8, 21, 9.4)}${grillWindow(c, 86.6, 65.4, 20.4, 8.6)}
${grillTemps(c, 44, 63, 16, 62, 76, "dark")}`;
}
// A vertical smoker: the tall cabinet behind its glass door, the racks, the
// chimney on top and the shelf at its side.
function ntPelletVertical(c) {
  const body = ntId(), sd = ntId(), glass = ntId(), steel = ntId(), glow = ntId();
  const edge = GRILL_EDGE, hot = grillHot(c);
  const racks = [300, 360, 420, 480, 540].map((y) => `<path d="M344 ${y}H606" stroke="#c9d0d6" stroke-width="5"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${362 + i * 32} ${y - 4}v8" stroke="#8c959e" stroke-width="2.4"/>`).join("")}`).join("");
  return `<defs>${ntV(body, "#3b4047", "#191b1e")}${ntV(sd, "#25282c", "#101214")}${ntV(glass, "#5a6168", "#2d3136")}
<radialGradient id="${glow}" cx=".5" cy=".82" r=".9"><stop offset="0" stop-color="#ff8a3d" stop-opacity="${hot ? .85 : 0}"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
<linearGradient id="${steel}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#aeb6be"/></linearGradient></defs>
${ntFoot("30 113 88 115 104 106 46 102")}
<g transform="translate(1.25 2.1) scale(.13)">
<polygon points="418,66 498,66 498,92 418,92" fill="#111315" ${edge}/><rect x="434" y="90" width="48" height="76" fill="url(#${sd})" ${edge}/>
</g>
${grillSmoke(c, [61, 58.5, 63.5, 60, 62.5, 57.5, 64.5], 10)}
<g transform="translate(1.25 2.1) scale(.13)">
<polygon points="330,664 382,664 342,800 300,800" fill="#24272b" ${edge}/>
<polygon points="568,664 620,664 660,800 618,800" fill="#24272b" ${edge}/>
<circle cx="322" cy="818" r="24" fill="#17191c" ${edge}/><circle cx="322" cy="818" r="8" fill="#6f7881"/>
<circle cx="640" cy="818" r="24" fill="#17191c" ${edge}/><circle cx="640" cy="818" r="8" fill="#6f7881"/>
<polygon points="700,364 868,352 886,376 700,392" fill="#3b4047" ${edge}/>
<polygon points="292,152 342,112 736,112 680,152" fill="#50565d" ${edge}/>
<polygon points="680,152 736,112 736,632 680,672" fill="url(#${sd})" ${edge}/>
<rect x="292" y="152" width="388" height="520" rx="16" fill="url(#${body})" ${edge}/>
<rect x="324" y="258" width="304" height="310" rx="10" fill="#101214" stroke="#50565d" stroke-width="3"/>
<rect x="336" y="270" width="280" height="286" rx="6" fill="url(#${glass})"/>
${racks}
<rect x="336" y="270" width="280" height="286" rx="6" fill="url(#${glow})"${hot ? ` class="nta-warm"` : ""}/>
${c.warm && hot ? `<rect class="nta-glow" x="336" y="470" width="280" height="86" fill="#ffb74d" opacity=".5"/>` : ""}
<path d="M352 282 L420 282 L352 420 Z" fill="#fff" opacity=".1"/>
<rect x="638" y="296" width="22" height="200" rx="9" fill="url(#${steel})" stroke="#8c959e" stroke-width="2"/>
<circle cx="342" cy="210" r="11" fill="url(#${steel})" stroke="#6f7881" stroke-width="2"/><rect x="600" y="202" width="34" height="14" rx="3" fill="#d32f2f"/>
${c.probe ? `<path d="M600 240 C690 260 660 430 606 420" stroke="${c.probeDone ? "#66bb6a" : "#e8ecef"}" stroke-width="4.6" fill="none" stroke-linecap="round"/><circle cx="600" cy="240" r="6.5" fill="#8c959e"/>` : ""}
</g>
${grillLcd(c, 49.6, 23.6, 28, 9.8)}${grillWindow(c, 44.4, 78, 38.6, 8.4)}
${grillTemps(c, 63, 54, 18, 63, 60, "light", true)}`;
}
const GRILL_DRAW = { timberline: ntPelletTimberline, drum: ntPelletDrum, cart: ntPelletCart, vertical: ntPelletVertical };
function ntPelletGrill(c) { return (GRILL_DRAW[c.layout] || ntPelletTimberline)(c); }
function ntSauna(c) {
  const g = ntId(), cp = ntId(), gl = ntId(), inside = ntId(), st = ntId();
  const on = c.on;
  const planks = Array.from({ length: 14 }, (_, i) => { const y = 24 + i * 6; return `<rect x="10" y="${y}" width="90" height="6" fill="${i % 2 ? "#c48d58" : "#cf9963"}"/><path d="M12 ${y + 3} q14 -1.2 28 0 t28 0 t30 .4" stroke="#a8713f" stroke-width=".35" fill="none" opacity=".7"/>`; }).join("");
  const side = Array.from({ length: 14 }, (_, i) => `<polygon points="100 ${24 + i * 6} 112 ${16 + i * 6} 112 ${22 + i * 6} 100 ${30 + i * 6}" fill="${i % 2 ? "#9c6b3f" : "#a87447"}"/>`).join("");
  const stones = [[42, 79], [46, 78], [50, 79.4], [44, 76], [48, 75.6], [46.2, 73.8], [40.6, 76.6], [51.4, 76.4]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${on ? ["#ff7043", "#ff8a65", "#f4511e"][i % 3] : ["#78716c", "#8b8580", "#6b6560"][i % 3]}" stroke="${on ? "#bf360c" : "#57524d"}" stroke-width=".4"/>`).join("");
  const steam = [[44, 70], [48, 69], [40, 71], [50, 66]].map(([x, y], i) => `<path class="nta-steam ntd${i + 1}" d="M${x} ${y} q-2 -3 0 -6 q2 -3 0 -6" stroke="#fff3e0" stroke-width="2" fill="none" stroke-linecap="round" opacity="0"/>`).join("");
  // The dial reads from 0 to 120 degrees over 240 of its turn.
  const deg = c.temp === null || c.temp === undefined ? -120 : -120 + Math.max(0, Math.min(120, c.temp)) * 2;
  const txt = c.lcd || "";
  return `<defs>${ntV(g, on ? "#a35a26" : "#4b3223", on ? "#6d3b19" : "#2b1d14")}${ntBlur(gl, 2.4)}<clipPath id="${cp}"><rect x="18" y="32" width="36" height="71"/></clipPath>${ntV(st, "#5d6670", "#363c43")}
<radialGradient id="${inside}" cx=".5" cy=".1" r=".9"><stop offset="0" stop-color="#ffcc80" stop-opacity="${on ? .75 : 0}"/><stop offset="1" stop-color="#ffcc80" stop-opacity="0"/></radialGradient></defs>
${ntFoot("8 110.6 101.5 110.6 113.5 101.6 21 101.6")}
${side}
<path d="M7 18 L19 10 L115 10 L103 18 Z" fill="#7b4f2d"/><path d="M103 18 L115 10 L115 16 L103 24 Z" fill="#5b3a22"/>
<rect x="7" y="18" width="96" height="6" fill="#8d5a34"/>
${planks}
<rect x="15" y="29" width="42" height="77" rx="1" fill="#8d5a34"/>
<g clip-path="url(#${cp})">
<rect x="18" y="32" width="36" height="71" fill="url(#${g})"/>
${Array.from({ length: 12 }, (_, i) => `<path d="M18 ${36 + i * 6}h36" stroke="#000" stroke-width=".4" opacity=".25"/>`).join("")}
<rect x="18" y="32" width="36" height="71" fill="url(#${inside})"/>
<rect x="18" y="58" width="36" height="4" fill="#d9a46d"/><rect x="18" y="62" width="36" height="7" fill="#b07a46"/>
<path d="M18 64.5h36M18 67h36" stroke="#8d5a34" stroke-width=".4"/>
<rect x="18" y="84" width="20" height="3.4" fill="#d9a46d"/><rect x="18" y="87.4" width="20" height="15.6" fill="#b07a46"/>
<path d="M22 78 h8 l-1 6 h-6 Z" fill="#a1663a" stroke="#6d4123" stroke-width=".4"/><path d="M22.4 80h7.2M22.7 82.4h6.6" stroke="#cfd8dc" stroke-width=".6"/>
<path d="M28 79 L33 70" stroke="#6d4123" stroke-width=".9" stroke-linecap="round"/>
<rect x="39" y="80" width="14" height="23" rx="1" fill="url(#${st})"/>
${[41.5, 44.5, 47.5, 50.5].map((x) => `<path d="M${x} 81v21" stroke="#22272c" stroke-width=".8"/>`).join("")}
${on ? `<ellipse class="nta-glow" cx="46" cy="77" rx="9" ry="5" fill="#ff7043" filter="url(#${gl})"/>` : ""}
${stones}<g class="nt-run">${steam}</g>
</g>
<rect x="18" y="32" width="36" height="71" fill="#3b2412" opacity="${on ? .18 : .35}"/>
<path d="M20 34 L30 34 L20 60 Z" fill="#fff" opacity=".14"/>
<rect x="19.6" y="50" width="3.6" height="26" rx="1.6" fill="#e2b07a" stroke="#8d5a34" stroke-width=".5"/>
<rect x="63" y="32" width="33" height="25" rx="2.2" fill="#263238"/>
${ntLcd(65.5, 35, 28, 13, txt, true, on ? "#ff9800" : "#90a4ae", ntFit(txt, 28, 9.4))}
<circle cx="70" cy="52.6" r="1.4" fill="${on ? "#ff7043" : "#546e7a"}"/><circle cx="79.5" cy="52.6" r="1.4" fill="#546e7a"/><circle cx="89" cy="52.6" r="1.4" fill="#546e7a"/>
<circle cx="79.5" cy="77" r="11" fill="#8d5a34"/><circle cx="79.5" cy="77" r="9.2" fill="#fbf3e6"/>
${Array.from({ length: 11 }, (_, i) => `<path d="M79.5 69.4 V71.2" stroke="#6d4c41" stroke-width=".6" transform="rotate(${-120 + i * 24} 79.5 77)"/>`).join("")}
<path d="M73 77.5 A6.6 6.6 0 0 1 75 72" stroke="#42a5f5" stroke-width="1" fill="none"/><path d="M84 72 A6.6 6.6 0 0 1 86 77.5" stroke="#ef5350" stroke-width="1" fill="none"/>
<text x="79.5" y="83.6" font-size="3.6" text-anchor="middle" fill="#6d4c41" font-weight="700" ${NT_FONT}>\u00b0C</text>
<path d="M79.5 77 V69.8" stroke="#c62828" stroke-width=".9" stroke-linecap="round" transform="rotate(${deg} 79.5 77)"/><circle cx="79.5" cy="77" r="1.2" fill="#3e2723"/>
<rect x="9" y="106" width="92" height="4" fill="#6d4123"/>`;
}

// Planted aquarium on its cabinet
function ntAquarium(c) {
  const wa = ntId(), cab = ntId(), sand = ntId(), ray = ntId(), gl = ntId();
  const on = c.on;
  const neon = (x, y) => `<g transform="translate(${x} ${y})"><ellipse rx="2.8" ry="1" fill="#cfd8dc"/><path d="M-2.4 -.2 H1.8" stroke="#00b0ff" stroke-width=".7"/><path d="M-2.6 .35 H0" stroke="#ff1744" stroke-width=".6"/><path d="M2.6 0 l1.4 -1 v2 Z" fill="#cfd8dc"/></g>`;
  const angel = `<g transform="translate(46 50)"><path d="M6 0 L0 -4.5 L-2 -12 L-3.2 -3.5 L-7 -1.2 L-7.6 1.2 L-3.2 3.5 L-2 12 L0 4.5 Z" fill="#eceff1" stroke="#90a4ae" stroke-width=".4"/><path d="M-.2 -4.4 V4.4 M-3 -3 V3 M2.6 -2.4 V2.4" stroke="#37474f" stroke-width=".9"/><circle cx="3.6" cy="-.6" r=".7" fill="#212121"/></g>`;
  const platy = `<g transform="translate(34 70)"><path d="M4 0 Q0 -3 -3 0 Q0 3 4 0 Z" fill="#ff8f00"/><path d="M-3 0 L-6 -2.4 L-6 2.4 Z" fill="#ffb300"/><circle cx="2.4" cy="-.4" r=".5" fill="#212121"/></g>`;
  const grassLeaves = [18, 21, 24, 27, 30].map((x, i) => `<path class="nta-sway ntd${i + 1}" d="M${x} 82 C${x - 3} 66 ${x + 3} 52 ${x - 1} 36" stroke="${["#2e7d32", "#43a047", "#388e3c"][i % 3]}" stroke-width="1.3" fill="none"/>`).join("");
  const redPlant = `<g class="nta-sway ntd3"><path d="M82 82 V48" stroke="#8d3a2b" stroke-width=".8"/>${[50, 56, 62, 68, 74].map((y) => `<ellipse cx="79.6" cy="${y}" rx="2.6" ry="1" fill="#e64a19" transform="rotate(-20 79.6 ${y})"/><ellipse cx="84.4" cy="${y + 1.5}" rx="2.6" ry="1" fill="#ff7043" transform="rotate(20 84.4 ${y + 1.5})"/>`).join("")}</g>`;
  const carpet = Array.from({ length: 20 }, (_, i) => `<circle cx="${40 + i * 2.2}" cy="${81.6 - (i % 3) * .5}" r="1.1" fill="${i % 2 ? "#66bb6a" : "#7cb342"}"/>`).join("");
  const bubbles = [0, 1, 2, 3].map((i) => `<circle class="nta-rise ntd${i + 1}" cx="${64 + (i % 2) * .8}" cy="76" r="${(.9 - i * .1).toFixed(1)}" fill="#e1f5fe" opacity="0"/>`).join("");
  return `<defs>${ntV(wa, on ? "#b3e5fc" : "#2c3f4c", on ? "#1976d2" : "#0f1d27")}${ntV(cab, "#5d4037", "#3e2723")}${ntV(sand, "#e8d6ad", "#c2a76f")}${ntBlur(gl, 1.4)}
<linearGradient id="${ray}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${ntShadow(60, 111.4, 47)}
<rect x="16" y="88" width="88" height="23" rx="1.5" fill="url(#${cab})"/>
<path d="M60 90v19" stroke="#2b1b17" stroke-width=".7"/><circle cx="57.4" cy="99" r="1" fill="#bcaaa4"/><circle cx="62.6" cy="99" r="1" fill="#bcaaa4"/>
<rect x="13" y="20" width="94" height="5" rx="1.5" fill="#263238"/>
<rect x="16" y="24.4" width="88" height="1.3" rx=".6" fill="${on ? "#e3f2fd" : "#455a64"}"/>
${on ? `<rect x="16" y="24" width="88" height="2.4" fill="#e3f2fd" filter="url(#${gl})"/>` : ""}
<rect x="14" y="26" width="92" height="60" fill="url(#${wa})"/>
${on ? `<g class="nta-rays"><polygon points="28 26 36 26 30 84 20 84" fill="url(#${ray})"/><polygon points="54 26 61 26 58 84 48 84" fill="url(#${ray})"/><polygon points="82 26 88 26 90 84 80 84" fill="url(#${ray})"/></g>` : ""}
<path d="M14 40 q10 -6 20 0 t20 0 t20 0 t20 0 t12 -2 V86 H14 Z" fill="#000" opacity="${on ? .06 : .2}"/>
<rect x="17" y="34" width="2.8" height="34" rx="1.4" fill="#cfd8dc" opacity=".7"/><rect x="17.4" y="34" width="2" height="5" rx="1" fill="${c.heater ? "#ff5722" : "#78909c"}"/>
<rect x="96" y="32" width="8" height="30" rx="1.5" fill="#263238"/><path d="M97.6 36v22M100 36v22M102.4 36v22" stroke="#455a64" stroke-width=".7"/>
${grassLeaves}${redPlant}
<path d="M88 84 C86 74 92 70 98 66 M92 74 L99 72 M90 78 L84 70" stroke="#6d4c41" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M30 86 Q30 76 38 75 Q46 76 46 86 Z" fill="#78909c"/><path d="M33 80 Q37 77 41 79" stroke="#b0bec5" stroke-width=".6" fill="none"/>
<path d="M14 82 q6 -2 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t8 0 V86 H14 Z" fill="url(#${sand})"/>${carpet}
<circle cx="64" cy="83" r="1.6" fill="#90a4ae"/><g class="nt-run">${bubbles}</g>
<g class="nta-swim">${angel}</g>
<g class="nta-swimB"><g>${neon(76, 44)}${neon(80, 41)}${neon(83, 45.6)}${neon(78, 48)}${neon(86, 42.4)}</g></g>
<g class="nta-swim ntd3">${platy}</g>
${on ? "" : `<rect x="14" y="26" width="92" height="60" fill="#06121b" opacity=".35"/>`}
<path d="M20 28 L30 28 L18 60 Z" fill="#fff" opacity=".1"/>
<rect x="13" y="85" width="94" height="4" rx="1" fill="#263238"/>
<rect x="13.4" y="25.4" width="93.2" height="60.4" fill="none" stroke="#90a4ae" stroke-width=".7" opacity=".7"/>
${c.lcd ? `<rect x="71" y="64" width="31" height="13" rx="2" fill="#eceff1" stroke="#90a4ae" stroke-width=".5"/>${ntLcd(72.5, 65.4, 28, 10.2, c.lcd, true, "#69f0ae", ntFit(c.lcd, 28, 7.2))}` : ""}`;
}

// Linky meter on its wall
// The meter's pulse LED: red on what is drawn, green on what is fed in (#77),
// and the arrow that points back to the grid.
function ntPulse(c) { return c.exp ? "#00e676" : "#ff1744"; }
function ntExportArrow(x, y) {
  return `<path d="M${x} ${y} l3.6 -2.6 v1.6 h4 v2 h-4 v1.6 Z" fill="#2e7d32"/>`;
}
function ntLinky(c) {
  const b = ntId(), cv = ntId(), sc = ntId(), sh = ntId();
  const val = c.lcd || "";
  return `<defs>${ntV(b, "#d9e36a", "#bccb3d")}${ntV(cv, "#c3d03f", "#a4b22c")}${ntV(sc, "#c7d1b8", "#a8b598")}<filter id="${sh}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.8"/></filter></defs>
<rect x="33.6" y="8" width="56" height="106" rx="8" fill="#000" opacity=".22" filter="url(#${sh})"/>
<rect x="32" y="6" width="56" height="106" rx="8" fill="url(#${b})" stroke="#9aa82a" stroke-width=".6"/>
<path d="M36 10 H50" stroke="#fff" stroke-width="1.4" opacity=".55" stroke-linecap="round"/>
<rect x="37" y="14" width="46" height="28" rx="2.4" fill="#5a6347"/>
<rect x="39" y="16" width="42" height="24" rx="1.4" fill="url(#${sc})"/>
<text x="41.5" y="23.4" font-size="6" font-weight="700" fill="#1f2a18" ${NT_FONT}>${esc(c.label || "")}</text>
${c.tariff ? `<text x="78.5" y="23.4" font-size="4.6" text-anchor="end" fill="#1f2a18" ${NT_FONT}>${esc(c.tariff)}</text>` : ""}
<text x="60" y="35.4" font-size="${ntFit(val, 42, 10).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#1f2a18" ${NT_FONT}>${esc(val)}</text>
<circle cx="45" cy="50" r="3.6" fill="#eef3c7" stroke="#8c9a24" stroke-width=".6"/><path d="M43.2 50h3.6M45 48.2v3.6" stroke="#4b5320" stroke-width=".7"/>
<circle cx="56" cy="50" r="3.6" fill="#eef3c7" stroke="#8c9a24" stroke-width=".6"/><path d="M54.2 50h3.6" stroke="#4b5320" stroke-width=".7"/>
<circle cx="74" cy="50" r="2.4" fill="${c.exp ? "#0d3d1a" : "#5d1010"}"/>${c.unav || c.still ? "" : `<circle class="${c.heavy ? "nta-blinkfast" : "nta-blink"}" cx="74" cy="50" r="2.4" fill="${ntPulse(c)}"/>`}${c.exp ? ntExportArrow(62.4, 50) : ""}
<text x="74" y="57.4" font-size="3.6" text-anchor="middle" fill="#4b5320" ${NT_FONT}>1 Wh</text>
<path d="M32 62 H88" stroke="#8c9a24" stroke-width=".7"/>
<rect x="34" y="64" width="52" height="40" rx="4" fill="url(#${cv})"/>
<text x="60" y="84" font-size="11" font-weight="700" font-style="italic" text-anchor="middle" fill="#ffffff" ${NT_FONT}>linky</text>
<path d="M45 87.4 Q60 92 76 86" stroke="#ffffff" stroke-width="1.1" fill="none" stroke-linecap="round"/>
<circle cx="38.6" cy="68.4" r="1.4" fill="#8c9a24"/><circle cx="81.4" cy="68.4" r="1.4" fill="#8c9a24"/>
<path d="M81.4 69.8 q2 6 -1 10" stroke="#1565c0" stroke-width=".5" fill="none"/><rect x="78.8" y="79.4" width="3.6" height="2.4" rx=".5" fill="#1565c0"/>
<path d="M48 112 V122" stroke="#5d4037" stroke-width="3"/><path d="M56 112 V122" stroke="#1565c0" stroke-width="3"/><path d="M64 112 V122" stroke="#5d4037" stroke-width="3"/><path d="M72 112 V122" stroke="#1565c0" stroke-width="3"/>`;
}

// A meter's index on rolling drums: whole units in white on black, the
// fraction in red, the last drum turning while something flows (#68).
function ntDrums(x, y, cw, h, text, dec, on) {
  const [ip, fp = ""] = String(text || "").split(".");
  const whole = ip.replace(/\D/g, "").slice(-5).padStart(5, "0");
  const frac = fp.replace(/\D/g, "").slice(0, dec).padEnd(dec, "0");
  const cells = (whole + frac).split("");
  const cid = ntId();
  let out = `<defs><clipPath id="${cid}"><rect x="${x + (cells.length - 1) * cw + .4}" y="${y + .4}" width="${cw - .8}" height="${h - .8}"/></clipPath></defs>`;
  cells.forEach((d, i) => {
    const red = i >= 5;
    const cx = x + i * cw;
    out += `<rect x="${cx + .4}" y="${y + .4}" width="${cw - .8}" height="${h - .8}" rx=".6" fill="${red ? "#b71c1c" : "#15191d"}"/>`;
    if (i === cells.length - 1) {
      // The last drum: ten figures stacked, rolling up while on.
      const col = Array.from({ length: 11 }, (_, k) => `<text x="${cx + cw / 2}" y="${(y + h * .76 + k * h).toFixed(2)}" font-size="${(h * .72).toFixed(2)}" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>${(Number(d) + k) % 10}</text>`).join("");
      out += `<g clip-path="url(#${cid})"><g class="${on ? "nta-roll" : ""}" style="--roll:${-10 * h}px">${col}</g></g>`;
    } else {
      out += `<text x="${cx + cw / 2}" y="${(y + h * .76).toFixed(2)}" font-size="${(h * .72).toFixed(2)}" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>${d}</text>`;
    }
  });
  return out + `<rect x="${x}" y="${y}" width="${cells.length * cw}" height="${h}" rx="1" fill="none" stroke="#0b0d10" stroke-width=".8"/>
<rect x="${x}" y="${y}" width="${cells.length * cw}" height="${(h * .35).toFixed(2)}" fill="#fff" opacity=".08"/>`;
}
const ntCable = (x0, n) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + i * 8} 108 V122" stroke="${i % 2 ? "#1565c0" : "#5d4037"}" stroke-width="3"/>`).join("");
// A digital electricity meter on its wall: its display, a pulse LED, its
// plate and its cables.
function ntMeterBox(c) {
  const b = ntId(), sh = ntId();
  return `<defs>${ntV(b, "#f5f7f9", "#d3d9df")}${ntBlur(sh, 2.2)}</defs>
<rect x="31.6" y="9.4" width="60" height="98" rx="6" fill="#000" opacity=".2" filter="url(#${sh})"/>
<rect x="30" y="8" width="60" height="98" rx="6" fill="url(#${b})" stroke="#a7b0b9" stroke-width=".7"/>
<path d="M34 12 H52" stroke="#fff" stroke-width="1.4" opacity=".7" stroke-linecap="round"/>
<rect x="35" y="15" width="50" height="30" rx="2.6" fill="#3c4550"/>
${ntLcd(37, 17, 46, 17, c.lcd, !c.unav, "#9be7ff", ntFit(c.lcd, 46, 10))}
${c.today ? `<text x="60" y="41.4" font-size="${ntFit(c.today, 44, 5).toFixed(1)}" text-anchor="middle" fill="#c8d2dc" ${NT_FONT}>${esc(c.today)}</text>` : ""}
<circle cx="42" cy="54" r="2.4" fill="${c.exp ? "#0d3d1a" : "#4a1010"}"/>${c.unav || c.still ? "" : `<circle class="${c.heavy ? "nta-blinkfast" : "nta-blink"}" cx="42" cy="54" r="2.4" fill="${ntPulse(c)}"/>`}${c.exp ? ntExportArrow(47.4, 54) : ""}
<text x="42" y="61" font-size="3.4" text-anchor="middle" fill="#5d6773" ${NT_FONT}>imp/kWh</text>
<rect x="64" y="51" width="8" height="5" rx="2.5" fill="#9aa4ae"/><rect x="75" y="51" width="8" height="5" rx="2.5" fill="#9aa4ae"/>
<rect x="38" y="66" width="44" height="24" rx="2" fill="#e9edf0" stroke="#b9c1c9" stroke-width=".5"/>
<text x="42" y="74" font-size="4.6" font-weight="700" fill="#37414b" ${NT_FONT}>kWh</text>
<text x="42" y="80" font-size="3" fill="#6b7580" ${NT_FONT}>230 V  50 Hz  5(60) A</text>
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${55 + i * 2.1}" y="83" width="${i % 3 ? .9 : 1.5}" height="5" fill="#37414b"/>`).join("")}
<rect x="34" y="94" width="52" height="12" rx="3" fill="#c7ced5" stroke="#a7b0b9" stroke-width=".5"/>
${ntCable(48, 4)}`;
}
// A North American meter: a glass dome on its socket box, a dial plate and a
// display under the glass.
function ntMeterDome(c) {
  const box = ntId(), gl = ntId(), sh = ntId(), rim = ntId();
  return `<defs>${ntV(box, "#c9d0d6", "#9aa4ad")}${ntV(rim, "#eef1f3", "#a9b2ba")}${ntBlur(sh, 2.2)}
<radialGradient id="${gl}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset=".5" stop-color="#dbeaf3" stop-opacity=".25"/><stop offset="1" stop-color="#9fb8c8" stop-opacity=".4"/></radialGradient></defs>
<rect x="27.6" y="13.4" width="68" height="94" rx="8" fill="#000" opacity=".2" filter="url(#${sh})"/>
<rect x="26" y="12" width="68" height="94" rx="8" fill="url(#${box})" stroke="#8a949d" stroke-width=".7"/>
<circle cx="60" cy="56" r="31" fill="url(#${rim})" stroke="#7d8790" stroke-width=".8"/>
<circle cx="60" cy="56" r="27" fill="#f6f8f9"/>
<text x="60" y="38" font-size="5" font-weight="700" text-anchor="middle" fill="#37414b" ${NT_FONT}>kWh</text>
<text x="60" y="43" font-size="3" text-anchor="middle" fill="#6b7580" ${NT_FONT}>CL200  240V  3W</text>
${ntLcd(44, 46, 32, 14, c.lcd, !c.unav, "#9be7ff", ntFit(c.lcd, 32, 8))}
${c.today ? `<text x="60" y="68" font-size="${ntFit(c.today, 40, 4.4).toFixed(1)}" text-anchor="middle" fill="#37414b" ${NT_FONT}>${esc(c.today)}</text>` : ""}
<rect x="57.4" y="72" width="5.2" height="2.6" rx=".6" fill="${c.exp ? "#0d3d1a" : "#3b1010"}"/>${c.unav || c.still ? "" : `<rect class="${c.heavy ? "nta-blinkfast" : "nta-blink"}" x="57.4" y="72" width="5.2" height="2.6" rx=".6" fill="${ntPulse(c)}"/>`}${c.exp ? ntExportArrow(64.4, 73.3) : ""}
<circle cx="60" cy="56" r="27" fill="url(#${gl})"/>
<path d="M41 40 A24 24 0 0 1 58 31" stroke="#fff" stroke-width="2.2" fill="none" opacity=".7" stroke-linecap="round"/>
<rect x="54" y="106" width="12" height="16" fill="#8a949d"/><rect x="52" y="104" width="16" height="4" rx="1" fill="#7a848d"/>`;
}
// A diaphragm gas meter: its two pipes on top, its window of drums.
function ntGas(c) {
  const b = ntId(), sh = ntId(), p = ntId();
  const pipe = (x) => `<rect x="${x}" y="-6" width="9" height="30" fill="url(#${p})"/><rect x="${x - 2}" y="18" width="13" height="8" rx="1.4" fill="#b8892f" stroke="#8a6420" stroke-width=".5"/>`;
  return `<defs>${ntV(b, "#ecebe3", "#cdc9bb")}${ntBlur(sh, 2.4)}<linearGradient id="${p}" x1="0" x2="1"><stop offset="0" stop-color="#a6adb4"/><stop offset=".45" stop-color="#e3e7ea"/><stop offset="1" stop-color="#8d959c"/></linearGradient></defs>
${pipe(32)}${pipe(79)}
<rect x="23.6" y="27.4" width="76" height="80" rx="7" fill="#000" opacity=".2" filter="url(#${sh})"/>
<rect x="22" y="26" width="76" height="80" rx="7" fill="url(#${b})" stroke="#a8a291" stroke-width=".8"/>
<path d="M26 31 H58" stroke="#fff" stroke-width="1.6" opacity=".6" stroke-linecap="round"/>
<rect x="29" y="38" width="62" height="20" rx="3" fill="#3a3f45"/>
${ntDrums(31, 41.5, 7.25, 13, c.counter, 3, c.on && !c.unav)}
<text x="88" y="64" font-size="4.6" font-weight="700" text-anchor="end" fill="#4a4538" ${NT_FONT}>m\u00b3</text>
<text x="31" y="64" font-size="3.4" fill="#6f6857" ${NT_FONT}>G4  Qmax 6 m\u00b3/h</text>
${c.lcd ? `<text x="60" y="76" font-size="${ntFit(c.lcd, 56, 7).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#4a4538" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}
${c.today ? `<text x="60" y="86" font-size="${ntFit(c.today, 56, 5).toFixed(1)}" text-anchor="middle" fill="#6f6857" ${NT_FONT}>${esc(c.today)}</text>` : ""}
<rect x="30" y="92" width="60" height="8" rx="2" fill="#dcd7c8" stroke="#b5ae9b" stroke-width=".5"/>`;
}
// A water meter on its pipe: brass body, a dial with its drums, the litre
// dials and the star that turns as soon as water runs.
function ntWater(c) {
  const br = ntId(), sh = ntId(), p = ntId();
  const on = c.on && !c.unav;
  const dial = (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#fff" stroke="#b71c1c" stroke-width=".6"/><g class="${on ? "nta-spin" : ""}"><path d="M${x} ${y + .6} L${x} ${y - 3}" stroke="#b71c1c" stroke-width=".9" stroke-linecap="round"/></g>`;
  const star = `<g class="${on ? "nta-spin" : ""}"><path d="M60 82 l1.3 -3.4 1.3 3.4 3.4 -1.3 -2.1 3 2.1 3 -3.4 -1.3 -1.3 3.4 -1.3 -3.4 -3.4 1.3 2.1 -3 -2.1 -3 3.4 1.3 Z" fill="#c62828"/><circle cx="60" cy="84.4" r=".9" fill="#fff"/></g>`;
  return `<defs><radialGradient id="${br}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#f3d27c"/><stop offset=".6" stop-color="#c9952f"/><stop offset="1" stop-color="#8f6519"/></radialGradient>${ntBlur(sh, 2.4)}
<linearGradient id="${p}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e7ea"/><stop offset=".5" stop-color="#b4bcc3"/><stop offset="1" stop-color="#7f878e"/></linearGradient></defs>
<rect x="-2" y="68" width="36" height="12" fill="url(#${p})"/><rect x="86" y="68" width="36" height="12" fill="url(#${p})"/>
<path d="M22 65 h8 l2 4 v10 l-2 4 h-8 l-2 -4 v-10 Z" fill="#c9952f" stroke="#8f6519" stroke-width=".5"/><path d="M90 65 h8 l2 4 v10 l-2 4 h-8 l-2 -4 v-10 Z" fill="#c9952f" stroke="#8f6519" stroke-width=".5"/>
<ellipse cx="61.6" cy="77.4" rx="31" ry="30" fill="#000" opacity=".2" filter="url(#${sh})"/>
<circle cx="60" cy="74" r="31" fill="url(#${br})" stroke="#7a5512" stroke-width=".8"/>
<circle cx="60" cy="74" r="25.5" fill="#1e5aa8"/>
<circle cx="60" cy="74" r="23.6" fill="#f8f8f3"/>
<text x="60" y="59" font-size="4.4" font-weight="700" text-anchor="middle" fill="#1e3a68" ${NT_FONT}>m\u00b3</text>
${ntDrums(43.6, 61, 4.1, 7.6, c.counter, 3, on)}
${dial(49, 77)}${dial(71, 77)}
${star}
<path d="M44 57 A22 22 0 0 1 60 51" stroke="#fff" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"/>
${c.lcd ? `<text x="60" y="114" font-size="${ntFit(c.lcd, 80, 7).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#37414b" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}
${c.today ? `<text x="60" y="122" font-size="${ntFit(c.today, 80, 5).toFixed(1)}" text-anchor="middle" fill="#6b7580" ${NT_FONT}>${esc(c.today)}</text>` : ""}`;
}

// Christmas tree: the lights, the baubles and the star in a palette
function ntTree(c) {
  const gr = ntId(), st = ntId(), gl = ntId(), pot = ntId();
  const on = c.on;
  const pal = TREE_PALETTES[c.palette] || TREE_PALETTES.multicolor;
  const tier = (yt, yb, w) => {
    let d = `M60 ${yt} L${60 + w} ${yb}`;
    const n = Math.round(w / 3.6);
    for (let i = 1; i <= 2 * n; i++) { const x = 60 + w - (i * w) / n; d += ` L${x.toFixed(1)} ${i % 2 ? yb - 3.4 : yb}`; }
    return `<path d="${d} Z" fill="url(#${gr})" stroke="#1b5e20" stroke-width=".5" stroke-linejoin="round"/>` +
      [-.6, -.3, .3, .6].map((k) => `<path d="M60 ${yt + 4} L${(60 + w * k).toFixed(1)} ${yb - 3}" stroke="#66bb6a" stroke-width=".6" opacity=".45"/>`).join("");
  };
  const tiers = [[52, 94, 44], [38, 78, 35], [24, 62, 26], [12, 45, 17]];
  let k = 0;
  const lights = tiers.map(([, yb, w]) => {
    const a = [60 - w * .78, yb - 14], m = [60 + w * .1, yb - 1], b = [60 + w * .82, yb - 7];
    const q = (s) => [(1 - s) ** 2 * a[0] + 2 * (1 - s) * s * m[0] + s * s * b[0], (1 - s) ** 2 * a[1] + 2 * (1 - s) * s * m[1] + s * s * b[1]];
    const tinsel = `<path d="M${(60 - w * .7).toFixed(1)} ${yb - 5} Q60 ${yb - 14} ${(60 + w * .72).toFixed(1)} ${yb - 12}" stroke="${pal.tinsel[k % pal.tinsel.length]}" stroke-width="1.4" stroke-dasharray="1.4 .6" fill="none" opacity=".85"/>`;
    const wire = `<path d="M${a[0].toFixed(1)} ${a[1]} Q${m[0].toFixed(1)} ${m[1]} ${b[0].toFixed(1)} ${b[1]}" stroke="#2e5e2e" stroke-width=".7" fill="none" opacity=".9"/>`;
    const bulbs = [.12, .3, .48, .66, .84].map((s) => {
      const [x, y] = q(s); const col = pal.lights[k % pal.lights.length]; const dl = `ntd${(k++ % 6) + 1}`;
      return on
        ? `<circle class="nta-twinkle ${dl}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${col}" opacity=".7" filter="url(#${gl})"/><circle class="nta-twinkle ${dl}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="${col}"/>`
        : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="#b0b5bb" stroke="#7d8590" stroke-width=".3"/>`;
    }).join("");
    return tinsel + wire + bulbs;
  }).join("");
  const balls = [[44, 92], [76, 91], [60, 86], [33, 93], [87, 93], [49, 75], [72, 74], [40, 77], [80, 77], [55, 60], [67, 58], [46, 62], [74, 61], [60, 44], [54, 46], [66, 47]]
    .map(([x, y], i) => `<rect x="${x - .8}" y="${y - 3.6}" width="1.6" height="1.2" fill="#bdbdbd"/><circle cx="${x}" cy="${y}" r="2.6" fill="${pal.balls[i % pal.balls.length]}"/><circle cx="${x - .8}" cy="${y - .9}" r=".8" fill="#fff" opacity=".75"/>`).join("");
  let star = "";
  for (let i = 0; i < 10; i++) { const r = i % 2 ? 3.2 : 7.4, ang = -Math.PI / 2 + i * Math.PI / 5; star += `${i ? "L" : "M"}${(60 + r * Math.cos(ang)).toFixed(1)} ${(10 + r * Math.sin(ang)).toFixed(1)}`; }
  const G = pal.gifts, R = pal.ribbons, edge = `stroke="#263238" stroke-width=".5" stroke-opacity=".7"`;
  const bow = (x, y, col) => `<path d="M${x} ${y} q-4 -4 -5 0 q4 1 5 0 q4 -4 5 0 q-4 1 -5 0" fill="${col}" stroke="#263238" stroke-width=".35" stroke-opacity=".6"/>`;
  const presents = c.presents
    ? `<rect x="9" y="106" width="9" height="7" rx=".8" fill="${G[2]}" ${edge}/><path d="M13.5 106v7M9 109.5h9" stroke="${R[2]}" stroke-width="1"/>
<rect x="18" y="100" width="20" height="13" rx="1" fill="${G[0]}" ${edge}/><path d="M28 100v13M18 106.5h20" stroke="${R[0]}" stroke-width="1.6"/>${bow(28, 100, R[0])}
<rect x="82" y="96" width="18" height="17" rx="1" fill="${G[1]}" ${edge}/><path d="M91 96v17M82 104.5h18" stroke="${R[1]}" stroke-width="1.6"/>${bow(91, 96, R[1])}
<rect x="101" y="105" width="9" height="8" rx=".8" fill="${G[3]}" ${edge}/><path d="M105.5 105v8" stroke="${R[3]}" stroke-width="1.2"/>`
    : "";
  return `<defs>${ntV(gr, "#43a047", "#1b5e20")}${ntV(st, pal.star[0], pal.star[1])}${ntBlur(gl, 1.4)}${ntV(pot, pal.pot[0], pal.pot[1])}</defs>
${ntShadow(60, 113.2, 48)}
<rect x="56" y="92" width="8" height="8" fill="#6d4c41"/>
<path d="M46 98 H74 L71 112 H49 Z" fill="url(#${pot})" stroke="#263238" stroke-width=".5" stroke-opacity=".6"/><rect x="45" y="97" width="30" height="3" rx="1" fill="${pal.star[1]}"/>
${tiers.map(([yt, yb, w]) => tier(yt, yb, w)).join("")}
${balls}${lights}
${on ? `<circle class="nta-glow" cx="60" cy="10" r="9" fill="${pal.star[0]}" filter="url(#${gl})"/>` : ""}
<path d="${star}Z" fill="${on ? `url(#${st})` : "#d6d9dd"}" stroke="${on ? pal.star[2] : "#9aa1ab"}" stroke-width=".5"/>
${presents}`;
}

// Electric rides on their charger (#72): a scooter, an off-road scooter like
// the Ausom DT2 Pro, an e-bike, a gyropode and an electric motorcycle, front
// to the left. The charger's light is red while it charges, green once
// full; the current runs from the charger to the vehicle.
// A wheel: tyre, rim, hub; knobs for an off-road tyre, spokes for a bike.
function mobWheel(cx, cy, r, o = {}) { const out = mobWheelRaw(cx, cy, r, o); return out ? ntKeep(out) : ""; }
function mobWheelRaw(cx, cy, r, o = {}) {
  const t = o.tyre || "#1e2226";
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${t}"/>`;
  if (o.knobby) {
    const n = 18;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = cx + Math.cos(a) * (r - .2), y = cy + Math.sin(a) * (r - .2);
      s += `<rect x="${(x - 1.6).toFixed(2)}" y="${(y - 1.1).toFixed(2)}" width="3.2" height="2.2" rx=".6" fill="${t}" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(1)} ${x.toFixed(2)} ${y.toFixed(2)})"/>`;
    }
  }
  const rim = o.rim || r * .58;
  if (o.spokes) {
    s += `<circle cx="${cx}" cy="${cy}" r="${r - 1.8}" fill="none" stroke="#8a939d" stroke-width=".9"/>`;
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; s += `<path d="M${cx} ${cy} L${(cx + Math.cos(a) * (r - 2)).toFixed(2)} ${(cy + Math.sin(a) * (r - 2)).toFixed(2)}" stroke="#a7aeb6" stroke-width=".35"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="2.2" fill="#3b4148"/>`;
    return s;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${rim}" fill="${o.rimColor || "#4a525b"}"/>`;
  if (o.disc) s += `<circle cx="${cx}" cy="${cy}" r="${rim * .82}" fill="none" stroke="#b9c0c8" stroke-width="1.2" stroke-dasharray="1.4 .8"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rim * .38}" fill="#22272c"/><circle cx="${cx}" cy="${cy}" r="${rim * .14}" fill="#9aa3ad"/>`;
  return s;
}

// The charger on the floor, its cable to the vehicle's port; its light red
// while charging, green once full, dark when the plug is off.
function mobCharger(x, port, c) {
  const led = c.st === "charging" ? "#ff5252" : c.st === "full" ? "#43a047" : "#3a4048";
  const [px, py] = port;
  // Unplugged, its cable lies on the floor and its plug is free.
  const lying = c.st === "off";
  const cable = lying ? `M${x} 104 C${x - 6} 107.4 ${x - 14} 107.4 ${x - 20} 106.6` : `M${px} ${py} C${px + 2} ${py + 14} ${x - 10} 104 ${x} 103`;
  return `<path d="${cable}" stroke="#2a2f35" stroke-width="1.6" fill="none" stroke-linecap="round"/>
${c.st === "charging" ? `<path class="nta-feed" d="${cable}" stroke="#ffca28" stroke-width=".9" fill="none" stroke-dasharray="2 4"/>` : ""}
${lying ? `<rect x="${x - 25}" y="104.6" width="5.4" height="3.4" rx="1" fill="#2a2f35"/>` : ""}
<circle cx="${px}" cy="${py}" r="1.5" fill="#15181c"/>
<rect x="${x}" y="98" width="20" height="10" rx="2.2" fill="#24292e"/><rect x="${x + 1}" y="98.8" width="18" height="2.4" rx="1.2" fill="#fff" opacity=".08"/>
<circle class="${c.st === "charging" ? "nta-led" : ""}" cx="${x + 16}" cy="101.6" r="1.3" fill="${led}"/>
<path d="M${x + 20} 104 C${x + 26} 104 ${x + 28} 106 116 106" stroke="#2a2f35" stroke-width="1.3" fill="none"/>`;
}

// Unplugged, the ride is greyed out.
const mobGrey = (c) => (c.st === "off" ? ' opacity=".5" style="filter:grayscale(1)"' : "");

// One bar of four: the real level when it is known (a bar per quarter, the
// next one blinking while it charges), else the bars filling from 0 to 4 in
// turn while it charges, all four once full, none lit when nothing says.
function mobBar(c, i, lit, dim) {
  if (c.level !== null && c.level !== undefined) {
    const n = c.st === "full" ? 4 : Math.max(0, Math.min(4, Math.ceil(c.level / 25)));
    const low = n <= 1 && c.st !== "charging";
    if (i < n) return `fill="${low ? "#e53935" : lit}"`;
    if (c.st === "charging" && i === n) return `class="nta-next" fill="${lit}"`;
    return `fill="${dim}"`;
  }
  if (c.st === "charging") return `class="nta-bar${i + 1}" fill="${lit}"`;
  return `fill="${c.st === "full" ? lit : dim}"`;
}

// The battery gauge over the vehicle, four bars read by mobBar.
function mobGauge(cx, cy, c) {
  const bars = [0, 1, 2, 3].map((i) => `<rect x="${cx - 9.2 + i * 4.4}" y="${cy - 2.6}" width="3.6" height="5.2" rx=".6" ${mobBar(c, i, "#43a047", "#dfe3e7")}/>`).join("");
  return `<rect x="${cx - 11}" y="${cy - 4.4}" width="20" height="8.8" rx="2" fill="#fff" stroke="#9aa3ad" stroke-width=".8"/><rect x="${cx + 9}" y="${cy - 1.6}" width="1.6" height="3.2" rx=".6" fill="#9aa3ad"/>${bars}
${c.st === "charging" ? `<path class="nta-led" d="M${cx + 15} ${cy - 5} l-3 5.4 h2.4 l-1.4 4.6 l4 -6 h-2.4 l1.6 -4 Z" fill="#ffb300" stroke="#e65100" stroke-width=".3"/>` : ""}`;
}

// A commuter scooter, Segway / Ninebot style, front to the left.
function mobScooter(c) {
  const g = ntId();
  return `<defs>${ntV(g, "#7d858e", "#4c535b")}</defs>${ntShadow(58, 110, 46)}<g${mobGrey(c)}>
${mobWheel(22, 98, 10)}${mobWheel(94, 98, 10)}
<path d="M84 88 Q94 82 104 90 L104 92 Q94 86 86 91 Z" fill="#1f2328"/>
<path d="M28 90 L34 84 H86 L88 90 Q87 93 84 93 H32 Q29 93 28 90 Z" fill="#23272c"/>
<path d="M40 86.4 H80" stroke="#5a626b" stroke-width="1.6" stroke-linecap="round"/>
<path d="M22 98 L27 74 L33 84" stroke="url(#${g})" stroke-width="5" fill="none" stroke-linejoin="round"/>
<path d="M27 76 L37 20" stroke="#1e2226" stroke-width="3.6" stroke-linecap="round"/>
<path d="M36 22 L37 16" stroke="#1e2226" stroke-width="3" stroke-linecap="round"/>
<path d="M33 16.6 L44 15" stroke="#1e2226" stroke-width="3" stroke-linecap="round"/><path d="M40 15.4 L46 14.6" stroke="#3b4148" stroke-width="3.4" stroke-linecap="round"/>
<path d="M34 24 Q30 34 31 46" stroke="#e53935" stroke-width=".7" fill="none"/>
<rect x="23.6" y="80" width="3.4" height="4" rx="1" fill="#f5f5f5" opacity=".85"/>
<rect x="100" y="89" width="3" height="1.6" rx=".6" fill="#e53935"/>
</g>${mobCharger(60, [38, 88], c)}${mobGauge(78, 52, c)}`;
}

// Ausom DT2 Pro: dual motors, off-road tyres, swing arms, yellow touches.
function mobOffroad(c) {
  const g = ntId(), d = ntId();
  return `<defs>${ntV(g, "#5c636b", "#2f3439")}${ntV(d, "#4a5057", "#24282c")}</defs>${ntShadow(60, 110, 50)}<g${mobGrey(c)}>
${mobWheel(20, 96, 12, { knobby: true, disc: true })}${mobWheel(98, 96, 12, { knobby: true, disc: true })}
<path d="M88 84 L98 96" stroke="#3a4046" stroke-width="5" stroke-linecap="round"/>
<path d="M90 84 Q100 74 110 84 L110 87 Q100 79 92 88 Z" fill="#2a2f34"/>
<path d="M30 92 L36 82 H86 L90 90 Q89 94 85 94 H33 Q30 94 30 92 Z" fill="url(#${d})"/>
<text x="62" y="91.6" font-size="3.2" font-weight="700" text-anchor="middle" fill="#c9ced3" font-family="Arial, sans-serif" letter-spacing=".3">AUSOM</text>
<path d="M80 82 L82 74 H90" stroke="#2a2f34" stroke-width="2.4" fill="none" stroke-linejoin="round"/>
<path d="M20 96 L28 80" stroke="#3a4046" stroke-width="4.4" stroke-linecap="round"/>
<path d="M27 82 L33 77 L37 83" stroke="url(#${g})" stroke-width="5.6" fill="none" stroke-linejoin="round"/>
<path d="M25.4 86.4 L29 80.6" stroke="#ffb300" stroke-width="2.2" stroke-dasharray="1 .7"/>
<path d="M31 78 L40 18" stroke="url(#${g})" stroke-width="4.6" stroke-linecap="round"/>
<circle cx="33.4" cy="62" r="2.4" fill="#ffb300"/><circle cx="33.4" cy="62" r=".9" fill="#c77800"/>
<path d="M36 40 L37.4 32" stroke="#ffb300" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
<path d="M33 16.4 L47 14" stroke="#1e2226" stroke-width="3" stroke-linecap="round"/><path d="M42 14.8 L49 13.6" stroke="#3b4148" stroke-width="3.6" stroke-linecap="round"/>
<rect x="37" y="11.6" width="5" height="3.4" rx=".8" fill="#14181c"/><rect x="37.8" y="12.4" width="3.4" height="1.8" rx=".4" fill="${c.st === "off" ? "#2b3138" : "#4fc3f7"}"/>
<circle cx="33" cy="26" r="1.8" fill="#fffde7" stroke="#2a2f34" stroke-width=".6"/>
<rect x="107" y="85" width="3" height="1.8" rx=".6" fill="#e53935"/>
</g>${mobCharger(62, [42, 89], c)}${mobGauge(80, 50, c)}`;
}

// An e-bike: its battery along the down tube, the motor at the cranks.
function mobEbike(c) {
  const f = "#2e7d6b";
  // The down tube runs from the head tube (46,62) to the cranks (60,92); the
  // battery lies on its upper side, along it.
  const ang = (Math.atan2(30, 14) * 180 / Math.PI).toFixed(1);
  const bars = [0, 1, 2, 3].map((i) => `<rect x="${4 + i * 2}" y="-1.6" width="1.3" height="3.2" rx=".4" ${mobBar(c, i, "#69f0ae", "#4a525b")}/>`).join("");
  return `${ntShadow(60, 110, 52)}<g${mobGrey(c)}>
${mobWheel(24, 92, 17, { spokes: true })}${mobWheel(96, 92, 17, { spokes: true })}
<path d="M24 92 L46 62 L82 62 L96 92 M46 62 L60 92 L82 62 M60 92 L96 92" stroke="${f}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
<g transform="translate(55.6 76.4) rotate(${ang})"><rect x="-13" y="-3.4" width="24" height="6.8" rx="2.6" fill="#30363c"/><rect x="-11" y="-2.6" width="16" height="1.2" rx=".6" fill="#fff" opacity=".12"/>${bars}</g>
<path d="M46 62 L44 50 Q44 47 47 47 H52" stroke="#1e2226" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 47 H54" stroke="#3b4148" stroke-width="3.2" stroke-linecap="round"/>
<path d="M82 62 L85 48" stroke="#9aa3ad" stroke-width="2.2" stroke-linecap="round"/>
<path d="M79 47 Q86 44.6 93 46.4 Q93 48.6 88 48.6 H81 Q78.6 48.4 79 47 Z" fill="#1e2226"/>
<circle cx="60" cy="92" r="4.6" fill="#3b4148"/><circle cx="60" cy="92" r="2" fill="#6c757e"/>
<path d="M60 92 L64 98" stroke="#22272c" stroke-width="1.6"/><rect x="62" y="97" width="5" height="1.6" rx=".6" fill="#22272c"/>
<circle cx="43" cy="57" r="1.8" fill="#fffde7" stroke="#2a2f34" stroke-width=".5"/>
<path d="M88 66 L92 66" stroke="#e53935" stroke-width="1.6" stroke-linecap="round"/>
</g>${mobCharger(70, [52, 78], c)}${mobGauge(98, 30, c)}`;
}

// A self-balancing gyropode (Segway PT): two wheels side by side, a platform
// between them, a tall stem and its handlebar.
function mobGyropode(c) {
  const g = ntId();
  return `<defs>${ntV(g, "#e9edf1", "#a9b2bc")}</defs>${ntShadow(52, 110, 30)}<g${mobGrey(c)}>
${mobWheel(52, 92, 17, { rim: 9.6 })}
<path d="M34 96 H70 Q72 96 72 98 V101 Q72 103 70 103 H34 Q32 103 32 101 V98 Q32 96 34 96 Z" fill="#22272c"/>
<rect x="34" y="92.6" width="36" height="4" rx="1.4" fill="#3b4148"/>
<path d="M44 80 Q52 76 60 80 L58 94 H46 Z" fill="url(#${g})" stroke="#8a939d" stroke-width=".6"/>
<path d="M52 82 L56 22" stroke="#2a2f34" stroke-width="3.6" stroke-linecap="round"/>
<path d="M48 22 H64" stroke="#2a2f34" stroke-width="3.2" stroke-linecap="round"/><path d="M47 22 H51 M61 22 H65" stroke="#4a525b" stroke-width="4" stroke-linecap="round"/>
<rect x="53.4" y="25" width="5" height="3.4" rx=".8" fill="#14181c"/><rect x="54.2" y="25.8" width="3.4" height="1.8" rx=".4" fill="${c.st === "off" ? "#2b3138" : "#4fc3f7"}"/>
</g>${mobCharger(82, [58, 88], c)}${mobGauge(84, 50, c)}`;
}

// An electric motorcycle, neo-retro like the Super Soco TC Max: round
// headlight, a tank that holds the battery, flat ribbed seat, silver swing
// arm and the motor in the rear hub. Front to the left like the others.
function mobAlloy(cx, cy, r) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1b1f23"/><circle cx="${cx}" cy="${cy}" r="${r - 2.6}" fill="#2c3238"/><circle cx="${cx}" cy="${cy}" r="${r - 3.4}" fill="#14171a"/>`;
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(a - .12) * (r - 3.4), y1 = cy + Math.sin(a - .12) * (r - 3.4);
    const x2 = cx + Math.cos(a + .12) * (r - 3.4), y2 = cy + Math.sin(a + .12) * (r - 3.4);
    s += `<path d="M${cx} ${cy} L${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="#3d444c"/>`;
  }
  return s;
}
function mobMotorcycle(c) {
  const b = ntId(), sv = ntId(), sh = ntId();
  // Low and long: the seat about 1.3 wheels high, as on the real bike.
  return `<defs>${ntV(b, "#4a525b", "#16191c")}${ntV(sv, "#e9edf1", "#9aa3ad")}${ntV(sh, "#30363c", "#111316")}</defs>${ntShadow(60, 110, 56)}<g${mobGrey(c)}>
${mobAlloy(22, 92, 16)}<circle cx="22" cy="92" r="7.6" fill="none" stroke="#c4cbd2" stroke-width="1.4" stroke-dasharray="1.6 .9"/><circle cx="22" cy="92" r="2.2" fill="#9aa3ad"/>
${mobAlloy(98, 92, 16)}<circle cx="98" cy="92" r="6.8" fill="url(#${sv})"/><circle cx="98" cy="92" r="3" fill="#5a636c"/>
<path d="M85 76 Q98 66 112 77 L111 80 Q98 70 87 79 Z" fill="#1f2328"/>
<rect x="107" y="75" width="6" height="4.4" rx=".8" fill="#e9edf1" stroke="#9aa3ad" stroke-width=".4"/>
<path d="M64 86 L98 92" stroke="url(#${sv})" stroke-width="4.4" stroke-linecap="round"/>
<path d="M78 66 L82 84" stroke="#e9edf1" stroke-width="2.6" stroke-linecap="round"/><path d="M78.6 68.6 L81.6 81" stroke="#e53935" stroke-width="1.6" stroke-dasharray="1 .8"/>
<path d="M36 56 L22 92" stroke="#1f2328" stroke-width="4" stroke-linecap="round"/><path d="M27.6 77 L23 90" stroke="#c4cbd2" stroke-width="2.6" stroke-linecap="round"/>
<path d="M76 62 L106 61 L103 67 H78 Z" fill="#1f2328"/><path d="M103 66 L108 75" stroke="#1f2328" stroke-width="1.8" stroke-linecap="round"/>
<path d="M105 60.6 L109.6 61.4 L108.8 64.4 L104.4 63.8 Z" fill="#e53935"/>
<path d="M38 58 L54 54 Q70 52 78 58 L80 70 L76 84 H50 Q42 82 40 72 Z" fill="url(#${b})"/>
<path d="M44 72 H79 L76 84 H50 Q45 81 44 72 Z" fill="url(#${sv})"/>
<text x="64" y="81" font-size="4.4" font-weight="700" font-style="italic" text-anchor="middle" fill="#5a636c" font-family="Arial, sans-serif">TC</text>
<path d="M48 60 Q60 56 72 60" stroke="#fff" stroke-width=".8" fill="none" opacity=".18"/>
<circle cx="58" cy="65" r="2.4" fill="#2a3036" stroke="#7d868f" stroke-width=".5"/>
<path d="M70 57 Q72 54 78 54 H101 Q107 54.4 107 58 L106 61.4 H72 Q69 60.6 70 57 Z" fill="url(#${sh})"/>
${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${79 + i * 3.6} 55 V61" stroke="#4a525b" stroke-width=".5"/>`).join("")}
<path d="M72 54.8 H105" stroke="#c4cbd2" stroke-width=".6"/>
<path d="M37 55 L42 46 M42 46 L49 47" stroke="#1f2328" stroke-width="2.2" stroke-linecap="round"/><path d="M46 46.8 L51 47.6" stroke="#3b4148" stroke-width="3" stroke-linecap="round"/>
<path d="M41 47 L38 38" stroke="#1f2328" stroke-width="1"/><circle cx="37.6" cy="36.4" r="2.6" fill="#2a2f34" stroke="#9aa3ad" stroke-width=".6"/>
<ellipse cx="30.6" cy="62" rx="4.4" ry="5.4" fill="#2a2f34" stroke="#c4cbd2" stroke-width=".9"/><ellipse cx="28.4" cy="62" rx="2" ry="4.2" fill="#fffde7"/>
<path d="M62 86 L66 86" stroke="#9aa3ad" stroke-width="1.8" stroke-linecap="round"/>
</g>${mobCharger(70, [76, 74], c)}${mobGauge(88, 30, c)}`;
}

// Watering, a self-cleaning litter box, a smoke, CO or leak detector and a
// speaker.
// A round island of lawn, seen in three-quarter view: its edge of soil, its
// tufts and a few flowers, all kept inside it.
function ntLawnDisc(cx, cy, rx, ry) {
  const g = ntId(), so = ntId();
  const tufts = [];
  for (let i = 0; i < 34; i++) {
    const a = (i * 137.5) * Math.PI / 180, q = Math.sqrt(((i * 61) % 97) / 97) * .86;
    const x = cx + Math.cos(a) * rx * q, y = cy + Math.sin(a) * ry * q;
    tufts.push(`<path d="M${(x - 1.4).toFixed(1)} ${y.toFixed(1)} l.7 -2.6 l.7 2 l.7 -2.8 l.7 3.4" fill="none" stroke="${i % 3 ? "#3f7d2c" : "#86c262"}" stroke-width=".7" stroke-linejoin="round"/>`);
  }
  const flowers = [[-.62, .1, "#fff59d"], [.58, -.34, "#f8bbd0"], [.7, .42, "#fff"], [-.3, .56, "#fff59d"]].map(([u, v, col]) => {
    const x = cx + u * rx, y = cy + v * ry;
    return `<g>${[0, 1, 2, 3, 4].map((k) => `<circle cx="${(x + Math.cos(k * 1.256) * 1.3).toFixed(1)}" cy="${(y + Math.sin(k * 1.256) * .8).toFixed(1)}" r=".9" fill="${col}"/>`).join("")}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".7" fill="#ffb300"/></g>`;
  }).join("");
  return `<defs><radialGradient id="${g}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#9ccc65"/><stop offset=".7" stop-color="#6fa646"/><stop offset="1" stop-color="#4f8a34"/></radialGradient>${ntV(so, "#7a5638", "#4e3524")}</defs>
${ntFoot(`${cx - rx + 4} ${cy + ry + 6} ${cx + rx - 4} ${cy + ry + 6} ${cx + rx} ${cy + 4} ${cx - rx} ${cy + 4}`, .25)}
<path d="M${cx - rx} ${cy} V${cy + 6} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + 6} V${cy} Z" fill="url(#${so})"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/>
<path d="M${cx - rx + 6} ${cy - 3} A${rx - 6} ${ry - 3} 0 0 1 ${cx + rx * .3} ${cy - ry + 1.6}" fill="none" stroke="#c5e1a5" stroke-width="1" opacity=".6"/>
${tufts.join("")}${flowers}`;
}
// The rain while the watering waits for the weather: the robot mower's cloud
// and its slanted drops, each splashing on the ground.
const ntRainCloud = (ground, dx = 0, sc = 1.25) => { const g = ntId(), dr = ntId(); let drops = ""; const x0 = 15 + dx, w = 72 * sc, n = Math.round(14.4 * sc);
  for (let i = 0; i < n; i++) { const x = +(x0 + w * .12 + ((i * 37) % 76) / 76 * w * .76).toFixed(1), d = 7 / (10 + ((i * 7) % 5)), dl = -((i * 0.23) % d), st = `animation-duration:${d.toFixed(2)}s;animation-delay:${dl.toFixed(2)}s`;
    drops += `<path class="nta-rdrop" style="${st}" d="M${x} ${(-9 + 25 * sc).toFixed(1)} l-1.9 8.8" stroke="url(#${dr})" stroke-width="1.1" stroke-linecap="round"/><ellipse class="nta-rsplash" style="${st}" cx="${x - 16}" cy="${ground + (i % 4) * 3}" rx="4" ry="1.3" fill="none" stroke="#b4d7f5" stroke-width=".9"/>`; }
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="26" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7dde2"/><stop offset=".55" stop-color="#a9b2ba"/><stop offset="1" stop-color="#7f8a94"/></linearGradient>
<linearGradient id="${dr}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a0c8f0" stop-opacity="0"/><stop offset="1" stop-color="#96c3f0" stop-opacity=".95"/></linearGradient></defs>${drops}
<g transform="translate(${x0} -9) scale(${sc})"><path d="M12 25.5 C5 25.5 3 18 9 15.5 C8 9 15 6 20 9 C23 2 35 0 40 7 C45 3 54 6 54 12 C61 11 67 16 64 21 C66 24 63 25.5 60 25.5 Z" fill="url(#${g})"/><path d="M14 13 C15 10 18 9 21 10.5 M27 7 C30 4 35 4 38 7.5" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.4" stroke-linecap="round"/></g>`; };
// The soil probe: a stake in the lawn, its gauge how wet the ground is.
const ntSoil = (x, y, m) => m === null || m === undefined ? "" : `<ellipse cx="${x + 3.5}" cy="${y + 23}" rx="4" ry="1.3" fill="#2e5a20" opacity=".6"/>
<rect x="${x}" y="${y}" width="7" height="22" rx="3.5" fill="#eceff1" stroke="#90a4ae" stroke-width=".6"/>
<rect x="${x + 1.6}" y="${y + 2}" width="3.8" height="18" rx="1.9" fill="#37474f"/>
<rect x="${x + 1.6}" y="${(y + 2 + 18 * (1 - m)).toFixed(1)}" width="3.8" height="${(18 * m).toFixed(1)}" rx="1.9" fill="${m < 0.25 ? "#ffb300" : "#29b6f6"}"/>
<path d="M${x + 3.5} ${y - 8} q-3 4 0 5.6 q3 -1.6 0 -5.6 Z" fill="${m < 0.25 ? "#ffb300" : "#29b6f6"}"/>`;
// Water thrown in an arc: a fine mist along it and the drops flying in it.
const ntJet = (d, i) => `<path d="${d}" fill="none" stroke="#e1f5fe" stroke-width="4" stroke-linecap="round" opacity=".55"/>
<path class="nta-flow ntd${i + 1}" d="${d}" fill="none" stroke="#4fc3f7" stroke-width="1.8" stroke-dasharray="0 4" stroke-linecap="round"/>
<path class="nta-flow ntd${i + 1}" d="${d}" fill="none" stroke="#0288d1" stroke-width=".9" stroke-dasharray="0 6" stroke-linecap="round" opacity=".7"/>`;
// A pop-up spray head in the middle of the lawn: the riser comes up and
// throws its fan of jets, the head sinks back flush with the grass when it
// stops.
function ntIrrSprinkler(c) {
  const bd = ntId(), cap = ntId(), mi = ntId();
  const ends = [[6, 100], [24, 112], [44, 116], [76, 116], [96, 112], [114, 100]];
  const top = [60, 82];
  const arcs = ends.map(([x, y], i) => [`M${top[0]} ${top[1]} Q${(top[0] + (x - top[0]) * .55).toFixed(1)} ${-22 + Math.abs(x - 60) * .5} ${x} ${y}`, i]);
  return `<defs>${ntV(bd, "#4a5560", "#1e2328")}<radialGradient id="${cap}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#8d9aa6"/><stop offset="1" stop-color="#37424c"/></radialGradient>${ntBlur(mi, 2.4)}</defs>
${c.rain ? ntRainCloud(100) : ""}
${ntLawnDisc(60, 104, 58, 18)}
${ntSoil(100, 84, c.moist)}
<g class="nt-run">${arcs.map(([d, i]) => ntJet(d, i)).join("")}
${ends.map(([x, y], i) => `<circle cx="${x}" cy="${y - 3}" r="5" fill="#e1f5fe" opacity=".55" filter="url(#${mi})"/>
<circle class="nta-fall ntd${(i % 6) + 1}" cx="${x + 1.5}" cy="${y - 10}" r="1.2" fill="#4fc3f7"/>`).join("")}</g>
<ellipse cx="60" cy="105" rx="13" ry="4" fill="#2f5e22" opacity=".55"/>
<ellipse cx="60" cy="104" rx="10" ry="3.2" fill="url(#${cap})"/>
${c.on ? `<rect x="55.4" y="88" width="9.2" height="16" fill="url(#${bd})"/><path d="M57.2 90 V102" stroke="#8d9aa6" stroke-width=".9" opacity=".8"/>
<path d="M53 88 Q60 80 67 88 V91 H53 Z" fill="url(#${cap})"/><ellipse cx="60" cy="83.4" rx="3.6" ry="1.6" fill="#263238"/><circle cx="60" cy="83" r="1" fill="#81d4fa"/>` : `<ellipse cx="60" cy="103.4" rx="5" ry="1.5" fill="#1e2328"/><circle cx="60" cy="103.2" r=".9" fill="#8d9aa6"/>`}
${c.lcd ? `<rect x="44" y="113" width="32" height="10" rx="5" fill="#1e2328" opacity=".82"/><text x="60" y="120.2" font-size="${ntFit(c.lcd, 30, 6.4).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#b3e5fc" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}`;
}
// The wall behind the tap: brick, white render, or none (a standpipe).
function ntIrrWall(wall) {
  if (wall === "none") return "";
  const wl = ntId();
  const [wm, wdef] = ntFade(60, 40, 74, 62);
  if (wall === "render") {
    const dots = Array.from({ length: 140 }, (_, i) => {
      const x = ((i * 53) % 140) - 10, y = ((i * 37) % 106) - 10;
      return `<circle cx="${x}" cy="${y}" r="${(i % 3) * .25 + .35}" fill="${i % 2 ? "#cfc8bc" : "#fff"}" opacity=".7"/>`;
    }).join("");
    return `<defs>${ntV(wl, "#f7f4ee", "#e2ddd3")}</defs>${wdef}<g mask="url(#${wm})"><rect x="-10" y="-10" width="140" height="106" fill="url(#${wl})"/>${dots}</g>`;
  }
  const bricks = [];
  for (let r = 0; r < 9; r++) {
    const y = -10 + r * 11;
    bricks.push(`<path d="M-10 ${y} H130" stroke="#b9a07c" stroke-width=".8"/>`);
    for (let x = (r % 2 ? -4 : 8); x < 130; x += 24) bricks.push(`<path d="M${x} ${y} V${y + 11}" stroke="#b9a07c" stroke-width=".8"/>`);
  }
  return `<defs>${ntV(wl, "#eadcc6", "#d2bf9f")}</defs>${wdef}<g mask="url(#${wm})"><rect x="-10" y="-10" width="140" height="106" fill="url(#${wl})"/>${bricks.join("")}</g>`;
}

// The tap and its timer: the generic green one, or Sonoff's black box with
// its orange tabs and its green ring.
function ntIrrTap(c) {
  const br = ntId(), gd = ntId(), sb = ntId(), ss = ntId(), nt = ntId(), bx = ntId(), bs = ntId(), pp = ntId(), ch = ntId(), hc = ntId();
  const [gm, gdef] = ntFade(60, 110, 72, 22);
  const sonoff = c.model === "sonoff";
  const wall = c.wall || "brick";
  // The garden tap: a chrome rosette on the wall (an elbow on its standpipe
  // without one), a brass pipe with its hexagonal valve body and its red
  // quarter-turn lever, bending down to the threaded spout the timer screws on.
  const pipeD = wall === "none" ? "M43.5 22 V18 Q43.5 14 47.5 14 H58 Q62 14 62 18 V27" : "M42 14 H58 Q62 14 62 18 V27";
  const tap = `${wall === "none" ? "" : `<ellipse cx="42.6" cy="14.6" rx="5.4" ry="7.4" fill="#000" opacity=".18"/><ellipse cx="42" cy="14" rx="4.4" ry="6.6" fill="url(#${ch})" stroke="#7d868e" stroke-width=".4"/><ellipse cx="42.6" cy="14" rx="2.2" ry="3.4" fill="#aab3ba"/>`}
<path d="${pipeD}" fill="none" stroke="#6b4c10" stroke-width="6.4" stroke-linejoin="round"/>
<path d="${pipeD}" fill="none" stroke="#d4a537" stroke-width="5" stroke-linejoin="round"/>
<path d="${pipeD}" transform="translate(-.6 -.9)" fill="none" stroke="#fff1b8" stroke-width="1.2" stroke-linejoin="round" opacity=".75"/>
<path d="M48 9.6 H56 L57.4 14 L56 18.4 H48 L46.6 14 Z" fill="url(#${br})" stroke="#6b4c10" stroke-width=".5"/>
<path d="M48 9.6 V18.4 M56 9.6 V18.4" stroke="#8a6418" stroke-width=".4"/><path d="M48.4 10.6 H55.6" stroke="#fff1b8" stroke-width=".7" opacity=".8"/>
<rect x="51" y="5" width="2" height="5" fill="#8a6418"/><circle cx="52" cy="5" r="1.4" fill="#b0802a"/>
<path d="M44 3.2 Q44 1.6 45.6 1.6 H58.4 Q60 1.6 60 3.2 V4.4 Q60 6 58.4 6 H45.6 Q44 6 44 4.4 Z" fill="#d32f2f" stroke="#8e1b1b" stroke-width=".4"/><path d="M45.4 2.6 H58.6" stroke="#ff8a80" stroke-width=".6" opacity=".8"/>
${[0, 1, 2].map((i) => `<path d="M59.2 ${22.4 + i * 1.5} H64.8" stroke="#8a6418" stroke-width=".45"/>`).join("")}`;
  // Without a wall the tap stands on a pipe from the ground.
  // Without a wall the tap stands on a pipe coming out of the ground: the
  // hole behind it, the pipe in front of the tap's elbow, a wider collar
  // where they join.
  const stand = wall === "none" ? `<ellipse cx="43.5" cy="97.6" rx="7" ry="2.2" fill="#4e3d2c"/><ellipse cx="43.5" cy="97.2" rx="5" ry="1.4" fill="#2f241a"/>
<rect x="40.5" y="21" width="6" height="77" fill="url(#${pp})"/><path d="M42.3 22 V97" stroke="#fff" stroke-width="1" opacity=".35"/>
<path d="M40.5 98 A3 1 0 0 0 46.5 98" fill="url(#${pp})"/>
<rect x="39" y="17.6" width="9" height="6" rx="1.4" fill="url(#${pp})" stroke="#6f777e" stroke-width=".4"/><path d="M39.6 19.2 H47.4" stroke="#fff" stroke-width=".7" opacity=".5"/>` : "";
  let box;
  if (sonoff) {
    // The black box: a knurled nut on the tap, ribs down its side, the
    // green ring of its button, the orange tab and the outlet.
    const ribs = Array.from({ length: 8 }, (_, i) => `<path d="M${77 + i * 1.1} ${35.4 + i * .3} V${71.6 - i * .3}" stroke="#121416" stroke-width=".5"/>`).join("");
    const knurl = Array.from({ length: 8 }, (_, i) => `<path d="M${55.4 + i * 1.8} 26.6 V33" stroke="#0e0f11" stroke-width=".6"/>`).join("");
    box = `<rect x="54.6" y="26" width="15" height="7.6" rx="1.6" fill="url(#${nt})"/>${knurl}<path d="M55.4 27 H68.8" stroke="#6b7076" stroke-width=".6"/>
<path d="M68 32 H74 L83.6 34.2 Q86.2 34.8 86.2 37.4 V69.6 Q86.2 72.2 83.6 72.8 L74 75 H68 Z" fill="url(#${ss})" stroke="#0e0f11" stroke-width=".5"/>${ribs}
<rect x="47" y="32" width="29" height="43" rx="2.6" fill="url(#${sb})" stroke="#0e0f11" stroke-width=".5"/>
<path d="M49.4 34 V73 M73.6 34 V73" stroke="#4a4f55" stroke-width=".5" opacity=".7"/>
<text x="61.5" y="52" font-size="4.2" font-weight="700" text-anchor="middle" fill="#cfd3d6" ${NT_FONT}>SONOFF</text>
<text x="61.5" y="55.6" font-size="1.6" text-anchor="middle" fill="#8d9298" ${NT_FONT}>Zigbee Smart Water Valve</text>
<ellipse cx="81.2" cy="53.5" rx="2.7" ry="3.6" fill="none" stroke="${c.on ? "#69f0ae" : "#2e7d32"}" stroke-width="1.1" class="${c.on ? "nta-glow" : ""}"/>
<ellipse cx="81.2" cy="53.5" rx="1.6" ry="2.3" fill="#9aa0a6"/>
${c.on ? `<ellipse cx="81.2" cy="53.5" rx="4.4" ry="5.4" fill="#69f0ae" opacity=".25"/>` : ""}
<rect x="62" y="70.4" width="2.4" height="1.6" rx=".6" fill="#ff6d00"/>
<path d="M60 75 H73 L71.6 79 H61.4 Z" fill="#ff6d00"/><path d="M66 79 V82" stroke="#e65100" stroke-width="1.6"/>
<rect x="52" y="75" width="8" height="6" fill="#7d858c"/>${[0, 1, 2].map((i) => `<path d="M52 ${76.2 + i * 1.6} H60" stroke="#5d656c" stroke-width=".5"/>`).join("")}
`;
  } else {
    box = `<rect x="56.6" y="26.4" width="10.8" height="5.4" rx="1.2" fill="#26a69a"/><path d="M57.4 27.6 H66.6" stroke="#80cbc4" stroke-width=".6"/>
${ntRoundBox(47, 31, 34, 42, 6, 8, `url(#${bx})`, `url(#${bs})`, "#7ed37f", "#17511b")}
<path d="M51 35.6 Q64 32.6 77 35.6" fill="none" stroke="#fff" stroke-width="1.3" opacity=".45" stroke-linecap="round"/>
<rect x="50.6" y="38" width="26.8" height="15.4" rx="2.4" fill="#1b2a1c"/>
${ntLcd(51.6, 39, 24.8, 13.4, c.lcd || "--", c.on, "#b9f6ca", ntFit(c.lcd || "--", 24, 7))}
<circle cx="57" cy="62" r="3.6" fill="#e8f5e9" stroke="#17511b" stroke-width=".5"/><circle cx="71" cy="62" r="3.6" fill="#e8f5e9" stroke="#17511b" stroke-width=".5"/>
<path d="M55.4 62 h3.2 M69.4 62 h3.2 M71 60.4 v3.2" stroke="#2a7a2e" stroke-width=".9"/>
<rect x="59.6" y="73" width="9" height="5.4" rx="1.4" fill="#ffb300"/><rect x="60.8" y="77.6" width="6.6" height="4" fill="#ffca28"/>`;
  }
  const hx = sonoff ? 56 : 64.1;
  const hy = 88.5;
  const hose = `M${hx} ${hy} C${hx} 102 50 106 40 110 C28 115 34 121 56 119 C72 117 84 112 91 109.4`;
  // The hose's quick connector on the outlet: a grey collar and its ribs.
  const coupler = `<rect x="${hx - 4.2}" y="${sonoff ? 80.6 : 81.2}" width="8.4" height="7.6" rx="1.6" fill="url(#${hc})" stroke="#2b2e32" stroke-width=".4"/>
${[0, 1, 2].map((i) => `<path d="M${hx - 3.6} ${(sonoff ? 82.4 : 83) + i * 1.8} H${hx + 3.6}" stroke="#2b2e32" stroke-width=".4" opacity=".7"/>`).join("")}
<path d="M${hx - 3} ${hy} H${hx + 3}" stroke="#1d1f22" stroke-width="1"/>`;
  return `<defs>${ntV(br, "#f6dc8c", "#a8781e")}${ntV(gd, "#c9c2b6", "#a59d8f")}${ntV(sb, "#3a3e43", "#202326")}${ntV(nt, "#2b2e32", "#111315")}
<linearGradient id="${ss}" x1="0" x2="1"><stop offset="0" stop-color="#2a2d31"/><stop offset="1" stop-color="#16181a"/></linearGradient>
<radialGradient id="${ch}" cx=".4" cy=".35"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#8d969e"/></radialGradient><linearGradient id="${hc}" x1="0" x2="1"><stop offset="0" stop-color="#4a4f55"/><stop offset=".45" stop-color="#9aa1a8"/><stop offset="1" stop-color="#3a3e43"/></linearGradient>${ntV(bx, "#5cbf5f", "#2a7a2e")}${ntV(bs, "#2a7a2e", "#17511b")}<linearGradient id="${pp}" x1="0" x2="1"><stop offset="0" stop-color="#9aa3ab"/><stop offset=".4" stop-color="#d9dee2"/><stop offset="1" stop-color="#7d868e"/></linearGradient></defs>${gdef}
${ntIrrWall(wall)}
<g mask="url(#${gm})"><rect x="-10" y="96" width="140" height="30" fill="url(#${gd})"/><path d="M-10 96.5 H130" stroke="#8d8577" stroke-width="1"/>
${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-6 + i * 26} 125 L${6 + i * 26} 97" stroke="#9a9283" stroke-width=".7"/>`).join("")}<path d="M-10 110 H130" stroke="#9a9283" stroke-width=".7"/></g>
${tap}${stand}${c.winter ? "" : `${box}
<ellipse cx="88" cy="114" rx="30" ry="4" fill="#000" opacity=".12"/>
<path d="${hose}" fill="none" stroke="${sonoff ? "#1c1d1f" : "#1b5e20"}" stroke-width="5.6" stroke-linecap="round"/>
<path d="${hose}" fill="none" stroke="${sonoff ? "#3b3e42" : "#43a047"}" stroke-width="3.8" stroke-linecap="round"/>
<path class="nt-run nta-flow" d="${hose}" fill="none" stroke="#b3e5fc" stroke-width="1.2" stroke-dasharray="3 5"/>
${coupler}
<g transform="rotate(-14 96 108)"><rect x="90" y="105" width="11" height="6" rx="2" fill="${sonoff ? "#ff6d00" : "#ffb300"}"/><path d="M100 105.4 L106 104 V112 L100 110.6 Z" fill="${sonoff ? "#212121" : "#f57c00"}"/></g>
<g class="nt-run">${[["M106 105 Q114 99 125 101", 0], ["M106 107 Q115 103 125 107", 2], ["M106 109 Q114 108 124 114", 4]].map(([d, i]) => ntJet(d, i)).join("")}
<path d="M106 107 L126 98 L126 116 Z" fill="#e1f5fe" opacity=".35"/></g>`}
${sonoff && c.lcd && !c.winter ? `<rect x="6" y="101" width="30" height="10" rx="5" fill="#1e2328" opacity=".82"/><text x="21" y="108.2" font-size="${ntFit(c.lcd, 28, 6.4).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#b3e5fc" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}`;
}

// A vegetable patch: a raised wooden bed in three-quarter view, rows of
// lettuces, tomatoes and carrots, a black drip line along each row whose
// emitters drip and darken the soil while it waters.
function ntIrrDrip(c) {
  const wd = ntId(), wds = ntId(), so = ntId(), wet = ntId();
  // The bed: front x 14..106, top y 66, front face to 92; depth (10, -16).
  const fx0 = 6, fx1 = 92, ty = 74, by = 98, dx = 18, dy = -40;
  const P = (u, w) => [fx0 + u + dx * w, ty + dy * w]; // u across, w 0 front .. 1 back
  const rows = [.2, .5, .8];
  const plant = (kind, x, y, s) => {
    if (kind === "lettuce") return `<g transform="translate(${x} ${y}) scale(${s})">${[[-3, 0], [3, 0], [0, -2.5], [-1.6, 1.6], [1.6, 1.6]].map(([a, b], i) => `<ellipse cx="${a}" cy="${b - 2}" rx="3.6" ry="2.6" fill="${["#7cb342", "#9ccc65", "#689f38", "#aed581", "#8bc34a"][i]}"/>`).join("")}<ellipse cx="0" cy="-2.4" rx="1.6" ry="1.2" fill="#dcedc8"/></g>`;
    if (kind === "tomato") return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-16" stroke="#a1887f" stroke-width=".7"/><path d="M0 -3 q-5 -2 -6 -6 M0 -7 q5 -2 6 -6 M0 -10 q-4 -2 -5 -5 M0 -13 q4 -1 4 -4" stroke="#558b2f" stroke-width="1.3" fill="none" stroke-linecap="round"/>${[[-4, -7], [3.6, -10], [-2.6, -12.4], [2, -5]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.5" fill="#e53935"/><circle cx="${a - .4}" cy="${b - .5}" r=".4" fill="#fff" opacity=".6"/>`).join("")}</g>`;
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 L-2.6 -6 M0 0 L0 -7 M0 0 L2.6 -6" stroke="#7cb342" stroke-width="1" stroke-linecap="round"/><path d="M-.8 .2 L.8 .2 L0 2.4 Z" fill="#fb8c00"/></g>`;
  };
  const kinds = ["carrot", "lettuce", "tomato"];
  let rowsSvg = "";
  // Back rows first, so the front ones overlap them.
  [...rows].reverse().forEach((w, ri) => {
    const k = kinds[2 - ri];
    const [ax, ay] = P(4, w), [bx2, by2] = P(fx1 - fx0 - 4, w);
    const s = 1.2 + (1 - w) * .5;
    const line = `<path d="M${ax} ${ay + 1.5} L${bx2} ${by2 + 1.5}" stroke="#111" stroke-width="1.6"/><path d="M${ax} ${ay + 1} L${bx2} ${by2 + 1}" stroke="#555" stroke-width=".4"/>`;
    const emit = [.08, .3, .54, .78, .96].map((t, i) => {
      const x = ax + (bx2 - ax) * t, y = ay + (by2 - ay) * t + 1.5;
      return `<g><rect x="${(x - .8).toFixed(1)}" y="${(y - .8).toFixed(1)}" width="1.6" height="1.6" rx=".4" fill="#5d4037"/>
<g class="nt-run"><ellipse cx="${x.toFixed(1)}" cy="${(y + 1.2).toFixed(1)}" rx="${(4.6 * s).toFixed(1)}" ry="${(1.6 * s).toFixed(1)}" fill="url(#${wet})"/>
<path class="nta-fall ntd${(i + ri) % 6 + 1}" d="M${x.toFixed(1)} ${(y - 3.4).toFixed(1)} q-1.3 2 0 2.8 q1.3 -.8 0 -2.8 Z" fill="#29b6f6"/>
<ellipse class="nta-pop ntd${(i + ri + 2) % 6 + 1}" cx="${x.toFixed(1)}" cy="${(y + 1.2).toFixed(1)}" rx="${(2.3 * s).toFixed(1)}" ry="${(.8 * s).toFixed(1)}" fill="none" stroke="#81d4fa" stroke-width=".7"/></g></g>`;
    }).join("");
    const plants = [.2, .43, .66, .88].map((t) => plant(k, ax + (bx2 - ax) * t - 2, ay + (by2 - ay) * t - 1, s)).join("");
    rowsSvg += line + emit + plants;
  });
  const top = [P(0, 0), P(fx1 - fx0, 0), P(fx1 - fx0, 1), P(0, 1)].map((p) => p.join(" ")).join(" L");
  const side = `M${fx1} ${ty} L${fx1 + dx} ${ty + dy} L${fx1 + dx} ${by + dy} L${fx1} ${by} Z`;
  const boards = [ty + 8, ty + 16].map((y) => `<path d="M${fx0} ${y} H${fx1}" stroke="#6d4c2f" stroke-width=".6"/>`).join("");
  return `<defs>${ntV(wd, "#c49a6c", "#8d6239")}${ntV(wds, "#9b7146", "#6d4c2f")}<linearGradient id="${so}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6d4c33"/><stop offset="1" stop-color="#4e3524"/></linearGradient>
<radialGradient id="${wet}"><stop offset="0" stop-color="#21140c" stop-opacity=".95"/><stop offset="1" stop-color="#2d1d12" stop-opacity="0"/></radialGradient></defs>
${c.rain ? ntRainCloud(60) : ""}
${ntFoot(`${fx0 - 4} ${by + 6} ${fx1 + dx + 4} ${by + dy + 6} ${fx1 + dx + 4} ${by + 2} ${fx0 - 4} ${by + 2}`, .22)}
<path d="M${top} Z" fill="url(#${so})"/>
<path d="M${P(0, 1).join(" ")} L${P(fx1 - fx0, 1).join(" ")}" stroke="#8d6239" stroke-width="3"/>
<path d="M${P(0, 0).join(" ")} L${P(0, 1).join(" ")}" stroke="#a87e52" stroke-width="2.4"/>

${rowsSvg}
<path d="${side}" fill="url(#${wds})"/>
<rect x="${fx0}" y="${ty}" width="${fx1 - fx0}" height="${by - ty}" fill="url(#${wd})"/>${boards}
<path d="M${fx0} ${ty} H${fx1}" stroke="#d7b285" stroke-width="1.4"/>
${c.lcd ? `<rect x="40" y="106" width="32" height="10" rx="5" fill="#1e2328" opacity=".82"/><text x="56" y="113.2" font-size="${ntFit(c.lcd, 30, 6.4).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#b3e5fc" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}
${ntSoil(108, 40, c.moist)}`;
}

// A flower bed: a curved border of mulch with tulips, daisies and lavender,
// two small sprayers throwing low fans of water while it waters.
function ntIrrFlowers(c) {
  const ml = ntId(), ed = ntId(), mi = ntId();
  const cx = 58, cy = 96, rx = 54, ry = 18;
  const flowers = [];
  for (let i = 0; i < 22; i++) {
    const a = (i * 137.5) * Math.PI / 180, q = Math.sqrt(((i * 53) % 89) / 89) * .82;
    const x = cx + Math.cos(a) * rx * q, y = cy + Math.sin(a) * ry * q;
    const h = 16 + (i % 4) * 4, k = i % 4;
    const stem = `<path d="M${x.toFixed(1)} ${y.toFixed(1)} V${(y - h).toFixed(1)}" stroke="#558b2f" stroke-width=".8"/><path d="M${x.toFixed(1)} ${(y - 3).toFixed(1)} q-2.6 -1 -3 -4" stroke="#7cb342" stroke-width="1" fill="none"/>`;
    const fy = y - h;
    const sc = 1.6;
    const head0 = k === 0 ? `<path d="M${x - 2.2} ${fy} Q${x} ${fy - 6} ${x + 2.2} ${fy} Q${x} ${fy + 1.6} ${x - 2.2} ${fy} Z" fill="${["#e53935", "#ffb300", "#ec407a"][i % 3]}"/>`
      : k === 1 ? `${[0, 1, 2, 3, 4, 5].map((j) => `<ellipse cx="${(x + Math.cos(j) * 1.9).toFixed(1)}" cy="${(fy + Math.sin(j) * 1.2).toFixed(1)}" rx="1.3" ry=".8" fill="#fff"/>`).join("")}<circle cx="${x}" cy="${fy}" r="1" fill="#ffb300"/>`
      : k === 2 ? `${[0, 1, 2, 3, 4].map((j) => `<circle cx="${x}" cy="${(fy + j * 1.3).toFixed(1)}" r=".9" fill="#9575cd"/>`).join("")}`
      : `<circle cx="${x}" cy="${fy}" r="2.1" fill="#f06292"/><circle cx="${x}" cy="${fy}" r=".8" fill="#fff59d"/>`;
    const head = `<g transform="translate(${x} ${fy}) scale(${sc}) translate(${-x} ${-fy})">${head0}</g>`;
    // In winter nothing flowers: a few dry stems cut back, poking out of the snow.
    if (c.winter) {
      if (i % 3 === 0) flowers.push({ y, svg: `<path d="M${x.toFixed(1)} ${y.toFixed(1)} V${(y - 6 - (i % 4)).toFixed(1)}" stroke="#7a5c43" stroke-width=".9"/><path d="M${x.toFixed(1)} ${(y - 3).toFixed(1)} l-1.8 -2.2" stroke="#7a5c43" stroke-width=".7"/>` });
      continue;
    }
    flowers.push({ y, svg: stem + head });
  }
  flowers.sort((a, b) => a.y - b.y);
  const jets = [[14, 100, 1], [102, 98, -1]];
  return `<defs><radialGradient id="${ml}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#8d6e52"/><stop offset="1" stop-color="#5d4330"/></radialGradient>${ntV(ed, "#b0aaa0", "#7d776d")}${ntBlur(mi, 2.4)}</defs>
${c.rain ? ntRainCloud(92) : ""}
${ntFoot(`${cx - rx + 4} ${cy + ry + 6} ${cx + rx - 4} ${cy + ry + 6} ${cx + rx} ${cy + 4} ${cx - rx} ${cy + 4}`, .22)}
<path d="M${cx - rx} ${cy} V${cy + 5} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + 5} V${cy} Z" fill="url(#${ed})"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${ml})"/>
${Array.from({ length: 40 }, (_, i) => `<circle cx="${(cx + Math.cos(i * 2.4) * rx * .9 * ((i % 7) / 7)).toFixed(1)}" cy="${(cy + Math.sin(i * 2.4) * ry * .9 * ((i % 5) / 5)).toFixed(1)}" r=".6" fill="#a1887f" opacity=".6"/>`).join("")}
<!--wf-->${flowers.map((f) => f.svg).join("")}<!--/wf-->
${c.winter ? "" : jets.map(([x, y, s], i) => `<rect x="${x - 1}" y="${y - 6}" width="2" height="6" fill="#455a64"/><circle cx="${x}" cy="${y - 6.4}" r="1.4" fill="#263238"/>
<g class="nt-run"><g class="nta-sweep${s > 0 ? "L" : "R"}${i ? " ntd3" : ""}" style="transform-origin:${x}px ${y - 7}px">${[0, 1].map((j) => ((d, k) => `<path class="nta-flow ntd${k + 1}" style="animation-duration:1.3s" d="${d}" fill="none" stroke="#29b6f6" stroke-width="1.8" stroke-dasharray="0 4" stroke-linecap="round"/><path class="nta-flow ntd${k + 1}" style="animation-duration:1.3s" d="${d}" fill="none" stroke="#0277bd" stroke-width="1" stroke-dasharray="0 6" stroke-linecap="round"/>`)(`M${x} ${y - 7} Q${x + s * (14 + j * 10)} ${y - 26 - j * 4} ${x + s * (30 + j * 12)} ${y - 4 + j * 3}`, i * 2 + j)).join("")}</g></g>`).join("")}
${c.lcd ? `<rect x="44" y="113" width="32" height="10" rx="5" fill="#1e2328" opacity=".82"/><text x="60" y="120.2" font-size="${ntFit(c.lcd, 30, 6.4).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#b3e5fc" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}
${ntSoil(108, 60, c.moist)}`;
}
// The status light of a litter box: ready, cleaning, a cat in, full.
const litLed = (c) => ({ ready: "#43a047", cleaning: "#29b6f6", cat: "#ff9800", full: "#e53935", fault: "#e53935", off: "#5d6773" }[c.st] || "#5d6773");
const litLedCls = (c) => c.st === "full" || c.st === "fault" ? "nta-blinkfast" : c.on ? "nta-glow" : "";
// A cat in the doorway: its head, its ears, its eyes and whiskers.
const litCat = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})">
<path d="M-12 10 Q-14 -2 -10 -6 L-11 -15 L-4 -9 Q0 -10 4 -9 L11 -15 L10 -6 Q14 -2 12 10 Z" fill="#6d4c41"/>
<path d="M-9.4 -12 L-5.6 -8.6 L-9 -7.4 Z M9.4 -12 L5.6 -8.6 L9 -7.4 Z" fill="#f48fb1"/>
<path d="M-8 -2 Q-4 -5 0 -2 Q4 -5 8 -2" fill="none" stroke="#4e342e" stroke-width=".8"/>
<ellipse cx="-4.6" cy="0" rx="2.4" ry="2.8" fill="#d4e157"/><ellipse cx="4.6" cy="0" rx="2.4" ry="2.8" fill="#d4e157"/>
<ellipse cx="-4.6" cy="0" rx=".8" ry="2.4" fill="#212121"/><ellipse cx="4.6" cy="0" rx=".8" ry="2.4" fill="#212121"/>
<path d="M-1.4 4 H1.4 L0 5.6 Z" fill="#f48fb1"/><path d="M-3 6 Q0 8 3 6" fill="none" stroke="#3e2723" stroke-width=".7"/>
<path d="M-3 5 L-12 3.6 M-3 6 L-12 7 M3 5 L12 3.6 M3 6 L12 7" stroke="#efebe9" stroke-width=".5"/></g>`;
// The waste drawer's level, on a little window of its front.
const litDrawer = (x, y, w, f) => f === null || f === undefined ? "" : `<rect x="${x}" y="${y}" width="${w}" height="4.4" rx="2.2" fill="#10151a"/>
<rect x="${x + .7}" y="${y + .7}" width="${((w - 1.4) * Math.max(0.04, f)).toFixed(1)}" height="3" rx="1.5" fill="${f >= 0.9 ? "#e53935" : f >= 0.75 ? "#ffb300" : "#a1887f"}"/>`;
// The litter's grains, and the clumps the cleaning sifts out of it.
const litGrains = (x, y, w, hgt) => Array.from({ length: 24 }, (_, i) => { const u = ((i * 37) % 23) / 23, v = ((i * 53) % 19) / 19; return `<circle cx="${(x + u * w).toFixed(1)}" cy="${(y + v * hgt).toFixed(1)}" r=".7" fill="${i % 2 ? "#a88a56" : "#f1e2c0"}"/>`; }).join("");
const litClumps = (pts) => pts.map(([x, y], i) => `<g class="nta-clump ntd${i + 1}"><ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.4" fill="#8d6e4a"/><ellipse cx="${x - .6}" cy="${y - .4}" rx="1.2" ry=".6" fill="#b08d62"/></g>`).join("");
// A globe that turns on its base, Litter-Robot style. While it cleans the
// door turns away and back; the litter stays at the bottom of the globe, seen
// through the door wherever it is.
function ntLitterGlobe(c) {
  const g = ntId(), bs = ntId(), bt = ntId(), sd = ntId(), ins = ntId(), lit = ntId(), dr = ntId();
  const door = "M36 44 Q36 22 60 20 Q84 22 84 44 Q84 60 60 62 Q36 60 36 44 Z";
  return `<defs><radialGradient id="${g}" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e3e8ec"/><stop offset="1" stop-color="#9eabb6"/></radialGradient>
${ntV(bs, "#3c434b", "#16191d")}${ntV(bt, "#5a636c", "#2b3036")}${ntV(sd, "#25292e", "#0e1013")}
<radialGradient id="${ins}" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#3a4047"/><stop offset="1" stop-color="#0d1013"/></radialGradient>
${ntV(lit, "#e8d5ab", "#bfa06a")}<clipPath id="${dr}"><path class="nta-lrcycle" d="${door}"/></clipPath></defs>
${ntFoot("14 116 98 116 110 106 26 106", .3)}
${ntRoundBox(18, 70, 76, 45, 11, 4, `url(#${bs})`, `url(#${sd})`, `url(#${bt})`)}
<path d="M22 74 H90" stroke="#5a636c" stroke-width=".6"/>
<path d="M28 92 H84 Q86 92 86 94 V108 Q86 110 84 110 H28 Q26 110 26 108 V94 Q26 92 28 92 Z" fill="#20252a" stroke="#4a525b" stroke-width=".6"/>
${litDrawer(32, 97, 48, c.drawer)}
<path d="M48 105 H64" stroke="#5a636c" stroke-width="1.8" stroke-linecap="round"/>
<ellipse cx="60" cy="66" rx="30" ry="6" fill="#000" opacity=".35"/>
<circle cx="60" cy="38" r="34" fill="url(#${g})" stroke="#8e9ba6" stroke-width=".7"/>
<g clip-path="url(#${dr})"><circle cx="60" cy="38" r="34" fill="url(#${ins})"/>
<g class="nta-littilt" style="transform-origin:60px 56px"><path d="M14 56 H106 V96 H14 Z" fill="url(#${lit})"/><path d="M20 56 H100" stroke="#f3e5c4" stroke-width="1.2" opacity=".9"/>
${litGrains(30, 58, 60, 10)}${c.on ? litClumps([[48, 57], [66, 58], [58, 57.4]]) : ""}</g>
${c.cat && !c.on ? litCat(60, 42, 1.05) : ""}</g>
<path class="nta-lrcycle" d="${door}" fill="none" stroke="#c5ced6" stroke-width="2.4"/>
<path d="M30 30 Q34 12 52 6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
<rect x="54" y="80" width="12" height="4" rx="2" fill="#10151a"/><rect class="${litLedCls(c)}" x="55" y="81" width="10" height="2" rx="1" fill="${litLed(c)}"/>`;
}
// A box with rounded corners in three-quarter view, its depth going up and
// to the right at 45 degrees: the top and the side are the rounded outline
// swept back, so a rounded corner stays rounded on every face. They meet at
// the corner's 45 degree point, where the curve turns from one to the other.
function ntRoundBox(x0, y0, w, h, d, r, front, side, top, stroke = "") {
  const x1 = x0 + w, y1 = y0 + h, k = r * Math.SQRT1_2;
  const n = (v) => +v.toFixed(2);
  const B = (x, y) => `${n(x + d)} ${n(y - d)}`, F = (x, y) => `${n(x)} ${n(y)}`;
  const A = (sw, pt) => r ? `A${r} ${r} 0 0 ${sw} ${pt}` : `L${pt}`;
  const tl = [x0 + r - k, y0 + r - k], tr = [x1 - r + k, y0 + r - k], br = [x1 - r + k, y1 - r + k];
  const topFace = `M${F(...tl)} ${A(1, F(x0 + r, y0))} L${F(x1 - r, y0)} ${A(1, F(...tr))} L${B(...tr)} ${A(0, B(x1 - r, y0))} L${B(x0 + r, y0)} ${A(0, B(...tl))} Z`;
  const sideFace = `M${F(...tr)} ${A(1, F(x1, y0 + r))} L${F(x1, y1 - r)} ${A(1, F(...br))} L${B(...br)} ${A(0, B(x1, y1 - r))} L${B(x1, y0 + r)} ${A(0, B(...tr))} Z`;
  const frontFace = `M${F(x0 + r, y0)} H${n(x1 - r)} ${A(1, F(x1, y0 + r))} V${n(y1 - r)} ${A(1, F(x1 - r, y1))} H${n(x0 + r)} ${A(1, F(x0, y1 - r))} V${n(y0 + r)} ${A(1, F(x0 + r, y0))} Z`;
  return `<path d="${topFace}" fill="${top}"/><path d="${sideFace}" fill="${side}"/>
<path d="${frontFace}" fill="${front}"${stroke ? ` stroke="${stroke}" stroke-width=".7"` : ""}/>`;
}
// A closed box in three-quarter view, Petkit Pura style: a wide round
// entrance low on its front so the cat steps straight in, the litter lying
// flat inside, the drum turning around it while it cleans, and the waste
// drawer's gauge under the entrance.
function ntLitterBox(c) {
  const fr = ntId(), sd = ntId(), tp = ntId(), dr = ntId(), lit = ntId(), mt = ntId(), cp = ntId(), sh = ntId(), wl = ntId();
  const x0 = 8, y0 = 26, w = 88, h = 86, d = 16, r = 22;
  const x1 = x0 + w, y1 = y0 + h, ox = 52, oy = 70, orad = 30;
  return `<defs>${ntV(fr, "#ffffff", "#e3e8ec")}${ntV(sd, "#d3d9df", "#aab4bd")}${ntV(tp, "#f9fafb", "#e7ebee")}
<radialGradient id="${dr}" cx=".5" cy=".7" r=".8"><stop offset="0" stop-color="#e9edf0"/><stop offset=".55" stop-color="#bfc7ce"/><stop offset="1" stop-color="#7f8a94"/></radialGradient>${ntV(lit, "#ecdcb6", "#c4a670")}
<linearGradient id="${mt}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8c0c7"/><stop offset="1" stop-color="#8e98a1"/></linearGradient>
<linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="${wl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4e9ed"/><stop offset="1" stop-color="#b9c2ca"/></linearGradient><clipPath id="${cp}"><circle cx="${ox}" cy="${oy}" r="${orad - 2}"/></clipPath></defs>
${ntFoot(`${x0 - 4} ${y1 + 8} ${x1 + 2} ${y1 + 8} ${x1 + d + 4} ${y1 - d + 2} ${x0 + d} ${y1 - d + 2}`, .22)}
<path d="M6 122 Q4 118 10 116 H96 Q104 116 106 120 L98 124 Q96 125 92 125 H12 Q6 125 6 122 Z" fill="url(#${mt})"/>
${ntRoundBox(x0, y0, w, h, d, r, `url(#${fr})`, `url(#${sd})`, `url(#${tp})`, "#b3bdc5")}
<path d="M${x0 + 12} ${y0 + 5} Q${x0 + 36} ${y0 + 1.4} ${x0 + 62} ${y0 + 2.8}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
<rect x="38" y="31" width="28" height="4" rx="2" fill="#22272c"/><rect class="${litLedCls(c)}" x="40" y="32.1" width="24" height="1.8" rx=".9" fill="${litLed(c)}"/>
<circle cx="${ox}" cy="${oy + 1}" r="${orad + 2.4}" fill="#c9d1d8"/><circle cx="${ox}" cy="${oy}" r="${orad + 1.2}" fill="#eef1f4"/><circle cx="${ox}" cy="${oy}" r="${orad}" fill="url(#${dr})"/>
<g clip-path="url(#${cp})">
<rect x="${ox - orad}" y="${oy - orad}" width="${orad * 2}" height="10" fill="url(#${sh})"/>
<g class="nta-littilt" style="transform-origin:${ox}px ${oy + 14}px"><path d="M${ox - 40} ${oy + 12} H${ox + 40} V${oy + 40} H${ox - 40} Z" fill="url(#${lit})"/><path d="M${ox - 30} ${oy + 12} H${ox + 30}" stroke="#f7ecd0" stroke-width="1.2"/>
${litGrains(ox - 24, oy + 14, 48, 10)}${c.on ? litClumps([[ox - 9, oy + 13], [ox + 8, oy + 13.6], [ox, oy + 13]]) : ""}</g>
<g class="nta-lrcycle" style="transform-origin:${ox}px ${oy}px"><path d="M${ox - orad + 2} ${oy} a${orad - 2} ${orad - 2} 0 1 0 ${(orad - 2) * 2} 0 a${orad - 2} ${orad - 2} 0 1 0 ${-(orad - 2) * 2} 0 Z M${ox - 19} ${oy + 7} a19 19 0 1 1 38 0 a19 19 0 1 1 -38 0 Z" fill="url(#${wl})" fill-rule="evenodd" stroke="#8f9aa4" stroke-width=".6"/>
${[-50, 0, 50].map((a) => `<path d="M${ox} ${oy - orad + 4} v4" stroke="#9aa4ad" stroke-width="1.4" stroke-linecap="round" transform="rotate(${a} ${ox} ${oy})"/>`).join("")}</g>
${c.cat && !c.on ? litCat(ox, oy + 4, 1.2) : ""}</g>
<path d="M${ox - orad + 3} ${oy - 4} A${orad - 3} ${orad - 3} 0 0 1 ${ox + 4} ${oy - orad + 3}" fill="none" stroke="#fff" stroke-width="1" opacity=".35" stroke-linecap="round"/>
<path d="M${ox - orad - 1} ${oy + 6} A${orad + 1.6} ${orad + 1.6} 0 0 0 ${ox + orad + 1} ${oy + 6}" fill="none" stroke="#b7c0c8" stroke-width="1.2"/>
${litDrawer(30, 104.4, 44, c.drawer)}`;
}
// Sound waves on both sides of a detector or a speaker.
const ntWaves = (x, y, color, gap = 22) => `<g class="nt-run">${[0, 1, 2].map((i) => `<path class="nta-beacon ntd${i + 1}" d="M${x - gap - i * 6} ${y - 8 - i * 3} q-${4 + i * 2} ${8 + i * 3} 0 ${16 + i * 6}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>
<path class="nta-beacon ntd${i + 1}" d="M${x + gap + i * 6} ${y - 8 - i * 3} q${4 + i * 2} ${8 + i * 3} 0 ${16 + i * 6}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`).join("")}</g>`;
// The detector's light: a slow green blink, amber on a low battery, red and
// fast on alarm, with its halo.
const detLed = (c, x, y, r = 2.2) => { const h = ntId(); const col = c.on ? "#ff1744" : c.low ? "#ffb300" : "#43a047"; return `<defs>${ntBlur(h, 1.6)}</defs>
<circle class="${c.on ? "nta-blinkfast" : "nta-blink"}" cx="${x}" cy="${y}" r="${r * 2.4}" fill="${col}" opacity=".55" filter="url(#${h})"/>
<circle class="${c.on ? "nta-blinkfast" : "nta-blink"}" cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`; };
// A patch of floor, wall or ceiling that fades out at its edges, so the
// drawing does not sit in a box.
const ntPatch = (cx, cy, rx, ry, color) => { const g = ntId(); return `<defs><radialGradient id="${g}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${color}"/><stop offset=".65" stop-color="${color}" stop-opacity=".8"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/>`; };
const ntFade = (cx, cy, rx, ry) => { const m = ntId(), g = ntId(); return [m, `<defs><radialGradient id="${g}" cx=".5" cy=".5" r=".5"><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
<mask id="${m}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/></mask></defs>`]; };
// A corner of the room: a ceiling or a wall, softly lit.
const ntRoom = (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f3f5"/><stop offset="1" stop-color="#dde2e7"/></linearGradient></defs>`;
// A smoke detector on the ceiling, seen from below: its face towards us, its
// vented rim going up to the ceiling. On alarm the smoke rises from the room
// and spreads under the ceiling around it.
function ntDetSmoke(c) {
  const b = ntId(), sd = ntId(), bt = ntId(), pf = ntId(), rg = ntId(), cl = ntId();
  const cx = 60, cy = 50, rx = 46, ry = 14, h = 12;
  const puff = (x, y, r, cls) => `<g class="${cls}"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${pf})"/><circle cx="${(x + r * .7).toFixed(1)}" cy="${(y - r * .45).toFixed(1)}" r="${(r * .72).toFixed(1)}" fill="url(#${pf})"/><circle cx="${(x - r * .65).toFixed(1)}" cy="${(y - r * .3).toFixed(1)}" r="${(r * .6).toFixed(1)}" fill="url(#${pf})"/></g>`;
  const slots = [];
  for (let i = 0; i < 15; i++) { const a = Math.PI * (1.08 + i * .06); const x = cx + Math.cos(a) * rx * .97; const y = cy - h + Math.sin(a) * ry * .97 + h * .5; slots.push(`<rect x="${(x - .9).toFixed(1)}" y="${(y - 2.6).toFixed(1)}" width="1.8" height="5.2" rx=".9" fill="#9aa6b0" opacity="${(.35 + .65 * Math.sin((i + .5) / 15 * Math.PI)).toFixed(2)}"/>`); }
  return `<defs><radialGradient id="${b}" cx=".42" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#eef1f4"/><stop offset="1" stop-color="#cdd4da"/></radialGradient>
<linearGradient id="${sd}" x1="0" x2="1"><stop offset="0" stop-color="#b9c2ca"/><stop offset=".45" stop-color="#eef1f4"/><stop offset="1" stop-color="#aeb8c1"/></linearGradient>
<radialGradient id="${bt}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6dce2"/></radialGradient>
<radialGradient id="${pf}" cx=".45" cy=".4" r=".55"><stop offset="0" stop-color="#7f8c97" stop-opacity=".85"/><stop offset=".6" stop-color="#a3afb9" stop-opacity=".6"/><stop offset="1" stop-color="#cfd8dc" stop-opacity="0"/></radialGradient>
<radialGradient id="${rg}" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#ff1744" stop-opacity=".55"/><stop offset="1" stop-color="#ff1744" stop-opacity="0"/></radialGradient>
<linearGradient id="${cl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9dee3"/><stop offset="1" stop-color="#d9dee3" stop-opacity="0"/></linearGradient></defs>
${ntPatch(60, 20, 80, 30, "#e3e7eb")}
${c.on ? `<ellipse class="nta-blinkfast" cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 9}" fill="url(#${rg})"/>` : ""}
${c.on && (!c.co || c.smoke) ? `<g class="nt-run">${[[40, 118, 9, 1], [60, 122, 10, 3], [80, 118, 9, 5], [50, 124, 8, 2], [70, 122, 9, 4], [30, 124, 7, 6], [90, 124, 7, 3]].map(([x, y, r, d]) => puff(x, y, r, `nta-smoke ntd${d}`)).join("")}
${[[46, 62, 8, "nta-spreadL ntd2"], [74, 62, 8, "nta-spreadR ntd4"], [52, 66, 7, "nta-spreadL ntd5"], [68, 66, 7, "nta-spreadR ntd1"], [60, 64, 7, "nta-spreadL ntd6"]].map(([x, y, r, cls]) => puff(x, y, r, cls)).join("")}</g>` : ""}
<ellipse cx="${cx}" cy="${cy - h}" rx="${rx + 4}" ry="${ry + 2}" fill="#000" opacity=".07"/>
<path d="M${cx - rx} ${cy} V${cy - h} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy - h} V${cy} Z" fill="url(#${sd})"/>
${slots.join("")}
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${b})" stroke="#b5bfc8" stroke-width=".6"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx * .82}" ry="${ry * .82}" fill="none" stroke="#d3d9df" stroke-width="1"/>
${Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return `<path d="M${(cx + Math.cos(a) * rx * .36).toFixed(1)} ${(cy + Math.sin(a) * ry * .36).toFixed(1)} L${(cx + Math.cos(a) * rx * .72).toFixed(1)} ${(cy + Math.sin(a) * ry * .72).toFixed(1)}" stroke="#c2cad2" stroke-width="1.8" stroke-linecap="round"/>`; }).join("")}
<ellipse cx="${cx}" cy="${cy + 1.2}" rx="${rx * .3}" ry="${ry * .3}" fill="#c9d0d7"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * .28}" ry="${ry * .28}" fill="url(#${bt})" stroke="#b5bfc8" stroke-width=".5"/>
<path d="M${cx - rx * .7} ${cy - ry * .45} Q${cx - rx * .3} ${cy - ry * .85} ${cx + rx * .1} ${cy - ry * .86}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
${c.on ? `<ellipse class="nta-blinkfast" cx="${cx}" cy="${cy}" rx="${rx + 1}" ry="${ry + 1}" fill="none" stroke="#ff1744" stroke-width="1.8"/>` : ""}
${detLed(c, cx + rx * .5, cy + ry * .42, 1.5)}
${c.co ? `<text class="nta-blinkfast" x="${cx}" y="${cy + ry + 22}" font-size="13" font-weight="800" text-anchor="middle" fill="#e53935" ${NT_FONT}>CO</text>` : ""}
${c.on ? ntWaves(cx, cy + 30, "#e53935", 26) : ""}`;
}
// A CO alarm on the wall, its display reading the parts per million.
function ntDetCo(c) {
  const rm = ntId(), b = ntId(), sd = ntId(), al = ntId();
  return `${ntRoom(rm)}<defs>${ntV(b, "#ffffff", "#d7dde3")}${ntV(sd, "#c9d1d8", "#a2adb7")}<radialGradient id="${al}" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#ff1744" stop-opacity=".45"/><stop offset="1" stop-color="#ff1744" stop-opacity="0"/></radialGradient></defs>
${ntPatch(62, 58, 58, 60, "#e7ebef")}
${c.on ? `<ellipse class="nta-blinkfast" cx="60" cy="56" rx="50" ry="58" fill="url(#${al})"/>` : ""}
${ntWaves(62, 46, "#e53935", 36)}
${ntFoot("36 108 92 108 96 104 40 104", .2)}
${ntRoundBox(32, 12, 54, 92, 6, 12, `url(#${b})`, `url(#${sd})`, "#eef1f4", "#aab4bd")}
<path d="M38 18 Q58 14 80 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
${Array.from({ length: 21 }, (_, i) => `<circle cx="${43 + (i % 7) * 5.4}" cy="${26 + Math.floor(i / 7) * 5.6}" r="1.5" fill="#9fabb5"/>`).join("")}
<rect x="38" y="46" width="42" height="22" rx="3" fill="#1f262d"/>
${ntLcd(39.4, 47.4, 39.2, 19.2, c.lcd || "", true, c.on ? "#ff5252" : "#69f0ae", ntFit(c.lcd || "", 39, 9))}
<text x="59" y="80" font-size="10" font-weight="800" text-anchor="middle" fill="${c.on ? "#e53935" : "#37414b"}" ${NT_FONT}>CO</text>
<text x="59" y="86" font-size="3.6" text-anchor="middle" fill="#7a8590" ${NT_FONT}>ALARM</text>
<circle cx="50" cy="95" r="5" fill="#eef1f4" stroke="#aab4bd" stroke-width=".6"/><text x="50" y="96.4" font-size="3.4" text-anchor="middle" fill="#5d6773" ${NT_FONT}>TEST</text>
${detLed(c, 70, 95)}`;
}
// A leak sensor on the floor, and the water that sets it off.
function ntDetLeak(c) {
  const fl = ntId(), wl = ntId(), b = ntId(), sd = ntId(), pd = ntId();
  return `<defs><linearGradient id="${fl}" x1="0" y1="1" x2=".3" y2="0"><stop offset="0" stop-color="#c7cfd5"/><stop offset="1" stop-color="#e3e8ec"/></linearGradient>${ntV(wl, "#f3f5f7", "#e2e6ea")}
<radialGradient id="${b}" cx=".4" cy=".3" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe5ea"/></radialGradient>${ntV(sd, "#d3dae0", "#a9b4bd")}
<radialGradient id="${pd}" cx=".45" cy=".45" r=".55"><stop offset="0" stop-color="#4fc3f7" stop-opacity=".75"/><stop offset=".8" stop-color="#29b6f6" stop-opacity=".45"/><stop offset="1" stop-color="#29b6f6" stop-opacity="0"/></radialGradient></defs>
${(() => { const [m, d] = ntFade(60, 84, 70, 42); return `${d}<g mask="url(#${m})"><polygon points="-8 125 128 125 128 53 -8 53" fill="url(#${fl})"/>
${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${-14 + i * 24} 125 L${10 + i * 24} 53" stroke="#aeb8c0" stroke-width=".8"/>`).join("")}
${[66, 80, 98].map((y) => `<path d="M-8 ${y} H128" stroke="#aeb8c0" stroke-width=".8"/>`).join("")}</g>`; })()}
<g transform="translate(60 78) scale(1.45) translate(-60 -86)"><g class="nt-run"><ellipse class="nta-shimmer" cx="58" cy="94" rx="58" ry="20" fill="url(#${pd})"/>
${[0, 1, 2].map((i) => `<ellipse class="nta-pop ntd${i * 2 + 1}" cx="58" cy="94" rx="${30 + i * 10}" ry="${10 + i * 3.4}" fill="none" stroke="#e1f5fe" stroke-width=".8" opacity="0"/>`).join("")}</g>
${ntFoot("34 100 86 100 82 92 38 92", .25)}
<path d="M32 86 V92 Q32 101 60 101 Q88 101 88 92 V86 Z" fill="url(#${sd})"/>
${[0, 1, 2, 3].map((i) => `<rect x="${41 + i * 11}" y="${97.6 - Math.abs(1.5 - i) * .8}" width="3" height="2.6" rx=".6" fill="#b0bec5" stroke="#78909c" stroke-width=".4"/>`).join("")}
<ellipse cx="60" cy="86" rx="28" ry="9.4" fill="url(#${b})" stroke="#b5bfc8" stroke-width=".6"/>
<ellipse cx="60" cy="86" rx="18" ry="5.6" fill="none" stroke="#d8dee3" stroke-width="1"/>
<path d="M40 82 Q50 78 62 78" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
${detLed(c, 60, 86, 2)}
<g class="nt-run">${[[54, 1], [66, 3], [60, 5]].map(([x, d]) => `<ellipse class="nta-splash ntd${d}" cx="${x}" cy="84.6" rx="6" ry="1.8" fill="none" stroke="#4fc3f7" stroke-width=".9"/>
<path class="nta-drip ntd${d}" d="M${x} 78 q-2.6 3.8 0 5.4 q2.6 -1.6 0 -5.4 Z" fill="#4fc3f7" stroke="#0288d1" stroke-width=".3"/>`).join("")}</g>
${ntWaves(60, 66, "#e53935", 36)}</g>`;
}
function ntDetDoor(c) {
  const wd = ntId(), fr = ntId(), bd = ntId(), dk = ntId();
  // A pulled-off sensor is an alarm, not an open door.
  const open = !!c.smoke;
  const gw = ntId(), ex = ntId(), sk = ntId(), al = ntId(), cl = ntId(), pk = ntId(), gc = ntId(), gs = ntId();
  const style = c.window ? "" : c.style || "";
  const anth = c.frame === "anthracite";
  const sf = anth ? "#4a5259" : "#f3f5f7", ss = anth ? "#262c31" : "#b7c0c8", sg = anth ? "#1e2327" : "#b0bcc6";
  const F = open ? 1 : 0;
  const n2 = (v) => +v.toFixed(2);
  // Just after a change (c.trans, the seconds gone by) the leaf swings, slides
  // or rises once, from where it was to where it is, the magnet with it.
  const swing = c.trans ? `dur="${DOOR_TRANS_S}s" begin="0s" fill="freeze" data-swing="${c.trans.toFixed(2)}" calcMode="spline" keyTimes="0;1" keySplines=".45 0 .25 1"` : "";
  const anim = (attr, from, to) => (c.trans ? `<animate attributeName="${attr}" values="${from};${to}" ${swing}/>` : "");
  const animT = (from, to) => (c.trans ? `<animateTransform attributeName="transform" type="translate" values="${from};${to}" ${swing}/>` : "");
  const move = (dxOpen, dyOpen, inner, clip = "") => {
    const at = (f) => `${n2(dxOpen * f)} ${n2(dyOpen * f)}`;
    return `<g${clip ? ` clip-path="url(#${clip})"` : ""}><g transform="translate(${at(F)})">${animT(at(1 - F), at(F))}${inner}</g></g>`;
  };
  // What only a shut leaf shows (its handle, the light on its glass) fades.
  const shut = (inner) => (inner ? `<g opacity="${1 - F}">${anim("opacity", F, 1 - F)}${inner}</g>` : "");
  // A leaf hinged at hx, w wide, from y to y + h, turned in by f (0 shut, 1
  // open): every point of its face is carried onto the leaf seen at an angle.
  // A gate's leaf turns further: k is how much of its width is left seen
  // open, sk how much its far edge shrinks.
  const leafOf = (hx, w, y, h, k = .58, sk = .066) => {
    const P = (px, py, f) => {
      const u = (px - hx) / w, top = y + h * sk * u, bot = y + h - h * sk * u;
      const ox = hx + w * k * u, oy = top + (py - y) / h * (bot - top);
      return `${n2(px + (ox - px) * f)} ${n2(py + (oy - py) * f)}`;
    };
    const pts = (list, f) => list.map(([px, py]) => P(px, py, f)).join(" ");
    const R = (x0, y0, x1, y1, attrs) => {
      const list = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      return `<polygon points="${pts(list, F)}" ${attrs}>${anim("points", pts(list, 1 - F), pts(list, F))}</polygon>`;
    };
    const L = (x0, y0, x1, y1, attrs) => `<path d="M${P(x0, y0, F)} L${P(x1, y1, F)}" ${attrs}>${anim("d", `M${P(x0, y0, 1 - F)} L${P(x1, y1, 1 - F)}`, `M${P(x0, y0, F)} L${P(x1, y1, F)}`)}</path>`;
    return { R, L };
  };
  const hdl = (x, y, h = 12) => `<rect x="${x}" y="${y}" width="3" height="${h}" rx="1.5" fill="#c9ccd0" stroke="#8e949a" stroke-width=".4"/>`;
  const shine = (x, y, w) => `<path d="M${x} ${y + 12} L${x + w * .5} ${y + 6} M${x} ${y + 24} L${x + w} ${y + 10}" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>`;
  // A sash seen flat: its frame round its glass.
  const sash = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sf}" stroke="${ss}" stroke-width=".7"/><rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" fill="url(#${gw})" stroke="${sg}" stroke-width=".5"/>`;
  // A sash that turns on its hinge at x, the garden behind it.
  const turning = (x, y, w, h, extra = "") => {
    const { R } = leafOf(x, w, y, h);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${sk})"/>${R(x, y, x + w, y + h, `fill="${sf}" stroke="${ss}" stroke-width=".7"`)}${R(x + 5, y + 5, x + w - 5, y + h - 5, `fill="url(#${gw})" stroke="${sg}" stroke-width=".5"`)}${shut(extra)}`;
  };
  const ws = c.window ? c.wstyle || "casement" : "";
  let stripY = 2, stripH = 114;
  // Where the magnet goes when it opens: across, or up with a garage door.
  let mdx = -23, mdy = 0, mclip = "";
  // A window that tips in (#137) carries its magnet with its sash: squeezed
  // towards the hinge and widened like the sash, not slid.
  let mtilt = null;
  let leaf = "";
  if (ws === "double") {
    // Two sashes; the right one opens, the left one stays shut.
    leaf = sash(10, 6, 31, 106) + shine(16, 12, 14) + turning(41, 6, 31, 106, shine(47, 12, 14) + hdl(66, 76));
    mdx = -10;
  } else if (ws === "sliding") {
    // Two panes on their rails; the front one runs left over the other and the
    // garden shows through.
    mdx = -26;
    leaf = `<rect x="10" y="8" width="62" height="102" fill="url(#${sk})"/>${sash(10, 8, 34, 102)}${hdl(12.5, 52, 14)}
${move(-26, 0, sash(38, 8, 34, 102) + shine(44, 14, 18))}
<rect x="8" y="4" width="66" height="4" fill="${sf}" stroke="${ss}" stroke-width=".5"/><rect x="8" y="110" width="66" height="4" fill="${sf}" stroke="${ss}" stroke-width=".5"/>`;
  } else if (ws === "small") {
    // A small window set in the wall, the contact on its frame.
    stripY = 22; stripH = 76; mdx = -16;
    leaf = `<rect x="4" y="2" width="90" height="114" fill="#e9e3d8"/><rect x="4" y="2" width="90" height="114" fill="url(#${dk})" opacity=".06"/>
<rect x="24" y="22" width="48" height="76" fill="${sf}" stroke="${ss}" stroke-width=".5"/>${turning(26, 26, 46, 68, shine(32, 30, 20) + hdl(65, 76, 10))}`;
  } else if (ws === "tilt") {
    // A wide, low window hinged at the bottom (#137): open, its top tips in
    // towards the room, so it comes down and looks wider, the sky showing
    // over it, and two stays hold it on the sides.
    stripY = 24; stripH = 46; mdx = 0; mdy = 0;
    const x0 = 9, x1 = 69, y0 = 33, y1 = 65, cx = (x0 + x1) / 2, drop = 13, spread = 3.5;
    // The magnet sits round y 45, where the sash is widened by this much.
    mtilt = { cx, y1, sx: n2(1 + spread / ((x1 - x0) / 2) * ((y1 - 45) / (y1 - y0))), sy: n2(1 - drop / (y1 - y0)) };
    const P = (px, py, f) => {
      const v = (y1 - py) / (y1 - y0);
      return `${n2(px + (px - cx) / ((x1 - x0) / 2) * spread * v * f)} ${n2(py + drop * v * f)}`;
    };
    const R = (a, b, cc, d, attrs) => {
      const list = [[a, b], [cc, b], [cc, d], [a, d]];
      const pts = (f) => list.map(([px, py]) => P(px, py, f)).join(" ");
      return `<polygon points="${pts(F)}" ${attrs}>${anim("points", pts(1 - F), pts(F))}</polygon>`;
    };
    const stay = (x, sx) => `<path d="M${x} ${y0 + 4} L${n2(x + sx)} ${y0 + drop}" stroke="#9aa3ab" stroke-width="1.1" stroke-linecap="round"/>`;
    leaf = `<rect x="4" y="2" width="90" height="114" fill="#e9e3d8"/><rect x="4" y="2" width="90" height="114" fill="url(#${dk})" opacity=".06"/>
<rect x="5" y="29" width="68" height="40" fill="${sf}" stroke="${ss}" stroke-width=".5"/><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#${sk})"/>
<g opacity="${F}">${anim("opacity", 1 - F, F)}${stay(x0 + 1, -2.5)}${stay(x1 - 1, 2.5)}</g>
${R(x0, y0, x1, y1, `fill="${sf}" stroke="${ss}" stroke-width=".7"`)}${R(x0 + 4, y0 + 4, x1 - 4, y1 - 4, `fill="url(#${gw})" stroke="${sg}" stroke-width=".5"`)}
${shut(`<path d="M${x0 + 10} ${y0 + 15} L${x0 + 22} ${y0 + 7} M${x0 + 12} ${y0 + 23} L${x0 + 34} ${y0 + 8}" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/><rect x="${cx - 5}" y="${y0 + 1.2}" width="10" height="2.4" rx="1.2" fill="#c9ccd0" stroke="#8e949a" stroke-width=".4"/>`)}`;
  } else if (ws) {
    // One sash.
    leaf = turning(10, 6, 62, 106, shine(22, 12, 28) + hdl(62, 56));
  } else if (style === "gate" || style === "sliding_gate") {
    // A driveway gate between its posts, the garden through its bars: one
    // leaf hinged on a post that swings wide open into the drive, two that
    // open from the middle, or one that slides behind a post.
    const gcol = c.frame === "white" ? "#eef1f3" : "#3d444b";
    const right = c.gateSide === "right";
    const barsOf = (x0, x1, R, L) => {
      let o = R(x0, 32, x1, 108, `fill="none" stroke="${gcol}" stroke-width="2.4" stroke-linejoin="round"`) + L(x0, 58, x1, 58, `stroke="${gcol}" stroke-width="1.8"`);
      for (let x = x0 + 4; x < x1 - 1.5; x += 4) o += L(x, 32, x, 108, `stroke="${gcol}" stroke-width="1.2"`);
      return o;
    };
    const flat = { R: (x0, y0, x1, y1, a) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" ${a}/>`, L: (x0, y0, x1, y1, a) => `<path d="M${x0} ${y0} L${x1} ${y1}" ${a}/>` };
    const post = (x) => `<rect x="${x}" y="26" width="7" height="86" fill="#d3cbbb" stroke="#a89f8e" stroke-width=".5"/><rect x="${x - 1}" y="23" width="9" height="4" fill="#bdb3a1"/>`;
    let gate;
    if (style === "sliding_gate") {
      gate = move(right ? 58 : -58, 0, barsOf(11, 71, flat.R, flat.L) + `<circle cx="20" cy="110" r="2" fill="#2b2f33"/><circle cx="62" cy="110" r="2" fill="#2b2f33"/>`, right ? gs : pk);
      mdx = right ? 58 : -58;
    } else if (c.gateLeaves === 2) {
      const a1 = leafOf(11, 30, 32, 76, .2, .13), a2 = leafOf(71, -30, 32, 76, .2, .13);
      gate = barsOf(11, 41, a1.R, a1.L) + barsOf(41, 71, a2.R, a2.L);
      mdx = 4;
    } else {
      const a1 = right ? leafOf(71, -60, 32, 76, .16, .13) : leafOf(11, 60, 32, 76, .16, .13);
      gate = barsOf(11, 71, a1.R, a1.L);
      mdx = right ? 4 : -48;
    }
    leaf = `<rect x="0" y="0" width="82" height="118" fill="url(#${sk})"/><path d="M28 118 L37 72 H45 L54 118 Z" fill="#d6d0c4" opacity=".85"/>${gate}${post(4)}${post(71)}`;
  } else if (style === "garage") {
    // A sectional garage door, four smooth panels; open, it has gone up into
    // the ceiling with the magnet, one panel still showing at the top.
    const pf = anth ? `url(#${ex})` : `url(#${bd})`, ps = anth ? "#1d2226" : "#b7c0c8";
    const grooves = [32.5, 59, 85.5].map((y) => `<path d="M11 ${y} H71" stroke="${ps}" stroke-width=".8" opacity=".8"/><path d="M11 ${y + 1} H71" stroke="#fff" stroke-width=".5" opacity="${anth ? .12 : .6}"/>`).join("");
    leaf = `<rect x="10" y="6" width="62" height="106" fill="url(#${dk})"/><rect x="10" y="98" width="62" height="14" fill="#2c3237"/>
${move(0, -90, `<rect x="10" y="6" width="62" height="106" fill="${pf}" stroke="${ps}" stroke-width=".7"/>${grooves}`, gc)}`;
    mdx = 0; mdy = -90; mclip = gc;
  } else if (style === "pocket") {
    // A pocket door: one big pane that slides into the wall on its left.
    mdx = -46;
    const pf = c.frame ? sf : `url(#${al})`, ps = c.frame ? ss : "#3e454c";
    leaf = `<rect x="10" y="8" width="62" height="104" fill="url(#${sk})"/>
${move(-46, 0, `<rect x="10" y="8" width="62" height="101" fill="${pf}" stroke="${ps}" stroke-width=".6"/>
<rect x="14" y="12" width="54" height="93" fill="url(#${gw})" stroke="${ps}" stroke-width=".4"/>${shine(20, 22, 24)}<rect x="65" y="48" width="3" height="22" rx="1.2" fill="#2b3035"/>`, pk)}
<rect x="2" y="2" width="8" height="114" fill="#e9e3d8" stroke="#cfc6b6" stroke-width=".5"/><rect x="2" y="4" width="72" height="4" fill="${c.frame ? sf : "#7b838b"}"/><rect x="2" y="109" width="72" height="4" fill="${c.frame ? sf : "#7b838b"}"/>`;
  } else if (style.startsWith("sliding")) {
    // A sliding door does not swing: its panel runs left on a rail and the
    // opening shows behind it, daylight for the patio door, the room for the barn door.
    const glass = style === "sliding_glass";
    mdx = glass ? -28 : -30;
    const pane = (x) => `<rect x="${x}" y="8" width="32" height="101" fill="url(#${al})" stroke="#3e454c" stroke-width=".6"/>
<rect x="${x + 3.5}" y="11.5" width="25" height="94" fill="url(#${gw})" stroke="#4a5158" stroke-width=".4"/>
<path d="M${x + 7} 30 L${x + 17} 22 M${x + 7} 42 L${x + 24} 28" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>`;
    const roller = (x) => `<rect x="${x - .9}" y="5" width="1.8" height="7" fill="#2b2f33"/><circle cx="${x}" cy="5" r="3" fill="#3a3f44" stroke="#1d2024" stroke-width=".5"/>`;
    const moving = glass
      ? `${pane(40)}<rect x="66" y="48" width="2.2" height="22" rx="1.1" fill="#2b3035"/>`
      : `${roller(20)}${roller(62)}<rect x="10" y="10" width="62" height="104" fill="url(#${wd})" stroke="#8a6440" stroke-width=".7"/>
${[1, 2, 3, 4, 5].map((i) => `<path d="M${(10 + i * 62 / 6).toFixed(1)} 10 V114" stroke="#9a7350" stroke-width=".6" opacity=".7"/>`).join("")}
<rect x="10" y="10" width="62" height="9" fill="#c09468" stroke="#8a6440" stroke-width=".5"/><rect x="10" y="105" width="62" height="9" fill="#c09468" stroke="#8a6440" stroke-width=".5"/>
<path d="M16 104 L66 20" stroke="#c09468" stroke-width="7"/><path d="M14 101 L63 19 M19 106 L68 22" stroke="#8a6440" stroke-width=".5"/>
<rect x="63" y="48" width="2.6" height="30" rx="1.2" fill="#2b2f33"/>`;
    leaf = `<rect x="10" y="8" width="62" height="104" fill="url(#${glass ? sk : dk})"/>
${glass ? `${pane(10)}<rect x="8" y="4" width="66" height="4" fill="#7b838b"/><rect x="8" y="109" width="66" height="4" fill="#7b838b"/>` : `<rect x="0" y="2" width="76" height="3" rx="1" fill="#2b2f33"/>`}
${move(mdx, 0, moving, cl)}`;
  } else {
    // A swinging door drawn flat, then turned in: every point of its face is
    // carried onto the leaf seen at an angle. An entrance door lets the
    // daylight in, an inside door shows the room.
    const { R, L } = leafOf(10, 62, 6, 106);
    const ext = style.startsWith("external");
    const lite = `stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"`;
    leaf = `<rect x="10" y="6" width="62" height="106" fill="url(#${ext ? sk : dk})"/>`
      + R(10, 6, 72, 112, ext ? `fill="url(#${ex})" stroke="#1d2226" stroke-width=".7"` : `fill="url(#${wd})" stroke="#8a6440" stroke-width=".7"`);
    if (style === "glass_top") {
      // The wooden door with its top panel glazed, the bottom one still wood.
      leaf += R(17, 16, 65, 54, `fill="url(#${gw})" stroke="#9a7350" stroke-width=".9"`) + L(22, 30, 34, 22, lite) + L(22, 42, 44, 26, lite)
        + R(17, 62, 65, 102, `fill="none" stroke="#9a7350" stroke-width=".9" opacity=".75"`) + R(62, 60, 66, 64, `fill="#c9ccd0" stroke="#8e949a" stroke-width=".5"`);
    } else if (style === "glass") {
      // An interior door: a wooden frame round one tall pane of satin glass, a lever.
      leaf += R(18, 14, 64, 104, `fill="url(#${gw})" stroke="#9a7350" stroke-width=".6"`) + L(24, 32, 40, 22, lite) + L(24, 48, 54, 28, lite)
        + R(57, 60.6, 66, 63.4, `fill="#c9ccd0" stroke="#8e949a" stroke-width=".4"`);
    } else if (ext) {
      // An entrance door in anthracite, seen from inside where the contact is:
      // a lever and its lock, the back of the letter box, maybe a frosted strip.
      if (style === "external_glass") leaf += R(24, 16, 38, 100, `fill="url(#${gw})" stroke="#15191c" stroke-width=".8"`)
        + [44, 72].map((y) => L(24, y, 38, y, `stroke="#15191c" stroke-width=".8"`)).join("");
      const lx = style === "external" ? 27 : 42;
      leaf += R(lx, 74, lx + 18, 82, `fill="#3d444b" stroke="#15191c" stroke-width=".5"`)
        + L(lx + 1.5, 76, lx + 16.5, 76, `stroke="#5d656d" stroke-width=".8"`)
        + R(62.5, 56, 65.5, 74, `fill="#c9ccd0" stroke="#8e949a" stroke-width=".4"`)
        + R(55, 59.4, 64.5, 62.4, `fill="#d5d9dd" stroke="#8e949a" stroke-width=".4"`)
        + R(63.3, 68, 64.7, 71.5, `fill="#5d656d"`);
    } else {
      // The wooden door: two panels and its knob.
      leaf += R(17, 16, 65, 54, `fill="none" stroke="#9a7350" stroke-width=".9" opacity=".75"`) + R(17, 62, 65, 102, `fill="none" stroke="#9a7350" stroke-width=".9" opacity=".75"`)
        + R(62, 60, 66, 64, `fill="#c9ccd0" stroke="#8e949a" stroke-width=".5"`);
    }
  }
  // Each model: its magnet, drawn at the shut position, then its body.
  const parts = {
    // Sonoff SNZB-04P: a tall body, its light at the top, a pairing slot.
    sonoff: [`<rect x="62" y="33" width="8" height="24" rx="2" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".5"/>`, `<rect x="74" y="26" width="14" height="38" rx="3" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".6"/>
<path d="M76 29 Q81 27.6 86 29" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<circle class="${open ? "nta-blinkfast" : ""}" cx="81" cy="33" r="1.2" fill="${open ? "#29b6f6" : "#cfd6dc"}"/>
<rect x="78.4" y="58" width="5.2" height="2" rx="1" fill="#d5dbe0"/>`],
    // Aqara: a slim stick and a small magnet, the light hidden under the shell.
    aqara: [`<rect x="63" y="38" width="6" height="14" rx="1.6" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".5"/>`, `<rect x="76" y="30" width="10" height="30" rx="2.4" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".6"/>
<path d="M77.6 32.4 Q81 31.4 84.4 32.4" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/>
<circle class="${open ? "nta-blinkfast" : ""}" cx="81" cy="35" r=".9" fill="${open ? "#29b6f6" : "#e3e7eb"}"/>`],
    // Philips Hue Secure: a softer, rounder body with its name on it.
    hue: [`<rect x="62" y="34" width="9" height="22" rx="4" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".5"/>`, `<rect x="73.5" y="25" width="15" height="40" rx="6.5" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".6"/>
<path d="M76 29 Q81 27 86 29" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round"/>
<text x="81" y="58" font-size="4" font-weight="700" text-anchor="middle" fill="#b9c1c8" ${NT_FONT}>hue</text>
<circle class="${open ? "nta-blinkfast" : ""}" cx="81" cy="33" r="1" fill="${open ? "#29b6f6" : "#dfe4e8"}"/>`],
    // Third Reality 3RDS17BZ: a wide, short block with one big rounded corner,
    // a narrow magnet as tall as it, a short mark on each where they meet.
    thirdreality: [`<rect x="63" y="33" width="6" height="24" rx="1.2" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".5"/>
<path d="M67.6 42 V48" stroke="#c3cbd2" stroke-width=".7" stroke-linecap="round"/>`, `<path d="M74.5 33 H82 A7 7 0 0 1 89 40 V55.5 A1.5 1.5 0 0 1 87.5 57 H74.5 A1.5 1.5 0 0 1 73 55.5 V34.5 A1.5 1.5 0 0 1 74.5 33 Z" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".6"/>
<path d="M75 35 H81.5" stroke="#fff" stroke-width="1" stroke-linecap="round"/>
<path d="M74.8 42 V48" stroke="#c3cbd2" stroke-width=".7" stroke-linecap="round"/>`],
    // IKEA PARASOLL: a long slim stick, rounded at both ends, its light a
    // short slot near the top; the magnet a slimmer stick with the same slot.
    ikea: [`<rect x="62" y="27" width="8" height="36" rx="4" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".5"/>
<path d="M64.6 35 H67.4" stroke="#d5dbe0" stroke-width="1" stroke-linecap="round"/>`, `<rect x="75" y="25" width="12" height="42" rx="5.5" fill="url(#${bd})" stroke="#aeb8c1" stroke-width=".6"/>
<path class="${open ? "nta-blinkfast" : ""}" d="M78.6 34 H83.4" stroke="${open ? "#29b6f6" : "#b9c1c8"}" stroke-width="1.2" stroke-linecap="round"/>`],
}[c.model] || ["", ""];
  return `<defs>${ntV(wd, "#d8b48a", "#b48759")}${anth ? ntV(fr, "#5a626a", "#3a4148") : c.frame || c.window ? ntV(fr, "#ffffff", "#e3e7ea") : ntV(fr, "#fbf8f2", "#e8e1d4")}${ntV(bd, "#ffffff", "#dfe4e8")}
${ntV(ex, "#4d555d", "#2b3136")}${ntV(al, "#7d858d", "#5b636b")}<clipPath id="${cl}"><rect x="0" y="0" width="120" height="120"/></clipPath><clipPath id="${pk}"><rect x="10" y="0" width="110" height="120"/></clipPath><clipPath id="${gs}"><rect x="-40" y="0" width="112" height="120"/></clipPath><clipPath id="${gc}"><rect x="10" y="6" width="62" height="106"/></clipPath>
<linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8eefa"/><stop offset=".58" stop-color="#b5dcf0"/><stop offset=".59" stop-color="#93c47f"/><stop offset="1" stop-color="#6a9f58"/></linearGradient>
<linearGradient id="${dk}" x1="0" x2="1"><stop offset="0" stop-color="#1f252b"/><stop offset="1" stop-color="#3a434b"/></linearGradient>
<linearGradient id="${gw}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d4ecf8"/><stop offset="1" stop-color="#8fc7e6"/></linearGradient></defs>
<g class="${c.vib ? "nta-vib" : ""}">${leaf}${c.cracked ? `<g stroke="#fff" stroke-width=".9" stroke-linecap="round" fill="none" opacity=".95"><path d="M36 46 L26 34 M36 46 L48 36 M36 46 L52 52 M36 46 L44 62 M36 46 L28 60 M36 46 L22 48"/><path d="M30 39 L34 37 M44 39 L46 43 M47 54 L44 57 M31 55 L27 53" stroke-width=".6"/></g><circle cx="36" cy="46" r="1.6" fill="#fff"/>` : ""}</g>
${c.vib ? [0, 1, 2].map((i) => `<path class="nta-beacon ntd${i + 1}" d="M${6 - i * 3} ${44 - i * 3} q-${2 + i} ${8 + i * 3} 0 ${16 + i * 6}" fill="none" stroke="#ef6c00" stroke-width="1.6" stroke-linecap="round"/>`).join("") : ""}
<rect x="72" y="${stripY}" width="18" height="${stripH}" fill="url(#${fr})" stroke="${anth ? "#22282d" : c.frame || c.window ? "#c5ccd2" : "#cfc6b6"}" stroke-width=".6"/>
<g${c.tamper ? ` transform="rotate(-24 81 26)"` : ""}>${mtilt ? (() => {
    const sc = (f) => `${n2(1 + (mtilt.sx - 1) * f)} ${n2(1 + (mtilt.sy - 1) * f)}`;
    return `<g transform="translate(${mtilt.cx} ${mtilt.y1})"><g transform="scale(${sc(F)})">${c.trans ? `<animateTransform attributeName="transform" type="scale" values="${sc(1 - F)};${sc(F)}" ${swing}/>` : ""}<g transform="translate(${-mtilt.cx} ${-mtilt.y1})">${parts[0]}</g></g></g>`;
  })() : move(mdx, mdy, parts[0], mclip)}${parts[1]}</g>
${c.tamper ? `<path d="M86 36 l5 -4 M88 42 l6 -1 M85 48 l5 3" stroke="#e53935" stroke-width="1.4" stroke-linecap="round"/>` : ""}
${open ? ntWaves(81, 46, "#ef6c00", 20) : ""}`;
}
// A vibration sensor stuck on a window sill or a washing machine (Aqara):
// shaken, it trembles and lines run out on both sides.
function ntDetVibration(c) {
  const sf = ntId(), bd = ntId(), sd = ntId();
  const lines = [0, 1, 2].map((i) => `<path class="nta-beacon ntd${i + 1}" d="M${30 - i * 6} ${46 - i * 3} q-${3 + i * 2} ${9 + i * 3} 0 ${18 + i * 6}" fill="none" stroke="#ef6c00" stroke-width="1.8" stroke-linecap="round"/><path class="nta-beacon ntd${i + 1}" d="M${90 + i * 6} ${46 - i * 3} q${3 + i * 2} ${9 + i * 3} 0 ${18 + i * 6}" fill="none" stroke="#ef6c00" stroke-width="1.8" stroke-linecap="round"/>`).join("");
  return `<defs>${ntV(sf, "#d2b38c", "#a98258")}${ntV(bd, "#ffffff", "#dde3e8")}${ntV(sd, "#c9d1d8", "#a3aeb8")}</defs>
<polygon points="0 84 120 84 120 112 0 112" fill="url(#${sf})"/><path d="M0 84 H120" stroke="#f0dcc0" stroke-width="1.2"/>
${[14, 38, 66, 92].map((x) => `<path d="M${x} 90 q8 3 16 0" stroke="#9a7350" stroke-width=".6" fill="none" opacity=".6"/>`).join("")}
${c.on ? `<g class="nt-run">${lines}</g>` : ""}
<g class="${c.on ? "nta-vib" : ""}">
${c.model === "tuya" ? `${ntFoot("32 86 90 86 92 83 34 83", .28)}
<rect x="34" y="66" width="56" height="18" rx="6" fill="url(#${sd})"/>
<rect x="32" y="64" width="56" height="20" rx="6" fill="url(#${bd})" stroke="#aab4bd" stroke-width=".6"/>
<path d="M38 67.4 Q60 65 82 67.4" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/>
${detLed({ on: false, low: c.low }, 40, 75, 1.3)}
${c.on ? `<circle class="nta-blinkfast" cx="40" cy="75" r="1.5" fill="#29b6f6"/>` : ""}
<rect x="70" y="73" width="10" height="3" rx="1.5" fill="#d5dbe0"/>`
    : `${ntFoot("40 86 84 86 86 83 42 83", .28)}
<rect x="43" y="46" width="40" height="38" rx="9" fill="url(#${sd})"/>
<rect x="40" y="45" width="40" height="39" rx="9" fill="url(#${bd})" stroke="#aab4bd" stroke-width=".6"/>
<path d="M46 50 Q58 46.4 72 50" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<circle cx="70" cy="74" r="1.1" fill="#b5bec6"/>
${detLed({ on: false, low: c.low }, 50, 74, 1.4)}
${c.on ? `<circle class="nta-blinkfast" cx="50" cy="74" r="1.6" fill="#29b6f6"/>` : ""}`}</g>`;
}
// A glass break detector on the window frame. On alarm the pane cracks from
// the point of impact and the room glows red.
function ntDetGlass(c) {
  const gl = ntId(), fr = ntId(), bd = ntId(), rg = ntId();
  const ix = 46, iy = 54;
  const cracks = [[-34, -30], [-6, -44], [26, -34], [34, -4], [24, 34], [-10, 44], [-36, 18], [-38, -6]]
    .map(([dx, dy], i) => `<path d="M${ix} ${iy} l${(dx * .45).toFixed(1)} ${(dy * .45 + (i % 2 ? 3 : -3)).toFixed(1)} L${ix + dx} ${iy + dy}" fill="none" stroke="#ffffff" stroke-width="${i % 2 ? .8 : 1.1}" stroke-linecap="round"/>`).join("")
    + [[14, 1], [24, .8]].map(([r, w]) => `<path d="M${ix - r} ${iy} q${r * .3} ${-r * .9} ${r} ${-r} q${r * .8} ${r * .2} ${r} ${r} q${-r * .3} ${r * .9} ${-r} ${r} q${-r * .8} ${-r * .2} ${-r} ${-r} Z" fill="none" stroke="#ffffff" stroke-width="${w}" opacity=".85"/>`).join("");
  return `<defs><linearGradient id="${gl}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe9f7"/><stop offset=".55" stop-color="#9fd1ec"/><stop offset="1" stop-color="#7bbfe2"/></linearGradient>${ntV(fr, "#fbfbfb", "#dfe4e8")}${ntV(bd, "#ffffff", "#d9dfe4")}
<radialGradient id="${rg}" cx=".5" cy=".5" r=".5"><stop offset=".5" stop-color="#ff1744" stop-opacity=".35"/><stop offset="1" stop-color="#ff1744" stop-opacity="0"/></radialGradient></defs>
${c.on ? `<ellipse class="nta-blinkfast" cx="60" cy="58" rx="62" ry="60" fill="url(#${rg})"/>` : ""}
<rect x="10" y="4" width="84" height="106" rx="2" fill="url(#${fr})" stroke="#c2cad1" stroke-width=".7"/>
<rect x="17" y="11" width="70" height="92" fill="url(#${gl})" stroke="#b0bcc6" stroke-width=".6"/>
<path d="M24 22 L40 16 M24 34 L56 20" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>
${c.on ? `<g>${cracks}</g><g class="nt-run">${[[30, 98, 1], [52, 100, 3], [66, 98, 5]].map(([x, y, d]) => `<path class="nta-fall ntd${d}" d="M${x} ${y - 30} l3 -2 l1 4 Z" fill="#e1f5fe" stroke="#90caf9" stroke-width=".4"/>`).join("")}</g>` : ""}
${c.model === "ajax" ? `<rect x="96" y="20" width="18" height="30" rx="4" fill="url(#${bd})" stroke="#aab4bd" stroke-width=".7"/>
${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${99.5 + (i % 3) * 4}" y="${25 + Math.floor(i / 3) * 3}" width="2.6" height="1.2" rx=".6" fill="#9aa6b0"/>`).join("")}
${detLed(c, 105, 44, 1.3)}`
    : `<circle cx="104" cy="34" r="11" fill="url(#${bd})" stroke="#aab4bd" stroke-width=".7"/>
<circle cx="104" cy="34" r="7" fill="none" stroke="#d3d9df" stroke-width=".8"/>
${[0, 1, 2, 3, 4].map((i) => `<circle cx="${101 + (i % 3) * 3}" cy="${32 + Math.floor(i / 3) * 3.4}" r=".7" fill="#9aa6b0"/>`).join("")}
${detLed(c, 104, 42.6, 1.3)}`}
${c.on ? ntWaves(104, 34, "#e53935", 18) : ""}`;
}
// The shadow under a speaker, following its foot: an ellipse under a round
// one, the footprint of a box seen in three-quarter view.
const spkFootShadow = (cx, cy, rx, ry, op = .26) => { const id = ntId(); return `<filter id="${id}" x="-30%" y="-150%" width="160%" height="400%"><feGaussianBlur stdDeviation="1.1"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
const spkColShadow = (cx, rx, yb, ry) => spkFootShadow(cx + 1, +(yb + .8).toFixed(2), rx + 2, +(ry + 1).toFixed(2));
const spkBoxShadow = (x0, y1, w, d, op = .3) => ntFoot(`${x0 - .5} ${y1 + .8} ${x0 + w + .5} ${y1 + .8} ${x0 + w + d + 1.5} ${y1 - d + .8} ${x0 + d - .5} ${y1 - d}`, op);
// Musical notes rising while a speaker plays.
const spkNotes = (x, y) => `<g class="nt-run">${[["\u266a", 0, 0, 10], ["\u266b", 15, 7, 11], ["\u266a", -14, 10, 9]].map(([n, dx, dy, fs], i) => `<text class="nta-rise ntd${i * 2 + 1}" x="${x + dx}" y="${y + dy}" font-size="${fs}" fill="var(--primary-color, #03a9f4)" ${NT_FONT}>${n}</text>`).join("")}</g>`;
const spkMute = (x, y) => `<g><circle cx="${x + 6}" cy="${y}" r="7" fill="#fff" stroke="#cfd6dc" stroke-width=".6"/><path d="M${x + 1.4} ${y - 2} h2.4 l3.4 -2.6 v9.2 l-3.4 -2.6 h-2.4 Z" fill="#5d6773"/><path d="M${x + 8.6} ${y - 1.8} l3.6 3.6 M${x + 12.2} ${y - 1.8} l-3.6 3.6" stroke="#e53935" stroke-width="1.3" stroke-linecap="round"/></g>`;
const spkPause = (x, y, col = "#fff") => `<rect x="${x - 4.4}" y="${y - 5}" width="3.2" height="10" rx="1" fill="${col}" opacity=".9"/><rect x="${x + 1.2}" y="${y - 5}" width="3.2" height="10" rx="1" fill="${col}" opacity=".9"/>`;
const SPK_PALETTES = {
  homepod: { black: ["#5b636c", "#3c434a", "#1f2328", "#2c3238", "#15181b"], white: ["#fbfaf7", "#e7e5e0", "#c3c1bb", "#dcdad5", "#f4f3f0"] },
  mini: { black: ["#6a737c", "#3c434a", "#1c2024", "#2c3238", "#15181b"], white: ["#fbfaf7", "#e4e2dd", "#bdbbb5", "#d8d6d1", "#f1f0ec"],
    yellow: ["#fff2a8", "#f2d14b", "#c9a52a", "#e3c13d", "#fae58a"], orange: ["#ffc79a", "#ef8f45", "#c4692a", "#e07f38", "#f9b077"],
    blue: ["#9fc0de", "#4f7ca6", "#2f557a", "#45719a", "#7ea3c6"] },
  sonos: { black: ["#4a5058", "#2a2e33", "#16191c", "#1f2226", "#0b0d0f"], white: ["#ffffff", "#ecebe8", "#c8c7c3", "#f6f5f2", "#b9b8b3"] },
  bose500: { silver: ["#f1f3f5", "#cfd3d7", "#9aa1a8", "#e3e6e9", "#8e959c"], black: ["#565b61", "#2e3236", "#17191c", "#3a3e43", "#0d0f11"] },
  boseultra: { black: ["#4a4e54", "#2a2d31", "#141619", "#1f2226", "#5d646b"], sand: ["#f1ebe1", "#d9cfc0", "#b3a794", "#e6ded2", "#8c8272"] },
  echo: { black: ["#6f7983", "#3a4249", "#1a1e22", "#2a2f34", "#5d6670"], white: ["#ffffff", "#e4e5e3", "#b9bbb8", "#dfe1df", "#9a9d9a"],
    blue: ["#86a6bf", "#41637f", "#213d53", "#2d4a62", "#5b7c96"] },
  wave: { black: ["#5e636a", "#3a3e44", "#1f2226", "#4a4f55", "#15171a"], silver: ["#eef0f2", "#c9cdd1", "#959ca3", "#dfe2e5", "#6f767d"] },
  focal: { white: ["#ffffff", "#eef0f1", "#cfd4d8", "#f7f8f9", "#aab1b7"], black: ["#4a4f55", "#2a2d31", "#141619", "#3a3e43", "#0c0d0f"] },
  wiim: { black: ["#5f6469", "#45494e", "#2c2f33", "#6e7379", "#1b1d20"], silver: ["#e3e5e7", "#c3c7cb", "#8f959b", "#eef0f1", "#6d7379"] },
  clock: { silver: ["#b8b8b6", "#a3a3a1", "#7f7f7d", "#c6c6c4", "#5d5d5b"], blue: ["#5f7590", "#465b75", "#2e3e52", "#6d83a0", "#1f2b3a"] },
  denon: { black: ["#3a3f45", "#202327", "#0f1113", "#2a2e33", "#4d545b"], silver: ["#e9ebed", "#c7ccd0", "#959ca3", "#dadde0", "#7b8288"] },
  flex: { black: ["#4b4f55", "#2b2e32", "#151719", "#36393e", "#0f1012"], white: ["#f6f4ee", "#dedbd2", "#b5b1a6", "#ebe8e0", "#8f8b80"],
    blue: ["#8fb1d1", "#4a72a0", "#2b4b71", "#5a82ae", "#1e3550"] },
};
function spkPal(model, color) {
  const set = SPK_PALETTES[model];
  return set[color] || set[Object.keys(set)[0]];
}
// A body lit from the left, as the round speakers are.
const spkSide = (id, p) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset=".22" stop-color="${p[1]}"/><stop offset=".36" stop-color="${p[0]}"/><stop offset=".72" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></linearGradient>`;
// The bottom of a body falling into shade.
const spkFoot = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>`;
// Apple's knit, in fine rows.
const spkKnit = (id, col) => `<pattern id="${id}" width="2.2" height="1.7" patternUnits="userSpaceOnUse"><path d="M0 .85 Q.55 .35 1.1 .85 T2.2 .85" fill="none" stroke="${col}" stroke-width=".5" opacity=".55"/></pattern>`;
// A perforated grille.
const spkHoles = (id, col, step = 1.9, r = .48) => `<pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse"><circle cx="${step / 2}" cy="${step / 2}" r="${r}" fill="${col}"/></pattern>`;
// The Siri swirl on top of a HomePod while it plays, its glass dark at rest.
const spkSwirl = (c, cx, cy, rx, ry, r, gl, rest) => (c.on
  ? `<ellipse class="nta-glow" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${r})" filter="url(#${gl})"/><ellipse class="nta-shimmer" cx="${cx}" cy="${cy}" rx="${rx * .62}" ry="${ry * .62}" fill="url(#${r})"/>`
  : `<ellipse cx="${cx}" cy="${cy}" rx="${rx * .62}" ry="${ry * .62}" fill="${c.st === "paused" ? "#8f98a2" : rest}" opacity=".9"/>`);
const spkLed = (c, x, y, r = 1.1, col = "#ffffff") => `<circle class="${c.on ? "nta-glow" : ""}" cx="${x}" cy="${y}" r="${r}" fill="${c.on ? col : c.st === "paused" ? "#ffb300" : "#5d6773"}"/>`;
const spkLogo = (x, y, col, size = 4.2, word = "BOSE") => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" letter-spacing=".5" fill="${col}" ${NT_FONT}>${word}</text>`;

// A HomePod: a column of knit with rounded shoulders, the glass on top lit
// with the Siri swirl while it plays.
function ntSpkSmart(c) {
  const p = spkPal("homepod", c.color);
  const b = ntId(), k = ntId(), sh = ntId(), r = ntId(), gl = ntId(), tp = ntId();
  const light = c.color === "white";
  const body = "M35 47 C35 39.6 45 36 60 36 C75 36 85 39.6 85 47 V96 Q85 111 70 111 H50 Q35 111 35 96 Z";
  return `<defs>${spkSide(b, p)}${spkKnit(k, light ? "#bdbab4" : "#0c0e10")}${spkFoot(sh)}${spkGlowDefs(r, gl)}
<radialGradient id="${tp}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${p[4]}"/><stop offset="1" stop-color="${p[3]}"/></radialGradient></defs>
${spkNotes(66, 4)}${ntWaves(60, 70, "var(--primary-color, #03a9f4)", 33)}
${spkFootShadow(60, 111.2, 21, 2.6)}
<path d="${body}" fill="url(#${b})"/><path d="${body}" fill="url(#${k})"/><path d="${body}" fill="url(#${sh})"/>
<path d="M39 46 Q40 40.6 47 39" fill="none" stroke="#fff" stroke-width="1.6" opacity="${light ? .9 : .25}" stroke-linecap="round"/>
<path d="M41 50 V96" stroke="#fff" stroke-width="2.6" opacity="${light ? .45 : .12}" stroke-linecap="round"/>
<ellipse cx="60" cy="40" rx="17" ry="3.2" fill="${p[2]}" opacity=".55"/>
<ellipse cx="60" cy="39.8" rx="15.4" ry="2.7" fill="url(#${tp})"/>
${spkSwirl(c, 60, 39.8, 10.4, 1.9, r, gl, light ? "#cfccc6" : "#0f1113")}
${c.st === "paused" ? spkPause(60, 72, light ? "#7d7a74" : "#fff") : ""}${c.muted ? spkMute(66, 100) : ""}`;
}
// A HomePod mini: a ball of knit cut flat on top, the touch glass lit while
// it plays, in its five colours.
function ntSpkMini(c) {
  const p = spkPal("mini", c.color);
  const b = ntId(), k = ntId(), r = ntId(), gl = ntId(), tp = ntId();
  const light = c.color && c.color !== "black";
  const ball = "M42.6 54 A30 30 0 0 0 42.8 103 H77.2 A30 30 0 0 0 77.4 54 Z";
  return `<defs><radialGradient id="${b}" cx=".34" cy=".3" r=".85"><stop offset="0" stop-color="${p[0]}"/><stop offset=".55" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient>
${spkKnit(k, light ? "#000" : "#0c0e10")}${spkGlowDefs(r, gl)}
<radialGradient id="${tp}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${p[4]}"/><stop offset="1" stop-color="${p[3]}"/></radialGradient></defs>
${spkNotes(64, 18)}${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 36)}
${spkFootShadow(60, 104, 18, 2.6)}
<ellipse cx="60" cy="103.4" rx="15.6" ry="2.2" fill="${p[2]}"/><ellipse cx="60" cy="103.8" rx="11" ry="1.4" fill="#000" opacity=".35"/>
<path d="${ball}" fill="url(#${b})"/><path d="${ball}" fill="url(#${k})" opacity="${light ? .35 : 1}"/>
<path d="M36 72 Q37 60 46 56" fill="none" stroke="#fff" stroke-width="2.2" opacity="${light ? .55 : .2}" stroke-linecap="round"/>
<ellipse cx="60" cy="54.2" rx="17.6" ry="4.2" fill="${p[2]}"/>
<ellipse cx="60" cy="53.8" rx="15.6" ry="3.5" fill="url(#${tp})"/>
${spkSwirl(c, 60, 53.8, 10, 2.2, r, gl, light ? p[2] : "#0f1113")}
${c.st === "paused" ? spkPause(60, 80, light ? "#00000080" : "#fff") : ""}${c.muted ? spkMute(70, 102) : ""}`;
}
// The touch controls on top of a Sonos: play, the volume either side, its light.
const sonosTop = (c, cx, cy, s, col) => `<g transform="translate(${cx} ${cy}) scale(${s} ${s * .36})" opacity=".85">
${c.on ? `<rect x="-2.2" y="-2.6" width="1.5" height="5.2" fill="${col}"/><rect x=".7" y="-2.6" width="1.5" height="5.2" fill="${col}"/>` : `<path d="M-1.6 -2.8 L2.6 0 L-1.6 2.8 Z" fill="${col}"/>`}
<path d="M-13 0 h5 M8 0 h5 M10.5 -2.5 v5" stroke="${col}" stroke-width="1.4"/></g>`;
// A Sonos One: a squarish column, its grille wrapping round, the controls on top.
function ntSpkOne(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a")}${spkFoot(sh)}</defs>
${spkNotes(62, 2)}${ntWaves(60, 68, "var(--primary-color, #03a9f4)", 32)}
${spkFootShadow(60, 110.6, 24, 2.6)}
<path d="M35 44 Q35 33 46 33 H74 Q85 33 85 44 V100 Q85 110 75 110 H45 Q35 110 35 100 Z" fill="url(#${f})"/>
<path d="M37 47 Q37 40 44 40 H76 Q83 40 83 47 V99 Q83 107 76 107 H44 Q37 107 37 99 Z" fill="url(#${h})"/>
<path d="M35 44 Q35 33 46 33 H74 Q85 33 85 44 V100 Q85 110 75 110 H45 Q35 110 35 100 Z" fill="url(#${sh})"/>
<path d="M37 42 Q38 35 46 35 H74 Q82 35 83 42 Q60 44.6 37 42 Z" fill="${p[3]}"/>
${sonosTop(c, 60, 38.4, .9, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 77, 37.6, .8)}
<path d="M39 50 V98" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 74, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(66, 100) : ""}`;
}
// A Sonos Era 100: taller and softer than the One, its top sloping to a
// groove for the volume.
function ntSpkEra100(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M37 44 Q37 26 60 26 Q83 26 83 44 V96 Q83 111 68 111 H52 Q37 111 37 96 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.7, .44)}${spkFoot(sh)}</defs>
${spkNotes(64, -2)}${ntWaves(60, 68, "var(--primary-color, #03a9f4)", 31)}
${spkFootShadow(60, 111.4, 21, 2.6)}
<path d="${body}" fill="url(#${f})"/>
<path d="M39 46 Q39 34 60 34 Q81 34 81 46 V95 Q81 108 67 108 H53 Q39 108 39 95 Z" fill="url(#${h})"/>
<path d="${body}" fill="url(#${sh})"/>
<path d="M39.6 36 Q42 27.6 60 27.6 Q78 27.6 80.4 36 Q60 39 39.6 36 Z" fill="${p[3]}"/>
<path d="M50 32.6 Q60 34 70 32.6" fill="none" stroke="${light ? "#bdbcb7" : "#0b0d0f"}" stroke-width="1.6" stroke-linecap="round"/>
${sonosTop(c, 60, 30.4, .62, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 75, 31.6, .8)}
<path d="M41 48 V96" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 74, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(66, 101) : ""}`;
}
// A Sonos Era 300: the hourglass, wide at the top and the foot and drawn in at
// the waist, its grille all over.
function ntSpkEra300(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M22 50 C22 41 29 38 37 38 H83 C91 38 98 41 98 50 C98 62 87 68 87 78 C87 88 97 94 97 102 C97 109 91 111 84 111 H36 C29 111 23 109 23 102 C23 94 33 88 33 78 C33 68 22 62 22 50 Z";
  const grille = "M25 51 C25 44 31 42.6 37 42.6 H83 C89 42.6 95 44 95 51 C95 62 84.4 68 84.4 78 C84.4 88 94 94 94 101 C94 106 89 108 84 108 H36 C31 108 26 106 26 101 C26 94 35.6 88 35.6 78 C35.6 68 25 62 25 51 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.7, .44)}${spkFoot(sh)}</defs>
${spkNotes(64, 10)}${ntWaves(60, 76, "var(--primary-color, #03a9f4)", 44)}
${spkFootShadow(60, 111.4, 34, 2.6)}
<path d="${body}" fill="url(#${f})"/><path d="${grille}" fill="url(#${h})"/><path d="${body}" fill="url(#${sh})"/>
<path d="M25 44 Q30 38.6 40 38.6 H80 Q90 38.6 95 44 Q60 47 25 44 Z" fill="${p[3]}"/>
${sonosTop(c, 60, 42.2, .8, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 82, 41.6, .8)}
<path d="M29 52 Q30 62 37 70" fill="none" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .12}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 76, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(84, 100) : ""}`;
}
// A Sonos Move: a tall oval on its charging base, the handle cut into its back.
function ntSpkMove(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), bs = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M37 36 Q37 17 60 17 Q83 17 83 36 V95 Q83 108 60 108 Q37 108 37 95 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.8, .46)}${ntV(bs, light ? "#e2e1dd" : "#3a4047", light ? "#b3b2ad" : "#16191d")}${spkFoot(sh)}</defs>
${spkNotes(62, -6)}${ntWaves(60, 64, "var(--primary-color, #03a9f4)", 32)}
${spkFootShadow(60, 113.8, 26, 2.4)}
<path d="M39 105 H81 L85 111 Q85 113.6 81 113.6 H39 Q35 113.6 35 111 Z" fill="url(#${bs})"/>
<path d="${body}" fill="url(#${f})"/>
<path d="M39 40 Q39 32 47 32 H73 Q81 32 81 40 V94 Q81 105 60 105 Q39 105 39 94 Z" fill="url(#${h})"/>
<path d="${body}" fill="url(#${sh})"/>
<path d="M47 21.6 Q60 16 73 21.6 Q71 26.6 60 26 Q49 26.6 47 21.6 Z" fill="${light ? "#c9c8c3" : "#0b0d0f"}"/>
${sonosTop(c, 60, 29, .7, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 60, 101, 1)}
<path d="M41 42 V94" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 66, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(70, 22) : ""}`;
}
// The television and the low cabinet a soundbar sits on.
function spkTvCabinet(tv, sc, cb, ct) {
  return `${ntPatch(60, 30, 66, 46, "#e9edf0")}
<rect x="10" y="-2" width="100" height="58" rx="2.6" fill="url(#${tv})"/>
<rect x="13" y="1" width="94" height="52" rx="1.2" fill="url(#${sc})"/>
<path d="M13 1 L54 1 L30 53 L13 53 Z" fill="#fff" opacity=".05"/>
${spkNotes(60, 40)}
${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 54)}
${spkBoxShadow(6, 118, 96, 11)}
${ntRoundBox(6, 94, 96, 24, 11, 2, `url(#${cb})`, "#5d4430", `url(#${ct})`)}
<path d="M54 96 V116" stroke="#5d4430" stroke-width=".8"/><circle cx="50" cy="106" r="1.1" fill="#e0d2bf"/><circle cx="58" cy="106" r="1.1" fill="#e0d2bf"/>`;
}
const spkTvDefs = (tv, sc, cb, ct) => `${ntV(tv, "#2b3036", "#121518")}${ntV(cb, "#a98a66", "#7a5f42")}${ntV(ct, "#c9ab84", "#a98a66")}
<linearGradient id="${sc}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a5878"/><stop offset=".6" stop-color="#1d3047"/><stop offset="1" stop-color="#0f1c2b"/></linearGradient>`;
// A soundbar (Sonos Arc, Beam) on a low cabinet under the television: a long
// rounded bar, perforated all along, its light on top.
function ntSpkBar(c) {
  const p = spkPal("sonos", c.color);
  const b = ntId(), tv = ntId(), cb = ntId(), ct = ntId(), sc = ntId(), h = ntId(), sd = ntId();
  const light = c.color === "white";
  return `<defs>${spkTvDefs(tv, sc, cb, ct)}${ntV(b, p[0], p[2])}${ntV(sd, p[2], p[4])}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.6, .42)}</defs>
${spkTvCabinet(tv, sc, cb, ct)}
<g transform="translate(3 7)">${spkBoxShadow(10, 84, 92, 5, .32)}
${ntRoundBox(10, 71, 92, 13, 5, 6, `url(#${b})`, `url(#${sd})`, p[3])}
<path d="M14 74.4 H98 Q100.6 74.4 100.6 78 Q100.6 82 96 82 H16 Q11.4 82 11.4 78 Q11.4 74.4 14 74.4 Z" fill="url(#${h})"/>
${spkLed(c, 58, 68.6, .8)}</g>
${c.st === "paused" ? spkPause(60, 28) : ""}${c.muted ? spkMute(92, 62) : ""}`;
}
// A Bose Smart Soundbar on the same cabinet and seen like it: a slim bar
// wrapped in its metal grille, the glass on top with its light bar.
function ntSpkBoseBar(c) {
  const p = spkPal("bose500", c.color === "white" ? "silver" : c.color);
  const b = ntId(), tv = ntId(), cb = ntId(), ct = ntId(), sc = ntId(), h = ntId(), g = ntId(), gl = ntId(), sd = ntId();
  const light = c.color === "white" || c.color === "silver";
  return `<defs>${spkTvDefs(tv, sc, cb, ct)}${ntV(b, p[0], p[2])}${ntV(sd, p[2], p[4])}${spkHoles(h, light ? "#7d848b" : "#050607", 1.3, .36)}${ntBlur(g, 1.2)}
<linearGradient id="${gl}" x1="0" x2="1"><stop offset="0" stop-color="#0b0d0f"/><stop offset=".3" stop-color="#3a3f45"/><stop offset=".42" stop-color="#0b0d0f"/><stop offset="1" stop-color="#16191c"/></linearGradient></defs>
${spkTvCabinet(tv, sc, cb, ct)}
<g transform="translate(2 8)">${spkBoxShadow(12, 83, 90, 4, .32)}
${ntRoundBox(12, 73, 90, 10, 4, 2.4, `url(#${b})`, `url(#${sd})`, `url(#${gl})`)}
<path d="M12 74.6 H102 V80.6 Q102 83 99.6 83 H14.4 Q12 83 12 80.6 Z" fill="url(#${h})"/>
${c.on ? `<path class="nta-glow" d="M52 71 H68" stroke="#fff" stroke-width="1.2" stroke-linecap="round" filter="url(#${g})"/><path d="M53 71 H67" stroke="#fff" stroke-width=".6" stroke-linecap="round"/>` : ""}
${spkLogo(57, 81, light ? "#5d646b" : "#9aa1a8", 2.8)}</g>
${c.st === "paused" ? spkPause(60, 28) : ""}${c.muted ? spkMute(92, 62) : ""}`;
}
// A Bose Wave SoundTouch in three-quarter view: the wide unit, its grilles
// either side of the black glass with the display and the CD slot, on its
// pedestal.
function ntSpkWave(c) {
  const p = spkPal("wave", c.color);
  const b = ntId(), tp = ntId(), h = ntId(), gl = ntId(), ped = ntId(), sd = ntId(), pt = ntId();
  const light = c.color === "silver" || c.color === "white";
  const lit = c.on || c.st === "paused" || c.st === "idle";
  return `<defs>${ntV(b, p[1], p[2])}${ntV(tp, p[0], p[1])}${ntV(ped, p[1], p[2])}${ntV(pt, p[0], p[3])}${ntV(sd, p[2], p[4])}${ntV(gl, "#1d2228", "#06080a")}
<pattern id="${h}" width="1.4" height="1.2" patternUnits="userSpaceOnUse"><rect width="1" height=".6" fill="${light ? "#5d646b" : "#0b0c0e"}"/></pattern></defs>
${spkNotes(60, 30)}${ntWaves(60, 82, "var(--primary-color, #03a9f4)", 46)}
${spkBoxShadow(12, 104, 90, 7)}
${ntRoundBox(12, 94, 90, 10, 7, 2, `url(#${ped})`, `url(#${sd})`, `url(#${pt})`)}
<rect x="36" y="97.4" width="40" height="3.2" rx="1.6" fill="#0b0c0e"/>
<path d="M54.6 99.4 Q56 98.2 57.4 99.4 M55.2 99.9 Q56 99.2 56.8 99.9" fill="none" stroke="#e3e6e9" stroke-width=".35" stroke-linecap="round"/><circle cx="56" cy="100.3" r=".3" fill="#e3e6e9"/>
${ntRoundBox(15, 66, 84, 27, 6, 3, `url(#${b})`, `url(#${sd})`, `url(#${tp})`)}
<rect x="18" y="68.6" width="23" height="22" rx="2" fill="url(#${h})"/><rect x="73" y="68.6" width="23" height="22" rx="2" fill="url(#${h})"/>
<rect x="41.6" y="66.6" width="30.8" height="26" rx="1.4" fill="url(#${gl})"/>
<path d="M42.2 67.2 L57 67.2 L50 92.4 L42.2 92.4 Z" fill="#fff" opacity=".05"/>
${lit ? `<text x="57" y="74.8" text-anchor="middle" font-size="5" fill="#7fd3ff" ${NT_FONT}${c.on ? ` class="nta-glow"` : ""}>${c.on ? "\u25b6 \u266a" : c.st === "paused" ? "II" : "12:00"}</text>
<text x="57" y="78.8" text-anchor="middle" font-size="2.4" letter-spacing=".5" fill="#7fd3ff" ${NT_FONT}>SOUNDTOUCH</text>` : ""}
<rect x="45" y="82.2" width="24" height="1.2" rx=".6" fill="#000" stroke="#3a3e44" stroke-width=".3"/>
${spkLogo(57, 89.2, "#e3e6e9", 3.2)}
${c.muted ? spkMute(96, 54) : ""}`;
}
// A Bose Home Speaker 500: an oval column of aluminium, smooth above and
// perforated below, its top perforated too, the screen in a black panel
// with the logo under it.
function ntSpkBose500(c) {
  const p = spkPal("bose500", c.color === "black" ? "black" : "silver");
  const f = ntId(), h = ntId(), sh = ntId(), art = ntId(), g = ntId(), gl = ntId();
  const light = c.color !== "black";
  const body = spkColumn(60, 27, 46, 104.6, 5.4);
  const low = "M33 83 A27 5.4 0 0 0 87 83 V104.6 A27 5.4 0 0 1 33 104.6 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#6f767d" : "#050607", 1.3, .36)}${spkFoot(sh)}${ntBlur(g, 1.2)}${ntV(gl, "#1e2226", "#050607")}
<linearGradient id="${art}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4dd0e1"/><stop offset=".55" stop-color="#26a6c9"/><stop offset="1" stop-color="#1565c0"/></linearGradient></defs>
${spkNotes(66, 6)}${ntWaves(60, 76, "var(--primary-color, #03a9f4)", 34)}
${spkColShadow(60, 27, 104.6, 5.4)}
<path d="${body}" fill="url(#${f})"/>
<path d="${low}" fill="${p[2]}" opacity=".3"/><path d="${low}" fill="url(#${h})"/>
<path d="${body}" fill="url(#${sh})"/>
<ellipse cx="60" cy="46" rx="27" ry="5.4" fill="${p[2]}"/><ellipse cx="60" cy="45.8" rx="25.8" ry="4.8" fill="${p[3]}"/><ellipse cx="60" cy="45.8" rx="25.8" ry="4.8" fill="url(#${h})" opacity=".7"/>
${[48, 54, 60, 66, 72].map((x) => `<circle cx="${x}" cy="${(45.8 + 4.8 * Math.sqrt(1 - ((x - 60) / 25.8) ** 2) - 1.2).toFixed(2)}" r=".5" fill="${light ? "#5d646b" : "#9aa1a8"}"/>`).join("")}
<rect x="48.4" y="54" width="23.2" height="34" rx="2.4" fill="url(#${gl})" stroke="${light ? "#8e959c" : "#000"}" stroke-width=".4"/>
<rect x="50.4" y="56" width="19.2" height="23" rx="1" fill="#020304"/>
${c.on ? `<rect x="52.4" y="57.6" width="15.2" height="12.4" rx=".6" fill="url(#${art})"/><circle cx="60" cy="63.8" r="3" fill="#0d47a1" opacity=".6"/><path d="M54 73 h12 M55.6 75.6 h8.8" stroke="#cfd8dc" stroke-width=".7"/>`
    : c.st === "paused" ? `<rect x="52.4" y="57.6" width="15.2" height="12.4" rx=".6" fill="url(#${art})" opacity=".45"/>${spkPause(60, 63.8)}<path d="M54 73 h12" stroke="#8f98a2" stroke-width=".7"/>`
    : c.st === "idle" ? `<text x="60" y="69.6" text-anchor="middle" font-size="5" fill="#cfd8dc" ${NT_FONT}>12:00</text>` : ""}
${spkLogo(60, 84.4, "#c9ced3", 3)}
${c.on ? `<path class="nta-glow" d="M50 50.4 Q60 51.4 70 50.4" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" filter="url(#${g})"/><path d="M51 50.4 Q60 51.2 69 50.4" fill="none" stroke="#fff" stroke-width=".6" stroke-linecap="round"/>` : ""}
<path d="M37 54 V101" stroke="#fff" stroke-width="2.2" opacity="${light ? .55 : .1}" stroke-linecap="round"/>
${c.muted ? spkMute(72, 100) : ""}`;
}
// A Bose SoundLink Flex: a soft pill perforated all over its front, the
// logo at the top, the buttons on its top edge and the loop at its side.
function ntSpkFlex(c) {
  const p = spkPal("flex", c.color);
  const b = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M31 62 H89 Q106 62 106 79 V87 Q106 104 89 104 H31 Q14 104 14 87 V79 Q14 62 31 62 Z";
  const face = "M31 65 H89 Q103 65 103 79 V87 Q103 101 89 101 H31 Q17 101 17 87 V79 Q17 65 31 65 Z";
  return `<defs>${ntV(b, p[0], p[2])}${spkHoles(h, light ? "#8f8b80" : "#050607", 1.35, .42)}${spkFoot(sh)}
</defs>
${spkNotes(64, 26)}${ntWaves(60, 84, "var(--primary-color, #03a9f4)", 52)}
${spkFootShadow(60, 104.4, 40, 2.6)}
<path d="M104 77 Q113 77 113 82.4 V88.6 Q113 94 104 94" fill="none" stroke="${p[4]}" stroke-width="3.4" stroke-linecap="round"/>
${[-10, -5, 0, 5, 10].map((dx, i) => `<rect x="${60 + dx - 1.8}" y="60.8" width="3.6" height="2.4" rx="1" fill="${p[3]}" stroke="${p[2]}" stroke-width=".3"/>${i === 2 && c.on ? `<circle class="nta-glow" cx="${60 + dx}" cy="61.6" r=".6" fill="#fff"/>` : ""}`).join("")}
<path d="${body}" fill="url(#${b})"/>
<path d="${face}" fill="url(#${h})"/>
<path d="${body}" fill="url(#${sh})"/>
<path d="M30 63.6 H90" stroke="#fff" stroke-width="1" opacity="${light ? .8 : .22}" stroke-linecap="round"/>
<text x="60" y="75" text-anchor="middle" font-size="5" font-weight="800" letter-spacing=".6" fill="${light ? "#6f6b62" : "#e3e6e9"}" stroke="${p[1]}" stroke-width="1.1" paint-order="stroke" ${NT_FONT}>BOSE</text>
${spkLed(c, 92, 66.8, .7)}
${c.st === "paused" ? spkPause(60, 88, light ? "#6f6b62" : "#fff") : ""}${c.muted ? spkMute(84, 50) : ""}`;
}
// A bookshelf speaker in three-quarter view: its tweeter, and a woofer whose
// cone beats with the music.
function ntSpkShelf(c) {
  const f = ntId(), sd = ntId(), tp = ntId(), w = ntId(), sr = ntId(), tw = ntId();
  return `<defs>${ntV(f, "#3a4047", "#1c2024")}${ntV(sd, "#8d6e4a", "#5d4430")}${ntV(tp, "#a07e57", "#7a5c3e")}
<radialGradient id="${w}" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#6b7580"/><stop offset=".6" stop-color="#2b3036"/><stop offset="1" stop-color="#111417"/></radialGradient>
<radialGradient id="${sr}" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#1b1f23"/><stop offset=".9" stop-color="#4a525b"/><stop offset="1" stop-color="#1b1f23"/></radialGradient>
<radialGradient id="${tw}" cx=".4" cy=".35" r=".6"><stop offset="0" stop-color="#e3e7eb"/><stop offset="1" stop-color="#6b7580"/></radialGradient></defs>
${spkNotes(60, 2)}${ntWaves(54, 64, "var(--primary-color, #03a9f4)", 36)}
${spkBoxShadow(26, 114, 56, 13)}
${ntRoundBox(26, 20, 56, 94, 13, 3, `url(#${f})`, `url(#${sd})`, `url(#${tp})`, "#111417")}
<path d="M29 23 H79" stroke="#5d6670" stroke-width=".8" opacity=".6"/>
<circle cx="54" cy="40" r="10" fill="#111417" stroke="#4a525b" stroke-width="1"/><circle cx="54" cy="40" r="7" fill="#22272c"/>
<circle cx="54" cy="40" r="4.2" fill="url(#${tw})"/><circle cx="52.6" cy="38.6" r="1.2" fill="#fff" opacity=".7"/>
<circle cx="54" cy="78" r="24" fill="#111417" stroke="#4a525b" stroke-width="1.2"/>
${[0, 1, 2, 3].map((i) => { const a = Math.PI / 4 + i * Math.PI / 2; return `<circle cx="${(54 + Math.cos(a) * 21.4).toFixed(1)}" cy="${(78 + Math.sin(a) * 21.4).toFixed(1)}" r="1.1" fill="#8f98a2"/>`; }).join("")}
<g class="nta-pop"><circle cx="54" cy="78" r="19.4" fill="url(#${sr})"/><circle cx="54" cy="78" r="16.4" fill="url(#${w})"/>
<circle cx="54" cy="78" r="6.4" fill="#3a4047"/><circle cx="52.4" cy="76.4" r="2.4" fill="#8f98a2" opacity=".5"/></g>
<circle class="${c.on ? "nta-glow" : ""}" cx="54" cy="108" r="1.6" fill="${c.on ? "#69f0ae" : c.st === "paused" ? "#ffb300" : "#5d6773"}"/>
${c.st === "paused" ? spkPause(54, 78) : ""}${c.muted ? spkMute(66, 26) : ""}`;
}
// A Focal Bird (HACF #172): a glossy egg tilted on a slim tripod, its front
// an oval of perforated grille in a silver frame.
function ntSpkFocalBird(c) {
  const p = spkPal("focal", c.color);
  const b = ntId(), h = ntId(), g = ntId();
  const light = c.color !== "black";
  return `<defs><radialGradient id="${b}" cx=".72" cy=".3" r=".85"><stop offset="0" stop-color="${p[0]}"/><stop offset=".55" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient>
${spkHoles(h, light ? "#79818a" : "#050607", 1.5, .45)}<linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${light ? "#dfe3e6" : "#3a3e43"}"/><stop offset="1" stop-color="${light ? "#c4cacf" : "#22252a"}"/></linearGradient></defs>
${spkNotes(98, 10)}${ntWaves(88, 30, "var(--primary-color, #03a9f4)", 4)}
${spkFootShadow(56, 113, 28, 3)}
<path d="M50 92 L56 104 M56 104 L34 112 M56 104 L78 112 M56 104 L60 114" stroke="${p[light ? 2 : 0]}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
<path d="M50 92 L56 104" stroke="${p[3]}" stroke-width="1.4" stroke-linecap="round"/>
${[[34, 112], [78, 112], [60, 114]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.3" fill="${p[2]}"/>`).join("")}
<ellipse cx="57" cy="56" rx="33" ry="39" transform="rotate(-28 57 56)" fill="url(#${b})" stroke="${p[4]}" stroke-width=".6"/>
<path d="M29 42 Q24 64 38 83" stroke="#fff" stroke-width="2.4" fill="none" opacity="${light ? .9 : .25}" stroke-linecap="round"/>
<g transform="rotate(-24 66 46)"><rect x="47" y="14" width="38" height="66" rx="18" fill="url(#${g})" stroke="${light ? "#a7aeb4" : "#55595f"}" stroke-width="2.2"/>
<rect x="49.4" y="16.4" width="33.2" height="61.2" rx="16" fill="url(#${h})"/>
<path d="M54 24 Q60 18 68 18" stroke="#fff" stroke-width="1.4" fill="none" opacity=".55" stroke-linecap="round"/></g>
${c.st === "paused" ? spkPause(66, 46, light ? "#5d6773" : "#fff") : ""}${c.muted ? spkMute(92, 20) : ""}`;
}
// A Focal 100 OD6 (HACF #172): an outdoor box on its U bracket, the grille
// over its whole front, the badge at its foot.
function ntSpkFocalOd6(c) {
  const p = spkPal("focal", c.color);
  const f = ntId(), sd = ntId(), tp = ntId(), h = ntId();
  const light = c.color !== "black";
  return `<defs>${ntV(f, p[0], p[1])}${ntV(sd, p[2], p[4])}${ntV(tp, p[3], p[1])}${spkHoles(h, light ? "#7d858c" : "#050607", 1.6, .5)}</defs>
${spkNotes(90, 26)}${ntWaves(30, 66, "var(--primary-color, #03a9f4)", 4)}
<path d="M44 26 V14 Q44 8 50 8 H70 Q76 8 76 14 V26" stroke="${p[2]}" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M44 26 V14 Q44 8 50 8 H70 Q76 8 76 14 V26" stroke="${p[3]}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<rect x="55" y="2" width="10" height="8" rx="1.6" fill="${p[2]}"/>
${spkBoxShadow(30, 112, 56, 8)}
${ntRoundBox(30, 22, 56, 90, 8, 8, `url(#${f})`, `url(#${sd})`, `url(#${tp})`, p[4])}
<rect x="34" y="27" width="48" height="76" rx="5" fill="${light ? "#e1e4e7" : "#1d2024"}"/><rect x="34" y="27" width="48" height="76" rx="5" fill="url(#${h})"/>
<rect x="34" y="27" width="48" height="76" rx="5" fill="none" stroke="${p[2]}" stroke-width=".8"/>
<circle cx="44" cy="25.6" r="1.1" fill="${p[2]}"/><circle cx="76" cy="25.6" r="1.1" fill="${p[2]}"/>
<rect x="53" y="105" width="10" height="3" rx=".6" fill="${light ? "#c4c9cd" : "#55595f"}"/>
${c.st === "paused" ? spkPause(58, 64, light ? "#5d6773" : "#fff") : ""}${c.muted ? spkMute(80, 20) : ""}`;
}
// A Denon AV receiver (HACF #172): the black front in three-quarter view,
// its two big knobs, the display with the source large and the sound mode
// under it, the volume knob turned to the volume.
function ntSpkDenon(c) {
  const p = spkPal("denon", c.color);
  const f = ntId(), sd = ntId(), tp = ntId(), k = ntId();
  const lit = c.st !== "off";
  const src = lit ? esc(String(c.src || "").slice(0, 10)) : "";
  const snd = lit ? esc(String(c.sound || "").slice(0, 18)) : "";
  const turn = (c.vol === null || c.vol === undefined ? .35 : Math.min(1, Math.max(0, c.vol))) * 270 - 135;
  const knob = (x, y, r, rot) => `<circle cx="${x}" cy="${y}" r="${r + 1.2}" fill="#0b0c0e"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k})"/>
${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${(x + Math.cos(a) * r * .55).toFixed(1)} ${(y + Math.sin(a) * r * .55).toFixed(1)} L${(x + Math.cos(a) * r * .92).toFixed(1)} ${(y + Math.sin(a) * r * .92).toFixed(1)}" stroke="#fff" stroke-width=".4" opacity=".25"/>`; }).join("")}
${rot === null ? "" : `<path d="M${x} ${y} L${x} ${y - r * .8}" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7" transform="rotate(${rot.toFixed(0)} ${x} ${y})"/>`}`;
  return `<defs>${ntV(f, p[0], p[1])}${ntV(sd, p[2], p[3])}${ntV(tp, p[4], p[1])}<radialGradient id="${k}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#d9dde0"/><stop offset=".5" stop-color="#7a8187"/><stop offset="1" stop-color="#2a2e32"/></radialGradient></defs>
${spkNotes(96, 24)}
${spkBoxShadow(4, 96, 100, 12)}
${ntRoundBox(4, 46, 100, 50, 12, 2, `url(#${f})`, `url(#${sd})`, `url(#${tp})`, "#060708")}
${Array.from({ length: 14 }, (_, i) => `<path d="M${18 + i * 6} 40 L${12 + i * 6} 45" stroke="#000" stroke-width="1.2" opacity=".35"/>`).join("")}
${c.generic ? "" : `<text x="9" y="53.6" font-size="3.6" font-weight="700" fill="${c.color === "silver" ? "#4a5056" : "#e9ecef"}" ${NT_FONT}>DENON</text>`}
<rect x="29" y="51" width="50" height="22" rx="1.6" fill="#060708" stroke="#2b2f34" stroke-width=".6"/>
<text x="54" y="63" font-size="${ntFit(src, 46, 8).toFixed(2)}" font-weight="700" text-anchor="middle" fill="#9fe3ff" class="${lit ? "nta-glow" : ""}" ${NT_FONT}>${src}</text>
<text x="54" y="69.8" font-size="3.6" text-anchor="middle" fill="#6fc6ea" ${NT_FONT}>${snd}</text>
${knob(17, 64, 7.4, null)}${knob(91, 64, 8.6, turn)}
<path d="M29 77 H79 V90 H29 Z" fill="#000" opacity=".22"/>
<circle cx="17" cy="82" r="2" fill="#1a1d20" stroke="#4a5056" stroke-width=".5"/><circle cx="17" cy="82" r=".9" fill="${c.st === "off" ? "#e53935" : "#7fd7ff"}"/>
<rect x="10" y="96" width="9" height="3.4" rx="1" fill="#0b0c0e"/><rect x="88" y="96" width="9" height="3.4" rx="1" fill="#0b0c0e"/>
${c.muted ? spkMute(86, 26) : ""}`;
}
// Any other AV receiver (#129), Yamaha, Onkyo, Pioneer...: the same front
// without a brand on it.
const ntSpkAvr = (c) => ntSpkDenon({ ...c, generic: true });
// A WiiM Amp (#129): a low square box, its top a wide flat lid with the
// logo, a thin line of lights along its front and the big knob that plays
// and pauses.
function ntSpkWiim(c) {
  const p = spkPal("wiim", c.color);
  const f = ntId(), tp = ntId(), k = ntId(), sh = ntId();
  const light = c.color === "silver";
  const lit = c.st !== "off";
  const ink = light ? "#5d646b" : "#d9dde1";
  return `<defs>${ntV(f, p[0], p[2])}<linearGradient id="${tp}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[3]}"/></linearGradient><radialGradient id="${k}" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="${light ? "#f6f7f8" : "#8a9096"}"/><stop offset=".6" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient>${ntBlur(sh, 2.4)}</defs>
${spkNotes(94, 18)}
${ntFoot("10 95 110 95 113 99 7 99", .28)}
<path d="M26 40 H94 Q102 40 104 47 L111 66 H9 L16 47 Q18 40 26 40 Z" fill="url(#${tp})"/>
<path d="M17 45 Q19 41.6 26 41.6 H94 Q101 41.6 103 45" stroke="#fff" stroke-width=".8" fill="none" opacity="${light ? .8 : .25}"/>
<text x="0" y="0" transform="matrix(1 0 0 .42 60 56)" font-size="11" font-weight="300" letter-spacing="2" text-anchor="middle" fill="${light ? "#a5abb1" : "#8d9399"}" ${NT_FONT}>WiiM</text>
<path d="M9 66 H111 V88 Q111 96 103 96 H17 Q9 96 9 88 Z" fill="url(#${f})"/>
<path d="M9 66 H111" stroke="#fff" stroke-width=".7" opacity="${light ? .9 : .3}"/>
<path d="M15 85 H86" stroke="${light ? "#aab0b5" : "#6b7076"}" stroke-width=".5"/>
<rect x="15" y="80.6" width="5" height="1.4" rx=".7" fill="${lit ? "#ffffff" : ink}" opacity="${lit ? 1 : .5}"/>
<text x="23" y="82.2" font-size="2.8" fill="${ink}" ${NT_FONT}>WiiM Amp</text>
${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${71 + i * 2.4}" cy="81.4" r=".45" fill="${lit && c.vol !== null && c.vol !== undefined && i < Math.round(c.vol * 6) ? "#ffffff" : ink}" opacity="${lit ? .9 : .4}"/>`).join("")}
<circle cx="97" cy="80" r="10.6" fill="${p[2]}"/><circle cx="97" cy="80" r="9.4" fill="url(#${k})"/>
<circle cx="97" cy="80" r="9.4" fill="none" stroke="#fff" stroke-width=".5" opacity="${light ? .8 : .25}"/>
${c.st === "playing" ? `<path d="M94.8 76.6 V83.4 M99.2 76.6 V83.4" stroke="${ink}" stroke-width="1.3" stroke-linecap="round"/>` : `<path d="M95.2 76.4 L100.8 80 L95.2 83.6 Z" fill="none" stroke="${ink}" stroke-width="1" stroke-linejoin="round"/>`}
${c.muted ? spkMute(84, 30) : ""}`;
}
// A Lenovo Smart Clock (#128): a little wedge dressed in grey fabric, its
// screen leaning back, the time on it, or what is playing.
function ntSpkClock(c) {
  const p = spkPal("clock", c.color);
  const fa = ntId(), sd = ntId(), m = ntId(), sc = ntId();
  const lit = c.st !== "off";
  const title = esc(String(c.title || "").slice(0, 16));
  const artist = esc(String(c.artist || "").slice(0, 20));
  const big = c.st === "playing" || c.st === "paused" ? "" : esc(c.clock || "");
  // Traced from its product photo: seen from the right, the face leans back
  // and turns away, nearly all of it screen behind a black bezel; the side is
  // a big triangle, from the ridge on top down the sloping back to the foot.
  const round = (pts, fill, sw) => `<polygon points="${pts}" fill="${fill}" stroke="${fill}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const face = "20.4 32.2 100.7 26 90.1 98.1 6.3 90.7", side = "100.7 26 113.5 82.9 110.8 90 90.1 98.1";
  // The screen is a rectangle seen at an angle: a trapezoid, its right edge
  // taller. Each line of text takes the shape the screen has at its height.
  const at = (v) => {
    const lx = 26.1 - 12.2 * v, ly = 38.8 + 44.3 * v, rx = 93.5 - 8.6 * v, ry = 35.5 + 51.2 * v;
    const n3 = (x) => +x.toFixed(3);
    return `matrix(${n3((rx - lx) / 60)} ${n3((ry - ly) / 60)} -.217 .995 ${n3(lx)} ${n3(ly)})`;
  };
  const line = (v, txt, size, extra = "") => `<text x="30" y="0" transform="${at(v)}" font-size="${size}" ${extra}>${txt}</text>`;
  return `<defs><linearGradient id="${fa}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[3]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient><linearGradient id="${sd}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${p[0]}"/><stop offset=".55" stop-color="${p[3]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>${spkMesh(m, .03)}<linearGradient id="${sc}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a77f96"/><stop offset=".5" stop-color="#8a6e98"/><stop offset="1" stop-color="#6a5a8e"/></linearGradient></defs>
${spkNotes(104, 8)}
${ntFoot("6 92 90 100 113 90 100 84", .3)}
${round(side, `url(#${sd})`, 9)}<polygon points="${side}" fill="url(#${m})"/>
${round(face, `url(#${fa})`, 9)}<polygon points="${face}" fill="url(#${m})"/>
${round("23.5 33.5 98.7 28.8 88.2 93.4 7.9 88.4", "#0b0c0e", 6)}
<polygon points="26.1 38.8 93.5 35.5 84.9 86.7 13.9 83.1" fill="${lit ? `url(#${sc})` : "#141518"}" stroke="${lit ? "#8a6e98" : "#141518"}" stroke-width="1.4" stroke-linejoin="round"/>
<g ${NT_FONT} text-anchor="middle" fill="#ffffff">
${big ? `${line(.24, esc(String(c.day || "").slice(0, 26)), 3.6, `opacity="${lit ? .85 : .2}"`)}
${line(.68, big, ntFit(big, 54, 24).toFixed(2), `font-weight="200" opacity="${lit ? 1 : .22}"`)}` : `${line(.45, title, ntFit(title, 50, 6.6).toFixed(2), 'font-weight="500"')}
${line(.6, artist, 3.8, 'opacity=".8"')}
<g transform="${at(.74)}"><rect x="12" y="-1" width="36" height="1.2" rx=".6" opacity=".3"/><rect x="12" y="-1" width="${c.st === "playing" ? 22 : 14}" height="1.2" rx=".6"/></g>`}
</g>
<circle cx="27" cy="36.4" r=".6" fill="#2a2c30"/><circle cx="93.6" cy="32.2" r=".6" fill="#2a2c30"/>
${c.st === "paused" ? spkPause(52, 50, "#ffffff") : ""}${c.muted ? spkMute(96, 14) : ""}`;
}
// A mesh of fabric, for the speakers dressed in it.
const spkMesh = (id, op = .35) => `<pattern id="${id}" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 3 L3 0 M-1 1 L1 -1 M2 4 L4 2" stroke="#000" stroke-width=".5" opacity="${op}"/></pattern>`;
const spkGlowDefs = (r, gl) => `<linearGradient id="${r}" x1="0" x2="1"><stop offset="0" stop-color="#ff4081"/><stop offset=".33" stop-color="#7c4dff"/><stop offset=".66" stop-color="#18ffff"/><stop offset="1" stop-color="#ffab40"/></linearGradient>${ntBlur(gl, 2.2)}`;
// A column seen a little from above: its top and its foot are ellipses.
function spkColumn(cx, rx, yt, yb, ry) {
  return `M${cx - rx} ${yt} A${rx} ${ry} 0 0 1 ${cx + rx} ${yt} V${yb} A${rx} ${ry} 0 0 1 ${cx - rx} ${yb} Z`;
}
// A Sonos Five (#95): the big box in three-quarter view, its grille the
// whole front, the touch controls on its top.
function ntSpkFive(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId(), sd = ntId(), tp = ntId();
  const light = c.color === "white";
  return `<defs>${ntV(f, p[0], p[1])}${ntV(sd, p[2], p[4])}${ntV(tp, p[3], p[1])}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.7, .46)}${spkFoot(sh)}</defs>
${spkNotes(66, 14)}${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 50)}
${spkBoxShadow(12, 106, 80, 10)}
${ntRoundBox(12, 54, 80, 52, 10, 8, `url(#${f})`, `url(#${sd})`, `url(#${tp})`)}
<path d="M22 56.4 H82 Q89.6 56.4 89.6 64 V96 Q89.6 103.6 82 103.6 H22 Q14.4 103.6 14.4 96 V64 Q14.4 56.4 22 56.4 Z" fill="url(#${h})"/>
<path d="M20 54 H84 Q92 54 92 62 V98 Q92 106 84 106 H20 Q12 106 12 98 V62 Q12 54 20 54 Z" fill="url(#${sh})"/>
${sonosTop(c, 57, 49, .6, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 77, 49, .7)}
<text x="52" y="61.4" text-anchor="middle" font-size="2.4" font-weight="700" letter-spacing="1" fill="${light ? "#a9a8a3" : "#4a5058"}" ${NT_FONT}>SONOS</text>
<path d="M16.6 63 V96" stroke="#fff" stroke-width="1.8" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(52, 82, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(82, 100) : ""}`;
}
// A Sonos Play: an oval column under one grille, its top flat with the
// controls, the logo running down near the top.
function ntSpkPlay(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = spkColumn(60, 21, 39, 104, 5);
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.5, .4)}${spkFoot(sh)}</defs>
${spkNotes(64, 4)}${ntWaves(60, 72, "var(--primary-color, #03a9f4)", 29)}
${spkColShadow(60, 21, 104, 5)}
<path d="${body}" fill="url(#${f})"/><path d="${body}" fill="url(#${h})"/><path d="${body}" fill="url(#${sh})"/>
<ellipse cx="60" cy="39" rx="21" ry="5" fill="${p[2]}"/><ellipse cx="60" cy="38.8" rx="19.8" ry="4.4" fill="${p[3]}"/>
${sonosTop(c, 58, 38.8, .48, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 71, 38.6, .6)}
<text x="0" y="0" transform="translate(73.4 48) rotate(90)" font-size="3.2" font-weight="700" letter-spacing="1.2" fill="${light ? "#8f8e89" : "#5d646b"}" ${NT_FONT}>SONOS</text>
<path d="M42 47 V102" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(58, 80, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(66, 102) : ""}`;
}
// A Sonos Roam: a slim three-sided column, its nearest edge towards us and
// two faces seen, the rounded triangle of its top with the buttons.
function ntSpkRoam(c) {
  const p = spkPal("sonos", c.color);
  const h = ntId(), sh = ntId(), a = ntId(), b = ntId();
  const light = c.color === "white";
  const left = "M45 36 L64 39.6 V108.6 L45 105 Z", right = "M64 39.6 L76 35.4 V104.4 L64 108.6 Z";
  return `<defs>${ntV(a, p[0], p[2])}${ntV(b, p[2], p[4])}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.5, .38)}${spkFoot(sh)}</defs>
${spkNotes(62, 2)}${ntWaves(60, 72, "var(--primary-color, #03a9f4)", 22)}
${ntFoot("44 105.8 64 109.8 77.2 105.2 58 102.4", .3)}
<path d="${right}" fill="url(#${b})" stroke="url(#${b})" stroke-width="2.4" stroke-linejoin="round"/>
<path d="${left}" fill="url(#${a})" stroke="url(#${a})" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M47 40 L62 42.8 V104.8 L47 102 Z" fill="url(#${h})" opacity=".85"/>
<path d="${left}" fill="url(#${sh})"/>
<path d="M45 36 L64 39.6 L76 35.4 Z" fill="${p[3]}" stroke="${p[3]}" stroke-width="2.4" stroke-linejoin="round"/>
${[[57, 36.6], [62, 37], [67, 36.4]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.1" ry=".45" fill="${light ? "#a9a8a3" : "#5d646b"}"/>`).join("")}${spkLed(c, 52, 36.6, .5)}
<text x="0" y="0" transform="translate(57 45) rotate(90)" font-size="3.4" font-weight="700" letter-spacing="1.2" fill="${light ? "#8f8e89" : "#5d646b"}" ${NT_FONT}>SONOS</text>
${c.st === "paused" ? spkPause(55, 84, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(66, 102) : ""}`;
}
// A Sonos Ray: a short bar with rounded ends on the TV cabinet, seen like
// the cabinet, its grille across the top of the front.
function ntSpkRay(c) {
  const p = spkPal("sonos", c.color);
  const b = ntId(), tv = ntId(), cb = ntId(), ct = ntId(), sc = ntId(), h = ntId(), sd = ntId();
  const light = c.color === "white";
  return `<defs>${spkTvDefs(tv, sc, cb, ct)}${ntV(b, p[0], p[2])}${ntV(sd, p[2], p[4])}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.4, .38)}</defs>
${spkTvCabinet(tv, sc, cb, ct)}
<g transform="translate(-2 7)">${spkBoxShadow(32, 84, 54, 4, .32)}
${ntRoundBox(32, 72, 54, 12, 4, 5, `url(#${b})`, `url(#${sd})`, p[3])}
<path d="M37 73.4 H81 Q84.6 73.4 84.6 77 V79.6 H33.4 V77 Q33.4 73.4 37 73.4 Z" fill="url(#${h})"/>
<path d="M33.6 80 H84.4 Q83 82.8 81 82.8 H37 Q35 82.8 33.6 80 Z" fill="${p[2]}" opacity=".6"/>
<text x="59" y="82.4" text-anchor="middle" font-size="1.8" font-weight="700" letter-spacing=".6" fill="${light ? "#a9a8a3" : "#5d646b"}" ${NT_FONT}>SONOS</text>
${spkLed(c, 74, 70, .65)}</g>
${c.st === "paused" ? spkPause(60, 28) : ""}${c.muted ? spkMute(80, 62) : ""}`;
}
// A flat square box seen from above at an angle: a Sonos Amp with the dish of
// its top, a Sonos Port with a plain one, a Bose Music Amplifier with glass.
function spkBox(c, pal, top, extra) {
  const a = ntId(), b = ntId();
  return `<defs>${ntV(a, pal[1], pal[2])}${ntV(b, pal[2], pal[4])}</defs>
${spkNotes(66, 30)}${ntWaves(60, 86, "var(--primary-color, #03a9f4)", 44)}
${ntFoot("15 88.8 60 107 105 88.8 60 71", .3)}
<path d="M16 80 L60 98 V106 L16 88 Z" fill="url(#${a})"/><path d="M60 98 L104 80 V88 L60 106 Z" fill="url(#${b})"/>
<path d="M60 62 L104 80 L60 98 L16 80 Z" fill="${top}"/>${extra}`;
}
// The light of a Sonos box: a short dash on its front face.
const spkDash = (c, x, y, s = -.41) => `<path${c.on ? ` class="nta-glow"` : ""} d="M${x - 1.8} ${(y - 1.8 * s).toFixed(2)} L${x + 1.8} ${(y + 1.8 * s).toFixed(2)}" stroke="${c.on ? "#fff" : c.st === "paused" ? "#ffb300" : "#7d848b"}" stroke-width="1" stroke-linecap="round"/>`;
function ntSpkAmp(c) {
  const p = spkPal("sonos", c.color);
  const light = c.color === "white";
  const d = ntId();
  return spkBox(c, p, p[1], `<defs><linearGradient id="${d}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset=".7" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[0]}"/></linearGradient></defs>
<ellipse cx="60" cy="80" rx="30.4" ry="12.4" fill="${p[0]}" opacity="${light ? .9 : .35}"/><ellipse cx="60" cy="79.6" rx="28.6" ry="11.6" fill="url(#${d})"/>
<path d="M33 82 Q60 95 87 82" fill="none" stroke="${p[0]}" stroke-width=".7" opacity=".6"/>
<text x="0" y="0" transform="translate(60 81) scale(1 .42) rotate(-22)" text-anchor="middle" font-size="5" font-weight="700" letter-spacing="1.2" fill="${light ? "#a9a8a3" : "#5d646b"}" ${NT_FONT}>SONOS</text>
${spkDash(c, 82, 93.2)}${c.muted ? spkMute(92, 70) : ""}`);
}
function ntSpkPort(c) {
  const p = spkPal("sonos", c.color);
  const light = c.color === "white";
  return spkBox(c, p, p[1], `<text x="0" y="0" transform="translate(60 81) scale(1 .42) rotate(-22)" text-anchor="middle" font-size="6" font-weight="700" letter-spacing="1.4" fill="${light ? "#a9a8a3" : "#5d646b"}" ${NT_FONT}>SONOS</text>
${spkDash(c, 82, 93.2)}${c.muted ? spkMute(92, 70) : ""}`);
}
// A Bose Music Amplifier: a black box in three-quarter view, its glass top
// catching the light, the power button and logo on its front.
function ntSpkBoseAmp(c) {
  const fr = ntId(), sd = ntId(), rf = ntId();
  return `<defs>${ntV(fr, "#2a2d32", "#0e1012")}${ntV(sd, "#17191c", "#060708")}
<linearGradient id="${rf}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#d9dde1"/><stop offset=".46" stop-color="#9aa1a8"/><stop offset=".47" stop-color="#1b1d21"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient></defs>
${spkNotes(66, 34)}${ntWaves(60, 84, "var(--primary-color, #03a9f4)", 46)}
${spkBoxShadow(16, 97, 78, 10)}
${ntRoundBox(16, 76, 78, 21, 10, 1.2, `url(#${fr})`, `url(#${sd})`, `url(#${rf})`)}
<path d="M17.4 76.6 H92.6" stroke="#5d646b" stroke-width=".5"/>
<circle cx="25" cy="86.4" r="2.6" fill="#0b0c0e" stroke="#5d646b" stroke-width=".5"/>
<path d="M23.9 85.4 A1.5 1.5 0 1 0 26.1 85.4 M25 84.4 V86.2" fill="none" stroke="#9aa1a8" stroke-width=".45" stroke-linecap="round"/>
${spkLogo(56, 88, "#c9ced3", 3.6)}${spkLed(c, 25, 92.4, .55)}
${c.muted ? spkMute(94, 60) : ""}`;
}
// A Bose Lifestyle Ultra: a short oval column dressed in fabric, its top
// smooth with the grille of the up-firing driver and the touch controls.
function ntSpkBoseUltra(c) {
  const p = spkPal("boseultra", c.color === "black" || !c.color ? "black" : "sand");
  const f = ntId(), h = ntId(), sh = ntId(), gr = ntId(), cl = ntId();
  const light = p === SPK_PALETTES.boseultra.sand;
  const body = spkColumn(60, 26, 51, 105, 5.4);
  return `<defs>${spkSide(f, p)}${spkKnit(h, light ? "#8c8272" : "#000")}${spkFoot(sh)}${spkHoles(gr, light ? "#8c8272" : "#000", 1, .3)}
<clipPath id="${cl}"><path d="${body}"/></clipPath></defs>
${spkNotes(64, 12)}${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 31)}
${spkColShadow(60, 26, 105, 5.4)}
<path d="${body}" fill="url(#${f})"/>
<g clip-path="url(#${cl})"><path d="M30 40 H80.4 Q82.6 70 80.4 120 H30 Z" fill="${p[1]}" opacity=".55"/><path d="M30 40 H80.4 Q82.6 70 80.4 120 H30 Z" fill="url(#${h})"/></g>
<path d="M80.4 54 Q82.6 78 80.4 109" fill="none" stroke="${p[2]}" stroke-width=".6"/>
<path d="${body}" fill="url(#${sh})"/>
<ellipse cx="60" cy="51" rx="26" ry="5.4" fill="${p[2]}"/><ellipse cx="60" cy="50.8" rx="24.8" ry="4.8" fill="${p[3]}"/>
<ellipse cx="68.6" cy="50.8" rx="9.4" ry="2.8" fill="${p[2]}"/><ellipse cx="68.6" cy="50.8" rx="9.4" ry="2.8" fill="url(#${gr})"/>
<ellipse cx="50.4" cy="50.8" rx="4.6" ry="1.4" fill="none" stroke="${p[4]}" stroke-width=".5"/>
${spkLed(c, 50.4, 50.8, .55)}${[44, 56.6].map((x) => `<circle cx="${x}" cy="50.8" r=".5" fill="${p[4]}"/>`).join("")}
${spkLogo(72, 103, light ? "#6d6455" : "#e3e6e9", 2.8)}
<path d="M37 60 V100" stroke="#fff" stroke-width="2" opacity="${light ? .45 : .08}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(58, 80, light ? "#6d6455" : "#fff") : ""}${c.muted ? spkMute(70, 100) : ""}`;
}
// A Bose Portable Smart Speaker: a column smooth on top and perforated
// below, its light ring round the top and its handle above.
function ntSpkBosePortable(c) {
  const p = spkPal("bose500", c.color === "black" ? "black" : "silver");
  const f = ntId(), h = ntId(), sh = ntId(), g = ntId(), hd = ntId();
  const light = c.color !== "black";
  const body = spkColumn(60, 20, 45, 105.6, 4.4);
  const low = "M40 78 A20 4.4 0 0 0 80 78 V105.6 A20 4.4 0 0 1 40 105.6 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#7d848b" : "#050607", 1.4, .4)}${spkFoot(sh)}${ntBlur(g, 1)}
<linearGradient id="${hd}" x1="0" x2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset=".4" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[2]}"/></linearGradient></defs>
${spkNotes(66, 0)}${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 27)}
${spkColShadow(60, 20, 105.6, 4.4)}
<path d="M43.4 44.6 C43.4 15 76.6 15 76.6 44.6" fill="none" stroke="url(#${hd})" stroke-width="4.2" stroke-linecap="round"/>
<path d="M43.4 44.6 C43.4 15 76.6 15 76.6 44.6" fill="none" stroke="${p[4]}" stroke-width=".6" opacity=".5"/>
<path d="${body}" fill="url(#${f})"/>
<path d="${low}" fill="${p[2]}" opacity=".35"/><path d="${low}" fill="url(#${h})"/>
<path d="M40 78 A20 4.4 0 0 0 80 78" fill="none" stroke="${p[2]}" stroke-width=".6"/>
<path d="${body}" fill="url(#${sh})"/>
<ellipse cx="60" cy="45" rx="20" ry="4.4" fill="${p[2]}"/><ellipse cx="60" cy="44.8" rx="18.8" ry="3.8" fill="${p[3]}"/><ellipse cx="60" cy="45" rx="15" ry="2.8" fill="${p[1]}"/>
${c.on ? `<path class="nta-glow" d="M45.4 46.2 A15 2.8 0 0 0 74.6 46.2" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" filter="url(#${g})"/><path d="M46 46.4 A14.4 2.6 0 0 0 74 46.4" fill="none" stroke="#fff" stroke-width=".6" stroke-linecap="round"/>` : ""}
${spkLogo(60, 60, light ? "#7d848b" : "#9aa1a8", 3)}
<path d="M43 52 V102" stroke="#fff" stroke-width="2" opacity="${light ? .55 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 69, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(70, 102) : ""}`;
}
// The knit of an Echo: fine woven rows, no holes.
const spkWeave = (id, col, op) => `<pattern id="${id}" width="1.8" height="1.8" patternUnits="userSpaceOnUse"><path d="M0 .45 H1.8 M0 1.35 H1.8" stroke="${col}" stroke-width=".45" opacity="${op}"/><path d="M.45 0 V1.8 M1.35 0 V1.8" stroke="${col}" stroke-width=".3" opacity="${(op * .6).toFixed(2)}"/></pattern>`;
// The light ring of an Echo: blue while it plays, red when muted.
const echoRing = (c, d, rg, gl, rest) => (c.on || c.muted
  ? `<path class="${c.on ? "nta-glow" : ""}" d="${d}" fill="none" stroke="${c.muted ? "#ff1744" : `url(#${rg})`}" stroke-width="2.6" stroke-linecap="round" filter="url(#${gl})"/><path d="${d}" fill="none" stroke="${c.muted ? "#ff1744" : `url(#${rg})`}" stroke-width="1.1" stroke-linecap="round"/>`
  : `<path d="${d}" fill="none" stroke="${rest}" stroke-width="1.1" stroke-linecap="round"/>`);
const echoDefs = (b, m, rg, gl, p, light) => `<radialGradient id="${b}" cx=".36" cy=".28" r=".85"><stop offset="0" stop-color="${p[0]}"/><stop offset=".6" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient>${spkWeave(m, light ? "#8f928f" : "#000", light ? .3 : .5)}
<linearGradient id="${rg}" x1="0" x2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset=".5" stop-color="#2979ff"/><stop offset="1" stop-color="#00e5ff"/></linearGradient>${ntBlur(gl, 1.6)}`;
// An Echo Dot: a ball of knit on its flat foot, the light ring round the foot.
function ntSpkDot(c) {
  const p = spkPal("echo", c.color);
  const b = ntId(), m = ntId(), rg = ntId(), gl = ntId();
  const light = c.color === "white";
  const ball = "M43.8 101 A35 35 0 1 1 76.2 101 Z";
  return `<defs>${echoDefs(b, m, rg, gl, p, light)}</defs>
${spkNotes(62, 12)}${ntWaves(60, 68, "#00b8d4", 39)}
${spkFootShadow(60, 103.4, 19, 2.6)}
<ellipse cx="60" cy="101.4" rx="16.6" ry="2.6" fill="${p[2]}"/>
<path d="${ball}" fill="url(#${b})"/><path d="${ball}" fill="url(#${m})"/>
<path d="M33 58 Q39 42 55 38" fill="none" stroke="#fff" stroke-width="2.4" opacity="${light ? .55 : .14}" stroke-linecap="round"/>
${echoRing(c, "M44.2 101.8 A15.8 2.2 0 0 0 75.8 101.8", rg, gl, light ? "#9a9d9a" : "#0b0d0f")}
${c.st === "paused" ? spkPause(60, 72, light ? "#7d807d" : "#fff") : ""}${c.muted ? spkMute(72, 46) : ""}`;
}
// An Echo Dot Max: a ball of knit with a round grey face set in its front,
// the buttons on it and the light ring round it.
function ntSpkDotMax(c) {
  const p = spkPal("echo", c.color === "black" ? "black" : "white");
  const b = ntId(), m = ntId(), rg = ntId(), gl = ntId(), tp = ntId();
  const light = c.color !== "black";
  const ball = "M43.8 105 A35 35 0 1 1 76.2 105 Z";
  const ic = light ? "#7d807d" : "#c9cdd1";
  return `<defs>${echoDefs(b, m, rg, gl, p, light)}<radialGradient id="${tp}" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[3]}"/></radialGradient></defs>
${spkNotes(64, 10)}${ntWaves(60, 72, "#00b8d4", 39)}
${spkFootShadow(60, 105.8, 18.4, 2.6)}
<ellipse cx="60" cy="105" rx="16.2" ry="2.4" fill="${p[2]}"/>
<path d="${ball}" fill="url(#${b})"/><path d="${ball}" fill="url(#${m})"/>
<path d="M29 62 Q34 46 50 41" fill="none" stroke="#fff" stroke-width="2.4" opacity="${light ? .55 : .14}" stroke-linecap="round"/>
<circle cx="60" cy="63" r="19.6" fill="${p[2]}" opacity=".7"/>
${echoRing(c, "M41.4 63 A18.6 18.6 0 1 1 78.6 63 A18.6 18.6 0 1 1 41.4 63", rg, gl, light ? "#c3c5c2" : "#0b0d0f")}
<circle cx="60" cy="63" r="17.2" fill="url(#${tp})"/>
<g transform="translate(60 63)" fill="none" stroke="${ic}" stroke-width="1.2" stroke-linecap="round">
<path d="M-14 0 H-10 M10 0 H14 M12 -2 V2"/><circle r="4.4" stroke-width=".7"/><circle r="2.3"/><path d="M-1.8 2 L1.8 -2"/></g>
${c.st === "paused" ? spkPause(60, 92, light ? "#7d807d" : "#fff") : ""}${c.muted ? spkMute(76, 98) : ""}`;
}
// A Nest Mini: a pebble of fabric on the table, four lights under the fabric.
// The Nest Mini in the colours it is sold in (#127): chalk, charcoal, sky.
const NEST_PAL = {
  white: ["#fbfbfa", "#e2e0db", "#c8c5be", "#d9d6d0", "#99958d", "#cbc8c1", .7],
  black: ["#666a70", "#45494e", "#2e3135", "#3c3f44", "#1b1d20", "#72767b", .25],
  blue: ["#dbe7ef", "#b8cdda", "#95afbf", "#adc3d1", "#6f8999", "#c4d4de", .6],
};
function ntSpkNest(c) {
  const t = ntId(), sd = ntId(), m = ntId(), gl = ntId();
  const q = NEST_PAL[c.color] || NEST_PAL.white;
  return `<defs><radialGradient id="${t}" cx=".42" cy=".3" r=".75"><stop offset="0" stop-color="${q[0]}"/><stop offset=".7" stop-color="${q[1]}"/><stop offset="1" stop-color="${q[2]}"/></radialGradient>${ntV(sd, q[3], q[4])}${spkMesh(m, .16)}${ntBlur(gl, 1.4)}</defs>
${spkNotes(60, 26)}${c.on ? ntWaves(60, 76, "var(--primary-color, #03a9f4)", 52) : ""}
${spkFootShadow(60, 101.2, 42, 3)}
<path d="M12 80 Q12 100 60 102 Q108 100 108 80 Z" fill="url(#${sd})"/>
<path d="M12 80 Q12 100 60 102 Q108 100 108 80 Z" fill="url(#${m})"/>
<path d="M12 80 Q12 60 60 58 Q108 60 108 80 Q108 92 60 93 Q12 92 12 80 Z" fill="url(#${t})"/>
<path d="M12 80 Q12 60 60 58 Q108 60 108 80 Q108 92 60 93 Q12 92 12 80 Z" fill="url(#${m})"/>
<path d="M22 72 Q36 62 58 61" fill="none" stroke="#fff" stroke-width="2.4" opacity="${q[6]}" stroke-linecap="round"/>
${[-1.5, -.5, .5, 1.5].map((k, i) => `<circle class="${c.on ? `nta-glow ntd${i + 1}` : ""}" cx="${60 + k * 8}" cy="76" r="2" fill="${c.on ? "#ffffff" : c.st === "paused" ? "#ffb74d" : q[5]}"${c.on ? ` filter="url(#${gl})"` : ""}/>
${c.on ? `<circle cx="${60 + k * 8}" cy="76" r="1.2" fill="#fff"/>` : ""}`).join("")}
${c.st === "paused" ? spkPause(60, 44, "#8d8a83") : ""}${c.muted ? spkMute(96, 52) : ""}`;
}
// The apps' logos, from Simple Icons (CC0, simpleicons.org), drawn in the
// tile on a 24 x 24 grid; an app without one keeps its letters.
const STR_LOGOS = {
  netflix: "m5.398 0 8.348 23.602c2.346.059 4.856.398 4.856.398L10.113 0H5.398zm8.489 0v9.172l4.715 13.33V0h-4.715zM5.398 1.5V24c1.873-.225 2.81-.312 4.715-.398V14.83L5.398 1.5z",
  youtubemusic: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z",
  youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  applemusic: "M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z",
  applepodcasts: "M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59.12 2.2.007 2.864a8.506 8.506 0 01-3.24 5.296c-.608.46-2.096 1.261-2.336 1.261-.088 0-.096-.091-.056-.46.072-.592.144-.715.48-.856.536-.224 1.448-.874 2.008-1.435a7.644 7.644 0 002.008-3.536c.208-.824.184-2.656-.048-3.504-.728-2.696-2.928-4.792-5.624-5.352-.784-.16-2.208-.16-3 0-2.728.56-4.984 2.76-5.672 5.528-.184.752-.184 2.584 0 3.336.456 1.832 1.64 3.512 3.192 4.512.304.2.672.408.824.472.336.144.408.264.472.856.04.36.03.464-.056.464-.056 0-.464-.176-.896-.384l-.04-.03c-2.472-1.216-4.056-3.274-4.632-6.012-.144-.706-.168-2.392-.03-3.04.36-1.74 1.048-3.1 2.192-4.304 1.648-1.737 3.768-2.656 6.128-2.656zm.134 2.81c.409.004.803.04 1.106.106 2.784.62 4.76 3.408 4.376 6.174-.152 1.114-.536 2.03-1.216 2.88-.336.43-1.152 1.15-1.296 1.15-.023 0-.048-.272-.048-.603v-.605l.416-.496c1.568-1.878 1.456-4.502-.256-6.224-.664-.67-1.432-1.064-2.424-1.246-.64-.118-.776-.118-1.448-.008-1.02.167-1.81.562-2.512 1.256-1.72 1.704-1.832 4.342-.264 6.222l.413.496v.608c0 .336-.027.608-.06.608-.03 0-.264-.16-.512-.36l-.034-.011c-.832-.664-1.568-1.842-1.872-2.997-.184-.698-.184-2.024.008-2.72.504-1.878 1.888-3.335 3.808-4.019.41-.145 1.133-.22 1.814-.211zm-.13 2.99c.31 0 .62.06.844.178.488.253.888.745 1.04 1.259.464 1.578-1.208 2.96-2.72 2.254h-.015c-.712-.331-1.096-.956-1.104-1.77 0-.733.408-1.371 1.112-1.745.224-.117.534-.176.844-.176zm-.011 4.728c.988-.004 1.706.349 1.97.97.198.464.124 1.932-.218 4.302-.232 1.656-.36 2.074-.68 2.356-.44.39-1.064.498-1.656.288h-.003c-.716-.257-.87-.605-1.164-2.644-.341-2.37-.416-3.838-.218-4.302.262-.616.974-.966 1.97-.97z",
  appstore: "M8.8086 14.9194l6.1107-11.0368c.0837-.1513.1682-.302.2437-.4584.0685-.142.1267-.2854.1646-.4403.0803-.3259.0588-.6656-.066-.9767-.1238-.3095-.3417-.5678-.6201-.7355a1.4175 1.4175 0 0 0-.921-.1924c-.3207.043-.6135.1935-.8443.4288-.1094.1118-.1996.2361-.2832.369-.092.1463-.175.2979-.259.4492l-.3864.6979-.3865-.6979c-.0837-.1515-.1667-.303-.2587-.4492-.0837-.1329-.1739-.2572-.2835-.369-.2305-.2353-.5233-.3857-.844-.429a1.4181 1.4181 0 0 0-.921.1926c-.2784.1677-.4964.426-.6203.7355-.1246.311-.1461.6508-.066.9767.038.155.0962.2984.1648.4403.0753.1564.1598.307.2437.4584l1.248 2.2543-4.8625 8.7825H2.0295c-.1676 0-.3351-.0007-.5026.0092-.1522.009-.3004.0284-.448.0714-.3108.0906-.5822.2798-.7783.548-.195.2665-.3006.5929-.3006.9279 0 .3352.1057.6612.3006.9277.196.2683.4675.4575.7782.548.1477.043.296.0623.4481.0715.1675.01.335.009.5026.009h13.0974c.0171-.0357.059-.1294.1-.2697.415-1.4151-.6156-2.843-2.0347-2.843zM3.113 18.5418l-.7922 1.5008c-.0818.1553-.1644.31-.2384.4705-.067.1458-.124.293-.1611.452-.0785.3346-.0576.6834.0645 1.0029.1212.3175.3346.583.607.7549.2727.172.5891.2416.9013.1975.3139-.044.6005-.1986.8263-.4402.1072-.1148.1954-.2424.2772-.3787.0902-.1503.1714-.3059.2535-.4612L6 19.4636c-.0896-.149-.9473-1.4704-2.887-.9218m20.5861-3.0056a1.4707 1.4707 0 0 0-.779-.5407c-.1476-.0425-.2961-.0616-.4483-.0705-.1678-.0099-.3352-.0091-.503-.0091H18.648l-4.3891-7.817c-.6655.7005-.9632 1.485-1.0773 2.1976-.1655 1.0333.0367 2.0934.546 3.0004l5.2741 9.3933c.084.1494.167.299.2591.4435.0837.131.1739.2537.2836.364.231.2323.5238.3809.8449.4232.3192.0424.643-.0244.9217-.1899.2784-.1653.4968-.4204.621-.7257.1246-.3072.146-.6425.0658-.9641-.0381-.1529-.0962-.2945-.165-.4346-.0753-.1543-.1598-.303-.2438-.4524l-1.216-2.1662h1.596c.1677 0 .3351.0009.5029-.009.1522-.009.3007-.028.4483-.0705a1.4707 1.4707 0 0 0 .779-.5407A1.5386 1.5386 0 0 0 24 16.452a1.539 1.539 0 0 0-.3009-.9158Z",
  applearcade: "M.198 18.24a.966.966 0 0 1-.194-.571v-.955s0-.571.563-.313c0 0 6.919 3.135 8.033 3.626a7.832 7.832 0 0 0 3.408.729 8.216 8.216 0 0 0 3.396-.729l8.037-3.626c.559-.258.559.313.559.313v.955a1.038 1.038 0 0 1-.198.575c-.19.258-.515.539-1.411.959-.713.337-6.23 2.818-6.995 3.17a8.008 8.008 0 0 1-3.4.729 8.336 8.336 0 0 1-3.82-.927c-1.435-.65-5.849-2.631-6.567-2.972-.9-.428-1.153-.654-1.411-.963zm1.411-5.973l6.987-3.17a7.975 7.975 0 0 1 2.164-.634v5.707c0 .396.571.697 1.236.697s1.141-.313 1.141-.697V8.479c.778.105 1.54.313 2.263.618l6.987 3.17c.579.273 1.609.761 1.609 1.538s-1.011 1.236-1.609 1.53l-6.987 3.17a8.2 8.2 0 0 1-3.396.729 7.832 7.832 0 0 1-3.408-.729l-6.987-3.17C1.011 15.042 0 14.574 0 13.801s1.03-1.264 1.609-1.534zm1.807 2.247c.77.396 1.683.396 2.453 0 .682-.396.686-1.026 0-1.419a2.705 2.705 0 0 0-2.453 0c-.68.392-.666 1.02 0 1.419zM12 7.595a3.35 3.35 0 1 1 3.349-3.351v.003c0 1.849-1.5 3.348-3.349 3.348z",
  appletv: "M20.57 17.735h-1.815l-3.34-9.203h1.633l2.02 5.987c.075.231.273.9.586 2.012l.297-.997.33-1.006 2.094-6.004H24zm-5.344-.066a5.76 5.76 0 0 1-1.55.207c-1.23 0-1.84-.693-1.84-2.087V9.646h-1.063V8.532h1.121V7.081l1.476-.602v2.062h1.707v1.113H13.38v5.805c0 .446.074.75.214.932.14.182.396.264.75.264.207 0 .495-.041.883-.115zm-7.29-5.343c.017 1.764 1.55 2.358 1.567 2.366-.017.042-.248.842-.808 1.658-.487.71-.99 1.418-1.79 1.435-.783.016-1.03-.462-1.93-.462-.89 0-1.17.445-1.913.478-.758.025-1.344-.775-1.838-1.484-.998-1.451-1.765-4.098-.734-5.88.51-.89 1.426-1.451 2.416-1.46.75-.016 1.468.512 1.93.512.461 0 1.327-.627 2.234-.536.38.016 1.452.157 2.136 1.154-.058.033-1.278.743-1.27 2.219M6.468 7.988c.404-.495.685-1.18.61-1.864-.585.025-1.294.388-1.723.883-.38.437-.71 1.138-.619 1.806.652.05 1.328-.338 1.732-.825Z",
  plex: "M3.987 8.409c-.96 0-1.587.28-2.12.933v-.72H0v8.88s.038.018.127.037c.138.03.821.187 1.331-.249.441-.377.542-.814.542-1.318v-1.283c.533.573 1.147.813 2 .813 1.84 0 3.253-1.493 3.253-3.48 0-2.12-1.36-3.613-3.266-3.613Zm16.748 5.595.406.591c.391.614.894.906 1.492.908.621-.012 1.064-.562 1.226-.755 0 0-.307-.27-.686-.72-.517-.614-1.214-1.755-1.24-1.803l-1.198 1.779Zm-3.205-1.955c0-2.08-1.52-3.64-3.52-3.64s-3.467 1.587-3.467 3.573a3.48 3.48 0 0 0 3.507 3.52c1.413 0 2.626-.84 3.253-2.293h-2.04l-.093.093c-.427.4-.72.533-1.227.533-.787 0-1.373-.506-1.453-1.266h4.986c.04-.214.054-.307.054-.52Zm-7.671-.219c0 .769.11 1.701.868 2.722l.056.069c-.306.526-.742.88-1.248.88-.399 0-.814-.211-1.138-.579a2.177 2.177 0 0 1-.538-1.441V6.409H9.86l-.001 5.421Zm9.283 3.46h-2.39l2.247-3.332-2.247-3.335h2.39l2.248 3.335-2.248 3.332Zm1.593-1.286Zm-17.162-.342c-.933 0-1.68-.773-1.68-1.72s.76-1.666 1.68-1.666c.92 0 1.68.733 1.68 1.68 0 .946-.733 1.706-1.68 1.706Zm18.361-1.974L24 8.622h-2.391l-.87 1.293 1.195 1.773Zm-9.404-.466c.16-.706.72-1.133 1.493-1.133.773 0 1.373.467 1.507 1.133h-3Z",
  spotify: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  deezer: "M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z",
  twitch: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z",
  crunchyroll: "M2.909 13.436C2.914 7.61 7.642 2.893 13.468 2.898c5.576.005 10.137 4.339 10.51 9.819q.021-.351.022-.706C24.007 5.385 18.64.006 12.012 0S.007 5.36 0 11.988 5.36 23.994 11.988 24q.412 0 .815-.027c-5.526-.338-9.9-4.928-9.894-10.538Zm16.284.155a4.1 4.1 0 0 1-4.095-4.103 4.1 4.1 0 0 1 2.712-3.855 8.95 8.95 0 0 0-4.187-1.037 9.007 9.007 0 1 0 8.997 9.016q-.001-.847-.15-1.651a4.1 4.1 0 0 1-3.278 1.63Z",
  kodi: "M12.03.047c-.226 0-.452.107-.669.324-.922.922-1.842 1.845-2.763 2.768-.233.233-.455.48-.703.695-.31.267-.405.583-.399.988.02 1.399.008 2.799.008 4.198 0 1.453-.002 2.907 0 4.36 0 .11.002.223.03.327.087.337.303.393.546.15 1.31-1.31 2.618-2.622 3.928-3.933l4.449-4.453c.43-.431.43-.905 0-1.336L12.697.37c-.216-.217-.442-.324-.668-.324zm7.224 7.23c-.223 0-.445.104-.65.309L14.82 11.37c-.428.429-.427.895 0 1.322l3.76 3.766c.44.44.908.44 1.346.002 1.215-1.216 2.427-2.433 3.644-3.647.182-.18.353-.364.43-.615v-.33c-.077-.251-.246-.436-.428-.617-1.224-1.22-2.443-2.445-3.666-3.668-.205-.205-.429-.307-.652-.307zM4.18 7.611c-.086.014-.145.094-.207.157L.209 11.572c-.28.284-.278.677.004.96l2.043 2.046c.59.59 1.177 1.182 1.767 1.772.169.168.33.139.416-.084.044-.114.062-.242.063-.364.004-1.283.004-2.567.004-3.851h-.002V8.184c0-.085-.01-.169-.022-.252-.019-.135-.072-.258-.207-.309a.186.186 0 0 0-.095-.012zm7.908 6.838c-.224 0-.447.106-.656.315L7.66 18.537c-.433.434-.433.899.002 1.334 1.215 1.216 2.43 2.43 3.643 3.649.18.18.361.354.611.433h.33c.244-.069.423-.226.598-.402 1.222-1.23 2.45-2.453 3.676-3.68.43-.43.427-.905-.004-1.338l-3.772-3.773c-.208-.208-.432-.311-.656-.31z",
  max: "M1.769 0A1.77 1.77 0 0 0 0 1.769V22.23A1.77 1.77 0 0 0 1.769 24H22.23A1.77 1.77 0 0 0 24 22.231V1.77A1.77 1.77 0 0 0 22.231 0zm12.485 3.28a4.301 4.301 0 0 1 4.3 4.302 4.301 4.301 0 0 1-1.993 3.63 6.085 6.085 0 0 1 1.054 3.422 6.085 6.085 0 0 1-6.085 6.085 6.085 6.085 0 0 1-6.085-6.085 6.085 6.085 0 0 1 4.66-5.916 4.301 4.301 0 0 1-.152-1.136 4.301 4.301 0 0 1 4.301-4.301zm0 1.849a2.453 2.453 0 0 0-2.453 2.453 2.453 2.453 0 0 0 2.453 2.453 2.453 2.453 0 0 0 2.453-2.453 2.453 2.453 0 0 0-2.453-2.453zm-2.724 5.268a4.237 4.237 0 0 0-4.237 4.237 4.237 4.237 0 0 0 4.237 4.237 4.237 4.237 0 0 0 4.237-4.237 4.237 4.237 0 0 0-4.237-4.237zm.032 2.54a1.781 1.781 0 1 1 0 3.562 1.781 1.781 0 0 1 0-3.562Z",
  rakuten: "M23.277 21.3L3.939 24 .722 21.3h22.555zM7.6 19.276H3.939V0h6.052a6.653 6.653 0 0 1 6.65 6.646c0 2.234-1.108 4.204-2.799 5.418l5.418 7.211h-4.585l-4.486-5.979H7.6v5.98zm0-9.64h2.392a2.992 2.992 0 0 0 2.989-2.989 2.994 2.994 0 0 0-2.989-2.986H7.6v5.975z",
  vlcmediaplayer: "M12.0319 0c-.8823 0-1.0545.136-1.0545.136-.1738.056-.3556.255-.4105.43L9.683 3.3808c.4729.1729 1.3222.4266 2.2337.4266 1.0987 0 2.017-.3494 2.3763-.5075L13.4352.566c-.055-.1755-.237-.3707-.4067-.4374 0 0-.1142-.1286-.9966-.1286zm3.5645 7.455c-.3601.34-1.3276.9373-3.6797.9373-2.2929 0-3.189-.5678-3.5213-.9113l-1.3887 4.4227c.2272.3614 1.2539 1.5594 4.8847 1.5594 3.7569 0 4.8539-1.3467 5.0649-1.6737zm-8.5897 4.4487l-1.0025 3.1922H4.3428c-.2486 0-.5097.1932-.5826.4315l-2.334 7.6317a.3962.3962 0 0 0-.0169.1537c-.0008.0053-.002.0099-.002.016 0 .0839.0233.226.0233.226.0322.2456.2612.4452.5098.4452h20.1192c.2487 0 .4768-.1994.5098-.4453 0 0 .0234-.142.0234-.226a.0245.0245 0 0 0-.0025-.01.3201.3201 0 0 0 .0024-.0313.4096.4096 0 0 0-.019-.1282l-2.3339-7.6318c-.0729-.2383-.334-.4314-.5826-.4314h-1.6636l.2005.6391c-.2407.4854-1.4886 2.38-6.3027 2.38-4.6003 0-5.8288-1.73-6.1107-2.3072z",
  nordvpn: "M2.2838 21.5414A11.9866 11.9866 0 010 14.4832C0 7.8418 5.3727 2.4586 12 2.4586c6.6279 0 12 5.3832 12 12.0246a11.9853 11.9853 0 01-2.2838 7.0582l-5.7636-9.3783-.5565.9419.5645 2.6186L12 8.9338l-2.45 4.1447.5707 2.6451-2.0764-3.5555-5.7605 9.3733z",
  retroarch: "M6.84 5.76L8.4 7.68H5.28l-.72 2.88H2.64l.72-2.88H1.44L0 13.44h3.84l-.48 1.92h3.36L4.2 18.24h2.82l2.34-2.88h5.28l2.34 2.88h2.82l-2.52-2.88h3.36l-.48-1.92H24l-1.44-5.76h-1.92l.72 2.88h-1.92l-.72-2.88H15.6l1.56-1.92h-2.04l-1.68 1.92h-2.88L8.88 5.76zm.24 3.84H9v1.92H7.08zm7.925 0h1.92v1.92h-1.92Z",
};
// The app's tile above a box while it plays, dimmed with its bars in pause.
function strTile(c, x, y) { const out = strTileRaw(c, x, y); return out ? ntKeep(out) : ""; }
function strTileRaw(c, x, y) {
  if (c.st !== "playing" && c.st !== "paused") return "";
  const ap = c.app || { bg: "#1e88e5", fg: "#ffffff", mark: "\u25b6" };
  const fs = ap.mark.length > 3 ? 4.6 : ap.mark.length > 2 ? 5.8 : ap.mark.length > 1 ? 7.4 : 10;
  const gl = ntId();
  return `<defs>${ntBlur(gl, 2.4)}</defs><g opacity="${c.st === "paused" ? .5 : 1}">
${c.on ? `<rect class="nta-glow" x="${x - 12}" y="${y - 12}" width="24" height="24" rx="6" fill="${ap.bg}" filter="url(#${gl})" opacity=".55"/>` : ""}
<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="5.4" fill="${ap.bg}" stroke="#ffffff" stroke-opacity=".3" stroke-width=".6"/>
${STR_LOGOS[ap.logo] ? `<path d="${STR_LOGOS[ap.logo]}" transform="translate(${x - 7.2} ${y - 7.2}) scale(.6)" fill="${ap.fg}"/>` : `<text x="${x}" y="${(y + fs * .36).toFixed(2)}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${ap.fg}" ${NT_FONT}>${esc(ap.mark)}</text>`}</g>
${c.st === "paused" ? `<circle cx="${x + 10}" cy="${y + 10}" r="5" fill="#ffffff" stroke="#cfd6dc" stroke-width=".6"/><rect x="${x + 8}" y="${y + 7.6}" width="1.4" height="4.8" rx=".5" fill="#5d6773"/><rect x="${x + 10.6}" y="${y + 7.6}" width="1.4" height="4.8" rx=".5" fill="#5d6773"/>` : ""}`;
}
// A small box drawn larger, centred on the field, its foot kept in place.
const strZoom = (svg, cx, k) => `<g transform="translate(60 88) scale(${k}) translate(${-cx} -88)">${svg}</g>`;
// A box's light: its colour while on, amber on standby, dark when off.
const strLed = (c, x, y, col = "#ffffff", r = .9) => `<circle class="${c.on ? "nta-glow" : ""}" cx="${x}" cy="${y}" r="${r}" fill="${["playing", "paused", "home"].includes(c.st) ? col : c.st === "standby" ? "#ffb300" : "#3a3e44"}"/>`;
const strMute = (c, x, y) => (c.muted ? spkMute(x, y) : "");
// The apple of an Apple TV.
const STR_APPLE = "M0 -2.2 C-1.6 -3.4 -4 -2.6 -4 .2 C-4 2.6 -2.2 4.4 -1.2 4.4 C-.6 4.4 -.4 4 0 4 C.4 4 .6 4.4 1.2 4.4 C2.2 4.4 4 2.6 4 .2 C4 -2.6 1.6 -3.4 0 -2.2 Z M.2 -2.8 C.2 -4 1 -4.8 2 -5 C2 -3.8 1.2 -3 .2 -2.8 Z";

// Apple TV 4K: the squircle seen from above at an angle, its matte top with
// the apple alone, its glossy band, and the silver Siri Remote lying by it.
function strAppleTv(c) {
  const sd = ntId(), tp = ntId(), bl = ntId();
  // A rounded square in that view: a diamond whose corners are rounded off.
  const P = [[24, 82], [54, 69], [84, 82], [54, 95]], f = .3;
  const lerp = (a, b, k) => [+(a[0] + (b[0] - a[0]) * k).toFixed(2), +(a[1] + (b[1] - a[1]) * k).toFixed(2)];
  const top = (dy = 0) => P.map((c, i) => { const a = lerp(c, P[(i + 3) % 4], f), b = lerp(c, P[(i + 1) % 4], f);
    return `${i ? "L" : "M"}${a[0]} ${a[1] + dy} Q${c[0]} ${c[1] + dy} ${b[0]} ${b[1] + dy}`; }).join(" ") + " Z";
  const ex = (i) => +(.25 * lerp(P[i], P[(i + 3) % 4], f)[0] + .5 * P[i][0] + .25 * lerp(P[i], P[(i + 1) % 4], f)[0]).toFixed(2);
  return `<defs><linearGradient id="${sd}" x1="0" x2="1"><stop offset="0" stop-color="#0b0c0e"/><stop offset=".35" stop-color="#3a3e44"/><stop offset=".55" stop-color="#121417"/><stop offset="1" stop-color="#050607"/></linearGradient>
<radialGradient id="${tp}" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#2e3135"/><stop offset="1" stop-color="#17191c"/></radialGradient>
<filter id="${bl}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="1.4"/></filter></defs>
${strTile(c, 52, 44)}
<path d="${top(12.4)}" fill="#000" opacity=".28" filter="url(#${bl})" transform="translate(2 0)"/>
<path d="${top(10)}" fill="url(#${sd})"/><rect x="${ex(0)}" y="82" width="${+(ex(2) - ex(0)).toFixed(2)}" height="10" fill="url(#${sd})"/>
<path d="${top()}" fill="url(#${tp})"/>
<path d="M33 79.4 L44 74.4" fill="none" stroke="#ffffff" stroke-width=".6" opacity=".1" stroke-linecap="round"/>
<g transform="translate(54 82) scale(1.2 .55)"><path d="${STR_APPLE}" fill="#08090a"/></g>
${strLed(c, 44, 92.6, "#ffffff", .6)}
${strMute(c, 94, 60)}`;
}
// The three-quarter view of the streaming boxes, the Apple TV's: a box's top
// is a diamond, its edges running down to the right along A and down to the
// left along B, its corners rounded, its two front faces below it.
const ISO_A = [.9177, .3971];
const ISO_B = [-.9177, .3971];
function strIsoGeom(cx, cy, a, b, r, lift = [0, 0, 0, 0]) {
  const ha = [ISO_A[0] * a / 2, ISO_A[1] * a / 2], hb = [ISO_B[0] * b / 2, ISO_B[1] * b / 2];
  // Left, top (back), right, front.
  const P = [[cx - ha[0] + hb[0], cy - ha[1] + hb[1]], [cx - ha[0] - hb[0], cy - ha[1] - hb[1]], [cx + ha[0] - hb[0], cy + ha[1] - hb[1]], [cx + ha[0] + hb[0], cy + ha[1] + hb[1]]]
    .map((p, i) => [p[0], p[1] - lift[i]]);
  const n = (v) => +v.toFixed(2);
  const toward = (c, o) => { const len = Math.hypot(o[0] - c[0], o[1] - c[1]); const k = Math.min(.45, r / (len || 1)); return [c[0] + (o[0] - c[0]) * k, c[1] + (o[1] - c[1]) * k]; };
  const corner = (i) => [toward(P[i], P[(i + 3) % 4]), P[i], toward(P[i], P[(i + 1) % 4])];
  const top = (dy = 0) => [0, 1, 2, 3].map((i) => { const [a1, c, b1] = corner(i);
    return `${i ? "L" : "M"}${n(a1[0])} ${n(a1[1] + dy)} Q${n(c[0])} ${n(c[1] + dy)} ${n(b1[0])} ${n(b1[1] + dy)}`; }).join(" ") + " Z";
  const ext = (i) => { const [a1, c, b1] = corner(i); return [n(.25 * a1[0] + .5 * c[0] + .25 * b1[0]), n(.25 * a1[1] + .5 * c[1] + .25 * b1[1])]; };
  return { P, top, L: ext(0), R: ext(2), F: P[3] };
}
// A box in that view: its band of sides lit from the left, darker on the
// right face, its top, its shadow on the table.
function strIsoBox(g, h, topFill, faces, shadow = .28) {
  const sd = ntId(), bl = ntId();
  const [L, R, F] = [g.L, g.R, g.F];
  const k = Math.max(0, Math.min(1, (F[0] - L[0]) / ((R[0] - L[0]) || 1)));
  return `<defs><linearGradient id="${sd}" gradientUnits="userSpaceOnUse" x1="${L[0]}" y1="0" x2="${R[0]}" y2="0"><stop offset="0" stop-color="${faces[0]}"/><stop offset="${(k * .7).toFixed(3)}" stop-color="${faces[1]}"/>
<stop offset="${k.toFixed(3)}" stop-color="${faces[2]}"/><stop offset="${Math.min(1, k + .04).toFixed(3)}" stop-color="${faces[3]}"/><stop offset="1" stop-color="${faces[4]}"/></linearGradient>
<filter id="${bl}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="1.4"/></filter></defs>
<path d="${g.top(h + 2.4)}" fill="#000" opacity="${shadow}" filter="url(#${bl})" transform="translate(2 0)"/>
<path d="${g.top(h)}" fill="url(#${sd})"/><path d="M${L[0]} ${L[1]} L${R[0]} ${R[1]} L${R[0]} ${R[1] + h} L${L[0]} ${L[1] + h} Z" fill="url(#${sd})"/>
<path d="${g.top()}" fill="${topFill}"/>`;
}
const STR_DARK_FACES = ["#0b0c0e", "#2c2f34", "#3a3e44", "#121417", "#050607"];
// A mark laid on a box's top, along its A edge; on its left face.
const strIsoTop = (x, y, inner) => `<g transform="matrix(.9177 .3971 -.9177 .3971 ${x} ${y})">${inner}</g>`;
const strIsoLeft = (x, y, inner) => `<g transform="matrix(.9177 .3971 0 1 ${x} ${y})">${inner}</g>`;
// A point on the left face: t along its top edge, d below it.
const strOnLeft = (g, t, d) => [+(g.P[0][0] + (g.P[3][0] - g.P[0][0]) * t).toFixed(2), +(g.P[0][1] + (g.P[3][1] - g.P[0][1]) * t + d).toFixed(2)];
const strOnRight = (g, t, d) => [+(g.P[3][0] + (g.P[2][0] - g.P[3][0]) * t).toFixed(2), +(g.P[3][1] + (g.P[2][1] - g.P[3][1]) * t + d).toFixed(2)];
const strTopGrad = (id, a = "#30343a", b = "#16181b") => `<radialGradient id="${id}" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
// A disc lying on the table, seen the same way: an ellipse and its band.
function strIsoDisc(cx, cy, rad, h, topFill, faces) {
  const rx = +(rad * 1.298).toFixed(2), ry = +(rad * .5616).toFixed(2), sd = ntId(), bl = ntId();
  return `<defs><linearGradient id="${sd}" x1="0" x2="1"><stop offset="0" stop-color="${faces[0]}"/><stop offset=".3" stop-color="${faces[1]}"/><stop offset=".55" stop-color="${faces[3]}"/><stop offset="1" stop-color="${faces[4]}"/></linearGradient>
<filter id="${bl}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="1.4"/></filter></defs>
<ellipse cx="${cx + 2}" cy="${cy + h + 2.4}" rx="${rx}" ry="${ry}" fill="#000" opacity=".28" filter="url(#${bl})"/>
<path d="M${cx - rx} ${cy} V${cy + h} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h} V${cy} Z" fill="url(#${sd})"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${topFill}"/>`;
}

// Fire TV Cube: the cube in fabric, its glossy top and the blue light bar
// along its front edge.
function strFireCube(c) {
  const g = strIsoGeom(60, 50, 38, 38, 4), t = ntId(), h = ntId(), lb = ntId(), gl = ntId();
  const [p0, p3, p2] = [g.P[0], g.P[3], g.P[2]], H = 40;
  return `<defs>${strTopGrad(t, "#3a3e44", "#0e1012")}${spkHoles(h, "#000000", 1.15, .36)}${ntBlur(gl, 1.4)}
<linearGradient id="${lb}" x1="0" x2="1"><stop offset="0" stop-color="#00e5ff" stop-opacity=".25"/><stop offset=".5" stop-color="#2979ff"/><stop offset="1" stop-color="#00e5ff" stop-opacity=".25"/></linearGradient></defs>
${strTile(c, 60, 18)}
${strIsoBox(g, H, `url(#${t})`, ["#16181b", "#2c2f34", "#33363b", "#141619", "#08090a"])}
<path d="M${p0[0] + 1} ${p0[1] + 3} L${p3[0]} ${p3[1] + 3} V${p3[1] + H - 1} L${p0[0] + 1} ${p0[1] + H - 1} Z" fill="url(#${h})"/>
<path d="M${p3[0] + 1} ${p3[1] + 3} L${p2[0] - 3} ${p2[1] + 4} V${p2[1] + H - 2} L${p3[0] + 1} ${p3[1] + H - 1} Z" fill="url(#${h})" opacity=".7"/>
${c.on ? `<path class="nta-glow" d="M${p0[0] + 4} ${p0[1] + 1.4} L${p3[0] - 3} ${p3[1] - .4}" stroke="url(#${lb})" stroke-width="2" stroke-linecap="round" filter="url(#${gl})"/><path d="M${p0[0] + 5} ${p0[1] + 1.4} L${p3[0] - 4} ${p3[1] - .4}" stroke="url(#${lb})" stroke-width=".9" stroke-linecap="round"/>` : ""}
${strIsoLeft(...strOnLeft(g, .32, 33), `<text x="0" y="0" font-size="4" font-weight="700" fill="#7d848b" ${NT_FONT}>amazon</text><path d="M1 1.2 Q7 3.2 13 1" fill="none" stroke="#ff9900" stroke-width=".6" stroke-linecap="round"/>`)}
${strMute(c, 98, 46)}`;
}
// Fire TV Stick, or any stick: the stick lying with its HDMI plug and its
// power cable; a Roku stick with its purple end.
function strStick(c, fire) {
  const g = strIsoGeom(56, 78, 66, 14, 4), t = ntId(), m = ntId();
  const end = strOnRight(g, .5, 4), plug = strIsoGeom(end[0] + 7, end[1] - 1, 10, 7, 1);
  const accent = c.brand || "";
  return `<defs>${strTopGrad(t)}${ntV(m, "#f1f3f5", "#aeb5bb")}</defs>
${strTile(c, 50, 44)}
<path d="M${g.L[0] + 2} ${g.L[1] + 4} Q${g.L[0] - 8} ${g.L[1] + 5} ${g.L[0] - 10} ${g.L[1] + 14} T${g.L[0] - 16} ${g.L[1] + 24}" fill="none" stroke="#1a1c1f" stroke-width="1.6" stroke-linecap="round"/>
${strIsoBox(g, 9, `url(#${t})`, STR_DARK_FACES)}
${strIsoBox(plug, 4, "#f7f8f9", ["#c9ced3", "#e9ecef", "#f1f3f5", "#aeb5bb", "#8f969d"], .1)}
${accent ? `<path d="${strIsoGeom(56 - 26 * .9177, 78 - 26 * .3971, 14, 14, 4).top()}" fill="${accent}"/>` : ""}
${fire ? strIsoTop(46, 74, `<text x="0" y="1.6" font-size="5.6" font-weight="700" fill="#7d848b" ${NT_FONT}>fire tv</text>`) : ""}
${strLed(c, ...strOnLeft(g, .12, 4.5), "#ffffff", .6)}${strMute(c, 96, 60)}`;
}
// Google TV Streamer: the porcelain wedge, low at the front and rising to
// the back.
function strGoogleStreamer(c) {
  const g = strIsoGeom(60, 76, 56, 40, 9, [3, 7, 3, 0]), t = ntId();
  return `<defs><linearGradient id="${t}" x1="0" y1="1" x2=".4" y2="0"><stop offset="0" stop-color="#e4e0d8"/><stop offset="1" stop-color="#faf8f4"/></linearGradient></defs>
${strTile(c, 60, 34)}
${strIsoBox(g, 7, `url(#${t})`, ["#bdb6aa", "#d6d0c5", "#ddd8ce", "#bfb8ac", "#a59e91"], .22)}
${strLed(c, ...strOnLeft(g, .8, 3.6), "#ffffff", .6)}${strMute(c, 98, 56)}`;
}
// Chromecast with Google TV: the snow-white puck lying flat, its cable
// running to the HDMI plug.
function strChromecast(c) {
  const t = ntId();
  const plug = strIsoGeom(102, 99, 9, 6, 1);
  return `<defs><radialGradient id="${t}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3e1dc"/></radialGradient></defs>
${strTile(c, 52, 46)}
<path d="M80 88 Q94 89 96 96 T102 99" fill="none" stroke="#c9c6bf" stroke-width="3" stroke-linecap="round"/><path d="M80 88 Q94 89 96 96 T102 99" fill="none" stroke="#f1efea" stroke-width="2" stroke-linecap="round"/>
${strIsoBox(plug, 4, "#f7f6f2", ["#d9d6cf", "#ece9e3", "#f1efea", "#c9c6bf", "#b3b0a9"], .1)}
${strIsoDisc(54, 86, 22, 6, `url(#${t})`, ["#c9c6bf", "#e3e1dc", "#ece9e3", "#d1cec7", "#a9a6a0"])}
<text x="0" y="0" transform="translate(54 87.6) scale(1.3 .56)" text-anchor="middle" font-size="9" font-weight="700" fill="#c3c0b9" ${NT_FONT}>G</text>
${strLed(c, 44, 96, "#ffffff", .55)}${strMute(c, 90, 62)}`;
}
// NVIDIA Shield TV (2019): the matte black tube lying on the table along the
// boxes' A edge, about four times as long as it is wide, the seam ring near
// its back end, the NVIDIA eye and name on its flank by the near end, and
// that end open: a thin rim around the recessed face with the ports.
function strShield(c) {
  const b = ntId(), bl = ntId(), rc = ntId();
  const n = (v) => +v.toFixed(2), r = 9.2, len = 74, C = [56, 79];
  const p0 = [C[0] - ISO_A[0] * len / 2, C[1] - ISO_A[1] * len / 2], p1 = [C[0] + ISO_A[0] * len / 2, C[1] + ISO_A[1] * len / 2];
  // The tube's section, a circle across the axis: along B and up.
  const u = [ISO_B[0] * r, ISO_B[1] * r], v = [0, -r];
  const at = (p, t, k = 1) => [n(p[0] + (u[0] * Math.cos(t) + v[0] * Math.sin(t)) * k), n(p[1] + (u[1] * Math.cos(t) + v[1] * Math.sin(t)) * k)];
  const along = (k) => [p0[0] + (p1[0] - p0[0]) * k, p0[1] + (p1[1] - p0[1]) * k];
  // Where the outline runs along the axis: the section's tangent there is A.
  const cr = (p, q) => p[0] * q[1] - p[1] * q[0];
  const hi = Math.atan2(cr(v, ISO_A), cr(u, ISO_A)), lo = hi - Math.PI;
  const arc = (p, t0, t1, k = 1, m = 24) => Array.from({ length: m + 1 }, (_, i) => at(p, t0 + (t1 - t0) * i / m, k)).map((q) => `${q[0]} ${q[1]}`).join(" L");
  const end = (p) => `matrix(${n(u[0])} ${n(u[1])} ${v[0]} ${v[1]} ${n(p[0])} ${n(p[1])})`;
  const ring = (k) => `M${arc(along(k), hi, lo, 1, 18)}`;
  const name = at(along(.8), .55);
  const tg = [-u[0] * Math.sin(.55) + v[0] * Math.cos(.55), -u[1] * Math.sin(.55) + v[1] * Math.cos(.55)], tl = Math.hypot(tg[0], tg[1]);
  return `<defs><linearGradient id="${b}" gradientUnits="userSpaceOnUse" x1="${at(C, hi)[0]}" y1="${at(C, hi)[1]}" x2="${at(C, lo)[0]}" y2="${at(C, lo)[1]}">
<stop offset="0" stop-color="#1a1c1f"/><stop offset=".2" stop-color="#34383d"/><stop offset=".4" stop-color="#222529"/><stop offset=".8" stop-color="#0e1012"/><stop offset="1" stop-color="#050607"/></linearGradient>
<radialGradient id="${rc}" cx=".5" cy=".3" r=".75"><stop offset="0" stop-color="#050607"/><stop offset=".75" stop-color="#101214"/><stop offset="1" stop-color="#1c1f22"/></radialGradient>
<filter id="${bl}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="1.8"/></filter></defs>
${strTile(c, 50, 40)}
<path d="M${at(p0, lo).join(" ")} L${at(p1, lo).join(" ")}" stroke="#000" stroke-width="8" stroke-linecap="round" opacity=".35" filter="url(#${bl})" transform="translate(1.5 2.8)"/>
<path d="M${arc(p1, hi, hi + Math.PI)} L${arc(p0, hi - Math.PI, hi)} Z" fill="url(#${b})"/>
<path d="${ring(.2)}" fill="none" stroke="#050607" stroke-width=".8"/><path d="${ring(.212)}" fill="none" stroke="#3a3e44" stroke-width=".3"/>
<g transform="${end(p1)}"><circle r="1" fill="#26292d"/><circle r=".86" fill="url(#${rc})"/>
<rect x="-.38" y="-.12" width=".34" height=".3" rx=".03" fill="#000" stroke="#3a3e44" stroke-width=".25" vector-effect="non-scaling-stroke"/>
<circle cx=".26" cy=".22" r=".11" fill="#000" stroke="#3a3e44" stroke-width=".25" vector-effect="non-scaling-stroke"/><circle cx=".26" cy="-.06" r=".11" fill="#000" stroke="#3a3e44" stroke-width=".25" vector-effect="non-scaling-stroke"/>
${Array.from({ length: 14 }, (_, i) => { const t = i / 14 * 2 * Math.PI; return `<circle cx="${n(Math.cos(t) * .72)}" cy="${n(Math.sin(t) * .72)}" r=".05" fill="#2c3035"/>`; }).join("")}</g>
<g transform="matrix(${n(ISO_A[0])} ${n(ISO_A[1])} ${n(-tg[0] / tl)} ${n(-tg[1] / tl)} ${name[0]} ${name[1]})" fill="#4a5056"><path d="M-12.6 -.9 Q-11 -2.1 -9.4 -.9 Q-11 .3 -12.6 -.9 Z"/><text x="-8.8" y=".2" font-size="2.9" font-weight="800" letter-spacing=".2" ${NT_FONT}>NVIDIA</text></g>
${strLed(c, ...at(p1, Math.PI / 2, .9), "#76ff03", 1)}
${strMute(c, 96, 58)}`;
}
// NVIDIA Shield TV Pro: the thin black slab lying flat, its long edge on the
// left face, its top folded into facets as on the device: the big glossy
// one at the back, a matte triangle on the left, the matte front one, a
// matte one on the right and the small one at the front right with the eye,
// and the green light along the crease between the glossy and the front
// facets, turning sharply back up the right crease.
function strShieldPro(c) {
  const g = strIsoGeom(60, 70, 62, 42, 2), gs = ntId(), ref = ntId(), gl = ntId();
  // The device's corners seen from above, its long edge at the front.
  const [TL, TR, BR, BL] = [g.P[1], g.P[2], g.P[3], g.P[0]];
  const Q = (x, y) => [+(TL[0] + (TR[0] - TL[0]) * x + (BL[0] - TL[0]) * y).toFixed(2), +(TL[1] + (TR[1] - TL[1]) * x + (BL[1] - TL[1]) * y).toFixed(2)];
  const P = (...pts) => "M" + pts.map((p) => `${p[0]} ${p[1]}`).join(" L") + " Z";
  const lerp = (p, q, k) => [+(p[0] + (q[0] - p[0]) * k).toFixed(2), +(p[1] + (q[1] - p[1]) * k).toFixed(2)];
  const A = Q(.27, .2), B = Q(.79, .58), E = Q(.74, 1);
  const lit = ["playing", "paused", "home"].includes(c.st);
  const col = lit ? "#76ff03" : c.st === "standby" ? "#ffb300" : "#30343a";
  const s0 = lerp(A, B, .2), s2 = lerp(B, TR, .25);
  const strip = `M${s0[0]} ${s0[1]} L${B[0]} ${B[1]} L${s2[0]} ${s2[1]}`;
  const logo = Q(.86, .84);
  return `<defs><linearGradient id="${gs}" gradientUnits="userSpaceOnUse" x1="${TL[0]}" y1="${TL[1]}" x2="${B[0]}" y2="${B[1]}"><stop offset="0" stop-color="#16181b"/><stop offset=".5" stop-color="#2a2d32"/><stop offset="1" stop-color="#0c0d0f"/></linearGradient>
<linearGradient id="${ref}" gradientUnits="userSpaceOnUse" x1="${Q(.42, 0)[0]}" y1="${Q(.42, 0)[1]}" x2="${Q(.6, .45)[0]}" y2="${Q(.6, .45)[1]}"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".24"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
${ntBlur(gl, 1.4)}</defs>
${strTile(c, 62, 30)}
${strIsoBox(g, 4.5, "#141619", STR_DARK_FACES)}
<path d="${P(TL, A, BL)}" fill="#272a2e"/>
<path d="${P(A, B, E, BL)}" fill="#181a1d"/>
<path d="${P(B, BR, E)}" fill="#1e2124"/>
<path d="${P(TR, BR, B)}" fill="#222529"/>
<path d="${P(TL, TR, B, A)}" fill="url(#${gs})"/>
<path d="${P(TL, TR, B, A)}" fill="url(#${ref})"/>
<path d="M${TL[0]} ${TL[1]} L${A[0]} ${A[1]} L${BL[0]} ${BL[1]} M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${TR[0]} ${TR[1]} M${B[0]} ${B[1]} L${BR[0]} ${BR[1]} M${B[0]} ${B[1]} L${E[0]} ${E[1]}" fill="none" stroke="#3a3e44" stroke-width=".35" stroke-linejoin="round"/>
${c.on ? `<path class="nta-glow" d="${strip}" fill="none" stroke="#76ff03" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" filter="url(#${gl})" opacity=".9"/>` : ""}
<path d="${strip}" fill="none" stroke="${col}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"/>
${lit ? `<path d="${strip}" fill="none" stroke="#eaffc8" stroke-width=".3" stroke-linejoin="round" stroke-linecap="round"/>` : ""}
${strIsoTop(...logo, `<path d="M-1.8 0 Q0 -1.3 1.8 0 Q0 1.3 -1.8 0 Z M-.7 0 Q0 -.6 .7 0 Q0 .6 -.7 0 Z" fill="#4c5258" fill-rule="evenodd"/>`)}
${strMute(c, 100, 50)}`;
}
// Roku Ultra: the black rounded box, the name on its glossy top and its
// purple tag.
function strRoku(c) {
  const g = strIsoGeom(60, 70, 44, 44, 8), t = ntId();
  const tag = strOnRight(g, .55, 3);
  return `<defs>${strTopGrad(t)}</defs>
${strTile(c, 60, 32)}
${strIsoBox(g, 16, `url(#${t})`, STR_DARK_FACES)}
${strIsoTop(50, 66, `<text x="0" y="2.4" font-size="8.6" font-weight="800" font-style="italic" fill="#8f98a2" ${NT_FONT}>Roku</text>`)}
<path d="M${tag[0]} ${tag[1]} l4 -1.7 v7 l-4 1.7 Z" fill="#6f2da8"/>
${strLed(c, ...strOnLeft(g, .75, 8), "#ffffff", .6)}${strMute(c, 98, 52)}`;
}
// Xiaomi TV Box S: the matte black square with very round corners.
function strMiBox(c) {
  const g = strIsoGeom(60, 72, 46, 46, 11), t = ntId();
  return `<defs>${strTopGrad(t, "#2c2f33", "#1d1f22")}</defs>
${strTile(c, 60, 34)}
${strIsoBox(g, 13, `url(#${t})`, ["#0e0f11", "#25272b", "#2b2d31", "#151719", "#0a0b0c"])}
${strIsoTop(56, 70, `<text x="0" y="2" font-size="6" font-weight="700" fill="#4a4f55" ${NT_FONT}>mi</text>`)}
${strLed(c, ...strOnLeft(g, .78, 6.5), "#ffffff", .6)}${strMute(c, 98, 54)}`;
}
// Freebox Pop player: the black puck, its name on top and its light.
function strFreebox(c) {
  const t = ntId();
  return `<defs>${strTopGrad(t, "#3c4046", "#121417")}</defs>
${strTile(c, 60, 40)}
${strIsoDisc(60, 80, 26, 11, `url(#${t})`, ["#08090a", "#25282c", "#2e3136", "#121417", "#050607"])}
<text x="0" y="0" transform="translate(60 83) scale(1.3 .56)" text-anchor="middle" font-size="9" font-weight="800" font-style="italic" fill="#7d848b" ${NT_FONT}>free</text>
${strLed(c, 60, 100, "#ffffff", .6)}${strMute(c, 98, 56)}`;
}
// An operator's set-top box (Orange, Bouygues, SFR): the wide glossy box,
// its display with the channel and the operator's coloured light.
function strDecoder(c) {
  const g = strIsoGeom(58, 71, 70, 36, 2), t = ntId();
  const lit = ["playing", "paused", "home"].includes(c.st);
  const disp = c.st === "off" ? "" : c.st === "standby" ? "- -" : c.channel || (c.st === "home" ? "TV" : "\u25b6");
  const [L, T, R, F] = g.P;
  const mid = (p, q, k) => [+(p[0] + (q[0] - p[0]) * k).toFixed(2), +(p[1] + (q[1] - p[1]) * k).toFixed(2)];
  const d1 = mid(T, R, .3), d2 = mid(L, F, .3), d3 = mid(T, R, .75), d4 = mid(L, F, .75);
  return `<defs>${strTopGrad(t, "#34383e", "#0e1012")}</defs>
${strTile(c, 58, 30)}
${strIsoBox(g, 11, `url(#${t})`, STR_DARK_FACES)}
<path d="M${d1[0]} ${d1[1]} L${d2[0]} ${d2[1]} M${d3[0]} ${d3[1]} L${d4[0]} ${d4[1]}" stroke="#4a4f55" stroke-width=".6" opacity=".7"/>
${strIsoLeft(...strOnLeft(g, .58, 2.6), `<rect x="0" y="0" width="20" height="6.4" rx="1" fill="#05070a"/>${disp ? `<text x="10" y="5" text-anchor="middle" font-size="4.8" font-weight="700" fill="${lit ? "#7fffd4" : "#ffb300"}" ${NT_FONT}>${esc(String(disp).slice(0, 5))}</text>` : ""}`)}
${strIsoLeft(...strOnLeft(g, .08, 4.4), `<rect x="0" y="0" width="5" height="1.8" rx=".9" fill="${c.st === "off" ? "#3a3e44" : c.st === "standby" ? "#ffb300" : c.brand || "#ffffff"}"${c.on ? ` class="nta-glow"` : ""}/>`)}
${strMute(c, 100, 50)}`;
}
// An Android TV box, or any other: the small black box and its blue light.
function strBox(c) {
  const g = strIsoGeom(60, 75, 40, 40, 6), t = ntId();
  return `<defs>${strTopGrad(t)}</defs>
${strTile(c, 60, 40)}
${strIsoBox(g, 12, `url(#${t})`, STR_DARK_FACES)}
${strLed(c, ...strOnLeft(g, .7, 6), "#2979ff", .8)}${strMute(c, 96, 56)}`;
}
// Game consoles. Sparks rise while a game runs; a console's light is lit
// when it is on, amber in rest mode, dark when it is off.
// What rises while a game runs: the PlayStation symbols, the Xbox buttons,
// or a pixel heart and coin on the Nintendo and the retro ones.
const CON_PLAY = {
  ps: [`<path d="M0 -2.8 L2.6 1.6 H-2.6 Z" fill="none" stroke="#2ec27e" stroke-width="1.1" stroke-linejoin="round"/>`, `<circle r="2.5" fill="none" stroke="#ff4d4d" stroke-width="1.1"/>`,
    `<path d="M-2.1 -2.1 L2.1 2.1 M2.1 -2.1 L-2.1 2.1" stroke="#4d8dff" stroke-width="1.1" stroke-linecap="round"/>`, `<rect x="-2.2" y="-2.2" width="4.4" height="4.4" fill="none" stroke="#ff7ac8" stroke-width="1.1"/>`],
  xbox: [["A", "#3fb950"], ["B", "#e5484d"], ["X", "#3b82f6"], ["Y", "#f5b301"]].map(([l, col]) => `<circle r="3" fill="${col}"/><text y="1.3" font-size="3.6" font-weight="700" fill="#fff" text-anchor="middle" ${NT_FONT}>${l}</text>`),
  nin: [`<path d="M-2 -2 h1.3 v.7 h1.4 v-.7 h1.3 v.7 h.7 v2 h-.7 v.7 h-.7 v.7 h-.7 v.7 h-.6 v-.7 h-.7 v-.7 h-.7 v-.7 h-.7 v-2 h.7 Z" fill="#e53935"/>`, `<ellipse rx="2" ry="2.8" fill="#fbc02d" stroke="#c88a00" stroke-width=".6"/><rect x="-.4" y="-1.6" width=".8" height="3.2" fill="#c88a00"/>`,
    `<path d="M-2 -2 h1.3 v.7 h1.4 v-.7 h1.3 v.7 h.7 v2 h-.7 v.7 h-.7 v.7 h-.7 v.7 h-.6 v-.7 h-.7 v-.7 h-.7 v-.7 h-.7 v-2 h.7 Z" fill="#e53935"/>`],
};
const conSparks = (c, x, y, kind = "nin") => (c.st === "playing" ? `<g class="nt-run">${CON_PLAY[kind].map((g, i) => { const [dx, dy] = [[-12, 10], [0, 0], [11, 8], [20, -2]][i]; return `<g class="nta-rise ntd${i * 2 + 1}"><g transform="translate(${x + dx} ${y + dy})">${g}</g></g>`; }).join("")}</g>` : "");
const conLit = (c, on, rest = "#ffa000", off = "#3a3f45") => (c.on ? on : c.st === "rest" ? rest : off);
const conLed = (c, x, y, r, on, rest = "#ffa000") => `<circle class="${c.on ? "nta-glow" : ""}" cx="${x}" cy="${y}" r="${r}" fill="${conLit(c, on, rest)}"/>`;
const conNum = (v) => +v.toFixed(1);
// A console seen from the front and a little above: its front face, rounded
// at the bottom, and its top narrowing away to the back. at(u, v) gives a
// point on that top, u across from the left, v from the front edge back.
function conBox(x, y, w, h, d, k, r, front, top, edge = "") {
  const st = edge ? ` stroke="${edge}" stroke-width=".5" stroke-linejoin="round"` : "";
  return `<path d="M${x} ${y} L${x + k} ${y - d} H${x + w - k} L${x + w} ${y} Z" fill="${top}"${st}/>
<path d="M${x} ${y} H${x + w} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} Z" fill="${front}"${st}/>
<path d="M${x + 1} ${y + .5} H${x + w - 1}" stroke="#fff" stroke-width=".6" opacity=".22"/>`;
}
const conAt = (x, y, w, d, k) => (u, v) => [conNum(x + k * v + u * (w - 2 * k * v)), conNum(y - d * v)];
const conPt = (p) => p.join(" ");
// A strip across a box's top, from u0 to u1 and v0 to v1.
const conQuad = (at, u0, u1, v0, v1, fill, extra = "") => `<path d="M${conPt(at(u0, v0))} L${conPt(at(u1, v0))} L${conPt(at(u1, v1))} L${conPt(at(u0, v1))} Z" fill="${fill}"${extra}/>`;
// The shadow a console casts where it stands: dark right under its edge,
// fading wider around it.
function conFloor(x0, x1, y) {
  const b = ntId();
  return `<filter id="${b}" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="1.3"/></filter>
<ellipse cx="${conNum((x0 + x1) / 2)}" cy="${conNum(y + 1.4)}" rx="${conNum((x1 - x0) / 2 + 5)}" ry="2.8" fill="#000" opacity=".16" filter="url(#${b})"/>
<rect x="${conNum(x0 + 1.5)}" y="${conNum(y - 1.4)}" width="${conNum(x1 - x0 - 3)}" height="2.8" rx="1.4" fill="#000" opacity=".34" filter="url(#${b})"/>`;
}
// A handheld lifted a little above the table: a soft shadow under it.
function conFloat(x0, x1, y) {
  const b = ntId();
  return `<filter id="${b}" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="1.8"/></filter><ellipse cx="${conNum((x0 + x1) / 2)}" cy="${conNum(y + 6)}" rx="${conNum((x1 - x0) * .42)}" ry="2.2" fill="#000" opacity=".22" filter="url(#${b})"/>`;
}
// A controller port: a rounded socket and its pins.
const conPort = (x, y, w, h, body, hole = "#141518") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * .3}" fill="${body}"/><rect x="${conNum(x + w * .18)}" y="${conNum(y + h * .3)}" width="${conNum(w * .64)}" height="${conNum(h * .4)}" rx=".5" fill="${hole}"/>`;
// What a handheld's screen shows: a game while one runs, the home menu when
// it is only on, nothing when it is off or asleep.
function conScreen(c, x, y, w, h, id) {
  if (c.st === "playing") {
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ec6ff"/><stop offset=".62" stop-color="#bfe8ff"/><stop offset=".62" stop-color="#5cb85c"/><stop offset="1" stop-color="#3d8b3d"/></linearGradient></defs>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="url(#${id})"/>
<path d="M${x} ${conNum(y + h * .66)} Q${conNum(x + w * .3)} ${conNum(y + h * .44)} ${conNum(x + w * .55)} ${conNum(y + h * .62)} T${x + w} ${conNum(y + h * .58)} V${y + h} H${x} Z" fill="#4caf50"/>
<circle cx="${conNum(x + w * .78)}" cy="${conNum(y + h * .26)}" r="${conNum(h * .12)}" fill="#ffd54f"/>
<g class="nta-pop"><rect x="${conNum(x + w * .3)}" y="${conNum(y + h * .5)}" width="${conNum(w * .09)}" height="${conNum(h * .16)}" rx=".6" fill="#e53935"/><circle cx="${conNum(x + w * .345)}" cy="${conNum(y + h * .46)}" r="${conNum(h * .06)}" fill="#ffcc80"/></g>`;
  }
  if (c.on) {
    const tw = (w - 8) / 4;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="#eceff1"/>${[0, 1, 2, 3].map((i) => `<rect x="${conNum(x + 2 + i * (tw + 1.33))}" y="${conNum(y + h * .32)}" width="${conNum(tw)}" height="${conNum(h * .36)}" rx=".6" fill="${["#ef5350", "#42a5f5", "#ffca28", "#66bb6a"][i]}"/>`).join("")}`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="#0d0f12"/><path d="M${x + 2} ${y + 2} L${conNum(x + w * .4)} ${y + 2} L${x + 2} ${conNum(y + h * .7)} Z" fill="#fff" opacity=".06"/>`;
}
// The PlayStation mark, small: the P standing, the S lying flat in front.
const conPsLogo = (x, y, s, mono = "") => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke-linecap="round" stroke-width="1.1"><path d="M-.4 1.4 V-4 Q3 -4 3 -2 Q3 0 -.4 -.2" stroke="${mono || "#e53935"}"/>
<path d="M3.8 .6 H-1.6 Q-3.6 .6 -3.6 1.5 Q-3.6 2.4 -1.6 2.4" stroke="${mono || "#fbc02d"}"/><path d="M-1.6 2.4 H1.8 Q3.8 2.4 3.8 3.3 Q3.8 4.2 1.8 4.2 H-3.6" stroke="${mono || "#1e88e5"}"/></g>`;

// PlayStation: the grey box, its round lid, Open on the back corner, Reset
// and Power at the front, two controller ports under their card slots.
function conPs1(c) {
  const f = ntId(), t = ntId(), l = ntId();
  const at = conAt(10, 80, 100, 26, 8);
  const [lx, ly] = at(.53, .52), [ox, oy] = at(.9, .74), [rx, ry] = at(.09, .3), [px, py] = at(.19, .3);
  return `<defs>${ntV(f, "#c7c6c1", "#a6a5a0")}${ntV(t, "#c9c8c3", "#e3e2dd")}<radialGradient id="${l}" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#e8e7e2"/><stop offset="1" stop-color="#c3c2bd"/></radialGradient></defs>
${conSparks(c, 60, 36, "ps")}${conFloor(10, 110, 102)}
${conBox(10, 80, 100, 22, 26, 8, 3, `url(#${f})`, `url(#${t})`, "#97968f")}
<ellipse cx="${lx}" cy="${ly + .8}" rx="23" ry="8.8" fill="#a9a8a3"/><ellipse cx="${lx}" cy="${ly}" rx="22.4" ry="8.4" fill="url(#${l})" stroke="#9c9b96" stroke-width=".5"/>
<ellipse cx="${lx}" cy="${ly}" rx="17" ry="6.2" fill="none" stroke="#c9c8c3" stroke-width=".6"/><ellipse cx="${lx}" cy="${ly}" rx="3.4" ry="1.3" fill="#b4b3ae"/>
${conPsLogo(lx - 10, ly + 2.2, .7)}
<ellipse cx="${ox}" cy="${oy + .5}" rx="4" ry="1.9" fill="#8f8e89"/><ellipse cx="${ox}" cy="${oy}" rx="3.6" ry="1.6" fill="#d2d1cc" stroke="#9c9b96" stroke-width=".4"/>
<ellipse cx="${rx}" cy="${ry + .5}" rx="2.8" ry="1.3" fill="#8f8e89"/><ellipse cx="${rx}" cy="${ry}" rx="2.5" ry="1.1" fill="#d2d1cc"/>
<ellipse cx="${px}" cy="${py + .5}" rx="3.2" ry="1.5" fill="#8f8e89"/><ellipse cx="${px}" cy="${py}" rx="2.9" ry="1.3" fill="#d2d1cc"/>
${conLed(c, px + 4.6, py + .6, .8, "#7cff6b")}
<rect x="24" y="84" width="14" height="2.2" rx=".6" fill="#3b3a38"/><rect x="66" y="84" width="14" height="2.2" rx=".6" fill="#3b3a38"/>
${conPort(23, 89, 16, 6.4, "#8d8c87", "#2d2c2a")}${conPort(65, 89, 16, 6.4, "#8d8c87", "#2d2c2a")}
<path d="M12 99 H108" stroke="#97968f" stroke-width=".5"/>`;
}
// PlayStation 2: the black slab, its ridges down the left of the top and the
// front, the tray, the reset and eject buttons with their lights.
function conPs2(c) {
  const f = ntId(), t = ntId();
  const X = 8, Y = 80, W = 104, D = 22, K = 7, at = conAt(X, Y, W, D, K);
  const ridges = Array.from({ length: 9 }, (_, i) => .02 + i * .034);
  const [lgx, lgy] = at(.74, .45);
  return `<defs>${ntV(f, "#26282c", "#121315")}${ntV(t, "#18191c", "#2f3236")}</defs>
${conSparks(c, 60, 40, "ps")}${conFloor(8, 112, 100)}
${conBox(X, Y, W, 20, D, K, 2, `url(#${f})`, `url(#${t})`)}
${ridges.map((u) => `<path d="M${conPt(at(u, 0))} L${conPt(at(u, 1))}" stroke="#08090a" stroke-width="1.5"/><path d="M${conPt(at(u + .012, 0))} L${conPt(at(u + .012, 1))}" stroke="#44474c" stroke-width=".4"/>`).join("")}
${ridges.map((u) => `<path d="M${conNum(X + u * W)} 80 V89" stroke="#08090a" stroke-width="1.5"/>`).join("")}
<text x="${lgx}" y="${lgy}" font-size="3.4" font-style="italic" font-weight="700" fill="#4a68c9" text-anchor="middle" ${NT_FONT}>PS2</text>
<path d="M8 89 H112" stroke="#060607" stroke-width="1.2"/><path d="M8 90 H112" stroke="#3a3d42" stroke-width=".4"/>
<path d="M46 84.6 H100" stroke="#060607" stroke-width="1.4"/><path d="M46 85.6 H100" stroke="#4a4d52" stroke-width=".4"/>
${[12, 26].map((x) => `<rect x="${x}" y="91.6" width="11" height="1.8" rx=".5" fill="#060607"/>${conPort(x, 95, 11, 3.6, "#33363b", "#060607")}`).join("")}
<circle cx="106" cy="84.6" r="1.6" fill="#2b2d31" stroke="#060607" stroke-width=".4"/>${conLed(c, 102.6, 84.6, .7, "#7cff6b", "#ff3d00")}
<circle cx="106" cy="94.6" r="1.6" fill="#2b2d31" stroke="#060607" stroke-width=".4"/><circle cx="102.6" cy="94.6" r=".7" fill="${conLit(c, "#2979ff", "#1a2a44", "#1a2a44")}"${c.on ? ` class="nta-glow"` : ""}/>`;
}
// PlayStation 3: the wide glossy black body, its top rounded from front to
// back, the glossy flap on the left, the chrome band with the slot on the
// right, the PlayStation mark, the USB ports and vents along the bottom.
function conPs3(c) {
  const t = ntId(), fl = ntId(), cr = ntId(), lo = ntId();
  return `<defs><linearGradient id="${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050506"/><stop offset=".55" stop-color="#2e3237"/><stop offset=".8" stop-color="#6b7178"/><stop offset="1" stop-color="#111214"/></linearGradient>
<linearGradient id="${fl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3e44"/><stop offset=".35" stop-color="#131417"/><stop offset="1" stop-color="#050506"/></linearGradient>
<linearGradient id="${cr}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".45" stop-color="#b9c0c6"/><stop offset=".55" stop-color="#8d949b"/><stop offset="1" stop-color="#e3e6e9"/></linearGradient>${ntV(lo, "#141517", "#050506")}</defs>
${conSparks(c, 60, 44, "ps")}${conFloor(8, 112, 104)}
<path d="M8 104 V80 Q8 68 22 68 H98 Q112 68 112 80 V104 Z" fill="url(#${lo})"/>
<path d="M8.4 81 Q8.4 68.6 22 68.6 H98 Q111.6 68.6 111.6 81 Z" fill="url(#${t})"/>
<path d="M9 81 H50 V92 Q50 94 48 94 H11 Q9 94 9 92 Z" fill="url(#${fl})"/>
<path d="M12 82.6 H46" stroke="#fff" stroke-width=".6" opacity=".25"/>
<path d="M50 81 H111 V89.4 H50 Z" fill="url(#${cr})"/><path d="M60 85.2 H107" stroke="#050506" stroke-width="1.3"/>
${conPsLogo(76, 91.2, .5)}
<path d="M95.6 91.6 a1.4 1.4 0 1 0 2 0 M96.6 90.9 V92.7" fill="none" stroke="#8a9097" stroke-width=".4"/>
<path d="M101 93 h2.6 M101.2 92.4 l1.1 -1.4 l1.1 1.4 Z" fill="#8a9097" stroke="#8a9097" stroke-width=".35"/>
${conLed(c, 92.6, 92, .5, "#7cff6b", "#ff3d00")}
<path d="M8 95.6 H112" stroke="#2c2f34" stroke-width=".5"/>
${[13, 20, 27, 34].map((x) => `<rect x="${x}" y="98.2" width="4.6" height="1.8" rx=".3" fill="#2e3136"/><rect x="${x + .6}" y="98.7" width="3.4" height=".8" fill="#050506"/>`).join("")}
${Array.from({ length: 26 }, (_, i) => `<path d="M${44 + i * 2.2} 97 V102.4" stroke="#000" stroke-width="1"/>`).join("")}`;
}
// PlayStation 4: a thin slab leaning forward, its top split between the
// glossy left and the matte right by the light bar; the Pro is three layers.
function conPs4(c, pro) {
  const gl = ntId(), mt = ntId(), fr = ntId(), lb = ntId(), rf = ntId();
  const bar = conLit(c, "#f4f8ff", "#ffa000", "#1b1d20");
  const X = 8, W = 104, D = 22, K = 8, Y = pro ? 76 : 82, at = conAt(X, Y, W, D, K);
  const split = pro ? 0 : .38;
  const glow = c.on ? ` filter="url(#${lb})" class="nta-glow"` : "";
  const top = pro ? `${conQuad(at, 0, 1, 0, 1, `url(#${mt})`)}${conPsLogo(...at(.5, .5), 1.1, "#5a5f66")}`
    : `${conQuad(at, 0, split, 0, 1, `url(#${gl})`)}${conQuad(at, 0, split, 0, 1, `url(#${rf})`)}${conQuad(at, split, 1, 0, 1, `url(#${mt})`)}${conPsLogo(...at(.1, .7), .8, "#6b7077")}
<path d="M${conPt(at(split, 0))} L${conPt(at(split, 1))}" stroke="#050506" stroke-width="2.4"/><path d="M${conPt(at(split, 0))} L${conPt(at(split, 1))}" stroke="${bar}" stroke-width="1.1"${glow}/>
${c.on || c.st === "rest" ? `<path d="M${conPt(at(split, 0))} L${conPt(at(split, 1))}" stroke="${bar}" stroke-width=".5"/>` : ""}`;
  const layers = pro
    ? `<path d="M8 76 H112 L111 80 H9 Z" fill="url(#${fr})"/><rect x="9" y="80" width="102" height="3.4" fill="#050506"/>
<path d="M10 83.4 H110 L109 89 H11 Z" fill="url(#${fr})"/><rect x="11" y="89" width="98" height="3" fill="#050506"/>
<path d="M30 90.5 H90" stroke="${bar}" stroke-width="1"${glow}/><path d="M12 92 H108 L107 99 Q107 100 105 100 H15 Q13 100 13 99 Z" fill="#1a1b1e"/>
<path d="M26 81.8 H70" stroke="#2a2c30" stroke-width=".7"/>`
    : `<path d="M8 82 H112 L111 86 H9 Z" fill="url(#${fr})"/><rect x="10" y="86" width="100" height="5.6" fill="#050506"/>
<path d="M18 88.6 H62" stroke="#2a2c30" stroke-width=".9"/><path d="M${conPt(at(split, 0))} V86" stroke="${bar}" stroke-width="1"${glow}/>
<path d="M68 88.8 h4 M76 88.8 h4" stroke="#3a3d42" stroke-width=".8"/>
<path d="M12 91.6 H108 L107 99 Q107 100 105 100 H15 Q13 100 13 99 Z" fill="#1a1b1e"/>`;
  return `<defs>${ntV(gl, "#2e3136", "#0b0c0e")}${ntV(mt, "#1d1f22", "#2e3034")}${ntV(fr, "#2b2d31", "#141517")}${ntBlur(lb, 1.4)}
<linearGradient id="${rf}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${conSparks(c, 60, Y - 42, "ps")}${conFloor(12, 108, 100)}
${top}${layers}`;
}
// PlayStation 5, standing, seen from its front left: the tall white side
// panel widening towards the bottom, its front corner pointing up, the
// PlayStation mark high on it, the black core lit white at the top, amber at rest, the
// thin far panel flaring out, the black stand.
function conPs5(c) {
  const wl = ntId(), sh = ntId(), k = ntId(), lb = ntId(), fb = ntId(), sd = ntId();
  const light = conLit(c, "#f4f8ff", "#ffa000", "#2a2f36");
  const panel = "M27.6 96 Q27 98.6 30 99 L81.6 104.6 Q77 50 72 7.4 Q55 8.2 40.6 12.8 Q38 13.6 37.8 16.4 Z";
  return `<defs><linearGradient id="${wl}" x1="0" x2="1"><stop offset="0" stop-color="#e3e7eb"/><stop offset=".5" stop-color="#fcfcfd"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
<linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#8a96a3" stop-opacity="0"/><stop offset="1" stop-color="#8a96a3" stop-opacity=".22"/></linearGradient>
<linearGradient id="${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.on ? "#5d6470" : c.st === "rest" ? "#7a4a08" : "#20232a"}"/><stop offset=".35" stop-color="#101219"/><stop offset="1" stop-color="#050608"/></linearGradient>${ntBlur(lb, 2.2)}${ntBlur(fb, 2)}<linearGradient id="${sd}" x1="0" x2="1"><stop offset="0" stop-color="#0b0c0e"/><stop offset=".55" stop-color="#2c2f34"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient></defs>
${conSparks(c, 56, -6, "ps")}<ellipse cx="60" cy="107.6" rx="33" ry="3.6" transform="rotate(5 60 107.6)" fill="#000" opacity=".22" filter="url(#${fb})"/><g transform="rotate(6 58 104)"><ellipse cx="58" cy="107.6" rx="31" ry="3.4" fill="#000" opacity=".32" filter="url(#${fb})"/>
<path d="M27 104 V105.8 A31 4.6 0 0 0 89 105.8 V104 Z" fill="url(#${sd})"/><ellipse cx="58" cy="104" rx="31" ry="4.6" fill="#1b1d20"/><ellipse cx="58" cy="103.8" rx="29.4" ry="3.8" fill="none" stroke="#3a3d42" stroke-width=".4"/></g>
<path d="M72 7.4 L86.4 7 Q86 50 85.6 105.2 L81.6 104.6 Q77 50 72 7.4 Z" fill="url(#${k})"/>
${c.on || c.st === "rest" ? `<path d="M80 9 Q84 24 84.4 44" fill="none" stroke="${light}" stroke-width="3.6" opacity=".8" filter="url(#${lb})"${c.on ? ` class="nta-glow"` : ""}/>` : ""}
<rect x="83" y="50" width="1" height="2.6" rx=".4" fill="#3a3f48"/><rect x="83" y="56" width="1" height="2.6" rx=".4" fill="#3a3f48"/>
<path d="M86.4 7 L89.6 5.8 Q88.4 50 87.6 105.4 L85.6 105.2 Q86 50 86.4 7 Z" fill="#f5f6f7" stroke="#c3c8cd" stroke-width=".4"/>
<path d="${panel}" fill="url(#${wl})" stroke="#c9ced3" stroke-width=".5"/><path d="${panel}" fill="url(#${sh})"/>
<path d="M73.6 10 Q78 50 81.6 102" fill="none" stroke="#fff" stroke-width="1"/>
${conPsLogo(42.6, 32, .8, "#9aa0a6")}`;
}
// Xbox: the big black box, the X raised on its top meeting at the green
// jewel, the tray, the power ring and four ports in front.
function conXbox(c) {
  const f = ntId(), t = ntId(), j = ntId(), gl = ntId(), pn = ntId();
  const at = conAt(10, 76, 100, 24, 8), [jx, jy] = at(.5, .52);
  const corners = [[.06, .1], [.94, .1], [.94, .94], [.06, .94]];
  return `<defs>${ntV(f, "#25272a", "#101112")}${ntV(t, "#18191b", "#35383c")}${ntV(pn, "#34373b", "#17181a")}
<radialGradient id="${j}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${c.on ? "#c6ff8a" : "#86b764"}"/><stop offset=".55" stop-color="${c.on ? "#54c21f" : "#3d6b2c"}"/><stop offset="1" stop-color="#173210"/></radialGradient>${ntBlur(gl, 2)}</defs>
${conSparks(c, 60, 34, "xbox")}${conFloor(10, 110, 102)}
${conBox(10, 76, 100, 26, 24, 8, 4, `url(#${f})`, `url(#${t})`)}
${corners.map(([u, v]) => `<path d="M${jx} ${jy} L${conPt(at(u, v))}" stroke="#45484d" stroke-width="3.4" stroke-linecap="round"/><path d="M${jx} ${jy + .6} L${conPt(at(u, v))}" stroke="#0a0a0b" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>`).join("")}
${c.on ? `<ellipse class="nta-glow" cx="${jx}" cy="${jy}" rx="13" ry="5.6" fill="#76ff03" opacity=".45" filter="url(#${gl})"/>` : ""}
<ellipse cx="${jx}" cy="${jy}" rx="11" ry="4.8" fill="#0a0a0b"/><ellipse cx="${jx}" cy="${jy - .3}" rx="9" ry="3.8" fill="url(#${j})"/>
<path d="M${jx - 4.4} ${jy - 2.2} Q${jx} ${jy - .4} ${jx + 4.4} ${jy + 1.8} M${jx + 4.4} ${jy - 2.2} Q${jx} ${jy - .4} ${jx - 4.4} ${jy + 1.8}" stroke="#173210" stroke-width="1.1" fill="none" opacity=".7"/>
<path d="M30 76 Q60 79 90 76 V102 H30 Z" fill="url(#${pn})"/>
<path d="M36 83.6 H80" stroke="#000" stroke-width="1.4"/><path d="M36 84.6 H80" stroke="#55585e" stroke-width=".4"/>
<circle cx="96" cy="84" r="2.6" fill="#2b2d31" stroke="${conLit(c, "#76ff03", "#ffa000", "#000")}" stroke-width=".7"/><circle cx="103.4" cy="84" r="2" fill="#2b2d31" stroke="#000" stroke-width=".5"/>
${[13.5, 21.5, 91.5, 99.5].map((x) => conPort(x, 92.4, 7, 4.4, "#0a0a0b", "#2a2c30")).join("")}`;
}
// Xbox 360: white and lying flat, its front drawn in, the hard drive on top,
// the tray and the ring of light around the power button.
function conX360(c) {
  const f = ntId(), t = ntId(), hd = ntId(), gl = ntId();
  const ring = c.on ? "#76ff03" : c.st === "rest" ? "#ffa000" : "#c3c7cb";
  const at = conAt(8, 80, 104, 22, 8);
  return `<defs>${ntV(f, "#f6f7f8", "#d5d9dd")}${ntV(t, "#e1e4e7", "#fbfcfc")}${ntV(hd, "#a9b0b6", "#8a9198")}${ntBlur(gl, 1.6)}</defs>
${conSparks(c, 60, 36, "xbox")}${conFloor(8, 112, 101.4)}
<path d="M8 80 L16 58 H104 L112 80 Q60 76 8 80 Z" fill="url(#${t})" stroke="#c5cacf" stroke-width=".5"/>
${conQuad(at, .05, .46, .14, .92, `url(#${hd})`, ` stroke="#7a8188" stroke-width=".4"`)}
${Array.from({ length: 9 }, (_, i) => `<path d="M${conPt(at(.08 + i * .04, .26))} L${conPt(at(.08 + i * .04, .8))}" stroke="#6b7279" stroke-width=".8"/>`).join("")}
<path d="M8 80 Q60 76 112 80 V102 Q60 98 8 102 Z" fill="url(#${f})" stroke="#c5cacf" stroke-width=".5"/>
<path d="M14 85 H26 V95 H14 Z" fill="none" stroke="#c0c5ca" stroke-width=".6"/>
<path d="M32 88 Q58 86 82 88" fill="none" stroke="#8d949b" stroke-width="1.2"/><circle cx="87" cy="88.4" r="1.2" fill="#e6e9ec" stroke="#a9b0b6" stroke-width=".4"/>
${c.on ? `<circle class="nta-glow" cx="100" cy="90" r="6" fill="none" stroke="${ring}" stroke-width="2.4" filter="url(#${gl})"/>` : ""}
<circle cx="100" cy="90" r="5.8" fill="#e6e9ec" stroke="#b9bec3" stroke-width=".5"/>
${[0, 1, 2, 3].map((i) => { const a0 = i * Math.PI / 2 + .22, a1 = (i + 1) * Math.PI / 2 - .22; return `<path d="M${conNum(100 + 4.8 * Math.cos(a0))} ${conNum(90 + 4.8 * Math.sin(a0))} A4.8 4.8 0 0 1 ${conNum(100 + 4.8 * Math.cos(a1))} ${conNum(90 + 4.8 * Math.sin(a1))}" fill="none" stroke="${ring}" stroke-width="1.3"/>`; }).join("")}
<circle cx="100" cy="90" r="3" fill="#f4f5f6" stroke="#b9bec3" stroke-width=".4"/>`;
}
// Xbox One: the long black slab, the vents over the left of its top, the
// glossy right, the slot and the glowing logo in front.
function conXone(c) {
  const f = ntId(), t = ntId(), gs = ntId(), gl = ntId();
  const at = conAt(6, 84, 108, 24, 8);
  return `<defs>${ntV(f, "#2a2c2f", "#0e0f10")}${ntV(t, "#141517", "#25272a")}${ntV(gs, "#3a3d42", "#0e0f10")}${ntBlur(gl, 1.6)}</defs>
${conSparks(c, 60, 40, "xbox")}${conFloor(6, 114, 100)}
${conBox(6, 84, 108, 16, 24, 8, 2, `url(#${f})`, `url(#${t})`)}
${Array.from({ length: 28 }, (_, i) => `<path d="M${conPt(at(.02 + i * .02, .04))} L${conPt(at(.02 + i * .02, .96))}" stroke="#050506" stroke-width="1.1"/>`).join("")}
${conQuad(at, .6, 1, 0, 1, `url(#${gs})`)}
<path d="M${conPt(at(.6, 0))} L${conPt(at(.6, 1))}" stroke="#000" stroke-width=".8"/>
<path d="M14 90 H60" stroke="#000" stroke-width="1.3"/><path d="M14 91 H60" stroke="#3a3d42" stroke-width=".4"/>
${c.on ? `<circle class="nta-glow" cx="101" cy="91" r="3.6" fill="#fff" filter="url(#${gl})"/>` : ""}
<circle cx="101" cy="91" r="2.6" fill="${conLit(c, "#ffffff", "#c6cbd0", "#4a4d52")}"/>
<path d="M99.4 89.2 Q101 91 102.6 89.2 M99.4 92.8 Q101 91 102.6 92.8" fill="none" stroke="#111214" stroke-width=".7"/>`;
}
// Xbox Series X: the black tower, the dish on top showing green through its
// holes, the logo button, the vertical disc slot.
function conXsx(c) {
  const f = ntId(), t = ntId(), g = ntId(), gl = ntId();
  const at = conAt(40, 30, 40, 12, 4), [cx, cy] = at(.5, .5);
  const holes = [];
  for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) {
    const x = i * 1.9 + (j % 2 ? .95 : 0), y = j * 1.25;
    if ((x / 15.2) ** 2 + (y / 4.3) ** 2 < 1) holes.push(`<circle cx="${conNum(cx + x)}" cy="${conNum(cy + y)}" r=".55" fill="#050506"/>`);
  }
  return `<defs><linearGradient id="${f}" x1="0" x2="1"><stop offset="0" stop-color="#1c1e20"/><stop offset=".5" stop-color="#26282b"/><stop offset="1" stop-color="#121314"/></linearGradient>${ntV(t, "#141517", "#2a2c2f")}
<radialGradient id="${g}" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#4fe24a"/><stop offset=".7" stop-color="#1c8a24"/><stop offset="1" stop-color="#071a09"/></radialGradient>${ntBlur(gl, 1.4)}</defs>
${conSparks(c, 64, -4, "xbox")}${conFloor(40, 80, 108)}
${conBox(40, 30, 40, 78, 12, 4, 3, `url(#${f})`, `url(#${t})`)}
<ellipse cx="${cx}" cy="${cy + .4}" rx="17.6" ry="5.4" fill="#050506"/><ellipse cx="${cx}" cy="${cy}" rx="16.6" ry="4.9" fill="url(#${g})"/>
${holes.join("")}
${c.on ? `<circle class="nta-glow" cx="46.4" cy="36" r="3.2" fill="#fff" filter="url(#${gl})"/>` : ""}<circle cx="46.4" cy="36" r="2.1" fill="${conLit(c, "#ffffff", "#c6cbd0", "#3a3d42")}"/>
<path d="M45.2 34.8 L47.6 37.2 M47.6 34.8 L45.2 37.2" stroke="#111214" stroke-width=".5"/>
<path d="M73 46 V92" stroke="#000" stroke-width="1.6"/><path d="M74 46 V92" stroke="#3a3d42" stroke-width=".4"/><circle cx="73.4" cy="96" r="1" fill="#2e3034"/>
<rect x="44.4" y="100" width="4" height="1.6" rx=".4" fill="#000"/><circle cx="46.4" cy="96" r=".8" fill="#2e3034"/>`;
}
// Xbox Series S: the small white box lying flat, the big black round vent
// on its top, the logo button in front.
function conXss(c) {
  const f = ntId(), t = ntId(), gl = ntId();
  const at = conAt(14, 84, 92, 28, 8), [cx, cy] = at(.58, .5);
  const holes = [];
  for (let j = -4; j <= 4; j++) for (let i = -10; i <= 10; i++) {
    const x = i * 1.9 + (j % 2 ? .95 : 0), y = j * 1.9;
    if ((x / 17.4) ** 2 + (y / 9) ** 2 < 1) holes.push(`<circle cx="${conNum(cx + x)}" cy="${conNum(cy + y)}" r=".5" fill="#2a2c2f"/>`);
  }
  return `<defs>${ntV(f, "#f4f5f5", "#d3d6d9")}${ntV(t, "#e2e4e6", "#fbfbfb")}${ntBlur(gl, 1.4)}</defs>
${conSparks(c, 60, 38, "xbox")}${conFloor(14, 106, 102)}
${conBox(14, 84, 92, 18, 28, 8, 3, `url(#${f})`, `url(#${t})`, "#c2c6c9")}
<ellipse cx="${cx}" cy="${cy + .6}" rx="20" ry="10.6" fill="#a6abaf"/><ellipse cx="${cx}" cy="${cy}" rx="19.4" ry="10.2" fill="#121314"/>
${holes.join("")}
${c.on ? `<circle class="nta-glow" cx="23" cy="92" r="3" fill="#fff" filter="url(#${gl})"/>` : ""}<circle cx="23" cy="92" r="2" fill="${conLit(c, "#ffffff", "#9aa1a8", "#c6cacd")}" stroke="#a6abaf" stroke-width=".4"/>
<path d="M21.9 90.9 L24.1 93.1 M24.1 90.9 L21.9 93.1" stroke="#7a8086" stroke-width=".45"/>
<rect x="29" y="91.2" width="4.4" height="1.6" rx=".4" fill="#3a3d42"/><circle cx="37" cy="92" r=".9" fill="#c6cacd" stroke="#a6abaf" stroke-width=".3"/>`;
}
// A handheld's buttons: four in a diamond, a stick, a cross.
const conDiamond = (x, y, g, r, fills) => [[0, -g], [g, 0], [0, g], [-g, 0]].map(([dx, dy], i) => `<circle cx="${conNum(x + dx)}" cy="${conNum(y + dy)}" r="${r}" fill="${fills[i] || fills[0]}"/>`).join("");
const conStick = (x, y, r, ring = "") => `<circle cx="${x}" cy="${y}" r="${r + .6}" fill="#0b0c0e"/>${ring ? `<circle cx="${x}" cy="${y}" r="${r + 1.2}" fill="none" stroke="${ring}" stroke-width=".9"/>` : ""}<circle cx="${x}" cy="${y}" r="${r}" fill="#26282c"/><circle cx="${x}" cy="${y}" r="${conNum(r * .62)}" fill="#33363b"/><circle cx="${conNum(x - r * .25)}" cy="${conNum(y - r * .25)}" r="${conNum(r * .25)}" fill="#fff" opacity=".12"/>`;
const conCross = (x, y, a, fill) => `<path d="M${x - a / 3} ${y - a} h${conNum(a * 2 / 3)} v${conNum(a * 2 / 3)} h${conNum(a * 2 / 3)} v${conNum(a * 2 / 3)} h${conNum(-a * 2 / 3)} v${conNum(a * 2 / 3)} h${conNum(-a * 2 / 3)} v${conNum(-a * 2 / 3)} h${conNum(-a * 2 / 3)} v${conNum(-a * 2 / 3)} h${conNum(a * 2 / 3)} Z" fill="${fill}"/>`;
// Nintendo Switch: the console held in hand, the neon blue and red Joy-Con
// either side of the screen; the Switch 2 is wider, its Joy-Con black with a
// colour ring under each stick.
function conSwitch(c, two) {
  const l = ntId(), r = ntId(), sc = ntId(), bz = ntId();
  const W = two ? 68 : 60, H = two ? 38 : 34, J = two ? 13 : 12, sx = 60 - W / 2, sy = 72 - H / 2;
  const lc = two ? ["#34363b", "#17181b"] : ["#25d0ea", "#009fbd"], rc = two ? ["#34363b", "#17181b"] : ["#ff6b62", "#e83a3a"];
  const btn = two ? "#0b0c0e" : "#1d1e21";
  const lx = sx - J / 2, rx = sx + W + J / 2;
  const joy = (x0, dir, fill) => `<path d="M${x0} ${sy} H${x0 + dir * (J - 6)} Q${x0 + dir * J} ${sy} ${x0 + dir * J} ${sy + 6} V${sy + H - 6} Q${x0 + dir * J} ${sy + H} ${x0 + dir * (J - 6)} ${sy + H} H${x0} Z" fill="url(#${fill})"/>`;
  return `<defs>${ntV(l, ...lc)}${ntV(r, ...rc)}${ntV(bz, "#2a2c30", "#121315")}</defs>
${conSparks(c, 64, sy - 18)}${conFloat(sx - J, sx + W + J, sy + H)}
<rect x="${sx - J + 1}" y="${sy + 2}" width="${W + 2 * J - 2}" height="${H}" rx="6" fill="#000" opacity=".25"/>
${joy(sx, -1, l)}${joy(sx + W, 1, r)}
<rect x="${sx}" y="${sy}" width="${W}" height="${H}" fill="url(#${bz})"/>
${conScreen(c, sx + 4, sy + 3, W - 8, H - 6, sc)}
<path d="M${sx + .5} ${sy} V${sy + H} M${sx + W - .5} ${sy} V${sy + H}" stroke="#000" stroke-width=".6" opacity=".5"/>
${conStick(lx, conNum(sy + H * .27), 3.2, two ? "#1fa3ff" : "")}${conDiamond(lx, conNum(sy + H * .62), 2.9, 1.25, [btn])}
<path d="M${sx - 3.6} ${sy + 3.4} h2.2" stroke="${btn}" stroke-width=".8"/><rect x="${lx - 1.4}" y="${conNum(sy + H * .84)}" width="1.9" height="1.9" rx=".3" fill="${btn}"/>
${conDiamond(rx, conNum(sy + H * .27), 2.9, 1.25, [btn])}${conStick(rx, conNum(sy + H * .62), 3.2, two ? "#ff3b3b" : "")}
<path d="M${sx + W + 1.4} ${sy + 3.4} h2.2 M${sx + W + 2.5} ${sy + 2.3} v2.2" stroke="${btn}" stroke-width=".8"/><circle cx="${rx + .6}" cy="${conNum(sy + H * .87)}" r="1.1" fill="${btn}" stroke="#777" stroke-width=".3"/>
${two ? `<path d="M${sx + 1} ${sy + 1.2} V${sy + H - 1.2}" stroke="#1fa3ff" stroke-width=".7"/><path d="M${sx + W - 1} ${sy + 1.2} V${sy + H - 1.2}" stroke="#ff3b3b" stroke-width=".7"/>` : ""}`;
}
// Nintendo Switch Lite: the turquoise handheld in one piece, a real cross on
// its left.
function conSwitchLite(c) {
  const b = ntId(), sc = ntId();
  return `<defs>${ntV(b, "#6fdbe6", "#2ba7b6")}</defs>
${conSparks(c, 62, 38)}${conFloat(10, 110, 97)}
<rect x="11" y="57" width="98" height="42" rx="13" fill="#000" opacity=".22"/>
<rect x="10" y="55" width="100" height="42" rx="13" fill="url(#${b})"/>
<path d="M22 56.6 H98" stroke="#fff" stroke-width=".9" opacity=".55" stroke-linecap="round"/>
<rect x="33" y="57.6" width="54" height="36.8" rx="2" fill="#141518"/>
${conScreen(c, 36, 60.4, 48, 31.2, sc)}
${conStick(21.6, 66, 3.3)}${conCross(21.6, 82, 3.9, "#1b1c1f")}
<path d="M27 60 h2.2" stroke="#1b1c1f" stroke-width=".8"/><rect x="27" y="88.6" width="1.9" height="1.9" rx=".3" fill="#1b1c1f"/>
${conDiamond(98.4, 66, 3.1, 1.35, ["#1b1c1f"])}${conStick(98.4, 82, 3.3)}
<path d="M90.8 60 h2.2 M91.9 58.9 v2.2" stroke="#1b1c1f" stroke-width=".8"/><circle cx="92" cy="89.6" r="1.1" fill="#1b1c1f"/>`;
}
// PlayStation Vita: the black oval, its screen between the cross and stick
// on the left and the four symbols and stick on the right.
function conVita(c) {
  const b = ntId(), sc = ntId(), rim = ntId();
  const sym = [`<path d="M100 66.6 l1.2 2 h-2.4 Z" fill="none" stroke="#3fd19a" stroke-width=".5"/>`, `<circle cx="103.6" cy="70.2" r="1" fill="none" stroke="#ff5b5b" stroke-width=".5"/>`,
    `<path d="M99.2 73 l1.6 1.6 M100.8 73 l-1.6 1.6" stroke="#7fb2ff" stroke-width=".5"/>`, `<rect x="95.6" y="69.4" width="1.6" height="1.6" fill="none" stroke="#ff8fd1" stroke-width=".5"/>`];
  return `<defs>${ntV(b, "#34373c", "#0b0c0e")}${ntV(rim, "#c9ced3", "#6b7177")}</defs>
${conSparks(c, 62, 38, "ps")}${conFloat(8, 112, 99)}
<rect x="9" y="57" width="102" height="44" rx="22" fill="#000" opacity=".22"/>
<rect x="8" y="55" width="104" height="44" rx="22" fill="url(#${b})" stroke="url(#${rim})" stroke-width="1"/>
<path d="M26 57 Q60 54.6 94 57" fill="none" stroke="#fff" stroke-width=".7" opacity=".25"/>
<rect x="31" y="60" width="58" height="34" rx="2" fill="#050506"/>
${conScreen(c, 33, 62, 54, 30, sc)}
${conCross(20, 70.2, 3.6, "#43464c")}<path d="M20 67.6 v-.8 M20 72.8 v.8" stroke="#55585e" stroke-width=".4"/>
${conStick(23.6, 84.4, 2.4)}<circle cx="15.6" cy="90.6" r="1.4" fill="${conLit(c, "#3d8bff", "#ffa000", "#1d1f22")}" stroke="#55585e" stroke-width=".3"${c.on ? ` class="nta-glow"` : ""}/>
${conDiamond(100, 70.2, 3.6, 1.7, ["#2c2f34"])}${sym.join("")}
${conStick(96.4, 84.4, 2.4)}<rect x="98.4" y="90" width="2.8" height="1.1" rx=".55" fill="#3a3d42"/><rect x="103" y="90" width="2.8" height="1.1" rx=".55" fill="#3a3d42"/>
<text x="60" y="97.6" font-size="2.2" fill="#6b7177" text-anchor="middle" letter-spacing=".5" ${NT_FONT}>SONY</text>`;
}
// NES: the grey box, the grooves on the back of its top, the cartridge door
// in front, the black band with power, reset and two ports.
function conNes(c) {
  const f = ntId(), t = ntId(), dr = ntId();
  const at = conAt(12, 70, 96, 22, 7);
  return `<defs>${ntV(f, "#d4d2cb", "#bebcb5")}${ntV(t, "#c6c4bd", "#dddbd4")}${ntV(dr, "#c9c7c0", "#b3b1aa")}</defs>
${conSparks(c, 60, 28)}${conFloor(12, 108, 102)}
${conBox(12, 70, 96, 32, 22, 7, 2, `url(#${f})`, `url(#${t})`, "#9e9c94")}
${[.5, .6, .7, .8, .9].map((v) => `<path d="M${conPt(at(.03, v))} L${conPt(at(.97, v))}" stroke="#a8a69f" stroke-width=".9"/><path d="M${conPt(at(.03, v - .03))} L${conPt(at(.97, v - .03))}" stroke="#ecebe5" stroke-width=".4"/>`).join("")}
<rect x="32" y="72" width="64" height="14" rx="1" fill="url(#${dr})" stroke="#9e9c94" stroke-width=".5"/>
${[0, 1, 2, 3].map((i) => `<path d="M35 ${75 + i * 2.6} H93" stroke="#a5a39c" stroke-width=".5"/>`).join("")}
<text x="15" y="76" font-size="3" font-weight="700" fill="#c62828" ${NT_FONT}>Nintendo</text><path d="M15 78.4 H29 M15 80.2 H26" stroke="#3b3b3d" stroke-width=".6"/>
<path d="M12 88 H108 V100 Q108 102 106 102 H14 Q12 102 12 100 Z" fill="#2d2d2f"/>
<circle cx="17.6" cy="95" r="1.1" fill="${conLit(c, "#ff1744", "#ff1744", "#4a1a1a")}"${c.on ? ` class="nta-glow"` : ""}/>
<rect x="21" y="92.6" width="8" height="4.6" rx=".6" fill="#c9c7c0"/><rect x="32" y="92.6" width="8" height="4.6" rx=".6" fill="#c9c7c0"/>
${conPort(70, 91.6, 14, 7, "#c9c7c0", "#2d2d2f")}${conPort(88, 91.6, 14, 7, "#c9c7c0", "#2d2d2f")}`;
}
// Super Nintendo: the rounded grey shell, the raised slot in the middle of
// its top, the eject button before it, the power and reset sliders, the
// four colours of its logo.
function conSnes(c) {
  const f = ntId(), t = ntId(), sl = ntId();
  const at = conAt(12, 84, 96, 28, 8), [ex, ey] = at(.5, .2), [px, py] = at(.18, .46), [rx, ry] = at(.82, .46), [ox, oy] = at(.2, .12);
  return `<defs>${ntV(f, "#cbcbc8", "#adadaa")}${ntV(t, "#d2d2d0", "#e9e9e7")}${ntV(sl, "#8d8d8b", "#a9a9a7")}</defs>
${conSparks(c, 60, 40)}${conFloor(12, 108, 100)}
${conBox(12, 84, 96, 16, 28, 8, 6, `url(#${f})`, `url(#${t})`, "#9b9b98")}
${conQuad(at, .3, .7, .36, .86, `url(#${sl})`, ` stroke="#7f7f7d" stroke-width=".5"`)}
<path d="M${conPt(at(.36, .62))} L${conPt(at(.64, .62))}" stroke="#2e2e30" stroke-width="2"/>
<ellipse cx="${ex}" cy="${ey}" rx="4.4" ry="1.8" fill="#8d8d8b" stroke="#6f6f6d" stroke-width=".4"/>
<rect x="${px - 4}" y="${py - 1.4}" width="8" height="2.8" rx="1" fill="#8d8d8b" stroke="#6f6f6d" stroke-width=".4"/><rect x="${rx - 4}" y="${ry - 1.4}" width="8" height="2.8" rx="1" fill="#8d8d8b" stroke="#6f6f6d" stroke-width=".4"/>
${["#e53935", "#fbc02d", "#43a047", "#1e88e5"].map((col, i) => `<circle cx="${conNum(ox + i * 2.4)}" cy="${oy}" r=".9" fill="${col}"/>`).join("")}
${conLed(c, 18, 89, .8, "#ff1744", "#ff1744")}
${conPort(40, 88.4, 13, 6.4, "#8d8d8b", "#3a3a3c")}${conPort(66, 88.4, 13, 6.4, "#8d8d8b", "#3a3a3c")}`;
}
// Nintendo 64: the charcoal shell, the slot on the hump at the back, the
// power and reset sliders, the four-colour cube, four ports in front.
function conN64(c) {
  const f = ntId(), t = ntId(), h = ntId();
  const at = conAt(10, 86, 100, 24, 6), [hx, hy] = at(.5, .7), [px, py] = at(.2, .32), [rx, ry] = at(.8, .32), [lx, ly] = at(.5, .2);
  return `<defs>${ntV(f, "#34363b", "#17181b")}${ntV(t, "#202226", "#3b3d42")}<radialGradient id="${h}" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#55585e"/><stop offset="1" stop-color="#202226"/></radialGradient></defs>
${conSparks(c, 60, 40)}${conFloor(10, 110, 102)}
${conBox(10, 86, 100, 16, 24, 6, 4, `url(#${f})`, `url(#${t})`)}
<path d="M${hx - 22} ${hy + 6} Q${hx - 20} ${hy - 7} ${hx} ${hy - 7} Q${hx + 20} ${hy - 7} ${hx + 22} ${hy + 6} Z" fill="url(#${h})"/>
<rect x="${hx - 11}" y="${hy - 4}" width="22" height="3.6" rx="1" fill="#0b0c0e"/><path d="M${hx - 9} ${hy - 2.2} H${hx + 9}" stroke="#3a3d42" stroke-width=".5"/>
<rect x="${px - 4.4}" y="${py - 1.4}" width="8.8" height="2.8" rx="1.2" fill="#55585e"/><rect x="${rx - 4.4}" y="${ry - 1.4}" width="8.8" height="2.8" rx="1.2" fill="#55585e"/>
<g transform="translate(${lx} ${ly})"><path d="M0 -2.6 L2.6 0 L0 0 Z" fill="#e53935"/><path d="M2.6 0 L0 2.6 L0 0 Z" fill="#1e88e5"/><path d="M0 2.6 L-2.6 0 L0 0 Z" fill="#fbc02d"/><path d="M-2.6 0 L0 -2.6 L0 0 Z" fill="#43a047"/></g>
${conLed(c, 20, 90.6, .8, "#ff1744", "#ff1744")}
${[24, 42, 60, 78].map((x) => `<path d="M${x} 98 V93.6 Q${x} 91.6 ${x + 2} 91.6 H${x + 8} Q${x + 10} 91.6 ${x + 10} 93.6 V98 Z" fill="#0b0c0e"/><rect x="${x + 2.6}" y="93.6" width="4.8" height="2" rx=".5" fill="#55585e"/>`).join("")}`;
}
// GameCube: the indigo cube, the handle at its back, the round lid, the
// buttons at its front corners, the card slots and four ports in front.
function conGamecube(c) {
  const f = ntId(), t = ntId(), l = ntId();
  const at = conAt(30, 56, 56, 22, 6), [lx, ly] = at(.5, .55), [px, py] = at(.15, .16), [ox, oy] = at(.85, .16);
  return `<defs>${ntV(f, "#5c4ea6", "#3d3380")}${ntV(t, "#4a3e8c", "#6b5cb4")}<radialGradient id="${l}" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#8273c9"/><stop offset="1" stop-color="#5a4ba3"/></radialGradient></defs>
${conSparks(c, 60, 10)}${conFloor(30, 86, 106)}
<path d="M40 36 Q42 20 58 20 Q74 20 76 36" fill="none" stroke="#2c2358" stroke-width="5" stroke-linecap="round"/><path d="M40.6 35 Q42.4 21.8 58 21.8 Q73.6 21.8 75.4 35" fill="none" stroke="#5446a0" stroke-width="1.4"/>
${conBox(30, 56, 56, 50, 22, 6, 6, `url(#${f})`, `url(#${t})`)}
<ellipse cx="${lx}" cy="${ly + .7}" rx="19.6" ry="7.6" fill="#2c2358"/><ellipse cx="${lx}" cy="${ly}" rx="19" ry="7.2" fill="url(#${l})"/>
<g transform="translate(${lx} ${ly}) scale(1 .45)" fill="none" stroke="#2c2358" stroke-width="1"><path d="M0 -5 L4.4 -2.5 V2.5 L0 5 L-4.4 2.5 V-2.5 Z M0 0 L4.4 -2.5 M0 0 V5 M0 0 L-4.4 -2.5"/></g>
<ellipse cx="${px}" cy="${py}" rx="2.6" ry="1.2" fill="#3d3380" stroke="#2c2358" stroke-width=".4"/><ellipse cx="${ox}" cy="${oy}" rx="2.6" ry="1.2" fill="#3d3380" stroke="#2c2358" stroke-width=".4"/>
${conLed(c, px + 4.4, py + .4, .7, "#7cff6b", "#ffa000")}
<rect x="36" y="68" width="18" height="3" rx=".6" fill="#2c2358"/><rect x="62" y="68" width="18" height="3" rx=".6" fill="#2c2358"/>
<rect x="53" y="78" width="10" height="7" rx="1.4" fill="none" stroke="#2c2358" stroke-width=".7"/>
${[35, 47, 59, 71].map((x) => conPort(x, 93, 10, 6, "#2c2358", "#18132f")).join("")}`;
}
// Wii: the thin white console standing on its foot, the blue glow along its
// slot, power and reset under it, its name on the side.
function conWii(c) {
  const f = ntId(), s = ntId(), t = ntId(), gl = ntId();
  return `<defs>${ntV(f, "#ffffff", "#e3e6e9")}${ntV(s, "#eceff1", "#cdd2d6")}${ntV(t, "#ffffff", "#f1f3f4")}${ntBlur(gl, 1.6)}</defs>
${conSparks(c, 106, 34)}<filter id="${gl}f" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
<path d="M42 112.6 H70 L102 80.6 H74 Z" fill="#000" opacity=".2" filter="url(#${gl}f)"/>
<path d="M44.6 109.6 Q43 111.4 45.4 111.4 H67.6 L99.4 79.6 Q101 77.8 98.6 77.8 H76.4 Z" fill="#b9bec3"/>
<path d="M44.6 108 Q43 109.8 45.4 109.8 H67.6 L99.4 78 Q101 76.2 98.6 76.2 H76.4 Z" fill="#eef0f2" stroke="#c3c8cd" stroke-width=".4"/>
${ntRoundBox(48, 22, 15, 86, 30, 2, `url(#${f})`, `url(#${s})`, `url(#${t})`, "#c8cdd2")}
<text transform="translate(80 70) rotate(-90) skewX(-25)" font-size="9" font-weight="700" fill="#c3c8cd" text-anchor="middle" ${NT_FONT}>Wii</text>
${c.on ? `<path class="nta-glow" d="M55.5 30 V92" stroke="#40c4ff" stroke-width="3.4" filter="url(#${gl})"/>` : ""}
<path d="M55.5 30 V92" stroke="#7a8188" stroke-width="1.4"/><path d="M55.5 30 V92" stroke="${c.on ? "#82e1ff" : "#9aa1a8"}" stroke-width=".7"/>
<rect x="50.4" y="95" width="10.2" height="7" rx="1" fill="none" stroke="#c8cdd2" stroke-width=".5"/>
<circle cx="53" cy="104.4" r="1.1" fill="#e9ecee" stroke="#b9bec3" stroke-width=".4"/><circle cx="58" cy="104.4" r="1.1" fill="#e9ecee" stroke="#b9bec3" stroke-width=".4"/>
<circle cx="53" cy="104.4" r=".45" fill="${conLit(c, "#7cff6b", "#ff1744", "#9aa1a8")}"/>`;
}
// Mega Drive: the black box, the vents on the left of its top, the round
// ring with 16-BIT around the slot, the reset button, its name in white.
function conMegadrive(c) {
  const f = ntId(), t = ntId(), r = ntId();
  const at = conAt(10, 84, 100, 26, 8), [cx, cy] = at(.58, .5), [bx, by] = at(.92, .42), [nx, ny] = at(.08, .16);
  return `<defs>${ntV(f, "#25272b", "#101113")}${ntV(t, "#18191c", "#2f3135")}<radialGradient id="${r}" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#3c3f44"/><stop offset="1" stop-color="#1b1c1f"/></radialGradient></defs>
${conSparks(c, 60, 38)}${conFloor(10, 110, 100)}
${conBox(10, 84, 100, 16, 26, 8, 4, `url(#${f})`, `url(#${t})`)}
${Array.from({ length: 8 }, (_, i) => `<path d="M${conPt(at(.06 + i * .03, .55))} L${conPt(at(.06 + i * .03, .92))}" stroke="#050506" stroke-width="1"/>`).join("")}
<ellipse cx="${cx}" cy="${cy + 1.6}" rx="25" ry="9.6" fill="#08090a"/><ellipse cx="${cx}" cy="${cy}" rx="24" ry="9" fill="url(#${r})"/>
<ellipse cx="${cx}" cy="${cy}" rx="24" ry="9" fill="none" stroke="#9e1b1b" stroke-width=".5"/><ellipse cx="${cx}" cy="${cy}" rx="16" ry="5.6" fill="#16171a"/>
<text x="${cx}" y="${conNum(cy - 5.6)}" font-size="2.6" font-weight="700" fill="#e7c66a" text-anchor="middle" letter-spacing=".8" ${NT_FONT}>16-BIT</text>
<rect x="${cx - 12}" y="${cy - 1.4}" width="24" height="2.8" rx=".8" fill="#050506"/>
<ellipse cx="${bx}" cy="${by + .5}" rx="3" ry="1.5" fill="#050506"/><ellipse cx="${bx}" cy="${by}" rx="2.7" ry="1.2" fill="#3a3d42"/>
<text x="${nx}" y="${ny}" font-size="3.2" font-weight="700" font-style="italic" fill="#f2f2f2" ${NT_FONT}>MEGA DRIVE</text>
<rect x="15" y="89" width="9" height="2.6" rx=".6" fill="#3a3d42"/><rect x="18.6" y="89.4" width="2.6" height="1.8" rx=".3" fill="#7a8086"/>${conLed(c, 27, 90.3, .7, "#ff1744", "#ff1744")}
<rect x="31" y="89" width="7" height="1.6" rx=".6" fill="#3a3d42"/><circle cx="42" cy="90" r="1" fill="#050506" stroke="#3a3d42" stroke-width=".4"/>
${[78, 94].map((x) => `<path d="M${x} 89 H${x + 11} L${x + 10} 95 H${x + 1} Z" fill="#050506"/><path d="M${x + 2} 91 H${x + 9}" stroke="#3a3d42" stroke-width=".6"/>`).join("")}`;
}
// The heating drawings of #81 to #84, on the same 120 x 135 field.
// A water temperature as a colour, the usual cold/hot scale: deep blue when
// cold, pale when tepid, then orange and red, dark red at the hottest.
const htStops = [[20, [21, 101, 192]], [30, [66, 165, 245]], [38, [207, 216, 220]], [46, [255, 183, 77]], [56, [244, 81, 30]], [68, [198, 40, 40]]];
function htColor(t) {
  if (t === null || t === undefined || isNaN(t)) return "#90a4ae";
  if (t <= htStops[0][0]) return `rgb(${htStops[0][1]})`;
  for (let i = 1; i < htStops.length; i++) {
    const [t1, c1] = htStops[i], [t0, c0] = htStops[i - 1];
    if (t <= t1) { const k = (t - t0) / (t1 - t0); return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(",")})`; }
  }
  return `rgb(${htStops[htStops.length - 1][1]})`;
}
// A pipe run through points, with bent elbows instead of sharp corners.
function htPath(pts, r = 4) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i];
    if (i === pts.length - 1) { d += ` L${x} ${y}`; break; }
    const [px, py] = pts[i - 1], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(x - px, y - py), l2 = Math.hypot(nx - x, ny - y), k = Math.min(r, l1 / 2, l2 / 2);
    const a = [x - (x - px) / l1 * k, y - (y - py) / l1 * k], b = [x + (nx - x) / l2 * k, y + (ny - y) / l2 * k];
    d += ` L${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${x} ${y} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  return d;
}
// A round pipe: dark edge, its colour, a shade along the lower side and a
// light streak along the top, so it reads as a tube and not a flat line.
const htPipe = (pts, col, w = 3.4) => {
  const d = typeof pts === "string" ? pts : htPath(pts);
  return `<path d="${d}" stroke="#2f363d" stroke-width="${w + 1}" fill="none" stroke-linecap="butt" stroke-linejoin="round"/>
<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linejoin="round"/>
<path d="${d}" transform="translate(.35 .35)" stroke="#000" stroke-opacity=".22" stroke-width="${(w * .35).toFixed(2)}" fill="none" stroke-linejoin="round"/>
<path d="${d}" transform="translate(-.45 -.45)" stroke="#fff" stroke-opacity=".45" stroke-width="${(w * .28).toFixed(2)}" fill="none" stroke-linejoin="round"/>`;
};
// A brass union where a pipe meets a device, across the pipe.
const htUnion = (x, y, vert, w = 3.4) => vert
  ? `<rect x="${(x - w / 2 - 1).toFixed(1)}" y="${y - 1.4}" width="${(w + 2).toFixed(1)}" height="2.8" rx=".6" fill="#c9a227" stroke="#7a5f0e" stroke-width=".35"/>`
  : `<rect x="${x - 1.4}" y="${(y - w / 2 - 1).toFixed(1)}" width="2.8" height="${(w + 2).toFixed(1)}" rx=".6" fill="#c9a227" stroke="#7a5f0e" stroke-width=".35"/>`;
// A quarter-turn valve on a pipe, its lever along the pipe when open.
const htValve = (x, y, vert, lever = "#d32f2f") => `<rect x="${x - 2.6}" y="${y - 2.6}" width="5.2" height="5.2" rx="1.2" fill="#d4ac2b" stroke="#7a5f0e" stroke-width=".4"/>
<path d="M${x} ${y} ${vert ? `V${y - 1} H${x + 5}` : `H${x + 1} V${y - 5}`}" stroke="${lever}" stroke-width="1.5" stroke-linecap="round" fill="none"/>`;
const htFlow = (pts, col = "#fff", cls = "nta-flow") => `<path class="${cls}" d="${typeof pts === "string" ? pts : htPath(pts)}" stroke="${col}" stroke-opacity=".85" stroke-width="1" stroke-dasharray="2 4" fill="none" stroke-linecap="round"/>`;
// Heating colours: red for the flow (hot), blue for the return (cold), for
// the heating circuit and the domestic water alike.
const HT_HOT = "#e53935";
const HT_COLD = "#1e88e5";

// Buffer tank: an upright insulated tank whose front shows its layers, hot on
// top and cold at the bottom, one marker per sensor at its height. The pipes
// on the left bring the sources' heat, those on the right feed the house.
function ntTank(c) {
  const g = ntId(), sh = ntId(), cap = ntId(), gl = ntId(), cp = ntId();
  const temps = (c.temps || []).filter((t) => t !== null && t !== undefined);
  const n = temps.length;
  const x0 = 36, x1 = 80, top = 22, bot = 98, cx = (x0 + x1) / 2, rx = (x1 - x0) / 2;
  const at = (k) => top + 6 + (bot - top - 12) * k;
  const fr = (i) => (n <= 1 ? .5 : .08 + .84 * i / (n - 1));
  const stops = n ? temps.map((t, i) => `<stop offset="${fr(i).toFixed(3)}" stop-color="${htColor(t)}"/>`).join("") : `<stop offset="0" stop-color="#b0bec5"/><stop offset="1" stop-color="#90a4ae"/>`;
  const marks = temps.map((t, i) => {
    const y = at(fr(i));
    return `<circle cx="${x0 + 2.5}" cy="${y.toFixed(1)}" r="1.5" fill="#fff" stroke="#37474f" stroke-width=".6"/><path d="M${x0 + 4} ${y.toFixed(1)} H${cx - 11}" stroke="#fff" stroke-opacity=".6" stroke-width=".6" stroke-dasharray="1 1.4"/>
<rect x="${cx - 11}" y="${(y - 5.2).toFixed(1)}" width="22" height="10.4" rx="5.2" fill="#000" opacity=".45"/>
<text x="${cx}" y="${(y + 2.9).toFixed(1)}" font-size="8" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>${(c.labels && c.labels[i]) || `${Math.round(t)}\u00b0`}</text>`;
  }).join("");
  const src = c.loading;
  // Sources on the left (flow in at the top, return out at the bottom), the
  // house on the right (flow out at the top, return in at the bottom).
  const runs = { lh: [[12, 120], [12, 34], [x0 + 1, 34]], lc: [[x0 + 1, 86], [24, 86], [24, 120]], rh: [[x1 - 1, 34], [108, 34], [108, 120]], rc: [[96, 120], [96, 86], [x1 - 1, 86]] };
  const pipesL = htPipe(runs.lh, HT_HOT) + htPipe(runs.lc, HT_COLD) + htUnion(x0 - 2, 34, false) + htUnion(x0 - 2, 86, false) + htValve(12, 108, true) + htValve(24, 108, true, "#1565c0");
  const pipesR = htPipe(runs.rh, HT_HOT) + htPipe(runs.rc, HT_COLD) + htUnion(x1 + 2, 34, false) + htUnion(x1 + 2, 86, false) + htValve(108, 108, true) + htValve(96, 108, true, "#1565c0");
  const rise = [0, 1, 2].map((i) => `<path class="nta-heat ntd${i + 2}" d="M${44 + i * 10} 88 q-1.6 -2.6 0 -5.2 q1.6 -2.6 0 -5.2" stroke="#fff" stroke-width="1" fill="none" opacity="0" stroke-linecap="round"/>`).join("");
  const pct = c.charge === null || c.charge === undefined ? "" : `${Math.round(c.charge)}%`;
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
<linearGradient id="${sh}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".18" stop-color="#fff" stop-opacity=".3"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
<linearGradient id="${cap}" x1="0" x2="1"><stop offset="0" stop-color="#9aa3ad"/><stop offset=".3" stop-color="#eef1f4"/><stop offset="1" stop-color="#7d8792"/></linearGradient>${ntBlur(gl, 2)}
<clipPath id="${cp}"><path d="M${x0} ${top} V${bot} A${rx} 5 0 0 0 ${x1} ${bot} V${top} Z"/></clipPath></defs>
${ntShadow(cx, 107, 30)}
<path d="M${x0 + 6} ${bot + 2} l-2 7 M${x1 - 6} ${bot + 2} l2 7 M${cx} ${bot + 4} v6" stroke="#5d6670" stroke-width="2.4" stroke-linecap="round"/>
${pipesL}${pipesR}
<g class="nt-run">${htFlow(runs.lh)}${htFlow(runs.lc)}</g>${c.drawing ? htFlow(runs.rh) + htFlow(runs.rc) : ""}
<path d="M${x0} ${top} V${bot} A${rx} 5 0 0 0 ${x1} ${bot} V${top} Z" fill="url(#${g})"/>
<g clip-path="url(#${cp})"><g class="nt-run">${rise}</g>
${src ? `<rect class="nta-warm" x="${x0}" y="${top}" width="${x1 - x0}" height="30" fill="#ffab91" opacity=".15" filter="url(#${gl})"/>` : ""}</g>
<path d="M${x0} ${top} V${bot} A${rx} 5 0 0 0 ${x1} ${bot} V${top} Z" fill="url(#${sh})"/>
${[.33, .66].map((k) => `<path d="M${x0} ${(top + (bot - top) * k).toFixed(1)} A${rx} 4 0 0 0 ${x1} ${(top + (bot - top) * k).toFixed(1)}" stroke="#fff" stroke-opacity=".25" stroke-width=".6" fill="none"/>`).join("")}
<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="6" fill="url(#${cap})" stroke="#6f7984" stroke-width=".6"/>
<path d="M${cx - 5} ${top - 4} h10 v3 a5 2 0 0 1 -10 0 Z" fill="#b0b8c1" stroke="#6f7984" stroke-width=".5"/>
<path d="M${x0} ${bot} A${rx} 5 0 0 0 ${x1} ${bot}" stroke="#6f7984" stroke-width="1.6" fill="none"/>
${pct ? ntLcd(cx - 13, 0, 26, 12, pct, true, c.loading ? "#ffb74d" : "#fff", 8.6) : ""}
${marks}`;
}

// Fresh water station: the controller on top, the black insulating shell with
// the plate heat exchanger and the primary pump, the tank's two pipes and the
// two water pipes under it, and the tap that runs while water is drawn.
function ntFresh(c) {
  const bx = ntId(), sh = ntId(), px = ntId(), pm = ntId(), wa = ntId();
  const draw = c.drawing, circ = c.circulating;
  const plates = Array.from({ length: 9 }, (_, i) => `<rect x="${31 + i * 2.6}" y="44" width="2" height="30" rx=".6" fill="${i % 2 ? "#cfd6dc" : "#e9edf0"}"/>`).join("");
  const herring = Array.from({ length: 7 }, (_, j) => `<path d="M31 ${47 + j * 4} l11.5 2 l11.5 -2" stroke="#9aa5ae" stroke-width=".45" fill="none"/>`).join("");
  const txt = c.lcd || "";
  const tapOn = draw;
  return `<defs>${ntV(bx, "#f6f7f8", "#d9dde1")}${ntV(sh, "#2d3136", "#15181b")}${ntV(px, "#eef1f3", "#a9b2ba")}${ntV(pm, "#43a047", "#1b5e20")}${ntV(wa, "#e1f5fe", "#81d4fa")}</defs>

${ntShadow(46, 107, 34)}
${htPipe([[30, 120], [30, 93]], HT_HOT)}${htPipe([[40, 93], [40, 120]], HT_COLD)}${htPipe([[54, 93], [54, 120]], HT_COLD)}
${htPipe([[64, 93], [64, 100], [96, 100], [96, 58], [101, 58]], HT_HOT)}
${[30, 40, 54, 64].map((x) => htUnion(x, 96, true)).join("")}${htValve(30, 112, true)}${htValve(40, 112, true, "#1565c0")}${htValve(54, 112, true, "#1565c0")}
<g class="nt-run">${htFlow([[30, 120], [30, 93]])}${htFlow([[40, 93], [40, 120]])}</g>
${draw ? `<g>${htFlow([[54, 120], [54, 93]], "#fff", "nta-flow-fast")}${htFlow([[64, 93], [64, 100], [96, 100], [96, 58], [101, 58]], "#fff", "nta-flow-fast")}</g>` : ""}
${circ ? `${htPipe([[96, 82], [80, 82], [80, 88], [75, 88]], "#ff8a65", 2.4)}${htFlow([[96, 82], [80, 82], [80, 88], [75, 88]])}` : ""}
<rect x="18" y="4" width="56" height="90" rx="3" fill="url(#${bx})" stroke="#b6bdc4" stroke-width=".7"/>
<rect x="22" y="8" width="48" height="20" rx="2" fill="#eceff1" stroke="#c3c9cf" stroke-width=".5"/>
${ntLcd(25, 11, 42, 14, txt, true, draw ? "#4fc3f7" : "#90a4ae", ntFit(txt, 42, 9))}
<rect x="22" y="32" width="48" height="58" rx="5" fill="url(#${sh})"/>
<rect x="29" y="42" width="27" height="34" rx="1.5" fill="url(#${px})" stroke="#7d8892" stroke-width=".6"/>${plates}${herring}
<rect x="29" y="40" width="27" height="3" rx="1" fill="#8d979f"/><rect x="29" y="75" width="27" height="3" rx="1" fill="#8d979f"/>
${[33, 52].map((x) => `<circle cx="${x}" cy="41.5" r="1.3" fill="#5d6670"/><circle cx="${x}" cy="76.5" r="1.3" fill="#5d6670"/>`).join("")}
<circle cx="63" cy="60" r="6.4" fill="url(#${pm})" stroke="#0d3b12" stroke-width=".6"/>
<g class="${draw ? "nta-spin" : ""}"><path d="M63 55.4 V64.6 M58.4 60 H67.6 M59.8 56.8 L66.2 63.2 M66.2 56.8 L59.8 63.2" stroke="#c8e6c9" stroke-width=".8" stroke-linecap="round"/></g>
<circle cx="63" cy="60" r="1.6" fill="#1b5e20"/>
<rect x="60" y="68" width="6" height="14" rx="1" fill="#4a525c"/>
<circle cx="63" cy="46" r="3" fill="#fff" stroke="#8d979f" stroke-width=".5"/><path d="M63 46 L64.6 44.4" stroke="#c62828" stroke-width=".6"/>
<path d="M104 52 H112 Q116 52 116 56 V62" stroke="#9aa3ab" stroke-width="4" fill="none" stroke-linecap="round"/>
<rect x="100" y="54" width="7" height="8" rx="1.5" fill="#c3c9cf" stroke="#8a939b" stroke-width=".5"/>
<path d="M103.5 54 V48 M100 48 H107" stroke="#8a939b" stroke-width="2" stroke-linecap="round"/>
${tapOn ? `<path class="nta-shimmer" d="M115 63 Q116 80 115 100" stroke="url(#${wa})" stroke-width="3" fill="none" stroke-linecap="round"/>
<path class="nta-flow-fast" d="M116 64 V100" stroke="#fff" stroke-width=".8" stroke-dasharray="3 5"/>
<ellipse cx="115.5" cy="101" rx="4.5" ry="1.4" fill="#b3e5fc" opacity=".8"/>
${[0, 1].map((i) => `<path class="nta-steam ntd${i + 2}" d="M${112 + i * 6} 74 q-1.6 -2.6 0 -5.2 q1.6 -2.6 0 -5.2" stroke="#fff" stroke-width="1.4" fill="none" opacity="0" stroke-linecap="round"/>`).join("")}` : ""}
`;
}

// The collector's own copper outlet, where the field pipe screws on.
const htStub = (pts) => { const d = htPath(pts); return `<path d="${d}" stroke="#5a3a1c" stroke-width="3.2" fill="none"/><path d="${d}" stroke="#c07a3c" stroke-width="2.2" fill="none"/><path d="${d}" transform="translate(-.35 -.35)" stroke="#f1c18e" stroke-width=".6" fill="none"/>`; };
// Solar thermal: the collectors on their frame, the hot pipe from the top
// header down to the solar station, its pump and thermometers, and the cold
// return. Flat plates show their copper absorber; tubes their glass rows.
function ntSolarThermal(c) {
  const fr = ntId(), ab = ntId(), gs = ntId(), sb = ntId(), sun = ntId(), ice = ntId(), tb = ntId();
  const tubes = c.style === "tubes";
  const tl = [16, 30], tr = [74, 30], br = [84, 66], bl = [6, 66];
  const L = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const quad = `M${f(tl)} L${f(tr)} L${f(br)} L${f(bl)} Z`;
  let face;
  if (tubes) {
    const n = 12;
    face = `<path d="${quad}" fill="#e7ebee"/>` + Array.from({ length: n }, (_, i) => {
      const a = L(tl, tr, (i + .5) / n), b = L(bl, br, (i + .5) / n);
      const w0 = 3.1, w1 = 4.6;
      return `<path d="M${(a[0] - w0 / 2).toFixed(1)} ${a[1]} L${(b[0] - w1 / 2).toFixed(1)} ${b[1]} A${w1 / 2} 1 0 0 0 ${(b[0] + w1 / 2).toFixed(1)} ${b[1]} L${(a[0] + w0 / 2).toFixed(1)} ${a[1]} Z" fill="url(#${tb})" stroke="#9fb0bd" stroke-width=".3"/>
<path d="M${a[0].toFixed(1)} ${a[1] + 1} L${b[0].toFixed(1)} ${b[1] - 1}" stroke="#1d2b3a" stroke-width="1.3"/>
<path d="M${(a[0] - .9).toFixed(1)} ${a[1] + 1} L${(b[0] - 1.4).toFixed(1)} ${b[1] - 1}" stroke="#fff" stroke-width=".4" opacity=".8"/>`;
    }).join("") + `<path d="M${f([tl[0] - 2, tl[1] - 3])} H${tr[0] + 2} V${tl[1] + 1} H${tl[0] - 2} Z" fill="#c9d0d6" stroke="#8b959e" stroke-width=".6"/>
<path d="M${f([bl[0] - 1, bl[1]])} H${br[0] + 1}" stroke="#8b959e" stroke-width="2" stroke-linecap="round"/>`;
  } else {
    const fins = Array.from({ length: 14 }, (_, i) => { const a = L(tl, tr, (i + .5) / 14), b = L(bl, br, (i + .5) / 14); return `M${f(L(a, b, .05))} L${f(L(a, b, .95))}`; }).join(" ");
    face = `<path d="${quad}" fill="url(#${ab})" stroke="#d5dbe0" stroke-width="1.6" stroke-linejoin="round"/>
<path d="${fins}" stroke="#b87333" stroke-opacity=".6" stroke-width=".7"/>
<path d="M${f(L(tl, bl, .06))} L${f(L(tr, br, .06))} M${f(L(tl, bl, .94))} L${f(L(tr, br, .94))}" stroke="#d08c4c" stroke-width="1.1"/>
<path d="${quad}" fill="url(#${gs})"/>`;
  }
  const frost = c.frost ? `<path d="${quad}" fill="url(#${ice})" opacity=".75"/>${[[24, 40], [44, 46], [62, 38], [30, 58], [56, 58], [72, 54]].map(([x, y]) => ntFlake(x, y, 2.4, "#ffffff", .7)).join("")}` : "";
  const stag = c.stagnation ? [0, 1, 2, 3].map((i) => `<path class="nta-heat ntd${i + 1}" d="M${24 + i * 16} 30 q-2 -3 0 -6 q2 -3 0 -6" stroke="#ff7043" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0"/>`).join("") : "";
  const txt = c.lcd || "";
  const pumpCls = c.on ? (c.fast ? "nta-spin" : "nta-spin-slow") : "";
  return `<defs><linearGradient id="${ab}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26313d"/><stop offset="1" stop-color="#121a22"/></linearGradient>
<linearGradient id="${gs}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>
<linearGradient id="${tb}" x1="0" x2="1"><stop offset="0" stop-color="#cfe0ea"/><stop offset=".5" stop-color="#7f97a8"/><stop offset="1" stop-color="#b9cbd6"/></linearGradient>
<linearGradient id="${ice}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3f2fd"/><stop offset="1" stop-color="#bbdefb"/></linearGradient>
${ntV(sb, "#2d3136", "#15181b")}<radialGradient id="${sun}"><stop offset="0" stop-color="#ffee58"/><stop offset="1" stop-color="#ffb300"/></radialGradient><linearGradient id="${fr}"><stop offset="0" stop-color="#aeb6bd"/></linearGradient></defs>
${c.on ? `<g class="nta-spin-slow"><circle cx="104" cy="8" r="13" fill="none" stroke="#ffd54f" stroke-width="1.2" stroke-dasharray="2 4" opacity=".7"/></g><circle cx="104" cy="8" r="7" fill="url(#${sun})"/>` : ""}
${ntShadow(46, 101, 42)}
<path d="M26 66 V97 M66 66 V97" stroke="#7d868e" stroke-width="2"/><path d="M26 82 L14 66 M66 82 L78 66" stroke="#7d868e" stroke-width="1.3"/>
<path d="M14 66 V98 M78 66 V98" stroke="#aeb6bd" stroke-width="2.4" stroke-linecap="round"/>
${face}${frost}<g class="nt-run">${stag}</g>
${htPipe([[81, 30], [93, 30], [93, 54]], HT_HOT, 2.8)}${htPipe([[88, 92], [84, 92], [84, 73]], HT_COLD, 2.8)}${htUnion(93, 52, true, 2.8)}${htUnion(90, 92, false, 2.8)}
${htStub([[tubes ? 76 : 73.5, 30], [80, 30]])}${htStub([[84, 66.5], [84, 72]])}${htUnion(80.4, 30, false, 2.8)}${htUnion(84, 72.4, true, 2.8)}
<g class="nt-run">${htFlow([[81, 30], [93, 30], [93, 54]])}${htFlow([[88, 92], [84, 92], [84, 73]])}</g>
<rect x="88" y="54" width="28" height="48" rx="3.5" fill="url(#${sb})"/>
${ntLcd(90.5, 57, 23, 11, txt, true, c.on ? "#ffb74d" : "#90a4ae", ntFit(txt, 23, 7.6))}
${[[96, HT_HOT], [108, HT_COLD]].map(([x, col]) => `<circle cx="${x}" cy="76" r="4.2" fill="#fff" stroke="${col}" stroke-width="1.2"/><path d="M${x} 76 L${x + 1.8} 73.6" stroke="#263238" stroke-width=".6"/>`).join("")}
<circle cx="102" cy="91" r="5.4" fill="#c62828" stroke="#7f1717" stroke-width=".6"/>
<g class="${pumpCls}"><path d="M102 87.2 V94.8 M98.2 91 H105.8" stroke="#ffcdd2" stroke-width=".8" stroke-linecap="round"/></g><circle cx="102" cy="91" r="1.3" fill="#7f1717"/>
${htPipe([[100, 102], [100, 120]], HT_HOT, 2.6)}${htPipe([[108, 102], [108, 120]], HT_COLD, 2.6)}${htUnion(100, 104, true, 2.6)}${htUnion(108, 104, true, 2.6)}`;
}


// The stove's thermometer: a dial from 0 to its top over 220 degrees of arc,
// grey while too cold, green in the good range, red in its last quarter.
const htPolar = (cx, cy, r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
function htArc(cx, cy, r, a0, a1) {
  const p = htPolar(cx, cy, r, a0), q = htPolar(cx, cy, r, a1);
  return `M${p[0].toFixed(2)} ${p[1].toFixed(2)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${q[0].toFixed(2)} ${q[1].toFixed(2)}`;
}
function htDial(cx, cy, r, t, max = 400, low = 100) {
  const ang = (v) => -110 + Math.max(0, Math.min(max, v)) / max * 220;
  const zones = [[0, low, "#90a4ae"], [low, max * .75, "#43a047"], [max * .75, max, "#e53935"]].map(([a, b, col]) => `<path d="${htArc(cx, cy, r - 1.6, ang(a), ang(b))}" stroke="${col}" stroke-width="1.6" fill="none"/>`).join("");
  const ticks = [0, .25, .5, .75, 1].map((k) => k * max).map((v) => { const p = htPolar(cx, cy, r - .7, ang(v)), q = htPolar(cx, cy, r - 2.5, ang(v)); return `<path d="M${p[0].toFixed(2)} ${p[1].toFixed(2)} L${q[0].toFixed(2)} ${q[1].toFixed(2)}" stroke="#37474f" stroke-width=".35"/>`; }).join("");
  const deg = t === null || t === undefined || isNaN(t) ? -110 : ang(t);
  return `<circle cx="${cx}" cy="${cy}" r="${r + .9}" fill="#9aa3ab"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f7f4ec" stroke="#6f7984" stroke-width=".4"/>${zones}${ticks}
<path d="M${cx} ${cy + 1.2} V${(cy - r + 1.4).toFixed(2)}" stroke="#212121" stroke-width=".7" stroke-linecap="round" transform="rotate(${deg.toFixed(1)} ${cx} ${cy})"/><circle cx="${cx}" cy="${cy}" r="1" fill="#212121"/>`;
}

// Log stove: the cast iron body on its legs, the glass door with the logs and
// the fire, the ash drawer, the flue with its thermometer and, with a water
// jacket, the flow and return pipes at the back with their pump.
function ntWoodStove(c) {
  const bd = ntId(), gl = ntId(), fl = ntId(), fl2 = ntId(), win = ntId(), cp = ntId(), pl = ntId();
  const st = c.st || "cold"; // burning | embers | cold
  const burning = st === "burning", embers = st === "embers";
  const logs = [[40, 78, 18, -6], [54, 79, 18, 7], [47, 72, 17, 2]].map(([x, y, w, a]) => `<g transform="rotate(${a} ${x + w / 2} ${y})">
<rect x="${x}" y="${y - 3}" width="${w}" height="6" rx="3" fill="${burning ? "#4e342e" : embers ? "#5d2a1a" : "#6d5d55"}"/>
<path d="M${x + 3} ${y - 1.4} H${x + w - 4} M${x + 5} ${y + 1.2} H${x + w - 3}" stroke="${embers ? "#ff7043" : burning ? "#3e2723" : "#857670"}" stroke-width=".6" ${embers ? 'class="nta-glow"' : ""}/>
<ellipse cx="${x + w}" cy="${y}" rx="2.2" ry="3" fill="${embers ? "#ff8a50" : burning ? "#8d6e63" : "#a1928b"}" stroke="${embers ? "#bf360c" : "#4e342e"}" stroke-width=".5"/></g>`).join("");
  const flames = burning ? `<g class="wst-fl"><path class="nta-flick" d="M41 74 Q38 62 44 54 Q44 62 48 60 Q46 50 53 42 Q54 54 58 54 Q60 46 64 46 Q62 56 68 60 Q70 66 68 74 Z" fill="url(#${fl})"/>
<path class="nta-flick ntd3" d="M46 74 Q45 66 49 62 Q50 67 53 66 Q53 58 57 54 Q58 62 61 64 Q64 68 62 74 Z" fill="url(#${fl2})"/></g>` : "";
  const glow = burning || embers;
  const txt = c.lcd || "";
  const jacket = c.water ? `${htPipe([[80, 50], [100, 50], [100, 30], [118, 30]], HT_HOT, 3)}${htPipe([[118, 88], [80, 88]], HT_COLD, 3)}${htUnion(87, 50, false, 3)}${htUnion(87, 88, false, 3)}
<g class="${c.pump ? "nt-pumpon" : ""}">${c.pump ? `${htFlow([[80, 50], [100, 50], [100, 30], [118, 30]])}${htFlow([[118, 88], [80, 88]])}` : ""}</g>
<circle cx="106" cy="88" r="5.2" fill="#1e88e5" stroke="#0d47a1" stroke-width=".6"/>
<g class="${c.pump ? "nta-spin" : ""}"><path d="M106 84.4 V91.6 M102.4 88 H109.6" stroke="#bbdefb" stroke-width=".8" stroke-linecap="round"/></g><circle cx="106" cy="88" r="1.2" fill="#0d47a1"/>
${htValve(110, 30, false)}` : "";
  return `<defs>${ntV(bd, "#3b3f44", "#1c1e21")}${ntBlur(gl, 3)}${ntV(pl, "#4a4f55", "#2a2d31")}
<linearGradient id="${fl}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff6f00"/><stop offset=".6" stop-color="#ff9800"/><stop offset="1" stop-color="#ffd54f" stop-opacity=".2"/></linearGradient>
<linearGradient id="${fl2}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffd54f"/><stop offset="1" stop-color="#fff59d" stop-opacity=".4"/></linearGradient>
<radialGradient id="${win}" cx=".5" cy=".8" r=".9"><stop offset="0" stop-color="${burning ? "#ff8f00" : embers ? "#8a2d10" : "#2B2F33"}"/><stop offset="1" stop-color="#121416"/></radialGradient>
<clipPath id="${cp}"><rect x="36" y="44" width="40" height="38" rx="3"/></clipPath></defs>
${ntShadow(56, 108, 34)}
${glow ? `<ellipse class="nta-glow" cx="56" cy="106" rx="30" ry="4" fill="${burning ? "#ffb74d" : "#ff7043"}" opacity=".4" filter="url(#${gl})"/>` : ""}
${jacket}
<rect x="50" y="-6" width="12" height="38" fill="url(#${pl})"/><rect x="48.5" y="10" width="15" height="3" rx="1" fill="#2a2d31"/>
${htDial(56, 19, 8.6, c.flue, c.max || 400, c.low || 100)}
<rect x="26" y="32" width="60" height="6" rx="2" fill="#2a2d31"/>
<rect x="28" y="36" width="56" height="62" rx="2.5" fill="url(#${bd})"/>
<rect x="33" y="41" width="46" height="44" rx="4" fill="#15171A" stroke="#555B62" stroke-width=".8"/>
<rect x="36" y="44" width="40" height="38" rx="3" fill="url(#${win})"/>
<g clip-path="url(#${cp})">${glow ? `<ellipse class="nta-glow" cx="56" cy="80" rx="18" ry="7" fill="${burning ? "#ffab40" : "#ff5722"}" filter="url(#${gl})"/>` : ""}${flames}${logs}
<path d="M36 82 Q56 76 76 82" fill="${embers ? "#ff7043" : "#3a3d40"}" opacity=".6"/></g>
<path d="M39 46 L49 46 L39 70 Z" fill="#fff" opacity=".1"/>
<rect x="76" y="56" width="3" height="14" rx="1.4" fill="#8a9097"/>
<rect x="33" y="88" width="46" height="7" rx="1.5" fill="#26292d" stroke="#4a5057" stroke-width=".5"/><rect x="51" y="90.5" width="10" height="2" rx="1" fill="#8a9097"/>
<path d="M31 98 v8 M81 98 v8" stroke="#1c1e21" stroke-width="3" stroke-linecap="round"/>
${txt ? ntLcd(4, 40, 20, 11, txt, true, burning ? "#ffb74d" : embers ? "#ff8a65" : "#90a4ae", ntFit(txt, 20, 7.4)) : ""}`;
}

// A gas fireplace (#130), IntelliFire or the like: the firebox behind its
// glass in a dark surround under a mantel, ceramic logs on a bed of embers.
// Burning, a row of flames, blue at the root, as tall as the flame setting
// (1 to 5); the pilot a small blue flame of its own; the lights warm the
// firebox from the top; the fan blows warm air out of the louvre above.
function ntGasFireplace(c) {
  const n1 = (v) => +v.toFixed(1);
  const sur = ntId(), bk = ntId(), fl = ntId(), fl2 = ntId(), gl = ntId(), cp = ntId(), ac = ntId(), mt = ntId();
  const flame = !!c.flame, lit = !!c.light;
  const lvl = Math.min(5, Math.max(1, Math.round(c.level || 3)));
  const top = 84 - (12 + lvl * 6);
  const flames = flame ? [[27, 14, 1], [38, 15, 2], [50, 16, 3], [62, 17, 1], [74, 15, 2], [86, 13, 3], [44, 10, 2], [68, 11, 3]].map(([x, w, d], i) => {
    const h = (84 - top) * (i % 2 ? .82 : 1), y = 84 - h;
    return `<path class="nta-flick ntd${d}" d="M${x - w / 2} 84 Q${x - w / 2 - 1} ${n1(84 - h * .45)} ${n1(x - w * .1)} ${n1(y + h * .25)} Q${x} ${n1(y + h * .1)} ${x + .5} ${n1(y)} Q${n1(x + w * .3)} ${n1(y + h * .3)} ${n1(x + w * .5)} ${n1(84 - h * .4)} Q${x + w / 2 + 1} 80 ${x + w / 2} 84 Z" fill="url(#${fl})"/>
<path class="nta-flick ntd${(d % 3) + 1}" d="M${x - w / 4} 84 Q${x - w / 4} ${n1(84 - h * .35)} ${x} ${n1(y + h * .45)} Q${x + w / 4} ${n1(84 - h * .35)} ${x + w / 4} 84 Z" fill="url(#${fl2})"/>`;
  }).join("") : "";
  const logs = [[24, 82, 34, -5], [52, 83, 36, 4], [38, 77, 30, 1], [66, 78, 26, -3]].map(([x, y, w, a]) => `<g transform="rotate(${a} ${x + w / 2} ${y})">
<rect x="${x}" y="${y - 3.4}" width="${w}" height="6.8" rx="3.4" fill="${flame ? "#4e3a32" : lit ? "#6b5348" : "#5a4c46"}"/>
<path d="M${x + 4} ${y - 1.4} H${x + w - 6} M${x + 7} ${y + 1.4} H${x + w - 4}" stroke="${flame ? "#ff8a50" : "#3b302b"}" stroke-width=".7" ${flame ? 'class="nta-glow"' : ""}/>
<ellipse cx="${x + w}" cy="${y}" rx="2.4" ry="3.4" fill="${flame ? "#ff9e6a" : "#8a7a72"}" stroke="#3b2a24" stroke-width=".5"/></g>`).join("");
  const pilot = c.pilot ? `<path class="nta-flick ntd2" d="M58.6 86 Q58.2 82.4 60 79.6 Q61.8 82.4 61.4 86 Z" fill="#64b5f6"/><path d="M59.4 86 Q59.4 84 60 82.6 Q60.6 84 60.6 86 Z" fill="#e3f2fd"/>` : "";
  const fanDur = c.fan ? n1(2.4 - 1.6 * Math.min(1, Math.max(0, c.fanPct === null || c.fanPct === undefined ? .5 : c.fanPct))) : 0;
  const air = c.fan ? [0, 1, 2, 3].map((i) => `<path class="nta-rise ntd${i + 1}" style="animation-duration:${fanDur}s" d="M${32 + i * 18} 36 q-3 -5 0 -10 q3 -5 0 -10" stroke="${flame ? "#ffb74d" : "#b0bec5"}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".85"/>`).join("") : "";
  return `<defs>${ntV(sur, "#3a3d42", "#1f2124")}${ntV(mt, "#e4ddd1", "#bfb5a6")}
<linearGradient id="${bk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${flame ? "#5a3020" : lit ? "#4a3428" : "#2b1d18"}"/><stop offset="1" stop-color="${flame ? "#2e1810" : "#1a1210"}"/></linearGradient>
<linearGradient id="${fl}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#42a5f5"/><stop offset=".14" stop-color="#ff6f00"/><stop offset=".6" stop-color="#ff9800"/><stop offset="1" stop-color="#ffd54f" stop-opacity=".15"/></linearGradient>
<linearGradient id="${fl2}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#90caf9"/><stop offset=".25" stop-color="#ffe082"/><stop offset="1" stop-color="#fff8e1" stop-opacity=".35"/></linearGradient>
<radialGradient id="${ac}" cx=".5" cy="0" r=".9"><stop offset="0" stop-color="#ffe0b2" stop-opacity=".75"/><stop offset="1" stop-color="#ffe0b2" stop-opacity="0"/></radialGradient>
${ntBlur(gl, 3)}<clipPath id="${cp}"><rect x="20" y="46" width="80" height="48" rx="1.5"/></clipPath></defs>
${ntFoot("8 108 112 108 115 111 5 111", .3)}
${flame ? `<polygon class="nta-glow" points="12 108 108 108 116 113 4 113" fill="#ffb74d" opacity=".45" filter="url(#${gl})"/>` : ""}
<g class="nt-run">${air}</g>
<rect x="2" y="24" width="116" height="8" rx="1.5" fill="url(#${mt})"/><path d="M3 24.6 H117" stroke="#fff" stroke-width=".8" opacity=".7"/>
<rect x="8" y="32" width="104" height="76" rx="1.5" fill="url(#${sur})"/>
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${23 + i * 6.4}" y="37.4" width="4.2" height="1.6" rx=".6" fill="#0d0e10"/>`).join("")}
<rect x="16" y="42" width="88" height="56" rx="2" fill="#0b0c0e"/>
<rect x="20" y="46" width="80" height="48" rx="1.5" fill="url(#${bk})"/>
<g clip-path="url(#${cp})">
${[54, 62, 70].map((y) => `<path d="M20 ${y} H100" stroke="#000" stroke-width=".5" opacity=".35"/>`).join("")}${[30, 44, 58, 72, 86].map((x, i) => `<path d="M${x + (i % 2 ? 7 : 0)} 46 V54 M${x} 54 V62 M${x + 7} 62 V70" stroke="#000" stroke-width=".5" opacity=".3"/>`).join("")}
${lit ? `<rect x="20" y="46" width="80" height="34" fill="url(#${ac})"/>` : ""}
${flame ? `<ellipse class="nta-glow" cx="60" cy="86" rx="38" ry="9" fill="#ff8f00" opacity=".55" filter="url(#${gl})"/>` : ""}
${flames}${logs}${pilot}
<path d="M20 86 Q60 82 100 86 V94 H20 Z" fill="${flame ? "#5d2a18" : "#2a2420"}"/>
${flame ? [28, 40, 52, 66, 78, 90].map((x, i) => `<circle class="nta-glow ntd${(i % 3) + 1}" cx="${x}" cy="${89 + (i % 2)}" r="1.1" fill="#ff7043"/>`).join("") : ""}
</g>
<path d="M22 48 L40 48 L22 80 Z" fill="#fff" opacity=".07"/>
<rect x="16" y="100" width="88" height="5" rx="1" fill="#141517"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<rect x="${21 + i * 8}" y="101.6" width="5" height="1.8" rx=".5" fill="#050506"/>`).join("")}
${c.error ? `<circle cx="104" cy="16" r="6" fill="#e53935"/><path d="M104 12.4 V16.6 M104 18.8 V19.2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>` : ""}`;
}
// A wet-rotor circulator (#88), seen from the front: its round motor head in
// the maker's colour with the display and the LED ring, its cast body
// between two brass unions on the flow pipe, the return running behind.
const CIRC_COLORS = { grundfos: ["#e2363d", "#9d1a20"], wilo: ["#2fb36a", "#147a40"], dab: ["#3b6fd1", "#1d438f"], generic: ["#d6dbe0", "#8e98a3"] };
function ntCirculator(c) {
  const hd = ntId(), bd = ntId(), fc = ntId(), win = ntId();
  const [ca, cb] = CIRC_COLORS[c.model] || CIRC_COLORS.generic;
  const on = c.on && !c.fault && !c.nodata;
  const sp = Math.max(0.15, Math.min(1, c.speed === undefined || c.speed === null ? .6 : c.speed));
  const dur = (2.6 - 2.1 * sp).toFixed(2);
  const ringCol = c.fault ? "#ff3b30" : on ? "#4cff7a" : "#59626e";
  const seg = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 90) * Math.PI / 180, a2 = a + 0.36;
    const r = 19.5, x1 = 60 + r * Math.cos(a), y1 = 55 + r * Math.sin(a), x2 = 60 + r * Math.cos(a2), y2 = 55 + r * Math.sin(a2);
    const op = on ? (0.25 + 0.75 * (i / 11)).toFixed(2) : c.fault ? "1" : ".55";
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${ringCol}" stroke-opacity="${op}" stroke-width="2.4" stroke-linecap="round" fill="none"/>`;
  }).join("");
  const blades = [0, 60, 120, 180, 240, 300].map((d) => `<path d="M60 92 q3 -2.2 6.4 -1 q-3 1.2 -6.4 1z" transform="rotate(${d} 60 92)" fill="#c7ccd2"/>`).join("");
  const txt = c.nodata ? "- - -" : c.fault ? "E" : c.lcd || "";
  return `<defs>${ntV(hd, ca, cb)}${ntV(bd, "#4a525c", "#1f2429")}<radialGradient id="${fc}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#2a3038"/><stop offset="1" stop-color="#0b0e12"/></radialGradient><radialGradient id="${win}" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#5e6a76"/><stop offset="1" stop-color="#1b2026"/></radialGradient></defs><g transform="translate(0 -8)">
${htPipe([[-4, 118], [124, 118]], HT_COLD, 5.5)}${on ? htFlow("M124 118 H-4") : ""}
${htPipe([[-4, 92], [30, 92]], HT_HOT, 8)}${htPipe([[90, 92], [124, 92]], HT_HOT, 8)}${on ? htFlow("M-4 92 H30") + htFlow("M90 92 H124") : ""}
<path d="M23 83 h9 l1.5 2 v14 l-1.5 2 h-9 l-1.5 -2 v-14z M88 83 h9 l1.5 2 v14 l-1.5 2 h-9 l-1.5 -2 v-14z" fill="#c9a227" stroke="#7a5f0e" stroke-width=".5"/>
<path d="M25.5 83v18M29.5 83v18M90.5 83v18M94.5 83v18" stroke="#9a7020" stroke-width=".5"/>
<path d="M33 84 Q33 80 37 80 H83 Q87 80 87 84 V100 Q87 105 82 105 H38 Q33 105 33 100 Z" fill="url(#${bd})"/>
<rect x="36" y="81.5" width="48" height="2.2" rx="1.1" fill="#fff" opacity=".18"/>
<circle cx="60" cy="92" r="8.6" fill="#11151a"/><circle cx="60" cy="92" r="7.4" fill="url(#${win})"/>
<g class="${on ? "nta-spin" : ""}" style="animation-duration:${dur}s">${blades}<circle cx="60" cy="92" r="1.6" fill="#8b949e"/></g>
<circle cx="60" cy="92" r="7.4" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width=".8"/>
<rect x="31" y="22" width="58" height="60" rx="16" fill="#000" opacity=".18" transform="translate(1.5 2)"/>
<rect x="31" y="22" width="58" height="60" rx="16" fill="url(#${hd})"/>
<rect x="35" y="25" width="50" height="5" rx="2.5" fill="#fff" opacity=".22"/>
<circle cx="60" cy="55" r="23" fill="#000" opacity=".15"/>
<circle cx="60" cy="55" r="22" fill="url(#${fc})" stroke="#000" stroke-opacity=".35"/>
<g class="${on ? "nta-spin" : c.fault ? "nta-blinkfast" : ""}" style="${on ? `animation-duration:${(dur * 2.2).toFixed(2)}s` : ""}">${seg}</g>
${ntLcd(45, 49, 30, 12, txt, on || c.fault, c.fault ? "#ff8a80" : "#7fe3ff", ntFit(txt, 30, 9))}
${c.mode ? `<text x="60" y="70" font-size="5.5" text-anchor="middle" fill="#9fb3c8" ${NT_FONT}>${esc(c.mode)}</text>` : ""}
<circle cx="60" cy="76.5" r="2.4" fill="#000" opacity=".35"/><circle cx="60" cy="76" r="2" fill="${cb}"/>
${c.nodata ? `<g transform="translate(78 26)"><circle r="6" fill="#607d8b"/><path d="M-2.6 -3 l5.2 6 M2.6 -3 l-5.2 6" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/></g>` : ""}
${c.fault ? `<g transform="translate(80 26)" class="nta-blinkfast"><path d="M0 -6.5 L6.5 5 H-6.5 Z" fill="#ff3b30" stroke="#fff" stroke-width=".8"/><text y="3.6" font-size="7" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>!</text></g>` : ""}</g>`;
}
// A spool seen from the front, standing on its rollers: the wound filament
// between its two flanges, edge on. Its stripes hardly move as it turns, so a
// sheen rolls down it.
function fdSpool(x, y, w, h, color, i) {
  let lines = "";
  for (let k = 1; k < Math.floor((w - 7) / 1.6); k++) lines += `<rect x="${x + 3.5 + k * 1.6}" y="${y + 4}" width=".45" height="${h - 8}" fill="#000" opacity=".13"/>`;
  return `<clipPath id="fd-c${i}"><rect x="${x + 3.5}" y="${y + 4}" width="${w - 7}" height="${h - 8}"/></clipPath>`
    + `<rect x="${x + 3.5}" y="${y + 4}" width="${w - 7}" height="${h - 8}" fill="${esc(color)}"/>${lines}`
    + `<rect x="${x + 3.5}" y="${y + 4}" width="${w - 7}" height="${h - 8}" fill="url(#fd-cyl)"/>`
    + `<g clip-path="url(#fd-c${i})"><rect class="nt-run ntfd-roll" x="${x + 3.5}" y="${y - 14}" width="${w - 7}" height="10" fill="#fff" opacity=".28"/></g>`
    + `<rect x="${x}" y="${y}" width="4" height="${h}" rx="2" fill="url(#fd-flg)"/><rect x="${x + w - 4}" y="${y}" width="4" height="${h}" rx="2" fill="url(#fd-flg)"/>`
    + `<rect x="${x + w / 2 - 5}" y="${y + h + .5}" width="10" height="3" rx="1.5" fill="#6a7178"/>`;
}
// A filament dryer from the front (#93): as wide as its spools, a window on
// them, its screen below.
function ntFilamentDryer(c) {
  const n = c.count;
  const colors = c.colors;
  const SW = 26, G = 4, M = 9, W = n * SW + (n - 1) * G + 2 * M, H = 132, cx = W / 2;
  let spools = "";
  for (let i = 0; i < n; i++) spools += fdSpool(M + i * (SW + G), 10, SW, 59, colors[i % colors.length], i);
  const heat = [.2, .42, .62, .82].slice(0, n === 1 ? 2 : 4).map((k, i) => `<path class="ntfd-h ntd${i + 1}" d="M${k * W} -3 q-3 -4 0 -8"/>`).join("");
  const lw = n === 1 ? 38 : 44;
  return `<defs><linearGradient id="fd-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfcfc"/><stop offset="1" stop-color="#d5dade"/></linearGradient>
    <linearGradient id="fd-cyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset=".3" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".48"/></linearGradient>
    <linearGradient id="fd-flg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23272c"/><stop offset=".35" stop-color="#6a7178"/><stop offset="1" stop-color="#1b1e22"/></linearGradient></defs>
    <g transform="translate(${((120 - W * .9) / 2).toFixed(1)} 3) scale(.9)"><g class="nt-run">${heat}</g>
    <rect x="1" y="1" width="${W - 2}" height="${H - 12}" rx="9" fill="url(#fd-body)" stroke="#a7adb3"/><rect x="5" y="5" width="${W - 10}" height="71" rx="6" fill="#20242a"/>${spools}
    <path d="M9 9 L${Math.min(36, W * .34)} 9 L18 72 L9 72 Z" fill="#fff" opacity=".06"/>
    <rect x="${cx - lw / 2}" y="83" width="${lw}" height="26" rx="3" fill="#102027"/>
    <text x="${cx}" y="94" text-anchor="middle" font-size="9" font-family="monospace" fill="${c.on ? "#ff9800" : "#78909c"}">${esc(c.lcd || "--")}</text>
    <text x="${cx}" y="105" text-anchor="middle" font-size="8" font-family="monospace" fill="#4fc3f7">${esc(c.hum || "")}</text>
    ${W > 80 ? `<circle cx="${cx - 32}" cy="96" r="4" fill="#cfd4d8" stroke="#9aa1a8" stroke-width=".6"/>` : ""}
    <circle cx="${n === 1 ? cx : W - 7}" cy="${n === 1 ? 79.5 : 96}" r="${n === 1 ? 1.6 : 2.2}" class="ntfd-led" fill="${c.on ? "#ff6d00" : "#9aa1a8"}"/>
    <rect x="${W * .12}" y="${H - 11}" width="14" height="4" rx="1.4" fill="#454b52"/><rect x="${W * .88 - 14}" y="${H - 11}" width="14" height="4" rx="1.4" fill="#454b52"/></g>`;
}
function ntHumidifier(c) {
  const id = (n) => `hu-${n}`;
  const on = c.on && !c.lifted && !c.empty;
  const lvl = Math.max(0, Math.min(1, c.mist === null || c.mist === undefined ? .5 : c.mist));
  const lift = c.lifted ? -13 : 0;
  const L = c.empty ? .06 : Math.max(.06, Math.min(1, c.water === null || c.water === undefined ? .6 : c.water));
  const f = (v) => v.toFixed(1);
  // A squircle seen from above, a flattened rounded square.
  const sq = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)} C${f(cx - rx)} ${f(cy - ry * .95)} ${f(cx - rx * .62)} ${f(cy - ry)} ${f(cx)} ${f(cy - ry)} C${f(cx + rx * .62)} ${f(cy - ry)} ${f(cx + rx)} ${f(cy - ry * .95)} ${f(cx + rx)} ${f(cy)} C${f(cx + rx)} ${f(cy + ry * .95)} ${f(cx + rx * .62)} ${f(cy + ry)} ${f(cx)} ${f(cy + ry)} C${f(cx - rx * .62)} ${f(cy + ry)} ${f(cx - rx)} ${f(cy + ry * .95)} ${f(cx - rx)} ${f(cy)} Z`;
  const cx = 60, tY = 30, tR = 35, tr = 5.2, bY = 78, bR = 40, br = 6.6;
  const rAt = (y) => tR + (bR - tR) * (y - tY) / (bY - tY);
  const ryAt = (y) => tr + (br - tr) * (y - tY) / (bY - tY);
  const wy = bY - (bY - tY - 5) * L, wr = rAt(wy), wry = ryAt(wy);
  const body = (yTop, rTop) => `M${f(cx - rTop)} ${f(yTop)} L${f(cx - bR)} ${bY} C${f(cx - bR)} ${f(bY + br * .95)} ${f(cx - bR * .62)} ${f(bY + br)} ${cx} ${f(bY + br)} C${f(cx + bR * .62)} ${f(bY + br)} ${f(cx + bR)} ${f(bY + br * .95)} ${f(cx + bR)} ${bY} L${f(cx + rTop)} ${f(yTop)} Z`;
  const glow = c.night === "bright" ? .95 : c.night === "dim" ? .5 : 0;
  const n = Math.round(3 + lvl * 5);
  const dur = (3.8 - lvl * 1.8).toFixed(2);
  const puffs = on ? Array.from({ length: n }, (_, i) => {
    const off = [0, -5, 5, -2, 3, -6, 6, 1][i];
    return `<ellipse class="hu-puff" fill="url(#${id("pf")})" cx="${f(cx + off * .3)}" cy="18" rx="${f(5 + lvl * 4)}" ry="${f(3.6 + lvl * 2.6)}" style="--dx:${off * 1.6}px;--h:${(-22 - lvl * 14).toFixed(0)}px;animation-duration:${dur}s;--d0:${(i * dur / n).toFixed(2)}s"/>`;
  }).join("") : "";
  const btn = (x, y, a) => `<circle cx="${x}" cy="${y}" r="3.1" fill="url(#${id("bt")})" stroke="#cfd4d8" stroke-width=".4"/><circle cx="${x}" cy="${y}" r="1.2" fill="none" stroke="${a ? "#26a69a" : "#a9b0b7"}" stroke-width=".65"/>`;
  const dispOn = c.powered && c.display !== false && !c.lifted;
  const big = c.hum === null || c.hum === undefined ? "--" : String(Math.round(c.hum));
  const screen = dispOn ? `<text x="${cx}" y="107.4" font-size="12.5" font-weight="700" text-anchor="middle" fill="#e8f6ff" ${NT_FONT}>${big}</text><text x="${big.length > 2 ? 75 : 70.4}" y="102" font-size="4" fill="#9fb3c8" ${NT_FONT}>%</text>${c.level ? `<text x="46.4" y="107" font-size="4.6" text-anchor="middle" font-weight="700" fill="#7fe3ff" ${NT_FONT}>L${c.level}</text>` : ""}${c.empty ? `<path class="hu-blink" d="M74 103.6 q-2 2.4 -2 3.6 a2 2 0 0 0 4 0 q0 -1.2 -2 -3.6z" fill="#ff5252"/>` : ""}` : "";
  const baseBody = `M15 84 L15.6 110 C15.6 116.5 33 120.5 ${cx} 120.5 C87 120.5 104.4 116.5 104.4 110 L105 84 Z`;
  return `<defs>
<linearGradient id="${id("base")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfe3e6"/><stop offset=".18" stop-color="#fbfcfc"/><stop offset=".55" stop-color="#ffffff"/><stop offset=".85" stop-color="#e9ecee"/><stop offset="1" stop-color="#c4cacf"/></linearGradient>
<linearGradient id="${id("tank")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#596067" stop-opacity=".62"/><stop offset=".16" stop-color="#a9afb5" stop-opacity=".3"/><stop offset=".55" stop-color="#b9bec3" stop-opacity=".24"/><stop offset=".86" stop-color="#8d9399" stop-opacity=".34"/><stop offset="1" stop-color="#4c5258" stop-opacity=".68"/></linearGradient>
<linearGradient id="${id("water")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f86bd" stop-opacity=".82"/><stop offset=".22" stop-color="#6cc0ee" stop-opacity=".62"/><stop offset=".62" stop-color="#58b2e6" stop-opacity=".62"/><stop offset="1" stop-color="#23709f" stop-opacity=".85"/></linearGradient>
<linearGradient id="${id("tube")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5d656c" stop-opacity=".85"/><stop offset=".35" stop-color="#c9d0d6" stop-opacity=".7"/><stop offset=".7" stop-color="#9aa2a9" stop-opacity=".7"/><stop offset="1" stop-color="#50585f" stop-opacity=".85"/></linearGradient>
<linearGradient id="${id("lid")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a9afb5"/><stop offset=".3" stop-color="#eef0f2"/><stop offset=".7" stop-color="#dfe2e5"/><stop offset="1" stop-color="#9aa1a7"/></linearGradient>
<linearGradient id="${id("noz")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d5d9dd"/></linearGradient>
<radialGradient id="${id("bt")}" cx=".4" cy=".35"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6e9eb"/></radialGradient>
<radialGradient id="${id("nl")}" gradientUnits="userSpaceOnUse" cx="60" cy="83" r="44"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".95"/><stop offset=".35" stop-color="#ffc56b" stop-opacity=".55"/><stop offset=".75" stop-color="#ffb74d" stop-opacity=".12"/><stop offset="1" stop-color="#ffb74d" stop-opacity="0"/></radialGradient>
<filter id="${id("led")}" x="-80%" y="-200%" width="260%" height="500%"><feGaussianBlur stdDeviation="1.1"/></filter>
<radialGradient id="${id("pf")}"><stop offset="0" stop-color="#4fb0ee" stop-opacity=".95"/><stop offset=".6" stop-color="#84caf3" stop-opacity=".62"/><stop offset="1" stop-color="#b7e3fa" stop-opacity="0"/></radialGradient>
<filter id="${id("sh")}" x="-20%" y="-120%" width="140%" height="340%"><feGaussianBlur stdDeviation="1.5"/></filter>
</defs>
<ellipse cx="${cx}" cy="119" rx="45" ry="4.4" fill="#000" opacity=".4" filter="url(#${id("sh")})"/>
<path d="${baseBody}" fill="url(#${id("base")})" stroke="#c5cacf" stroke-width=".4"/>
<path d="${sq(cx, 84, 45, 7)}" fill="#f6f7f8" stroke="#d3d7db" stroke-width=".4"/>
${c.lifted ? `<path d="${sq(cx, 84, 37, 5.4)}" fill="#c9ced2"/><path d="${sq(cx, 84.4, 33, 4.4)}" fill="#aab0b6"/><ellipse cx="${cx}" cy="84" rx="6" ry="2" fill="#6d747b"/>` : ""}
${btn(27, 98, c.on)}${btn(27.6, 107.5, false)}${btn(93, 98, on)}${btn(92.4, 107.5, c.night && c.night !== "off")}
<rect x="38" y="94.5" width="44" height="17" rx="4" fill="#0c1014" stroke="#2b3138" stroke-width=".4"/><rect x="39" y="95.3" width="42" height="5.6" rx="2.8" fill="#fff" opacity=".06"/>${screen}
<g transform="translate(0 ${lift})">
<path d="${sq(cx, bY, bR, br)}" fill="#59626b" opacity=".55"/>
<path d="${body(tY, tR)}" fill="url(#${id("tank")})" stroke="#2b3035" stroke-opacity=".55" stroke-width=".4"/>
<rect x="55.5" y="${tY}" width="9" height="${bY - tY - 3}" fill="url(#${id("tube")})"/>
<path d="${sq(cx, bY - 2.4, 9.5, 2.4)}" fill="#8f979e" stroke="#646c73" stroke-width=".3"/>
<rect x="56" y="${bY - 8}" width="8" height="6" rx="1" fill="#8f979e"/>
<path d="${body(wy, wr)}" fill="url(#${id("water")})"/>
<path d="${sq(cx, wy, wr, wry)}" fill="#d3eefc" fill-opacity=".62" stroke="#fff" stroke-opacity=".55" stroke-width=".5"/>
${on && !c.empty ? [[-5, 0], [4.5, .9], [-1.5, 1.8]].map(([x, d]) => `<circle class="hu-bub" cx="${cx + x}" cy="${bY - 3}" r="1" fill="#fff" fill-opacity=".8" style="--h:${f(wy - bY + 6)}px;--d0:${d}s"/>`).join("") : ""}
${glow ? `<path d="${body(tY, tR)}" fill="url(#${id("nl")})" opacity="${glow}"/><ellipse cx="${cx}" cy="${bY - 1}" rx="13" ry="2.6" fill="#fff3cf" opacity="${(glow * .95).toFixed(2)}" filter="url(#${id("led")})"/>` : ""}
<path d="M${cx - tR + 4.6} ${tY + 6} Q${cx - bR + 5} 58 ${cx - bR + 5.4} ${bY - 3}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.2" stroke-linecap="round"/>
<path d="M${cx + tR - 3} ${tY + 8} L${cx + bR - 3.4} ${bY - 9}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.3" stroke-linecap="round"/>
<path d="M${cx - tR} ${tY} v2.4 C${cx - tR} ${tY + 7.6} ${cx - tR * .62} ${tY + 7.6} ${cx} ${tY + 7.6} C${cx + tR * .62} ${tY + 7.6} ${cx + tR} ${tY + 7.6} ${cx + tR} ${tY + 2.4} V${tY} Z" fill="url(#${id("lid")})"/>
<path d="${sq(cx, tY, tR, tr)}" fill="url(#${id("lid")})" stroke="#8f969c" stroke-width=".35"/>
<ellipse cx="${cx}" cy="${tY - .6}" rx="12" ry="2.8" fill="#000" opacity=".16"/>
<path d="M48.6 ${tY - 1.6} Q49.4 21.6 ${cx} 21.4 Q70.6 21.6 71.4 ${tY - 1.6} Q${cx} ${tY + 2} 48.6 ${tY - 1.6} Z" fill="url(#${id("noz")})" stroke="#c5cacf" stroke-width=".35"/>
<ellipse cx="${cx}" cy="23.2" rx="3.4" ry="1.05" fill="#5a636c"/>
<g>${puffs}</g>
</g>
${c.lifted ? `<g class="hu-blink" transform="translate(104 66)"><path d="M0 -8 L8 6 H-8 Z" fill="#ff3b30" stroke="#fff" stroke-width=".9"/><text y="4.4" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>!</text></g>` : ""}
${c.empty ? `<g class="hu-blink" transform="translate(106 44)"><circle r="8" fill="#ff3b30" stroke="#fff" stroke-width=".9"/><path d="M0 -5 q-3.6 4.2 -3.6 6.2 a3.6 3.6 0 0 0 7.2 0 q0 -2 -3.6 -6.2z" fill="#fff"/></g>` : ""}`;
}
// The temperature and humidity sensors. The ones lying flat use the streaming
// boxes' three-quarter view; the ones with a screen stand almost facing us, so
// that their digits can be read.
const THS_WHITE = ["#b9bdc3", "#e9ebee", "#f4f5f7", "#b4b8be", "#858a91"];
const thsGrad = (id) => `<radialGradient id="${id}" cx=".4" cy=".35" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e4e6ea"/></radialGradient>`;
// A thermometer filled up to its temperature.
function thsThermo(s, c) {
  const col = thsColor(c), lvl = c === null || c === undefined ? .25 : Math.max(.12, Math.min(1, (c + 5) / 40));
  const H = s * 1.5, W = s * .36, R = s * .42, top = -H * .62, foot = H * .38, inner = W * .42, y0 = foot - (foot - top) * lvl;
  return `<path d="M${-W / 2} ${top} a${W / 2} ${W / 2} 0 0 1 ${W} 0 V${foot - R * .55} A${R} ${R} 0 1 1 ${-W / 2} ${foot - R * .55} Z" fill="none" stroke="#a9aeb5" stroke-width="${s * .09}"/><circle cy="${foot + R * .28}" r="${R * .62}" fill="${col}"/><rect x="${-inner / 2}" y="${y0}" width="${inner}" height="${foot - y0 + R * .2}" rx="${inner / 2}" fill="${col}"/>`;
}
// Seven-segment digits.
const THS_SEG = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g", " ": "" };
function thsDigit(ch, x, y, w, h, col, ghost) {
  const t = Math.max(.9, w * .2), m = y + h / 2, g = t * .14;
  const S = { a: [[x + g, y], [x + w - g, y], [x + w - t - g, y + t], [x + t + g, y + t]], d: [[x + t + g, y + h - t], [x + w - t - g, y + h - t], [x + w - g, y + h], [x + g, y + h]],
    g: [[x + t * .6, m], [x + t, m - t / 2], [x + w - t, m - t / 2], [x + w - t * .6, m], [x + w - t, m + t / 2], [x + t, m + t / 2]], f: [[x, y + g], [x + t, y + t + g], [x + t, m - t / 2 - g], [x, m - g]],
    e: [[x, m + g], [x + t, m + t / 2 + g], [x + t, y + h - t - g], [x, y + h - g]], b: [[x + w, y + g], [x + w, m - g], [x + w - t, m - t / 2 - g], [x + w - t, y + t + g]], c: [[x + w, m + g], [x + w, y + h - g], [x + w - t, y + h - t - g], [x + w - t, m + t / 2 + g]] };
  const on = THS_SEG[ch] || "";
  return Object.keys(S).map((k) => on.includes(k) || ghost ? `<polygon points="${S[k].map((p) => p.map((v) => +v.toFixed(2)).join(",")).join(" ")}" fill="${on.includes(k) ? col : ghost}"/>` : "").join("");
}
// A reading centred on cx: two digits at least, a minus sign or a hundreds
// digit taking a third place, then its tenths and its unit.
function thsNumber(v, cx, y, big, col, ghost, unit) {
  const w = big * .56, gp = big * .12, sw = big * .32, sh = big * .56, uw = Math.max(sw, big * (unit === "%" ? .34 : .44));
  let cells = "--", dec = null;
  if (v !== null && v !== undefined) { const [a, b] = Math.abs(v).toFixed(1).split("."); cells = (v < 0 && (+a || +b) ? "-" : "") + a; dec = b; }
  cells = cells.padStart(2, " ");
  const n = cells.length, x = cx - (n * w + (n - 1) * gp + big * .14 + uw) / 2, sx = x + n * w + (n - 1) * gp + big * .14;
  const out = [...cells].map((ch, i) => thsDigit(ch, x + i * (w + gp), y, w, big, col, ghost)).join("");
  if (dec === null) return out;
  return `${out}<circle cx="${+(sx - big * .08).toFixed(2)}" cy="${+(y + big * .96).toFixed(2)}" r="${+(big * .05).toFixed(2)}" fill="${col}"/>${thsDigit(dec, sx, y + big - sh, sw, sh, col, ghost)}<text x="${+(sx + sw * .02).toFixed(2)}" y="${+(y + big * .34).toFixed(2)}" font-size="${+(big * .32).toFixed(2)}" font-weight="500" fill="${col}" ${NT_FONT}>${unit}</text>`;
}
const thsSignal = (x, y, c) => [0, 1, 2, 3].map((i) => `<rect x="${x + i * 2}" y="${+(y + 3.6 - i * 1.2).toFixed(2)}" width="1.2" height="${+(1.4 + i * 1.2).toFixed(2)}" fill="${c}"/>`).join("");
const thsBattery = (x, y, c, lvl) => `<rect x="${x}" y="${y}" width="9" height="4.6" fill="none" stroke="${c}" stroke-width=".6"/><rect x="${x + 9.2}" y="${y + 1.3}" width=".9" height="2" fill="${c}"/>${[...Array(Math.round(lvl * 4))].map((_, i) => `<rect x="${+(x + 1 + i * 1.95).toFixed(2)}" y="${y + 1}" width="1.5" height="2.6" fill="${c}"/>`).join("")}`;
const thsDrop = (x, y, s, c) => `<path d="M${x} ${y - s} C${x + s * .3} ${y - s * .4} ${x + s * .75} ${y - s * .1} ${x + s * .75} ${y + s * .35} A${s * .75} ${s * .75} 0 0 1 ${x - s * .75} ${y + s * .35} C${x - s * .75} ${y - s * .1} ${x - s * .3} ${y - s * .4} ${x} ${y - s} Z" fill="none" stroke="${c}" stroke-width=".7"/>`;
// A standing plate, turned a little to the left: its face, and its depth going
// back to the right and up, on the screen and not in the plane of its face.
const thsFace = (x, y, inner, k = 1.12) => `<g transform="matrix(${+(.92 * k).toFixed(3)} ${+(.1 * k).toFixed(3)} 0 ${k} ${x} ${y})">${inner}</g>`;
function thsDepth(x, y, shape, d, fill) { let o = ""; for (let i = d; i > 0; i -= .5) o += thsFace(+(x + .4 * i).toFixed(2), +(y - .22 * i).toFixed(2), shape(fill)); return o; }
const thsSide = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9dce0"/><stop offset=".55" stop-color="#b3b7bd"/><stop offset="1" stop-color="#8d9299"/></linearGradient>`;
const thsFront = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e1e4e8"/></linearGradient>`;
const thsLcd = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const thsBlur = (id) => `<filter id="${id}" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="2"/></filter>`;
const THS_INK = "#1d2124";
const THS_GHOST = "rgba(0,0,0,.055)";
function ntThsDisc(c) {
  const t = ntId();
  return `<defs>${thsGrad(t)}</defs>${strIsoDisc(60, 58, 33, 11, `url(#${t})`, THS_WHITE)}${strIsoTop(60, 58, `<g transform="rotate(-45)"><g transform="translate(0 -2) scale(1.55)">${thsThermo(7, c.tc)}</g><circle cy="15" r="1.1" fill="#555"/></g>`)}`;
}
function ntThsSquare(c) {
  const t = ntId(), g = strIsoGeom(60, 52, 60, 60, 3.5);
  return `<defs>${thsGrad(t)}</defs>${strIsoBox(g, 11, `url(#${t})`, THS_WHITE, .3)}${strIsoTop(60, 52, `<g transform="rotate(-45) scale(1.1)">${thsThermo(7, c.tc)}</g>`)}`;
}
function ntThsCushion(c) {
  const t = ntId(), g = strIsoGeom(60, 53, 62, 62, 15);
  return `<defs>${thsGrad(t)}</defs>${strIsoBox(g, 10, `url(#${t})`, THS_WHITE, .3)}${strIsoTop(60, 53, `<g transform="scale(1.75)">${thsThermo(7, c.tc)}</g><text x="6" y="26" font-size="5.2" fill="#9ea3a9" ${NT_FONT}>Aqara</text><circle cx="-23" cy="0" r=".9" fill="#43a047"/>`)}`;
}
function ntThsStick(c) {
  const t = ntId(), g = strIsoGeom(62, 24, 26, 13, 4), p = g.P[0];
  return `<defs>${thsGrad(t)}</defs>${strIsoBox(g, 78, `url(#${t})`, THS_WHITE, .3)}${strIsoLeft(p[0] + 1, p[1] + 5, `<g transform="translate(11.5 26) scale(1.25)">${thsThermo(7, c.tc)}</g>${thsDrop(19, 10, 2.2, "#8a8f96")}<path d="M9 60 q2.6 -2.2 5.2 0 M10.3 62 q1.3 -1.1 2.6 0" fill="none" stroke="#9ea3a9" stroke-width=".7"/><circle cx="11.6" cy="64" r=".7" fill="#9ea3a9"/>`)}`;
}
function ntThsLcdStand(c) {
  const X = 21, Y = 13, shape = (f) => `<rect width="70" height="70" rx="12" fill="${f}"/>`, s = ntId(), t = ntId(), e = ntId(), bl = ntId();
  return `<defs>${c.unav ? thsLcd(s, "#5c6063", "#46494c") : thsLcd(s, "#c9cfc9", "#a7aea8")}${thsFront(t)}${thsSide(e)}${thsBlur(bl)}</defs>
${thsFace(X + 3, Y, `<rect x="0" y="67" width="76" height="7" rx="3.5" fill="#000" opacity=".32" filter="url(#${bl})"/>`)}
<path d="M90 70 L109 96 L105 98.6 L90 84 Z" fill="#c4c8cd"/><path d="M109 96 L105 98.6" stroke="#8d9299" stroke-width="1" stroke-linecap="round"/>
${thsDepth(X, Y, shape, 13, `url(#${e})`)}${thsFace(X, Y, `${shape(`url(#${t})`)}<rect x="5" y="5" width="60" height="60" rx="8.5" fill="#8f958f"/><rect x="5.6" y="5.6" width="58.8" height="58.8" rx="8" fill="url(#${s})"/>${c.unav ? "" : `${thsSignal(10, 10, THS_INK)}${thsBattery(50, 10, THS_INK, c.b)}${thsNumber(c.t, 35, 18, 20, THS_INK, THS_GHOST, c.unit)}<path d="M9 42 H61" stroke="${THS_INK}" stroke-width=".5"/>${thsDrop(11, 51, 2.6, THS_INK)}${thsNumber(c.h, 40, 44.5, 17, THS_INK, THS_GHOST, "%")}`}`)}`;
}
function ntThsLcdProbe(c) {
  const X = 22, Y = 15, shape = (f) => `<rect width="66" height="66" rx="12" fill="${f}"/>`, hook = (f) => `<path d="M26 2 C26 -7 40 -7 40 2 Z" fill="${f}"/>`, s = ntId(), t = ntId(), e = ntId(), G = "#0f1f12";
  return `<defs>${c.unav ? thsLcd(s, "#5c6063", "#46494c") : thsLcd(s, "#c9dcb4", "#a6c08e")}${thsFront(t)}${thsSide(e)}</defs>
<path d="M62 86 C60 100 74 104 72 120" fill="none" stroke="#dfe2e6" stroke-width="2.6"/><path d="M62 86 C60 100 74 104 72 120" fill="none" stroke="#9aa0a6" stroke-width=".5" transform="translate(1 .4)"/>
${thsDepth(X, Y, hook, 9, `url(#${e})`)}${thsFace(X, Y, `${hook("#eef0f2")}<circle cx="33" cy="-1.6" r="1.8" fill="#6d7278"/>`)}
${thsDepth(X, Y, shape, 12, `url(#${e})`)}${thsFace(X, Y, `${shape(`url(#${t})`)}<rect x="6" y="5" width="54" height="46" rx="7" fill="#7f9272"/><rect x="6.6" y="5.6" width="52.8" height="44.8" rx="6.5" fill="url(#${s})"/>${c.unav ? "" : `${thsSignal(11, 9, G)}${thsBattery(44, 9, G, c.b)}${thsNumber(c.t, 33, 17, 20, G, "rgba(0,0,0,.05)", c.unit)}<text x="33" y="48" text-anchor="middle" font-size="7" font-weight="600" fill="${G}" ${NT_FONT}>${c.h === null || c.h === undefined ? "--" : c.h.toFixed(1)}%</text>`}<text x="33" y="60.5" font-size="6" text-anchor="middle" font-weight="700" fill="#858a91" ${NT_FONT}>SONOFF</text>`)}`;
}
function ntThsLcdRound(c) {
  const X = 21, Y = 15, shape = (f) => `<circle cx="35" cy="35" r="35" fill="${f}"/>`, s = ntId(), t = ntId(), e = ntId(), bl = ntId();
  return `<defs>${c.unav ? thsLcd(s, "#5c6063", "#46494c") : thsLcd(s, "#c9cfc9", "#a7aea8")}${thsFront(t)}${thsSide(e)}${thsBlur(bl)}</defs>
${thsFace(X + 2, Y, `<ellipse cx="38" cy="70" rx="24" ry="3.4" fill="#000" opacity=".32" filter="url(#${bl})"/>`)}
${thsDepth(X, Y, shape, 12, `url(#${e})`)}${thsFace(X, Y, `${shape(`url(#${t})`)}<circle cx="35" cy="35" r="28.5" fill="#8f958f"/><circle cx="35" cy="35" r="28" fill="url(#${s})"/>${c.unav ? "" : `${thsSignal(25, 11.5, THS_INK)}${thsBattery(35.5, 11.5, THS_INK, c.b)}${thsNumber(c.t, 35, 18, 15.5, THS_INK, THS_GHOST, c.unit)}<path d="M10 38 H60" stroke="${THS_INK}" stroke-width=".5"/>${thsNumber(c.h, 35, 41, 13, THS_INK, THS_GHOST, "%")}`}`)}`;
}
// Helpers of their own: a horizontal gradient, a blur, a colour made lighter
// (amt > 0) or darker (amt < 0).
const cvH = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;
const cvBlur = (id, s = 1.5) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${s}"/></filter>`;
const cvF = (n) => +n.toFixed(2);
function cvTone(hex, amt) {
  const h = String(hex || "#888888").replace("#", "");
  const v = [0, 2, 4].map((i) => parseInt(h.length === 3 ? h[i / 2] + h[i / 2] : h.slice(i, i + 2), 16) || 0);
  return "#" + v.map((x) => Math.max(0, Math.min(255, Math.round(amt > 0 ? x + (255 - x) * amt : x * (1 + amt)))).toString(16).padStart(2, "0")).join("");
}
// A plate turned a little to the left, its depth going back to the right.
const co2Face = (x, y, inner) => `<g transform="matrix(.92 .1 0 1 ${x} ${y})">${inner}</g>`;
function co2Depth(x, y, shape, d, fill) { let o = ""; for (let i = d; i > 0; i -= .5) o += co2Face(cvF(x + .4 * i), cvF(y - .22 * i), shape(fill)); return o; }
const co2Num = (v) => v === null || v === undefined ? "---" : String(Math.round(v));
// Aranet4: a square translucent white case, an e-ink screen with the
// temperature, the humidity and the CO2, the level boxes, and the green,
// yellow and red strip printed under the screen.
function ntCo2Eink(c) {
  const X = 23, Y = 16, s = ntId(), fr = ntId(), sd = ntId(), bl = ntId(), lv = co2LevelOf(c.co2, c.warn, c.alert);
  const shape = (fl) => `<rect width="68" height="68" rx="11" fill="${fl}"/>`;
  const box = (x, i) => `<rect x="${x}" y="40.2" width="9.6" height="2.8" rx=".4" fill="${!c.unav && c.co2 !== null && i === lv ? "#1c1c1c" : "#e4e6e1"}" stroke="#1c1c1c" stroke-width=".45"/>`;
  const ink = c.unav ? "#9aa09a" : "#1c1c1c";
  return `<defs>${ntV(s, "#e7e9e4", "#d9dcd6")}${cvH(fr, [[0, "#ffffff"], [1, "#e8ebee"]])}${cvH(sd, [[0, "#d9dce0"], [1, "#9ea4ab"]])}${cvBlur(bl, 2)}</defs>
${co2Face(X + 3, Y, `<rect x="0" y="66" width="72" height="6" rx="3" fill="#000" opacity=".28" filter="url(#${bl})"/>`)}
${co2Depth(X, Y, shape, 9, `url(#${sd})`)}
${co2Face(X, Y, `${shape(`url(#${fr})`)}
<path d="M8 9 h10 v6 h6 M54 12 h6 M50 58 h10 v-6 M10 52 h7 l3 3" fill="none" stroke="#9aa3ab" stroke-width=".6" opacity=".35"/>
<circle cx="9" cy="30" r="2.6" fill="none" stroke="#c4c9ce" stroke-width=".7"/><circle cx="59" cy="30" r="2.6" fill="none" stroke="#c4c9ce" stroke-width=".7"/>
<rect x="15.5" y="9" width="37" height="38" rx="1.6" fill="#b9bdb7"/><rect x="16.2" y="9.7" width="35.6" height="36.6" rx="1.2" fill="url(#${s})"/>
<text x="18" y="16.6" font-size="5" font-weight="700" fill="${ink}" ${NT_FONT}>${c.t === null || c.t === undefined ? "--" : c.t.toFixed(1)}\u00b0${c.unit === "\u00b0F" ? "F" : "C"}</text>
<text x="49.6" y="16.6" font-size="5" font-weight="700" text-anchor="end" fill="${ink}" ${NT_FONT}>${c.h === null || c.h === undefined ? "--" : Math.round(c.h)}</text>
<path d="M51.4 12.4 q-1.3 1.6 -1.3 2.4 a1.3 1.3 0 0 0 2.6 0 q0 -.8 -1.3 -2.4z" fill="${ink}"/>
<text x="34" y="33" font-size="${c.co2 >= 1000 ? 14 : 15.5}" font-weight="600" text-anchor="middle" fill="${ink}" ${NT_FONT}>${c.unav ? "---" : co2Num(c.co2)}</text>
<rect x="18" y="35.4" width="5" height="2.4" fill="none" stroke="${ink}" stroke-width=".4"/><rect x="18.5" y="35.9" width="${cvF(3.4 * (c.b === undefined ? 1 : c.b))}" height="1.4" fill="${ink}"/>
<text x="49.6" y="38" font-size="3" text-anchor="end" fill="${ink}" ${NT_FONT}>CO\u2082 ppm</text>
${box(18, 0)}${box(29.2, 1)}${box(40.4, 2)}
<rect x="18" y="47.6" width="9.6" height="1.6" fill="#3cb54a"/><rect x="29.2" y="47.6" width="9.6" height="1.6" fill="#f4c20d"/><rect x="40.4" y="47.6" width="9.6" height="1.6" fill="#e53935"/>
<text x="34" y="60" font-size="7.4" text-anchor="middle" fill="#3d4247" ${NT_FONT}>aranet<tspan font-weight="700">4</tspan></text>`)}`;
}
// AirGradient ONE: a white box on a wire stand, its row of LEDs telling the
// CO2 by their number and their colour, a small OLED screen.
function ntCo2Box(c) {
  const X = 19, Y = 20, fr = ntId(), sd = ntId(), bl = ntId(), gl = ntId(), lv = co2LevelOf(c.co2, c.warn, c.alert), col = CO2_COLORS[lv];
  const lit = c.unav || c.co2 === null || c.co2 === undefined ? 0 : Math.max(1, Math.min(11, Math.round(c.co2 / 2000 * 11)));
  const pulse = lv === 2 ? ` class="co2-pulse"` : "";
  const shape = (fl) => `<rect width="74" height="64" rx="7" fill="${fl}"/>`;
  const leds = [...Array(11)].map((_, i) => { const on = i < lit, x = 12 + i * 5; return `${on ? `<circle cx="${x}" cy="10" r="2.6" fill="${col}" opacity=".55" filter="url(#${gl})"${pulse}/>` : ""}<circle cx="${x}" cy="10" r="1.25" fill="${on ? col : "#dfe2e5"}"${on ? pulse : ""}/>`; }).join("");
  return `<defs>${cvH(fr, [[0, "#ffffff"], [1, "#e9ecef"]])}${cvH(sd, [[0, "#dcdfe3"], [1, "#a3a9b0"]])}${cvBlur(bl, 2)}${cvBlur(gl, 1.4)}</defs>
<path d="M76 74 L92 100 L88 102 L76 88 Z" fill="#b7bcc2"/><path d="M92 100 L88 102" stroke="#7d848b" stroke-width="1" stroke-linecap="round"/>
${co2Face(X + 3, Y, `<rect x="0" y="62" width="78" height="6" rx="3" fill="#000" opacity=".28" filter="url(#${bl})"/>`)}
${co2Depth(X, Y, shape, 12, `url(#${sd})`)}
${co2Face(X, Y, `${shape(`url(#${fr})`)}${leds}
<rect x="34" y="38" width="28" height="15" rx="1.4" fill="#0b0d0f"/>
${c.unav ? "" : `<text x="36" y="44.4" font-size="4.6" font-weight="700" fill="#fff" ${NT_FONT}>${co2Num(c.co2)}<tspan font-size="2.6" font-weight="400" dx=".6">ppm</tspan></text>
<text x="36" y="50.6" font-size="3.4" fill="#cfd8dc" ${NT_FONT}>${c.t === null || c.t === undefined ? "--" : c.t.toFixed(1)}\u00b0 ${c.h === null || c.h === undefined ? "--" : Math.round(c.h)}%</text>`}
<circle cx="15" cy="46" r="6" fill="none" stroke="#1f6fb2" stroke-width="1.1"/><path d="M11.6 47 q1.6 -3 3.4 0 t3.4 0" fill="none" stroke="#1f6fb2" stroke-width=".9"/>
<text x="10" y="57" font-size="3" fill="#1f6fb2" ${NT_FONT}>airgradient</text>`)}`;
}
// SwitchBot's meters (#121). Their screens: whole numbers right-aligned on x.
function sbInt(v, xr, y, big, col, ghost) {
  const w = big * .56, gp = big * .12, cells = v === null || v === undefined ? "--" : String(Math.round(v)).padStart(2, " ");
  const x0 = xr - (cells.length * w + (cells.length - 1) * gp);
  return [...cells].map((ch, i) => thsDigit(ch, x0 + i * (w + gp), y, w, big, col, ghost)).join("");
}
// Dry under 30 %, wet over 70 %, as SwitchBot shows it.
const sbComfort = (h) => h === null || h === undefined ? 1 : h < 30 ? 0 : h > 70 ? 2 : 1;
const sbClock = (c) => { const d = c.clock || {}; const p = (n) => String(n === undefined ? 0 : n).padStart(2, "0"); return { hm: `${p(d.h)}:${p(d.m)}`, dm: d.dm || `${d.mo || 1}/${d.d || 1}` }; };
// The fold-out stand, hinged at mid-height on the back and reaching back
// down to the table: its edge seen from the side, and its foot's shadow.
const sbStand = (xh, yh, xf, yf) => `<path d="M${xh - 1} ${yh - 5} L${xh + 7} ${yh - 6} L${xf + 4} ${yf - .5} L${xf - 5} ${yf + 1.5} Z" fill="#c4c8cd"/><path d="M${xh - 1} ${yh - 5} L${xh + 7} ${yh - 6} L${xh + 7.4} ${yh - 4.4} L${xh - .6} ${yh - 3.4} Z" fill="#e3e6e9"/><path d="M${xh + 7} ${yh - 6} L${xf + 4} ${yf - .5}" stroke="#eef0f2" stroke-width=".9"/><path d="M${xf + 4} ${yf - .5} L${xf - 5} ${yf + 1.5}" stroke="#8d9299" stroke-width="1.1" stroke-linecap="round"/>`;
const sbTri = (x, y, up, col) => `<path d="M${cvF(x)} ${y} l${up ? "-1.7 2.6 h3.4" : "-1.7 -2.6 h3.4"} z" fill="${col}"/>`;
// The Meter Pro and the Meter Pro CO2: a wide white case with a thick bezel,
// a large monochrome screen, a fold-out stand at the back. The CO2 one has
// the clock, a green, yellow and red strip with its pointer, the CO2 in big
// digits, a dry, comfortable or wet row and the temperature and humidity;
// the other one has the clock, the temperature and humidity in big digits
// and the orange, green and blue comfort strip.
function ntSbPro(c, co2) {
  const X = 17, Y = 15, W = 78, H = 70, s = ntId(), fr = ntId(), sd = ntId(), bl = ntId();
  const shape = (fl) => `<rect width="${W}" height="${H}" rx="14" fill="${fl}"/>`, ink = THS_INK, gh = "rgba(0,0,0,.05)", ck = sbClock(c), cf = sbComfort(c.h);
  let lcd = "";
  if (!c.unav) {
    const top = `<text x="27" y="15" font-size="7.4" font-weight="600" text-anchor="middle" fill="${ink}" ${NT_FONT}>${ck.hm}</text><text x="68" y="15" font-size="6.4" font-weight="600" text-anchor="end" fill="${ink}" ${NT_FONT}>${esc(ck.dm)}</text>`;
    if (co2) {
      const v = c.co2, w = numberOrNull(c.warn) || CO2_WARN, a = numberOrNull(c.alert) || CO2_ALERT, lv = co2LevelOf(v, c.warn, c.alert);
      const fr2 = v === null || v === undefined ? 0 : lv === 0 ? Math.max(0, (v - 400) / Math.max(1, w - 400)) : lv === 1 ? (v - w) / Math.max(1, a - w) : Math.min(1, (v - a) / Math.max(1, a));
      const px = 10 + (lv + Math.max(0, Math.min(1, fr2))) * 19.33;
      lcd = `${top}<rect x="10" y="18" width="19.33" height="2" fill="#3cb54a"/><rect x="29.33" y="18" width="19.33" height="2" fill="#f4c20d"/><rect x="48.66" y="18" width="19.34" height="2" fill="#e53935"/>
${v === null || v === undefined ? "" : sbTri(px, 20.6, true, ink)}<rect x="10" y="26" width="8" height="5" rx=".6" fill="none" stroke="${ink}" stroke-width=".55"/><text x="14" y="29.9" font-size="3.3" font-weight="700" text-anchor="middle" fill="${ink}" ${NT_FONT}>CO\u2082</text>
${v !== null && v !== undefined && Math.round(v) >= 1000 ? sbInt(v, 59, 25.5, 12.5, ink, gh) : sbInt(v, 59, 24, 15, ink, gh)}<text x="60.4" y="28" font-size="3.4" fill="${ink}" ${NT_FONT}>ppm</text>
<rect x="9.5" y="41" width="59" height="4" fill="none" stroke="${ink}" stroke-width=".45"/><path d="M29.2 41 V45 M48.8 41 V45" stroke="${ink}" stroke-width=".45"/>
${["DRY", "COMFORT", "WET"].map((l, i) => `<text x="${19.3 + i * 19.6}" y="44.2" font-size="2.6" font-weight="700" text-anchor="middle" fill="${ink}" ${NT_FONT}>${l}</text>`).join("")}${sbTri(19.3 + cf * 19.6, 45.7, true, ink)}
${thsNumber(c.t, 25, 49.5, 11, ink, gh, c.unit)}${sbInt(c.h, 58, 49.5, 11, ink, gh)}<text x="59" y="60.6" font-size="4.2" font-weight="600" fill="${ink}" ${NT_FONT}>%</text>`;
    } else {
      lcd = `${top}${thsNumber(c.t, 23, 21, 14.5, ink, gh, c.unit)}${sbInt(c.h, 63, 21, 14.5, ink, gh)}<text x="63.6" y="35" font-size="5" font-weight="600" fill="${ink}" ${NT_FONT}>%</text>
${[["#f57c00", "DRY"], ["#43a047", "COMFORT"], ["#1e88e5", "WET"]].map(([col, l], i) => `<rect x="${9.5 + i * 19.67}" y="47" width="19.67" height="5" fill="${col}"/><text x="${19.3 + i * 19.67}" y="50.6" font-size="3" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>${l}</text>`).join("")}${sbTri(19.3 + cf * 19.67, 46.3, false, ink)}`;
    }
  }
  return `<defs>${c.unav ? thsLcd(s, "#5c6063", "#46494c") : thsLcd(s, "#d5d8d2", "#bcc0ba")}${cvH(fr, [[0, "#ffffff"], [1, "#e9ecef"]])}${cvH(sd, [[0, "#dcdfe3"], [1, "#a3a9b0"]])}${cvBlur(bl, 2)}</defs>
${sbStand(80, 50, 101, 91)}
${co2Face(X + 3, Y, `<rect x="0" y="${H - 3}" width="${W + 16}" height="7" rx="3.5" fill="#000" opacity=".3" filter="url(#${bl})"/>`)}
${co2Depth(X, Y, shape, 12, `url(#${sd})`)}
${co2Face(X, Y, `${shape(`url(#${fr})`)}<rect x="5.4" y="5.4" width="${W - 10.8}" height="${H - 10.8}" rx="6" fill="#9a9f99"/><rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="5.5" fill="url(#${s})"/>${lcd}
<path d="M3 13 Q3 3 13 3 H40" stroke="#fff" stroke-width="1.4" opacity=".9" fill="none" stroke-linecap="round"/>`)}`;
}
// The Meter: a thick white square with a screen, battery, temperature and
// humidity. The Meter Plus: taller, on a stand, with its comfort face.
function ntSbMeter(c, plus) {
  const X = plus ? 28 : 26, Y = plus ? 14 : 22, W = plus ? 58 : 62, H = plus ? 70 : 62, s = ntId(), fr = ntId(), sd = ntId(), bl = ntId();
  const shape = (fl) => `<rect width="${W}" height="${H}" rx="${plus ? 12 : 11}" fill="${fl}"/>`, ink = THS_INK, gh = "rgba(0,0,0,.05)", cf = sbComfort(c.h);
  const L = plus ? [6, 6, 46, 58] : [7, 7, 48, 48];
  let lcd = "";
  if (!c.unav) {
    const face = plus ? `<circle cx="13" cy="12.6" r="3.3" fill="none" stroke="${ink}" stroke-width=".6"/><circle cx="11.8" cy="11.8" r=".45" fill="${ink}"/><circle cx="14.2" cy="11.8" r=".45" fill="${ink}"/>${cf === 1 ? `<path d="M11.4 13.6 Q13 15.1 14.6 13.6" fill="none" stroke="${ink}" stroke-width=".55"/>` : `<path d="M11.5 14.4 H14.5" stroke="${ink}" stroke-width=".55"/>`}<text x="13" y="19.4" font-size="2.5" font-weight="700" text-anchor="middle" fill="${ink}" ${NT_FONT}>${["DRY", "COMFORT", "WET"][cf]}</text>` : "";
    const bx = plus ? 40 : 43, by = plus ? 10 : 10.5, ty = plus ? 22 : 16, ly = plus ? 43 : 35.5, hy = plus ? 46 : 38.5, hx = plus ? 44 : 46;
    lcd = `${face}${thsBattery(bx, by, ink, c.b)}${thsNumber(c.t, plus ? 29 : 31, ty, 17, ink, gh, c.unit)}<path d="M${L[0] + 3} ${ly} H${L[0] + L[2] - 3}" stroke="${ink}" stroke-width=".5"/>${sbInt(c.h, hx, hy, 15, ink, gh)}<text x="${hx + .8}" y="${hy + 14.6}" font-size="4.6" font-weight="600" fill="${ink}" ${NT_FONT}>%</text>`;
  }
  return `<defs>${c.unav ? thsLcd(s, "#5c6063", "#46494c") : thsLcd(s, "#d5d8d2", "#bcc0ba")}${cvH(fr, [[0, "#ffffff"], [1, "#e9ecef"]])}${cvH(sd, [[0, "#dcdfe3"], [1, "#a3a9b0"]])}${cvBlur(bl, 2)}</defs>
${plus ? sbStand(72, 46, 93, 89) : ""}
${co2Face(X + 3, Y, `<rect x="0" y="${H - 3}" width="${W + (plus ? 16 : 4)}" height="7" rx="3.5" fill="#000" opacity=".3" filter="url(#${bl})"/>`)}
${co2Depth(X, Y, shape, plus ? 10 : 16, `url(#${sd})`)}
${co2Face(X, Y, `${shape(`url(#${fr})`)}<rect x="${L[0] - .6}" y="${L[1] - .6}" width="${L[2] + 1.2}" height="${L[3] + 1.2}" rx="5" fill="#9a9f99"/><rect x="${L[0]}" y="${L[1]}" width="${L[2]}" height="${L[3]}" rx="4.5" fill="url(#${s})"/>${lcd}
<path d="M3 12 Q3 3 12 3 H30" stroke="#fff" stroke-width="1.4" opacity=".9" fill="none" stroke-linecap="round"/>`)}`;
}
// The Indoor/Outdoor Meter: a small white case with no screen, its logo
// pressed into the front and a vent hole at the bottom, hanging from a wall
// hook by its grey strap.
function ntSbOutdoor(c) {
  const X = 42, Y = 40, W = 34, H = 62, fr = ntId(), sd = ntId(), bl = ntId(), hk = ntId();
  const shape = (fl) => `<rect width="${W}" height="${H}" rx="12" fill="${fl}"/>`;
  return `<defs>${cvH(fr, [[0, "#ffffff"], [1, "#e6e9ec"]])}${cvH(sd, [[0, "#dcdfe3"], [1, "#a3a9b0"]])}${cvBlur(bl, 2.4)}<radialGradient id="${hk}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".6" stop-color="#b9bfc5"/><stop offset="1" stop-color="#7d848b"/></radialGradient></defs>
<circle cx="74" cy="14" r="8" fill="url(#${hk})" stroke="rgba(0,0,0,.25)" stroke-width=".5"/><circle cx="74" cy="14" r="2" fill="#8d949b"/>
<path d="M71 18 C64 24 66 34 70.5 41.5" fill="none" stroke="#9aa0a6" stroke-width="2.2" stroke-linecap="round"/><path d="M77 18 C80 26 77 35 72.5 41.5" fill="none" stroke="#8a9096" stroke-width="2.2" stroke-linecap="round"/>
${co2Face(X + 7, Y + 3, `<rect x="0" y="2" width="${W}" height="${H}" rx="12" fill="#000" opacity=".22" filter="url(#${bl})"/>`)}
${co2Depth(X, Y, shape, 13, `url(#${sd})`)}
${co2Face(X, Y, `${shape(`url(#${fr})`)}
<path d="M17 18.5 a3.6 3.6 0 0 1 3.6 3.6 c0 1.6 -1 2.6 -2 3.2 v4.4 h-3.2 v-4.4 c-1 -.6 -2 -1.6 -2 -3.2 a3.6 3.6 0 0 1 3.6 -3.6 z" fill="#e3e6ea" stroke="#c4c9ce" stroke-width=".5"/><path d="M14.2 21 a3 3 0 0 1 2.4 -1.8" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>
<circle cx="17" cy="54" r="1.4" fill="#3b4148"/><path d="M4 12 Q4 4 12 4" stroke="#fff" stroke-width="1.4" opacity=".9" fill="none" stroke-linecap="round"/>`)}`;
}
function ntCo2Netatmo(c, extra) {
  const ratio = extra ? 2.04 : 3.44, slot = extra ? [.22, .78] : [.175, .84];
  const CX = 62, RX = 26, RY = 6.5, BASE_BOT = 288, FOOT = BASE_BOT - 10, TOP = BASE_BOT - ratio * RX * 2 + RY, H = FOOT - TOP;
  const sy1 = TOP + H * slot[0], sw = 4.2, sx = CX + RX * .25, sh = H * (slot[1] - slot[0]);
  const bd = ntId(), ft = ntId(), sl = ntId(), bs = ntId(), cp = ntId(), b1 = ntId(), b2 = ntId(), ck = ntId();
  const pal = NETATMO_COLORS[c.body] || NETATMO_COLORS.aluminium;
  const stops = pal.map((col, i, a) => `<stop offset="${(i / (a.length - 1)).toFixed(3)}" stop-color="${col}"/>`).join("");
  const lv = co2LevelOf(c.co2, c.warn, c.alert), col = c.unav || c.co2 === null || c.co2 === undefined ? null : CO2_COLORS[lv], pulse = lv === 2 ? ` class="co2-pulse"` : "";
  const body = `M ${CX - RX} ${TOP} L ${CX - RX} ${FOOT} A ${RX} ${RY} 0 0 0 ${CX + RX} ${FOOT} L ${CX + RX} ${TOP} Z`;
  const base = `M ${CX - RX} ${FOOT} L ${CX - RX} ${BASE_BOT} A ${RX} ${RY} 0 0 0 ${CX + RX} ${BASE_BOT} L ${CX + RX} ${FOOT} A ${RX} ${RY} 0 0 1 ${CX - RX} ${FOOT} Z`;
  const k = extra ? .78 : .6, tx = 60 - CX * k, ty = 116 - (BASE_BOT + 6) * k;
  return `<defs><linearGradient id="${bd}" x1="0" y1="0" x2="1" y2="0">${stops}</linearGradient>${ntV(ft, "rgba(0,0,0,0)", "rgba(0,0,0,.16)")}
<linearGradient id="${sl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${pal[0]}"/><stop offset=".4" stop-color="${pal[2]}"/><stop offset=".8" stop-color="${pal[3]}"/><stop offset="1" stop-color="${pal[3]}"/></linearGradient>
${cvH(bs, [[0, "#d3d7da"], [.3, "#fbfcfc"], [.62, "#eef0f1"], [1, "#cfd3d6"]])}<radialGradient id="${cp}" cx=".4" cy=".28" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#f4f6f7"/><stop offset="1" stop-color="#dde1e3"/></radialGradient>
${cvBlur(b1, 5)}${cvBlur(b2, 2.4)}<clipPath id="${ck}"><path d="${body}"/></clipPath></defs>
<g transform="translate(${cvF(tx)} ${cvF(ty)}) scale(${k})">
<ellipse cx="${CX}" cy="${BASE_BOT + 6}" rx="${RX + 7}" ry="4.5" fill="#000" opacity=".16" filter="url(#${b2})"/>
<path d="${base}" fill="url(#${bs})"/><path d="${base}" fill="none" stroke="#000" stroke-opacity=".14" stroke-width=".7"/>
<path d="${body}" fill="url(#${bd})"/><g clip-path="url(#${ck})"><rect x="${CX - RX}" y="${FOOT - 26}" width="${RX * 2}" height="${26 + RY}" fill="url(#${ft})"/></g>
<rect x="${cvF(sx - sw / 2 - .7)}" y="${cvF(sy1 - .7)}" width="${sw + 1.4}" height="${cvF(sh + 1.4)}" rx="${cvF(sw / 2 + .7)}" fill="#000" opacity=".1"/>
<rect x="${cvF(sx - sw / 2)}" y="${cvF(sy1)}" width="${sw}" height="${cvF(sh)}" rx="${cvF(sw / 2)}" fill="url(#${sl})"/>
<rect x="${cvF(sx - sw / 2)}" y="${cvF(sy1)}" width="1.5" height="${cvF(sh)}" rx=".75" fill="#000" opacity=".34"/>
${col ? `<rect${pulse} x="${cvF(sx - sw / 2 - 3.5)}" y="${cvF(sy1 - 3.5)}" width="${sw + 7}" height="${cvF(sh + 7)}" rx="${cvF(sw / 2 + 3.5)}" fill="${col}" opacity=".55" filter="url(#${b1})"/>
<rect${pulse} x="${cvF(sx - sw / 2 + .45)}" y="${cvF(sy1 + .45)}" width="${sw - .9}" height="${cvF(sh - .9)}" rx="${cvF(sw / 2 - .45)}" fill="${col}" opacity=".9"/>` : ""}
<path d="${body}" fill="none" stroke="#000" stroke-opacity=".18" stroke-width=".7"/>
<ellipse cx="${CX}" cy="${TOP}" rx="${RX}" ry="${RY}" fill="url(#${cp})"/>
<ellipse cx="${CX}" cy="${TOP}" rx="${RX - 3.4}" ry="${RY - 1}" fill="none" stroke="#000" stroke-opacity=".09" stroke-width=".6"/>
<path d="M ${CX - RX} ${TOP} A ${RX} ${RY} 0 0 0 ${CX + RX} ${TOP}" fill="none" stroke="#000" stroke-opacity=".13" stroke-width=".7"/>
<path d="M ${CX - RX + 5} ${TOP - 3} A ${RX - 5} ${RY - 2.6} 0 0 1 ${CX + 2} ${TOP - 4.6}" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.3" stroke-linecap="round"/></g>`;
}

// The window in a wall and the garden in its glass.
function cvGlass(x0, y0, x1, y1, gid) {
  return `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#${gid})"/>
<path d="M${x0} ${y1 - 14} q${cvF((x1 - x0) * .25)} -8 ${cvF((x1 - x0) * .5)} -3 t${cvF((x1 - x0) * .5)} -2 V${y1} H${x0} Z" fill="#7cae7a" opacity=".85"/>
<path d="M${x0 + 6} ${y1 - 2} L${x0 + 22} ${y0 + 4} M${x0 + 14} ${y1 - 2} L${x0 + 26} ${y0 + 20}" stroke="#fff" stroke-opacity=".35" stroke-width="2.2"/>`;
}
const cvFacade = (fid) => `<rect x="-6" y="-10" width="132" height="135" fill="url(#${fid})"/>${[8, 30, 52, 74, 96, 118].map((y) => `<path d="M-6 ${y} H126" stroke="#000" stroke-opacity=".025" stroke-width="1"/>`).join("")}`;
const cvDir = (c) => c.moving === "opening" ? "up" : c.moving === "closing" ? "down" : "";
const cvArrow = (dir, x = 108, y = 6) => !dir ? "" : `<g class="cv-arrow" transform="translate(${x} ${y})"><circle r="7" fill="#1e88e5"/><path d="${dir === "up" ? "M-3.4 1.6 L0 -2 L3.4 1.6" : "M-3.4 -1.6 L0 2 L3.4 -1.6"}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
// An outdoor roller shutter: its box over the window, its rails, its apron of
// slats lowered to the position, the slats running while it moves.
function ntCovShutter(c) {
  const fa = ntId(), gl = ntId(), bx = ntId(), rl = ntId(), ap = ntId(), cl = ntId(), sh = ntId(), x0 = 26, x1 = 94, top = 25, bot = 104;
  const yb = top + (bot - top) * (1 - c.p / 100), dir = cvDir(c), mc = c.color || "#e9ecee";
  const slats = []; for (let y = top - 8.4; y < bot + 8; y += 4.2) slats.push(`<path d="M${x0} ${cvF(y)} H${x1}" stroke="${cvTone(mc, .55)}" stroke-width=".9"/><path d="M${x0} ${cvF(y + 3.2)} H${x1}" stroke="${cvTone(mc, -.38)}" stroke-width=".7"/>`);
  return `<defs>${ntV(fa, "#ece4d6", "#d6cab5")}${ntV(gl, "#d7ebf8", "#9ec7e4")}${ntV(bx, cvTone(mc, .2), cvTone(mc, -.25))}${cvH(rl, [[0, cvTone(mc, -.2)], [.5, cvTone(mc, .2)], [1, cvTone(mc, -.28)]])}${ntV(ap, cvTone(mc, .1), cvTone(mc, -.08))}<clipPath id="${cl}"><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${cvF(Math.max(0, yb - top))}"/></clipPath>${cvBlur(sh, 1.6)}</defs>
${cvFacade(fa)}
<rect x="${x0 - 7}" y="${top - 4}" width="${x1 - x0 + 14}" height="${bot - top + 10}" fill="#000" opacity=".1" filter="url(#${sh})"/>
<rect x="${x0 - 4}" y="${top}" width="${x1 - x0 + 8}" height="${bot - top}" fill="#5f5a52"/>
<rect x="${x0 + 1}" y="${top + 1}" width="${x1 - x0 - 2}" height="${bot - top - 2}" fill="#f7f7f7"/>
${cvGlass(x0 + 4, top + 4, 59, bot - 4, gl)}${cvGlass(61, top + 4, x1 - 4, bot - 4, gl)}
<rect x="59" y="${top + 2}" width="2" height="${bot - top - 4}" fill="#f2f2f2"/>
<g clip-path="url(#${cl})"><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${bot - top}" fill="url(#${ap})"/><g${dir ? ` class="cv-${dir}"` : ""}>${slats.join("")}</g></g>
${yb > top + .5 ? `<rect x="${x0}" y="${cvF(yb - 2.6)}" width="${x1 - x0}" height="2.6" fill="${cvTone(mc, -.35)}"/><path d="M${x0} ${cvF(yb - .2)} H${x1}" stroke="${cvTone(mc, -.6)}" stroke-width=".6"/>` : ""}
<rect x="${x0 - 4}" y="${top}" width="4.2" height="${bot - top}" fill="url(#${rl})"/><rect x="${x1 - .2}" y="${top}" width="4.2" height="${bot - top}" fill="url(#${rl})"/>
<rect x="${x0 - 7}" y="${bot}" width="${x1 - x0 + 14}" height="3.6" rx=".6" fill="#efe9de" stroke="#bfb4a2" stroke-width=".4"/>
<rect x="${x0 - 6}" y="${top - 15}" width="${x1 - x0 + 12}" height="15" rx="1.4" fill="url(#${bx})"/>
<path d="M${x0 - 6} ${top - 1.2} H${x1 + 6}" stroke="${cvTone(mc, -.45)}" stroke-width=".7"/><path d="M${x0 - 4} ${top - 13} H${x1 + 4}" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>
${cvArrow(dir)}`;
}
// An indoor roller blind: its tube under the top of the window, its fabric
// down to the position with the light coming through, its bottom bar.
function ntCovBlind(c) {
  const wl = ntId(), gl = ntId(), tb = ntId(), fb = ntId(), cl = ntId(), sun = ntId(), x0 = 22, x1 = 98, top = 18, bot = 108;
  const yb = top + (bot - top) * (1 - c.p / 100), dir = cvDir(c), color = c.fabric || "#d8cab2", fr = c.color || "#f4f5f6", bar = c.color || "#b6bcc1";
  const weave = []; for (let x = x0 + 2; x < x1; x += 3) weave.push(`<path d="M${x} ${top} V${bot}" stroke="#000" stroke-opacity=".05" stroke-width=".6"/>`);
  return `<defs>${cvH(wl, [[0, "#f3f4f6"], [1, "#dfe3e7"]])}${ntV(gl, "#e1f0fa", "#a9cfe9")}${ntV(tb, cvTone(fr, .5), cvTone(fr, -.16))}<linearGradient id="${fb}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${color}" stop-opacity=".96"/><stop offset=".5" stop-color="${color}" stop-opacity=".82"/><stop offset="1" stop-color="${color}" stop-opacity=".96"/></linearGradient>
<clipPath id="${cl}"><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${cvF(Math.max(0, yb - top))}"/></clipPath><radialGradient id="${sun}"><stop offset="0" stop-color="#fff8e1" stop-opacity=".28"/><stop offset="1" stop-color="#fff8e1" stop-opacity="0"/></radialGradient></defs>
<rect x="-6" y="-10" width="132" height="135" fill="url(#${wl})"/>
<rect x="${x0 - 4}" y="${top - 4}" width="${x1 - x0 + 8}" height="${bot - top + 8}" fill="#fafafa" stroke="#d2d6da" stroke-width=".5"/>
${cvGlass(x0 + 3, top + 3, 59, bot - 3, gl)}${cvGlass(61, top + 3, x1 - 3, bot - 3, gl)}
<rect x="59" y="${top}" width="2" height="${bot - top}" fill="#f4f4f4"/>
<g clip-path="url(#${cl})"><g${dir ? ` class="cv-sway"` : ""}><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${bot - top}" fill="url(#${fb})"/>${weave.join("")}
<ellipse cx="60" cy="${cvF((top + yb) / 2)}" rx="30" ry="${cvF(Math.max(4, (yb - top) / 2))}" fill="url(#${sun})"/></g></g>
${yb > top + 1 ? `<rect x="${x0 - .5}" y="${cvF(yb - 2.2)}" width="${x1 - x0 + 1}" height="2.6" rx="1" fill="${bar}"/><path d="M${x0} ${cvF(yb + .2)} H${x1}" stroke="${cvTone(bar, -.35)}" stroke-width=".5"/>` : ""}
<rect x="${x0 - 6}" y="${bot + 4}" width="${x1 - x0 + 12}" height="4" rx=".8" fill="#fbfbfb" stroke="#cfd4d8" stroke-width=".5"/>
<rect x="${x0 - 3}" y="${top - 8}" width="${x1 - x0 + 6}" height="8" rx="4" fill="url(#${tb})" stroke="${cvTone(fr, -.25)}" stroke-width=".4"/>
${dir ? `<g class="cv-${dir}">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<path d="M${x0 + 4 + i * 8} ${top - 7} q1.6 3 0 6" fill="none" stroke="${cvTone(fr, -.3)}" stroke-width=".6"/>`).join("")}</g>` : ""}
${cvArrow(dir)}`;
}
// A curtain on its rail, seen from the room (#135): one panel gathering to a
// side, or two from the middle. Its folds keep their number, so a panel
// pulled aside packs them tight, as a real one does. Shared with the photo.
function cvCurtain(x0, x1, top, bot, p, opening, fabric, dir, fid) {
  const span = x1 - x0, open = Math.max(0, Math.min(100, p)) / 100;
  const panels = opening === "center"
    ? [[x0, x0 + Math.max(span * .09, span / 2 * (1 - open))], [x1 - Math.max(span * .09, span / 2 * (1 - open)), x1]]
    : opening === "right" ? [[x1 - Math.max(span * .13, span * (1 - open)), x1]]
    : [[x0, x0 + Math.max(span * .13, span * (1 - open))]];
  const n = opening === "center" ? 6 : 10;
  return `<g${dir ? ` class="cv-sway"` : ""}>${panels.map(([a, b]) => {
    const fw = (b - a) / n, tight = Math.max(0, Math.min(1, 1 - fw / (span / (opening === "center" ? 12 : 20)) * .6));
    let folds = "", hem = `M${cvF(a)} ${bot}`, glide = "";
    for (let i = 0; i < n; i++) {
      const fx = a + fw * i;
      folds += `<rect x="${cvF(fx)}" y="${top}" width="${cvF(fw + .05)}" height="${cvF(bot - top)}" fill="url(#${fid})" opacity="${cvF(.75 + tight * .25)}"/>`;
      hem += ` Q${cvF(fx + fw / 2)} ${cvF(bot + 1.2 + tight * 1.4)} ${cvF(fx + fw)} ${bot}`;
      glide += `<circle cx="${cvF(fx + fw / 2)}" cy="${top - .3}" r=".75" fill="#8d949a"/>`;
    }
    return `<rect x="${cvF(a)}" y="${top}" width="${cvF(b - a)}" height="${cvF(bot - top)}" fill="${fabric}"/>${folds}<path d="${hem} V${cvF(bot - 1)} H${cvF(a)} Z" fill="${cvTone(fabric, -.12)}"/>
<path d="M${cvF(a)} ${top} V${bot}" stroke="${cvTone(fabric, -.3)}" stroke-width=".4"/><path d="M${cvF(b)} ${top} V${bot}" stroke="${cvTone(fabric, -.3)}" stroke-width=".4"/>${glide}`;
  }).join("")}</g>`;
}
// The fold's light and shadow, over the fabric's own colour.
const cvFold = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".04"/></linearGradient>`;
// A curtain's arrow: the way its fabric moves.
function cvArrowH(dir, x = 108, y = 6) {
  if (!dir) return "";
  const ch = (d) => d === "left" ? "M1.6 -3.4 L-2 0 L1.6 3.4" : "M-1.6 -3.4 L2 0 L-1.6 3.4";
  const one = (d, cx) => `<g class="cv-arrow" transform="translate(${cx} ${y})"><circle r="7" fill="#1e88e5"/><path d="${ch(d)}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return dir === "out" ? one("left", x - 17) + one("right", x) : dir === "in" ? one("right", x - 17) + one("left", x) : one(dir, x);
}
// Opening moves the fabric to where it gathers; closing brings it back.
const cvCurtainDir = (c) => {
  const o = c.opening || "center", dir = cvDir(c);
  if (!dir) return "";
  if (o === "center") return dir === "up" ? "out" : "in";
  const toward = o === "right" ? "right" : "left";
  return dir === "up" ? toward : toward === "left" ? "right" : "left";
};
// The room, its window, and the curtain hung in front of it from a rail
// fixed above, its motor at one end of the rail.
function ntCovCurtain(c) {
  const wl = ntId(), gl = ntId(), fd = ntId(), fl = ntId(), x0 = 28, x1 = 92, top = 24, bot = 92;
  const fabric = c.fabric || "#d8cab2", rail = c.color || "#c9ced2", o = c.opening || "center";
  const motorX = o === "right" ? 6 : 108;
  return `<defs>${cvH(wl, [[0, "#f3f4f6"], [1, "#dfe3e7"]])}${ntV(gl, "#e1f0fa", "#a9cfe9")}${cvFold(fd)}${ntV(fl, "#d9cbb4", "#c4b296")}</defs>
<rect x="-6" y="-10" width="132" height="135" fill="url(#${wl})"/>
<rect x="-6" y="112" width="132" height="13" fill="url(#${fl})"/><rect x="-6" y="110" width="132" height="2.4" fill="#f7f7f7" stroke="#d2d6da" stroke-width=".4"/>
<rect x="${x0 - 4}" y="${top - 4}" width="${x1 - x0 + 8}" height="${bot - top + 8}" fill="#fafafa" stroke="#d2d6da" stroke-width=".5"/>
${cvGlass(x0 + 3, top + 3, 59, bot - 3, gl)}${cvGlass(61, top + 3, x1 - 3, bot - 3, gl)}
<rect x="59" y="${top}" width="2" height="${bot - top}" fill="#f4f4f4"/>
<rect x="${x0 - 7}" y="${bot + 4}" width="${x1 - x0 + 14}" height="3.6" rx=".6" fill="#fbfbfb" stroke="#cfd4d8" stroke-width=".5"/>
${cvCurtain(10, 110, 12, 109, c.p, o, fabric, cvDir(c), fd)}
<rect x="8" y="9" width="104" height="3.2" rx="1" fill="${rail}" stroke="${cvTone(rail, -.3)}" stroke-width=".4"/>
<rect x="${motorX}" y="7.4" width="6" height="12" rx="2.2" fill="${cvTone(rail, -.08)}" stroke="${cvTone(rail, -.32)}" stroke-width=".4"/><circle cx="${motorX + 3}" cy="16.6" r=".7" fill="${c.moving ? "#4caf50" : "#90a4ae"}"/>
${cvArrowH(cvCurtainDir(c), o === "center" ? 68.5 : 60, -1)}`;
}
// Venetian slats seen from the front: their tilt makes them a thin edge
// (open) or a band hiding the window (closed); lifted, they pack under the
// head rail, or into the box of an outdoor one.
function cvSlats(x0, x1, top, bot, p, tilt, slat, edge, cord, hidden, gap = 5) {
  const mid = cvF((x0 + x1) / 2), n = Math.round((bot - top) / gap), down = Math.round(n * (1 - p / 100)), up = n - down;
  const k = Math.max(0, Math.min(1, tilt / 100)), band = cvF(1.3 + 4.4 * (1 - k)), sp = hidden ? .5 : .42;
  const stackTop = hidden ? top - 1 - up * sp : top + 1, y0 = stackTop + up * sp;
  let o = "";
  for (let i = 0; i < up; i++) o += `<rect x="${x0}" y="${cvF(stackTop + i * sp)}" width="${x1 - x0}" height="${cvF(sp + .3)}" fill="${slat}" stroke="${edge}" stroke-width=".25"/>`;
  for (let i = 0; i < down; i++) {
    const y = cvF(y0 + i * gap + 1);
    o += `<path d="M${x0} ${y} Q${mid} ${cvF(y - band * .35)} ${x1} ${y} V${cvF(y + band)} Q${mid} ${cvF(y + band * .65)} ${x0} ${cvF(y + band)} Z" fill="${slat}" stroke="${edge}" stroke-width=".3"/><path d="M${x0 + 2} ${cvF(y + .3)} Q${mid} ${cvF(y - band * .3)} ${x1 - 2} ${cvF(y + .3)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".5"/>`;
  }
  const yEnd = cvF(y0 + down * gap + 1);
  return `${[x0 + 14, x1 - 14].map((x) => `<path d="M${x} ${top} V${cvF(yEnd + 2)}" stroke="${cord}" stroke-width=".55"/>`).join("")}${o}<rect x="${x0 - .5}" y="${yEnd}" width="${x1 - x0 + 1}" height="2.4" rx=".8" fill="${slat}" stroke="${edge}" stroke-width=".4"/>`;
}
function ntCovVenetian(c, outdoor) {
  const bg = ntId(), gl = ntId(), hd = ntId(), x0 = 24, x1 = 96, top = 22, bot = 104, dir = cvDir(c);
  const slat = c.color || (outdoor ? "#6b7279" : "#f3f4f5"), edge = cvTone(slat, -.3), cord = outdoor ? "#2e3338" : "#d6dadd";
  return `<defs>${outdoor ? ntV(bg, "#ece4d6", "#d6cab5") : cvH(bg, [[0, "#f3f4f6"], [1, "#dfe3e7"]])}${ntV(gl, "#d7ebf8", "#9ec7e4")}${ntV(hd, outdoor ? cvTone(slat, .25) : "#ffffff", outdoor ? cvTone(slat, -.2) : "#cfd4d8")}</defs>
${outdoor ? cvFacade(bg) : `<rect x="-6" y="-10" width="132" height="135" fill="url(#${bg})"/>`}
<rect x="${x0 - 4}" y="${top - 4}" width="${x1 - x0 + 8}" height="${bot - top + 8}" fill="${outdoor ? "#5f5a52" : "#fafafa"}" stroke="#d2d6da" stroke-width=".4"/>
<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${bot - top}" fill="#f7f7f7"/>
${cvGlass(x0 + 3, top + 3, 59, bot - 3, gl)}${cvGlass(61, top + 3, x1 - 3, bot - 3, gl)}
<rect x="59" y="${top}" width="2" height="${bot - top}" fill="#f2f2f2"/>
${outdoor ? `<rect x="${x0 - 4}" y="${top}" width="3" height="${bot - top}" fill="${cvTone(slat, .1)}"/><rect x="${x1 + 1}" y="${top}" width="3" height="${bot - top}" fill="${cvTone(slat, .1)}"/>` : ""}
${cvSlats(x0, x1, top, bot, c.p, c.tilt, slat, edge, cord, outdoor)}
<rect x="${x0 - 6}" y="${bot + 4}" width="${x1 - x0 + 12}" height="3.6" rx=".6" fill="${outdoor ? "#efe9de" : "#fbfbfb"}" stroke="#c9c0b0" stroke-width=".4"/>
<rect x="${x0 - 5}" y="${top - 11}" width="${x1 - x0 + 10}" height="${outdoor ? 12 : 7}" rx="1.2" fill="url(#${hd})" transform="translate(0 ${outdoor ? 0 : 4})"/>
${cvArrow(dir)}`;
}
// A bioclimatic pergola against the house, in oblique view and built in 3D:
// four posts, a deep beam in front and at the back (where the gutter and the
// motor live), two lower side beams between them, the louvers turning inside
// with the tilt (closed, a roof; open, upright blades showing what lies
// behind), their shadow on the terrace, and the glow of the LED strip under
// the beams while its light is on.
function ntCovPergola(c) {
  const wl = ntId(), gr = ntId(), sk = ntId(), fa = ntId(), sd = ntId(), tp = ntId(), bl = ntId(), hb = ntId(), lp = ntId(), lh = ntId();
  const k = Math.max(0, Math.min(1, c.tilt / 100)), lc = c.lightColor || "#ffcf7a", mc = c.color || "#5d646b";
  const W = 84, D = 40, bw = 4.5, bh = 6.5, BH = 11, HP = 58, ox = 13, oy = 40, zx = .35, zy = -.55, GY = oy + HP + D * zy;
  const pr = (x, y, z) => `${cvF(ox + x + z * zx)} ${cvF(oy - y + z * zy)}`;
  const poly = (pts, fill, extra = "") => `<polygon points="${pts.map((q) => pr(...q)).join(" ")}" fill="${fill}" ${extra}/>`;
  const edge = `stroke="${cvTone(mc, -.35)}" stroke-width=".3" stroke-linejoin="round"`;
  // A box seen from the front, from above and from the right.
  const box = (x0, x1, y0, y1, z0, z1, faces = "ftr") =>
    (faces.includes("r") ? poly([[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]], `url(#${sd})`, edge) : "") +
    (faces.includes("t") ? poly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], `url(#${tp})`, edge) : "") +
    (faces.includes("f") ? poly([[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], `url(#${fa})`, edge) : "");
  const post = (x, z) => box(x, x + bw, -HP, -BH, z, z + bw, "fr");
  const n = 8, pitch = (D - 2 * bw) / n, bwid = pitch * 1.04, th = k * 1.35, dz = bwid * Math.cos(th) / 2, dy = bwid * Math.sin(th) * .05, yc = -bh / 2;
  let louv = "", shade = "";
  for (let i = 0; i < n; i++) {
    const zc = bw + pitch * (i + .5);
    const q = [[bw, yc - dy, zc - dz], [W - bw, yc - dy, zc - dz], [W - bw, yc + dy, zc + dz], [bw, yc + dy, zc + dz]];
    louv += poly(q, `url(#${tp})`, `stroke="${cvTone(mc, -.2)}" stroke-width=".3"`) + (k > .25 ? `<path d="M${pr(bw, yc - dy, zc - dz)} L${pr(W - bw, yc - dy, zc - dz)}" stroke="${cvTone(mc, .1)}" stroke-width=".7"/>` : "");
    shade += poly(q.map(([x, , z]) => [x - 7, -HP, z]), "#000", `opacity=".2"`);
  }
  const halo = (x0, x1, z0, z1, y) => `<polygon points="${[[x0, y, z0], [x1, y, z1], [x1, y - 16, z1], [x0, y - 16, z0]].map((q) => pr(...q)).join(" ")}" fill="url(#${lh})"/>`;
  const glow = (x0, z0, x1, z1, y) => `<path d="M${pr(x0, y - .4, z0)} L${pr(x1, y - .4, z1)}" stroke="${lc}" stroke-width="4" stroke-linecap="round" opacity=".75" filter="url(#${hb})"/>`;
  const on = !!c.light;
  return `<defs>${ntV(wl, "#ece4d6", "#ddd2bf")}${ntV(gr, "#c9c2b6", "#a99f90")}${ntV(sk, "#d7ebf8", "#a9cfe9")}${ntV(fa, cvTone(mc, .18), mc)}${ntV(sd, cvTone(mc, .08), cvTone(mc, -.15))}${ntV(tp, cvTone(mc, .5), cvTone(mc, .36))}${cvBlur(bl, 1.2)}${cvBlur(hb, 2.4)}
<radialGradient id="${lp}"><stop offset="0" stop-color="${lc}" stop-opacity=".75"/><stop offset="1" stop-color="${lc}" stop-opacity="0"/></radialGradient>
<linearGradient id="${lh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lc}" stop-opacity=".55"/><stop offset="1" stop-color="${lc}" stop-opacity="0"/></linearGradient></defs>
<rect x="-6" y="-10" width="132" height="135" fill="url(#${sk})"/>
<rect x="18" y="-10" width="108" height="${cvF(GY + 10)}" fill="url(#${wl})"/>
<rect x="48" y="${cvF(GY - 38)}" width="30" height="38" fill="#5f5a52"/><rect x="50" y="${cvF(GY - 36)}" width="26" height="36" fill="url(#${sk})"/><rect x="62.4" y="${cvF(GY - 36)}" width="1.2" height="36" fill="#f2f2f2"/>
<polygon points="-6 ${cvF(GY)} 126 ${cvF(GY)} 126 125 -6 125" fill="url(#${gr})"/>
<path d="M18 ${cvF(GY)} H126" stroke="#000" stroke-opacity=".18" stroke-width=".6"/>
${[GY + 9, GY + 21, GY + 36].map((y) => `<path d="M-6 ${cvF(y)} H126" stroke="#000" stroke-opacity=".05"/>`).join("")}
<g filter="url(#${bl})">${shade}</g>
${on ? `<ellipse cx="${cvF(ox + W / 2 + D / 2 * zx)}" cy="${cvF(oy + HP + D / 2 * zy + 2)}" rx="50" ry="13" fill="url(#${lp})"/>` : ""}
${post(0, D - bw)}${post(W - bw, D - bw)}
${on ? halo(bw, W - bw, D - bw, D - bw, -BH) + halo(bw, bw, bw, D - bw, -bh) + halo(0, W, 0, 0, -BH) : ""}
${box(0, W, -BH, 0, D - bw, D)}
${box(0, bw, -bh, 0, bw, D - bw, "tr")}
${on ? glow(bw, D - bw, W - bw, D - bw, -BH) + glow(bw, bw, bw, D - bw, -bh) : ""}
${louv}
${box(W - bw, W, -bh, 0, bw, D - bw, "tr")}
${box(0, W, -BH, 0, 0, bw)}
${on ? glow(bw, 0, W - bw, 0, -BH) : ""}
${post(0, 0)}${post(W - bw, 0)}
${c.moving ? `<g class="cv-arrow" transform="translate(108 4)"><circle r="7" fill="#1e88e5"/><path d="M-3.6 0 a3.6 3.6 0 1 1 1 2.6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><path d="M-3.6 3 L-2.6 2.6 L-2.2 3.8" fill="none" stroke="#fff" stroke-width="1.2"/></g>` : ""}`;
}
// A terrace awning: its cassette on the wall, the fabric (striped or plain)
// unrolled to the position on its folding arms, the valance hanging from the
// front bar, its shade on the terrace.
function ntCovAwning(c) {
  const wl = ntId(), gr = ntId(), cs = ntId(), sh = ntId(), bl = ntId();
  const dir = c.moving === "opening" ? "down" : c.moving === "closing" ? "up" : "";
  const e = Math.max(0, Math.min(1, c.p / 100)), cA = c.fabric || "#3f6f8f", cB = c.stripes === false ? cvTone(cA, .06) : "#eef0f1", fc = c.color || "#eef0f2";
  const top = 24, x0 = 18, x1 = 102, fy = top + 2 + 50 * e, spread = 9 * e, fx0 = x0 - spread, fx1 = x1 + spread, n = 8;
  let stripes = "";
  for (let i = 0; i < n; i++) {
    const a = x0 + (x1 - x0) * i / n, b = x0 + (x1 - x0) * (i + 1) / n, a2 = fx0 + (fx1 - fx0) * i / n, b2 = fx0 + (fx1 - fx0) * (i + 1) / n;
    stripes += `<polygon points="${cvF(a)} ${top + 2} ${cvF(b)} ${top + 2} ${cvF(b2)} ${cvF(fy)} ${cvF(a2)} ${cvF(fy)}" fill="${i % 2 ? cB : cA}"/>`;
  }
  const scal = []; for (let i = 0; i < n * 2; i++) { const xa = fx0 + (fx1 - fx0) * i / (n * 2), xb = fx0 + (fx1 - fx0) * (i + 1) / (n * 2); scal.push(`<path d="M${cvF(xa)} ${cvF(fy + 1.8)} V${cvF(fy + 6)} Q${cvF((xa + xb) / 2)} ${cvF(fy + 8.6)} ${cvF(xb)} ${cvF(fy + 6)} V${cvF(fy + 1.8)} Z" fill="${Math.floor(i / 2) % 2 ? cB : cA}" stroke="#000" stroke-opacity=".12" stroke-width=".3"/>`); }
  const arm = (wx, fx) => { const ex = wx + (fx - wx) * .5 + (wx < 60 ? 10 : -10) * (1 - e), ey = top + 6 + (fy - top - 6) * .55; return `<path d="M${wx} ${top + 6} L${cvF(ex)} ${cvF(ey)} L${cvF(fx)} ${cvF(fy)}" fill="none" stroke="#7b8288" stroke-width="1.6" stroke-linejoin="round"/><circle cx="${cvF(ex)}" cy="${cvF(ey)}" r="1.3" fill="#5d646b"/>`; };
  return `<defs>${ntV(wl, "#ece4d6", "#d6cab5")}${ntV(gr, "#c9c2b6", "#a99f90")}${ntV(cs, cvTone(fc, .2), cvTone(fc, -.28))}<linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>${cvBlur(bl, 2.2)}</defs>
<rect x="-6" y="-10" width="132" height="135" fill="url(#${wl})"/>
<rect x="30" y="34" width="60" height="58" fill="#5f5a52"/><rect x="32" y="36" width="56" height="56" fill="#cfe4f3"/><rect x="59.4" y="36" width="1.2" height="56" fill="#f2f2f2"/>
<polygon points="-6 92 126 92 126 125 -6 125" fill="url(#${gr})"/>
${e > .02 ? `<polygon points="${cvF(x0)} 92 ${cvF(x1)} 92 ${cvF(fx1 + 4)} ${cvF(Math.min(124, 92 + 34 * e))} ${cvF(fx0 - 4)} ${cvF(Math.min(124, 92 + 34 * e))}" fill="#000" opacity=".16" filter="url(#${bl})"/>
${arm(x0 + 6, fx0 + 6)}${arm(x1 - 6, fx1 - 6)}<g${dir ? ` class="cv-sway"` : ""}>${stripes}<polygon points="${x0} ${top + 2} ${x1} ${top + 2} ${cvF(fx1)} ${cvF(fy)} ${cvF(fx0)} ${cvF(fy)}" fill="url(#${sh})" opacity=".5"/></g>
<rect x="${cvF(fx0 - 1)}" y="${cvF(fy - .4)}" width="${cvF(fx1 - fx0 + 2)}" height="2.4" rx="1" fill="#8f969c"/>${scal.join("")}` : ""}
<rect x="${x0 - 3}" y="${top - 7}" width="${x1 - x0 + 6}" height="10" rx="4" fill="url(#${cs})" stroke="${cvTone(fc, -.35)}" stroke-width=".4"/>
<path d="M${x0 - 1} ${top - 4.6} H${x1 + 1}" stroke="#fff" stroke-opacity=".8" stroke-width=".9"/>
${cvArrow(dir, 108, 4)}`;
}
// A finger bot (HACF #163): the small box stuck beside a button it cannot
// otherwise reach, its arm swinging down onto it. The Tuya Fingerbot Plus
// (Adaprox, MOES, Zemismart...) with its touch pad on top, SwitchBot's Bot with
// its lever and its own button, and the first, slimmer Fingerbot. Its arm
// presses, or stays down in switch mode; its USB-C lead while it charges.
const FB_BODY = { white: ["#ffffff", "#e3e6e9", "#c3c8cd"], black: ["#45494e", "#24272a", "#16181a"] };
function ntFingerbot(c) {
  const g = ntId(), sd = ntId(), bl = ntId(), pl = ntId(), rk = ntId(), cb = ntId();
  const lay = c.layout || "plus", pal = FB_BODY[c.body] || FB_BODY.white, dark = c.body === "black";
  // The wall plate it is stuck on, the rocker it presses below it.
  const P = { x: 14, y: 26, w: 92, h: 96 }, R = { x: 34, y: 78, w: 52, h: 38 };
  // Body and arm, per model: the Plus a rounded box, the Bot a squarer one,
  // the first Fingerbot a slim one; the pivot where the arm leaves the body.
  const B = lay === "switchbot" ? { x: 33, y: 4, w: 54, h: 50, r: 8 } : lay === "classic" ? { x: 31, y: 22, w: 58, h: 32, r: 6 } : { x: 27, y: 10, w: 66, h: 44, r: 12 };
  const px = B.x + 9, py = B.y + B.h - 4, len = 40, down = c.unav ? 0 : 44;
  const armCls = c.pressing ? ` class="fb-tap"` : "";
  const armFill = dark ? "#2b2e32" : "#f6f7f8", armEdge = dark ? "#121314" : "#b9bfc5";
  const tip = lay === "switchbot"
    ? `<rect x="${px + len - 8}" y="${py - 4}" width="11" height="8" rx="4" fill="${dark ? "#1b1c1e" : "#dfe3e6"}" stroke="${armEdge}" stroke-width=".5"/>`
    : `<rect x="${px + len - 5}" y="${py - 4.2}" width="8" height="8.4" rx="2.4" fill="#50545a"/><rect x="${px + len - 4.2}" y="${py - 3.4}" width="2.2" height="6.8" rx="1.1" fill="#7b8086"/>`;
  const arm = `<g${armCls} style="transform-origin:${px}px ${py}px${c.held ? `;transform:rotate(${down}deg)` : ""}">
<rect x="${px - 3.5}" y="${py - 3.5}" width="${len}" height="7" rx="3.5" fill="${armFill}" stroke="${armEdge}" stroke-width=".6"/>${tip}
<circle cx="${px}" cy="${py}" r="4.2" fill="${dark ? "#1d1f22" : "#e7eaed"}" stroke="${armEdge}" stroke-width=".6"/><circle cx="${px}" cy="${py}" r="1.4" fill="${armEdge}"/></g>`;
  // The plate and its rocker, the top half going down under the finger.
  const plate = `<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="9" fill="#000" opacity=".16" filter="url(#${bl})" transform="translate(2.5 3.5)"/>
<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="9" fill="url(#${pl})" stroke="#cdd2d6" stroke-width=".6"/>
<rect x="${R.x}" y="${R.y}" width="${R.w}" height="${R.h}" rx="5" fill="url(#${rk})" stroke="#c2c7cc" stroke-width=".6"/>
<path d="M${R.x + 1} ${R.y + R.h / 2} H${R.x + R.w - 1}" stroke="#d1d6da" stroke-width=".8"/>
${c.held ? `<rect x="${R.x + .5}" y="${R.y + .5}" width="${R.w - 1}" height="${R.h / 2}" rx="4.5" fill="#000" opacity=".09"/>` : ""}
${c.pressing ? `<rect class="fb-hit" x="${R.x + .5}" y="${R.y + .5}" width="${R.w - 1}" height="${R.h / 2}" rx="4.5" fill="#000" opacity="0"/>` : ""}`;
  // The light: blue as it presses, red flashing when its battery runs low,
  // green on charge.
  const led = c.unav ? "" : c.pressing || c.held ? "#2196f3" : c.low ? "#e53935" : c.charging ? "#43a047" : "";
  const ledX = B.x + B.w - 11, ledY = B.y + 10;
  const ledEl = led ? `<circle${c.low && !c.pressing ? ` class="fb-blink"` : ""} cx="${ledX}" cy="${ledY}" r="1.8" fill="${led}"/><circle cx="${ledX}" cy="${ledY}" r="4" fill="${led}" opacity=".25"/>`
    : `<circle cx="${ledX}" cy="${ledY}" r="1.4" fill="${dark ? "#55595e" : "#cfd4d8"}"/>`;
  // The model's own marks: the Plus's touch pad and its ring on top, the
  // Bot's round button and name, a seam on the first one.
  const marks = lay === "switchbot"
    ? `<circle cx="${B.x + 15}" cy="${B.y + 15}" r="6" fill="${pal[1]}" stroke="${pal[2]}" stroke-width=".7"/><circle cx="${B.x + 15}" cy="${B.y + 15}" r="3.2" fill="none" stroke="${pal[2]}" stroke-width=".5"/>
<text x="${B.x + B.w / 2}" y="${B.y + B.h - 15}" font-size="5" text-anchor="middle" fill="${dark ? "#8b9096" : "#9aa1a8"}" ${NT_FONT}>SwitchBot</text>`
    : lay === "plus"
      ? `<ellipse cx="${B.x + B.w / 2 + 1.5}" cy="${B.y - 1.6}" rx="12" ry="2.4" fill="${dark ? "#2f3236" : "#f3f5f7"}" stroke="${c.touch ? "#29b6f6" : pal[2]}" stroke-width="${c.touch ? 1 : .5}"/>`
      : `<path d="M${B.x + 5} ${B.y + B.h * .5} H${B.x + B.w - 5}" stroke="${pal[2]}" stroke-width=".5"/>`;
  // The lead from its USB-C port while it charges, and its bolt.
  const ly = B.y + B.h * .5;
  const lead = c.charging || c.plugged ? `<path d="M${B.x + B.w + 5} ${ly} C${B.x + B.w + 16} ${ly} 116 30 117 -10" fill="none" stroke="#3a3d41" stroke-width="2.4" stroke-linecap="round"/>
<rect x="${B.x + B.w}" y="${ly - 2.6}" width="6.5" height="5.2" rx="1.5" fill="#5d6166"/>
${c.charging ? `<path class="fb-bolt" d="M106 16 l-6 9.5 h5 l-2.5 8.5 l7.5 -11 h-5 l2.5 -7z" fill="#fbc02d" stroke="#f57f17" stroke-width=".5"/>` : ""}` : "";
  // Its battery, a small gauge in the corner.
  const gauge = c.battery === null || c.battery === undefined || c.unav ? "" : `<g transform="translate(2 -6)"><rect width="16" height="8" rx="1.6" fill="none" stroke="${c.low ? "#e53935" : "#8d9399"}" stroke-width=".9"/><rect x="16.3" y="2.5" width="1.7" height="3" rx=".5" fill="${c.low ? "#e53935" : "#8d9399"}"/>
<rect x="1.3" y="1.3" width="${cvF(13.4 * Math.max(0, Math.min(1, c.battery / 100)))}" height="5.4" rx=".9" fill="${c.low ? "#e53935" : c.charging ? "#43a047" : "#8d9399"}"/></g>`;
  return `<defs>${ntV(g, pal[0], pal[1])}${ntV(sd, pal[1], pal[2])}${cvBlur(bl, 2.4)}${ntV(pl, "#ffffff", "#eceff1")}${ntV(rk, "#ffffff", "#e7eaed")}${cvBlur(cb, 1.8)}</defs>
${plate}
<rect x="${B.x + 2}" y="${B.y + 5}" width="${B.w}" height="${B.h}" rx="${B.r}" fill="#000" opacity=".24" filter="url(#${cb})"/>
<rect x="${B.x + 3.5}" y="${B.y - 3.5}" width="${B.w}" height="${B.h}" rx="${B.r}" fill="url(#${sd})"/>
<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="${B.r}" fill="url(#${g})" stroke="${pal[2]}" stroke-width=".6"/>
<path d="M${B.x + B.r} ${B.y + 1.3} H${B.x + B.w - B.r}" stroke="#fff" stroke-opacity="${dark ? .18 : .9}" stroke-width="1"/>
${marks}${ledEl}${arm}${lead}${gauge}`;
}
// A motorised shut-off valve (#123), after Aqara's Valve Controller T1 and the
// Tuya capsule sold under many names (Moes, Zemismart...): the motor sits on
// a quarter-turn ball valve and turns its handle. Open, the handle lies along
// the pipe and the water runs through; closed, it points across and the water
// stops at the valve. A leak sensor going off drips from the far joint.
const VALVE_HANDLES = { red: ["#e53935", "#b71c1c"], blue: ["#4a78d6", "#2a4f9e"], yellow: ["#f6c21c", "#c99300"], black: ["#3a3f44", "#1c1f22"] };
// The pipe in its fluid's colour as a house shows it: water blue, as its PE
// pipe (EN 12201) and cold water PEX are, gas yellow, as its PE pipe
// (EN 1555) and its marking are. (Industrial marking, NF X08-100 or DIN 2403,
// paints water green and keeps blue for air.) Arrows give the way it flows,
// and run downstream only while the valve is open.
function vlvPipe(c, g) {
  const wet = c.open && !c.unav;
  const arrows = (x0, x1, run) => { let o = ""; for (let x = x0; x <= x1 - 6; x += 12) o += `<path d="M${x} 95.6 l4.4 2.4 l-4.4 2.4" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${c.unav ? 0 : .95}"/>`; return run ? `<g class="vlv-arrows">${o}</g>` : o; };
  return `<rect x="0" y="92.5" width="120" height="11" fill="url(#${g.pipe})"/><path d="M0 94.2 H120" stroke="#fff" stroke-width=".9" opacity=".35"/>
<g clip-path="url(#${g.clipL})">${arrows(-8, 40, wet)}</g>${wet ? `<g clip-path="url(#${g.clipR})">${arrows(76, 124, true)}</g>` : ""}
<path d="M38 89 h8 l1.5 3 v12 l-1.5 3 h-8 l-1.5 -3 v-12 z" fill="url(#${g.brass})" stroke="#7a5c15" stroke-width=".5"/>
<path d="M74 89 h8 l1.5 3 v12 l-1.5 3 h-8 l-1.5 -3 v-12 z" fill="url(#${g.brass})" stroke="#7a5c15" stroke-width=".5"/>
<rect x="45" y="88" width="30" height="20" rx="8" fill="url(#${g.brass})" stroke="#7a5c15" stroke-width=".55"/>
<path d="M49 91.5 Q60 89 71 91.5" stroke="#fff3c4" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/>
<rect x="57" y="81" width="6" height="8" fill="url(#${g.steel})" stroke="#6d767e" stroke-width=".4"/>`;
}
// A bar turning about the valve's stem in the horizontal plane, seen from a
// little above: along the pipe at 0 degrees, pointing at the viewer at 90.
// Its top, its near side and its end, each a quad, so their shapes morph.
const VLV_STEM = [60, 80];
function vlvBar(deg, a0, a1, d, h, dy) {
  // Cabinet projection: the depth runs down to the left.
  const t = deg * Math.PI / 180, cs = Math.cos(t), sn = Math.sin(t), zx = -.42, zy = .34;
  const at = (a, b, up) => { const x = a * cs - b * sn, z = a * sn + b * cs; return `${(VLV_STEM[0] + x + zx * z).toFixed(2)} ${(VLV_STEM[1] + dy + up + zy * z).toFixed(2)}`; };
  const quad = (pts) => `M${pts.join(" L")} Z`;
  return {
    back: quad([at(a0, -d / 2, 0), at(a1, -d / 2, 0), at(a1, -d / 2, h), at(a0, -d / 2, h)]),
    side: quad([at(a0, d / 2, 0), at(a1, d / 2, 0), at(a1, d / 2, h), at(a0, d / 2, h)]),
    end: quad([at(a1, -d / 2, 0), at(a1, d / 2, 0), at(a1, d / 2, h), at(a1, -d / 2, h)]),
    top: quad([at(a0, -d / 2, 0), at(a1, -d / 2, 0), at(a1, d / 2, 0), at(a0, d / 2, 0)]),
  };
}
// The handle, and the motor's fork riding on it. Turning, each face morphs
// through the quarter turn: a loop while the valve says opening or closing,
// once from the moment a switch changed, so a redraw carries on where it was.
function vlvLever(c, g, fork) {
  const [a, b] = VALVE_HANDLES[c.handle] || VALVE_HANDLES.red;
  const parts = [[-3, 6, 4.4, 4, 0, "url(#" + g.steel + ")", "#8d969e", "#6d767e"], [6, 38, 6, 5, 0, a, b, b], ...(fork ? [fork] : [])];
  const anim = c.moving ? { from: c.moving === "opening" ? 90 : 0, to: c.moving === "opening" ? 0 : 90, loop: true, at: 0 }
    : c.swing ? { from: c.open ? 90 : 0, to: c.open ? 0 : 90, loop: false, at: c.swing / 1000 } : null;
  const still = c.open ? 0 : 90;
  const steps = anim ? (anim.loop ? [0, 0, .1, .25, .4, .55, .7, .85, 1, 1] : [0, .1, .25, .4, .55, .7, .85, 1]).map((f) => anim.from + (anim.to - anim.from) * f) : null;
  const face = (p, key, fill, stroke) => {
    const d0 = vlvBar(anim ? anim.to : still, p[0], p[1], p[2], p[3], p[4])[key];
    const sm = anim ? `<animate attributeName="d" dur="${anim.loop ? 2.8 : 2.5}s" ${anim.loop ? 'repeatCount="indefinite"' : `begin="0s" fill="freeze" data-swing="${anim.at.toFixed(2)}"`} values="${steps.map((x) => vlvBar(x, p[0], p[1], p[2], p[3], p[4])[key]).join(";")}"/>` : "";
    return `<path d="${anim ? vlvBar(anim.from, p[0], p[1], p[2], p[3], p[4])[key] : d0}" fill="${fill}" stroke="${stroke}" stroke-width=".5" stroke-linejoin="round">${sm}</path>`;
  };
  return parts.map((p) => face(p, "back", p[6], p[7]) + face(p, "side", p[6], p[7]) + face(p, "end", p[7], p[7]) + face(p, "top", p[5], p[7])).join("")
    + `<circle cx="60" cy="80" r="2.2" fill="#c3c9ce" stroke="#6d767e" stroke-width=".4"/>`;
}
function vlvLed(c, x, y, r = 1.4) {
  const col = c.unav ? "#cfd6dc" : c.leak ? "#e53935" : c.moving ? "#29b6f6" : c.low ? "#ffa000" : c.open ? "#43a047" : "#e53935";
  return `<circle class="${c.moving || c.leak ? "nta-blinkfast" : c.low ? "nta-blink" : ""}" cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`;
}
function vlvLeak(c) {
  if (!c.leak || c.unav) return "";
  // Water seeps from under the joint past the valve and drips into a pool.
  const drop = (x, cls) => `<path class="vlv-drip ${cls}" d="M${x} 107.4 q-1.7 3 0 4.4 q1.7 -1.4 0 -4.4 z" fill="#4fc3f7"/>`;
  return `<path d="M76 106.6 q2 1.6 4 0 q2 1.6 4 0" stroke="#4fc3f7" stroke-width="1.1" fill="none" opacity=".85"/>
<ellipse cx="80" cy="119" rx="16" ry="2.6" fill="#4fc3f7" opacity=".45"/>${drop(78.5, "")}${drop(82, "ntd2")}
<ellipse class="vlv-splash" cx="79.5" cy="118.6" rx="4" ry="1.2" fill="none" stroke="#4fc3f7" stroke-width=".6"/>`;
}
const VALVE_FLUID_PIPES = { water: ["#8cc4f2", "#2f7fd0", "#1d528c"], gas: ["#ffd76a", "#efa908", "#b87a00"] };
function vlvDefs(c) {
  const g = { pipe: ntId(), brass: ntId(), steel: ntId(), body: ntId(), clipL: ntId(), clipR: ntId() };
  const [p0, p1, p2] = VALVE_FLUID_PIPES[c.fluid] || VALVE_FLUID_PIPES.water;
  return { g, defs: `<defs><linearGradient id="${g.pipe}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p0}"/><stop offset=".45" stop-color="${p1}"/><stop offset="1" stop-color="${p2}"/></linearGradient>
<clipPath id="${g.clipL}"><rect x="0" y="90" width="37" height="16"/></clipPath><clipPath id="${g.clipR}"><rect x="83" y="90" width="37" height="16"/></clipPath>
<linearGradient id="${g.brass}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ecd37c"/><stop offset=".5" stop-color="#b8922f"/><stop offset="1" stop-color="#7f6017"/></linearGradient>
<linearGradient id="${g.steel}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8d969e"/><stop offset=".5" stop-color="#e6eaed"/><stop offset="1" stop-color="#8d969e"/></linearGradient>
<linearGradient id="${g.body}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f0f2f4"/><stop offset="1" stop-color="#d6dbe0"/></linearGradient></defs>` };
}
// Aqara Valve Controller T1: a square-topped box with a rounded bottom, a
// shield on its face with the brand, two buttons and the PUSH tab under it,
// held on the pipe by a steel bracket beside the valve.
function ntValveAqara(c) {
  const { g, defs } = vlvDefs(c);
  return `${defs}${vlvPipe(c, g)}
<path d="M30 70 h6 v22 h-6 z" fill="url(#${g.steel})" stroke="#6d767e" stroke-width=".4"/><rect x="27" y="88.5" width="12" height="19" rx="2" fill="none" stroke="#8d969e" stroke-width="2.2"/>
<circle cx="33" cy="87.4" r="1.6" fill="#c3c9ce" stroke="#6d767e" stroke-width=".4"/><circle cx="33" cy="108.6" r="1.6" fill="#c3c9ce" stroke="#6d767e" stroke-width=".4"/>
<rect x="57" y="74" width="6" height="6" fill="url(#${g.steel})" stroke="#6d767e" stroke-width=".4"/>
${vlvLever(c, g, [3, 16, 9, 3, -3, "#d4d9dd", "#9aa2a9", "#7d858c"])}
<ellipse cx="60" cy="76.5" rx="27" ry="2.4" fill="#000" opacity=".12"/>
<path d="M34 14 H86 Q92 14 92 20 V54 Q92 76 70 76 H50 Q28 76 28 54 V20 Q28 14 34 14 Z" fill="url(#${g.body})" stroke="#c4cbd1" stroke-width=".7"/>
<path d="M33 16.5 H87" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".9"/><path d="M89.5 20 V54 Q89.5 72 70 73.5" stroke="#cfd5da" stroke-width="1.2" fill="none" opacity=".8"/>
<path d="M60 25 L77 30.5 L75.5 54 Q60 65 44.5 54 L43 30.5 Z" fill="#f3f5f7" stroke="#e0e5e9" stroke-width=".7"/>
<text x="60" y="36.5" font-size="5.4" font-weight="500" text-anchor="middle" fill="#a9b2ba" ${NT_FONT}>Aqara</text>
<text x="60" y="41" font-size="2.3" text-anchor="middle" fill="#bcc4cb" ${NT_FONT}>Valve Controller T1</text>
<circle cx="53" cy="50" r="3.1" fill="#fff" stroke="#cdd4da" stroke-width=".6"/><path d="M53 48.2 v1.6 M51.6 49 a2 2 0 1 0 2.8 0" stroke="#b5bec6" stroke-width=".55" fill="none" stroke-linecap="round"/>
<circle cx="67" cy="50" r="3.1" fill="#fff" stroke="#cdd4da" stroke-width=".6"/><path d="M65.9 51.1 l2.2 -2.2 m-.6 -.5 l1 1" stroke="#b5bec6" stroke-width=".6" stroke-linecap="round"/>
${vlvLed(c, 60, 45.5, 1.1)}
${c.moving ? `<path class="nta-spin" d="M60 41.6 a3.9 3.9 0 1 1 -3.4 2" stroke="#29b6f6" stroke-width=".7" fill="none" stroke-linecap="round"/>` : ""}
<rect x="50" y="66" width="20" height="7.4" rx="1.6" fill="#cfd4d9" stroke="#aeb5bb" stroke-width=".5"/>
<text x="60" y="71.6" font-size="4.6" font-weight="700" text-anchor="middle" fill="#8b939a" ${NT_FONT}>PUSH</text>
${vlvLeak(c)}`;
}
// The Tuya capsule: a white pill on the pipe, a blue PUSH strap round its
// middle, a collar round the pipe and an arm reaching down to the handle.
function ntValveTuya(c) {
  const { g, defs } = vlvDefs(c);
  return `${defs}${vlvPipe(c, g)}
<path d="M34 64 h9 v22 h-9 z" fill="url(#${g.body})" stroke="#c4cbd1" stroke-width=".6"/><circle cx="38.5" cy="98" r="8.4" fill="none" stroke="#e9ecef" stroke-width="3.4"/><circle cx="38.5" cy="98" r="8.4" fill="none" stroke="#c4cbd1" stroke-width=".5"/>
<circle cx="38.5" cy="108.6" r="1.8" fill="#c3c9ce" stroke="#6d767e" stroke-width=".4"/>
<rect x="56.5" y="64" width="7" height="16" fill="url(#${g.body})" stroke="#c4cbd1" stroke-width=".6"/>
${vlvLever(c, g, [2, 36, 9, 3.4, -3.6, "#ffffff", "#dfe3e7", "#b9c1c8"])}
<ellipse cx="60" cy="68" rx="38" ry="2.6" fill="#000" opacity=".1"/>
<rect x="18" y="30" width="84" height="36" rx="18" fill="url(#${g.body})" stroke="#c4cbd1" stroke-width=".7"/>
<path d="M30 34 H90" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".9"/>
<rect x="53" y="27.5" width="14" height="41" rx="2.4" fill="#3b6fd1" stroke="#26509f" stroke-width=".6"/>
<text x="60" y="41.5" font-size="4.4" font-weight="700" text-anchor="middle" fill="#fff" transform="rotate(90 60 41.5)" ${NT_FONT}>PUSH</text>
<circle cx="60" cy="56" r="2.6" fill="#fff" stroke="#26509f" stroke-width=".5"/>${vlvLed(c, 60, 56, 1.1)}
${c.moving ? `<path class="nta-spin" d="M60 51.6 a4.4 4.4 0 1 1 -3.8 2.2" stroke="#fff" stroke-width=".7" fill="none" stroke-linecap="round"/>` : ""}
${vlvLeak(c)}`;
}
// A wall-mounted drying rack with a contact sensor on it (#124): a box whose
// front drops down onto its rods, a shelf whose accordion arms pull out, or a
// wooden frame that tilts away from the wall. Unfolded, laundry hangs on it.
function rkShirt(x, y, col, dk) {
  return `<path d="M${x} ${y} l-2.6 2.2 h5.2 z" fill="none" stroke="#9aa2a9" stroke-width=".6"/><path d="M${x - 7} ${y + 4} l4 -1.6 q3 2 6 0 l4 1.6 l2.6 7 l-3.4 1.2 l-1 -2.6 v17 h-10.4 v-17 l-1 2.6 l-3.4 -1.2 z" fill="${col}" stroke="${dk}" stroke-width=".5"/><path d="M${x} ${y + 3} v22" stroke="${dk}" stroke-width=".4" opacity=".6"/>`;
}
function rkTowel(x, y, w, h, col, dk) {
  return `<path d="M${x} ${y} h${w} l1 ${h} h-${w + 2} z" fill="${col}" stroke="${dk}" stroke-width=".5"/>${[.25, .5, .75].map((k) => `<path d="M${(x + w * k).toFixed(1)} ${y + 1} v${h - 2}" stroke="${dk}" stroke-width=".35" opacity=".5"/>`).join("")}<path d="M${x - .6} ${y + h - 4} h${w + 1.6}" stroke="#fff" stroke-width="1" opacity=".5"/>`;
}
function rkSensor(c, x, y) {
  return `<rect x="${x}" y="${y}" width="5" height="9" rx="1.2" fill="#fff" stroke="#aeb8c1" stroke-width=".5"/><circle class="${c.open ? "nta-blinkfast" : ""}" cx="${x + 2.5}" cy="${y + 2}" r=".7" fill="${c.unav ? "#cfd6dc" : c.low ? "#ffa000" : c.open ? "#29b6f6" : "#cfd6dc"}"/>`;
}
function rkAnim(c, attr, closed, open, extra = "") {
  if (!c.trans) return "";
  const v = c.open ? `${closed};${open}` : `${open};${closed}`;
  return `<animate attributeName="${attr}" dur="${RACK_TRANS_S}s" begin="0s" fill="freeze" data-swing="${c.trans.toFixed(2)}" values="${v}" ${extra}/>`;
}
// A height scale about a line, animated: the group's own transform, from one to the other.
function rkScale(c, cx, cy, closed, body) {
  const s1 = c.open ? 1 : closed;
  const anim = c.trans ? `<animateTransform attributeName="transform" type="scale" dur="${RACK_TRANS_S}s" begin="0s" fill="freeze" data-swing="${c.trans.toFixed(2)}" values="${c.open ? `1 ${closed};1 1` : `1 1;1 ${closed}`}"/>` : "";
  return `<g transform="translate(${cx} ${cy})"><g transform="scale(1 ${s1})">${anim}<g transform="translate(${-cx} ${-cy})">${body}</g></g></g>`;
}
// Laundry shows once unfolded, and goes first when it folds.
function rkLaundry(c, body) {
  if (!c.open && !c.trans) return "";
  const a = c.trans ? `<animate attributeName="opacity" dur="${RACK_TRANS_S}s" begin="0s" fill="freeze" data-swing="${c.trans.toFixed(2)}" values="${c.open ? "0;0;1" : "1;0;0"}" keyTimes="${c.open ? "0;.7;1" : "0;.3;1"}"/>` : "";
  return `<g opacity="${c.open ? 1 : 0}">${a}${body}</g>`;
}
// The rack's finish: white, wood or black. A box and an accordion come
// white, a frame in wood.
const RACK_PALETTES = {
  white: { a: "#ffffff", b: "#dde2e6", f0: "#f7f8f9", f1: "#e3e7ea", line: "#c4cbd1", rod: "#c9ced3", hi: "#ffffff", slat: "#d6dbe0", shelf: "#fbfcfd", rung: "#d3d8dd", w0: "#f6f7f8", w1: "#d7dce0", d0: "#fbfcfd", d1: "#c9ced3" },
  wood: { a: "#e9caa0", b: "#c79a66", f0: "#e3c08f", f1: "#c08f5b", line: "#9c6d40", rod: "#b88a58", hi: "#f6e2c4", slat: "#c9a171", shelf: "#e4c393", rung: "#c99f6d", w0: "#e6c49a", w1: "#c79a66", d0: "#d8b07e", d1: "#a9784a" },
  black: { a: "#4d5258", b: "#2a2e32", f0: "#444a50", f1: "#2a2e32", line: "#1b1e21", rod: "#5d636a", hi: "rgba(255,255,255,.25)", slat: "#3a3f44", shelf: "#3f444a", rung: "#4a5056", w0: "#50565c", w1: "#2c3035", d0: "#4a5056", d1: "#26292d" },
};
const rkPal = (c, def) => RACK_PALETTES[c.color] || RACK_PALETTES[def];
function ntRackBox(c) {
  const b = ntId(), f = ntId(), P = rkPal(c, "white");
  const defs = `<defs>${ntV(b, P.a, P.b)}${ntV(f, P.f0, P.f1)}</defs>`;
  // The housing stays; its front, hinged at the bottom, drops forward into the
  // shelf of rods, seen from a little above.
  const rods = [0, 1, 2, 3, 4].map((i) => { const t = (i + 1) / 6, y = 52 + t * 16, x0 = 12 - t * 6, x1 = 108 + t * 6; return `<path d="M${x0.toFixed(1)} ${y.toFixed(1)} H${x1.toFixed(1)}" stroke="${P.rod}" stroke-width="1.6" stroke-linecap="round"/><path d="M${x0.toFixed(1)} ${(y - .5).toFixed(1)} H${x1.toFixed(1)}" stroke="${P.hi}" stroke-width=".5"/>`; }).join("");
  const shelf = `<path d="M12 52 L6 70 H114 L108 52" fill="none" stroke="${P.line}" stroke-width="2.4" stroke-linejoin="round"/>${rods}<path d="M5 70 H115 V74 H5 Z" fill="url(#${f})" stroke="${P.line}" stroke-width=".6"/>`;
  const front = `<rect x="12" y="52" width="96" height="14" rx="2" fill="url(#${b})" stroke="${P.line}" stroke-width=".7"/><rect x="40" y="60" width="40" height="2.6" rx="1.3" fill="${P.slat}"/>`;
  return `${defs}<rect x="12" y="38" width="96" height="14" rx="2" fill="url(#${b})" stroke="${P.line}" stroke-width=".7"/><path d="M14 41 H106" stroke="${P.hi}" stroke-width="1.2" opacity=".9"/>
${c.open || c.trans ? rkScale(c, 60, 52, .02, shelf) : ""}
${!c.open || c.trans ? rkScale({ ...c, open: !c.open }, 60, 66, .02, front) : ""}
${!c.open ? `<ellipse cx="60" cy="69" rx="46" ry="2" fill="#000" opacity=".1"/>` : ""}
${rkLaundry(c, `${rkTowel(22, 67, 22, 28, "#e9dcc6", "#b8a587")}${rkShirt(62, 69, "#efe3c8", "#bba985")}${rkShirt(84, 69, "#f2e7d0", "#bba985")}`)}${rkSensor(c, 100, 42)}`;
}
function ntRackAccordion(c) {
  const b = ntId(), P = rkPal(c, "white");
  const defs = `<defs>${ntV(b, P.a, P.b)}</defs>`;
  const board = `<rect x="18" y="26" width="84" height="46" fill="url(#${b})" stroke="${P.line}" stroke-width=".6"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<path d="M${22 + i * 7.6} 28 V70" stroke="${P.slat}" stroke-width=".6"/>`).join("")}
<rect x="14" y="20" width="92" height="6" rx="1" fill="${P.shelf}" stroke="${P.line}" stroke-width=".6"/><path d="M16 22 H104" stroke="${P.hi}" stroke-width="1" opacity=".9"/>
<path d="M18 26 l4 6 h-4 z M102 26 l-4 6 h4 z" fill="${P.f1}" stroke="${P.line}" stroke-width=".5"/>
<rect x="22" y="12" width="8" height="8" rx="1" fill="#e04a6d"/><rect x="33" y="10" width="7" height="10" rx="1.5" fill="#4b8de0"/><rect x="88" y="15" width="12" height="5" rx="1" fill="#9aa2a9"/>`;
  // The scissor arms pull out: each node moves out from the wall with the
  // same share of the way, so folding brings every rod back to it.
  const nodes = [0, 1, 2, 3, 4];
  const pt = (i, k, side) => { const dx = i * 4.2 * k, dy = i * 6.4 * k + 2 * (1 - k) * i * .4; return [side + dx, 44 + dy]; };
  const zigD = (x0, k, flip) => nodes.map((i) => { const [x, y] = pt(i, k, x0); return `${i ? "L" : "M"}${(x + ((i % 2 ? 3 : -3) * (flip ? -1 : 1)) * (.3 + .7 * k)).toFixed(2)} ${y.toFixed(2)}`; }).join(" ");
  const rodD = (i, k) => { const [x, y] = pt(i, k, 24); return `M${x.toFixed(2)} ${y.toFixed(2)} H${(x + 72).toFixed(2)}`; };
  const K = c.open ? 1 : 0.06;
  const morph = (fn) => (c.trans ? rkAnim(c, "d", fn(0.06), fn(1)) : "");
  const arms = [24, 96].map((x0) => [false, true].map((fl) => `<path d="${zigD(x0, K, fl)}" fill="none" stroke="${fl ? P.slat : P.line}" stroke-width="1.6" stroke-linejoin="round">${morph((k) => zigD(x0, k, fl))}</path>`).join("")).join("");
  const rods = nodes.map((i) => `<path d="${rodD(i, K)}" stroke="${P.rod}" stroke-width="1.7" stroke-linecap="round">${morph((k) => rodD(i, k))}</path>`).join("");
  return `${defs}${board}${arms}${rods}${rkLaundry(c, rkTowel(40, 70, 26, 34, "#8d9196", "#5f6368"))}${rkSensor(c, 98, 52)}`;
}
function ntRackFrame(c) {
  const w = ntId(), d = ntId(), P = rkPal(c, "wood");
  const defs = `<defs>${ntV(w, P.w0, P.w1)}${ntV(d, P.d0, P.d1)}</defs>`;
  const outer = `<rect x="18" y="8" width="84" height="104" rx="1.5" fill="none" stroke="url(#${w})" stroke-width="5"/><path d="M60 10 V110" stroke="url(#${w})" stroke-width="3.6"/>`;
  const rungD = (i, x0, x1, y0, y1, xt0, xt1) => { const k = (i + .5) / 7, y = y0 + (y1 - y0) * k; const a = x0 + (xt0 - x0) * (1 - k), b = x1 + (xt1 - x1) * (1 - k); return `M${a.toFixed(1)} ${y.toFixed(1)} L${b.toFixed(1)} ${y.toFixed(1)}`; };
  const left = `<rect x="22" y="12" width="36" height="96" fill="none" stroke="url(#${d})" stroke-width="3.4"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="${rungD(i, 24, 56, 12, 108, 24, 56)}" stroke="${P.rung}" stroke-width="1.8"/>`).join("")}`;
  // The right leaf tilts out from its foot: its top comes forward, wider.
  const leafD = (k) => `M62 108 L98 108 L${(98 + 12 * k).toFixed(1)} ${(12 + 6 * k).toFixed(1)} L${(62 - 8 * k).toFixed(1)} ${(12 + 6 * k).toFixed(1)} Z`;
  const rungK = (i, k) => rungD(i, 62, 98, 12 + 6 * k, 108, 62 - 8 * k, 98 + 12 * k);
  const K = c.open ? 1 : 0;
  const morph = (fn) => (c.trans ? rkAnim(c, "d", fn(0), fn(1)) : "");
  const shade = `<path d="${leafD(K)}" fill="rgba(0,0,0,${c.open ? .06 : 0})">${c.trans ? rkAnim(c, "fill", "rgba(0,0,0,0)", "rgba(0,0,0,.06)") : ""}</path>`;
  const leaf = `${shade}<path d="${leafD(K)}" fill="none" stroke="url(#${d})" stroke-width="3.6" stroke-linejoin="round">${morph(leafD)}</path>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="${rungK(i, K)}" stroke="${P.rung}" stroke-width="1.8">${morph((k) => rungK(i, k))}</path>`).join("")}`;
  return `${defs}${outer}${left}${leaf}${rkLaundry(c, `${rkTowel(68, 30, 22, 40, "#f1f3f5", "#b9c0c6")}<path d="M70 34 H88" stroke="#9fb3c8" stroke-width="1.2" opacity=".7"/><path d="M70 62 H88" stroke="#9fb3c8" stroke-width="1.2" opacity=".7"/>`)}${rkSensor(c, 96, 102)}`;
}
// A kitchen robot read from its plug (HACF #170), after Vorwerk's Thermomix:
// the TM31, its stainless bowl in a white base with a grey crescent of
// buttons, an LCD and a dial, and the TM6, a white egg with a touchscreen,
// a silver knob and green lights beside the bowl. Mixing, it hums; cooking,
// steam rises through the measuring cup.
function fpSteam(x, y) {
  return `<g class="nt-run">${[0, 1, 2].map((i) => `<path class="nta-steam ntd${i + 1}" d="M${x - 4 + i * 4} ${y} q-3 -5 0 -10 q3 -5 0 -10" fill="none" stroke="#cfd8dc" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>`).join("")}</g>`;
}
function fpBowl(g, x0, x1, y0, y1, taper) {
  return `<path d="M${x0} ${y0} L${x1} ${y0} L${x1 - taper} ${y1} L${x0 + taper} ${y1} Z" fill="url(#${g})" stroke="#7d868f" stroke-width=".6"/>
<path d="M${x0 + 4} ${y0 + 3} L${x0 + taper + 3} ${y1 - 2}" stroke="#fff" stroke-width="1.6" opacity=".55" stroke-linecap="round"/><path d="M${x1 - 7} ${y0 + 3} L${x1 - taper - 5} ${y1 - 2}" stroke="#fff" stroke-width="1" opacity=".3" stroke-linecap="round"/>`;
}
// A screen digit has to read on a card, so the displays are drawn larger
// than on the real robot, and say one value at a time.
function fpReadout(c, ready) {
  // Read from its plug, the robot only knows the power it draws: that is
  // what its screen shows, never a time or a temperature it cannot know.
  if (c.unav || !(c.on || ready) || c.watts === null || c.watts === undefined) return "";
  return `${Math.round(c.watts)} W`;
}
function ntFoodTm31(c) {
  const b = ntId(), st = ntId(), lid = ntId(), pn = ntId();
  const lcd = fpReadout(c, c.ready);
  const lit = !!lcd;
  // The keys: an arc of small round buttons each side of the dial.
  const keys = (x0, dir) => [0, 1, 2, 3].map((i) => `<circle cx="${(x0 + dir * i * 3.4).toFixed(1)}" cy="${(102.5 + i * i * .3).toFixed(1)}" r="1.2" fill="#5a6168"/>`).join("") + [0, 1, 2].map((i) => `<circle cx="${(x0 + dir * (1.7 + i * 3.4)).toFixed(1)}" cy="${(107.2 + i * .5).toFixed(1)}" r="1.1" fill="#5a6168"/>`).join("");
  return `<defs>${ntV(b, "#ffffff", "#e2e5e8")}<linearGradient id="${st}" x1="0" x2="1"><stop offset="0" stop-color="#7f8891"/><stop offset=".32" stop-color="#f1f3f5"/><stop offset=".68" stop-color="#b3bbc2"/><stop offset="1" stop-color="#78818a"/></linearGradient>${ntV(lid, "#5b6168", "#383d42")}${ntV(pn, "#f4f5f6", "#d8dcdf")}</defs>
${ntShadow(60, 118, 46)}
<g class="${c.on && !c.heat ? "nta-vib" : ""}">
<path d="M22 113 L27 34 Q28 27 35 27 H85 Q92 27 93 34 L98 113 Q98 116 95 116 H25 Q22 116 22 113 Z" fill="url(#${b})" stroke="#c4c9ce" stroke-width=".7"/>
<path d="M22.4 112 L27 34 Q27.5 30 30 28.5 L31 116 H25 Q22.4 116 22.4 112 Z" fill="#4c5258"/><path d="M97.6 112 L93 34 Q92.5 30 90 28.5 L89 116 H95 Q97.6 116 97.6 112 Z" fill="#5d646b"/>
<path d="M33 31 H87" stroke="#fff" stroke-width="1.4" opacity=".9" stroke-linecap="round"/>
${fpBowl(st, 34, 86, 22, 62, 7)}
<path d="M54 26 Q50 42 55 60 H63 Q59 43 62 26 Z" fill="#41474d" stroke="#24282c" stroke-width=".5"/><path d="M56 30 Q54 43 57 56" stroke="#fff" stroke-width=".7" opacity=".3" fill="none"/>
<path d="M31 116 V64 Q60 50 89 64 V116 Z" fill="url(#${b})" stroke="#cfd3d7" stroke-width=".6"/>
<path d="M34 110 Q34 78 60 75 Q86 78 86 110 Q86 112.6 83.4 112.6 H36.6 Q34 112.6 34 110 Z" fill="url(#${pn})" stroke="#b9bfc5" stroke-width=".6"/>
<rect x="37" y="78.5" width="46" height="18" rx="2.2" fill="${lit ? "#bfe0a2" : "#a7b0a6"}" stroke="#6f7c6d" stroke-width=".7"/>
<text x="60" y="92.2" font-size="${lcd.length > 5 ? 10.5 : 12.5}" font-weight="700" text-anchor="middle" fill="#25331f" ${NT_FONT}>${lcd}</text>
${keys(40, 1)}${keys(80, -1)}
<circle cx="60" cy="104.6" r="5" fill="#eef0f2" stroke="#8f979e" stroke-width=".7"/><rect x="59.1" y="99.8" width="1.8" height="6" rx=".9" fill="#41474d" transform="rotate(${c.on ? 55 : -20} 60 104.6)"/>
<text x="60" y="111.2" font-size="2.4" text-anchor="middle" fill="#8a9097" ${NT_FONT}>Thermomix</text>
<path d="M30 22.5 Q60 28.5 90 22.5 L88 19 Q60 14.5 32 19 Z" fill="url(#${lid})" stroke="#24282c" stroke-width=".6"/>
<path d="M27 21.5 L33 20.5 M93 21.5 L87 20.5" stroke="#383d42" stroke-width="2.6" stroke-linecap="round"/>
<path d="M53 18 V11 Q60 9.6 67 11 V18 Q60 19.4 53 18 Z" fill="rgba(222,236,246,.6)" stroke="#9cadbb" stroke-width=".6"/><ellipse cx="60" cy="11" rx="7" ry="1.5" fill="rgba(255,255,255,.7)" stroke="#9cadbb" stroke-width=".5"/>
</g>
${c.heat ? fpSteam(60, 9) : ""}`;
}
function ntFoodTm6(c) {
  const b = ntId(), st = ntId(), lid = ntId(), sc = ntId(), fr = ntId(), cv = ntId();
  const lit = c.on || c.ready;
  const val = fpReadout(c, c.ready);
  const led = (x, y) => [0, 1, 2].map((r) => [0, 1, 2].map((k) => `<circle cx="${x + k * 2.2}" cy="${y + r * 2.2}" r=".75" fill="${lit && !c.unav ? "#4cd964" : "#d6dbe0"}"/>`).join("")).join("");
  const on = lit && !c.unav;
  // Its screen: three round dials, the time, the temperature and the speed.
  // The one that matters is drawn large so its value reads; the others
  // stay as small rings.
  const big = c.heat ? 1 : c.on ? 2 : 0;
  const ring = (x, r, k) => `<circle cx="${x}" cy="93.5" r="${r}" fill="${on ? "#ffffff" : "#3a4449"}" stroke="${on ? (k === big && c.on ? (c.heat ? "#ef6c00" : "#43a047") : "#c3cad0") : "#4d585e"}" stroke-width="${k === big ? 1.2 : .7}"/>`;
  const smalls = [0, 1, 2].filter((k) => k !== big);
  return `<defs>${ntV(b, "#ffffff", "#e3e6e9")}<linearGradient id="${st}" x1="0" x2="1"><stop offset="0" stop-color="#7f8891"/><stop offset=".32" stop-color="#f1f3f5"/><stop offset=".68" stop-color="#b3bbc2"/><stop offset="1" stop-color="#78818a"/></linearGradient>${ntV(lid, "#4b5259", "#2a2f34")}${ntV(sc, "#fbfcfc", "#e6ebee")}${ntV(fr, "#d9dde1", "#a9b0b6")}<clipPath id="${cv}"><path d="M31 14 V30 Q31 73 60 75 Q89 73 89 30 V14 Z"/></clipPath></defs>
${ntShadow(60, 118, 46)}
<g class="${c.on && !c.heat ? "nta-vib" : ""}">
<path d="M18 40 Q18 22 34 22 H86 Q102 22 102 40 V100 Q102 116 86 116 H34 Q18 116 18 100 Z" fill="url(#${b})" stroke="#c4c9ce" stroke-width=".7"/>
<path d="M24 34 Q26 25 36 25 H60" stroke="#fff" stroke-width="2" fill="none" opacity=".9" stroke-linecap="round"/>
<path d="M32 30 Q32 72 60 74 Q88 72 88 30 Z" fill="#c9ced3"/><path d="M34 31 Q35 69 60 71 Q85 69 86 31" fill="none" stroke="#b3b9bf" stroke-width=".6"/>
<g clip-path="url(#${cv})">${fpBowl(st, 37, 83, 26, 70, 5)}
<path d="M55 30 Q51 49 56 70 H64 Q60 50 64 30 Z" fill="#3a4046" stroke="#22262a" stroke-width=".5"/><path d="M57 34 Q55 49 58 66" stroke="#fff" stroke-width=".7" opacity=".3" fill="none"/></g>
<path d="M31 25.5 Q60 31.5 89 25.5 L87 22 Q60 17.5 33 22 Z" fill="url(#${lid})" stroke="#22262a" stroke-width=".6"/>
<path d="M26 34 Q24 27 31 24.5 L33 26 Q29 28.5 30.5 34 Z M94 34 Q96 27 89 24.5 L87 26 Q91 28.5 89.5 34 Z" fill="#2f3439" stroke="#1d2125" stroke-width=".5"/>
<path d="M53 22 V12 Q60 10.6 67 12 V22 Q60 23.4 53 22 Z" fill="#3a4046" stroke="#22262a" stroke-width=".5"/><ellipse cx="60" cy="12" rx="7" ry="1.6" fill="#5b636a"/>
${led(24, 64)}${led(91.6, 64)}
<rect x="31.6" y="81" width="55" height="25.6" rx="3.2" fill="url(#${fr})"/><rect x="32.6" y="82" width="53" height="23.6" rx="2.5" fill="#000" opacity=".25"/><rect x="33.2" y="82.6" width="51.8" height="22.4" rx="2.2" fill="${on ? `url(#${sc})` : "#2e373c"}"/><path d="M34.5 84 H83.5" stroke="#fff" stroke-width=".6" opacity="${on ? .9 : .15}"/>
${ring(46.5, 10.4, big)}${ring(68.8, 5, smalls[0])}${ring(79.2, 5, smalls[1])}
<text x="46.5" y="95.4" font-size="${val.length > 4 ? 6.6 : 7.6}" font-weight="700" text-anchor="middle" fill="#263238" ${NT_FONT}>${val.replace(/ W$/, "")}</text>${val ? `<text x="46.5" y="100.6" font-size="3.4" font-weight="700" text-anchor="middle" fill="#607d8b" ${NT_FONT}>W</text>` : ""}
<circle cx="92.6" cy="93.8" r="6.2" fill="url(#${fr})" stroke="#8f979e" stroke-width=".6"/><circle cx="92.6" cy="93.8" r="4.3" fill="none" stroke="#fff" stroke-width=".9" opacity=".85"/>
<text x="26.2" y="94.6" font-size="2" font-weight="700" text-anchor="middle" fill="#9aa1a8" ${NT_FONT}>VORWERK</text><text x="94.5" y="75" font-size="2.5" text-anchor="middle" fill="#7a8188" ${NT_FONT}>thermomix</text>
</g>
${c.heat ? fpSteam(60, 10) : ""}`;
}
// The picture in the drawing's box, cut to its crop, else filling it.
function ntPhotoImage(ph, other) {
  const href = esc(other || ph.href);
  if (!ph.crop) return `<image href="${href}" x="0" y="-10" width="120" height="135" preserveAspectRatio="xMidYMid slice"/>`;
  const [cx, cy, cw, ch] = ph.crop;
  return `<image href="${href}" x="${cvF(-cx / cw * 120)}" y="${cvF(-10 - cy / ch * 135)}" width="${cvF(12000 / cw)}" height="${cvF(13500 / ch)}" preserveAspectRatio="none"/>`;
}
// The area in the box's own units.
const ntPhotoArea = (a) => ({ x0: cvF(a[0] * 1.2), y0: cvF(-10 + a[1] * 1.35), x1: cvF((a[0] + a[2]) * 1.2), y1: cvF(-10 + (a[1] + a[3]) * 1.35) });
// A cover over its photo, by its drawing.
function ntPhotoCover(c, b) {
  const arrow = (x) => c.noArrow ? "" : cvArrow(x);
  const { x0, y0, x1, y1 } = b, w = x1 - x0, h = y1 - y0, cl = ntId(), dir = cvDir(c), kind = c.kind;
  const p = Math.max(0, Math.min(100, Number(c.p) || 0)), yb = cvF(y0 + h * (1 - p / 100));
  const clip = (top, bot) => `<clipPath id="${cl}"><rect x="${x0}" y="${top}" width="${cvF(w)}" height="${cvF(Math.max(0, bot - top))}"/></clipPath>`;
  const shade = (y) => y > y0 + .5 ? `<rect x="${x0}" y="${cvF(y)}" width="${cvF(w)}" height="${cvF(Math.min(4, y1 - y + 4))}" fill="#000" opacity=".16"/>` : "";
  const light = c.light ? `<rect x="${x0}" y="${y0}" width="${cvF(w)}" height="${cvF(h)}" fill="${c.lightColor || "#ffe9b0"}" opacity=".22"/>` : "";
  if (kind === "cov_venetian" || kind === "cov_raffstore" || kind === "cov_pergola") {
    const mc = c.color || (kind === "cov_venetian" ? "#eef0f1" : "#9aa1a7");
    const gap = cvF(Math.max(3, Math.min(7, h / 16)));
    const slats = cvSlats(x0, x1, y0, y1, kind === "cov_pergola" ? 100 : p, kind === "cov_pergola" ? p : c.tilt, mc, cvTone(mc, -.4), cvTone(mc, -.3), kind !== "cov_venetian", gap);
    return `<defs>${clip(y0 - 2, y1 + 4)}</defs>${light}<g clip-path="url(#${cl})">${slats}</g>${arrow(dir)}`;
  }
  if (kind === "cov_awning") {
    const e = p / 100, cA = c.fabric || "#3f6f8f", cB = c.stripes === false ? cvTone(cA, .06) : "#eef0f1", fy = y0 + h * e, sp = w * .08 * e, fx0 = x0 - sp, fx1 = x1 + sp, n = 8;
    if (e < .02) return arrow(dir === "up" ? "down" : dir === "down" ? "up" : "");
    let st = "";
    for (let i = 0; i < n; i++) {
      const a = x0 + w * i / n, bb = x0 + w * (i + 1) / n, a2 = fx0 + (fx1 - fx0) * i / n, b2 = fx0 + (fx1 - fx0) * (i + 1) / n;
      st += `<polygon points="${cvF(a)} ${y0} ${cvF(bb)} ${y0} ${cvF(b2)} ${cvF(fy)} ${cvF(a2)} ${cvF(fy)}" fill="${i % 2 ? cB : cA}"/>`;
    }
    let sc = "";
    for (let i = 0; i < n * 2; i++) { const xa = fx0 + (fx1 - fx0) * i / (n * 2), xb = fx0 + (fx1 - fx0) * (i + 1) / (n * 2); sc += `<path d="M${cvF(xa)} ${cvF(fy)} V${cvF(fy + 4)} Q${cvF((xa + xb) / 2)} ${cvF(fy + 6.4)} ${cvF(xb)} ${cvF(fy + 4)} V${cvF(fy)} Z" fill="${Math.floor(i / 2) % 2 ? cB : cA}" stroke="#000" stroke-opacity=".12" stroke-width=".3"/>`; }
    return `${shade(fy + 6)}<g${dir ? ` class="cv-sway"` : ""}>${st}</g><rect x="${cvF(fx0 - 1)}" y="${cvF(fy - .6)}" width="${cvF(fx1 - fx0 + 2)}" height="2" rx="1" fill="#8f969c"/>${sc}${arrow(dir === "up" ? "down" : dir === "down" ? "up" : "")}`;
  }
  if (kind === "cov_curtain") {
    const fd = ntId();
    return `<defs>${cvFold(fd)}</defs>${light}${cvCurtain(x0, x1, y0, y1, p, c.opening || "center", c.fabric || "#d8cab2", dir, fd)}${c.noArrow ? "" : cvArrowH(cvCurtainDir(c))}`;
  }
  if (kind === "cov_blind") {
    const color = c.fabric || "#d8cab2", bar = c.color || "#b6bcc1";
    const weave = []; for (let x = x0 + 2; x < x1; x += 3) weave.push(`<path d="M${cvF(x)} ${y0} V${y1}" stroke="#000" stroke-opacity=".05" stroke-width=".6"/>`);
    return `<defs>${clip(y0, yb)}</defs>${light}<g clip-path="url(#${cl})"><g${dir ? ` class="cv-sway"` : ""}><rect x="${x0}" y="${y0}" width="${cvF(w)}" height="${cvF(h)}" fill="${color}" opacity=".93"/>${weave.join("")}</g></g>
${yb > y0 + 1 ? `<rect x="${cvF(x0 - .5)}" y="${cvF(yb - 2.2)}" width="${cvF(w + 1)}" height="2.6" rx="1" fill="${bar}"/>` : ""}${arrow(dir)}`;
  }
  // A roller shutter: its apron of slats down to the position.
  const mc = c.color || "#e4e7e9", step = cvF(Math.max(2.6, Math.min(5.5, h / 20)));
  const slats = []; for (let y = y0 - step * 2; y < y1 + step * 2; y += step) slats.push(`<path d="M${x0} ${cvF(y)} H${x1}" stroke="${cvTone(mc, .55)}" stroke-width="${cvF(step * .22)}"/><path d="M${x0} ${cvF(y + step * .76)} H${x1}" stroke="${cvTone(mc, -.38)}" stroke-width="${cvF(step * .16)}"/>`);
  return `<defs>${clip(y0, yb)}</defs>${light}${shade(yb)}<g clip-path="url(#${cl})"><rect x="${x0}" y="${y0}" width="${cvF(w)}" height="${cvF(h)}" fill="${mc}"/><g${dir ? ` class="cv-${dir}"` : ""} style="--cv-step:${step}px">${slats.join("")}</g></g>
${yb > y0 + .5 ? `<rect x="${x0}" y="${cvF(yb - step * .6)}" width="${cvF(w)}" height="${cvF(step * .6)}" fill="${cvTone(mc, -.35)}"/><path d="M${x0} ${cvF(yb - .2)} H${x1}" stroke="${cvTone(mc, -.6)}" stroke-width=".6"/>` : ""}${arrow(dir)}`;
}
// A door, a window, a garage door or a gate over its photo, taken shut: the
// piece of the photo in the area is the leaf, and it moves as the real one
// does, swinging to its hinge, sliding aside, rising into the ceiling. Behind
// it the room's darkness for a door, the photo itself for a window. A gate's
// photo is taken open: the gate is drawn over it, closing into the opening.
function ntPhotoDetector(c, b) {
  if (c.kind !== "det_door") return "";
  const { x0, y0, x1, y1 } = b, w = x1 - x0, h = y1 - y0, n2 = (v) => +v.toFixed(2);
  const F = c.smoke ? 1 : 0;
  const swing = c.trans ? `dur="${DOOR_TRANS_S}s" begin="0s" fill="freeze" data-swing="${c.trans.toFixed(2)}" calcMode="spline" keyTimes="0;1" keySplines=".45 0 .25 1"` : "";
  const style = c.window ? (c.wstyle === "sliding" ? "sliding" : c.wstyle === "double" ? "double" : "casement") : c.style || "wood";
  const outside = c.window || style === "gate" || style === "sliding_gate" || style === "garage";
  const img = ntPhotoImage(c.photo);
  const cl = ntId(), dk = ntId(), wide = ntId(), wideR = ntId();
  // What shows once the leaf has gone: the room, dark, its floor lighter
  // towards the front; for a window the view through it, brighter, as air;
  // for a gate what lies beyond it, taken from the photo just above it.
  const behind = c.window
    ? `<g clip-path="url(#${cl})">${img}<rect x="${x0}" y="${y0}" width="${n2(w)}" height="${n2(h)}" fill="#fff" opacity=".18"/></g>`
    : outside
      ? ""
      : `<rect x="${x0}" y="${y0}" width="${n2(w)}" height="${n2(h)}" fill="url(#${dk})"/><path d="M${x0} ${y1} L${n2(x0 + w * .16)} ${n2(y1 - h * .2)} H${n2(x1 - w * .16)} L${x1} ${y1} Z" fill="#4a5057" opacity=".8"/><path d="M${n2(x0 + w * .16)} ${n2(y1 - h * .2)} H${n2(x1 - w * .16)}" stroke="#000" stroke-width=".5" opacity=".5"/>`;
  // The leaf, the photo cut to the area, a shade on it as it turns away.
  const leafOf = (cx0, cx1, shade = .3) => `<g><defs><clipPath id="${cl}l${n2(cx0)}"><rect x="${n2(cx0)}" y="${y0}" width="${n2(cx1 - cx0)}" height="${n2(h)}"/></clipPath></defs><g clip-path="url(#${cl}l${n2(cx0)})">${img}<rect x="${n2(cx0)}" y="${y0}" width="${n2(cx1 - cx0)}" height="${n2(h)}" fill="#000" opacity="${n2(shade * F)}">${c.trans ? `<animate attributeName="opacity" values="${n2(shade * (1 - F))};${n2(shade * F)}" ${swing}/>` : ""}</rect></g></g>`;
  const move = (dx, dy, inner, clip) => `<g clip-path="url(#${clip})"><g transform="translate(${n2(dx * F)} ${n2(dy * F)})">${c.trans ? `<animateTransform attributeName="transform" type="translate" values="${n2(dx * (1 - F))} ${n2(dy * (1 - F))};${n2(dx * F)} ${n2(dy * F)}" ${swing}/>` : ""}${inner}</g></g>`;
  const squash = (hx, inner, k = .74) => `<g transform="translate(${n2(hx)} 0)"><g transform="scale(${n2(1 - k * F)} 1)">${c.trans ? `<animateTransform attributeName="transform" type="scale" values="${n2(1 - k * (1 - F))} 1;${n2(1 - k * F)} 1" ${swing}/>` : ""}<g transform="translate(${n2(-hx)} 0)">${inner}</g></g></g>`;
  // A gate drawn in the opening: its frame, its bars, a rail across.
  const gcol = c.frame === "white" ? "#eef1f3" : "#33393f";
  const bars = (bx0, bx1) => {
    const bw = bx1 - bx0, step = Math.max(2.2, w / 18);
    let o = `<rect x="${n2(bx0 + .8)}" y="${n2(y0 + .8)}" width="${n2(bw - 1.6)}" height="${n2(h - 1.6)}" fill="none" stroke="${gcol}" stroke-width="1.6"/><path d="M${n2(bx0)} ${n2(y0 + h * .34)} H${n2(bx1)}" stroke="${gcol}" stroke-width="1.3"/>`;
    for (let x = bx0 + step; x < bx1 - step * .5; x += step) o += `<path d="M${n2(x)} ${y0} V${y1}" stroke="${gcol}" stroke-width="${n2(Math.max(.6, step * .28))}"/>`;
    return `<g>${o}</g>`;
  };
  let leaf;
  if (style === "garage") {
    // A sectional door drawn in the opening, its panels and their grooves,
    // a seal along the bottom; it rises into the ceiling.
    const gc = c.frame === "white" ? "#eef1f3" : "#3d444b", n = 5;
    let p = `<rect x="${x0}" y="${y0}" width="${n2(w)}" height="${n2(h)}" fill="${gc}"/>`;
    for (let i = 1; i < n; i++) { const y = y0 + h * i / n; p += `<path d="M${x0} ${n2(y)} H${x1}" stroke="#000" stroke-opacity=".28" stroke-width=".7"/><path d="M${x0} ${n2(y + .7)} H${x1}" stroke="#fff" stroke-opacity=".3" stroke-width=".5"/>`; }
    for (let i = 0; i < n; i++) { const y = y0 + h * (i + .5) / n; p += `<path d="M${n2(x0 + w * .04)} ${n2(y)} H${n2(x1 - w * .04)}" stroke="#000" stroke-opacity=".08" stroke-width="${n2(h / n * .35)}"/>`; }
    p += `<rect x="${x0}" y="${n2(y1 - 1.6)}" width="${n2(w)}" height="1.6" fill="#1d2126"/><rect x="${n2(x0 + w / 2 - 3)}" y="${n2(y1 - h / n * .6)}" width="6" height="1.4" rx=".7" fill="#000" opacity=".35"/>`;
    leaf = move(0, -h, `<g>${p}</g>`, cl);
  }
  else if (style === "pocket") leaf = move(-w, 0, leafOf(x0, x1, 0), cl);
  else if (style === "sliding" || style === "sliding_glass" || style === "sliding_wood") leaf = move(-w * .92, 0, leafOf(x0, x1, .12), wide);
  else if (style === "double") {
    const mx = x0 + w / 2;
    leaf = squash(x0, leafOf(x0, mx)) + squash(x1, leafOf(mx, x1));
  } else if (style === "sliding_gate") leaf = move(c.gateSide === "right" ? w * .95 : -w * .95, 0, bars(x0, x1), c.gateSide === "right" ? wideR : wide);
  else if (style === "gate" && c.gateLeaves === 2) {
    const mx = x0 + w / 2;
    leaf = squash(x0, bars(x0, mx), .88) + squash(x1, bars(mx, x1), .88);
  } else if (style === "gate") leaf = squash(c.gateSide === "right" ? x1 : x0, bars(x0, x1), .9);
  else leaf = squash(x0, leafOf(x0, x1));
  // Shaken: the leaf trembles. Broken: the glass cracks.
  const shake = c.vib ? `<animateTransform attributeName="transform" type="translate" values="0 0;.6 0;-.6 0;.4 0;0 0" dur=".25s" repeatCount="indefinite"/>` : "";
  const cx = x0 + w * .55, cy = y0 + h * .4;
  const crack = c.cracked ? `<g stroke="#fff" stroke-width=".7" fill="none" opacity=".9">${[[-.3, -.25], [.32, -.2], [.28, .3], [-.25, .28], [.02, -.4], [-.36, .05]].map(([u, v]) => `<path d="M${n2(cx)} ${n2(cy)} L${n2(cx + u * w * .5)} ${n2(cy + v * h * .45)} l${n2(u * 4)} ${n2(v * 6 + 2)}"/>`).join("")}<circle cx="${n2(cx)}" cy="${n2(cy)}" r="1.4" fill="#fff"/></g>` : "";
  return `<defs><clipPath id="${cl}"><rect x="${x0}" y="${y0}" width="${n2(w)}" height="${n2(h)}"/></clipPath><clipPath id="${wide}"><rect x="${n2(x0 - w)}" y="${y0}" width="${n2(w * 2)}" height="${n2(h)}"/></clipPath><clipPath id="${wideR}"><rect x="${x0}" y="${y0}" width="${n2(w * 2)}" height="${n2(h)}"/></clipPath>${ntV(dk, "#2b3036", "#14171a")}</defs>
${behind}<g>${shake}${leaf}</g>${crack}`;
}
// A cover's arrow while it moves, drawn once over every area (an awning comes
// down as it opens).
const ntPhotoCoverArrow = (c) => { const dir = cvDir(c); if (c.kind === "cov_curtain") return cvArrowH(cvCurtainDir(c)); return cvArrow(c.kind === "cov_awning" ? (dir === "up" ? "down" : dir === "down" ? "up" : "") : dir); };
const NT_PHOTO_OVERLAYS = { cov: [ntPhotoCover, ntPhotoCoverArrow], det: [ntPhotoDetector, () => ""] };
// The photo, its rounded corners, and the movement over it.
function ntPhoto(d) {
  const ph = d.photo, cp = ntId(), over = NT_PHOTO_OVERLAYS[String(d.kind || "").split("_")[0]];
  return `<defs><clipPath id="${cp}"><rect x="0" y="-10" width="120" height="135" rx="7"/></clipPath></defs>
<g clip-path="url(#${cp})"><rect x="0" y="-10" width="120" height="135" fill="#808080" opacity=".18"/><g class="ph-img">${ntPhotoImage(ph)}</g>${over ? ph.areas.map((a) => over[0]({ ...d, noArrow: true }, ntPhotoArea(a))).join("") + over[1](d) : ""}</g>
<rect x=".3" y="-9.7" width="119.4" height="134.4" rx="7" fill="none" stroke="#000" stroke-opacity=".14" stroke-width=".6"/>`;
}
const NT_DRAW = { gas_fireplace: ntGasFireplace, fp_tm31: ntFoodTm31, fp_tm6: ntFoodTm6, rack_box: ntRackBox, rack_accordion: ntRackAccordion, rack_frame: ntRackFrame, vlv_aqara: ntValveAqara, vlv_tuya: ntValveTuya,  fb_plus: ntFingerbot, fb_switchbot: ntFingerbot, fb_classic: ntFingerbot, ths_co2_eink: ntCo2Eink, ths_switchbot_co2: (c) => ntSbPro(c, true), ths_switchbot_pro: (c) => ntSbPro(c, false), ths_switchbot_meter: (c) => ntSbMeter(c, false), ths_switchbot_plus: (c) => ntSbMeter(c, true), ths_switchbot_outdoor: ntSbOutdoor, ths_co2_box: ntCo2Box, ths_co2_netatmo: (c) => ntCo2Netatmo(c, false), ths_co2_netatmo_module: (c) => ntCo2Netatmo(c, true), cov_shutter: ntCovShutter, cov_blind: ntCovBlind, cov_venetian: (c) => ntCovVenetian(c, false), cov_raffstore: (c) => ntCovVenetian(c, true), cov_pergola: ntCovPergola, cov_awning: ntCovAwning, cov_curtain: ntCovCurtain, pellet_grill: ntPelletGrill, ths_disc: ntThsDisc, ths_square: ntThsSquare, ths_cushion: ntThsCushion, ths_stick: ntThsStick, ths_lcd_stand: ntThsLcdStand, ths_lcd_probe: ntThsLcdProbe, ths_lcd_round: ntThsLcdRound, dryer: ntFilamentDryer, humidifier: ntHumidifier, circulator: ntCirculator, irr_sprinkler: ntIrrSprinkler, irr_tap: ntIrrTap, irr_drip: ntIrrDrip, irr_flowers: ntIrrFlowers, lit_globe: ntLitterGlobe, lit_box: ntLitterBox, det_smoke: ntDetSmoke, det_co: ntDetCo, det_leak: ntDetLeak, det_door: ntDetDoor, det_vibration: ntDetVibration, det_glass: ntDetGlass, spk_smart: ntSpkSmart, spk_homepod_mini: ntSpkMini, spk_sonos_one: ntSpkOne, spk_bookshelf: ntSpkShelf, spk_sonos_move: ntSpkMove, spk_soundbar: ntSpkBar, spk_echo_dot: ntSpkDot, spk_echo_dot_max: ntSpkDotMax, spk_nest_mini: ntSpkNest, spk_sonos_era100: ntSpkEra100, spk_sonos_era300: ntSpkEra300, spk_bose_wave: ntSpkWave, spk_bose_500: ntSpkBose500, spk_bose_soundlink: ntSpkFlex, spk_bose_soundbar: ntSpkBoseBar, spk_sonos_five: ntSpkFive, spk_sonos_play: ntSpkPlay, spk_sonos_roam: ntSpkRoam, spk_sonos_ray: ntSpkRay, spk_sonos_amp: ntSpkAmp, spk_sonos_port: ntSpkPort, spk_bose_ultra: ntSpkBoseUltra, spk_bose_portable: ntSpkBosePortable, spk_bose_amp: ntSpkBoseAmp, spk_focal_bird: ntSpkFocalBird, spk_focal_od6: ntSpkFocalOd6, spk_denon_avr: ntSpkDenon, spk_avr: ntSpkAvr, spk_wiim_amp: ntSpkWiim, spk_smart_clock: ntSpkClock, str_apple_tv: (c) => strZoom(strAppleTv(c), 54, 1.45), str_fire_tv_cube: strFireCube, str_fire_tv_stick: (c) => strStick(c, true), str_google_tv_streamer: strGoogleStreamer, str_chromecast: strChromecast, str_shield: strShield, str_shield_pro: strShieldPro, str_roku: strRoku, str_mi_box: strMiBox, str_freebox: strFreebox, str_decoder: strDecoder, str_box: strBox, str_stick: (c) => strStick(c, false), con_ps1: conPs1, con_ps2: conPs2, con_ps3: conPs3, con_ps4: (c) => conPs4(c, false), con_ps4_pro: (c) => conPs4(c, true), con_ps5: conPs5, con_xbox: conXbox, con_xbox_360: conX360, con_xbox_one: conXone, con_xbox_series_x: conXsx, con_xbox_series_s: conXss, con_switch: (c) => conSwitch(c, false), con_switch_2: (c) => conSwitch(c, true), con_switch_lite: conSwitchLite, con_ps_vita: conVita, con_nes: conNes, con_snes: conSnes, con_n64: conN64, con_gamecube: conGamecube, con_wii: conWii, con_megadrive: conMegadrive, tank: ntTank, fws: ntFresh, solth: ntSolarThermal, wood: ntWoodStove, mob_scooter: mobScooter, mob_offroad: mobOffroad, mob_ebike: mobEbike, mob_gyropode: mobGyropode, mob_motorcycle: mobMotorcycle, meter_box: ntMeterBox, meter_dome: ntMeterDome, meter_gas: ntGas, meter_water: ntWater, booster: ntBooster, sump: ntSump, pool: ntPoolRobot, floor: ntFloor, spa: ntSpa, sauna: ntSauna, aquarium: ntAquarium, linky: ntLinky, tree: ntTree };
// What a tint leaves alone: a part wrapped by ntKeep (an app's tile, a
// display, a tyre).
const ntKeep = (s) => `<!--k-->${s}<!--/k-->`;
// The drawings a tint applies to: appliances, not the scenes around them
// (a sump's pit, a floor, a garden, a pool, a roof).
const NT_TINTED = /^(con_|str_|spk_|lit_|det_|mob_|irr_tap$|dryer$|humidifier$|fws$|wood$|booster$|circulator$|pellet_grill$)/;
// Winter (dosing-tank-card #3): flakes falling slowly over a drawing, snow
// lying on what it covers, a cover over a spa, a pool or a grill.
function ntFlakes(n = 12) {
  // In a group of their own, so winter_snowfall: false can leave them out.
  return `<g class="nt-fl">${ntFlakesOnly(n)}</g>`;
}
function ntFlakesOnly(n) {
  return Array.from({ length: n }, (_, i) => {
    const x = 4 + ((i * 37) % 112), r = (.7 + (i % 3) * .3).toFixed(1), d = (3.6 + (i % 5) * .6).toFixed(1), b = (-((i * .83) % 4)).toFixed(2);
    return `<circle cx="${x}" cy="-8" r="${r}" fill="#e3f1fa" stroke="#8fb8d2" stroke-width=".35"><animateTransform attributeName="transform" type="translate" values="0 0;5 130" dur="${d}s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;.2" keyTimes="0;.1;.8;1" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></circle>`;
  }).join("");
}
// A lump of snow along a top edge, from x0 to x1 at y, puffing up by h.
const ntSnowCap = (x0, x1, y, h = 3) => {
  const n = Math.max(2, Math.round((x1 - x0) / 12)), w = (x1 - x0) / n;
  let d = `M${x0} ${y + 1}`;
  for (let i = 0; i < n; i++) d += ` Q${(x0 + w * (i + .5)).toFixed(1)} ${(y - h * (.8 + (i % 2) * .4)).toFixed(1)} ${(x0 + w * (i + 1)).toFixed(1)} ${y + .4}`;
  return `<path d="${d} L${x1} ${y + 1.6} Q${(x0 + x1) / 2} ${y + 3.2} ${x0} ${y + 1.6} Z" fill="#f7fbfd" stroke="#d6e6ef" stroke-width=".4"/>`;
};
// A grill under its cover: the fabric draped down to the ground, its folds,
// its drawstring, the feet or wheels showing, snow on top.
function ntGrillCover(layout) {
  const [W, H] = { timberline: [96, 76], drum: [94, 64], cart: [86, 72], vertical: [56, 94] }[layout] || [90, 70];
  const x0 = 60 - W / 2, x1 = 60 + W / 2, y1 = 102, y0 = y1 - H, g = ntId();
  const top = layout === "drum" ? `Q${x0} ${y0 - 6} 60 ${y0 - 8} Q${x1} ${y0 - 6} ${x1} ${y0 + 10}` : `Q${x0} ${y0} ${x0 + 8} ${y0} H${x1 - 8} Q${x1} ${y0} ${x1} ${y0 + 8}`;
  const folds = [.22, .41, .63, .82].map((k, i) => `<path d="M${(x0 + W * k).toFixed(1)} ${y0 + 6 + (i % 2) * 4} Q${(x0 + W * k + (i % 2 ? 3 : -3)).toFixed(1)} ${y0 + H * .55} ${(x0 + W * k + (i % 2 ? -1 : 1)).toFixed(1)} ${y1 - 3}" stroke="rgba(0,0,0,.28)" stroke-width="1.1" fill="none"/>`).join("");
  return `<defs>${ntV(g, "#4a5158", "#23272b")}</defs>
<ellipse cx="60" cy="${y1 + 4}" rx="${W / 2 + 6}" ry="3.4" fill="#000" opacity=".18"/>
<rect x="${x0 + 6}" y="${y1 - 2}" width="4" height="7" rx="1" fill="#2b3035"/><rect x="${x1 - 10}" y="${y1 - 2}" width="4" height="7" rx="1" fill="#2b3035"/>
<path d="M${x0 + 2} ${y1} L${x0} ${y0 + 10} ${top} L${x1 - 2} ${y1} Q60 ${y1 + 3} ${x0 + 2} ${y1} Z" fill="url(#${g})" stroke="#1b1e21" stroke-width=".8"/>
${folds}
<path d="M${x0 + 2} ${y1 - 3} Q60 ${y1} ${x1 - 2} ${y1 - 3}" stroke="#15181a" stroke-width="1.4" fill="none"/>
<rect x="${60 - 9}" y="${y0 + H * .3}" width="18" height="7" rx="1.4" fill="#5b636b" stroke="#2b3035" stroke-width=".5"/>
${ntSnowCap(x0 + 3, x1 - 3, layout === "drum" ? y0 - 5 : y0 + 1, 3.6)}`;
}
// A spa under its insulated cover, folded down the middle, snow on it.
function ntSpaCover() {
  const P = (u, v) => [30 + 80 * u - 22 * v, 40 + 22 * v], pt = (u, v, dy = 0) => { const [x, y] = P(u, v); return `${x.toFixed(1)} ${(y + dy).toFixed(1)}`; };
  return `<path d="M${pt(-.03, -.04, -4)} L${pt(1.03, -.04, -4)} L${pt(1.03, 1.05, -4)} L${pt(-.03, 1.05, -4)} Z" fill="#6d7680" stroke="#454c53" stroke-width=".7"/>
<path d="M${pt(-.03, 1.05, -4)} L${pt(1.03, 1.05, -4)} L${pt(1.03, 1.05, 1)} L${pt(-.03, 1.05, 1)} Z" fill="#4f575f"/>
<path d="M${pt(.5, -.04, -4)} L${pt(.5, 1.05, -4)}" stroke="#454c53" stroke-width="1"/>
<path d="M${pt(.02, .05, -4.6)} L${pt(.98, .05, -4.6)} L${pt(.98, .95, -4.6)} L${pt(.02, .95, -4.6)} Z" fill="#f7fbfd" stroke="#d6e6ef" stroke-width=".4" opacity=".92"/>
<path d="M${pt(.12, 1.05, 1.2)} L${pt(.12, 1.05, 4)} M${pt(.88, 1.05, 1.2)} L${pt(.88, 1.05, 4)}" stroke="#2b3035" stroke-width="1.2"/>`;
}
function ntWinter(d, body) {
  if (/^pellet_grill/.test(d.kind)) return ntGrillCover(d.layout) + ntFlakes();
  if (d.kind === "spa") return body + ntSpaCover() + ntFlakes();
  const snow = "#f4f9fc", edge = 'stroke="#d6e6ef" stroke-width=".5"';
  // The garden: the timer taken in and the tap drained, snow on the ground,
  // the lawn and the beds.
  if (d.kind === "irr_tap") return body + `<ellipse cx="56" cy="101" rx="46" ry="7" fill="${snow}" ${edge}/><ellipse cx="40" cy="99.4" rx="14" ry="3" fill="#ffffff" opacity=".8"/>` + ntFlakes();
  // Snow over the whole lawn, rim included, in soft drifts.
  const drifts = (cx, cy, rx, ry) => [[-.55, -.15, .22], [-.15, .25, .26], [.3, -.2, .2], [.55, .2, .18]]
    .map(([u, v, k]) => `<ellipse cx="${(cx + u * rx).toFixed(1)}" cy="${(cy + v * ry).toFixed(1)}" rx="${(rx * k).toFixed(1)}" ry="${(ry * k * .9).toFixed(1)}" fill="#ffffff" opacity=".85"/>`).join("");
  if (d.kind === "irr_sprinkler") return body + `<ellipse cx="60" cy="104.6" rx="59.4" ry="18.8" fill="${snow}" ${edge}/><path d="M1 105 V108 A59 18.6 0 0 0 119 108 V105 A59 18.6 0 0 1 1 105 Z" fill="#e3eef5"/>${drifts(60, 103, 58, 18)}<ellipse cx="60" cy="103.4" rx="5" ry="1.5" fill="#37424c" opacity=".7"/>` + ntFlakes(16);
  if (d.kind === "irr_flowers") return body.replace(/<!--wf-->[\s\S]*?<!--\/wf-->/, "") + `<ellipse cx="58" cy="95.4" rx="54.4" ry="18.4" fill="${snow}" ${edge}/>${drifts(58, 95, 54, 18)}` + body.match(/<!--wf-->([\s\S]*?)<!--\/wf-->/)[1] + ntFlakes(16);
  if (d.kind === "irr_drip") return body + `<path d="M9 72.6 L89 72.6 L106 36 L27 36 Z" fill="${snow}" ${edge} opacity=".88"/>${ntSnowCap(6, 92, 73, 2.4)}` + ntFlakes();
  return body + ntFlakes();
}
function ntSvg(d) {
  ntN = 0;
  const draw = NT_DRAW[d && d.kind] || ntLinky;
  if (d && d.photo) return `<svg class="nt-svg" viewBox="0 -10 120 135">${ntPhoto(d)}</svg>`;
  const body = d && d.winter ? ntWinter(d, draw(d)) : draw(d || {});
  // A speaker sold in the colour asked is drawn in it, and not tinted.
  let tint = d && d.tint && NT_TINTED.test(d.kind || "") ? d.tint : "";
  if (tint && /^spk_/.test(d.kind) && d.color) {
    const n = ntN;
    ntN = 0;
    const plain = draw({ ...d, color: "" });
    ntN = 0;
    if (plain !== draw(d)) tint = "";
    ntN = n;
  }
  return `<svg class="nt-svg" viewBox="0 -10 120 135">${tint ? ntTint(body, tint) : body}</svg>`;
}
function ntHtml(cls, d) {
  const flags = ["nt", `nt-k-${(d && d.kind) || "none"}`, d && /^(irr|lit|det|spk)_/.test(d.kind) ? "nt-c7" : "", d && d.on ? "nt-on" : "", d && d.unav ? "nt-unav" : "", d && d.photo ? "nt-photo" : ""].filter(Boolean).join(" ");
  return `
        <div class="machine ${cls} ${flags}">${ntSvg(d)}</div>`;
}

// The new drawings' motion: nothing moves until the machine runs (nt-on),
// except a meter's LED and an alarm's beacon. Each part's stagger is its --d0.
const NT_CSS = `
        .cv-up{animation:cv-up .9s linear infinite}.cv-down{animation:cv-down .9s linear infinite}
        @keyframes cv-up{from{transform:translateY(0)}to{transform:translateY(calc(-1 * var(--cv-step, 4.2px)))}}
        @keyframes cv-down{from{transform:translateY(0)}to{transform:translateY(var(--cv-step, 4.2px))}}
        .cv-arrow{animation:cv-blink 1s ease-in-out infinite}@keyframes cv-blink{0%,100%{opacity:.35}50%{opacity:1}}
        .cv-sway{animation:cv-sway 1.8s ease-in-out infinite;transform-origin:60px 14px}@keyframes cv-sway{0%,100%{transform:skewX(0)}50%{transform:skewX(.6deg)}}
        .co2-pulse{animation:co2-pulse 1.6s ease-in-out infinite}@keyframes co2-pulse{0%,100%{opacity:.45}50%{opacity:1}}
        .fb-tap{animation:fb-tap 1.4s ease-in-out infinite}@keyframes fb-tap{0%,12%,100%{transform:rotate(0deg)}34%,56%{transform:rotate(44deg)}}
        .fb-hit{animation:fb-hit 1.4s ease-in-out infinite}@keyframes fb-hit{0%,30%,62%,100%{opacity:0}36%,54%{opacity:.1}}
        .fb-blink{animation:fb-blink 1s steps(2) infinite}@keyframes fb-blink{50%{opacity:.15}}
        .fb-bolt{animation:fb-bolt 1.6s ease-in-out infinite}@keyframes fb-bolt{0%,100%{opacity:.4}50%{opacity:1}}
        svg.nt-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .ntfd-h{fill:none;stroke:#ff6d00;stroke-width:1.8;stroke-linecap:round;opacity:0;animation:ntfd-heat 2.4s ease-in-out infinite;animation-delay:calc(var(--d0,0s) + var(--anim-offset,0s))}
        @keyframes ntfd-heat{0%{opacity:0;transform:translateY(4px)}40%{opacity:1}100%{opacity:0;transform:translateY(-7px)}}
        .nt-on .ntfd-roll{animation:ntfd-roll 2.4s linear infinite;animation-delay:var(--anim-offset,0s)}
        @keyframes ntfd-roll{to{transform:translateY(76px)}}
        .nt-on .ntg-smoke{transform-box:fill-box;transform-origin:center bottom;animation:ntg-smoke 4s ease-out infinite;animation-delay:calc(var(--d0,0s) + var(--anim-offset,0s))}
        .nt-on .ntg-dense{animation-duration:2s}
        @keyframes ntg-smoke{0%{transform:translate(0,4px) scale(.7);opacity:0}25%{opacity:.75}100%{transform:translate(4px,-14px) scale(1.6);opacity:0}}
        .machine.nt:not(.nt-on) .nt-run{display:none}
        .machine.nt-unav{opacity:.45;filter:grayscale(1)}
        .ntd1{--d0:.3s}.ntd2{--d0:.7s}.ntd3{--d0:1.1s}.ntd4{--d0:1.5s}.ntd5{--d0:1.9s}.ntd6{--d0:2.3s}
        .nt-on .nta-spin{transform-box:fill-box;transform-origin:center;animation:nt-spin .6s linear infinite}
        .nt-on .nta-spin-slow{transform-box:fill-box;transform-origin:center;animation:nt-spin 4s linear infinite}
        .nt-on .nta-flow{animation:nt-flow .8s linear infinite}
        .nt-on .nta-flow-fast{animation:nt-flow .4s linear infinite}
        .nt-on .nta-rise{transform-box:fill-box;animation:nt-rise 2.4s ease-in infinite}
        .nt-on .nta-steam{transform-box:fill-box;transform-origin:center bottom;animation:nt-steam 2.8s ease-out infinite}
        .nt-on .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-k-sump .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-on .nta-twinkle{animation:nt-twinkle 1.3s ease-in-out infinite}
        .nt-on .nta-frost{transform-box:fill-box;transform-origin:center;animation:nt-frost 2.4s ease-in-out infinite}
        .nt-on .nta-shimmer{animation:nt-shimmer 3s ease-in-out infinite}
        .nta-glow{animation:nt-glow 1.8s ease-in-out infinite}
        .nt-on .nta-warm{animation:nt-warm 2.6s ease-in-out infinite}
        .nt-on .nta-pop{transform-box:fill-box;transform-origin:center;animation:nt-pop 1.6s ease-out infinite}
        .nt-on .nta-sway{transform-box:fill-box;transform-origin:center bottom;animation:nt-sway 3.2s ease-in-out infinite}
        .nt-on .nta-vib{animation:nt-vib .12s linear infinite}
        .nt-on .nta-heat{transform-box:fill-box;animation:nt-heat 2.2s ease-out infinite}
        .nt-on .nta-bob{animation:nt-bob 1.2s ease-in-out infinite}
        .nt-on .nta-swim{transform-box:fill-box;transform-origin:center;animation:nt-swim 8s ease-in-out infinite}
        .nt-on .nta-swimB{transform-box:fill-box;transform-origin:center;animation:nt-swimB 6.5s ease-in-out infinite}
        .nt-on .nta-rays{animation:nt-rays 4s ease-in-out infinite}
        .nta-caust{opacity:.35}
        .nt-on .nta-caust{opacity:0;animation:nt-shimmer 3s ease-in-out infinite}
        .nta-blink{animation:nt-blink 2.4s linear infinite}
        .nt-on .nta-feed{animation:nt-feed .625s linear infinite}
        .nt-on .nta-led,.nt-on .nta-next{animation:nt-glow 1.25s ease-in-out infinite}
        .nt-on .nta-bar1{animation:nt-bar1 5s steps(1) infinite}.nt-on .nta-bar2{animation:nt-bar2 5s steps(1) infinite}
        .nt-on .nta-bar3{animation:nt-bar3 5s steps(1) infinite}.nt-on .nta-bar4{animation:nt-bar4 5s steps(1) infinite}
        @keyframes nt-feed{to{stroke-dashoffset:12}}
        @keyframes nt-bar1{0%{opacity:.15}12%,100%{opacity:1}}
        @keyframes nt-bar2{0%{opacity:.15}30%,100%{opacity:1}}
        @keyframes nt-bar3{0%{opacity:.15}48%,100%{opacity:1}}
        @keyframes nt-bar4{0%{opacity:.15}66%,100%{opacity:1}}
        .nta-blinkfast{animation:nt-blinkfast .45s linear infinite}
        .vlv-drip{transform-box:fill-box;animation:vlv-drip 1.4s ease-in infinite}.vlv-drip.ntd2{animation-delay:.7s}
        @keyframes vlv-drip{0%{transform:translateY(0) scale(.4);opacity:0}15%{transform:translateY(0) scale(1);opacity:1}85%{transform:translateY(8px);opacity:1}100%{transform:translateY(9px);opacity:0}}
        .vlv-splash{transform-box:fill-box;transform-origin:center;animation:vlv-splash 1.4s ease-out infinite;opacity:0}
        @keyframes vlv-splash{0%,80%{transform:scale(.3);opacity:0}86%{opacity:.9}100%{transform:scale(1.6);opacity:0}}
        .nt-on .vlv-arrows{animation:vlv-arrows 1.2s linear infinite}
        @keyframes vlv-arrows{to{transform:translateX(12px)}}
        .vlv-to-open{animation:vlv-open 2.8s ease-in-out infinite}.vlv-to-close{animation:vlv-close 2.8s ease-in-out infinite}
        @keyframes vlv-open{0%,15%{transform:rotate(90deg)}75%,100%{transform:rotate(0deg)}}
        @keyframes vlv-close{0%,15%{transform:rotate(0deg)}75%,100%{transform:rotate(90deg)}}
        .nta-rain{transform-box:fill-box;animation:nt-fall 1.4s ease-in infinite}
        .nta-rdrop{animation:nt-rdrop .6s linear infinite}.nta-rsplash{transform-box:fill-box;transform-origin:center;opacity:0;animation:nt-rsplash .6s ease-out infinite}
        @keyframes nt-rdrop{0%{transform:translate(0,0);opacity:0}10%{opacity:1}100%{transform:translate(-16px,80px);opacity:1}}
        @keyframes nt-rsplash{0%,80%{transform:scale(.2);opacity:0}85%{opacity:1}100%{transform:scale(1.3);opacity:0}}
        .nt-on .nta-smoke{transform-box:fill-box;transform-origin:center;animation:nt-smoke 4.2s ease-out infinite}
        .nt-on .nta-spreadL{transform-box:fill-box;transform-origin:center;animation:nt-spreadL 4.2s ease-out infinite}
        .nt-on .nta-spreadR{transform-box:fill-box;transform-origin:center;animation:nt-spreadR 4.2s ease-out infinite}
        .nt-on .nta-drip{animation:nt-drip 1.5s ease-in infinite}
        .nt-on .nta-splash{transform-box:fill-box;transform-origin:center;animation:nt-splash 1.5s ease-out infinite}
        .nt-on .nta-lrcycle{transform-box:view-box;transform-origin:60px 38px;animation:nt-lrcycle 7s ease-in-out infinite}
        /* The watering, litter box, detector and speaker drawings share one 7 s
           cycle, every motion fitting it a whole number of times. */
        .nt-c7 .nta-flow{animation-duration:.875s}.nt-c7 .nta-fall{animation-duration:1.75s}.nt-c7 .nta-spin-slow{animation-duration:3.5s}
        .nt-c7 .nta-smoke,.nt-c7 .nta-spreadL,.nt-c7 .nta-spreadR{animation-duration:3.5s}.nt-c7 .nta-drip,.nt-c7 .nta-splash,.nt-c7 .nta-pop,.nt-c7 .nta-glow{animation-duration:1.75s}
        .nt-c7 .nta-rise,.nt-c7 .nta-blink{animation-duration:2.333s}.nt-c7 .nta-blinkfast{animation-duration:.4375s}.nt-c7 .nta-shimmer{animation-duration:3.5s}
        .nt-on .nta-littilt{transform-box:view-box;animation:nt-littilt 7s ease-in-out infinite}
        .nt-on .nta-clump{animation:nt-clump 7s ease-in-out infinite}
        .nta-smoke,.nta-spreadL,.nta-spreadR,.nta-drip,.nta-splash{opacity:0}
        @keyframes nt-smoke{0%{transform:translateY(0) scale(.4);opacity:0}18%{opacity:.8}100%{transform:translateY(-66px) scale(2.1);opacity:0}}
        @keyframes nt-spreadL{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(-34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-spreadR{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-drip{0%{transform:translateY(-52px);opacity:0}12%{opacity:1}84%{transform:translateY(0);opacity:1}86%,100%{transform:translateY(0);opacity:0}}
        @keyframes nt-splash{0%,82%{transform:scale(.2);opacity:0}86%{opacity:.95}100%{transform:scale(1.7);opacity:0}}
        @keyframes nt-lrcycle{0%,6%{transform:rotate(0)}42%,54%{transform:rotate(-240deg)}80%,86%{transform:rotate(20deg)}96%,100%{transform:rotate(0)}}
        @keyframes nt-littilt{0%,6%{transform:rotate(0)}24%{transform:rotate(-14deg)}42%,54%{transform:rotate(-8deg)}68%{transform:rotate(6deg)}80%,84%{transform:rotate(10deg)}92%{transform:rotate(-3deg)}100%{transform:rotate(0)}}
        @keyframes nt-clump{0%,18%{opacity:1;transform:translate(0,0)}34%{opacity:1;transform:translate(-10px,3px)}44%{opacity:0;transform:translate(-14px,6px)}97%{opacity:0;transform:translate(0,0)}100%{opacity:1}}
        .nta-beacon{animation:nt-glow .7s ease-in-out infinite}
        .nt-on .nta-sweepL,.nt-on .nta-sweepR{transform-box:view-box;animation:nt-sweepL 4.6s ease-in-out infinite}.nt-on .nta-sweepR{animation-name:nt-sweepR}
        @keyframes nt-sweepL{0%,100%{transform:rotate(-32deg)}50%{transform:rotate(0deg)}}
        @keyframes nt-sweepR{0%,100%{transform:rotate(32deg)}50%{transform:rotate(0deg)}}
        .nt-on .nta-flick{transform-box:fill-box;transform-origin:center bottom;animation:nt-flick .7s ease-in-out infinite alternate}
        .nt-on .nta-flick.ntd3{animation-duration:.5s}
        @keyframes nt-flick{0%{transform:scale(1,1) skewX(0)}50%{transform:scale(.94,1.08) skewX(3deg)}100%{transform:scale(1.04,.95) skewX(-3deg)}}
        @keyframes nt-spin{to{transform:rotate(360deg)}}
        @keyframes nt-flow{to{stroke-dashoffset:-24}}
        @keyframes nt-rise{0%{transform:translateY(0);opacity:0}15%{opacity:.95}100%{transform:translateY(-30px);opacity:0}}
        @keyframes nt-steam{0%{transform:translateY(0) scaleX(1);opacity:0}30%{opacity:.6}100%{transform:translateY(-20px) scaleX(1.7);opacity:0}}
        @keyframes nt-fall{0%{transform:translateY(-2px);opacity:0}35%{opacity:.85}100%{transform:translateY(12px);opacity:0}}
        @keyframes nt-twinkle{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes nt-blink{0%,70%,100%{opacity:.15}78%,92%{opacity:1}}
        .nt-on .nta-roll{animation:nt-roll 4s linear infinite}
        @keyframes nt-roll{to{transform:translateY(var(--roll,-90px))}}
        @keyframes nt-blinkfast{0%,100%{opacity:.15}45%,55%{opacity:1}}
        @keyframes nt-frost{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}
        @keyframes nt-shimmer{0%,100%{opacity:0}50%{opacity:.5}}
        @keyframes nt-glow{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes nt-warm{0%,100%{opacity:.1}50%{opacity:.26}}
        @keyframes nt-pop{0%{transform:scale(.2);opacity:0}40%{opacity:.95}100%{transform:scale(1.4);opacity:0}}
        @keyframes nt-sway{0%,100%{transform:skewX(-7deg)}50%{transform:skewX(7deg)}}
        @keyframes nt-vib{0%,100%{transform:translate(0,0)}25%{transform:translate(.35px,-.2px)}75%{transform:translate(-.35px,.2px)}}
        @keyframes nt-heat{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-14px);opacity:0}}
        @keyframes nt-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}
        @keyframes nt-swim{0%{transform:translateX(0) scaleX(1)}46%{transform:translateX(34px) scaleX(1)}50%{transform:translateX(34px) scaleX(-1)}96%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
        @keyframes nt-swimB{0%{transform:translateX(0) scaleX(-1)}46%{transform:translateX(-30px) scaleX(-1)}50%{transform:translateX(-30px) scaleX(1)}96%{transform:translateX(0) scaleX(1)}100%{transform:translateX(0) scaleX(-1)}}
        @keyframes nt-rays{0%,100%{opacity:.18}50%{opacity:.38}}
        .hu-puff{opacity:0;transform-box:fill-box;transform-origin:center;animation:hu-rise 3s ease-out infinite}
        @keyframes hu-rise{0%{opacity:0;transform:translate(0,0) scale(.5)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx,0),var(--h,-26px)) scale(2)}}
        .hu-bub{opacity:0;animation:hu-up 2.7s ease-in infinite}
        @keyframes hu-up{0%{opacity:0;transform:translateY(0)}15%{opacity:.9}85%{opacity:.8}100%{opacity:0;transform:translateY(var(--h,-20px))}}
        .hu-blink{animation:hu-bl 1s steps(2,jump-none) infinite}
        @keyframes hu-bl{0%{opacity:1}100%{opacity:.25}}
        .machine.nt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
`;

// The drawings of the panels and the battery, built once: only their classes
// change with what they do, and the battery's level and reserve.
const ENERGY_SMOKE = (x, y, k) => {
  const C = [[13, 23, 5.5], [20, 18, 6.5], [27, 22, 5], [17, 12, 4.5], [24, 11, 4]];
  const puff = (c, dx, dy, kk) => `<g class="en-pf ${c}">${C.map(([cx, cy, r]) => `<circle class="en-o" cx="${(cx * kk + dx).toFixed(1)}" cy="${(cy * kk + dy).toFixed(1)}" r="${(r * kk + 1.4).toFixed(1)}"/>`).join("")}${C.map(([cx, cy, r]) => `<circle class="en-f" cx="${(cx * kk + dx).toFixed(1)}" cy="${(cy * kk + dy).toFixed(1)}" r="${(r * kk).toFixed(1)}"/>`).join("")}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${k})"><g class="en-smoke">${puff("en-pf1", 0, 0, 1)}${puff("en-pf2", -2, 2, 0.85)}</g></g>`;
};
const ENERGY_ANGER = (x, y) => `<g transform="translate(${x} ${y})"><g class="en-ang"><path d="M3.5 1.5 Q3.5 4 1 4"/><path d="M6 1.5 Q6 4 8.5 4"/><path d="M3.5 9.5 Q3.5 7 1 7"/><path d="M6 9.5 Q6 7 8.5 7"/></g></g>`;
// A robot's drawing. It leaves its base and goes back and forth over its
// floor: a rug for a vacuum, tiles for a mop, a lawn for a mower, which is
// drawn in profile with the grass cut under it. Its ring says what it does,
// like the real ones: green on the base, blue at work, amber in a pause,
// orange for a full bin or an empty tank, red in an error, where a puff of
// smoke and an anger mark say it the way a cartoon would.
const ROBOT_MANGA = `<svg class="rbt-smoke" viewBox="0 0 40 30"><g class="rbt-pf rbt-pf1"><circle class="rbt-o" cx="13.0" cy="23.0" r="6.9"/><circle class="rbt-o" cx="20.0" cy="18.0" r="7.9"/><circle class="rbt-o" cx="27.0" cy="22.0" r="6.4"/><circle class="rbt-o" cx="17.0" cy="12.0" r="5.9"/><circle class="rbt-o" cx="24.0" cy="11.0" r="5.4"/><circle class="rbt-f" cx="13.0" cy="23.0" r="5.5"/><circle class="rbt-f" cx="20.0" cy="18.0" r="6.5"/><circle class="rbt-f" cx="27.0" cy="22.0" r="5.0"/><circle class="rbt-f" cx="17.0" cy="12.0" r="4.5"/><circle class="rbt-f" cx="24.0" cy="11.0" r="4.0"/><path class="rbt-hl" d="M15.0 9.0 q2 -2 4 -1 M17.0 15.0 q2 -2.5 5 -1.5"/></g><g class="rbt-pf rbt-pf2"><circle class="rbt-o" cx="9.0" cy="21.6" r="6.1"/><circle class="rbt-o" cx="15.0" cy="17.3" r="6.9"/><circle class="rbt-o" cx="20.9" cy="20.7" r="5.7"/><circle class="rbt-o" cx="12.4" cy="12.2" r="5.2"/><circle class="rbt-o" cx="18.4" cy="11.3" r="4.8"/><circle class="rbt-f" cx="9.0" cy="21.6" r="4.7"/><circle class="rbt-f" cx="15.0" cy="17.3" r="5.5"/><circle class="rbt-f" cx="20.9" cy="20.7" r="4.2"/><circle class="rbt-f" cx="12.4" cy="12.2" r="3.8"/><circle class="rbt-f" cx="18.4" cy="11.3" r="3.4"/><path class="rbt-hl" d="M10.8 9.6 q2 -2 4 -1 M12.4 14.8 q2 -2.5 5 -1.5"/></g></svg>`;
const ROBOT_ANGER = `<svg class="rbt-angm" viewBox="29.5 0.5 9.5 10"><g class="rbt-ang"><path d="M33 1.5 Q33 4 30.5 4"/><path d="M35.5 1.5 Q35.5 4 38 4"/><path d="M33 9.5 Q33 7 30.5 7"/><path d="M35.5 9.5 Q35.5 7 38 7"/></g></svg>`;
const ROBOT_MOWER_SVG = `<svg viewBox="0 0 62 35">
 <ellipse cx="31" cy="34" rx="29" ry="2" fill="rgba(0,0,0,.25)"/>
 <path d="M5 27 C3 20 6 12 14 10 L33 8 C41 8 47 12 53 18 C57 21 59 24 58 27 Z" style="fill: var(--b)"/>
 <path d="M11 13 C17 10 29 9 35 9.5 C41 10 46 13 50 16.5 C42 15 28 14.5 12 16 Z" style="fill:var(--bh)" opacity=".9"/>
 <rect x="5" y="25" width="54" height="3.5" rx="1.5" fill="#1b1e21"/>
 <path d="M24 21.5 H53" stroke="#ff8f1f" stroke-width="1.6" stroke-linecap="round"/>
 <ellipse cx="25" cy="10.2" rx="7" ry="1.5" style="fill:var(--bl)"/>
 <ellipse class="rbt-led" cx="35" cy="10" rx="1.6" ry=".9"/>
 <path d="M48 13.2 l4.5 3.4 l-1.6 1.5 l-4.4 -3 Z" fill="#1b1e21"/><circle cx="50.2" cy="15.6" r=".8" fill="#4fc3f7"/>
 <path d="M3.5 22 A12.5 12.5 0 0 1 28.5 22" fill="none" style="stroke:var(--bl)" stroke-width="2.4"/>
 <g class="rbt-whl"><circle cx="16" cy="25.5" r="9" fill="#1b1e21"/><circle cx="16" cy="25.5" r="8.2" fill="none" stroke="#3a3f45" stroke-width="1.8" stroke-dasharray="1.5 1.2"/>
  <circle cx="16" cy="25.5" r="4" fill="#4a5057"/><path d="M16 21.5 V29.5 M12 25.5 H20" stroke="#2b2f34" stroke-width="1.2"/><circle cx="16" cy="25.5" r="1.3" fill="#ff8f1f"/></g>
 <g class="rbt-whl"><circle cx="51" cy="31.3" r="3.4" fill="#1b1e21"/><circle cx="51" cy="31.3" r="1.3" fill="#555c63"/></g>
</svg>`;
// A Segway Navimow i series (#67): a low grey shell, a black glossy top with
// its round chrome lid on a ring of light, the red stop button, and big front
// wheels with orange treads, a small caster behind.
const ROBOT_NAVIMOW_SVG = `<svg viewBox="0 0 62 35">
 <ellipse cx="31" cy="34" rx="29" ry="2" fill="rgba(0,0,0,.25)"/>
 <g class="rbt-whl"><circle cx="9" cy="31.2" r="3.3" fill="#1b1e21"/><circle cx="9" cy="31.2" r="1.2" fill="#555c63"/></g>
 <path d="M3 20.5 H59.6 V26.6 C59.6 28.9 58.2 30.2 55.8 30.4 L8 31.4 C4.8 31.4 3 30 3 27.6 Z" fill="#2b2f34"/>
 <path d="M3.2 22.4 C2.4 14.6 6.6 10 13.6 9.4 L38 8.4 C46.4 8.1 53.4 9.2 57.2 12.6 C59.6 14.9 60.2 18.4 59.8 22.4 Z" fill="#b9c1c9"/>
 <path d="M6.6 13.2 C10.4 10.8 26 10 40 9.7 C48 9.6 53.6 10.8 56.2 13.4 C46 12.4 24 12.4 6.6 14.4 Z" fill="#e1e6ea"/>
 <path d="M4.8 20.6 C20 19.8 44 19.8 58.6 20.4" stroke="#8d969f" stroke-width=".6" fill="none"/>
 <path d="M13.6 9.6 C19.6 7.6 40 7.2 49.6 8.1 C52.6 8.4 54.6 9.3 55.6 10.4 C45 9.6 25 9.6 13.6 10.6 Z" fill="#14171a"/>
 <rect class="rbt-led" x="19.6" y="5.6" width="21" height="3" rx="1.5"/>
 <path d="M20.6 5.9 C20.6 3.4 39.4 3.4 39.4 5.9 C39.4 6.9 20.6 6.9 20.6 5.9 Z" fill="#c4cad0"/>
 <ellipse cx="30" cy="4.3" rx="7.6" ry="1.1" fill="#f1f3f5"/>
 <path d="M26.6 4.1 H33.4" stroke="#3a3f45" stroke-width=".7" stroke-linecap="round"/>
 <rect x="42.6" y="6.4" width="4.2" height="2" rx=".6" fill="#e53935"/>
 <rect x="57.4" y="14.4" width="2.4" height="4.4" rx=".6" fill="#14171a"/><circle cx="58.6" cy="16.6" r=".55" fill="#4fc3f7"/>
 <g class="rbt-whl"><circle cx="44" cy="23" r="11.5" fill="#ff5a1f"/><circle cx="44" cy="23" r="11.1" fill="none" stroke="#c23d0d" stroke-width="1.9" stroke-dasharray="1.8 1.5"/>
  <circle cx="44" cy="23" r="8.2" fill="#1b1e21"/><path d="M44 16.4 L45.8 21.2 L50.6 23 L45.8 24.8 L44 29.6 L42.2 24.8 L37.4 23 L42.2 21.2 Z" fill="#30353a"/><circle cx="44" cy="23" r="1.6" fill="#5a6168"/></g>
 <path d="M30.6 19.2 A14 14 0 0 1 57.4 19.2" stroke="#b9c1c9" stroke-width="2.6" fill="none"/>
 <path d="M31.6 20.4 A12.9 12.9 0 0 1 56.4 20.4" stroke="#2b2f34" stroke-width=".7" fill="none"/>
</svg>`;
let robotCloudN = 0;
function robotRain() {
  const cg = `rbt-cg${robotCloudN++}`;
  let drops = "";
  for (let i = 0; i < 18; i++) {
    const x = 18 + ((i * 37) % 60);
    const d = 0.5 + ((i * 7) % 5) * 0.06;
    const dl = -((i * 0.23) % d);
    drops += `<b style="left: ${x}px; --d: ${d.toFixed(2)}s; --d0: ${dl.toFixed(2)}s"></b>`
      + `<u style="left: ${x - 15}px; top: ${86 + (i % 4) * 3}px; --d: ${d.toFixed(2)}s; --d0: ${dl.toFixed(2)}s"></u>`;
  }
  return `<div class="rbt-cloud"><svg viewBox="0 0 72 26"><defs><linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="26" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7dde2"/><stop offset=".55" stop-color="#a9b2ba"/><stop offset="1" stop-color="#7f8a94"/></linearGradient></defs><path d="M12 25.5 C5 25.5 3 18 9 15.5 C8 9 15 6 20 9 C23 2 35 0 40 7 C45 3 54 6 54 12 C61 11 67 16 64 21 C66 24 63 25.5 60 25.5 Z" fill="url(#${cg})"/><path d="M14 13 C15 10 18 9 21 10.5 M27 7 C30 4 35 4 38 7.5" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.4" stroke-linecap="round"/></svg></div><div class="rbt-rain">${drops}</div>`;
}

// A wall socket the stand's cable goes into: the stand stays plugged in
// whether the vacuum is on it or not.
const STICK_SOCKET = (x, y) => `<rect x="${x}" y="${y}" width="7" height="9" rx="1.6" fill="#f4f5f6" stroke="#9aa1a7" stroke-width=".6"/><circle cx="${x + 3.5}" cy="${y + 4.5}" r="2.2" fill="#e2e5e8" stroke="#b5bbc0" stroke-width=".4"/><rect x="${x + 1.4}" y="${y + 3.2}" width="4.2" height="2.6" rx="1" fill="#2b3137"/>`;

// A Dyson-like stick vacuum on its wall dock, leaning: the purple filter,
// the gold cyclone, the clear bin, the handle with its screen, the long
// wand and the soft roller head. Its screen's three bars fill while it
// charges.
function dysonSvg(battery) {
  const lit = battery === null || battery === undefined ? null : Math.max(0, Math.min(3, Math.ceil(battery / 34)));
  const bar = (n, y) => `<rect class="stk-bar b${n}${lit === null ? " full" : lit >= n ? " on" : ""}" x="7" y="${y}" width="3.6" height="1.4" rx=".4"/>`;
  return `<svg class="stk-svg" viewBox="0 0 96 108"><defs>
<linearGradient id="stk-nk" x1="0" x2="1"><stop offset="0" style="stop-color:var(--bl)"/><stop offset=".35" style="stop-color:var(--bh)"/><stop offset=".6" style="stop-color:var(--b)"/><stop offset="1" style="stop-color:var(--bl)"/></linearGradient>
<linearGradient id="stk-gm" x1="0" x2="1"><stop offset="0" stop-color="#3f454b"/><stop offset=".4" stop-color="#8f979e"/><stop offset="1" stop-color="#3a4046"/></linearGradient>
<linearGradient id="stk-pu" x1="0" x2="1"><stop offset="0" stop-color="#5b3fe0"/><stop offset=".4" stop-color="#c7b8ff"/><stop offset=".7" stop-color="#8e74ff"/><stop offset="1" stop-color="#4f36c8"/></linearGradient>
<linearGradient id="stk-au" x1="0" x2="1"><stop offset="0" stop-color="#a87a14"/><stop offset=".4" stop-color="#f7d870"/><stop offset=".7" stop-color="#d9a92e"/><stop offset="1" stop-color="#9a6f10"/></linearGradient>
<linearGradient id="stk-cl" x1="0" x2="1"><stop offset="0" stop-color="rgba(170,185,195,.55)"/><stop offset=".3" stop-color="rgba(250,252,253,.85)"/><stop offset=".7" stop-color="rgba(215,225,232,.6)"/><stop offset="1" stop-color="rgba(150,165,178,.6)"/></linearGradient>
<linearGradient id="stk-gd" x1="0" x2="1"><stop offset="0" stop-color="#8d959c"/><stop offset=".5" stop-color="#bfc5ca"/><stop offset="1" stop-color="#7d858c"/></linearGradient>
<linearGradient id="stk-yr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe36b"/><stop offset=".5" stop-color="#f2c21b"/><stop offset="1" stop-color="#c89a08"/></linearGradient>
<clipPath id="stk-rc"><rect x="16" y="94" width="31" height="7.5" rx="3.75"/></clipPath></defs>
${STICK_SOCKET(85, 59)}
<path class="stk-cab" d="M88.5 63.5 H86 Q82 63.5 80.5 57 Q78.5 49 72 44"/><path class="stk-ef" d="M88.5 63.5 H86 Q82 63.5 80.5 57 Q78.5 49 72 44"/>
<g transform="translate(60 30) rotate(22) scale(.76)">
<rect x="13" y="-20" width="8" height="30" rx="2" fill="url(#stk-gd)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="14.6" y="-17" width="4.8" height="24" rx="1.2" fill="rgba(255,255,255,.12)"/>
<circle class="stk-led" cx="17" cy="5" r="1.1"/>
</g>
<g class="stk-mach">
${softShadow(40, 102.9, 24.0, 2.8, 0.25)}
<g transform="translate(60 30) rotate(22) scale(.76)">
<path d="M12 -6 H14 V2 H12" fill="#5f666d"/>
<path d="M5 -16 Q13 -16 13 -8 V10 Q13 14 9 14 H5 Z" fill="url(#stk-gm)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="5.5" y="-23" width="6.5" height="8" rx="1.5" fill="#0d1210" stroke="#2b2f34" stroke-width=".6"/>
${bar(1, -17.6)}${bar(2, -19.6)}${bar(3, -21.6)}
<path d="M5 -2 L2.5 2" stroke="#d32f2f" stroke-width="2" stroke-linecap="round"/>
<rect x="-6.5" y="-34" width="13" height="13" rx="4" fill="url(#stk-pu)" stroke="rgba(40,20,120,.5)" stroke-width=".6"/>
<path d="M0 -32 V-23 M2 -32 V-23 M4 -31.5 V-23.5" stroke="rgba(255,255,255,.45)" stroke-width=".5"/>
<ellipse cx="0" cy="-33.4" rx="5.2" ry="1.1" fill="rgba(255,255,255,.35)"/>
<rect x="-6.5" y="-22" width="13" height="8" fill="url(#stk-nk)" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
<path d="M-9.5 -14 H9.5 V-8.5 Q8.1 -6.3 6.6 -8.5 Q5.2 -6.3 3.7 -8.5 Q2.3 -6.3 .8 -8.5 Q-.6 -6.3 -2 -8.5 Q-3.4 -6.3 -4.9 -8.5 Q-6.3 -6.3 -7.8 -8.5 Q-8.6 -7.3 -9.5 -8.5 Z" fill="url(#stk-au)" stroke="rgba(110,70,0,.55)" stroke-width=".5"/>
<path d="M-9.5 -12 H9.5" stroke="rgba(255,240,180,.6)" stroke-width=".6"/>
<rect x="-8.5" y="-7.5" width="17" height="1.6" fill="#d32f2f"/>
<rect x="-8.5" y="-6" width="17" height="25" rx="2.5" fill="url(#stk-cl)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="-4.2" y="-6" width="8.4" height="19" fill="url(#stk-nk)" stroke="rgba(0,0,0,.2)" stroke-width=".4"/>
<rect x="-4.2" y="4" width="8.4" height="1" fill="#d32f2f"/>
<path d="M-7.5 14 Q0 11.5 7.5 14 V18 H-7.5 Z" fill="rgba(150,135,110,.45)"/>
<rect x="-8.5" y="17.5" width="17" height="3.2" rx="1.4" fill="url(#stk-gm)"/>
<rect x="-1.6" y="20.5" width="3.2" height="3" rx="1" fill="#d32f2f"/>
<rect x="-2.2" y="23" width="4.4" height="63" rx="2.2" fill="url(#stk-gm)"/>
<rect x="-2.5" y="74" width="5" height="3.2" rx="1" fill="#d32f2f"/>
<rect x="-2.8" y="82" width="5.6" height="8" rx="1.6" fill="url(#stk-nk)"/>
</g>
<path d="M15 95.5 Q15 91.5 20 91.5 H45 Q49 91.5 50 95 L49 96.5 H16 Z" fill="url(#stk-nk)" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
<path d="M18 93 H46" stroke="rgba(255,255,255,.6)" stroke-width=".6"/>
<path d="M31.5 93 Q33 89 35.5 89.5" stroke="#3a4046" stroke-width="3.2" fill="none" stroke-linecap="round"/>
<circle cx="31.5" cy="92.6" r="2" fill="#3d4fd6" stroke="rgba(0,0,0,.3)" stroke-width=".4"/>
<g clip-path="url(#stk-rc)"><rect x="16" y="94" width="31" height="7.5" fill="url(#stk-yr)"/>
<path d="M14 103 L26 92 M30 103 L42 92" stroke="#1b1e21" stroke-width="1.6"/>
<path d="M22 103 L34 92 M38 103 L50 92" stroke="#1b1e21" stroke-width=".7" opacity=".7"/>
<rect x="16" y="94" width="31" height="2.2" fill="rgba(255,255,255,.35)"/><rect x="16" y="99.5" width="31" height="2" fill="rgba(0,0,0,.18)"/></g>
<rect x="16" y="94" width="31" height="7.5" rx="3.75" fill="none" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
<ellipse cx="47.3" cy="97.75" rx="2.1" ry="3.9" fill="url(#stk-nk)" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
<ellipse cx="16" cy="97.75" rx="1.6" ry="3.6" fill="#3d4fd6" stroke="rgba(0,0,0,.3)" stroke-width=".4"/>
${ENERGY_SMOKE(44, -4, 0.55)}${ENERGY_ANGER(62, 4)}
</g></svg>`;
}

// A Tineco-like floor washer standing in its station: the handle, the wand,
// the head with its round screen, the dark dirty water tank, and the soft
// roller in the station's tray. The screen's ring fills while it charges and
// turns while the station washes the roller.
function washerSvg(battery) {
  const pct = battery === null || battery === undefined ? null : Math.max(0, Math.min(100, battery));
  const off = pct === null ? "" : ` style="--fw-off: ${Math.round((1 - pct / 100) * 189) / 10}"`;
  return `<svg class="stk-svg" viewBox="0 0 96 108"><defs>
<linearGradient id="fw-tb" x1="0" x2="1"><stop offset="0" style="stop-color:var(--bl)"/><stop offset=".45" style="stop-color:var(--bh)"/><stop offset="1" style="stop-color:var(--b)"/></linearGradient>
<linearGradient id="fw-tw" x1="0" x2="1"><stop offset="0" stop-color="#c9ced2"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#d5dade"/></linearGradient>
<linearGradient id="fw-tk" x1="0" x2="1"><stop offset="0" stop-color="rgba(60,66,72,.9)"/><stop offset=".3" stop-color="rgba(150,160,168,.55)"/><stop offset=".55" stop-color="rgba(40,45,50,.85)"/><stop offset="1" stop-color="rgba(25,28,32,.95)"/></linearGradient>
<linearGradient id="fw-ro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ecee"/><stop offset=".55" stop-color="#c3c9ce"/><stop offset="1" stop-color="#9aa2a9"/></linearGradient>
<pattern id="fw-fz" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="rgba(255,255,255,.55)"/><circle cx="2.4" cy="2.2" r=".4" fill="rgba(110,120,128,.35)"/></pattern>
<clipPath id="fw-rc"><rect x="21.5" y="93" width="31" height="6" rx="3"/></clipPath></defs>
${STICK_SOCKET(84, 90)}
<path class="stk-cab" d="M87.5 94.5 Q80 95 76 101.5 H68"/><path class="stk-ef" d="M87.5 94.5 Q80 95 76 101.5 H68"/>
${softShadow(42, 103.9, 24.0, 2.4, 0.27)}
<path d="M14 100 Q14 97 18 97 H64 Q68 97 68 100 V102 Q68 104 64 104 H18 Q14 104 14 102 Z" fill="url(#fw-tb)" stroke="rgba(0,0,0,.4)" stroke-width=".5"/>
<path d="M20 98.6 H58" stroke="rgba(255,255,255,.18)" stroke-width=".6"/>
<circle class="stk-led" cx="62" cy="100.5" r="1"/>
<g class="fw-bub"><circle cx="30" cy="96.5" r=".9"/><circle cx="38" cy="97" r=".7"/><circle cx="46" cy="96.6" r=".8"/></g>
<g class="stk-mach">
<g transform="translate(39 90) rotate(14) scale(.84)">
<rect x="1.4" y="-104" width="3" height="40" rx="1.5" fill="url(#fw-tb)"/>
<path d="M-.5 -106 Q-.5 -114 4.5 -114 Q9.5 -114 9.5 -108 L8.2 -97 Q7.6 -94 5.3 -94 H3 Z" fill="url(#fw-tb)" stroke="rgba(0,0,0,.4)" stroke-width=".5"/>
<path d="M2.6 -110.5 Q4.6 -112 7.2 -110 L6.4 -99 Q6 -97 4.6 -97.5 Z" fill="url(#fw-tw)"/>
<rect x="-8.5" y="-70" width="16" height="25" rx="5.5" fill="url(#fw-tb)" stroke="rgba(0,0,0,.4)" stroke-width=".5"/>
<path d="M5 -67 V-47" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>
<circle cx="-1" cy="-59" r="4.4" fill="#0b0e11" stroke="#565e66" stroke-width=".5"/>
<circle class="fw-ring" cx="-1" cy="-59" r="3"/><circle class="fw-ringf" cx="-1" cy="-59" r="3" transform="rotate(-90 -1 -59)"${off}/>
<rect x="-8.5" y="-46" width="17" height="4.5" rx="1" fill="url(#fw-tb)"/>
<rect class="fw-clean" x="-3" y="-51" width="5" height="2.5" rx="1" fill="#7fd0ff"/>
<rect x="-9.5" y="-42" width="13.5" height="35" rx="3" fill="url(#fw-tk)" stroke="rgba(0,0,0,.45)" stroke-width=".5"/>
<path class="fw-dirt" d="M-9 -26 Q-3 -28 3.5 -26 V-10 Q3.5 -7.5 1 -7.5 H-6.5 Q-9 -7.5 -9 -10 Z" fill="rgba(125,95,55,.75)"/>
<path d="M-7 -39 V-11" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
<rect x="-6" y="-31" width="5.5" height="4" rx="1.4" fill="url(#fw-tb)"/>
<path d="M4 -41.5 H8.5 V-6 Q8.5 -4 6.5 -4 H4 Z" fill="url(#fw-tw)" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
<path d="M-9 -8 H8.5 L7 -1 H-6 Z" fill="url(#fw-tw)" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
</g>
<path d="M22 92 L27 88.5 H51 L54 91.5 V94 H22 Z" fill="url(#fw-tb)" stroke="rgba(0,0,0,.45)" stroke-width=".5"/>
<path d="M28 89.8 H50" stroke="rgba(255,255,255,.22)" stroke-width=".6"/>
<rect x="21.5" y="93" width="31" height="6" rx="3" fill="url(#fw-ro)"/>
<g clip-path="url(#fw-rc)"><rect class="fw-roll" x="18.5" y="93" width="37" height="6" fill="url(#fw-fz)"/></g>
<circle cx="53.5" cy="96" r="3.6" fill="url(#fw-tw)" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>
<circle cx="53.5" cy="96" r="1.9" fill="url(#fw-tb)"/>
${ENERGY_SMOKE(30, 14, 0.55)}${ENERGY_ANGER(56, 22)}
</g></svg>`;
}

const SHELTER_SVG = '<svg class="rbt-sh" viewBox="0 0 96 106">';
let shelterN = 0;
function shelterHtml(style, color) {
  const g = `rbt-sh${shelterN++}`;
  const drip = (x, y) => `<circle class="rbt-sh-drip" cx="${x}" cy="${y}" r="1"/>`;
  if (style === "garage") {
    // A garage like the Navimow or Husqvarna ones: a back wall behind the
    // station that curves into a long roof reaching over the mower, on a
    // dark mat (#67).
    const [t0, t1, t2, r0, r1, s0, s1, ln, , hl] = SHELTER_COLORS[color] || SHELTER_COLORS.black;
    const dots = Array.from({ length: 10 }, (_, i) => `<circle cx="${30 + i * 6.4}" cy="${90.6 - i * .07}" r=".45"/>`).join("");
    const back = `${SHELTER_SVG}<path d="M22 94.4 L92 93.4 L96.4 88.2 L27.6 88.8 Z" fill="#2a2e33"/>
<path d="M22 94.4 L92 93.4 L92 94.6 L22 95.6 Z" fill="#1b1e21"/><g fill="rgba(255,255,255,.14)">${dots}</g>
<path d="M27.6 88.8 L96.4 88.2 L96 87 L30 87.4 Z" fill="rgba(0,0,0,.22)"/></svg>`;
    const front = `${SHELTER_SVG}<defs>
<linearGradient id="${g}t" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${t2}"/><stop offset=".5" stop-color="${t1}"/><stop offset="1" stop-color="${t0}"/></linearGradient>
<linearGradient id="${g}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${r0}"/><stop offset="1" stop-color="${r1}"/></linearGradient>
<linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" stop-color="${s0}"/><stop offset="1" stop-color="${s1}"/></linearGradient></defs>
<path d="M92.6 55 C92.6 48 88 44.8 80 45.6 L20 52 L26 46 L86 39.6 C94 38.8 98.6 42 98.6 49 L98.6 86.4 L92.6 92.4 Z" fill="url(#${g}t)"/>
<path d="M92.6 55 L98.6 49 L98.6 86.4 L92.6 92.4 Z" fill="url(#${g}s)"/>
<path d="M26 46 L86 39.6 C94 38.8 98.6 42 98.6 49" fill="none" stroke="${hl}" stroke-width=".8" stroke-linecap="round"/>
<path d="M20 52 L80 45.6 C88 44.8 92.6 48 92.6 55 L92.6 92.4 L87.8 93 L87.8 56 C87.8 51.6 85.6 49.6 81 50 L20 56.4 Z" fill="url(#${g}r)" stroke="${ln}" stroke-width=".4"/>
<path d="M20.6 53.1 L80 46.8 C87 46.1 91.4 48.9 91.4 55 V92" fill="none" stroke="rgba(255,255,255,.3)" stroke-width=".5"/>
<rect class="rbt-sh-led" x="89.5" y="64" width="1.4" height="3" rx=".6"/>${drip(20.6, 57.4)}</svg>`;
    return { back, front };
  }
  if (style === "shell") {
    const [t0, t1, t2, r0, r1, s0, s1, ln, lip, hl, inn] = SHELTER_COLORS[color] || SHELTER_COLORS.white;
    const back = `${SHELTER_SVG}<defs><linearGradient id="${g}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${inn}" stop-opacity=".75"/><stop offset=".55" stop-color="${inn}" stop-opacity=".35"/><stop offset="1" stop-color="${inn}" stop-opacity="0"/></linearGradient></defs>
<path d="M26 93.6 L93 92.8 L97 87.8 L30 88.6 Z" fill="rgba(0,0,0,.18)"/>
<path d="M32.5 55 C35.5 44 50 37 65 36.5 C79 36 90.5 40 92.5 48 L92.5 87.6 L32.5 88.4 Z" fill="url(#${g}i)"/></svg>`;
    const front = `${SHELTER_SVG}<defs>
<linearGradient id="${g}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t0}"/><stop offset=".6" stop-color="${t1}"/><stop offset="1" stop-color="${t2}"/></linearGradient>
<linearGradient id="${g}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${r0}"/><stop offset="1" stop-color="${r1}"/></linearGradient>
<linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" stop-color="${s0}"/><stop offset="1" stop-color="${s1}"/></linearGradient></defs>
<path d="M92 52 L96 47 L96 87 L92 92 Z" fill="url(#${g}s)"/>
<path d="M25 59 C28 46 44 38.5 61 38 C77 37.5 90 42 92 52 L96 47 C94 37 81 32.5 65 33 C48 33.5 32 41 29 54 Z" fill="url(#${g}t)"/>
<path d="M30 50.5 C34 40.5 48 35.4 64 35 C78 34.6 89 38.4 93 45" fill="none" stroke="${hl}" stroke-width="1.2" stroke-linecap="round"/>
<path d="M25 59 L28.5 60 L32.5 55 L29 54 Z" fill="${lip}"/>
<path d="M25 59 C28 46 44 38.5 61 38 C77 37.5 90 42 92 52 L92 92 L88.5 92 L88.5 53 C86.5 45 75 41 61 41.5 C46 42 31.5 49 28.5 60 Z" fill="url(#${g}r)" stroke="${ln}" stroke-width=".4"/>
<path d="M26.2 58 C29.5 46.5 44.5 39.3 61 38.8 C76.5 38.3 89 42.6 91.2 52 V91.4" fill="none" stroke="rgba(255,255,255,.4)" stroke-width=".6"/>
<rect class="rbt-sh-led" x="89.6" y="66" width="1.4" height="3" rx=".6"/>${drip(25.5, 61)}</svg>`;
    return { back, front };
  }
  const back = `${SHELTER_SVG}<defs><linearGradient id="${g}k" x1="0" x2="1"><stop offset="0" stop-color="#6e4624"/><stop offset="1" stop-color="#8f5f33"/></linearGradient></defs>
<path d="M24 93.4 L92 92.6 L96 87.6 L28 88.4 Z" fill="rgba(0,0,0,.17)"/>
<rect x="28" y="49.6" width="3.5" height="39.4" fill="url(#${g}k)"/>
<rect x="91.5" y="42" width="3.5" height="46.6" fill="url(#${g}k)"/>
<path d="M28 47.2 L95 39.6 L95 42 L28 49.6 Z" fill="#7a4f29"/>
<path d="M92.5 52 L86 46.4" stroke="#7a4f29" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  const front = `${SHELTER_SVG}<defs>
<linearGradient id="${g}w" x1="0" x2="1"><stop offset="0" stop-color="#9a6838"/><stop offset=".55" stop-color="#c38e57"/><stop offset="1" stop-color="#a87442"/></linearGradient>
<linearGradient id="${g}t" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b4bec7"/><stop offset="1" stop-color="#808b95"/></linearGradient></defs>
<rect x="25" y="54.6" width="3.5" height="39.4" fill="url(#${g}w)"/>
<path d="M28.5 54.6 L29.6 53.2 V92.6 L28.5 94 Z" fill="#6e4624"/>
<rect x="87.5" y="47" width="3.5" height="46.4" fill="url(#${g}w)"/>
<path d="M91 47 L92.1 45.6 V92 L91 93.4 Z" fill="#6e4624"/>
<path d="M28 61 L33.5 54 M88 55 L81.5 47.8" stroke="#b07b47" stroke-width="1.8" stroke-linecap="round"/>
<path d="M24 52.2 L91 44.6 L91 47 L24 54.6 Z" fill="url(#${g}w)"/>
<path d="M22 49.2 L93 41.2 L97 36.2 L26 44.2 Z" fill="url(#${g}t)"/>
<path d="M23 47.95 L94 39.95 M24 46.7 L95 38.7 M25 45.45 L96 37.45" stroke="rgba(255,255,255,.35)" stroke-width=".5"/>
<path d="M23.3 48.4 L94.3 40.4 M24.3 47.15 L95.3 39.15 M25.3 45.9 L96.3 37.9" stroke="rgba(0,0,0,.18)" stroke-width=".5"/>
<path d="M22 49.2 L93 41.2 L93 44.4 L22 52.4 Z" fill="#4c565f"/>
<path d="M28 48.5 V51.7 M34 47.8 V51 M40 47.2 V50.4 M46 46.5 V49.7 M52 45.8 V49 M58 45.1 V48.3 M64 44.4 V47.6 M70 43.8 V47 M76 43.1 V46.3 M82 42.4 V45.6 M88 41.8 V45" stroke="rgba(255,255,255,.18)" stroke-width=".5"/>
<path d="M93 41.2 L97 36.2 L97 39.4 L93 44.4 Z" fill="#3b444c"/>
<path d="M22 49.2 L26 44.2" stroke="rgba(255,255,255,.4)" stroke-width=".5"/>
<rect class="rbt-sh-led" x="88.6" y="64" width="1.4" height="3" rx=".6"/>${drip(22.5, 53.5)}</svg>`;
  return { back, front };
}

// A rectangular station seen three-quarters (#69): the robot sits half in
// its low bay, the two water tanks show their level on the front, the dust
// bin behind its panel, the lids on top. White, black or with a gold front.
const ROBOT_BOX_SKINS = {
  white: { f0: "#ffffff", f1: "#e4e9ed", side: "#c9d1d7", top: "#f6f8f9", edge: "rgba(0,0,0,.2)", panel: "#eef1f3", bay: "#8e99a2", bay2: "#d3dae0" },
  black: { f0: "#4a5158", f1: "#2b3035", side: "#1d2125", top: "#565d64", edge: "rgba(0,0,0,.5)", panel: "#383e44", bay: "#0f1114", bay2: "#24282c" },
  gold: { f0: "#ffffff", f1: "#e4e9ed", side: "#c9d1d7", top: "#f6f8f9", edge: "rgba(0,0,0,.2)", panel: "gold", bay: "#8e99a2", bay2: "#d3dae0" },
};
// A tank's level to draw: its number, or full or low when its sensor says
// so, or the usual level when nothing says it.
function tankLevel(tk, usual, raisedPct) {
  if (!tk) return usual;
  return tk.pct !== null ? tk.pct : tk.raised ? raisedPct : usual;
}
function tankVars(r) {
  const v = [];
  if (r.cleanTank) v.push(`--clean: ${Math.round(tankLevel(r.cleanTank, 75, 5))}%`);
  if (r.dirtyTank) v.push(`--dirty: ${Math.round(tankLevel(r.dirtyTank, 20, 95))}%`);
  return v.length ? ` style="${v.join("; ")}"` : "";
}
let robotBoxN = 0;
function robotBoxHtml(color, tanks) {
  const k = ROBOT_BOX_SKINS[color] ? color : "white";
  const c = ROBOT_BOX_SKINS[k];
  const g = `rbx${robotBoxN++}`;
  const X0 = 17, X1 = 79, Y0 = 10, Y1 = 74, DX = 9, DY = -5.5, BT = 52;
  const panel = c.panel === "gold" ? `url(#${g}g)` : c.panel;
  // A level window: its frame, then the water at its height.
  const tank = (cls, x, pct) => `<rect x="${x}" y="15" width="4.4" height="16" rx="1.8" fill="rgba(0,0,0,.2)" stroke="${c.edge}" stroke-width=".35"/>`
    + `<rect class="rbx-lv ${cls}" x="${x + .7}" y="${15.7 + 14.6 * (1 - pct / 100)}" width="3" height="${14.6 * pct / 100}" rx="1.2"/>`;
  const gauges = tanks ? tank("rbx-c", X0 + 5, tanks[0]) + tank("rbx-d", X1 - 9.4, tanks[1]) : "";
  return `<svg class="rbx" viewBox="0 0 96 106" aria-hidden="true"><defs>
<linearGradient id="${g}g" x1="0" x2="1"><stop offset="0" stop-color="#c9b68a"/><stop offset=".45" stop-color="#f1e6c8"/><stop offset="1" stop-color="#b6a274"/></linearGradient>
<linearGradient id="${g}f" x1="0" x2="1"><stop offset="0" stop-color="${c.f1}"/><stop offset=".35" stop-color="${c.f0}"/><stop offset="1" stop-color="${c.f1}"/></linearGradient>
<linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.bay}"/><stop offset="1" stop-color="${c.bay2}"/></linearGradient></defs>
<path d="M${X1} ${Y0} L${X1 + DX} ${Y0 + DY} V${Y1 + DY} L${X1} ${Y1} Z" fill="${c.side}" stroke="${c.edge}" stroke-width=".45"/>
<path d="M${X0} ${Y0} L${X0 + DX} ${Y0 + DY} H${X1 + DX} L${X1} ${Y0} Z" fill="${c.top}" stroke="${c.edge}" stroke-width=".45"/>
<path d="M20.5 9.2 L26.9 5.3 H54.4 L48 9.2 Z M50 9.2 L56.4 5.3 H84.4 L78 9.2 Z" fill="none" stroke="${c.edge}" stroke-width=".5"/>
<rect x="35" y="6.6" width="5" height="1.2" rx=".6" fill="${c.side}"/><rect x="64.5" y="6.6" width="5" height="1.2" rx=".6" fill="${c.side}"/>
<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" fill="url(#${g}f)" stroke="${c.edge}" stroke-width=".45"/>${gauges}
<circle cx="48" cy="20" r="2.6" fill="none" stroke="${c.edge}" stroke-width=".6"/>
<rect x="22" y="34" width="52" height="13" rx="2.4" fill="${panel}" stroke="${c.edge}" stroke-width=".45"/>
<g class="rbx-win"><rect x="25" y="36.4" width="46" height="8.2" rx="1.6" fill="rgba(40,46,52,.55)"/><rect class="rbx-dustlv" x="25" y="40.6" width="46" height="4" rx="1" fill="rgba(150,125,90,.8)"/>
<g class="rbx-dust" fill="#a1886a"><circle cx="38" cy="50" r=".9"/><circle cx="47" cy="51" r=".8"/><circle cx="56" cy="50" r=".9"/></g></g>
<rect class="rbx-led" x="45" y="48.4" width="6" height="1.4" rx=".7"/>
<rect x="20" y="${BT}" width="56" height="${Y1 - BT}" rx="3" fill="url(#${g}b)"/>
<path d="M22.5 ${BT + 2.4} H73.5" stroke="rgba(255,255,255,.14)" stroke-width=".7"/>
<path d="M20 ${Y1} H83 L75 89 H12 Z" fill="${c.side}" stroke="${c.edge}" stroke-width=".45" opacity=".9"/>
<path d="M24 77.5 H79 M19 82.5 H77" stroke="rgba(0,0,0,.1)" stroke-width=".5"/>${robotSpill(c)}</svg>`;
}

// A full bag (#104): the lid of the dirty side pushed up, the dust heaped out
// of it, running over the front and falling to the floor, puffs above.
function robotSpill(c) {
  const grain = (x, d, dx) => `<circle cx="${x}" cy="11" r=".75" style="--d0: ${d}s; --dx: ${dx}px"/>`;
  return `<g class="rbx-spill">
<path class="rbx-lidup" d="M56.4 5.3 H84.4 L86.4 -3.7 H58.4 Z" fill="${c.top}" stroke="${c.edge}" stroke-width=".45"/>
<path d="M50 9.3 L56.4 5.3 H84.4 L78 9.3 Z" fill="#3a3027"/>
<path d="M50.4 9.6 C51 5 55 2.4 59.6 2.8 C61.8 .4 66.2 0 69 2 C72.6 .8 76.4 2.4 78 5.2 C78.6 6.6 78.4 8 78.2 9.6 V15 A1.4 1.4 0 0 1 75.4 15 V10.8 H72.6 V13 A1.2 1.2 0 0 1 70.2 13 V10.8 H66 V18.4 A1.5 1.5 0 0 1 63 18.4 V10.8 H57.4 V15.4 A1.3 1.3 0 0 1 54.8 15.4 V10.8 H50.4 Z" fill="#8f7b62" stroke="#6b5a46" stroke-width=".4" stroke-linejoin="round"/>
<path d="M55 4.8 q2 -1.4 4 -.2 M64 2.6 q2.2 -1 4.2 .3 M71.5 4.6 q1.8 -.9 3.6 .4" fill="none" stroke="#b5a084" stroke-width=".55" stroke-linecap="round"/>
<g class="rbx-fall" fill="#8f7b62">${grain(56, 0, -1)}${grain(64.5, .5, -2)}${grain(71.4, .9, -1.5)}${grain(76.8, .3, -2.5)}</g>
<g class="rbx-puff" fill="#b8b2aa"><circle cx="60" cy="0" r="3.2"/><circle cx="68" cy="-2" r="3.8" style="--d0: .8s"/><circle cx="76" cy="0" r="3" style="--d0: 1.5s"/></g></g>`;
}

// The same full bag on the round dock: its cap lifted and the dust over it.
const ROBOT_TOWER_SPILL = `<svg class="rbt-spill" viewBox="0 0 44 44" aria-hidden="true">
<path d="M2 18 A20 6 0 0 1 42 18 C42 10 36 2.5 22 2 C8 2.5 2 10 2 18 Z" style="fill: var(--bl, #2b2f34)"/>
<path class="rbt-capup" d="M2 18 A20 6 0 0 1 42 18 C42 10 36 2.5 22 2 C8 2.5 2 10 2 18 Z" style="fill: var(--b, #eef1f3)" stroke="rgba(0,0,0,.18)" stroke-width=".5"/>
<ellipse cx="22" cy="18" rx="20" ry="6" fill="#3a3027"/>
<path d="M4 21 C4.5 13 11.5 9.5 17.5 10.5 C20 8 25 8 27.5 10.4 C32.5 9.4 39 12.5 40 21 V26.5 A1.4 1.4 0 0 1 37.2 26.5 V23.6 H25 V33 A1.5 1.5 0 0 1 22 33 V23.6 H14 V28.5 A1.4 1.4 0 0 1 11.2 28.5 V23.6 H4 Z" fill="#8f7b62" stroke="#6b5a46" stroke-width=".45" stroke-linejoin="round"/>
<path d="M11 15 q2 -1.4 4 -.2 M20 12.6 q2.2 -1 4.2 .3 M28.5 14.6 q1.8 -.9 3.6 .4" fill="none" stroke="#b5a084" stroke-width=".6" stroke-linecap="round"/>
<g class="rbx-fall" fill="#8f7b62"><circle cx="8" cy="24" r=".9" style="--d0: .2s; --dx: -2px"/><circle cx="36" cy="24" r=".9" style="--d0: .7s; --dx: 2px"/><circle cx="18" cy="24" r=".8" style="--d0: 1.1s; --dx: -1px"/></g>
<g class="rbx-puff" fill="#b8b2aa"><circle cx="14" cy="9" r="3.4"/><circle cx="23" cy="6" r="4" style="--d0: .8s"/><circle cx="31" cy="9" r="3.2" style="--d0: 1.5s"/></g></svg>`;

// What the robot asks for (#104), in a small sign over it: a drop crossed
// out for its water, a brown drop for the dirty water, a battery nearly
// flat. The full bag has its own overflowing station.
const ROBOT_ASK_SVGS = {
  water: `<path d="M6 1.2 C6 1.2 2.4 5.4 2.4 7.6 A3.6 3.6 0 0 0 9.6 7.6 C9.6 5.4 6 1.2 6 1.2 Z" fill="none" stroke="#29b6f6" stroke-width="1.1"/><path d="M2.2 10.4 L10 2.6" stroke="#ff5722" stroke-width="1.3" stroke-linecap="round"/>`,
  dirty: `<path d="M6 1.2 C6 1.2 2.4 5.4 2.4 7.6 A3.6 3.6 0 0 0 9.6 7.6 C9.6 5.4 6 1.2 6 1.2 Z" fill="#8d6e4f" stroke="#5d4632" stroke-width=".7"/><path d="M4.4 7.4 Q6 6.4 7.6 7.4" fill="none" stroke="#c9a77f" stroke-width=".7" stroke-linecap="round"/>`,
  battery: `<rect x="1" y="3.4" width="9" height="5.2" rx="1" fill="none" stroke="#f44336" stroke-width="1"/><rect x="10.2" y="5" width="1.2" height="2" rx=".4" fill="#f44336"/><rect class="rbt-ask-lv" x="2.1" y="4.5" width="1.7" height="3" rx=".4" fill="#f44336"/>`,
};
function robotAskHtml(notice) {
  const svg = ROBOT_ASK_SVGS[notice];
  return svg ? `<i class="rbt-ask"><svg viewBox="0 0 12 12" aria-hidden="true">${svg}</svg></i>` : "";
}

function robotHtml(cls, r) {
  if (r.layout === "pool") return ntHtml(`${cls} rbt rbt-l-pool rbt-m-${r.mode || "docked"}`, { kind: "pool", on: r.mode === "cleaning", lcd: r.poolTime || "", winter: r.mode === "winter" });
  if (r.layout === "stick" || r.layout === "floor_washer") {
    return `
        <div class="machine ${cls} rbt rbt-l-${r.layout} rbt-m-${r.mode || "docked"}">${r.layout === "stick" ? dysonSvg(r.battery) : washerSvg(r.battery)}</div>`;
  }
  const layout = ROBOT_LAYOUTS.includes(r.layout) ? r.layout : "vacuum";
  // The floor it works on: the one of its kind, or the one chosen (#49).
  const floor = ROBOT_FLOORS.includes(r.floor) ? r.floor : layout === "mop" || layout === "combo" ? "tiles" : "rug";
  const floorCls = `rbt-floor rbt-${floor}`;
  const mode = r.mode || "idle";
  const draw = mode === "edgecut" ? "cleaning" : mode === "docked" ? "charging" : mode === "rain" ? "charging rbt-m-raining" : mode;
  // Winter (#80): snow on the lawn, on the base and on the mower, and
  // flakes falling slowly.
  const snow = layout === "mower" && mode === "winter"
    ? `<div class="rbt-snow">${Array.from({ length: 20 }, (_, i) => `<b style="left: ${4 + ((i * 29) % 90)}px; --s: ${(1.8 + (i % 3) * .6).toFixed(1)}px; --d: ${(3.2 + (i % 5) * .5).toFixed(1)}s; --d0: ${(-((i * .61) % 4)).toFixed(2)}s"></b>`).join("")}</div>`
    : "";
  const err = ROBOT_MANGA + ROBOT_ANGER + robotAskHtml(r.notice);
  // The camera module some robots carry on their bumper (#69).
  const cam = r.camera ? `<i class="rbt-cam"></i><i class="rbt-camb"></i>` : "";
  let inner;
  if (layout === "mower") {
    const sh = r.shelter ? shelterHtml(r.shelter, r.shelterColor) : { back: "", front: "" };
    inner = `<div class="rbt-lawn"></div><div class="rbt-stub"></div>${robotRain()}
          <div class="rbt-st-base"></div><div class="rbt-st-tower"></div><i class="rbt-st-led"></i>${sh.back}
          <div class="rbt-mw">${r.mowerStyle === "navimow" ? ROBOT_NAVIMOW_SVG : ROBOT_MOWER_SVG}${err}<div class="rbt-clip">${"<b></b>".repeat(6)}</div></div>
          <div class="rbt-tall"></div>${sh.front}<i class="rbt-cap rbt-cap-mw"></i><i class="rbt-cap rbt-cap-st"></i>${snow}`;
  } else if (layout === "mop") {
    const lvl = r.water !== null && r.water !== undefined ? ` style="--lvl: ${Math.round(r.water)}%"` : "";
    const tk = tankVars(r);
    const dock = r.box ? robotBoxHtml(r.boxColor, [tankLevel(r.cleanTank, 75, 5), tankLevel(r.dirtyTank, 20, 95)])
      : `<div class="rbt-mcap"></div><div class="rbt-mdock"${tk}><div class="rbt-tk rbt-c"><i></i></div><div class="rbt-tk rbt-d"><i></i></div><i class="rbt-dled"></i></div>
          <div class="rbt-plate"></div><div class="rbt-pcap"></div>`;
    inner = `<div class="${floorCls}"><i class="rbt-trace rbt-t1 rbt-wet"></i><i class="rbt-trace rbt-t2 rbt-wet"></i></div>
          ${dock}
          <div class="rbt-rm"${lvl}><div class="rbt-pad"></div><div class="rbt-sd"></div><div class="rbt-tp"></div><div class="rbt-tank"><i></i></div><div class="rbt-ring"></div>${cam}${err}</div>
          ${airFlow("rbt-vapor", 44, 17)}
          <div class="rbt-bubbles">${"<b></b>".repeat(4)}</div>`;
  } else {
    const combo = layout === "combo";
    const lvl = r.water !== null && r.water !== undefined ? ` style="--lvl: ${Math.round(r.water)}%"` : "";
    const tanks = combo || r.cleanTank || r.dirtyTank ? [tankLevel(r.cleanTank, 75, 5), tankLevel(r.dirtyTank, 20, 95)] : null;
    const dock = r.box ? robotBoxHtml(r.boxColor, tanks)
      : combo ? `<div class="rbt-mcap"></div><div class="rbt-mdock"${tankVars(r)}><div class="rbt-tk rbt-c"><i></i></div><div class="rbt-tk rbt-d"><i></i></div><i class="rbt-dled"></i><div class="rbt-bin"><div class="rbt-fill"></div>${"<b></b>".repeat(3)}</div></div>
          <div class="rbt-plate"></div><div class="rbt-pcap"></div>`
      : `<div class="rbt-dock"><i class="rbt-dled"></i><div class="rbt-bin"><div class="rbt-fill"></div>${"<b></b>".repeat(3)}</div></div><div class="rbt-dcap"></div>${ROBOT_TOWER_SPILL}
          <div class="rbt-plate"></div><div class="rbt-pcap"></div>`;
    const wet = combo && r.cleanMode !== "vacuum" ? `<i class="rbt-trace rbt-t1 rbt-wet"></i><i class="rbt-trace rbt-t2 rbt-wet"></i>` : "";
    const wash = combo ? `${airFlow("rbt-vapor", 44, 17)}
          <div class="rbt-bubbles">${"<b></b>".repeat(4)}</div>` : "";
    inner = `<div class="${floorCls}">${wet}</div>
          ${dock}
          <div class="rbt-rb"${combo ? lvl : ""}>${combo ? `<div class="rbt-pad"></div>` : ""}<div class="rbt-brush"><i></i></div><div class="rbt-sd"></div><div class="rbt-bmp"></div><div class="rbt-tp"></div><div class="rbt-lidw"></div><div class="rbt-lid"></div>${combo ? `<div class="rbt-tank"><i></i></div>` : ""}<div class="rbt-ring"></div>${cam}${err}</div>
          ${wash}`;
  }
  return `
        <div class="machine ${cls} rbt rbt-l-${layout} rbt-m-${draw}${r.cleanMode ? ` rbt-cm-${r.cleanMode}` : ""}${r.base ? " rbt-base" : ""}${r.bag ? " rbt-bag" : ""}${r.notice && r.notice !== "bag" ? ` rbt-n-${r.notice}` : ""}${r.box && layout !== "mower" ? ` rbt-box rbx-${ROBOT_BOX_SKINS[r.boxColor] ? r.boxColor : "white"}` : ""}${r.shelter ? ` rbt-roof rbt-sh-${r.shelter}` : ""}">
          ${inner}
        </div>`;
}


return {
draw: (cls, ctx) => robotHtml(cls, ctx.robot || {}),
css: () => `${NT_CSS}${MINI_LCD_CSS}
        .machine.rbt { --b: var(--ac-body, #3a3f45); --bh: var(--ac-body-hi, #5a6168); --bl: var(--ac-body-lo, #1d2024); --dk: #2b2f34; --dkh: #41474e; }
        .machine.rbt > *, .rbt-dock > *, .rbt-mdock > *, .rbt-bin > *, .rbt-tk > * { position: absolute; }
        .stk-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .rbt-l-stick { --b: var(--ac-body, #c3c9ce); --bh: var(--ac-body-hi, #eef0f2); --bl: var(--ac-body-lo, #7d858c); }
        .rbt-l-floor_washer { --b: var(--ac-body, #2a2f34); --bh: var(--ac-body-hi, #50575e); --bl: var(--ac-body-lo, #16191c); }
        .stk-cab{fill:none;stroke:#2b3137;stroke-width:1.4;stroke-linecap:round}
        .stk-ef{fill:none;stroke:#ffca28;stroke-width:1.8;stroke-dasharray:2.4 3.6;stroke-linecap:round;opacity:0}
        .rbt-m-charging .stk-ef{opacity:1;animation:stk-flow .6s linear infinite}
        @keyframes stk-flow{to{stroke-dashoffset:-12}}
        .rbt-m-away .stk-mach{opacity:.5;filter:grayscale(1)}
        .stk-bar{fill:#1f2a1f}
        .stk-bar.on,.rbt-m-docked .stk-bar.full{fill:#43d65a}
        .rbt-m-charging .stk-bar{animation:stk-bar1 2.4s steps(1) infinite}
        .rbt-m-charging .stk-bar.b2{animation-name:stk-bar2}
        .rbt-m-charging .stk-bar.b3{animation-name:stk-bar3}
        @keyframes stk-bar1{0%,100%{fill:#43d65a}}
        @keyframes stk-bar2{0%{fill:#1f2a1f}33%,100%{fill:#43d65a}}
        @keyframes stk-bar3{0%{fill:#1f2a1f}66%,100%{fill:#43d65a}}
        .fw-ring{fill:none;stroke:#2a3036;stroke-width:1.2}
        .fw-ringf{fill:none;stroke:#43a047;stroke-width:1.2;stroke-linecap:round;stroke-dasharray:18.9;stroke-dashoffset:var(--fw-off,0)}
        .rbt-m-charging .fw-ringf{animation:fw-fill 2.4s ease-in-out infinite}
        .rbt-m-off .fw-ringf,.rbt-m-unav .fw-ringf{stroke-dashoffset:18.9}
        .rbt-m-washing .fw-ringf{stroke:#29b6f6;animation:fw-spin 1.2s linear infinite;stroke-dasharray:6 12.9}
        @keyframes fw-fill{0%{stroke-dashoffset:18.9}80%,100%{stroke-dashoffset:0}}
        @keyframes fw-spin{to{stroke-dashoffset:-18.9}}
        .fw-dirt{display:none}
        .rbt-m-full .fw-dirt{display:block}
        .rbt-m-empty .fw-clean{fill:#5c656d}
        .fw-fz{animation:none}
        .rbt-m-washing .fw-roll{animation:fw-roll .5s linear infinite}
        @keyframes fw-roll{to{transform:translateX(-3px)}}
        .fw-bub{opacity:0}
        .rbt-m-washing .fw-bub{opacity:1}
        .fw-bub circle{fill:rgba(170,220,255,.85);stroke:rgba(80,160,220,.6);stroke-width:.3;animation:fw-bub 1.4s ease-in infinite}
        .fw-bub circle:nth-child(2){--d0:-.5s}
        .fw-bub circle:nth-child(3){--d0:-.9s}
        @keyframes fw-bub{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-9px);opacity:0}}
        .stk-led{fill:#5a636b}
        .rbt-m-charging .stk-led{fill:#43a047;animation:stk-breathe 1.6s ease-in-out infinite}
        .rbt-m-docked .stk-led,.rbt-m-away .stk-led,.rbt-m-washing .stk-led{fill:#43a047}
        .rbt-m-error .stk-led{fill:#f44336;animation:rbt-blink 1s steps(1) infinite}
        @keyframes stk-breathe{0%,100%{opacity:.35}50%{opacity:1}}
        .rbt-l-stick .en-smoke,.rbt-l-stick .en-ang,.rbt-l-floor_washer .en-smoke,.rbt-l-floor_washer .en-ang{display:none}
        .rbt-m-error .en-smoke,.rbt-m-error .en-ang{display:block}
        .en-smoke .en-pf{transform-box:fill-box;transform-origin:50% 100%;animation:en-puff 2s ease-out infinite}
        .en-smoke .en-pf2{--d0:-1s}
        .en-smoke .en-o{fill:#111417}
        .en-smoke .en-f{fill:#6b737b}
        .en-ang path{fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round}
        .en-ang{transform-box:fill-box;transform-origin:center;animation:en-angp .7s ease-in-out infinite alternate}
        @keyframes en-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        @keyframes en-angp{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .machine.rbt-l-stick.rbt-m-unav,.machine.rbt-l-floor_washer.rbt-m-unav{opacity:.45;filter:grayscale(1)}
        .rbt-floor{left:2px;right:2px;top:72px;height:34px;clip-path:polygon(12% 0,88% 0,100% 100%,0 100%)}
        .rbt-parquet{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='12'%3E%3Crect width='30' height='6' fill='%23c99b67'/%3E%3Crect y='6' width='30' height='6' fill='%23b98854'/%3E%3Cpath d='M0 0 V6 M15 6 V12 M0 6 H30 M0 12 H30' stroke='%237a5130' stroke-opacity='.45' stroke-width='.8'/%3E%3Cpath d='M3 2 H11 M19 3.5 H27 M6 9 H13 M20 8.5 H25' stroke='%239c6c3c' stroke-opacity='.35' stroke-width='.5'/%3E%3C/svg%3E") 0 0/30px 12px}
        .rbt-smooth{background:radial-gradient(ellipse at 50% 15%,rgba(255,255,255,.75),transparent 60%),linear-gradient(180deg,#e7ebee,#cfd6dc)}
        .rbt-rug{background:repeating-linear-gradient(90deg,#c8b79c 0 3px,#bfae92 3px 6px)}
        .rbt-tiles{background:linear-gradient(90deg,rgba(0,0,0,.08) 1px,transparent 1px) 0 0/12px 100%,linear-gradient(180deg,rgba(0,0,0,.08) 1px,transparent 1px) 0 0/100% 9px,#dfe4e8}
        .rbt-lawn{left:0;right:0;top:60px;height:46px;clip-path:polygon(10% 0,90% 0,100% 100%,0 100%);background:radial-gradient(ellipse at 50% 0,#6db457,#559d41 70%,#4a8f37)}
        .rbt-trace{height:9px;width:0;opacity:0}
        .rbt-trace.rbt-t1{left:6px;top:80px}
        .rbt-trace.rbt-t2{right:6px;top:88px}
        .rbt-floor .rbt-trace{position:absolute}
        .rbt-floor .rbt-trace.rbt-t1{left:2px;top:8px}
        .rbt-floor .rbt-trace.rbt-t2{right:2px;top:16px}
        .rbt-rugtrace{background:repeating-linear-gradient(90deg,#d6c7ae 0 3px,#cdbca1 3px 6px)}
        .rbt-wet{background:linear-gradient(180deg,rgba(79,195,247,.15),rgba(79,195,247,.45),rgba(79,195,247,.15));border-radius:3px}
        .rbt-cut{background:repeating-linear-gradient(90deg,#8fcf6f 0 1.5px,#9fd97e 1.5px 3.5px)}
        .rbt-m-cleaning .rbt-t1{animation:rbt-t1 9s linear infinite}
        .rbt-m-cleaning .rbt-t2{animation:rbt-t2 9s linear infinite}
        @keyframes rbt-t1{0%{width:0;opacity:1}45%{width:72px;opacity:1}95%{width:72px;opacity:.5}100%{width:72px;opacity:0}}
        @keyframes rbt-t2{0%,50%{width:0;opacity:1}95%{width:74px;opacity:1}100%{width:74px;opacity:0}}
        /* Back and forth on the floor, which leans: the far row sits further
           right than the near one (#69). */
        @keyframes rbt-path{0%{transform:translate(-9px,8px)}45%{transform:translate(17px,8px)}50%{transform:translate(12px,16px)}95%{transform:translate(-14px,16px)}100%{transform:translate(-9px,8px)}}
        @keyframes rbt-ret{0%{transform:translate(12px,16px)}65%,100%{transform:translate(0,0)}}
        .rbt-dock{left:28px;top:14px;width:40px;height:56px;border-radius:0 0 20px 20px/0 0 6px 6px;background:linear-gradient(90deg,var(--bl),var(--b) 18%,var(--bh) 38%,var(--b) 68%,var(--bl))}
        .rbt-dcap{left:28px;top:8px;width:40px;height:12px;border-radius:50%;background:radial-gradient(ellipse at 45% 40%,var(--bh),var(--b) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}
        .rbt-plate{left:30px;top:72px;width:36px;height:5px;border-radius:0 0 18px 18px/0 0 4px 4px;background:linear-gradient(90deg,var(--bl),var(--dk) 40%,var(--bl))}
        .rbt-pcap{left:30px;top:66px;width:36px;height:9px;border-radius:50%;background:radial-gradient(ellipse at 50% 35%,var(--dkh),var(--dk) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)}
        .rbt-pcap::before,.rbt-pcap::after{content:"";position:absolute;top:4px;width:6px;height:1.5px;border-radius:1px;background:#b0b7be}
        .rbt-pcap::before{left:9px}
        .rbt-pcap::after{right:9px}
        .rbt-dled{left:18px;top:4px;width:4px;height:2px;border-radius:1px;background:#3d434a}
        .rbt-bin{left:9px;top:10px;width:22px;height:24px;border-radius:4px;background:rgba(15,18,22,.55);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
        .rbt-bin .rbt-fill{left:0;right:0;bottom:0;height:var(--fill,30%);background:linear-gradient(180deg,#a99b86,#8d806d);transition:height 1s}
        .rbt-bin b{position:absolute;bottom:0;width:2px;height:2px;border-radius:50%;background:#bdb09a;opacity:0}
        .rbt-bin b:nth-child(2){left:6px}
        .rbt-bin b:nth-child(3){left:11px;--d0:.3s}
        .rbt-bin b:nth-child(4){left:16px;--d0:.6s}
        .rbt-m-emptying .rbt-bin b{animation:rbt-dust .9s linear infinite}
        .rbt-m-emptying .rbt-bin .rbt-fill{animation:rbt-fillup 6s ease-in-out infinite}
        @keyframes rbt-dust{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-22px);opacity:0}}
        @keyframes rbt-fillup{0%{height:30%}100%{height:62%}}
        .rbt-m-charging .rbt-dled,.rbt-m-emptying .rbt-dled{background:#2ecc71;box-shadow:0 0 3px #2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-rb{left:22px;top:60px;width:52px;height:27px}
        .rbt-rb>*{position:absolute}
        .rbt-rb .rbt-sd{left:0;top:9px;width:52px;height:18px;border-radius:0 0 26px 26px/0 0 9px 9px;background:linear-gradient(90deg,var(--bl),var(--b) 20%,var(--bh) 40%,var(--b) 65%,var(--bl));box-shadow:0 2px 3px rgba(0,0,0,.25)}
        .rbt-rb .rbt-bmp{left:0;top:9px;width:52px;height:14px;box-sizing:border-box;border-radius:0 0 26px 26px/0 0 9px 9px;border-bottom:1px solid rgba(0,0,0,.4)}
        .rbt-rb .rbt-tp{left:0;top:0;width:52px;height:18px;border-radius:50%;background:radial-gradient(ellipse at 45% 40%,var(--bh),var(--b) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)}
        .rbt-rb .rbt-lidw{left:20px;top:3px;width:12px;height:5px;border-radius:0 0 6px 6px/0 0 2.5px 2.5px;background:linear-gradient(90deg,#15181b,#3b4148 40%,#15181b)}
        .rbt-rb .rbt-lid{left:20px;top:.5px;width:12px;height:5px;border-radius:50%;background:radial-gradient(ellipse at 45% 40%,#4a5057,#24282c 80%)}
        .rbt-rb .rbt-ring{left:20px;top:10px;width:12px;height:4.5px;border-radius:50%;box-shadow:0 0 0 1.3px #59606a;background:var(--dk)}
        .rbt-rb .rbt-brush{left:0;bottom:0;width:24px;height:24px;transform:scaleY(.38);transform-origin:bottom}
        .rbt-rb .rbt-brush i{position:absolute;inset:0;border-radius:50%;background:conic-gradient(#1c1f23 0 6%,transparent 6% 33%,#1c1f23 33% 39%,transparent 39% 66%,#1c1f23 66% 72%,transparent 72%)}
        .rbt-m-cleaning .rbt-rb{animation:rbt-path 9s linear infinite}
        .rbt-m-cleaning .rbt-rb .rbt-brush i{animation:rbt-spin .35s linear infinite}
        .rbt-m-returning .rbt-rb{animation:rbt-ret 4.5s ease-in-out infinite}
        .rbt-m-paused .rbt-rb,.rbt-m-error .rbt-rb{transform:translate(-16px,14px)}
        .rbt-m-error .rbt-rb{transform:translate(-16px,14px) rotate(-9deg)}
        .rbt-rb .rbt-pad{left:8px;bottom:-1.5px;width:36px;height:4px;border-radius:0 0 7px 7px;background:#cfd8dc}
        .rbt-m-cleaning .rbt-rb .rbt-pad{background:#81d4fa}
        .rbt-cm-vacuum.rbt-m-cleaning .rbt-rb .rbt-pad{background:#cfd8dc}
        .rbt-cm-mop.rbt-m-cleaning .rbt-rb .rbt-brush i{animation:none}
        .rbt-rb .rbt-tank{left:6px;top:5px;width:11px;height:7px;border-radius:2.5px;background:rgba(15,18,22,.35);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
        .rbt-rb .rbt-tank i{position:absolute;left:0;right:0;bottom:0;height:var(--lvl,70%);background:linear-gradient(180deg,#81d4fa,#29b6f6)}
        .rbt-m-empty .rbt-rb .rbt-tank i{background:#ff9800;height:12%}
        .rbt-l-combo.rbt-m-empty .rbt-rb{transform:translate(-16px,14px)}
        .rbt-l-combo .rbt-mdock .rbt-tk{height:19px}
        .rbt-mdock .rbt-bin{left:13px;top:26px;width:26px;height:14px}
        .rbt-l-combo .rbt-mdock .rbt-dled{top:42px}
        .rbt-ring{box-shadow:0 0 0 1.3px #59606a}
        .rbt-m-charging .rbt-ring{box-shadow:0 0 0 1.3px #2ecc71,0 0 4px #2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-cleaning .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7,0 0 4px #4fc3f7}
        .rbt-m-returning .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7,0 0 4px #4fc3f7;animation:rbt-blink 1.2s steps(1) infinite}
        .rbt-m-paused .rbt-ring{box-shadow:0 0 0 1.3px #ffb300}
        .rbt-m-full .rbt-ring,.rbt-m-empty .rbt-ring{box-shadow:0 0 0 1.3px #ff9800,0 0 4px #ff9800}
        .rbt-m-emptying .rbt-ring{box-shadow:0 0 0 1.3px #2ecc71}
        .rbt-m-error .rbt-ring{box-shadow:0 0 0 1.3px #f44336,0 0 5px #f44336;animation:rbt-blink 1s steps(1) infinite}
        .rbt-rm{left:24px;top:60px;width:48px;height:27px}
        .rbt-rm>*{position:absolute}
        .rbt-rm .rbt-sd{left:0;top:9px;width:48px;height:16px;border-radius:0 0 12px 12px/0 0 8px 8px;background:linear-gradient(90deg,var(--bl),var(--b) 20%,var(--bh) 40%,var(--b) 65%,var(--bl));box-shadow:0 2px 3px rgba(0,0,0,.25)}
        .rbt-rm .rbt-pad{left:4px;bottom:-1px;width:40px;height:4px;border-radius:0 0 6px 6px;background:#cfd8dc}
        .rbt-m-cleaning .rbt-rm .rbt-pad{background:#81d4fa}
        .rbt-rm .rbt-tp{left:0;top:0;width:48px;height:18px;border-radius:12px/8px;background:radial-gradient(ellipse at 40% 30%,var(--bh),var(--b) 70%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.18)}
        .rbt-rm .rbt-tank{left:6px;top:4px;width:18px;height:9px;border-radius:3px;background:rgba(15,18,22,.35);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
        .rbt-rm .rbt-tank i{position:absolute;left:0;right:0;bottom:0;height:var(--lvl,70%);background:linear-gradient(180deg,#81d4fa,#29b6f6)}
        .rbt-m-empty .rbt-rm .rbt-tank i{background:#ff9800;height:12%}
        .rbt-rm .rbt-ring{left:30px;top:6px;width:11px;height:5px;border-radius:50%;background:var(--dk)}
        .rbt-m-cleaning .rbt-rm{animation:rbt-path 9s linear infinite}
        .rbt-m-returning .rbt-rm{animation:rbt-ret 4.5s ease-in-out infinite}
        .rbt-m-paused .rbt-rm,.rbt-m-empty .rbt-rm{transform:translate(-16px,14px)}
        .rbt-m-error .rbt-rm{transform:translate(-16px,14px) rotate(-9deg)}
        .rbt-mdock{left:22px;top:16px;width:52px;height:56px;border-radius:0 0 6px 6px;background:linear-gradient(90deg,var(--bl),var(--bh) 35%,var(--b) 70%,var(--bl));box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
        .rbt-mdock .rbt-tk{top:4px;width:19px;height:26px;border-radius:4px;overflow:hidden;background:rgba(15,18,22,.45);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
        .rbt-mdock .rbt-tk.rbt-c{left:5px}
        .rbt-mdock .rbt-tk.rbt-d{right:5px}
        .rbt-mdock .rbt-tk i{position:absolute;left:0;right:0;bottom:0}
        .rbt-mdock .rbt-tk.rbt-c i{height:var(--clean,75%);background:linear-gradient(180deg,#81d4fa,#29b6f6)}
        .rbt-mdock .rbt-tk.rbt-d i{height:var(--dirty,20%);background:linear-gradient(180deg,#a1887f,#795548)}
        .rbt-mdock .rbt-dled{left:24px;top:35px}
        .rbt-mcap{left:22px;top:9px;width:52px;height:13px;border-radius:8px/6px;background:linear-gradient(180deg,var(--bh),var(--b));box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}
        .rbt-m-washing .rbt-mdock .rbt-tk.rbt-c i{animation:rbt-drain 6s linear infinite}
        .rbt-m-washing .rbt-mdock .rbt-tk.rbt-d i{animation:rbt-fillup 6s linear infinite}
        @keyframes rbt-drain{0%{height:75%}100%{height:45%}}
        .rbt-bubbles{left:24px;top:76px;width:48px;height:8px;opacity:0}
        .rbt-m-washing .rbt-bubbles{opacity:1}
        .rbt-bubbles b{position:absolute;bottom:0;width:4px;height:4px;border-radius:50%;border:1px solid rgba(129,212,250,.9);animation:rbt-bub 1.3s ease-out infinite}
        .rbt-bubbles b:nth-child(1){left:4px}
        .rbt-bubbles b:nth-child(2){left:16px;--d0:.4s}
        .rbt-bubbles b:nth-child(3){left:28px;--d0:.8s}
        .rbt-bubbles b:nth-child(4){left:40px;--d0:.2s}
        @keyframes rbt-bub{0%{transform:translateY(0) scale(.5);opacity:0}30%{opacity:1}100%{transform:translateY(-12px) scale(1);opacity:0}}
        .rbt-vapor{left:26px;top:70px;width:44px;height:17px}
        .rbt-m-drying .rbt-vapor{display:block}
        .rbt-vapor path{stroke:#ff6d00}
        .rbt-smoke{position:absolute;display:none;overflow:visible;left:6px;top:-30px;width:40px;height:30px}
        .rbt-m-error .rbt-smoke{display:block}
        .rbt-smoke .rbt-pf{transform-box:fill-box;transform-origin:50% 100%;animation:rbt-puff 2s ease-out infinite}
        .rbt-smoke .rbt-pf2{--d0:-1s}
        .rbt-smoke .rbt-o{fill:#111417}
        .rbt-smoke .rbt-f{fill:#6b737b}
        .rbt-smoke .rbt-hl{fill:none;stroke:rgba(255,255,255,.75);stroke-width:1;stroke-linecap:round}
        @keyframes rbt-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        .rbt-angm{position:absolute;display:none;width:12px;height:12px;overflow:visible;z-index:2}
        .rbt-m-error .rbt-angm{display:block}
        .rbt-rb .rbt-angm{left:38px;top:-4px}
        .rbt-rm .rbt-angm{left:35px;top:-3px}
        .rbt-mw .rbt-angm{left:44px;top:6px;width:12px;height:12px}
        .rbt-angm .rbt-ang{fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:rbt-ang .7s ease-in-out infinite alternate}
        @keyframes rbt-ang{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .rbt-rb .rbt-smoke,.rbt-rm .rbt-smoke{left:2px;top:-26px}
        .rbt-mw .rbt-smoke{left:4px;top:-22px}
        .rbt-smoke{transform-origin:50% 100%}
        .rbt-m-error .rbt-rb .rbt-smoke,.rbt-m-error .rbt-rm .rbt-smoke{transform:rotate(9deg)}
        .rbt-m-error .rbt-mw .rbt-smoke{transform:rotate(7deg)}
        .rbt-vapor{opacity:.8}
        .rbt-m-drying .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-washing .rbt-ring{box-shadow:0 0 0 1.3px #4fc3f7;animation:rbt-breathe 1.2s ease-in-out infinite}
        .rbt-st-base{left:40px;top:83px;width:56px;height:8px;border-radius:50%;background:radial-gradient(ellipse at 50% 35%,var(--dkh),var(--dk) 80%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
        .rbt-st-tower{left:80px;top:66px;width:14px;height:22px;border-radius:7px 7px 2px 2px;background:linear-gradient(90deg,var(--bl),var(--b) 30%,var(--bh) 50%,var(--b) 75%,var(--bl))}
        .rbt-st-tower::after{content:"";position:absolute;left:-3px;top:13px;width:4px;height:3px;border-radius:1px;background:#b0b7be}
        .rbt-sh{position:absolute;left:0;top:0;width:96px;height:106px;overflow:visible;pointer-events:none}
        .rbt-roof .rbt-st-tower,.rbt-roof .rbt-st-led{display:none}
        .rbt-sh-led{fill:#3d434a}
        .rbt-m-charging .rbt-sh-led{fill:#2ecc71;filter:drop-shadow(0 0 1px #2ecc71);animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-sh-drip{fill:rgba(150,195,240,.95);display:none}
        .rbt-m-raining .rbt-sh-drip{display:block;animation:rbt-sh-drip 1.6s ease-in infinite}
        @keyframes rbt-sh-drip{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(26px);opacity:0}}
        .rbt-sh-lean_to .rbt-rain{clip-path:path(evenodd,'M-20 -20 H140 V140 H-20 Z M22 49.2 L26 44.2 L97 36.2 V140 H22 Z')}
        .rbt-sh-garage .rbt-rain{clip-path:path(evenodd,'M-20 -20 H140 V140 H-20 Z M20 52 L26 46 L86 39.6 C94 38.8 98.6 42 98.6 49 V140 H20 Z')}
        .rbt-sh-shell .rbt-rain{clip-path:path(evenodd,'M-20 -20 H140 V140 H-20 Z M25 59 L29 54 C32 41 48 33.5 65 33 C81 32.5 94 37 96 47 V140 H25 Z')}
        .rbt-st-led{left:86px;top:70px;width:2px;height:4px;border-radius:1px;background:#3d434a}
        .rbt-m-charging .rbt-st-led{background:#2ecc71;box-shadow:0 0 3px #2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-mw{left:30px;top:53px;width:62px;height:35px;transform-origin:50% 100%}
        .rbt-cap{display:none;position:absolute;background:linear-gradient(180deg,#fff,#e6eef5);border-radius:50% 50% 30% 30%/80% 80% 20% 20%;box-shadow:0 1px 1px rgba(60,90,120,.35),inset 0 -1px 0 #c7d8e6}
        .rbt-m-winter .rbt-cap{display:block}
        .rbt-cap-mw{left:40px;top:52px;width:36px;height:7px}
        .rbt-cap-st{left:79px;top:62.5px;width:16px;height:6px}
        .rbt-m-winter .rbt-lawn{background:radial-gradient(ellipse at 50% 0,#f2f7fb,#d9e6f0 60%,#bdd0df)}
        .rbt-m-winter .rbt-tall,.rbt-m-winter .rbt-stub{display:none}
        .rbt-m-winter .rbt-mw{filter:saturate(.55) brightness(1.04)}
        .rbt-snow{position:absolute;left:0;top:0;width:96px;height:100px;overflow:hidden;pointer-events:none}
        .rbt-snow b{position:absolute;top:-6px;width:var(--s);height:var(--s);border-radius:50%;background:#eaf3fa;box-shadow:0 0 0 .5px #8fb0c9;animation:rbt-flake var(--d) linear var(--d0) infinite}
        @keyframes rbt-flake{0%{transform:translate(0,0)}25%{transform:translate(3px,25px)}50%{transform:translate(-2px,50px)}75%{transform:translate(3px,75px)}100%{transform:translate(0,100px)}}
        .rbt-mw svg{position:absolute;left:0;top:0;width:62px;height:35px;overflow:visible}
        .rbt-mw .rbt-whl{transform-box:fill-box;transform-origin:center}
        .rbt-mw .rbt-led{fill:#59606a}
        .rbt-m-charging .rbt-mw .rbt-led{fill:#2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-cleaning .rbt-mw .rbt-led{fill:#4fc3f7}
        .rbt-m-returning .rbt-mw .rbt-led{fill:#4fc3f7;animation:rbt-blink 1.2s steps(1) infinite}
        .rbt-m-paused .rbt-mw .rbt-led{fill:#ffb300}
        .rbt-m-error .rbt-mw .rbt-led{fill:#f44336;animation:rbt-blink 1s steps(1) infinite}
        @keyframes rbt-mowpath{0%{transform:translate(-40px,8px)}45%{transform:translate(-4px,8px)}48%{transform:translate(-4px,8px) scaleX(-1)}95%{transform:translate(-40px,8px) scaleX(-1)}98%,100%{transform:translate(-40px,8px)}}
        @keyframes rbt-mowret{0%{transform:translate(-32px,8px)}70%,100%{transform:translate(0,0)}}
        .rbt-m-cleaning .rbt-mw{transform:translate(-14px,8px);animation:rbt-bob .5s ease-in-out infinite}
        @keyframes rbt-bob{50%{transform:translate(-14px,7.6px)}}
        .rbt-m-cleaning .rbt-st-base,.rbt-m-cleaning .rbt-st-tower,.rbt-m-cleaning .rbt-st-led,.rbt-m-cleaning .rbt-sh{display:none}
        .rbt-m-cleaning .rbt-mw .rbt-whl{animation:rbt-spin .9s linear infinite}
        .rbt-m-returning .rbt-mw{animation:rbt-mowret 4.5s ease-in-out infinite}
        .rbt-m-returning .rbt-mw .rbt-whl{animation:rbt-whlret 4.5s ease-in-out infinite}
        @keyframes rbt-whlret{0%{transform:rotate(0)}70%,100%{transform:rotate(1080deg)}}
        .rbt-m-paused .rbt-mw{transform:translate(-30px,8px)}
        .rbt-m-error .rbt-mw{transform:translate(-30px,8px) rotate(-7deg)}
        .rbt-stub{left:2px;top:92px;height:5px;width:46px;border-radius:2px;background:repeating-linear-gradient(90deg,#8bcf6c 0 1px,#79bf5c 1px 2.5px);display:none}
        .rbt-m-cleaning .rbt-stub{display:block;animation:rbt-scroll 1.4s linear infinite}
        .rbt-tall{left:48px;top:81px;width:47px;height:16px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='16'%3E%3Cpath d='M0.0 16 Q-0.7 10.2 -0.9 6.4 Q1.2 11.2 1.7 16Z' fill='%233f8a2e'/%3E%3Cpath d='M1.8 16 Q2.0 11.3 3.2 8.2 Q3.8 12.1 3.7 16Z' fill='%234f9b3a'/%3E%3Cpath d='M2.6 16 Q1.8 9.7 1.1 5.5 Q3.3 10.8 3.9 16Z' fill='%236fbd55'/%3E%3Cpath d='M3.5 16 Q4.4 9.1 6.6 4.5 Q5.9 10.2 5.2 16Z' fill='%23468f33'/%3E%3Cpath d='M5.4 16 Q5.2 9.0 5.9 4.4 Q7.3 10.2 7.4 16Z' fill='%233f8a2e'/%3E%3Cpath d='M6.9 16 Q6.7 11.2 7.3 7.9 Q8.4 12.0 8.5 16Z' fill='%23468f33'/%3E%3Cpath d='M8.1 16 Q7.4 7.9 7.3 2.5 Q9.3 9.2 9.7 16Z' fill='%234f9b3a'/%3E%3Cpath d='M9.3 16 Q8.4 9.2 7.8 4.6 Q9.9 10.3 10.6 16Z' fill='%234f9b3a'/%3E%3Cpath d='M10.7 16 Q11.3 9.2 12.9 4.7 Q12.7 10.4 12.3 16Z' fill='%236fbd55'/%3E%3Cpath d='M12.0 16 Q11.3 10.6 11.3 7.0 Q13.3 11.5 13.8 16Z' fill='%233f8a2e'/%3E%3Cpath d='M13.4 16 Q14.2 9.3 16.2 4.8 Q15.8 10.4 15.2 16Z' fill='%235fae47'/%3E%3Cpath d='M15.0 16 Q15.0 11.4 15.7 8.4 Q16.3 12.2 16.3 16Z' fill='%235fae47'/%3E%3Cpath d='M16.0 16 Q15.0 9.5 14.5 5.1 Q17.0 10.5 17.7 16Z' fill='%23468f33'/%3E%3Cpath d='M17.4 16 Q17.1 7.6 17.4 2.0 Q18.9 9.0 19.2 16Z' fill='%23468f33'/%3E%3Cpath d='M18.8 16 Q18.0 8.0 17.3 2.6 Q19.5 9.3 20.1 16Z' fill='%235fae47'/%3E%3Cpath d='M20.2 16 Q19.3 8.6 18.9 3.7 Q21.3 9.8 22.0 16Z' fill='%23468f33'/%3E%3Cpath d='M22.2 16 Q21.8 7.9 21.9 2.4 Q23.4 9.2 23.7 16Z' fill='%235fae47'/%3E%3Cpath d='M23.0 16 Q22.4 9.6 22.0 5.3 Q23.8 10.7 24.3 16Z' fill='%233f8a2e'/%3E%3Cpath d='M24.1 16 Q24.6 10.4 26.0 6.7 Q26.0 11.4 25.6 16Z' fill='%236fbd55'/%3E%3Cpath d='M25.0 16 Q25.1 9.6 26.2 5.4 Q27.0 10.7 26.9 16Z' fill='%236fbd55'/%3E%3Cpath d='M26.8 16 Q26.7 10.5 27.1 6.8 Q28.2 11.4 28.3 16Z' fill='%236fbd55'/%3E%3Cpath d='M28.8 16 Q28.1 11.1 27.8 7.8 Q29.7 11.9 30.2 16Z' fill='%234f9b3a'/%3E%3Cpath d='M29.6 16 Q29.0 7.8 28.7 2.4 Q30.5 9.2 31.0 16Z' fill='%234f9b3a'/%3E%3Cpath d='M30.9 16 Q31.0 10.0 32.2 6.0 Q33.0 11.0 32.9 16Z' fill='%23468f33'/%3E%3Cpath d='M32.8 16 Q33.3 8.7 34.8 3.8 Q34.8 9.9 34.4 16Z' fill='%23468f33'/%3E%3Cpath d='M34.1 16 Q33.3 9.9 33.0 5.8 Q35.2 10.9 35.8 16Z' fill='%233f8a2e'/%3E%3Cpath d='M35.1 16 Q35.0 7.1 35.5 1.1 Q36.3 8.6 36.4 16Z' fill='%23468f33'/%3E%3Cpath d='M36.0 16 Q35.3 11.8 34.9 9.0 Q36.7 12.5 37.3 16Z' fill='%235fae47'/%3E%3Cpath d='M37.5 16 Q36.9 11.5 36.8 8.4 Q38.6 12.2 39.0 16Z' fill='%235fae47'/%3E%3C/svg%3E") repeat-x 0 0/40px 16px;display:none}
        .rbt-m-cleaning .rbt-tall{display:block;animation:rbt-scroll 1.4s linear infinite}
        @keyframes rbt-scroll{to{background-position-x:-40px}}
        .rbt-clip{left:22px;top:24px;width:20px;height:12px;opacity:0}
        .rbt-m-cleaning .rbt-clip{opacity:1}
        .rbt-clip b{position:absolute;bottom:0;width:2.2px;height:1.1px;border-radius:1px;background:#8fdc6f;animation:rbt-clip .8s ease-out infinite}
        .rbt-clip b:nth-child(1){left:12px}
        .rbt-clip b:nth-child(2){left:14px;--d0:.13s}
        .rbt-clip b:nth-child(3){left:16px;--d0:.27s}
        .rbt-clip b:nth-child(4){left:13px;--d0:.4s}
        .rbt-clip b:nth-child(5){left:15px;--d0:.53s}
        .rbt-clip b:nth-child(6){left:17px;--d0:.67s}
        @keyframes rbt-clip{0%{transform:translate(0,2px) rotate(0);opacity:1}60%{opacity:1}100%{transform:translate(-9px,-4px) rotate(160deg);opacity:0}}
        .rbt-cloud{left:12px;top:2px;width:72px;height:26px;display:none}
        .rbt-m-raining .rbt-cloud{display:block}
        .rbt-cloud svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}
        .rbt-rain{left:0;top:0;width:96px;height:100px;display:none;overflow:hidden}
        .rbt-m-raining .rbt-rain{display:block}
        .rbt-rain b{position:absolute;top:24px;width:.8px;height:7px;border-radius:1px;background:linear-gradient(180deg,rgba(160,200,240,0),rgba(150,195,240,.9));transform:rotate(12deg);animation:rbt-drop var(--d,.6s) linear infinite}
        .rbt-rain u{position:absolute;width:6px;height:2px;border-radius:50%;border:.8px solid rgba(180,215,245,.9);opacity:0;animation:rbt-splash var(--d,.6s) ease-out infinite}
        @keyframes rbt-drop{0%{transform:translate(0,0) rotate(12deg);opacity:0}10%{opacity:1}100%{transform:translate(-13px,64px) rotate(12deg);opacity:1}}
        @keyframes rbt-splash{0%,80%{transform:scale(.2);opacity:0}85%{opacity:1}100%{transform:scale(1.3);opacity:0}}
        .rbt-vapor path:nth-child(2) { --d0: -0.45s; }
        .rbt-vapor path:nth-child(3) { --d0: -0.9s; }
        .rbx{position:absolute;left:0;top:0;width:96px;height:106px;overflow:visible}
        .rbt-l-vacuum .rbt-floor,.rbt-l-mop .rbt-floor,.rbt-l-combo .rbt-floor{left:0;width:78px;clip-path:none;overflow:hidden;transform:skewX(-28deg);transform-origin:50% 100%}
        .machine.rbt.rbx-white,.machine.rbt.rbx-gold{--b:var(--ac-body,#eef1f3);--bh:var(--ac-body-hi,#ffffff);--bl:var(--ac-body-lo,#aab3ba);--dk:#3a4046;--dkh:#555c63}
        .rbx-lv.rbx-c{fill:#29b6f6}
        .rbx-lv.rbx-d{fill:#8d6e4f}
        .rbx-win{display:none}
        .rbt-m-emptying .rbx-win,.rbt-m-full .rbx-win{display:inline}
        .rbx-dustlv{transform-box:fill-box;transform-origin:50% 100%}
        .rbt-m-emptying .rbx-dustlv{animation:rbx-fill 6s ease-in-out infinite}
        .rbt-m-full .rbx-dustlv{transform:scaleY(1.85)}
        .rbt-m-full .rbx-dust{display:none}
        .rbx-spill{display:none}
        .rbt-bag .rbx-spill{display:inline}
        .rbt-bag .rbx-led{fill:#ff9800}
        .rbt-spill{display:none;left:26px;top:-4px;width:44px;height:44px;overflow:visible}
        .rbt-bag .rbt-spill{display:block}
        .rbt-bag .rbt-dcap{visibility:hidden}
        .rbt-ask{display:none;position:absolute;z-index:3;width:12px;height:12px;left:20px;top:-15px;padding:1.5px;border-radius:4px;background:rgba(255,255,255,.92);box-shadow:0 1px 3px rgba(0,0,0,.25);animation:rbt-ask 1.6s ease-in-out infinite}
        .rbt-ask svg{display:block;width:12px;height:12px}
        .rbt-rm .rbt-ask{left:18px}
        .rbt-mw .rbt-ask{left:24px;top:-17px}
        .rbt-n-water .rbt-ask,.rbt-n-dirty .rbt-ask,.rbt-n-battery .rbt-ask{display:block}
        .rbt-ask-lv{animation:rbt-blink 1s steps(1) infinite}
        @keyframes rbt-ask{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        .rbt-n-water .rbx-lv.rbx-c,.rbt-n-dirty .rbx-lv.rbx-d{animation:rbt-blink 1s steps(1) infinite}
        .rbt-n-water .rbx-lv.rbx-c{fill:#ff5722}
        .rbt-n-water .rbt-mdock .rbt-tk.rbt-c i{background:#ff5722;animation:rbt-blink 1s steps(1) infinite}
        .rbt-n-dirty .rbt-mdock .rbt-tk.rbt-d i{animation:rbt-blink 1s steps(1) infinite}
        .rbt-n-water .rbt-mdock .rbt-tk.rbt-c,.rbt-n-dirty .rbt-mdock .rbt-tk.rbt-d{box-shadow:inset 0 0 0 1px #ff9800}
        .rbt-n-water .rbt-tank i{background:#ff9800;height:12%}
        .rbt-n-water .rbx-led,.rbt-n-dirty .rbx-led,.rbt-n-water .rbt-dled,.rbt-n-dirty .rbt-dled{fill:#ff9800;background:#ff9800;box-shadow:0 0 3px #ff9800}
        .rbx-lidup,.rbt-capup{transform-box:fill-box;transform-origin:50% 100%;animation:rbx-lid 1.6s ease-in-out infinite}
        .rbx-fall circle{opacity:0;transform-box:fill-box;animation:rbx-fall 1.4s ease-in infinite;animation-delay:var(--d0,0s)}
        .rbx-puff circle{opacity:0;transform-box:fill-box;transform-origin:center;animation:rbx-puff 2.2s ease-out infinite;animation-delay:var(--d0,0s)}
        @keyframes rbx-lid{0%,100%{transform:rotate(0)}50%{transform:rotate(-2.5deg) translateY(-.4px)}}
        @keyframes rbx-fall{0%{transform:translate(0,0);opacity:0}12%{opacity:1}100%{transform:translate(var(--dx,-1px),62px);opacity:0}}
        @keyframes rbx-puff{0%{transform:translateY(2px) scale(.5);opacity:0}30%{opacity:.75}100%{transform:translateY(-8px) scale(1.5);opacity:0}}
        .rbx-dust circle{opacity:0;animation:rbx-dust .9s linear infinite}
        .rbx-dust circle:nth-child(2){--d0:.3s}
        .rbx-dust circle:nth-child(3){--d0:.6s}
        @keyframes rbx-dust{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-10px);opacity:0}}
        @keyframes rbx-fill{0%{transform:scaleY(1)}100%{transform:scaleY(1.7)}}
        .rbx-led{fill:#9aa3ab}
        .rbx-black .rbx-led{fill:#5a636b}
        .rbt-m-charging .rbx-led,.rbt-m-emptying .rbx-led,.rbt-m-washing .rbx-led,.rbt-m-drying .rbx-led{fill:#2ecc71;animation:rbt-breathe 2.4s ease-in-out infinite}
        .rbt-m-full .rbx-led,.rbt-m-empty .rbx-led{fill:#ff9800}
        .rbt-m-error .rbx-led{fill:#f44336;animation:rbt-blink 1s steps(1) infinite}
        .rbt-cam{display:block;left:19px;top:18.5px;width:14px;height:5px;border-radius:2px;background:#111417;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.22)}
        .rbt-cam::before{content:"";position:absolute;left:3.4px;top:1.2px;width:2.6px;height:2.6px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#9fd3f0,#2d6b8f 45%,#0d1b24)}
        .rbt-cam::after{content:"";position:absolute;left:8.6px;top:1.8px;width:1.4px;height:1.4px;border-radius:50%;background:#e53935}
        .rbt-rm .rbt-cam{left:17px;top:18.2px;height:4.6px}
        .rbt-camb{display:none;left:9px;top:23.5px;width:34px;height:11px;clip-path:polygon(32% 0,68% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(79,195,247,.4),rgba(79,195,247,0))}
        .rbt-rm .rbt-camb{left:7px;top:22.8px}
        .rbt-m-cleaning .rbt-camb{display:block;animation:rbt-breathe 1.6s ease-in-out infinite}
        .rbt-m-cleaning .rbt-cam::after{animation:rbt-blink 1s steps(1) infinite}
        .rbt-base .rbt-dock, .rbt-base .rbt-dcap, .rbt-base .rbt-mdock, .rbt-base .rbt-mcap, .rbt-base .rbt-bubbles, .rbt-base .rbt-vapor { display: none; }
        .rbt-m-idle .rbt-rb, .rbt-m-idle .rbt-rm { transform: translate(-16px, 14px); }
        .rbt-m-idle .rbt-mw { transform: translate(-30px, 8px); }
        .machine.rbt-m-unav { opacity: 0.45; filter: grayscale(1); }
        @keyframes rbt-blink { 50% { opacity: 0.15; } }
        @keyframes rbt-breathe { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes rbt-spin { to { transform: rotate(360deg); } }
        .machine.rbt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.rbt * { animation-name: none !important; } }
  `,
};
}
