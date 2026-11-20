#!/usr/bin/env python3
"""Regenerate the README assets in docs/.

    python3 tools/capture.py screenshots   # docs/screenshot.png + .fr.png
    python3 tools/capture.py gifs          # docs/family-*.gif + .fr.gif
    python3 tools/capture.py gifs network  # one family only
    python3 tools/capture.py all

Two things make this harder than pointing a browser at the demo page.

The gallery has no fixed size: it is a responsive grid, so a window big enough
never frames it tightly and a window sized by hand clips a column the day a
label grows. The capture is therefore taken deliberately oversized and cropped
back to the content, giving the page its own 32px padding back. That is what
reproduces the committed assets to the pixel.

CSS animations do not advance under --virtual-time-budget: it moves timers, not
the compositor's clock. A GIF captured by waiting between frames comes out
completely static, which is exactly how the first animated GIFs shipped. The
demo page takes ?phase=<ms> and pins every animation to that offset through the
Web Animations API, so each frame is captured at a chosen point of the cycle and
the result actually moves.

The screenshots come back at exactly the committed size, 1628x1936 and
1628x1921. The animated strip lands within a few pixels of the committed one:
the remainder is content rather than framing, since the demo prints a clock
time that moves and label widths differ from one run to the next.

Needs Chrome and Pillow. No other dependency, on purpose.
"""

import os
import http.server
import functools
import socketserver
import subprocess
import sys
import threading
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = int(os.environ.get("CAPTURE_PORT", 8801))

# The page gives itself 32px of padding, handed back after cropping to the
# content so the framing matches what the demo page itself shows.
# The README shows the gallery as wide as its column, like the animated strip.
# Rendering at 1 keeps it sharp on a high-density screen, and rendering at size
# beats shrinking afterwards: the page is drawn at the size it is saved, so the
# flat colours stay flat and the palette holds.
SCALE = 1

