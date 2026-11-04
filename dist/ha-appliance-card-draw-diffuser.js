// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The diffuser drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// The palettes of a diffuser: wood, the default for the shapes that are made
// of it, or the card's colour.
const DIF_WOOD = ["#c98f55", "#a8693a", "#7d4a26", "#e3b07a"];
const DIF_WHITE = ["#ffffff", "#eceef0", "#c9cfd5", "#ffffff"];
const DIF_PAL = { white: DIF_WHITE, grey: ["#b6bbbf", "#9ea4a8", "#7e8488", "#d0d5d8"], black: ["#4a4f55", "#2c3035", "#16191c", "#5c636a"], red: ["#8a3035", "#6d2226", "#4a1518", "#a3434a"] };
function difGrain(clip) {
  let g = "";
  for (let i = 0; i < 9; i++) {
    const x = 26 + i * 8.5, w = 3 + (i % 3) * 2;
    g += `<path d="M${x} 20 C${x + w} 40 ${x - w} 60 ${x + w / 2} 80 S${x - w} 96 ${x} 104" stroke="#7a4522" stroke-width="${(0.6 + (i % 2) * 0.5).toFixed(1)}" fill="none" opacity=".35"/>`;
  }
  return `<g clip-path="url(#${clip})">${g}<ellipse cx="72" cy="66" rx="9" ry="14" fill="none" stroke="#7a4522" stroke-width=".7" opacity=".35"/></g>`;
}
const DIF_PUFFS = (x, y) => `<g class="dif-puffs">${[0, 1, 2, 3].map(() => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4.5"/>`).join("")}</g>`;
const DIF_DROP_BADGE = `<g class="dif-empty"><circle cx="104" cy="16" r="9" fill="#f44336"/><path d="M104 10 Q100 15.5 100 18 A4 4 0 0 0 108 18 Q108 15.5 104 10 Z" fill="#fff"/></g>`;
const DIF_HALO = (cx, cy, rx, ry) => `<ellipse class="dif-halo" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#dif-g-halo)"/>`;
const DIFFUSER_SVGS = {
  drop: (wood, b) => {
    const d = "M56.5 14 H63.5 C63.5 30 71 40 85 50 C100 60 103 79 97 91 Q94 99 85 99 H35 Q26 99 23 91 C17 79 20 60 35 50 C49 40 56.5 30 56.5 14 Z";
    return `<defs><radialGradient id="dif-g-b" cx=".38" cy=".38" r=".75"><stop offset="0" stop-color="${b[3]}"/><stop offset=".55" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[2]}"/></radialGradient><clipPath id="dif-c"><path d="${d}"/></clipPath></defs>
<g transform="translate(12 20) scale(.8)">${DIF_HALO(60, 104, 66, 15)}<ellipse cx="60" cy="106" rx="34" ry="3.5" fill="#000" opacity=".16"/>
<rect x="33" y="99" width="7" height="4" rx="1.5" fill="${b[2]}"/><rect x="80" y="99" width="7" height="4" rx="1.5" fill="${b[2]}"/>
<path d="${d}" fill="url(#dif-g-b)"/>${wood ? difGrain("dif-c") : ""}
<path d="M30 60 Q38 50 50 46" stroke="#fff" stroke-width="3" opacity=".25" fill="none" stroke-linecap="round"/>
<path class="dif-band" d="M21 82 Q60 88 99 82 L98.6 84.4 Q60 90.4 21.4 84.4 Z"/>
<rect x="47" y="88" width="12" height="4" rx="2" fill="none" stroke="#f4f4f2" stroke-width=".9"/><rect x="61" y="88" width="12" height="4" rx="2" fill="none" stroke="#f4f4f2" stroke-width=".9"/></g>${DIF_PUFFS(60, 30)}`;
  },
  cone: (wood, b) => `<defs><linearGradient id="dif-g-b" x1="0" x2="1"><stop offset="0" stop-color="${b[2]}"/><stop offset=".35" stop-color="${b[3]}"/><stop offset=".75" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[2]}"/></linearGradient></defs>
<g transform="translate(12 20) scale(.8)">${DIF_HALO(60, 102, 62, 15)}<ellipse cx="60" cy="104" rx="32" ry="3.5" fill="#000" opacity=".16"/>
<path d="M30 92 Q60 101 90 92 L91 98 Q60 107 29 98 Z" fill="${wood ? "#a8693a" : b[2]}"/>
<path d="M50 22 Q60 18 70 22 L88 92 Q60 100 32 92 Z" fill="url(#dif-g-b)"/>
<path class="dif-band" d="M40 70 Q60 75 80 70 L83 82 Q60 88 37 82 Z"/>
<ellipse cx="60" cy="21" rx="9" ry="2.6" fill="${b[2]}"/><ellipse cx="60" cy="20.4" rx="3" ry="1" fill="#555"/></g>${DIF_PUFFS(60, 33)}`,
  stone: (wood, b) => {
    const c = wood ? ["#efe9e1", "#d8cfc3", "#b9ad9f"] : [b[3], b[1], b[2]];
    const d = "M60 34 C82 34 92 60 90 80 C88 98 76 104 60 104 C44 104 32 98 30 80 C28 60 38 34 60 34 Z";
    return `<defs><radialGradient id="dif-g-b" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${c[0]}"/><stop offset=".6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient></defs>
${DIF_HALO(60, 105, 54, 13)}<ellipse cx="60" cy="106" rx="30" ry="3.5" fill="#000" opacity=".16"/>
<path class="dif-band" d="M36 102 Q60 108 84 102 L84 104 Q60 110 36 104 Z"/>
<path d="${d}" fill="url(#dif-g-b)"/>
<path d="M41 56 Q46 44 56 40" stroke="#fff" stroke-width="3" opacity=".3" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="36" rx="4" ry="1.4" fill="#6d655c"/>${DIF_PUFFS(60, 32)}`;
  },
  flame: (wood, b) => `<defs><linearGradient id="dif-g-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b[3]}"/><stop offset="1" stop-color="${b[2]}"/></linearGradient>
<linearGradient id="dif-g-fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffcc80"/><stop offset=".4" stop-color="#ff9100"/><stop offset=".85" stop-color="#ff6d00" stop-opacity=".5"/><stop offset="1" stop-color="#ff6d00" stop-opacity="0"/></linearGradient></defs>
${DIF_HALO(60, 106, 58, 12)}<ellipse cx="60" cy="107" rx="40" ry="3.5" fill="#000" opacity=".16"/>
<g class="dif-fl"><path d="M60 72 C50 62 54 50 58 40 C60 48 66 50 64 40 C74 52 72 64 60 72 Z" fill="url(#dif-g-fl)"/></g>
<g class="dif-fl dif-f2"><path d="M50 72 C44 64 46 56 50 50 C52 58 56 60 55 52 C62 60 60 68 50 72 Z" fill="url(#dif-g-fl)" opacity=".8"/><path d="M70 72 C64 64 66 58 70 52 C72 60 76 62 75 54 C82 62 80 68 70 72 Z" fill="url(#dif-g-fl)" opacity=".8"/></g>
<path d="M22 72 H98 Q102 72 102 76 V100 Q102 104 98 104 H22 Q18 104 18 100 V76 Q18 72 22 72 Z" fill="url(#dif-g-b)"/>
<rect x="40" y="68" width="40" height="6" rx="3" fill="#2b2f34"/>
<circle cx="34" cy="90" r="2.4" fill="none" stroke="${b[2]}" stroke-width=".8"/><circle cx="86" cy="90" r="2.4" fill="none" stroke="${b[2]}" stroke-width=".8"/>
<path class="dif-band" d="M18 98 H102 V100 Q102 104 98 104 H22 Q18 104 18 100 Z"/>`,
  nebulizer: (wood, b) => {
    const base = wood ? ["#c98f55", "#7d4a26"] : [b[0], b[2]];
    return `<defs><linearGradient id="dif-g-b" x1="0" x2="1"><stop offset="0" stop-color="${base[1]}"/><stop offset=".45" stop-color="${base[0]}"/><stop offset="1" stop-color="${base[1]}"/></linearGradient>
<radialGradient id="dif-g-gl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="#e3f0f6" stop-opacity=".35"/><stop offset="1" stop-color="#a7c0cc" stop-opacity=".5"/></radialGradient></defs>
${DIF_HALO(60, 106, 52, 12)}<ellipse cx="60" cy="107" rx="28" ry="3.5" fill="#000" opacity=".16"/>
<path d="M34 84 H86 L82 104 H38 Z" fill="url(#dif-g-b)"/>
<path d="M57 30 H63 V44 C78 48 84 60 82 70 C80 80 72 84 60 84 C48 84 40 80 38 70 C36 60 42 48 57 44 Z" fill="url(#dif-g-gl)" stroke="#9fb6c2" stroke-width=".8"/>
<path d="M42 74 Q60 78 78 74 C76 80 70 83 60 83 C50 83 44 80 42 74 Z" fill="#e0a64b" opacity=".75"/>
<path class="dif-glass" d="M40 72 Q60 64 80 72 C78 80 70 84 60 84 C50 84 42 80 40 72 Z"/>
<path d="M47 56 Q50 50 56 48" stroke="#fff" stroke-width="2" opacity=".7" fill="none" stroke-linecap="round"/>
<circle cx="60" cy="96" r="2" fill="none" stroke="${base[1]}" stroke-width=".8"/>${DIF_PUFFS(60, 27)}`;
  },
};
function diffuserHtml(cls, d) {
  const layout = DIFFUSER_LAYOUTS.includes(d.layout) ? d.layout : "drop";
  const pal = DIF_PAL[d.palette];
  const wood = !pal && ["drop", "flame", "nebulizer"].includes(layout);
  const b = pal || (wood ? DIF_WOOD : DIF_WHITE);
  const flags = ["dif", `dif-l-${layout}`, `dif-m-${d.mode || "unav"}`, d.lit ? "dif-lit" : ""].filter(Boolean).join(" ");
  return `
        <div class="machine ${cls} ${flags}" style="--dif-lc:${d.lightColor || "#ffd180"}"><svg class="dif-svg" viewBox="0 0 120 120">
<defs><radialGradient id="dif-g-halo" r=".5"><stop offset="0" stop-color="var(--dif-lc)" stop-opacity="1"/><stop offset=".45" stop-color="var(--dif-lc)" stop-opacity=".55"/><stop offset="1" stop-color="var(--dif-lc)" stop-opacity="0"/></radialGradient></defs>
${DIFFUSER_SVGS[layout](wood, b)}${DIF_DROP_BADGE}</svg></div>`;
}


