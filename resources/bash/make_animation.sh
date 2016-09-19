#!/bin/bash

# This script generates an animated GIF given a folder with a PNG secuence
# Will also add a 400 frames delay to last frame, so animation is paused before re-starting
# TODO 1: 400 frames delay optional and variable value
# TODO 2: Pass (or autodetect?) file type (now only expects PNGs)

# Check that ImageMagick is present (convert tool)
CONVERT_OK=$(which convert)

if [ -n "$CONVERT_OK" ]; then
    
    # 1 argument is required
    if [ ! -n "$1" ]; then
        
        echo "[ERR] Missing required argument (image path)"
        echo " - Usage: bash make_animation.sh ./path/to/imgs/"
        echo " - It will process all images in the folder and output an animated GIF file."
        exit 0
        
    else
        
        IMG_DIR="$1"
        
    fi
    
    # Check that passed argument is a valid directory
    if [ -d $IMG_DIR && "${IMG_DIR: -1}" != "/" ]; then
        
        IMG_DIR="$IMG_DIR/"
        
    fi
    
    ANIMATION=($(convert "$IMG_DIR*.png" -delay 16 -loop 0 "${IMG_DIR}animation.gif"))
    
    # Extend last frame (LAST_FRAME is just a placeholder):
    LAST_FRAME="$(exiftool -S -FrameCount "${IMG_DIR}animation.gif" | grep -o '[0-9]*')"
    LAST_FRAME=$(($LAST_FRAME-1))
    
    convert "${IMG_DIR}animation.gif" \( -clone $LAST_FRAME -set delay 400 \) -swap $LAST_FRAME,-1 +delete "${IMG_DIR}animation.gif"
    
    echo "All done!"
    exit 0

else

    echo "ImageMagick not present!"
    exit 1

fi
