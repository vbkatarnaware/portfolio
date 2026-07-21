#!/bin/bash
set -e

echo "Generating Architecture SVG..."
npx -y @mermaid-js/mermaid-cli -i scratch/architecture.mmd -o public/artifacts/careeros/docs/careeros-architecture.svg -b transparent

echo "Generating User Flow SVG..."
npx -y @mermaid-js/mermaid-cli -i scratch/userflow.mmd -o public/artifacts/careeros/docs/careeros-user-flow.svg -b transparent

echo "SVGs successfully generated!"
