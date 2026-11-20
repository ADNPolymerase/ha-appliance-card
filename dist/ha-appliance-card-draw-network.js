// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The network drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntFlake, ntTint, numberOrNull, shdBlur, t, thsColor, zoneColumns }) {
// The LEDs of one device do not blink in step.
function ntDelay(i, step, mod) {
  return `animation-delay: calc(-${((i * step) % mod).toFixed(2)}s + var(--anim-offset, 0s))`;
}

// A switch: its ports in one or two rows, the first `lit` of them up. A real
// one numbers them odd on top and even below, with the LEDs of the bottom row
// under its ports.
function ntSwitch(n, lit) {
  const rows = n <= 8 ? 1 : 2, per = n / rows, x0 = 14, span = 79, pitch = span / per;
  const pw = +(pitch * 0.78).toFixed(2), ph = n >= 32 ? 5 : 6, lw = Math.max(1, +(pw * 0.32).toFixed(2));
  const top = rows === 1 ? 42 : 33, h = rows === 1 ? 24 : 38, ys = rows === 1 ? [51] : [42, 55];
  let html = `<div class="nt-body" style="left:0;top:${top}px;width:96px;height:${h}px"></div>
          <div class="nt-hi" style="left:4px;top:${top + 2.5}px;width:88px"></div>
          <div class="nt-led nt-pw" style="left:5px;top:${top + 7}px"></div>
          <div class="nt-led" style="left:5px;top:${top + 13}px"></div>`;
  for (let i = 0; i < n; i++) {
    const r = rows === 1 ? 0 : i % 2, c = rows === 1 ? i : Math.floor(i / 2);
    const x = +(x0 + c * pitch + (pitch - pw) / 2).toFixed(2), ly = r === 0 ? -2.4 : ph + 0.9;
    html += `<div class="nt-port${i < lit ? " up" : ""}" style="left:${x}px;top:${ys[r]}px;width:${pw}px;height:${ph}px">`
      + `<i class="a" style="left:0.2px;top:${ly}px;width:${lw}px"></i>`
      + `<i class="b" style="right:0.2px;top:${ly}px;width:${lw}px;${ntDelay(i, 0.37, 1.3)}"></i></div>`;
  }
  return `${html}<div class="nt-vent" style="left:${x0}px;top:${top + h - 4}px;width:${span}px;height:2.5px"></div>
          <div class="nt-floor" style="left:6px;width:84px;top:${top + h}px"></div>`;
}

// A NAS seen from the front, the way Synology draws theirs: the LEDs down the
// left, one per bay, then the bays. An empty bay has no tray and its LED stays
// dark.
function ntNas(bays, disks) {
  // Eight bays make a wide, lower box with slimmer trays, like a DS1821+.
  const big = bays > 4, tw = big ? 8.5 : 13, gap = big ? 1.2 : 2, strip = 11, h = big ? 64 : 74;
  const w = +(strip + bays * tw + (bays - 1) * gap + (big ? 4 : 6)).toFixed(1), step = big ? 4.3 : 6;
  const x = Math.round((96 - w) / 2), y = 104 - h - 4;
  const leds = ["nt-pw", "nt-lan"].concat(Array.from({ length: bays }, (_, i) => `d-${disks[i] || "gen"}`));
  let html = `<div class="nt-body" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:4px"></div>`;
  html += leds.map((k, i) => `<div class="nt-led ${k}" style="left:${x + 4}px;top:${+(y + 8 + i * step).toFixed(1)}px;${ntDelay(i, 0.45, 2.8)}"></div>`).join("");
  html += `<div class="nt-led" style="left:${x + 4}px;top:${+(y + 8 + leds.length * step).toFixed(1)}px"></div>
          <div class="nt-key" style="left:${x + 2.5}px;top:${y + h - 11}px;width:6px;height:6px"></div>`;
  for (let i = 0; i < bays; i++) {
    const tx = +(x + strip + i * (tw + gap)).toFixed(1);
    html += `<div class="nt-bay" style="left:${tx}px;top:${y + 5}px;width:${tw}px;height:${h - 10}px"></div>`;
    if (disks[i] !== "empty") {
      const m = big ? 1.8 : 3;
      html += `<div class="nt-handle" style="left:${+(tx + m).toFixed(1)}px;top:${y + 8}px;width:${+(tw - 2 * m).toFixed(1)}px;height:3px"></div>
          <div class="nt-tray" style="left:${+(tx + m).toFixed(1)}px;top:${y + 16}px;width:${+(tw - 2 * m).toFixed(1)}px;height:${h - 28}px"></div>`;
    }
  }
  return `${html}<div class="nt-floor" style="left:${x + 4}px;width:${w - 8}px;top:${y + h}px"></div>`;
}

