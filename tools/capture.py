#!/usr/bin/env python3
"""Regenerate the README assets in docs/.

    python3 tools/capture.py screenshots   # docs/screenshot.png + .fr.png
    python3 tools/capture.py gifs          # docs/family-*.gif + .fr.gif
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
PORT = 8801

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
    ("kitchen", "oven,microwave,hood,cooktop,fridge,kettle,cooker,coffee,rice_cooker,air_fryer", 5),
    ("climate", "water_heater,boiler,heat_pump,pellet_stove,space_heater,towel_warmer,air_conditioner,dehumidifier", 4),
    ("pets", "pet_feeder,round_feeder,double_feeder,dual_feeder,wet_feeder,pet_fountain", 3),
    ("garage", "ev_charger,ev_discharging,printer_3d", 3),
)
# Sixteen frames a tenth of a second apart over a 1.6 s loop, on a 128-colour
# palette: the five families weigh about 1.4 MB per language, where 32 frames
# at 20 per second weighed 5.5 MB for motion barely smoother to the eye. The
# README is also shown in HACS, often on a phone.
GIF_FRAMES = 16
GIF_STEP_MS = 100
GIF_COLORS = 128
GIF_SCALE = 1
# The animated grids are cropped tighter than the screenshots. Keeping the page's full 32px
# on a band 1400 wide and 320 tall leaves it looking padded rather than framed.
GIF_PAD = 6


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
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
         f"--force-device-scale-factor={scale}",
         f"--window-size={window[0]},{window[1]}",
         "--virtual-time-budget=5000", f"--screenshot={out}", url],
        capture_output=True, check=True)
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


def screenshots():
    for lang, name in (("", "screenshot.png"), ("&lang=fr", "screenshot.fr.png")):
        out = DOCS / name
        # Seven columns of four: twenty-eight cards fill the band exactly,
        # and a wide band reads better than a ragged square. 7 x 300 px and
        # six gaps of 24 make 2244 px, plus the page's padding.
        im = shoot(f"http://127.0.0.1:{PORT}/docs/demo.html?view=types{lang}", str(out), window=(2400, 2300))
        print(f"  {name}  {im.size[0]}x{im.size[1]}")


def gifs():
    for slug, types, cols in FAMILIES:
        for lang, name in (("", f"family-{slug}.gif"), ("&lang=fr", f"family-{slug}.fr.gif")):
            frames, box = [], None
            for i in range(GIF_FRAMES):
                phase = i * GIF_STEP_MS
                tmp = DOCS / f".frame-{i}.png"
                url = (f"http://127.0.0.1:{PORT}/docs/demo.html"
                       f"?view=types&only={types}&cols={cols}&phase={phase}{lang}")
                # Uncropped on purpose: every frame has to be cut to the same
                # box. Cropping each one to its own content makes the grid
                # jitter as a wisp of steam grows past the edge and shrinks.
                im = shoot(url, str(tmp), window=(cols * 324 + 200, 1400), crop=False, scale=GIF_SCALE)
                if box is None:
                    b = ImageChops.difference(im, Image.new("RGB", im.size, im.getpixel((2, 2)))).getbbox()
                    if b is None:
                        raise SystemExit(f"no content rendered for {slug}")
                    box = (max(0, b[0] - GIF_PAD), max(0, b[1] - GIF_PAD),
                           min(im.width, b[2] + GIF_PAD), min(im.height, b[3] + GIF_PAD))
                frames.append(im.crop(box).convert("P", palette=Image.ADAPTIVE, colors=GIF_COLORS))
                tmp.unlink()
            out = DOCS / name
            frames[0].save(out, save_all=True, append_images=frames[1:],
                           duration=GIF_STEP_MS, loop=0, optimize=True)
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
            gifs()
    finally:
        httpd.shutdown()


if __name__ == "__main__":
    main()
