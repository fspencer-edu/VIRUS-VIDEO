#!/bin/zsh
set -e

echo "Installing Remotion V6 animation packages using your project's Remotion version..."

npx remotion add @remotion/transitions
npx remotion add @remotion/paths
npx remotion add @remotion/rough-notation
npx remotion add @remotion/motion-blur

echo "Done. Start the studio with: npm run dev"
