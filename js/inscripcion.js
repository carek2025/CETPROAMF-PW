// =========================== 
// JAVASCRIPT ESPECÍFICO - PÁGINA INSCRIPCIÓN
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================== 
    // ELEMENTOS DEL DOM
    // ===========================
    const inscripcionForm = document.getElementById('inscripcion-form');
    const steps = document.querySelectorAll('.step');
    const formSections = document.querySelectorAll('.form-section');
    
    let currentStep = 1;
    let formProgress = 0;
    
    // =========================== 
    // INICIALIZACIÓN
    // ===========================
    
    initializeFormValidation();
    initializeProgressTracking();
    initializeDNIValidation();
    initializePhoneFormatting();
    initializeFormPersistence();
    
    // =========================== 
    // VALIDACIÓN DE FORMULARIO
    // ===========================
    
    function initializeFormValidation() {
        inscripcionForm.addEventListener('submit', handleFormSubmit);
        
        // Validación en tiempo real
        const inputs = inscripcionForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                clearFieldError(input);
                updateProgress();
            });
        });
        
        // Validación especial para checkboxes requeridos
        const requiredCheckboxes = inscripcionForm.querySelectorAll('input[type="checkbox"][required]');
        requiredCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => validateField(checkbox));
        });
    }
    
    function validateField(field) {
        const fieldGroup = field.closest('.form-group');
        const fieldType = field.type;
        const fieldValue = field.value.trim();
        const fieldName = field.name;
        
        let isValid = true;
        let errorMessage = '';
        
        // Validaciones generales
        if (field.hasAttribute('required') && !fieldValue && fieldType !== 'checkbox') {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Validaciones para checkboxes requeridos
        if (fieldType === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
            errorMessage = 'Debe aceptar este campo';
        }
        
        // Validaciones específicas
        if (isValid && fieldValue) {
            switch (fieldType) {
                case 'email':
                    if (!validateEmail(fieldValue)) {
                        isValid = false;
                        errorMessage = 'Ingrese un email válido';
                    }
                    break;
                    
                case 'tel':
                    if (fieldName === 'celular') {
                        if (!validateCellPhone(fieldValue)) {
                            isValid = false;
                            errorMessage = 'Celular debe tener 9 dígitos y empezar con 9';
                        }
                    }
                    break;
                    
                case 'text':
                    if (fieldName === 'dni') {
                        if (!validateDNI(fieldValue)) {
                            isValid = false;
                            errorMessage = 'DNI debe tener exactamente 8 dígitos';
                        }
                    }
                    break;
                    
                case 'date':
                    if (fieldName === 'fecha_nacimiento') {
                        if (!validateAge(fieldValue)) {
                            isValid = false;
                            errorMessage = 'Debe ser mayor de 16 años';
                        }
                    }
                    break;
            }
        }
        
        // Aplicar estilos de validación
        if (isValid) {
            setFieldSuccess(fieldGroup);
        } else {
            setFieldError(fieldGroup, errorMessage);
        }
        
        return isValid;
    }
    
    function setFieldError(fieldGroup, message) {
        fieldGroup.classList.remove('success');
        fieldGroup.classList.add('error');
        
        // Remover mensaje anterior
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Agregar nuevo mensaje
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        fieldGroup.appendChild(errorDiv);
    }
    
    function setFieldSuccess(fieldGroup) {
        fieldGroup.classList.remove('error');
        fieldGroup.classList.add('success');
        
        // Remover mensajes de error
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        fieldGroup.classList.remove('error');
        
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // =========================== 
    // MANEJO DE ENVÍO DE FORMULARIO
    // ===========================
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitButton = inscripcionForm.querySelector('button[type="submit"]');
        
        // Validar todos los campos
        const inputs = inscripcionForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showNotification('Por favor, corrija los errores en el formulario', 'error');
            scrollToFirstError();
            return;
        }
        
        // Mostrar estado de carga
        setButtonLoading(submitButton, true);
        
        try {
            // Recopilar datos del formulario
            const formData = new FormData(inscripcionForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simular envío (aquí se conectaría con el backend)
            await simulateFormSubmission(data);
            
            // Éxito
            showSuccessMessage();
            clearFormPersistence();
            
            // Analytics
            trackEvent('inscripcion_enviada', { programa: data.programa_interes });
            
        } catch (error) {
            console.error('Error al enviar inscripción:', error);
            showNotification('Hubo un error al enviar la inscripción. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            setButtonLoading(submitButton, false);
        }
    }
    
    async function simulateFormSubmission(data) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Simular posible error (2% de probabilidad)
        if (Math.random() < 0.02) {
            throw new Error('Error simulado de red');
        }
        
        // Guardar en localStorage para demostración
        const inscripciones = JSON.parse(localStorage.getItem('inscripciones') || '[]');
        inscripciones.push({
            id: Date.now(),
            data: data,
            timestamp: new Date().toISOString(),
            estado: 'pendiente'
        });
        localStorage.setItem('inscripciones', JSON.stringify(inscripciones));
        
        console.log('Inscripción enviada:', data);
    }
    
    function showSuccessMessage() {
        // Crear modal de éxito
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>¡Inscripción Enviada Exitosamente!</h3>
                <p>Hemos recibido tu inscripción preliminar. Un asesor se comunicará contigo en las próximas 24 horas para continuar con el proceso.</p>
                <div class="success-details">
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>Te llamaremos al número registrado</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-envelope"></i>
                        <span>Recibirás un email de confirmación</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-whatsapp"></i>
                        <span>También puedes contactarnos por WhatsApp</span>
                    </div>
                </div>
                <div class="success-actions">
                    <a href="https://wa.me/51954803212" target="_blank" class="btn btn-primary">
                        <i class="fab fa-whatsapp"></i>
                        Contactar por WhatsApp
                    </a>
                    <button class="btn btn-secondary" onclick="closeSuccessModal()">
                        <i class="fas fa-home"></i>
                        Ir al Inicio
                    </button>
                </div>
            </div>
        `;
        
        // Estilos del modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            backdropFilter: 'blur(5px)'
        });
        
        const modalContent = modal.querySelector('.success-modal-content');
        Object.assign(modalContent.style, {
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        });
        
        const successIcon = modal.querySelector('.success-icon i');
        Object.assign(successIcon.style, {
            fontSize: '80px',
            color: '#27ae60',
            marginBottom: '20px'
        });
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Función global para cerrar modal
        window.closeSuccessModal = function() {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            window.location.href = 'index.html';
        };
    }
    
    // =========================== 
    // SEGUIMIENTO DE PROGRESO
    // ===========================
    
    function initializeProgressTracking() {
        // Crear barra de progreso
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        document.body.appendChild(progressBar);
        
        updateProgress();
        
        // Actualizar progreso al hacer scroll
        window.addEventListener('scroll', updateStepProgress);
    }
    
    function updateProgress() {
        const totalFields = inscripcionForm.querySelectorAll('input[required], select[required], textarea[required]').length;
        const completedFields = inscripcionForm.querySelectorAll('input[required]:valid, select[required]:valid, textarea[required]:valid').length;
        
        formProgress = Math.round((completedFields / totalFields) * 100);
        
        const progressBar = document.querySelector('.form-progress');
        if (progressBar) {
            progressBar.style.width = formProgress + '%';
        }
    }
    
    function updateStepProgress() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        formSections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 200;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                updateActiveStep(index + 1);
            }
        });
    }
    
    function updateActiveStep(stepNumber) {
        if (stepNumber !== currentStep) {
            currentStep = stepNumber;
            
            steps.forEach((step, index) => {
                if (index < stepNumber) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        }
    }
    
    // =========================== 
    // VALIDACIONES ESPECÍFICAS
    // ===========================
    
    function initializeDNIValidation() {
        const dniInput = document.getElementById('dni');
        
        dniInput.addEventListener('input', function() {
            // Solo permitir números
            this.value = this.value.replace(/\D/g, '');
            
            // Limitar a 8 dígitos
            if (this.value.length > 8) {
                this.value = this.value.slice(0, 8);
            }
            
            // Validación en tiempo real
            if (this.value.length === 8) {
                // Aquí se podría integrar con API de RENIEC
                console.log('DNI completo:', this.value);
            }
        });
    }
    
    function initializePhoneFormatting() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        
        phoneInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Solo permitir números
                let value = this.value.replace(/\D/g, '');
                
                if (this.name === 'celular') {
                    // Limitar a 9 dígitos para celular
                    if (value.length > 9) value = value.slice(0, 9);
                } else {
                    // Limitar a 7 dígitos para teléfono fijo
                    if (value.length > 7) value = value.slice(0, 7);
                }
                
                this.value = value;
            });
        });
    }
    
    // =========================== 
    // PERSISTENCIA DE FORMULARIO
    // ===========================
    
    function initializeFormPersistence() {
        // Cargar datos guardados
        loadFormData();
        
        // Guardar datos automáticamente
        const inputs = inscripcionForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(saveFormData, 1000));
            input.addEventListener('change', saveFormData);
        });
    }
    
    function saveFormData() {
        const formData = new FormData(inscripcionForm);
        const data = Object.fromEntries(formData.entries());
        
        // No guardar datos sensibles
        delete data.dni;
        
        localStorage.setItem('inscripcion-draft', JSON.stringify(data));
    }
    
    function loadFormData() {
        const savedData = localStorage.getItem('inscripcion-draft');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                Object.keys(data).forEach(key => {
                    const field = inscripcionForm.querySelector(`[name="${key}"]`);
                    if (field && field.type !== 'checkbox') {
                        field.value = data[key];
                    }
                });
                
                showNotification('Se han restaurado los datos guardados anteriormente', 'info');
            } catch (error) {
                console.error('Error al cargar datos guardados:', error);
            }
        }
    }
    
    function clearFormPersistence() {
        localStorage.removeItem('inscripcion-draft');
    }
    
    // =========================== 
    // FUNCIONES DE UTILIDAD
    // ===========================
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateCellPhone(phone) {
        const re = /^9[0-9]{8}$/;
        return re.test(phone);
    }
    
    function validateDNI(dni) {
        const re = /^[0-9]{8}$/;
        return re.test(dni);
    }
    
    function validateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age >= 16;
    }
    
    function setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
    
    function scrollToFirstError() {
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db',
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
    // INICIALIZACIÓN FINAL
    // ===========================
    
    // Tracking de página
    trackEvent('visita_pagina_inscripcion');
    
    console.log('Sistema de inscripción inicializado correctamente');
});