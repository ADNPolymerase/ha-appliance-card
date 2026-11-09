// The parts of the CCS plug, as the CSS above lays them out.
const EV_PLUG_PARTS = '<i class="pl-boot"></i><i class="pl-grip"></i><i class="pl-collar"></i><i class="pl-head"></i>'
  + '<i class="pl-ac"></i><i class="pl-dc"></i><i class="pl-latch"></i>';

function illustrationCss(type, color) {
  const key = drawKeyOf(type);
  const fn = drawCssOf(DRAW_KEYS.includes(key) ? key : "laundry");
  return fn ? fn(color) : "";
}


// Everything this card renders is concatenated into innerHTML, and much of it
// comes from the integration rather than the dashboard author: SmartThings,
// Home Connect, LG and Miele pass program names, phase labels, friendly names
// and alert keys straight through from a vendor cloud. Unescaped, any of them
// renders as live markup in the user's session, and inside a quoted attribute
// a bare double quote is enough to break out. Escape the five characters that
// matter, everywhere an entity-derived value reaches the template.
function esc(value) {
  return String(value === undefined || value === null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The fridge drawing. Two sets of coordinates: `body` is laid out against the
// whole cabinet (doors shut), `door[]` against each panel (a door open). The
// display, the handle and the ice dispenser belong to their door and swing
// with it, which is also why an open door shows nothing but its edge.
// Fridges and freezers in three-quarter view: the cabinet with its side and
// top, doors that turn on their hinge (the outside until seen edge on, then
// the inside with its balconies), a lit inside with things standing on glass
// shelves, a cellar's bottles lying on wooden racks, an ice dispenser, a chest
// freezer whose lid lifts and an upright one with see-through drawers. Drawn
// in SVG on a 120 x 135 field. anim (from the card's door animation) sets
// open, freezerOpen and kF / kZ, how far each door has turned.
const FR3 = (() => {
  let n = 0;
  const id = () => `fr${n++}`;
  // The cabinet: front x0..x1, y0..y1; side and top drawn with a depth (dx, dy).
  const DX = 11, DY = -6;
  function cabinet(x0, y0, x1, y1, g) {
    return `<ellipse cx="${(x0 + x1) / 2 + 6}" cy="${y1 + 4}" rx="${(x1 - x0) / 2 + 12}" ry="3.2" fill="rgba(0,0,0,.14)"/>
    <path d="M${x1} ${y0} L${x1 + DX} ${y0 + DY} V${y1 + DY} L${x1} ${y1} Z" fill="url(#${g.side})"/>
    <path d="M${x0} ${y0} L${x0 + DX} ${y0 + DY} H${x1 + DX} L${x1} ${y0} Z" fill="url(#${g.top})"/>
    <path d="M${x1} ${y0} L${x1 + DX} ${y0 + DY}" stroke="rgba(255,255,255,.8)" stroke-width=".7"/>
    <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="2.5" fill="url(#${g.front})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
    <rect x="${x0 + 3}" y="${y1}" width="5" height="3" rx="1" fill="#59616b"/><rect x="${x1 - 8}" y="${y1}" width="5" height="3" rx="1" fill="#59616b"/>`;
  }
  function defs(g, warmLight) {
    return `<defs>
    <linearGradient id="${g.front}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--ac-body-hi, #ffffff)"/><stop offset=".55" stop-color="var(--ac-body, #e9edf1)"/><stop offset="1" stop-color="var(--ac-body-lo, #b9c2ca)"/></linearGradient>
    <linearGradient id="${g.side}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#aeb7bf"/><stop offset="1" stop-color="#8b959e"/></linearGradient>
    <linearGradient id="${g.top}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fa"/><stop offset="1" stop-color="#d5dbe0"/></linearGradient>
    <linearGradient id="${g.door}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--ac-body-hi, #ffffff)"/><stop offset=".6" stop-color="var(--ac-body, #e9edf1)"/><stop offset="1" stop-color="var(--ac-body-lo, #b9c2ca)"/></linearGradient>
    <linearGradient id="${g.cav}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${warmLight ? "#fffdf5" : "#5f6a73"}"/><stop offset="1" stop-color="${warmLight ? "#e3eef5" : "#3d464e"}"/></linearGradient>
    <linearGradient id="${g.handle}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f99a3"/><stop offset=".4" stop-color="#f3f5f7"/><stop offset="1" stop-color="#7d868f"/></linearGradient>
    <linearGradient id="${g.rec}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f24"/><stop offset="1" stop-color="#3a424a"/></linearGradient>
    <linearGradient id="${g.glass}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfe9ff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".25"/><stop offset="1" stop-color="#cfe9ff" stop-opacity=".5"/></linearGradient>
    <radialGradient id="${g.glow}" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#fffbe6" stop-opacity=".9"/><stop offset="1" stop-color="#fffbe6" stop-opacity="0"/></radialGradient>
    </defs>`;
  }
  // A handle standing out from the door: its bar and the shadow it casts.
  const handle = (x, y, h, g) => `<rect x="${x + 1.4}" y="${y + 1}" width="2.4" height="${h}" rx="1.2" fill="rgba(0,0,0,.15)"/><rect x="${x}" y="${y}" width="2.6" height="${h}" rx="1.3" fill="url(#${g.handle})"/><rect x="${x + 2.6}" y="${y + 1.5}" width="1" height="${h - 3}" fill="#6d7680"/>`;
  // The display shows the reading as the card writes it; with no current it is
  // a dark pane.
  const lcd = (x, y, w, v, warn, dark) => v === undefined || v === "" ? "" : `<g class="fr-lcd${warn ? " warn" : ""}"><rect x="${x}" y="${y}" width="${w}" height="8" rx="1.6" fill="#15191d"/>${dark ? "" : `<text x="${x + w / 2}" y="${y + 6}" text-anchor="middle" font-size="${Math.min(5.6, (w * 1.75) / Math.max(3, String(v).length)).toFixed(2)}" font-weight="600" fill="${warn ? "#ff5252" : "#4fc3f7"}">${esc(v)}</text>`}</g>`;
  const seam = (x0, y, x1) => `<path d="M${x0} ${y} H${x1}" stroke="rgba(0,0,0,.28)" stroke-width=".9"/><path d="M${x0} ${y + 1} H${x1}" stroke="rgba(255,255,255,.7)" stroke-width=".5"/>`;
  const vseam = (x, y0, y1) => `<path d="M${x} ${y0} V${y1}" stroke="rgba(0,0,0,.28)" stroke-width=".9"/><path d="M${x + 1} ${y0} V${y1}" stroke="rgba(255,255,255,.6)" stroke-width=".5"/>`;
  // A cube of ice: rounded, pale blue, with a gleam on its corner.
  const cube = (x, y, s, r, cls = "", fall = 14) => `<g class="fr-cube ${cls}" style="--fall:${fall}px"><g transform="translate(${x} ${y}) rotate(${r})"><rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="${s * .25}" fill="#e6f6ff" stroke="#81c7f5" stroke-width=".45"/><path d="M${-s * .3} ${-s * .25} L${-s * .05} ${-s * .32}" stroke="#fff" stroke-width=".7" stroke-linecap="round"/></g></g>`;
  // The ice and water dispenser: a dark recess, the ice bin behind its window,
  // the chute, the lever, a glass on the drip tray, cubes dropping into it.
  function dispenser(x, y, w, h, s, g) {
    const cx = x + w / 2;
    const bin = s.ice !== undefined ? `<rect x="${x + 2.5}" y="${y + 2.5}" width="${w - 5}" height="9" rx="1.5" fill="#0f1317"/>${s.ice ? [0, 1, 2, 3, 4].map((i) => cube(x + 5 + i * (w - 10) / 4, y + 8 - (i % 2) * 2.2, 3.4, i * 23)).join("") + `<path class="fr-glint" d="M${x + 4} ${y + 4} H${x + w - 4}" stroke="#bfe6ff" stroke-width=".6"/>` : `<text x="${cx}" y="${y + 9}" text-anchor="middle" font-size="3.6" fill="#59616b">\u2014</text>`}` : "";
    const falling = s.ice ? cube(cx, y + 17, 2.8, 15, "drop", 11) + cube(cx - 1, y + 17, 2.6, 40, "drop d2", 11) + cube(cx + 1, y + 17, 2.6, 70, "drop d3", 11) : "";
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${g.rec})" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
    <path d="M${x + 1} ${y + 1} H${x + w - 1} L${x + w - 3} ${y + 3} H${x + 3} Z" fill="rgba(0,0,0,.4)"/>
    ${bin}
    <rect x="${cx - 2.5}" y="${y + 13}" width="5" height="3" rx="1" fill="#59616b"/>
    <rect x="${cx - 4}" y="${y + 16.5}" width="1.2" height="7" rx=".6" fill="#8f99a3"/>
    ${falling}
    <path d="M${cx - 4} ${y + h - 9} L${cx - 3.2} ${y + h - 3.6} H${cx + 3.2} L${cx + 4} ${y + h - 9}" fill="url(#${g.glass})" stroke="#9fc6e6" stroke-width=".5"/>
    ${s.ice ? cube(cx - 1.2, y + h - 5.4, 2.4, 20) + cube(cx + 1.4, y + h - 5.8, 2.2, 55) : ""}
    <rect x="${x + 2}" y="${y + h - 3.4}" width="${w - 4}" height="2.2" rx="1" fill="#59616b"/>`;
  }
  // The inside, seen through the open front as a real box: the back wall set
  // back along the cabinet's own depth, the left wall and the floor showing,
  // glass shelves seen a little from above, and things standing on them with
  // a top of their own. What lies right of or above the opening stays hidden
  // behind the frame.
  function box3(x, y, w, h, d, front, top, side) {
    // A box standing at (x, y) bottom-left of its front face, depth d along the
    // cabinet's depth vector.
    const kx = d * 0.73, ky = -d * 0.4;
    return `<path d="M${x} ${y - h} L${x + kx} ${y - h + ky} H${x + w + kx} L${x + w} ${y - h} Z" fill="${top}"/>
    <path d="M${x + w} ${y} L${x + w + kx} ${y + ky} V${y - h + ky} L${x + w} ${y - h} Z" fill="${side}"/>
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${front}"/>`;
  }
  function inside(x0, y0, x1, y1, g, s, freezer) {
    const cid = id(), gl = id(), gb = id(), cy = id(), DXI = 12, DYI = -7;
    const bx0 = x0 + DXI, by0 = y0 + DYI, by1 = y1 + DYI;
    const lit = !s.dark;
    const wallBack = `url(#${gb})`, wallLeft = `url(#${gl})`, floor = lit ? "#c9d6e0" : "#3a434a";
    const grads = `<linearGradient id="${gl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${lit ? "#aebfcc" : "#2c3338"}"/><stop offset="1" stop-color="${lit ? "#dbe6ee" : "#3d464e"}"/></linearGradient>
    <linearGradient id="${cy}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <linearGradient id="${gb}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? "#ffffff" : "#4a545c"}"/><stop offset=".5" stop-color="${lit ? "#eef5fa" : "#434c54"}"/><stop offset="1" stop-color="${lit ? "#d6e2ea" : "#3a434a"}"/></linearGradient>`;
    const shelfYs = freezer === "drawers" ? [] : freezer ? [0.5] : [0.3, 0.58];
    const shelf = (f) => {
      const y = y0 + (y1 - y0) * f;
      return `<path d="M${x0} ${y} L${x0 + DXI} ${y + DYI} H${x1 + 2} V${y} Z" fill="rgba(190,225,250,.55)" stroke="rgba(110,160,195,.7)" stroke-width=".5"/>
      <rect x="${x0}" y="${y}" width="${x1 - x0}" height="1.6" fill="rgba(140,185,215,.9)"/><path d="M${x0} ${y + .3} H${x1}" stroke="#fff" stroke-width=".6"/>
      <path d="M${x0 + 2} ${y + 2.2} L${x0 + DXI + 2} ${y + DYI + 2.2} H${x1 + 2}" stroke="rgba(0,0,0,.08)" stroke-width="1.6" fill="none"/>`;
    };
    const sy = (f) => y0 + (y1 - y0) * f;
    const items = freezer === "drawers" ? drawerStack(x0, y0, x1, y1, s.dark, s.kF === undefined ? 1 : s.kF)
      : freezer
      ? box3(x0 + 6, sy(0.5) - 1, 12, 8, 6, "#90caf9", "#bbdefb", "#64b5f6") + box3(x0 + 21, sy(0.5) - 2, 10, 7, 6, "#ef9a9a", "#ffcdd2", "#e57373")
        + box3(x0 + 7, y1 - 2, 14, 9, 7, "#e0e0e0", "#f5f5f5", "#bdbdbd") + box3(x0 + 25, y1 - 3, 12, 8, 6, "#a5d6a7", "#c8e6c9", "#81c784")
      : box3(x0 + 7, sy(0.3) - 1, 5, 11, 4, "#fafafa", "#eceff1", "#cfd8dc") + `<path d="M${x0 + 7} ${sy(0.3) - 12} l2.5 -2.2 l2.5 2.2 z" fill="#42a5f5"/>`
        + box3(x0 + 16, sy(0.3) - 2, 9, 6, 5, "#ffb74d", "#ffe0b2", "#fb8c00")
        + `<ellipse cx="${x0 + 13}" cy="${sy(0.58) - 4}" rx="4.6" ry="3.6" fill="#e53935"/><path d="M${x0 + 11} ${sy(0.58) - 6} q1.5 -1 3 0" stroke="#fff" stroke-width=".7" fill="none" opacity=".7"/>`
        + standingBottle(x0 + 24, sy(0.58) - 3, 2.3, 16, "#43a047", "#1b5e20", cy)
        + `<ellipse cx="${x0 + 33}" cy="${sy(0.58) - 3}" rx="4" ry="2.4" fill="#fff176"/><ellipse cx="${x0 + 33}" cy="${sy(0.58) - 4}" rx="4" ry="1.6" fill="#fff9c4"/>`
        + box3(x0 + 3, y1 - 1.5, x1 - x0 - 10, 8, 6, "rgba(200,230,200,.75)", "rgba(220,240,220,.7)", "rgba(160,200,160,.75)")
        + `<ellipse cx="${x0 + 12}" cy="${y1 - 7}" rx="3" ry="2.2" fill="#7cb342"/><ellipse cx="${x0 + 20}" cy="${y1 - 6.5}" rx="3" ry="2.2" fill="#fb8c00"/>`;
    const lamp = lit ? `<rect x="${bx0 + 6}" y="${by0 + 1}" width="${x1 - bx0 - 10}" height="2.2" rx="1" fill="#fffde7"/><path d="M${bx0} ${by0 + 2} H${x1}" stroke="none"/>
      <polygon points="${bx0 + 6},${by0 + 3} ${x1 - 4},${by0 + 3} ${x1},${y1} ${x0},${y1}" fill="url(#${g.glow})" opacity=".55"/>` : "";
    return `<defs>${grads}</defs><clipPath id="${cid}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/></clipPath>
    <g clip-path="url(#${cid})">
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="${wallLeft}"/>
      <rect x="${bx0}" y="${by0}" width="${x1 - bx0 + 4}" height="${by1 - by0}" fill="${wallBack}"/>
      <path d="M${x0} ${y0} L${bx0} ${by0} V${by1} L${x0} ${y1} Z" fill="${wallLeft}"/>
      <path d="M${x0} ${y1} L${bx0} ${by1} H${x1 + 4} V${y1} Z" fill="${floor}"/>
      <path d="M${bx0} ${by0} V${by1} M${bx0} ${by1} H${x1 + 4}" stroke="rgba(0,0,0,.22)" stroke-width=".8"/>
      <path d="M${bx0 + 1} ${by0} V${by1 - 1} H${x1 + 4}" stroke="rgba(0,0,0,.08)" stroke-width="2.4" fill="none"/>
      ${[0.25, 0.5, 0.75].map((f) => `<path d="M${x0} ${y0 + (y1 - y0) * f} L${bx0} ${by0 + (by1 - by0) * f}" stroke="rgba(0,0,0,.06)" stroke-width=".6"/>`).join("")}
      ${lamp}
      ${shelfYs.map(shelf).join("")}
      ${items}
      ${freezer || !lit ? "" : [0, 1, 2].map((i) => `<path class="fr-mist m${i + 1}" d="M${x0 + 10 + i * 12} ${y1 - 2} q2 3 0 6" stroke="rgba(200,230,255,.8)" stroke-width="1" fill="none"/>`).join("")}
    </g>
    <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>
    <path d="M${x0 + .6} ${y0 + .6} V${y1 - .6}" stroke="#e9eef2" stroke-width="1.6"/>`;
  }
  // A bottle standing upright, seen slightly from above: round foot, straight
  // sides, a curved shoulder, the neck and its cap.
  function standingBottle(cx, by, r, h, color, cap, shade) {
    const ry = r * 0.32, hb = h * 0.58, sh = h * 0.2, hn = h * 0.22, rn = r * 0.38;
    const t = by - hb, ts = t - sh, tn = ts - hn;
    const d = `M${cx - r} ${t} L${cx - r} ${by} A${r} ${ry} 0 0 0 ${cx + r} ${by} L${cx + r} ${t} C${cx + r} ${t - sh * .55} ${cx + rn} ${ts + sh * .35} ${cx + rn} ${ts} L${cx + rn} ${tn} L${cx - rn} ${tn} L${cx - rn} ${ts} C${cx - rn} ${ts + sh * .35} ${cx - r} ${t - sh * .55} ${cx - r} ${t} Z`;
    return `<path d="${d}" fill="${color}"/><path d="${d}" fill="url(#${shade})"/>
      <rect x="${cx - r}" y="${t + hb * .25}" width="${r * 2}" height="${hb * .4}" fill="#f5f0e1" opacity=".85"/><rect x="${cx - r}" y="${t + hb * .25}" width="${r * 2}" height="${hb * .4}" fill="url(#${shade})"/>
      <rect x="${cx - rn - .2}" y="${tn - 1.6}" width="${rn * 2 + .4}" height="1.8" rx=".4" fill="${cap}"/><ellipse cx="${cx}" cy="${tn - 1.6}" rx="${rn + .2}" ry="${(rn + .2) * .35}" fill="${cap}" opacity=".7"/>
      <path d="M${cx - r * .45} ${t - sh * .2} V${by - 1}" stroke="rgba(255,255,255,.45)" stroke-width=".6"/>`;
  }
  // A jar seen slightly from above: its lid is an ellipse.
  function jar(cx, by, r, h, color, lid, shade) {
    const ry = r * 0.32;
    const d = `M${cx - r} ${by - h} L${cx - r} ${by} A${r} ${ry} 0 0 0 ${cx + r} ${by} L${cx + r} ${by - h} Z`;
    return `<path d="${d}" fill="${color}"/><path d="${d}" fill="url(#${shade})"/>
      <rect x="${cx - r - .2}" y="${by - h - 1.8}" width="${r * 2 + .4}" height="1.8" fill="${lid}"/><ellipse cx="${cx}" cy="${by - h - 1.8}" rx="${r + .2}" ry="${ry}" fill="${lid}"/><ellipse cx="${cx}" cy="${by - h - 1.8}" rx="${r * .8}" ry="${ry * .7}" fill="rgba(255,255,255,.25)"/>`;
  }
  // A wine bottle lying on a rack, neck towards us: tip (tx, ty), its axis going
  // back along (ux, uy).
  function lyingBottle(tx, ty, ux, uy, len, glass, capsule) {
    const nx = -uy, ny = ux; // perpendicular, towards the bottom right
    const prof = [[0, 1.2], [2.6, 1.25], [4.6, 1.25], [6, 2.2], [7.4, 3], [8.8, 3.3], [len, 3.3]];
    const pt = (s0, r, side) => `${(tx + ux * s0 + nx * r * side).toFixed(2)} ${(ty + uy * s0 + ny * r * side).toFixed(2)}`;
    const outline = (from, to) => { const seg = prof.filter(([s0]) => s0 >= from && s0 <= to); return `M${seg.map(([s0, r]) => pt(s0, r, 1)).join(" L")} L${seg.reverse().map(([s0, r]) => pt(s0, r, -1)).join(" L")} Z`; };
    const end = prof[prof.length - 1];
    return `<ellipse cx="${tx + ux * end[0]}" cy="${ty + uy * end[0]}" rx="3.3" ry="3.3" fill="${glass}"/>
      <path d="${outline(0, len)}" fill="${glass}"/>
      <path d="M${pt(5.6, 1.4, -1)} L${pt(len - .5, 2.2, -1)}" stroke="rgba(255,255,255,.28)" stroke-width=".9" stroke-linecap="round"/>
      <path d="${outline(0, 2.6)}" fill="${capsule}"/>
      <ellipse cx="${tx}" cy="${ty}" rx="1.25" ry="1.25" fill="${capsule}" stroke="rgba(0,0,0,.35)" stroke-width=".4"/>`;
  }
  // A door turning on its hinge. Closed it spans W from the hinge (sgn +1: hinge
  // on the left, -1: on the right); wide open its free edge sits wOpen beyond the
  // hinge, inside face towards us (the drawing of door()). k (0..1) is how far
  // it has turned. Until it is seen edge on, its outside turns with it: the panel
  // and what is on it (front). A point gone out by z towards us moves by
  // (-DX, -DY) * z / DEPTH, the cabinet's own depth vector.
  const DEPTH = 40, KD = DX / DEPTH;
  function swing(xh, y0, y1, g, sgn, W, wOpen, kind, front, k = 1) {
    const proj = (th) => sgn * W * Math.cos(th) - KD * W * Math.sin(th);
    const thEdge = Math.atan2(sgn, KD);
    let lo = thEdge, hi = Math.PI * .99;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (Math.abs(proj(m)) < wOpen) lo = m; else hi = m; }
    const th = k * lo, e = proj(th);
    if (Math.sign(e) === sgn) {
      const a = e / (sgn * W), b = Math.sin(th) * 1.4 / (sgn * W);
      const fx = xh + e, fy = (x) => x;
      return `<g transform="matrix(${a} ${b} 0 1 ${xh - a * xh} ${-b * xh})">${front}</g>`
        + `<path d="M${fx} ${y0 + b * sgn * W} V${y1 + b * sgn * W}" stroke="rgba(0,0,0,.35)" stroke-width="${.6 + 2.4 * Math.sin(th)}"/>`;
    }
    PF = Math.min(1, Math.abs(e) / wOpen);
    const d = door(xh, y0, y1, g, -sgn, Math.abs(e), kind);
    PF = 1;
    return d;
  }
  const panel = (x0, y0, x1, y1, g) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="2.2" fill="url(#${g.front})" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>`;
  // A door swung wide open on its hinge (dir -1: hinge on the left, +1: on the
  // right), seen from inside: a liner with a gasket, the thickness of the door
  // on its free edge, and balconies that stand out of the liner with what they
  // hold. kind: "bins" (fridge), "glass" (wine cellar: a framed pane, nothing in
  // it), "plain".
  let PF = 1;
  function door(xh, y0, y1, g, dir, w, kind) {
    const P = (u, f) => [xh + dir * w * u, y0 + (y1 - y0) * f + u * PF * (2.5 - 6.5 * (1 - f) + 4 * f)];
    const quad = (u0, f0, u1, f1) => { const a = P(u0, f0), b = P(u1, f0), c = P(u1, f1), d = P(u0, f1); return `M${a} L${b} L${c} L${d} Z`; };
    const lin = id(), cyl = id();
    const defs = `<defs><linearGradient id="${lin}" x1="${dir < 0 ? 1 : 0}" y1="0" x2="${dir < 0 ? 0 : 1}" y2="0"><stop offset="0" stop-color="#cfd8de"/><stop offset=".35" stop-color="#eef2f5"/><stop offset="1" stop-color="#fbfcfd"/></linearGradient>
      <linearGradient id="${cyl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>`;
    // The thickness of the door, seen on its free edge.
    const e0 = P(1, 0), e1 = P(1, 1), t = dir * 3;
    const edge = `<path d="M${e0} L${e0[0] + t} ${e0[1] + 1} L${e1[0] + t} ${e1[1] + 1} L${e1} Z" fill="url(#${g.side})"/>`;
    let body = `<path d="${quad(0, 0, 1, 1)}" fill="url(#${lin})" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
      <path d="${quad(.07, .02, .93, .98)}" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.4"/>
      <path d="${quad(0, 0, .14, 1)}" fill="rgba(0,0,0,.08)"/>`;
    if (kind === "glass") {
      body += `<path d="${quad(.16, .05, .84, .95)}" fill="rgba(180,215,235,.35)" stroke="#7b6a5a" stroke-width="1.6"/>
        <path d="${quad(.25, .1, .45, .1)} " fill="none"/>
        <path d="M${P(.28, .1)} L${P(.48, .1)} L${P(.24, .55)} L${P(.2, .55)} Z" fill="rgba(255,255,255,.35)"/>`;
    }
    if (kind === "bins") {
      body += [0.24, 0.52, 0.8].map((f, i) => {
        const lip = 4.2, back = [dir * 2.4, -2.6];
        const [ax, ay] = P(.1, f), [bx, by] = P(.9, f);
        // Floor of the balcony, seen from above.
        let out = `<path d="M${ax} ${ay} L${bx} ${by} L${bx + back[0]} ${by + back[1]} L${ax + back[0]} ${ay + back[1]} Z" fill="#dfe7ec"/>`;
        // What stands in it: bottles in the lower one, jars and a carton above.
        const items = i === 2 ? [[.25, "#43a047", 11, 3.2], [.5, "#8d6e63", 10, 3.2], [.75, "#fafafa", 9, 3.6]]
          : i === 1 ? [[.3, "#fff59d", 6, 4.4], [.7, "#ef9a9a", 7, 4]] : [[.3, "#ffcc80", 5, 3.6], [.62, "#b3e5fc", 5.5, 3.6]];
        out += items.map(([u, c, h, wd]) => {
          const [x, y] = P(u, f), cx = x + back[0] * .5, by2 = y + back[1] * .5 - .5;
          return i === 2 ? standingBottle(cx, by2, wd / 2, h + 3, c, "#37474f", cyl) : jar(cx, by2, wd / 2, h * .8, c, i === 1 ? "#e53935" : "#ffffff", cyl);
        }).join("");
        // The front lip, translucent, hiding the feet of what stands behind it.
        out += `<path d="M${ax} ${ay} L${bx} ${by} L${bx} ${by + lip} L${ax} ${ay + lip} Z" fill="rgba(205,228,242,.88)" stroke="#90a4ae" stroke-width=".5"/>
          <path d="M${ax} ${ay + .4} L${bx} ${by + .4}" stroke="#fff" stroke-width=".6"/>`;
        return out;
      }).join("");
    }
    return defs + body + edge;
  }
  // Inside of a wine cellar: dark wood walls in depth, a warm light, wooden racks
  // seen from above with bottles lying on them, their bases towards us.
  // While it cools, snowflakes come and go on its shut doors, one after the
  // other (first picks the first of the four staggers).
  const frost = (s, pts, first, color = "#4fc3f7") => s.cooling === true && !s.dark
    ? pts.map(([x, y], i) => `<g class="fr-flake fr-f${((first + i) % 4) + 1}">${ntFlake(x, y, 3.2, color, .9)}</g>`).join("") : "";
  // Door shut, the cellar's LEDs light it blue;
  // door open, its lamp lights it warm.
  function wineInside(x0, y0, x1, y1, g, s, blue) {
    const cid = id(), gl = id(), gb = id(), DXI = 12, DYI = -7;
    const bx0 = x0 + DXI, by0 = y0 + DYI, by1 = y1 + DYI, lit = !s.dark;
    const grads = `<linearGradient id="${gl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${lit ? "#2a1d16" : "#141010"}"/><stop offset="1" stop-color="${lit ? "#4a352a" : "#1e1816"}"/></linearGradient>
    <linearGradient id="${gb}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? "#6b4c3b" : "#241c19"}"/><stop offset="1" stop-color="${lit ? "#3e2c22" : "#1a1513"}"/></linearGradient>`;
    const rows = 5, step = (y1 - y0 - 8) / rows;
    let racks = "";
    for (let r = 0; r < rows; r++) {
      const y = y0 + 10 + step * (r + 1) - 2;
      racks += `<path class="fr-rack" d="M${x0} ${y} L${x0 + DXI} ${y + DYI} H${x1 + 2} V${y} Z" fill="${lit ? "#8d6e63" : "#3e2f29"}"/>
        <rect x="${x0}" y="${y}" width="${x1 - x0}" height="2" fill="${lit ? "#6d4c41" : "#2e2320"}"/><path d="M${x0} ${y + .3} H${x1}" stroke="rgba(255,220,180,.35)" stroke-width=".5"/>`;
      racks += [2, 1, 0].map((c) => lyingBottle(x0 + 7 + c * 14, y - 3.4, 0.864, -0.504, 19, lit ? (c === 1 ? "#4a1a22" : "#26402a") : "#151b16", c === 1 ? "#c9a24b" : "#8e1b2c")).join("");
    }
    const lamp = !lit ? "" : blue
      ? `<rect x="${bx0 + 4}" y="${by0}" width="${x1 - bx0 - 6}" height="3" rx="1.5" fill="#4fc3f7" opacity=".55"/><rect x="${bx0 + 6}" y="${by0 + .6}" width="${x1 - bx0 - 10}" height="1.8" rx=".9" fill="#e1f5fe"/>
      <polygon points="${bx0 + 6},${by0 + 3} ${x1 - 4},${by0 + 3} ${x1},${y1} ${x0},${y1}" fill="#29b6f6" opacity=".3"/>`
      : `<rect x="${bx0 + 6}" y="${by0 + 1}" width="${x1 - bx0 - 10}" height="2" rx="1" fill="#ffe0b2"/>
      <polygon points="${bx0 + 6},${by0 + 3} ${x1 - 4},${by0 + 3} ${x1},${y1} ${x0},${y1}" fill="#ffb74d" opacity=".12"/>`;
    const tint = lit && blue ? `<rect class="fr-cool" x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#29b6f6" opacity=".34"/>` : "";
    return `<defs>${grads}</defs><clipPath id="${cid}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/></clipPath>
    <g clip-path="url(#${cid})">
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#${gl})"/>
      <rect x="${bx0}" y="${by0}" width="${x1 - bx0 + 4}" height="${by1 - by0}" fill="url(#${gb})"/>
      <path d="M${x0} ${y0} L${bx0} ${by0} V${by1} L${x0} ${y1} Z" fill="url(#${gl})"/>
      <path d="M${bx0} ${by0} V${by1}" stroke="rgba(0,0,0,.35)" stroke-width=".8"/>
      ${lamp}${racks}${tint}
    </g>
    <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>`;
  }

  // Four see-through drawers stacked in an upright freezer, the top one pulled
  // out towards us.
  function drawerStack(x0, y0, x1, y1, dark, k) {
    const goods = [["#66bb6a", "#ef5350", "#fff176"], ["#f48fb1", "#64b5f6", "#ffb74d"], ["#aed581", "#ba68c8", "#e57373"], ["#4db6ac", "#ff8a65", "#90a4ae"]];
    const n = 4, gap = 2.4, h = (y1 - y0 - 6 - gap * n) / n, w = x1 - x0 - 5, d = 12;
    let out = "";
    for (let i = n - 1; i >= 0; i--) {
      const pull = i === 0 ? k : 0;
      const bx = x0 + 2 - pull * 7, by = y0 + 4 + (i + 1) * (h + gap) + pull * 7;
      const kx = d * 0.73, ky = -d * 0.4;
      // Goods first, then the clear plastic tub over them.
      const pk = goods[i].map((col, j) => box3(bx + 3 + j * (w - 6) / 3, by - 1.2, (w - 10) / 3, [6, 4.5, 7][j] * h / 14, 6, col, "rgba(255,255,255,.55)", "rgba(0,0,0,.18)")).join("");
      out += `<path d="M${bx} ${by - h} L${bx + kx} ${by - h + ky} H${bx + w + kx} L${bx + w} ${by - h} Z" fill="rgba(225,240,250,${pull ? .55 : .35})" stroke="rgba(120,170,200,.6)" stroke-width=".4"/>
        ${pk}
        <path d="M${bx + w} ${by} L${bx + w + kx} ${by + ky} V${by - h + ky} L${bx + w} ${by - h} Z" fill="rgba(190,220,240,.45)" stroke="rgba(120,170,200,.6)" stroke-width=".4"/>
        <rect x="${bx}" y="${by - h}" width="${w}" height="${h}" rx="1.2" fill="rgba(215,235,248,${dark ? .25 : .5})" stroke="rgba(110,160,195,.85)" stroke-width=".6"/>
        <rect x="${bx + w / 2 - 7}" y="${by - h + 1.2}" width="14" height="2.4" rx="1.2" fill="#5d6672"/>
        <path d="M${bx + 2} ${by - h + 1} L${bx + 6} ${by - 1}" stroke="rgba(255,255,255,.7)" stroke-width=".8"/>`;
    }
    return out;
  }
  // Chest freezer, seen from the front right and above: the lid lifts on its
  // back hinge and shows the tub, a wire basket and frozen food, cold mist
  // rising out of it.
  function chest(s) {
    const g = { front: id(), side: id(), top: id(), door: id(), cav: id(), handle: id(), rec: id(), glass: id(), glow: id() };
    const tub = id(), lin = id(), cid = id();
    const x0 = 4, x1 = 88, y0 = 66, y1 = 114, KX = 22, KY = -26, lip = 7;
    const lit = !s.dark;
    let out = defs(g, lit) + `<defs><linearGradient id="${tub}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? "#dfeaf2" : "#3a434a"}"/><stop offset="1" stop-color="${lit ? "#b6c8d6" : "#2a3137"}"/></linearGradient>
      <linearGradient id="${lin}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#cfd8de"/><stop offset="1" stop-color="#f4f7f9"/></linearGradient></defs>`;
    out += `<ellipse cx="${(x0 + x1) / 2 + 9}" cy="${y1 + 3}" rx="${(x1 - x0) / 2 + 16}" ry="3.6" fill="rgba(0,0,0,.14)"/>
      <path d="M${x1} ${y0} L${x1 + KX} ${y0 + KY} V${y1 + KY} L${x1} ${y1} Z" fill="url(#${g.side})"/>
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="2.5" fill="url(#${g.front})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
      <rect x="${x0 + 5}" y="${y1 - 11}" width="26" height="6" rx="1.2" fill="#c5ccd3"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${x0 + 7.5 + i * 3.8}" y="${y1 - 10}" width="1.8" height="4" rx=".6" fill="#6b747e"/>`).join("")}
      <rect x="${x0 + 3}" y="${y1}" width="6" height="2.6" rx="1" fill="#59616b"/><rect x="${x1 - 9}" y="${y1}" width="6" height="2.6" rx="1" fill="#59616b"/>
      ${lcd(x1 - 30, y0 + lip + 8, 24, s.fridgeTemp, s.warn, s.dark)}
      <circle cx="${x1 - 27}" cy="${y0 + lip + 21}" r="1.1" fill="${s.warn ? "#ff5252" : "#43a047"}"/>`;
    const rim = [[x0, y0], [x0 + KX, y0 + KY], [x1 + KX, y0 + KY], [x1, y0]];
    if (!s.open) {
      out += `<path d="M${rim.map((p) => p.join(" ")).join(" L")} Z" fill="url(#${g.top})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
        <path d="M${x0 + 6} ${y0 - 3} L${x0 + KX - 2} ${y0 + KY + 2} H${x1 + KX - 8}" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>
        <path d="M${x1} ${y0} L${x1 + KX} ${y0 + KY} V${y0 + KY + lip} L${x1} ${y0 + lip} Z" fill="#a9b2bb"/>
        <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${lip}" rx="2" fill="url(#${g.door})" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>
        <rect x="${(x0 + x1) / 2 - 15}" y="${y0 + 2.2}" width="30" height="3" rx="1.5" fill="#363d48"/><rect x="${(x0 + x1) / 2 - 13.5}" y="${y0 + 2.6}" width="27" height="1" rx=".5" fill="#8f98a4"/>
        <path d="M${x0} ${y0 + lip + .6} H${x1}" stroke="rgba(0,0,0,.35)" stroke-width=".9"/>
        <g class="nt-run">${[[x0 + 20, y0 - 6], [x0 + 48, y0 - 14], [x0 + 74, y0 - 9], [x1 + 8, y0 - 20]].map(([x, y], i) => `<g class="nta-frost ntd${i + 1}">${ntFlake(x, y, 2.4, "#29b6f6", .7)}</g>`).join("")}</g>`;
      return out;
    }
    // Open: the lid turns on its back hinge. A point of the chest is (x, z, h):
    // z depth from the front (0..D), h height above the rim.
    const D = 40, P3 = (x, z, h) => [x + KX * z / D, y0 + KY * z / D - h];
    const th = (s.kF === undefined ? 1 : s.kF) * 98 * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th);
    // Inner face from the hinge (z = D, h = -lip) to the front edge; outer face
    // the thickness of the lid further along its normal.
    const inner = (x, f) => P3(x, D - f * D * cs + 0, -lip + f * D * sn);
    const outer = (x, f) => P3(x + 0, D - f * D * cs + lip * sn, -lip + f * D * sn + lip * cs);
    const quad = (A, B, C, E) => `M${A} L${B} L${C} L${E} Z`;
    const lidSvg = th < 1.05
      ? `<path d="${quad(outer(x0, 0), outer(x1, 0), outer(x1, 1), outer(x0, 1))}" fill="url(#${g.top})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
        <path d="${quad(outer(x1, 0), inner(x1, 0), inner(x1, 1), outer(x1, 1))}" fill="#a9b2bb"/>
        <path d="${quad(outer(x0, 1), outer(x1, 1), inner(x1, 1), inner(x0, 1))}" fill="url(#${g.door})" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>`
      : `<path d="${quad(inner(x0, 0), inner(x1, 0), inner(x1, 1), inner(x0, 1))}" fill="url(#${lin})" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
        <path d="${quad(inner(x0 + 4, .08), inner(x1 - 4, .08), inner(x1 - 4, .92), inner(x0 + 4, .92))}" fill="none" stroke="rgba(0,0,0,.16)" stroke-width="1.6"/>
        <path d="${quad(inner(x1, 0), outer(x1, 0), outer(x1, 1), inner(x1, 1))}" fill="url(#${g.side})"/>
        <path d="${quad(inner(x0, 1), inner(x1, 1), outer(x1, 1), outer(x0, 1))}" fill="#c3cad1"/>
        ${lit && th > 1.4 ? (() => { const L0 = inner((x0 + x1) / 2 - 10, .12), L1 = inner((x0 + x1) / 2 + 10, .12); return `<path d="M${L0} L${L1}" stroke="#fffde7" stroke-width="2" stroke-linecap="round"/>`; })() : ""}`;
    // The tub: opening, back and left inner walls, floor, then what it holds.
    const DEP = 15, inset = 3;
    const o = [[x0 + inset, y0 + 1], [x0 + KX + inset * .4, y0 + KY + 2], [x1 + KX - inset, y0 + KY + 2], [x1 - inset, y0 + 1]];
    // Frozen food lying on the floor of the tub, sinking behind the front rim.
    const fl = y0 + 7;
    const foods = box3(x0 + 9, fl, 18, 9, 10, "#90caf9", "#bbdefb", "#64b5f6") + box3(x0 + 29, fl + 1, 14, 8, 9, "#ef9a9a", "#ffcdd2", "#e57373")
      + box3(x0 + 45, fl, 16, 10, 10, "#e0e0e0", "#f5f5f5", "#bdbdbd") + box3(x0 + 17, fl - 9, 13, 7, 8, "#a5d6a7", "#c8e6c9", "#81c784")
      + box3(x0 + 36, fl - 10, 11, 6, 7, "#fff59d", "#fffde7", "#fbc02d")
      + `<ellipse cx="${x0 + 58}" cy="${fl - 12}" rx="7" ry="3.4" fill="#ffcc80"/><ellipse cx="${x0 + 58}" cy="${fl - 13}" rx="7" ry="2.4" fill="#fff3e0"/>`;
    // Wire basket hooked on the rim, on the right.
    const bx = x1 - 24, by = y0 - 6, bw = 26, bh = 10, bd = 20;
    const kx = bd * 0.73, ky = -bd * 0.4;
    const basket = box3(bx + 2, by - 1, 9, 5, 7, "#ffcc80", "#ffe0b2", "#ffb74d") + box3(bx + 12, by - 1, 8, 6, 7, "#b39ddb", "#d1c4e9", "#9575cd")
      + `<path d="M${bx} ${by - bh} L${bx + kx} ${by - bh + ky} H${bx + bw + kx} L${bx + bw} ${by - bh} Z M${bx + bw} ${by} L${bx + bw + kx} ${by + ky} V${by - bh + ky} M${bx} ${by - bh} V${by} H${bx + bw} V${by - bh}" fill="none" stroke="#9aa5ae" stroke-width=".7"/>
      ${[1, 2, 3, 4, 5].map((i) => `<path d="M${bx + i * bw / 6} ${by - bh} V${by}" stroke="#9aa5ae" stroke-width=".45"/>`).join("")}
      <path d="M${bx} ${by - bh / 2} H${bx + bw}" stroke="#9aa5ae" stroke-width=".45"/>`;
    out += `<clipPath id="${cid}"><path d="M${o.map((p) => p.join(" ")).join(" L")} Z"/></clipPath>
      <g clip-path="url(#${cid})">
        <rect x="${x0}" y="${y0 + KY - 2}" width="${x1 - x0 + KX + 4}" height="${-KY + 6}" fill="url(#${tub})"/>
        <path d="M${o[1]} L${o[2]} L${o[2][0]} ${o[2][1] + DEP} L${o[1][0]} ${o[1][1] + DEP} Z" fill="${lit ? "#eef4f8" : "#434c54"}"/>
        <path d="M${o[0]} L${o[1]} L${o[1][0]} ${o[1][1] + DEP} L${o[0][0]} ${o[0][1] + DEP} Z" fill="${lit ? "#c3d3df" : "#2c3338"}"/>
        ${[0.3, 0.6].map((f) => `<path d="M${o[1][0]} ${o[1][1] + DEP * f} H${o[2][0]}" stroke="rgba(255,255,255,.6)" stroke-width=".8"/>`).join("")}
        ${foods}${basket}
      </g>
      <path d="M${o.map((p) => p.join(" ")).join(" L")} Z" fill="none" stroke="#9aa5ae" stroke-width="1.6"/>
      <path d="M${rim.map((p) => p.join(" ")).join(" L")} Z" fill="none" stroke="url(#${g.top})" stroke-width="2.4"/>
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="2.6" rx="1" fill="#d5dbe0" stroke="rgba(0,0,0,.2)" stroke-width=".5"/>
      ${lidSvg}
      ${lit && th > 1.2 ? [0, 1, 2, 3].map((i) => `<path class="fr-steam m${i + 1}" d="M${x0 + 18 + i * 18} ${y0 - 4} q-2.5 -3 0 -6 q2.5 -3 0 -6" stroke="rgba(215,238,255,.9)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`).join("") : ""}`;
    return out;
  }
  // Upright freezer: one door, see-through drawers behind it.
  function uprightFreezer(s) {
    const g = { front: id(), side: id(), top: id(), door: id(), cav: id(), handle: id(), rec: id(), glass: id(), glow: id() };
    const x0 = 28, x1 = 84, y0 = 2, y1 = 116;
    let out = defs(g, !s.dark) + cabinet(x0, y0, x1, y1, g);
    const front = `<rect x="${x0 + 3}" y="${y0 + 3}" width="${x1 - x0 - 6}" height="14" rx="2" fill="rgba(0,0,0,.04)"/>`
      + handle(x1 - 7, y0 + 24, 44, g) + lcd(x0 + 5, y0 + 6, 26, s.fridgeTemp, s.warn, s.dark);
    if (s.open) return out + inside(x0 + 1, y0 + 1, x1 - 1, y1 - 1, g, s, "drawers") + swing(x0, y0, y1, g, 1, x1 - x0, 17, "plain", panel(x0, y0, x1, y1, g) + front, s.kF);
    return out + front + `<g class="nt-run">${[[x0 + 9, y0 + 32], [x1 - 15, y0 + 62], [x0 + 12, y0 + 96]].map(([x, y], i) => `<g class="nta-frost ntd${i + 1}">${ntFlake(x, y, 2.2, "#29b6f6", .65)}</g>`).join("")}</g>`;
  }
  function fridge(layout, s) {
    if (layout === "chest") return chest(s);
    if (layout === "drawers") return uprightFreezer(s);
    const g = { front: id(), side: id(), top: id(), door: id(), cav: id(), handle: id(), rec: id(), glass: id(), glow: id() };
    let out = defs(g, !s.dark);
    if (layout === "side_by_side") {
      const x0 = 18, x1 = 90, y0 = 6, y1 = 116, mid = 48;
      out += cabinet(x0, y0, x1, y1, g);
      const rFront = handle(mid + 3.5, y0 + 26, 50, g) + lcd(mid + 10, y0 + 8, 18, s.fridgeTemp, s.warn, s.dark);
      const lFront = lcd(x0 + 5, y0 + 8, 20, s.freezerTemp, false, s.dark) + dispenser(x0 + 3, y0 + 22, 19, 34, s, g) + handle(mid - 5.5, y0 + 26, 50, g);
      if (s.open) out += inside(mid + 1, y0 + 1, x1 - 1, y1 - 1, g, s, false) + swing(x1, y0, y1, g, -1, x1 - mid, 15, "bins", panel(mid, y0, x1, y1, g) + rFront, s.kF);
      else out += vseam(mid, y0, y1) + rFront + frost(s, [[mid + 22, y0 + 62], [mid + 12, y0 + 92]], 0);
      // Dispenser on the left of the freezer door, handle beside the seam in
      // front of it, never hidden behind it.
      if (s.freezerOpen) out += inside(x0 + 1, y0 + 1, mid - 1, y1 - 1, g, s, true) + swing(x0, y0, y1, g, 1, mid - x0, 15, "plain", panel(x0, y0, mid, y1, g) + lFront, s.kZ);
      else out += lFront + frost(s, [[x0 + 9, y0 + 68], [x0 + 21, y0 + 94]], 2);
      out += vseam(mid, y0, y1);
      return out;
    }
    const x0 = 28, x1 = 84, y0 = 2, y1 = 116;
    out += cabinet(x0, y0, x1, y1, g);
    if (layout === "wine") {
      // Closed: the same racks and lying bottles as the open cellar, seen
      // through the tinted glass of the door.
      const wx0 = x0 + 4, wy0 = y0 + 13, wx1 = x1 - 8, wy1 = y1 - 5;
      const glassFront = `<path d="M${x0} ${y0} H${x1} V${y1} H${x0} Z M${wx0} ${wy0} V${wy1} H${wx1} V${wy0} Z" fill="url(#${g.front})" fill-rule="evenodd" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="url(#${g.glass})" opacity=".45"/>
        <path d="M${wx0 + 3} ${wy0 + 2} L${wx0 + 15} ${wy0 + 2} L${wx0 + 3} ${wy0 + 48} Z" fill="rgba(255,255,255,.14)"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="none" stroke="#3a3f45" stroke-width="1.6"/>
        ${handle(x1 - 6, y0 + 30, 50, g)}${lcd(x0 + 17, y0 + 3, 20, s.fridgeTemp, s.warn, s.dark)}`;
      if (s.open) return out + wineInside(x0 + 1, y0 + 1, x1 - 1, y1 - 1, g, s) + swing(x0, y0, y1, g, 1, x1 - x0, 17, "glass", glassFront, s.kF);
      return out + wineInside(wx0, wy0, wx1, wy1, g, s, true) + `
        <rect class="fr-glass" x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="url(#${g.glass})" opacity=".45"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="rgba(20,24,28,${s.dark ? .55 : .18})"/>
        <path d="M${wx0 + 3} ${wy0 + 2} L${wx0 + 15} ${wy0 + 2} L${wx0 + 3} ${wy0 + 48} Z" fill="rgba(255,255,255,.14)"/>
        <path d="M${wx0 + 19} ${wy0 + 2} L${wx0 + 23} ${wy0 + 2} L${wx0 + 9} ${wy0 + 56} L${wx0 + 7} ${wy0 + 56} Z" fill="rgba(255,255,255,.08)"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="none" stroke="#3a3f45" stroke-width="1.6"/>
        ${frost(s, [[wx0 + 9, wy0 + 13], [wx1 - 9, wy0 + 33], [wx0 + 15, wy0 + 57], [wx1 - 11, wy0 + 80]], 0, "#e1f5fe")}
        ${handle(x1 - 6, y0 + 30, 50, g)}${lcd(x0 + 17, y0 + 3, 20, s.fridgeTemp, s.warn, s.dark)}`;
    }
    const cut = layout === "freezer_top" ? 0.34 : layout === "single" ? 1 : 0.63;
    const yc = y0 + (y1 - y0) * cut;
    const fridgeTop = layout !== "freezer_top";
    const fy0 = fridgeTop ? y0 : yc, fy1 = fridgeTop ? (layout === "single" ? y1 : yc) : y1;
    const zy0 = fridgeTop ? yc : y0, zy1 = fridgeTop ? y1 : yc;
    const fFront = handle(x1 - 7, fy0 + (fy1 - fy0) * 0.22, Math.min(40, (fy1 - fy0) * 0.45), g) + lcd(x0 + 5, fy0 + 6, 16, s.fridgeTemp, s.warn, s.dark)
      + (s.ice !== undefined && layout === "freezer_bottom" ? dispenser(x0 + 5, fy0 + 18, 17, 30, s, g) : "");
    if (s.open) out += inside(x0 + 1, fy0 + 1, x1 - 1, fy1 - 1, g, s, false) + swing(x0, fy0, fy1, g, 1, x1 - x0, 17, "bins", panel(x0, fy0, x1, fy1, g) + fFront, s.kF);
    else out += fFront + frost(s, [[x0 + 31, fy0 + (fy1 - fy0) * 0.42], [x0 + 15, fy0 + (fy1 - fy0) * 0.84]], 0);
    if (layout !== "single") {
      out += seam(x0, yc, x1);
      const zFront = handle(x1 - 7, zy0 + 6, Math.min(18, (zy1 - zy0) * 0.4), g) + lcd(x0 + 5, zy0 + 6, 16, s.freezerTemp, false, s.dark);
      if (s.freezerOpen) out += inside(x0 + 1, zy0 + 1, x1 - 1, zy1 - 1, g, s, true) + swing(x0, zy0, zy1, g, 1, x1 - x0, 17, "plain", panel(x0, zy0, x1, zy1, g) + zFront, s.kZ);
      else out += zFront + frost(s, [[x0 + 30, zy0 + (zy1 - zy0) * 0.62]], 2);
    }
    return out;
  }

  return (ctx, anim) => {
    n = 0;
    const L = ctx.layout || "freezer_bottom";
    const cold = L === "chest" || L === "drawers";
    const s = {
      fridgeTemp: cold ? ctx.coldText || undefined : ctx.fridgeTemp,
      freezerTemp: L === "single" || cold ? undefined : ctx.freezerTemp,
      warn: !!ctx.fridgeWarn,
      dark: !!ctx.dark,
      open: cold ? !!(ctx.doorOpen || ctx.freezerDoorOpen) : !!ctx.doorOpen,
      freezerOpen: !cold && !!ctx.freezerDoorOpen,
      ice: L === "wine" ? undefined : ctx.ice,
      cooling: ctx.cooling,
      kF: 1,
      kZ: 1,
      ...(anim || {}),
    };
    return `<svg class="fr-svg" viewBox="0 -10 120 135">${fridge(L, s)}</svg>`;
  };
})();