// A server tower: four drive bays, a fan behind its grille and the power
// button.
function ntServer(disks, fanOff) {
  let html = `<div class="nt-body" style="left:28px;top:6px;width:40px;height:98px"></div>
          <div class="nt-vent" style="left:33px;top:11px;width:30px;height:12px"></div>`;
  for (let i = 0; i < 4; i++) {
    const y = 28 + i * 13;
    html += `<div class="nt-bay" style="left:33px;top:${y}px;width:30px;height:10px"></div>`;
    if (disks[i] !== "empty") html += `<div class="nt-handle" style="left:36px;top:${y + 4}px;width:14px;height:1.4px"></div>`;
    html += `<div class="nt-led d-${disks[i] || "gen"}" style="left:58px;top:${y + 3.5}px;${ntDelay(i, 0.6, 2.8)}"></div>`;
  }
  return `${html}<div class="nt-fan${fanOff ? " stop" : ""}" style="left:38px;top:81px;width:20px;height:20px"></div>
          <div class="nt-key" style="left:59px;top:84px;width:6px;height:6px"></div>
          <div class="nt-led nt-pw" style="left:60.7px;top:85.7px"></div>
          <div class="nt-led" style="left:60.7px;top:94px"></div>
          <div class="nt-floor" style="left:24px;width:48px;bottom:0"></div>`;
}

// A mini PC (#129), Beelink style: a low blue box in three-quarter view, its
// top finely perforated, two USB ports, a jack and the red power button on a
// black panel, vents along its side. Busy, its light flickers and warm air
// leaves the vents.
function ntMiniPc() {
  const vents = Array.from({ length: 6 }, (_, i) => `<path d="M${72 + i * 2.6} ${57 - i * 1.3} V${74 - i * 1.3}" stroke="#141a2a" stroke-width="1.1" stroke-linecap="round"/>`).join("");
  const heat = [0, 1, 2].map((i) => `<path class="nt-heat" d="M${76 + i * 5} ${50 - i * 2} q-2 -4 0 -8 q2 -4 0 -8" stroke="#ffb74d" stroke-width="1" fill="none" stroke-linecap="round" style="animation-delay:${(i * .4).toFixed(1)}s"/>`).join("");
  return `<svg class="nt-svg" viewBox="0 0 96 108" style="position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible">
<defs><linearGradient id="mpc-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a6a99"/><stop offset="1" stop-color="#3f4c78"/></linearGradient>
<linearGradient id="mpc-front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46547f"/><stop offset="1" stop-color="#323e63"/></linearGradient>
<linearGradient id="mpc-side" x1="0" x2="1"><stop offset="0" stop-color="#2c3758"/><stop offset="1" stop-color="#222b47"/></linearGradient>
<pattern id="mpc-dots" width="2" height="2" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".35" fill="#1c2440" opacity=".7"/></pattern></defs>
<ellipse cx="50" cy="90" rx="42" ry="5" fill="#000" opacity=".16"/>
<path d="M10 55 Q10 53 12 52 L30 42 Q32 41 34 41 L86 41 Q89 41 88 43 L70 53 Q68 54 66 54 L12 54 Z" fill="url(#mpc-top)"/>
<path d="M10 55 Q10 53 12 52 L30 42 Q32 41 34 41 L86 41 Q89 41 88 43 L70 53 Q68 54 66 54 L12 54 Z" fill="url(#mpc-dots)"/>
<path d="M68 54 L88 43 Q90 42 90 45 V73 Q90 75 88 76 L70 86 Q68 87 68 85 Z" fill="url(#mpc-side)"/>${vents}
<rect x="10" y="54" width="58" height="33" rx="2.4" fill="url(#mpc-front)"/>
<path d="M12 54.6 H66" stroke="#8a9bd0" stroke-width=".6" opacity=".6"/>
<rect x="15" y="59" width="48" height="23" rx="2" fill="#0d0f13"/>
<rect x="19" y="66.5" width="9" height="4.4" rx=".6" fill="#2a2d33"/><rect x="20" y="67.4" width="7" height="1.7" fill="#2f6fd6"/>
<rect x="31" y="66.5" width="9" height="4.4" rx=".6" fill="#2a2d33"/><rect x="32" y="67.4" width="7" height="1.7" fill="#2f6fd6"/>
<circle cx="45.5" cy="68.7" r="1.5" fill="#1e2126" stroke="#4a4f57" stroke-width=".4"/>
<circle class="nt-pwring" cx="55" cy="70" r="5" fill="#c62828"/><circle cx="55" cy="70" r="4" fill="#e53935"/>
<path d="M53.2 68 A2.6 2.6 0 1 0 56.8 68" stroke="#fff" stroke-width=".8" fill="none" stroke-linecap="round"/><path d="M55 66.6 V69.6" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>
<circle class="nt-act" cx="45.5" cy="62.6" r=".7" fill="#2a2d33"/>
<g class="nt-heatg">${heat}</g>
</svg>`;
}

