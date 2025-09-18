-- Base de datos: cetpro
CREATE DATABASE IF NOT EXISTS cetpro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cetpro;

-- Tabla de sedes
CREATE TABLE IF NOT EXISTS sedes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  direccion TEXT NOT NULL,
  codigo_postal VARCHAR(20) DEFAULT NULL,
  telefono VARCHAR(50) DEFAULT NULL,
  whatsapp VARCHAR(100) DEFAULT NULL,
  horario TEXT DEFAULT NULL,
  mapa_embed TEXT NOT NULL,
  link_maps TEXT DEFAULT NULL,
  area_total VARCHAR(50) DEFAULT NULL,
  talleres INT DEFAULT NULL,
  estudiantes VARCHAR(50) DEFAULT NULL,
  imagen_principal VARCHAR(255) DEFAULT NULL,
  rating DECIMAL(3,2) DEFAULT NULL,
  reviews_count INT DEFAULT NULL
) ENGINE=InnoDB;

-- Transportes (cada fila será una "card" en Cómo llegar)
CREATE TABLE IF NOT EXISTS transportes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sede_id INT NOT NULL,
  tipo ENUM('publico','vehiculo','taxi') NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  tiempo_text VARCHAR(50),
  costo_text VARCHAR(50),
  orden INT DEFAULT 0,
  FOREIGN KEY (sede_id) REFERENCES sedes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Referencias y Puntos de Interés
CREATE TABLE IF NOT EXISTS referencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sede_id INT NOT NULL,
  icono_class VARCHAR(100) DEFAULT 'fas fa-map-marker-alt',
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  distancia_text VARCHAR(50),
  orden INT DEFAULT 0,
  FOREIGN KEY (sede_id) REFERENCES sedes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Galería de instalaciones
CREATE TABLE IF NOT EXISTS galeria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sede_id INT NOT NULL,
  titulo VARCHAR(150) DEFAULT NULL,
  descripcion TEXT DEFAULT NULL,
  imagen VARCHAR(255) NOT NULL,
  orden INT DEFAULT 0,
  FOREIGN KEY (sede_id) REFERENCES sedes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insertar sedes de ejemplo (ajusta mapas e info real)
