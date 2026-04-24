#!/bin/bash

if [ ! -d "Backend/venv" ]; then
    echo "First time setup..."
    ./scripts/install.sh
fi

./scripts/run.sh