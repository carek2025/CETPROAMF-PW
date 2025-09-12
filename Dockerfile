# Usar la imagen base oficial de PHP 8.2 con Apache
FROM php:8.2-apache

# Instalar dependencias del sistema y extensiones PHP necesarias para MySQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Habilitar el módulo rewrite de Apache para URLs amigables
RUN a2enmod rewrite

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar el código fuente del proyecto al contenedor
COPY ./src /var/www/html

# Configurar el document root de Apache (ya definido en docker-compose.yml)
ENV APACHE_DOCUMENT_ROOT /var/www/html

# Actualizar la configuración de Apache para usar el document root
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Ajustar permisos para el directorio del proyecto
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer el puerto 80 (Apache)
EXPOSE 80

# Iniciar Apache en modo foreground (comportamiento por defecto)
CMD ["apache2-foreground"]