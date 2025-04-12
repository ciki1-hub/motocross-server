# Motocross Livestream Server

Server components for the Motocross Livestream application, including API server and RTMP streaming server.

## Components

1. **API Server**: Node.js Express server handling authentication, stream management, and chat functionality.
2. **RTMP Server**: NGINX-based RTMP streaming server with HLS and DASH output for web browser compatibility.

## Deployment

This repository is configured for deployment on Render.com using the included `render.yaml` blueprint.

## Local Development

1. Install dependencies:
   ```
   cd server && npm install
   ```

2. Start the API server:
   ```
   npm start
   ```

3. For the RTMP server, you can use Docker:
   ```
   cd streaming
   docker build -t motocross-rtmp .
   docker run -p 1935:1935 -p 8080:8080 motocross-rtmp
   ```

## Environment Variables

Add the following environment variables in Render dashboard:

- `API_KEY`: Your API key for securing endpoints
- `STORAGE_BUCKET`: Storage bucket information (optional)
- `RTMP_SERVER_URL`: The URL of your RTMP server
- `HLS_BASE_URL`: Base URL for HLS stream playback