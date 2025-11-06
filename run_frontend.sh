#!/bin/bash

# Simple frontend runner script

cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install --legacy-peer-deps
fi

# Run the frontend
npm run dev

