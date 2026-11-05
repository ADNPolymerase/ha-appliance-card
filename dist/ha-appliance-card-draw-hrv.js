// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The hrv drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
const HRV_PACE = { 1: "2.2s", 2: "1.4s", 3: ".7s" };
const hvLab = (x, y, temp, name, anchor) => `<text class="hv-t" x="${x}" y="${y}" text-anchor="${anchor}">${anchor === "start"
  ? `${temp} <tspan class="hv-n">${name}</tspan>` : `<tspan class="hv-n">${name}</tspan> ${temp}`}</text>`;
// Each fan turns on its own centre: the box of its blades is not centred on
// it, so the turn is set on the drawing's own coordinates.
const hvFan = (x, y, r, cls) => `<circle cx="${x}" cy="${y}" r="${r}" class="hv-fanbody"/><g class="hv-fan${cls ? ` ${cls}` : ""}" style="transform-origin:${x}px ${y}px">${[0, 120, 240].map((d) => `<path d="M${x} ${y} q${(r * 0.45).toFixed(1)} -${(r * 0.85).toFixed(1)} 0 -${(r * 0.85).toFixed(1)} q-${(r * 0.45).toFixed(1)} ${(r * 0.3).toFixed(1)} 0 ${(r * 0.85).toFixed(1)}z" transform="rotate(${d} ${x} ${y})"/>`).join("")}</g>`;
const hvBadges = (h, cx, y) => `<g class="hv-hum"><rect x="${cx - 34}" y="${y}" width="68" height="13" rx="6.5" fill="#1e88e5"/><path d="M${cx - 26} ${y + 2.5} C${cx - 24} ${y + 5.5} ${cx - 22.5} ${y + 7} ${cx - 22.5} ${y + 8.6} a3.5 3.5 0 0 1 -7 0 C${cx - 29.5} ${y + 7} ${cx - 28} ${y + 5.5} ${cx - 26} ${y + 2.5}Z" fill="#fff"/><text class="hv-badge" x="${cx + 4}" y="${y + 9.6}" text-anchor="middle">${h.humText || ""}</text></g>
<g class="hv-int"><rect x="${cx - 20}" y="${y}" width="40" height="13" rx="6.5" fill="#607d8b"/><circle cx="${cx - 12}" cy="${y + 6.5}" r="4" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M${cx - 12} ${y + 4} V${y + 6.5} L${cx - 10} ${y + 7.6}" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round"/><text class="hv-badge" x="${cx + 4}" y="${y + 9.6}" text-anchor="middle">INT</text></g>`;
const HRV_SVGS = {
  diagram: (h) => `<defs><linearGradient id="hv-g-fa" x1="0" x2="1"><stop offset="0" stop-color="#42a5f5"/><stop offset="1" stop-color="#ff9800"/></linearGradient>
<linearGradient id="hv-g-ex" x1="1" x2="0"><stop offset="0" stop-color="#ef5350"/><stop offset="1" stop-color="#78909c"/></linearGradient></defs>
<path d="M10 74 a9 9 0 0 1 4 -17 a11 11 0 0 1 20 3 a8 8 0 0 1 2 14 z" fill="#90caf9"/><path d="M208 64 L220 53 L232 64 V78 H208 Z" fill="#ef9a9a"/>
<rect x="62" y="20" width="112" height="92" rx="8" class="hv-box"/>
<path d="M118 36 L148 66 L118 96 L88 66 Z" fill="#2c3238" stroke="#7b858f"/>
<g class="hv-out"><g class="hv-through"><path class="hv-flow" d="M10 34 H62 C90 34 96 52 118 66 C140 80 146 98 174 98 H226" stroke="url(#hv-g-fa)"/><path class="hv-dash hv-ds" d="M10 34 H62 C90 34 96 52 118 66 C140 80 146 98 174 98 H226"/></g>
<g class="hv-bypass"><path class="hv-flow" d="M10 98 H226" stroke="#42a5f5"/><path class="hv-dash hv-ds" d="M10 98 H226"/></g>
<path class="hv-flow" d="M226 34 H174 C146 34 140 52 118 66 C96 80 90 98 62 98 H10" stroke="url(#hv-g-ex)"/><path class="hv-dash hv-de" d="M226 34 H174 C146 34 140 52 118 66 C96 80 90 98 62 98 H10"/></g>
<g class="hv-rc"><path class="hv-flow" d="M226 34 H170 C128 34 128 98 170 98 H226" stroke="#ff9800"/><path class="hv-dash hv-ds" d="M226 34 H170 C128 34 128 98 170 98 H226"/></g>
<path class="hv-damper" d="M58 27 L66 41 M58 91 L66 105"/>${hvFan(160, 98, 8, "hv-fs")}${hvFan(76, 98, 8, "hv-fe")}
${h.flowS ? `<text class="hv-n hv-cfm" x="160" y="85" text-anchor="middle">${h.flowS}</text>` : ""}${h.flowE ? `<text class="hv-n hv-cfm" x="76" y="85" text-anchor="middle">${h.flowE}</text>` : ""}
${hvLab(8, 26, h.t.o, "", "start")}${hvLab(228, 118, h.t.s, "", "end")}${hvLab(228, 26, h.t.e, "", "end")}${hvLab(8, 118, h.t.x, "", "start")}
<text class="hv-frost" x="118" y="16" text-anchor="middle">\u2744</text><g class="hv-filt"><circle cx="168" cy="27" r="6"/><text x="168" y="30.5" text-anchor="middle">!</text></g>${hvBadges(h, 118, 4)}`,
  one_duct: (h) => `<defs><linearGradient id="hv-g-fa" gradientUnits="userSpaceOnUse" x1="130" x2="182"><stop offset="0" stop-color="#42a5f5"/><stop offset="1" stop-color="#ff9800"/></linearGradient>
<linearGradient id="hv-g-ex" gradientUnits="userSpaceOnUse" x1="182" x2="130"><stop offset="0" stop-color="#ef5350"/><stop offset="1" stop-color="#78909c"/></linearGradient></defs>
<rect x="56" y="4" width="54" height="124" class="hv-wall"/><path d="M56 4 V128 M110 4 V128" stroke="#b7a68e"/>
<rect x="44" y="47" width="78" height="34" rx="3" class="hv-tube"/><path d="M44 64 H122" stroke="#aab3bb" stroke-width="1.4"/><path d="M44 43 V85 L36 81 V47 Z" fill="#9aa3ad"/>
<rect x="118" y="28" width="78" height="72" rx="7" class="hv-box"/>
<rect x="132" y="50" width="46" height="28" rx="2" fill="#3a4148" stroke="#7b858f"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${136 + i * 4} 51 V77" stroke="#7b858f" stroke-width=".7"/>`).join("")}
${hvFan(188, 56, 6.5, "hv-fs")}${hvFan(126, 72, 6.5, "hv-fe")}
${h.flowS ? `<text class="hv-n hv-cfm" x="188" y="47" text-anchor="middle">${h.flowS}</text>` : ""}${h.flowE ? `<text class="hv-n hv-cfm" x="126" y="86" text-anchor="middle">${h.flowE}</text>` : ""}
<g class="hv-through"><path class="hv-flow" d="M22 56 H214" stroke="url(#hv-g-fa)"/><path class="hv-dash hv-ds" d="M22 56 H214"/></g>
<g class="hv-bypass"><path class="hv-flow" d="M22 56 H124 C130 56 130 40 140 40 H170 C180 40 180 56 186 56 H214" stroke="#42a5f5"/><path class="hv-dash hv-ds" d="M22 56 H124 C130 56 130 40 140 40 H170 C180 40 180 56 186 56 H214"/></g>
<path class="hv-flow" d="M214 72 H22" stroke="url(#hv-g-ex)"/><path class="hv-dash hv-rev hv-de" d="M22 72 H214"/>
<path d="M214 50 l9 6 -9 6z" fill="#ff9800"/><path d="M22 66 l-9 6 9 6z" fill="#78909c"/>
<rect x="140" y="86" width="32" height="8" rx="1.5" fill="#0e1b2c"/><text class="hv-lcd" x="156" y="92.3" text-anchor="middle">${h.lcd}</text>
<g class="hv-filt"><circle cx="188" cy="34" r="6"/><text x="188" y="37.5" text-anchor="middle">!</text></g><text class="hv-frost" x="156" y="22" text-anchor="middle">\u2744</text>
${hvLab(4, 20, h.t.o, h.n.o, "start")}${hvLab(4, 114, h.t.x, h.n.x, "start")}${hvLab(232, 20, h.t.s, h.n.s, "end")}${hvLab(232, 114, h.t.e, h.n.e, "end")}${hvBadges(h, 157, 104)}`,
  // An extract-only unit: the box in the attic draws the stale air from the
  // kitchen and the bathroom through their ceiling vents and blows it out
  // over the roof, fresh air coming in through the windows' vents.
  single: (h) => `<defs><linearGradient id="hv-g-sx" gradientUnits="userSpaceOnUse" x1="0" y1="104" x2="0" y2="40"><stop offset="0" stop-color="#ff9800"/><stop offset="1" stop-color="#ef5350"/></linearGradient></defs>
