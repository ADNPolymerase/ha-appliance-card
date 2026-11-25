// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The pool_pump drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing(deps) {
// A page still running the card of an earlier release: an arrow to reload.
if (!deps || deps.__v !== "5.1.1") return { draw: () => '<div class="machine" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.5">\u21bb</div>', css: "" };
let { ARC_BUTTONS, ARC_COLORS, BATTERY_LAYOUTS, CAMERA_LAYOUTS, CHARGER_MODES, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FT_FLAVORS, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntTint, numberOrNull, t, thsColor, zoneColumns } = deps;
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
<g class="pl-wnt"><path d="M59.4 3.6 H92.6 L94 20 H58 Z" fill="#2f5446" stroke="#1f3a30" stroke-width=".6"/><path d="M66 4 L65.2 19.6 M74 4 V19.6 M82 4 L82.8 19.6 M90 4 L91 19.6" stroke="#4d7a68" stroke-width=".7"/><path d="M57 1.4 Q66 -1.4 76 .6 Q86 -1.2 95 1.2 L95.6 3 H56.6 Z" fill="#f7fbfd" stroke="#d6e6ef" stroke-width=".4"/><path d="M8.3 41 Q8 31.6 22 30.4 Q36 31.6 35.7 41 Q31 37.2 26 38.4 Q21 36.6 16 38.6 Q11.5 37.4 8.3 41 Z" fill="#f7fbfd" stroke="#d6e6ef" stroke-width=".4"/><path d="M43.6 56 Q43.6 50 52.5 50 Q61.4 50 61.4 56 Q58 53.4 55 54.4 Q52 52.8 49 54.4 Q46 53.4 43.6 56 Z" fill="#f7fbfd" stroke="#d6e6ef" stroke-width=".4"/><path d="M58.8 62 H67.6 Q71.2 62 71.2 64.6 Q68 63.6 65 64.4 Q62 63.4 58.8 64.2 Z" fill="#f7fbfd"/><path d="M72.6 62.6 Q78.5 60.4 84.4 62.6 V64 Q81 63 78.5 63.8 Q76 63 72.6 64 Z" fill="#f7fbfd"/><path d="M4.2 7.2 Q30 3.6 54.6 5.8" fill="none" stroke="#f7fbfd" stroke-width="1.6" stroke-linecap="round"/><path d="M-2 95 Q24 91.6 50 94 Q72 92 98 95 V97.6 H-2 Z" fill="#f2f8fb"/><circle class="pl-fl" cx="6" cy="-4" r="1.35" style="--fd: 3.4s; --f0: 0s"/><circle class="pl-fl" cx="18" cy="-4" r="1.05" style="--fd: 4.1s; --f0: -1.2s"/><circle class="pl-fl" cx="29" cy="-4" r="1.5" style="--fd: 3.7s; --f0: -2.4s"/><circle class="pl-fl" cx="41" cy="-4" r="1.2" style="--fd: 4.4s; --f0: -0.6s"/><circle class="pl-fl" cx="52" cy="-4" r="1.35" style="--fd: 3.9s; --f0: -3.1s"/><circle class="pl-fl" cx="63" cy="-4" r="1.05" style="--fd: 4.6s; --f0: -1.8s"/><circle class="pl-fl" cx="74" cy="-4" r="1.5" style="--fd: 3.5s; --f0: -2.9s"/><circle class="pl-fl" cx="86" cy="-4" r="1.2" style="--fd: 4.2s; --f0: -0.3s"/><circle class="pl-fl" cx="12" cy="-4" r="0.9" style="--fd: 5s; --f0: -3.6s"/><circle class="pl-fl" cx="47" cy="-4" r="0.9" style="--fd: 4.8s; --f0: -2.1s"/><circle class="pl-fl" cx="80" cy="-4" r="0.9" style="--fd: 5.2s; --f0: -4s"/></g>
<g transform="translate(79 43) scale(.55)"><g class="pl-smoke"><g class="pl-pf pl-pf1"><circle class="pl-o" cx="13" cy="23" r="6.9"/><circle class="pl-o" cx="20" cy="18" r="7.9"/><circle class="pl-o" cx="27" cy="22" r="6.4"/><circle class="pl-o" cx="17" cy="12" r="5.9"/><circle class="pl-o" cx="24" cy="11" r="5.4"/><circle class="pl-f" cx="13" cy="23" r="5.5"/><circle class="pl-f" cx="20" cy="18" r="6.5"/><circle class="pl-f" cx="27" cy="22" r="5"/><circle class="pl-f" cx="17" cy="12" r="4.5"/><circle class="pl-f" cx="24" cy="11" r="4"/><path class="pl-hl" d="M15 9 q2 -2 4 -1 M17 15 q2 -2.5 5 -1.5"/></g><g class="pl-pf pl-pf2"><circle class="pl-o" cx="9.049999999999999" cy="21.55" r="6.074999999999999"/><circle class="pl-o" cx="15" cy="17.299999999999997" r="6.924999999999999"/><circle class="pl-o" cx="20.95" cy="20.7" r="5.65"/><circle class="pl-o" cx="12.45" cy="12.2" r="5.225"/><circle class="pl-o" cx="18.4" cy="11.35" r="4.8"/><circle class="pl-f" cx="9.049999999999999" cy="21.55" r="4.675"/><circle class="pl-f" cx="15" cy="17.299999999999997" r="5.5249999999999995"/><circle class="pl-f" cx="20.95" cy="20.7" r="4.25"/><circle class="pl-f" cx="12.45" cy="12.2" r="3.8249999999999997"/><circle class="pl-f" cx="18.4" cy="11.35" r="3.4"/><path class="pl-hl" d="M10.75 9.649999999999999 q2 -2 4 -1 M12.45 14.75 q2 -2.5 5 -1.5"/></g></g></g><g transform="translate(89.5 63.5)"><g class="pl-ang"><path d="M3.5 1.5 Q3.5 4 1 4"/><path d="M6 1.5 Q6 4 8.5 4"/><path d="M3.5 9.5 Q3.5 7 1 7"/><path d="M6 9.5 Q6 7 8.5 7"/></g></g>
</svg>`;
// The pool itself (HACF #217), pool_layout: basin. A basin in 3/4 under its
// deck, its spots on the far wall below the water line, its floating slatted
// cover and the roller it winds onto, a solar shower on the deck, and in
// winter a tarp with snow on it. b: pos (0 open .. 100 closed), moving,
// spots (count), light ("off", a colour, "random"), night, shower (null when
// there is none, else open or not), pump, winter.
function poolBasinSvg(b) {
  const FAR = { y: 27, x0: 32, x1: 102 }, NEAR = { y: 66, x0: 23, x1: 93 };
  const lerp = (a, c, t) => a + (c - a) * t;
  const at = (t, s) => [lerp(lerp(FAR.x0, FAR.x1, t), lerp(NEAR.x0, NEAR.x1, t), s), lerp(FAR.y, NEAR.y, s)];
  const pt = (p) => p.map((v) => v.toFixed(2)).join(",");
  const quad = (a, c, d, e) => `${pt(a)} ${pt(c)} ${pt(d)} ${pt(e)}`;
  const night = !!b.night, winter = !!b.winter;
  const lightOn = b.light && b.light !== "off" && !winter;
  const random = b.light === "random";
  const n = Math.max(1, Math.min(6, Math.round(Number(b.spots) || 3)));
  const spot = (i) => (random ? `hsl(${(i * 55) % 360} 95% 60%)` : b.light);
  const hasShower = b.shower !== null && b.shower !== undefined;
  const pos = winter ? 100 : Math.max(0, Math.min(100, Number(b.pos) || 0));
  const showerOn = hasShower && !!b.shower && !winter;
  const H = 6.5, D = 19;
  const atW = (t, s) => { const q = at(t, s); return [q[0], q[1] + H]; };
  const atD = (t, s) => { const q = at(t, s); return [q[0], q[1] + D]; };
  const hueAnim = (i) => (random ? `<animate attributeName="stop-color" values="${[0, 1, 2, 3, 4, 5, 0].map((k) => `hsl(${(i * 55 + k * 60) % 360} 95% 60%)`).join(";")}" dur="8s" repeatCount="indefinite"/>` : "");
  let h = `<defs>
    <linearGradient id="pb-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${winter ? (night ? "#123a40" : "#4f8f8a") : night ? "#0d3b66" : "#4fc3f7"}"/><stop offset="1" stop-color="${winter ? (night ? "#08201f" : "#2e6b6a") : night ? "#06213b" : "#0288d1"}"/></linearGradient>
    <linearGradient id="pb-deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe7d6"/><stop offset="1" stop-color="#ddd2bb"/></linearGradient>
    <linearGradient id="pb-tank" x1="0" x2="1"><stop offset="0" stop-color="#1b1f23"/><stop offset=".45" stop-color="#4a525a"/><stop offset="1" stop-color="#15191c"/></linearGradient>
    ${Array.from({ length: n }, (_, i) => `<radialGradient id="pb-g${i}"><stop offset="0" stop-color="${spot(i) || "#fff"}" stop-opacity=".95">${hueAnim(i)}</stop><stop offset=".55" stop-color="${spot(i) || "#fff"}" stop-opacity=".35">${hueAnim(i)}</stop><stop offset="1" stop-color="${spot(i) || "#fff"}" stop-opacity="0"/></radialGradient>`).join("")}
    <clipPath id="pb-pool"><polygon points="${quad(at(0, 0), at(1, 0), at(1, 1), at(0, 1))}"/></clipPath>
  </defs>`;
  // Deck, in the same oblique projection: parallel sides stay parallel.
  const L = hasShower ? -0.24 : -0.12;
  h += `<polygon points="${quad(at(L, -0.2), at(1.13, -0.2), at(1.13, 1.22), at(L, 1.22))}" fill="url(#pb-deck)" stroke="#c9bfa8" stroke-width=".6"/>`;
  const f0 = at(L, 1.22), f1 = at(1.13, 1.22), r0 = at(1.13, -0.2);
  h += `<polygon points="${quad(f0, f1, [f1[0], f1[1] + 4], [f0[0], f0[1] + 4])}" fill="#c2b597"/>`;
  h += `<polygon points="${quad(r0, f1, [f1[0], f1[1] + 4], [r0[0], r0[1] + 4])}" fill="#b3a585"/>`;
  // The basin as a box: tiled walls and floor seen through the water.
  h += `<g clip-path="url(#pb-pool)">`;
  h += `<polygon points="${quad(at(0, 0), at(1, 0), at(1, 1), at(0, 1))}" fill="${night ? "#16466f" : "#6ccff6"}"/>`;
  h += `<polygon points="${quad(atD(0, 0), atD(1, 0), atD(1, 1), atD(0, 1))}" fill="${night ? "#1c5687" : "#9be0fb"}"/>`;
  h += `<path d="M${pt(atD(1, 0))} L${pt(atD(0, 0))} L${pt(atD(0, 1))} M${pt(at(0, 0))} L${pt(atD(0, 0))}" stroke="${night ? "#0e3a5f" : "#3fb3e8"}" stroke-width=".7" fill="none"/>`;
  for (let k = 1; k < 4; k++) h += `<path d="M${pt([at(0, 0)[0], at(0, 0)[1] + D * k / 4])} L${pt([at(1, 0)[0], at(1, 0)[1] + D * k / 4])}" stroke="${night ? "#1f5a8c" : "#8fdcfa"}" stroke-width=".35"/>`;
  for (let i = 0; i < n; i++) {
    const [x, y0] = at((i + 1) / (n + 1), 0);
    h += `<ellipse class="pb-spot" cx="${x.toFixed(2)}" cy="${(y0 + H + 5).toFixed(2)}" rx="2" ry="1.3" fill="${lightOn ? spot(i) : "#78909c"}" stroke="#37474f" stroke-width=".35"/>`;
  }
  h += `<polygon points="${quad(atW(0, 0), atW(1, 0), atW(1, 1), atW(0, 1))}" fill="url(#pb-w)" opacity=".62"/>`;
  if (lightOn) for (let i = 0; i < n; i++) {
    const [x, y0] = at((i + 1) / (n + 1), 0);
    h += `<ellipse cx="${x.toFixed(2)}" cy="${(y0 + H + 9).toFixed(2)}" rx="${night ? 15 : 10}" ry="${night ? 11 : 7}" fill="url(#pb-g${i})" opacity="${night ? .95 : .5}"/><ellipse cx="${x.toFixed(2)}" cy="${(y0 + H + 5).toFixed(2)}" rx="1.3" ry=".8" fill="#fff" opacity=".9"/>`;
  }
  h += `<path d="M${pt(atW(0, 0))} L${pt(atW(1, 0))} M${pt(atW(0, 0))} L${pt(atW(0, 1))}" stroke="rgba(255,255,255,${night ? .25 : .6})" stroke-width=".6"/>`;
  // Two steps down into the water, at the far end from the roller.
  for (const [t0, t1, dd] of [[0, 0.06, 5], [0.06, 0.12, 11]]) {
    const A = (t, s) => { const q = at(t, s); return [q[0], q[1] + H + dd]; };
    h += `<polygon points="${quad(A(t0, 0), A(t1, 0), A(t1, 1), A(t0, 1))}" fill="${night ? "#2d6f9e" : "#c8eefc"}" opacity=".7"/><path d="M${pt(A(t1, 0))} L${pt(A(t1, 1))}" stroke="${night ? "#5f9ccc" : "#ffffff"}" stroke-width=".6" opacity=".8"/>`;
  }
  // Still ripples at rest; with the pump running, wave fronts run from the
  // far end towards the roller.
  const front = (t) => { let d = ""; for (let i = 0; i <= 18; i++) d += (i ? " L" : "M") + pt(atW(t + 0.012 * Math.sin(i * 1.4), i / 18)); return d; };
  const wc = `rgba(255,255,255,${night ? .22 : .5})`;
  if (b.pump && !winter) {
    const span = at(1, 0)[0] - at(0, 0)[0];
    for (let k = 0; k < 4; k++) h += `<path d="${front(0)}" stroke="${wc}" stroke-width="1.1" stroke-linejoin="round" fill="none" opacity="0"><animateTransform attributeName="transform" type="translate" from="0 0" to="${span.toFixed(1)} 0" dur="4s" begin="${-k}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="4s" begin="${-k}s" repeatCount="indefinite"/></path>`;
  } else for (const t of [0.2, 0.45, 0.7]) h += `<path d="${front(t)}" stroke="${wc}" stroke-width=".6" fill="none" opacity=".7"/>`;
  // The floating cover: the slats hang from the leading edge, the last one
  // slips under the roller.
  const p = pos / 100, slat = 1 / 22;
  for (let t0 = 1 - p; t0 < 1 - 1e-6; t0 += slat) {
    const t1 = Math.min(1, t0 + slat);
    h += `<polygon points="${quad(atW(t0, 0), atW(t1, 0), atW(t1, 1), atW(t0, 1))}" fill="#e6ebee" stroke="#9fb0b9" stroke-width=".3"/><path d="M${pt(atW(t0 + (t1 - t0) * 0.35, 0))} L${pt(atW(t0 + (t1 - t0) * 0.35, 1))}" stroke="#fff" stroke-width=".6" opacity=".8"/>`;
  }
  h += `</g>`;
  if (winter) {
    // The winter tarp over the shut cover, held by water tubes, snow on it.
    h += `<polygon points="${pt(at(-0.03, -0.06))} ${pt(at(0.965, -0.06))} ${pt(at(0.965, 1.06))} ${pt(at(-0.03, 1.06))}" fill="#2f5d50" stroke="#1f3f36" stroke-width=".6"/>`;
    for (const ss of [-0.04, 1.04]) h += `<path d="M${pt(at(-0.02, ss))} L${pt(at(0.955, ss))}" stroke="#4a6f63" stroke-width="2.2" stroke-linecap="round"/>`;
    for (const [t, ss, rx] of [[0.25, 0.35, 9], [0.62, 0.6, 11], [0.4, 0.82, 7]]) { const [x, y] = at(t, ss); h += `<ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="${rx}" ry="${(rx * 0.35).toFixed(1)}" fill="#fff" stroke="#e3edf3" stroke-width=".4"/>`; }
  }
  // The roller over the end of the pool, on a post at each end, thicker as
  // more of the cover is wound on it; it turns while the cover moves.
  const roll = 3.2 + 2 * (1 - p), up = 3;
  const lift = (q) => [q[0], q[1] - up];
  const e0 = lift(at(1.0, 0.04)), e1 = lift(at(1.0, 1.03));
  for (const s of [0.0, 1.06]) { const [x, y] = at(1.0, s); h += `<rect x="${(x - 1.6).toFixed(2)}" y="${(y - up - 0.5).toFixed(2)}" width="3.2" height="${(up + 3).toFixed(2)}" rx=".6" fill="#90a4ae"/>`; }
  h += `<path d="M${pt(e0)} L${pt(e1)}" stroke="#607d8b" stroke-width="${(roll + 0.9).toFixed(2)}" stroke-linecap="round"/><path d="M${pt(e0)} L${pt(e1)}" stroke="#cfd8dc" stroke-width="${roll.toFixed(2)}" stroke-linecap="round"/>`;
  h += `<path d="M${(e0[0] - roll * .2).toFixed(2)} ${(e0[1] - roll * .08).toFixed(2)} L${(e1[0] - roll * .2).toFixed(2)} ${(e1[1] - roll * .08).toFixed(2)}" stroke="#f5f7f8" stroke-width="${(roll * 0.25).toFixed(2)}" stroke-linecap="round"${b.moving ? ` stroke-dasharray="2 2"><animate attributeName="stroke-dashoffset" values="0;4" dur=".5s" repeatCount="indefinite"/></path>` : "/>"}`;
  // The solar shower, on the deck at the near left.
  if (hasShower) {
    const [bx, by] = at(-0.17, 1.05);
    h += `<rect x="${(bx - 2.5).toFixed(2)}" y="${(by - 30).toFixed(2)}" width="5" height="31" rx="2" fill="url(#pb-tank)"/>`;
    h += `<path d="M${bx.toFixed(2)} ${(by - 30).toFixed(2)} V${(by - 40).toFixed(2)} Q${bx.toFixed(2)} ${(by - 44).toFixed(2)} ${(bx + 4).toFixed(2)} ${(by - 44).toFixed(2)} H${(bx + 8).toFixed(2)}" fill="none" stroke="#9aa5ae" stroke-width="1.3"/>`;
    h += `<ellipse cx="${(bx + 8.5).toFixed(2)}" cy="${(by - 42.5).toFixed(2)}" rx="3" ry="1.4" fill="#cfd8dc" stroke="#78909c" stroke-width=".4"/>`;
    h += `<rect x="${(bx + 2.1).toFixed(2)}" y="${(by - 14).toFixed(2)}" width="2.2" height="2" rx=".4" fill="${showerOn ? "#03a9f4" : "#9e9e9e"}"/>`;
    if (showerOn) h += [-1.9, 0, 1.9].map((d) => `<path d="M${(bx + 8.5 + d).toFixed(2)} ${(by - 41).toFixed(2)} L${(bx + 8.5 + d * 1.5).toFixed(2)} ${(by - 1).toFixed(2)}" stroke="#4fc3f7" stroke-width=".7" stroke-dasharray="2 4"><animate attributeName="stroke-dashoffset" values="0;-12" dur=".5s" repeatCount="indefinite"/></path>`).join("") + `<ellipse cx="${(bx + 8.5).toFixed(2)}" cy="${(by - 0.5).toFixed(2)}" rx="4" ry=".9" fill="#4fc3f7" opacity=".5"/>`;
  }
  if (winter) {
    const a = at(1, 0.04), c = at(1, 1.03);
    h += `<path d="M${a[0].toFixed(2)} ${(a[1] - up - 2.2).toFixed(2)} L${c[0].toFixed(2)} ${(c[1] - up - 2.2).toFixed(2)}" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>`;
    if (hasShower) { const [bx, by] = at(-0.17, 1.05); h += `<ellipse cx="${(bx + 8.5).toFixed(2)}" cy="${(by - 44).toFixed(2)}" rx="3.4" ry="1.3" fill="#fff"/><ellipse cx="${bx.toFixed(2)}" cy="${(by - 30.6).toFixed(2)}" rx="3" ry="1" fill="#fff"/>`; }
    for (let k = 0; k < 8; k++) {
      const x = (k * 37) % 118 + 1, d = 3 + (k % 5), y0 = -16 - (k * 13) % 30;
      h += `<circle cx="${x}" cy="${y0}" r="${(0.6 + (k % 3) * 0.25).toFixed(2)}" fill="#fff" opacity=".9"><animateTransform attributeName="transform" type="translate" from="0 0" to="${k % 2 ? 4 : -4} 120" dur="${d}s" begin="${-((k * 0.7) % d)}s" repeatCount="indefinite"/></circle>`;
    }
  }
  return `<svg class="pl-pp pl-basin" viewBox="1 13 114 71.25">${h}</svg>`;
}
function poolHtml(cls, p) {
  if (p.basin) return `
        <div class="machine ${cls} pl pl-b pl-m-${p.mode || "off"}${p.winter ? " pl-winter" : ""}">${poolBasinSvg(p.basin)}</div>`;
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
        <div class="machine ${cls} pl pl-m-${mode}${p.dosing ? " pl-chlore" : ""}${p.lit ? " pl-lamp" : ""}${p.chlorine ? "" : " pl-nocl"}${p.winter ? " pl-winter" : ""}">${svg}</div>`;
}


return {
draw: (cls, ctx) => poolHtml(cls, ctx.pool || {}),
css: () => `
        .machine.pl { --b: var(--ac-body, #3f4a54); --bh: var(--ac-body-hi, #62707c); --bl: var(--ac-body-lo, #252c33); }
        svg.pl-pp{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .machine.pl-b,svg.pl-pp.pl-basin{width:184px;height:115px}
        .pl-body{fill:url(#pl-g-body)}
        .pl-body-d{fill:var(--bl)}
        .pl-ring{fill:none;stroke:var(--bl);stroke-width:1;opacity:.6}
        .pl-pvc{fill:none;stroke:#cfd5da;stroke-width:4.6;stroke-linecap:butt}
        .pl-pvc-o{fill:none;stroke:#8e979f;stroke-width:6;stroke-linecap:butt}
        .pl-pvc-j{fill:#dfe3e6;stroke:#8e979f;stroke-width:.8}
        .pl-flow{fill:none;stroke:#4fc3f7;stroke-width:2.2;stroke-dasharray:3 4;stroke-linecap:round;opacity:0}
        .pl-m-running .pl-flow,.pl-m-backwash .pl-flow.pl-o,.pl-m-frost .pl-flow{opacity:1;animation:pl-flow .6s linear infinite}
        .pl-m-running .pl-flow.pl-w,.pl-m-frost .pl-flow.pl-w{opacity:0;animation:none}
        .pl-m-backwash .pl-flow.pl-w{opacity:1;stroke:#8d6e63;animation:pl-flow .45s linear infinite}
        .pl-m-backwash .pl-flow.pl-s{opacity:1;animation:pl-flow .45s linear infinite}
        .pl-m-backwash .pl-flow.pl-o{animation-duration:.45s}
        .pl-m-frost .pl-flow{stroke:#b3e5fc;animation-duration:1.2s}
        @keyframes pl-flow{to{stroke-dashoffset:-14}}
        @keyframes pl-spin{to{transform:rotate(360deg)}}
        .pl-needle{transform-box:view-box;transform-origin:34px 14.5px;transform:rotate(-120deg);stroke:#c62828;stroke-width:1;stroke-linecap:round;transition:transform .6s}
        .pl-m-running .pl-needle,.pl-m-frost .pl-needle{transform:rotate(-20deg)}
        .pl-m-backwash .pl-needle{transform:rotate(25deg)}
        .pl-m-error .pl-needle{transition:none;animation:pl-gauge 1.2s ease-in-out infinite}
        @keyframes pl-gauge{0%,100%{transform:rotate(-120deg)}50%{transform:rotate(120deg)}}
        .pl-lid-water{fill:url(#pl-g-water);opacity:.85}
        .pl-swirl{opacity:0}
        .pl-swirl path{fill:none;stroke:rgba(255,255,255,.9);stroke-width:.75;stroke-linecap:round;stroke-dasharray:1.6 1.6}
        .pl-m-running .pl-swirl,.pl-m-backwash .pl-swirl,.pl-m-frost .pl-swirl{opacity:1}
        .pl-m-running .pl-swirl path,.pl-m-backwash .pl-swirl path,.pl-m-frost .pl-swirl path{animation:pl-jet .5s linear infinite}
        @keyframes pl-jet{to{stroke-dashoffset:-3.2}}
        .pl-pool{fill:url(#pl-g-pool)}
        .pl-rip{fill:none;stroke:rgba(255,255,255,.7);stroke-width:.7;stroke-linecap:round;stroke-dasharray:3 4}
        .pl-m-running .pl-rip,.pl-m-frost .pl-rip{animation:pl-flow 2.2s linear infinite}
        .pl-spot{fill:#cfd8dc;stroke:#90a4ae;stroke-width:.8}
        .pl-glow{opacity:0}
        .pl-lamp .pl-spot{fill:#fff6c2;stroke:#ffd54f}
        .pl-lamp .pl-glow{opacity:1;animation:pl-breathe 3s ease-in-out infinite}
        .pl-can{fill:#f4f6f7;stroke:#9aa3ab;stroke-width:.8}
        .pl-can-l{fill:#d4e157}
        .pl-tube{fill:none;stroke:rgba(140,150,160,.85);stroke-width:1.2}
        .pl-drip{fill:none;stroke:#cddc39;stroke-width:1.6;stroke-dasharray:1.6 3.4;stroke-linecap:round;opacity:0}
        .pl-chlore .pl-drip{opacity:1;animation:pl-flow .9s linear infinite}
        .pl-chlore .pl-can-led{fill:#2ecc71;animation:pl-breathe 1.2s ease-in-out infinite}
        .pl-can-led{fill:#7c858d}
        .pl-ice{opacity:0}
        /* Winter (dosing-tank-card #3): the pool under its cover, snow on
           the deck, the filter and the pump, flakes falling slowly. */
        .pl-wnt{display:none}
        .pl-winter .pl-wnt{display:inline}
        .pl-winter .pl-glow,.pl-winter .pl-rip,.pl-winter .pl-spot{display:none}
        .pl-winter .pl-ice{opacity:1}
        .pl-winter .pl-body{filter:saturate(.6) brightness(1.05)}
        .pl-fl{fill:#fff;stroke:#8fb8d2;stroke-width:.4;transform-box:fill-box;animation:pl-fall var(--fd) linear var(--f0) infinite}
        @keyframes pl-fall{0%{transform:translate(0,0);opacity:0}10%{opacity:1}100%{transform:translate(4px,100px);opacity:.2}}
        .pl-m-frost .pl-ice{opacity:1}
        .pl-snow{opacity:0}
        .pl-m-frost .pl-snow{opacity:1;animation:pl-breathe 2.4s ease-in-out infinite}
        .pl-sand{opacity:0}
        .pl-m-backwash .pl-sand{opacity:1}
        .pl-sand circle{fill:#d9c08f;animation:pl-churn 1.2s ease-in-out infinite}
        .pl-sand circle:nth-child(2){--d0:-.4s}
        .pl-sand circle:nth-child(3){--d0:-.8s}
        @keyframes pl-churn{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .machine.pl-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes pl-blink{50%{opacity:.15}}
        @keyframes pl-breathe{0%,100%{opacity:.4}50%{opacity:1}}
        .pl-led{fill:#5a636b}
        .pl-m-running .pl-led,.pl-m-backwash .pl-led,.pl-m-frost .pl-led{fill:#2ecc71}
        .pl-m-error .pl-led{fill:#f44336;animation:pl-blink 1s steps(1) infinite}
        .pl-smoke{display:none}
        .pl-m-error .pl-smoke{display:block}
        .pl-smoke .pl-pf{transform-box:fill-box;transform-origin:50% 100%;animation:pl-puff 2s ease-out infinite}
        .pl-smoke .pl-pf2{--d0:-1s}
        .pl-smoke .pl-o{fill:#111417}
        .pl-smoke .pl-f{fill:#6b737b}
        .pl-smoke .pl-hl{fill:none;stroke:rgba(255,255,255,.75);stroke-width:1;stroke-linecap:round}
        @keyframes pl-puff{0%{transform:translateY(5px) scale(.45);opacity:0}20%{opacity:1}75%{opacity:1}100%{transform:translateY(-7px) scale(1.08);opacity:0}}
        .pl-ang{display:none;fill:none;stroke:#e53935;stroke-width:1.9;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:pl-ang .7s ease-in-out infinite alternate}
        .pl-m-error .pl-ang{display:block}
        @keyframes pl-ang{from{transform:scale(.8)}to{transform:scale(1.15)}}
        .pl-nocl .pl-cl { display: none; }
        .machine.pl * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.pl * { animation-name: none !important; } }
  `,
};
}
