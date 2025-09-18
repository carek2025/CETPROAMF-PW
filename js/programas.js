// =========================== 
// JAVASCRIPT ESPECÍFICO - PÁGINA PROGRAMAS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================== 
    // ELEMENTOS DEL DOM
    // ===========================
    const searchInput = document.getElementById('search-programs');
    const categoriaButtons = document.querySelectorAll('.categoria-btn');
    const programaCards = document.querySelectorAll('.programa-card');
    const totalProgramasElement = document.getElementById('total-programas');
    const noResultados = document.getElementById('no-resultados');
    const ordenarSelect = document.getElementById('ordenar');
    const programasContainer = document.getElementById('programas-container');
    const btnFavoritos = document.querySelectorAll('.btn-favorito');
    
    let programasFiltrados = Array.from(programaCards);
    let favoritos = JSON.parse(localStorage.getItem('programas-favoritos') || '[]');
    
    // =========================== 
    // INICIALIZACIÓN
    // ===========================
    
    // Cargar favoritos guardados
    cargarFavoritos();
    
    // Actualizar contador inicial
    actualizarContador();
    
    // =========================== 
    // FUNCIONES DE FILTRADO
    // ===========================
    
    function filtrarProgramas() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoriaActiva = document.querySelector('.categoria-btn.activo').dataset.categoria;
        
        programasFiltrados = Array.from(programaCards).filter(card => {
            const nombre = card.dataset.nombre.toLowerCase();
            const categoria = card.dataset.categoria;
            const contenido = card.querySelector('.programa-contenido p').textContent.toLowerCase();
            const docente = card.querySelector('.programa-docente span').textContent.toLowerCase();
            
            // Filtro por búsqueda
            const matchesSearch = searchTerm === '' || 
                                nombre.includes(searchTerm) || 
                                contenido.includes(searchTerm) || 
                                docente.includes(searchTerm);
            
            // Filtro por categoría
            const matchesCategory = categoriaActiva === 'todos' || categoria === categoriaActiva;
            
            return matchesSearch && matchesCategory;
        });
        
        mostrarProgramas();
        actualizarContador();
    }
    
    function mostrarProgramas() {
        // Ocultar todas las cards
        programaCards.forEach(card => {
            card.classList.remove('mostrar');
            card.style.display = 'none';
        });
        
        if (programasFiltrados.length === 0) {
            noResultados.style.display = 'block';
        } else {
            noResultados.style.display = 'none';
            
            // Mostrar cards filtradas con animación escalonada
            programasFiltrados.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('mostrar');
                }, index * 100);
            });
        }
    }
    
    function actualizarContador() {
        totalProgramasElement.textContent = programasFiltrados.length;
        
        // Animación del contador
        totalProgramasElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            totalProgramasElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // =========================== 
    // FUNCIONES DE ORDENAMIENTO
    // ===========================
    
    function ordenarProgramas(criterio) {
        const programasArray = Array.from(programasFiltrados);
        
        programasArray.sort((a, b) => {
            switch (criterio) {
                case 'nombre':
                    return a.dataset.nombre.localeCompare(b.dataset.nombre);
                case 'popularidad':
                    return parseInt(b.dataset.popularidad) - parseInt(a.dataset.popularidad);
                case 'categoria':
                    return a.dataset.categoria.localeCompare(b.dataset.categoria);
                default:
                    return 0;
            }
        });
        
        // Reordenar en el DOM
        const container = document.getElementById('programas-container');
        programasArray.forEach(card => {
            container.appendChild(card);
        });
        
        programasFiltrados = programasArray;
        mostrarProgramas();
    }
    
    // =========================== 
    // SISTEMA DE FAVORITOS
    // ===========================
    
    function cargarFavoritos() {
        btnFavoritos.forEach(btn => {
            const programaId = btn.dataset.id;
            if (favoritos.includes(programaId)) {
                btn.classList.add('active');
                btn.querySelector('i').classList.remove('far');
                btn.querySelector('i').classList.add('fas');
            }
        });
    }
    
    function toggleFavorito(programaId, btn) {
        const index = favoritos.indexOf(programaId);
        
        if (index === -1) {
            // Agregar a favoritos
            favoritos.push(programaId);
            btn.classList.add('active');
            btn.querySelector('i').classList.remove('far');
            btn.querySelector('i').classList.add('fas');
            
            // Feedback visual
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
            
            mostrarNotificacion('Programa agregado a favoritos', 'success');
        } else {
            // Remover de favoritos
            favoritos.splice(index, 1);
            btn.classList.remove('active');
            btn.querySelector('i').classList.remove('fas');
            btn.querySelector('i').classList.add('far');
            
            mostrarNotificacion('Programa removido de favoritos', 'info');
        }
        
        // Guardar en localStorage
        localStorage.setItem('programas-favoritos', JSON.stringify(favoritos));
    }
    
    // =========================== 
    // FUNCIONES DE UTILIDAD
    // ===========================
    
    function limpiarFiltros() {
        searchInput.value = '';
        
        // Resetear categorías
        categoriaButtons.forEach(btn => btn.classList.remove('activo'));
        document.querySelector('[data-categoria="todos"]').classList.add('activo');
        
        // Resetear ordenamiento
        ordenarSelect.value = 'nombre';
        
        filtrarProgramas();
    }
    
    function mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${tipo}`;
        notification.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${mensaje}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: tipo === 'success' ? '#2ecc71' : '#3498db',
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
            minWidth: '300px'
        });
        
        // Botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.marginLeft = 'auto';
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remover y evento de cerrar
        const remover = () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', remover);
        setTimeout(remover, 4000);
    }
    
    // =========================== 
    // EVENT LISTENERS
    // ===========================
    
    // Búsqueda en tiempo real
    searchInput.addEventListener('input', debounce(filtrarProgramas, 300));
    
    // Filtros de categoría
    categoriaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Actualizar botón activo
            categoriaButtons.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            filtrarProgramas();
        });
    });
    
    // Ordenamiento
    ordenarSelect.addEventListener('change', function() {
        ordenarProgramas(this.value);
    });
    
    // Favoritos
    btnFavoritos.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorito(this.dataset.id, this);
        });
    });
    
    // Búsqueda por Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            filtrarProgramas();
        }
    });
    
    // =========================== 
    // FUNCIONES DE UTILIDAD GLOBALES
    // ===========================
    
    // Debounce para optimizar búsqueda
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
    // ANALYTICS Y TRACKING (SIMULADO)
    // ===========================
    
    function trackEvent(evento, datos = {}) {
        // Aquí se podría implementar Google Analytics o similar
        console.log(`Evento: ${evento}`, datos);
        
        // Guardar en localStorage para análisis
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
    
    // Tracking de interacciones
    categoriaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('filtro_categoria', { categoria: btn.dataset.categoria });
        });
    });
    
    programaCards.forEach(card => {
        const verDetallesBtn = card.querySelector('a[href^="programa-detalle"]');
        if (verDetallesBtn) {
            verDetallesBtn.addEventListener('click', () => {
                trackEvent('ver_detalle_programa', { 
                    programa: card.dataset.nombre,
                    categoria: card.dataset.categoria 
                });
            });
        }
    });
    
    // =========================== 
    // FUNCIONES EXPUESTAS GLOBALMENTE
    // ===========================
    
    // Exponer función para uso en HTML
    window.limpiarFiltros = limpiarFiltros;
    
    // Función para mostrar solo favoritos
    window.mostrarFavoritos = function() {
        if (favoritos.length === 0) {
            mostrarNotificacion('No tienes programas favoritos', 'info');
            return;
        }
        
        programasFiltrados = Array.from(programaCards).filter(card => 
            favoritos.includes(card.querySelector('.btn-favorito').dataset.id)
        );
        
        mostrarProgramas();
        actualizarContador();
    };
    
    // Función para exportar favoritos
    window.exportarFavoritos = function() {
        if (favoritos.length === 0) {
            mostrarNotificacion('No tienes programas favoritos para exportar', 'info');
            return;
        }
        
        const programasFavoritos = favoritos.map(id => {
            const card = document.querySelector(`[data-id="${id}"]`).closest('.programa-card');
            return {
                id: id,
                nombre: card.dataset.nombre,
                categoria: card.dataset.categoria,
                popularidad: card.dataset.popularidad
            };
        });
        
        const dataStr = JSON.stringify(programasFavoritos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mis-programas-favoritos.json';
        link.click();
        
        mostrarNotificacion('Favoritos exportados exitosamente', 'success');
    };
    
    console.log('Sistema de programas inicializado correctamente');
});