INSERT INTO sedes (nombre, direccion, codigo_postal, telefono, whatsapp, horario, mapa_embed, link_maps, area_total, talleres, estudiantes, imagen_principal, rating, reviews_count)
VALUES
('CETPRO Arsenio Mendoza Flor', 'Intersección, Jr, Cahuide 303, Amarilis', '10003', '+51 925 567 940', 'https://wa.me/51925567940', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10332.702372312939!2d-76.25157580752636!3d-9.942500545026979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c2e907401529%3A0xaaf4a76f7300175d!2sCETPRO%20Arsenio%20Mendoza%20Flor!5e0!3m2!1ses-419!2spe!4v1758227657840!5m2!1ses-419!2spe', 'http://google.com/maps/place/CETPRO+Arsenio+Mendoza+Flor/@-9.9414666,-76.2455671,18.88z/data=!4m10!1m2!2m1!1sCETPRO!3m6!1s0x91a7c2e907401529:0xaaf4a76f7300175d!8m2!3d-9.9419023!4d-76.2449674!15sCgZDRVRQUk-SARBlZHVjYXRpb25fY2VudGVyqgE7EAEqCiIGY2V0cHJvKA4yHxABIhuBT0XnjetdAfn8vPJT-SiLkY8pq8aedWx1j6kyChACIgZjZXRwcm_gAQA!16s%2Fg%2F11cr_d_gdc?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D', '300m²', 7, '150+', 'img/sede-principal.jpg', 4.8, 125),
('CETPRO San Luis Gonzaga', 'Jirón Gral. Prado 564, Huánuco', '10001', '+51 961 361 561', 'https://wa.me/51961361561', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d491.2576159850722!2d-76.2421545!3d-9.928884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c34eb9adbd93%3A0xbdb166db432fe234!2sCETPRO%20SAN%20LUIS%20GONZAGA!5e0!3m2!1ses-419!2spe!4v1758228513638!5m2!1ses-419!2spe', 'https://www.google.com/maps/place/CETPRO+SAN+LUIS+GONZAGA/@-9.928884,-76.2421545,20z/data=!4m10!1m2!2m1!1sCETPRO!3m6!1s0x91a7c34eb9adbd93:0xbdb166db432fe234!8m2!3d-9.928884!4d-76.2417571!15sCgZDRVRQUk9aCCIGY2V0cHJvkgEQZWR1Y2F0aW9uX2NlbnRlcqoBOxABKgoiBmNldHBybygOMh8QASIbgU9F543rXQH5_LzyU_koi5GPKavGnnVsdY-pMgoQAiIGY2V0cHJv4AEA!16s%2Fg%2F11q8vf8fxq?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D', '200m²', 7, '120+', 'img/sede-secundaria-2-SLG.jpg', 4.5, 87),
('CETPRO Augusto Salazar Bondi', 'Jirón 2 de Mayo 1037, Huánuco', '10001', '+51 925 567 940', 'https://wa.me/51925567940', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491.2557615485219!2d-76.24162065040127!3d-9.930119499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c3005442b7eb%3A0x6550e7a336fd8026!2sCETPRO%20AUGUSTO%20SALAZAR%20BONDI!5e0!3m2!1ses-419!2spe!4v1758228774424!5m2!1ses-419!2spe', 'https://www.google.com/maps/place/CETPRO+AUGUSTO+SALAZAR+BONDI/@-9.9301195,-76.2416207,20z/data=!4m10!1m2!2m1!1sCETPRO!3m6!1s0x91a7c3005442b7eb:0x6550e7a336fd8026!8m2!3d-9.9301195!4d-76.2410252!15sCgZDRVRQUk-SAQ9zdHVkeWluZ19jZW50ZXKqATsQASoKIgZjZXRwcm8oDjIfEAEiG4FPReeN610B-fy88lP5KIuRjymrxp51bHWPqTIKEAIiBmNldHByb-ABAA!16s%2Fg%2F11yhr8rqyx?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D', '150m²', 3, '97+', 'img/sede-secundaria-3-ASB.jpg', 4.0, 70),
('CETPRO Kotosh', 'Jirón 2 de Mayo 425, Huánuco', '10001', '062512554', 'https://wa.me/51925567940', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491.24753968978547!2d-76.2452775504013!3d-9.935595399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c2e6fb51996d%3A0x8913bd9716e375e1!2sCETPRO%20%22KOTOSH%22!5e0!3m2!1ses-419!2spe!4v1758229227810!5m2!1ses-419!2spe', 'https://www.google.com/maps/place/CETPRO+%22KOTOSH%22/@-9.9355954,-76.2452776,20z/data=!4m10!1m2!2m1!1sCETPRO!3m6!1s0x91a7c2e6fb51996d:0x8913bd9716e375e1!8m2!3d-9.9355954!4d-76.2446821!15sCgZDRVRQUk9aCCIGY2V0cHJvkgEQdGVjaG5pY2FsX3NjaG9vbKoBOxABKgoiBmNldHBybygOMh8QASIbgU9F543rXQH5_LzyU_koi5GPKavGnnVsdY-pMgoQAiIGY2V0cHJv4AEA!16s%2Fg%2F11cs4ldzxk?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D', '150m²', 5, '130+', 'img/sede-secundaria-4-K.jpg', 4.5, 103);

INSERT INTO transportes (sede_id, tipo, titulo, descripcion, tiempo_text, costo_text) VALUES
-- Sede 1
(1, 'publico', 'Colectivo urbano', 'Colectivos desde la Plaza de Armas hasta Cayhuayna por la Av. Universitaria.', '20 minutos', 'S/ 2.00'),
(1, 'vehiculo', 'Auto particular', 'Ruta directa por Av. Universitaria hasta Cayhuayna.', '10 minutos', 'Combustible aprox. S/ 5.00'),
(1, 'taxi', 'Taxi', 'Servicio de taxi desde el centro hasta Cayhuayna.', '12 minutos', 'S/ 10.00'),

-- Sede 2
(2, 'publico', 'Ómnibus local', 'Ómnibus que conecta el centro con Amarilis por Jr. San Martín.', '15 minutos', 'S/ 1.50'),
(2, 'vehiculo', 'Auto particular', 'Ruta directa desde la Plaza de Armas hasta Amarilis.', '8 minutos', 'Combustible aprox. S/ 4.00'),
(2, 'taxi', 'Taxi', 'Taxi desde el centro hasta Amarilis.', '10 minutos', 'S/ 8.00'),

-- Sede 3
(3, 'publico', 'Combi Pillco Marca', 'Servicios de combi hacia Pillco Marca por Av. Leoncio Prado.', '18 minutos', 'S/ 2.00'),
(3, 'vehiculo', 'Auto particular', 'Ruta rápida desde Huánuco hacia Pillco Marca.', '12 minutos', 'Combustible aprox. S/ 5.50'),
(3, 'taxi', 'Taxi', 'Taxi desde el centro a Pillco Marca.', '14 minutos', 'S/ 9.00'),

-- Sede 4
(4, 'publico', 'Colectivo carretera', 'Colectivos que salen por la Carretera Central hacia Kotosh.', '25 minutos', 'S/ 3.00'),
(4, 'vehiculo', 'Auto particular', 'Ruta directa desde Huánuco hacia Kotosh.', '15 minutos', 'Combustible aprox. S/ 6.00'),
(4, 'taxi', 'Taxi', 'Servicio de taxi directo a Kotosh.', '18 minutos', 'S/ 12.00');

-- ============================
-- REFERENCIAS
-- ============================
INSERT INTO referencias (sede_id, titulo, descripcion, distancia_text) VALUES
-- Sede 1
(1, 'Universidad Nacional Hermilio Valdizán', 'Principal universidad de Huánuco, cercana a Cayhuayna.', '500 m'),
(1, 'Hospital Regional Hermilio Valdizán', 'Centro de salud regional ubicado a pocos minutos.', '700 m'),
(1, 'Mercado de Cayhuayna', 'Zona comercial principal de la localidad.', '300 m'),
(1, 'Comisaría Cayhuayna', 'Puesto policial cercano para seguridad.', '450 m'),

-- Sede 2
(2, 'Mercado de Amarilis', 'Centro de abastos en Amarilis.', '400 m'),
(2, 'Estadio Heraclio Tapia', 'Principal estadio de Huánuco, accesible desde Amarilis.', '1 km'),
(2, 'Centro de Salud Amarilis', 'Puesto de salud cercano.', '500 m'),
(2, 'Plaza Mayor de Amarilis', 'Lugar céntrico de referencia.', '350 m'),

-- Sede 3
(3, 'Centro Comercial Real Plaza', 'Principal mall de Huánuco, ubicado en Pillco Marca.', '600 m'),
(3, 'Universidad de Huánuco', 'Institución privada cercana.', '450 m'),
(3, 'Grifo Primax', 'Estación de servicio sobre Av. Leoncio Prado.', '300 m'),
(3, 'Terminal Terrestre Pillco Marca', 'Terminal de buses interprovinciales.', '800 m'),

-- Sede 4
(4, 'Complejo Arqueológico Kotosh', 'Sitio arqueológico turístico.', '200 m'),
(4, 'Río Higueras', 'Río que atraviesa la zona de Kotosh.', '350 m'),
(4, 'Restaurante campestre El Mirador', 'Lugar turístico y de comida típica.', '500 m'),
(4, 'Puente Kotosh', 'Puente de acceso principal a la zona.', '150 m');

-- ============================
-- GALERÍA
-- ============================
INSERT INTO galeria (sede_id, titulo, descripcion, imagen) VALUES
-- Sede 1
(1, 'Fachada principal', 'Vista frontal del local educativo.', 'img/sede1_fachada.jpg'),
(1, 'Laboratorio de computación', 'Ambiente equipado para informática.', 'img/sede1_lab.jpg'),
(1, 'Taller de confecciones', 'Espacio de práctica para moda y confección.', 'img/sede1_taller.jpg'),
(1, 'Biblioteca', 'Sala de estudio con material de consulta.', 'img/sede1_biblioteca.jpg'),

-- Sede 2
(2, 'Ingreso principal', 'Entrada principal de la sede San Luis Gonzaga.', 'img/sede2_fachada.jpg'),
(2, 'Taller de carpintería', 'Espacio práctico para trabajos en madera.', 'img/sede2_taller.jpg'),
(2, 'Laboratorio de electricidad', 'Ambiente de prácticas eléctricas.', 'img/sede2_lab.jpg'),
(2, 'Sala de reuniones', 'Espacio de coordinación y clases teóricas.', 'img/sede2_sala.jpg'),

-- Sede 3
(3, 'Fachada principal', 'Vista externa de la sede Augusto Salazar Bondi.', 'img/sede3_fachada.jpg'),
(3, 'Laboratorio de cómputo', 'Ambiente moderno para informática.', 'img/sede3_lab.jpg'),
(3, 'Taller de mecánica', 'Espacio de prácticas en mecánica.', 'img/sede3_taller.jpg'),
(3, 'Biblioteca', 'Espacio de consulta y lectura.', 'img/sede3_biblioteca.jpg'),

-- Sede 4
(4, 'Entrada principal', 'Vista del ingreso a la sede Kotosh.', 'img/sede4_fachada.jpg'),
(4, 'Taller de agroindustria', 'Espacio para prácticas agroindustriales.', 'img/sede4_taller.jpg'),
(4, 'Laboratorio de química', 'Ambiente equipado para experimentos.', 'img/sede4_lab.jpg'),
(4, 'Sala de usos múltiples', 'Ambiente para conferencias y eventos.', 'img/sede4_sala.jpg');
