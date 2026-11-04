// What each drawing is filed under: the laundry types share one, as the new
// types drawn by ntHtml do. The released card loads each drawing, with its
// CSS, from a file of its own the first time a card shows it.
function drawKeyOf(type) {
  if (type === "dishwasher") return "dishwasher";
  if (LAUNDRY_TYPES.includes(type)) return "laundry";
  if (NT_TYPES.includes(type)) return "nt";
  return type;
}

function illustrationHtml(type, ctx) {
  const cls = [
    ctx.spinning ? "spinning" : "",
    ctx.heating ? "heating" : "",
    ctx.lit ? "lit" : "",
    ctx.doorOpen ? "open" : "",
    ctx.done ? "done" : "",
    ctx.paused ? "paused" : "",
    ctx.phase && DISHWASHER_PHASES.has(ctx.phase) ? `phase-${ctx.phase}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const draw = drawingOf(drawKeyOf(type));
  return draw ? draw(cls, ctx, type) : "";
}

const DRAWINGS = {

  dishwasher: (cls, ctx) => {
    return `
        <div class="machine ${cls}">
          <div class="dw-body">
            <div class="dw-controls"><div class="dw-screen"></div></div>
            <div class="dw-cavity">
              <div class="dw-dishes" aria-hidden="true">
                <span class="dw-plate dw-plate-a"></span>
                <span class="dw-plate dw-plate-b"></span>
                <span class="dw-plate dw-plate-c"></span>
                <span class="dw-plate dw-plate-d"></span>
              </div>
              <div class="dw-rack"></div>
              <div class="dw-spray" aria-hidden="true"><span class="dw-spray-hub"></span></div>
              <div class="dw-drops" aria-hidden="true">
                <i class="dw-drop dw-drop-a"></i><i class="dw-drop dw-drop-b"></i>
                <i class="dw-drop dw-drop-c"></i><i class="dw-drop dw-drop-d"></i>
                <i class="dw-drop dw-drop-e"></i>
              </div>
              <div class="dw-water" aria-hidden="true">
                <span class="dw-wave dw-wave-a"></span><span class="dw-wave dw-wave-b"></span>
              </div>
                          </div>
            <div class="dw-heat" aria-hidden="true">
              <i class="dw-heat-a"></i><i class="dw-heat-b"></i><i class="dw-heat-c"></i><i class="dw-heat-d"></i><i class="dw-heat-e"></i>
            </div>
            <div class="dw-door ${ctx.doorOpen ? "open" : ""}" aria-hidden="true"></div>
          </div>
        </div>`;
  },

  laundry: (cls, ctx, type) => {
    // A washer-dryer empties its drum before it dries, so while it dries it is
    // a dryer: clothes turning in a warm drum. A spin empties it too, and the
    // clothes show, whirling with no water.
    const flags = [ctx.spinning ? "spinning" : "", ctx.drying ? "drying" : "", ctx.spinCycle ? "spin-cycle" : "", ctx.doorOpen ? "open" : ""].filter(Boolean).join(" ");
    return `
        <div class="machine ${flags}">${laundrySvg(type, { screen: ctx.display || "", turning: !!ctx.spinning, drying: !!ctx.drying, spinCycle: !!ctx.spinCycle, open: !!ctx.doorOpen })}</div>`;
  },

  pet_feeder: (_cls, ctx) => {
    // Five families, all drawn in one picture: the square tower (default),
    // the round tank, the double with two bowls, the two hoppers over one
    // split bowl, and the wet-food feeder with its turning tray.
    const layout = ctx.feederLayout || "";
    // Two hoppers empty one at a time. An empty state that names no hopper
    // (a fault that says "no food") empties both.
    const sides = layout !== "dual_split" || !ctx.feederEmpty ? []
      : ctx.feederEmptyA || ctx.feederEmptyB ? [ctx.feederEmptyA ? "empty-a" : "", ctx.feederEmptyB ? "empty-b" : ""]
      : ["empty-a", "empty-b"];
    const emptyA = sides.includes("empty-a"), emptyB = sides.includes("empty-b");
    const empty = !!ctx.feederEmpty && layout !== "dual_split";
    const d = {
      screen: ctx.feederScreen || "",
      feeding: !!ctx.feeding,
      served: !empty,
      servedA: !emptyA,
      servedB: !emptyB,
      lvl: pfLvl(ctx.feederFill, empty || emptyA),
      lvlB: pfLvl(ctx.feederFillB, emptyB),
    };
    const cls = [layout, ctx.feeding ? "feeding" : "", ctx.feederEmpty ? "empty" : "", ...sides, ctx.feederAlert ? "alert" : ""].filter(Boolean).join(" ");
    return `
        <div class="machine ${cls}">${pfSvg(layout, d)}${ctx.feederAlert ? `
          <div class="pf-cat" aria-hidden="true">
            <u class="ear l"><span></span></u><u class="ear r"><span></span></u>
            <u class="tail"></u>
            <b class="body"><span class="paw l"></span><span class="paw r"></span></b>
            <b class="head">
              <i class="whisk l"></i><i class="whisk r"></i>
              <i class="muzzle"></i>
              <i class="eye l"><span></span></i><i class="eye r"><span></span></i>
              <i class="nose"></i><i class="mouth l"></i><i class="mouth r"></i>
            </b>
          </div>
          <div class="pf-alert" aria-hidden="true"><i class="bar"></i><i class="dot"></i></div>` : ""}
        </div>`;
  },

  oven: (cls, ctx) => {
    return `
        <div class="machine ${cls}">${ovenSvg({ screen: ctx.display || "", heating: !!ctx.heating, lit: !!ctx.lit, open: !!ctx.doorOpen, dish: ctx.dish || 0 })}</div>`;
  },

  microwave: (cls, ctx) => {
    return `
        <div class="machine ${cls}">${microwaveSvg({ screen: ctx.display || "", running: !!ctx.spinning, open: !!ctx.doorOpen, dish: ctx.dish || 0 })}</div>`;
  },

  hood: (cls, ctx) => {
    const level = ctx.fanLevel || 0;
    const fanCls = `${level > 0 ? "fan" : ""} v${level} ${ctx.boost ? "boost" : ""}`;
    return `
        <div class="machine ${cls} ${fanCls}">
          <div class="hd-chimney"></div>
          <div class="hd-canopy"></div>
          <div class="hd-under"></div>
          <div class="hd-lamp l1"></div>
          <div class="hd-lamp l2"></div>
          <div class="hd-beam b1"></div>
          <div class="hd-beam b2"></div>
          <div class="hd-air a1"></div>
          <div class="hd-air a2"></div>
          <div class="hd-air a3"></div>
        </div>`;
  },

  nt: (cls, ctx) => ntHtml(cls, ctx.ntDraw || {}),
  fridge: (cls, ctx) => {
    // A chest or a drawer freezer frosts over while it cools, like the other
    // new drawings (nt-on).
    const nt = ctx.coldBox ? ` nt nt-k-${ctx.layout}${ctx.cooling !== false && !ctx.dark ? " nt-on" : ""}` : "";
    return `<div class="machine ${cls} ${ctx.ice ? "ice" : ""}${nt}">${fridgeHtml(ctx)}</div>`;
  },

  water_heater: (cls, ctx) => {
    // Hot water sits on top of a real tank, so the warm layer grows down from
    // the dome as the water heats: 15 degrees is a cold tank, 65 a full one.
    const hot = ctx.tankTemp === null || ctx.tankTemp === undefined
      ? 0 : Math.max(0, Math.min(1, (ctx.tankTemp - 15) / 50));
    const lcd = ctx.display ? `<div class="wh-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls}" style="--wh-hot: ${hot.toFixed(2)}">
          <div class="wh-bracket"></div>
          <div class="wh-tank">
            <div class="wh-glass">
              <div class="wh-water"></div>
              <div class="wh-hot"></div>
              <div class="wh-heat"><i class="wh-h1"></i><i class="wh-h2"></i><i class="wh-h3"></i></div>
              <div class="wh-coil"></div>
            </div>
          </div>
          ${lcd}
          <div class="wh-pipe cold"></div>
          <div class="wh-pipe hot"></div>
        </div>`;
  },

  thermostat: (cls, ctx) => {
    const d = ctx.thermo || { mode: "off", room: "", target: "", layout: "square" };
    return `
        <div class="machine ${cls} th-l-${d.layout} th-m-${d.mode}">${thermostatSvg(d)}</div>`;
  },

  boiler: (cls, ctx) => {
    const mode = ctx.boilerMode || "idle";
    const layout = ctx.boilerLayout === "window" ? "window" : "wall";
    // A burner waiting its turn is out, like one on standby.
    const flame = mode !== "idle" && mode !== "waiting";
    const lcd = ctx.display ? `<div class="bl-lcd">${esc(ctx.display)}</div>` : "";
    const svg = ctx.boilerThermo ? boilerWithThermo(boilerSvg(layout), ctx.boilerThermo) : boilerSvg(layout);
    return `
        <div class="machine ${cls} bl-l-${layout} mode-${mode} ${flame ? "flame" : ""} ${ctx.boilerThermo ? "bl-th" : ""}">${svg}${lcd}</div>`;
  },

  air_conditioner: (cls, ctx) => {
    // The flap opens a step per vane position, and the air reaches further
    // the lower it points. At rest the flap is closed whatever the vane says.
    const a = ctx.ac || {};
    const mode = a.mode || "off";
    const blowing = !["off", "idle", "defrost", "preheat"].includes(mode);
    const v = Number.isInteger(a.vane) ? a.vane : 3;
    const h = Number.isInteger(a.hvane) ? a.hvane : 0;
    const style = `--ac-flap: ${blowing ? v : 0}; --ac-reach: ${[0.45, 0.6, 0.75, 0.88, 1][v - 1]}; `
      + `--ac-skew: ${h * 15}deg; --ac-speed: ${AC_FAN_SECONDS[a.speed] || AC_FAN_SECONDS.medium}s`;
    const icon = AC_ICONS[a.icon] ? `<svg viewBox="0 0 24 24"><path d="${AC_ICONS[a.icon]}"/></svg>` : "";
    const leds = ["", ...(a.leds || [])].map((l) => `<i${l ? ` class="${l}"` : ""}></i>`).join("");
    const acCls = [`mode-${mode}`, a.icon ? `icon-${a.icon}` : "", blowing && a.swingV ? "swing-v" : "", blowing && a.swingH ? "swing-h" : ""]
      .filter(Boolean).join(" ");
    return `
        <div class="machine ${cls} ${acCls}" style="${style}">
          <div class="ac-unit">
            <div class="ac-seam"></div>
            <div class="ac-leds">${leds}</div>
            <div class="ac-lcd">${icon}<span>${esc(a.screen || "")}</span></div>
            <div class="ac-mouth"><div class="ac-flap"></div></div>
          </div>
          <div class="ac-frost"></div>
          <svg class="ac-air" viewBox="0 0 96 52">
            <g class="ac-stream">
              <path d="M20 2 C17 16 14 28 10 42"/><path d="M36 2 C35 18 34 32 32 48"/>
              <path d="M60 2 C61 18 62 32 64 48"/><path d="M76 2 C79 16 82 28 86 42"/>
            </g>
            <circle class="ac-drop d1" cx="26" cy="2" r="1.8"/><circle class="ac-drop d2" cx="48" cy="2" r="1.8"/><circle class="ac-drop d3" cx="70" cy="2" r="1.8"/>
          </svg>
        </div>`;
  },

  pet_fountain: (cls, ctx) => {
    // Without a level the tank keeps a resting height rather than reading as
    // empty. No water comes up a pump that is off or that has run dry.
    const f = ctx.fountain || {};
    const fill = f.low ? 12 : f.fill === null || f.fill === undefined ? 55 : Math.max(0, Math.min(100, Math.round(f.fill)));
    const led = f.offline ? "" : f.low ? "led-low" : f.due ? "led-due" : f.flowing ? "led-on" : "";
    const running = f.flowing && !f.low;
    const svg = ftSvg({ round: !!f.round, lvl: fill / 100, running, dry: !!f.low, low: !!f.low && !f.offline, due: !!f.due && !f.low && !f.offline });
    return `
        <div class="machine ${cls} ${running ? "flowing" : ""} ${f.low ? "ft-dry" : ""}${f.offline ? " ft-offline" : ""} ${led}">${svg}
        </div>`;
  },

  dehumidifier: (cls, ctx) => {
    // The tank keeps a resting level when the card cannot know one, rather
    // than reading a dehumidifier with no tank entity as an empty one.
    const d = ctx.dh || {};
    const mode = d.mode || "off";
    const fill = mode === "full" ? 100 : d.fill === null || d.fill === undefined ? 35 : Math.round(d.fill);
    return `
        <div class="machine ${cls} mode-${mode}" style="--dh-fill: ${fill}%">
          ${airFlow("dh-air", 40, 24, true)}
          <div class="dh-body"></div>
          <div class="dh-grille"></div>
          ${miniLcd("dh-lcd", d.icon, d.screen)}
          <div class="dh-led"></div>
          <div class="dh-seam"></div>
          <div class="dh-grip"></div>
          <div class="dh-win"><div class="dh-water"></div><div class="dh-drip"><i></i><i></i></div></div>
          <div class="dh-foot f1"></div><div class="dh-foot f2"></div>
        </div>`;
  },

  space_heater: (cls, ctx) => {
    const h = ctx.heater || {};
    const mode = h.mode || "off";
    if (h.layout === "oil") {
      return `
        <div class="machine ${cls} oil mode-${mode}">
          ${airFlow("ho-air", 58, 28, false)}
          <div class="ho-fins"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="ho-box"></div>
          ${miniLcd("ho-lcd", h.icon, "")}
          <div class="ho-knob"></div>
          <div class="ho-base"></div><div class="ho-wheel w1"></div><div class="ho-wheel w2"></div>
        </div>`;
    }
    return `
        <div class="machine ${cls} mode-${mode}">
          ${airFlow("hf-air", 42, 30, mode === "fan")}
          <div class="hf-body"></div>
          <div class="hf-handle"></div>
          ${miniLcd("hf-lcd", h.icon, h.screen)}
          <div class="hf-grill"><div class="hf-glow"></div><svg class="hf-fan" viewBox="0 0 24 24"><path d="${AC_ICONS.fan}"/></svg></div>
          <div class="hf-foot f1"></div><div class="hf-foot f2"></div>
        </div>`;
  },

  towel_warmer: (cls, ctx) => {
    const w = ctx.towel || {};
    const layout = w.layout === "panel" ? "panel" : "ladder";
    return `
        <div class="machine ${cls} tw-l-${layout} mode-${w.mode || "off"}">
          ${airFlow("tw-air", 52, 14, false)}
          ${towelSvg(layout)}
          ${airFlow("tw-steam", 30, 22, false)}
          ${miniLcd("tw-lcd", w.icon, w.screen)}
        </div>`;
  },

  air_fryer: (cls, ctx) => {
    const f = ctx.fryer || {};
    const mode = f.mode || "off";
    const layout = f.layout || "basket";
    const z1 = fryerZoneOf(mode);
    const z2 = fryerZoneOf(f.mode2 || mode);
    // A dual fryer is on as long as one of its baskets is.
    const shown = layout === "dual" && mode === "off" ? f.mode2 || "off" : mode;
    const drawer = (n, inner) => `<div class="af-gap g${n}"></div>`
      + `<div class="af-drawer d${n}">${inner}<div class="af-handle"><div class="af-btn"></div></div></div>`;
    const top = `<div class="af-body"></div><div class="af-vent"></div>${miniLcd("af-lcd", f.icon, f.screen)}`;
    const feet = `<div class="af-foot f1"></div><div class="af-foot f2"></div>`;
    if (layout === "dual") {
      return `
        <div class="machine ${cls} af-dual mode-${shown} z1-${z1} z2-${z2}">
          ${airFlow("af-air a1", 34, 22, false)}${airFlow("af-air a2", 34, 22, false)}
          ${top}<div class="af-vent v2"></div>
          <div class="af-led l1"></div><div class="af-led l2"></div>
          <div class="af-seam s1"></div><div class="af-seam s2"></div>
          ${drawer(1, `<div class="af-zn">1</div>`)}${drawer(2, `<div class="af-zn">2</div>`)}
          <div class="af-div"></div>${feet}
        </div>`;
    }
    const win = layout === "window"
      ? `<div class="af-win"><div class="af-glow"></div><div class="af-coil"></div><div class="af-fries"><i></i><i></i><i></i><i></i><i></i></div></div>`
      : "";
    return `
        <div class="machine ${cls} af-${layout} mode-${mode} z1-${z1}">
          ${airFlow("af-air a1", 40, 22, false)}
          ${top}<div class="af-led l1"></div><div class="af-seam s1"></div>
          ${drawer(1, win)}${feet}
        </div>`;
  },

  ev_charger: (cls, ctx) => {
    const e = ctx.ev || {};
    const shot = e.shot ? ` ${e.shot} from-${e.from}` : "";
    const since = e.shot ? `; --ev-since: ${e.since}s` : "";
    return `
        <div class="machine ${cls} mode-${e.mode || "unknown"}${e.plugged ? " plugged" : ""}${shot}" style="--ev-flow: ${e.flow || EV_FLOW_DEFAULT}s${since}">
          <svg class="ev-halo" viewBox="0 0 96 108" aria-hidden="true"><path class="eh-loop" d="M42 69 C42 104 69 104 69 57"/><path class="eh-out" d="M42 69 C42 96 50 102 70 102"/></svg>
          <svg class="ev-cable" viewBox="0 0 96 108" aria-hidden="true"><path class="ev-loop" d="M42 69 C42 104 69 104 69 57"/><path class="ev-out" d="M42 69 C42 96 50 102 70 102"/><g class="ev-energy"><path class="ev-live" d="M42 69 C42 96 50 102 70 102"/><path class="ev-flow" d="M42 69 C42 96 50 102 70 102"/></g></svg>
          <div class="ev-box"><div class="ev-face"><div class="ev-led"></div>
            <svg class="ev-bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 15H6L13 1V9H18L11 23V15Z"/></svg>
          </div></div>
          <div class="ev-plug">${EV_PLUG_PARTS}</div>
          <div class="ev-ghost">${EV_PLUG_PARTS}</div>
          <div class="ev-holster"></div>
        </div>`;
  },

  pellet_stove: (cls, ctx) => {
    // The hopper keeps a resting level when the card cannot know one, rather
    // than reading a stove with no level entity as an empty one.
    const s = ctx.stove || {};
    const fill = s.fill === null || s.fill === undefined ? 60 : Math.round(s.fill);
    const lcd = ctx.display ? esc(ctx.display) : "";
    return `
        <div class="machine ${cls} mode-${s.mode || "off"} ${s.empty ? "empty" : ""}" style="--ps-fill: ${fill}%">
          <div class="ps-smoke"><i></i><i></i></div>
          <div class="ps-air"><i class="a1"></i><i class="a2"></i><i class="a3"></i></div>
          <div class="ps-pipe"></div>
          <div class="ps-body"></div>
          <div class="ps-lid"></div>
          <div class="ps-lcd">${lcd}</div>
          <div class="ps-grille"></div>
          <div class="ps-door"><div class="ps-glass">
            <div class="ps-glow"></div><div class="ps-flame"></div><div class="ps-spark"></div>
            <div class="ps-ash"><i></i><i></i><i></i></div>
            <div class="ps-pot"></div><div class="ps-shine"></div>
          </div></div>
          <div class="ps-handle"></div>
          <div class="ps-hopper"><div class="ps-pellets"></div></div>
          <div class="ps-foot f1"></div><div class="ps-foot f2"></div>
        </div>`;
  },

  heat_pump: (cls, ctx) => {
    const mode = ctx.hpMode || "idle";
    // The fan turns whenever the pump works; it stops to defrost, as the real
    // one does while it melts the ice off its coil.
    const fan = ["space_heating", "hot_water", "cooling", "running"].includes(mode) && !ctx.compressorOff;
    // Water runs while the pump works a circuit: down the flow pipe and back
    // up the return, to the tank for hot water and to the emitter otherwise.
    const flowing = ["space_heating", "hot_water", "cooling"].includes(mode) && !ctx.compressorOff;
    const lcd = ctx.display ? `<div class="hp-lcd">${esc(ctx.display)}</div>` : "";
    const pipes = (circuit) => `<div class="hp-pipe ${circuit} flow"></div><div class="hp-pipe ${circuit} ret"></div>`;
    // A pump that heats no domestic hot water has no tank to draw, and what
    // takes its heat is a radiator or the floor.
    const tank = ctx.noTank ? "" : `
          ${pipes("tank")}
          <div class="hp-tank"><i></i></div>`;
    const emitter = ctx.underfloor
      ? `<div class="hp-floor"><i></i><i></i><i></i><div class="hp-slab"><div class="hp-coil"><b></b><b></b><b></b></div></div></div>`
      : `<div class="hp-rad"><i></i><i></i><i></i><i></i><i></i></div>`;
    return `
        <div class="machine ${cls} mode-${mode} ${fan ? "fan" : ""} ${flowing ? "flowing" : ""} ${ctx.noTank ? "no-tank" : ""} ${ctx.underfloor ? "underfloor" : ""}">
          <div class="hp-unit">
            <div class="hp-grille"><div class="hp-fan"></div><div class="hp-hub"></div><div class="hp-guard"></div><div class="hp-frost"></div></div>
            <div class="hp-side">${lcd}<div class="hp-fins"></div></div>
          </div>
          <div class="hp-foot f1"></div><div class="hp-foot f2"></div>${tank}
          ${pipes("rad")}
          ${emitter}
        </div>`;
  },

  printer_3d: (cls, ctx) => {
    const p = ctx.p3 || { layout: "enclosed", height: 0 };
    // The part grows with the job. On an enclosed printer the bed drops as it
    // grows, the head staying at the top; on an open frame the gantry climbs.
    const h = Math.round(Math.max(0, Math.min(1, p.height || 0)) * P3_PART_MAX);
    const lcd = ctx.display ? `<div class="p3-lcd">${esc(ctx.display)}</div>` : "";
    const flags = [
      `p3-${p.layout === "open" ? "open" : "enclosed"}`,
      `p3-part-${p.part || "cube"}`,
      p.moving ? "moving" : "",
      p.nozzleHot ? "nozzle-hot" : "",
      p.bedHot ? "bed-hot" : "",
      h > 0 ? "has-part" : "",
      p.parked ? "parked" : "",
    ].filter(Boolean).join(" ");
    const head = `<div class="p3-head"><div class="p3-nozzle"></div></div>`;
    // The whole part is drawn and only what is printed shows, from the bottom
    // up, the way a printer lays it down.
    const eye = p.part === "duck" ? `<b class="p3-eye"></b>` : "";
    const bed = `<div class="p3-bed"><div class="p3-part"><div class="p3-shape">${eye}<i></i></div></div></div>`;
    if (p.layout === "open") {
      return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px">
          <div class="p3-post l"></div>
          <div class="p3-post r"></div>
          <div class="p3-top"></div>
          <div class="p3-gantry">${head}</div>
          ${bed}
          <div class="p3-base">${lcd}<div class="p3-knob"></div></div>
        </div>`;
    }
    return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px">
          <div class="p3-case">
            <div class="p3-window">
              <div class="p3-rail"></div>
              ${head}
              ${bed}
              <div class="p3-glass"></div>
            </div>
            ${lcd}
            <div class="p3-knob"></div>
          </div>
          <div class="p3-foot f1"></div>
          <div class="p3-foot f2"></div>
        </div>`;
  },

  toaster: (cls, ctx) => toasterHtml(cls, ctx.toaster || {}),
  hair_dryer: (cls, ctx) => hairDryerHtml(cls, ctx.hairDryer || {}),
  network: (cls, ctx) => networkHtml(cls, ctx.network || {}),
  robot: (cls, ctx) => robotHtml(cls, ctx.robot || {}),
  pool_pump: (cls, ctx) => poolHtml(cls, ctx.pool || {}),
  solar: (cls, ctx) => solarHtml(cls, ctx.solar || {}),
  home_battery: (cls, ctx) => batteryHtml(cls, ctx.battery || {}),
  scale: (cls, ctx) => scaleHtml(cls, ctx.scale || {}),
  ups: (cls, ctx) => upsHtml(cls, ctx.ups || { segs: 0 }),
  camera: (cls, ctx) => cameraHtml(cls, ctx.camera || {}),
  lamp: (cls, ctx) => lampHtml(cls, ctx.lampDraw || {}),
  mailbox: (cls, ctx) => mailboxHtml(cls, ctx.mailbox || {}),
  diffuser: (cls, ctx) => diffuserHtml(cls, ctx.diffuser || {}),
  hrv: (cls, ctx) => hrvHtml(cls, ctx.hrv || {}),
  screen: (cls, ctx) => screenHtml(cls, ctx.screen || {}),
  air_purifier: (cls, ctx) => purifierHtml(cls, ctx.purifier || {}),
  fan: (cls, ctx) => fanHtml(cls, ctx.fan || {}),

  iron: (cls, ctx) => {
    const ir = ctx.iron || { mode: ctx.heating ? "heating" : "off", level: 3 };
    const d = { heating: ir.mode === "heating", ready: ir.mode === "ready", level: ir.level || 3, leftOn: !!ctx.leftOn, line: ctx.ironLine };
    return `
        <div class="machine ${cls} ${ctx.ironLayout} ${ctx.leftOn ? "left-on" : ""} ${d.ready ? "ready" : ""}">${ctx.ironLayout === "generator" ? generatorSvg(d) : ironSvg(d)}</div>`;
  },


  kettle: (cls, ctx) => {
    // No timer and no progress: the drawing is the whole readout.
    const layout = ctx.kettleLayout === "steel" ? "steel" : "classic";
    const lcd = ctx.display ? `<div class="kt-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls} kt-${layout} ${ctx.spinning ? "on" : ""}">
          ${kettleSvg(layout)}${lcd}
        </div>`;
  },

  cooker: (cls, ctx) => {
    const sp = ctx.speed || 0;
    return `
        <div class="machine ${cls} ${sp > 0 ? "mixing" : ""} s${sp}">${cookerSvg()}${ctx.display ? `<div class="rc-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },

  coffee: (cls, ctx) => {
    const layout = ctx.coffeeLayout === "black" ? "black" : "silver";
    const flags = [
      `cf-l-${layout}`,
      ctx.spinning ? "pouring" : "",
      ctx.noWater ? "no-water" : "",
      ctx.noBeans ? "no-beans" : "",
      ctx.trayFull ? "tray-full" : "",
      ctx.cups >= 2 ? "two-cups" : "",
      `st${ctx.strength || 3}`,
    ].filter(Boolean).join(" ");
    return `
        <div class="machine ${cls} ${flags}">${coffeeSvg(layout, ctx.cups >= 2, ctx.waterPct)}${ctx.display ? `<div class="cf-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },

  rice_cooker: (cls, ctx) => {
    return `
        <div class="machine ${cls} ${ctx.keepWarm ? "warm" : ""}">${riceSvg()}${ctx.display ? `<div class="rk-disp">${esc(ctx.display)}</div>` : ""}</div>`;
  },

  cooktop: (cls, ctx) => {
    const zones = ctx.zones || [];
    const zonesHtml = zones
      .map((z) => {
        const zc = [z.on ? "on" : "", z.max ? "max" : "", z.residual ? "residual" : ""]
          .filter(Boolean)
          .join(" ");
        const title = z.title ? ` title="${esc(z.title)}"` : "";
        return `<div class="ck-zone ${zc}" style="--zi:${z.intensity.toFixed(2)}"${title}>${esc(z.label || "")}</div>`;
      })
      .join("");
    const act = ctx.anyZoneOn ? "act" : "";
    return `
        <div class="machine ${cls}">
          <div class="ck-top">
            <div class="ck-zones g${ctx.zoneColumns || 2}">${zonesHtml}</div>
            <div class="ck-ctrl"><i class="${act}"></i><i class="${act}"></i><i class="${act}"></i></div>
            ${ctx.childLock ? `<div class="ck-lock"></div>` : ""}
          </div>
        </div>`;
  },
};

// @draw-access-begin
// In the source every drawing is at hand. The release replaces these with a
// loader that fetches a drawing's file the first time it is asked for, and
// with the list of drawings written out.
const DRAW_KEYS = Object.keys(DRAWINGS);
function drawingOf(key) {
  return DRAWINGS[key];
}
function drawCssOf(key) {
  return ILLUSTRATION_CSS[key];
}
// @draw-access-end

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

// What makes a card complete without a state entity: a fridge's probe, a
// feeder's control, a charger's plug, and so on. The editor asks for a state
// entity only when nothing else will do (#55).
function stateFreeSource(config) {
  // Every type but the fridge is defined by a state entity. A fridge has no
  // state to report: a temperature probe and a door contact on an ordinary
  // fridge are a complete configuration, and demanding a state entity would
  // only push people to point it at something meaningless.
  const fridgeOnly = config && FRIDGE_ONLY_FIELDS.some((f) => config[f]);
  const asFridge = config && (config.appliance_type === "fridge" || fridgeOnly);
  const hasFridgeSource = fridgeOnly ||
    (asFridge && !!(config.door_entity || config.power_entity));
  // Same for a pet feeder, and for the same reason: most of them report
  // nothing while they wait. A control to serve with, or a counter of what
  // was served, is a complete configuration.
  const feederOnly = config && FEEDER_ONLY_FIELDS.some((f) => config[f]);
  const asFeeder = config && (config.appliance_type === "pet_feeder" || feederOnly);
  const hasFeederSource = feederOnly || (asFeeder && !!config.start_entity);
  // And for a charger with no status to read: the plug says whether a car
  // is there, the power meter whether it charges.
  const asCharger = config && (config.appliance_type === "ev_charger" || EV_ONLY_FIELDS.some((f) => config[f]));
  const hasChargerSource = asCharger && !!(config.vehicle_entity || config.power_entity);
  // And for a screen: its plug's meter or one of its players is enough.
  const asScreen = config && (config.appliance_type === "screen" || SCREEN_ONLY_FIELDS.some((f) => config[f]));
  const hasScreenSource = asScreen && !!(config.power_entity || SCREEN_MEDIA_FIELDS.some((f) => config[f]));
  // And for a pool pump on a smart plug: the meter says whether it filters.
  const asPool = config && (config.appliance_type === "pool_pump" || POOL_ONLY_FIELDS.some((f) => config[f]));
  const hasPoolSource = asPool && !!config.power_entity;
  // And for panels, whose power is all there is to read, and a battery,
  // read from its level or its power.
  const asSolar = config && (config.appliance_type === "solar" || SOLAR_ONLY_FIELDS.some((f) => config[f]));
  const hasSolarSource = asSolar && !!config.power_entity;
  const asBattery = config && (config.appliance_type === "home_battery" || BATTERY_ONLY_FIELDS.some((f) => config[f]));
  const hasBatterySource = asBattery && !!(config.battery_entity || config.power_entity || config.charge_power_entity || config.discharge_power_entity);
  // And for a UPS: its input voltage says whether the mains is there.
  const asUps = config && (config.appliance_type === "ups" || UPS_ONLY_FIELDS.some((f) => config[f]));
  const hasUpsSource = asUps && !!(config.input_voltage_entity || config.battery_entity);
  // And for a pump, a heater, a tree on a smart plug: the meter says it runs.
  const hasNtSource = !!config && NT_TYPES.includes(config.appliance_type) && config.appliance_type !== "meter" && !!config.power_entity;
  return !!(hasFridgeSource || hasFeederSource || hasChargerSource || hasScreenSource || hasPoolSource
    || hasSolarSource || hasBatterySource || hasUpsSource || hasNtSource);
}

