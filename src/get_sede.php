<?php
require_once 'config.php';

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = (int) $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM sedes WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $sede = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($sede) {
        // Decodificar JSON fields para que JS los use directamente
        $sede['horarios_detalle'] = json_decode($sede['horarios_detalle'], true);
        $sede['contactos_adicionales'] = json_decode($sede['contactos_adicionales'], true);
        $sede['stats'] = json_decode($sede['stats'], true);
        $sede['transportes'] = json_decode($sede['transportes'], true);
        $sede['referencias'] = json_decode($sede['referencias'], true);
        $sede['galeria'] = json_decode($sede['galeria'], true);
        $sede['servicios'] = json_decode($sede['servicios'], true);
        header('Content-Type: application/json');
        echo json_encode($sede);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Sede no encontrada']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'ID inválido']);
}
?>