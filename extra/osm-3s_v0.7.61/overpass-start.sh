#!/bin/bash

set -e

PROJECT_DIR=/mnt/partage/cartographie/osm-3s_v0.7.61
cd $PROJECT_DIR

nohup ./bin/dispatcher --osm-base --db-dir=./db &
nohup ./bin/dispatcher --areas --db-dir=./db &

