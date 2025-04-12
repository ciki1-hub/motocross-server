FROM tiangolo/nginx-rtmp

# Install dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg gettext-base && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create directories
RUN mkdir -p /opt/rtmp/hls && \
    mkdir -p /opt/rtmp/dash && \
    chown -R www-data:www-data /opt/rtmp && \
    chmod -R 755 /opt/rtmp

# Copy configuration from build context
COPY ./nginx.conf.template /etc/nginx/nginx.conf
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

# Expose ports
EXPOSE 1935
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["/start.sh"]
