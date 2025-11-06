# GitHub Secrets Configuration Guide

## 🔐 Required Secrets (Must Add)

These secrets are **required** for the workflows to build and push Docker images:

### 1. DOCKER_USERNAME
- **Type**: Required
- **Description**: Your Docker Hub username
- **Example**: `myusername` or `your-org-name`
- **How to get**: 
  - Your Docker Hub account username
  - Go to https://hub.docker.com and check your profile

### 2. DOCKER_PASSWORD
- **Type**: Required
- **Description**: Docker Hub access token (not your account password)
- **Example**: `dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxx`
- **How to create**:
  1. Go to https://hub.docker.com
  2. Click your profile → **Account Settings**
  3. Go to **Security** tab
  4. Click **New Access Token**
  5. Give it a name (e.g., "GitHub Actions")
  6. Set permissions to **Read & Write**
  7. Click **Generate**
  8. **Copy the token immediately** (you won't see it again!)

---

## 🔧 Optional Secrets (For Production)

These secrets are **optional** but recommended for production deployments. If not set, defaults to `localhost` (development mode).

### 3. BACKEND_API_URL
- **Type**: Optional (for production)
- **Description**: Backend API URL that frontend will connect to
- **Format**: Full URL with `/api` endpoint
- **Example**: `http://160.191.163.85:8087/api`
- **Default**: `http://localhost:5000/api` (if not set)
- **Used in**: Frontend Docker build
- **When to set**: When deploying frontend to production

### 4. BACKEND_API_TARGET
- **Type**: Optional (for advanced configuration)
- **Description**: Backend API target URL (for Vite dev server proxy)
- **Format**: Base URL without `/api`
- **Example**: `http://160.191.163.85:8087`
- **Default**: Automatically derived from `BACKEND_API_URL` (if not set)
- **When to set**: Only if you need to override the auto-derived value
- **Note**: Usually not needed - it's automatically calculated from `BACKEND_API_URL`

### 5. CORS_ORIGINS
- **Type**: Optional (for production)
- **Description**: Comma-separated list of allowed CORS origins
- **Format**: Comma-separated URLs (no spaces after commas)
- **Example**: `http://160.191.163.85:3000,http://localhost:3000,https://yourdomain.com`
- **Default**: `http://localhost:3000` (if not set)
- **Used in**: Backend Docker build
- **When to set**: When deploying backend to production
- **Note**: Include all domains that will access your API

---

## 📝 Step-by-Step: How to Add Secrets

1. **Go to your GitHub repository**
   - Navigate to your repository on GitHub

2. **Open Settings**
   - Click on the **Settings** tab (top menu)

3. **Go to Secrets**
   - In the left sidebar, click **Secrets and variables**
   - Then click **Actions**

4. **Add a Secret**
   - Click **New repository secret** button
   - Enter the secret name (e.g., `DOCKER_USERNAME`)
   - Enter the secret value
   - Click **Add secret**

5. **Repeat for all secrets**
   - Add each secret one by one

---

## 🎯 Example Configuration

### For Development (Minimum Required)
```
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-docker-hub-token
```

### For Production (Complete Setup)
```
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-docker-hub-token
BACKEND_API_URL=http://160.191.163.85:8087/api
CORS_ORIGINS=http://160.191.163.85:3000,http://localhost:3000
```

---

## ✅ Verification Checklist

After adding secrets, verify:

- [ ] `DOCKER_USERNAME` is set
- [ ] `DOCKER_PASSWORD` is set (Docker Hub access token)
- [ ] `BACKEND_API_URL` is set (if using production backend)
- [ ] `BACKEND_API_TARGET` is set (if using production backend)
- [ ] `CORS_ORIGINS` is set (if using production backend)

---

## 🔒 Security Notes

- ✅ Secrets are encrypted and stored securely
- ✅ Secrets are only visible during workflow execution
- ✅ Secrets cannot be viewed after creation (only updated/deleted)
- ✅ Secrets are available to all workflows in the repository
- ✅ Never commit secrets to code or configuration files
- ✅ Use different tokens for different environments if needed

---

## 🚀 Testing

After adding secrets:

1. Go to **Actions** tab
2. Select a workflow (e.g., "Build and Push Backend Docker Image")
3. Click **Run workflow**
4. Select branch and click **Run workflow**
5. Check the build logs to verify secrets are being used

---

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Hub Access Tokens](https://docs.docker.com/docker-hub/access-tokens/)

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