// A rack behind its glass door: fans on top, a patch panel, a switch, a NAS
// and a server.
function ntRack(fanOff) {
  const fan = fanOff ? " stop" : "";
  const ports = [1, 1, 1, 0, 1, 1].map((up, i) => `<div class="nt-port${up ? " up" : ""}" style="left:${30 + i * 7}px;top:41.5px;width:5.5px;height:5px">`
    + `<i class="a" style="left:0.2px;top:-2.4px;width:1.6px"></i><i class="b" style="right:0.2px;top:-2.4px;width:1.6px;${ntDelay(i, 0.37, 1.3)}"></i></div>`).join("");
  const bays = [0, 1, 2].map((i) => `<div class="nt-bay" style="left:${24 + i * 15}px;top:52px;width:13px;height:12px"></div>`
    + `<div class="nt-led d-gen" style="left:${33 + i * 15}px;top:54px;${ntDelay(i, 0.5, 2.8)}"></div>`).join("");
  const jacks = Array.from({ length: 8 }, (_, i) => `<div class="nt-jack" style="left:${25 + i * 6}px;top:27px;width:4px;height:3px"></div>`).join("");
  return `<div class="nt-body" style="left:14px;top:2px;width:68px;height:102px"></div>
          <div class="nt-dark" style="left:19px;top:7px;width:58px;height:92px"></div>
          <div class="nt-fan${fan}" style="left:28px;top:9px;width:11px;height:11px"></div>
          <div class="nt-fan${fan}" style="left:57px;top:9px;width:11px;height:11px"></div>
          <div class="nt-u" style="left:21px;top:24px;width:54px;height:9px"></div>${jacks}
          <div class="nt-u" style="left:21px;top:35px;width:54px;height:11px"></div>
          <div class="nt-led nt-pw" style="left:24px;top:39px"></div>${ports}
          <div class="nt-u" style="left:21px;top:49px;width:54px;height:18px"></div>${bays}
          <div class="nt-led nt-pw" style="left:70px;top:53px"></div>
          <div class="nt-led" style="left:70px;top:59px"></div>
          <div class="nt-u" style="left:21px;top:70px;width:54px;height:12px"></div>
          <div class="nt-vent" style="left:24px;top:73px;width:30px;height:6px"></div>
          <div class="nt-led nt-lan" style="left:70px;top:75px"></div>
          <div class="nt-u" style="left:21px;top:85px;width:54px;height:11px;opacity:0.55"></div>
          <div class="nt-glass" style="left:19px;top:7px;width:58px;height:92px"></div>
          <div class="nt-handle" style="left:78px;top:46px;width:2px;height:14px;background:#8a929c"></div>
          <div class="nt-floor" style="left:10px;width:76px;bottom:0"></div>`;
}

