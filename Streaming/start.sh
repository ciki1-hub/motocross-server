#!/bin/sh
# Process template with environment variables
envsubst '${MOTOCROSS_API_SERVICE}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g "daemon off;"
