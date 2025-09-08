// =========================== 
// JAVASCRIPT ESPECÍFICO - PÁGINA CONTACTO
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================== 
    // ELEMENTOS DEL DOM
    // ===========================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const forms = document.querySelectorAll('.contacto-form');
    const checkboxGroups = document.querySelectorAll('.checkbox-group-multiple');
    
    // =========================== 
    // SISTEMA DE TABS
    // ===========================
    
    function initializeTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Actualizar botones
                tabButtons.forEach(btn => btn.classList.remove('activo'));
                this.classList.add('activo');
                
                // Actualizar paneles
                tabPanels.forEach(panel => {
                    panel.classList.remove('activo');
                    if (panel.id === `tab-${targetTab}`) {
                        panel.classList.add('activo');
                    }
                });
                
                // Limpiar formulario activo
                const activeForm = document.querySelector(`#tab-${targetTab} form`);
                if (activeForm) {
                    resetForm(activeForm);
                }
                
                // Analytics
                trackEvent('cambio_tab', { tab: targetTab });
            });
        });
    }
    
    // =========================== 
    // VALIDACIÓN DE FORMULARIOS
    // ===========================
    
    function initializeFormValidation() {
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
            
            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearFieldError(input));
            });
            
            // Contador de caracteres para textareas
            const textareas = form.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                const maxLength = 500;
                const counter = textarea.parentNode.querySelector('.char-count');
                
                if (counter) {
                    textarea.addEventListener('input', function() {
                        const currentLength = this.value.length;
                        counter.textContent = `${currentLength}/${maxLength}`;
                        
                        if (currentLength > maxLength * 0.9) {
                            counter.style.color = '#e74c3c';
                        } else {
                            counter.style.color = 'var(--text-muted)';
                        }
                    });
                }
            });
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
        if (field.hasAttribute('required') && !fieldValue) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
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
                    if (fieldName === 'celular' || fieldName === 'celular-insc') {
                        if (!validate CellPhone(fieldValue)) {
                            isValid = false;
                            errorMessage = 'Ingrese un celular válido (9 dígitos)';
                        }
                    }
                    break;
                    
                case 'text':
                    if (fieldName === 'dni') {
                        if (!validateDNI(fieldValue)) {
                            isValid = false;
                            errorMessage = 'DNI debe tener 8 dígitos';
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
    // MANEJO DE ENVÍO DE FORMULARIOS
    // ===========================
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formId = form.id;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Validar todos los campos
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        // Validar checkboxes requeridos
        const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
        requiredCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                isFormValid = false;
                const fieldGroup = checkbox.closest('.form-group');
                setFieldError(fieldGroup, 'Debe aceptar los términos y condiciones');
            }
        });
        
        // Validar grupos de checkboxes (al menos uno seleccionado)
        const checkboxGroups = form.querySelectorAll('.checkbox-group-multiple');
        checkboxGroups.forEach(group => {
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
            
            if (checkboxes.length > 0 && checkedBoxes.length === 0) {
                isFormValid = false;
                const fieldGroup = group.closest('.form-group');
                setFieldError(fieldGroup, 'Seleccione al menos una opción');
            }
        });
        
        if (!isFormValid) {
            showNotification('Por favor, corrija los errores en el formulario', 'error');
            return;
        }
        
        // Mostrar estado de carga
        setButtonLoading(submitButton, true);
        
        try {
            // Recopilar datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Manejar checkboxes múltiples
            const multiCheckboxes = form.querySelectorAll('input[type="checkbox"][name$="[]"]');
            multiCheckboxes.forEach(checkbox => {
                const name = checkbox.name.replace('[]', '');
                if (!data[name]) data[name] = [];
                if (checkbox.checked) {
                    if (Array.isArray(data[name])) {
                        data[name].push(checkbox.value);
                    } else {
                        data[name] = [data[name], checkbox.value];
                    }
                }
            });
            
            // Simular envío (aquí se conectaría con el backend)
            await simulateFormSubmission(data, formId);
            
            // Éxito
            showNotification('Formulario enviado correctamente. Nos comunicaremos contigo pronto.', 'success');
            resetForm(form);
            
            // Analytics
            trackEvent('formulario_enviado', { tipo: formId });
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showNotification('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            setButtonLoading(submitButton, false);
        }
    }
    
    async function simulateFormSubmission(data, formType) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular posible error (5% de probabilidad)
        if (Math.random() < 0.05) {
            throw new Error('Error simulado de red');
        }
        
        // Guardar en localStorage para demostración
        const submissions = JSON.parse(localStorage.getItem('form-submissions') || '[]');
        submissions.push({
            id: Date.now(),
            type: formType,
            data: data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('form-submissions', JSON.stringify(submissions));
        
        console.log('Formulario enviado:', { type: formType, data });
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
        return re.test(phone.replace(/\s/g, ''));
    }
    
    function validateDNI(dni) {
        const re = /^[0-9]{8}$/;
        return re.test(dni);
    }
    
    function validateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
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
    
    function resetForm(form) {
        form.reset();
        
        // Limpiar estados de validación
        const fieldGroups = form.querySelectorAll('.form-group');
        fieldGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
        
        // Resetear contadores de caracteres
        const counters = form.querySelectorAll('.char-count');
        counters.forEach(counter => {
            counter.textContent = '0/500';
            counter.style.color = 'var(--text-muted)';
        });
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
    
    // =========================== 
    // FUNCIONES ADICIONALES
    // ===========================
    
    function initializeFormEnhancements() {
        // Auto-completar campos relacionados
        const dniInputs = document.querySelectorAll('input[name="dni"]');
        dniInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Simular consulta RENIEC (solo formato)
                if (this.value.length === 8) {
                    // Aquí se podría integrar con API de RENIEC
                    console.log('DNI completo:', this.value);
                }
            });
        });
        
        // Formateo automático de teléfonos
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 9) value = value.slice(0, 9);
                this.value = value;
            });
        });
        
        // Prevenir envío múltiple
        forms.forEach(form => {
            let isSubmitting = false;
            form.addEventListener('submit', function(e) {
                if (isSubmitting) {
                    e.preventDefault();
                    return false;
                }
                isSubmitting = true;
                
                setTimeout(() => {
                    isSubmitting = false;
                }, 3000);
            });
        });
    }
    
    // =========================== 
    // INICIALIZACIÓN
    // ===========================
    
    initializeTabs();
    initializeFormValidation();
    initializeFormEnhancements();
    
    // Tracking de página
    trackEvent('visita_pagina_contacto');
    
    console.log('Sistema de contacto inicializado correctamente');
});