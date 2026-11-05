// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The fridge drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// The new drawings' motion: nothing moves until the machine runs (nt-on),
// except a meter's LED and an alarm's beacon. Each part's stagger is its --d0.
const NT_CSS = `
        svg.nt-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
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
        .nt-on .nta-feed{animation:nt-feed .625s linear infinite}
        .nt-on .nta-led,.nt-on .nta-next{animation:nt-glow 1.25s ease-in-out infinite}
        .nt-on .nta-bar1{animation:nt-bar1 5s steps(1) infinite}.nt-on .nta-bar2{animation:nt-bar2 5s steps(1) infinite}
        .nt-on .nta-bar3{animation:nt-bar3 5s steps(1) infinite}.nt-on .nta-bar4{animation:nt-bar4 5s steps(1) infinite}
        @keyframes nt-feed{to{stroke-dashoffset:12}}
        @keyframes nt-bar1{0%{opacity:.15}12%,100%{opacity:1}}
        @keyframes nt-bar2{0%{opacity:.15}30%,100%{opacity:1}}
        @keyframes nt-bar3{0%{opacity:.15}48%,100%{opacity:1}}
        @keyframes nt-bar4{0%{opacity:.15}66%,100%{opacity:1}}
        .nta-blinkfast{animation:nt-blinkfast .45s linear infinite}
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
        .machine.nt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
`;

function fridgeHtml(ctx, anim) {
  const cold = ctx.coldBox;
  const f = cold ? !!(ctx.doorOpen || ctx.freezerDoorOpen) : !!ctx.doorOpen;
  const z = !cold && !!ctx.freezerDoorOpen;
  return `<div class="fr3 fr-k-${ctx.layout || "freezer_bottom"}${ctx.dark ? " fr-off" : ""}${f ? " fr-open-f" : ""}${z ? " fr-open-z" : ""}">${FR3(ctx, anim)}</div>`;
}


return {
draw: (cls, ctx) => {
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
