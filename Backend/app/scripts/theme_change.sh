#!/bin/bash

# $1 - theme name
# $2 - theme git url if exists 


echo "changing theme to $1"

$HOME/.local/share/omarchy/bin/omarchy-theme-install "$2"

echo "Theme $1 installed and applied successfully"
