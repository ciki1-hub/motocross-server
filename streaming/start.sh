#!/bin/sh
envsubst '${RTMP_PORT} ${HTTP_PORT} ${INTERNAL_API_URL}' \
    < /etc/nginx/nginx.conf.template \
    > /etc/nginx/nginx.conf
exec nginx -g 'daemon off;'
