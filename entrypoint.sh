#!/bin/sh
for file in /app/assets/*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VITE_APP_BACKEND_HOST,$VITE_APP_IMG_SERVER_HOST,$VITE_TAG_VERSION' < $file.tmpl.js > $file
done
echo "Starting Nginx"
nginx -g 'daemon off;'
