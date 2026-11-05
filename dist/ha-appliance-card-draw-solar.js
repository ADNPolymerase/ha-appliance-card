// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The solar drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
const ENERGY_CSS = `
        svg.en-e{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .en-sun,.en-moon,.en-stars,.en-clouds{display:none}
        .en-sky-day .en-sun,.en-sky-low .en-sun{display:block}
        .en-sky-low .en-clouds{display:block}
        .en-sky-night .en-moon,.en-sky-night .en-stars{display:block}
        .en-rays{transform-box:fill-box;transform-origin:center;animation:en-spin 12s linear infinite}
        .en-sky-low .en-rays{animation:none;opacity:.5}
        .en-cloud{animation:en-drift 6s ease-in-out infinite}
        .en-cloud.en-c2{--d0:-3s}
        .en-stars circle{fill:#f5d76e;animation:en-twinkle 2.4s ease-in-out infinite}
        .en-stars circle:nth-child(2){--d0:-.8s}
        .en-stars circle:nth-child(3){--d0:-1.6s}
        .en-shine{opacity:0;animation:en-shine 4s ease-in-out infinite}
        .sol-m-day .en-shine{opacity:.55}
        .sol-m-low .en-shine{opacity:.25;animation-duration:7s}
        .en-wire{fill:none;stroke:#2b3137;stroke-width:1.4}
        .sol-ef{fill:none;stroke:#ffca28;stroke-width:1.8;stroke-dasharray:2.4 3.6;stroke-linecap:round;opacity:0}
        .sol-m-day .sol-ef{opacity:1;animation:en-flow .6s linear infinite}
        .sol-m-low .sol-ef{opacity:1;animation:en-flow 1.6s linear infinite}
        .sol-led{fill:#5a636b}
        .sol-m-day .sol-led,.sol-m-low .sol-led{fill:#2ecc71}
        .sol-m-error .sol-led{fill:#f44336;animation:en-blink 1s steps(1) infinite}
        .machine.sol-m-unav,.machine.bat-m-unav{opacity:.45;filter:grayscale(1)}
        .bat-lvl{fill:#43a047}
        .bat-m-discharging .bat-lvl{fill:#fb8c00}
        .bat-low .bat-lvl{fill:#f44336}
        .bat-m-error .bat-lvl{fill:#9aa1a8}
        .bat-m-unav .bat-lvl{fill:none}
        .bat-sweep{opacity:0}
        .bat-m-charging .bat-sweep{opacity:1;animation:en-sweep 2.2s ease-in-out infinite}
        .bat-reserve{stroke:#ffb300}
        .bat-bf{fill:none;stroke-width:2;stroke-dasharray:3 4;stroke-linecap:round;opacity:0}
        .bat-m-charging .bat-bf.bat-in{opacity:1;stroke:#43a047;animation:en-flow .7s linear infinite}
        .bat-m-discharging .bat-bf.bat-out{opacity:1;stroke:#ff9800;animation:en-flow .7s linear infinite}
        .bat-led{fill:#5a636b}
        .bat-m-charging .bat-led{fill:#43a047;animation:en-breathe 1.6s ease-in-out infinite}
        .bat-m-discharging .bat-led{fill:#ff9800}
        .bat-m-idle .bat-led,.bat-m-full .bat-led{fill:#43a047}
        .bat-m-error .bat-led{fill:#f44336;animation:en-blink 1s steps(1) infinite}
        .bat-lcd{font:700 10px/1 Roboto,Arial,sans-serif;fill:#7fe3ff;text-anchor:middle}
        .bat-m-charging .bat-lcd,.bat-m-full .bat-lcd{fill:#9cf09a}
        .bat-m-discharging .bat-lcd{fill:#ffcc80}
        .bat-low .bat-lcd{fill:#ff8a80}
        .bat-bolt{display:none}
        .bat-m-charging .bat-bolt{display:block;animation:en-breathe 1.6s ease-in-out infinite}
        .en-smoke,.en-ang{display:none}
        .sol-m-error .en-smoke,.sol-m-error .en-ang,.bat-m-error .en-smoke,.bat-m-error .en-ang{display:block}
        .en-smoke .en-pf{transform-box:fill-box;transform-origin:50% 100%;animation:en-puff 2s ease-out infinite}
        .en-smoke .en-pf2{--d0:-1s}
        .en-smoke .en-o{fill:#111417}
        .en-smoke .en-f{fill:#6b737b}
        .en-ang path{fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round}
        .en-ang{transform-box:fill-box;transform-origin:center;animation:en-angp .7s ease-in-out infinite alternate}
        @keyframes en-spin{to{transform:rotate(360deg)}}
        @keyframes en-drift{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
        @keyframes en-twinkle{0%,100%{opacity:.25}50%{opacity:1}}
        @keyframes en-shine{0%{transform:translateX(-70px)}60%,100%{transform:translateX(90px)}}
        @keyframes en-flow{to{stroke-dashoffset:-14}}
        @keyframes en-blink{50%{opacity:.15}}
        @keyframes en-breathe{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes en-sweep{from{transform:translateY(0)}to{transform:translateY(-40px)}}
        @keyframes en-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        @keyframes en-angp{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .machine.en * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.en * { animation-name: none !important; } }
`;

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


return {
draw: (cls, ctx) => solarHtml(cls, ctx.solar || {}),
css: () => ENERGY_CSS,
};
}