return {
draw: (cls, ctx) => diffuserHtml(cls, ctx.diffuser || {}),
css: () => `
        svg.dif-svg{position:absolute;left:-12px;top:-6px;width:120px;height:120px;overflow:hidden}
        .dif-puffs ellipse{fill:color-mix(in srgb,var(--secondary-text-color,#727272) 45%,transparent);opacity:0;transform-box:fill-box;transform-origin:50% 50%;filter:blur(1.2px)}
        .dif-m-mist .dif-puffs ellipse{animation:dif-mist 2.6s ease-out infinite}
        .dif-m-low .dif-puffs{opacity:.55}
        .dif-m-low .dif-puffs ellipse{animation:dif-mist 4s ease-out infinite}
        .dif-m-inter .dif-puffs ellipse{animation:dif-puff 5s ease-out infinite}
        .dif-puffs ellipse:nth-child(2){--dx:-6px;animation-delay:.6s!important}
        .dif-puffs ellipse:nth-child(3){--dx:7px;animation-delay:1.2s!important}
        .dif-puffs ellipse:nth-child(4){--dx:-2px;animation-delay:1.8s!important}
        .dif-halo{opacity:0}
        .dif-lit .dif-halo{opacity:1;animation:dif-breathe 3s ease-in-out infinite}
        .dif-band{fill:#f4f4f2}
        .dif-lit .dif-band{fill:var(--dif-lc)}
        .dif-glass{fill:var(--dif-lc);opacity:0}
        .dif-lit .dif-glass{opacity:.85}
        .dif-empty{display:none}
        .dif-m-empty .dif-empty{display:inline;animation:dif-blink 1s steps(1) infinite}
        .dif-fl{opacity:0;transform-box:fill-box;transform-origin:50% 100%}
        .dif-m-mist .dif-fl{opacity:.95;animation:dif-flame .9s ease-in-out infinite}
        .dif-m-low .dif-fl{opacity:.6;animation:dif-flame 1.3s ease-in-out infinite}
        .dif-m-inter .dif-fl{opacity:.95;animation:dif-flame .9s ease-in-out infinite,dif-breathe 5s ease-in-out infinite}
        .dif-fl.dif-f2{animation-delay:.3s}
        .machine.dif-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes dif-mist{0%{opacity:0;transform:translate(0,6px) scale(.5)}25%{opacity:.85}100%{opacity:0;transform:translate(var(--dx,0px),-28px) scale(1.7)}}
        @keyframes dif-puff{0%,55%{opacity:0;transform:translate(0,6px) scale(.5)}62%{opacity:.85}100%{opacity:0;transform:translate(var(--dx,0px),-28px) scale(1.7)}}
        @keyframes dif-flame{0%,100%{transform:scaleY(1) skewX(0)}30%{transform:scaleY(1.12) skewX(4deg)}60%{transform:scaleY(.92) skewX(-3deg)}}
        @keyframes dif-breathe{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes dif-blink{50%{opacity:.15}}
        @media (prefers-reduced-motion: reduce) { .machine.dif * { animation-name: none !important; } }
  `,
};
}
