// =========================== 
// JAVASCRIPT PRINCIPAL - CETPRO ARSENIO MENDOZA FLOR
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================== 
    // NAVEGACIÓN Y SCROLL
    // ===========================
    
    // Header scroll effect
    const header = document.querySelector('.cabecera');
    const navSecundario = document.querySelector('.nav-secundario');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
            navSecundario.style.display = 'none';
        } else {
            header.classList.remove('scrolled');
            navSecundario.style.display = 'flex';
        }
    });
    
    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================== 
    // FAQ ACCORDION
    // ===========================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Cerrar otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del item actual
            item.classList.toggle('active');
        });
    });
    
    // =========================== 
    // ANIMACIONES AL SCROLL
    // ===========================
    
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
    
    // Elementos a observar para animaciones
    const animatedElements = document.querySelectorAll(
        '.card-institucional, .beneficio-card, .programa-card, .directivo-card, .evento-card, .colaborador-logo'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // =========================== 
    // CONTADOR ANIMADO (si existe)
    // ===========================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Observar contadores para animarlos cuando entren en vista
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.disconnect();
                }
            });
        });
        
        counterElements.forEach(element => {
            counterObserver.observe(element);
        });
    }
    
    // =========================== 
    // FORMULARIOS
    // ===========================
    
    // Validación básica de formularios
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remover clase de error después de escribir
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });
            
            if (isValid) {
                // Aquí se procesaría el formulario
                showMessage('Formulario enviado correctamente', 'success');
                form.reset();
            } else {
                showMessage('Por favor, complete todos los campos requeridos', 'error');
            }
        });
    });
    
    // =========================== 
    // SISTEMA DE MENSAJES
    // ===========================
    
    function showMessage(message, type = 'info') {
        // Crear elemento de mensaje
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${type}`;
        messageElement.innerHTML = `
            <span>${message}</span>
            <button class="message-close">&times;</button>
        `;
        
        // Estilos del mensaje
        Object.assign(messageElement.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Agregar al DOM
        document.body.appendChild(messageElement);
        
        // Animar entrada
        setTimeout(() => {
            messageElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Botón de cerrar
        const closeButton = messageElement.querySelector('.message-close');
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '18px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('click', function() {
            removeMessage(messageElement);
        });
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            removeMessage(messageElement);
        }, 5000);
    }
    
    function removeMessage(messageElement) {
        messageElement.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 300);
    }
    
    // =========================== 
    // SLIDER/CAROUSEL (si se necesita)
    // ===========================
    
    function initializeSlider(sliderSelector) {
        const slider = document.querySelector(sliderSelector);
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        const prevButton = slider.querySelector('.slider-prev');
        const nextButton = slider.querySelector('.slider-next');
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        
        // Auto-play opcional
        setInterval(nextSlide, 5000);
        
        // Inicializar
        showSlide(currentSlide);
    }
    
    // =========================== 
    // LAZY LOADING DE IMÁGENES
    // ===========================
    
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // =========================== 
    // BÚSQUEDA EN TIEMPO REAL
    // ===========================
    
    function initializeSearch() {
        const searchInput = document.querySelector('#search-input');
        const searchResults = document.querySelector('#search-results');
        
        if (!searchInput || !searchResults) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        function performSearch(query) {
            // Aquí se realizaría la búsqueda real
            // Por ahora, simulamos resultados
            const mockResults = [
                { title: 'Programa de Computación', url: 'programa-detalle.html?id=1' },
                { title: 'Peluquería y Barbería', url: 'programa-detalle.html?id=2' },
                { title: 'Mecánica de Motos', url: 'programa-detalle.html?id=3' }
            ];
            
            const filteredResults = mockResults.filter(result =>
                result.title.toLowerCase().includes(query.toLowerCase())
            );
            
            displaySearchResults(filteredResults);
        }
        
        function displaySearchResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<p>No se encontraron resultados</p>';
                return;
            }
            
            const html = results.map(result => `
                <div class="search-result">
                    <a href="${result.url}">${result.title}</a>
                </div>
            `).join('');
            
            searchResults.innerHTML = html;
        }
    }
    
    // Inicializar búsqueda si existe
    initializeSearch();
    
    // =========================== 
    // UTILIDADES GENERALES
    // ===========================
    
    // Función para formatear números
    function formatNumber(num) {
        return new Intl.NumberFormat('es-PE').format(num);
    }
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Función para validar teléfono peruano
    function validatePhone(phone) {
        const re = /^(\+51|51|0)?9[0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
    
    // Exponer funciones globalmente si se necesita
    window.CETProUtils = {
        showMessage,
        validateEmail,
        validatePhone,
        formatNumber
    };
    
    // =========================== 
    // INICIALIZACIÓN FINAL
    // ===========================
    
    console.log('CETPRO Arsenio Mendoza Flor - Sistema inicializado correctamente');
    
    // Eventos personalizados
    document.dispatchEvent(new CustomEvent('cetproReady', {
        detail: { timestamp: new Date().toISOString() }
    }));
});

// =========================== 
// FUNCIONES PARA PÁGINAS ESPECÍFICAS
// ===========================

// Función para páginas de programas
function initializeProgramsPage() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const programCards = document.querySelectorAll('.program-card');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Actualizar botones activos
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar tarjetas
            programCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Función para página de contacto
function initializeContactPage() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validaciones específicas
            if (!CETProUtils.validateEmail(data.email)) {
                CETProUtils.showMessage('Por favor, ingrese un email válido', 'error');
                return;
            }
            
            if (data.phone && !CETProUtils.validatePhone(data.phone)) {
                CETProUtils.showMessage('Por favor, ingrese un teléfono válido', 'error');
                return;
            }
            
            // Simular envío
            CETProUtils.showMessage('Mensaje enviado correctamente. Nos comunicaremos contigo pronto.', 'success');
            this.reset();
        });
    }
}

// Auto-inicializar según la página actual
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('programas.html')) {
        initializeProgramsPage();
    } else if (currentPage.includes('contacto.html')) {
        initializeContactPage();
    }
});