<path d="M12 70 L118 10 L224 70 Z" fill="#f5efe6"/><path d="M6 72 L118 8 L230 72" fill="none" stroke="#8d6e63" stroke-width="4" stroke-linejoin="round"/>
<rect x="8" y="70" width="220" height="6" class="hv-wall"/><path d="M10 76 V128 M226 76 V128 M118 76 V128" stroke="#b7a68e" stroke-width="2"/>
<rect x="111" y="2" width="14" height="30" rx="2" class="hv-tube"/><path d="M106 4 H130" stroke="#7b858f" stroke-width="3" stroke-linecap="round"/>
<path d="M62 72 C62 50 78 44 92 44 M174 72 C174 50 158 44 144 44" fill="none" stroke="#c9d0d6" stroke-width="9" stroke-linecap="round"/>
<path d="M62 72 C62 50 78 44 92 44 M174 72 C174 50 158 44 144 44" fill="none" stroke="#e3e7ea" stroke-width="6" stroke-linecap="round"/>
<rect x="88" y="28" width="60" height="32" rx="5" class="hv-box"/>${hvFan(118, 44, 10, "hv-fe")}
<g class="hv-ins"><path class="hv-flow" d="M62 108 V76 C62 56 78 44 92 44" stroke="url(#hv-g-sx)"/><path class="hv-dash hv-de" d="M62 108 V76 C62 56 78 44 92 44"/>
<path class="hv-flow" d="M174 108 V76 C174 56 158 44 144 44" stroke="url(#hv-g-sx)"/><path class="hv-dash hv-de" d="M174 108 V76 C174 56 158 44 144 44"/>
<path class="hv-flow" d="M118 30 V2" stroke="#78909c"/><path class="hv-dash hv-de" d="M118 30 V2"/>
<path class="hv-flow" d="M-6 100 H30" stroke="#42a5f5"/><path class="hv-dash hv-de" d="M-6 100 H30"/><path class="hv-flow" d="M242 100 H206" stroke="#42a5f5"/><path class="hv-dash hv-de" d="M242 100 H206"/></g>
<ellipse cx="62" cy="77" rx="10" ry="2.6" fill="#eceff1" stroke="#90a4ae"/><ellipse cx="174" cy="77" rx="10" ry="2.6" fill="#eceff1" stroke="#90a4ae"/>
<rect x="6" y="95" width="8" height="10" rx="1" fill="#eceff1" stroke="#90a4ae"/><rect x="222" y="95" width="8" height="10" rx="1" fill="#eceff1" stroke="#90a4ae"/>
<g class="hv-filt"><circle cx="146" cy="30" r="6"/><text x="146" y="33.5" text-anchor="middle">!</text></g>
${h.t.o ? hvLab(4, 16, h.t.o, h.n.o, "start") : ""}${h.t.e ? hvLab(232, 16, h.t.e, h.n.e, "end") : ""}${hvBadges(h, 118, 112)}`,
  // The same extract unit drawn alone: its box, the fan behind its grille,
  // the vents' ducts coming in on one side and the outlet on the other.
  single_box: (h) => `<path d="M70 40 L84 28 H180 L166 40 Z" fill="#f7f9fa" stroke="#b9c1c8"/><path d="M166 40 L180 28 V84 L166 96 Z" fill="#cfd6dc" stroke="#b9c1c8"/>
