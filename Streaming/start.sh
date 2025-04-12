#!/bin/sh
# Process environment variables into nginx config
envsubst '${MOTOCROSS_API_SERVICE}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g "daemon off;"
