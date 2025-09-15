-- =====================================================
-- Base de datos: CETPRO Arsenio Mendoza Flor (Versión actualizada con tabla sedes)
-- =====================================================

CREATE DATABASE IF NOT EXISTS cetpro CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE cetpro;

-- =====================================================
-- Tabla: programas (corregido)
-- =====================================================
DROP TABLE IF EXISTS programas;
CREATE TABLE programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    duracion VARCHAR(50) NOT NULL,
    creditos INT NOT NULL,
    urldeImagen VARCHAR(255) NOT NULL,
    creado DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO programas (nombre, descripcion, duracion, creditos, urldeImagen) VALUES
('Soporte Técnico en Cómputo', 'Formación en hardware, software y redes', '6 meses', 40, 'computo-1.jpg'),
('Peluquería y Barbería', 'Corte, peinados y tratamientos', '6 meses', 40, 'peluqueria-1.jpg'),
('Mecánica de Motos', 'Mantenimiento y reparación de motos', '6 meses', 40, 'mecanica-1.jpg'),
('Panadería y Pastelería', 'Elaboración de panes y pasteles', '6 meses', 40, 'panaderia-1.jpg');

-- =====================================================
-- Tabla: eventos (corregido)
-- =====================================================
DROP TABLE IF EXISTS eventos;
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    urldeImagen VARCHAR(255) NOT NULL,
    creado DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO eventos (titulo, descripcion, fecha, urldeImagen) VALUES
('Inauguración de Laboratorio de Cómputo', 'Nuevos equipos de última generación para nuestros estudiantes.', '2025-01-15', 'evento1.jpg'),
('Graduación Promoción 2024', 'Ceremonia de graduación de 150 nuevos técnicos profesionales.', '2025-01-10', 'evento2.jpg'),
('Feria de Empleabilidad', 'Conectamos a nuestros egresados con empresas del sector.', '2025-01-05', 'evento3.jpg');

-- =====================================================
-- Tabla: directiva (corregido)
-- =====================================================
DROP TABLE IF EXISTS directiva;
CREATE TABLE directiva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    urldeImagen VARCHAR(255) NOT NULL
);

INSERT INTO directiva (nombre, cargo, descripcion, urldeImagen) VALUES
('Mg. Carlos Mendoza Flores', 'Director General', '25 años de experiencia en educación técnica', 'director.jpg'),
('Lic. María Santos Cruz', 'Subdirectora Académica', 'Especialista en gestión educativa', 'subdirector.jpg'),
('Ing. Roberto Lima Vásquez', 'Coordinador de Programas', 'Experto en desarrollo curricular', 'coordinador.jpg');

-- =====================================================
-- Tabla: colaboradores (corregido)
-- =====================================================
DROP TABLE IF EXISTS colaboradores;
CREATE TABLE colaboradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(255) NOT NULL,
    urldeLogo VARCHAR(255) NOT NULL
);

INSERT INTO colaboradores (nombre_empresa, urldeLogo) VALUES
('Empresa 1', 'empresa1.png'),
('Empresa 2', 'empresa2.png'),
('Empresa 3', 'empresa3.png'),
('Empresa 4', 'empresa4.png');

-- =====================================================
-- Tabla: faq
-- =====================================================
DROP TABLE IF EXISTS faq;
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    respuesta TEXT NOT NULL
);

INSERT INTO faq (pregunta, respuesta) VALUES
('¿Cuál es el costo de los programas?', 'Los costos varían según el programa. Ofrecemos facilidades de pago y becas para estudiantes destacados.'),
('¿Los títulos están reconocidos por el MINEDU?', 'Sí, todos nuestros programas están autorizados por el Ministerio de Educación.'),
('¿Cuál es la duración de los programas?', 'La mayoría de nuestros programas tienen una duración de 6 meses (40 créditos).'),
('¿Ofrecen apoyo para conseguir trabajo?', 'Sí, tenemos una bolsa de trabajo y convenios con empresas de la región.');

