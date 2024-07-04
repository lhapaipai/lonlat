#!/bin/bash

set -e

PROJECT_DIR=/mnt/partage/cartographie/osm-3s_v0.7.61

cd $PROJECT_DIR

./bin/dispatcher --osm-base --terminate
./bin/dispatcher --areas --terminate
