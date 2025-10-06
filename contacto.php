<?php
// Conexión a la base de datos (misma configuración que ubicacion.php)
session_start(); // <-- AÑADIR ESTA LÍNEA

$host = "localhost";
$user = "root";
$pass = "Java2025"; // Cambia esto por tu contraseña si es diferente
$db = "cetpro";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

// Sede seleccionada por GET, por defecto será la 1
$sede_id = isset($_GET['sede']) ? intval($_GET['sede']) : 1;

// Obtener la lista de todas las sedes para el menú
$sedes_stmt = $conn->query("SELECT id, nombre FROM sedes ORDER BY id ASC");
$sedes_list = $sedes_stmt->fetch_all(MYSQLI_ASSOC);

// Obtener los datos de la sede seleccionada
$sede_sql = $conn->prepare("SELECT * FROM sedes WHERE id = ?");
$sede_sql->bind_param("i", $sede_id);
$sede_sql->execute();
$sede = $sede_sql->get_result()->fetch_assoc();

// Si la sede no existe, redirigir a la primera que haya en la lista
if (!$sede) {
    if (count($sedes_list) > 0) {
        header('Location: contacto.php?sede=' . $sedes_list[0]['id']);
        exit();
    } else {
        die("No hay sedes configuradas en la base de datos.");
    }
}