-- =====================================================
-- Tabla: inscripciones
-- =====================================================
DROP TABLE IF EXISTS inscripciones;
CREATE TABLE inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    programa_id INT NOT NULL,
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (programa_id) REFERENCES programas(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabla: contacto
-- =====================================================
DROP TABLE IF EXISTS contacto;
CREATE TABLE contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    mensaje TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Nueva Tabla: sedes (para manejar ubicaciones dinámicas)
-- =====================================================
DROP TABLE IF EXISTS sedes;
CREATE TABLE sedes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    iframe_src TEXT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    horario VARCHAR(255) NOT NULL,
    link_directions VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.8,
    resenas INT DEFAULT 127,
    direccion_completa TEXT NOT NULL,
    horarios_detalle JSON NOT NULL,
    contactos_adicionales JSON NOT NULL,
    imagen_sede VARCHAR(255) NOT NULL,
    stats JSON NOT NULL,
    transportes JSON NOT NULL,
    referencias JSON NOT NULL,
    galeria JSON NOT NULL,
    servicios JSON NOT NULL,
    creado DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Datos de ejemplo para sedes (basados en tu HTML/JS, inventados para las otras)
INSERT INTO sedes (
    nombre, iframe_src, direccion, telefono, horario, link_directions,
    direccion_completa, horarios_detalle, contactos_adicionales, imagen_sede,
    stats, transportes, referencias, galeria, servicios
) VALUES
(
    'Sede Yanacancha',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504.5313316258385!2d-76.24513516451646!3d-9.942034954075334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c2e907401529%3A0xaaf4a76f7300175d!2sCETPRO%20Arsenio%20Mendoza%20Flor!5e0!3m2!1ses-419!2spe!4v1757522670966!5m2!1ses-419!2spe',
    'Av. Minero N° 500, Yanacancha - Pasco',
    '+51 954 803 212',
    'Lun - Vie: 8:00 AM - 8:00 PM',
    'https://goo.gl/maps/ejemplo',
    'Av. Minero N° 500\nYanacancha - Pasco\nPerú - Código Postal: 19001',
    '{
        "lunes_viernes": "8:00 AM - 1:00 PM\n3:00 PM - 8:00 PM",
        "sabados": "8:00 AM - 12:00 PM",
        "domingos": "Cerrado"
    }',
    '[
        {"icono": "fa-phone", "texto": "(063) 421-8900", "href": "tel:+51063421890"},
        {"icono": "fa-envelope", "texto": "info@cetprojct.edu.pe", "href": "mailto:info@cetprojct.edu.pe"},
        {"icono": "fab fa-whatsapp", "texto": "WhatsApp", "href": "https://wa.me/51954803212"}
    ]',
    'img/sede-principal.jpg',
    '{
        "area": "2,500m²",
        "talleres": "12",
        "estudiantes": "500+"
    }',
    '{
        "publico": [
            {"numero": "Línea 1", "descripcion": "Centro - Yanacancha"},
            {"numero": "Línea 3", "descripcion": "Terminal - Av. Minero"},
            {"numero": "Combi", "descripcion": "Ruta Yanacancha"}
        ],
        "publico_info": [
            {"icono": "fa-clock", "texto": "15-20 min desde el centro"},
            {"icono": "fa-coins", "texto": "S/ 1.50 - S/ 2.00"}
        ],
        "particular": [
            {"titulo": "Desde el Centro:", "descripcion": "Tomar Av. Los Mineros hacia el norte, continuar por 2.5 km hasta llegar al N° 500."},
            {"titulo": "Desde Chaupimarca:", "descripcion": "Bajar por Av. Centenario, girar en Av. Los Mineros hacia Yanacancha."}
        ],
        "particular_info": [
            {"icono": "fa-clock", "texto": "10-15 min desde el centro"},
            {"icono": "fa-parking", "texto": "Estacionamiento disponible"}
        ],
        "taxi": {
            "descripcion": "Solicita un taxi o Uber con destino a \"CETPRO Arsenio Mendoza Flor\" o \"Av. Minero 500, Yanacancha\".",
            "info": [
                {"icono": "fa-clock", "texto": "8-12 min desde el centro"},
                {"icono": "fa-coins", "texto": "S/ 8.00 - S/ 12.00"}
            ],
            "apps": [
                {"src": "img/uber-logo.png", "alt": "Uber"},
                {"src": "img/beat-logo.png", "alt": "Beat"}
            ]
        }
    }',
    '[
        {"icono": "fa-hospital", "titulo": "Hospital Daniel Alcides Carrión", "descripcion": "A 800 metros de nuestras instalaciones", "distancia": "5 min caminando"},
        {"icono": "fa-shopping-cart", "titulo": "Mercado Modelo Yanacancha", "descripcion": "Principal centro comercial de la zona", "distancia": "10 min caminando"},
        {"icono": "fa-university", "titulo": "Universidad Nacional Daniel Alcides Carrión", "descripcion": "Campus principal de la UNDAC", "distancia": "15 min caminando"},
        {"icono": "fa-gas-pump", "titulo": "Grifo Petroperú", "descripcion": "Estación de servicio en Av. Los Mineros", "distancia": "3 min caminando"},
        {"icono": "fa-landmark", "titulo": "Plaza de Armas Yanacancha", "descripcion": "Centro cívico del distrito", "distancia": "20 min caminando"},
        {"icono": "fa-bus-alt", "titulo": "Terminal de Combis", "descripcion": "Paradero principal de transporte público", "distancia": "12 min caminando"}
    ]',
    '[
        {"src": "img/instalacion-1.jpg", "titulo": "Fachada Principal", "descripcion": "Entrada principal con moderno diseño arquitectónico"},
        {"src": "img/instalacion-2.jpg", "titulo": "Laboratorio de Cómputo", "descripcion": "30 equipos de última generación"},
        {"src": "img/instalacion-3.jpg", "titulo": "Taller de Mecánica", "descripcion": "Equipos profesionales para prácticas"},
        {"src": "img/instalacion-4.jpg", "titulo": "Aula de Peluquería", "descripcion": "Salón completamente equipado"},
        {"src": "img/instalacion-5.jpg", "titulo": "Biblioteca", "descripcion": "Espacio de estudio y consulta"},
        {"src": "img/instalacion-6.jpg", "titulo": "Cafetería", "descripcion": "Área de descanso y alimentación"}
    ]',
    '[
        {"icono": "fa-parking", "titulo": "Estacionamiento", "descripcion": "Espacios seguros para vehículos y motocicletas"},
        {"icono": "fa-wifi", "titulo": "WiFi Gratuito", "descripcion": "Internet de alta velocidad en todas las áreas"},
        {"icono": "fa-wheelchair", "titulo": "Accesibilidad", "descripcion": "Instalaciones adaptadas para personas con discapacidad"},
        {"icono": "fa-shield-alt", "titulo": "Seguridad 24/7", "descripcion": "Vigilancia permanente y cámaras de seguridad"},
        {"icono": "fa-coffee", "titulo": "Cafetería", "descripcion": "Servicio de alimentación y bebidas"},
        {"icono": "fa-first-aid", "titulo": "Tópico", "descripcion": "Atención médica básica y primeros auxilios"},
        {"icono": "fa-book", "titulo": "Biblioteca", "descripcion": "Recursos bibliográficos y espacios de estudio"},
        {"icono": "fa-tools", "titulo": "Talleres Equipados", "descripcion": "Herramientas y maquinaria profesional"}
    ]'
),
(
    'Sede Huánuco Centro',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.9!2d-76.26!3d-10.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM5JzEyLjAiUyA3NsKwMTUnMzYuMCJX!5e0!3m2!1ses!2spe!4v1642000000001!5m2!1ses!2spe',
    'Jr. Dos de Mayo N° 123, Huánuco - Huánuco',
    '+51 962 123 456',
    'Lun - Vie: 9:00 AM - 7:00 PM',
    'https://goo.gl/maps/ejemplo2',
    'Jr. Dos de Mayo N° 123\nHuánuco - Huánuco\nPerú - Código Postal: 10001',
    '{
        "lunes_viernes": "9:00 AM - 12:00 PM\n2:00 PM - 7:00 PM",
        "sabados": "9:00 AM - 1:00 PM",
        "domingos": "Cerrado"
    }',
    '[
        {"icono": "fa-phone", "texto": "(062) 512-345", "href": "tel:+51062512345"},
        {"icono": "fa-envelope", "texto": "centro@cetprojct.edu.pe", "href": "mailto:centro@cetprojct.edu.pe"},
        {"icono": "fab fa-whatsapp", "texto": "WhatsApp", "href": "https://wa.me/51962123456"}
    ]',
    'img/sede-centro.jpg',
    '{
        "area": "1,800m²",
        "talleres": "8",
        "estudiantes": "300+"
    }',
    '{
        "publico": [
            {"numero": "Línea A", "descripcion": "Plaza - Centro"},
            {"numero": "Línea B", "descripcion": "Terminal - Jr. Dos de Mayo"},
            {"numero": "Colectivo", "descripcion": "Ruta Huánuco"}
        ],
        "publico_info": [
            {"icono": "fa-clock", "texto": "10-15 min desde la plaza"},
            {"icono": "fa-coins", "texto": "S/ 1.00 - S/ 1.50"}
        ],
        "particular": [
            {"titulo": "Desde la Plaza:", "descripcion": "Tomar Jr. Huánuco hacia el este, continuar por 1 km."},
            {"titulo": "Desde Aeropuerto:", "descripcion": "Bajar por Av. Principal, girar en Jr. Dos de Mayo."}
        ],
        "particular_info": [
            {"icono": "fa-clock", "texto": "5-10 min desde la plaza"},
            {"icono": "fa-parking", "texto": "Estacionamiento limitado"}
        ],
        "taxi": {
            "descripcion": "Solicita un taxi con destino a \"CETPRO Sede Centro\" o \"Jr. Dos de Mayo 123\".",
            "info": [
                {"icono": "fa-clock", "texto": "5-8 min desde la plaza"},
                {"icono": "fa-coins", "texto": "S/ 5.00 - S/ 8.00"}
            ],
            "apps": [
                {"src": "img/uber-logo.png", "alt": "Uber"},
                {"src": "img/beat-logo.png", "alt": "Beat"}
            ]
        }
    }',
    '[
        {"icono": "fa-hospital", "titulo": "Hospital Huánuco", "descripcion": "A 500 metros", "distancia": "3 min caminando"},
        {"icono": "fa-shopping-cart", "titulo": "Mercado Central", "descripcion": "Centro comercial principal", "distancia": "5 min caminando"},
        {"icono": "fa-university", "titulo": "Universidad Huánuco", "descripcion": "Campus central", "distancia": "10 min caminando"},
        {"icono": "fa-gas-pump", "titulo": "Grifo Central", "descripcion": "Estación en Jr. Dos de Mayo", "distancia": "2 min caminando"},
        {"icono": "fa-landmark", "titulo": "Plaza de Armas Huánuco", "descripcion": "Centro cívico", "distancia": "8 min caminando"},
        {"icono": "fa-bus-alt", "titulo": "Terminal Central", "descripcion": "Paradero de buses", "distancia": "7 min caminando"}
    ]',
    '[
        {"src": "img/centro-1.jpg", "titulo": "Fachada Centro", "descripcion": "Entrada moderna"},
        {"src": "img/centro-2.jpg", "titulo": "Lab Cómputo Centro", "descripcion": "20 equipos"},
        {"src": "img/centro-3.jpg", "titulo": "Taller Mecánica Centro", "descripcion": "Equipos básicos"},
        {"src": "img/centro-4.jpg", "titulo": "Aula Peluquería Centro", "descripcion": "Salón equipado"},
        {"src": "img/centro-5.jpg", "titulo": "Biblioteca Centro", "descripcion": "Espacio estudio"},
        {"src": "img/centro-6.jpg", "titulo": "Cafetería Centro", "descripcion": "Área descanso"}
    ]',
    '[
        {"icono": "fa-parking", "titulo": "Estacionamiento", "descripcion": "Espacios limitados"},
        {"icono": "fa-wifi", "titulo": "WiFi Gratuito", "descripcion": "Alta velocidad"},
        {"icono": "fa-wheelchair", "titulo": "Accesibilidad", "descripcion": "Adaptado"},
        {"icono": "fa-shield-alt", "titulo": "Seguridad 24/7", "descripcion": "Vigilancia"},
        {"icono": "fa-coffee", "titulo": "Cafetería", "descripcion": "Bebidas"},
        {"icono": "fa-first-aid", "titulo": "Tópico", "descripcion": "Primeros auxilios"},
        {"icono": "fa-book", "titulo": "Biblioteca", "descripcion": "Recursos"},
        {"icono": "fa-tools", "titulo": "Talleres", "descripcion": "Herramientas"}
    ]'
),
(
    'Sede Amarilis',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.9!2d-76.24!3d-10.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM4JzQ4LjAiUyA3NsKwMTQnMjQuMCJX!5e0!3m2!1ses!2spe!4v1642000000002!5m2!1ses!2spe',
    'Av. Independencia N° 200, Amarilis - Huánuco',
    '+51 963 456 789',
    'Lun - Vie: 8:30 AM - 6:30 PM',
    'https://goo.gl/maps/ejemplo3',
    'Av. Independencia N° 200\nAmarilis - Huánuco\nPerú - Código Postal: 10002',
    '{
        "lunes_viernes": "8:30 AM - 12:30 PM\n2:30 PM - 6:30 PM",
        "sabados": "8:30 AM - 12:30 PM",
        "domingos": "Cerrado"
    }',
    '[
        {"icono": "fa-phone", "texto": "(062) 513-456", "href": "tel:+51062513456"},
        {"icono": "fa-envelope", "texto": "amarilis@cetprojct.edu.pe", "href": "mailto:amarilis@cetprojct.edu.pe"},
        {"icono": "fab fa-whatsapp", "texto": "WhatsApp", "href": "https://wa.me/51963456789"}
    ]',
    'img/sede-amarilis.jpg',
    '{
        "area": "2,000m²",
        "talleres": "10",
        "estudiantes": "400+"
    }',
    '{
        "publico": [
            {"numero": "Línea C", "descripcion": "Amarilis - Centro"},
            {"numero": "Línea D", "descripcion": "Terminal - Av. Independencia"},
            {"numero": "Colectivo", "descripcion": "Ruta Amarilis"}
        ],
        "publico_info": [
            {"icono": "fa-clock", "texto": "12-18 min desde centro"},
            {"icono": "fa-coins", "texto": "S/ 1.20 - S/ 1.80"}
        ],
        "particular": [
            {"titulo": "Desde Centro:", "descripcion": "Tomar Av. Independencia hacia el sur, 1.5 km."},
            {"titulo": "Desde Pillco:", "descripcion": "Girar en Av. Independencia."}
        ],
        "particular_info": [
            {"icono": "fa-clock", "texto": "8-12 min desde centro"},
            {"icono": "fa-parking", "texto": "Estacionamiento disponible"}
        ],
        "taxi": {
            "descripcion": "Destino \"CETPRO Sede Amarilis\" o \"Av. Independencia 200\".",
            "info": [
                {"icono": "fa-clock", "texto": "6-10 min desde centro"},
                {"icono": "fa-coins", "texto": "S/ 6.00 - S/ 10.00"}
            ],
            "apps": [
                {"src": "img/uber-logo.png", "alt": "Uber"},
                {"src": "img/beat-logo.png", "alt": "Beat"}
            ]
        }
    }',
    '[
        {"icono": "fa-hospital", "titulo": "Clínica Amarilis", "descripcion": "A 600 metros", "distancia": "4 min caminando"},
        {"icono": "fa-shopping-cart", "titulo": "Mercado Amarilis", "descripcion": "Comercial zona", "distancia": "8 min caminando"},
        {"icono": "fa-university", "titulo": "Universidad Amarilis", "descripcion": "Campus local", "distancia": "12 min caminando"},
        {"icono": "fa-gas-pump", "titulo": "Grifo Amarilis", "descripcion": "Estación Av. Independencia", "distancia": "2 min caminando"},
        {"icono": "fa-landmark", "titulo": "Plaza Amarilis", "descripcion": "Centro distrito", "distancia": "15 min caminando"},
        {"icono": "fa-bus-alt", "titulo": "Paradero Amarilis", "descripcion": "Transporte público", "distancia": "10 min caminando"}
    ]',
    '[
        {"src": "img/amarilis-1.jpg", "titulo": "Fachada Amarilis", "descripcion": "Entrada diseño"},
        {"src": "img/amarilis-2.jpg", "titulo": "Lab Cómputo", "descripcion": "25 equipos"},
        {"src": "img/amarilis-3.jpg", "titulo": "Taller Mecánica", "descripcion": "Prácticas"},
        {"src": "img/amarilis-4.jpg", "titulo": "Aula Peluquería", "descripcion": "Equipado"},
        {"src": "img/amarilis-5.jpg", "titulo": "Biblioteca", "descripcion": "Estudio"},
        {"src": "img/amarilis-6.jpg", "titulo": "Cafetería", "descripcion": "Descanso"}
    ]',
    '[
        {"icono": "fa-parking", "titulo": "Estacionamiento", "descripcion": "Seguros"},
        {"icono": "fa-wifi", "titulo": "WiFi", "descripcion": "Alta velocidad"},
        {"icono": "fa-wheelchair", "titulo": "Accesibilidad", "descripcion": "Adaptadas"},
        {"icono": "fa-shield-alt", "titulo": "Seguridad", "descripcion": "Permanente"},
        {"icono": "fa-coffee", "titulo": "Cafetería", "descripcion": "Alimentación"},
        {"icono": "fa-first-aid", "titulo": "Tópico", "descripcion": "Auxilios"},
        {"icono": "fa-book", "titulo": "Biblioteca", "descripcion": "Recursos"},
        {"icono": "fa-tools", "titulo": "Talleres", "descripcion": "Maquinaria"}
    ]'
),
(
    'Sede Pillco Marca',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.9!2d-76.27!3d-10.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM5JzI0LjAiUyA3NsKwMTYnMTIuMCJX!5e0!3m2!1ses!2spe!4v1642000000003!5m2!1ses!2spe',
    'Calle Los Olivos N° 300, Pillco Marca - Huánuco',
    '+51 961 789 123',
    'Lun - Vie: 7:30 AM - 5:30 PM',
    'https://goo.gl/maps/ejemplo4',
    'Calle Los Olivos N° 300\nPillco Marca - Huánuco\nPerú - Código Postal: 10003',
    '{
        "lunes_viernes": "7:30 AM - 12:00 PM\n1:30 PM - 5:30 PM",
        "sabados": "7:30 AM - 11:30 AM",
        "domingos": "Cerrado"
    }',
    '[
        {"icono": "fa-phone", "texto": "(062) 514-567", "href": "tel:+51062514567"},
        {"icono": "fa-envelope", "texto": "pillco@cetprojct.edu.pe", "href": "mailto:pillco@cetprojct.edu.pe"},
        {"icono": "fab fa-whatsapp", "texto": "WhatsApp", "href": "https://wa.me/51961789123"}
    ]',
    'img/sede-pillco.jpg',
    '{
        "area": "2,200m²",
        "talleres": "11",
        "estudiantes": "450+"
    }',
    '{
        "publico": [
            {"numero": "Línea E", "descripcion": "Pillco - Centro"},
            {"numero": "Línea F", "descripcion": "Terminal - Calle Los Olivos"},
            {"numero": "Colectivo", "descripcion": "Ruta Pillco Marca"}
        ],
        "publico_info": [
            {"icono": "fa-clock", "texto": "18-25 min desde centro"},
            {"icono": "fa-coins", "texto": "S/ 1.80 - S/ 2.50"}
        ],
        "particular": [
            {"titulo": "Desde Centro:", "descripcion": "Tomar ruta a Pillco, 3 km."},
            {"titulo": "Desde Amarilis:", "descripcion": "Girar en Calle Los Olivos."}
        ],
        "particular_info": [
            {"icono": "fa-clock", "texto": "12-18 min desde centro"},
            {"icono": "fa-parking", "texto": "Estacionamiento amplio"}
        ],
        "taxi": {
            "descripcion": "Destino \"CETPRO Sede Pillco Marca\" o \"Calle Los Olivos 300\".",
            "info": [
                {"icono": "fa-clock", "texto": "10-15 min desde centro"},
                {"icono": "fa-coins", "texto": "S/ 10.00 - S/ 15.00"}
            ],
            "apps": [
                {"src": "img/uber-logo.png", "alt": "Uber"},
                {"src": "img/beat-logo.png", "alt": "Beat"}
            ]
        }
    }',
    '[
        {"icono": "fa-hospital", "titulo": "Hospital Pillco", "descripcion": "A 1 km", "distancia": "7 min caminando"},
        {"icono": "fa-shopping-cart", "titulo": "Mercado Pillco", "descripcion": "Zona comercial", "distancia": "12 min caminando"},
        {"icono": "fa-university", "titulo": "Universidad Pillco", "descripcion": "Campus", "distancia": "18 min caminando"},
        {"icono": "fa-gas-pump", "titulo": "Grifo Pillco", "descripcion": "Estación Calle Los Olivos", "distancia": "4 min caminando"},
        {"icono": "fa-landmark", "titulo": "Plaza Pillco", "descripcion": "Centro", "distancia": "25 min caminando"},
        {"icono": "fa-bus-alt", "titulo": "Terminal Pillco", "descripcion": "Paradero", "distancia": "15 min caminando"}
    ]',
    '[
        {"src": "img/pillco-1.jpg", "titulo": "Fachada Pillco", "descripcion": "Entrada"},
        {"src": "img/pillco-2.jpg", "titulo": "Lab Cómputo", "descripcion": "Equipos"},
        {"src": "img/pillco-3.jpg", "titulo": "Taller Mecánica", "descripcion": "Prácticas"},
        {"src": "img/pillco-4.jpg", "titulo": "Aula Peluquería", "descripcion": "Salón"},
        {"src": "img/pillco-5.jpg", "titulo": "Biblioteca", "descripcion": "Estudio"},
        {"src": "img/pillco-6.jpg", "titulo": "Cafetería", "descripcion": "Descanso"}
    ]',
    '[
        {"icono": "fa-parking", "titulo": "Estacionamiento", "descripcion": "Amplio"},
        {"icono": "fa-wifi", "titulo": "WiFi", "descripcion": "Gratuito"},
        {"icono": "fa-wheelchair", "titulo": "Accesibilidad", "descripcion": "Completa"},
        {"icono": "fa-shield-alt", "titulo": "Seguridad", "descripcion": "24/7"},
        {"icono": "fa-coffee", "titulo": "Cafetería", "descripcion": "Servicio"},
        {"icono": "fa-first-aid", "titulo": "Tópico", "descripcion": "Médica"},
        {"icono": "fa-book", "titulo": "Biblioteca", "descripcion": "Bibliográficos"},
        {"icono": "fa-tools", "titulo": "Talleres", "descripcion": "Profesional"}
    ]'
);