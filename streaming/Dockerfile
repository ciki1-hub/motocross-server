FROM tiangolo/nginx-rtmp

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    gettext-base \
    ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create nginx user
RUN groupadd -r nginx && \
    useradd -r -g nginx nginx

# Copy configuration files
COPY ./streaming/nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./streaming/start.sh /start.sh
RUN chmod +x /start.sh

# Create streaming directories
RUN mkdir -p /opt/rtmp/hls && \
    mkdir -p /opt/rtmp/dash && \
    chown -R nginx:nginx /opt/rtmp

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 1935
EXPOSE 8080
EXPOSE 1935/udp
EXPOSE 10000-20000/udp
CMD ["/start.sh"]
