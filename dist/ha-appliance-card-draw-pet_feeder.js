// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The pet_feeder drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
const NT_FONT = `font-family="Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"`;
// The text of a display fits its width: a long reading is drawn smaller.
const ntFit = (text, width, fs) => Math.min(fs, (width - 3) / Math.max(1, String(text || "").length * .6));

// Pet feeders and fountain, drawn after real products. Every piece of kibble
// is placed by a fixed jitter, so a drawing never changes between two redraws.
let pfN = 0;
const pfId = () => `pf${++pfN}`;
const pfRnd = (i) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const pfF = (v) => v.toFixed(2);
// Two recipes, as in a real bag: golden chicken pieces and darker fish ones.
const PF_TONES = [
  { light: "#dba468", mid: ["#b06a2c", "#9c5a24", "#c7843f", "#8a4c1d", "#d19352"], dark: "#6b3713", gap: "#3b1d09" },
  { light: "#b57650", mid: ["#7a4024", "#6a361d", "#8c5032", "#5c2e18", "#93573a"], dark: "#3a1b0b", gap: "#241105" },
];
// Five shaded fills per heap, lit from the top left like the rest of the card.
function pfKibDefs(id, tone = 0) {
  const t = PF_TONES[tone];
  return `<defs>${t.mid.map((m, k) => `<radialGradient id="${id}k${k}" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="${t.light}"/><stop offset=".5" stop-color="${m}"/><stop offset="1" stop-color="${t.dark}"/></radialGradient>`).join("")}</defs>`;
}
// One piece seen from above at an angle: a darker edge under a matte top.
// Rounded triangle, pillow, clover, disc or ring, turned by hand.
function pfPiece(x, y, s, i, id) {
  const a = pfRnd(i * 3.1) * Math.PI * 2, shape = Math.floor(pfRnd(i * 7.7) * 5), g = `url(#${id}k${i % 5})`;
  const shapeAt = (cy, fill, stroke) => {
    const pt = (ang, r) => `${pfF(x + Math.cos(ang + a) * r)} ${pfF(cy + Math.sin(ang + a) * r * .7)}`;
    const blob = (n, rc, ra) => {
      let d = "";
      for (let k = 0; k < n; k++) { const c = k * 2 * Math.PI / n, m = c + Math.PI / n; d += (k ? "" : `M${pt(c - Math.PI / n, ra)} `) + `Q${pt(c, rc)} ${pt(m, ra)} `; }
      return d + "Z";
    };
    const st = stroke ? ` stroke="${stroke}" stroke-width=".22"` : "";
    if (shape === 0) return `<path d="${blob(3, s * 1.45, s * .72)}" fill="${fill}"${st}/>`;
    if (shape === 1) return `<path d="${blob(4, s * 1.22, s * .86)}" fill="${fill}"${st}/>`;
    if (shape === 2) return `<path d="${blob(4, s * 1.32, s * .7)}" fill="${fill}"${st}/>`;
    return `<ellipse cx="${pfF(x)}" cy="${pfF(cy)}" rx="${pfF(s)}" ry="${pfF(s * .7)}" fill="${fill}"${st}/>`;
  };
  const hole = shape === 4 ? `<ellipse cx="${pfF(x)}" cy="${pfF(y - s * .02)}" rx="${pfF(s * .3)}" ry="${pfF(s * .2)}" fill="#2a1406" opacity=".8"/>` : "";
  const specks = [0, 1].filter((k) => pfRnd(i * 5.3 + k) > .45).map((k) => `<circle cx="${pfF(x + (pfRnd(i + k * 9) - .5) * s)}" cy="${pfF(y + (pfRnd(i + k * 13) - .5) * s * .6)}" r="${pfF(s * .1)}" fill="#3a1d0a" opacity=".45"/>`).join("");
  return shapeAt(y + s * .32, "#4a250c") + shapeAt(y, g, "#4a250c") + hole + specks
    + `<path d="M${pfF(x - s * .62)} ${pfF(y - s * .12)} Q${pfF(x - s * .45)} ${pfF(y - s * .5)} ${pfF(x + s * .05)} ${pfF(y - s * .52)}" stroke="#ffe6c4" stroke-width="${pfF(s * .16)}" stroke-linecap="round" fill="none" opacity=".35"/>`;
}
// A dome of kibble in a bowl: a dark mass for the gaps, then pieces laid
// from the back to the front, the back ones a little smaller.
function pfHeap(cx, cy, rx, ry, h, seed = 1, tone = 0, s = 1.5) {
  const id = pfId();
  const dome = (dx) => h * Math.pow(Math.max(0, 1 - (dx / rx) * (dx / rx)), .7);
  const hs = Math.max(0, h - s * .9);
  const sil = `M${pfF(cx - rx)} ${pfF(cy)} C${pfF(cx - rx * .85)} ${pfF(cy - hs * .75)} ${pfF(cx - rx * .45)} ${pfF(cy - hs)} ${pfF(cx)} ${pfF(cy - hs)} C${pfF(cx + rx * .45)} ${pfF(cy - hs)} ${pfF(cx + rx * .85)} ${pfF(cy - hs * .75)} ${pfF(cx + rx)} ${pfF(cy)} A${pfF(rx)} ${pfF(ry)} 0 0 1 ${pfF(cx - rx)} ${pfF(cy)} Z`;
  let out = "", i = seed * 97, row = 0;
  for (let y = cy - h + s * .5; y < cy + ry; y += s * 1.05, row++) {
    const t = (y - (cy - h)) / (h + ry), ss = s * (.82 + .3 * t);
    for (let x = cx - rx + (row % 2 ? ss * .8 : 0); x <= cx + rx; x += ss * 1.55) {
      const jx = x + (pfRnd(i) - .5) * ss * .7, jy = y + (pfRnd(i + 5) - .5) * ss * .5, dx = jx - cx;
      const inside = jy <= cy ? cy - jy <= dome(dx) - ss * .15 : (dx / (rx - ss * .4)) ** 2 + ((jy - cy) / (ry - ss * .2)) ** 2 <= 1;
      if (inside) out += pfPiece(jx, jy, ss * (.9 + pfRnd(i + 2) * .25), i, id);
      i++;
    }
  }
  return `${pfKibDefs(id, tone)}<path class="pf-heap" d="${sil}" fill="${PF_TONES[tone].gap}"/>${out}`;
}
// Kibble packed behind a window, up to its level.
function pfFillKib(x, y, w, h, seed = 2, tone = 0) {
  const id = pfId(), s = 1.15;
  let out = "", i = seed * 53, row = 0;
  for (let yy = y + h - s * .3; yy > y - s; yy -= s * 1.05, row++) {
    for (let xx = x - s * .4 + (row % 2 ? s * .8 : 0); xx < x + w + s; xx += s * 1.55) {
      out += pfPiece(xx + (pfRnd(i) - .5) * s * .6, yy + (pfRnd(i + 5) - .5) * s * .4, s * (.9 + pfRnd(i + 2) * .25), i, id);
      i++;
    }
  }
  return `${pfKibDefs(id, tone)}<rect class="pf-kib" x="${pfF(x)}" y="${pfF(y)}" width="${pfF(w)}" height="${pfF(h)}" fill="${PF_TONES[tone].gap}"/>${out}`;
}
// A stainless bowl: rim, shaded inside, the kibble, then the front of the
// rim drawn again over it so the heap sits in the bowl and not on it.
function pfBowl(cx, cy, rx, ry, heaps) {
  const id = pfId(), irx = rx - 1.8, iry = ry - 1.2, icy = cy + .3;
  const pile = (heaps || []).map((p) => {
    const w = p.dx ? irx / 2 : irx, hx = cx + (p.dx || 0) * irx;
    return pfHeap(hx, icy, w, p.dx ? iry * .95 : iry, p.h, p.seed, p.tone || 0, p.s || 1.5);
  }).join("");
  return `<defs><linearGradient id="${id}r" x1="0" x2="1"><stop offset="0" stop-color="#9aa4ae"/><stop offset=".35" stop-color="#f7f9fb"/><stop offset=".65" stop-color="#cfd6dd"/><stop offset="1" stop-color="#8e98a2"/></linearGradient>`
    + `<radialGradient id="${id}i" cx=".5" cy=".25" r=".8"><stop offset="0" stop-color="#e9edf1"/><stop offset=".6" stop-color="#aab3bc"/><stop offset="1" stop-color="#7f8994"/></radialGradient>`
    + `<clipPath id="${id}c"><path d="M${cx - irx} ${icy - 30} H${cx + irx} V${icy} A${irx} ${iry} 0 0 1 ${cx - irx} ${icy} Z"/></clipPath></defs>`
    + `<ellipse cx="${cx}" cy="${cy + .5}" rx="${rx + 1.2}" ry="${ry + .9}" fill="#000" opacity=".28"/>`
    + `<ellipse class="pf-bowl" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}r)" stroke="#7d8792" stroke-width=".4"/>`
    + `<ellipse cx="${cx}" cy="${icy}" rx="${irx}" ry="${iry}" fill="url(#${id}i)"/>`
    + (pile ? `<g clip-path="url(#${id}c)">${pile}</g>` : "")
    + `<path d="M${cx - rx} ${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L${cx + irx} ${icy} A${irx} ${iry} 0 0 1 ${cx - irx} ${icy} Z" fill="url(#${id}r)"/>`
    + `<path d="M${pfF(cx - rx * .75)} ${pfF(cy + ry * .62)} Q${cx} ${pfF(cy + ry * 1.08)} ${pfF(cx + rx * .75)} ${pfF(cy + ry * .62)}" stroke="#fff" stroke-width=".7" fill="none" opacity=".8"/>`;
}
const pfSoftShadow = (cx, cy, rx, ry) => { const id = pfId(); return `<filter id="${id}" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".22" filter="url(#${id})"/>`; };
// Kibble falling from the chute into the bowl, drawn in front of it.
const pfDrops = (x, y0, fall) => { const id = pfId(); return pfKibDefs(id) + [0, 1, 2, 3].map((i) => `<g transform="translate(${x} ${y0})"${fall ? ` style="--pf-fall: ${fall}px"` : ""}><g class="pf-drop pfd${i + 1}">${pfPiece(i % 2 ? 1.2 : -1, 0, 1.5, i + 11, id)}</g></g>`).join(""); };
// The shell takes the appliance colour: three stops read from the card.
const pfMatte = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" style="stop-color: var(--pf-lo)"/><stop offset=".42" style="stop-color: var(--pf-hi)"/><stop offset="1" style="stop-color: var(--pf-lo)"/></linearGradient>`;
const pfDomeGrad = (id) => `<radialGradient id="${id}" cx=".4" cy=".25" r=".9"><stop offset="0" style="stop-color: var(--pf-hi)"/><stop offset="1" style="stop-color: var(--pf-lo)"/></radialGradient>`;
// The base seen from the front: a rounded tray as wide as the body, its
// front edge showing its thickness, the bowl sunk into it.
function pfTray(cx, w, yb, yf, grad, t = 4, r = 9) {
  const L = cx - w, R = cx + w;
  const face = `M${L + r} ${yb} H${R - r} Q${R} ${yb} ${R} ${yb + r} V${yf - r} Q${R} ${yf} ${R - r} ${yf} H${L + r} Q${L} ${yf} ${L} ${yf - r} V${yb + r} Q${L} ${yb} ${L + r} ${yb} Z`;
  const wall = `M${L} ${yf - r} Q${L} ${yf} ${L + r} ${yf} H${R - r} Q${R} ${yf} ${R} ${yf - r} V${yf - r + t} Q${R} ${yf + t} ${R - r} ${yf + t} H${L + r} Q${L} ${yf + t} ${L} ${yf - r + t} Z`;
  return `<path d="${wall}" fill="url(#${grad})"/><path d="${wall}" fill="#000" opacity=".18"/><path class="pf-tray" d="${face}" style="fill: var(--pf-body)"/><path d="M${L + r} ${yf - .4} H${R - r}" stroke="#fff" stroke-width=".6" opacity=".35"/>`;
}
// The screen: what the feeder says, green at rest, blue while it serves,
// red when it wants a hand. Long text is drawn smaller to fit.
function pfLcd(x, y, w, h, text, fs) {
  const size = ntFit(text, w, fs);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.8" fill="#141a21" stroke="#0a0d11" stroke-width=".5"/>`
    + `<rect x="${x + .8}" y="${y + .8}" width="${w - 1.6}" height="${pfF(h * .38)}" rx="1.2" fill="#fff" opacity=".05"/>`
    + (text ? `<text class="pf-lcd" x="${x + w / 2}" y="${pfF(y + h / 2 + size * .36)}" font-size="${pfF(size)}" font-weight="700" text-anchor="middle" ${NT_FONT}>${esc(text)}</text>` : "");
}
// A window on the kibble, filled up to its level from the bottom.
function pfWindow(x, y0, y1, w, lvl, seed, tone = 0, amber = false) {
  const id = pfId(), top = y1 - (y1 - y0) * lvl, r = w / 2;
  const glass = amber ? `<defs><linearGradient id="${id}a" x1="0" x2="1"><stop offset="0" stop-color="#7a4a1a"/><stop offset=".5" stop-color="#c9893f"/><stop offset="1" stop-color="#7a4a1a"/></linearGradient></defs>` : "";
  const food = lvl > 0 ? (amber ? `<rect x="${x}" y="${pfF(top)}" width="${w}" height="${pfF(y1 - top)}" fill="url(#${id}a)"/>` : "") + pfFillKib(x, top, w, y1 - top, seed, tone) : "";
  return `${glass}<rect class="pf-win" data-level="${Math.round(lvl * 100)}" x="${x - .5}" y="${y0 - .5}" width="${w + 1}" height="${y1 - y0 + 1}" rx="${r + .5}" fill="#141a20"/>`
    + `<clipPath id="${id}c"><rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" rx="${r}"/></clipPath>`
    + `<g clip-path="url(#${id}c)">${food}<rect x="${x}" y="${y0}" width="${pfF(w * .35)}" height="${y1 - y0}" fill="#fff" opacity=".1"/></g>`;
}
// The resting level of a tank the card cannot read: about half full.
const pfLvl = (pct, empty) => empty ? 0 : pct === null || pct === undefined ? .6 : Math.max(0, Math.min(1, pct / 100));

