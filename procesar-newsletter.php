<?php
/* procesar-newsletter.php - VERSIÓN CORREGIDA */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Respuesta de debug
$debug_info = [];

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del formulario
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $correo = isset($_POST['correo']) ? trim($_POST['correo']) : '';
    $interes = isset($_POST['interes']) ? trim($_POST['interes']) : '';
    
    $debug_info['datos_recibidos'] = ['nombre' => $nombre, 'correo' => $correo, 'interes' => $interes];
    
    // Validar datos
    if (empty($nombre) || empty($correo) || empty($interes)) {
        $debug_info['error'] = 'Campos vacíos';
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios', 'debug' => $debug_info]);
        exit;
    }
    
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $debug_info['error'] = 'Email inválido';
        echo json_encode(['success' => false, 'message' => 'Correo electrónico no válido', 'debug' => $debug_info]);
        exit;
    }
    
    // Configuración de la base de datos - ¡AJUSTA ESTOS VALORES!
    $servername = "localhost";
    $username = "cetpro_admin";  // Cambia por tu usuario de BD
    $password = "OsiveArsenio2021@";      // Cambia por tu password de BD
    $dbname = "cetpro";  // Cambia por el nombre de tu BD
    
    $debug_info['db_config'] = ['servidor' => $servername, 'bd' => $dbname];
    
    try {
        // Conexión a la base de datos
        $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $debug_info['conexion'] = 'OK';
        
        // Verificar si la tabla existe, si no crearla
        $check_table = $conn->query("SHOW TABLES LIKE 'newsletter_suscripciones'");
        if ($check_table->rowCount() == 0) {
            // Crear la tabla si no existe
            $create_table = "CREATE TABLE newsletter_suscripciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(150) NOT NULL UNIQUE,
                interes VARCHAR(50) NOT NULL,
                fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
                activo TINYINT DEFAULT 1
            )";
            $conn->exec($create_table);
            $debug_info['tabla_creada'] = true;
        }
        
        // Verificar si el correo ya existe
        $stmt_check = $conn->prepare("SELECT id FROM newsletter_suscripciones WHERE correo = :correo");
        $stmt_check->bindParam(':correo', $correo);
        $stmt_check->execute();
        
        if ($stmt_check->rowCount() > 0) {
            $debug_info['error'] = 'Correo duplicado';
            echo json_encode(['success' => false, 'message' => 'Este correo electrónico ya está registrado', 'debug' => $debug_info]);
            exit;
        }
        
        // Insertar en la base de datos
        $stmt = $conn->prepare("INSERT INTO newsletter_suscripciones (nombre, correo, interes, fecha_registro) VALUES (:nombre, :correo, :interes, NOW())");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':interes', $interes);
        
        $result = $stmt->execute();
        $debug_info['insert_result'] = $result;
        $debug_info['last_insert_id'] = $conn->lastInsertId();
        
        if ($result) {
            echo json_encode([
                'success' => true, 
                'message' => '¡Te has suscrito exitosamente! Recibirás notificaciones sobre eventos.',
                'debug' => $debug_info
            ]);
        } else {
            $debug_info['error'] = 'Execute returned false';
            echo json_encode([
                'success' => false, 
                'message' => 'Error al guardar en la base de datos',
                'debug' => $debug_info
            ]);
        }
        
    } catch(PDOException $e) {
        $debug_info['error'] = $e->getMessage();
        $debug_info['error_code'] = $e->getCode();
        
        // Verificar si es error de duplicado
        if ($e->getCode() == 23000) { // Código de violación de restricción única
            echo json_encode([
                'success' => false, 
                'message' => 'Este correo electrónico ya está registrado',
                'debug' => $debug_info
            ]);
        } else {
            // En caso de error, guardar en archivo de texto como respaldo
            $backup_data = date('Y-m-d H:i:s') . " | Nombre: $nombre | Correo: $correo | Interés: $interes | Error: " . $e->getMessage() . "\n";
            file_put_contents('newsletter_backup.txt', $backup_data, FILE_APPEND | LOCK_EX);
            $debug_info['backup_created'] = true;
            
            echo json_encode([
                'success' => false, 
                'message' => 'Error de conexión con la base de datos. Los datos se guardaron localmente.',
                'debug' => $debug_info
            ]);
        }
    }
    
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Método no permitido',
        'debug' => ['method' => $_SERVER['REQUEST_METHOD']]
    ]);
}
?>