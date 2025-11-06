# Frontend Dockerfile for PDF Joiner Pro
# Multi-stage build for optimized production image

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
# Set build-time environment variables using ARG (available during build)
ARG VITE_API_URL=http://localhost:5000/api
ARG VITE_API_TARGET=http://localhost:5000

# Make ARG available as ENV for the build process
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_TARGET=${VITE_API_TARGET}

RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Install serve globally for static file serving
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Start serve
CMD ["serve", "-s", "dist", "-l", "3000"]

