// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The hair_dryer drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
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


return {
draw: (cls, ctx) => hairDryerHtml(cls, ctx.hairDryer || {}),
css: () => `
        .hd-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .hd-s-hi { stop-color: var(--ac-body-hi, #ffffff); }
        .hd-s-body { stop-color: var(--ac-body, #e3e6ea); }
        .hd-part { fill: url(#hd-body); stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; }
        .hd-nozzle, .hd-grille { fill: var(--ac-body, #e3e6ea); stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; }
        .hd-btn { fill: var(--ac-body-lo, #b9bec6); }
        .hd-grip { stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1.2; opacity: 0.8; }
        .hd-cord { fill: none; stroke: var(--ac-body-lo, #b9bec6); stroke-width: 2.2; stroke-linecap: round; }
        .hd-inner { fill: none; stroke: var(--ac-body-lo, #b9bec6); stroke-width: 1; opacity: 0.5; }
        .hd-led { fill: #9e9e9e; }
        .machine.mode-cool { --hd-air: #29b6f6; }
        .machine.mode-hot, .machine.mode-on { --hd-air: #ff7a2f; }
        .machine.mode-cool .hd-led { fill: #4fc3f7; }
        .machine.mode-hot .hd-led, .machine.mode-on .hd-led { fill: #ff8a3d; }
        .hd-a0 { stop-color: var(--hd-air, #ff7a2f); stop-opacity: 1; }
        .hd-a1 { stop-color: var(--hd-air, #ff7a2f); stop-opacity: 0; }
        .hd-air path {
          fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 5 6;
          animation: hd-flow 0.55s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.mode-cool .hd-air path { animation-duration: 0.9s; }
        .hd-heat { opacity: 0; }
        .machine.mode-hot .hd-heat, .machine.mode-on .hd-heat {
          opacity: 1; animation: hd-glow 1.4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s);
        }
        .hd-rings circle {
          fill: none; stroke: var(--hd-air, #ff7a2f); stroke-width: 2; opacity: 0.5;
          transform-box: fill-box; transform-origin: center;
          animation: hd-ring 1.4s ease-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes hd-flow { to { stroke-dashoffset: -11; } }
        @keyframes hd-glow { from { opacity: 0.55; } to { opacity: 1; } }
        @keyframes hd-ring { 0% { transform: scale(0.9); opacity: 0.9; } 100% { transform: scale(1.45); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .hd-air path, .hd-heat, .hd-rings circle { animation-name: none; } }
  `,
};
}
