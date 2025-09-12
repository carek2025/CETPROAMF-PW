<?php
// pdo.php
$config = require __DIR__ . '/config.php';
$dsn = "mysql:host={$config['db_host']};port={$config['db_port']};dbname={$config['db_name']};charset={$config['db_charset']}";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
try {
    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], $options);
} catch (PDOException $e) {
    // En producción evita mostrar errores completos
    exit('DB connection failed: ' . $e->getMessage());
}

?>