function fridgeHtml(ctx, anim) {
  const cold = ctx.coldBox;
  const f = cold ? !!(ctx.doorOpen || ctx.freezerDoorOpen) : !!ctx.doorOpen;
  const z = !cold && !!ctx.freezerDoorOpen;
  return `<div class="fr3 fr-k-${ctx.layout || "freezer_bottom"}${ctx.dark ? " fr-off" : ""}${f ? " fr-open-f" : ""}${z ? " fr-open-z" : ""}">${FR3(ctx, anim)}</div>`;
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

// The wood of a ceiling fan's blades: a grain along each blade, which turns
// with it.
const FAN_WOOD = `<defs><pattern id="fn-wood" width="3.2" height="88" patternUnits="userSpaceOnUse"><rect width="3.2" height="88" fill="#a86b3c"/>`
  + `<rect x="2.2" width=".7" height="88" fill="#7d4a24" opacity=".7"/><rect x=".6" width=".4" height="88" fill="#c88a55" opacity=".6"/></pattern></defs>`;
function fanHtml(cls, f) {
  const layout = f.layout || "stand";
  const open = airMachine(cls, f, `fn-${layout}`);
  if (layout === "ceiling") {
    // The blades turn in a flattened plane. The half nearer the ceiling passes
    // in front of the motor, the other half behind it, and they start at the
    // motor's rim so its inside never shows.
    const plane = (front) => `<div class="fn-plane${front ? " front" : ""}" style="left: 4px; top: -5px; width: 88px; height: 88px">`
      + `<svg width="88" height="88" viewBox="0 0 88 88">${front ? "" : FAN_WOOD}${fanBlades(44, 44, 5, 34, 9, 6)}</svg></div>`;
    return `${open}
          ${airBox("fn-halo", 18, 40, 60, 60)}${airBox("fn-ceil", 2, 8, 92, 1)}${airBox("fn-canopy", 43, 9, 10, 3.5)}${airBox("fn-pole", 46.75, 12, 2.5, 21)}
          ${plane(false)}${plane(true)}
          ${airBox("fn-housing", 41, 32, 14, 9)}${f.lamp ? airBox("fn-globe", 42.5, 40.6, 11, 5.2) : ""}
          ${windLines("", 12, 49, 72, 57, f.winter ? "down" : "up")}
        </div>`;
  }
  // A cage on a pole: a tall one for the floor, a short one for a desk.
  const table = layout === "table";
  const spokes = Array.from({ length: 16 }, (_, k) => {
    const a = k * Math.PI / 8;
    return `<line x1="${(30 + 5 * Math.cos(a)).toFixed(2)}" y1="${(28.5 + 5 * Math.sin(a)).toFixed(2)}" x2="${(30 + 27 * Math.cos(a)).toFixed(2)}" y2="${(28.5 + 27 * Math.sin(a)).toFixed(2)}"/>`;
  }).join("");
  const top = table ? 26 : 2;
  return `${open}
          ${table ? airBox("fn-pole", 46, 52, 4, 46) + airBox("fn-foot", 33, 96, 30, 7) : airBox("fn-pole", 46, 28, 4, 70) + airBox("fn-foot", 29, 96, 38, 8)}
          ${airBox("fn-head", 21, top, 54, 52, `<svg width="54" height="52" viewBox="0 0 60 58">${fanBlades(30, 28.5, 3, 23, 10, 0)}`
            + `<g class="fn-cage"><circle class="rim" cx="30" cy="28.5" r="27"/><circle cx="30" cy="28.5" r="18"/><circle cx="30" cy="28.5" r="9"/>${spokes}</g>`
            + `<circle class="fn-hub" cx="30" cy="28.5" r="5"/></svg>`)}
          ${windLines("r", 72, top + 4, 24, 44, "side")}${windLines("l", 0, top + 4, 24, 44, "side")}
        </div>`;
}

// A hair dryer seen from the side, nozzle to the right, or a ring dryer seen
// from the front. The air leaves the nozzle in a fan of lines, or the ring in
// widening circles: blue while cool, orange while hot, more of it on high.
function hairDryerHtml(cls, hd) {
  const mode = hd.mode || "off";
  const level = hd.level || 0;
  const defs = `<defs>
            <linearGradient id="hd-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="hd-s-hi"/><stop offset="1" class="hd-s-body"/></linearGradient>
            <linearGradient id="hd-air" gradientUnits="userSpaceOnUse" x1="72" y1="0" x2="96" y2="0"><stop offset="0" class="hd-a0"/><stop offset="1" class="hd-a1"/></linearGradient>
            <radialGradient id="hd-heat"><stop offset="0" stop-color="#ffb74d"/><stop offset="1" stop-color="#ff5722" stop-opacity="0"/></radialGradient>
            <radialGradient id="hd-rheat"><stop offset="0.55" stop-color="#ff5722" stop-opacity="0"/><stop offset="0.8" stop-color="#ff9800" stop-opacity="0.9"/><stop offset="1" stop-color="#ff5722" stop-opacity="0"/></radialGradient>
          </defs>`;
  if (hd.layout === "ring") {
    const ring = "M20 34a22 22 0 1 0 44 0a22 22 0 1 0 -44 0ZM30 34a12 12 0 1 1 24 0a12 12 0 1 1 -24 0Z";
    const circles = level ? Array.from({ length: level >= 3 ? 3 : 2 }, (_, i) =>
      `<circle cx="42" cy="34" r="24" style="animation-delay: calc(${(i * 0.45).toFixed(2)}s + var(--anim-offset, 0s))"/>`).join("") : "";
    return `
        <div class="machine ${cls} hd-ring mode-${mode}">
          <svg class="hd-svg" viewBox="0 0 96 108">${defs}
            <g class="hd-rings">${circles}</g>
            <path class="hd-part" d="M36 52L48 52L50 96Q50 101 45 101L39 101Q34 101 34 96Z"/>
            ${[0, 1, 2, 3, 4].map((i) => `<line class="hd-grip" x1="36.5" y1="${80 + i * 3.5}" x2="47.5" y2="${80 + i * 3.5}"/>`).join("")}
            <circle class="hd-led" cx="42" cy="62" r="1.8"/><rect class="hd-btn" x="39.5" y="66" width="5" height="8" rx="2.5"/>
            <path class="hd-part" fill-rule="evenodd" d="${ring}"/>
            <path class="hd-heat" fill-rule="evenodd" fill="url(#hd-rheat)" d="${ring}"/>
            <circle class="hd-inner" cx="42" cy="34" r="17"/>
          </svg>
        </div>`;
  }
  // The lines start at the mouth of the nozzle and fan out to the edge.
  const lines = [];
  for (let i = 0; i < level; i++) {
    const f = level === 1 ? 0.5 : i / (level - 1);
    const y0 = (24.5 + f * 10).toFixed(1);
    const y1 = (17 + f * 25).toFixed(1);
    lines.push(`<path d="M72.5 ${y0}C80 ${y0} 86 ${y1} 95 ${y1}" style="animation-delay: calc(${(-i * 0.17).toFixed(2)}s + var(--anim-offset, 0s))"/>`);
  }
  return `
        <div class="machine ${cls} hd-pistol mode-${mode}">
          <svg class="hd-svg" viewBox="0 0 96 108">${defs}
            <g transform="translate(-2 2) scale(0.9)">
              <path class="hd-part" d="M40 46L50 46L56 92Q56 98 50 98L44 98Q38 98 38 92Z"/>
              <rect class="hd-btn" x="44.5" y="58" width="5" height="11" rx="2.5"/><circle class="hd-led" cx="47" cy="75" r="1.8"/>
              <path class="hd-cord" d="M47 98q0 6 -6 9"/>
              <rect class="hd-part" x="8" y="14" width="58" height="34" rx="16"/>
              <path class="hd-nozzle" d="M64 18L80 22Q82 23 82 25L82 35Q82 37 80 38L64 44Z"/>
              <ellipse class="hd-heat" cx="76" cy="30" rx="7" ry="9" fill="url(#hd-heat)"/>
              <rect class="hd-btn" x="80" y="23" width="2.5" height="14" rx="1"/>
              <circle class="hd-grille" cx="14" cy="31" r="10"/>
              ${[0, 1, 2].map((i) => `<line class="hd-grip" x1="${9 + i * 5}" y1="24" x2="${9 + i * 5}" y2="38"/>`).join("")}
            </g>
            <g class="hd-air" stroke="url(#hd-air)">${lines.join("")}</g>
          </svg>
        </div>`;
}

// The LEDs of one device do not blink in step.
function ntDelay(i, step, mod) {
  return `animation-delay: calc(-${((i * step) % mod).toFixed(2)}s + var(--anim-offset, 0s))`;
}

// A switch: its ports in one or two rows, the first `lit` of them up. A real
// one numbers them odd on top and even below, with the LEDs of the bottom row
// under its ports.
function ntSwitch(n, lit) {
  const rows = n <= 8 ? 1 : 2, per = n / rows, x0 = 14, span = 79, pitch = span / per;
  const pw = +(pitch * 0.78).toFixed(2), ph = n >= 32 ? 5 : 6, lw = Math.max(1, +(pw * 0.32).toFixed(2));
  const top = rows === 1 ? 42 : 33, h = rows === 1 ? 24 : 38, ys = rows === 1 ? [51] : [42, 55];
  let html = `<div class="nt-body" style="left:0;top:${top}px;width:96px;height:${h}px"></div>
          <div class="nt-hi" style="left:4px;top:${top + 2.5}px;width:88px"></div>
          <div class="nt-led nt-pw" style="left:5px;top:${top + 7}px"></div>
          <div class="nt-led" style="left:5px;top:${top + 13}px"></div>`;
  for (let i = 0; i < n; i++) {
    const r = rows === 1 ? 0 : i % 2, c = rows === 1 ? i : Math.floor(i / 2);
    const x = +(x0 + c * pitch + (pitch - pw) / 2).toFixed(2), ly = r === 0 ? -2.4 : ph + 0.9;
    html += `<div class="nt-port${i < lit ? " up" : ""}" style="left:${x}px;top:${ys[r]}px;width:${pw}px;height:${ph}px">`
      + `<i class="a" style="left:0.2px;top:${ly}px;width:${lw}px"></i>`
      + `<i class="b" style="right:0.2px;top:${ly}px;width:${lw}px;${ntDelay(i, 0.37, 1.3)}"></i></div>`;
  }
  return `${html}<div class="nt-vent" style="left:${x0}px;top:${top + h - 4}px;width:${span}px;height:2.5px"></div>
          <div class="nt-floor" style="left:6px;width:84px;top:${top + h}px"></div>`;
}

// A NAS seen from the front, the way Synology draws theirs: the LEDs down the
// left, one per bay, then the bays. An empty bay has no tray and its LED stays
// dark.
function ntNas(bays, disks) {
  const tw = 13, gap = 2, strip = 11, w = strip + bays * tw + (bays - 1) * gap + 6, h = 74;
  const x = Math.round((96 - w) / 2), y = 104 - h - 4;
  const leds = ["nt-pw", "nt-lan"].concat(Array.from({ length: bays }, (_, i) => `d-${disks[i] || "gen"}`));
  let html = `<div class="nt-body" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:4px"></div>`;
  html += leds.map((k, i) => `<div class="nt-led ${k}" style="left:${x + 4}px;top:${y + 8 + i * 6}px;${ntDelay(i, 0.45, 2.8)}"></div>`).join("");
  html += `<div class="nt-led" style="left:${x + 4}px;top:${y + 8 + leds.length * 6}px"></div>
          <div class="nt-key" style="left:${x + 2.5}px;top:${y + h - 11}px;width:6px;height:6px"></div>`;
  for (let i = 0; i < bays; i++) {
    const tx = x + strip + i * (tw + gap);
    html += `<div class="nt-bay" style="left:${tx}px;top:${y + 5}px;width:${tw}px;height:${h - 10}px"></div>`;
    if (disks[i] !== "empty") {
      html += `<div class="nt-handle" style="left:${tx + 3}px;top:${y + 8}px;width:${tw - 6}px;height:3px"></div>
          <div class="nt-tray" style="left:${tx + 3}px;top:${y + 16}px;width:${tw - 6}px;height:${h - 28}px"></div>`;
    }
  }
  return `${html}<div class="nt-floor" style="left:${x + 4}px;width:${w - 8}px;top:${y + h}px"></div>`;
}

// A server tower: four drive bays, a fan behind its grille and the power
// button.
function ntServer(disks, fanOff) {
  let html = `<div class="nt-body" style="left:28px;top:6px;width:40px;height:98px"></div>
          <div class="nt-vent" style="left:33px;top:11px;width:30px;height:12px"></div>`;
  for (let i = 0; i < 4; i++) {
    const y = 28 + i * 13;
    html += `<div class="nt-bay" style="left:33px;top:${y}px;width:30px;height:10px"></div>`;
    if (disks[i] !== "empty") html += `<div class="nt-handle" style="left:36px;top:${y + 4}px;width:14px;height:1.4px"></div>`;
    html += `<div class="nt-led d-${disks[i] || "gen"}" style="left:58px;top:${y + 3.5}px;${ntDelay(i, 0.6, 2.8)}"></div>`;
  }
  return `${html}<div class="nt-fan${fanOff ? " stop" : ""}" style="left:38px;top:81px;width:20px;height:20px"></div>
          <div class="nt-key" style="left:59px;top:84px;width:6px;height:6px"></div>
          <div class="nt-led nt-pw" style="left:60.7px;top:85.7px"></div>
          <div class="nt-led" style="left:60.7px;top:94px"></div>
          <div class="nt-floor" style="left:24px;width:48px;bottom:0"></div>`;
}

// A rack behind its glass door: fans on top, a patch panel, a switch, a NAS
// and a server.
function ntRack(fanOff) {
  const fan = fanOff ? " stop" : "";
  const ports = [1, 1, 1, 0, 1, 1].map((up, i) => `<div class="nt-port${up ? " up" : ""}" style="left:${30 + i * 7}px;top:41.5px;width:5.5px;height:5px">`
    + `<i class="a" style="left:0.2px;top:-2.4px;width:1.6px"></i><i class="b" style="right:0.2px;top:-2.4px;width:1.6px;${ntDelay(i, 0.37, 1.3)}"></i></div>`).join("");
  const bays = [0, 1, 2].map((i) => `<div class="nt-bay" style="left:${24 + i * 15}px;top:52px;width:13px;height:12px"></div>`
    + `<div class="nt-led d-gen" style="left:${33 + i * 15}px;top:54px;${ntDelay(i, 0.5, 2.8)}"></div>`).join("");
  const jacks = Array.from({ length: 8 }, (_, i) => `<div class="nt-jack" style="left:${25 + i * 6}px;top:27px;width:4px;height:3px"></div>`).join("");
  return `<div class="nt-body" style="left:14px;top:2px;width:68px;height:102px"></div>
          <div class="nt-dark" style="left:19px;top:7px;width:58px;height:92px"></div>
          <div class="nt-fan${fan}" style="left:28px;top:9px;width:11px;height:11px"></div>
          <div class="nt-fan${fan}" style="left:57px;top:9px;width:11px;height:11px"></div>
          <div class="nt-u" style="left:21px;top:24px;width:54px;height:9px"></div>${jacks}
          <div class="nt-u" style="left:21px;top:35px;width:54px;height:11px"></div>
          <div class="nt-led nt-pw" style="left:24px;top:39px"></div>${ports}
          <div class="nt-u" style="left:21px;top:49px;width:54px;height:18px"></div>${bays}
          <div class="nt-led nt-pw" style="left:70px;top:53px"></div>
          <div class="nt-led" style="left:70px;top:59px"></div>
          <div class="nt-u" style="left:21px;top:70px;width:54px;height:12px"></div>
          <div class="nt-vent" style="left:24px;top:73px;width:30px;height:6px"></div>
          <div class="nt-led nt-lan" style="left:70px;top:75px"></div>
          <div class="nt-u" style="left:21px;top:85px;width:54px;height:11px;opacity:0.55"></div>
          <div class="nt-glass" style="left:19px;top:7px;width:58px;height:92px"></div>
          <div class="nt-handle" style="left:78px;top:46px;width:2px;height:14px;background:#8a929c"></div>
          <div class="nt-floor" style="left:10px;width:76px;bottom:0"></div>`;
}

// A router or an ISP's box, flat on the shelf with its antennas up: the power,
// internet and Wi-Fi lights, then one per LAN port. The Wi-Fi waves rise from
// it while it is up, faster when it is busy, and not at all with its Wi-Fi off.
// A lost internet link puts it in alert, every light red.
function ntRouter() {
  const waves = [[42, 52, 12], [36, 46, 24], [30, 40, 36]].map(([top, l, w], i) =>
    `<div class="nt-wave" style="left:${48 - w / 2}px;top:${top}px;width:${w}px;height:${w}px;${ntDelay(i, 0.3, 2.4)}"></div>`).join("");
  const lan = [0, 1, 2, 3].map((i) => `<div class="nt-led nt-lan" style="left:${56 + i * 6}px;top:83px;${ntDelay(i, 0.45, 2.4)}"></div>`).join("");
  return `${waves}
          <div class="nt-ant" style="left:20px;top:46px;width:3.5px;height:30px;transform:rotate(-8deg)"></div>
          <div class="nt-ant" style="left:72.5px;top:46px;width:3.5px;height:30px;transform:rotate(8deg)"></div>
          <div class="nt-ant" style="left:46px;top:52px;width:3.5px;height:24px"></div>
          <div class="nt-body" style="left:10px;top:74px;width:76px;height:20px;border-radius:6px"></div>
          <div class="nt-hi" style="left:16px;top:76px;width:64px"></div>
          <div class="nt-led nt-pw" style="left:18px;top:83px"></div>
          <div class="nt-led nt-wan" style="left:26px;top:83px"></div>
          <div class="nt-led nt-wl" style="left:34px;top:83px"></div>${lan}
          <div class="nt-vent" style="left:18px;top:89px;width:60px;height:2px"></div>
          <div class="nt-floor" style="left:8px;width:80px;top:94px"></div>`;
}

function networkHtml(cls, n) {
  const layout = NET_LAYOUTS.includes(n.layout) ? n.layout : "nas";
  const disks = n.disks || [];
  const inner = layout === "switch" ? ntSwitch(n.ports || 8, n.lit || 0)
    : layout === "server" ? ntServer(disks, n.fanOff)
      : layout === "rack" ? ntRack(n.fanOff)
        : layout === "router" ? ntRouter()
          : ntNas(n.bays || 2, disks);
  return `
        <div class="machine ${cls} nt nt-${n.mode || "off"} nt-l-${layout}${n.wifiOff ? " nt-nowifi" : ""}">${inner}
        </div>`;
}

// A pool pump's drawing: the sand filter on the left with its valve and its
// gauge, the pump in front of the pool, the pipes between them, and the tank
// and long tube of a chlorine dosing pump when there is one. The water flows
// while the pump filters, a jet turns in the strainer, the gauge reads the
// pressure. A backwash sends the dirty water to the drain, never to the pool.
const POOL_SVG = `<svg class="pl-pp" viewBox="0 -6 96 108">
<defs>
<linearGradient id="pl-g-body" x1="0" x2="1"><stop offset="0" stop-color="var(--bl)"/><stop offset=".25" stop-color="var(--b)"/><stop offset=".45" stop-color="var(--bh)"/><stop offset=".7" stop-color="var(--b)"/><stop offset="1" stop-color="var(--bl)"/></linearGradient>
<linearGradient id="pl-g-motor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#555d65"/><stop offset=".35" stop-color="#3a4147"/><stop offset="1" stop-color="#1f2327"/></linearGradient>
<linearGradient id="pl-g-alu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f3"/><stop offset=".35" stop-color="#c4cbd1"/><stop offset="1" stop-color="#7d868e"/></linearGradient>
<linearGradient id="pl-g-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3e5fc"/><stop offset="1" stop-color="#29b6f6"/></linearGradient>
<linearGradient id="pl-g-pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fc3f7"/><stop offset="1" stop-color="#0288d1"/></linearGradient>
<radialGradient id="pl-g-glow"><stop offset="0" stop-color="#fff59d" stop-opacity=".95"/><stop offset="1" stop-color="#fff59d" stop-opacity="0"/></radialGradient>
</defs>
<ellipse cx="48" cy="94.6" rx="46" ry="2.6" fill="rgba(0,0,0,.18)"/>
<path d="M57 1 H95 L97 22 H55 Z" fill="#e7e1d3" stroke="#c9c1ae" stroke-width=".6"/>
<path class="pl-pool" d="M60 4 H92 L93.4 19.5 H58.6 Z"/>
<path d="M60 4 H92 L91.2 7.2 H60.8 Z" fill="rgba(0,60,110,.38)"/>
<ellipse class="pl-glow" cx="76" cy="10" rx="13" ry="9" fill="url(#pl-g-glow)"/>
<path class="pl-rip" d="M63 8.5 q2.5 -1.2 5 0 t5 0 t5 0 t5 0 t5 0"/><path class="pl-rip" d="M63 13 q2.5 -1.2 5 0 t5 0 t5 0 t5 0 t5 0" style="animation-delay:-.8s"/>
<ellipse class="pl-spot" cx="76" cy="5.7" rx="2.6" ry="1.4"/><ellipse cx="76" cy="5.7" rx="1.1" ry=".6" fill="rgba(255,255,255,.65)"/>
<path d="M84 3 Q84 0 86 0 Q88 0 88 3 V13 M88.5 3 Q88.5 0 90.5 0 Q92.5 0 92.5 3 V13" fill="none" stroke="#b7c0c7" stroke-width="1.1"/>
<path d="M88 7 H92.5 M88 10.5 H92.5" stroke="#b7c0c7" stroke-width=".9"/>
<path class="pl-pvc-o" d="M13 26 H8 Q5.5 26 5.5 23.5 V8.5 Q5.5 6 8 6 H55"/><path class="pl-pvc" d="M13 26 H8 Q5.5 26 5.5 23.5 V8.5 Q5.5 6 8 6 H55"/>
<path class="pl-pvc-o" d="M31 26 H36 Q40 26 40 30 V36 Q40 40 44 40 H59.5 Q63.5 40 63.5 44 V53"/><path class="pl-pvc" d="M31 26 H36 Q40 26 40 30 V36 Q40 40 44 40 H59.5 Q63.5 40 63.5 44 V53"/>
<path d="M15 31 H4.5 Q2.2 31 2.2 33.3 V93" fill="none" stroke="#8e979f" stroke-width="4.6"/><path d="M15 31 H4.5 Q2.2 31 2.2 33.3 V93" fill="none" stroke="#bfc6cc" stroke-width="3.2"/>
<rect x="-2.3" y="92.6" width="9" height="3" rx=".8" fill="#2b3137"/><path d="M-.8 94.1 H5.2" stroke="#596169" stroke-width=".7" stroke-dasharray="1 .8"/>
<path class="pl-flow pl-o" d="M63.5 53 V44 Q63.5 40 59.5 40 H44 Q40 40 40 36 V30 Q40 26 36 26 H31"/>
<path class="pl-flow pl-r" d="M13 26 H8 Q5.5 26 5.5 23.5 V8.5 Q5.5 6 8 6 H55"/>
<path class="pl-flow pl-w" d="M15 31 H4.5 Q2.2 31 2.2 33.3 V93"/>
<rect class="pl-pvc-j" x="30" y="3.1" width="3" height="5.8" rx=".8"/>
<rect x="53.6" y="1.6" width="3.6" height="8.8" rx="1" fill="#b6bec5" stroke="#7d868e" stroke-width=".7"/><circle cx="55.4" cy="3.3" r=".45" fill="#7d868e"/><circle cx="55.4" cy="8.7" r=".45" fill="#7d868e"/>
<ellipse cx="61.6" cy="6" rx="1.2" ry="1.6" fill="#e9eef1" stroke="#9aa3ab" stroke-width=".5"/>
<g class="pl-ice"><path d="M10 3.5 l2 -2 M20 4 l1.5 -2.5 M38 3.5 l2 -2.4 M46 4 l1.5 -2.5 M54 3.5 l2 -2.4 M48 37.5 l1.5 -2.5 M58 38 l2 -2.4 M66 47 l2 -1.5" stroke="#e1f5fe" stroke-width="1.2" stroke-linecap="round"/></g>
<rect class="pl-body-d" x="6" y="87" width="32" height="7" rx="2"/>
<path class="pl-body" d="M8 41 Q8 31 22 30 Q36 31 36 41 L36 89 Q22 92 8 89 Z"/>
<path class="pl-ring" d="M8 52 Q22 55 36 52 M8 76 Q22 79 36 76"/>
<g class="pl-sand"><circle cx="15" cy="70" r="1.3"/><circle cx="22" cy="66" r="1.1"/><circle cx="29" cy="71" r="1.3"/></g>
<rect x="11" y="23" width="3" height="6" rx="1" fill="var(--bl)"/><rect x="30" y="23" width="3" height="6" rx="1" fill="var(--bl)"/>
<rect x="14" y="20.5" width="16" height="10" rx="2.5" fill="#2b3137"/>
<rect x="12" y="16.5" width="20" height="3.2" rx="1.6" fill="#1f2428"/><rect x="20.5" y="18.5" width="3" height="3" fill="#1f2428"/>
<path d="M30 20.5 L33 17.5" stroke="#8e979f" stroke-width="1.2"/>
<circle cx="34" cy="14.5" r="4.6" fill="#f5f6f7" stroke="#8e979f" stroke-width=".9"/>
<path d="M30.8 14.5 A3.2 3.2 0 0 1 37.2 14.5" fill="none" stroke="#c0c6cb" stroke-width=".6"/>
<path class="pl-needle" d="M34 14.5 L34 11.5"/><circle cx="34" cy="14.5" r=".7" fill="#333"/>
<path class="pl-pvc-o" d="M41.5 73 H41 Q39 73 39 75 V95"/><path class="pl-pvc" d="M41.5 73 H41 Q39 73 39 75 V95"/>
<path class="pl-flow pl-s" d="M39 95 V75 Q39 73 41 73 H41.5"/>
<ellipse cx="39" cy="95" rx="3.6" ry="1" fill="#2b3137"/>
<g class="pl-cl"><path class="pl-tube" d="M74 46 V36.5 Q74 34 71.5 34 H52.5 Q50 34 50 31.5 V8.4"/>
<path class="pl-drip" d="M74 46 V36.5 Q74 34 71.5 34 H52.5 Q50 34 50 31.5 V8.4"/>
<rect x="48.3" y="7.6" width="3.4" height="2.4" rx=".6" fill="#2b3137"/>
<path class="pl-can" d="M69 47 h10 a1.5 1.5 0 0 1 1.5 1.5 v10 a1.5 1.5 0 0 1 -1.5 1.5 h-10 a1.5 1.5 0 0 1 -1.5 -1.5 v-10 a1.5 1.5 0 0 1 1.5 -1.5z"/>
<rect class="pl-can-l" x="68.1" y="52" width="11.8" height="7.5" rx="1"/><rect x="72.6" y="45.2" width="2.8" height="2.2" rx=".6" fill="#ef6c00"/>
<circle class="pl-can-led" cx="70.4" cy="49" r=".9"/></g>
<path d="M44 89 H61 V93.5 H44 Z M70 88 H90 L91 93.5 H69 Z" fill="#1d2125"/>
<path class="pl-body" d="M44 66 H61 V86 Q61 90.5 56 90.5 H49 Q44 90.5 44 86 Z"/>
<path d="M44.5 77.5 H60.5 M44.5 80.5 H60.5 M44.5 83.5 H60.5 M45 86.5 H60" stroke="rgba(0,0,0,.45)" stroke-width=".8"/>
<path d="M44.5 78.3 H60.5 M44.5 81.3 H60.5 M44.5 84.3 H60.5" stroke="rgba(255,255,255,.08)" stroke-width=".5"/>
<rect class="pl-body" x="40.5" y="69.5" width="5" height="7" rx="1"/><rect x="39.8" y="69" width="1.8" height="8" rx=".6" fill="#aeb6bd"/>
<path d="M42.6 62 H62.4 V66.4 H42.6 Z" fill="#23282d"/>
<path d="M44 62 V56 Q44 50.5 52.5 50.5 Q61 50.5 61 56 V62 Z" fill="rgba(220,235,245,.5)" stroke="#9fb0bd" stroke-width=".8"/>
<rect class="pl-lid-water" x="44.8" y="54" width="15.4" height="8" rx="1.2"/>
<path d="M47 55 V61.5 M50.5 55 V61.5 M54 55 V61.5 M57.5 55 V61.5" stroke="rgba(255,255,255,.4)" stroke-width=".6"/>
<path d="M47.5 51.8 Q52.5 49.6 57.5 51.8 M49 51.2 V53.4 M52.5 50.6 V53 M56 51.2 V53.4" fill="none" stroke="rgba(255,255,255,.85)" stroke-width=".7"/>
<g class="pl-swirl"><path d="M52.5 61.5 V54.2"/><path d="M52.5 54.2 Q49 53 47.4 60"/><path d="M52.5 54.2 Q56 53 57.6 60"/><path d="M52.5 54.8 Q50.6 54.6 49.8 60.5"/><path d="M52.5 54.8 Q54.4 54.6 55.2 60.5"/></g>
<path class="pl-body" d="M59 62 H67.5 Q71 62 71 66 V90.5 H59 Z"/>
<circle cx="65" cy="77" r="6" fill="none" stroke="var(--bl)" stroke-width=".8" opacity=".6"/>
<rect class="pl-body" x="60.6" y="52.5" width="5.8" height="10" rx=".8"/><rect x="60.2" y="51.6" width="6.6" height="2.4" rx=".6" fill="#aeb6bd"/>
<rect x="70" y="69" width="2.5" height="18" rx=".6" fill="#23282d"/>
<rect x="72" y="68" width="15" height="20" rx="2" fill="url(#pl-g-alu)"/>
<path d="M72.5 71 H86.5 M72.5 73.5 H86.5 M72.5 76 H86.5 M72.5 78.5 H86.5 M72.5 81 H86.5 M72.5 83.5 H86.5 M72.5 86 H86.5" stroke="rgba(60,70,78,.55)" stroke-width=".55"/>
<path d="M86.5 69 H90 Q93.5 69 93.5 73 V83 Q93.5 87 90 87 H86.5 Z" fill="#1d2125"/>
<path d="M89.5 70.5 V85.5 M91.5 71.5 V84.5" stroke="#3b4248" stroke-width=".6"/>
<rect x="73" y="62.5" width="11" height="6" rx="1" fill="#22272b"/><circle cx="75" cy="64.3" r=".5" fill="#69727a"/><circle cx="82" cy="64.3" r=".5" fill="#69727a"/>
<circle class="pl-led" cx="78.5" cy="65.6" r=".9"/>
<g class="pl-snow" transform="translate(89 42)"><path d="M0 -4.5 V4.5 M-3.9 -2.25 L3.9 2.25 M-3.9 2.25 L3.9 -2.25 M-1.2 -3.4 L0 -2.4 L1.2 -3.4 M-1.2 3.4 L0 2.4 L1.2 3.4" stroke="#4fc3f7" stroke-width="1.2" stroke-linecap="round" fill="none"/></g>
<g transform="translate(79 43) scale(.55)"><g class="pl-smoke"><g class="pl-pf pl-pf1"><circle class="pl-o" cx="13" cy="23" r="6.9"/><circle class="pl-o" cx="20" cy="18" r="7.9"/><circle class="pl-o" cx="27" cy="22" r="6.4"/><circle class="pl-o" cx="17" cy="12" r="5.9"/><circle class="pl-o" cx="24" cy="11" r="5.4"/><circle class="pl-f" cx="13" cy="23" r="5.5"/><circle class="pl-f" cx="20" cy="18" r="6.5"/><circle class="pl-f" cx="27" cy="22" r="5"/><circle class="pl-f" cx="17" cy="12" r="4.5"/><circle class="pl-f" cx="24" cy="11" r="4"/><path class="pl-hl" d="M15 9 q2 -2 4 -1 M17 15 q2 -2.5 5 -1.5"/></g><g class="pl-pf pl-pf2"><circle class="pl-o" cx="9.049999999999999" cy="21.55" r="6.074999999999999"/><circle class="pl-o" cx="15" cy="17.299999999999997" r="6.924999999999999"/><circle class="pl-o" cx="20.95" cy="20.7" r="5.65"/><circle class="pl-o" cx="12.45" cy="12.2" r="5.225"/><circle class="pl-o" cx="18.4" cy="11.35" r="4.8"/><circle class="pl-f" cx="9.049999999999999" cy="21.55" r="4.675"/><circle class="pl-f" cx="15" cy="17.299999999999997" r="5.5249999999999995"/><circle class="pl-f" cx="20.95" cy="20.7" r="4.25"/><circle class="pl-f" cx="12.45" cy="12.2" r="3.8249999999999997"/><circle class="pl-f" cx="18.4" cy="11.35" r="3.4"/><path class="pl-hl" d="M10.75 9.649999999999999 q2 -2 4 -1 M12.45 14.75 q2 -2.5 5 -1.5"/></g></g></g><g transform="translate(89.5 63.5)"><g class="pl-ang"><path d="M3.5 1.5 Q3.5 4 1 4"/><path d="M6 1.5 Q6 4 8.5 4"/><path d="M3.5 9.5 Q3.5 7 1 7"/><path d="M6 9.5 Q6 7 8.5 7"/></g></g>
</svg>`;
function poolHtml(cls, p) {
  const mode = p.mode || "off";
  let svg = POOL_SVG;
  if (p.needle !== null && p.needle !== undefined && mode !== "error") {
    svg = svg.replace('<path class="pl-needle"', `<path class="pl-needle" style="transform: rotate(${p.needle}deg)"`);
  }
  if (p.can !== null && p.can !== undefined) {
    const h = Math.round(7.5 * Math.max(0, Math.min(100, p.can))) / 100;
    svg = svg.replace('<rect class="pl-can-l" x="68.1" y="52" width="11.8" height="7.5"',
      `<rect class="pl-can-l" x="68.1" y="${Math.round((59.5 - h) * 100) / 100}" width="11.8" height="${h}"`);
  }
  return `
        <div class="machine ${cls} pl pl-m-${mode}${p.dosing ? " pl-chlore" : ""}${p.lit ? " pl-lamp" : ""}${p.chlorine ? "" : " pl-nocl"}">${svg}</div>`;
}

// The drawings of the panels and the battery, built once: only their classes
// change with what they do, and the battery's level and reserve.
const ENERGY_SMOKE = (x, y, k) => {
  const C = [[13, 23, 5.5], [20, 18, 6.5], [27, 22, 5], [17, 12, 4.5], [24, 11, 4]];
  const puff = (c, dx, dy, kk) => `<g class="en-pf ${c}">${C.map(([cx, cy, r]) => `<circle class="en-o" cx="${(cx * kk + dx).toFixed(1)}" cy="${(cy * kk + dy).toFixed(1)}" r="${(r * kk + 1.4).toFixed(1)}"/>`).join("")}${C.map(([cx, cy, r]) => `<circle class="en-f" cx="${(cx * kk + dx).toFixed(1)}" cy="${(cy * kk + dy).toFixed(1)}" r="${(r * kk).toFixed(1)}"/>`).join("")}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${k})"><g class="en-smoke">${puff("en-pf1", 0, 0, 1)}${puff("en-pf2", -2, 2, 0.85)}</g></g>`;
};
const ENERGY_ANGER = (x, y) => `<g transform="translate(${x} ${y})"><g class="en-ang"><path d="M3.5 1.5 Q3.5 4 1 4"/><path d="M6 1.5 Q6 4 8.5 4"/><path d="M3.5 9.5 Q3.5 7 1 7"/><path d="M6 9.5 Q6 7 8.5 7"/></g></g>`;
const ENERGY_SKY = `<g class="en-sun"><g class="en-rays"><path d="M18 3 V7 M18 29 V33 M3 18 H7 M29 18 H33 M7.4 7.4 L10.2 10.2 M25.8 25.8 L28.6 28.6 M7.4 28.6 L10.2 25.8 M25.8 10.2 L28.6 7.4" stroke="#ffb300" stroke-width="2" stroke-linecap="round"/></g><circle cx="18" cy="18" r="7.5" fill="#ffca28"/></g>
<g class="en-clouds"><g class="en-cloud"><path d="M16 26 C10 26 10 19 15 18.5 C15 13 23 12 25 16.5 C28 14 33 16.5 32 21 C36 21 36 26 32 26 Z" fill="#cfd8dc" stroke="#9aa6ad" stroke-width=".7"/></g>
<g class="en-cloud en-c2"><path d="M52 18 C47 18 47 12 51.5 11.5 C52 7 58.5 6.5 60 10.5 C62.5 8.5 67 10.5 66 14 C69.5 14 69.5 18 66 18 Z" fill="#e3e9ec" stroke="#a9b4ba" stroke-width=".6"/></g></g>
<g class="en-moon"><path d="M22 6 A11 11 0 1 0 30 24 A8.5 8.5 0 1 1 22 6 Z" fill="#fff3c4" stroke="#e0c97a" stroke-width=".6"/></g>
<g class="en-stars"><circle cx="48" cy="9" r="1"/><circle cx="64" cy="18" r=".9"/><circle cx="78" cy="7" r="1.1"/></g>`;
const SOLAR_SVGS = (() => {
  const L = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  const f1 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  // A panel: its aluminium frame, its dark blue glass and its grid of cells.
  const panel = (tl, tr, br, bl, cols, rows) => {
    let d = "";
    for (let i = 1; i < cols; i++) d += `M${f1(L(tl, tr, i / cols))} L${f1(L(bl, br, i / cols))} `;
    for (let j = 1; j < rows; j++) d += `M${f1(L(tl, bl, j / rows))} L${f1(L(tr, br, j / rows))} `;
    return `<path d="M${f1(tl)} L${f1(tr)} L${f1(br)} L${f1(bl)} Z" fill="url(#en-cell)" stroke="#d5dbe0" stroke-width="1.2" stroke-linejoin="round"/><path d="${d.trim()}" stroke="#6f8fb5" stroke-opacity=".55" stroke-width=".45"/>`;
  };
  const Q = (q, u, v) => L(L(q[0], q[1], u), L(q[3], q[2], u), v);
  const grid = (q, nc, nr, gap, cols, rows) => {
    let o = "";
    for (let c = 0; c < nc; c++) {
      for (let r = 0; r < nr; r++) {
        const u0 = c / nc + gap / 2, u1 = (c + 1) / nc - gap / 2, v0 = r / nr + gap / 2, v1 = (r + 1) / nr - gap / 2;
        o += panel(Q(q, u0, v0), Q(q, u1, v0), Q(q, u1, v1), Q(q, u0, v1), cols, rows);
      }
    }
    return o;
  };
  const defs = `<defs><linearGradient id="en-cell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34598a"/><stop offset=".55" stop-color="#1d3a62"/><stop offset="1" stop-color="#152a47"/></linearGradient>
<linearGradient id="en-shineg" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="en-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9dfcb"/><stop offset="1" stop-color="#ddd1b8"/></linearGradient>
<linearGradient id="en-tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b84d36"/><stop offset="1" stop-color="#cf6648"/></linearGradient></defs>`;
  // Two panels on their frame on the ground, seen from the front, tilted to the sky.
  const ground = `<svg class="en-e" viewBox="0 0 96 108">${defs}${ENERGY_SKY}
<ellipse cx="48" cy="98.5" rx="42" ry="3" fill="rgba(0,0,0,.14)"/>
<path d="M27 74 V96 M69 74 V96" stroke="#7d868e" stroke-width="2"/>
<path d="M27 86 L16 74 M69 86 L80 74" stroke="#7d868e" stroke-width="1.3"/>
<path d="M15 74 V97 M81 74 V97" stroke="#aeb6bd" stroke-width="2.4" stroke-linecap="round"/>
<path d="M11 97 H22 M74 97 H85" stroke="#8b939a" stroke-width="2" stroke-linecap="round"/>
<path d="M9.5 74.8 H86.5" stroke="#9aa3aa" stroke-width="2"/>
${grid([[20, 44], [76, 44], [85, 74], [11, 74]], 2, 1, 0.018, 4, 6)}
<clipPath id="en-pc"><path d="M20 44 L76 44 L85 74 L11 74 Z"/></clipPath>
<g clip-path="url(#en-pc)"><path class="en-shine" d="M32 40 L42 40 L30 78 L20 78 Z" fill="url(#en-shineg)"/></g>
<path class="en-wire" d="M48 75 V82"/><rect x="41" y="81" width="14" height="10" rx="1.6" fill="#3a4148" stroke="#262b30" stroke-width=".6"/><path d="M43.5 84 H52.5 M43.5 86 H52.5" stroke="#566069" stroke-width=".6"/><circle class="sol-led" cx="52" cy="88.6" r="1"/>
<path class="en-wire" d="M55 86 H61 Q64 86 64 89 V97 H100"/><path class="sol-ef" d="M48 75 V82 M55 86 H61 Q64 86 64 89 V97 H100"/>
${ENERGY_SMOKE(37, 64, 0.55)}${ENERGY_ANGER(53, 76)}</svg>`;
  // A house seen three quarters on: the slope of its roof towards us carries
  // the panels, and the energy goes into the house's electrical panel.
  const R = [[24, 44], [80, 44], [95, 66], [39, 66]];
  const tiles = [49.5, 54, 58.5, 63].map((y) => {
    const k = (y - 44) / 22;
    return `M${(24 + 15 * k).toFixed(1)} ${y} H${(80 + 15 * k).toFixed(1)}`;
  }).join(" ");
  const roof = `<svg class="en-e" viewBox="0 0 96 108">${defs}${ENERGY_SKY}
<ellipse cx="52" cy="99.5" rx="44" ry="2.6" fill="rgba(0,0,0,.14)"/>
<rect x="67" y="34" width="7" height="12" fill="#a4553f" stroke="#7d3a29" stroke-width=".6"/><rect x="66" y="32.5" width="9" height="2.5" rx=".5" fill="#7d3a29"/>
<rect x="38" y="64" width="53" height="34" fill="url(#en-wall)" stroke="#bfb196" stroke-width=".7"/>
<path d="M12 98 V64 L24 47 L37 64 V98 Z" fill="#f6eedf" stroke="#cbbfa6" stroke-width=".7" stroke-linejoin="round"/>
<path d="M9.5 66.5 L24 45 L39 66.5" fill="none" stroke="#8f3d2b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M${R.map(f1).join(" L")} Z" fill="url(#en-tile)"/><path d="${tiles}" stroke="#a14430" stroke-width=".6"/>
<path d="M24 44 H80" stroke="#8f3d2b" stroke-width="2.2" stroke-linecap="round"/><path d="M39 66.5 H95" stroke="#8f3d2b" stroke-width="1.8" stroke-linecap="round"/>
${grid([Q(R, 0.12, 0.14), Q(R, 0.9, 0.14), Q(R, 0.9, 0.86), Q(R, 0.12, 0.86)], 3, 2, 0.03, 3, 2)}
<clipPath id="en-pc2"><path d="M${R.map(f1).join(" L")} Z"/></clipPath>
<g clip-path="url(#en-pc2)"><path class="en-shine" d="M42 40 L52 40 L64 70 L54 70 Z" fill="url(#en-shineg)"/></g>
<circle cx="24.5" cy="56" r="3" fill="#a9cbe6" stroke="#7d8e9b" stroke-width=".7"/>
<rect x="17" y="72" width="15" height="12" rx="1" fill="#a9cbe6" stroke="#7d8e9b" stroke-width=".8"/><path d="M24.5 72 V84 M17 78 H32" stroke="#7d8e9b" stroke-width=".7"/>
<rect x="44" y="77" width="10" height="21" rx="1" fill="#8d6e63" stroke="#6d5249" stroke-width=".6"/><circle cx="52" cy="88" r=".8" fill="#e0c36a"/>
<rect x="60" y="72" width="14" height="12" rx="1" fill="#a9cbe6" stroke="#7d8e9b" stroke-width=".8"/><path d="M67 72 V84 M60 78 H74" stroke="#7d8e9b" stroke-width=".7"/>
<rect x="79" y="76" width="9" height="9" rx="1.3" fill="#3a4148" stroke="#262b30" stroke-width=".6"/><circle class="sol-led" cx="85.8" cy="82.8" r=".9"/>
<rect x="66" y="86.5" width="9" height="10" rx="1.2" fill="#f2f2ef" stroke="#8f979e" stroke-width=".7"/><rect x="67.6" y="88" width="5.8" height="2.6" rx=".5" fill="#27303a"/><path d="M70.9 91.6 L69.4 94 H70.6 L70.1 95.8 L71.8 93.4 H70.6 Z" fill="#f9a825"/>
<path class="en-wire" d="M83.5 67 V76 M83.5 85 V91.5 H75"/><path class="sol-ef" d="M83.5 67 V76 M83.5 85 V91.5 H75"/>
${ENERGY_SMOKE(73, 64, 0.48)}${ENERGY_ANGER(85.5, 72)}</svg>`;
  return { ground, roof };
})();

function solarHtml(cls, p) {
  const layout = SOLAR_LAYOUTS.includes(p.layout) ? p.layout : "ground";
  const mode = p.mode || "night";
  return `
        <div class="machine ${cls} en sol sol-l-${layout} sol-m-${mode} en-sky-${p.sky || "day"}">${SOLAR_SVGS[layout]}</div>`;
}

// The battery's drawing, with its level and its reserve drawn in.
function batterySvg(layout, level, reserve) {
  const pct = level === null || level === undefined ? null : Math.max(0, Math.min(100, level));
  const res = reserve === null || reserve === undefined ? null : Math.max(0, Math.min(100, reserve));
  const shown = pct === null ? "--" : `${Math.round(pct)}%`;
  if (layout === "station") {
    // A portable station: its metal top with its handles, its screen with the
    // percentage and a bar, its sockets and its wheels.
    const bw = 24;
    const fw = pct === null ? 0 : Math.round(pct / 100 * bw * 10) / 10;
    const rx = res === null ? null : Math.round((36 + res / 100 * bw) * 10) / 10;
    const sock = (x) => `<circle cx="${x}" cy="80" r="3.6" fill="#1a1e22" stroke="#59626a" stroke-width=".6"/><rect x="${x - 1.9}" y="79.3" width="1" height="2.2" rx=".4" fill="#7b848c"/><rect x="${x + 0.9}" y="79.3" width="1" height="2.2" rx=".4" fill="#7b848c"/>`;
    return `<svg class="en-e" viewBox="0 0 96 108">
<defs><linearGradient id="en-sb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#e6e6e6)"/><stop offset=".45" style="stop-color:var(--ac-body,#d7d7d7)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#aeb2b5)"/></linearGradient>
<linearGradient id="en-st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8c0c7"/><stop offset="1" stop-color="#8f989f"/></linearGradient></defs>
<ellipse cx="48" cy="99" rx="38" ry="2.6" fill="rgba(0,0,0,.16)"/>
<rect x="12" y="37" width="72" height="10" rx="4" fill="url(#en-st)" stroke="#7c858c" stroke-width=".6"/>
<rect x="19" y="39.5" width="20" height="4" rx="2" fill="#2a2f34"/><rect x="57" y="39.5" width="20" height="4" rx="2" fill="#2a2f34"/>
<rect x="12" y="44" width="72" height="50" rx="5" fill="url(#en-sb)" stroke="rgba(0,0,0,.3)" stroke-width=".7"/>
<rect x="16" y="48" width="64" height="42" rx="3" fill="rgba(0,0,0,.06)" stroke="rgba(0,0,0,.2)" stroke-width=".7"/>
<rect x="32" y="51" width="32" height="18" rx="2.5" fill="#0c1014"/>
<text class="bat-lcd" x="51.5" y="61.5">${shown}</text>
<path class="bat-bolt" d="M36.6 53.6 L34.6 57.2 H36.2 L35.7 60 L37.8 56.4 H36.2 Z" fill="#43a047"/>
<rect x="36" y="64" width="${bw}" height="2.6" rx="1.3" fill="#2a3036"/><rect class="bat-lvl" x="36" y="64" width="${fw}" height="2.6" rx="1.3"/>
${rx === null ? "" : `<path class="bat-reserve" d="M${rx} 62.6 V68" stroke-width="1"/>`}
${sock(26)}${sock(36)}${sock(60)}${sock(70)}
<rect x="44" y="77.5" width="3" height="5" rx=".6" fill="#1a1e22"/><rect x="49" y="77.5" width="3" height="5" rx=".6" fill="#1a1e22"/>
<circle cx="22" cy="58" r="2.4" fill="#22272b" stroke="#5c656d" stroke-width=".6"/><circle class="bat-led" cx="22" cy="58" r="1"/>
<rect x="15" y="93" width="9" height="4" rx="1" fill="#1d2125"/><circle cx="74" cy="94.5" r="4" fill="#1d2125"/><circle cx="74" cy="94.5" r="1.5" fill="#5c656d"/>
<path class="en-wire" d="M-4 88 H12"/><path class="en-wire" d="M84 88 H100"/>
<path class="bat-bf bat-in" d="M-4 88 H12"/><path class="bat-bf bat-out" d="M84 88 H100"/>
${ENERGY_SMOKE(52, 12, 0.55)}${ENERGY_ANGER(80, 33)}</svg>`;
  }
  // A block on the wall, seen three quarters on, with its screen and a tall
  // gauge that fills from the bottom inside its window.
  const gx = 38, gy = 37, gw = 14, gh = 50, inner = gh - 2;
  const fh = pct === null ? 0 : Math.round(pct / 100 * inner * 10) / 10;
  const fy = Math.round((gy + 1 + inner - fh) * 10) / 10;
  const ry = res === null ? null : Math.round((gy + 1 + inner - res / 100 * inner) * 10) / 10;
  let ticks = "";
  for (let k = 1; k < 10; k++) ticks += `M${gx + 2} ${Math.round((gy + 1 + inner * k / 10) * 10) / 10} H${gx + gw - 2} `;
  return `<svg class="en-e" viewBox="0 0 96 108">
<defs><linearGradient id="en-wf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#e6e6e6)"/><stop offset=".45" style="stop-color:var(--ac-body,#d7d7d7)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#aeb2b5)"/></linearGradient>
<linearGradient id="en-lv" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
<linearGradient id="en-sw" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="en-gclip"><rect x="${gx + 1}" y="${gy + 1}" width="${gw - 2}" height="${inner}" rx="4"/></clipPath></defs>
<ellipse cx="49" cy="100.5" rx="30" ry="2.4" fill="rgba(0,0,0,.15)"/>
<rect x="32" y="15" width="37" height="83" rx="7" style="fill:var(--ac-body-lo,#aeb2b5)"/><rect x="32" y="15" width="37" height="83" rx="7" fill="rgba(0,0,0,.16)"/>
<rect x="28" y="12" width="35" height="84" rx="7" fill="url(#en-wf)" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<rect x="32" y="17" width="27" height="15" rx="3.5" fill="#12171c"/>
<text class="bat-lcd" x="48.5" y="28">${shown}</text>
<path class="bat-bolt" d="M35.6 20 L33.6 24 H35.3 L34.8 28.6 L37.3 23.6 H35.6 Z" fill="#43a047"/>
<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="5" fill="#e1e6ea" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
<g clip-path="url(#en-gclip)">
<rect class="bat-lvl" x="${gx + 1}" y="${fy}" width="${gw - 2}" height="${fh}"/>
<rect x="${gx + 1}" y="${gy + 1}" width="${gw - 2}" height="${inner}" fill="url(#en-lv)"/>
<rect class="bat-sweep" x="${gx + 1}" y="${gy + 1 + inner - 14}" width="${gw - 2}" height="14" fill="url(#en-sw)"/>
<path d="${ticks.trim()}" stroke="#fff" stroke-opacity=".55" stroke-width=".6"/>
</g>
${ry === null ? "" : `<path class="bat-reserve" d="M${gx - 2.5} ${ry} H${gx + gw + 2.5}" stroke-dasharray="1.6 1.2" stroke-width="1.1"/>`}
<circle class="bat-led" cx="45.5" cy="91.5" r="1.3"/>
<path class="en-wire" d="M-4 100 H34 V96"/><path class="en-wire" d="M57 96 V100 H100"/>
<path class="bat-bf bat-in" d="M-4 100 H34 V96"/><path class="bat-bf bat-out" d="M57 96 V100 H100"/>
${ENERGY_SMOKE(50, -2, 0.55)}${ENERGY_ANGER(61, 7)}</svg>`;
}

function batteryHtml(cls, b) {
  const layout = BATTERY_LAYOUTS.includes(b.layout) ? b.layout : "wall";
  const mode = b.mode || "idle";
  return `
        <div class="machine ${cls} en bat bat-l-${layout} bat-m-${mode}${b.low ? " bat-low" : ""}">${batterySvg(layout, b.level, b.reserve)}</div>`;
}

// A bathroom scale in perspective: its glass top, the two pads the feet go
// on, and the screen with the last weight. The screen glows for an hour after
// a weighing, green with a tick once the goal is reached.
function scaleHtml(cls, s) {
  const mode = s.mode || "unav";
  return `
        <div class="machine ${cls} sc sc-m-${mode}${s.fresh ? " sc-fresh" : ""}"><svg class="sc-svg" viewBox="0 0 96 108">
<defs><linearGradient id="sc-g-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset="1" stop-color="#d5dbe1"/></linearGradient>
<linearGradient id="sc-g-edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aab3bc"/><stop offset="1" stop-color="#7d8790"/></linearGradient></defs>
<ellipse cx="48" cy="98" rx="44" ry="3" fill="rgba(0,0,0,.18)"/>
<path d="M6 88 H90 V92 Q90 95 87 95 H9 Q6 95 6 92 Z" fill="url(#sc-g-edge)"/>
<path d="M20 50 Q21 46 25 46 H71 Q75 46 76 50 L90 86 Q91 89 87 89 H9 Q5 89 6 86 Z" fill="url(#sc-g-glass)" stroke="#b9c1ca" stroke-width=".6"/>
<path d="M25 48 H42 L28 86 H12 Z" fill="#fff" opacity=".35"/>
<ellipse class="sc-pad" cx="33" cy="76" rx="9" ry="6.5"/><ellipse class="sc-pad" cx="63" cy="76" rx="9" ry="6.5"/>
<rect x="25" y="50" width="46" height="16" rx="2" fill="#0e1b2c" stroke="#27394f" stroke-width=".4"/>
<path class="sc-check" d="M28 58 l2 2 l4 -4.5" fill="none" stroke="#7ee08a" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<text class="sc-lcd" x="47" y="62">${s.text || "--"}</text><text class="sc-unit" x="69" y="62">${s.unit || ""}</text>
</svg></div>`;
}

// A UPS's drawing: the wall socket and its plug on the left, the UPS with its
// screen, its three lights and its battery gauge, and the box it keeps alive
// on the right. On mains the energy flows from the wall through the UPS; on
// battery the wall goes dark, crossed out, the UPS beeps and its screen
// counts the time left. The gauge fills by fifths, the next one breathing
// while it charges.
function upsSvg(u) {
  const segs = [0, 1, 2, 3, 4].map((i) => `<rect class="up-seg${i < u.segs ? " up-lit" : ""}${i === Math.min(u.segs, 4) ? " up-next" : ""}" x="${Math.round((38.2 + i * 4.1) * 10) / 10}" y="62.2" width="3.4" height="6.6" rx=".6"/>`).join("");
  const vents = [0, 1, 2, 3, 4].map((i) => `<rect x="36" y="${Math.round((77 + i * 2.6) * 10) / 10}" width="26" height=".9" rx=".45"/>`).join("");
  return `<svg class="up-svg" viewBox="0 0 96 108">
<defs><linearGradient id="up-g-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--bh)"/><stop offset="1" stop-color="var(--bl)"/></linearGradient></defs>
<ellipse cx="50" cy="99.5" rx="46" ry="2.6" fill="rgba(0,0,0,.18)"/>
<rect x="2" y="46" width="17" height="17" rx="3.2" fill="#f4f6f8" stroke="#b9c1ca" stroke-width=".6"/>
<circle cx="10.5" cy="54.5" r="5.6" fill="#e3e7eb" stroke="#c3cad2" stroke-width=".5"/>
<circle cx="10.5" cy="54.5" r="4" fill="#262a30"/><rect x="8.8" y="58.2" width="3.4" height="2.4" rx=".7" fill="#262a30"/>
<g class="up-nomains"><path d="M12 33 l-3.4 4.8 h2.6 l-1.3 4 l3.9 -5.2 h-2.6 z" fill="#9aa3ad"/><path d="M5.5 33.5 L16 43" stroke="#e53935" stroke-width="1.3" stroke-linecap="round"/></g>
<path class="up-cable up-in" d="M10.5 60.6 C10.5 84 22 92 31 92"/><path class="up-flow up-in" d="M10.5 60.6 C10.5 84 22 92 31 92"/>
<path class="up-cable" d="M67 92 C73 92 75 91 79 91"/><path class="up-flow up-out" d="M67 92 C73 92 75 91 79 91"/>
<rect x="32" y="20" width="36" height="78" rx="4" fill="rgba(0,0,0,.15)"/>
<rect class="up-body" x="31" y="18" width="36" height="78" rx="4"/>
<path d="M34 18.6 H64" stroke="var(--bh)" stroke-width=".7" stroke-linecap="round"/>
<rect x="33" y="24" width="32" height="16" rx="2" fill="#0e1b2c" stroke="#27394f" stroke-width=".5"/>
<text class="up-lcd" x="49" y="36">${u.lcd || "--"}</text>
<circle class="up-led up-l-on" cx="42" cy="46" r="1.3"/><circle class="up-led up-l-bat" cx="49" cy="46" r="1.3"/><circle class="up-led up-l-flt" cx="56" cy="46" r="1.3"/>
<circle cx="49" cy="54" r="3.4" fill="#30353d" stroke="#565e69" stroke-width=".5"/>
<path d="M47.4 52.8 A2.1 2.1 0 1 0 50.6 52.8 M49 51.4 V54" fill="none" stroke="#9aa3ad" stroke-width=".7" stroke-linecap="round"/>
<rect x="37" y="61" width="22" height="9" rx="1.2" fill="#161a1f" stroke="#c9d1da" stroke-width=".6"/><rect x="59" y="63.5" width="1.8" height="4" rx=".5" fill="#c9d1da"/>
${segs}
<g fill="rgba(0,0,0,.45)">${vents}</g>
<path class="up-beep" d="M70 24 a4 4 0 0 1 0 7"/><path class="up-beep up-b2" d="M72.6 21.5 a7 7 0 0 1 0 12"/>
<rect x="80" y="62" width="15" height="33" rx="2" fill="rgba(0,0,0,.15)"/>
<rect x="79" y="61" width="15" height="33" rx="2" fill="#23272d" stroke="#3c434c" stroke-width=".5"/>
<rect x="81" y="65" width="11" height="7" rx=".8" fill="#31363e"/><rect x="81" y="74" width="11" height="7" rx=".8" fill="#31363e"/>
<circle class="up-dled" cx="90.2" cy="68.5" r=".8"/><circle class="up-dled up-d2" cx="90.2" cy="77.5" r=".8"/><circle class="up-dled up-pwr" cx="82" cy="90" r=".9"/>
</svg>`;
}
function upsHtml(cls, u) {
  const mode = u.mode || "off";
  return `
        <div class="machine ${cls} up up-m-${mode} up-lv-${u.level || "ok"}${u.alert ? " up-alert" : ""}${u.charging ? " up-charging" : ""}" style="--up-pace: ${u.pace || 1.2}s">${upsSvg(u)}</div>`;
}

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
const MOWER_STYLES = ["classic", "navimow"];
// The mower's style: the one chosen, else its name (Navimow, Segway).
function mowerStyleOf(cfg, st) {
  if (MOWER_STYLES.includes(cfg.mower_style)) return cfg.mower_style;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${stHay(st)}`).toLowerCase();
  return /navimow|segway/.test(hay) ? "navimow" : "classic";
}
// Five appliances drawn in volume: a cooker with a clear jug, a Japanese rice
// cooker, a wall boiler (or one with a burner window), a bean-to-cup coffee
// machine (silver, or black and chrome) and a towel warmer (a white ladder, or
// flat anthracite panels). The ids carry a number of their own, as each card
// draws its gradients again; the words on their screens stay in HTML.
let drawN = 0;
const svgGrad = (id, stops, x2 = 1, y2 = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" style="stop-color:${c}"/>`).join("")}</linearGradient>`;
const svgShadow = (cx, rx) => `<ellipse cx="${cx}" cy="103" rx="${rx}" ry="3" fill="rgba(0,0,0,.14)"/>`;
// A soft shadow on the floor with a contact line, so the appliance stands
// on it rather than floating above it.
const svgFloor = (g, cx, rx, cy) => `<radialGradient id="${g}o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".7" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="url(#${g}o)"/><path d="M${cx - rx + 6} ${cy + 0.4} H${cx + rx - 6}" stroke="rgba(0,0,0,.16)" stroke-width="1.2" stroke-linecap="round"/>`;
const svgWisp = (cls, x, y) => `<path class="${cls}" d="M${x} ${y} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`;
// The body in the appliance's colour, white unless one is chosen.
const BODY_STOPS = [[0, "var(--ac-body-lo,#dfe4e9)"], [0.45, "var(--ac-body-hi,#ffffff)"], [0.75, "var(--ac-body,#f1f4f6)"], [1, "var(--ac-body-lo,#cdd3d8)"]];

function cookerSvg() {
  const g = `dw${drawN++}`;
  return `<svg class="rc-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}w`, BODY_STOPS)}${svgGrad(`${g}s`, [[0, "#ffd08a"], [1, "#e8913a"]], 0, 1)}${svgGrad(`${g}v`, [[0, "rgba(255,255,255,.9)"], [1, "rgba(0,0,0,.10)"]], 0, 1)}
