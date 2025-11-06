# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD automation.

## Workflows

### Backend Docker Build (`backend-docker.yml`)

Builds and pushes the backend Docker image to Docker Hub.

**Triggers:**
- Push to `main` or `master` branch (when `backend/` changes)
- Pull requests to `main` or `master` (builds only, no push)
- Manual workflow dispatch

**Secrets Required:**
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token
- `CORS_ORIGINS` (optional) - Comma-separated list of allowed CORS origins (default: `http://localhost:3000`)

**Image Tags:**
- `latest` - Latest build from default branch
- `main` or `master` - Branch name
- `sha-<commit-sha>` - Git commit SHA
- Semantic version tags (if using tags)

### Frontend Docker Build (`frontend-docker.yml`)

Builds and pushes the frontend Docker image to Docker Hub.

**Triggers:**
- Push to `main` or `master` branch (when `frontend/` changes)
- Pull requests to `main` or `master` (builds only, no push)
- Manual workflow dispatch

**Secrets Required:**
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token
- `BACKEND_API_URL` (optional) - Backend API URL for frontend (default: `http://localhost:5000/api`)
- `BACKEND_API_TARGET` (optional) - Backend API target URL (default: `http://localhost:5000`)

**Image Tags:**
- `latest` - Latest build from default branch
- `main` or `master` - Branch name
- `sha-<commit-sha>` - Git commit SHA
- Semantic version tags (if using tags)

## Setup Instructions

1. **Create Docker Hub Account** (if you don't have one)
   - Go to https://hub.docker.com
   - Create an account

2. **Create Docker Hub Access Token**
   - Go to Docker Hub → Account Settings → Security
   - Click "New Access Token"
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token (you won't see it again!)

3. **Add Secrets to GitHub Repository**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add the following secrets:

   **Required Secrets:**
   - `DOCKER_USERNAME` - Your Docker Hub username
   - `DOCKER_PASSWORD` - The access token you created

   **Optional Secrets (for production):**
   - `BACKEND_API_URL` - Backend API URL (e.g., `http://160.191.163.85:8087/api`)
   - `BACKEND_API_TARGET` - Backend API target (e.g., `http://160.191.163.85:8087`)
   - `CORS_ORIGINS` - Allowed CORS origins (e.g., `http://160.191.163.85:3000,http://localhost:3000`)

4. **Push to Main Branch**
   - The workflows will automatically trigger on push to `main` or `master`
   - Check the Actions tab to see the build progress

## Usage

### Manual Trigger

1. Go to your GitHub repository
2. Click on "Actions" tab
3. Select the workflow you want to run
4. Click "Run workflow"
5. Select the branch and click "Run workflow"

### Viewing Build Logs

1. Go to the "Actions" tab in your repository
2. Click on the workflow run you want to view
3. Click on the job to see detailed logs

### Pulling Images

After a successful build, you can pull the images:

```bash
# Backend
docker pull <DOCKER_USERNAME>/pdf-joiner-pro-backend:latest

# Frontend
docker pull <DOCKER_USERNAME>/pdf-joiner-pro-frontend:latest
```

## Configuration Examples

### Production Setup

For production deployment, set these secrets:

```
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-token
BACKEND_API_URL=http://160.191.163.85:8087/api
BACKEND_API_TARGET=http://160.191.163.85:8087
CORS_ORIGINS=http://160.191.163.85:3000,http://your-domain.com
```

### Development Setup

For local development, use defaults or set:

```
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-token
BACKEND_API_URL=http://localhost:5000/api
BACKEND_API_TARGET=http://localhost:5000
CORS_ORIGINS=http://localhost:3000
```

## Troubleshooting

### Build Fails

- Check the Actions logs for error messages
- Verify all secrets are set correctly
- Ensure Docker Hub credentials are valid

### Image Not Pushed

- Check if the workflow is running on a pull request (PRs don't push)
- Verify `DOCKER_PASSWORD` has write permissions
- Check Docker Hub rate limits

### Frontend Build Issues

- Verify `BACKEND_API_URL` is set correctly if needed
- Check Node.js version compatibility
- Review build logs for specific errors

### CORS Errors

- Make sure `CORS_ORIGINS` includes your frontend URL
- Check that the backend is configured to accept requests from that origin
- Verify the format is correct (comma-separated, no spaces unless needed)

## Multi-Platform Builds

Both workflows support multi-platform builds (linux/amd64 and linux/arm64) using Docker Buildx. This allows the images to run on both Intel/AMD and ARM-based systems.

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

