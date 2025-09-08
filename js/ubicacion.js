// =========================== 
// JAVASCRIPT ESPECÍFICO - PÁGINA UBICACIÓN
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================== 
    // ELEMENTOS DEL DOM
    // ===========================
    const btnCopiar = document.querySelectorAll('.btn-copiar');
    const galeriaItems = document.querySelectorAll('.galeria-item');
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
    const imagenesGaleria = [
        {
            src: 'img/instalacion-1.jpg',
            titulo: 'Fachada Principal',
            descripcion: 'Entrada principal con moderno diseño arquitectónico'
        },
        {
            src: 'img/instalacion-2.jpg',
            titulo: 'Laboratorio de Cómputo',
            descripcion: '30 equipos de última generación'
        },
        {
            src: 'img/instalacion-3.jpg',
            titulo: 'Taller de Mecánica',
            descripcion: 'Equipos profesionales para prácticas'
        },
        {
            src: 'img/instalacion-4.jpg',
            titulo: 'Aula de Peluquería',
            descripcion: 'Salón completamente equipado'
        },
        {
            src: 'img/instalacion-5.jpg',
            titulo: 'Biblioteca',
            descripcion: 'Espacio de estudio y consulta'
        },
        {
            src: 'img/instalacion-6.jpg',
            titulo: 'Cafetería',
            descripcion: 'Área de descanso y alimentación'
        }
    ];
    
    // =========================== 
    // FUNCIONALIDAD DE COPIAR
    // ===========================
    
    function initializeCopyButtons() {
        btnCopiar.forEach(btn => {
            btn.addEventListener('click', function() {
                const texto = this.dataset.texto;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(texto).then(() => {
                        mostrarNotificacion('Dirección copiada al portapapeles', 'success');
                        animarBotonCopiar(this);
                    }).catch(() => {
                        copiarTextoFallback(texto);
                    });
                } else {
                    copiarTextoFallback(texto);
                }
            });
        });
    }
    
    function copiarTextoFallback(texto) {
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            mostrarNotificacion('Dirección copiada al portapapeles', 'success');
            animarBotonCopiar(document.querySelector('.btn-copiar'));
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
    // GALERÍA DE IMÁGENES
    // ===========================
    
    function initializeGallery() {
        galeriaItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                abrirModal(index);
            });
        });
        
        modalClose.addEventListener('click', cerrarModal);
        modalPrev.addEventListener('click', imagenAnterior);
        modalNext.addEventListener('click', imagenSiguiente);
        
        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalGaleria.style.display === 'block') {
                cerrarModal();
            }
            if (e.key === 'ArrowLeft' && modalGaleria.style.display === 'block') {
                imagenAnterior();
            }
            if (e.key === 'ArrowRight' && modalGaleria.style.display === 'block') {
                imagenSiguiente();
            }
        });
        
        // Cerrar modal al hacer clic fuera de la imagen
        modalGaleria.addEventListener('click', function(e) {
            if (e.target === modalGaleria) {
                cerrarModal();
            }
        });
    }
    
    function abrirModal(index) {
        galeriaActual = index;
        mostrarImagenModal();
        modalGaleria.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada
        modalGaleria.style.opacity = '0';
        setTimeout(() => {
            modalGaleria.style.opacity = '1';
        }, 10);
        
        trackEvent('abrir_galeria', { imagen: index });
    }
    
    function cerrarModal() {
        modalGaleria.style.opacity = '0';
        setTimeout(() => {
            modalGaleria.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    function mostrarImagenModal() {
        const imagen = imagenesGaleria[galeriaActual];
        modalImagen.src = imagen.src;
        modalImagen.alt = imagen.titulo;
        modalTitulo.textContent = imagen.titulo;
        modalDescripcion.textContent = imagen.descripcion;
        
        // Precargar imágenes adyacentes
        precargarImagenes();
    }
    
    function imagenAnterior() {
        galeriaActual = galeriaActual > 0 ? galeriaActual - 1 : imagenesGaleria.length - 1;
        mostrarImagenModal();
        trackEvent('navegacion_galeria', { direccion: 'anterior' });
    }
    
    function imagenSiguiente() {
        galeriaActual = galeriaActual < imagenesGaleria.length - 1 ? galeriaActual + 1 : 0;
        mostrarImagenModal();
        trackEvent('navegacion_galeria', { direccion: 'siguiente' });
    }
    
    function precargarImagenes() {
        const prevIndex = galeriaActual > 0 ? galeriaActual - 1 : imagenesGaleria.length - 1;
        const nextIndex = galeriaActual < imagenesGaleria.length - 1 ? galeriaActual + 1 : 0;
        
        [prevIndex, nextIndex].forEach(index => {
            const img = new Image();
            img.src = imagenesGaleria[index].src;
        });
    }
    
    // =========================== 
    // BOTONES ADICIONALES
    // ===========================
    
    function initializeAdditionalButtons() {
        if (btnVerMasFotos) {
            btnVerMasFotos.addEventListener('click', function() {
                abrirModal(0);
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
        // Detectar clics en enlaces de direcciones
        const enlacesDireccion = document.querySelectorAll('a[href*="maps"], a[href*="directions"]');
        enlacesDireccion.forEach(enlace => {
            enlace.addEventListener('click', function() {
                trackEvent('abrir_direcciones', { tipo: 'google_maps' });
            });
        });
        
        // Detectar clics en números de teléfono
        const enlacesTelefono = document.querySelectorAll('a[href^="tel:"]');
        enlacesTelefono.forEach(enlace => {
            enlace.addEventListener('click', function() {
                const numero = this.getAttribute('href').replace('tel:', '');
                trackEvent('llamar_telefono', { numero });
            });
        });
        
        // Detectar clics en WhatsApp
        const enlacesWhatsApp = document.querySelectorAll('a[href*="wa.me"]');
        enlacesWhatsApp.forEach(enlace => {
            enlace.addEventListener('click', function() {
                trackEvent('abrir_whatsapp');
            });
        });
    }
    
    // =========================== 
    // ANIMACIONES DE SCROLL
    // ===========================
    
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Elementos a animar
        const animatedElements = document.querySelectorAll(
            '.detalle-card, .transporte-card, .referencia-card, .servicio-item, .galeria-item, .stat-item'
        );
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
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
    
    // =========================== 
    // FUNCIONES ADICIONALES
    // ===========================
    
    function initializeTooltips() {
        // Crear tooltips para elementos con título
        const elementosConTitulo = document.querySelectorAll('[title]');
        
        elementosConTitulo.forEach(elemento => {
            const titulo = elemento.getAttribute('title');
            elemento.removeAttribute('title'); // Remover tooltip nativo
            
            elemento.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = titulo;
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 10000;
                    pointer-events: none;
                    white-space: nowrap;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = elemento.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                
                elemento.addEventListener('mouseleave', function() {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, { once: true });
            });
        });
    }
    
    function initializeAccessibility() {
        // Mejorar accesibilidad de la galería
        galeriaItems.forEach((item, index) => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Ver imagen ${index + 1} en galería`);
            
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    abrirModal(index);
                }
            });
        });
        
        // Mejorar accesibilidad del modal
        if (modalGaleria) {
            modalGaleria.setAttribute('role', 'dialog');
            modalGaleria.setAttribute('aria-modal', 'true');
            modalGaleria.setAttribute('aria-labelledby', 'modal-titulo');
            modalGaleria.setAttribute('aria-describedby', 'modal-descripcion');
        }
    }
    
    function initializePerformanceOptimizations() {
        // Lazy loading para imágenes de la galería
        const imagenesGaleria = document.querySelectorAll('.galeria-item img');
        
        if ('IntersectionObserver' in window) {
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
            
            imagenesGaleria.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
    }
    
    // =========================== 
    // INICIALIZACIÓN
    // ===========================
    
    initializeCopyButtons();
    initializeGallery();
    initializeAdditionalButtons();
    initializeMapInteractions();
    initializeScrollAnimations();
    initializeTooltips();
    initializeAccessibility();
    initializePerformanceOptimizations();
    
    // Tracking de página
    trackEvent('visita_pagina_ubicacion');
    
    console.log('Sistema de ubicación inicializado correctamente');
});