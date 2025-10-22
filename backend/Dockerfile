# Używamy oficjalnego obrazu PHP z wbudowanym serwerem Apache
FROM php:8.2-apache

# Instalacja rozszerzenia mysqli (potrzebne do połączenia z MySQL)
RUN docker-php-ext-install mysqli

# Skopiuj wszystkie pliki aplikacji do katalogu Apache w kontenerze
COPY . /var/www/html/

# Ustaw katalog roboczy
WORKDIR /var/www/html/

# Serwer Apache automatycznie startuje po uruchomieniu kontenera
