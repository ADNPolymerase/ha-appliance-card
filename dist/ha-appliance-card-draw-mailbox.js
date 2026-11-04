// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The mailbox drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
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
const MB_SVGS = {
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
