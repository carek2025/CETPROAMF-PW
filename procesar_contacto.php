<?php
// Iniciar la sesión para poder guardar mensajes de estado (éxito o error).
session_start();

// 1. CONEXIÓN A LA BASE DE DATOS
$host = "localhost";
$user = "root";
$pass = "Java2025"; // Cambia esto por tu contraseña si es diferente
$db = "cetpro";

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    // En un entorno de producción, sería mejor registrar este error en un archivo
    // en lugar de mostrarlo al usuario por seguridad.
    error_log("Error de conexión a la base de datos: " . $conn->connect_error);
    // Guardar un mensaje de error genérico para el usuario
    $_SESSION['form_message'] = "Ocurrió un error inesperado. Por favor, inténtalo más tarde.";
    $_SESSION['form_status'] = "error";
    // Redirigir de vuelta al formulario de contacto
    header('Location: contacto.php');
    exit();
}
$conn->set_charset("utf8mb4");

// 2. VERIFICAR QUE EL MÉTODO SEA POST
// Esto asegura que el script solo se ejecute cuando se envía el formulario.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    // Si alguien intenta acceder al archivo directamente, lo redirigimos.
    header('Location: index.html');
    exit();
}

// 3. RECOGER Y SANITIZAR DATOS DEL FORMULARIO
// trim() elimina espacios en blanco al inicio y al final.
$sede_id = filter_input(INPUT_POST, 'sede_id', FILTER_VALIDATE_INT);
$nombre = trim($_POST['nombre'] ?? '');
$apellidos = trim($_POST['apellidos'] ?? '');
$email = trim($_POST['email'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$asunto = trim($_POST['asunto'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');
// El checkbox si está marcado, tendrá valor. Si no, no existirá en $_POST.
$acepto_terminos = isset($_POST['acepto_terminos']) ? 1 : 0;


// 4. VALIDACIÓN DE DATOS EN EL SERVIDOR
$errors = []; // Un array para almacenar todos los mensajes de error.

if (empty($nombre)) {
    $errors[] = "El campo 'Nombres' es obligatorio.";
}
if (empty($apellidos)) {
    $errors[] = "El campo 'Apellidos' es obligatorio.";
}
if (empty($email)) {
    $errors[] = "El campo 'Correo electrónico' es obligatorio.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "El formato del correo electrónico no es válido.";
}
if (empty($asunto)) {
    $errors[] = "Debes seleccionar un 'Asunto'.";
}
if (empty($mensaje)) {
    $errors[] = "El campo 'Mensaje' es obligatorio.";
}
if ($acepto_terminos !== 1) {
    $errors[] = "Debes aceptar los términos y condiciones.";
}
// El ID de la sede debe ser un número válido.
if ($sede_id === false || $sede_id <= 0) {
    $errors[] = "La sede seleccionada no es válida.";
}

// 5. PROCESAR EL FORMULARIO
// Redirigir de vuelta a la página de contacto. El 'sede_id' es para volver a la misma sede que estaba viendo.
$redirect_url = 'contacto.php?sede=' . $sede_id;

if (!empty($errors)) {
    // Si hay errores:
    // Guardamos los errores y los datos enviados en la sesión.
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_data'] = $_POST; // Para rellenar el formulario con los datos previos.
    $_SESSION['form_status'] = "error";
    
} else {
    // Si NO hay errores, procedemos a insertar en la base de datos.
    
    // Usamos SENTENCIAS PREPARADAS para prevenir inyección SQL. ¡Esto es crucial!
    $sql = "INSERT INTO consultas_contacto (sede_id, nombre, apellidos, email, telefono, asunto, mensaje, acepto_terminos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    // Verificamos si la preparación de la consulta fue exitosa.
    if ($stmt === false) {
        error_log("Error al preparar la consulta SQL: " . $conn->error);
        $_SESSION['form_message'] = "Error del servidor. Inténtalo más tarde.";
        $_SESSION['form_status'] = "error";
    } else {
        // 'issssssi' define el tipo de cada variable: i=integer, s=string
        $stmt->bind_param("issssssi", $sede_id, $nombre, $apellidos, $email, $telefono, $asunto, $mensaje, $acepto_terminos);
        
        if ($stmt->execute()) {
            // Éxito: El registro se insertó correctamente.
            $_SESSION['form_message'] = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo a la brevedad.";
            $_SESSION['form_status'] = "success";
        } else {
            // Error: No se pudo insertar el registro.
            error_log("Error al ejecutar la consulta: " . $stmt->error);
            $_SESSION['form_message'] = "Hubo un problema al enviar tu mensaje. Por favor, verifica tus datos.";
            $_SESSION['form_status'] = "error";
            $_SESSION['form_data'] = $_POST; // Devolvemos los datos para corregir
        }
        
        // Cerrar el statement
        $stmt->close();
    }
}

// Cerrar la conexión
$conn->close();

// 6. REDIRIGIR AL USUARIO
header('Location: ' . $redirect_url);
exit();

?>