<radialGradient id="${g}d" cx=".4" cy=".35"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d0d6"/></radialGradient>
<radialGradient id="${g}o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".7" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<clipPath id="${g}c"><path d="M28.9 58.4 L26.5 28.5 H65.5 L63.1 58.4 Q46 62.4 28.9 58.4 Z"/></clipPath></defs>
<ellipse cx="48" cy="100" rx="36" ry="4" fill="url(#${g}o)"/>
<path d="M21 100.2 H75" stroke="rgba(0,0,0,.18)" stroke-width="1.2" stroke-linecap="round"/>
<path class="rc-base" d="M19 99.6 Q16 99.6 17 95.6 L20 70 Q21 64 27.5 64 H68.5 Q75 64 76 70 L79 95.6 Q80 99.6 77 99.6 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<path d="M19 95.4 H77" stroke="rgba(0,0,0,.08)" stroke-width="1"/>
<path d="M22 71 H74" stroke="rgba(0,0,0,.05)" stroke-width=".8"/>
<rect x="28" y="73" width="40" height="12.5" rx="3.5" fill="#14161a"/>
<circle cx="48" cy="92" r="4.4" fill="url(#${g}d)" stroke="#aeb6bd" stroke-width=".7"/>
<circle class="rc-ring" cx="48" cy="92" r="6" fill="none" stroke-width="1.4"/>
<g transform="translate(46 64.5) scale(1.2) translate(-46 -58.5)">
<path d="M65 32 C80 32 82 52 65.2 54" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="7" stroke-linecap="round"/>
<path d="M65 32 C80 32 82 52 65.2 54" fill="none" stroke="url(#${g}w)" stroke-width="5" stroke-linecap="round"/>
<path d="M28.6 58.5 L25.4 28 Q25.4 25.5 28.4 25.5 H63.6 Q66.6 25.5 66.6 28 L63.4 58.5 Q46 63 28.6 58.5 Z" fill="rgba(200,228,245,.55)" stroke="#9fb6c6" stroke-width=".9"/>
<g clip-path="url(#${g}c)">
<path class="rc-food" d="M20 43.4 H72 V63 H20 Z" fill="url(#${g}s)"/>
<ellipse class="rc-food" cx="46" cy="43.4" rx="18.6" ry="3" fill="#ffdca6" stroke="rgba(200,110,30,.35)" stroke-width=".6"/>
<path class="rc-dip" d="M37 43.4 Q46 52 55 43.4 Q46 44.6 37 43.4 Z" fill="rgba(160,70,10,.3)"/>
<ellipse class="rc-swirl" cx="46" cy="43.4" rx="16.6" ry="2.3" fill="none" stroke="#b4501a" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 4.33"/>
<ellipse class="rc-swirl s2" cx="46" cy="49.5" rx="13" ry="1.8" fill="none" stroke="rgba(170,70,15,.75)" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2.5 4.83"/>
<g class="rc-blade"><path d="M38 54 L54 54 M46 50 L46 58" stroke="#6c757d" stroke-width="2" stroke-linecap="round"/></g>
<circle cx="46" cy="54" r="1.6" fill="#495057"/>
<path d="M25 28.6 H67" stroke="rgba(0,0,0,.10)" stroke-width="1.6"/>
<path d="M20 57 Q46 61 72 57" fill="none" stroke="rgba(120,60,10,.22)" stroke-width="2.2"/>
</g>
<path d="M29.4 56.2 Q46 59.8 62.6 56.2" fill="none" stroke="rgba(255,255,255,.7)" stroke-width=".9"/>
<path class="rc-rim" d="M28.4 59.4 Q46 64 63.6 59.4" fill="none" stroke-width="1.4" stroke-linecap="round"/>
<path d="M57.5 34 H62 M58 41 H62 M58.5 48 H62 M59 55 H62" stroke="#9fb6c6" stroke-width=".7"/>
<path d="M31 30 L29.6 55" stroke="rgba(255,255,255,.75)" stroke-width="1.4" stroke-linecap="round"/>
<path d="M22.5 28.2 Q22.5 24.4 26.5 24 H65.5 Q69.5 24.4 69.5 28.2 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M25.2 24.2 Q27 16.4 46 15.6 Q65 16.4 66.8 24.2 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M25.2 24.2 Q27 16.4 46 15.6 Q65 16.4 66.8 24.2 Z" fill="url(#${g}v)" opacity=".55"/>
<path d="M30 21.8 Q33 18.2 40 17.2" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1.2" stroke-linecap="round"/>
<path d="M39.8 11.8 V16.6 Q46 18.4 52.2 16.6 V11.8" fill="#e3e8ec" stroke="#b9c1c8" stroke-width=".8"/>
<ellipse cx="46" cy="11.8" rx="6.2" ry="1.8" fill="#f6f8f9" stroke="#b9c1c8" stroke-width=".8"/>
<ellipse cx="46" cy="11.8" rx="3.6" ry=".9" fill="#c9d0d6"/>
${svgWisp("rc-steam v1", 43, 11)}${svgWisp("rc-steam v2", 48.5, 11)}
</g></svg>`;
}

function riceSvg() {
  const g = `dw${drawN++}`;
  return `<svg class="rk-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}w`, BODY_STOPS)}${svgGrad(`${g}l`, [[0, "var(--ac-body-hi,#ffffff)"], [1, "var(--ac-body-lo,#dde2e7)"]], 0, 1)}${svgGrad(`${g}v`, [[0, "rgba(255,255,255,0)"], [0.7, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,.10)"]], 0, 1)}
<radialGradient id="${g}o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".7" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="48" cy="100.4" rx="38" ry="4" fill="url(#${g}o)"/>
<path d="M18 100.6 H78" stroke="rgba(0,0,0,.16)" stroke-width="1.2" stroke-linecap="round"/>
<path d="M14 50 V92 Q14 97.6 21 98.6 Q48 102 75 98.6 Q82 97.6 82 92 V50 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<path d="M14 50 V92 Q14 97.6 21 98.6 Q48 102 75 98.6 Q82 97.6 82 92 V50 Z" fill="url(#${g}v)"/>
<path d="M14.4 91 Q48 96.5 81.6 91 V92 Q82 97.6 75 98.6 Q48 102 21 98.6 Q14 97.6 14.4 92 Z" fill="rgba(70,80,90,.28)"/>
<path d="M19 57 Q18.4 74 19.4 88" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.6" stroke-linecap="round"/>
<path d="M26 63.6 Q48 61.4 70 63.6 Q72 63.8 72 66 V84.4 Q72 86.6 70 86.8 Q48 89 26 86.8 Q24 86.6 24 84.4 V66 Q24 63.8 26 63.6 Z" fill="#2a2f35"/>
<rect x="29" y="68" width="24" height="10" rx="2" fill="#14161a"/>
<circle class="rk-led rk-cook" cx="60" cy="71" r="2"/><circle class="rk-led rk-warm" cx="67" cy="71" r="2"/>
<rect x="29" y="81" width="11" height="4" rx="2" fill="#4a5158"/><rect x="43" y="81.3" width="11" height="4" rx="2" fill="#4a5158"/><rect class="rk-key" x="57" y="81" width="11" height="4" rx="2"/>
<path d="M12 50 Q12 46.6 15.4 45 Q21 30.4 48 29.4 Q75 30.4 80.6 45 Q84 46.6 84 50 Q48 56.6 12 50 Z" fill="url(#${g}l)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M13.4 50.6 Q48 57.4 82.6 50.6" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="1.2"/>
<path d="M22 41 Q27 33.6 39 31.6" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1.4" stroke-linecap="round"/>
<path d="M42 49.4 Q48 50.6 54 49.4 V51.6 Q48 52.8 42 51.6 Z" fill="#c3cad1" stroke="rgba(0,0,0,.18)" stroke-width=".5"/>
<path d="M58.4 28.4 V31.6 Q63.4 33 68.4 31.6 V28.4" fill="#e3e8ec" stroke="#aeb6bd" stroke-width=".7"/>
<ellipse cx="63.4" cy="28.4" rx="5" ry="1.5" fill="#f6f8f9" stroke="#aeb6bd" stroke-width=".7"/>
<ellipse cx="63.4" cy="28.4" rx="2.4" ry=".7" fill="#8f98a2"/>
${svgWisp("rk-steam w1", 62, 28)}${svgWisp("rk-steam w2", 66.5, 28)}</svg>`;
}

// The boiler's installation, the same under both boilers: the flow and
// return to a radiator, and the hot water to a tap.
// A tube with its sheen: the coloured pipe, then a thin light line along it.
const blTube = (cls, d, w = 2.4) => `<path class="${cls}" d="${d}" fill="none" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="${(w * 0.3).toFixed(2)}" stroke-linecap="round" transform="translate(-.4 -.4)"/>`;
function boilerPipes(g) {
  const tube = (d, color) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/><path d="${d}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".7" stroke-linecap="round" transform="translate(-.4 0)"/>`;
  return `${blTube("bl-tap", "M34 64 V80 Q34 84 30 84 H20")}
${blTube("bl-flow", "M62 64 V78 Q62 82 66 82 H72")}
${tube("M56 64 V93 Q56 97 60 97 H72", "#64b5f6")}
${[34, 56, 62].map((x) => `<rect x="${x - 2.4}" y="64.4" width="4.8" height="2.6" rx=".8" fill="#9aa3ad"/><path d="M${x - 2} 65 H${x + 2}" stroke="rgba(255,255,255,.6)" stroke-width=".5"/>`).join("")}
<path d="M14.4 84.8 H9.8 Q6.6 84.8 6.6 88 V89.6" fill="none" stroke="#9aa3ad" stroke-width="2.6" stroke-linecap="round"/><path d="M14 84.2 H9.8 Q6 84.2 6 88" fill="none" stroke="rgba(255,255,255,.65)" stroke-width=".7" stroke-linecap="round"/>
<rect x="5" y="89.2" width="3.2" height="1.6" rx=".6" fill="#7d868f"/>
<rect x="16.2" y="76.4" width="1.8" height="4" fill="#9aa3ad"/>
<path d="M12.4 76.2 H21" stroke="#aeb6bd" stroke-width="2.2" stroke-linecap="round"/><path d="M12.6 75.6 H20.6" stroke="rgba(255,255,255,.7)" stroke-width=".6" stroke-linecap="round"/>
<circle cx="21.4" cy="76.2" r="1.5" fill="#e53935"/>
<rect x="13.6" y="80" width="7" height="8.4" rx="2.4" fill="url(#${g}t)" stroke="rgba(0,0,0,.2)" stroke-width=".5"/>
<circle class="bl-drop d1" cx="6.6" cy="92.4" r="1.3"/><circle class="bl-drop d2" cx="6.6" cy="92.4" r="1.1"/><circle class="bl-drop d3" cx="6.6" cy="92.4" r="1.2"/>
<rect x="72.5" y="78.6" width="22" height="24" rx="2" fill="rgba(0,0,0,.08)"/>
<rect class="bl-rad" x="70" y="76" width="22" height="24" rx="2"/>
${[72.6, 77.8, 83, 88.2].map((x) => `<rect x="${x}" y="77" width="4.4" height="22" rx="2.2" fill="rgba(255,255,255,.28)"/><path d="M${x + 1.2} 78.4 V97.6" stroke="rgba(255,255,255,.7)" stroke-width=".7" stroke-linecap="round"/><path d="M${x + 4.4} 78 V98" stroke="rgba(0,0,0,.14)" stroke-width=".7"/>`).join("")}
${[74, 81, 88].map((x, i) => `<path class="bl-wave w${i + 1}" d="M${x} 72 c-2.5 -3 2.5 -5 0 -8 c-2.5 -3 2.5 -5 0 -8"/>`).join("")}`;
}
// A gas flame: blue at the root, paling towards a tip that fades out, with a
// lighter core. Each flicks on its own.
const blFlame = (g, x, base, w, h, n) => {
  const tear = (ww, hh) => `M${x - ww / 2} ${base} C${x - ww * 0.62} ${base - hh * 0.45} ${x - ww * 0.18} ${base - hh * 0.78} ${x} ${base - hh} C${x + ww * 0.18} ${base - hh * 0.78} ${x + ww * 0.62} ${base - hh * 0.45} ${x + ww / 2} ${base} Q${x} ${base + ww * 0.22} ${x - ww / 2} ${base} Z`;
  return `<path class="bl-flame f${n}" d="${tear(w, h)}" fill="url(#${g}f)"/><path class="bl-flame f${n}" d="${tear(w * 0.55, h * 0.55)}" fill="url(#${g}q)"/>`;
};
const blBurner = (g, l, r, y, n, w, h) => {
  const step = (r - l) / n;
  return `<ellipse class="bl-glow" cx="${(l + r) / 2}" cy="${y - h * 0.3}" rx="${(r - l) / 2 + 1}" ry="${h * 0.62}" fill="url(#${g}a)"/>${Array.from({ length: n }, (_, i) => blFlame(g, l + step * (i + 0.5), y, w, h * [1, 0.86, 0.94][i % 3], (i % 3) + 1)).join("")}<ellipse class="bl-glow" cx="${(l + r) / 2}" cy="${y}" rx="${(r - l) / 2}" ry="1.2" fill="rgba(170,225,255,.8)"/><rect x="${l - 1}" y="${y + 0.4}" width="${r - l + 2}" height="2.2" rx="1.1" fill="#5d6570"/>${Array.from({ length: n }, (_, i) => `<circle cx="${l + step * (i + 0.5)}" cy="${y + 1.5}" r=".5" fill="#2a2f35"/>`).join("")}`;
};
// The case hung on the wall: its shadow on the wall, its depth showing on the
// top and the right, then the front.
function blCase(g, l, t, r, b, rad) {
  const dx = 3.6, dy = -2.4;
  return `<rect x="${l + 2.6}" y="${t + 3.2}" width="${r - l + dx}" height="${b - t}" rx="${rad}" fill="rgba(0,0,0,.07)"/><rect x="${l + 1.4}" y="${t + 1.8}" width="${r - l + dx}" height="${b - t}" rx="${rad}" fill="rgba(0,0,0,.07)"/>
<path d="M${l + rad * 0.3} ${t + rad * 0.3} L${l + rad * 0.3 + dx} ${t + rad * 0.3 + dy} H${r - rad * 0.3 + dx} V${b - rad * 0.3 + dy} L${r - rad * 0.3} ${b - rad * 0.3} Z" fill="url(#${g}e)"/>
<rect x="${l + dx}" y="${t + dy}" width="${r - l}" height="${b - t}" rx="${rad}" fill="url(#${g}e)"/>`;
}
function boilerSvg(layout) {
  const g = `dw${drawN++}`;
  const defs = `<defs>${svgGrad(`${g}w`, BODY_STOPS)}${svgGrad(`${g}e`, [[0, "var(--ac-body-lo,#c3cad1)"], [1, "var(--ac-body-lo,#aeb6bd)"]])}${svgGrad(`${g}t`, [[0, "#8f98a2"], [0.35, "#f1f3f4"], [0.7, "#c3cad1"], [1, "#7d868f"]])}${svgGrad(`${g}f`, [[0, "rgba(255,160,50,0)"], [0.12, "rgba(255,140,40,.85)"], [0.3, "rgba(255,165,60,.85)"], [0.46, "rgba(255,200,110,.5)"], [0.6, "rgba(110,150,255,.65)"], [0.85, "#2b6cff"], [1, "#1438b8"]], 0, 1)}${svgGrad(`${g}q`, [[0, "rgba(200,245,255,.2)"], [0.5, "#9be4ff"], [1, "#e8fbff"]], 0, 1)}<radialGradient id="${g}a" cx=".5" cy=".75" r=".6"><stop offset="0" stop-color="#4fc3f7" stop-opacity=".35"/><stop offset="1" stop-color="#4fc3f7" stop-opacity="0"/></radialGradient><radialGradient id="${g}r" cx=".38" cy=".32"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5da"/></radialGradient></defs>`;
  if (layout === "window") {
    return `<svg class="bl-svg" viewBox="0 0 96 108">${defs}${boilerPipes(g)}${blCase(g, 24, 6, 72, 64, 4)}
<path class="bl-box" d="M24 10 Q24 6 28 6 H68 Q72 6 72 10 V60 Q72 64 68 64 H28 Q24 64 24 60 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
<path d="M27 7.2 H69" stroke="rgba(255,255,255,.95)" stroke-width="1" stroke-linecap="round"/><path d="M25.2 10 V60" stroke="rgba(255,255,255,.8)" stroke-width=".9" stroke-linecap="round"/><path d="M27 62.9 H69" stroke="rgba(0,0,0,.14)" stroke-width="1" stroke-linecap="round"/>
<rect x="29" y="11" width="38" height="24" rx="3.6" fill="#aeb6bd"/>
<rect x="30" y="12" width="36" height="22" rx="3" fill="#1a1d21" stroke="#5d6570" stroke-width=".7"/>
<path d="M31 13 H65 L62 16 H34 Z" fill="rgba(0,0,0,.45)"/>
${blBurner(g, 33, 63, 30.2, 5, 6.4, 15)}
<path d="M36 33.4 L45 12.6 H50 L41 33.4 Z" fill="rgba(255,255,255,.07)"/>
<circle cx="48" cy="49" r="10.6" fill="#c3cad1"/><circle cx="48" cy="49" r="9.5" fill="#14161a" stroke="#5d6570" stroke-width=".8"/>
<path d="M41.4 44 Q45 40.4 50 40.6" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1" stroke-linecap="round"/>
<circle cx="34" cy="49" r="3" fill="url(#${g}r)" stroke="#8f98a2" stroke-width=".6"/><circle cx="62" cy="49" r="3" fill="url(#${g}r)" stroke="#8f98a2" stroke-width=".6"/></svg>`;
  }
  return `<svg class="bl-svg" viewBox="0 0 96 108">${defs}${boilerPipes(g)}${blCase(g, 26, 6, 70, 64, 5)}
<rect class="bl-box" x="26" y="6" width="44" height="58" rx="5" fill="url(#${g}w)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M29.4 7.2 H66.6" stroke="rgba(255,255,255,.95)" stroke-width="1" stroke-linecap="round"/><path d="M27.2 10.6 V59.4" stroke="rgba(255,255,255,.8)" stroke-width=".9" stroke-linecap="round"/><path d="M29.4 62.9 H66.6" stroke="rgba(0,0,0,.14)" stroke-width="1" stroke-linecap="round"/>
<path d="M28 12 H68" stroke="rgba(0,0,0,.06)" stroke-width=".8"/>
<rect x="29.2" y="43.2" width="37.6" height="17.6" rx="3.6" fill="rgba(0,0,0,.12)"/>
<rect x="30" y="44" width="36" height="16" rx="3" fill="#2a2f35"/>
<path d="M31.4 59.4 H64.6" stroke="rgba(255,255,255,.18)" stroke-width=".7"/>
<rect x="32.5" y="47" width="14.5" height="10" rx="2" fill="#14161a"/>
<path class="bl-ico bl-ico-ch" d="M49.2 48.6 h1.5 v6.6 h-1.5z M51.4 48.6 h1.5 v6.6 h-1.5z M53.6 48.6 h1.5 v6.6 h-1.5z M48.8 49.6 h6.7 v.9 h-6.7z M48.8 53.3 h6.7 v.9 h-6.7z M49.4 55.2 h1.1 v.9 h-1.1z M53.8 55.2 h1.1 v.9 h-1.1z"/>
<path class="bl-ico bl-ico-hw" d="M59.2 48 h3.4 v.9 h-1.25 v1.2 h-.9 v-1.2 h-1.25z M58.6 50 h4.4 v1.8 h-2.8 v1.2 h-1.6z M63 49.3 h.9 v3.2 h-.9z M59.4 53.6 c.85 1.1 1.3 1.75 1.3 2.3 a1.3 1.3 0 0 1 -2.6 0 c0 -.55 .45 -1.2 1.3 -2.3z"/>
<circle cx="40" cy="28" r="7" fill="#aeb6bd"/><circle cx="40" cy="28" r="6" fill="url(#${g}r)" stroke="#8f98a2" stroke-width=".7"/><path d="M36.5 31 h7" stroke="#aeb6bd" stroke-width=".5"/>
<path class="bl-needle" d="M40 28 L40 23.5" stroke="#e53935" stroke-width="1.1" stroke-linecap="round"/><circle cx="40" cy="28" r=".9" fill="#5d6570"/>
<rect x="50" y="17" width="12" height="16" rx="3" fill="#1a1d21" stroke="#5d6570" stroke-width=".6"/><path d="M51 18 H61 L59.4 20 H52.6 Z" fill="rgba(0,0,0,.5)"/>
${blBurner(g, 52, 60, 29.8, 2, 4.2, 10.5)}</svg>`;
}

function coffeeCup(x, y, n) {
  const c = x + 6.5;
  return `<g class="cf-cup c${n}"><ellipse cx="${c}" cy="${y + 15.3}" rx="7.4" ry="1.7" fill="#e9edf0" stroke="#b9c1c8" stroke-width=".5"/>
<path d="M${x + 13} ${y + 3.5} q4 0 4 4 q0 4 -4 4" fill="none" stroke="#c3cad1" stroke-width="1.4"/>
<path d="M${x} ${y + 1.2} L${x + 1.5} ${y + 13} Q${x + 2} ${y + 15} ${x + 4} ${y + 15} H${x + 9} Q${x + 11} ${y + 15} ${x + 11.5} ${y + 13} L${x + 13} ${y + 1.2} Z" fill="#fafafa" stroke="#c3cad1" stroke-width=".6"/>
<path class="cf-fill" d="M${x + 1.2} ${y + 3} H${x + 11.8} L${x + 11} ${y + 12.5} Q${x + 10.6} ${y + 14} ${x + 9} ${y + 14} H${x + 4} Q${x + 2.4} ${y + 14} ${x + 2} ${y + 12.5} Z" fill="#6d4126"/>
<path d="M${x + 2.2} ${y + 4} Q${x + 2.8} ${y + 9} ${x + 3.6} ${y + 12.6}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width=".9" stroke-linecap="round"/>
<ellipse cx="${c}" cy="${y + 1.2}" rx="6.5" ry="1.6" fill="#d7dde2" stroke="#c3cad1" stroke-width=".6"/>
<ellipse class="cf-crema" cx="${c}" cy="${y + 1.5}" rx="5.4" ry="1.15" fill="#b07a4f"/>
${svgWisp(`cf-steam p${n}`, x + 6, y - 1)}</g>`;
}
function coffeeWater(x, top, w, h, pct) {
  const p = pct === null || pct === undefined ? 62 : Math.max(4, Math.min(100, pct));
  const fh = Math.round(h * p) / 100;
  return `<rect class="cf-water" x="${x}" y="${(top + h - fh).toFixed(2)}" width="${w}" height="${fh.toFixed(2)}" rx="1.5" data-pct="${pct === null || pct === undefined ? "" : Math.round(p)}"/>`;
}
// The cavity the coffee runs into, drawn with its back and side walls so it
// reads as a hollow rather than a dark patch, and the drip tray on its floor.
function coffeeBay(g, l, t, r, b, wall, tray) {
  const d = 5;
  return `<path d="M${l} ${t} H${r} V${b} H${l} Z" fill="url(#${g}k)"/>
<path d="M${l} ${t} L${l + d} ${t + 4} V${b - 4} L${l} ${b} Z" fill="${wall}"/><path d="M${r} ${t} L${r - d} ${t + 4} V${b - 4} L${r} ${b} Z" fill="${wall}" opacity=".7"/>
<path d="M${l} ${t} H${r} L${r - d} ${t + 4} H${l + d} Z" fill="rgba(0,0,0,.45)"/>
<path class="cf-tray" d="M${l + d} ${b - 4} H${r - d} L${r} ${b} H${l} Z"/>
<path d="M${l + d + 3} ${b - 2.4} H${r - d - 3} M${l + d + 1} ${b - 0.9} H${r - d - 1}" stroke="rgba(0,0,0,.35)" stroke-width=".5" stroke-dasharray="1.6 1.6"/>
${tray}`;
}
function coffeeSvg(layout, two, pct) {
  const g = `dw${drawN++}`;
  const beans = (x, y) => `<g class="cf-beans">${[0, 1, 2].map((i) => `<ellipse class="cf-bean b${i + 1}" cx="${x + i * 6}" cy="${y}" rx="2.2" ry="1.5"/>`).join("")}</g>`;
  const water = `${svgGrad(`${g}h`, [[0, "#a4dcf9"], [1, "#3b9fd8"]], 0, 1)}${svgGrad(`${g}k`, [[0, "#050607"], [0.55, "#1a1d21"], [1, "#2a2e33"]], 0, 1)}${svgGrad(`${g}d`, [[0, "rgba(60,40,30,.75)"], [1, "rgba(25,20,18,.55)"]], 0, 1)}`;
  if (layout === "black") {
    const cups = two
      ? `<path class="cf-stream p1" d="M41.5 56 V73"/><path class="cf-stream p2" d="M54.5 56 V73"/>${coffeeCup(34.5, 71, 1)}${coffeeCup(48.5, 71, 2)}`
      : `<path class="cf-stream p1" d="M46 56 V73"/><path class="cf-stream p2" d="M50 56 V73"/>${coffeeCup(41.5, 71, 1)}`;
    return `<svg class="cf-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}b`, [[0, "#14161a"], [0.5, "#2c3136"], [1, "#101215"]])}${svgGrad(`${g}c`, [[0, "#6c757d"], [0.25, "#e9edf0"], [0.5, "#aeb6bd"], [0.75, "#f1f3f4"], [1, "#6c757d"]])}${water}</defs>
${svgFloor(g, 48, 37, 101)}
<rect class="cf-tank" x="80" y="30" width="6" height="58" rx="2" fill="rgba(200,228,245,.5)" stroke="#9fb6c6" stroke-width=".7"/>
${coffeeWater(81, 31, 4, 56, pct).replace("<rect", `<rect fill="url(#${g}h)"`)}
<rect x="19" y="98" width="7" height="3.4" rx="1.2" fill="#0a0b0d"/><rect x="70" y="98" width="7" height="3.4" rx="1.2" fill="#0a0b0d"/>
<path d="M16 98 V16 Q16 8 24 8 H72 Q80 8 80 16 V98 Q80 101 77 101 H19 Q16 101 16 98 Z" fill="url(#${g}b)"/>
<path d="M19 12 Q19.4 9.6 23 9.4 H73 Q76.6 9.6 77 12" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1"/>
<path d="M29 8.4 Q30.4 1.8 48 1.4 Q65.6 1.8 67 8.4 Z" fill="url(#${g}d)" stroke="rgba(255,255,255,.18)" stroke-width=".6"/>${beans(42, 6)}
<path d="M33 5 Q38 2.8 45 2.6" fill="none" stroke="rgba(255,255,255,.45)" stroke-width=".8" stroke-linecap="round"/>
<rect x="22" y="12" width="52" height="30" rx="5" fill="url(#${g}c)"/>
<path d="M25 13 H71" stroke="rgba(255,255,255,.8)" stroke-width=".8" stroke-linecap="round"/>
<circle cx="48" cy="26" r="10" fill="#0d0f12" stroke="#3d434a" stroke-width=".8"/>
<circle class="cf-key k1" cx="30" cy="20" r="2.2"/><circle class="cf-key k2" cx="30" cy="32" r="2.2"/><circle class="cf-key k3 cf-alert" cx="66" cy="20" r="2.2"/><circle class="cf-key k4" cx="66" cy="32" r="2.2"/>
${coffeeBay(g, 22, 46, 74, 88, "#24282d", "")}
<rect x="38" y="46" width="20" height="10" rx="3" fill="url(#${g}c)"/>
<path d="M40 47 H56" stroke="rgba(255,255,255,.8)" stroke-width=".6"/>
${cups}
<rect x="20" y="88" width="56" height="7" rx="2" fill="url(#${g}c)"/><path d="M22 89 H74" stroke="rgba(255,255,255,.75)" stroke-width=".6"/>
<path class="cf-warn cf-warn-b" d="M27.4 9.2 Q29 0.2 48 -0.2 Q67 0.2 68.6 9.2 Z"/><rect class="cf-warn cf-warn-w" x="79" y="29" width="8" height="60" rx="2.5"/><rect class="cf-warn cf-warn-t" x="19" y="83" width="58" height="13" rx="3"/></svg>`;
  }
  const cups = two
    ? `<path class="cf-stream p1" d="M39.5 50 V72"/><path class="cf-stream p2" d="M54.5 50 V72"/>${coffeeCup(33, 70, 1)}${coffeeCup(48, 70, 2)}`
    : `<path class="cf-stream p1" d="M45.5 50 V72"/><path class="cf-stream p2" d="M49.5 50 V72"/>${coffeeCup(41, 70, 1)}`;
  return `<svg class="cf-svg" viewBox="0 0 96 108"><defs>${svgGrad(`${g}s`, [[0, "var(--ac-body-lo,#8f98a2)"], [0.3, "var(--ac-body-hi,#e9edf0)"], [0.6, "var(--ac-body,#c3cad1)"], [1, "var(--ac-body-lo,#7d868f)"]])}${water}</defs>
${svgFloor(g, 48, 40, 100.6)}
<rect class="cf-tank" x="80" y="22" width="10" height="68" rx="2.5" fill="rgba(200,228,245,.5)" stroke="#9fb6c6" stroke-width=".8"/>
${coffeeWater(81.5, 23.5, 7, 65, pct).replace("<rect", `<rect fill="url(#${g}h)"`)}
<path d="M82.6 26 V86" stroke="rgba(255,255,255,.7)" stroke-width=".8" stroke-linecap="round"/>
<rect x="15" y="97" width="7" height="3.6" rx="1.2" fill="#4a5158"/><rect x="72" y="97" width="7" height="3.6" rx="1.2" fill="#4a5158"/>
<path d="M12 96 V18 Q12 12 18 12 H76 Q82 12 82 18 V96 Q82 99 78 99 H16 Q12 99 12 96 Z" fill="url(#${g}s)" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
<path d="M15 15 Q15.4 13 18 13 H76 Q78.6 13 79 15" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1"/>
<path d="M14.6 20 V92" stroke="rgba(255,255,255,.55)" stroke-width="1.2" stroke-linecap="round"/>
<path d="M17 12.4 Q18 4.2 34 3.8 Q50 4.2 51 12.4 Z" fill="url(#${g}d)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>${beans(28, 9.4)}
<path d="M21 9 Q25 6 32 5.4" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".8" stroke-linecap="round"/>
<rect x="18" y="16" width="58" height="16" rx="3" fill="#20242a"/>
<path d="M20 17 H74" stroke="rgba(255,255,255,.18)" stroke-width=".7"/>
<rect x="22" y="19" width="22" height="10" rx="2" fill="#0d0f12"/>
<circle class="cf-key k1" cx="52" cy="24" r="2.6"/><circle class="cf-key k2" cx="60" cy="24" r="2.6"/><circle class="cf-key k3 cf-alert" cx="68" cy="24" r="2.6"/>
${coffeeBay(g, 18, 38, 76, 88, "#2b2f34", "")}
<rect x="34" y="38" width="26" height="9" rx="2" fill="url(#${g}s)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<rect x="${two ? 38 : 44}" y="46" width="3" height="4" rx="1" fill="#8f98a2"/><rect x="${two ? 53 : 48}" y="46" width="3" height="4" rx="1" fill="#8f98a2"/>
${cups}
<rect x="16" y="88" width="62" height="7" rx="2" fill="url(#${g}s)" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>
<path d="M18 89 H76" stroke="rgba(255,255,255,.7)" stroke-width=".6"/>
<path class="cf-warn cf-warn-b" d="M15.4 13.2 Q16.6 2.6 34 2.2 Q51.4 2.6 52.6 13.2 Z"/><rect class="cf-warn cf-warn-w" x="79" y="21" width="12" height="70" rx="3"/><rect class="cf-warn cf-warn-t" x="15" y="83" width="64" height="13" rx="3"/></svg>`;
}

// A towel over a bar: its shadow on the bars, the back half hanging a
// little lower and wider, the front flaring from the fold to a wavy hem, a
// woven band near the hem and a faint terry rib.
function twTowel(x, y, w, h, color, back) {
  const hem = (hy, r, l) => `C${r - w * 0.2} ${hy + 1.4} ${l + w * 0.55} ${hy - 1.6} ${l + w * 0.32} ${hy + 0.5} C${l + w * 0.15} ${hy + 1.1} ${l + 0.8} ${hy - 0.3} ${l} ${hy}`;
  const ribs = Array.from({ length: Math.floor(w / 3) }, (_, i) => `M${(3 + i * 3).toFixed(1)} 4.4 V${h - 9.5}`).join(" ");
  const vw = w + 3;
  return `<path d="M${x + 3.4} ${y + 3} H${x + w + 1.6} L${x + w + 3} ${y + h + 3.6} H${x + 2.4} Z" fill="rgba(0,0,0,.13)"/>
<svg class="tw-towel" x="${x}" y="${y}" width="${vw}" height="${h + 4}" viewBox="0 0 ${vw} ${h + 4}">
<path d="M3 3 H${w} L${w + 2.6} ${h + 1.6} ${hem(h + 1.6, w + 2.6, 1.6)} Z" fill="${back}"/>
<path d="M2.4 2.2 Q2.4 .3 5 .3 H${w - 2.4} Q${w} .3 ${w} 2.2 L${w + 1} ${h - 1} ${hem(h - 1, w + 1, 1.2)} Z" fill="${color}"/>
<path d="${ribs}" stroke="rgba(0,0,0,.05)" stroke-width="1"/>
<path d="M2.4 2.4 H${w} V5.4 Q${w / 2 + 1} 6.6 2.2 5.4 Z" fill="rgba(0,0,0,.14)"/><path d="M4.6 1.3 H${w - 2}" stroke="rgba(255,255,255,.6)" stroke-width=".8" stroke-linecap="round"/>
<path d="M1.6 ${h - 8.6} H${w + 0.8} M1.5 ${h - 6.4} H${w + 0.9}" stroke="rgba(255,255,255,.6)" stroke-width="1"/>
<path d="M3.4 7 L2.4 ${h - 3}" stroke="rgba(255,255,255,.38)" stroke-width="1.4" stroke-linecap="round"/><path d="M${w - 1.4} 7 L${w - 0.4} ${h - 3}" stroke="rgba(0,0,0,.13)" stroke-width="1.4" stroke-linecap="round"/></svg>`;
}
// A towel warmer: round bars in three groups between two uprights held off
// the wall by their brackets, a towel folded over one; or flat panels on one
// upright, a towel over the top one. The bars warm up in the colour of the
// mode. Both cast their shadow on the wall.
function towelSvg(layout) {
  const g = `dw${drawN++}`;
  const sheen = `<linearGradient id="${g}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>`;
  const box = (x, y, w, h, fill) => `<rect x="${x + 1.6}" y="${y + 2}" width="${w}" height="${h}" rx="2.5" fill="rgba(0,0,0,.1)"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2.5" fill="${fill}" stroke="rgba(0,0,0,.18)" stroke-width=".7"/>
<path d="M${x + 2} ${y + 0.9} H${x + w - 2}" stroke="rgba(255,255,255,.6)" stroke-width=".7" stroke-linecap="round"/>
<path d="M${x + w / 2} ${y + h} V${y + h + 2.4} Q${x + w / 2} ${y + h + 4.6} ${x + w / 2 + 3} ${y + h + 4.6} H${x + w + 4}" fill="none" stroke="#9aa3ad" stroke-width="1.2" stroke-linecap="round"/>`;
  if (layout === "panel") {
    const ys = [16, 26, 36, 46, 56, 66, 76, 86];
    const shadow = ys.map((y) => `<rect x="25" y="${y + 2.6}" width="56" height="7" rx="1.5"/>`).join("");
    const slats = ys.map((y) => `<rect class="tw-bar" x="22" y="${y}" width="56" height="7" rx="1.5"/><rect x="22" y="${y}" width="56" height="7" rx="1.5" fill="url(#${g}g)"/><path d="M24 ${y + 0.7} H76" stroke="rgba(255,255,255,.35)" stroke-width=".6"/><path d="M23 ${y + 6.6} H77" stroke="rgba(0,0,0,.35)" stroke-width=".7"/><rect x="74" y="${y + 0.6}" width="3.4" height="5.8" rx="1.2" fill="rgba(0,0,0,.18)"/>`).join("");
    return `<svg class="tw-svg" viewBox="0 0 96 108"><defs>${sheen}${svgGrad(`${g}r`, [[0, "var(--ac-body-lo,#22262a)"], [0.5, "var(--ac-body-hi,#4a5158)"], [1, "var(--ac-body,#2b3036)"]])}</defs>
<g fill="rgba(0,0,0,.09)">${shadow}<rect x="23" y="16.6" width="5" height="86" rx="2"/></g>
<rect x="17.6" y="20" width="4" height="4" rx="1" fill="#7d868f"/><rect x="17.6" y="88" width="4" height="4" rx="1" fill="#7d868f"/>
${slats}
<rect class="tw-rail r1" x="20" y="14" width="5" height="86" rx="2" fill="url(#${g}r)"/><path d="M21.2 16 V98" stroke="rgba(255,255,255,.35)" stroke-width=".8" stroke-linecap="round"/>
${twTowel(40, 13, 26, 44, "#ef9a9a", "#d97f7f")}
${box(62, 93, 18, 10, `url(#${g}r)`)}</svg>`;
  }
  const ys = [18, 24, 30, 36, 48, 54, 60, 72, 78, 84];
  const shadow = ys.map((y) => `<rect x="23" y="${y + 2.6}" width="54" height="3.4" rx="1.7"/>`).join("");
  const bars = ys.map((y) => `<rect class="tw-bar" x="21" y="${y}" width="54" height="3.4" rx="1.7"/><rect x="21" y="${y}" width="54" height="3.4" rx="1.7" fill="url(#${g}g)"/>`).join("");
  const rail = (x, n) => `<rect class="tw-rail r${n}" x="${x}" y="12" width="6" height="86" rx="3" fill="url(#${g}r)"/><path d="M${x + 1.5} 14.4 V95.6" stroke="rgba(255,255,255,.85)" stroke-width=".9" stroke-linecap="round"/><ellipse cx="${x + 3}" cy="13.2" rx="2.4" ry=".9" fill="rgba(0,0,0,.12)"/>`;
  const collars = ys.map((y) => `<rect x="23.6" y="${y - 0.4}" width="1.4" height="4.2" rx=".6" fill="rgba(0,0,0,.1)"/><rect x="71" y="${y - 0.4}" width="1.4" height="4.2" rx=".6" fill="rgba(0,0,0,.1)"/>`).join("");
  return `<svg class="tw-svg" viewBox="0 0 96 108"><defs>${sheen}${svgGrad(`${g}r`, [[0, "var(--ac-body-lo,#c9d0d6)"], [0.4, "var(--ac-body-hi,#ffffff)"], [1, "var(--ac-body-lo,#b9c1c8)"]])}</defs>
<g fill="rgba(0,0,0,.08)">${shadow}<rect x="21" y="15" width="6" height="86" rx="3"/><rect x="75" y="15" width="6" height="86" rx="3"/></g>
${[[16, 22], [16, 90], [70, 22], [70, 90]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="3" rx="1.2" fill="#aeb6bd"/>`).join("")}
${bars}${collars}${rail(18, 1)}${rail(72, 2)}
${twTowel(33, 46.4, 30, 30, "#80cbc4", "#5fb3ab")}
${box(66, 90, 18, 12, `url(#${g}r)`)}</svg>`;
}

// The kettle, as one drawing in two looks: the classic jug, in the colour of
// the appliance, and a stainless one with its black handle. The ids carry a
// number of their own, as each card draws its gradients again.
let kettleN = 0;
function kettleSvg(layout) {
  const g = `kt${kettleN++}`;
  const glow = `<radialGradient id="${g}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff8a50"/><stop offset="1" stop-color="#ff7043" stop-opacity="0"/></radialGradient>`;
  const water = `<linearGradient id="${g}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a4dcf9"/><stop offset="1" stop-color="#3b9fd8"/></linearGradient>`;
  const steam = (x1, y1, x2, y2) => `<path class="kt-steam s1" d="M${x1} ${y1} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`
    + `<path class="kt-steam s2" d="M${x2} ${y2} c-3 -3 2 -6 -1 -9 c-2 -2 1 -5 0 -7"/>`;
  const bubbles = (x, y) => `<circle class="kt-bub" cx="${x}" cy="${y}" r="1"/><circle class="kt-bub b2" cx="${x - 0.6}" cy="${y - 1}" r=".8"/><circle class="kt-bub b3" cx="${x + 0.4}" cy="${y + 1}" r=".7"/>`;
  if (layout === "steel") {
    return `<svg class="kt-svg" viewBox="0 0 96 96"><defs>${glow}${water}
<linearGradient id="${g}b" x1="0" x2="1"><stop offset="0" stop-color="#727c86"/><stop offset=".22" stop-color="#c8d0d7"/><stop offset=".42" stop-color="#f6f8fa"/><stop offset=".62" stop-color="#bcc4cc"/><stop offset="1" stop-color="#5f6872"/></linearGradient></defs>
<ellipse class="kt-glow" cx="47" cy="87" rx="34" ry="7" fill="url(#${g}g)"/>
<path d="M19 82 H75 Q79 82 79 85.5 V87 Q79 90 75 90 H19 Q15 90 15 87 V85.5 Q15 82 19 82 Z" fill="#24282d"/>
<rect class="kt-ring" x="21" y="87.6" width="52" height="1.4" rx=".7" fill="#ff7043"/>
${steam(16, 22, 21, 21)}
<path d="M63 33 C79 31 84 42 82 55 C80 67 75 73 67 76" fill="none" stroke="#24282d" stroke-width="7" stroke-linecap="round"/>
<path d="M34 38 C27 36 21 31.5 16.6 27 Q14.2 25.2 14.6 28.4 C16.5 36 22 46 31 54 Z" fill="url(#${g}b)" stroke="#59626b" stroke-width=".7" stroke-linejoin="round"/>
<path class="kt-body" d="M36 30 H58 Q63 30 64.5 36 C69 48 72 62 70.5 74 Q70 82 63 82 H31 Q24 82 23.5 74 C22 62 25 48 29.5 36 Q31 30 36 30 Z" fill="url(#${g}b)" stroke="#59626b" stroke-width=".7"/>
<path d="M27.5 70 C35 73 59 73 66.5 70" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
<rect x="58.5" y="42" width="5.6" height="30" rx="2.8" fill="#1d2126"/>
<rect x="59.3" y="56" width="4" height="15" rx="2" fill="url(#${g}w)"/>
${bubbles(61.3, 69)}
<path d="M33 30.5 Q47 22 61 30.5 Z" fill="#24282d"/>
<rect x="43" y="20.5" width="8" height="4.4" rx="2.2" fill="#24282d"/>
<rect class="kt-led" x="66" y="72" width="5.6" height="3" rx="1.5"/>
</svg>`;
  }
  const line = "rgba(0,0,0,.22)";
  return `<svg class="kt-svg" viewBox="0 0 96 96"><defs>${glow}${water}
<linearGradient id="${g}b" x1="0" x2="1"><stop offset="0" style="stop-color:var(--ac-body-lo,#dfe4e9)"/><stop offset=".42" style="stop-color:var(--ac-body-hi,#ffffff)"/><stop offset=".7" style="stop-color:var(--ac-body,#f1f4f6)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c3cad1)"/></linearGradient></defs>
<ellipse class="kt-glow" cx="46" cy="87" rx="34" ry="7" fill="url(#${g}g)"/>
<path d="M17 82 H75 Q78 82 78 85 V87 Q78 90 74 90 H18 Q14 90 14 87 V85 Q14 82 17 82 Z" fill="#3a4047"/>
<rect class="kt-ring" x="20" y="88" width="52" height="1.4" rx=".7" fill="#ff7043"/>
${steam(13, 20, 17, 20)}
<path d="M64 31 C80 29 84 40 83 53 C82 66 77 73 68 77" fill="none" stroke="${line}" stroke-width="8" stroke-linecap="round"/>
<path d="M64 31 C80 29 84 40 83 53 C82 66 77 73 68 77" fill="none" stroke="url(#${g}b)" stroke-width="6.4" stroke-linecap="round"/>
<path d="M32 33 C25 31.5 19 27 14.6 22.8 Q12.2 21 12.6 24 C14.5 32 20 42 29 50 Z" fill="url(#${g}b)" stroke="${line}" stroke-width=".8" stroke-linejoin="round"/>
<path class="kt-body" d="M32 26 H62 Q66 26 66.6 30 L71.5 76 Q72 82 66 82 H27 Q21 82 21.5 76 L27.4 30 Q28 26 32 26 Z" fill="url(#${g}b)" stroke="${line}" stroke-width=".8"/>
<rect x="57" y="36" width="6.4" height="40" rx="3.2" fill="#e3e9ee" stroke="${line}" stroke-width=".6"/>
<rect x="57.9" y="55" width="4.6" height="20.2" rx="2.3" fill="url(#${g}w)"/>
<path d="M57.2 45 h2 M57.2 55 h2 M57.2 65 h2" stroke="#9aa3ad" stroke-width=".6"/>
${bubbles(60.2, 73)}
<path d="M29.5 26.5 Q47 17 64.5 26.5 Z" style="fill:var(--ac-body,#e8edf1)" stroke="${line}" stroke-width=".8" stroke-linejoin="round"/>
<rect x="42.5" y="16.5" width="9" height="4.4" rx="2.2" fill="#8f98a2"/>
<rect class="kt-led" x="66.5" y="73.6" width="6" height="3" rx="1.5"/>
</svg>`;
}

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
<ellipse cx="40" cy="103.5" rx="30" ry="2" fill="rgba(0,0,0,.14)"/>
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
<ellipse cx="42" cy="104.5" rx="30" ry="1.6" fill="rgba(0,0,0,.15)"/>
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

