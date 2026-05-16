#!/bin/bash

echo "🚀 Setting up Omarchy Customizer..."

# update system
sudo pacman -Syu --noconfirm

# install dependencies
sudo pacman -S --noconfirm python python-pip nodejs npm git rsync


# backend setup
cd Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# frontend setup
cd ../Frontend
npm install
npm run build
mv dist ../


echo "✅ Setup complete!"