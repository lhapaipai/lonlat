#!/bin/bash

node --loader ts-node/esm --no-warnings=ExperimentalWarning scripts/layers-sprites/01-resize-thumbnails.ts
node --loader ts-node/esm --no-warnings=ExperimentalWarning scripts/layers-sprites/02-compose-sprite.ts
