<?php
$host = 'db';  // Nombre del servicio en Docker
$dbname = 'cetpro';
$username = 'cetpro_user';
$password = 'cetro_pass';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>