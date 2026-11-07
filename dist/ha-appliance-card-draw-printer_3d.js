// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The printer_3d drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// Height of a finished part on the drawing, in pixels.
const P3_PART_MAX = 40;
// The printers drawn after real ones (#93). All in one 120 x 135 box, 0.8 px to
// the unit, with the part drawn whole and clipped to what is printed so far.
const P3R_DEFS = `<defs>
<linearGradient id="p3r-dk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3e44"/><stop offset="1" stop-color="#17191c"/></linearGradient>
<linearGradient id="p3r-dk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2d31"/><stop offset="1" stop-color="#101214"/></linearGradient>
<linearGradient id="p3r-wh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fafbfb"/><stop offset="1" stop-color="#cfd4d8"/></linearGradient>
<linearGradient id="p3r-ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f45"/><stop offset=".5" stop-color="#1f2226"/><stop offset="1" stop-color="#121417"/></linearGradient>
<linearGradient id="p3r-gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".4" stop-color="#fff" stop-opacity=".02"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>
<linearGradient id="p3r-pei" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b6250"/><stop offset="1" stop-color="#8d8168"/></linearGradient>
<linearGradient id="p3r-z" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8d8f92"/><stop offset=".5" stop-color="#e2e4e6"/><stop offset="1" stop-color="#7c7e81"/></linearGradient>
<linearGradient id="p3r-lt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4d6" stop-opacity=".5"/><stop offset="1" stop-color="#fff4d6" stop-opacity="0"/></linearGradient>
<linearGradient id="p3r-sp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset=".35" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
</defs>`;
const P3R_MAX = 30;
function p3rPart(p, cx, bot, h) {
  if (h <= 0) return "";
  const shape = p.part === "duck"
    ? `<path class="p3r-part" transform="translate(${cx - 12.75} ${bot - P3R_MAX}) scale(.75)" d="M1 20 L10 24 Q13 23 15 20 C12 14 15 5 22 5 C27 5 29 8 29.5 10 L34 12.5 L34 14 L29.5 16 Q28 19 25 21 C31 22 33 26 33 30 C33 37 27 40 17 40 C7 40 2 36 2 31 C2 27 1 24 1 20 Z"/>`
    : p.part === "pyramid"
      ? `<path class="p3r-part" d="M${cx} ${bot - P3R_MAX} L${cx + 14} ${bot} H${cx - 14} Z"/>`
      : `<rect class="p3r-part" x="${cx - 11}" y="${bot - P3R_MAX}" width="22" height="${P3R_MAX}"/>`;
  let layers = "";
  for (let y = bot - 2; y > bot - h; y -= 2) layers += `<rect x="${cx - 17}" y="${y}" width="34" height=".4" fill="#000" opacity=".18"/>`;
  const top = p.part === "cube" || !p.part ? `<path class="p3r-part" d="M${cx - 11} ${bot - h} L${cx - 8} ${bot - h - 2.4} H${cx + 8} L${cx + 11} ${bot - h} Z"/><path d="M${cx - 11} ${bot - h} L${cx - 8} ${bot - h - 2.4} H${cx + 8} L${cx + 11} ${bot - h} Z" fill="#fff" opacity=".3"/>` : "";
  return `<clipPath id="p3r-c"><rect x="${cx - 18}" y="${bot - h}" width="36" height="${h}"/></clipPath><g clip-path="url(#p3r-c)">${shape}${layers}</g>${top}`;
}
function p3rBed(cx, y, w, under) {
  return `<path d="M${cx - w / 2} ${y + 7} L${cx - w / 2 + 6} ${y} H${cx + w / 2 - 6} L${cx + w / 2} ${y + 7} Z" fill="url(#p3r-pei)"/><rect class="p3r-glow" x="${cx - w / 2}" y="${y + 7}" width="${w}" height="1.8"/>${under}`;
}
function p3rHead(cx, y, c1, c2) {
  return `<g class="p3r-hd"><path d="M${cx + 3} ${y - 4} C${cx + 3} ${y - 18},${cx + 18} ${y - 14},${cx + 22} ${y - 26}" fill="none" stroke="#dfe3e6" stroke-width="1.3"/><rect x="${cx - 8}" y="${y - 5}" width="16" height="13" rx="2.2" fill="${c1}"/><rect x="${cx - 6}" y="${y - 3}" width="12" height="7.6" rx="1.4" fill="${c2}"/><g class="p3r-fan"><rect x="${cx - .4}" y="${y - 2.4}" width=".8" height="6.4" fill="#888"/><rect x="${cx - 3.2}" y="${y + .4}" width="6.4" height=".8" fill="#888"/></g><path class="p3r-nz" d="M${cx - 2} ${y + 8} H${cx + 2} L${cx} ${y + 11.4} Z"/></g>`;
}
// Enclosed: the head stays up and the bed drops as the part grows.
function p3rEnclosed(p, h, o) {
  const { wx, wy, ww, wh, wr } = o;
  const cx = wx + ww / 2, gy = wy + 14, by = p.parked ? wy + wh - 16 : gy + 11.4 + h;
  return `${o.back}<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="${wr}" fill="url(#p3r-ch)"/>
    <path d="M${wx} ${wy} L${wx + 9} ${wy + 7} V${wy + wh - 9} L${wx} ${wy + wh} M${wx + ww} ${wy} L${wx + ww - 9} ${wy + 7} V${wy + wh - 9} L${wx + ww} ${wy + wh}" stroke="#000" stroke-opacity=".35" stroke-width=".7" fill="none"/>
    <rect class="p3r-light" x="${wx + 6}" y="${wy + 2}" width="${ww - 12}" height="1.6" rx=".8" fill="#fff4d6"/><rect class="p3r-light" x="${wx + 6}" y="${wy + 2}" width="${ww - 12}" height="16" fill="url(#p3r-lt)"/>
    <rect x="${wx + 18}" y="${wy + 8}" width="1.5" height="${wh - 14}" fill="url(#p3r-z)"/><rect x="${wx + ww - 19.5}" y="${wy + 8}" width="1.5" height="${wh - 14}" fill="url(#p3r-z)"/>
    ${p3rBed(cx, by, ww - 22, `<rect x="${cx - ww / 2 + 14}" y="${by + 9}" width="${ww - 28}" height="2.4" rx="1" fill="#2f3237"/>`)}
    ${p3rPart(p, cx, by + 4.5, h)}
    <rect x="${wx + 6}" y="${gy + 1}" width="${ww - 12}" height="2.6" rx="1" fill="#50555b"/><rect x="${wx + 6}" y="${gy + 1}" width="${ww - 12}" height=".8" fill="#8b9096"/>
    ${p3rHead(cx, gy, o.hc1, o.hc2)}
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="${wr}" fill="url(#p3r-gl)" stroke="#000" stroke-opacity=".5" stroke-width=".6"/><path d="M${wx + 6} ${wy + wh - 5} L${wx + 30} ${wy + 5} H${wx + 40} L${wx + 16} ${wy + wh - 5} Z" fill="#fff" opacity=".05"/>${o.front}`;
}
// Open: the bed goes back and forth, and the gantry climbs with the part.
function p3rOpen(p, h, o) {
  const cx = 60, bt = 84, gy = p.parked ? 34 : bt - h - 14, lx = o.lx, ty = o.ty, rx = 120 - lx - 7;
  const up = (x) => `<rect x="${x}" y="${ty}" width="7" height="${106 - ty}" fill="${o.up}"/>${o.slots ? `<rect x="${x + 3}" y="${ty}" width="1" height="${106 - ty}" fill="#000" opacity=".4"/>` : ""}`;
  return `${o.back}${up(lx)}${up(rx)}
    <rect x="${lx + 8}" y="${ty + 3}" width="1.4" height="${100 - ty}" fill="url(#p3r-z)"/><rect x="${rx - 2.4}" y="${ty + 3}" width="1.4" height="${100 - ty}" fill="url(#p3r-z)"/>
    ${o.topbar}
    <g class="p3r-slide">${p3rBed(cx, bt - 2, 58, `<rect x="${cx - 18}" y="${bt + 7}" width="36" height="2.6" rx="1" fill="#26292d"/>`)}${p3rPart(p, cx, bt + 2.5, h)}</g>
    <rect x="${lx - 1}" y="${gy + 1}" width="${122 - 2 * lx}" height="4.2" rx="1" fill="${o.bar}"/><rect x="${lx - 1}" y="${gy + 1}" width="${122 - 2 * lx}" height="1" fill="#fff" opacity=".18"/>
    ${p3rHead(cx, gy, o.hc1, o.hc2)}${o.front}`;
}
const p3rText = (x, y, size, fill, text) => (text ? `<text x="${x}" y="${y}" font-size="${size}" font-family="monospace" fill="${fill}">${esc(text)}</text>` : "");
const P3R_DRAW = {
  bambu_x: (p, h, d) => p3rEnclosed(p, h, { wx: 15, wy: 17, ww: 90, wh: 82, wr: 2.5, hc1: "#2a2d31", hc2: "#3d4147",
    back: `<rect x="9" y="5" width="102" height="115" rx="4.5" fill="url(#p3r-dk)" stroke="#fff" stroke-opacity=".14" stroke-width=".5"/><path d="M12 5 H108 L106 13 H14 Z" fill="#1a1c1f"/><path d="M14 7 H106 L105 11.5 H15 Z" fill="#fff" opacity=".1"/><rect x="50" y="7.6" width="20" height="1.6" rx=".8" fill="#000" opacity=".5"/><rect x="9" y="120" width="12" height="3" rx="1" fill="#0d0e10"/><rect x="99" y="120" width="12" height="3" rx="1" fill="#0d0e10"/>`,
    front: `<rect x="100" y="52" width="2" height="18" rx="1" fill="#8b9096"/><rect x="18" y="104" width="24" height="11" rx="1.4" fill="#0c0e10" stroke="#3a3e44" stroke-width=".5"/><rect x="20" y="106" width="20" height="7" fill="#113322"/>${p3rText(21.5, 111.5, 5, "#4ade80", d)}<circle cx="50" cy="109.5" r="3.2" fill="#2a2d31" stroke="#55595f" stroke-width=".6"/><rect class="p3r-led" x="88" y="108.4" width="14" height="1.6" rx=".8" fill="#4ade80"/>` }),
  elegoo_c: (p, h, d) => p3rEnclosed(p, h, { wx: 13, wy: 12, ww: 94, wh: 80, wr: 7, hc1: "#e9ecef", hc2: "#b8bec4",
    back: `<rect x="7" y="4" width="106" height="117" rx="7" fill="url(#p3r-dk2)" stroke="#fff" stroke-opacity=".14" stroke-width=".5"/><rect x="7" y="4" width="106" height="4" rx="2" fill="#fff" opacity=".07"/><rect x="12" y="121" width="14" height="2.6" rx="1" fill="#0d0e10"/><rect x="94" y="121" width="14" height="2.6" rx="1" fill="#0d0e10"/>`,
    front: `<rect x="16" y="42" width="1.8" height="20" rx=".9" fill="#c8ccd0"/><rect x="42" y="97" width="36" height="19" rx="2.4" fill="#05070a" stroke="#4b5057" stroke-width=".6"/><rect x="44" y="99" width="32" height="15" rx="1" fill="#0d2238"/><rect x="46" y="101" width="9" height="11" rx="1" fill="#1e88e5"/>${p3rText(57, 108.5, 5.6, "#90caf9", d)}<circle class="p3r-led" cx="20" cy="107" r="1.1" fill="#4fc3f7"/><rect x="88" y="104" width="16" height=".7" fill="#000" opacity=".6"/><rect x="88" y="107" width="16" height=".7" fill="#000" opacity=".6"/><rect x="88" y="110" width="16" height=".7" fill="#000" opacity=".6"/>` }),
  bambu_a: (p, h, d) => p3rOpen(p, h, { lx: 15, ty: 12, up: "#2b2e33", bar: "#2b2e33", hc1: "#f2f4f5", hc2: "#c9ced2",
    back: `<rect x="17" y="110" width="10" height="3" rx="1" fill="#2a2d31"/><rect x="93" y="110" width="10" height="3" rx="1" fill="#2a2d31"/>`,
    topbar: `<rect x="15" y="9" width="90" height="6" rx="3" fill="#2b2e33"/><rect x="15" y="9" width="90" height="1.4" rx=".7" fill="#fff" opacity=".12"/>`,
    front: `<path d="M10 97 Q10 93 14 93 H106 Q110 93 110 97 V110 Q110 113 106 113 H14 Q10 113 10 110 Z" fill="url(#p3r-wh)" stroke="#aeb4b9" stroke-width=".5"/><rect x="26" y="96" width="68" height="3" rx="1.5" fill="#000" opacity=".08"/><rect x="15" y="100" width="21" height="10" rx="1.2" fill="#0c0e10"/><rect x="16.5" y="101.5" width="18" height="7" fill="#113322"/>${p3rText(17.5, 106.8, 5, "#4ade80", d)}<circle cx="41" cy="105" r="2.6" fill="#e4e7ea" stroke="#9aa1a8" stroke-width=".5"/>` }),
  elegoo_n: (p, h, d) => p3rOpen(p, h, { lx: 17, ty: 14, up: "#1c1e21", bar: "#26292d", slots: true, hc1: "#1f2226", hc2: "#3f444a",
    // Its spool sits on top, unless a filament box feeds it.
    back: p.ams ? "" : `<rect x="51" y="-1" width="18" height="11" fill="#1e88e5"/><rect x="51" y="-1" width="18" height="11" fill="url(#p3r-sp)"/><rect x="49.5" y="-3" width="2.6" height="15" rx="1.2" fill="#2b2e33"/><rect x="67.9" y="-3" width="2.6" height="15" rx="1.2" fill="#2b2e33"/><rect x="56" y="10" width="8" height="2" fill="#2b2e33"/>`,
    topbar: `<rect x="15" y="11" width="90" height="5.2" fill="#1c1e21"/><rect x="15" y="13" width="90" height=".9" fill="#000" opacity=".5"/><rect x="15" y="11" width="90" height=".8" fill="#fff" opacity=".12"/>`,
    front: `<rect x="10" y="97" width="100" height="16" rx="1.6" fill="url(#p3r-dk2)" stroke="#fff" stroke-opacity=".14" stroke-width=".5"/><rect x="24" y="102" width="30" height=".8" fill="#000" opacity=".7"/><rect x="24" y="105" width="30" height=".8" fill="#000" opacity=".7"/><rect x="24" y="108" width="30" height=".8" fill="#000" opacity=".7"/><g transform="rotate(-3 87 106)"><rect x="72" y="96" width="30" height="20" rx="1.6" fill="#05070a" stroke="#4b5057" stroke-width=".5"/><rect x="74" y="98" width="26" height="16" fill="#0d2238"/><rect x="76" y="100.5" width="6" height="10" rx="1" fill="#1e88e5"/>${p3rText(84, 107.5, 5.6, "#90caf9", d)}</g><rect x="13" y="113" width="10" height="2.4" fill="#0d0e10"/><rect x="97" y="113" width="10" height="2.4" fill="#0d0e10"/>` }),
};
// Where a printer's body sits in the 96 x 108 px of the drawing, for its box.
const P3_BODY = {
  classic_enclosed: { left: 6, right: 90, top: 2, bottom: 103 },
  classic_open: { left: 12, right: 84, top: 6, bottom: 105 },
  bambu_x: { left: 7.2, right: 88.8, top: 10.4, bottom: 104.8 },
  elegoo_c: { left: 5.6, right: 90.4, top: 9.6, bottom: 105 },
  bambu_a: { left: 8, right: 88, top: 13.6, bottom: 96.8 },
  elegoo_n: { left: 8, right: 88, top: 15.2, bottom: 98.7 },
};
function p3Spool(cx, cy, r, s) {
  if (s.empty) return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1b1e22" stroke="#59606a" stroke-width=".7" stroke-dasharray="1.8 1.8"/><circle cx="${cx}" cy="${cy}" r="${r * .26}" fill="#3a4046"/>`;
  const spokes = [0, 120, 240].map((a) => `<rect x="${cx - r * .04}" y="${cy - r * .24}" width="${r * .08}" height="${r * .24}" fill="#7d848c" transform="rotate(${a} ${cx} ${cy})"/>`).join("");
  const rings = [.82, .66, .5].map((k) => `<circle cx="${cx}" cy="${cy}" r="${r * k}" fill="none" stroke="#000" stroke-opacity=".13" stroke-width="${Math.max(.4, r * .03)}"/>`).join("");
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#2a2e33"/><circle cx="${cx}" cy="${cy}" r="${r * .91}" fill="${esc(s.color)}"/>${rings}<circle cx="${cx}" cy="${cy}" r="${r * .34}" fill="#eef0f2" stroke="#9aa1a8" stroke-width=".4"/><g class="${s.on ? "p3a-turn" : ""}">${spokes}<circle cx="${cx}" cy="${cy}" r="${r * .3}" fill="none"/></g><circle cx="${cx}" cy="${cy}" r="${r * .09}" fill="#5a6168"/>${s.on ? `<circle class="p3a-on" cx="${cx}" cy="${cy + r + 1.9}" r="1.1"/>` : ""}`;
}
// A filament box (#93): on top of the printer, or beside it with a tube that
// rises beside the body, passes over its roof and comes down into a coupler.
function p3AmsParts(p, body) {
  const a = p.ams;
  if (!a) return { style: "", svg: "" };
  const n = a.slots.length, cx = (body.left + body.right) / 2;
  const heat = (x, y, w) => (a.drying ? [.2, .5, .8].map((k, i) => `<path class="p3a-h" style="animation-delay:${-i * .8}s" d="M${x + w * k} ${y - 2} q-2.4 -3 0 -6"/>`).join("") : "");
  const box = (x, y, w, h, slots) => `${heat(x, y, w)}<rect x="${x + .5}" y="${y + .5}" width="${w - 1}" height="${h - 1}" rx="4" fill="url(#p3a-b)" stroke="#1d2024"/><rect x="${x + 2.5}" y="${y + 2.5}" width="${w - 5}" height="${h - 8}" rx="2.5" fill="#15181b"/>${slots}<rect x="${x + w / 2 - 6}" y="${y + h - 3.5}" width="12" height="1.4" rx=".7" fill="#6a7178"/>`;
  const defs = `<defs><linearGradient id="p3a-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5058"/><stop offset="1" stop-color="#2a2e33"/></linearGradient></defs>`;
  let inner, extra;
  if (a.pos === "top") {
    const w = 88, h = 34, x = cx - w / 2, y = body.top - h + 1;
    const r = 9.6, step = w / Math.max(n, 4);
    const x0 = cx - (step * (n - 1)) / 2;
    inner = box(x, y, w, h, a.slots.map((s, i) => p3Spool(x0 + i * step, y + 14, r, s)).join(""));
    extra = `border-top:${Math.max(0, Math.ceil(-y))}px solid transparent;box-sizing:content-box;`;
  } else {
    const cols = n === 1 ? 1 : 2, rows = Math.ceil(n / cols), w = cols * 24 + 4, h = rows * 24 + 8, r = 10.6;
    const x = body.right + 6, y = body.bottom - h;
    const slots = a.slots.map((s, i) => p3Spool(x + 14 + (i % cols) * 24, y + 14 + Math.floor(i / cols) * 24, r, s)).join("");
    const sx = x + w / 2, cy = body.top - 24;
    const path = `M${sx} ${y - 2} C${sx} ${cy},${cx + 6} ${cy},${cx} ${body.top - 4}`;
    const fil = a.active ? `<path d="${path}" fill="none" stroke="${esc(a.active.color)}" stroke-width="1.2"/><path class="p3a-flow" d="${path}" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round"/>` : "";
    inner = `<path d="${path}" fill="none" stroke="#9aa3ab" stroke-width="3.2" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#e8ecef" stroke-width="2.4" stroke-linecap="round"/>${fil}<rect x="${cx - 3.5}" y="${body.top - 5}" width="7" height="5.5" rx="1.2" fill="#3a4046"/><rect x="${sx - 3}" y="${y - 3}" width="6" height="4" rx="1" fill="#3a4046"/>${box(x, y, w, h, slots)}`;
    extra = `border-right:${Math.ceil(x + w - 96)}px solid transparent;border-top:${Math.max(0, Math.ceil(20 - body.top))}px solid transparent;box-sizing:content-box;`;
  }
  return { style: extra, svg: `<svg class="p3a" viewBox="0 0 96 108">${defs}${inner}</svg>` };
}


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
    if (P3R_DRAW[p.style]) {
      const hr = Math.round(Math.max(0, Math.min(1, p.height || 0)) * P3R_MAX);
      const ams = p3AmsParts(p, P3_BODY[p.style]);
      return `
        <div class="machine ${cls} ${flags} p3-real p3-s-${p.style}" style="--p3-h:${h}px${ams.style ? `;${ams.style}` : ""}"><svg class="p3r" viewBox="0 -8 120 135">${P3R_DEFS}${P3R_DRAW[p.style](p, hr, ctx.display || "")}</svg>${ams.svg}</div>`;
    }
    const ams = p3AmsParts(p, P3_BODY[p.layout === "open" ? "classic_open" : "classic_enclosed"]);
    if (p.layout === "open") {
      return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px${ams.style ? `;${ams.style}` : ""}">
          <div class="p3-post l"></div>
          <div class="p3-post r"></div>
          <div class="p3-top"></div>
          <div class="p3-gantry">${head}</div>
          ${bed}
          <div class="p3-base">${lcd}<div class="p3-knob"></div></div>${ams.svg}
        </div>`;
    }
    return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px${ams.style ? `;${ams.style}` : ""}">
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
          <div class="p3-foot f2"></div>${ams.svg}
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
        svg.p3r, svg.p3a { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        svg.p3a { z-index: 3; }
        .p3r-part { fill: ${color}; }
        .p3r-glow { fill: #2a2d31; }
        .machine.bed-hot .p3r-glow { fill: #ff7043; }
        .p3r-nz { fill: #8a9096; }
        .machine.nozzle-hot .p3r-nz { fill: #ff7043; }
        .p3r-light { opacity: 0.3; }
        .machine.lit .p3r-light { opacity: 1; }
        .p3r-led { opacity: 0.35; }
        .machine.moving .p3r-led { opacity: 0.9; }
        .machine.moving .p3r-hd { animation: p3r-hd 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.moving .p3r-slide { transform-box: fill-box; transform-origin: 50% 100%; animation: p3r-slide 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.moving .p3r-fan { transform-box: fill-box; transform-origin: 50% 50%; animation: p3r-fan 0.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes p3r-hd { 0%, 100% { transform: translateX(-16px); } 50% { transform: translateX(16px); } }
        @keyframes p3r-slide { 0%, 100% { transform: scale(0.965); } 50% { transform: scale(1.03); } }
        @keyframes p3r-fan { to { transform: rotate(360deg); } }
        .p3a-on { fill: #2ecc71; }
        .p3a-turn { transform-box: fill-box; transform-origin: 50% 50%; }
        .machine.moving .p3a-turn { animation: p3r-fan 2.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .p3a-flow { stroke-dasharray: 2 10; }
        .machine.moving .p3a-flow { animation: p3a-flow 1.2s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes p3a-flow { to { stroke-dashoffset: -12; } }
        .p3a-h { fill: none; stroke: #ff6d00; stroke-width: 1.5; stroke-linecap: round; opacity: 0; animation: p3a-heat 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes p3a-heat { 0% { opacity: 0; transform: translateY(3px); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes p3-move { from { transform: translateX(-14px); } to { transform: translateX(14px); } }
        @keyframes p3-draw { 0% { opacity: 0; } 30% { opacity: 0.9; } 100% { opacity: 0; } }
        .machine.moving .p3-head { animation: p3-move 1.6s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .machine.moving.has-part .p3-part i { animation: p3-draw 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
      `,
};
}