// The shelter over a mower's base, seen three-quarters like the mower: a part
// behind it (the far posts, the shadow, the inside of a shell) and a part in
// front (the near posts, the roof). The rain stops on the roof.
const SHELTER_STYLES = ["lean_to", "shell", "garage"];
const SHELTER_COLORS = {
  white: ["#ffffff", "#e2e6ea", "#c3cad0", "#c9d0d6", "#a3abb2", "#b3bbc2", "#8d959c", "#8a929a", "#aab2b9", "rgba(255,255,255,.9)", "#5f676f"],
  grey: ["#c9ced3", "#9ea5ac", "#7f878f", "#8a9299", "#677078", "#7a838b", "#5c646c", "#545c63", "#747c84", "rgba(255,255,255,.55)", "#3f454b"],
  black: ["#5c636b", "#3b4148", "#2a2f34", "#3a4046", "#262a2f", "#30353a", "#1f2327", "#15181b", "#2e3338", "rgba(255,255,255,.3)", "#1c1f22"],
  green: ["#8fcf8a", "#4f9a4c", "#3a7a38", "#4c8f49", "#33682f", "#41803e", "#2c5a29", "#24491f", "#3d7a3a", "rgba(255,255,255,.5)", "#2c4a2a"],
  orange: ["#ffb067", "#f07f1e", "#c9620f", "#e07314", "#b0560a", "#c8650f", "#9a4a07", "#7f3d05", "#c2600e", "rgba(255,255,255,.55)", "#6b3a12"],
};
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
<path d="M20.5 9.2 L24.5 5.3 H52 L48 9.2 Z M50 9.2 L54 5.3 H85 L81 9.2 Z" fill="none" stroke="${c.edge}" stroke-width=".5"/>
<rect x="33" y="6.6" width="5" height="1.2" rx=".6" fill="${c.side}"/><rect x="64" y="6.6" width="5" height="1.2" rx=".6" fill="${c.side}"/>
<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" fill="url(#${g}f)" stroke="${c.edge}" stroke-width=".45"/>${gauges}
<circle cx="48" cy="20" r="2.6" fill="none" stroke="${c.edge}" stroke-width=".6"/>
<rect x="22" y="34" width="52" height="13" rx="2.4" fill="${panel}" stroke="${c.edge}" stroke-width=".45"/>
<g class="rbx-win"><rect x="25" y="36.4" width="46" height="8.2" rx="1.6" fill="rgba(40,46,52,.55)"/><rect class="rbx-dustlv" x="25" y="40.6" width="46" height="4" rx="1" fill="rgba(150,125,90,.8)"/>
<g class="rbx-dust" fill="#a1886a"><circle cx="38" cy="50" r=".9"/><circle cx="47" cy="51" r=".8"/><circle cx="56" cy="50" r=".9"/></g></g>
<rect class="rbx-led" x="45" y="48.4" width="6" height="1.4" rx=".7"/>
<rect x="20" y="${BT}" width="56" height="${Y1 - BT}" rx="3" fill="url(#${g}b)"/>
<path d="M22.5 ${BT + 2.4} H73.5" stroke="rgba(255,255,255,.14)" stroke-width=".7"/>
<path d="M20 ${Y1} H83 L75 89 H12 Z" fill="${c.side}" stroke="${c.edge}" stroke-width=".45" opacity=".9"/>
<path d="M24 77.5 H79 M19 82.5 H77" stroke="rgba(0,0,0,.1)" stroke-width=".5"/></svg>`;
}

function robotHtml(cls, r) {
  if (r.layout === "pool") return ntHtml(`${cls} rbt rbt-l-pool rbt-m-${r.mode || "docked"}`, { kind: "pool", on: r.mode === "cleaning", lcd: r.poolTime || "" });
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
  const err = ROBOT_MANGA + ROBOT_ANGER;
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
      : `<div class="rbt-dock"><i class="rbt-dled"></i><div class="rbt-bin"><div class="rbt-fill"></div>${"<b></b>".repeat(3)}</div></div><div class="rbt-dcap"></div>
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
        <div class="machine ${cls} rbt rbt-l-${layout} rbt-m-${draw}${r.cleanMode ? ` rbt-cm-${r.cleanMode}` : ""}${r.base ? " rbt-base" : ""}${r.box && layout !== "mower" ? ` rbt-box rbx-${ROBOT_BOX_SKINS[r.boxColor] ? r.boxColor : "white"}` : ""}${r.shelter ? ` rbt-roof rbt-sh-${r.shelter}` : ""}">
          ${inner}
        </div>`;
}

// Where each part of a toaster sits: [left, top, width, height] and the
// corners of its top, the slots as [left, top, width], the slices as [class,
// left, top, width, height], the levers as [left, raised, lowered].
const TOASTER_LAYOUTS = {
  two: {
    top: [16, 38, 64, 13, "9px 9px 3px 3px"], face: [16, 49, 64, 45],
    slots: [[23, 40.5, 50], [22, 45.5, 52]], toasts: [["back", 26, 21, 44, 22], ["", 24, 26, 48, 21.5]],
    levers: [[68, 55, 78]], dials: [[22, 63, 11]], btns: [[38, 65], [38, 71]], led: [50, 66],
    tray: [26, 88, 44], feet: [20, 68], air: [18, 2, 60, 36],
  },
  four: {
    top: [4, 38, 88, 13, "9px 9px 3px 3px"], face: [4, 49, 88, 45],
    slots: [[10, 40.5, 34], [9, 45.5, 36], [52, 40.5, 34], [51, 45.5, 36]],
    toasts: [["back", 12, 21, 30, 22], ["", 11, 26, 32, 21.5], ["back", 54, 21, 30, 22], ["", 53, 26, 32, 21.5]],
    levers: [[8, 55, 78], [78, 55, 78]], dials: [[26, 63, 10], [60, 63, 10]], btns: [], led: [46.5, 66],
    tray: [26, 88, 44], feet: [10, 78], air: [6, 2, 84, 36],
  },
  long: {
    top: [4, 47, 88, 10, "8px 8px 2px 2px"], face: [4, 55, 88, 39],
    slots: [[11, 50, 74]], toasts: [["", 13, 32, 34, 20], ["", 49, 32, 34, 20]],
    levers: [[78, 60, 79]], dials: [[13, 66, 10]], btns: [[28, 69]], led: [40, 69.5],
    tray: [30, 88, 36], feet: [10, 78], air: [6, 12, 84, 36],
  },
};
function toasterHtml(cls, tp) {
  const L = TOASTER_LAYOUTS[tp.layout] || TOASTER_LAYOUTS.two;
  const box = (c, x, y, w, h, r) => `<div class="${c}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px;${r ? ` border-radius: ${r};` : ""}"></div>`;
  const [ax, ay, aw, ah] = L.air;
  return `
        <div class="machine ${cls} tp-${tp.layout || "two"} mode-${tp.mode || "off"}">
          <div style="position: absolute; left: ${ax}px; top: ${ay}px; width: ${aw}px; height: ${ah}px">${airFlow("tp-air", aw, ah, false).replace("<svg ", '<svg style="width: 100%; height: 100%" ')}</div>
          ${box("tp-top", ...L.top)}${box("tp-face", ...L.face, "3px 3px 9px 9px")}
          ${L.slots.map(([x, y, w]) => box("tp-slot", x, y, w, 3.5)).join("")}
          ${L.toasts.map(([c, x, y, w, h]) => box(`tp-toast${c ? ` ${c}` : ""}`, x, y, w, h)).join("")}
          ${L.levers.map(([x, up, low]) => `${box("tp-track", x + 3.7, up + 1, 2.5, low - up + 3)}<div class="tp-lever" style="left: ${x}px; top: ${up}px; --tp-low: ${low}px"></div>`).join("")}
          ${L.dials.map(([x, y, d]) => box("tp-dial", x, y, d, d)).join("")}
          ${L.btns.map(([x, y]) => `<div class="tp-btn" style="left: ${x}px; top: ${y}px"></div>`).join("")}
          <div class="tp-led" style="left: ${L.led[0]}px; top: ${L.led[1]}px"></div>
          ${box("tp-tray", L.tray[0], L.tray[1], L.tray[2], 2)}
          ${L.feet.map((x) => `<div class="tp-foot" style="left: ${x}px"></div>`).join("")}
        </div>`;
}

// The pictures a lit screen can show. The logo's three animations share one
// delay, so it reaches a corner exactly when the flash and the confetti go
// off: the two bounces take 4.1 s and 2.9 s, and they meet at an end together
// every 118.9 s. Starting 30 s in, the first corner is a minute and a half
// away rather than right away.
const SCREEN_CODE_COLORS = ["#c792ea", "#82aaff", "#ffcb6b", "#c3e88d", "#89ddff", "#f78c6c"];
function screenPictureHtml(img, sc = {}) {
  const at = (x, y, w, h) => `left: ${x}%; top: ${y}%; width: ${w}%; height: ${h}%`;
  switch (img) {
    case "dashboard":
      return `<div class="si-dash"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    case "saver":
      return `<div class="si-saver"><b>${esc(sc.clock || "")}<small>${esc(sc.date || "")}</small></b></div>`;
    case "aquarium":
      return `<div class="si-aquarium"><span class="sand"></span>`
        + `<span class="weed" style="left: 12%"></span><span class="weed" style="left: 17%; height: 28%; animation-delay: calc(-1s + var(--anim-offset, 0s))"></span><span class="weed" style="left: 80%; height: 34%; animation-delay: calc(-2s + var(--anim-offset, 0s))"></span>`
        + `<span class="fish" style="top: 28%; --f: #ff9800; --sw: 6s"></span><span class="fish" style="top: 52%; --f: #ffeb3b; --sw: 8.5s; animation-delay: calc(-4s + var(--anim-offset, 0s))"></span>`
        + `<span class="fish" style="top: 40%; --f: #f06292; --sw: 7s; animation-delay: calc(-2s + var(--anim-offset, 0s)); width: 9%; height: 9%"></span>`
        + `<span class="bub" style="left: 20%"></span><span class="bub" style="left: 22%; animation-delay: calc(-1.4s + var(--anim-offset, 0s))"></span><span class="bub" style="left: 84%; animation-delay: calc(-0.7s + var(--anim-offset, 0s))"></span></div>`;
    case "bars":
      return `<div class="si-bars"><b></b></div>`;
    case "football":
      return `<div class="si-football"><span class="crowd"></span><span class="lines"></span><span class="goal l"></span><span class="goal r"></span>`
        + [["#e53935", 52, -0.4], ["#e53935", 66, -1.6], ["#e53935", 44, -2.6], ["#1e88e5", 58, -0.9], ["#1e88e5", 70, -2.1], ["#1e88e5", 46, -3]]
          .map(([k, y, d]) => `<span class="pl" style="--k: ${k}; top: ${y}%; animation-delay: calc(${d}s + var(--anim-offset, 0s))"></span>`).join("")
        + `<span class="ball"></span><span class="score">2-1</span></div>`;
    case "space":
      return `<div class="si-space"><b></b><i></i></div>`;
    case "bounce":
      return `<div class="si-bounce"><span class="logo" style="animation-delay: calc(-30s + var(--anim-offset, 0s))">HA</span><span class="flash" style="animation-delay: calc(-30s + var(--anim-offset, 0s))"></span>`
        + [["#ef5350", 8], ["#ffee58", 22], ["#66bb6a", 36], ["#42a5f5", 50], ["#ab47bc", 64], ["#ffa726", 78], ["#26c6da", 90]]
          .map(([c, x], k) => `<span class="bit" style="--c: ${c}; left: ${x}%; top: ${-12 - (k % 3) * 9}%; animation-delay: calc(-30s + var(--anim-offset, 0s))"></span>`).join("")
        + `</div>`;
    case "desktop":
      return `<div class="si-desktop"><i style="${at(10, 14, 45, 48)}"></i><i class="mv" style="${at(40, 32, 48, 46)}"></i><u></u></div>`;
    case "code": {
      let rows = "";
      for (let k = 0; k < 24; k++) {
        rows += `<i style="--c: ${SCREEN_CODE_COLORS[(k * 7) % 6]}; --w: ${20 + ((k * 37) % 55)}%; --x: ${[0, 8, 8, 16, 8, 0][k % 6]}%"></i>`;
      }
      return `<div class="si-code"><div class="lines">${rows}${rows}</div></div>`;
    }
    case "pong":
      return `<div class="si-pong"><span class="score">3 2</span><span class="pad" style="left: 4%"></span><span class="pad r" style="right: 4%"></span><span class="ball"></span></div>`;
    case "home":
      return `<div class="si-home"><u></u>`
        + [["#e50914", 4, 30, "f"], ["#1db954", 28, 30], ["#0f79af", 52, 30], ["#ff0000", 76, 30], ["#f5c518", 4, 60], ["#7b1fa2", 28, 60], ["#00a8e1", 52, 60], ["#ff6d00", 76, 60]]
          .map(([c, x, y, f]) => `<i${f ? ' class="f"' : ""} style="--c: ${c}; left: ${x}%; top: ${y}%"></i>`).join("")
        + `</div>`;
    default:
      return `<div class="si-sunset"><b></b><i></i></div>`;
  }
}
const SCREEN_BADGE = (cls, d) => `<span class="scr-badge ${cls}"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.55)"/><path fill="#fff" d="${d}"/></svg></span>`;
const SCREEN_BADGES = SCREEN_BADGE("play", "M9 7v10l8-5z") + SCREEN_BADGE("pause", "M8 7h3v10H8zM13 7h3v10h-3z")
  + SCREEN_BADGE("mute", "M5 10v4h3l4 3V7L8 10zM14.6 9.7l1-1 2.4 2.4 2.4-2.4 1 1-2.4 2.4 2.4 2.4-1 1-2.4-2.4-2.4 2.4-1-1 2.4-2.4z");
