#!/usr/bin/python

import os
from pathlib import Path
from argparse import ArgumentParser
import requests
import webbrowser
import shutil
import sys
import zipfile

fonts_dir = Path(os.path.dirname(os.path.realpath(__file__))).parent
tmp_dir = fonts_dir / 'tmp'


fontello_host = 'https://fontello.com'

id_file = fonts_dir / '.fontello'
scss_path = fonts_dir / 'dist/fontello.scss'
font_dir = fonts_dir / 'dist/fontello'


def open_browser():
    files = {
        'config': open(fonts_dir / 'config.json', 'rb')
    }
    response = requests.post(fontello_host, files=files)

    with open(id_file, 'w') as f:
        f.write(response.text)

    with open(id_file, 'r') as f:
        id = f.read()

    webbrowser.open(F"{fontello_host}/{id}")


def save_font():

    zip_file = tmp_dir / 'fontello.zip'
    zip_extraction_dir = tmp_dir / 'fontello-extraction'
    tmp_fonts_dir = tmp_dir / "fontello"

    if not (id_file).exists():
        print('run fontello.py open before')
        sys.exit(1)

    # Purge temp dirs
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)
    tmp_dir.mkdir(parents=True)

    if font_dir.exists():
        shutil.rmtree(font_dir)

    # Download File
    with open(id_file, 'r') as f:
        id = f.read()

    response = requests.get(F"{fontello_host}/{id}/get", stream=True)

    with open(zip_file, 'wb') as f:
        for chunk in response.iter_content(chunk_size=128):
            f.write(chunk)

    # Extract File
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        # one directory extracted
        # extra/fontello/tmp/fontello-extraction/fontello-[hash]/
        zip_ref.extractall(zip_extraction_dir)

    for directory in zip_extraction_dir.iterdir():
        # move this directory into
        # extra/fontello/tmp/fontello/
        directory.rename(tmp_fonts_dir)
        break

    # Copy files
    shutil.copyfile(tmp_fonts_dir / "config.json", fonts_dir / "config.json")
    shutil.copytree(tmp_fonts_dir / "font", font_dir, dirs_exist_ok=True)

    with open(tmp_fonts_dir / "css/fontello.css", 'r') as file:
        css_file_content = file.read()

    css_file_content = css_file_content.replace('../font', './fontello')

    with open(scss_path, 'w') as file:
        file.write(css_file_content)

    # extra actions
    project_dir = fonts_dir.parent.parent
    storybook_public_dir = project_dir / 'apps/storybook/public'
    shutil.copyfile(tmp_fonts_dir / "config.json", storybook_public_dir / "config.json")

    # cleanup
    shutil.rmtree(tmp_dir)


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        'action',
        choices=['open', 'save'],
        help="action to do"
    )
    args = parser.parse_args()

    if args.action == 'open':
        open_browser()
    else:
        save_font()
