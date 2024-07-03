FROM php:8.2-fpm

RUN apt-get update  \
    && apt-get -y install git zip libpq-dev nano bash git curl libonig-dev libpng-dev

RUN apt-get -y install libxml2-dev

RUN docker-php-ext-install mbstring xml pdo pdo_mysql

RUN curl 'http://pecl.php.net/get/xdebug-3.3.1.tgz' -o xdebug-3.3.1.tgz \
    && pecl install xdebug-3.3.1.tgz \
    && docker-php-ext-enable xdebug

WORKDIR /var/www/project

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chown -R www-data:www-data /var/www/project

USER www-data
