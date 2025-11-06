# Docker Setup Guide

This guide explains how to build and run PDF Joiner Pro using Docker.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Docker Compose](#docker-compose)
- [Individual Containers](#individual-containers)
- [Building Images](#building-images)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+ (optional, for docker-compose)
- Docker Hub account (for pushing images)

## Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DosiBridge/pdfjoiner-tool.git
   cd pdfjoiner-tool
   ```

2. **Create environment file** (optional)
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your settings
   ```

3. **Start services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

5. **View logs**
   ```bash
   docker-compose logs -f
   ```

6. **Stop services**
   ```bash
   docker-compose down
   ```

## Docker Compose

The `docker-compose.yml` file defines two services:

### Backend Service
- **Image**: Built from `backend/Dockerfile`
- **Port**: 5000
- **Volumes**: 
  - `./backend/temp` → `/app/temp` (uploads, thumbnails, merged files)
  - `./backend/logs` → `/app/logs` (application logs)

### Frontend Service
- **Image**: Built from `frontend/Dockerfile`
- **Port**: 3000
- **Server**: Node.js with `serve` (static file server)
- **Depends on**: Backend service

### Environment Variables

You can set environment variables in `docker-compose.yml` or use a `.env` file:

```bash
# Backend environment variables
SECRET_KEY=your-secret-key-here
DEBUG=False
CORS_ORIGINS=http://localhost:3000,http://localhost:80
MAX_FILE_SIZE=52428800
RATE_LIMIT=100 per hour
```

## Individual Containers

### Build Backend Image

```bash
cd backend
docker build -t pdf-joiner-backend:latest .
```

### Run Backend Container

```bash
docker run -d \
  --name pdf-joiner-backend \
  -p 5000:5000 \
  -e SECRET_KEY=your-secret-key \
  -e CORS_ORIGINS=http://localhost:3000 \
  -v $(pwd)/temp:/app/temp \
  -v $(pwd)/logs:/app/logs \
  pdf-joiner-backend:latest
```

### Build Frontend Image

```bash
cd frontend
docker build -t pdf-joiner-frontend:latest \
  --build-arg VITE_API_URL=http://localhost:5000/api .
```

### Run Frontend Container

```bash
docker run -d \
  --name pdf-joiner-frontend \
  -p 3000:3000 \
  pdf-joiner-frontend:latest
```

## Building Images

### Backend

```bash
cd backend
docker build -t pdf-joiner-backend:latest .
```

**Build arguments:**
- None (all configuration via environment variables)

### Frontend

```bash
cd frontend
docker build -t pdf-joiner-frontend:latest \
  --build-arg VITE_API_URL=http://your-api-url/api .
```

**Build arguments:**
- `VITE_API_URL` - API URL for the frontend (optional, defaults to `http://localhost:5000/api`)

## Configuration

### Backend Configuration

Set environment variables when running the container:

```bash
docker run -e SECRET_KEY=your-key \
  -e DEBUG=False \
  -e CORS_ORIGINS=http://localhost:3000 \
  pdf-joiner-backend:latest
```

**Key Environment Variables:**
- `SECRET_KEY` - Flask secret key (required in production)
- `DEBUG` - Enable debug mode (default: False)
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)
- `PORT` - Server port (default: 5000)
- `MAX_FILE_SIZE` - Maximum file size in bytes (default: 52428800 = 50MB)
- `RATE_LIMIT` - Rate limit string (default: "100 per hour")

### Frontend Configuration

The frontend is built with environment variables baked in at build time. Set `VITE_API_URL` during build:

```bash
docker build --build-arg VITE_API_URL=http://api.example.com/api \
  -t pdf-joiner-frontend:latest .
```

## Multi-Platform Builds

Build for multiple platforms (AMD64 and ARM64):

```bash
# Create buildx builder
docker buildx create --use --name multiarch

# Build backend
docker buildx build --platform linux/amd64,linux/arm64 \
  -t pdf-joiner-backend:latest \
  --push ./backend

# Build frontend
docker buildx build --platform linux/amd64,linux/arm64 \
  -t pdf-joiner-frontend:latest \
  --build-arg VITE_API_URL=http://api.example.com/api \
  --push ./frontend
```

## Health Checks

Both containers include health checks:

- **Backend**: `GET /api/health`
- **Frontend**: `GET /` (served on port 3000)

Check container health:

```bash
docker ps  # Shows health status
docker inspect <container-name> | grep -A 10 Health
```

## Troubleshooting

### Backend Issues

**Container won't start:**
```bash
# Check logs
docker logs pdf-joiner-backend

# Check if port is in use
lsof -i :5000
```

**Permission errors:**
```bash
# Fix volume permissions
sudo chown -R $(id -u):$(id -g) backend/temp backend/logs
```

**Missing poppler-utils:**
- The Dockerfile installs poppler-utils automatically
- If issues persist, check the Dockerfile

### Frontend Issues

**API connection errors:**
- Verify `VITE_API_URL` is set correctly during build
- Check CORS configuration in backend
- Ensure backend is accessible from frontend
- Frontend now runs on port 3000 (not 80)

**Build fails:**
```bash
# Check build logs
docker build -t pdf-joiner-frontend:latest ./frontend

# Clear build cache
docker builder prune
```

### General Issues

**Port conflicts:**
```bash
# Change ports in docker-compose.yml
ports:
  - "8080:5000"  # Backend on 8080
  - "8081:3000" # Frontend on 8081
```

**Volume permissions:**
```bash
# Fix permissions
sudo chown -R $(id -u):$(id -g) backend/temp backend/logs
```

**Network issues:**
```bash
# Check if containers can communicate
docker network inspect pdf-joiner-pro_default

# Test connectivity
docker exec pdf-joiner-frontend wget -O- http://backend:5000/api/health
```

## Production Deployment

### Security Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `DEBUG=False`
- [ ] Configure proper `CORS_ORIGINS`
- [ ] Use HTTPS (configure reverse proxy)
- [ ] Set appropriate `RATE_LIMIT`
- [ ] Use secrets management (Docker secrets, Kubernetes secrets, etc.)
- [ ] Enable logging and monitoring
- [ ] Set resource limits

### Using Docker Hub Images

If you've pushed images to Docker Hub:

```yaml
# docker-compose.yml
services:
  backend:
    image: your-username/pdf-joiner-pro-backend:latest
    # ... rest of config
  frontend:
    image: your-username/pdf-joiner-pro-frontend:latest
    # ... rest of config
```

### Reverse Proxy Setup

For production, use a reverse proxy (nginx, Traefik, etc.):

```nginx
# nginx.conf (if using nginx as reverse proxy)
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://pdf-joiner-frontend:3000;
    }

    location /api {
        proxy_pass http://pdf-joiner-backend:5000;
    }
}
```

**Note**: The frontend container uses Node.js `serve` on port 3000, not nginx. If you want to use nginx as a reverse proxy in front of the containers, use the configuration above.

## CI/CD Integration

See [GitHub Actions Workflows](.github/workflows/README.md) for automated build and push workflows.

## Additional Resources

- **[Main README](../README.md)** - Project overview and quick start
- **[Documentation Index](../DOCUMENTATION.md)** - Complete documentation index
- **[Frontend README](../frontend/README.md)** - Frontend documentation
- **[Backend README](../backend/README.md)** - Backend documentation
- **[Production Deployment](../PRODUCTION_DEPLOYMENT.md)** - Production deployment guide
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com)

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

