<?php /* eventos.php (versión mejorada) */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Eventos - CETPRO Arsenio Mendoza Flor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Fuentes / Iconos -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/eventos.css">
</head>
<body>

    <!-- Header -->
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
                    <li><a href="eventos.php" class="activo">Eventos</a></li>
                    <li><a href="ubicacion.php">Ubicación</a></li>
                    <li><a href="contacto.php">Contacto</a></li>
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

        <!-- Banner de página -->
        <section class="page-banner">
            <div class="page-overlay"></div>
            <div class="contenedor">
                <div class="page-banner-content">
                    <h1>Eventos y Actividades</h1>
                    <p>Mantente al día con todas nuestras actividades académicas, culturales y de vinculación</p>
                    <div class="hero-buttons">
                        <a href="index.html" class="btn btn-primary">Inicio</a>
                        <a href="contacto.php" class="btn btn-secondary">Contáctanos</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Filtros y búsqueda -->
        <section class="seccion-filtros-eventos">
            <div class="contenedor">
                <div class="filtros-container">
                    <div class="buscador-eventos">
                        <div class="buscador-input">
                            <i class="fas fa-search"></i>
                            <input type="text" id="search-eventos" placeholder="Buscar eventos...">
                        </div>
                    </div>
                    
                    <div class="filtros-eventos">
                        <button class="filtro-btn activo" data-filtro="todos">Todos</button>
                        <button class="filtro-btn" data-filtro="academicos">Académicos</button>
                        <button class="filtro-btn" data-filtro="culturales">Culturales</button>
                        <button class="filtro-btn" data-filtro="deportivos">Deportivos</button>
                        <button class="filtro-btn" data-filtro="graduaciones">Graduaciones</button>
                        <button class="filtro-btn" data-filtro="talleres">Talleres</button>
                        <button class="filtro-btn" data-filtro="conferencias">Conferencias</button>
                    </div>
                    
                    <div class="vista-toggle">
                        <button class="vista-btn activo" data-vista="grid">
                            <i class="fas fa-th"></i>
                        </button>
                        <button class="vista-btn" data-vista="lista">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

    <!-- Eventos destacados (HERO) -->
    <section class="seccion-eventos-destacados">
      <div class="contenedor">
        <div class="seccion-header">
          <h2>Eventos Destacados</h2>
          <p>Lo más reciente y relevante</p>
        </div>

        <div class="hero-wrap" aria-label="Eventos destacados">
          <div class="hero" id="heroTrack"></div>
          <div class="hero-controls">
            <button class="hero-btn" id="btnPrev" aria-label="Anterior">‹</button>
            <button class="hero-btn" id="btnNext" aria-label="Siguiente">›</button>
          </div>
          <div class="hero-dots" id="heroDots"></div>
        </div>
      </div>
    </section>

    <!-- Lista de eventos -->
    <section class="seccion-eventos-lista">
      <div class="contenedor">
        <div class="eventos-header">
          <h2>Todos los Eventos</h2>
          <div class="eventos-stats"><span id="eventos-count">0 eventos encontrados</span></div>
        </div>

        <div id="lista-eventos"></div>

        <div class="paginacion">
          <button class="pag-btn" data-pagina="prev"><i class="fas fa-chevron-left"></i> Anterior</button>
          <div class="pag-numeros"></div>
          <button class="pag-btn" data-pagina="next">Siguiente <i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>

    <!-- Calendario -->
    <section class="seccion-calendario">
      <div class="contenedor">
        <div class="seccion-header">
          <h2>Calendario de Eventos</h2>
          <p>Vista mensual de todas nuestras actividades programadas</p>
        </div>

        <div class="calendario-container">
          <div class="calendario-header">
            <button class="calendario-nav" id="prev-month"><i class="fas fa-chevron-left"></i></button>
            <h3 id="calendario-titulo">Enero 2025</h3>
            <button class="calendario-nav" id="next-month"><i class="fas fa-chevron-right"></i></button>
          </div>

          <div class="calendario-grid">
            <div class="calendario-dia-header">Dom</div>
            <div class="calendario-dia-header">Lun</div>
            <div class="calendario-dia-header">Mar</div>
            <div class="calendario-dia-header">Mié</div>
            <div class="calendario-dia-header">Jue</div>
            <div class="calendario-dia-header">Vie</div>
            <div class="calendario-dia-header">Sáb</div>
            <!-- Días dinámicos por JS -->
          </div>

          <div class="calendario-leyenda" style="padding:16px">
            <div class="leyenda-item"><span class="leyenda-color academico"></span><span>Académicos</span></div>
            <div class="leyenda-item"><span class="leyenda-color cultural"></span><span>Culturales</span></div>
            <div class="leyenda-item"><span class="leyenda-color deportivo"></span><span>Deportivos</span></div>
            <div class="leyenda-item"><span class="leyenda-color graduacion"></span><span>Graduaciones</span></div>
            <div class="leyenda-item"><span class="leyenda-color taller"></span><span>Talleres</span></div>
            <div class="leyenda-item"><span class="leyenda-color conferencia"></span><span>Conferencias</span></div>
            <div class="leyenda-item"><span class="leyenda-color convenios"></span><span>Convenios</span></div>
            <div class="leyenda-item"><span class="leyenda-color Eventos"></span><span>Eventos</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="seccion-newsletter-eventos">
      <div class="contenedor">
        <div class="newsletter-content">
          <div class="newsletter-info">
            <h2>¡No te pierdas ningún evento!</h2>
            <p>Suscríbete a nuestro boletín y recibe notificaciones sobre todos los eventos, talleres y actividades de CETPRO.</p>
            <ul>
              <li><i class="fas fa-check"></i> Notificaciones de eventos próximos</li>
              <li><i class="fas fa-check"></i> Recordatorios de inscripciones</li>
              <li><i class="fas fa-check"></i> Acceso prioritario a talleres</li>
              <li><i class="fas fa-check"></i> Contenido exclusivo</li>
            </ul>
          </div>
          <div class="newsletter-form">
            <form id="newsletter-eventos-form">
              <div class="form-group"><input name="nombre" type="text" placeholder="Tu nombre completo" required></div>
              <div class="form-group"><input name="correo" type="email" placeholder="Tu correo electrónico" required></div>
              <div class="form-group">
                <select name="interes" required>
                  <option value="">Selecciona tu interés principal</option>
                  <option value="academicos">Eventos académicos</option>
                  <option value="culturales">Actividades culturales</option>
                  <option value="deportivos">Eventos deportivos</option>
                  <option value="talleres">Talleres especializados</option>
                  <option value="todos">Todos los eventos</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary"><i class="fas fa-bell"></i> Suscribirme</button>
            </form>
          </div>
        </div>
      </div>
    </section>

        <!-- CTA -->
        <section class="seccion-cta-2">
            <div class="contenedor">
                <div class="cta-content-2">
                    <h2>¿Quieres organizar un evento?</h2>
                    <p>Si tienes una propuesta de evento, taller o actividad, nos encantaría conocerla</p>
                    <div class="cta-buttons">
                        <a href="contacto.php" class="btn btn-primary">Proponer Evento</a>
                        <a href="https://wa.me/51954803212" target="_blank" class="btn btn-secondary">
                            <i class="fab fa-whatsapp"></i>
                            Contactar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="pie-pagina">
        <div class="contenedor">
            <div class="columna contacto">
                <h5>Contacto</h5>
                <p><i class="fas fa-phone"></i> +51 954 803 212</p>
                <p><i class="fas fa-envelope"></i> info@cetprojct.edu.pe</p>
                <p><i class="fas fa-map-marker-alt"></i> Av. Minero N° 500 - Yanacancha - Pasco</p>
                <div class="enlace-social-pie">
                    <ul>
                        <li><a href="https://www.facebook.com/flor.mendozaflor" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://www.tiktok.com/@tu-perfil" target="_blank"><i class="fab fa-tiktok"></i></a></li>
                        <li><a href="mailto:info@cetprojct.edu.pe"><i class="fas fa-envelope"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="columna noticias">
              <h5>Eventos Principales</h5>
            
              <div class="noticia">
                <p>II Encuentro Nacional de CETPRO - Huánuco 2025</p>
                <span>22 al 24 de octubre, 2025</span>
              </div>
            
              <div class="noticia">
                <p>Firma del Convenio de Transitabilidad</p>
                <span>22 de septiembre, 2025</span>
              </div>
            
              <div class="noticia">
                <p>Elección Miss Flor de Primavera 2025</p>
                <span>19 de septiembre, 2025</span>
              </div>
            </div>
            <div class="columna enlaces-rapidos">
                <h5>Enlaces Rápidos</h5>
                <ul>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="programas.html">Programas</a></li>
                    <li><a href="eventos.php">Eventos</a></li>
                    <li><a href="ubicacion.html">Ubicación</a></li>
                    <li><a href="contacto.php">Contacto</a></li>
                </ul>
            </div>
        </div>
        <div class="pie-inferior">
            <p>© 2025 CETPRO Arsenio Mendoza Flor | Todos los derechos reservados | <a href="politica-privacidad.html">Política de privacidad</a></p>
        </div>
    </footer>

  <!-- ===========================
       JAVASCRIPT COMPLETO MEJORADO
  ============================ -->
  <script>
  document.addEventListener('DOMContentLoaded', function() {

    // DATOS DE EVENTOS CON FECHAS REALES
    const EVENTOS_DATA = [
      {
        titulo: "II Encuentro Nacional de CETPRO - Huánuco 2025",
        descripcion: "Participa en el II Encuentro Nacional, X Macroregional y XIV Regional de CETPRO. Un mega evento en modalidad híbrida con ponentes nacionales e internacionales. Ofrece talleres en Computación, Mecánica, Peluquería, Textil, Panadería y más. ¡Certificación oficial de la DRE Huánuco!",
        fechaTexto: "Octubre 22-24 2025",
        fechaISO: "2025-10-22 a 2025-10-24",
        autor: "CETPRO Arsenio Mendoza Flor",
        comentarios: 150,
        imagen: "img/eventos/evento-nacional-2025-1.jpeg",
        categoria: "academicos"
      },
      // 🔹 EVENTOS RECIENTES AÑADIDOS AQUÍ
      {
        titulo: "Firma del Convenio de Transitabilidad",
        descripcion: "Hemos formalizado un importante convenio para facilitar la continuidad educativa de nuestros egresados. Ahora, los estudiantes podrán convalidar sus estudios y obtener el Título de Auxiliar Técnico mediante una prueba de desempeño por demostración práctica, reconociendo así sus competencias y capacidades adquiridas.",
        fechaTexto: "Septiembre 22 2025",
        fechaISO: "2025-09-22",
        autor: "Dirección Académica",
        comentarios: 45,
        imagen: "img/eventos/firma.png",
        categoria: "convenios"
      },
      {
        titulo: "Elección Miss Flor de Primavera 2025",
        descripcion: "Celebramos con alegría la tradicional elección de nuestra Miss Flor de Primavera, un evento que resalta la belleza, el talento y la alegría de nuestra comunidad estudiantil. Una jornada llena de música, danzas y confraternidad.",
        fechaTexto: "Septiembre 19 2025",
        fechaISO: "2025-09-19",
        autor: "Comité Cultural",
        comentarios: 62,
        imagen: "img/eventos/belleza.jpg",
        categoria: "culturales"
      },
      {
        titulo: "62° Aniversario de la Toma de Tierras de Paucarbamba",
        descripcion: "Recordamos con orgullo la valentía y unidad de nuestro pueblo, que con esfuerzo y coraje marcó la historia. Agradecemos a la plana docente y estudiantes por su destacada participación en esta significativa conmemoración.",
        fechaTexto: "Agosto 28 2025",
        fechaISO: "2025-08-28",
        autor: "CETPRO Arsenio Mendoza Flor",
        comentarios: 51,
        imagen: "img/eventos/feliz-aniversario.jpg",
        categoria: "Eventos"
      },
    
      // 🔹 SIGUEN LOS EVENTOS ORIGINALES
      {
        titulo: "Demostración Teórico-Práctico para obtener el Título de Auxiliar.",
        descripcion: "Demostración Teórico-Práctico para obtener el Título de Auxiliar Técnico en la opción ocupacional Computación e Informática. ¡Éxitos en esta etapa!",
        fechaTexto: "Julio 24 2025",
        fechaISO: "2025-07-24",
        autor: "By Jona",
        comentarios: 78,
        imagen: "img/eventos/computo-2.png",
        categoria: "academicos"
      },
      {
        titulo: "CEREMONIA DE GRADUACIÓN",
        descripcion: "CEREMONIA DE GRADUACIÓN - 2024",
        fechaTexto: "Diciembre 30 2024",
        fechaISO: "2024-12-30",
        autor: "Coordinación Académica",
        comentarios: 20,
        imagen: "img/eventos/image.png",
        categoria: "graduaciones"
      },
      {
        titulo: "Firma del convenio entre el Colegio Hermilio Valdizan",
        descripcion: "Doble certificacion a traves de la convalidacion.",
        fechaTexto: "Septiembre 22 2025",
        fechaISO: "2025-09-22",
        autor: "Invitado Especial",
        comentarios: 34,
        imagen: "img/eventos/convenio.jpg",
        categoria: "convenios"
      },
      {
        titulo: "Certamen de belleza Flor de primavera 2025",
        descripcion: "Certamen",
        fechaTexto: "Septiembre 16 2025",
        fechaISO: "2025-09-16",
        autor: "Coordinación Académica",
        comentarios: 20,
        imagen: "img/eventos/certamen.jpg",
        categoria: "Eventos"
      },
      {
        titulo: "Formacion Tecnica que impulsa sueños y genera oportunidades",
        descripcion: "Brindar Cursos Tecnicos.",
        fechaTexto: "Agosto 27 2025",
        fechaISO: "2025-08-27",
        autor: "Invitado Especial",
        comentarios: 34,
        imagen: "img/eventos/oportunidades.jpg",
        categoria: "conferencias"
      },
      {
        titulo: "Apertura Sub-Sede",
        descripcion: "Apertura de nueva Sub-Sede",
        fechaTexto: "Agosto 27 2025",
        fechaISO: "2025-08-27",
        autor: "Coordinación Académica",
        comentarios: 20,
        imagen: "img/eventos/nuevasede.png",
        categoria: "Eventos"
      },
      {
        titulo: "Reconocimiento para BecaTec 2025 del Pronabec",
        descripcion: "Beca para estudiar de manera gratuita.",
        fechaTexto: "Agosto 13 2025",
        fechaISO: "2025-08-13",
        autor: "Invitado Especial",
        comentarios: 34,
        imagen: "img/eventos/pronabec.jpg",
        categoria: "conferencias"
      },
      {
        titulo: "Dia del Logro",
        descripcion: "Celebracion del dia del Logro",
        fechaTexto: "Julio 25 2025",
        fechaISO: "2025-07-25",
        autor: "Coordinación Académica",
        comentarios: 20,
        imagen: "img/eventos/logro.jpg",
        categoria: "Eventos"
      },
      {
        titulo: "SRTA. SIMPATÍA 2025",
        descripcion: "ESTEFANI BRIGITH ROJAS CALLUPE",
        fechaTexto: "Octubre 13 2025",
        fechaISO: "2025-10-13",
        autor: "Coordinación Académica",
        comentarios: 20,
        imagen: "img/eventos/miss.jpg",
        categoria: "Eventos"
      }
    ];

    // ELEMENTOS DEL DOM
    const searchInput = document.getElementById('search-eventos');
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const vistaButtons = document.querySelectorAll('.vista-btn');
    const eventosCount = document.getElementById('eventos-count');
    const eventosContainer = document.getElementById('lista-eventos');

    // Hero
    const heroTrack = document.getElementById('heroTrack');
    const heroDots  = document.getElementById('heroDots');
    const btnPrev   = document.getElementById('btnPrev');
    const btnNext   = document.getElementById('btnNext');

    // Calendario / newsletter
    const calendarioTitulo = document.getElementById('calendario-titulo');
    const newsletterForm = document.getElementById('newsletter-eventos-form');

    // Estados
    let eventoCards = [];
    let eventosFiltrados = [];
    let favoritos = JSON.parse(localStorage.getItem('eventos-favoritos') || '[]');
    let paginaActual = 1;
    const eventosPorPagina = 6;
    let fechaCalendario = new Date();

    // RENDER: HERO + CARDS
    function slideHTML(ev){
      return `
        <article class="slide">
          <img src="${ev.imagen}" alt="${ev.titulo}">
          <div class="slide-content">
            <div class="slide-meta">${ev.fechaTexto} · ${ev.autor}</div>
            <h2 class="slide-title">${ev.titulo}</h2>
            <p class="slide-desc">${ev.descripcion}</p>
          </div>
        </article>`;
    }
    function renderHero(){
      if(!heroTrack) return;
      heroTrack.innerHTML = EVENTOS_DATA.map(slideHTML).join('');
      heroDots.innerHTML  = EVENTOS_DATA.map((_,i)=>`<button class="hero-dot${i===0?' activa':''}" aria-label="Ir a noticia ${i+1}"></button>`).join('');
    }

    function cardHTML(ev){
      return `
        <article class="card event-card" data-categoria="${ev.categoria}" data-titulo="${ev.titulo.toLowerCase()}">
          <img class="card-img" src="${ev.imagen}" alt="${ev.titulo}">
          <div class="card-body">
            <div class="meta">
              <span>${ev.fechaTexto}</span>
              <span class="dot"></span>
              <span>${ev.autor}</span>
            </div>
            <h2 class="titulo">${ev.titulo}</h2>
            <p class="desc">${ev.descripcion}</p>
          </div>
          <div class="card-footer">
            <a href="#" class="btn btn-ghost">Leer más</a>
            <span class="coment" style="display:inline-flex;align-items:center;gap:6px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>
              ${ev.comentarios} Comment
            </span>
          </div>
        </article>`;
    }
    function renderEventosInicial(){
      if(!eventosContainer) return;
      eventosContainer.innerHTML = EVENTOS_DATA.map(cardHTML).join('');
      refreshEventNodes();
    }
    function refreshEventNodes(){
      eventoCards = Array.from(document.querySelectorAll('.event-card'));
      eventosFiltrados = [...eventoCards];
      paginaActual = 1;
      mostrarEventos();
      updatePagination();
      actualizarContador();
    }

    // HERO: controles y autoplay
    let index = 0;
    let autoTimer = null;
    const INTERVALO_MS = 5000;

    function goTo(i){
      if(!heroTrack) return;
      const total = EVENTOS_DATA.length;
      index = (i + total) % total;
      heroTrack.style.transform = `translateX(${-index*100}%)`;
      const dots = [...document.querySelectorAll('.hero-dot')];
      dots.forEach((d,di)=>d.classList.toggle('activa', di===index));
    }
    function siguiente(){ goTo(index+1); }
    function anterior(){ goTo(index-1); }
    function startAuto(){ if(autoTimer) return; autoTimer = setInterval(siguiente, INTERVALO_MS); }
    function stopAuto(){ clearInterval(autoTimer); autoTimer = null; }

    function wireHero(){
      if(!heroTrack) return;
      const dots = [...document.querySelectorAll('.hero-dot')];
      dots.forEach((d,di)=> d.addEventListener('click', ()=>{ stopAuto(); goTo(di); startAuto(); }));
      btnNext?.addEventListener('click', ()=>{ stopAuto(); siguiente(); startAuto(); });
      btnPrev?.addEventListener('click', ()=>{ stopAuto(); anterior(); startAuto(); });

      const wrap = document.querySelector('.hero-wrap');
      let isDown=false, startX=0, deltaX=0;
      const dragStart = x => { isDown=true; startX=x; deltaX=0; stopAuto(); };
      const dragMove  = x => { if(!isDown) return; deltaX = x - startX; heroTrack.style.transform = `translateX(${(-index*100) + (deltaX/window.innerWidth*100)}%)`; };
      const dragEnd   = () => {
        if(!isDown) return; isDown=false;
        const umbral = window.innerWidth*0.15;
        if(deltaX >  umbral) anterior();
        else if(deltaX < -umbral) siguiente();
        else goTo(index);
        startAuto();
      };
      wrap?.addEventListener('mouseenter', stopAuto);
      wrap?.addEventListener('mouseleave', startAuto);
      wrap?.addEventListener('mousedown', e=>dragStart(e.pageX));
      window.addEventListener('mousemove', e=>dragMove(e.pageX));
      window.addEventListener('mouseup', dragEnd);
      wrap?.addEventListener('touchstart', e=>dragStart(e.touches[0].pageX), {passive:true});
      window.addEventListener('touchmove',  e=>dragMove(e.touches[0].pageX),  {passive:true});
      window.addEventListener('touchend', dragEnd);

      goTo(0);
      startAuto();
    }

    // FILTROS / BÚSQUEDA / VISTAS
    function filtrarEventos() {
      const searchTerm = (searchInput?.value || '').toLowerCase().trim();
      const activo = document.querySelector('.filtro-btn.activo');
      const filtroActivo = activo ? activo.dataset.filtro : 'todos';

      eventosFiltrados = eventoCards.filter(card => {
        const categoria = card.dataset.categoria;
        const titulo = (card.querySelector('h2.titulo')?.textContent || '').toLowerCase();
        const descripcion = (card.querySelector('p.desc')?.textContent || '').toLowerCase();

        const matchesSearch = !searchTerm || titulo.includes(searchTerm) || descripcion.includes(searchTerm);
        const matchesCategory = filtroActivo === 'todos' || categoria === filtroActivo;

        return matchesSearch && matchesCategory;
      });

      paginaActual = 1;
      mostrarEventos();
      actualizarContador();
      updatePagination();
    }

    function mostrarEventos() {
      const inicio = (paginaActual - 1) * eventosPorPagina;
      const fin = inicio + eventosPorPagina;

      eventoCards.forEach(card => { card.style.display = 'none'; });

      const visibles = eventosFiltrados.slice(inicio, fin);
      visibles.forEach((card, idx) => {
        setTimeout(() => {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.6s ease-out';
        }, idx * 80);
      });
    }

    function actualizarContador() {
      const total = eventosFiltrados.length;
      if(eventosCount) eventosCount.textContent = `${total} evento${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
    }

    function cambiarVista(vista) {
      vistaButtons.forEach(btn => btn.classList.remove('activo'));
      document.querySelector(`[data-vista="${vista}"]`)?.classList.add('activo');

      if (vista === 'lista') {
        eventosContainer?.classList.add('lista');
      } else {
        eventosContainer?.classList.remove('lista');
      }
      trackEvent('cambio_vista', { vista });
    }

    // PAGINACIÓN
    function initializePagination() { updatePagination(); }

    function updatePagination() {
      const totalPaginas = Math.ceil((eventosFiltrados.length || 0) / eventosPorPagina) || 1;
      const paginacionContainer = document.querySelector('.pag-numeros');
      if(!paginacionContainer) return;

      paginacionContainer.innerHTML = '';
      for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.className = `pag-numero ${i === paginaActual ? 'activo' : ''}`;
        btn.dataset.pagina = i;
        btn.textContent = i;
        btn.addEventListener('click', () => cambiarPagina(i));
        paginacionContainer.appendChild(btn);
      }

      const prevBtn = document.querySelector('[data-pagina="prev"]');
      const nextBtn = document.querySelector('[data-pagina="next"]');

      if(prevBtn) prevBtn.disabled = paginaActual === 1;
      if(nextBtn) nextBtn.disabled = paginaActual === totalPaginas;

      const paginacion = document.querySelector('.paginacion');
      if(paginacion) paginacion.style.display = totalPaginas <= 1 ? 'none' : 'flex';
    }

    function cambiarPagina(pagina) {
      if (pagina === 'prev') {
        paginaActual = Math.max(1, paginaActual - 1);
      } else if (pagina === 'next') {
        const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina) || 1;
        paginaActual = Math.min(totalPaginas, paginaActual + 1);
      } else {
        paginaActual = parseInt(pagina);
      }

      mostrarEventos();
      updatePagination();
      document.querySelector('.seccion-eventos-lista')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // CALENDARIO MEJORADO
    function generarCalendario() {
      if(!calendarioTitulo) return;
      const año = fechaCalendario.getFullYear();
      const mes = fechaCalendario.getMonth();

      const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      calendarioTitulo.textContent = `${meses[mes]} ${año}`;

      const calendarioGrid = document.querySelector('.calendario-grid');
      if(!calendarioGrid) return;

      // Limpiar días anteriores (excepto headers)
      calendarioGrid.querySelectorAll('.calendario-dia').forEach(d=>d.remove());

      const primerDia = new Date(año, mes, 1);
      const ultimoDia = new Date(año, mes + 1, 0);
      const diasEnMes = ultimoDia.getDate();
      const diaSemanaInicio = primerDia.getDay();

      const mesAnterior = new Date(año, mes, 0);
      const diasMesAnterior = mesAnterior.getDate();

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Normalizar para comparación

      // Días del mes anterior
      for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        calendarioGrid.appendChild(crearDiaCalendario(diasMesAnterior - i, true));
      }

      // Días del mes actual
      for (let dia = 1; dia <= diasEnMes; dia++) {
        const fechaDia = new Date(año, mes, dia);
        fechaDia.setHours(0, 0, 0, 0);
        const esHoy = fechaDia.getTime() === hoy.getTime();
        const esPasado = fechaDia < hoy;
        
        const diaElement = crearDiaCalendario(dia, false, esHoy, esPasado);

        // Buscar eventos para esta fecha
        const fechaStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const eventosDelDia = EVENTOS_DATA.filter(ev => {
          if (!ev.fechaISO) return false;
          
          // Manejar rangos de fechas (como "2025-10-22" a "2025-10-24")
          if (ev.fechaISO.includes(' a ')) {
            const [inicioStr, finStr] = ev.fechaISO.split(' a ');
            const inicio = new Date(inicioStr);
            const fin = new Date(finStr);
            const actual = new Date(fechaStr);
            return actual >= inicio && actual <= fin;
          }
          
          // Fecha única
          return ev.fechaISO === fechaStr;
        });

        // Agregar eventos al día
        eventosDelDia.forEach(ev => {
          const eventoElement = document.createElement('div');
          eventoElement.className = `calendario-evento ${ev.categoria} ${esPasado ? 'pasado' : 'futuro'}`;
          eventoElement.textContent = ev.titulo;
          eventoElement.title = `${ev.titulo} - ${ev.fechaTexto}`;
          
          // Agregar tooltip con más información
          eventoElement.addEventListener('click', function() {
            mostrarDetalleEvento(ev);
          });
          
          diaElement.appendChild(eventoElement);
        });

        // Indicador si hay eventos
        if (eventosDelDia.length > 0) {
          diaElement.classList.add('tiene-eventos');
          
          // Contador de eventos
          const contador = document.createElement('div');
          contador.className = 'evento-contador';
          contador.textContent = eventosDelDia.length;
          diaElement.querySelector('.calendario-dia-numero').appendChild(contador);
        }

        calendarioGrid.appendChild(diaElement);
      }

      // Días del mes siguiente
      const totalCeldas = 42; // 6 filas × 7 columnas
      const celdasUsadas = diaSemanaInicio + diasEnMes;
      const diasRestantes = totalCeldas - celdasUsadas;
      
      for (let dia = 1; dia <= diasRestantes; dia++) {
        calendarioGrid.appendChild(crearDiaCalendario(dia, true));
      }
    }

    function crearDiaCalendario(numero, otroMes = false, esHoy = false, esPasado = false) {
      const dia = document.createElement('div');
      dia.className = `calendario-dia ${otroMes ? 'otro-mes' : ''} ${esHoy ? 'hoy' : ''} ${esPasado ? 'pasado' : ''}`;
      
      const n = document.createElement('div');
      n.className = 'calendario-dia-numero';
      n.textContent = numero;
      dia.appendChild(n);
      
      return dia;
    }

    function cambiarMesCalendario(direccion) {
      if (direccion === 'prev') fechaCalendario.setMonth(fechaCalendario.getMonth() - 1);
      else fechaCalendario.setMonth(fechaCalendario.getMonth() + 1);
      generarCalendario();
      trackEvent('cambio_mes_calendario', { mes: fechaCalendario.getMonth() + 1, año: fechaCalendario.getFullYear() });
    }

    // FUNCIÓN PARA MOSTRAR DETALLES DEL EVENTO
    function mostrarDetalleEvento(evento) {
      const modal = document.createElement('div');
      modal.className = 'modal-evento';
      
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          
          <h3 style="margin-top: 0; color: #2c3e50;">${evento.titulo}</h3>
          <div style="display: flex; align-items: center; gap: 10px; margin: 15px 0;">
            <span class="leyenda-color ${evento.categoria}" style="display: inline-block; width: 12px; height: 12px; border-radius: 50%;"></span>
            <span style="color: #666; font-size: 14px; text-transform: capitalize;">${evento.categoria}</span>
          </div>
          <p><strong>Fecha:</strong> ${evento.fechaTexto}</p>
          <p><strong>Organizador:</strong> ${evento.autor}</p>
          <p style="margin: 15px 0;">${evento.descripcion}</p>
          
          ${evento.imagen ? `<img src="${evento.imagen}" alt="${evento.titulo}" style="width: 100%; border-radius: 8px; margin: 15px 0;">` : ''}
          
          <div style="margin-top: 20px; display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="inscribirseEvento('${evento.titulo}')">
              <i class="fas fa-calendar-plus"></i> Inscribirse
            </button>
            <button class="btn btn-secondary" onclick="this.closest('.modal-evento').remove()">
              Cerrar
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Cerrar modal
      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    }

    // Función global para inscripción
    window.inscribirseEvento = function(titulo) {
      mostrarNotificacion(`Te has inscrito al evento: ${titulo}`, 'success');
      // Cerrar modal después de inscribirse
      document.querySelector('.modal-evento')?.remove();
    };

    // NEWSLETTER
    function manejarNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validación básica antes de enviar
    const nombre = formData.get('nombre');
    const correo = formData.get('correo');
    const interes = formData.get('interes');
    
    if (!nombre || !correo || !interes) {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        return;
    }
    
    if (!validarEmail(correo)) {
        mostrarNotificacion('Por favor ingresa un correo electrónico válido', 'error');
        return;
    }

    // Verificar si el correo ya existe localmente
    if (correoYaRegistrado(correo)) {
        mostrarNotificacion('Este correo electrónico ya está registrado en nuestro newsletter', 'error');
        return;
    }

    // Mostrar estado de carga
    submitBtn?.classList.add('loading');
    if(submitBtn) submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Suscribiendo...';

    // Enviar datos via AJAX
    fetch('procesar-newsletter.php', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        
        if (data.success) {
            mostrarNotificacion(data.message, 'success');
            form.reset();
            
            // Guardar localmente por seguridad
            const suscripciones = JSON.parse(localStorage.getItem('newsletter_suscripciones') || '[]');
            suscripciones.push({ 
                nombre: nombre,
                correo: correo,
                interes: interes,
                fecha: new Date().toISOString(),
                tipo: 'eventos',
                sincronizado: true
            });
            localStorage.setItem('newsletter_suscripciones', JSON.stringify(suscripciones));
            trackEvent('suscripcion_newsletter', { interes: interes || 'todos' });
        } else {
            // Verificar si el error es por correo duplicado
            if (data.message && data.message.includes('duplicad') || data.message && data.message.includes('ya existe')) {
                mostrarNotificacion('Este correo electrónico ya está registrado en nuestro newsletter', 'error');
            } else {
                const errorMsg = data.debug?.error ? `Error: ${data.debug.error}` : data.message;
                mostrarNotificacion(errorMsg, 'error');
            }
            // Guardar localmente como pendiente solo si no es duplicado
            if (!data.message || !data.message.includes('duplicad')) {
                guardarSuscripcionPendiente(nombre, correo, interes);
            }
        }
    })
    .catch(error => {
        console.error('Error en fetch:', error);
        // Fallback: guardar solo en localStorage si falla la conexión
        guardarSuscripcionPendiente(nombre, correo, interes);
        mostrarNotificacion('Error de conexión. Suscripción guardada localmente.', 'info');
        form.reset();
        trackEvent('suscripcion_newsletter_offline', { interes: interes || 'todos' });
    })
    .finally(() => {
        // Restaurar botón
        submitBtn?.classList.remove('loading');
        if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Función para verificar si el correo ya está registrado localmente
function correoYaRegistrado(correo) {
    const suscripciones = JSON.parse(localStorage.getItem('newsletter_suscripciones') || '[]');
    return suscripciones.some(suscripcion => 
        suscripcion.correo.toLowerCase() === correo.toLowerCase()
    );
}

// Función auxiliar para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para guardar suscripción pendiente
function guardarSuscripcionPendiente(nombre, correo, interes) {
    // Verificar si ya existe antes de guardar
    if (correoYaRegistrado(correo)) {
        return;
    }
    
    const suscripciones = JSON.parse(localStorage.getItem('newsletter_suscripciones') || '[]');
    suscripciones.push({ 
        nombre: nombre,
        correo: correo,
        interes: interes,
        fecha: new Date().toISOString(),
        tipo: 'eventos',
        pendiente: true,
        sincronizado: false
    });
    localStorage.setItem('newsletter_suscripciones', JSON.stringify(suscripciones));
}

// Función para intentar sincronizar suscripciones pendientes
function sincronizarSuscripcionesPendientes() {
    const suscripciones = JSON.parse(localStorage.getItem('newsletter_suscripciones') || '[]');
    const pendientes = suscripciones.filter(s => s.pendiente && !s.sincronizado);
    
    pendientes.forEach(suscripcion => {
        const formData = new FormData();
        formData.append('nombre', suscripcion.nombre);
        formData.append('correo', suscripcion.correo);
        formData.append('interes', suscripcion.interes);
        
        fetch('procesar-newsletter.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Marcar como sincronizado
                const index = suscripciones.findIndex(s => 
                    s.correo === suscripcion.correo && s.fecha === suscripcion.fecha
                );
                if (index !== -1) {
                    suscripciones[index].sincronizado = true;
                    suscripciones[index].pendiente = false;
                    localStorage.setItem('newsletter_suscripciones', JSON.stringify(suscripciones));
                }
            }
        })
        .catch(error => {
            console.log('No se pudo sincronizar suscripción pendiente:', error);
        });
    });
}

// UTILIDADES
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Cerrar notificaciones existentes
    const notificacionesExistentes = document.querySelectorAll('.notification');
    notificacionesExistentes.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${tipo}`;
    notification.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check' : tipo === 'error' ? 'times' : 'info'}-circle"></i>
        <span>${mensaje}</span>
        <button class="notification-close" aria-label="Cerrar notificación">&times;</button>
    `;

    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => { 
        notification.style.transform = 'translateX(0)'; 
    }, 50);

    const removeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    };

    // Cerrar al hacer click en el botón
    notification.querySelector('.notification-close').addEventListener('click', removeNotification);
    
    // Cerrar automáticamente después de 5 segundos
    setTimeout(removeNotification, 5000);
}

function trackEvent(evento, datos = {}) {
    const analytics = JSON.parse(localStorage.getItem('analytics') || '{}');
    const fecha = new Date().toISOString().split('T')[0];
    if (!analytics[fecha]) analytics[fecha] = {};
    if (!analytics[fecha][evento]) analytics[fecha][evento] = 0;
    analytics[fecha][evento]++;
    localStorage.setItem('analytics', JSON.stringify(analytics));
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(()=>func.apply(this,args), wait);
    };
}

// INICIALIZACIÓN
renderHero();
wireHero();
renderEventosInicial();

// Intentar sincronizar suscripciones pendientes al cargar la página
sincronizarSuscripcionesPendientes();

// Sincronizar cada 30 segundos si hay conexión
setInterval(sincronizarSuscripcionesPendientes, 30000);

// EVENT LISTENERS
searchInput?.addEventListener('input', debounce(filtrarEventos, 300));

filtroButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filtroButtons.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        filtrarEventos();
        trackEvent('filtro_eventos', { categoria: this.dataset.filtro });
    });
});

vistaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        cambiarVista(this.dataset.vista);
    });
});

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.pag-btn, .pag-numero');
    if (btn?.dataset?.pagina) cambiarPagina(btn.dataset.pagina);
});

document.getElementById('prev-month')?.addEventListener('click', () => cambiarMesCalendario('prev'));
document.getElementById('next-month')?.addEventListener('click', () => cambiarMesCalendario('next'));

if (newsletterForm) newsletterForm.addEventListener('submit', manejarNewsletterSubmit);

// Inicializar componentes
generarCalendario();
initializePagination();

trackEvent('visita_pagina_eventos');
});
</script>
</body>
</html>