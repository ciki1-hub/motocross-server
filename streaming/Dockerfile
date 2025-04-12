FROM tiangolo/nginx-rtmp

# Create nginx user first
RUN groupadd -r nginx && \
    useradd -r -g nginx nginx

# Copy config
COPY ./streaming/nginx.conf /etc/nginx/nginx.conf

# Install FFmpeg with retries and reduced dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        libavcodec-extra \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create directories
RUN mkdir -p /opt/rtmp/hls && \
    mkdir -p /opt/rtmp/dash && \
    chown -R nginx:nginx /opt/rtmp

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 1935
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
