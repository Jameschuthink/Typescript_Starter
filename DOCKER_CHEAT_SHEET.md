# Docker Cheat Sheet - Typescript Starter

## Quick Start Commands

```bash
# 1. Build the image
docker build -t typescript-starter .

# 2. Run the container
docker run -d -p 8080:8080 --name typescript-starter-container typescript-starter

# 3. Check it's running
docker ps

# 4. View logs
docker logs typescript-starter-container

# 5. Test the app
curl http://localhost:8080/api/health
```

## Basic Command List

### Build
```bash
docker build -t typescript-starter .
```

### Run
```bash
docker run -d -p 8080:8080 --name typescript-starter-container typescript-starter
```

### Stop
```bash
docker stop typescript-starter-container
```

### Start
```bash
docker start typescript-starter-container
```

### Remove
```bash
docker rm typescript-starter-container
docker rmi typescript-starter
```

### Logs
```bash
docker logs typescript-starter-container
docker logs -f typescript-starter-container  # Follow logs
docker logs --tail 50 typescript-starter-container  # Last 50 lines
```

### Debug
```bash
docker exec -it typescript-starter-container sh
docker inspect typescript-starter-container
docker stats typescript-starter-container
```

## Environment Variables

```bash
# Default values (can be overridden)
NODE_ENV=production
HOST=localhost
PORT=8080
CORS_ORIGIN=http://localhost:8080
COMMON_RATE_LIMIT_MAX_REQUESTS=1000
COMMON_RATE_LIMIT_WINDOW_MS=1000
```

## URLs

- **Base URL**: `http://localhost:8080`
- **Health Check**: `http://localhost:8080/api/health`
- **API Docs**: `http://localhost:8080/api-docs`
