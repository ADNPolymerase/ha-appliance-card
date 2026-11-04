// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The screen drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, NT_FONT, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, esc, ntBlur, ntFit, ntHtml, t, zoneColumns }) {
// [top of the drawing, its height, how much larger it is drawn].
const SCREEN_BANDS = { tv_feet: [28, 66, 2], tv_stand: [26, 68, 2], tv_wall: [25, 62, 2], projector: [0, 87, 1.8], computer: [24, 62, 1.6], laptop: [24, 64, 1.6],
  tablet_wall: [26, 59, 2], tablet_frame: [26, 59, 2], tablet_portrait: [24, 64, 2] };
// The pictures a lit screen can show. The logo's three animations share one
// delay, so it reaches a corner exactly when the flash and the confetti go
// off: the two bounces take 4.1 s and 2.9 s, and they meet at an end together
// every 118.9 s. Starting 30 s in, the first corner is a minute and a half
// away rather than right away.
const SCREEN_CODE_COLORS = ["#c792ea", "#82aaff", "#ffcb6b", "#c3e88d", "#89ddff", "#f78c6c"];
function screenPictureHtml(img, sc = {}) {
  const at = (x, y, w, h) => `left: ${x}%; top: ${y}%; width: ${w}%; height: ${h}%`;
  switch (img) {
    case "dashboard":
      return `<div class="si-dash"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    case "saver":
      return `<div class="si-saver"><b>${esc(sc.clock || "")}<small>${esc(sc.date || "")}</small></b></div>`;
    case "aquarium":
      return `<div class="si-aquarium"><span class="sand"></span>`
        + `<span class="weed" style="left: 12%"></span><span class="weed" style="left: 17%; height: 28%; animation-delay: calc(-1s + var(--anim-offset, 0s))"></span><span class="weed" style="left: 80%; height: 34%; animation-delay: calc(-2s + var(--anim-offset, 0s))"></span>`
        + `<span class="fish" style="top: 28%; --f: #ff9800; --sw: 6s"></span><span class="fish" style="top: 52%; --f: #ffeb3b; --sw: 8.5s; animation-delay: calc(-4s + var(--anim-offset, 0s))"></span>`
        + `<span class="fish" style="top: 40%; --f: #f06292; --sw: 7s; animation-delay: calc(-2s + var(--anim-offset, 0s)); width: 9%; height: 9%"></span>`
        + `<span class="bub" style="left: 20%"></span><span class="bub" style="left: 22%; animation-delay: calc(-1.4s + var(--anim-offset, 0s))"></span><span class="bub" style="left: 84%; animation-delay: calc(-0.7s + var(--anim-offset, 0s))"></span></div>`;
    case "bars":
      return `<div class="si-bars"><b></b></div>`;
    case "football":
      return `<div class="si-football"><span class="crowd"></span><span class="lines"></span><span class="goal l"></span><span class="goal r"></span>`
        + [["#e53935", 52, -0.4], ["#e53935", 66, -1.6], ["#e53935", 44, -2.6], ["#1e88e5", 58, -0.9], ["#1e88e5", 70, -2.1], ["#1e88e5", 46, -3]]
          .map(([k, y, d]) => `<span class="pl" style="--k: ${k}; top: ${y}%; animation-delay: calc(${d}s + var(--anim-offset, 0s))"></span>`).join("")
        + `<span class="ball"></span><span class="score">2-1</span></div>`;
    case "space":
      return `<div class="si-space"><b></b><i></i></div>`;
    case "bounce":
      return `<div class="si-bounce"><span class="logo" style="animation-delay: calc(-30s + var(--anim-offset, 0s))">HA</span><span class="flash" style="animation-delay: calc(-30s + var(--anim-offset, 0s))"></span>`
        + [["#ef5350", 8], ["#ffee58", 22], ["#66bb6a", 36], ["#42a5f5", 50], ["#ab47bc", 64], ["#ffa726", 78], ["#26c6da", 90]]
          .map(([c, x], k) => `<span class="bit" style="--c: ${c}; left: ${x}%; top: ${-12 - (k % 3) * 9}%; animation-delay: calc(-30s + var(--anim-offset, 0s))"></span>`).join("")
        + `</div>`;
    case "desktop":
      return `<div class="si-desktop"><i style="${at(10, 14, 45, 48)}"></i><i class="mv" style="${at(40, 32, 48, 46)}"></i><u></u></div>`;
    case "code": {
      let rows = "";
      for (let k = 0; k < 24; k++) {
        rows += `<i style="--c: ${SCREEN_CODE_COLORS[(k * 7) % 6]}; --w: ${20 + ((k * 37) % 55)}%; --x: ${[0, 8, 8, 16, 8, 0][k % 6]}%"></i>`;
      }
      return `<div class="si-code"><div class="lines">${rows}${rows}</div></div>`;
    }
    case "pong":
      return `<div class="si-pong"><span class="score">3 2</span><span class="pad" style="left: 4%"></span><span class="pad r" style="right: 4%"></span><span class="ball"></span></div>`;
    case "home":
      return `<div class="si-home"><u></u>`
        + [["#e50914", 4, 30, "f"], ["#1db954", 28, 30], ["#0f79af", 52, 30], ["#ff0000", 76, 30], ["#f5c518", 4, 60], ["#7b1fa2", 28, 60], ["#00a8e1", 52, 60], ["#ff6d00", 76, 60]]
          .map(([c, x, y, f]) => `<i${f ? ' class="f"' : ""} style="--c: ${c}; left: ${x}%; top: ${y}%"></i>`).join("")
        + `</div>`;
    default:
      return `<div class="si-sunset"><b></b><i></i></div>`;
  }
}
const SCREEN_BADGE = (cls, d) => `<span class="scr-badge ${cls}"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.55)"/><path fill="#fff" d="${d}"/></svg></span>`;
const SCREEN_BADGES = SCREEN_BADGE("play", "M9 7v10l8-5z") + SCREEN_BADGE("pause", "M8 7h3v10H8zM13 7h3v10h-3z")
  + SCREEN_BADGE("mute", "M5 10v4h3l4 3V7L8 10zM14.6 9.7l1-1 2.4 2.4 2.4-2.4 1 1-2.4 2.4 2.4 2.4-1 1-2.4-2.4-2.4 2.4-1-1 2.4-2.4z");
function laptopKeys(classic) {
  const xl = (y) => 16 - 10 * (y - 68.4) / 14 + 1.6;
  const xr = (y) => 80 + 10 * (y - 68.4) / 14 - 1.6;
  const T = classic ? 17.8 : 14;
  const at = (y, u) => xl(y) + (xr(y) - xl(y)) * u / T;
  const rows = [[69.7, 71.0], [71.2, 72.6], [72.8, 74.2], [74.4, 75.8], [76.0, 77.4]];
  const pad = classic ? [0.6, 1.07, 1.07, 1.06] : [];
  const cells = [];
  rows.forEach(([y0, y1], r) => {
    const keys = (r === 4 ? [1, 1, 1, 1.2, 5.6, 1.2, 1, 1, 1] : Array(14).fill(1)).concat(pad);
    let u = 0;
    for (const [i, w] of keys.entries()) {
      // The gap before the keypad is a gap, not a key.
      if (classic && i === keys.length - 4) { u += w; continue; }
      const a = u + 0.12, b = u + w - 0.12;
      cells.push(`${at(y0, a).toFixed(2)},${y0} ${at(y0, b).toFixed(2)},${y0} ${at(y1, b).toFixed(2)},${y1} ${at(y1, a).toFixed(2)},${y1}`);
      u += w;
    }
  });
  return `<svg class="lap-keys" viewBox="0 0 96 106" aria-hidden="true">${cells.map((c) => `<polygon points="${c}"/>`).join("")}</svg>`;
}
function screenHtml(cls, sc) {
  const layout = SCREEN_LAYOUTS.includes(sc.layout) ? sc.layout : "tv_feet";
  const mode = sc.mode || "off";
  const box = (c, x, y, w, h, extra = "") => `<div class="${c}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px${extra}"></div>`;
  const tablet = SCREEN_TABLETS.includes(layout);
  const picture = mode === "saver" ? screenPictureHtml("saver", sc)
    : mode === "home" ? screenPictureHtml(tablet ? "dashboard" : "home")
      : sc.cover ? `<img class="scr-cover" src="${esc(sc.cover)}" alt="">`
        : screenPictureHtml(sc.image);
  const glassInner = `<div class="scr-pic">${SCREEN_LIT.includes(mode) ? picture : ""}</div>${mode === "locked" ? '<div class="scr-lock"></div>' : ""}${SCREEN_BADGES}`;
  const tv = (y) => `${box("scr-bezel", 1, y, 94, 54)}<div class="scr-glass" style="left: 3px; top: ${y + 2}px; width: 90px; height: 49px">${glassInner}</div>`
    + box("scr-led", 46.8, y + 51.8, 2.4, 2.4);
  let body;
  if (layout === "tv_stand") body = tv(28) + box("scr-neck", 44, 82, 8, 7) + box("scr-base", 28, 88, 40, 5);
  else if (layout === "tv_wall") body = box("scr-shade", 3, 31, 92, 54) + tv(27);
  else if (layout === "projector") {
    body = box("scr-rod", 10, 0, 1, 3) + box("scr-rod", 85, 0, 1, 3)
      + `<div class="scr-wall" style="left: 1px; top: 3px; width: 94px; height: 50px">${glassInner}</div>`
      + box("scr-beam", 1, 53, 94, 18) + box("scr-body", 24, 69, 48, 15) + box("scr-vent", 56, 73, 12, 7)
      + box("scr-lens", 46, 70, 11, 11) + box("scr-led", 29, 73, 2.4, 2.4) + box("scr-feet", 28, 84, 4, 2) + box("scr-feet", 64, 84, 4, 2);
  } else if (layout === "computer") {
    body = box("scr-bezel", 2, 26, 64, 42) + `<div class="scr-glass" style="left: 5px; top: 29px; width: 58px; height: 35px">${glassInner}</div>`
      + box("scr-neck", 30, 68, 8, 13) + box("scr-base", 20, 80, 28, 4) + box("scr-tower", 72, 34, 20, 50)
      + box("scr-slot", 75, 40, 14, 1.5) + box("scr-slot", 75, 44, 14, 1.5) + box("scr-led", 80.8, 76, 2.4, 2.4);
  } else if (layout === "laptop") {
    // A laptop open on the desk: its lid upright with the screen, the
    // keyboard and the trackpad on the deck seen from above, a light on the
    // front edge, and its cable while it charges.
    // The classic one: a thicker bezel and base, the keypad, the trackpad
    // off centre with its two buttons, a sticker on the palm rest.
    const classic = sc.laptopStyle === "classic";
    body = box("lap-shadow", 4, 82, 88, 6) + box("scr-bezel lap-lid", 16, 26, 64, 41)
      + (classic ? `<div class="scr-glass" style="left: 20px; top: 29.5px; width: 56px; height: 33.5px">${glassInner}</div>` + box("lap-brand", 45, 64.6, 6, 0.9)
        : `<div class="scr-glass" style="left: 19px; top: 29px; width: 58px; height: 35.5px">${glassInner}</div>`)
      + box("lap-cam", 47.4, 27.1, 1.2, 1.2) + box("lap-hinge", 16, 67, 64, 1.6)
      + box("lap-deck", 6, 68.4, 84, 14) + laptopKeys(classic)
      + (classic ? box("lap-pad", 33, 77.9, 17, 2.7) + box("lap-btns", 32.6, 80.7, 17.8, 1.1) + box("lap-sticker", 70, 78.6, 4.4, 2.6)
          + box("lap-edge", 6, 82.4, 84, 3.4) + box("scr-led", 10, 83.3, 1.6, 1) + box("scr-led", 13, 83.3, 1.6, 1) + box("lap-vent", 66, 83.4, 14, 1.2)
        : box("lap-pad", 38, 77.9, 20, 3.6) + box("lap-edge", 6, 82.4, 84, 2.4) + box("lap-notch", 42, 82.4, 12, 0.9) + box("scr-led", 12, 82.9, 2, 1.2))
      + (sc.charging ? box("lap-cable", 90, 79, 6, 1.4) + `<svg class="tab-bolt" viewBox="0 0 10 14" style="left: 88px; top: 71px"><path d="M6 0 0 8h4l-1 6 6-8H5z"/></svg>` : "");
  } else if (tablet) {
    // A wall tablet, drawn on its patch of wall (#62): flat on its mount, in
    // a wooden frame like a picture, or upright with a light bar on top. Its
    // front camera lights when it sees someone, and its cable only hangs
    // from it while it charges.
    const glass = (x, y, w, h) => `<div class="scr-glass tab-glass" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px">${glassInner}</div>`;
    const bolt = (x, y) => (sc.charging ? `<svg class="tab-bolt" viewBox="0 0 10 14" style="left: ${x}px; top: ${y}px"><path d="M6 0 0 8h4l-1 6 6-8H5z"/></svg>` : "");
    if (layout === "tablet_frame") {
      body = box("tab-wallbg", 4, 26, 88, 59) + box("tab-shadow", 13, 34, 74, 49) + box("tab-wood", 11, 30, 74, 50) + box("tab-mat", 15, 34, 66, 42)
        + glass(19, 37.5, 58, 35) + box("tab-cam", 47.25, 35.25, 1.5, 1.5) + (sc.charging ? box("tab-cable", 47.5, 80, 1.25, 5) : "") + bolt(50, 79);
    } else if (layout === "tablet_portrait") {
      body = box("tab-wallbg", 18, 24, 60, 64) + box("tab-shadow", 35, 31, 30, 50) + box("tab-body light", 33, 28, 30, 51)
        + box("tab-lightbar", 40, 29, 16, 1.25) + glass(35, 32, 26, 43) + box("tab-cam", 47.25, 76.5, 1.5, 1.5)
        + (sc.charging ? box("tab-cable", 47.5, 79, 1.25, 9) : "") + bolt(50, 80);
    } else {
      body = box("tab-wallbg", 4, 26, 88, 59) + box("tab-shadow", 17, 37, 66, 42) + box("tab-body", 15, 33, 66, 43)
        + glass(18.5, 36.5, 59, 36) + box("tab-cam", 47.5, 34.25, 1.5, 1.5) + (sc.charging ? box("tab-cable", 47.5, 76, 1.25, 9) : "") + bolt(50, 77);
    }
  } else body = tv(30) + box("scr-foot l", 12, 84, 3, 8) + box("scr-foot r", 81, 84, 3, 8);
  const lit = SCREEN_LIT.includes(mode) ? " scr-lit" : "";
  // A television is wider than it is tall, and a computer too with its
  // tower, so in the box every other appliance fits in they came out small.
  // They are drawn larger, in a box cut to their own height, and so is the
  // projector's screen, as large as a television's.
  const band = SCREEN_BANDS[layout];
  const px = (v) => Math.round(v * 10) / 10;
  // On a narrow card, a phone's two columns, the drawing shrinks to the
  // width there is: --scr-fit, set by the card from that width, never above 1.
  const fit = "var(--scr-fit, 1)";
  const inner = band
    ? `<div class="scr-zoom" style="left: 0; top: calc(${px(-band[0] * band[2])}px * ${fit}); transform: scale(calc(${band[2]} * ${fit}))">${body}</div>`
    : body;
  const size = band
    ? ` data-fit-w="${px(96 * band[2])}" style="width: calc(${px(96 * band[2])}px * ${fit}); height: calc(${px(band[1] * band[2])}px * ${fit})"`
    : "";
  return `
        <div class="machine ${cls} scr-${layout} mode-${mode}${lit}${layout === "laptop" ? ` lap-st-${sc.laptopStyle === "classic" ? "classic" : "thin"}` : ""}${layout === "laptop" && LAPTOP_COLORS[sc.color] ? ` lap-${sc.color}` : ""}${sc.muted ? " muted" : ""}${tablet ? " tablet" : ""}${sc.charging ? " charging" : ""}${sc.seen ? " seen" : ""}${sc.tower ? ` tw-${sc.tower}` : ""}"${size}>${inner}</div>`;
}


return {
draw: (cls, ctx) => screenHtml(cls, ctx.screen || {}),
css: () => `
        .scr-zoom { position: absolute; width: 96px; height: 108px; transform-origin: 0 0; }
        .scr-bezel, .scr-glass, .scr-led, .scr-foot, .scr-neck, .scr-base, .scr-shade, .scr-wall, .scr-rod, .scr-beam,
        .scr-body, .scr-lens, .scr-vent, .scr-feet, .scr-tower, .scr-slot { position: absolute; }
        .lap-shadow, .lap-cam, .lap-hinge, .lap-deck, .lap-keys, .lap-pad, .lap-edge, .lap-notch, .lap-cable, .lap-brand, .lap-btns, .lap-sticker, .lap-vent { position: absolute; }
        .lap-brand { border-radius: 0.5px; background: rgba(255, 255, 255, 0.28); }
        .lap-btns { clip-path: polygon(0 0, 100% 0, 101% 100%, -1% 100%); background: linear-gradient(90deg, rgba(0, 0, 0, 0.16) 0 49%, transparent 49% 51%, rgba(0, 0, 0, 0.16) 51%); }
        .lap-sticker { border-radius: 0.4px; background: linear-gradient(135deg, #1e88e5, #0d47a1); box-shadow: inset 0 0 0 0.3px rgba(255, 255, 255, 0.5); }
        .lap-vent { background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0 0.8px, transparent 0.8px 1.6px); }
        .scr-laptop.lap-st-classic .lap-lid { border-radius: 2px 2px 0 0; background: linear-gradient(180deg, #2c3035, #191c20); }
        .lap-lid { border-radius: 3px 3px 0 0; }
        .lap-cam { border-radius: 50%; background: #0c0e11; box-shadow: 0 0 0 0.4px rgba(255, 255, 255, 0.2); }
        .lap-hinge { background: linear-gradient(180deg, #2a2e33, #7d848b); }
        .lap-deck { clip-path: polygon(11.9% 0, 88.1% 0, 100% 100%, 0 100%); background: linear-gradient(180deg, var(--ac-body-hi, #eef0f2), var(--ac-body, #c9ced4)); }
        .lap-keys { position: absolute; left: 0; top: 0; width: 96px; height: 106px; overflow: visible; fill: #23272c; }
        .scr-laptop .lap-lid { background: linear-gradient(180deg, #3a3f45, #1d2125 60%, #121518); }
        .lap-pad { clip-path: polygon(4% 0, 96% 0, 100% 100%, 0 100%); background: rgba(0, 0, 0, 0.1); box-shadow: inset 0 0 0 0.4px rgba(0, 0, 0, 0.18); }
        .lap-edge { border-radius: 0 0 3px 3px; background: linear-gradient(180deg, var(--ac-body, #c9ced4), var(--ac-body-lo, #8e959c)); }
        .lap-notch { border-radius: 0 0 3px 3px; background: rgba(0, 0, 0, 0.22); }
        .machine.lap-silver { --ac-body: #c9ced4; --ac-body-hi: #eef0f2; --ac-body-lo: #8e959c; }
        .machine.lap-space_grey { --ac-body: #7d8187; --ac-body-hi: #a3a7ac; --ac-body-lo: #55595e; }
        .machine.lap-midnight { --ac-body: #2e3440; --ac-body-hi: #4a5263; --ac-body-lo: #1b1f27; }
        .machine.lap-gold { --ac-body: #e3cfae; --ac-body-hi: #f6ead6; --ac-body-lo: #b89f78; }
        .machine.lap-rose { --ac-body: #e6c3bb; --ac-body-hi: #f6e1dc; --ac-body-lo: #b9918a; }
        .machine.lap-black { --ac-body: #3a3f45; --ac-body-hi: #575d64; --ac-body-lo: #202428; }
        .machine.lap-midnight .lap-keys, .machine.lap-space_grey .lap-keys, .machine.lap-black .lap-keys { fill: #15181c; }
        .lap-shadow { border-radius: 50%; background: radial-gradient(ellipse at 50% 40%, rgba(0, 0, 0, 0.22), transparent 70%); }
        .lap-cable { border-radius: 1px; background: #2b2f34; }
        .scr-laptop .scr-led { border-radius: 0.6px; }
        .scr-laptop .tab-bolt { position: absolute; width: 6px; height: 8.4px; }
        .scr-bezel {
          border-radius: 2px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body, #3b4045) 50%, var(--ac-body-lo, #22262a));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.18);
        }
        .scr-glass { border-radius: 1.5px; overflow: hidden; background: linear-gradient(155deg, #2a2f36 0%, #0c0e11 55%, #16191d 100%); }
        .scr-glass::after, .scr-wall::after {
          content: ""; position: absolute; inset: 0; z-index: 5; pointer-events: none;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.13) 0 22%, transparent 22% 100%);
        }
        .scr-wall::after { display: none; }
        .scr-pic { position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s; overflow: hidden; }
        .scr-pic > * { position: absolute; inset: 0; overflow: hidden; }
        .machine.scr-lit .scr-pic { opacity: 1; }
        .machine.mode-paused .scr-pic * { animation-play-state: paused; }
        .scr-cover { object-fit: cover; width: 100%; height: 100%; }
        .scr-led { width: 2.4px; height: 2.4px; border-radius: 50%; background: #3a3f46; }
        .machine.mode-standby .scr-led { background: #ff3b30; box-shadow: 0 0 3px #ff3b30; }
        .machine.scr-lit .scr-led { background: transparent; }
        .machine.scr-laptop.mode-standby .scr-led, .machine.scr-computer.mode-standby .scr-led { background: #ffb300; box-shadow: 0 0 3px #ffb300; animation: scr-breathe 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.scr-computer.scr-lit .scr-led, .machine.scr-laptop.scr-lit .scr-led { background: #e3f2fd; box-shadow: 0 0 3px #90caf9; }
        .machine.scr-laptop.charging:not(.scr-lit) .scr-led { background: #ffb300; box-shadow: 0 0 3px #ffb300; }
        .machine.scr-computer.tw-on .scr-led { background: #e3f2fd; box-shadow: 0 0 3px #90caf9; animation-name: none; }
        .machine.scr-computer.tw-off .scr-led { background: #3a3f46; box-shadow: none; animation-name: none; }
        .scr-badge { position: absolute; z-index: 6; right: 4%; bottom: 6%; width: 16%; max-width: 9px; opacity: 0.9; display: none; }
        .scr-badge svg { display: block; width: 100%; height: auto; }
        .machine.mode-playing .scr-badge.play, .machine.mode-paused .scr-badge.pause, .machine.scr-lit.muted .scr-badge.mute { display: block; }
        .machine.muted .scr-badge.play { display: none !important; }
        .machine.mode-paused .scr-badge.pause { right: auto; bottom: auto; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 22%; max-width: 12px; }
        .scr-lock { position: absolute; inset: 0; z-index: 4; background: linear-gradient(160deg, #263238, #37474f); }
        .scr-lock::before {
          content: ""; position: absolute; left: 50%; top: 26%; width: 14%; height: 20%; transform: translateX(-50%); box-sizing: border-box;
          border: 1.5px solid #cfd8dc; border-bottom: none; border-radius: 50% 50% 0 0;
        }
        .scr-lock::after { content: ""; position: absolute; left: 50%; top: 44%; width: 22%; height: 26%; transform: translateX(-50%); background: #cfd8dc; border-radius: 1px; }
        .scr-foot { border-radius: 1px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body-lo, #22262a)); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }
        .scr-foot.l { transform: skewX(-28deg); } .scr-foot.r { transform: skewX(28deg); }
        .scr-neck { background: linear-gradient(90deg, var(--ac-body-lo, #22262a), var(--ac-body, #3b4045), var(--ac-body-lo, #22262a)); }
        .scr-base { border-radius: 50%; background: radial-gradient(ellipse at 50% 30%, var(--ac-body-hi, #515860), var(--ac-body-lo, #22262a)); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); }
        .scr-computer .scr-base { border-radius: 2px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body-lo, #22262a)); }
        .scr-shade { border-radius: 4px; background: rgba(0, 0, 0, 0.1); filter: blur(2.5px); }
        .scr-wall { overflow: hidden; border-radius: 1px; background: #f6f7f9; box-shadow: inset 0 0 0 1px #d4d9df, 0 1px 2px rgba(0, 0, 0, 0.12); }
        .scr-rod { background: #9aa2ab; }
        .scr-beam { opacity: 0; transition: opacity 0.4s; clip-path: polygon(0 0, 100% 0, 57% 100%, 51% 100%); background: linear-gradient(0deg, rgba(255, 250, 230, 0.85), rgba(255, 250, 230, 0.12)); }
        .machine.scr-lit .scr-beam { opacity: 0.9; }
        .scr-body {
          border-radius: 4px 4px 3px 3px; background: linear-gradient(180deg, var(--ac-body-hi, #515860), var(--ac-body, #3b4045) 45%, var(--ac-body-lo, #22262a));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18), 0 2px 3px rgba(0, 0, 0, 0.12);
        }
        .scr-lens { border-radius: 50%; background: radial-gradient(circle at 40% 38%, #5d6670, #15181c 70%); box-shadow: 0 0 0 1.5px var(--ac-body-lo, #22262a), inset 0 0 0 1px #000; }
        .machine.scr-lit .scr-lens { background: radial-gradient(circle at 50% 50%, #fffbe8 0 30%, #ffe7a3 55%, #8d7a4a 80%); box-shadow: 0 0 0 1.5px var(--ac-body-lo, #22262a), 0 0 6px #ffe7a3; }
        .scr-vent { opacity: 0.6; background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0 1px, transparent 1px 3px); }
        .scr-feet { border-radius: 0 0 1px 1px; background: #2b2f34; }
        .scr-tower { border-radius: 2px; background: linear-gradient(90deg, var(--ac-body-lo, #22262a), var(--ac-body, #3b4045) 30%, var(--ac-body-hi, #515860) 60%, var(--ac-body-lo, #22262a)); }
        .scr-slot { border-radius: 0.5px; background: rgba(0, 0, 0, 0.35); }
        /* A wall tablet (#62), on its patch of wall. */
        .tab-wallbg, .tab-shadow, .tab-body, .tab-wood, .tab-mat, .tab-lightbar, .tab-cam, .tab-cable, .tab-bolt { position: absolute; }
        .tab-wallbg { border-radius: 4px; background: linear-gradient(180deg, rgba(127, 127, 127, 0.1), rgba(127, 127, 127, 0.2)); }
        .tab-shadow { border-radius: 3px; background: rgba(0, 0, 0, 0.18); filter: blur(2px); }
        .tab-body { border-radius: 4.5px; background: linear-gradient(145deg, #3a3f46, #1d2126); }
        .tab-body.light { border-radius: 4px; background: linear-gradient(145deg, #f4f5f6, #c9ced3); box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.08); }
        .tab-wood { border-radius: 2px; background: linear-gradient(135deg, #c98f55, #8d5a30); box-shadow: inset 0 0 0 0.75px rgba(0, 0, 0, 0.18); }
        .tab-mat { background: #f6f3ee; box-shadow: inset 0 0.5px 1.5px rgba(0, 0, 0, 0.25); }
        .machine.tablet .tab-glass { background: #121519; }
        .tab-lightbar { border-radius: 1px; background: #b9bfc5; }
        .machine.tablet.scr-lit .tab-lightbar { background: #43a047; box-shadow: 0 0 2.5px rgba(67, 160, 71, 0.8); }
        .machine.tablet.seen .tab-lightbar { background: #29b6f6; box-shadow: 0 0 2.5px rgba(41, 182, 246, 0.9); }
        .tab-cam { border-radius: 50%; background: #3a4048; }
        .machine.tablet.seen .tab-cam { background: #29b6f6; box-shadow: 0 0 2px 0.5px rgba(41, 182, 246, 0.8); animation: tab-blink 1.2s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .tab-cable { border-radius: 1px; background: #cfd3d7; }
        .tab-bolt { width: 5px; height: 7px; fill: var(--success-color, #43a047); }
        .si-dash { box-sizing: border-box; background: #f3f4f6; padding: 9% 6% 6%; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 5%; }
        .scr-tablet_portrait .si-dash { grid-template-columns: repeat(2, 1fr); }
        .si-dash::before { content: ""; position: absolute; left: 6%; right: 6%; top: 3%; height: 3%; border-radius: 1px; background: #039be5; }
        .si-dash i { position: relative; border-radius: 1px; background: #fff; box-shadow: 0 0 0 0.25px #d5d9de; }
        .si-dash i::after { content: ""; position: absolute; left: 14%; top: 22%; width: 26%; height: 26%; border-radius: 50%; background: var(--c, #ffb300); }
        .si-dash i:nth-child(2) { --c: #43a047; } .si-dash i:nth-child(3) { --c: #1e88e5; } .si-dash i:nth-child(4) { --c: #8e24aa; }
        .si-dash i:nth-child(5) { --c: #e53935; } .si-dash i:nth-child(6) { --c: #00897b; }
        .si-dash i:nth-child(2)::after { animation: tab-blink 2.4s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .si-saver { background: radial-gradient(circle at 30% 30%, #18263a, #06080c 70%); }
        .si-saver b {
          position: absolute; left: 50%; top: 46%; transform: translate(-50%, -50%); white-space: nowrap; line-height: 1.1;
          color: #cfe3ff; font-weight: 300; font-size: 9px; letter-spacing: 0.02em; animation: tab-drift 9s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .scr-tablet_portrait .si-saver b { font-size: 6.5px; }
        .si-saver b small { display: block; font-size: 0.42em; text-align: center; color: #7f97b5; letter-spacing: 0.04em; }
        @keyframes tab-blink { 50% { opacity: 0.25; } }
        @keyframes tab-drift { 0%, 100% { margin-left: -6%; } 50% { margin-left: 6%; } }

        /* The pictures. */
        .si-sunset { background: linear-gradient(115deg, #1e3c72, #2a7fba 25%, #f4a261 50%, #e76f51 70%, #264653); background-size: 300% 300%; animation: scr-drift 9s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-sunset b { position: absolute; width: 16%; aspect-ratio: 1; border-radius: 50%; left: 58%; top: 24%; background: #ffe9a8; box-shadow: 0 0 8px #ffd166; }
        .si-sunset i { position: absolute; left: -10%; width: 120%; bottom: -30%; height: 62%; border-radius: 50%; background: #1d3b2a; opacity: 0.9; }
        .si-aquarium { background: linear-gradient(180deg, #4fc3f7, #0277bd 70%, #01579b); }
        .si-aquarium .sand { position: absolute; left: 0; right: 0; bottom: 0; height: 14%; background: #e0c38c; border-radius: 40% 60% 0 0 / 100% 100% 0 0; }
        .si-aquarium .weed { position: absolute; bottom: 8%; width: 3%; height: 40%; border-radius: 50% 50% 0 0; background: #2e7d32; transform-origin: bottom; animation: scr-sway 3s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-aquarium .fish { position: absolute; width: 13%; height: 12%; border-radius: 50%; background: var(--f); animation: scr-swim var(--sw) linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-aquarium .fish::after { content: ""; position: absolute; left: -30%; top: 10%; width: 40%; height: 80%; background: var(--f); clip-path: polygon(0 0, 100% 50%, 0 100%); }
        .si-aquarium .fish::before { content: ""; position: absolute; right: 18%; top: 28%; width: 12%; aspect-ratio: 1; border-radius: 50%; background: #111; }
        .si-aquarium .bub { position: absolute; bottom: 10%; width: 3%; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.7); animation: scr-rise 3s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .si-bars { background: linear-gradient(90deg, #c0c0c0 0 14.3%, #c0c000 0 28.6%, #00c0c0 0 42.9%, #00c000 0 57.2%, #c000c0 0 71.5%, #c00000 0 85.8%, #0000c0 0); }
        .si-bars::before {
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 22%;
          background: linear-gradient(90deg, #0000c0 0 14.3%, #131313 0 28.6%, #c000c0 0 42.9%, #131313 0 57.2%, #00c0c0 0 71.5%, #131313 0 85.8%, #c0c0c0 0);
        }
        .si-bars b { position: absolute; left: 50%; top: 40%; width: 30%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 1px solid #fff; box-shadow: 0 0 0 1px #000; }
        /* The match as television shows it: the stand full, the pitch mown in
           stripes, a goal at each end and two teams after the ball. */
        .si-football { background: repeating-linear-gradient(180deg, #43a047 0 9%, #388e3c 9% 18%); }
        .si-football .crowd {
          position: absolute; left: 0; right: 0; top: 0; height: 22%; background-color: #263238;
          background-image: radial-gradient(circle, #ef5350 0 0.7px, transparent 0.9px), radial-gradient(circle, #ffee58 0 0.7px, transparent 0.9px), radial-gradient(circle, #e0e0e0 0 0.7px, transparent 0.9px), radial-gradient(circle, #42a5f5 0 0.7px, transparent 0.9px);
          background-size: 4px 3px, 5px 3px, 3px 4px, 6px 3px; background-position: 0 0, 2px 1px, 1px 2px, 3px 0;
        }
        .si-football .lines { position: absolute; left: 6%; right: 6%; top: 30%; bottom: 8%; border: 1px solid rgba(255, 255, 255, 0.8); }
        .si-football .lines::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1px solid rgba(255, 255, 255, 0.8); }
        .si-football .lines::after { content: ""; position: absolute; left: 50%; top: 50%; width: 20%; height: 44%; transform: translate(-50%, -50%); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 50%; }
        .si-football .goal { position: absolute; top: 48%; width: 4%; height: 24%; border: 1px solid #fff; background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.35) 0 1px, transparent 1px 2px); }
        .si-football .goal.l { left: 2%; border-right: none; } .si-football .goal.r { right: 2%; border-left: none; }
        .si-football .pl { position: absolute; width: 3.4%; height: 13%; border-radius: 1px 1px 0.5px 0.5px; background: linear-gradient(180deg, transparent 0 30%, var(--k) 30% 72%, #f5f5f5 72% 84%, #222 84%); animation: scr-chase 3.4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-football .pl::before { content: ""; position: absolute; left: 12%; top: 0; width: 76%; height: 30%; border-radius: 50%; background: #f1c27d; }
        .si-football .ball { position: absolute; width: 3.6%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 50% 50%, #222 0 22%, #fff 26%); box-shadow: 0 0 0 0.4px #222; animation: scr-chase 3.4s ease-in-out infinite alternate, scr-hop 0.85s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-football .score { position: absolute; left: 3%; top: 3%; padding: 0 1.5px; background: #111; color: #fff; font: 700 4.5px/1.4 Arial, sans-serif; border-left: 2px solid #e53935; }
        .si-space {
          background: radial-gradient(circle at 20% 30%, #fff 0 0.6%, transparent 0.8%), radial-gradient(circle at 70% 20%, #fff 0 0.5%, transparent 0.7%), radial-gradient(circle at 85% 70%, #fff 0 0.6%, transparent 0.8%),
            radial-gradient(circle at 40% 80%, #fff 0 0.4%, transparent 0.6%), radial-gradient(circle at 55% 45%, #fff 0 0.4%, transparent 0.6%), radial-gradient(circle at 10% 75%, #fff 0 0.5%, transparent 0.7%), linear-gradient(160deg, #0b1030, #1a0f3a);
        }
        .si-space b { position: absolute; right: 8%; top: 18%; width: 26%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ffcc80, #e65100); }
        .si-space b::after { content: ""; position: absolute; left: -30%; right: -30%; top: 42%; height: 16%; border: 1px solid rgba(255, 224, 178, 0.8); border-radius: 50%; transform: rotate(-15deg); }
        .si-space i { position: absolute; width: 5%; height: 16%; border-radius: 50% 50% 15% 15%; background: #eceff1; animation: scr-fly 5s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-space i::after { content: ""; position: absolute; left: 20%; right: 20%; top: 100%; height: 60%; border-radius: 0 0 50% 50%; background: linear-gradient(#ffeb3b, #ff5722 60%, transparent); }
        /* The old screensaver of a DVD player: the logo bounces off the
           edges, and once in about two minutes it lands right in a corner. */
        .si-bounce { background: #050505; }
        .si-bounce .logo {
          position: absolute; width: 14px; height: 9px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;
          font: 900 6px/1 Arial, sans-serif; letter-spacing: -0.3px; border-radius: 2px; color: #03a9f4; border: 1px solid currentColor;
          animation: scr-bx 4.1s linear infinite alternate, scr-by 2.9s linear infinite alternate, scr-hue 5.4s steps(6) infinite, scr-pop 118.9s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .si-bounce .flash { position: absolute; inset: 0; z-index: 2; background: #fff; opacity: 0; animation: scr-flash 118.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-bounce .bit { position: absolute; top: -12%; width: 3%; height: 5%; background: var(--c); opacity: 0; animation: scr-confetti 118.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-desktop { background: linear-gradient(160deg, #5b8def, #7e57c2 60%, #4a3a8a); }
        .si-desktop i { position: absolute; border-radius: 1px; background: rgba(255, 255, 255, 0.92); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }
        .si-desktop i::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: #cfd8e3; }
        .si-desktop i.mv { animation: scr-drag 4s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-desktop u { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: rgba(20, 22, 30, 0.55); }
        .si-code { background: #1e1e2e; }
        .si-code .lines { position: absolute; left: 6%; right: 6%; top: 0; height: 200%; animation: scr-scroll 6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .si-code .lines i { display: block; height: 1.6px; margin: 0 0 2.2px var(--x); width: var(--w); border-radius: 1px; background: var(--c); }
        .si-pong { background: #000; }
        .si-pong::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1px dashed rgba(255, 255, 255, 0.5); }
        .si-pong .pad { position: absolute; width: 3%; height: 24%; background: #fff; animation: scr-pad 1.9s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-pong .pad.r { animation-duration: 2.3s; animation-direction: alternate-reverse; }
        .si-pong .ball { position: absolute; width: 4%; aspect-ratio: 1; background: #fff; animation: scr-pbx 1.6s linear infinite alternate, scr-pby 1.1s linear infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .si-pong .score { position: absolute; top: 6%; left: 0; right: 0; text-align: center; color: #fff; font: 700 5px/1 monospace; letter-spacing: 6px; }
        .si-home { background: linear-gradient(160deg, #141821, #232a38); }
        .si-home i { position: absolute; width: 20%; height: 24%; border-radius: 1.5px; background: var(--c); }
        .si-home i.f { outline: 1px solid #fff; outline-offset: 0.5px; }
        .si-home u { position: absolute; left: 6%; top: 9%; width: 40%; height: 7%; border-radius: 1px; background: rgba(255, 255, 255, 0.35); }
        @keyframes scr-breathe { 50% { opacity: 0.25; } }
        @keyframes scr-drift { to { background-position: 100% 50%; } }
        @keyframes scr-sway { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
        @keyframes scr-swim { from { left: -20%; } to { left: 110%; } }
        @keyframes scr-rise { to { bottom: 105%; opacity: 0.2; } }
        @keyframes scr-chase { from { left: 14%; } to { left: 80%; } }
        @keyframes scr-hop { from { top: 58%; } to { top: 74%; } }
        @keyframes scr-fly { from { left: -10%; top: 90%; transform: rotate(55deg); } to { left: 105%; top: -20%; transform: rotate(55deg); } }
        @keyframes scr-bx { from { left: 0; } to { left: calc(100% - 14px); } }
        @keyframes scr-by { from { top: 0; } to { top: calc(100% - 9px); } }
        @keyframes scr-hue { to { filter: hue-rotate(360deg); } }
        @keyframes scr-pop { 0% { transform: scale(1.5); } 1.2%, 100% { transform: none; } }
        @keyframes scr-flash { 0% { opacity: 0.85; } 0.8%, 100% { opacity: 0; } }
        @keyframes scr-confetti { 0% { opacity: 1; transform: translateY(0) rotate(0); } 1.6% { opacity: 1; transform: translateY(70px) rotate(540deg); } 1.61%, 100% { opacity: 0; } }
        @keyframes scr-drag { to { transform: translate(-20%, -8%); } }
        @keyframes scr-scroll { to { transform: translateY(-50%); } }
        @keyframes scr-pad { from { top: 10%; } to { top: 66%; } }
        @keyframes scr-pbx { from { left: 8%; } to { left: 88%; } }
        @keyframes scr-pby { from { top: 6%; } to { top: 88%; } }
        @media (prefers-reduced-motion: reduce) { .machine .scr-pic *, .machine .scr-led, .machine .tab-cam { animation: none !important; animation-delay: var(--anim-offset, 0s); } }
  `,
};
}
