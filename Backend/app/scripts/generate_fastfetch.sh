#!/bin/bash
# Checks only if it exists or not and generates a config file
# Check if Fastfetch is installed
if ! command -v fastfetch &> /dev/null
then
    echo "Error: Fastfetch is not installed."
    exit 1
fi

# Generate the config file
# --gen-config creates ~/.config/fastfetch/config.jsonc
if fastfetch --gen-config &> /dev/null
then
    echo "Success: Configuration generated."
    exit 0
else
    echo "Error: Failed to generate configuration (it might already exist)."
    exit 0
fi

#  Rest will be scripted on the python files.