#!/bin/bash

# Simple backend runner script

cd "$(dirname "$0")/backend" || exit 1

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "Using existing virtual environment..."
    source venv/bin/activate || {
        echo "Failed to activate venv, recreating..."
        rm -rf venv
        python3 -m venv venv
        source venv/bin/activate
    }
else
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
fi

# Upgrade pip and install build tools
echo "Upgrading pip and build tools..."
pip install --upgrade pip setuptools wheel

# Install dependencies
if [ ! -f "venv/.installed" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    touch venv/.installed
else
    echo "Dependencies already installed. Updating if needed..."
    pip install -r requirements.txt --upgrade
fi

# Run the backend
echo "Starting backend server..."
# Set PYTHONPATH to include current directory for config imports
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
# Ensure we use port 5000 (change if needed)
export PORT=${PORT:-5000}
python app/main.py

