# Production Deployment Guide

This guide explains how to deploy PDF Joiner Pro on a VPS/server using Docker Hub images.

## 📋 Prerequisites

- Docker installed on your server
- Docker Compose installed
- Access to your VPS/server via SSH
- Docker Hub account (images should be pushed to Docker Hub)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/DosiBridge/pdfjoiner-tool.git
cd pdfjoiner-tool
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.prod.example .env.prod

# Edit with your values
nano .env.prod
```

**Important variables to set:**
- `DOCKER_USERNAME` - Your Docker Hub username
- `SECRET_KEY` - Generate a strong random key
- `CORS_ORIGINS` - Your frontend domain(s)
- `BACKEND_PORT` - Backend port (default: 5000)
- `FRONTEND_PORT` - Frontend port (default: 3000)

### 3. Create Data Directories

```bash
mkdir -p data/backend/temp data/backend/logs
```

### 4. Pull and Start Services

```bash
# Pull latest images from Docker Hub
docker-compose -f docker-compose.prod.yml --env-file .env.prod pull

# Start services
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

### 5. Verify Services

```bash
# Check running containers
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Test backend health
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost:3000
```

## 📝 Configuration

### Environment Variables

Create `.env.prod` file with your configuration:

```bash
# Docker Hub
DOCKER_USERNAME=your-username

# Ports
BACKEND_PORT=5000
FRONTEND_PORT=3000

# Backend
SECRET_KEY=your-strong-secret-key-here
DEBUG=False
CORS_ORIGINS=http://your-domain.com:3000,http://localhost:3000
```

### Generate Secret Key

```bash
# Generate a secure secret key
python3 -c "import secrets; print(secrets.token_hex(32))"
```

## 🔄 Updating Services

### Pull Latest Images

```bash
# Pull latest images
docker-compose -f docker-compose.prod.yml --env-file .env.prod pull

# Restart services with new images
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

### Update Specific Service

```bash
# Pull and restart backend only
docker-compose -f docker-compose.prod.yml --env-file .env.prod pull backend
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d backend

# Pull and restart frontend only
docker-compose -f docker-compose.prod.yml --env-file .env.prod pull frontend
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d frontend
```

## 🔒 Security Best Practices

### 1. Use Strong Secret Key

```bash
# Generate a secure key
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### 2. Set DEBUG=False

```env
DEBUG=False
```

### 3. Configure CORS Properly

```env
CORS_ORIGINS=http://your-domain.com,https://your-domain.com
```

### 4. Use HTTPS (Recommended)

Set up a reverse proxy (nginx/Traefik) with SSL certificates:

```nginx
# nginx.conf example
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Backend only
docker-compose -f docker-compose.prod.yml logs -f backend

# Frontend only
docker-compose -f docker-compose.prod.yml logs -f frontend
```

### Check Container Status

```bash
# List running containers
docker-compose -f docker-compose.prod.yml ps

# Check resource usage
docker stats
```

### Health Checks

```bash
# Backend health
curl http://localhost:5000/api/health

# Frontend health
curl http://localhost:3000
```

## 🛠️ Troubleshooting

### Images Not Found

```bash
# Make sure images are pushed to Docker Hub
docker pull your-username/pdf-joiner-pro-backend:latest
docker pull your-username/pdf-joiner-pro-frontend:latest

# Check if images exist
docker images | grep pdf-joiner
```

### Port Conflicts

```bash
# Check what's using the ports
sudo lsof -i :5000
sudo lsof -i :3000

# Change ports in .env.prod
BACKEND_PORT=5001
FRONTEND_PORT=3001
```

### Permission Issues

```bash
# Fix data directory permissions
sudo chown -R $USER:$USER data/
chmod -R 755 data/
```

### Container Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check container status
docker-compose -f docker-compose.prod.yml ps -a

# Restart services
docker-compose -f docker-compose.prod.yml restart
```

## 🔄 Maintenance

### Stop Services

```bash
docker-compose -f docker-compose.prod.yml stop
```

### Start Services

```bash
docker-compose -f docker-compose.prod.yml start
```

### Restart Services

```bash
docker-compose -f docker-compose.prod.yml restart
```

### Remove Services

```bash
# Stop and remove containers
docker-compose -f docker-compose.prod.yml down

# Remove containers and volumes
docker-compose -f docker-compose.prod.yml down -v
```

### Clean Up

```bash
# Remove old images
docker image prune -a

# Remove unused volumes
docker volume prune
```

## 📦 Backup

### Backup Data

```bash
# Backup data directory
tar -czf pdf-joiner-backup-$(date +%Y%m%d).tar.gz data/

# Restore from backup
tar -xzf pdf-joiner-backup-YYYYMMDD.tar.gz
```

## 🔐 Using Private Images

If your Docker Hub images are private:

```bash
# Login to Docker Hub
docker login

# Or set credentials in .env.prod
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-token
```

Then update `docker-compose.prod.yml` to use credentials:

```yaml
services:
  backend:
    image: ${DOCKER_USERNAME}/pdf-joiner-pro-backend:latest
    # Add if using private registry
    # registry: docker.io
```

## 🌐 Reverse Proxy Setup

### Nginx Example

```nginx
upstream backend {
    server localhost:5000;
}

upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 📈 Scaling

### Run Multiple Backend Instances

```yaml
services:
  backend:
    deploy:
      replicas: 3
```

### Use Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.prod.yml pdf-joiner
```

## 🔍 Monitoring with Docker

```bash
# View container stats
docker stats

# View container logs
docker logs pdf-joiner-backend
docker logs pdf-joiner-frontend

# Inspect container
docker inspect pdf-joiner-backend
```

## 📚 Additional Resources

- [Main README](../README.md) - Project overview and quick start
- [DOCKER.md](../DOCKER.md) - Docker development setup
- [Backend README](../backend/README.md) - Backend API documentation
- [Frontend README](../frontend/README.md) - Frontend documentation
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com)
- [Nginx Reverse Proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

