// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The camera drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
// The camera, drawn in its colour: the lens, its glint, the blue of a live
// view, an infrared ring that glows red at night, the status light, the REC
// tag and the waves of a motion.
const CAM_DEFS = `<defs>
<linearGradient id="cam-g-sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".55" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="cam-g-shv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<radialGradient id="cam-g-sph" cx=".38" cy=".32" r=".75"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".6" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></radialGradient>
<radialGradient id="cam-g-glass" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#3a4552"/><stop offset=".55" stop-color="#11161c"/><stop offset="1" stop-color="#05070a"/></radialGradient>
<radialGradient id="cam-g-lens" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4f6b8a"/><stop offset=".45" stop-color="#16263a"/><stop offset="1" stop-color="#020407"/></radialGradient>
<radialGradient id="cam-g-glow" r=".5"><stop offset="0" stop-color="#4fc3f7" stop-opacity=".95"/><stop offset="1" stop-color="#4fc3f7" stop-opacity="0"/></radialGradient>
<radialGradient id="cam-g-smoke" cx=".4" cy=".25" r=".85"><stop offset="0" stop-color="#56606b" stop-opacity=".85"/><stop offset=".6" stop-color="#1c2228" stop-opacity=".9"/><stop offset="1" stop-color="#0b0e11" stop-opacity=".95"/></radialGradient>
<linearGradient id="cam-g-al" x1="0" y1="0" x2="1" y2="0"><stop offset="0" class="cam-al0"/><stop offset=".32" class="cam-al1"/><stop offset=".7" class="cam-al2"/><stop offset="1" class="cam-al3"/></linearGradient>
<linearGradient id="cam-g-dbglass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a323b"/><stop offset=".5" stop-color="#0e1216"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<radialGradient id="cam-g-pir" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#6b737c"/><stop offset="1" stop-color="#1b2026"/></radialGradient>
<linearGradient id="cam-g-blk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#05070a"/><stop offset=".35" stop-color="#2a3138"/><stop offset=".6" stop-color="#0d1014"/><stop offset="1" stop-color="#030405"/></linearGradient>
<filter id="cam-f-soft" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="2.4"/></filter>
<linearGradient id="cam-g-cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color:var(--ac-body-lo,#c9d0d7)"/><stop offset=".3" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".7" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="cam-g-visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b333c"/><stop offset=".45" stop-color="#0d1115"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<linearGradient id="cam-g-ceil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9d4cb" stop-opacity="0"/><stop offset=".18" stop-color="#e3dfd7"/><stop offset=".82" stop-color="#e3dfd7"/><stop offset="1" stop-color="#d9d4cb" stop-opacity="0"/></linearGradient>
<linearGradient id="cam-g-ceiledge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9b2a6" stop-opacity="0"/><stop offset=".18" stop-color="#c4bdb1"/><stop offset=".82" stop-color="#c4bdb1"/><stop offset="1" stop-color="#b9b2a6" stop-opacity="0"/></linearGradient>
</defs>`;
const CAM_EDGE = 'stroke="rgba(0,0,0,.28)"';
function camLens(x, y, r, irR) {
  const irs = irR ? `<g class="cam-ir">${Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2;
    return `<circle cx="${(x + Math.cos(t) * irR).toFixed(1)}" cy="${(y + Math.sin(t) * irR).toFixed(1)}" r="1.1"/>`;
  }).join("")}</g>` : "";
  const gx = x - r * 0.35, gy = y - r * 0.38;
  return `${irs}<circle cx="${x}" cy="${y}" r="${r + 1.6}" fill="#05070a"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#cam-g-lens)"/>`
    + `<circle cx="${x}" cy="${y}" r="${(r * 0.42).toFixed(2)}" fill="#03060a"/><circle class="cam-glow" cx="${x}" cy="${y}" r="${(r * 1.9).toFixed(2)}" fill="url(#cam-g-glow)"/>`
    + `<ellipse cx="${gx.toFixed(2)}" cy="${gy.toFixed(2)}" rx="${(r * 0.32).toFixed(2)}" ry="${(r * 0.2).toFixed(2)}" fill="#fff" opacity=".55" transform="rotate(-30 ${gx.toFixed(2)} ${gy.toFixed(2)})"/>`;
}
const camWaves = (x, y) => `<g class="cam-waves" transform="translate(${x} ${y})"><path d="M6 -7 Q11 0 6 7"/><path d="M12 -12 Q20 0 12 12"/><path d="M18 -17 Q29 0 18 17"/></g>`;
const CAM_REC = `<g class="cam-rec"><rect x="4" y="4" width="25" height="11" rx="3" fill="#000" opacity=".55"/><circle cx="9.5" cy="9.5" r="2.4" fill="#ff3b30"/><text x="13.5" y="12.4" font-size="7.5" font-family="Arial, sans-serif" font-weight="700" fill="#fff">REC</text></g>`;
// A soft shadow on the floor or on the wall, blurred rather than a hard ellipse.
const camShadow = (cx, cy, rx, ry, op = .24) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#cam-f-soft)"/>`;
const CAMERA_SVGS = {
  // A pan-and-tilt camera, after the Tapo C200 or the Ezviz C6: a round head
  // with a black face on a neck and a round foot. Tilted down for privacy.
  indoor: () => `${camShadow(60, 113, 27, 3.6)}
<path d="M35 99 V106 A25 5.6 0 0 0 85 106 V99 Z" fill="url(#cam-g-cyl)" ${CAM_EDGE} stroke-width=".5"/>
<ellipse cx="60" cy="99" rx="25" ry="5.6" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".5"/>
<ellipse cx="60" cy="98.6" rx="16" ry="3.2" fill="#000" opacity=".06"/>
<path d="M52.5 76 V97 A7.5 1.8 0 0 0 67.5 97 V76 Z" fill="url(#cam-g-cyl)" ${CAM_EDGE} stroke-width=".5"/>
<ellipse cx="60" cy="80" rx="9.5" ry="2.6" fill="url(#cam-g-cyl)" ${CAM_EDGE} stroke-width=".5"/>
<circle cx="60" cy="46" r="31" fill="url(#cam-g-sph)" ${CAM_EDGE} stroke-width=".7"/>
<path d="M33 60 Q60 72 87 60" stroke="#000" stroke-width=".6" opacity=".12" fill="none"/>
<g class="cam-on"><rect x="38.5" y="26" width="43" height="41" rx="19" fill="url(#cam-g-visor)"/>
<path d="M44 33 Q50 28.5 60 28.4" stroke="#fff" stroke-width="1.4" opacity=".22" fill="none" stroke-linecap="round"/>
${camLens(60, 45, 7.4, 12.6)}<circle cx="47.6" cy="36.4" r="1.2" fill="#2b3946"/><circle cx="72.4" cy="36.4" r="1.2" fill="#2b3946"/>
<circle class="cam-led" cx="60" cy="61" r="1.5"/></g>
<g class="cam-off"><path d="M41 69 Q60 80 79 69 Q74 76.5 60 77.5 Q46 76.5 41 69 Z" fill="#0d1115"/><path d="M33 40 Q60 33 87 40" fill="none" ${CAM_EDGE} stroke-width=".7"/><circle cx="60" cy="24" r="1.4" fill="rgba(0,0,0,.18)"/></g>
<path d="M38 24 Q46 16 58 15.5" stroke="#fff" stroke-width="2.4" opacity=".55" fill="none" stroke-linecap="round"/>
${camWaves(86, 46)}${CAM_REC}`,
  // The Netatmo indoor camera: a tube of brushed aluminium, a black window
  // at the top with the lens, a light under it.
  tube: () => `${camShadow(60, 108.5, 20, 3.6, .3)}
<path d="M43 16 V104 A17 5 0 0 0 77 104 V16 Z" fill="url(#cam-g-al)"/>
<ellipse cx="60" cy="16" rx="17" ry="5" class="cam-al-top"/><ellipse cx="60" cy="16" rx="15.5" ry="4.2" fill="url(#cam-g-al)" opacity=".8"/>
<path d="M47 22 Q60 26 73 22 V60 Q60 64 47 60 Z" fill="url(#cam-g-blk)"/>
<path d="M50 25 Q56 27 62 27" stroke="#fff" stroke-width="1.2" opacity=".2" fill="none" stroke-linecap="round"/>
<g class="cam-on">${camLens(60, 38, 6.2, 9.5)}</g>
<g class="cam-off"><circle cx="60" cy="38" r="7.8" fill="#2a3037"/><circle cx="60" cy="38" r="5" fill="#1c2127"/></g>
<circle class="cam-led" cx="60" cy="54" r="1.4"/>
<path d="M49 68 V100 M53 68 V102 M67 68 V102 M71 68 V100" stroke="#fff" stroke-width=".5" opacity=".25"/>
${camWaves(74, 38)}${CAM_REC}`,
  // A wall camera, after the Arlo Essential and Pro: a white box with
  // rounded corners, seen three-quarters, its black glass front standing
  // upright with the lens at the top, on a white wall bracket whose stem
  // holds it from below by a ball joint.
  outdoor: () => `${camShadow(17, 92, 7, 16, .18)}
<rect x="9" y="74" width="15" height="36" rx="5" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".6"/>
<rect x="11" y="76" width="2.6" height="32" rx="1.3" fill="#fff" opacity=".55"/>
<circle cx="16.5" cy="79.5" r="1.1" fill="rgba(0,0,0,.28)"/><circle cx="16.5" cy="104.5" r="1.1" fill="rgba(0,0,0,.28)"/>
<path d="M23 92 H52 Q58 92 58 86 V80" style="stroke:var(--ac-body-lo,#c9d0d7)" stroke-width="7.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 92 H52 Q58 92 58 86 V80" style="stroke:var(--ac-body,#eef1f4)" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25 90.6 H51" stroke="#fff" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>
${camShadow(64, 78, 26, 3, .18)}
<path d="M66 18 L40 23 Q31 25 31 34 V62 Q31 71 40 72 L66 76 Z" fill="url(#cam-g-sh)" ${CAM_EDGE} stroke-width=".6"/>
<path d="M66 18 L40 23 Q31 25 31 34 V62 Q31 71 40 72 L66 76 Z" fill="#000" opacity=".07"/>
<path d="M40 23 L66 18" stroke="#fff" stroke-width="2" opacity=".75" stroke-linecap="round"/>
<path d="M35 32 V62" stroke="#fff" stroke-width="2.2" opacity=".5" stroke-linecap="round"/>
<path d="M40 72 L66 76" stroke="#000" stroke-width="1.2" opacity=".1"/>
<rect x="62" y="16" width="38" height="61" rx="13" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".7"/>
<rect x="66.5" y="20.5" width="29" height="52" rx="10" fill="url(#cam-g-dbglass)"/>
<path d="M70 26 Q75 22.5 84 22.5" stroke="#fff" stroke-width="1.3" opacity=".22" fill="none" stroke-linecap="round"/>
<g class="cam-on">${camLens(81, 35, 6.2, 0)}<g class="cam-ir"><circle cx="72" cy="35" r="1"/><circle cx="90" cy="35" r="1"/></g></g>
<g class="cam-off"><circle cx="81" cy="35" r="7.6" fill="#2a3037"/><circle cx="81" cy="35" r="4.8" fill="#1c2127"/></g>
<rect x="74" y="50" width="14" height="3.2" rx="1.6" fill="#2c343d"/>
<circle class="cam-led" cx="81" cy="62" r="1.3"/>
<path d="M62.5 48 L60 76" stroke="#000" stroke-width=".6" opacity=".12"/>
<ellipse cx="58" cy="78.5" rx="5" ry="2.4" fill="#000" opacity=".12"/>
<circle cx="58" cy="79" r="4.6" fill="url(#cam-g-sph)" ${CAM_EDGE} stroke-width=".6"/>
${camWaves(96, 46)}${CAM_REC}`,
  // A ceiling dome: the ceiling drawn as a plane fading at its ends, the
  // white base, and the smoked glass with the camera ball behind it.
  dome: () => `<rect x="-8" y="-8" width="136" height="26" fill="url(#cam-g-ceil)"/>
<rect x="-8" y="18" width="136" height="3" fill="url(#cam-g-ceiledge)"/>
${camShadow(60, 21, 56, 3.5, .22)}
<g transform="translate(60 0) scale(1.3) translate(-60 0)">
<path d="M14 15 H106 Q106 27 95 34 H25 Q14 27 14 15 Z" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".7"/>
<path d="M20 18 H100" stroke="#fff" stroke-width="1.4" opacity=".6" stroke-linecap="round"/>
<circle cx="27" cy="22" r="1.3" fill="rgba(0,0,0,.3)"/><circle cx="93" cy="22" r="1.3" fill="rgba(0,0,0,.3)"/>
<rect x="21" y="33" width="78" height="6" rx="2.5" style="fill:var(--ac-body-lo,#c9d0d7)"/>
<path d="M24 39 A36 37 0 0 0 96 39 Z" fill="#0d1115"/>
<g class="cam-on"><circle cx="66" cy="58" r="16" fill="#1a1f25"/><circle cx="66" cy="58" r="16" fill="url(#cam-g-glass)" opacity=".6"/>${camLens(67, 59, 6.8, 11)}</g>
<g class="cam-off"><path d="M33 48 Q60 70 87 48" fill="#2a3037"/><path d="M42 56 Q60 64 78 56" stroke="#3b434c" stroke-width="1.2" fill="none"/></g>
<path d="M24 39 A36 37 0 0 0 96 39 Z" fill="url(#cam-g-smoke)" opacity=".55"/>
<path d="M32 46 Q37 62 52 70" stroke="#fff" stroke-width="2.6" fill="none" opacity=".32" stroke-linecap="round"/>
<path d="M24 39 A36 37 0 0 0 96 39" fill="none" ${CAM_EDGE} stroke-width=".7"/>
<circle class="cam-led" cx="40" cy="50" r="1.3"/>
</g>${camWaves(86, 96)}<g transform="translate(0 92)">${CAM_REC}</g>`,
  // A video doorbell on its wall: the lens at the top, the motion sensor, and
  // the button in its ring of light, which beats when someone rings.
  doorbell: () => `${camShadow(62, 62, 22, 58, .14)}
<rect x="40" y="2" width="40" height="114" rx="17" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".7"/>
<path d="M47 8 H73" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<rect x="42" y="5" width="3" height="104" rx="1.5" fill="#fff" opacity=".45"/>
<rect x="44" y="12" width="32" height="56" rx="13" fill="url(#cam-g-dbglass)"/>
<g class="cam-on">${camLens(60, 28, 6.6, 10.4)}</g>
<g class="cam-off"><circle cx="60" cy="28" r="7.8" fill="#2a3037"/><circle cx="60" cy="28" r="5" fill="#1c2127"/></g>
<circle class="cam-led" cx="60" cy="42.5" r="1.2"/>
<circle cx="60" cy="54" r="5" fill="url(#cam-g-pir)"/><path d="M56 54 H64 M57 51.5 H63 M57 56.5 H63" stroke="#000" stroke-width=".4" opacity=".4"/>
<path d="M49 18 Q55 14 64 14" stroke="#fff" stroke-width="1.2" opacity=".2" fill="none" stroke-linecap="round"/>
<path d="M53 74 H67 M54.5 77 H65.5" stroke="rgba(0,0,0,.35)" stroke-width="1.1" stroke-linecap="round"/>
<circle class="cam-dbhalo" cx="60" cy="96" r="12"/>
<circle cx="60" cy="96" r="13" fill="#1b2026"/>
<circle class="cam-dbring" cx="60" cy="96" r="11.6"/>
<circle cx="60" cy="96" r="9.6" fill="url(#cam-g-sh)" ${CAM_EDGE} stroke-width=".5"/>
<path d="M60 91.4 q-3.4 0 -3.4 3.6 v2.2 l-1.2 1.6 h9.2 l-1.2 -1.6 v-2.2 q0 -3.6 -3.4 -3.6 Z M58.8 99.6 a1.2 1.2 0 0 0 2.4 0" fill="#7b8590"/>
<g class="cam-bell"><path d="M84 88 Q89 96 84 104" style="--dx:4px"/><path d="M90 84 Q97 96 90 108" style="--dx:5px"/><path d="M36 88 Q31 96 36 104" style="--dx:-4px"/><path d="M30 84 Q23 96 30 108" style="--dx:-5px"/></g>
${camWaves(80, 40)}${CAM_REC}`,
};
function cameraHtml(cls, c) {
  const layout = CAMERA_LAYOUTS.includes(c.layout) ? c.layout : "indoor";
  const flags = ["cam", `cam-l-${layout}`, `cam-m-${c.mode || "unav"}`, c.night ? "cam-night" : "", c.dark ? "cam-dark" : ""].filter(Boolean).join(" ");
  return `
        <div class="machine ${cls} ${flags}"><svg class="cam-svg" viewBox="0 -8 120 135">${CAM_DEFS}${CAMERA_SVGS[layout]()}</svg></div>`;
}