# The animated gallery, one GIF per family of appliances, each a full grid of
# its own. The cards keep the same width in every family, so the GIFs line up
# in the README even though their grids differ. A few variants (the iron
# alone, the round and two-bowl feeders, a wallbox giving energy back) fill
# the grids out.
FAMILIES = (
    ("laundry", "washer,dryer,dishwasher,iron,steam_generator", 5),
    ("grills", "pg_timberline_off,pg_timberline_cook,pg_timberline_smoke,pg_timberline_probe,pg_drum_preheat,pg_drum_cook,pg_cart_cook,pg_vertical_smoke", 4),
    ("kitchen", "oven,microwave,hood,cooktop,fridge,kettle,cooker,coffee,coffee_black,rice_cooker,air_fryer,toaster", 6),
    ("climate", "water_heater,boiler,boiler_window,heat_pump,pellet_stove,space_heater,towel_warmer,towel_panel,air_conditioner,dehumidifier,humidifier,humidifier_night,humidifier_empty,humidifier_lifted", 5),
    ("thermostats", "boiler_thermo,th_square,th_round,th_glass,th_valve", 5),
    ("air", "air_purifier,box_purifier,ring_purifier,fan,ceiling_fan", 5),
    ("pets", "pet_feeder,round_feeder,double_feeder,dual_feeder,wet_feeder,pet_fountain,round_fountain", 3),
    ("garage", "ev_charger,ev_discharging,printer_3d,printer_bambu,printer_centauri,printer_a1,printer_neptune,printer_ams,printer_ams_top,dryer_1,dryer_2,dryer_4", 4),
    ("mobility", "mob_scooter,mob_offroad,mob_ebike,mob_gyropode,mob_motorcycle,mob_unplugged", 3),
    ("network", "net_switch,net_nas,net_server,net_rack,net_router", 5),
    ("network-models", "net_sw8,net_sw16,net_sw24,net_sw32,net_nas1,net_nas2,net_nas4,net_nas8", 4),
    ("robots", "robot_vacuum,robot_emptying,robot_box,robot_box_gold,robot_mop,robot_drying,robot_mower,robot_navimow,robot_rain,robot_stick,robot_washer", 4),
    ("pool", "pool_running,pool_chlorine,pool_backwash,pool_frost,pool_light,pool_error", 6),
    ("energy", "solar_day,solar_roof,solar_night,battery_charging,battery_station,battery_low", 6),
    ("scales", "scale_fresh,scale_goal,scale_old", 3),
    ("ups", "ups_online,ups_charging,ups_battery,ups_low,ups_replace,ups_off", 6),
    ("diffusers", "dif_drop,dif_cone,dif_stone,dif_flame,dif_nebulizer,dif_plugin", 6),
    ("ventilation", "hrv_diagram,hrv_one_duct,hrv_pair,hrv_bypass,hrv_single,hrv_single_box,hrv_basement,hrv_basement_shut", 4),
    ("cameras", "cam_indoor,cam_tube,cam_outdoor,cam_dome,cam_trackmix,cam_trackmix_day,tmx_person,tmx_vehicle,tmx_siren,cam_privacy,cam_offline", 4),
    ("lamps", "lamp_bulb,lamp_bedside,lamp_floor,lamp_torch,lamp_pendant,lamp_strip,lamp_spots,lamp_panels,lamp_desk,lamp_wall", 5),
    ("mailboxes", "mb_through,mb_postman,mb_collect,mb_right,mb_3d,mb_3d_open,mb_3d_back,mb_3d_green,mb_classic,mb_classic_open,cam_doorbell,cam_doorbell_idle", 4),
    ("litter", "lit_globe,lit_globe_clean,lit_globe_cat,lit_box,lit_box_clean,lit_box_full", 3),
    ("watering", "irr_sprinkler,irr_rain,irr_tap,irr_tap_off,irr_sonoff,irr_sonoff_pipe,irr_drip,irr_flowers", 4),
    ("detectors", "det_smoke,det_smoke_alarm,det_co,det_co_alarm,det_leak,det_leak_alarm,det_door,det_door_open,det_door_aqara,det_door_hue,det_vib,det_vib_on,det_vib_tuya,det_glass,det_glass_on,det_glass_ajax,det_door_tamper,win_double_open,win_sliding,win_small,win_vibration,win_glass_break,door_garage,door_pocket_open,door_external_open", 4),
    ("speakers", "spk_smart,spk_mini,spk_one,spk_era100,spk_era300,spk_move,spk_five,spk_play,spk_roam,spk_bar,spk_ray,spk_amp,spk_port,spk_wave,spk_bose500,spk_ultra,spk_portable,spk_flex,spk_bosebar,spk_boseamp,spk_shelf,spk_dot,spk_dotmax,spk_nest,nest_black", 8),
    ("streamers", "str_appletv,str_cube,str_firestick,str_gts,str_cast,str_shield,str_shieldpro,str_roku,str_mibox,str_freebox,str_decoder,str_box,str_stick", 5),
    ("consoles", "con_ps1,con_ps2,con_ps3,con_ps4,con_ps4pro,con_ps5,con_xbox,con_x360,con_xone,con_xsx,con_xss,con_switch,con_switch2,con_lite,con_vita,con_nes,con_snes,con_n64,con_cube,con_wii,con_md", 5),
    ("climate_sensors", "ths_disc,ths_square,ths_cushion,ths_stick,ths_lcd_stand,ths_lcd_probe,ths_lcd_round", 4),
    ("co2", "co2_eink,co2_box,co2_netatmo,co2_module", 4),
    ("switchbot", "sb_co2,sb_co2_high,sb_pro,sb_meter,sb_plus,sb_outdoor", 3),
    ("covers", "cov_shutter,cov_shutter_closing,cov_shutter_closed,cov_blind,cov_venetian,cov_raffstore,cov_pergola,cov_awning", 4),
    ("fingerbots", "fb_plus,fb_charging,fb_held,fb_low,fb_switchbot,fb_switchbot_black,fb_classic", 4),
    ("valves", "vlv_aqara,vlv_aqara_closed,vlv_closing,vlv_tuya,vlv_gas,vlv_leak", 3),
    ("racks", "rack_box,rack_box_closed,rack_accordion,rack_accordion_closed,rack_frame,rack_frame_closed", 3),
    ("foodproc", "fp_tm31,fp_tm31_off,fp_tm6,fp_tm6_ready", 4),
    ("floodlights", "lamp_flood_pir,lamp_flood_pir_off,lamp_tree,lamp_tree_off", 4),
    ("hifi", "focal_bird_w,focal_bird_b,focal_od6_w,focal_od6_b,denon_on,denon_off", 3),
    ("screens", "scr_tv,scr_projector,scr_computer,scr_laptop,tab_wall,tab_frame,tab_portrait", 4),
    ("house", "nt_chest,nt_drawers,nt_booster,nt_sump,nt_sump_high,nt_floor,nt_floor_elec,nt_spa,nt_sauna,nt_aquarium,nt_linky,nt_tree,hd_hot,hd_ring", 4),
    ("winter", "win_pool,win_spa,win_poolbot,win_mower,win_sprinkler,win_flowers,win_tap,win_grill,win_fan", 3),
    ("heat_storage", "heat_tank,heat_tank_loading,heat_tank_low,heat_fws,heat_fws_draw,heat_fws_circ,heat_circ,heat_circ_wilo,heat_circ_fault,heat_circ_nodata,heat_sth,heat_sth_tubes,heat_sth_frost,heat_sth_stag,heat_wood,heat_wood_embers,heat_wood_cold,heat_wood_water", 5),
)
# Forty frames 120 ms apart over a 4.8 s loop, on a 128-colour palette. Most
# drawings move on 2.4 s, 1.6 s, 1.2 s or 0.8 s, which all fit 4.8 s whole: a
# 1.6 s loop cut the longer ones short and made them jump back at every turn.
# The README is also shown in HACS, often on a phone, hence no more frames.
GIF_FRAMES = 40
GIF_STEP_MS = 120
GIF_COLORS = 128
GIF_SCALE = 1
# The animated grids are cropped tighter than the screenshots. Keeping the page's full 32px
# on a band 1400 wide and 320 tall leaves it looking padded rather than framed.
GIF_PAD = 6
# The README shows each family as drawings alone, the name and the state
# under each, on narrow cards: the info lines were unreadable once the grid
# was shrunk to the width of a GitHub column. At most four cards a row, and
# the rows balanced, so a family of five or six reads as two even rows.
GIF_CARD_W = 200
GIF_ISIZE = 1.2


