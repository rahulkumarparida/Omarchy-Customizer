#!/bin/bash

# Ensure all 4 arguments are provided
if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <git_repo> <temp_dir> <config_dir> <theme_name>"
    exit 1
fi

git_repo=$1
temp_dir=$2
config_dir=$3
theme_name=$4

echo "Changing waybar theme...$theme_name"


if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed."
    echo "Please install Git: [Git Installation Guide](https://github.com)"
    exit 1 
fi

git clone "$git_repo" "$temp_dir" || { echo "Clone failed"; exit 1; }

echo "cloning done, Changing the waybar configs..."

mkdir -p "$config_dir"
cp -rf "$temp_dir/config/$theme_name/." "$config_dir" && rm -rf "$temp_dir"

echo "Copying done"

omarchy-restart-waybar