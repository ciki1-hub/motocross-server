#!/bin/sh
# Process environment variables into nginx config
envsubst '${RTMP_AUTH_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g "daemon off;"
