#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( dirname "$SCRIPT_DIR")"

cd $PROJECT_DIR/extra/osm-3s_v0.7.61
./overpass-stop.sh

cd $PROJECT_DIR/extra/openrouteservice
docker compose down