// Función helper para escapar HTML y evitar ataques XSS
function e($str) {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - <?= e($sede['nombre']) ?> - CETPRO Arsenio Mendoza Flor</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/contacto.css">
</head>
<body>
    <header class="cabecera">
        <div class="nav-secundario">
            <div class="nav-secundario-izquierda">
                <a href="index.html#preguntas-frecuentes"><i class="fa-solid fa-circle-question"></i>Preguntas Frecuentes</a>
                <p><i class="fa-solid fa-envelope"></i>soporte@cetprodamf.edu.pe</p>
            </div>
            <div class="nav-secundario-derecha">
                <ul>
                    <li><a href="inicio-sesion.html">Iniciar sesión</a></li>
                    <li><a href="registro.html">Registrarse</a></li>
                </ul>
            </div>
        </div>
        <div class="contenedor">
            <div class="logo">
                <a href="index.html"><img src="img/logo-cetprodamf.png" alt="Logo CETPRO Arsenio Mendoza Flor"></a>
            </div>
            <input type="checkbox" id="menu-toggle">
            <nav class="menu">
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="programas.html">Programas de Estudios</a></li>
                    <li><a href="eventos.php">Eventos</a></li>
                    <li><a href="ubicacion.php">Ubicación</a></li>
                    <li><a href="contacto.php" class="activo">Contacto</a></li>
                </ul>
            </nav>
            <div class="enlace-social-cabecera">
                <ul>
                    <li><a href="https://www.facebook.com/flor.mendozaflor" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a href="https://www.tiktok.com/@tu-perfil" target="_blank"><i class="fab fa-tiktok"></i></a></li>
                    <li><a href="mailto:info@cetprojct.edu.pe"><i class="fas fa-envelope"></i></a></li>
                </ul>
            </div>
            <label for="menu-toggle" class="menu-hamburguesa"><i class="fas fa-bars"></i></label>
        </div>
    </header>

    <main>
        <section class="page-banner">
            <div class="page-overlay"></div>
            <div class="contenedor">
                <div class="page-banner-content">
                    <h1>Contacto</h1>
                    <p>Estamos aquí para resolver todas tus dudas sobre nuestra sede <?= e($sede['nombre']) ?></p>
                    <div class="hero-buttons">
                        <a href="index.html" class="btn btn-primary">Inicio</a>
                        <a href="programas.html" class="btn btn-secondary">Explorar Programas</a>
                    </div>

                </div>
            </div>
        </section>

        <section class="seccion-info-contacto">
            <div class="contenedor">
                <div class="contacto-grid">
                    <div class="contacto-info">
                        <div class="seccion-header">
                            <h2>Información de la Sede</h2>
                            <p>Comunícate directamente con la sede <strong><?= e($sede['nombre']) ?></strong></p>
                        </div>
                        
                        <div class="info-items">
                            <div class="info-item">
                                <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="info-content">
                                    <h4>Dirección</h4>
                                    <p><?= e($sede['direccion']) ?><br>Huánuco - Perú</p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon"><i class="fas fa-phone"></i></div>
                                <div class="info-content">
                                    <h4>Teléfonos</h4>
                                    <p>
                                        Celular: <?= e($sede['telefono']) ?><br>
                                        WhatsApp: <a href="<?= e($sede['whatsapp']) ?>" target="_blank">Enviar mensaje</a>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon"><i class="fas fa-envelope"></i></div>
                                <div class="info-content">
                                    <h4>Correos Electrónicos</h4>
                                    <p>Información: info@cetprojct.edu.pe<br>Soporte: soporte@cetprodamf.edu.pe</p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon"><i class="fas fa-clock"></i></div>
                                <div class="info-content">
                                    <h4>Horarios de Atención</h4>
                                    <p><?= e($sede['horario']) ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mapa-container">
                        <h3>Nuestra Ubicación</h3>
                        <div class="mapa-content">
                            <div class="menu-lateral-sedes">
                                <h4>Nuestras Sedes</h4>
                                <ul>
                                    <?php foreach ($sedes_list as $s): ?>
                                        <li>
                                            <a href="contacto.php?sede=<?= intval($s['id']) ?>" class="sede-link <?= ($s['id'] == $sede_id) ? 'active' : '' ?>">
                                                <?= e($s['nombre']) ?>
                                            </a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            <div class="mapa-wrapper">
                                <iframe 
                                    id="mapa-iframe"
                                    src="<?= e($sede['mapa_embed']) ?>" 
                                    allowfullscreen="" 
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                        <div class="mapa-acciones">
                            <a href="<?= e($sede['link_maps']) ?>" target="_blank" class="btn btn-secondary">
                                <i class="fas fa-directions"></i> Cómo llegar
                            </a>
                            <a href="ubicacion.php?sede=<?= intval($sede['id']) ?>" class="btn btn-primary">
                                <i class="fas fa-map"></i> Ver ubicación completa
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="seccion-formularios">
            <div class="contenedor">
                <div class="seccion-header">
                    <h2>Envíanos un Mensaje</h2>
                    <p>Completa el siguiente formulario y un asesor se pondrá en contacto contigo a la brevedad.</p>
                </div>

                <?php
                // --- BLOQUE DE MENSAJES (sin cambios, ya estaba bien) ---
                if (isset($_SESSION['form_message'])): ?>
                    <div class="form-message <?= e($_SESSION['form_status']) ?>">
                        <p><?= e($_SESSION['form_message']) ?></p>
                    </div>
                <?php endif; 
                
                if (isset($_SESSION['form_errors'])): ?>
                    <div class="form-message error">
                        <strong>Por favor, corrige los siguientes errores:</strong>
                        <ul>
                            <?php foreach ($_SESSION['form_errors'] as $error): ?>
                                <li><?= e($error) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif;

                $form_data = $_SESSION['form_data'] ?? [];
                
                unset($_SESSION['form_message']);
                unset($_SESSION['form_status']);
                unset($_SESSION['form_errors']);
                unset($_SESSION['form_data']);
                ?>

                <form class="contacto-form" id="form-consulta" action="procesar_contacto.php" method="POST">
                    <input type="hidden" name="sede_id" value="<?= intval($sede['id']) ?>">

                    <div class="form-row">
                        <div class="form-group">
                            <label for="nombre">Nombres completos *</label>
                            <input type="text" id="nombre" name="nombre" value="<?= e($form_data['nombre'] ?? '') ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="apellidos">Apellidos completos *</label>
                            <input type="text" id="apellidos" name="apellidos" value="<?= e($form_data['apellidos'] ?? '') ?>" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Correo electrónico *</label>
                            <input type="email" id="email" name="email" value="<?= e($form_data['email'] ?? '') ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono/Celular</label>
                            <input type="tel" id="telefono" name="telefono" value="<?= e($form_data['telefono'] ?? '') ?>">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="asunto">Asunto *</label>
                        <select id="asunto" name="asunto" required>
                            <option value="">Selecciona un asunto</option>
                            <option value="informacion-programas" <?= ($form_data['asunto'] ?? '') == 'informacion-programas' ? 'selected' : '' ?>>Información sobre programas</option>
                            <option value="proceso-inscripcion" <?= ($form_data['asunto'] ?? '') == 'proceso-inscripcion' ? 'selected' : '' ?>>Proceso de inscripción</option>
                            <option value="costos-pagos" <?= ($form_data['asunto'] ?? '') == 'costos-pagos' ? 'selected' : '' ?>>Costos y formas de pago</option>
                            <option value="horarios" <?= ($form_data['asunto'] ?? '') == 'horarios' ? 'selected' : '' ?>>Horarios y modalidades</option>
                            <option value="certificacion" <?= ($form_data['asunto'] ?? '') == 'certificacion' ? 'selected' : '' ?>>Certificación</option>
                            <option value="otro" <?= ($form_data['asunto'] ?? '') == 'otro' ? 'selected' : '' ?>>Otro</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="mensaje">Mensaje *</label>
                        <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribe tu consulta aquí..." required><?= e($form_data['mensaje'] ?? '') ?></textarea>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="acepto_terminos" <?= isset($form_data['acepto_terminos']) ? 'checked' : '' ?> required>
                            <span class="checkmark"></span>Acepto los <a href="terminos-condiciones.html" target="_blank">términos y condiciones</a>
                        </label>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Enviar Consulta</button>
                        <button type="reset" class="btn btn-secondary"><i class="fas fa-undo"></i> Limpiar</button>
                    </div>
                </form>
            </div>
        </section>
        

        <section class="seccion-cta">
            <div class="contenedor">
                <div class="cta-content">
                    <h2>¿Aún tienes dudas?</h2>
                    <p>Nuestros asesores están listos para ayudarte a elegir el mejor programa para tu futuro profesional</p>
                    <div class="cta-buttons">
                        <a href="<?= e($sede['whatsapp']) ?>" target="_blank" class="btn btn-primary">
                            <i class="fab fa-whatsapp"></i> Chatear por WhatsApp
                        </a>
                        <a href="ubicacion.php?sede=<?= intval($sede['id']) ?>" class="btn btn-secondary">
                            <i class="fas fa-calendar"></i> Agendar Cita Presencial
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="pie-pagina">
        <div class="contenedor">
            <div class="columna contacto">
                <h5>Contacto Sede <?= e($sede['nombre']) ?></h5>
                <p><i class="fas fa-phone"></i> <?= e($sede['telefono']) ?></p>
                <p><i class="fas fa-envelope"></i> info@cetprojct.edu.pe</p>
                <p><i class="fas fa-map-marker-alt"></i> <?= e($sede['direccion']) ?></p>
                <div class="enlace-social-pie">
                    <ul>
                        <li><a href="https://www.facebook.com/flor.mendozaflor" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://www.tiktok.com/@tu-perfil" target="_blank"><i class="fab fa-tiktok"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="columna noticias">
                <h5>Horarios</h5>
                 <div class="noticia">
                    <p><?= e($sede['horario']) ?></p>
                    <span>Atención continua</span>
                </div>
            </div>
            <div class="columna enlaces-rapidos">
                <h5>Enlaces Rápidos</h5>
                <ul>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="programas.html">Programas</a></li>
                    <li><a href="eventos.php">Eventos</a></li>
                    <li><a href="ubicacion.php">Ubicación</a></li>
                    <li><a href="contacto.php">Contacto</a></li>
                </ul>
            </div>
        </div>
        <div class="pie-inferior">
            <p>© <?= date('Y') ?> CETPRO Arsenio Mendoza Flor | Todos los derechos reservados</p>
        </div>
    </footer>

</body>
</html>