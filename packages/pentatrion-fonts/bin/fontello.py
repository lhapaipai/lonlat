#!/usr/bin/python

import os
from pathlib import Path
from argparse import ArgumentParser
import webbrowser
import shutil
import sys
import zipfile
import requests

fonts_dir = Path(os.path.dirname(os.path.realpath(__file__))).parent
tmp_dir = fonts_dir / "tmp"


fontello_host = "https://fontello.com"

contexts = {
    "lonlat": {
        "file": "config-lonlat.json",
        "id_file": fonts_dir / ".fontello-lonlat",
        "css_file": fonts_dir / "fontello-lonlat.css",
        "font_dir": fonts_dir / "dist/fontello-lonlat",
        "css_replace_str": "./dist/fontello-lonlat",
    },
    "geo": {
        "file": "config-geo.json",
        "id_file": fonts_dir / ".fontello-geo",
        "css_file": fonts_dir / "fontello-geo.css",
        "font_dir": fonts_dir / "dist/fontello-geo",
        "css_replace_str": "./dist/fontello-geo",
    },
}

fontello_id = None


def open_browser(context):
    files = {"config": open(fonts_dir / context["file"], "rb")}
    response = requests.post(fontello_host, files=files, timeout=60)

    fontello_id = response.text

    with open(context["id_file"], "w", encoding="utf8") as f:
        f.write(fontello_id)

    webbrowser.open(f"{fontello_host}/{fontello_id}")


def save_font(context):
    zip_file = tmp_dir / "fontello.zip"
    zip_extraction_dir = tmp_dir / "fontello-extraction"
    tmp_fonts_dir = tmp_dir / "fontello"

    if not (context["id_file"]).exists():
        print("run fontello.py open before")
        sys.exit(1)

    # Purge temp dirs
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)
    tmp_dir.mkdir(parents=True)

    if context["font_dir"].exists():
        shutil.rmtree(context["font_dir"])

    # Download File
    with open(context["id_file"], "r", encoding="utf8") as f:
        fontello_id = f.read()

    response = requests.get(
        f"{fontello_host}/{fontello_id}/get", stream=True, timeout=60
    )

    with open(zip_file, "wb") as f:
        for chunk in response.iter_content(chunk_size=128):
            f.write(chunk)

    # Extract File
    with zipfile.ZipFile(zip_file, "r") as zip_ref:
        # one directory extracted
        # extra/fontello/tmp/fontello-extraction/fontello-[hash]/
        zip_ref.extractall(zip_extraction_dir)

    for directory in zip_extraction_dir.iterdir():
        # move this directory into
        # extra/fontello/tmp/fontello/
        directory.rename(tmp_fonts_dir)
        break

    # Copy files
    shutil.copyfile(tmp_fonts_dir / "config.json", fonts_dir / context["file"])
    shutil.copytree(tmp_fonts_dir / "font", context["font_dir"], dirs_exist_ok=True)

    with open(tmp_fonts_dir / "css/fontello.css", "r", encoding="utf8") as file:
        css_file_content = file.read()

    css_file_content = css_file_content.replace("../font", context["css_replace_str"])

    with open(context["css_file"], "w", encoding="utf8") as file:
        file.write(css_file_content)

    # cleanup
    shutil.rmtree(tmp_dir)


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("action", choices=["open", "save"], help="action to do")
    parser.add_argument(
        "context",
        choices=["lonlat", "geo"],
        help="geo only for pentatrion-geo",
        default="lonlat",
    )
    args = parser.parse_args()

    if args.action == "open":
        open_browser(contexts[args.context])
    else:
        save_font(contexts[args.context])
