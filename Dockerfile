FROM php:8.3-apache

ENV APP_ENV=production \
    DATA_DIR=/app/data

WORKDIR /var/www/html
COPY public/ /var/www/html/
COPY docker/entrypoint.sh /usr/local/bin/railway-php-entrypoint

RUN chmod +x /usr/local/bin/railway-php-entrypoint \
    && printf 'post_max_size=32M\nupload_max_filesize=12M\nmemory_limit=192M\n' > /usr/local/etc/php/conf.d/railway-app.ini

EXPOSE 8080
CMD ["/usr/local/bin/railway-php-entrypoint"]
