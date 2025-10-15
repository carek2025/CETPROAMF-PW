-- Base de datos: cetpro
CREATE DATABASE IF NOT EXISTS cetpro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cetpro;
ALTER USER 'cetpro_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'OsiveArsenio2021@';
GRANT ALL PRIVILEGES ON cetpro.* TO 'cetpro_admin'@'localhost';
FLUSH PRIVILEGES;
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
('CETPRO Arsenio Mendoza Flor - Sede Principal Huánuco', 'Intersección, Jr, Cahuide 303, Amarilis', '10003', '+51 925 567 940', 'https://wa.me/51925567940', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10332.702372312939!2d-76.25157580752636!3d-9.942500545026979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c2e907401529%3A0xaaf4a76f7300175d!2sCETPRO%20Arsenio%20Mendoza%20Flor!5e0!3m2!1ses-419!2spe!4v1758227657840!5m2!1ses-419!2spe', 'http://google.com/maps/place/CETPRO+Arsenio+Mendoza+Flor/@-9.9414666,-76.2455671,18.88z/data=!4m10!1m2!2m1!1sCETPRO!3m6!1s0x91a7c2e907401529:0xaaf4a76f7300175d!8m2!3d-9.9419023!4d-76.2449674!15sCgZDRVRQUk-SARBlZHVjYXRpb25fY2VudGVyqgE7EAEqCiIGY2V0cHJvKA4yHxABIhuBT0XnjetdAfn8vPJT-SiLkY8pq8aedWx1j6kyChACIgZjZXRwcm_gAQA!16s%2Fg%2F11cr_d_gdc?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D', '300m²', 7, '150+', 'img/sedes/sede-principal.jpeg', 4.8, 125),
('CETPRO Arsenio Mendoza Flor - Sede Cayrán', 'Junto al Estadio Municipal', '10031', '+51 936 800 684', 'https://wa.me/51936800684', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3929.4035427838276!2d-76.28759012496906!3d-9.983485790121062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNTknMDAuNiJTIDc2wrAxNycwNi4xIlc!5e0!3m2!1ses!2spe!4v1759853419616!5m2!1ses!2spe', "https://www.google.com/maps/place/9%C2%B059'00.6%22S+76%C2%B017'06.1%22W/@-9.9834858,-76.2875901,17z/data=!4m4!3m3!8m2!3d-9.9834858!4d-76.2850152?hl=es&entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D", '200m²', 7, '120+', 'img/sedes/sede-cayran.jpeg', 4.5, 87),
('CETPRO Arsenio Mendoza Flor - Sede Malconga', 'El Tambo – Malconga – Amarilis', '10000', '+51 951 423 522', 'https://wa.me/51951423522', 'Lun - Vie: 8:30 AM - 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4774.442051161222!2d-76.17030332496982!3d-9.926683390175013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNTUnMzYuMSJTIDc2wrAxMCcwMy44Ilc!5e1!3m2!1ses!2spe!4v1759854225076!5m2!1ses!2spe', "https://www.google.com/maps/place/9%C2%B055'36.1%22S+76%C2%B010'03.8%22W/@-9.9266834,-76.1703033,1096m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d-9.9266834!4d-76.1677284?hl=es&entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D", '150m²', 3, '97+', 'img/sedes/sede-malconga.jpeg', 4.0, 70),
('CETPRO Arsenio Mendoza Flor - Sede Panao', 'Pura Pampa (ex Universidad Hermilio Valdizán) – Panao – Pachitea', '10001', '+51 951 375 526', 'https://wa.me/51951375526','Lun - Vie: 8:30 AM - 6:30 PM','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4774.938381800517!2d-75.983813918711!3d-9.8925913933512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7bd057a29c9bd%3A0x2771b928ee7ab22a!2sI.E%2033209%20PURUPAMPA!5e1!3m2!1ses!2spe!4v1759854712833!5m2!1ses!2spe', 'https://www.google.com/maps/place/I.E+33209+PURUPAMPA/@-9.8925914,-75.9838139,1097m/data=!3m1!1e3!4m6!3m5!1s0x91a7bd057a29c9bd:0x2771b928ee7ab22a!8m2!3d-9.8925982!4d-75.9838187!16s%2Fg%2F11q2skqh58?hl=es&entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D', '150m²', 5, '130+', 'img/sede-secundaria-4-K.jpeg', 4.5, 103);

-- ============================
-- TRANSPORTES
-- ============================
INSERT INTO transportes (sede_id, tipo, titulo, descripcion, tiempo_text, costo_text) VALUES
-- SEDE 1: Huánuco (Sede Principal)
(1, 'publico', 'Colectivo urbano', 'Colectivos desde la Plaza de Armas hasta Amarilis por Av. Universitaria.', '15 minutos', 'S/ 2.00'),
(1, 'vehiculo', 'Auto particular', 'Ruta directa por Av. Universitaria hasta la sede principal.', '8 minutos', 'Combustible aprox. S/ 4.50'),
(1, 'taxi', 'Taxi', 'Servicio de taxi desde el centro de Huánuco hasta la sede principal.', '10 minutos', 'S/ 9.00'),

-- SEDE 2: Cayrán
(2, 'publico', 'Colectivo Cayrán', 'Colectivos que salen desde el terminal de Amarilis hacia Cayrán.', '35 minutos', 'S/ 4.00'),
(2, 'vehiculo', 'Auto particular', 'Ruta por la carretera hacia Cayrán pasando por Santa María del Valle.', '25 minutos', 'Combustible aprox. S/ 10.00'),
(2, 'taxi', 'Taxi', 'Servicio de taxi desde Amarilis hacia Cayrán.', '28 minutos', 'S/ 25.00'),

-- SEDE 3: Malconga
(3, 'publico', 'Combi a Malconga', 'Combis y colectivos desde Huánuco hacia Malconga (Amarilis – El Tambo).', '20 minutos', 'S/ 2.50'),
(3, 'vehiculo', 'Auto particular', 'Ruta directa por la carretera Amarilis – El Tambo hasta Malconga.', '12 minutos', 'Combustible aprox. S/ 5.00'),
(3, 'taxi', 'Taxi', 'Servicio de taxi desde el centro de Huánuco hacia Malconga.', '15 minutos', 'S/ 10.00'),

-- SEDE 4: Panao
(4, 'publico', 'Colectivo Panao', 'Colectivos que parten desde Huánuco hacia Panao por la carretera a Pachitea.', '2 h 30 min', 'S/ 20.00'),
(4, 'vehiculo', 'Auto particular', 'Ruta directa por la carretera Huánuco – Tingo Chico – Panao.', '2 h', 'Combustible aprox. S/ 40.00'),
(4, 'taxi', 'Taxi', 'Servicio de taxi interprovincial hacia Panao.', '2 h', 'S/ 80.00');

-- ============================
-- REFERENCIAS
-- ============================
INSERT INTO referencias (sede_id, titulo, descripcion, distancia_text) VALUES
-- SEDE 1: Huánuco
(1, 'Universidad Nacional Hermilio Valdizán', 'Principal universidad de Huánuco, cercana a Amarilis.', '500 m'),
(1, 'Hospital Regional Hermilio Valdizán', 'Centro de salud regional ubicado a pocos minutos.', '700 m'),
(1, 'Mercado de Amarilis', 'Zona comercial principal de Amarilis.', '300 m'),
(1, 'Plaza de Amarilis', 'Punto céntrico de referencia en Amarilis.', '350 m'),

-- SEDE 2: Cayrán
(2, 'Estadio Municipal de Cayrán', 'Campo deportivo principal del distrito.', '100 m'),
(2, 'Municipalidad Distrital de Cayrán', 'Oficina administrativa cercana a la sede.', '250 m'),
(2, 'Parroquia San Pedro de Cayrán', 'Templo principal del pueblo.', '300 m'),
(2, 'Plaza Principal de Cayrán', 'Lugar central y punto de reunión del distrito.', '200 m'),

-- SEDE 3: Malconga
(3, 'Institución Educativa El Tambo', 'Centro educativo más cercano a la sede.', '250 m'),
(3, 'Mercado de Malconga', 'Pequeño mercado local de abastos.', '300 m'),
(3, 'Grifo El Tambo', 'Estación de servicio más próxima.', '400 m'),
(3, 'Puente Amarilis', 'Punto de conexión vial hacia Huánuco.', '800 m'),

-- SEDE 4: Panao
(4, 'Plaza Principal de Panao', 'Centro urbano y social del distrito.', '500 m'),
(4, 'Municipalidad Provincial de Pachitea', 'Sede administrativa principal.', '600 m'),
(4, 'Colegio Purupampa', 'Institución educativa colindante con el CETPRO.', '50 m'),
(4, 'Parroquia Santa Rosa de Panao', 'Templo principal de la ciudad.', '700 m');

-- ============================
-- GALERÍA
-- ============================
INSERT INTO galeria (sede_id, titulo, descripcion, imagen) VALUES
-- Sede 1
(1, 'taller de Corte Y Ensamblaje -- Parte 1', 'vista del taller en vido de corte y ensamblaje.', 'img/sede-huanuco/img-1.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 2', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-2.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 3', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-3.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 4', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-4.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 5', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-5.jpeg'),

(1, 'Graduacion de los Estudiantes', 'La Ceremonia Graduacion en la sede principal Huanuco.', 'img/sede-huanuco/img-6.jpeg'),
(1, 'Desfile en la Plaza de Armas -- Parte 1', 'Desfile de 42avo Aniversario del Distrito de Amarilis -- Desfilando', 'img/sede-huanuco/img-7.jpeg'),
(1, 'Desfile en la Plaza de Armas -- Parte 2', 'Desfile de 42avo Aniversario del Distrito de Amarilis -- Posando', 'img/sede-huanuco/img-8.jpeg'),
(1, 'Feria Deportiva', 'Competencia de voley entre salones.', 'img/sede-huanuco/img-9.jpeg'),
(1, 'Simulacro de Salud', 'Simulacro de salud realizada en la sede principal de huanuco', 'img/sede-huanuco/img-10.jpeg'),
(1, 'Foto del Equipo Academico del Cetpro', 'Foto posando del Equipo del Cetpro', 'img/sede-huanuco/img-11.jpeg'),

(1, 'taller de Corte Y Ensamblaje -- Parte 6', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-12.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 7', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-13.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 8', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-14.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 9', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-15.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 10', 'vista del taller en vivo de corte y ensamblaje.', 'img/sede-huanuco/img-16.jpeg'),

(1, 'taller de Corte Y Ensamblaje -- Parte 11', 'Captura de momentos de los estudiantes - Parte 1.', 'img/sede-huanuco/img-17.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 12', 'Captura de momentos de los estudiantes - Parte 2.', 'img/sede-huanuco/img-18.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 13', 'Captura de momentos de los estudiantes - Parte 3.', 'img/sede-huanuco/img-19.jpeg'),
(1, 'taller de Corte Y Ensamblaje -- Parte 14', 'Captura de momentos de los estudiantes - Parte 4.', 'img/sede-huanuco/img-20.jpeg'),



-- Sede 2
(2, 'taller de Panaderia y Pasteleria -- Etapa Pananderia -1', 'vista del taller en vido de panaderia y pasteleria.', 'img/sede-cayran/img-1.jpeg'),
(2, 'taller de Panaderia y Pasteleria -- Etapa Pananderia -2', 'vista del taller en vido de panaderia y pasteleria.', 'img/sede-cayran/img-2.jpeg'),
(2, 'taller de Panaderia y Pasteleria -- Etapa Pananderia -3', 'vista del taller en vido de panaderia y pasteleria.', 'img/sede-cayran/img-3.jpeg'),
(2, 'taller de Panaderia y Pasteleria -- Etapa Pananderia -4', 'vista del taller en vido de panaderia y pasteleria.', 'img/sede-cayran/img-4.jpeg'),
(2, 'taller de Panaderia y Pasteleria -- Etapa Pasteleria -1', 'vista del taller en vido de panaderia y pasteleria.', 'img/sede-cayran/img-5.jpeg'),
(2, 'taller de Panaderia y Pasteleria -- Etapa Pasteleria -2', 'vista del taller en vido de panaderia y pasteleria.', 'img/sede-cayran/img-6.jpeg'),

-- Sede 3
(3, 'Taller de Panaderia y pasteleria - fotos del alrededor 1', 'Vista de la zona de ingredientes del taller.', 'img/sede-malconga/img-6.jpeg'),
(3, 'Taller de Panaderia y pasteleria - fotos del alrededor 2', 'Vista de la sona de cubiertos, herraminetas y aparatos electricos para realizar las actviidades del taller.', 'img/sede-malconga/img-6.jpeg'),
(3, 'inauguracion del taller', 'Inauguracion del taller de panaderia y pasteleria de la sede malconga.', 'img/sede-malconga/img-1.jpeg'),
(3, 'Nuevo Horno del taller', 'Nuevo horno comprada para el taller.', 'img/sede-malconga/img-13.jpeg'),
(3, 'Nuevo batidor del taller', 'Nueva batidora comprada para el taller.', 'img/sede-malconga/img-12.jpeg'),
(3, 'Nuevas Mesas del taller', 'Nuevas Mesas compradas para el taller.', 'img/sede-malconga/img-13.jpeg'),
(3, 'Taller de Panaderia y pasteleria - parte 1', 'Vista a al clase en vivo del taller de panaderia y pasteleria.', 'img/sede-malconga/img-2.jpeg'),
(3, 'Taller de Panaderia y pasteleria - parte 2', 'Vista a al clase en vivo del taller de panaderia y pasteleria.', 'img/sede-malconga/img-3.jpeg'),

(3, 'Taller de Confección textil - Diseñado 1', 'Vista a al clase en vivo del taller de confección textil en la parte de diseñado.', 'img/sede-malconga/img-7.jpeg'),
(3, 'Taller de Confección textil - Diseñado 2', 'Vista a al clase en vivo del taller de confección textil en la parte de diseñado.', 'img/sede-malconga/img-8.jpeg'),
(3, 'Taller de Confección textil - Diseñado 3', 'Vista a al clase en vivo del taller de confección textil en la parte de diseñado.', 'img/sede-malconga/img-9.jpeg'),
(3, 'Taller de Confección textil - Cocido 1', 'Vista a al clase en vivo del taller de confección textil en la parte de cocido.', 'img/sede-malconga/img-10.jpeg'),
(3, 'Taller de Confección textil - Cocido 2', 'Vista a al clase en vivo del taller de confección textil en la parte de cocido.', 'img/sede-malconga/img-11.jpeg'),


-- Sede 4
(4, 'Inaugaracion de los Salones de la Sede Panao', 'Inaugaracion de los salones y equipos - 1.', 'img/sede-panao/img-1.jpeg'),
(4, 'Inaugaracion de los Salones de la Sede Panao', 'Inaugaracion de los salones y equipos - 2.', 'img/sede-panao/img-2.jpeg'),
(4, 'Inaugaracion de los Salones de la Sede Panao', 'Inaugaracion de los salones de Confección Textil - 1.', 'img/sede-panao/img-3.jpeg'),
(4, 'Inaugaracion del Bautizo de Botella de Champan', 'Esta tradicion simboliza la buena fortuna y el inicio de un nuevo espacio o proyecto', 'img/sede-panao/img-4.jpeg'),
(4, 'Inaugaracion de los Salones de la Sede Panao', 'Inaugaracion de los salones de Confección Textil - 2.', 'img/sede-panao/img-5.jpeg'),

(4, 'Celebracion y Canto del Himno Nacional del Perú', 'Esta tradicion simboliza la pertenencia a nuestro querido Perú', 'img/sede-panao/img-6.jpeg'),

(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 1.', 'img/sede-panao/img-7.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 2.', 'img/sede-panao/img-8.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 3.', 'img/sede-panao/img-9.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 4.', 'img/sede-panao/img-10.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 5.', 'img/sede-panao/img-11.jpeg'),

(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 6.', 'img/sede-panao/img-12.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 7.', 'img/sede-panao/img-13.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 8.', 'img/sede-panao/img-14.jpeg'),
(4, 'Salones e Equipos del Taller Mecanica de Motos de la Sede Panao', 'Clases en vivo del Taller Mecanico de Motos- 9.', 'img/sede-panao/img-15.jpeg'),

(4, 'Inauguracion del Taller Mecanica de Motos de la Sede Panao', 'Foto del momento de la inauguracion del Taller Mecanico de Motos con la directiva de la sub Sede Panao.', 'img/sede-panao/img-16.jpeg'),
(4, 'Inauguracion del Taller Mecanica de Motos de la Sede Panao', 'Caminata de reconocimiento del Taller Mecanico de Motos', 'img/sede-panao/img-17.jpeg'),
(4, 'Inauguracion del Taller Mecanica de Motos de la Sede Panao', 'Caminata de reconocimiento del Taller Mecanico de Motos', 'img/sede-panao/img-18.jpeg'),

(4, 'Exposicion a los Colegios', 'Exposicion esobre los Beneficios que les brinda la educacion superior impartida por Cetpro -- Parte 1', 'img/sede-panao/img-19.jpeg'),
(4, 'Exposicion a los Colegios', 'Exposicion esobre los Beneficios que les brinda la educacion superior impartida por Cetpro -- Parte 2', 'img/sede-panao/img-20.jpeg'),
(4, 'Exposicion a los Colegios', 'Exposicion esobre los Beneficios que les brinda la educacion superior impartida por Cetpro -- Parte 3', 'img/sede-panao/img-21.jpeg'),
(4, 'Exposicion a los Colegios', 'Exposicion esobre los Beneficios que les brinda la educacion superior impartida por Cetpro -- Parte 4', 'img/sede-panao/img-22.jpeg'),
(4, 'Exposicion a los Colegios', 'Exposicion esobre los Beneficios que les brinda la educacion superior impartida por Cetpro -- Parte 5', 'img/sede-panao/img-23.jpeg'),

(4, 'Salones e Equipos del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo del Taller de Confeccion Textil- 3.', 'img/sede-panao/img-24.jpeg'),
(4, 'Salones e Equipos del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo del Taller de Confeccion Textil- 4.', 'img/sede-panao/img-25.jpeg'),
(4, 'Salones e Equipos del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo del Taller de Confeccion Textil- 5.', 'img/sede-panao/img-26.jpeg'),
(4, 'Salones e Equipos del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo del Taller de Confeccion Textil- 6.', 'img/sede-panao/img-27.jpeg'),

(4, 'Actividades al aire libre del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo al aire libre realizando actividades del Taller de Confeccion Textil.', 'img/sede-panao/img-28.jpeg'),
(4, 'Actividades al aire libre del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo al aire libre realizando actividades del Taller de Confeccion Textil.', 'img/sede-panao/img-29.jpeg'),
(4, 'Actividades al aire libre del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo al aire libre realizando actividades del Taller de Confeccion Textil.', 'img/sede-panao/img-30.jpeg'),
(4, 'Actividades al aire libre del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo al aire libre realizando actividades del Taller de Confeccion Textil.', 'img/sede-panao/img-31.jpeg'),
(4, 'Actividades al aire libre del Taller de Confeccion Textil de la Sede Panao', 'Clases en vivo al aire libre realizando actividades del Taller de Confeccion Textil.', 'img/sede-panao/img-32.jpeg'),

(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 1', 'img/sede-panao/img-33.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 2', 'img/sede-panao/img-34.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 3', 'img/sede-panao/img-35.jpeg'),

(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño en Papel con Mediciones', 'img/sede-panao/img-36.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño en Cartulina con Cortes - Parte 1', 'img/sede-panao/img-37.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño en Cartulina con Cortes - Parte 2', 'img/sede-panao/img-38.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño en Cartulina con Cortes - Parte 3', 'img/sede-panao/img-39.jpeg'),

(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 4', 'img/sede-panao/img-40.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 5', 'img/sede-panao/img-41.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 6', 'img/sede-panao/img-42.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 7', 'img/sede-panao/img-43.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 8', 'img/sede-panao/img-44.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Confección en Maquina - Foto 9', 'img/sede-panao/img-45.jpeg'),

(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño y Mediciones con Cortes en Ropa - Parte 1', 'img/sede-panao/img-46.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño y Mediciones con Cortes en Ropa - Parte 2', 'img/sede-panao/img-47.jpeg'),(4, 'Clases en vivo del Taller de Confeccion Textil', 'Actividades de Diseño y Mediciones con Cortes en Ropa - Parte 3', 'img/sede-panao/img-48.jpeg'),

(4, 'Clases en vivo del Taller de Confeccion Textil', 'Clases de Teoria sobre la etapa de Diseñar - Parte 1', 'img/sede-panao/img-49.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Clases de Teoria sobre la etapa de Diseñar - Parte 2', 'img/sede-panao/img-50.jpeg'),
(4, 'Clases en vivo del Taller de Confeccion Textil', 'Clases de Teoria sobre la etapa de Diseñar - Parte 3', 'img/sede-panao/img-51.jpeg');


-- Tabla para almacenar los envíos del formulario de contacto general
CREATE TABLE formulario_contacto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  telefono VARCHAR(20),
  asunto VARCHAR(150),
  mensaje TEXT NOT NULL,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE newsletter_suscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    interes VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(45),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;