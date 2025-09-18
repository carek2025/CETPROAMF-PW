<?php
// config.php — usa variables de entorno (compatibilidad Docker)
return [
    'db_host' => getenv('DB_HOST') ?: 'db',        // el servicio en docker-compose se llama 'db'
    'db_port' => getenv('DB_PORT') ?: getenv('DB_PORT') ?: '3306',
    'db_name' => getenv('MYSQL_DATABASE') ?: 'cetpro',
    'db_user' => getenv('MYSQL_USER') ?: 'root',
    'db_pass' => getenv('MYSQL_PASSWORD') ?: '',
    'db_charset' => 'utf8mb4',
];
?>
