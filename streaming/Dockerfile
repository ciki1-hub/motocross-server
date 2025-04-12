FROM tiangolo/nginx-rtmp

# Install envsubst for template processing
RUN apt-get update && \
    apt-get install -y gettext-base && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy configuration template
COPY ./streaming/nginx.conf.template /etc/nginx/nginx.conf.template

# Create nginx user
RUN groupadd -r nginx && \
    useradd -r -g nginx nginx

# Create directories
RUN mkdir -p /opt/rtmp/hls && \
    mkdir -p /opt/rtmp/dash && \
    chown -R nginx:nginx /opt/rtmp

# Startup script that processes the template
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 1935
EXPOSE 8080

CMD ["/start.sh"]
