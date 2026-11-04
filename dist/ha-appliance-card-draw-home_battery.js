// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The home_battery drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
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


return {
draw: (cls, ctx) => batteryHtml(cls, ctx.battery || {}),
css: () => ENERGY_CSS,
};
}