# Families whose drawings are wider than a card: fewer a row, wider cards.
# The ventilation units draw a whole duct diagram.
GIF_WIDE = {"ventilation": (2, 412)}
# Families whose loop is longer than 1.6 s: frames and their spacing. An
# electric ride's gauge fills in 5 s, and its fourth bar has to be seen.
# The litter boxes, the watering, the detectors and the speakers share one 7 s
# cycle, the litter box's full cleaning, every motion fitting it whole.
GIF_TIMING = {"grills": (20, 200), "mobility": (25, 200), "litter": (35, 200), "watering": (35, 200), "detectors": (35, 200), "speakers": (35, 200), "hifi": (35, 200), "consoles": (35, 200), "streamers": (35, 200)}


def gif_cols(count):
    # Four a row in every family, so the cards line up from one GIF to the
    # next; a family of three sits in the middle of the same width.
    return min(4, count)


# Every GIF is as wide as four cards and their gaps, the families of fewer
# centred in it, so the gallery reads as one column in the README.
GIF_GAP = 12
GIF_WIDTH = 4 * GIF_CARD_W + 3 * GIF_GAP + 2 * GIF_PAD


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def shoot(url, out, window=(1500, 1500), crop=True, scale=SCALE):
    # A profile of its own, so several captures can run side by side, and a
    # second try: a headless Chrome now and then exits before its screenshot.
    cmd = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
           f"--user-data-dir=/tmp/hac-capture-{PORT}",
           f"--force-device-scale-factor={scale}",
           f"--window-size={window[0]},{window[1]}",
           "--virtual-time-budget=5000", f"--screenshot={out}", url]
    for attempt in range(3):
        if subprocess.run(cmd, capture_output=True).returncode == 0:
            break
    else:
        subprocess.run(cmd, capture_output=True, check=True)
    im = Image.open(out).convert("RGB")
    if not crop:
        return im
    # The page background is one flat colour, so the content is whatever differs
    # from the top-left pixel.
    box = ImageChops.difference(im, Image.new("RGB", im.size, im.getpixel((2, 2)))).getbbox()
    if box is None:
        raise SystemExit(f"no content rendered at {url}")
    pad = 32 * scale
    l, t, r, b = box
    im = im.crop((max(0, l - pad), max(0, t - pad),
                  min(im.width, r + pad), min(im.height, b + pad)))
    squeeze(im, out)
    return im


def squeeze(im, out):
    """Write the PNG small enough to sit in a README.

    The gallery is flat colour: a handful of greys, the state colours and the
    appliances' own shading. An adaptive 256-colour palette holds all of it
    with no visible loss and cuts the file to a third, where recompressing the
    truecolour image saves nothing at all. Dithering is off on purpose, since
    it would scatter noise over the flat areas and grow the file back.
    """
    im.save(out)
    palette = im.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    tmp = out + ".pal"
    palette.save(tmp, format="PNG", optimize=True)
    if os.path.getsize(tmp) < os.path.getsize(out):
        os.replace(tmp, out)
    else:
        os.remove(tmp)


