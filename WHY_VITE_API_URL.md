# Why VITE_API_URL is Needed

## The Problem

The frontend is a **static site** (React SPA) that gets built into static HTML/JS/CSS files. When the browser loads the app, it needs to know where to make API calls.

## Why It Must Be Set at Build Time

1. **Static Build**: Vite builds the frontend into static files
2. **Baked In**: Environment variables are "baked" into the JavaScript bundle at build time
3. **No Runtime Config**: Once built, the frontend can't read environment variables from the server
4. **Different Deployments**: Frontend and backend might be on different servers/ports

## Current Behavior

### If VITE_API_URL is NOT set:
- Frontend defaults to `/api` (relative path)
- This works if frontend and backend are on the same domain
- Example: Frontend at `http://example.com` → API calls go to `http://example.com/api`

### If VITE_API_URL IS set:
- Frontend uses the full URL you provide
- This works when frontend and backend are on different servers
- Example: Frontend at `http://frontend.com` → API calls go to `http://backend.com:8087/api`

## When You Need to Set It

### ✅ You MUST set VITE_API_URL if:
- Frontend and backend are on **different domains**
- Frontend and backend are on **different ports** (and no reverse proxy)
- Example: Frontend at `http://160.191.163.85:3000`, Backend at `http://160.191.163.85:8087`

### ❌ You DON'T need to set it if:
- Frontend and backend are on the **same domain** (use reverse proxy)
- Using relative path `/api` works for your setup
- Example: Both behind nginx reverse proxy on same domain

## Alternative Solutions

### Option 1: Use Relative Path (No Manual Config)
If frontend and backend are on the same domain, you can:
1. Don't set `VITE_API_URL` in GitHub secrets
2. Use a reverse proxy (nginx) to route `/api` to backend
3. Frontend automatically uses `/api` (relative path)

### Option 2: Runtime Configuration (More Complex)
Use a configuration file that's loaded at runtime:
- Create `config.json` in `public/` folder
- Load it when app starts
- More complex but allows changing API URL without rebuilding

### Option 3: Current Approach (Recommended)
- Set `VITE_API_URL` via GitHub secrets
- Works for any deployment scenario
- Simple and straightforward

## Recommendation

**Keep the current approach** because:
- ✅ Works for all deployment scenarios
- ✅ Simple and secure (via GitHub secrets)
- ✅ No additional infrastructure needed
- ✅ Clear and explicit configuration

If your frontend and backend are always on the same domain, you can skip setting `VITE_API_URL` and use a reverse proxy instead.

