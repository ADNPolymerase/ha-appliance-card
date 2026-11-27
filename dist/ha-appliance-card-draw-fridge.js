// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The fridge drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing(deps) {
// A page still running the card of an earlier release: an arrow to reload.
if (!deps || deps.__v !== "5.7.0") return { draw: () => '<div class="machine" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.5">\u21bb</div>', css: "" };
let { ARC_BUTTONS, ARC_COLORS, BATTERY_LAYOUTS, CAMERA_LAYOUTS, CHARGER_MODES, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FT_FLAVORS, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, STAIR_MATERIALS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntTint, numberOrNull, t, thsColor, zoneColumns } = deps;
// A soft shadow on the floor, blurred so it reads as the object standing on
// the floor rather than a grey plate laid under it. footPath takes the outline
// of the footprint itself, for an appliance drawn in three-quarter view.
const shdBlur = (id, b) => `<filter id="${id}" x="-40%" y="-200%" width="180%" height="500%"><feGaussianBlur stdDeviation="${b}"/></filter>`;
const footShadow = (d, op = .24, b = 1.6) => { const id = `shdf-${d.length}-${d.slice(1, 12)}`.replace(/[^\w-]/g, "_"); return `${shdBlur(id, b)}<path d="${d}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
const ntFlake = (x, y, r, color, w = .8) =>
  `<path d="M${x} ${y - r}v${2 * r}M${x - r} ${y}h${2 * r}M${x - r * .7} ${y - r * .7}l${r * 1.4} ${r * 1.4}M${x + r * .7} ${y - r * .7}l${-r * 1.4} ${r * 1.4}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
// The new drawings' motion: nothing moves until the machine runs (nt-on),
// except a meter's LED and an alarm's beacon. Each part's stagger is its --d0.
const NT_CSS = `
        .cv-up{animation:cv-up .9s linear infinite}.cv-down{animation:cv-down .9s linear infinite}
        @keyframes cv-up{from{transform:translateY(0)}to{transform:translateY(calc(-1 * var(--cv-step, 4.2px)))}}
        @keyframes cv-down{from{transform:translateY(0)}to{transform:translateY(var(--cv-step, 4.2px))}}
        .cv-arrow{animation:cv-blink 1s ease-in-out infinite}@keyframes cv-blink{0%,100%{opacity:.35}50%{opacity:1}}
        .cv-sway{animation:cv-sway 1.8s ease-in-out infinite;transform-origin:60px 14px}@keyframes cv-sway{0%,100%{transform:skewX(0)}50%{transform:skewX(.6deg)}}
        .co2-pulse{animation:co2-pulse 1.6s ease-in-out infinite}@keyframes co2-pulse{0%,100%{opacity:.45}50%{opacity:1}}
        .fb-tap{animation:fb-tap 1.4s ease-in-out infinite}@keyframes fb-tap{0%,12%,100%{transform:rotate(0deg)}34%,56%{transform:rotate(44deg)}}
        .fb-hit{animation:fb-hit 1.4s ease-in-out infinite}@keyframes fb-hit{0%,30%,62%,100%{opacity:0}36%,54%{opacity:.1}}
        .fb-blink{animation:fb-blink 1s steps(2) infinite}@keyframes fb-blink{50%{opacity:.15}}
        .fb-bolt{animation:fb-bolt 1.6s ease-in-out infinite}@keyframes fb-bolt{0%,100%{opacity:.4}50%{opacity:1}}
        svg.nt-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .machine.nt-up,.nt-up svg.nt-svg{width:220px;height:248px}
        .ntfd-h{fill:none;stroke:#ff6d00;stroke-width:1.8;stroke-linecap:round;opacity:0;animation:ntfd-heat 2.4s ease-in-out infinite;animation-delay:calc(var(--d0,0s) + var(--anim-offset,0s))}
        @keyframes ntfd-heat{0%{opacity:0;transform:translateY(4px)}40%{opacity:1}100%{opacity:0;transform:translateY(-7px)}}
        .nt-on .ntfd-roll{animation:ntfd-roll 2.4s linear infinite;animation-delay:var(--anim-offset,0s)}
        @keyframes ntfd-roll{to{transform:translateY(76px)}}
        .nt-on .ntg-smoke{transform-box:fill-box;transform-origin:center bottom;animation:ntg-smoke 4s ease-out infinite;animation-delay:calc(var(--d0,0s) + var(--anim-offset,0s))}
        .nt-on .ntg-dense{animation-duration:2s}
        @keyframes ntg-smoke{0%{transform:translate(0,4px) scale(.7);opacity:0}25%{opacity:.75}100%{transform:translate(4px,-14px) scale(1.6);opacity:0}}
        .machine.nt:not(.nt-on) .nt-run{display:none}
        .machine.nt-unav{opacity:.45;filter:grayscale(1)}
        .ntd1{--d0:.3s}.ntd2{--d0:.7s}.ntd3{--d0:1.1s}.ntd4{--d0:1.5s}.ntd5{--d0:1.9s}.ntd6{--d0:2.3s}
        .nt-on .nta-spin{transform-box:fill-box;transform-origin:center;animation:nt-spin .6s linear infinite}
        .nt-on .nta-spin-slow{transform-box:fill-box;transform-origin:center;animation:nt-spin 4s linear infinite}
        .nt-on .nta-flow{animation:nt-flow .8s linear infinite}
        .nt-on .nta-flow-fast{animation:nt-flow .4s linear infinite}
        .nt-on .nta-rise{transform-box:fill-box;animation:nt-rise 2.4s ease-in infinite}
        .nt-on .nta-steam{transform-box:fill-box;transform-origin:center bottom;animation:nt-steam 2.8s ease-out infinite}
        .nt-on .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-k-sump .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-on .nta-twinkle{animation:nt-twinkle 1.3s ease-in-out infinite}
        .nt-on .nta-frost{transform-box:fill-box;transform-origin:center;animation:nt-frost 2.4s ease-in-out infinite}
        .nt-on .nta-shimmer{animation:nt-shimmer 3s ease-in-out infinite}
        .nta-glow{animation:nt-glow 1.8s ease-in-out infinite}
        .nt-on .nta-warm{animation:nt-warm 2.6s ease-in-out infinite}
        .nt-on .nta-pop{transform-box:fill-box;transform-origin:center;animation:nt-pop 1.6s ease-out infinite}
        .nt-on .nta-sway{transform-box:fill-box;transform-origin:center bottom;animation:nt-sway 3.2s ease-in-out infinite}
        .nt-on .nta-vib{animation:nt-vib .12s linear infinite}
        .nt-on .nta-heat{transform-box:fill-box;animation:nt-heat 2.2s ease-out infinite}
        .nt-on .nta-bob{animation:nt-bob 1.2s ease-in-out infinite}
        .nt-on .nta-swim{transform-box:fill-box;transform-origin:center;animation:nt-swim 8s ease-in-out infinite}
        .nt-on .nta-swimB{transform-box:fill-box;transform-origin:center;animation:nt-swimB 6.5s ease-in-out infinite}
        .nt-on .nta-rays{animation:nt-rays 4s ease-in-out infinite}
        .nta-caust{opacity:.35}
        .nt-on .nta-caust{opacity:0;animation:nt-shimmer 3s ease-in-out infinite}
        .nta-blink{animation:nt-blink 2.4s linear infinite}
        .nt-on .nta-feed{animation:nt-feed .625s linear infinite}.nt-on .nta-feedslow{animation:nt-feed 1.9s linear infinite}
        .nt-on .nta-led,.nt-on .nta-next{animation:nt-glow 1.25s ease-in-out infinite}
        .nt-on .nta-bar1{animation:nt-bar1 5s steps(1) infinite}.nt-on .nta-bar2{animation:nt-bar2 5s steps(1) infinite}
        .nt-on .nta-bar3{animation:nt-bar3 5s steps(1) infinite}.nt-on .nta-bar4{animation:nt-bar4 5s steps(1) infinite}
        @keyframes nt-feed{to{stroke-dashoffset:12}}
        @keyframes nt-bar1{0%{opacity:.15}12%,100%{opacity:1}}
        @keyframes nt-bar2{0%{opacity:.15}30%,100%{opacity:1}}
        @keyframes nt-bar3{0%{opacity:.15}48%,100%{opacity:1}}
        @keyframes nt-bar4{0%{opacity:.15}66%,100%{opacity:1}}
        .nta-blinkfast{animation:nt-blinkfast .45s linear infinite}
        .vlv-drip{transform-box:fill-box;animation:vlv-drip 1.4s ease-in infinite}.vlv-drip.ntd2{animation-delay:.7s}
        @keyframes vlv-drip{0%{transform:translateY(0) scale(.4);opacity:0}15%{transform:translateY(0) scale(1);opacity:1}85%{transform:translateY(8px);opacity:1}100%{transform:translateY(9px);opacity:0}}
        .vlv-splash{transform-box:fill-box;transform-origin:center;animation:vlv-splash 1.4s ease-out infinite;opacity:0}
        @keyframes vlv-splash{0%,80%{transform:scale(.3);opacity:0}86%{opacity:.9}100%{transform:scale(1.6);opacity:0}}
        .nt-on .vlv-arrows{animation:vlv-arrows 1.2s linear infinite}
        @keyframes vlv-arrows{to{transform:translateX(12px)}}
        .vlv-to-open{animation:vlv-open 2.8s ease-in-out infinite}.vlv-to-close{animation:vlv-close 2.8s ease-in-out infinite}
        @keyframes vlv-open{0%,15%{transform:rotate(90deg)}75%,100%{transform:rotate(0deg)}}
        @keyframes vlv-close{0%,15%{transform:rotate(0deg)}75%,100%{transform:rotate(90deg)}}
        .nta-rain{transform-box:fill-box;animation:nt-fall 1.4s ease-in infinite}
        .nta-rdrop{animation:nt-rdrop .6s linear infinite}.nta-rsplash{transform-box:fill-box;transform-origin:center;opacity:0;animation:nt-rsplash .6s ease-out infinite}
        @keyframes nt-rdrop{0%{transform:translate(0,0);opacity:0}10%{opacity:1}100%{transform:translate(-16px,80px);opacity:1}}
        @keyframes nt-rsplash{0%,80%{transform:scale(.2);opacity:0}85%{opacity:1}100%{transform:scale(1.3);opacity:0}}
        .nt-on .nta-smoke{transform-box:fill-box;transform-origin:center;animation:nt-smoke 4.2s ease-out infinite}
        .nt-on .nta-spreadL{transform-box:fill-box;transform-origin:center;animation:nt-spreadL 4.2s ease-out infinite}
        .nt-on .nta-spreadR{transform-box:fill-box;transform-origin:center;animation:nt-spreadR 4.2s ease-out infinite}
        .nt-on .nta-drip{animation:nt-drip 1.5s ease-in infinite}
        .nt-on .nta-splash{transform-box:fill-box;transform-origin:center;animation:nt-splash 1.5s ease-out infinite}
        .nt-on .nta-lrcycle{transform-box:view-box;transform-origin:60px 38px;animation:nt-lrcycle 7s ease-in-out infinite}
        /* The watering, litter box, detector and speaker drawings share one 7 s
           cycle, every motion fitting it a whole number of times. */
        .nt-c7 .nta-flow{animation-duration:.875s}.nt-c7 .nta-fall{animation-duration:1.75s}.nt-c7 .nta-spin-slow{animation-duration:3.5s}
        .nt-c7 .nta-smoke,.nt-c7 .nta-spreadL,.nt-c7 .nta-spreadR{animation-duration:3.5s}.nt-c7 .nta-drip,.nt-c7 .nta-splash,.nt-c7 .nta-pop,.nt-c7 .nta-glow{animation-duration:1.75s}
        .nt-c7 .nta-rise,.nt-c7 .nta-blink{animation-duration:2.333s}.nt-c7 .nta-blinkfast{animation-duration:.4375s}.nt-c7 .nta-shimmer{animation-duration:3.5s}
        .nt-on .nta-littilt{transform-box:view-box;animation:nt-littilt 7s ease-in-out infinite}
        .nt-on .nta-clump{animation:nt-clump 7s ease-in-out infinite}
        .nta-smoke,.nta-spreadL,.nta-spreadR,.nta-drip,.nta-splash{opacity:0}
        @keyframes nt-smoke{0%{transform:translateY(0) scale(.4);opacity:0}18%{opacity:.8}100%{transform:translateY(-66px) scale(2.1);opacity:0}}
        @keyframes nt-spreadL{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(-34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-spreadR{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-drip{0%{transform:translateY(-52px);opacity:0}12%{opacity:1}84%{transform:translateY(0);opacity:1}86%,100%{transform:translateY(0);opacity:0}}
        @keyframes nt-splash{0%,82%{transform:scale(.2);opacity:0}86%{opacity:.95}100%{transform:scale(1.7);opacity:0}}
        @keyframes nt-lrcycle{0%,6%{transform:rotate(0)}42%,54%{transform:rotate(-240deg)}80%,86%{transform:rotate(20deg)}96%,100%{transform:rotate(0)}}
        @keyframes nt-littilt{0%,6%{transform:rotate(0)}24%{transform:rotate(-14deg)}42%,54%{transform:rotate(-8deg)}68%{transform:rotate(6deg)}80%,84%{transform:rotate(10deg)}92%{transform:rotate(-3deg)}100%{transform:rotate(0)}}
        @keyframes nt-clump{0%,18%{opacity:1;transform:translate(0,0)}34%{opacity:1;transform:translate(-10px,3px)}44%{opacity:0;transform:translate(-14px,6px)}97%{opacity:0;transform:translate(0,0)}100%{opacity:1}}
        .nta-beacon{animation:nt-glow .7s ease-in-out infinite}
        .nt-on .nta-sweepL,.nt-on .nta-sweepR{transform-box:view-box;animation:nt-sweepL 4.6s ease-in-out infinite}.nt-on .nta-sweepR{animation-name:nt-sweepR}
        @keyframes nt-sweepL{0%,100%{transform:rotate(-32deg)}50%{transform:rotate(0deg)}}
        @keyframes nt-sweepR{0%,100%{transform:rotate(32deg)}50%{transform:rotate(0deg)}}
        .nt-on .nta-flick{transform-box:fill-box;transform-origin:center bottom;animation:nt-flick .7s ease-in-out infinite alternate}
        .nt-on .nta-flick.ntd3{animation-duration:.5s}
        @keyframes nt-flick{0%{transform:scale(1,1) skewX(0)}50%{transform:scale(.94,1.08) skewX(3deg)}100%{transform:scale(1.04,.95) skewX(-3deg)}}
        @keyframes nt-spin{to{transform:rotate(360deg)}}
        @keyframes nt-flow{to{stroke-dashoffset:-24}}
        @keyframes nt-rise{0%{transform:translateY(0);opacity:0}15%{opacity:.95}100%{transform:translateY(-30px);opacity:0}}
        @keyframes nt-steam{0%{transform:translateY(0) scaleX(1);opacity:0}30%{opacity:.6}100%{transform:translateY(-20px) scaleX(1.7);opacity:0}}
        @keyframes nt-fall{0%{transform:translateY(-2px);opacity:0}35%{opacity:.85}100%{transform:translateY(12px);opacity:0}}
        @keyframes nt-twinkle{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes nt-blink{0%,70%,100%{opacity:.15}78%,92%{opacity:1}}
        .nt-on .nta-roll{animation:nt-roll 4s linear infinite}
        @keyframes nt-roll{to{transform:translateY(var(--roll,-90px))}}
        @keyframes nt-blinkfast{0%,100%{opacity:.15}45%,55%{opacity:1}}
        @keyframes nt-frost{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}
        @keyframes nt-shimmer{0%,100%{opacity:0}50%{opacity:.5}}
        @keyframes nt-glow{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes nt-warm{0%,100%{opacity:.1}50%{opacity:.26}}
        @keyframes nt-pop{0%{transform:scale(.2);opacity:0}40%{opacity:.95}100%{transform:scale(1.4);opacity:0}}
        @keyframes nt-sway{0%,100%{transform:skewX(-7deg)}50%{transform:skewX(7deg)}}
        @keyframes nt-vib{0%,100%{transform:translate(0,0)}25%{transform:translate(.35px,-.2px)}75%{transform:translate(-.35px,.2px)}}
        @keyframes nt-heat{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-14px);opacity:0}}
        @keyframes nt-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}
        @keyframes nt-swim{0%{transform:translateX(0) scaleX(1)}46%{transform:translateX(34px) scaleX(1)}50%{transform:translateX(34px) scaleX(-1)}96%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
        @keyframes nt-swimB{0%{transform:translateX(0) scaleX(-1)}46%{transform:translateX(-30px) scaleX(-1)}50%{transform:translateX(-30px) scaleX(1)}96%{transform:translateX(0) scaleX(1)}100%{transform:translateX(0) scaleX(-1)}}
        @keyframes nt-rays{0%,100%{opacity:.18}50%{opacity:.38}}
        .hu-puff{opacity:0;transform-box:fill-box;transform-origin:center;animation:hu-rise 3s ease-out infinite}
        @keyframes hu-rise{0%{opacity:0;transform:translate(0,0) scale(.5)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx,0),var(--h,-26px)) scale(2)}}
        .hu-bub{opacity:0;animation:hu-up 2.7s ease-in infinite}
        @keyframes hu-up{0%{opacity:0;transform:translateY(0)}15%{opacity:.9}85%{opacity:.8}100%{opacity:0;transform:translateY(var(--h,-20px))}}
        .hu-blink{animation:hu-bl 1s steps(2,jump-none) infinite}
        @keyframes hu-bl{0%{opacity:1}100%{opacity:.25}}
        .machine.nt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
`;

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
    return `${footShadow(`M${x0 - 3} ${y1 + 3.5} H${x1 + 3} L${x1 + DX + 4} ${y1 + DY + 2.5} H${x0 + DX - 1} Z`, .3, 1.8)}
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
    // Its shadow lies under its whole footprint, deep as it is: a flat
    // ellipse under the front left the right side standing on bare floor.
    const foot = (m, d) => `M${x0 - m} ${y1 + d} L${x1 + m} ${y1 + d} L${x1 + KX + m} ${y1 + KY + d * .5} L${x0 + KX - m} ${y1 + KY + d * .5} Z`;
    out += `<path d="${foot(4, 3.6)}" fill="rgba(0,0,0,.06)" stroke="rgba(0,0,0,.06)" stroke-width="3" stroke-linejoin="round"/>
      <path d="${foot(1.5, 2.2)}" fill="rgba(0,0,0,.1)" stroke-linejoin="round"/>
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


return {
draw: (cls, ctx) => {
    // The doors' swing (_fridgeSwing) redraws the cabinet alone, frame by
    // frame: through here, so the drawing stays in the fridge's own file.
    if (ctx.frSwing) return FR3(ctx, ctx.frSwing === true ? undefined : ctx.frSwing);
    // A chest or a drawer freezer frosts over while it cools, like the other
    // new drawings (nt-on).
    const nt = ctx.coldBox ? ` nt nt-k-${ctx.layout}${ctx.cooling !== false && !ctx.dark ? " nt-on" : ""}` : "";
    return `<div class="machine ${cls} ${ctx.ice ? "ice" : ""}${nt}">${fridgeHtml(ctx)}</div>`;
  },
css: () => NT_CSS + `
        .fr3 { position: absolute; inset: 0; }
        svg.fr-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .fr-cube { transform-box: fill-box; }
        .machine.ice .fr-cube.drop { animation: fr-drop 1.6s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.ice .fr-cube.d2 { animation-delay: calc(-0.55s + var(--anim-offset, 0s)); }
        .machine.ice .fr-cube.d3 { animation-delay: calc(-1.1s + var(--anim-offset, 0s)); }
        @keyframes fr-drop {
          0% { transform: translateY(-2px); opacity: 0; } 12% { opacity: 1; }
          70% { transform: translateY(var(--fall, 14px)); opacity: 1; } 100% { transform: translateY(var(--fall, 14px)); opacity: 0; }
        }
        .machine.ice .fr-glint { animation: fr-glint 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes fr-glint { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.9; } }
        /* Cold air rolling out of an open fridge, mist rising out of a chest. */
        .fr-mist { animation: fr-cold 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fr-mist.m2 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .fr-mist.m3 { animation-delay: calc(-1.7s + var(--anim-offset, 0s)); }
        @keyframes fr-cold { 0% { transform: translateY(0); opacity: 0; } 30% { opacity: 0.7; } 100% { transform: translateY(8px); opacity: 0; } }
        .fr-steam { animation: fr-rise 2.8s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fr-steam.m2 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .fr-steam.m3 { animation-delay: calc(-1.8s + var(--anim-offset, 0s)); }
        .fr-steam.m4 { animation-delay: calc(-2.3s + var(--anim-offset, 0s)); }
        /* While a fridge cools, snowflakes come and go on its shut doors. */
        .fr-flake { transform-box: fill-box; transform-origin: center; opacity: 0; animation: fr-flake 3.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .fr-flake.fr-f2 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .fr-flake.fr-f3 { animation-delay: calc(-1.8s + var(--anim-offset, 0s)); }
        .fr-flake.fr-f4 { animation-delay: calc(-2.7s + var(--anim-offset, 0s)); }
        @keyframes fr-flake { 0% { opacity: 0; transform: scale(0.5) rotate(0deg); } 35% { opacity: 1; transform: scale(1) rotate(30deg); } 70% { opacity: 0.9; } 100% { opacity: 0; transform: scale(0.8) rotate(60deg); } }
        @keyframes fr-rise { 0% { transform: translateY(0); opacity: 0; } 30% { opacity: 0.75; } 100% { transform: translateY(-10px); opacity: 0; } }
  `,
};
}