<rect x="70" y="40" width="96" height="56" rx="5" class="hv-box"/>
${[50, 68, 86].map((y) => `<rect x="34" y="${y - 5}" width="38" height="10" rx="2" class="hv-tube"/><path d="M34 ${y - 6} V${y + 6} L30 ${y + 4} V${y - 4} Z" fill="#9aa3ad"/>`).join("")}
<rect x="172" y="44" width="40" height="16" rx="3" class="hv-tube"/><path d="M212 42 V62 L218 59 V45 Z" fill="#9aa3ad"/>
<g>${[50, 68, 86].map((y) => `<path class="hv-flow" d="M14 ${y} H70" stroke="#ff9800"/><path class="hv-dash hv-de" d="M14 ${y} H70"/>`).join("")}
<path class="hv-flow" d="M168 52 H222" stroke="#78909c"/><path class="hv-dash hv-de" d="M168 52 H222"/></g>
<path d="M222 46 l9 6 -9 6z" fill="#78909c"/>${[50, 68, 86].map((y) => `<path d="M6 ${y - 5} l9 5 -9 5z" fill="#ff9800"/>`).join("")}
<circle cx="118" cy="68" r="21" fill="#dfe4e8" stroke="#9aa3ad"/>${hvFan(118, 68, 15, "hv-fe")}
<circle cx="118" cy="68" r="21" fill="none" stroke="#7b858f" stroke-width=".8"/><circle cx="118" cy="68" r="14" fill="none" stroke="#7b858f" stroke-width=".6" opacity=".7"/><path d="M97 68 H139 M118 47 V89" stroke="#7b858f" stroke-width=".6" opacity=".7"/>
<circle class="hv-led" cx="156" cy="88" r="2.4"/>
<g class="hv-filt"><circle cx="160" cy="46" r="6"/><text x="160" y="49.5" text-anchor="middle">!</text></g>
${h.t.e ? hvLab(4, 16, h.t.e, h.n.e, "start") : ""}${h.t.o ? hvLab(232, 16, h.t.o, h.n.o, "end") : ""}${hvBadges(h, 118, 112)}`,
  pair: (h) => {
    const unit = (cy) => `<rect x="72" y="${cy - 12}" width="92" height="24" rx="3" class="hv-tube"/>${Array.from({ length: 18 }, (_, i) => `<rect x="${104 + (i % 6) * 5}" y="${cy - 7 + Math.floor(i / 6) * 5}" width="4" height="4" fill="#e9dccb" stroke="#bfae96" stroke-width=".5"/>`).join("")}
