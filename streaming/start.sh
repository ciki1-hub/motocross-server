#!/bin/sh
# Process template with environment variables
envsubst '${RTMP_PORT} ${HTTP_PORT} ${API_SERVICE_URL}' \
    < /etc/nginx/nginx.conf.template \
    > /etc/nginx/nginx.conf

# Start NGINX
exec nginx -g 'daemon off;'
