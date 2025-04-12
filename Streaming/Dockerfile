FROM tiangolo/nginx-rtmp

# Copy custom configuration
COPY Streaming/nginx.conf /etc/nginx/nginx.conf

# Install FFmpeg for transcoding
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create directories for HLS streams
RUN mkdir -p /opt/rtmp/hls && \
    mkdir -p /opt/rtmp/dash && \
    chown -R www-data:www-data /opt/rtmp

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

# Expose ports
EXPOSE 1935
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