// A laptop's keyboard in the deck's perspective: the deck widens towards the
// front, so each row's keys widen with it and their sides lean like the deck's.
const LAPTOP_COLORS = {
  silver: ["#c9ced4", "#eef0f2", "#8e959c"], space_grey: ["#7d8187", "#a3a7ac", "#55595e"],
  black: ["#3a3f45", "#575d64", "#202428"], midnight: ["#2e3440", "#4a5263", "#1b1f27"], gold: ["#e3cfae", "#f6ead6", "#b89f78"], rose: ["#e6c3bb", "#f6e1dc", "#b9918a"],
};
// The classic one, a PC's, adds its numeric keypad on the right.
const LAPTOP_STYLES = ["thin", "classic"];
const LAPTOP_THIN_RE = /macbook|apple|mac ?book/;
function laptopStyleOf(cfg, st) {
  if (LAPTOP_STYLES.includes(cfg.laptop_style)) return cfg.laptop_style;
  const name = stripAccents(`${cfg.state_entity || ""} ${stHay(st)}`.toLowerCase());
  return LAPTOP_THIN_RE.test(name) ? "thin" : "classic";
}
function laptopKeys(classic) {
  const xl = (y) => 16 - 10 * (y - 68.4) / 14 + 1.6;
  const xr = (y) => 80 + 10 * (y - 68.4) / 14 - 1.6;
  const T = classic ? 17.8 : 14;
  const at = (y, u) => xl(y) + (xr(y) - xl(y)) * u / T;
  const rows = [[69.7, 71.0], [71.2, 72.6], [72.8, 74.2], [74.4, 75.8], [76.0, 77.4]];
  const pad = classic ? [0.6, 1.07, 1.07, 1.06] : [];
  const cells = [];
  rows.forEach(([y0, y1], r) => {
    const keys = (r === 4 ? [1, 1, 1, 1.2, 5.6, 1.2, 1, 1, 1] : Array(14).fill(1)).concat(pad);
    let u = 0;
    for (const [i, w] of keys.entries()) {
      // The gap before the keypad is a gap, not a key.
      if (classic && i === keys.length - 4) { u += w; continue; }
      const a = u + 0.12, b = u + w - 0.12;
      cells.push(`${at(y0, a).toFixed(2)},${y0} ${at(y0, b).toFixed(2)},${y0} ${at(y1, b).toFixed(2)},${y1} ${at(y1, a).toFixed(2)},${y1}`);
      u += w;
    }
  });
  return `<svg class="lap-keys" viewBox="0 0 96 106" aria-hidden="true">${cells.map((c) => `<polygon points="${c}"/>`).join("")}</svg>`;
}
function screenHtml(cls, sc) {
  const layout = SCREEN_LAYOUTS.includes(sc.layout) ? sc.layout : "tv_feet";
  const mode = sc.mode || "off";
  const box = (c, x, y, w, h, extra = "") => `<div class="${c}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px${extra}"></div>`;
  const tablet = SCREEN_TABLETS.includes(layout);
  const picture = mode === "saver" ? screenPictureHtml("saver", sc)
    : mode === "home" ? screenPictureHtml(tablet ? "dashboard" : "home")
      : sc.cover ? `<img class="scr-cover" src="${esc(sc.cover)}" alt="">`
        : screenPictureHtml(sc.image);
  const glassInner = `<div class="scr-pic">${SCREEN_LIT.includes(mode) ? picture : ""}</div>${mode === "locked" ? '<div class="scr-lock"></div>' : ""}${SCREEN_BADGES}`;
  const tv = (y) => `${box("scr-bezel", 1, y, 94, 54)}<div class="scr-glass" style="left: 3px; top: ${y + 2}px; width: 90px; height: 49px">${glassInner}</div>`
    + box("scr-led", 46.8, y + 51.8, 2.4, 2.4);
  let body;
  if (layout === "tv_stand") body = tv(28) + box("scr-neck", 44, 82, 8, 7) + box("scr-base", 28, 88, 40, 5);
  else if (layout === "tv_wall") body = box("scr-shade", 3, 31, 92, 54) + tv(27);
  else if (layout === "projector") {
    body = box("scr-rod", 10, 0, 1, 3) + box("scr-rod", 85, 0, 1, 3)
      + `<div class="scr-wall" style="left: 1px; top: 3px; width: 94px; height: 50px">${glassInner}</div>`
      + box("scr-beam", 1, 53, 94, 18) + box("scr-body", 24, 69, 48, 15) + box("scr-vent", 56, 73, 12, 7)
      + box("scr-lens", 46, 70, 11, 11) + box("scr-led", 29, 73, 2.4, 2.4) + box("scr-feet", 28, 84, 4, 2) + box("scr-feet", 64, 84, 4, 2);
  } else if (layout === "computer") {
    body = box("scr-bezel", 2, 26, 64, 42) + `<div class="scr-glass" style="left: 5px; top: 29px; width: 58px; height: 35px">${glassInner}</div>`
      + box("scr-neck", 30, 68, 8, 13) + box("scr-base", 20, 80, 28, 4) + box("scr-tower", 72, 34, 20, 50)
      + box("scr-slot", 75, 40, 14, 1.5) + box("scr-slot", 75, 44, 14, 1.5) + box("scr-led", 80.8, 76, 2.4, 2.4);
  } else if (layout === "laptop") {
    // A laptop open on the desk: its lid upright with the screen, the
    // keyboard and the trackpad on the deck seen from above, a light on the
    // front edge, and its cable while it charges.
    // The classic one: a thicker bezel and base, the keypad, the trackpad
    // off centre with its two buttons, a sticker on the palm rest.
    const classic = sc.laptopStyle === "classic";
    body = box("lap-shadow", 4, 82, 88, 6) + box("scr-bezel lap-lid", 16, 26, 64, 41)
      + (classic ? `<div class="scr-glass" style="left: 20px; top: 29.5px; width: 56px; height: 33.5px">${glassInner}</div>` + box("lap-brand", 45, 64.6, 6, 0.9)
        : `<div class="scr-glass" style="left: 19px; top: 29px; width: 58px; height: 35.5px">${glassInner}</div>`)
      + box("lap-cam", 47.4, 27.1, 1.2, 1.2) + box("lap-hinge", 16, 67, 64, 1.6)
      + box("lap-deck", 6, 68.4, 84, 14) + laptopKeys(classic)
      + (classic ? box("lap-pad", 33, 77.9, 17, 2.7) + box("lap-btns", 32.6, 80.7, 17.8, 1.1) + box("lap-sticker", 70, 78.6, 4.4, 2.6)
          + box("lap-edge", 6, 82.4, 84, 3.4) + box("scr-led", 10, 83.3, 1.6, 1) + box("scr-led", 13, 83.3, 1.6, 1) + box("lap-vent", 66, 83.4, 14, 1.2)
        : box("lap-pad", 38, 77.9, 20, 3.6) + box("lap-edge", 6, 82.4, 84, 2.4) + box("lap-notch", 42, 82.4, 12, 0.9) + box("scr-led", 12, 82.9, 2, 1.2))
      + (sc.charging ? box("lap-cable", 90, 79, 6, 1.4) + `<svg class="tab-bolt" viewBox="0 0 10 14" style="left: 88px; top: 71px"><path d="M6 0 0 8h4l-1 6 6-8H5z"/></svg>` : "");
  } else if (tablet) {
    // A wall tablet, drawn on its patch of wall (#62): flat on its mount, in
    // a wooden frame like a picture, or upright with a light bar on top. Its
    // front camera lights when it sees someone, and its cable only hangs
    // from it while it charges.
    const glass = (x, y, w, h) => `<div class="scr-glass tab-glass" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px">${glassInner}</div>`;
    const bolt = (x, y) => (sc.charging ? `<svg class="tab-bolt" viewBox="0 0 10 14" style="left: ${x}px; top: ${y}px"><path d="M6 0 0 8h4l-1 6 6-8H5z"/></svg>` : "");
    if (layout === "tablet_frame") {
      body = box("tab-wallbg", 4, 26, 88, 59) + box("tab-shadow", 13, 34, 74, 49) + box("tab-wood", 11, 30, 74, 50) + box("tab-mat", 15, 34, 66, 42)
        + glass(19, 37.5, 58, 35) + box("tab-cam", 47.25, 35.25, 1.5, 1.5) + (sc.charging ? box("tab-cable", 47.5, 80, 1.25, 5) : "") + bolt(50, 79);
    } else if (layout === "tablet_portrait") {
      body = box("tab-wallbg", 18, 24, 60, 64) + box("tab-shadow", 35, 31, 30, 50) + box("tab-body light", 33, 28, 30, 51)
        + box("tab-lightbar", 40, 29, 16, 1.25) + glass(35, 32, 26, 43) + box("tab-cam", 47.25, 76.5, 1.5, 1.5)
        + (sc.charging ? box("tab-cable", 47.5, 79, 1.25, 9) : "") + bolt(50, 80);
    } else {
      body = box("tab-wallbg", 4, 26, 88, 59) + box("tab-shadow", 17, 37, 66, 42) + box("tab-body", 15, 33, 66, 43)
        + glass(18.5, 36.5, 59, 36) + box("tab-cam", 47.5, 34.25, 1.5, 1.5) + (sc.charging ? box("tab-cable", 47.5, 76, 1.25, 9) : "") + bolt(50, 77);
    }
  } else body = tv(30) + box("scr-foot l", 12, 84, 3, 8) + box("scr-foot r", 81, 84, 3, 8);
  const lit = SCREEN_LIT.includes(mode) ? " scr-lit" : "";
  // A television is wider than it is tall, and a computer too with its
  // tower, so in the box every other appliance fits in they came out small.
  // They are drawn larger, in a box cut to their own height, and so is the
  // projector's screen, as large as a television's.
  const band = SCREEN_BANDS[layout];
  const px = (v) => Math.round(v * 10) / 10;
  // On a narrow card, a phone's two columns, the drawing shrinks to the
  // width there is: --scr-fit, set by the card from that width, never above 1.
  const fit = "var(--scr-fit, 1)";
  const inner = band
    ? `<div class="scr-zoom" style="left: 0; top: calc(${px(-band[0] * band[2])}px * ${fit}); transform: scale(calc(${band[2]} * ${fit}))">${body}</div>`
    : body;
  const size = band
    ? ` data-fit-w="${px(96 * band[2])}" style="width: calc(${px(96 * band[2])}px * ${fit}); height: calc(${px(band[1] * band[2])}px * ${fit})"`
    : "";
  return `
        <div class="machine ${cls} scr-${layout} mode-${mode}${lit}${layout === "laptop" ? ` lap-st-${sc.laptopStyle === "classic" ? "classic" : "thin"}` : ""}${layout === "laptop" && LAPTOP_COLORS[sc.color] ? ` lap-${sc.color}` : ""}${sc.muted ? " muted" : ""}${tablet ? " tablet" : ""}${sc.charging ? " charging" : ""}${sc.seen ? " seen" : ""}${sc.tower ? ` tw-${sc.tower}` : ""}"${size}>${inner}</div>`;
}

