// js/ubicacion.js
document.addEventListener('DOMContentLoaded', function() {
    // ===========================
    // ELEMENTOS DEL DOM
    // ===========================
    const btnCopiar = document.querySelectorAll('.btn-copiar');
    const galeriaItems = Array.from(document.querySelectorAll('.galeria-item'));
    const modalGaleria = document.getElementById('modal-galeria');
    const modalImagen = document.getElementById('modal-imagen');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const btnVerMasFotos = document.getElementById('ver-mas-fotos');
    const btnTourVirtual = document.getElementById('tour-virtual');

    let galeriaActual = 0;
    let imagenesGaleria = [];

    // Construir imagenesGaleria desde DOM (para que sea dinámico según PHP)
    function construirGaleriaDesdeDOM() {
        imagenesGaleria = galeriaItems.map(item => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.galeria-overlay');
            return {
                src: img ? img.getAttribute('src') : '',
                titulo: overlay ? (overlay.querySelector('h4') ? overlay.querySelector('h4').innerText : '') : '',
                descripcion: overlay ? (overlay.querySelector('p') ? overlay.querySelector('p').innerText : '') : ''
            };
        });
    }

    // ===========================
    // FUNCIONALIDAD DE COPIAR
    // ===========================
    function initializeCopyButtons() {
        btnCopiar.forEach(btn => {
            btn.addEventListener('click', function() {
                const texto = this.dataset.texto || '';
                if (!texto) {
                    mostrarNotificacion('No hay dirección para copiar', 'error');
                    return;
                }
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(texto).then(() => {
                        mostrarNotificacion('Dirección copiada al portapapeles', 'success');
                        animarBotonCopiar(this);
                    }).catch(() => {
                        copiarTextoFallback(texto, this);
                    });
                } else {
                    copiarTextoFallback(texto, this);
                }
            });
        });
    }

    function copiarTextoFallback(texto, btn) {
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            mostrarNotificacion('Dirección copiada al portapapeles', 'success');
            if (btn) animarBotonCopiar(btn);
        } catch (err) {
            mostrarNotificacion('No se pudo copiar la dirección', 'error');
        }
        document.body.removeChild(textArea);
    }

    function animarBotonCopiar(btn) {
        const iconoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
        btn.style.background = '#27ae60';
        btn.style.color = 'white';
        btn.style.borderColor = '#27ae60';
        setTimeout(() => {
            btn.innerHTML = iconoOriginal;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    }

    // ===========================
    // GALERÍA
    // ===========================
    function initializeGallery() {
        construirGaleriaDesdeDOM();

        galeriaItems.forEach((item, index) => {
            item.setAttribute('data-gindex', index);
            item.addEventListener('click', () => abrirModal(index));
            item.style.cursor = 'pointer';
        });

        if (modalClose) modalClose.addEventListener('click', cerrarModal);
        if (modalPrev) modalPrev.addEventListener('click', imagenAnterior);
        if (modalNext) modalNext.addEventListener('click', imagenSiguiente);

        // Teclas
        document.addEventListener('keydown', function(e) {
            if (!modalGaleria || modalGaleria.style.display !== 'block') return;
            if (e.key === 'Escape') cerrarModal();
            if (e.key === 'ArrowLeft') imagenAnterior();
            if (e.key === 'ArrowRight') imagenSiguiente();
        });

        if (modalGaleria) {
            modalGaleria.addEventListener('click', function(e) {
                if (e.target === modalGaleria) cerrarModal();
            });
        }
    }

    function abrirModal(index) {
        galeriaActual = index;
        mostrarImagenModal();
        if (modalGaleria) {
            modalGaleria.style.display = 'block';
            document.body.style.overflow = 'hidden';
            modalGaleria.style.opacity = '0';
            setTimeout(()=> modalGaleria.style.opacity = '1', 10);
        }
        trackEvent('abrir_galeria', {imagen: index});
    }

    function cerrarModal() {
        if (!modalGaleria) return;
        modalGaleria.style.opacity = '0';
        setTimeout(()=> {
            modalGaleria.style.display = 'none';
            document.body.style.overflow = '';
        }, 250);
    }

    function mostrarImagenModal() {
        const imagen = imagenesGaleria[galeriaActual];
        if (!imagen) return;
        if (modalImagen) { modalImagen.src = imagen.src; modalImagen.alt = imagen.titulo; }
        if (modalTitulo) modalTitulo.textContent = imagen.titulo || '';
        if (modalDescripcion) modalDescripcion.textContent = imagen.descripcion || '';
        precargarImagenes();
    }

    function imagenAnterior() {
        galeriaActual = (galeriaActual > 0) ? galeriaActual - 1 : imagenesGaleria.length - 1;
        mostrarImagenModal();
        trackEvent('navegacion_galeria', {direccion: 'anterior'});
    }

    function imagenSiguiente() {
        galeriaActual = (galeriaActual < imagenesGaleria.length - 1) ? galeriaActual + 1 : 0;
        mostrarImagenModal();
        trackEvent('navegacion_galeria', {direccion: 'siguiente'});
    }

    function precargarImagenes() {
        const prevIndex = galeriaActual > 0 ? galeriaActual - 1 : imagenesGaleria.length - 1;
        const nextIndex = galeriaActual < imagenesGaleria.length - 1 ? galeriaActual + 1 : 0;
        [prevIndex, nextIndex].forEach(i => {
            const imgObj = imagenesGaleria[i];
            if (imgObj && imgObj.src) {
                const img = new Image();
                img.src = imgObj.src;
            }
        });
    }

    // ===========================
    // BOTONES ADICIONALES
    // ===========================
    function initializeAdditionalButtons() {
        if (btnVerMasFotos) {
            btnVerMasFotos.addEventListener('click', function() {
                if (imagenesGaleria.length > 0) abrirModal(0);
                trackEvent('ver_mas_fotos');
            });
        }
        if (btnTourVirtual) {
            btnTourVirtual.addEventListener('click', function() {
                mostrarNotificacion('Tour virtual próximamente disponible', 'info');
                trackEvent('tour_virtual_click');
            });
        }
    }

    // ===========================
    // INTERACCIONES CON MAPA
    // ===========================
    function initializeMapInteractions() {
        // Track clicks en enlaces de direcciones, telefonos y whatsapp
        const enlacesDireccion = document.querySelectorAll('a[href*="maps"], a[href*="directions"]');
        enlacesDireccion.forEach(enlace => enlace.addEventListener('click', () => trackEvent('abrir_direcciones', {tipo: 'google_maps'})));

        const enlacesTelefono = document.querySelectorAll('a[href^="tel:"]');
        enlacesTelefono.forEach(enlace => enlace.addEventListener('click', function() {
            const numero = this.getAttribute('href').replace('tel:', '');
            trackEvent('llamar_telefono', {numero});
        }));

        const enlacesWhatsApp = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        enlacesWhatsApp.forEach(enlace => enlace.addEventListener('click', () => trackEvent('abrir_whatsapp')));
    }

    // ===========================
    // SCROLL ANIMATIONS / TOOLTIP / ACCESSIBILITY / PERFORMANCE
    // ===========================
    function initializeScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('fade-in'); });
        }, observerOptions);
        const animatedElements = document.querySelectorAll('.detalle-card, .transporte-card, .referencia-card, .servicio-item, .galeria-item, .stat-item');
        animatedElements.forEach(element => observer.observe(element));
    }

    function initializeTooltips() {
        const elementosConTitulo = document.querySelectorAll('[title]');
        elementosConTitulo.forEach(elemento => {
            const titulo = elemento.getAttribute('title');
            elemento.removeAttribute('title');
            elemento.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = titulo;
                tooltip.style.cssText = 'position:absolute;background:rgba(0,0,0,0.8);color:white;padding:8px 12px;border-radius:4px;font-size:12px;z-index:10000;pointer-events:none;white-space:nowrap;';
                document.body.appendChild(tooltip);
                const rect = elemento.getBoundingClientRect();
                tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
                elemento.addEventListener('mouseleave', function() { if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip); }, { once: true });
            });
        });
    }

    function initializeAccessibility() {
        galeriaItems.forEach((item, index) => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Ver imagen ${index + 1} en galería`);
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirModal(index); }
            });
        });
        if (modalGaleria) {
            modalGaleria.setAttribute('role', 'dialog');
            modalGaleria.setAttribute('aria-modal', 'true');
            modalGaleria.setAttribute('aria-labelledby', 'modal-titulo');
            modalGaleria.setAttribute('aria-describedby', 'modal-descripcion');
        }
    }

    function initializePerformanceOptimizations() {
        const imgs = document.querySelectorAll('.galeria-item img');
        if (!('IntersectionObserver' in window)) return;
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        imgs.forEach(img => { if (img.dataset.src) imageObserver.observe(img); });
    }

    // ===========================
    // UTILIDADES
    // ===========================
    function mostrarNotificacion(mensaje, tipo = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${tipo}`;
        notification.innerHTML = `<i class="fas fa-${tipo === 'success' ? 'check' : tipo === 'error' ? 'times' : 'info'}-circle"></i><span>${mensaje}</span><button class="notification-close">&times;</button>`;
        Object.assign(notification.style, { position: 'fixed', top: '20px', right: '20px', background: tipo === 'success' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db', color: 'white', padding: '12px 16px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: '9999', display: 'flex', alignItems: 'center', gap: '10px', transform: 'translateX(100%)', transition: 'transform 0.3s ease', maxWidth: '360px' });
        const closeBtn = notification.querySelector('.notification-close'); closeBtn.style.background='none'; closeBtn.style.border='none'; closeBtn.style.color='white'; closeBtn.style.fontSize='18px'; closeBtn.style.cursor='pointer'; closeBtn.style.marginLeft='auto';
        document.body.appendChild(notification);
        setTimeout(()=> notification.style.transform = 'translateX(0)', 100);
        const removeNotification = () => { notification.style.transform = 'translateX(100%)'; setTimeout(()=> { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300); };
        closeBtn.addEventListener('click', removeNotification);
        setTimeout(removeNotification, 5000);
    }

    function trackEvent(evento, datos = {}) {
        try {
            const analytics = JSON.parse(localStorage.getItem('analytics') || '{}');
            const fecha = new Date().toISOString().split('T')[0];
            if (!analytics[fecha]) analytics[fecha] = {};
            if (!analytics[fecha][evento]) analytics[fecha][evento] = 0;
            analytics[fecha][evento]++;
            localStorage.setItem('analytics', JSON.stringify(analytics));
        } catch (err) { console.log('analytics error', err); }
        console.log('Evento:', evento, datos);
    }

    // ===========================
    // INICIALIZACIÓN
    // ===========================
    construirGaleriaDesdeDOM();
    initializeCopyButtons();
    initializeGallery();
    initializeAdditionalButtons();
    initializeMapInteractions();
    initializeScrollAnimations();
    initializeTooltips();
    initializeAccessibility();
    initializePerformanceOptimizations();
    trackEvent('visita_pagina_ubicacion');
    console.log('Sistema de ubicación inicializado correctamente');
});
