// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The mailbox drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
const MB_DEFS = `<defs>
<linearGradient id="mb-g-shv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="mb-g-sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".55" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="mb-g-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a89f92"/><stop offset=".5" stop-color="#cbc3b6"/><stop offset="1" stop-color="#9c9386"/></linearGradient>
<linearGradient id="mb-g-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4249"/><stop offset="1" stop-color="#5b646d"/></linearGradient>
<linearGradient id="mb-g-day" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></linearGradient>
<linearGradient id="mb-g-dayl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></linearGradient>
<linearGradient id="mb-g-dayt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></linearGradient>
<clipPath id="mb-clip-slot"><rect x="0" y="-8" width="120" height="40"/></clipPath>
</defs>`;
const MB_EDGE = 'stroke="rgba(0,0,0,.28)"';
const MB_BODY = "url(#mb-g-shv)";
const MB_ROT = [-3, 2, -1, 4, -2, 1, 3, -4, 2, -1, 0, 3];
const MB_JIT = [0, 2, -1, 1, -2, 0, 2, 1, -1, 0, -2, 1];
const mbEnvelope = (x, y, r, w = 22, h = 9) => `<g transform="rotate(${r} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="#fff" stroke="#c7ccd2" stroke-width=".5"/><path d="M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}" fill="none" stroke="#c7ccd2" stroke-width=".6"/></g>`;
// The pile, three letters a layer. The one just received starts at the slot
// (sx, sy) and travels to its place.
function mbLetters(n, x0, step, floor, newIdx, sx, sy) {
  let out = "";
  for (let i = 0; i < Math.min(n, MAILBOX_MAX_LETTERS); i++) {
    const x = x0 + (i % 3) * step + MB_JIT[i], y = floor - 10 - Math.floor(i / 3) * 6.5 + (i % 2);
    out += `<g class="mb-letter${i + 1 === newIdx ? " mb-new" : ""}" style="--dx:${sx - x}px;--dy:${sy - y}px">${mbEnvelope(x, y, MB_ROT[i])}</g>`;
  }
  return out;
}
const mbBadge = (n) => {
  const txt = n === null || n === undefined ? "" : String(n);
  const w = txt ? (txt.length > 1 ? 30 : 25) : 17;
  return `<g class="mb-badge"><rect x="4" y="6" width="${w}" height="12" rx="6" fill="#ffa000"/><rect x="8" y="9" width="9" height="6" rx="1" fill="#fff"/><path d="M8 9 l4.5 3 l4.5 -3" fill="none" stroke="#ffa000" stroke-width=".9"/>${txt ? `<text x="19.5" y="15.4" font-size="8" font-family="Arial, sans-serif" font-weight="700" fill="#fff">${txt}</text>` : ""}</g>`;
};
// More than twelve: some no longer fit, and end up on the ground.
const mbSpill = (spots) => `<g>${spots.map(([x, y, r]) => `<g class="mb-spill">${mbEnvelope(x, y, r)}</g>`).join("")}</g>`;
function mbThrough3d(c) {
  const id = (n) => `mb3-${n}`;
  const P = MB3_PAL[c.color] || MB3_PAL.anthracite;
  const [hi, face, side, edge] = P;
  const light = c.color === "white" || c.color === "grey";
  const ink = light ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.55)";
  const sheen = light ? ".7" : ".22";
  const dx = 30, dy = -13;
  const F = { x0: 14, x1: 62, y0: 48, y1: 100 };
  const pt = (u, v, w) => [F.x0 + u + dx * w, F.y0 + v + dy * w]; // u across, v down, w depth 0..1
  const pp = (...ps) => ps.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L");
  const W = F.x1 - F.x0, H = F.y1 - F.y0;
  // Letters on the floor, three a row, stacked when there are many.
  // The letters lie flat on the floor, in two piles near the door, each
  // envelope seen in the same perspective as the box, the pile rising.
  const env = (u, w, lift, r) => {
    const k = .34, ew = 17;
    const [x, y] = pt(u, H - lift, w);
    const a = [x, y], b = [x + ew, y], cc = [x + ew + dx * k, y + dy * k], d = [x + dx * k, y + dy * k];
    const m = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
    const tip = m(m(a, b, .5), m(d, cc, .5), .55);
    return `<g class="mb-letter" transform="rotate(${r} ${x + ew / 2} ${y - 2})"><path d="M${pp(a, b, cc, d)} Z" fill="#fff" stroke="#b9c0c6" stroke-width=".35"/><path d="M${pp(d, tip, cc)}" fill="none" stroke="#c7ccd2" stroke-width=".4"/><path d="M${pp(a, b)}" stroke="#d5dade" stroke-width=".9"/></g>`;
  };
  const letters = Array.from({ length: Math.min(12, c.drawn || 0) }, (_, i) => {
    const pile = i % 2, layer = Math.floor(i / 2);
    return env(4 + pile * 22 + [0, 1, -1, 2, -2, 1][layer], .1 + pile * .08, 1.2 + layer * 1.5, [-4, 5, 3, -6, -2, 4, 6, -3, 2, -5, -1, 3][i]);
  }).join("");
  // The street door's face: the flap under its lip, the lock, the plate.
  const doorFace = (tr) => `<g transform="${tr}">
<rect x="0" y="0" width="${W}" height="${H}" rx="1.4" fill="url(#${id("fd")})" stroke="${ink}" stroke-width=".5"/>
<path d="M1.2 1.2 H${W - 1.2}" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".7"/>
<rect x="${W * .2}" y="${H * .08}" width="${W * .68}" height="${H * .19}" rx="1" fill="url(#${id("fl")})" stroke="${ink}" stroke-width=".45"/>
<path d="M${W * .21} ${H * .265} H${W * .48} Q${W * .54} ${H * .23} ${W * .6} ${H * .265} H${W * .87}" fill="none" stroke="${ink}" stroke-width=".55"/>
<path d="M${W * .21} ${H * .095} H${W * .87}" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".7"/>
<circle cx="${W * .1}" cy="${H * .175}" r="2" fill="url(#${id("lk")})" stroke="#6d757d" stroke-width=".35"/><rect x="${W * .1 - .35}" y="${H * .175 - 1.1}" width=".7" height="2.2" rx=".3" fill="#4a5158"/>
<rect x="${W * .55}" y="${H * .46}" width="${W * .3}" height="${H * .09}" rx=".4" fill="#f4f6f7" stroke="#aeb5bb" stroke-width=".35"/><path d="M${W * .58} ${H * .49} H${W * .82} M${W * .58} ${H * .52} H${W * .74}" stroke="#c7ccd2" stroke-width=".4"/>
<ellipse cx="${W * .5}" cy="${H - 5}" rx="2" ry="1.1" fill="none" stroke="${ink}" stroke-width=".35"/>
</g>`;
  // The front opening's inside: the left wall, the floor, the back wall.
  const inside = `<g clip-path="url(#${id("op")})">
<rect x="${F.x0}" y="${F.y0}" width="${W}" height="${H}" fill="#1b1f23"/>
<path d="M${pp(pt(0, 0, 1), pt(W, 0, 1), pt(W, H, 1), pt(0, H, 1))} Z" fill="${c.back ? "url(#" + id("day") + ")" : "#30363c"}"/>
<path d="M${pp(pt(0, 0, 0), pt(0, 0, 1), pt(0, H, 1), pt(0, H, 0))} Z" fill="url(#${id("iw")})"/>
<path d="M${pp(pt(0, H, 0), pt(W, H, 0), pt(W, H, 1), pt(0, H, 1))} Z" fill="url(#${id("if")})"/>
<path d="M${pp(pt(0, 0, 1), pt(0, H, 1), pt(W, H, 1))}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width=".5"/>
${letters}
<path d="M${pp(pt(0, 0, 0), pt(W, 0, 0), pt(W, H, 0))}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1.6"/></g>`;
  // The street door, shut or open on its left hinge.
  const th = 55 * Math.PI / 180, du = [dx, dy].map((v) => v / Math.hypot(dx, dy));
  const ex = W * (Math.cos(th) - du[0] * Math.sin(th)), ey = -W * du[1] * Math.sin(th);
  const frontDoor = c.front
    ? `<g class="mb-swing hl">${doorFace(`matrix(${(ex / W).toFixed(3)} ${(ey / W).toFixed(3)} 0 1 ${F.x0} ${F.y0})`)}</g>`
    : doorFace(`translate(${F.x0} ${F.y0})`);
  // The house door at the back, opening outwards to the right.
  const th2 = 65 * Math.PI / 180;
  const bx = F.x1 + dx, by = F.y0 + dy;
  const rx = -W * Math.cos(th2) + W * du[0] * Math.sin(th2), ry = W * du[1] * Math.sin(th2);
  const backDoor = c.back
    ? `<g class="mb-swing hr"><path d="M${bx} ${by} L${(bx + rx).toFixed(1)} ${(by + ry).toFixed(1)} L${(bx + rx).toFixed(1)} ${(by + ry + H).toFixed(1)} L${bx} ${by + H} Z" fill="url(#${id("bd")})" stroke="${ink}" stroke-width=".5"/>
<circle cx="${(bx + rx * .82).toFixed(1)}" cy="${(by + ry * .82 + H * .4).toFixed(1)}" r="1.6" fill="url(#${id("lk")})" stroke="#6d757d" stroke-width=".35"/></g>`
    : `<path d="M${bx - .2} ${by + 3} V${by + H - 3}" stroke="${ink}" stroke-width=".6"/><circle cx="${bx - 1.6}" cy="${by + H * .42}" r="1.1" fill="url(#${id("lk")})"/>`;
  const jam = c.over ? `<g transform="translate(${F.x0 + W * .42} ${F.y0 + H * .33}) rotate(-7)"><rect x="0" y="-6" width="12" height="7.5" rx=".6" fill="#fff" stroke="#c7ccd2" stroke-width=".4"/><path d="M0 -6 L6 -2.2 L12 -6" fill="none" stroke="#c7ccd2" stroke-width=".45"/></g>` : "";
  return `<defs>
<linearGradient id="${id("fd")}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset=".55" stop-color="${face}"/><stop offset="1" stop-color="${side}"/></linearGradient>
<linearGradient id="${id("fl")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${face}"/></linearGradient>
<linearGradient id="${id("sd")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${side}"/><stop offset="1" stop-color="${edge}"/></linearGradient>
<linearGradient id="${id("tp")}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${face}"/></linearGradient>
<linearGradient id="${id("bd")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${side}"/><stop offset="1" stop-color="${hi}"/></linearGradient>
<radialGradient id="${id("lk")}" cx=".35" cy=".35"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#8f979e"/></radialGradient>
<linearGradient id="${id("day")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#e6dcb8"/></linearGradient>
<linearGradient id="${id("iw")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a636c"/><stop offset="1" stop-color="#2c3238"/></linearGradient>
<linearGradient id="${id("if")}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6c757e"/><stop offset="1" stop-color="#3b4249"/></linearGradient>
<clipPath id="${id("op")}"><rect x="${F.x0}" y="${F.y0}" width="${W}" height="${H}"/></clipPath>
<clipPath id="${id("sl")}"><rect x="0" y="-10" width="120" height="${F.y0 + 10 + H * .08}"/></clipPath>
</defs>
<ellipse cx="${F.x0 + W / 2 + dx / 2}" cy="${F.y1 + 3 + dy / 2}" rx="${W / 2 + 20}" ry="5" fill="#000" opacity=".14"/>
<path d="M${pp(pt(W, 0, 0), pt(W, 0, 1), pt(W, H, 1), pt(W, H, 0))} Z" fill="url(#${id("sd")})" stroke="${ink}" stroke-width=".5"/>
<path d="M${pp(pt(0, 0, 0), pt(0, 0, 1), pt(W, 0, 1), pt(W, 0, 0))} Z" fill="url(#${id("tp")})" stroke="${ink}" stroke-width=".5"/>
<path d="M${pp(pt(W - .8, 1, 0), pt(W - .8, 1, 1))}" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".5"/>
<path d="M${pp(pt(.8, .5, .03), pt(W - 1, .5, .03), pt(W - 1, .5, .97))}" fill="none" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".5"/>
${backDoor}
${c.front ? inside : ""}
${c.front ? `<rect x="${F.x0 + .4}" y="${F.y0 + .4}" width="${W - .8}" height="${H - .8}" fill="none" stroke="${side}" stroke-width=".9"/>` : ""}
${frontDoor}
<g clip-path="url(#${id("sl")})"><g class="mb-post"><g transform="translate(${F.x0 + W * .4} ${F.y0 - 6})"><rect x="0" y="0" width="14" height="10" rx=".6" fill="#fff" stroke="#c7ccd2" stroke-width=".4"/><path d="M0 0 L7 5 L14 0" fill="none" stroke="#c7ccd2" stroke-width=".45"/></g></g></g>
${jam}
<text x="${F.x0 + W / 2}" y="118" font-size="7" font-family="Arial, sans-serif" text-anchor="middle" class="mb-lbl">${esc(c.street || "")}</text>
<text x="${F.x1 + dx - 2}" y="${F.y1 + dy + 14}" font-size="7" font-family="Arial, sans-serif" text-anchor="middle" class="mb-lbl">${esc(c.house || "")}</text>`;
}
const MB_SVGS = {
  // Drawn a size up: the box alone leaves room around it.
  through_3d: (c) => `<g transform="translate(-3 -10) scale(1.1)">${mbThrough3d(c)}</g>`,
  // Through a pillar, seen from the side: the street door on the left, the
  // house door on the right. A door hinged on a vertical edge shows its face
  // as it opens.
  through: (c) => {
    const front = c.front
      ? `<g class="mb-swing hl"><path d="M24 34 L7 38.5 V77.5 L24 82 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".6"/><path d="M10 43 V73" stroke="#fff" stroke-width="1.1" opacity=".5"/><path d="M21.4 40.2 L8.6 43.6 V47.6 L21.4 44.2 Z" style="fill:var(--ac-body-lo,#c9d0d7)" ${MB_EDGE} stroke-width=".4"/><path d="M20.6 41.1 L9.4 44.1 V46.5 L20.6 43.5 Z" fill="#151a20"/><path d="M20.6 41.1 L9.4 44.1 V45.6 L20.6 42.6 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".3"/><path d="M20.2 41.5 L9.8 44.3" stroke="#fff" stroke-width=".4" opacity=".6"/><circle cx="10.6" cy="61" r="1.3" fill="#7b8590"/><rect x="10.25" y="61" width=".7" height="2.2" fill="#7b8590"/></g>`
      : `<rect x="22" y="34" width="5" height="48" rx="1" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/><rect x="20.4" y="44" width="1.8" height="10" rx=".9" fill="#7b8590"/><path d="M22 36.4 L16.6 37.8 V40 H22 Z" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".5"/><rect x="16.6" y="40" width="5.4" height="1.2" fill="#151a20"/>`;
    const back = c.back
      ? `<g class="mb-swing hr"><path d="M96 34 L113 38.5 V77.5 L96 82 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".6"/><circle cx="109" cy="58" r="1.5" fill="#7b8590"/><rect x="108.6" y="58" width=".8" height="2.4" fill="#7b8590"/></g>`
      : `<rect x="93" y="34" width="5" height="48" rx="1" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/><circle cx="99" cy="58" r="1.6" fill="#7b8590"/><rect x="98.6" y="58" width=".8" height="2.6" fill="#7b8590"/>`;
    const box = `<ellipse cx="60" cy="124" rx="44" ry="3" fill="#000" opacity=".12"/>
<rect x="46" y="-8" width="28" height="134" fill="url(#mb-g-stone)"/>
<path d="M46 6 H74 M46 22 H74 M46 96 H74 M46 112 H74 M60 -8 V6 M54 6 V22 M66 22 V34 M58 82 V96 M64 96 V112 M56 112 V126" stroke="#8d8477" stroke-width=".6" opacity=".7"/>
<rect x="26" y="34" width="68" height="48" rx="2" fill="url(#mb-g-in)"/>
<rect class="mb-light" x="60" y="36" width="33" height="44" fill="url(#mb-g-day)"/>
<rect class="mb-light-f" x="27" y="36" width="33" height="44" fill="url(#mb-g-dayl)"/>
<rect x="46" y="34" width="28" height="48" fill="#000" opacity=".18"/>
${mbLetters(c.drawn, 28, 21, 81, c.newIdx, -6, 36)}
<rect x="24" y="30" width="72" height="5" rx="1.5" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/>
<rect x="24" y="81" width="72" height="4" rx="1" style="fill:var(--ac-body-lo,#c9d0d7)" ${MB_EDGE} stroke-width=".5"/>
${front}${back}
${c.over ? `<g class="mb-jam">${mbEnvelope(6, 33, -12, 20, 8)}</g>${mbSpill([[2, 113, -8], [16, 116, 6], [30, 112, -3]])}` : ""}`;
    const right = c.side === "right";
    const lbl = (x, text) => `<text x="${x}" y="100" font-size="7" font-family="Arial, sans-serif" class="mb-lbl" text-anchor="middle">${esc(text || "")}</text>`;
    return `${right ? `<g transform="translate(120 0) scale(-1 1)">${box}</g>` : box}
${lbl(34, right ? c.house : c.street)}${lbl(86, right ? c.street : c.house)}`;
  },
  // A box on a post, seen from the front: a slot under a visor, a window, a
  // name plate and a lock on its door.
  classic: (c) => {
    const door = c.front
      ? `<g class="mb-swing hl"><path d="M30 40 L12 45 V89 L30 94 Z" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/><path d="M15 50 V84" stroke="#fff" stroke-width="1.2" opacity=".5"/></g>`
      : `<rect x="30" y="40" width="60" height="54" rx="3" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".6"/>
<rect x="40" y="46" width="40" height="10" rx="2" fill="#151a20"/>
<g class="mb-glass">${c.drawn > 0 ? '<rect x="43" y="50" width="16" height="6" fill="#fff"/>' : ""}${c.drawn > 4 ? '<rect x="57" y="49" width="18" height="7" fill="#f4f1e8"/>' : ""}${c.drawn > 8 ? '<rect x="50" y="47" width="14" height="9" fill="#fff" transform="rotate(-6 57 51)"/>' : ""}</g>
<path d="M41 47.5 H58" stroke="#fff" stroke-width=".8" opacity=".3"/>
<rect x="44" y="62" width="32" height="8" rx="1" fill="#c8a24e"/><path d="M48 66 H72" stroke="#8a6d2a" stroke-width=".8"/>
<circle cx="82" cy="80" r="2.2" fill="#7b8590"/><rect x="81.4" y="80" width="1.2" height="3.4" fill="#7b8590"/>`;
    return `<ellipse cx="60" cy="124" rx="22" ry="2.6" fill="#000" opacity=".14"/>
<rect x="55" y="98" width="10" height="27" fill="#8f979f"/><rect x="55" y="98" width="3" height="27" fill="#fff" opacity=".25"/>
<rect x="24" y="18" width="72" height="82" rx="5" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".7"/>
<rect x="30" y="40" width="60" height="54" rx="3" fill="url(#mb-g-in)"/>
${mbLetters(c.drawn, 31, 19, 94, 0, 0, 0)}
<rect class="mb-light-f" x="30" y="40" width="60" height="36" fill="url(#mb-g-dayt)"/>
${door}
<rect x="20" y="12" width="80" height="9" rx="3" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".7"/><path d="M24 14 H96" stroke="#fff" stroke-width="1.4" opacity=".7"/>
<rect x="36" y="29.6" width="48" height="3.4" rx="1" fill="#151a20"/>
<g clip-path="url(#mb-clip-slot)"><g class="mb-post"><rect x="47" y="21" width="26" height="10" rx="1" fill="#fff" stroke="#c7ccd2" stroke-width=".5"/><path d="M47 21 L60 27 L73 21" fill="none" stroke="#c7ccd2" stroke-width=".6"/></g></g>
<path d="M34 30 L36.4 24.6 H83.6 L86 30 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".5"/><path d="M37 25.6 H83" stroke="#fff" stroke-width=".8" opacity=".6"/>
${c.over ? `<g class="mb-jam">${mbEnvelope(40, 18, -14, 18, 10)}${mbEnvelope(54, 16, 4, 18, 11)}${mbEnvelope(66, 19, 16, 17, 9)}</g>${mbSpill([[22, 114, -6], [72, 116, 8], [86, 112, -4]])}` : ""}`;
  },
};
function mailboxHtml(cls, c) {
  const layout = MAILBOX_LAYOUTS.includes(c.layout) ? c.layout : "classic";
  const flags = ["mb", `mb-l-${layout}`, `mb-m-${c.mode || "unav"}`, c.present ? "mb-mail" : "", c.front ? "mb-front" : "", c.back ? "mb-back" : "",
    c.arrive !== null && c.arrive !== undefined ? "mb-arrive" : "", c.swingF ? "mb-swing-f" : "", c.swingB ? "mb-swing-b" : ""].filter(Boolean).join(" ");
  // A redraw while a letter is on its way resumes it where it was.
  const ago = c.arrive ? `--mb-ago:${(-c.arrive / 1000).toFixed(2)}s` : "";
  return `
        <div class="machine ${cls} ${flags}" style="${ago}"><svg class="mb-svg" viewBox="0 -8 120 135">${MB_DEFS}${MB_SVGS[layout](c)}${c.present ? mbBadge(c.count) : ""}</svg></div>`;
}