${hvFan(146, cy, 8.5)}<path d="M72 ${cy - 15} V${cy + 15} L64 ${cy + 12} V${cy - 12} Z" fill="#9aa3ad"/><rect x="164" y="${cy - 16}" width="6" height="32" rx="3" class="hv-box"/>`;
    const inF = (cy) => `<path class="hv-flow" d="M28 ${cy} H118" stroke="#42a5f5"/><path class="hv-flow" d="M118 ${cy} H200" stroke="#ff9800"/><path class="hv-dash" d="M28 ${cy} H200"/><path d="M200 ${cy - 6} l9 6 -9 6z" fill="#ff9800"/>`;
    const outF = (cy) => `<path class="hv-flow" d="M200 ${cy} H118" stroke="#ef5350"/><path class="hv-flow" d="M118 ${cy} H28" stroke="#78909c"/><path class="hv-dash hv-rev" d="M28 ${cy} H200"/><path d="M28 ${cy - 6} l-9 6 9 6z" fill="#78909c"/>`;
    return `<path d="M4 70 a9 9 0 0 1 4 -17 a11 11 0 0 1 20 3 a8 8 0 0 1 2 14 z" fill="#90caf9" opacity=".85"/><path d="M208 60 L220 49 L232 60 V74 H208 Z" fill="#ef9a9a" opacity=".85"/>