# The README opens on a poster: one drawing per appliance, eight a row,
# packed tight with its name, and under it how many models the card draws
# when there are several. The families further down show each one moving.
HEADER_SCALE = 2
POSTER = (
    ("washer", 1), ("dryer", 1), ("dishwasher", 1), ("iron", 2), ("oven", 1), ("microwave", 1), ("hood", 1), ("cooktop", 1),
    ("fridge", 7), ("kettle", 2), ("cooker", 1), ("coffee", 2), ("rice_cooker", 1), ("air_fryer", 3), ("toaster", 3), ("water_heater", 1),
    ("boiler", 2), ("heat_pump", 1), ("pellet_stove", 1), ("space_heater", 2), ("towel_warmer", 2), ("air_conditioner", 1), ("dehumidifier", 1), ("th_square", 4),
    ("air_purifier", 3), ("fan", 3), ("pet_feeder", 5), ("pet_fountain", 2), ("ev_charger", 1), ("printer_3d", 2), ("net_switch", 5), ("scr_tv", 8),
    ("robot_vacuum", 2), ("mob_poster", 5), ("robot_mower", 2), ("robot_stick", 1), ("robot_washer", 1), ("nt_pool", 1), ("pool_running", 1), ("nt_spa", 1),
    ("solar_day", 2), ("battery_charging", 2), ("ups_online", 1), ("nt_linky", 5), ("nt_booster", 2), ("nt_floor", 2), ("nt_sauna", 1), ("nt_aquarium", 1),
    ("scale_fresh", 1), ("hd_hot", 2), ("dif_drop", 5), ("hrv_one_duct", 5), ("cam_outdoor", 5), ("lamp_floor", 10), ("mb_classic", 2), ("nt_tree", 1),
    ("pg_timberline_cook", 4), ("irr_sprinkler", 2), ("lit_globe", 2), ("det_smoke", 3), ("spk_smart", 14), ("con_ps5", 20),
)


def screenshots():
    types = ",".join(k for k, _ in POSTER)
    models = ",".join(str(n) for _, n in POSTER)
    for lang, name in (("", "screenshot.png"), ("&lang=fr", "screenshot.fr.png")):
        out = DOCS / name
        im = shoot(f"http://127.0.0.1:{PORT}/docs/demo.html?view=types&only={types}&models={models}&cols=8{lang}"
                   f"&lines=0&poster=1&cw=136&gap=4&isize=1.05&phase=4500", str(out), window=(1400, 3000), scale=HEADER_SCALE)
        print(f"  {name}  {im.size[0]}x{im.size[1]}  {len(POSTER)} drawings")


def gifs(only=None):
    for slug, types, _ in FAMILIES:
        if only and slug != only:
            continue
        cols, card_w = GIF_WIDE.get(slug, (gif_cols(len(types.split(","))), GIF_CARD_W))
        for lang, name in (("", f"family-{slug}.gif"), ("&lang=fr", f"family-{slug}.fr.gif")):
            frames, box = [], None
            frames_n, step = GIF_TIMING.get(slug, (GIF_FRAMES, GIF_STEP_MS))
            for i in range(frames_n):
                phase = i * step
                tmp = DOCS / f".frame-{name}-{i}.png"
                url = (f"http://127.0.0.1:{PORT}/docs/demo.html"
                       f"?view=types&only={types}&cols={cols}&phase={phase}{lang}"
                       f"&lines=0&cw={card_w}&isize={GIF_ISIZE}")
                # Uncropped on purpose: every frame has to be cut to the same
                # box. Cropping each one to its own content makes the grid
                # jitter as a wisp of steam grows past the edge and shrinks.
                im = shoot(url, str(tmp), window=(cols * (card_w + 12) + 200, 1400), crop=False, scale=GIF_SCALE)
                if box is None:
                    b = ImageChops.difference(im, Image.new("RGB", im.size, im.getpixel((2, 2)))).getbbox()
                    if b is None:
                        raise SystemExit(f"no content rendered for {slug}")
                    box = (max(0, b[0] - GIF_PAD), max(0, b[1] - GIF_PAD),
                           min(im.width, b[2] + GIF_PAD), min(im.height, b[3] + GIF_PAD))
                cut = im.crop(box)
                if cut.width < GIF_WIDTH:
                    wide = Image.new("RGB", (GIF_WIDTH, cut.height), im.getpixel((2, 2)))
                    wide.paste(cut, ((GIF_WIDTH - cut.width) // 2, 0))
                    cut = wide
                frames.append(cut.convert("P", palette=Image.ADAPTIVE, colors=GIF_COLORS))
                tmp.unlink()
            out = DOCS / name
            frames[0].save(out, save_all=True, append_images=frames[1:],
                           duration=step, loop=0, optimize=True)
            print(f"  {name}  {frames[0].size[0]}x{frames[0].size[1]}  {os.path.getsize(out) // 1024} KB")


def main():
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what not in ("screenshots", "gifs", "all"):
        raise SystemExit(__doc__)
    httpd = serve()
    try:
        if what in ("screenshots", "all"):
            screenshots()
        if what in ("gifs", "all"):
            gifs(sys.argv[2] if len(sys.argv) > 2 else None)
    finally:
        httpd.shutdown()


if __name__ == "__main__":
    main()
