#!/bin/bash

set -e

PROJECT_DIR=/mnt/partage/cartographie/osm-3s_v0.7.61

rm -rf /dev/shm/osm3s_areas
rm -rf /dev/shm/osm3s_osm_base

cd $PROJECT_DIR

rm -rf db/osm3s_osm_base
rm -rf db/osm3s_areas


nohup ./bin/dispatcher --osm-base --db-dir=./db &
nohup ./bin/dispatcher --areas --db-dir=./db &

