// What each drawing is filed under: the laundry types share one, as the new
// types drawn by ntHtml do. The released card loads each drawing, with its
// CSS, from a file of its own the first time a card shows it.
function drawKeyOf(type) {
  if (type === "dishwasher") return "dishwasher";
  if (LAUNDRY_TYPES.includes(type)) return "laundry";
  if (NT_TYPES.includes(type)) return "nt";
  return type;
}

function illustrationHtml(type, ctx) {
  const cls = [
    ctx.spinning ? "spinning" : "",
    ctx.heating ? "heating" : "",
    ctx.lit ? "lit" : "",
    ctx.doorOpen ? "open" : "",
    ctx.done ? "done" : "",
    ctx.paused ? "paused" : "",
    ctx.phase && DISHWASHER_PHASES.has(ctx.phase) ? `phase-${ctx.phase}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const draw = drawingOf(drawKeyOf(type));
  return draw ? draw(cls, ctx, type) : "";
}

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

const DRAWINGS = {

  dishwasher: (cls, ctx) => {
    return `
        <div class="machine ${cls}">
          <div class="dw-body">
            <div class="dw-controls"><div class="dw-screen"></div></div>
            <div class="dw-cavity">
              <div class="dw-dishes" aria-hidden="true">
                <span class="dw-plate dw-plate-a"></span>
                <span class="dw-plate dw-plate-b"></span>
                <span class="dw-plate dw-plate-c"></span>
                <span class="dw-plate dw-plate-d"></span>
              </div>
              <div class="dw-rack"></div>
              <div class="dw-spray" aria-hidden="true"><span class="dw-spray-hub"></span></div>
              <div class="dw-drops" aria-hidden="true">
                <i class="dw-drop dw-drop-a"></i><i class="dw-drop dw-drop-b"></i>
                <i class="dw-drop dw-drop-c"></i><i class="dw-drop dw-drop-d"></i>
                <i class="dw-drop dw-drop-e"></i>
              </div>
              <div class="dw-water" aria-hidden="true">
                <span class="dw-wave dw-wave-a"></span><span class="dw-wave dw-wave-b"></span>
              </div>
                          </div>
            <div class="dw-heat" aria-hidden="true">
              <i class="dw-heat-a"></i><i class="dw-heat-b"></i><i class="dw-heat-c"></i><i class="dw-heat-d"></i><i class="dw-heat-e"></i>
            </div>
            <div class="dw-door ${ctx.doorOpen ? "open" : ""}" aria-hidden="true"></div>
          </div>
        </div>`;
  },

  laundry: (cls, ctx, type) => {
    // A washer-dryer empties its drum before it dries, so while it dries it is
    // a dryer: clothes turning in a warm drum. A spin empties it too, and the
    // clothes show, whirling with no water.
    const flags = [ctx.spinning ? "spinning" : "", ctx.drying ? "drying" : "", ctx.spinCycle ? "spin-cycle" : "", ctx.doorOpen ? "open" : ""].filter(Boolean).join(" ");
    return `
        <div class="machine ${flags}">${laundrySvg(type, { screen: ctx.display || "", turning: !!ctx.spinning, drying: !!ctx.drying, spinCycle: !!ctx.spinCycle, open: !!ctx.doorOpen })}</div>`;
  },

  pet_feeder: (_cls, ctx) => {
    // Five families, all drawn in one picture: the square tower (default),
    // the round tank, the double with two bowls, the two hoppers over one
    // split bowl, and the wet-food feeder with its turning tray.
    const layout = ctx.feederLayout || "";
    // Two hoppers empty one at a time. An empty state that names no hopper
    // (a fault that says "no food") empties both.
    const sides = layout !== "dual_split" || !ctx.feederEmpty ? []
      : ctx.feederEmptyA || ctx.feederEmptyB ? [ctx.feederEmptyA ? "empty-a" : "", ctx.feederEmptyB ? "empty-b" : ""]
      : ["empty-a", "empty-b"];
    const emptyA = sides.includes("empty-a"), emptyB = sides.includes("empty-b");
    const empty = !!ctx.feederEmpty && layout !== "dual_split";
    const d = {
      screen: ctx.feederScreen || "",
      feeding: !!ctx.feeding,
      served: !empty,
      servedA: !emptyA,
      servedB: !emptyB,
      lvl: pfLvl(ctx.feederFill, empty || emptyA),
      lvlB: pfLvl(ctx.feederFillB, emptyB),
    };
    const cls = [layout, ctx.feeding ? "feeding" : "", ctx.feederEmpty ? "empty" : "", ...sides, ctx.feederAlert ? "alert" : ""].filter(Boolean).join(" ");
    return `
        <div class="machine ${cls}">${pfSvg(layout, d)}${ctx.feederAlert ? `
          <div class="pf-cat" aria-hidden="true">
            <u class="ear l"><span></span></u><u class="ear r"><span></span></u>
            <u class="tail"></u>
            <b class="body"><span class="paw l"></span><span class="paw r"></span></b>
            <b class="head">
              <i class="whisk l"></i><i class="whisk r"></i>
              <i class="muzzle"></i>
              <i class="eye l"><span></span></i><i class="eye r"><span></span></i>
              <i class="nose"></i><i class="mouth l"></i><i class="mouth r"></i>
            </b>
          </div>
          <div class="pf-alert" aria-hidden="true"><i class="bar"></i><i class="dot"></i></div>` : ""}
        </div>`;
  },

  oven: (cls, ctx) => {
    return `
        <div class="machine ${cls}">${ovenSvg({ screen: ctx.display || "", heating: !!ctx.heating, lit: !!ctx.lit, open: !!ctx.doorOpen, dish: ctx.dish || 0 })}</div>`;
  },

  microwave: (cls, ctx) => {
    return `
        <div class="machine ${cls}">${microwaveSvg({ screen: ctx.display || "", running: !!ctx.spinning, open: !!ctx.doorOpen, dish: ctx.dish || 0 })}</div>`;
  },

  hood: (cls, ctx) => {
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

  nt: (cls, ctx) => ntHtml(cls, ctx.ntDraw || {}),
  fridge: (cls, ctx) => {
    // A chest or a drawer freezer frosts over while it cools, like the other
    // new drawings (nt-on).
    const nt = ctx.coldBox ? ` nt nt-k-${ctx.layout}${ctx.cooling !== false && !ctx.dark ? " nt-on" : ""}` : "";
    return `<div class="machine ${cls} ${ctx.ice ? "ice" : ""}${nt}">${fridgeHtml(ctx)}</div>`;
  },

  water_heater: (cls, ctx) => {
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

  thermostat: (cls, ctx) => {
    const d = ctx.thermo || { mode: "off", room: "", target: "", layout: "square" };
    return `
        <div class="machine ${cls} th-l-${d.layout} th-m-${d.mode}">${thermostatSvg(d)}</div>`;
  },

  boiler: (cls, ctx) => {
    const mode = ctx.boilerMode || "idle";
    const layout = ctx.boilerLayout === "window" ? "window" : "wall";
    // A burner waiting its turn is out, like one on standby.
    const flame = mode !== "idle" && mode !== "waiting";
    const lcd = ctx.display ? `<div class="bl-lcd">${esc(ctx.display)}</div>` : "";
    const svg = ctx.boilerThermo ? boilerWithThermo(boilerSvg(layout), ctx.boilerThermo) : boilerSvg(layout);
    return `
        <div class="machine ${cls} bl-l-${layout} mode-${mode} ${flame ? "flame" : ""} ${ctx.boilerThermo ? "bl-th" : ""}">${svg}${lcd}</div>`;
  },

  air_conditioner: (cls, ctx) => {
    // The flap opens a step per vane position, and the air reaches further
    // the lower it points. At rest the flap is closed whatever the vane says.
    const a = ctx.ac || {};
    const mode = a.mode || "off";
    const blowing = !["off", "idle", "defrost", "preheat"].includes(mode);
    const v = Number.isInteger(a.vane) ? a.vane : 3;
    const h = Number.isInteger(a.hvane) ? a.hvane : 0;
    const style = `--ac-flap: ${blowing ? v : 0}; --ac-reach: ${[0.45, 0.6, 0.75, 0.88, 1][v - 1]}; `
      + `--ac-skew: ${h * 15}deg; --ac-speed: ${AC_FAN_SECONDS[a.speed] || AC_FAN_SECONDS.medium}s`;
    const icon = AC_ICONS[a.icon] ? `<svg viewBox="0 0 24 24"><path d="${AC_ICONS[a.icon]}"/></svg>` : "";
    const leds = ["", ...(a.leds || [])].map((l) => `<i${l ? ` class="${l}"` : ""}></i>`).join("");
    const acCls = [`mode-${mode}`, a.icon ? `icon-${a.icon}` : "", blowing && a.swingV ? "swing-v" : "", blowing && a.swingH ? "swing-h" : ""]
      .filter(Boolean).join(" ");
    return `
        <div class="machine ${cls} ${acCls}" style="${style}">
          <div class="ac-unit">
            <div class="ac-seam"></div>
            <div class="ac-leds">${leds}</div>
            <div class="ac-lcd">${icon}<span>${esc(a.screen || "")}</span></div>
            <div class="ac-mouth"><div class="ac-flap"></div></div>
          </div>
          <div class="ac-frost"></div>
          <svg class="ac-air" viewBox="0 0 96 52">
            <g class="ac-stream">
              <path d="M20 2 C17 16 14 28 10 42"/><path d="M36 2 C35 18 34 32 32 48"/>
              <path d="M60 2 C61 18 62 32 64 48"/><path d="M76 2 C79 16 82 28 86 42"/>
            </g>
            <circle class="ac-drop d1" cx="26" cy="2" r="1.8"/><circle class="ac-drop d2" cx="48" cy="2" r="1.8"/><circle class="ac-drop d3" cx="70" cy="2" r="1.8"/>
          </svg>
        </div>`;
  },

  pet_fountain: (cls, ctx) => {
    // Without a level the tank keeps a resting height rather than reading as
    // empty. No water comes up a pump that is off or that has run dry.
    const f = ctx.fountain || {};
    const fill = f.low ? 12 : f.fill === null || f.fill === undefined ? 55 : Math.max(0, Math.min(100, Math.round(f.fill)));
    const led = f.offline ? "" : f.low ? "led-low" : f.due ? "led-due" : f.flowing ? "led-on" : "";
    const running = f.flowing && !f.low;
    const svg = ftSvg({ round: !!f.round, lvl: fill / 100, running, dry: !!f.low, low: !!f.low && !f.offline, due: !!f.due && !f.low && !f.offline });
    return `
        <div class="machine ${cls} ${running ? "flowing" : ""} ${f.low ? "ft-dry" : ""}${f.offline ? " ft-offline" : ""} ${led}">${svg}
        </div>`;
  },

  dehumidifier: (cls, ctx) => {
    // The tank keeps a resting level when the card cannot know one, rather
    // than reading a dehumidifier with no tank entity as an empty one.
    const d = ctx.dh || {};
    const mode = d.mode || "off";
    const fill = mode === "full" ? 100 : d.fill === null || d.fill === undefined ? 35 : Math.round(d.fill);
    return `
        <div class="machine ${cls} mode-${mode}" style="--dh-fill: ${fill}%">
          ${airFlow("dh-air", 40, 24, true)}
          <div class="dh-body"></div>
          <div class="dh-grille"></div>
          ${miniLcd("dh-lcd", d.icon, d.screen)}
          <div class="dh-led"></div>
          <div class="dh-seam"></div>
          <div class="dh-grip"></div>
          <div class="dh-win"><div class="dh-water"></div><div class="dh-drip"><i></i><i></i></div></div>
          <div class="dh-foot f1"></div><div class="dh-foot f2"></div>
        </div>`;
  },

  space_heater: (cls, ctx) => {
    const h = ctx.heater || {};
    const mode = h.mode || "off";
    if (h.layout === "oil") {
      return `
        <div class="machine ${cls} oil mode-${mode}">
          ${airFlow("ho-air", 58, 28, false)}
          <div class="ho-fins"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="ho-box"></div>
          ${miniLcd("ho-lcd", h.icon, "")}
          <div class="ho-knob"></div>
          <div class="ho-base"></div><div class="ho-wheel w1"></div><div class="ho-wheel w2"></div>
        </div>`;
    }
    return `
        <div class="machine ${cls} mode-${mode}">
          ${airFlow("hf-air", 42, 30, mode === "fan")}
          <div class="hf-body"></div>
          <div class="hf-handle"></div>
          ${miniLcd("hf-lcd", h.icon, h.screen)}
          <div class="hf-grill"><div class="hf-glow"></div><svg class="hf-fan" viewBox="0 0 24 24"><path d="${AC_ICONS.fan}"/></svg></div>
          <div class="hf-foot f1"></div><div class="hf-foot f2"></div>
        </div>`;
  },

  towel_warmer: (cls, ctx) => {
    const w = ctx.towel || {};
    const layout = w.layout === "panel" ? "panel" : "ladder";
    return `
        <div class="machine ${cls} tw-l-${layout} mode-${w.mode || "off"}">
          ${airFlow("tw-air", 52, 14, false)}
          ${towelSvg(layout)}
          ${airFlow("tw-steam", 30, 22, false)}
          ${miniLcd("tw-lcd", w.icon, w.screen)}
        </div>`;
  },

  air_fryer: (cls, ctx) => {
    const f = ctx.fryer || {};
    const mode = f.mode || "off";
    const layout = f.layout || "basket";
    const z1 = fryerZoneOf(mode);
    const z2 = fryerZoneOf(f.mode2 || mode);
    // A dual fryer is on as long as one of its baskets is.
    const shown = layout === "dual" && mode === "off" ? f.mode2 || "off" : mode;
    const drawer = (n, inner) => `<div class="af-gap g${n}"></div>`
      + `<div class="af-drawer d${n}">${inner}<div class="af-handle"><div class="af-btn"></div></div></div>`;
    const top = `<div class="af-body"></div><div class="af-vent"></div>${miniLcd("af-lcd", f.icon, f.screen)}`;
    const feet = `<div class="af-foot f1"></div><div class="af-foot f2"></div>`;
    if (layout === "dual") {
      return `
        <div class="machine ${cls} af-dual mode-${shown} z1-${z1} z2-${z2}">
          ${airFlow("af-air a1", 34, 22, false)}${airFlow("af-air a2", 34, 22, false)}
          ${top}<div class="af-vent v2"></div>
          <div class="af-led l1"></div><div class="af-led l2"></div>
          <div class="af-seam s1"></div><div class="af-seam s2"></div>
          ${drawer(1, `<div class="af-zn">1</div>`)}${drawer(2, `<div class="af-zn">2</div>`)}
          <div class="af-div"></div>${feet}
        </div>`;
    }
    const win = layout === "window"
      ? `<div class="af-win"><div class="af-glow"></div><div class="af-coil"></div><div class="af-fries"><i></i><i></i><i></i><i></i><i></i></div></div>`
      : "";
    return `
        <div class="machine ${cls} af-${layout} mode-${mode} z1-${z1}">
          ${airFlow("af-air a1", 40, 22, false)}
          ${top}<div class="af-led l1"></div><div class="af-seam s1"></div>
          ${drawer(1, win)}${feet}
        </div>`;
  },

  ev_charger: (cls, ctx) => {
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

  pellet_stove: (cls, ctx) => {
    // The hopper keeps a resting level when the card cannot know one, rather
    // than reading a stove with no level entity as an empty one.
    const s = ctx.stove || {};
    const fill = s.fill === null || s.fill === undefined ? 60 : Math.round(s.fill);
    const lcd = ctx.display ? esc(ctx.display) : "";
    return `
        <div class="machine ${cls} mode-${s.mode || "off"} ${s.empty ? "empty" : ""}" style="--ps-fill: ${fill}%">
          <div class="ps-smoke"><i></i><i></i></div>
          <div class="ps-air"><i class="a1"></i><i class="a2"></i><i class="a3"></i></div>
          <div class="ps-pipe"></div>
          <div class="ps-body"></div>
          <div class="ps-lid"></div>
          <div class="ps-lcd">${lcd}</div>
          <div class="ps-grille"></div>
          <div class="ps-door"><div class="ps-glass">
            <div class="ps-glow"></div><div class="ps-flame"></div><div class="ps-spark"></div>
            <div class="ps-ash"><i></i><i></i><i></i></div>
            <div class="ps-pot"></div><div class="ps-shine"></div>
          </div></div>
          <div class="ps-handle"></div>
          <div class="ps-hopper"><div class="ps-pellets"></div></div>
          <div class="ps-foot f1"></div><div class="ps-foot f2"></div>
        </div>`;
  },

  heat_pump: (cls, ctx) => {
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

  printer_3d: (cls, ctx) => {
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

  toaster: (cls, ctx) => toasterHtml(cls, ctx.toaster || {}),
  hair_dryer: (cls, ctx) => hairDryerHtml(cls, ctx.hairDryer || {}),
  network: (cls, ctx) => networkHtml(cls, ctx.network || {}),
  robot: (cls, ctx) => robotHtml(cls, ctx.robot || {}),
  pool_pump: (cls, ctx) => poolHtml(cls, ctx.pool || {}),
  solar: (cls, ctx) => solarHtml(cls, ctx.solar || {}),
  home_battery: (cls, ctx) => batteryHtml(cls, ctx.battery || {}),
  scale: (cls, ctx) => scaleHtml(cls, ctx.scale || {}),
  ups: (cls, ctx) => upsHtml(cls, ctx.ups || { segs: 0 }),
  camera: (cls, ctx) => cameraHtml(cls, ctx.camera || {}),
  lamp: (cls, ctx) => lampHtml(cls, ctx.lampDraw || {}),
  mailbox: (cls, ctx) => mailboxHtml(cls, ctx.mailbox || {}),
  diffuser: (cls, ctx) => diffuserHtml(cls, ctx.diffuser || {}),
  hrv: (cls, ctx) => hrvHtml(cls, ctx.hrv || {}),
  screen: (cls, ctx) => screenHtml(cls, ctx.screen || {}),
  air_purifier: (cls, ctx) => purifierHtml(cls, ctx.purifier || {}),
  fan: (cls, ctx) => fanHtml(cls, ctx.fan || {}),

  iron: (cls, ctx) => {
    const ir = ctx.iron || { mode: ctx.heating ? "heating" : "off", level: 3 };
    const d = { heating: ir.mode === "heating", ready: ir.mode === "ready", level: ir.level || 3, leftOn: !!ctx.leftOn, line: ctx.ironLine };
    return `
        <div class="machine ${cls} ${ctx.ironLayout} ${ctx.leftOn ? "left-on" : ""} ${d.ready ? "ready" : ""}">${ctx.ironLayout === "generator" ? generatorSvg(d) : ironSvg(d)}</div>`;
  },


  kettle: (cls, ctx) => {
    // No timer and no progress: the drawing is the whole readout.
    const layout = ctx.kettleLayout === "steel" ? "steel" : "classic";
    const lcd = ctx.display ? `<div class="kt-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls} kt-${layout} ${ctx.spinning ? "on" : ""}">
          ${kettleSvg(layout)}${lcd}
        </div>`;
  },

  cooker: (cls, ctx) => {
    const sp = ctx.speed || 0;
    return `
        <div class="machine ${cls} ${sp > 0 ? "mixing" : ""} s${sp}">${cookerSvg()}${ctx.display ? `<div class="rc-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },

  coffee: (cls, ctx) => {
    const layout = ctx.coffeeLayout === "black" ? "black" : "silver";
    const flags = [
      `cf-l-${layout}`,
      ctx.spinning ? "pouring" : "",
      ctx.noWater ? "no-water" : "",
      ctx.noBeans ? "no-beans" : "",
      ctx.trayFull ? "tray-full" : "",
      ctx.cups >= 2 ? "two-cups" : "",
      `st${ctx.strength || 3}`,
    ].filter(Boolean).join(" ");
    return `
        <div class="machine ${cls} ${flags}">${coffeeSvg(layout, ctx.cups >= 2, ctx.waterPct)}${ctx.display ? `<div class="cf-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },

  rice_cooker: (cls, ctx) => {
    return `
        <div class="machine ${cls} ${ctx.keepWarm ? "warm" : ""}">${riceSvg()}${ctx.display ? `<div class="rk-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },

  cooktop: (cls, ctx) => {
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
};

// @draw-access-begin
// In the source every drawing is at hand. The release replaces these with a
// loader that fetches a drawing's file the first time it is asked for, and
// with the list of drawings written out.
const DRAW_KEYS = Object.keys(DRAWINGS);
function drawingOf(key) {
  return DRAWINGS[key];
}
function drawCssOf(key) {
  return ILLUSTRATION_CSS[key];
}
// @draw-access-end

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

// What makes a card complete without a state entity: a fridge's probe, a
// feeder's control, a charger's plug, and so on. The editor asks for a state
// entity only when nothing else will do (#55).
function stateFreeSource(config) {
  // Every type but the fridge is defined by a state entity. A fridge has no
  // state to report: a temperature probe and a door contact on an ordinary
  // fridge are a complete configuration, and demanding a state entity would
  // only push people to point it at something meaningless.
  const fridgeOnly = config && FRIDGE_ONLY_FIELDS.some((f) => config[f]);
  const asFridge = config && (config.appliance_type === "fridge" || fridgeOnly);
  const hasFridgeSource = fridgeOnly ||
    (asFridge && !!(config.door_entity || config.power_entity));
  // Same for a pet feeder, and for the same reason: most of them report
  // nothing while they wait. A control to serve with, or a counter of what
  // was served, is a complete configuration.
  const feederOnly = config && FEEDER_ONLY_FIELDS.some((f) => config[f]);
  const asFeeder = config && (config.appliance_type === "pet_feeder" || feederOnly);
  const hasFeederSource = feederOnly || (asFeeder && !!config.start_entity);
  // And for a charger with no status to read: the plug says whether a car
  // is there, the power meter whether it charges.
  const asCharger = config && (config.appliance_type === "ev_charger" || EV_ONLY_FIELDS.some((f) => config[f]));
  const hasChargerSource = asCharger && !!(config.vehicle_entity || config.power_entity);
  // And for a screen: its plug's meter or one of its players is enough.
  const asScreen = config && (config.appliance_type === "screen" || SCREEN_ONLY_FIELDS.some((f) => config[f]));
  const hasScreenSource = asScreen && !!(config.power_entity || SCREEN_MEDIA_FIELDS.some((f) => config[f]));
  // And for a pool pump on a smart plug: the meter says whether it filters.
  const asPool = config && (config.appliance_type === "pool_pump" || POOL_ONLY_FIELDS.some((f) => config[f]));
  const hasPoolSource = asPool && !!config.power_entity;
  // And for panels, whose power is all there is to read, and a battery,
  // read from its level or its power.
  const asSolar = config && (config.appliance_type === "solar" || SOLAR_ONLY_FIELDS.some((f) => config[f]));
  const hasSolarSource = asSolar && !!config.power_entity;
  const asBattery = config && (config.appliance_type === "home_battery" || BATTERY_ONLY_FIELDS.some((f) => config[f]));
  const hasBatterySource = asBattery && !!(config.battery_entity || config.power_entity || config.charge_power_entity || config.discharge_power_entity);
  // And for a UPS: its input voltage says whether the mains is there.
  const asUps = config && (config.appliance_type === "ups" || UPS_ONLY_FIELDS.some((f) => config[f]));
  const hasUpsSource = asUps && !!(config.input_voltage_entity || config.battery_entity);
  // And for a pump, a heater, a tree on a smart plug: the meter says it runs.
  const hasNtSource = !!config && NT_TYPES.includes(config.appliance_type) && config.appliance_type !== "meter" && !!config.power_entity;
  return !!(hasFridgeSource || hasFeederSource || hasChargerSource || hasScreenSource || hasPoolSource
    || hasSolarSource || hasBatterySource || hasUpsSource || hasNtSource);
}

