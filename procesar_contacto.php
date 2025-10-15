<?php
session_start();

// 1. CONEXIÓN A LA BASE DE DATOS
$host = "localhost";
$user = "cetpro_admin";
$pass = "OsiveArsenio2021@"; // tu contraseña
$db   = "cetpro";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    $_SESSION['form_message'] = "Error al conectar con la base de datos.";
    $_SESSION['form_status']  = "error";
    header("Location: contacto.php");
    exit();
}
$conn->set_charset("utf8mb4");

// 2. SOLO ACEPTAR POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contacto.php");
    exit();
}

// 3. CAPTURAR DATOS DEL FORMULARIO
$nombres   = trim($_POST['nombre'] ?? '');
$apellidos = trim($_POST['apellidos'] ?? '');
$correo    = trim($_POST['email'] ?? '');
$telefono  = trim($_POST['telefono'] ?? '');
$asunto    = trim($_POST['asunto'] ?? '');
$mensaje   = trim($_POST['mensaje'] ?? '');

// 4. VALIDACIONES
$errors = [];
if (empty($nombres))   $errors[] = "El campo 'Nombres' es obligatorio.";
if (empty($apellidos)) $errors[] = "El campo 'Apellidos' es obligatorio.";
if (empty($correo))    $errors[] = "El campo 'Correo electrónico' es obligatorio.";
elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) $errors[] = "El correo no es válido.";
if (empty($asunto))    $errors[] = "Debes seleccionar un asunto.";
if (empty($mensaje))   $errors[] = "El mensaje no puede estar vacío.";

if (!empty($errors)) {
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_data']   = $_POST;
    $_SESSION['form_status'] = "error";
    header("Location: contacto.php");
    exit();
}

// 5. INSERTAR EN LA BASE DE DATOS
$sql = "INSERT INTO formulario_contacto (nombres, apellidos, correo, telefono, asunto, mensaje) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    $_SESSION['form_message'] = "Error en el servidor. Intenta más tarde.";
    $_SESSION['form_status']  = "error";
    header("Location: contacto.php");
    exit();
}

$stmt->bind_param("ssssss", $nombres, $apellidos, $correo, $telefono, $asunto, $mensaje);

if ($stmt->execute()) {
    $_SESSION['form_message'] = "¡Gracias! Tu mensaje fue enviado correctamente.";
    $_SESSION['form_status']  = "success";
} else {
    $_SESSION['form_message'] = "Error al guardar el mensaje.";
    $_SESSION['form_status']  = "error";
}

$stmt->close();
$conn->close();

// 6. REDIRECCIÓN AL FORMULARIO
header("Location: contacto.php");
exit();
?>