return {
draw: (cls, ctx) => cameraHtml(cls, ctx.camera || {}),
css: () => `
        svg.cam-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:hidden}
        .cam-led{fill:#9aa3ad}
        .cam-m-idle .cam-led{fill:#4caf50}
        .cam-m-live .cam-led{fill:#03a9f4}
        .cam-m-rec .cam-led{fill:#f44336;animation:cam-blink 1s steps(1) infinite;animation-delay:var(--anim-offset,0s)}
        .cam-m-motion .cam-led{fill:#ff9800;animation:cam-blink .5s steps(1) infinite;animation-delay:var(--anim-offset,0s)}
        .cam-glow{opacity:0}
        .cam-m-live .cam-glow{opacity:1;animation:cam-breathe 2s ease-in-out infinite;animation-delay:var(--anim-offset,0s)}
        .cam-waves{opacity:0}
        .cam-m-motion .cam-waves{opacity:1}
        .cam-waves path{fill:none;stroke:#ff9800;stroke-width:2.4;stroke-linecap:round;transform-box:fill-box;transform-origin:0% 50%;opacity:0;animation:cam-wave 1.6s ease-out infinite}
        .cam-waves path:nth-child(2){animation-delay:.4s}
        .cam-waves path:nth-child(3){animation-delay:.8s}
        .cam-rec{opacity:0}
        .cam-m-rec .cam-rec{opacity:1}
        .cam-rec circle{animation:cam-blink 1s steps(1) infinite}
        .cam-ir circle{fill:#5a1a1a}
        .cam-night .cam-ir circle{fill:#ff3b30;animation:cam-ir 1.6s ease-in-out infinite;filter:drop-shadow(0 0 1.5px #ff3b30)}
        .cam-off{display:none}
        .cam-m-off .cam-on{display:none}
        .cam-m-off .cam-off{display:inline}
        .machine.cam-m-unav{opacity:.45;filter:grayscale(1)}
        .cam-al0{stop-color:#8d959d}.cam-al1{stop-color:#eef1f3}.cam-al2{stop-color:#c3c9cf}.cam-al3{stop-color:#848c94}
        .cam-al-top{fill:#c3c9cf}
        .cam-dark .cam-al0{stop-color:#25292d}.cam-dark .cam-al1{stop-color:#4c535a}.cam-dark .cam-al2{stop-color:#33393f}.cam-dark .cam-al3{stop-color:#1a1d20}
        .cam-dark .cam-al-top{fill:#33393f}
        @keyframes cam-blink { 50% { opacity: .15; } }
        @keyframes cam-breathe { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        @keyframes cam-wave { 0% { opacity: 0; transform: scale(.6); } 30% { opacity: 1; } 100% { opacity: 0; transform: scale(1.25); } }
        @keyframes cam-ir { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
        .cam-dbring{fill:none;stroke:#4fc3f7;stroke-width:2.4;opacity:.45}
        .cam-m-ring .cam-dbring{opacity:1;stroke:#29b6f6;animation:cam-dbpulse 1s ease-in-out infinite;animation-delay:var(--anim-offset,0s)}
        .cam-m-off .cam-dbring,.cam-m-unav .cam-dbring{opacity:0}
        .cam-dbhalo{fill:#4fc3f7;opacity:0;transform-box:fill-box;transform-origin:center}
        .cam-m-ring .cam-dbhalo{animation:cam-dbhalo 1s ease-out infinite;animation-delay:var(--anim-offset,0s)}
        .cam-bell{opacity:0}
        .cam-m-ring .cam-bell{opacity:1}
        .cam-bell path{fill:none;stroke:#29b6f6;stroke-width:1.8;stroke-linecap:round;opacity:0;animation:cam-dbwave 1s ease-out infinite}
        .cam-bell path:nth-child(2n){animation-delay:.2s}
        .cam-m-ring .cam-led{fill:#03a9f4}
        @keyframes cam-dbpulse { 50% { stroke-width: 3.6; } }
        @keyframes cam-dbhalo { 0% { opacity: .55; transform: none; } 100% { opacity: 0; transform: scale(1.75); } }
        @keyframes cam-dbwave { 0% { opacity: 0; } 20% { opacity: 1; } 100% { opacity: 0; transform: translateX(var(--dx, 4px)); } }
        @media (prefers-reduced-motion: reduce) { .machine.cam * { animation-name: none !important; } }
  `,
};
}
