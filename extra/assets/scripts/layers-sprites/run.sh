#!/bin/bash

node --loader ts-node/esm --no-warnings=ExperimentalWarning ./01-resize-thumbnails.ts
node --loader ts-node/esm --no-warnings=ExperimentalWarning ./02-compose-sprite.ts