// A router or an ISP's box, flat on the shelf with its antennas up: the power,
// internet and Wi-Fi lights, then one per LAN port. The Wi-Fi waves rise from
// it while it is up, faster when it is busy, and not at all with its Wi-Fi off.
// A lost internet link puts it in alert, every light red.
function ntRouter() {
  const waves = [[42, 52, 12], [36, 46, 24], [30, 40, 36]].map(([top, l, w], i) =>
    `<div class="nt-wave" style="left:${48 - w / 2}px;top:${top}px;width:${w}px;height:${w}px;${ntDelay(i, 0.3, 2.4)}"></div>`).join("");
  const lan = [0, 1, 2, 3].map((i) => `<div class="nt-led nt-lan" style="left:${56 + i * 6}px;top:83px;${ntDelay(i, 0.45, 2.4)}"></div>`).join("");
  return `${waves}
          <div class="nt-ant" style="left:20px;top:46px;width:3.5px;height:30px;transform:rotate(-8deg)"></div>
          <div class="nt-ant" style="left:72.5px;top:46px;width:3.5px;height:30px;transform:rotate(8deg)"></div>
          <div class="nt-ant" style="left:46px;top:52px;width:3.5px;height:24px"></div>
          <div class="nt-body" style="left:10px;top:74px;width:76px;height:20px;border-radius:6px"></div>
          <div class="nt-hi" style="left:16px;top:76px;width:64px"></div>
          <div class="nt-led nt-pw" style="left:18px;top:83px"></div>
          <div class="nt-led nt-wan" style="left:26px;top:83px"></div>
          <div class="nt-led nt-wl" style="left:34px;top:83px"></div>${lan}
          <div class="nt-vent" style="left:18px;top:89px;width:60px;height:2px"></div>
          <div class="nt-floor" style="left:8px;width:80px;top:94px"></div>`;
}

function networkHtml(cls, n) {
  const layout = NET_LAYOUTS.includes(n.layout) ? n.layout : "nas";
  const disks = n.disks || [];
  const inner = layout === "switch" ? ntSwitch(n.ports || 8, n.lit || 0)
    : layout === "server" ? ntServer(disks, n.fanOff)
      : layout === "rack" ? ntRack(n.fanOff)
        : layout === "router" ? ntRouter()
          : layout === "mini_pc" ? ntMiniPc()
          : ntNas(n.bays || 2, disks);
  return `
        <div class="machine ${cls} nt nt-${n.mode || "off"} nt-l-${layout}${n.wifiOff ? " nt-nowifi" : ""}">${inner}
        </div>`;
}