// Washer, dryer, oven and microwave, drawn after real ones. They take the
// appliance colour through --ac-body, white by default for the laundry and a
// light frame for the cooking ones.
let apN = 0;
const apId = () => `ap${++apN}`;
const apSoft = (cx, cy, rx, ry, op = .22) => { const id = apId(); return `<filter id="${id}" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// A small screen, its text fitted to its width.
const apLcd = (x, y, w, h, text, fs, cls = "ap-lcd") => {
  const size = ntFit(text, w, fs);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.4" fill="#10161d"/><rect x="${x + .6}" y="${y + .6}" width="${w - 1.2}" height="${(h * .38).toFixed(2)}" rx="1" fill="#fff" opacity=".06"/>`
    + (text ? `<text class="${cls}" x="${x + w / 2}" y="${(y + h / 2 + size * .36).toFixed(2)}" font-size="${size.toFixed(2)}" font-weight="700" text-anchor="middle" ${NT_FONT}>${esc(text)}</text>` : "");
};
const apCabinet = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" style="stop-color: var(--ac-body, #eef1f4)"/><stop offset=".25" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".85" style="stop-color: var(--ac-body, #eef1f4)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c9d0d7)"/></linearGradient>`;
const apChrome = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f9fb"/><stop offset=".35" stop-color="#9aa4ae"/><stop offset=".6" stop-color="#eef1f4"/><stop offset="1" stop-color="#7d8792"/></linearGradient>`;
const apFeet = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="7" height="3" rx="1" fill="#59616b"/><rect x="${x2}" y="${y}" width="7" height="3" rx="1" fill="#59616b"/>`;
const AP_CLOTHES = { washer: ["#e57373", "#64b5f6", "#fff176"], dryer: ["#ce93d8", "#90caf9", "#a5d6a7"] };

// A front loader, after the Bosch Serie 6: the drawer, the screen and the
// dial on the panel, a round door with a chrome ring on the drum. While it
// washes the laundry turns in water the colour of its state; spinning, it
// whirls without water; drying, the drum glows warm. Opened, the door hangs
// on its two hinges.
function laundrySvg(type, d) {
  apN = 0;
  const c = apId(), ch = apId(), gl = apId(), drum = apId(), clip = apId(), warm = apId();
  // Water only while it washes: a drum at rest is drained, it can be opened.
  const dryer = type === "dryer", dry = dryer || d.drying, water = d.turning && !dryer && !d.drying && !d.spinCycle;
  // Turning, the laundry is spread round the drum; stopped, it has fallen
  // to the bottom.
  const at = d.turning ? [0, 120, 240].map((a) => a + (dryer ? 30 : 0)) : [145, 180, 215];
  const clothes = (AP_CLOTHES[dryer ? "dryer" : "washer"]).map((col, i) => `<g transform="rotate(${at[i]} 60 68)"><path d="M52 52 q9 -4 16 1 q3 6 -2 10 q-8 3 -14 -1 q-4 -5 0 -10 Z" fill="${col}"/><path d="M54 55 q6 -2 11 1" stroke="#fff" stroke-width=".8" opacity=".5" fill="none"/></g>`).join("");
  const panel = dryer
    ? `<rect x="31" y="13" width="22" height="12" rx="2.5" fill="#e8ecf0" stroke="#bcc4cc" stroke-width=".5"/><rect x="33" y="19" width="18" height="4" rx="1" fill="#bfe3f7" opacity=".9"/><path d="M38 16 H46" stroke="#9aa4ae" stroke-width="1" stroke-linecap="round"/>${apLcd(57, 15, 18, 9, d.screen, 6)}`
    : `<rect x="31" y="14" width="18" height="10" rx="2" fill="#e8ecf0" stroke="#bcc4cc" stroke-width=".5"/><path d="M34 21 H46" stroke="#9aa4ae" stroke-width="1.1" stroke-linecap="round"/>${apLcd(53, 15, 20, 9, d.screen, 6.4)}`;
  const door = d.open ? `<circle cx="60" cy="68" r="21" fill="#1a2027"/><circle cx="60" cy="68" r="19" fill="url(#${drum})"/>
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return `<circle cx="${(60 + Math.cos(a) * 12).toFixed(1)}" cy="${(68 + Math.sin(a) * 12).toFixed(1)}" r="1" fill="#2b333c"/>`; }).join("")}
<circle cx="60" cy="68" r="25.5" fill="none" stroke="#c4cbd2" stroke-width="2.4"/>
<rect x="29" y="58" width="7" height="4" rx="1.4" fill="#8e98a2"/><rect x="29" y="74" width="7" height="4" rx="1.4" fill="#8e98a2"/>
<g class="ap-door-open"><ellipse cx="23" cy="68" rx="9" ry="26.5" style="fill: var(--ac-body-lo, #d9dee3)"/>
<ellipse cx="23" cy="68" rx="8.2" ry="25.5" fill="${dryer ? "#f4f6f8" : `url(#${ch})`}"/>
<ellipse cx="22" cy="68" rx="5.6" ry="20" fill="#141a20"/><ellipse cx="22" cy="68" rx="5" ry="18.5" fill="url(#${gl})"/>
<path d="M19 54 Q20 50 22.5 49" stroke="#fff" stroke-width="1.4" opacity=".45" fill="none" stroke-linecap="round"/>
<rect x="13.5" y="62" width="3" height="12" rx="1.5" fill="url(#${ch})"/></g>`
    : `<circle cx="60" cy="68" r="27" style="fill: var(--ac-body-lo, #d9dee3)"/>
