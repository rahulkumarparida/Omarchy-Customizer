#!/bin/bash

echo "Reloading complete hyprland."

omarchy-restart-waybar

omarchy-restart-swayosd

omarchy-restart-walker

# omarchy-refresh-hyprland

echo "Omarchy specific reloads are done."

hyprctl reload


echo "Complete reaload done"

exit 0
