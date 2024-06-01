#!/usr/bin/python

import base64
import os
from pathlib import Path
from textwrap import dedent


fonts_dir = Path(os.path.dirname(os.path.realpath(__file__))).parent

woff2_file = fonts_dir / "dist/fontello-geo/fontello.woff2"
dest_path = fonts_dir / "../pentatrion-geo/fontello-geo-inline.css"
with open(dest_path, "w") as fd_dst:
    with open(woff2_file, "rb") as fd_src:
        data = base64.b64encode(fd_src.read())
    content = dedent(
        f"""\
        @font-face {{
          font-family: 'fontello-geo';
          src: url(data:font/woff2;base64,{data.decode()});
          font-weight: normal;
          font-style: normal;
        }}
        """
    )
    fd_dst.write(content)