${dryer ? `<circle cx="60" cy="68" r="25.5" style="fill: var(--ac-body-hi, #f4f6f8)" stroke="#c4cbd2" stroke-width=".6"/>` : `<circle cx="60" cy="68" r="25.5" fill="url(#${ch})"/>`}
<circle cx="60" cy="68" r="21" fill="#141a20"/>
<g clip-path="url(#${clip})"><circle cx="60" cy="68" r="19" fill="url(#${drum})"/>
${dry ? `<circle class="ap-warm" cx="60" cy="68" r="19" fill="url(#${warm})"/>` : ""}
<g class="ap-load"><circle cx="60" cy="68" r="19" fill="none"/>${clothes}</g>
${water ? `<path class="ap-water" d="M36 76 Q49 71 60 76 T84 76 V92 H36 Z"/>` : ""}</g>
<circle cx="60" cy="68" r="19" fill="url(#${gl})"/>
<path d="M47 57 Q53 51 62 50" stroke="#fff" stroke-width="2.2" opacity=".35" fill="none" stroke-linecap="round"/>
<rect x="84" y="62" width="5" height="12" rx="2" fill="url(#${ch})"/>`;
  return `<svg class="ap-svg ap-${dryer ? "dryer" : "washer"}" viewBox="0 -10 120 135" aria-hidden="true"><defs>${apCabinet(c)}${apChrome(ch)}
<radialGradient id="${gl}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#9fb4c6" stop-opacity=".18"/><stop offset=".75" stop-color="#1d2a36" stop-opacity=".35"/><stop offset="1" stop-color="#0c1218" stop-opacity=".7"/></radialGradient>
<radialGradient id="${drum}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${dryer ? "#b8c0c8" : "#9aa4ae"}"/><stop offset="1" stop-color="${dryer ? "#4a525b" : "#3a434c"}"/></radialGradient>
<radialGradient id="${warm}" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#ffb74d" stop-opacity=".5"/><stop offset="1" stop-color="#ff7043" stop-opacity="0"/></radialGradient>
<clipPath id="${clip}"><circle cx="60" cy="68" r="19"/></clipPath></defs>
${apSoft(60, 113, 34, 3.4)}${apFeet(30, 83, 109)}
<rect class="ap-body" x="26" y="8" width="68" height="102" rx="5" fill="url(#${c})" stroke="#c4cbd2" stroke-width=".5"/>
<path d="M28 10 H92" stroke="#fff" stroke-width="1.4" opacity=".9"/>
<rect x="26" y="8" width="68" height="25" rx="5" fill="#000" opacity=".03"/><path d="M26 33 H94" stroke="#c4cbd2" stroke-width=".6"/>
${panel}
<circle cx="${dryer ? 84 : 83}" cy="20" r="6.4" fill="url(#${ch})"/><circle cx="${dryer ? 84 : 83}" cy="20" r="4.6" fill="#eef1f4" stroke="#aab3bc" stroke-width=".4"/><path class="ap-dial" d="M${dryer ? 84 : 83} 20 l${dryer ? -3 : 3} -3" stroke-width="1.1" stroke-linecap="round"/>
${door}
</svg>`;
}

// Three dishes for the oven, three for the microwave. The card picks one each
// time the appliance starts, so two ovens rarely cook the same thing.
const OVEN_DISHES = [
  (h) => `<path d="M40 70 h40 l-3 5 h-34 Z" fill="#4e342e"/><path d="M40 70 h40" stroke="#6d4c41" stroke-width="1"/>
<ellipse cx="60" cy="65" rx="12" ry="6.4" fill="${h ? "#d9893e" : "#c8a27a"}"/><ellipse cx="57" cy="62.6" rx="6" ry="2.4" fill="#fff" opacity=".22"/>
<ellipse cx="47.5" cy="67" rx="4.4" ry="2.6" fill="${h ? "#c97a34" : "#b8956f"}" transform="rotate(-25 47.5 67)"/><ellipse cx="72.5" cy="67" rx="4.4" ry="2.6" fill="${h ? "#c97a34" : "#b8956f"}" transform="rotate(25 72.5 67)"/>
<circle cx="44.6" cy="68.4" r="1.2" fill="#f5e6d3"/><circle cx="75.4" cy="68.4" r="1.2" fill="#f5e6d3"/>`,
  (h) => `<rect x="38" y="69.5" width="44" height="2.2" rx="1" fill="#7d8792"/>
<ellipse cx="60" cy="68.6" rx="19" ry="3.6" fill="${h ? "#e0a050" : "#d9b98a"}"/><ellipse cx="60" cy="68.2" rx="16" ry="2.7" fill="${h ? "#d84315" : "#b8735a"}"/>
${[[52, 67.8], [60, 69], [67, 67.6], [56, 68.9], [64, 68.6]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${i % 2 ? 1.6 : 2.2}" ry=".9" fill="${i % 2 ? "#fff3c4" : "#8e2a1a"}"/>`).join("")}
<ellipse cx="58" cy="67.6" rx="1.2" ry=".5" fill="#2e7d32"/>`,
  (h) => `<path d="M46 63 h28 v8 a14 2 0 0 1 -28 0 Z" fill="#59616b"/><path d="M46 63 h28" stroke="#9aa4ae" stroke-width=".8"/>
<path d="M47 63.5 Q60 ${h ? 53 : 57} 73 63.5 Z" fill="${h ? "#e8a95a" : "#d9c29a"}"/><path d="M53 60 Q60 ${h ? 57 : 59} 67 60" stroke="#a5652a" stroke-width=".7" fill="none" opacity=".7"/>`,
];
const MW_DISHES = [
  () => `<path d="M34 64 H58 Q57 74 46 74.5 Q35 74 34 64 Z" fill="#f5f5f5"/><ellipse cx="46" cy="64" rx="12" ry="2.6" fill="#ef6c00"/><ellipse cx="46" cy="64" rx="12" ry="2.6" fill="none" stroke="#fff" stroke-width=".8"/>`,
  () => `<ellipse cx="46" cy="72.5" rx="13" ry="2.8" fill="#f5f5f5"/><ellipse cx="46" cy="72" rx="10" ry="1.8" fill="#e0e0e0"/>
<path d="M36 71.6 Q45 66.6 55 70.4 L48 72.8 Z" fill="#e0a050"/><path d="M38 71.2 Q45 67.8 53 70.4 L47.6 72.1 Z" fill="#d84315"/>
<ellipse cx="44" cy="70.4" rx="1.4" ry=".6" fill="#8e2a1a"/><ellipse cx="49" cy="70.9" rx="1.2" ry=".5" fill="#fff3c4"/>`,
  () => `<path d="M53 63 q6 0 6 4.5 q0 4.5 -6 4.5" stroke="#1e88e5" stroke-width="2.2" fill="none"/>
<path d="M39 60.5 H53 V71 Q53 74 50 74 H42 Q39 74 39 71 Z" fill="#1e88e5"/><path d="M41 62 V71" stroke="#fff" stroke-width="1.2" opacity=".35" stroke-linecap="round"/>
<ellipse cx="46" cy="60.5" rx="7" ry="1.7" fill="#fafafa"/><ellipse cx="46" cy="60.5" rx="7" ry="1.7" fill="none" stroke="#1565c0" stroke-width=".6"/>`,
];
const COOK_DISHES = { oven: OVEN_DISHES.length, microwave: MW_DISHES.length };
const apSteam = (xs, y, w) => `<g class="ap-steam">${xs.map((x, i) => `<path class="apd${i + 1}" d="M${x} ${y} q${w} -2.5 0 -5 q-${w} -2.5 0 -5" stroke="#fff3e0" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join("")}</g>`;

// A built-in oven, after the Bosch Serie 8: a black glass door with a window
// on the cavity, the racks and a dish inside, the steel band with the screen
// and two knobs, framed in the appliance colour. Heating, the cavity glows
// and the top element pulses; its light alone lights it warm white. Opened,
// the door lies down in front of it.
function ovenSvg(d) {
  apN = 0;
  const g = apId(), cav = apId(), ch = apId(), hot = apId(), clip = apId();
  const h = d.heating, lit = h || d.lit;
  const dish = (OVEN_DISHES[d.dish] || OVEN_DISHES[0])(h);
  const inside = `<g clip-path="url(#${clip})">
<path d="M34 52 H86 M34 68 H86" stroke="${h ? "#ffcc80" : lit ? "#c9b48f" : "#7d8792"}" stroke-width=".8" opacity=".8"/>
<path class="ap-elem" d="M34 47 H86" stroke="${h ? "#ff5722" : "#5d6773"}" stroke-width="1.4"/>
${dish}${h ? `<ellipse class="ap-glow" cx="60" cy="64" rx="26" ry="14" fill="url(#${hot})"/>` : ""}</g>`;
  return `<svg class="ap-svg" viewBox="0 -10 120 135" aria-hidden="true"><defs>${apChrome(ch)}
<linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a434c"/><stop offset=".5" stop-color="#14191e"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<radialGradient id="${cav}" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="${h ? "#ffb74d" : lit ? "#fff3d6" : "#56606b"}"/><stop offset=".6" stop-color="${h ? "#e65100" : lit ? "#d9b77a" : "#2b333c"}"/><stop offset="1" stop-color="${h ? "#5d1f00" : lit ? "#6b5330" : "#14191e"}"/></radialGradient>
<radialGradient id="${hot}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9800" stop-opacity=".5"/><stop offset="1" stop-color="#ff9800" stop-opacity="0"/></radialGradient>
<clipPath id="${clip}"><rect x="34" y="44" width="52" height="40" rx="3"/></clipPath></defs>
<rect class="ap-body" x="14" y="6" width="92" height="108" rx="4" style="fill: var(--ac-body, #e3e7eb)" stroke="#c4cbd2" stroke-width=".6"/>
${apSoft(60, 107, 40, 2.4, .25)}
<rect x="20" y="12" width="80" height="17" rx="3" fill="url(#${ch})"/><rect x="20" y="25" width="80" height="4" fill="url(#${ch})"/>
<circle cx="32" cy="20.5" r="5.2" fill="#2b333c"/><circle cx="32" cy="20.5" r="4" fill="url(#${ch})"/><path d="M32 20.5 L32 17" stroke="#2b333c" stroke-width="1" stroke-linecap="round"/>
<circle cx="88" cy="20.5" r="5.2" fill="#2b333c"/><circle cx="88" cy="20.5" r="4" fill="url(#${ch})"/><path d="M88 20.5 L90.5 18" stroke="#2b333c" stroke-width="1" stroke-linecap="round"/>
${apLcd(45, 15.5, 30, 10, d.screen, 7)}
${d.open ? `<rect x="20" y="29" width="80" height="77" rx="2" fill="#0d1115"/>
<rect class="ap-cavity" x="34" y="44" width="52" height="40" rx="3" fill="url(#${cav})"/>
${inside}
<path class="ap-door-open" d="M18 106 H102 L110 118 H10 Z" fill="url(#${g})"/><path d="M14 118 H106" stroke="#000" stroke-width="1" opacity=".3"/><rect x="34" y="111" width="52" height="2.6" rx="1.3" fill="url(#${ch})"/>`
    : `<rect x="20" y="29" width="80" height="77" rx="3" fill="url(#${g})"/>
<rect x="26" y="33" width="68" height="3.6" rx="1.8" fill="url(#${ch})"/>
<rect class="ap-cavity" x="34" y="44" width="52" height="40" rx="3" fill="url(#${cav})"/>
${inside}
<rect x="34" y="44" width="52" height="40" rx="3" fill="none" stroke="#000" stroke-width="1.2" opacity=".5"/>
<path d="M36 46 L50 82" stroke="#fff" stroke-width="4" opacity=".06"/>
${h ? apSteam([48, 60, 72], 66, 2) : ""}`}
</svg>`;
}

// A countertop microwave, after the Samsung and Whirlpool ones: a dark door
// with a window on the turntable, the keypad on the right. While it runs the
// inside is lit and the dish goes round the plate, an ellipse seen from the
// front. Opened, the door swings out on its left hinges.
function microwaveSvg(d) {
  apN = 0;
  const b = apId(), cav = apId(), ch = apId(), clip = apId(), mesh = apId();
  const run = d.running;
  const dish = (MW_DISHES[d.dish] || MW_DISHES[0])();
  const food = `<g clip-path="url(#${clip})"><ellipse cx="46" cy="76" rx="20" ry="4.6" fill="#cfd6dd" opacity=".8"/>