<rect x="80" y="4" width="76" height="124" class="hv-wall"/><path d="M80 4 V128 M156 4 V128" stroke="#b7a68e"/>${unit(34)}${unit(98)}
<g class="hv-pa">${inF(34)}${outF(98)}</g><g class="hv-pb">${outF(34)}${inF(98)}</g>
${hvLab(6, 16, h.t.o, "", "start")}${hvLab(230, 16, h.t.s, "", "end")}
<text class="hv-n" x="6" y="126">${h.n.out}</text><text class="hv-n" x="230" y="126" text-anchor="end">${h.n.room}</text>
<g class="hv-filt"><circle cx="118" cy="66" r="6"/><text x="118" y="69.5" text-anchor="middle">!</text></g>${hvBadges(h, 118, 58)}`;
  },
};
function hrvHtml(cls, h) {
  const layout = HRV_LAYOUTS.includes(h.layout) ? h.layout : "diagram";
  const live = !["off", "unav"].includes(h.mode) && !h.paused;
  const flags = ["hv", `hv-l-${layout}`, `hv-m-${h.mode || "unav"}`, live ? "hv-on" : "", h.bypass ? "hv-by" : "", h.defrost ? "hv-df" : "", h.filterDue ? "hv-fd" : "", h.dark ? "hv-dark" : "",
    h.sPace === "0s" ? "hv-sx" : "", h.ePace === "0s" ? "hv-ex" : "", h.humBadge ? "hv-hb" : ""].filter(Boolean).join(" ");
  const pace = HRV_PACE[h.level] || "1.4s";
  const fans = `${h.sPace && h.sPace !== "0s" ? `;--hv-sp:${h.sPace}` : ""}${h.ePace && h.ePace !== "0s" ? `;--hv-ep:${h.ePace}` : ""}`;
  return `
        <div class="machine ${cls} ${flags}" style="--hv-pace:${pace}${fans}"><svg class="hv-svg" viewBox="0 0 236 132">${HRV_SVGS[layout](h)}</svg></div>`;
}


return {
draw: (cls, ctx) => hrvHtml(cls, ctx.hrv || {}),
css: () => `
        .machine.hv{width:200px;height:112px}
        svg.hv-svg{position:absolute;left:0;top:0;width:200px;height:112px;overflow:hidden}
        .hv-box{fill:var(--ac-body,#f1f3f4);stroke:var(--ac-body-lo,#b9c1c8)}
        .hv-wall{fill:#d9cbb7}
        .hv-tube{fill:#eef1f3;stroke:#aab3bb}
        .hv-fanbody{fill:var(--ac-body-lo,#d5dade);stroke:#9aa3ad;stroke-width:.8}
        .hv-fan{transform-box:view-box}
        .hv-fan path{fill:#5d6873}
        .hv-on .hv-fan{animation:hv-spin var(--hv-pace,1.4s) linear infinite}
        .hv-flow{fill:none;stroke-width:5;stroke-linecap:round}
        .hv-dash{fill:none;stroke:#fff;stroke-width:2;stroke-dasharray:4 8;opacity:.75}
        .hv-on .hv-dash{animation:hv-flow var(--hv-pace,1.4s) linear infinite}
        .hv-on .hv-dash.hv-rev{animation-name:hv-flowr}
        .hv-on .hv-fan.hv-fs,.hv-on .hv-dash.hv-ds{animation-duration:var(--hv-sp,var(--hv-pace,1.4s))}
        .hv-on .hv-fan.hv-fe,.hv-on .hv-dash.hv-de{animation-duration:var(--hv-ep,var(--hv-pace,1.4s))}
        .hv-sx .hv-fs,.hv-sx .hv-ds,.hv-ex .hv-fe,.hv-ex .hv-de{animation-play-state:paused}
        .hv-rc,.hv-damper{display:none}
        .hv-m-rec .hv-rc{display:inline}
        .hv-m-rec .hv-damper{display:inline;fill:none;stroke:#5d6873;stroke-width:2.4;stroke-linecap:round}
        .hv-m-rec .hv-out{opacity:.12}
        .hv-hum,.hv-int{display:none}
        .hv-hb .hv-hum,.hv-m-inter .hv-int{display:inline}
        .hv-badge{font:700 8px Arial,sans-serif;fill:#fff}
        .machine.hv:not(.hv-on) .hv-flow{opacity:.2}
        .machine.hv:not(.hv-on) .hv-dash{display:none}
        .hv-bypass{display:none}
        .hv-by .hv-bypass{display:inline}
        .hv-by .hv-through{opacity:.15}
        .hv-frost{display:none;font-size:12px;fill:#4fc3f7}
        .hv-df .hv-frost{display:inline;animation:hv-breathe 1.6s ease-in-out infinite}
        .hv-led{fill:#9e9e9e}
        .hv-on .hv-led{fill:#43a047}
        .hv-filt{display:none}
        .hv-filt circle{fill:#ff9800}
        .hv-filt text{font:700 9px Arial,sans-serif;fill:#fff}
        .hv-fd .hv-filt{display:inline;animation:hv-blink 1s steps(1) infinite}
        .hv-t{font:600 9px Arial,sans-serif;fill:var(--primary-text-color,#212121)}
        .hv-n{font:400 8px Arial,sans-serif;fill:var(--secondary-text-color,#727272)}
        .hv-cfm{font-size:7.5px;font-weight:600}
        .hv-lcd{font:700 6px Arial,sans-serif;fill:#7fe3ff}
        .hv-pa,.hv-pb{opacity:0}
        .hv-on .hv-pa{animation:hv-pa 140s linear infinite;animation-delay:var(--anim-offset,0s)}
        .hv-on .hv-pb{animation:hv-pb 140s linear infinite;animation-delay:var(--anim-offset,0s)}
        .machine.hv-m-unav{opacity:.45;filter:grayscale(1)}
        @keyframes hv-spin{to{transform:rotate(360deg)}}
        @keyframes hv-flow{to{stroke-dashoffset:-24}}
        @keyframes hv-flowr{to{stroke-dashoffset:24}}
        @keyframes hv-breathe{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes hv-blink{50%{opacity:.15}}
        @keyframes hv-pa{0%,49.5%{opacity:1}50%,100%{opacity:0}}
        @keyframes hv-pb{0%,49.5%{opacity:0}50%,100%{opacity:1}}
        @media (prefers-reduced-motion: reduce) { .machine.hv * { animation-name: none !important; } .hv-on .hv-pa{opacity:1} }
  `,
};
}