// Square tank, after the Petlibro Granary: a rounded column, an amber window
// on the food, a wide base with its steel bowl.
function pfTower(d) {
  const b = pfId(), base = pfId(), lid = pfId();
  return `<defs>${pfMatte(b)}${pfMatte(base)}${pfDomeGrad(lid)}</defs>
${pfSoftShadow(60, 111, 26, 3.5)}
${pfTray(60, 23, 82, 107, base)}
<rect class="pf-body" x="38" y="16" width="44" height="66" rx="11" fill="url(#${b})"/>
<rect x="41" y="24" width="3" height="52" rx="1.5" fill="#fff" style="opacity: var(--pf-gloss)"/>
<path d="M38 22 Q38 12 60 11 Q82 12 82 22 V24 H38 Z" fill="url(#${lid})"/>
<ellipse cx="60" cy="14.6" rx="6" ry="1.6" fill="#000" opacity=".3"/>
${pfWindow(57, 29.5, 54.5, 6, d.lvl, 4, 0, true)}
<rect x="48" y="59" width="24" height="10" rx="3" fill="#0d1014"/>
${pfLcd(49, 60, 22, 8, d.screen, 6.4)}
<path class="pf-chute" d="M53 73 L67 73 Q66 77 60 77.4 Q54 77 53 73 Z" fill="#0a0c0f"/>
${pfBowl(60, 99, 17, 5.6, d.served ? [{ h: d.feeding ? 10 : 8, seed: 3 }] : [])}
${d.feeding ? pfDrops(60, 78, 17) : ""}`;
}
// Round tank, after the Aqara C1: a cylinder with a domed top, a tall window
// on the kibble and a round tray holding the bowl.
function pfCanister(d) {
  const b = pfId(), dome = pfId(), tray = pfId();
  return `<defs>${pfMatte(b)}${pfMatte(tray)}${pfDomeGrad(dome)}</defs>
${pfSoftShadow(60, 111, 26, 3.5)}
${pfTray(60, 23, 84, 107, tray)}
<path class="pf-body" d="M38 26 V80 Q38 84 60 84 Q82 84 82 80 V26 Z" fill="url(#${b})"/>
<path d="M38 26 Q38 8 60 8 Q82 8 82 26 Z" fill="url(#${dome})"/>
<path d="M43 20 Q46 12 56 11" stroke="#fff" stroke-width="1.6" fill="none" style="opacity: var(--pf-gloss)"/>
<rect x="41" y="30" width="3" height="48" rx="1.5" fill="#fff" style="opacity: var(--pf-gloss)"/>
${pfWindow(54, 35, 64, 12, d.lvl, 6)}
<rect x="49" y="22" width="22" height="9" rx="3" fill="#0d1014"/>
${pfLcd(50, 22.6, 20, 7.8, d.screen, 6.2)}
<path class="pf-chute" d="M53 74 L67 74 Q66 78 60 78.4 Q54 78 53 74 Z" fill="#1a1e23"/>
${pfBowl(60, 99.5, 17, 5.6, d.served ? [{ h: d.feeding ? 10 : 8, seed: 5 }] : [])}
${d.feeding ? pfDrops(60, 79, 17) : ""}`;
}
// Two bowls, after the Granary dual: the same column over a wider base, a
// splitter and two spouts feeding two steel bowls.
function pfDouble(d) {
  const b = pfId(), base = pfId(), lid = pfId();
  const spout = (s) => `<path d="M${60 - s * 7} 82 L${60 - s * 19} 87.5 Q${60 - s * 21.5} 88.6 ${60 - s * 22.5} 87 L${60 - s * 23} 86 Q${60 - s * 23} 84.5 ${60 - s * 21} 83.6 L${60 - s * 9} 79.5 Z" fill="#4b535d" stroke="#0a0c0f" stroke-width=".5"/><ellipse class="pf-chute" cx="${60 - s * 21.4}" cy="88" rx="2.6" ry="1" fill="#050607"/>`;
  const heaps = (seed) => d.served ? [{ h: d.feeding ? 9 : 7, seed, s: 1.35 }] : [];
  return `<defs>${pfMatte(b)}${pfMatte(base)}${pfDomeGrad(lid)}</defs>
${pfSoftShadow(60, 111, 51, 3.5)}
${pfTray(60, 48, 82, 107, base)}
<rect class="pf-body" x="38" y="16" width="44" height="74" rx="11" fill="url(#${b})"/>
<rect x="41" y="24" width="3" height="60" rx="1.5" fill="#fff" style="opacity: var(--pf-gloss)"/>
<path d="M38 22 Q38 12 60 11 Q82 12 82 22 V24 H38 Z" fill="url(#${lid})"/>
${pfWindow(57, 30.5, 61.5, 6, d.lvl, 8, 0, true)}
<rect x="48" y="66" width="24" height="10" rx="3" fill="#0d1014"/>
${pfLcd(49, 67, 22, 8, d.screen, 6.4)}
<path d="M50 80 H70 V83 Q70 85 67 85 H53 Q50 85 50 83 Z" fill="#0a0c0f"/>
${spout(1)}${spout(-1)}
${pfBowl(37, 99, 15, 5, heaps(9))}
${pfBowl(83, 99, 15, 5, heaps(11))}
${d.feeding ? pfDrops(38.4, 89) + pfDrops(81.6, 89) : ""}`;
}
// Two hoppers over one split bowl, after the PetKit YumShare: a tall
// cabinet, 01 and 02 printed over two windows, one recipe each.
function pfDualSplit(d) {
  const b = pfId(), tray = pfId();
  const half = (dx, seed, tone, served) => served ? [{ dx, h: 6.5, seed, s: 1.3, tone }] : [];
  return `<defs>${pfMatte(b)}${pfMatte(tray)}</defs>
${pfSoftShadow(60, 111, 33, 3.5)}
${pfTray(60, 30, 84, 107, tray)}
<rect class="pf-body" x="30" y="6" width="60" height="86" rx="12" fill="url(#${b})"/>
<rect x="33" y="14" width="3" height="72" rx="1.5" fill="#fff" style="opacity: var(--pf-gloss)"/>
<text x="45.5" y="20" font-size="6" font-weight="300" text-anchor="middle" fill="#6b7480" ${NT_FONT}>01</text><text x="74.5" y="20" font-size="6" font-weight="300" text-anchor="middle" fill="#6b7480" ${NT_FONT}>02</text>
${pfWindow(43, 26.5, 65.5, 5, d.lvl, 43)}
${pfWindow(72, 26.5, 65.5, 5, d.lvlB, 72, 1)}
<rect x="49" y="70" width="22" height="9" rx="3" fill="#0d1014"/>
${pfLcd(50, 70.6, 20, 7.8, d.screen, 6.2)}
<path class="pf-chute" d="M50 83 L70 83 Q69 87 60 87.4 Q51 87 50 83 Z" fill="#1a1e23"/>
${pfBowl(60, 99.5, 20, 6, [...half(-.5, 13, 0, d.servedA), ...half(.5, 17, 1, d.servedB)])}
<path d="M60 94 V105" stroke="#8e98a2" stroke-width="1.2"/>
${d.feeding ? (d.servedA ? pfDrops(54, 88) : "") + (d.servedB ? pfDrops(66, 88) : "") : ""}`;
}
// Wet food, after the Petlibro Polar: a lid over a turning tray; one dish of
// pate shows in the opening at the front, and while it serves the tray slides
// the next dish in from the right.
function pfRotary(d) {
  const b = pfId(), top = pfId(), food = pfId(), clip = pfId(), well = pfId();
  const dish = (x) => `<ellipse cx="${x}" cy="66" rx="13.5" ry="6" fill="#dfe4e9" stroke="#9aa3ad" stroke-width=".5"/><ellipse class="pf-dish" cx="${x}" cy="66.4" rx="11.6" ry="4.8" fill="${d.served ? `url(#${food})` : "#b7c0c8"}"/>${d.served ? `<path d="M${x - 7} 66 q2.3 -1.4 4.7 0 q2.3 -1.4 4.7 0 q2.3 -1.4 4.7 0" stroke="#6d3f28" stroke-width=".5" fill="none" opacity=".7"/>` : ""}`;
  return `<defs>${pfMatte(b)}${pfDomeGrad(top)}
<radialGradient id="${food}" cx=".42" cy=".35" r=".75"><stop offset="0" stop-color="#d9a283"/><stop offset=".6" stop-color="#a8694a"/><stop offset="1" stop-color="#7a4630"/></radialGradient>
<radialGradient id="${well}" cx=".5" cy=".2" r=".9"><stop offset="0" stop-color="#0c0e11"/><stop offset="1" stop-color="#2a3037"/></radialGradient>
<clipPath id="${clip}"><ellipse cx="60" cy="66" rx="19" ry="8.6"/></clipPath></defs>
${pfSoftShadow(60, 96, 46, 6)}
<path class="pf-body" d="M16 60 V76 Q16 92 60 93 Q104 92 104 76 V60 Z" fill="url(#${b})"/>
<path d="M20 66 V78" stroke="#fff" stroke-width="1.6" stroke-linecap="round" style="opacity: var(--pf-gloss)"/>
<ellipse cx="60" cy="60" rx="44" ry="19" fill="url(#${top})"/>
<path d="M24 54 Q40 43 66 42" stroke="#fff" stroke-width="1.2" fill="none" opacity=".22"/>
<ellipse cx="60" cy="54" rx="5" ry="2" fill="#000" opacity=".4"/>
<ellipse cx="60" cy="66" rx="19" ry="8.6" fill="url(#${well})"/>
<g clip-path="url(#${clip})"><g class="pf-turn">${dish(60)}${dish(92)}</g></g>
<ellipse cx="60" cy="66" rx="19" ry="8.6" fill="none" stroke="#596370" stroke-width=".7"/>
<path d="M42 62.5 Q60 55.5 78 62.5" stroke="#0a0c0f" stroke-width="1.6" fill="none" opacity=".55"/>
<rect x="49" y="79" width="22" height="9" rx="3" fill="#0d1014"/>
${pfLcd(50, 79.6, 20, 7.8, d.screen, 6.2)}`;
}
const PF_DRAW = { canister: pfCanister, double: pfDouble, dual_split: pfDualSplit, rotary: pfRotary };
// The two single columns fill a third of the drawing's width, so they are
// drawn a third larger around their foot: the kibble falling reads at card
// size, in the compact side layout above all (#71).
const PF_GROW = { tower: 1.35, canister: 1.35 };
function pfSvg(layout, d) {
  pfN = 0;
  const key = PF_DRAW[layout] ? layout : "tower";
  const body = (PF_DRAW[layout] || pfTower)(d);
  const k = PF_GROW[key];
  return `<svg class="pf-svg pf-${key}" viewBox="0 -10 120 135" aria-hidden="true">${k ? `<g transform="translate(60 111) scale(${k}) translate(-60 -111)">${body}</g>` : body}</svg>`;
}


return {
draw: (_cls, ctx) => {
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
css: () => `
        /* Drawn from the feeders people actually buy: a tank with a window on
           the kibble, a small dark panel with a lit screen and a steel bowl in
           a tray moulded like the shell. The shell takes the appliance colour,
           dark by default, white for the round tank and the two-hopper one,
           the way they are sold. */
        .machine { --pf-lo: var(--ac-body-lo, #16191d); --pf-hi: var(--ac-body-hi, #4b535d); --pf-body: var(--ac-body, #2b3037); --pf-gloss: 0.1; }
        .machine.canister, .machine.dual_split { --pf-lo: var(--ac-body-lo, #b4bcc5); --pf-hi: var(--ac-body-hi, #ffffff); --pf-body: var(--ac-body, #f1f4f7); --pf-gloss: 0.6; }
        svg.pf-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .pf-lcd { fill: #69f0ae; }
        .machine.feeding .pf-lcd { fill: #4fc3f7; }
        .machine.alert .pf-lcd { fill: #ff5252; }
        /* While a meal is served, kibble drops from the chute into the bowl,
           and the turning tray of the wet-food feeder brings the next dish. */
        .pf-drop { opacity: 0; transform-box: fill-box; }
        .machine.feeding .pf-drop { animation: pf-fall 0.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.feeding .pfd2 { animation-delay: calc(-0.22s + var(--anim-offset, 0s)); }
        .machine.feeding .pfd3 { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .machine.feeding .pfd4 { animation-delay: calc(-0.67s + var(--anim-offset, 0s)); }
        @keyframes pf-fall { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(var(--pf-fall, 9px)); opacity: 0; } }
        .machine.rotary.feeding .pf-turn { animation: pf-turn 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes pf-turn { 0%, 55% { transform: translateX(0); } 100% { transform: translateX(-32px); } }
        /* The cat, when there is something to be cross about: an empty tank or a
           jam. Its proportions are the ones every grumpy cat is drawn with: a
           head that takes half the height and nearly all the width, a small
           body tucked under it, and the tail curled round the front. */
        .pf-cat { position: absolute; left: 0; bottom: 3px; width: 42px; height: 44px; }
        .pf-cat .body {
          position: absolute; left: 9px; bottom: 0; width: 24px; height: 17px;
          border-radius: 12px 12px 9px 9px; background: #e7dbcf;
        }
        .pf-cat .paw {
          position: absolute; bottom: 0; width: 8px; height: 5px; border-radius: 4px 4px 3px 3px;
          background: #f6efe6;
        }
        .pf-cat .paw.l { left: 13px; }
        .pf-cat .paw.r { right: 13px; }
        .pf-cat .head {
          position: absolute; left: 1px; bottom: 12px; width: 40px; height: 30px;
          border-radius: 50% 50% 46% 46% / 46% 46% 54% 54%; background: #efe5da;
        }
        /* Small ears, set wide and tilted out, with the darker point a seal
           point cat carries. */
        .pf-cat .ear {
          position: absolute; bottom: 34px; width: 12px; height: 11px; background: #a1887f;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-cat .ear span {
          position: absolute; left: 50%; bottom: 0; width: 6px; height: 6px; margin-left: -3px;
          background: #d8b7ad; clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-cat .ear.l { left: 0; transform: rotate(-18deg); }
        .pf-cat .ear.r { right: 0; transform: rotate(18deg); }
        /* The lids do the sulking: thick, level, and low over the eye. */
        /* The eye is a low almond, and most of it is lid: on a grumpy cat the
           open part is a slit, which is what makes the stare. */
        .pf-cat .eye {
          position: absolute; top: 10px; width: 11px; height: 7px; border-radius: 1px 1px 5px 5px;
          background: #bcd6e6; border-top: 4px solid #4a4a46; overflow: hidden;
        }
        /* A big pupil, cut off at the top by the lid: on both drawings it takes
           most of what the eye still shows. */
        .pf-cat .eye span {
          position: absolute; left: 50%; top: -1px; width: 6px; height: 6px; margin-left: -3px;
          border-radius: 50%; background: #3a3f45;
        }
        .pf-cat .eye.l { left: 5px; transform: rotate(7deg); }
        .pf-cat .eye.r { right: 5px; transform: rotate(-7deg); }
        .pf-cat .muzzle {
          position: absolute; left: 50%; bottom: 2px; width: 21px; height: 13px; margin-left: -10.5px;
          border-radius: 50%; background: #faf4ec;
        }
        .pf-cat .nose {
          position: absolute; left: 50%; bottom: 8px; width: 5px; height: 4px; margin-left: -2.5px;
          background: #c98f8f; clip-path: polygon(50% 100%, 100% 0, 0 0);
        }
        .pf-cat .mouth {
          position: absolute; bottom: 3px; width: 7px; height: 5px;
          border-top: 1.8px solid #7a675d; border-radius: 50%;
        }
        .pf-cat .mouth.l { left: 50%; margin-left: -7px; }
        .pf-cat .mouth.r { left: 50%; margin-left: 0; }
        .pf-cat .whisk {
          position: absolute; bottom: 8px; width: 12px; height: 1px; border-radius: 1px;
          background: rgba(122, 103, 93, 0.5);
        }
        .pf-cat .whisk.l { left: -5px; transform: rotate(9deg); box-shadow: 1px 4px 0 0 rgba(122, 103, 93, 0.4); }
        .pf-cat .whisk.r { right: -5px; transform: rotate(-9deg); box-shadow: -1px 4px 0 0 rgba(122, 103, 93, 0.4); }
        /* The tail comes round the front, as a sitting cat lays it. */
        .pf-cat .tail {
          position: absolute; left: -3px; bottom: -1px; width: 17px; height: 13px;
          border: 4.5px solid #d9ccbf; border-top-color: transparent; border-right-color: transparent;
          border-radius: 0 0 0 12px;
        }
        /* The warning sits straight above its head: the two say the same thing,
           so they are read together. */
        .pf-alert { position: absolute; left: 12px; top: 38px; width: 18px; height: 16px; }
        .pf-alert::before {
          content: ""; position: absolute; inset: 0; background: var(--error-color, #f44336);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-alert i { position: absolute; left: 50%; background: #fff; }
        .pf-alert .bar { top: 5.5px; width: 2.5px; height: 5px; margin-left: -1.25px; border-radius: 1.25px; }
        .pf-alert .dot { top: 12px; width: 2.5px; height: 2.5px; margin-left: -1.25px; border-radius: 50%; }
        /* On the round tank, the double, the two hoppers and the wet-food
           feeder, the cat sits on the right. */
        .machine.canister .pf-cat, .machine.double .pf-cat, .machine.dual_split .pf-cat, .machine.rotary .pf-cat { left: auto; right: 0; }
        .machine.canister .pf-alert, .machine.double .pf-alert, .machine.dual_split .pf-alert, .machine.rotary .pf-alert { left: auto; right: 12px; }
  `,
};
}
