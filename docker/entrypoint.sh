#!/bin/sh
set -eu

port="${PORT:-8080}"
data_dir="${RAILWAY_VOLUME_MOUNT_PATH:-${DATA_DIR:-/app/data}}"

case "$port" in
  ''|*[!0-9]*) echo "Invalid PORT: $port" >&2; exit 1 ;;
esac

mkdir -p "$data_dir/postcards" "$data_dir/sessions"
chown -R www-data:www-data "$data_dir"
chmod 770 "$data_dir" "$data_dir/postcards" "$data_dir/sessions"

sed -i "s/^Listen 80$/Listen ${port}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${port}>/" /etc/apache2/sites-available/000-default.conf

exec apache2-foreground
