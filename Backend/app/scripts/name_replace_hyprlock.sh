#!/bin/bash

# Hyprlock Config File location
CONFIG_FILE="$HOME/.config/hypr/hyprlock.conf"

# Get username
USERNAME=$(whoami)

# Capitalize the first letter
USERNAME_FORMATTED="$(tr '[:lower:]' '[:upper:]' <<< ${USERNAME:0:1})${USERNAME:1}"

# Replace text
sed -i "s|text = Vivek Rajan|text = $USERNAME|g" "$CONFIG_FILE"