return {
draw: (cls, ctx) => mailboxHtml(cls, ctx.mailbox || {}),
css: () => `
        svg.mb-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:hidden}
        .mb-lbl{fill:var(--secondary-text-color,#8a929b)}
        .mb-light,.mb-light-f{opacity:0;transition:opacity .4s}
        .mb-back .mb-light,.mb-front .mb-light-f{opacity:.85}
        .mb-badge{transform-box:fill-box;transform-origin:center}
        .mb-post{opacity:0}
        .mb-swing{transform-box:fill-box}
        .mb-swing.hl{transform-origin:right center}
        .mb-swing.hr{transform-origin:left center}
        .mb-swing-f .mb-swing.hl,.mb-swing-b .mb-swing.hr{animation:mb-swing .5s ease-out both}
        .mb-arrive .mb-new{animation:mb-in 1.5s ease-in-out both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-post{animation:mb-post 1.1s ease-in both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-glass{animation:mb-fade .4s both;animation-delay:calc(var(--mb-ago,0s) + 1s)}
        .mb-arrive .mb-badge{animation:mb-pop .45s both;animation-delay:calc(var(--mb-ago,0s) + 1.3s)}
        .mb-arrive .mb-jam{animation:mb-fade .3s both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-spill{animation:mb-spill .7s cubic-bezier(.5,0,1,.5) both;animation-delay:var(--mb-ago,0s)}
        .mb-arrive .mb-spill:nth-child(2){animation-delay:calc(var(--mb-ago,0s) + .15s)}
        .mb-arrive .mb-spill:nth-child(3){animation-delay:calc(var(--mb-ago,0s) + .3s)}
        .machine.mb-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes mb-swing { from { transform: scaleX(.12); } to { transform: none; } }
        @keyframes mb-in { 0% { transform: translate(var(--dx), var(--dy)); opacity: 0; } 8% { opacity: 1; } 55% { transform: translate(0px, var(--dy)); animation-timing-function: cubic-bezier(.55,0,1,.45); } 86% { transform: translate(0px, 0px); } 93% { transform: translate(0px, -1.6px); } 100% { transform: none; } }
        @keyframes mb-post { 0% { transform: translateY(-22px); opacity: 0; } 25% { opacity: 1; } 55% { transform: translateY(0px); } 100% { transform: translateY(13px); opacity: 1; } }
        @keyframes mb-spill { 0% { transform: translateY(-34px); opacity: 0; } 20% { opacity: 1; } 85% { transform: translateY(1px); } 100% { transform: none; } }
        @keyframes mb-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mb-pop { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.15); opacity: 1; } 100% { transform: none; } }
        @media (prefers-reduced-motion: reduce) { .machine.mb * { animation-name: none !important; } }
  `,
};
}
