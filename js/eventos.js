// =========================== 
// JAVASCRIPT ESPECÍFICO - PÁGINA EVENTOS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================== 
    // ELEMENTOS DEL DOM
    // ===========================
    const searchInput = document.getElementById('search-eventos');
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const vistaButtons = document.querySelectorAll('.vista-btn');
    const eventosContainer = document.getElementById('eventos-container');
    const eventosCount = document.getElementById('eventos-count');
    const eventoCards = document.querySelectorAll('.evento-card');
    const btnFavoritos = document.querySelectorAll('.btn-favorito');
    const btnInscribir = document.querySelectorAll('.btn-inscribir');
    const paginacionBtns = document.querySelectorAll('.pag-btn, .pag-numero');
    const calendarioNav = document.querySelectorAll('.calendario-nav');
    const calendarioTitulo = document.getElementById('calendario-titulo');
    const newsletterForm = document.getElementById('newsletter-eventos-form');
    
    let eventosFiltrados = Array.from(eventoCards);
    let favoritos = JSON.parse(localStorage.getItem('eventos-favoritos') || '[]');
    let paginaActual = 1;
    const eventosPorPagina = 6;
    let fechaCalendario = new Date();
    
    // Datos de eventos para el calendario
    const eventosCalendario = [
        { fecha: '2025-01-25', titulo: 'Feria Tecnológica', categoria: 'academico' },
        { fecha: '2025-01-30', titulo: 'Taller Emprendimiento', categoria: 'taller' },
        { fecha: '2025-02-05', titulo: 'Festival Cultural', categoria: 'cultural' },
        { fecha: '2025-02-10', titulo: 'Taller Soldadura TIG', categoria: 'taller' },
        { fecha: '2025-02-15', titulo: 'Conferencia IA', categoria: 'conferencia' },
        { fecha: '2025-02-20', titulo: 'Torneo Fútbol', categoria: 'deportivo' },
        { fecha: '2025-03-15', titulo: 'Graduación Marzo', categoria: 'graduacion' }
    ];
    
    // =========================== 
    // INICIALIZACIÓN
    // ===========================
    
    cargarFavoritos();
    actualizarContador();
    generarCalendario();
    initializePagination();
    
    // =========================== 
    // SISTEMA DE FILTROS
    // ===========================
    
    function filtrarEventos() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filtroActivo = document.querySelector('.filtro-btn.activo').dataset.filtro;
        
        eventosFiltrados = Array.from(eventoCards).filter(card => {
            const categoria = card.dataset.categoria;
            const titulo = card.querySelector('h3').textContent.toLowerCase();
            const descripcion = card.querySelector('p').textContent.toLowerCase();
            
            // Filtro por búsqueda
            const matchesSearch = searchTerm === '' || 
                                titulo.includes(searchTerm) || 
                                descripcion.includes(searchTerm);
            
            // Filtro por categoría
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
        const eventosVisibles = eventosFiltrados.slice(inicio, fin);
        
        // Ocultar todas las cards
        eventoCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Mostrar cards de la página actual
        eventosVisibles.forEach((card, index) => {
            setTimeout(() => {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            }, index * 100);
        });
    }
    
    function actualizarContador() {
        const total = eventosFiltrados.length;
        eventosCount.textContent = `${total} evento${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
    }
    
    // =========================== 
    // SISTEMA DE VISTAS
    // ===========================
    
    function cambiarVista(vista) {
        vistaButtons.forEach(btn => btn.classList.remove('activo'));
        document.querySelector(`[data-vista="${vista}"]`).classList.add('activo');
        
        if (vista === 'lista') {
            eventosContainer.classList.add('lista');
        } else {
            eventosContainer.classList.remove('lista');
        }
        
        trackEvent('cambio_vista', { vista });
    }
    
    // =========================== 
    // SISTEMA DE PAGINACIÓN
    // ===========================
    
    function initializePagination() {
        updatePagination();
    }
    
    function updatePagination() {
        const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);
        const paginacionContainer = document.querySelector('.pag-numeros');
        
        // Limpiar números de página existentes
        paginacionContainer.innerHTML = '';
        
        // Generar números de página
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('button');
            btn.className = `pag-numero ${i === paginaActual ? 'activo' : ''}`;
            btn.dataset.pagina = i;
            btn.textContent = i;
            btn.addEventListener('click', () => cambiarPagina(i));
            paginacionContainer.appendChild(btn);
        }
        
        // Actualizar botones prev/next
        const prevBtn = document.querySelector('[data-pagina="prev"]');
        const nextBtn = document.querySelector('[data-pagina="next"]');
        
        prevBtn.disabled = paginaActual === 1;
        nextBtn.disabled = paginaActual === totalPaginas;
        
        // Ocultar paginación si hay una sola página
        const paginacion = document.querySelector('.paginacion');
        paginacion.style.display = totalPaginas <= 1 ? 'none' : 'flex';
    }
    
    function cambiarPagina(pagina) {
        if (pagina === 'prev') {
            paginaActual = Math.max(1, paginaActual - 1);
        } else if (pagina === 'next') {
            const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);
            paginaActual = Math.min(totalPaginas, paginaActual + 1);
        } else {
            paginaActual = parseInt(pagina);
        }
        
        mostrarEventos();
        updatePagination();
        
        // Scroll suave al inicio de la sección
        document.querySelector('.seccion-eventos-lista').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // =========================== 
    // SISTEMA DE FAVORITOS
    // ===========================
    
    function cargarFavoritos() {
        btnFavoritos.forEach(btn => {
            const eventoId = btn.dataset.evento;
            if (favoritos.includes(eventoId)) {
                btn.classList.add('active');
                btn.querySelector('i').classList.remove('far');
                btn.querySelector('i').classList.add('fas');
            }
        });
    }
    
    function toggleFavorito(eventoId, btn) {
        const index = favoritos.indexOf(eventoId);
        
        if (index === -1) {
            favoritos.push(eventoId);
            btn.classList.add('active');
            btn.querySelector('i').classList.remove('far');
            btn.querySelector('i').classList.add('fas');
            
            mostrarNotificacion('Evento agregado a favoritos', 'success');
        } else {
            favoritos.splice(index, 1);
            btn.classList.remove('active');
            btn.querySelector('i').classList.remove('fas');
            btn.querySelector('i').classList.add('far');
            
            mostrarNotificacion('Evento removido de favoritos', 'info');
        }
        
        localStorage.setItem('eventos-favoritos', JSON.stringify(favoritos));
        trackEvent('toggle_favorito', { evento: eventoId, accion: index === -1 ? 'agregar' : 'remover' });
    }
    
    // =========================== 
    // SISTEMA DE INSCRIPCIONES
    // ===========================
    
    function manejarInscripcion(eventoId, btn) {
        const eventoCard = btn.closest('.evento-card');
        const eventoTitulo = eventoCard.querySelector('h3').textContent;
        
        // Simular proceso de inscripción
        btn.classList.add('loading');
        btn.disabled = true;
        
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.disabled = false;
            
            // Cambiar texto del botón
            btn.innerHTML = '<i class="fas fa-check"></i> Inscrito';
            btn.classList.add('inscrito');
            
            mostrarNotificacion(`Te has inscrito exitosamente a: ${eventoTitulo}`, 'success');
            
            // Guardar inscripción
            const inscripciones = JSON.parse(localStorage.getItem('eventos-inscripciones') || '[]');
            if (!inscripciones.includes(eventoId)) {
                inscripciones.push(eventoId);
                localStorage.setItem('eventos-inscripciones', JSON.stringify(inscripciones));
            }
            
            trackEvent('inscripcion_evento', { evento: eventoId, titulo: eventoTitulo });
        }, 2000);
    }
    
    // =========================== 
    // CALENDARIO
    // ===========================
    
    function generarCalendario() {
        const año = fechaCalendario.getFullYear();
        const mes = fechaCalendario.getMonth();
        
        // Actualizar título
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        calendarioTitulo.textContent = `${meses[mes]} ${año}`;
        
        // Limpiar calendario anterior
        const calendarioGrid = document.querySelector('.calendario-grid');
        const diasExistentes = calendarioGrid.querySelectorAll('.calendario-dia');
        diasExistentes.forEach(dia => dia.remove());
        
        // Primer día del mes y último día
        const primerDia = new Date(año, mes, 1);
        const ultimoDia = new Date(año, mes + 1, 0);
        const diasEnMes = ultimoDia.getDate();
        const diaSemanaInicio = primerDia.getDay();
        
        // Días del mes anterior
        const mesAnterior = new Date(año, mes, 0);
        const diasMesAnterior = mesAnterior.getDate();
        
        for (let i = diaSemanaInicio - 1; i >= 0; i--) {
            const dia = crearDiaCalendario(diasMesAnterior - i, true);
            calendarioGrid.appendChild(dia);
        }
        
        // Días del mes actual
        const hoy = new Date();
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fechaDia = new Date(año, mes, dia);
            const esHoy = fechaDia.toDateString() === hoy.toDateString();
            const diaElement = crearDiaCalendario(dia, false, esHoy);
            
            // Agregar eventos del día
            const fechaStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            const eventosDelDia = eventosCalendario.filter(evento => evento.fecha === fechaStr);
            
            eventosDelDia.forEach(evento => {
                const eventoElement = document.createElement('div');
                eventoElement.className = `calendario-evento ${evento.categoria}`;
                eventoElement.textContent = evento.titulo;
                eventoElement.title = evento.titulo;
                diaElement.appendChild(eventoElement);
            });
            
            calendarioGrid.appendChild(diaElement);
        }
        
        // Días del mes siguiente
        const diasRestantes = 42 - (diaSemanaInicio + diasEnMes);
        for (let dia = 1; dia <= diasRestantes; dia++) {
            const diaElement = crearDiaCalendario(dia, true);
            calendarioGrid.appendChild(diaElement);
        }
    }
    
    function crearDiaCalendario(numero, otroMes = false, esHoy = false) {
        const dia = document.createElement('div');
        dia.className = `calendario-dia ${otroMes ? 'otro-mes' : ''} ${esHoy ? 'hoy' : ''}`;
        
        const numeroElement = document.createElement('div');
        numeroElement.className = 'calendario-dia-numero';
        numeroElement.textContent = numero;
        dia.appendChild(numeroElement);
        
        return dia;
    }
    
    function cambiarMesCalendario(direccion) {
        if (direccion === 'prev') {
            fechaCalendario.setMonth(fechaCalendario.getMonth() - 1);
        } else {
            fechaCalendario.setMonth(fechaCalendario.getMonth() + 1);
        }
        
        generarCalendario();
        trackEvent('cambio_mes_calendario', { 
            mes: fechaCalendario.getMonth() + 1, 
            año: fechaCalendario.getFullYear() 
        });
    }
    
    // =========================== 
    // NEWSLETTER
    // ===========================
    
    function manejarNewsletterSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Simular envío
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            mostrarNotificacion('¡Te has suscrito exitosamente! Recibirás notificaciones sobre eventos.', 'success');
            e.target.reset();
            
            // Guardar suscripción
            const suscripciones = JSON.parse(localStorage.getItem('newsletter-suscripciones') || '[]');
            suscripciones.push({
                ...data,
                fecha: new Date().toISOString(),
                tipo: 'eventos'
            });
            localStorage.setItem('newsletter-suscripciones', JSON.stringify(suscripciones));
            
            trackEvent('suscripcion_newsletter', { interes: data.interes || 'todos' });
        }, 2000);
    }
    
    // =========================== 
    // FUNCIONES DE UTILIDAD
    // ===========================
    
    function mostrarNotificacion(mensaje, tipo = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${tipo}`;
        notification.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check' : tipo === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${mensaje}</span>
            <button class="notification-close">&times;</button>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: tipo === 'success' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px'
        });
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.marginLeft = 'auto';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        const removeNotification = () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', removeNotification);
        setTimeout(removeNotification, 5000);
    }
    
    function trackEvent(evento, datos = {}) {
        console.log(`Evento: ${evento}`, datos);
        
        const analytics = JSON.parse(localStorage.getItem('analytics') || '{}');
        const fecha = new Date().toISOString().split('T')[0];
        
        if (!analytics[fecha]) {
            analytics[fecha] = {};
        }
        
        if (!analytics[fecha][evento]) {
            analytics[fecha][evento] = 0;
        }
        
        analytics[fecha][evento]++;
        localStorage.setItem('analytics', JSON.stringify(analytics));
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // =========================== 
    // EVENT LISTENERS
    // ===========================
    
    // Búsqueda
    searchInput.addEventListener('input', debounce(filtrarEventos, 300));
    
    // Filtros
    filtroButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filtroButtons.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            filtrarEventos();
            trackEvent('filtro_eventos', { categoria: this.dataset.filtro });
        });
    });
    
    // Vistas
    vistaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarVista(this.dataset.vista);
        });
    });
    
    // Favoritos
    btnFavoritos.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorito(this.dataset.evento, this);
        });
    });
    
    // Inscripciones
    btnInscribir.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!this.classList.contains('inscrito')) {
                manejarInscripcion(this.dataset.evento, this);
            }
        });
    });
    
    // Paginación
    document.addEventListener('click', function(e) {
        if (e.target.matches('.pag-btn, .pag-numero')) {
            e.preventDefault();
            const pagina = e.target.dataset.pagina;
            if (pagina) {
                cambiarPagina(pagina);
            }
        }
    });
    
    // Calendario
    document.getElementById('prev-month').addEventListener('click', () => cambiarMesCalendario('prev'));
    document.getElementById('next-month').addEventListener('click', () => cambiarMesCalendario('next'));
    
    // Newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', manejarNewsletterSubmit);
    }
    
    // =========================== 
    // INICIALIZACIÓN FINAL
    // ===========================
    
    // Cargar inscripciones existentes
    const inscripciones = JSON.parse(localStorage.getItem('eventos-inscripciones') || '[]');
    inscripciones.forEach(eventoId => {
        const btn = document.querySelector(`[data-evento="${eventoId}"]`);
        if (btn && btn.classList.contains('btn-inscribir')) {
            btn.innerHTML = '<i class="fas fa-check"></i> Inscrito';
            btn.classList.add('inscrito');
        }
    });
    
    trackEvent('visita_pagina_eventos');
    console.log('Sistema de eventos inicializado correctamente');
});