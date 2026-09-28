#!/bin/zsh
set -e

mkdir -p out
npx remotion render AndesHantavirus out/andes-hantavirus-final.mp4 --codec=h264 --crf=18

echo "Rendered to out/andes-hantavirus-final.mp4"
