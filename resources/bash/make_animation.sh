#!/bin/bash

# Extend last frame (LAST_FRAME is just a placeholder):

LAST_FRAME="$(exiftool -S -FrameCount $1 | grep -o '[0-9]*')"
LAST_FRAME=$(($LAST_FRAME-1))

DIR_NAME=$(dirname "$1")

convert "$1" \( -clone $LAST_FRAME -set delay 400 \) -swap $LAST_FRAME,-1 +delete "$DIR_NAME/animated2.gif"