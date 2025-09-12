-- =====================================================
-- Base de datos: CETPRO Arsenio Mendoza Flor (Corregida)
-- =====================================================

CREATE DATABASE IF NOT EXISTS cetpro CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE cetpro;

-- =====================================================
-- Tabla: programas (corregido: urldeImagen consistente)
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
-- Tabla: eventos (corregido: urldeImagen)
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
-- Tabla: directiva (corregido: urldeImagen)
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
-- Tabla: colaboradores (corregido: urldeLogo)
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