#!/bin/bash

node scripts/town-74-mock/01-add-context.mjs
node scripts/town-74-mock/02-dedupe.mjs
node scripts/town-74-mock/03-add-population.mjs
node scripts/town-74-mock/04-format-geojson.mjs
