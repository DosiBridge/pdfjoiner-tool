# Running PDF Joiner Pro with Docker Compose

## Quick Start

1. **Build and start both services:**
   ```bash
   docker-compose up -d --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

3. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Backend only
   docker-compose logs -f backend
   
   # Frontend only
   docker-compose logs -f frontend
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Key variables:
- `CORS_ORIGINS`: Allowed origins for CORS (comma-separated)
- `VITE_API_URL`: API URL for frontend (used at build time)
- `SECRET_KEY`: Flask secret key (change in production!)

### Rebuilding

To rebuild after code changes:

```bash
# Rebuild and restart
docker-compose up -d --build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 5000 are already in use, change them in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Frontend on 3001
  - "5001:5000"  # Backend on 5001
```

### CORS Errors

Make sure `CORS_ORIGINS` includes your frontend URL:

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### File Permissions

If you get permission errors with volumes:

```bash
sudo chown -R $(id -u):$(id -g) backend/temp backend/logs
```

### View Container Logs

```bash
# All logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Specific service
docker-compose logs backend
docker-compose logs frontend
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

### Clean Up

```bash
# Stop and remove containers
docker-compose down

# Remove containers, networks, and volumes
docker-compose down -v

# Remove images too
docker-compose down --rmi all
```

## Development

For development, you can mount source code as volumes:

```yaml
volumes:
  - ./backend:/app  # Mount backend code
  - ./frontend:/app  # Mount frontend code
```

Then restart the service to pick up changes.

## Production

For production:
1. Set `DEBUG=False`
2. Use a strong `SECRET_KEY`
3. Configure proper `CORS_ORIGINS`
4. Use HTTPS (configure reverse proxy)
5. Set resource limits in docker-compose.yml

