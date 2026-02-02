// Funcionalidad específica para la página de contacto

document.addEventListener('DOMContentLoaded', function() {
    // Manejo del formulario de contacto

    // === 1. MENÚ DE HAMBURGUESA (CORRECCIÓN) ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Activa/Desactiva el menú
            navMenu.classList.toggle('active');
            
            // Cambia el icono de barras (☰) a una X cuando esté abierto
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar el menú automáticamente al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
            if (!nombre || !email || !asunto || !mensaje) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simulación de envío
            showNotification('Mensaje enviado exitosamente. Te contactaremos pronto.', 'success');
            
            // Resetear formulario
            contactForm.reset();
        });
    }
    
    // Funcionalidad para FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // Alternar clase active
                question.classList.toggle('active');
                
                // Obtener la respuesta
                const answer = question.nextElementSibling;
                
                // Alternar visibilidad
                if (question.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.classList.add('active');
                } else {
                    answer.style.maxHeight = null;
                    answer.classList.remove('active');
                }
                
                // Cambiar icono
                const icon = question.querySelector('i');
                if (question.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
            
            // Inicializar todas las respuestas como cerradas
            const answer = question.nextElementSibling;
            answer.style.maxHeight = null;
        });
    }
    
    // Agregar funcionalidad de clic a las tarjetas de contacto
    const contactCards = document.querySelectorAll('.contact-info-card');
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Información copiada al portapapeles', 'success');
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
        
        // Agregar cursor pointer
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Función para hacer llamadas desde botones
    const callButtons = document.querySelectorAll('[href^="tel:"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('¿Deseas realizar la llamada?')) {
                e.preventDefault();
            }
        });
    });

    // Funcionalidad para Tabs (Pestañas) - Agregado para la sección de ofrendas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Remover clase active de todos los contenidos
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Agregar clase active al botón clickeado
                btn.classList.add('active');
                
                // Obtener el id del tab a mostrar
                const tabId = btn.getAttribute('data-tab');
                
                // Mostrar el contenido correspondiente
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Verificar si ya existe una notificación
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    const bgColor = type === 'success' ? '#20c997' : 
                    type === 'error' ? '#dc3545' : 
                    '#4a6cf7';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}