.PHONY: help install dev build start stop clean test docker-build docker-up docker-down docker-logs

help:
	@echo "PDF Joiner Pro - Available Commands"
	@echo ""
	@echo "Development:"
	@echo "  make install       - Install all dependencies"
	@echo "  make dev           - Start development servers"
	@echo "  make build         - Build frontend for production"
	@echo "  make test          - Run tests"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build  - Build Docker images"
	@echo "  make docker-up     - Start Docker containers"
	@echo "  make docker-down   - Stop Docker containers"
	@echo "  make docker-logs   - View Docker logs"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean         - Clean temporary files"
	@echo "  make stop          - Stop all running services"

install:
	@echo "Installing backend dependencies..."
	cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installation complete!"

dev:
	@echo "Starting development servers..."
	@echo "Backend will run on http://localhost:5000"
	@echo "Frontend will run on http://localhost:3000"
	@trap 'kill 0' EXIT; \
	(cd backend && . venv/bin/activate && python app/main.py) & \
	(cd frontend && npm run dev)

build:
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Build complete! Output in frontend/dist/"

start:
	@echo "Starting production servers..."
	docker-compose up -d
	@echo "Services started!"
	@echo "Frontend: http://localhost"
	@echo "Backend: http://localhost:5000"

stop:
	@echo "Stopping services..."
	docker-compose down
	@pkill -f "python app/main.py" || true
	@pkill -f "vite" || true
	@echo "Services stopped!"

clean:
	@echo "Cleaning temporary files..."
	rm -rf backend/temp/uploads/*
	rm -rf backend/temp/thumbnails/*
	rm -rf backend/temp/merged/*
	rm -rf backend/__pycache__
	rm -rf backend/**/__pycache__
	rm -rf frontend/dist
	rm -rf frontend/node_modules/.vite
	@echo "Clean complete!"

test:
	@echo "Running tests..."
	cd backend && . venv/bin/activate && pytest
	cd frontend && npm test
	@echo "Tests complete!"

docker-build:
	@echo "Building Docker images..."
	docker-compose build
	@echo "Docker images built!"

docker-up:
	@echo "Starting Docker containers..."
	docker-compose up -d
	@echo "Containers started!"
	@docker-compose ps

docker-down:
	@echo "Stopping Docker containers..."
	docker-compose down
	@echo "Containers stopped!"

docker-logs:
	docker-compose logs -f

.DEFAULT_GOAL := help