return {
draw: (cls, ctx) => networkHtml(cls, ctx.network || {}),
css: () => `
        .machine.nt > * { position: absolute; }
        .nt-body {
          background: linear-gradient(180deg, var(--ac-body-hi, #4a5157), var(--ac-body, #33383d) 45%, var(--ac-body-lo, #1f2327));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.22), 0 2px 3px rgba(0, 0, 0, 0.14); border-radius: 3px;
        }
        .nt-u {
          background: linear-gradient(180deg, var(--ac-body-hi, #4a5157), var(--ac-body, #33383d) 55%, var(--ac-body-lo, #1f2327));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.28); border-radius: 1px;
        }
        .nt-hi { height: 1px; background: rgba(255, 255, 255, 0.12); }
        .nt-led { width: 2.6px; height: 2.6px; border-radius: 50%; background: #3d434a; }
        .nt-port { background: #111417; border-radius: 0.8px; }
        .nt-port i { position: absolute; height: 1.5px; border-radius: 0.5px; background: #3d434a; }
        .nt-bay { background: #16191c; border-radius: 1.5px; }
        .nt-tray { background: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0 1px, transparent 1px 3px); }
        .nt-handle { background: rgba(255, 255, 255, 0.16); border-radius: 1px; }
        .nt-key { border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.45); background: var(--ac-body-lo, #2a2e33); }
        .nt-dark { background: #121417; border-radius: 1px; }
        .nt-jack { background: #0d0f11; border-radius: 0.5px; }
        .nt-vent { background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.45) 0 1.2px, transparent 1.2px 3px); opacity: 0.6; }
        .nt-fan {
          border-radius: 50%;
          background: radial-gradient(circle, #2a2e33 0 18%, transparent 19%),
            conic-gradient(#555c63 0 12%, #1b1e21 12% 25%, #555c63 25% 37%, #1b1e21 37% 50%, #555c63 50% 62%, #1b1e21 62% 75%, #555c63 75% 87%, #1b1e21 87%);
        }
        .nt-glass { border-radius: 2px; background: linear-gradient(115deg, rgba(255, 255, 255, 0.18) 0 20%, rgba(255, 255, 255, 0.03) 20% 100%); box-shadow: inset 0 0 0 1.5px rgba(0, 0, 0, 0.35); }
        .nt-floor { height: 5px; border-radius: 50%; background: radial-gradient(closest-side, rgba(0, 0, 0, 0.22), transparent); }
        .nt-on .nt-pw, .nt-busy .nt-pw { background: #2ecc71; box-shadow: 0 0 3px #2ecc71; }
        .nt-on .nt-lan { background: #2ecc71; animation: nt-flick 2.4s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-lan { background: #2ecc71; animation: nt-flick 0.4s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .nt-port.up i.a, .nt-busy .nt-port.up i.a { background: #2ecc71; }
        .nt-on .nt-port.up i.b { background: #ffb300; animation: nt-flick 3.2s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-port.up i.b { background: #ffb300; animation: nt-flick 0.45s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-ok, .nt-busy .d-ok { background: #2ecc71; }
        .nt-on .d-sleep, .nt-busy .d-sleep { background: #2ecc71; animation: nt-breathe 4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-gen { background: #4fc3f7; animation: nt-flick 2.8s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-busy, .nt-busy .d-busy, .nt-busy .d-gen { background: #4fc3f7; animation: nt-flick 0.35s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .d-warn, .nt-busy .d-warn { background: #ff9800; box-shadow: 0 0 3px #ff9800; }
        .nt-on .d-fail, .nt-busy .d-fail { background: #f44336; box-shadow: 0 0 3px #f44336; animation: nt-blink 1s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-on .nt-fan:not(.stop) { animation: nt-spin 1.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-fan:not(.stop) { animation: nt-spin 0.5s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-fan { animation: nt-spinstop 3.2s cubic-bezier(0.3, 0, 0.35, 1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-led, .nt-alert .nt-port.up i { background: #f44336; box-shadow: 0 0 3px #f44336; animation: nt-blink 1s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-led.d-empty { background: #3d434a; box-shadow: none; animation: none; animation-delay: var(--anim-offset, 0s); }
        .nt-ant { background: linear-gradient(90deg, var(--ac-body-lo, #1f2327), var(--ac-body-hi, #4a5157)); border-radius: 1.6px 1.6px 0.8px 0.8px; }
        .nt-wave { border: 2px solid transparent; border-top-color: #4fc3f7; border-radius: 50%; opacity: 0; }
        .nt-on .nt-wave, .nt-busy .nt-wave { animation: nt-wave 2.4s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-busy .nt-wave { animation-duration: 1.2s; }
        .nt-nowifi .nt-wave { display: none; }
        .nt-on .nt-wan, .nt-busy .nt-wan { background: #2ecc71; }
        .nt-on .nt-wl, .nt-busy .nt-wl { background: #4fc3f7; box-shadow: 0 0 2px #4fc3f7; }
        .nt-nowifi .nt-wl { background: #3d434a; box-shadow: none; }
        @keyframes nt-wave { 0% { opacity: 0; } 30% { opacity: 0.9; } 100% { opacity: 0; } }
        .machine.nt-unav { opacity: 0.45; filter: grayscale(1); }
        .nt-l-mini_pc .nt-pwring { opacity: .35; }
        .nt-on .nt-pwring, .nt-busy .nt-pwring { opacity: 1; filter: drop-shadow(0 0 2px #ff5252); }
        .nt-on .nt-act, .nt-busy .nt-act { fill: #4fc3f7; }
        .nt-busy .nt-act { animation: nt-flick 0.35s infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-alert .nt-act { fill: #f44336; animation: nt-blink 1s steps(1) infinite; animation-delay: var(--anim-offset, 0s); }
        .nt-l-mini_pc .nt-heatg { opacity: 0; }
        .nt-busy .nt-heatg, .nt-alert .nt-heatg { opacity: 1; }
        .nt-busy .nt-heat, .nt-alert .nt-heat { animation: nt-rise 1.6s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes nt-rise { 0% { opacity: 0; transform: translateY(4px); } 30% { opacity: .9; } 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes nt-blink { 50% { opacity: 0.15; } }
        @keyframes nt-flick { 0%, 100% { opacity: 1; } 30% { opacity: 0.1; } 55% { opacity: 1; } 70% { opacity: 0.2; } }
        @keyframes nt-breathe { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.8; } }
        @keyframes nt-spin { to { transform: rotate(360deg); } }
        @keyframes nt-spinstop { 0% { transform: rotate(0); } 55%, 100% { transform: rotate(900deg); } }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
  `,
};
}
