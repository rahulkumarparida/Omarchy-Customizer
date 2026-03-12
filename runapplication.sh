#!/bin/bash

echo "🚀 Starting both Python backend and React frontend..."

# ==========================================
# 1. Start Python Backend
# ==========================================
# Navigate to your backend directory
cd Backend || exit

# Optional: Activate your virtual environment if you use one
source venv/bin/activate 

# Run the backend (Replace with your actual start command, e.g., flask run, uvicorn main:app, etc.)
python run.py & 
BACKEND_PID=$!

echo "✅ Backend started with PID: $BACKEND_PID"

# Go back to the root directory
cd .. 

# ==========================================
# 2. Start React Frontend
# ==========================================
# Navigate to your frontend directory
cd Frontend || exit

# Run the frontend (Use 'npm run dev' if you are using Vite, or 'npm start' for Create React App)
npm run dev & 
FRONTEND_PID=$!

echo "✅ Frontend started with PID: $FRONTEND_PID"

# Go back to the root directory
cd ..

# ==========================================
# 3. Handle graceful shutdown (Ctrl+C)
# ==========================================
# This ensures that when you close the script, both servers actually die, 
# preventing "port already in use" errors next time.
# trap "echo -e '\n🛑 Stopping servers...'; kill $BACKEND_PID; kill $FRONTEND_PID; exit" SIGINT

# Keep the script running and wait for background processes
wait