<g class="ap-ttx"><g class="ap-tty">${dish}${run ? apSteam([42, 50], 62, 1.6) : ""}</g></g>
${d.open ? "" : `<rect x="18" y="42" width="56" height="40" fill="url(#${mesh})"/>`}</g>`;
  return `<svg class="ap-svg" viewBox="0 -10 120 135" aria-hidden="true"><defs>${apChrome(ch)}
<linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #e9edf1)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #b8c0c8)"/></linearGradient>
<radialGradient id="${cav}" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="${run ? "#ffe082" : d.open ? "#fff3d6" : "#59636e"}"/><stop offset=".7" stop-color="${run ? "#ffb300" : d.open ? "#d9c7a3" : "#2b333c"}"/><stop offset="1" stop-color="${run ? "#8d5a00" : d.open ? "#7a6a4f" : "#141a20"}"/></radialGradient>
<pattern id="${mesh}" width="2.2" height="2.2" patternUnits="userSpaceOnUse"><circle cx="1.1" cy="1.1" r=".5" fill="#000" opacity=".45"/></pattern>
<clipPath id="${clip}"><rect x="18" y="42" width="56" height="40" rx="3"/></clipPath></defs>
${apSoft(58, 99, 50, 3.6)}
<rect class="ap-body" x="10" y="32" width="100" height="64" rx="6" fill="url(#${b})" stroke="#9aa4ae" stroke-width=".5"/>
<path d="M14 34 H106" stroke="#fff" stroke-width="1.2" opacity=".8"/>
${d.open ? `<rect x="13" y="36" width="70" height="56" rx="4" fill="#2b333c"/>` : `<rect x="13" y="36" width="70" height="56" rx="4" fill="#14191e"/>`}
<rect class="ap-cavity" x="18" y="42" width="56" height="40" rx="3" fill="url(#${cav})"/>
${food}
${d.open ? `<path class="ap-door-open" d="M13 36 L1 30 V98 L13 92 Z" fill="#14191e" stroke="#2b333c" stroke-width=".6"/><path d="M4 36 V92" stroke="#fff" stroke-width="1" opacity=".15"/>`
    : `<path d="M20 44 L36 80" stroke="#fff" stroke-width="5" opacity=".07"/><rect x="79" y="40" width="2.4" height="48" rx="1.2" fill="url(#${ch})"/>`}
<rect x="86" y="36" width="20" height="56" rx="3" fill="#1d232a"/>
${apLcd(88, 40, 16, 8.6, d.screen, 5.6)}
${[0, 1, 2, 3].map((r) => [0, 1, 2].map((k) => `<rect x="${88.6 + k * 5.2}" y="${53 + r * 6}" width="4" height="4.2" rx="1" fill="#3a434c"/>`).join("")).join("")}
<rect class="ap-start" x="88.6" y="78" width="14.4" height="9" rx="2"/>
<rect x="18" y="96" width="8" height="2.6" rx="1" fill="#59616b"/><rect x="94" y="96" width="8" height="2.6" rx="1" fill="#59616b"/>
</svg>`;
}

// The colour of the line along the iron: orange, blue, or the iron's own.
const IRON_LINES = {
  orange: ["#f57c00", "#ffb74d"],
  blue: ["#1565c0", "#64b5f6"],
  body: ["var(--ac-body-lo, #aab3bc)", "var(--ac-body, #dfe5ec)"],
};
// A fixed scatter, so the steam looks random but stays put from one render to
// the next instead of jumping each time the state updates.
const irRnd = (n) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
// Which of the eight clouds rise: three on a light draw, five on a fuller
// one, all eight at full power, two wisps when the iron is hot and waiting.
const IRON_STEAM = { 1: [1, 4, 6], 2: [0, 2, 3, 5, 7], 3: [0, 1, 2, 3, 4, 5, 6, 7], ready: [2, 5] };
// Where the soleplate burns when the iron has been left on.
const IRON_FIRE = [14, 27, 40, 53, 66, 79, 92, 104].map((x) => [x, 87]);
const irFlames = (x, y, s, i) => `<g class="ir-f${i % 3}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})">
<path class="ir-flick" d="M-16 0 Q-22 -14 -14 -22 Q-12 -14 -8 -12 Q-10 -24 0 -34 Q2 -22 8 -18 Q10 -26 16 -24 Q22 -12 14 0 Z" fill="#ff7043"/>
<path class="ir-flick" d="M-8 0 Q-12 -8 -6 -14 Q-4 -8 0 -8 Q0 -16 6 -20 Q8 -12 10 -8 Q14 -4 8 0 Z" fill="#ffca28"/></g>`;

// An iron in profile, nose to the left, after the classic steam irons: the
// steel soleplate, a shell in the appliance colour with a coloured line along
// it, the water tank at the front, the handle over the top with its two
// buttons, the temperature dial and the lamp. Heating, the soleplate turns
// red and steam billows from under it; left on, it burns and the steam turns
// to black smoke. The body alone, without its cord or shadow, is the one the
// steam generator carries.
function ironBody(d, opt = {}) {
  const { cord = true, shadow = true } = opt;
  const b = apId(), o = apId(), pl = apId(), hot = apId(), tk = apId(), hl = apId(), sm = apId();
  const heat = d.heating || d.leftOn;
  const [ln, lnHi] = IRON_LINES[d.line] || IRON_LINES.orange;
  const body = "M12 81 C24 67 37 58 49 52 C53 36 67 26 88 25 H100 Q110 25 110 35 V81 Z";
  const hole = "M65 50 C68 42 76 37 87 37 H94 Q98 37 98 41 V47 Q98 51 94 51 H67 Q64 51 65 50 Z";
  // The clouds along the soleplate: all eight left on, as many as the iron
  // draws hard while it heats, and two thin wisps once it is hot and ready.
  const keep = d.leftOn || (d.heating && d.level >= 3) ? IRON_STEAM[3] : d.heating ? IRON_STEAM[d.level] || IRON_STEAM[3] : d.ready ? IRON_STEAM.ready : [];
  const steam = keep.length ? `<g fill="url(#${sm})">${keep.map((i) => {
    const r = (k) => irRnd(i * 7 + k), x = 12 + i * 12.5 + (r(1) - 0.5) * 8, y = 90 + r(2) * 3, k = (4.5 + r(3) * 4) * (heat ? 1 : 0.7);
    const st = `animation-duration: ${((1.5 + r(4) * 1.6) * (heat ? 1 : 1.8)).toFixed(2)}s; animation-delay: calc(${(-r(5) * 3).toFixed(2)}s + var(--anim-offset, 0s)); --dx: ${((r(6) - 0.7) * 12).toFixed(1)}px; --dy: ${(3 + r(7) * 7).toFixed(1)}px; --sc: ${(1.2 + r(8) * 0.8).toFixed(2)}`;
    return `<g class="ir-vapo" style="${st}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${k.toFixed(1)}"/><circle cx="${(x + k * 0.7).toFixed(1)}" cy="${(y + 1).toFixed(1)}" r="${(k * 0.7).toFixed(1)}"/><circle cx="${(x - k * 0.6).toFixed(1)}" cy="${(y + 1.5).toFixed(1)}" r="${(k * 0.6).toFixed(1)}"/></g>`;
  }).join("")}</g>` : "";
  return `<defs><linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".6" style="stop-color: var(--ac-body, #e6eaee)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #b4bdc6)"/></linearGradient>
<linearGradient id="${o}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color: ${lnHi}"/><stop offset="1" style="stop-color: ${ln}"/></linearGradient>
<linearGradient id="${pl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eceff1"/><stop offset=".45" stop-color="#b0bec5"/><stop offset="1" stop-color="#546e7a"/></linearGradient>
<linearGradient id="${hot}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7043"/><stop offset="1" stop-color="#d84315"/></linearGradient>
<linearGradient id="${tk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3f2fd" stop-opacity=".7"/><stop offset=".45" stop-color="#bbdefb" stop-opacity=".7"/><stop offset=".46" stop-color="#64b5f6" stop-opacity=".8"/><stop offset="1" stop-color="#1e88e5" stop-opacity=".85"/></linearGradient>
<linearGradient id="${hl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="${sm}" cx=".45" cy=".4" r=".6">${d.leftOn ? `<stop offset="0" stop-color="#424242"/><stop offset=".55" stop-color="#212121" stop-opacity=".85"/><stop offset="1" stop-color="#000" stop-opacity="0"/>` : `<stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#dfe6ea"/><stop offset="1" stop-color="#b0bec5" stop-opacity="0"/>`}</radialGradient></defs>
${shadow ? apSoft(60, 95, 50, 3, 0.24) : ""}
${cord ? `<path d="M110 40 Q118 42 120 52" stroke="#78909c" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M107 36 h6 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-6 Z" fill="#90a4ae"/>` : ""}
<path class="ir-plate" d="M8 88 Q11 81 22 80 H110 V86 Q110 89 107 89 H10 Q7 89 8 88 Z" fill="url(#${heat ? hot : pl})" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
<path d="M14 83.5 H106" stroke="#fff" stroke-width=".8" opacity="${heat ? 0.35 : 0.7}"/>
<path class="ir-body" fill-rule="evenodd" d="${body} ${hole}" fill="url(#${b})" stroke="rgba(0,0,0,.22)" stroke-width=".6"/>
<path class="ir-line" d="M13 80.6 C25 69 39 63 58 61 H110 V70 H60 C44 71 30 75 18 80.6 Z" fill="url(#${o})"/>
<path d="M26 74 C38 67 50 64 66 63.5 H104" stroke="url(#${hl})" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<path class="ir-tank" d="M22 72 C30 63 40 57 49 53 L53 60 C44 62 35 67 28 73 Z" fill="url(#${tk})" stroke="rgba(30,136,229,.4)" stroke-width=".4"/>
<path d="M56 34 C62 29 70 27 80 26.5" stroke="#fff" stroke-width="1.6" fill="none" opacity=".9" stroke-linecap="round"/>
<path d="${hole}" fill="none" stroke="#000" stroke-width=".6" opacity=".15"/>
<ellipse cx="58" cy="38" rx="3.6" ry="2.4" transform="rotate(-30 58 38)" style="fill: ${lnHi}" stroke="rgba(0,0,0,.2)" stroke-width=".4"/><ellipse cx="64" cy="33" rx="3" ry="2" transform="rotate(-20 64 33)" style="fill: ${ln}" stroke="rgba(0,0,0,.2)" stroke-width=".4"/>
<ellipse cx="82" cy="56" rx="7" ry="2.6" fill="#eceff1" stroke="rgba(0,0,0,.25)" stroke-width=".5"/><path d="M82 54.2 v2.4" style="stroke: ${ln}" stroke-width="1.2" stroke-linecap="round"/>
<circle cx="104" cy="56" r="1.7" fill="${heat ? "#ff5252" : "#b0bec5"}"/>${heat ? `<circle class="ir-glow" cx="104" cy="56" r="3.2" fill="#ff5252" opacity=".35"/>` : ""}
${steam}`;
}

function ironSvg(d) {
  apN = 0;
  return `<svg class="ap-svg ir-svg" viewBox="0 -10 120 135" aria-hidden="true">${ironBody(d)}${d.leftOn ? IRON_FIRE.map(([x, y], i) => irFlames(x, y, i % 2 ? 0.3 : 0.34, i)).join("") : ""}</svg>`;
}

// A steam generator, after the Calor Pro Express: a low cradle at the back
// and a tall water tank at the front, a slope between them where the iron
// lies when it is off, the lamp at the front and the hose looping from the
// back of the base to the heel of the iron. Heating, the iron lifts off the
// slope nose up, steam billows under it and runs along the hose.
function generatorSvg(d) {
  apN = 0;
  const b = apId(), tk = apId(), hz = apId(), glow = apId();
  const heat = d.heating || d.leftOn;
  // The iron, mirrored so its nose points right, scaled and turned nose up
  // along the slope; its heel sits on the cradle, lifted off it when it heats.
  const S = 0.74, deg = -37, A = deg * Math.PI / 180;
  const rs = ([x, y]) => { const u = (120 - x) * S, v = y * S; return [u * Math.cos(A) - v * Math.sin(A), u * Math.sin(A) + v * Math.cos(A)]; };
  const h0 = rs([108, 89]), lift = heat ? [-5, -13] : [0, 0], T = [30 + lift[0] - h0[0], 90.5 + lift[1] - h0[1]];
  const at = (pt) => { const [x, y] = rs(pt); return [T[0] + x, T[1] + y]; };
  const [hx, hy] = at([111, 41]);
  const hose = `M${hx.toFixed(1)} ${hy.toFixed(1)} C${(hx - 20).toFixed(1)} ${(hy - 2).toFixed(1)} -1 101 11 100.5`;
  return `<svg class="ap-svg ir-svg" viewBox="0 -10 120 135" aria-hidden="true"><defs><linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #f3f6fa)"/><stop offset=".6" style="stop-color: var(--ac-body, #dfe5ec)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #9fb0c2)"/></linearGradient>
<linearGradient id="${tk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3d4f5" stop-opacity=".55"/><stop offset=".42" stop-color="#90c2f0" stop-opacity=".6"/><stop offset=".43" stop-color="#2f7fd6" stop-opacity=".8"/><stop offset="1" stop-color="#15489a" stop-opacity=".9"/></linearGradient>
<radialGradient id="${glow}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${heat ? "#ff8a65" : "#cfd8dc"}"/><stop offset="1" stop-color="${heat ? "#d84315" : "#78909c"}"/></radialGradient>
<linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78909c"/><stop offset="1" stop-color="#455a64"/></linearGradient></defs>
${apSoft(60, 111, 54, 3.4, 0.22)}
<path class="gen-hose" d="${hose}" stroke="url(#${hz})" stroke-width="3.6" fill="none" stroke-linecap="round"/>
${heat ? `<path class="ir-flow" d="${hose}" stroke="#fff" stroke-width="1.1" stroke-dasharray="2 4" fill="none" stroke-linecap="round" opacity=".8"/>` : ""}
<path class="gen-base" d="M14 108 Q7 108 7 100 Q7 93 15 92 H30 L86 49.6 Q92 45 100 45.5 Q110 47 112 56 L114 101 Q114 108 107 108 Z" fill="url(#${b})" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
<path d="M15.5 94.2 H31 L86.5 52" stroke="#3a4a6b" stroke-width="2" fill="none" stroke-linecap="round" opacity=".75"/>
<path class="gen-tank" d="M56 96 L87.5 56 Q92 51 98.5 51.5 Q106 52.5 107.5 59 L108.5 96 Z" fill="url(#${tk})" stroke="rgba(21,72,154,.55)" stroke-width=".6"/>
<path d="M90 58 Q94 54.5 99.5 55" stroke="#fff" stroke-width="1.3" fill="none" opacity=".75" stroke-linecap="round"/>
<path d="M56 96 H108.5" stroke="#3a4a6b" stroke-width="1.6" opacity=".6"/>
<rect x="22" y="99" width="22" height="5" rx="2" fill="#000" opacity=".12"/>
<circle cx="13" cy="100" r="2" fill="#3a4a6b" opacity=".8"/>
${heat ? `<circle class="ir-glow" cx="80" cy="99" r="8" fill="#ff8a65" opacity=".35"/>` : ""}
<circle cx="80" cy="99" r="5" fill="url(#${glow})" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>
<path d="M14 108 H107" stroke="#2b3037" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
<g transform="translate(${T[0].toFixed(2)} ${T[1].toFixed(2)}) rotate(${deg}) scale(${S}) translate(120 0) scale(-1 1)">${ironBody(d, { cord: false, shadow: false })}</g>
${d.leftOn ? IRON_FIRE.map(at).map(([x, y], i) => irFlames(x, y, i % 2 ? 0.24 : 0.27, i)).join("") : ""}
</svg>`;
}

// The room to a tenth and the setpoint, as a thermostat's line reads them:
// "19.5 \u00b0C -> 21 \u00b0C", or the room alone when off or at the setpoint.
function thermoLine(hass, cfg, entity, room, target) {
  const unit = temperatureUnit(hass, entity);
  const f = thermoFace(hass, cfg, room, target);
  const now = `${f.room} ${unit}`;
  return target !== null && Math.abs(room - target) >= 0.05 ? `${keepTogether(now)} \u2192 ${keepTogether(`${f.target} ${unit}`)}` : keepTogether(now);
}
// The numbers a thermostat shows: the room to a tenth, the setpoint whole
// when it is, both with the language's decimal mark.
function thermoFace(hass, cfg, room, target) {
  const l = lang(hass);
  const fmt = (v, d) => (v === null ? "" : Number(v).toLocaleString(l, { minimumFractionDigits: d, maximumFractionDigits: d }));
  return { room: fmt(room, 1), target: target === null ? "" : fmt(target, Number.isInteger(target) ? 0 : 1) };
}

// Four thermostats, drawn in a 120 by 135 box and centred on (60, 55): a
// white square with a dark screen (Netatmo, tado, Bosch CT100, Homematic), a
// steel ring around black glass that turns orange while it heats (Nest,
// Honeywell), black glass with a light bar (ecobee, Bosch CT200), and a
// radiator valve seen close up, its head standing out from the radiator at a
// right angle with its screen on its side. A thermostat makes no heat: only
// the valve's radiator shows it.
const thFlame = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})"><path class="th-flame" d="M0 0 C-4 -3 -3 -7 0 -11 C.6 -8 2.4 -7 3.4 -8 C5 -5 4.4 -1.6 0 0 Z" fill="#ff7043"/></g>`;
const thLeaf = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-4 3 C-4 -3 1 -6 5 -6 C5 -1 2 3 -4 3 Z M-4 3 L2 -3" fill="#26a69a" stroke="#26a69a" stroke-width=".6"/></g>`;
const thWall = (cx, cy, w, h, r) => `<rect x="${cx - w / 2 + 2}" y="${cy - h / 2 + 3}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,.08)"/><rect x="${cx - w / 2 + 1}" y="${cy - h / 2 + 1.5}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,.06)"/>`;
const thText = (x, y, size, fill, text, weight = 600) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(text)}</text>`;
function thermoDevice(d) {
  const on = d.mode !== "off", heat = d.mode === "heat", cool = d.mode === "cool";
  const accent = heat ? "#ff7043" : cool ? "#4fc3f7" : "#90a4ae";
  const mark = (x, y, k) => (heat ? thFlame(x, y, k) : d.eco ? thLeaf(x, y - 3, k) : "");
  if (d.layout === "round") {
    const r = apId(), gl = apId(), hot = apId();
    const ang = (t) => (-220 + (Math.max(5, Math.min(30, t)) - 5) / 25 * 260) * Math.PI / 180;
    const num = (v) => parseFloat(String(v).replace(",", "."));
    const room = num(d.room), target = num(d.target);
    const ticks = on ? Array.from({ length: 53 }, (_, i) => {
      const tv = 5 + i * 25 / 52, a = ang(tv);
      const lit = heat && tv > room && tv < target;
      return `<path d="M${(60 + 29 * Math.cos(a)).toFixed(2)} ${(55 + 29 * Math.sin(a)).toFixed(2)} L${(60 + 31 * Math.cos(a)).toFixed(2)} ${(55 + 31 * Math.sin(a)).toFixed(2)}" stroke="rgba(255,255,255,${lit ? 0.95 : 0.28})" stroke-width=".6"/>`;
    }).join("") : "";
    const tick = (tv, c, w) => { if (!isFinite(tv)) return ""; const a = ang(tv); return `<path d="M${(60 + 27 * Math.cos(a)).toFixed(2)} ${(55 + 27 * Math.sin(a)).toFixed(2)} L${(60 + 31 * Math.cos(a)).toFixed(2)} ${(55 + 31 * Math.sin(a)).toFixed(2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`; };
    return `<defs><linearGradient id="${r}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5f6f7"/><stop offset=".35" stop-color="#9aa3ad"/><stop offset=".55" stop-color="#e9edf0"/><stop offset="1" stop-color="#6d7680"/></linearGradient>
<radialGradient id="${gl}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#2a2f35"/><stop offset="1" stop-color="#07080a"/></radialGradient>
<radialGradient id="${hot}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ff9e55"/><stop offset="1" stop-color="#e8590c"/></radialGradient></defs>
<circle cx="62" cy="58" r="41" fill="rgba(0,0,0,.09)"/><circle cx="60" cy="55" r="41" fill="url(#${r})"/><circle cx="60" cy="55" r="36" fill="#3a4047"/>
<circle class="th-screen" cx="60" cy="55" r="34.5" fill="url(#${heat ? hot : gl})"/>
<path d="M38 34 A30 30 0 0 1 72 26" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2.5" stroke-linecap="round"/>
${ticks}${on ? tick(target, "#fff", 1.8) + tick(room, heat ? "rgba(255,255,255,.6)" : "#90a4ae", 1.2) : ""}
${on ? `${thText(60, 63, 22, "#fff", d.target || d.room, 500)}${heat ? thText(60, 76, 6.5, "rgba(255,255,255,.8)", "\u25b2", 500) : d.eco ? thLeaf(60, 46, 0.9) : ""}` : thText(60, 60, 10, "#6d7680", "OFF", 500)}`;
  }
  if (d.layout === "glass") {
    const b = apId(), sh = apId();
    return `<defs><linearGradient id="${b}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c3238"/><stop offset=".5" stop-color="#121417"/><stop offset="1" stop-color="#050607"/></linearGradient>
<linearGradient id="${sh}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${thWall(60, 55, 72, 72, 16)}<rect x="24" y="19" width="72" height="72" rx="16" fill="url(#${b})" stroke="#3d434a" stroke-width=".8"/>
<path d="M28 23 H62 L40 87 H28 Q26 87 26 85 V27 Q26 23 28 23 Z" fill="url(#${sh})"/>
${on ? `${thText(60, 58, 23, "#fff", d.room, 300)}${heat || d.eco ? mark(53, 74, 0.85) : `<circle cx="53" cy="71" r="2" fill="${accent}"/>`}
${thText(64, 74, 7.5, heat ? "#ffab91" : "#b0bec5", d.target ? `${d.target}\u00b0` : "", 400)}
<rect class="${heat ? "th-pulse" : ""}" x="44" y="83" width="32" height="1.6" rx=".8" fill="${heat ? "#ff7043" : accent}"/>` : `<rect x="44" y="83" width="32" height="1.6" rx=".8" fill="#3d434a"/>`}`;
  }
  if (d.layout === "valve") {
    const rad = apId(), hot = apId(), head = apId(), sc = apId(), br = apId(), cap = apId();
    const waves = heat ? [0, 1, 2].map((i) => `<path class="th-wave w${i + 1}" d="M${6 + i * 11} 34 c-2.5 -3 2.5 -5 0 -8 c-2.5 -3 2.5 -5 0 -8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`).join("") : "";
    return `<defs><linearGradient id="${rad}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#b3bcc4"/></linearGradient>
<linearGradient id="${hot}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffab91"/><stop offset=".5" stop-color="#ffe0d6"/><stop offset="1" stop-color="#ff8a65"/></linearGradient>
<linearGradient id="${head}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".45" style="stop-color: var(--ac-body, #f3f5f7)"/><stop offset=".8" style="stop-color: var(--ac-body-lo, #d3d9de)"/><stop offset="1" stop-color="#aab3bc"/></linearGradient>
<radialGradient id="${cap}" cx=".35" cy=".35" r=".8"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c9d0d6)"/></radialGradient>
<linearGradient id="${sc}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2f35"/><stop offset="1" stop-color="#0d0f12"/></linearGradient>
<linearGradient id="${br}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dc9c"/><stop offset=".5" stop-color="#d4a94f"/><stop offset="1" stop-color="#9c7630"/></linearGradient></defs>
${apSoft(62, 121, 54, 3, 0.2)}
${[-8, 15].map((x) => `<rect x="${x}" y="-9" width="21" height="103" rx="10" fill="url(#${heat ? hot : rad})" stroke="rgba(0,0,0,.18)" stroke-width=".7"/><path d="M${x + 5} -3 V88" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${heat ? 0.6 : 0.95}"/>`).join("")}
<rect x="-8" y="80" width="44" height="8" fill="rgba(0,0,0,.06)"/>${waves}
<path d="M43 76 V125" stroke="#c9d0d6" stroke-width="7"/><path d="M41.6 76 V125" stroke="#fff" stroke-width="1.4"/>
<rect x="33" y="61" width="8" height="14" rx="1.6" fill="url(#${br})" stroke="#8a6526" stroke-width=".5"/><path d="M34.5 63 V73 M37 63 V73 M39.5 63 V73" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
<path d="M40 60 H50 Q53 60 53 63 V76 Q53 79 50 79 H40 Z" fill="url(#${br})" stroke="#8a6526" stroke-width=".6"/><path d="M42 62 H50" stroke="rgba(255,255,255,.7)" stroke-width="1" stroke-linecap="round"/>
<rect x="51" y="58" width="9" height="22" rx="1.4" fill="#e9edf0" stroke="rgba(0,0,0,.2)" stroke-width=".5"/><path d="M51 61 H60 M51 77 H60" stroke="rgba(0,0,0,.08)" stroke-width=".8"/>
<path class="th-head" d="M66 46 H104 A9 24 0 0 1 104 94 H66 A9 24 0 0 1 66 46 Z" fill="url(#${head})" stroke="rgba(0,0,0,.2)" stroke-width=".7"/>
<path d="M66 47 A8 23 0 0 1 66 93" fill="none" stroke="rgba(0,0,0,.1)" stroke-width=".9"/><path d="M93 46.4 A9 23.6 0 0 1 93 93.6" fill="none" stroke="rgba(0,0,0,.16)" stroke-width=".9"/>
<ellipse cx="104" cy="70" rx="9" ry="24" fill="url(#${cap})" stroke="rgba(0,0,0,.18)" stroke-width=".7"/><ellipse cx="104" cy="70" rx="5" ry="15" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1"/>
${[96.5, 100, 103.5].map((x) => `<path d="M${x} 47 A9 23 0 0 1 ${x} 93" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="1.1"/>`).join("")}
<path d="M64 50 H101" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
<rect x="66" y="56" width="20" height="16" rx="3" fill="url(#${sc})"/><path d="M67.5 57.3 H84.5 L82 60 H70 Z" fill="rgba(255,255,255,.08)"/>
${on ? `${thText(76, 67.4, 9, "#fff", d.room)}${thText(heat || d.eco ? 79 : 76, 81, 5.5, heat ? "#ff7043" : "#90a4ae", d.target ? `${d.target}\u00b0` : "", 400)}${mark(72, 81.6, 0.55)}` : thText(76, 66.6, 5.5, "#6d7680", "OFF")}
<circle class="${heat ? "th-pulse" : ""}" cx="89" cy="80" r="1.4" fill="${on ? accent : "#cfd8dc"}"/>`;
  }
  const b = apId(), g = apId();
  return `<defs><linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".6" style="stop-color: var(--ac-body, #eef1f4)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c3cad1)"/></linearGradient>
<linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262b31"/><stop offset="1" stop-color="#0f1114"/></linearGradient></defs>
${thWall(60, 55, 74, 74, 12)}<rect x="23" y="18" width="74" height="74" rx="12" fill="url(#${b})" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<path d="M30 19.6 H90" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
<rect x="31" y="26" width="58" height="50" rx="6" fill="url(#${g})"/><path d="M33 27.6 H87 L82 33 H38 Z" fill="rgba(255,255,255,.06)"/>
${on ? `${thText(60, 56, 21, "#fff", d.room)}${thText(heat || d.eco ? 64 : 60, 70, 8, heat ? "#ffab91" : "#b0bec5", d.target ? `${d.target}\u00b0` : "", 400)}${mark(51, 70, 0.8)}` : thText(60, 56, 11, "#6d7680", "OFF")}
<circle class="${heat ? "th-pulse" : ""}" cx="60" cy="84" r="1.8" fill="${on ? accent : "#cfd8dc"}"/>`;
}
function thermostatSvg(d) {
  apN = 0;
  return `<svg class="ap-svg th-svg" viewBox="0 -10 120 135" aria-hidden="true"><g class="th-dev${d.mode === "heat" ? " th-heat" : ""}">${thermoDevice(d)}</g></svg>`;
}
// The boiler steps back to the left and down, a little smaller, and its room
// thermostat goes on the wall beside it, its top level with the boiler's.
function boilerWithThermo(svg, d) {
  apN = 0;
  const open = svg.indexOf(">") + 1, close = svg.lastIndexOf("</svg>");
  const device = `<svg x="57" y="24.5" width="39" height="39" viewBox="19 14 82 82"><g class="th-dev${d.mode === "heat" ? " th-heat" : ""}">${thermoDevice(d)}</g></svg>`;
  return `${svg.slice(0, open)}<g transform="translate(-4 26) scale(.78)">${svg.slice(open, close)}</g>${device}</svg>`;
}

