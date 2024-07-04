#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $SCRIPT_DIR/osm-3s_v0.7.61
./overpass-start.sh

cd $SCRIPT_DIR/openrouteservice
docker compose up -d
