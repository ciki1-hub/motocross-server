#!/bin/sh
envsubst '${MOTOCROSS_API_SERVICE}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec nginx -g "daemon off;"
