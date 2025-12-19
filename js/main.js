/**
 * Main JavaScript - Studyia Premium
 * Optimisé pour les performances et l'UX
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les composants
    initLoader();
    initNavigation();
    initAnimations();
    initEmailJS(); // Initialisation d'EmailJS
    initFormValidation();
    initBackToTop();
    initCounters();
    updateCurrentYear();
    
    // Optimisations
    initLazyLoading();
    initSmoothScroll();
    initAnalytics();
});

/**
 * Loader d'initialisation
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    
    if (!loader) return;
    
    // Masquer le loader après le chargement
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            // Rendre le body scrollable
            document.body.style.overflow = 'visible';
            
            // Déclencher les animations d'entrée
            document.querySelectorAll('.fade-in').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }, 800);
    });
    
    // Empêcher le scroll pendant le chargement
    document.body.style.overflow = 'hidden';
}

/**
 * Gestion du Thème (Dark/Light Mode)
 */
function initTheme() {
    // 1. Détecter le thème système
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Déterminer le thème à appliquer
    let shouldBeDark = false;
    if (savedTheme) {
        shouldBeDark = savedTheme === 'dark';
    } else {
        shouldBeDark = systemPrefersDark;
    }

    // 3. Appliquer le thème
    if (shouldBeDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 4. Écouter les changements du thème système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Ne changer que si aucune préférence n'est sauvegardée
        if (!localStorage.getItem('theme')) {
            const systemDark = e.matches;
            if (systemDark) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}

/**
 * Navigation responsive
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    if (!menuToggle || !navMenu) return;
    
    // Toggle menu mobile
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
    });
    
    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight navigation active
        highlightActiveSection();
    });
    
    // Highlight section active
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/**
 * Animations au scroll
 */
function initAnimations() {
    // Observer pour les animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animation spécifique pour les cartes
                if (entry.target.classList.contains('service-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments avec animations
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
    
    // Hover effects
    document.querySelectorAll('.service-card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Validation du formulaire de contact
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            await submitForm(this);
        }
    });
    
    // Validation en temps réel
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target || e;
    const value = field.value.trim();
    const errorElement = field.parentNode.querySelector('.error-message') || createErrorElement(field);
    
    errorElement.textContent = '';
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        errorElement.textContent = 'Ce champ est obligatoire';
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorElement.textContent = 'Veuillez entrer une adresse email valide';
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

function createErrorElement(field) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: #8B0000;
        font-size: 0.85rem;
        margin-top: 0.5rem;
    `;
    field.parentNode.appendChild(errorElement);
    return errorElement;
}

function clearFieldError(e) {
    const field = e.target || e;
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Initialisation d'EmailJS
 */
function initEmailJS() {
    // Remplacez par votre Public Key d'EmailJS
    emailjs.init({ publicKey: 'sQwXq1rjlh-0xbKw9' });
}

async function submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // État de chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span>Envoi en cours...</span>
        <i class="fas fa-spinner fa-spin"></i>
    `;

    // --- Intégration EmailJS ---
    const serviceID = 'service_b4rwrtz'; // À remplacer
    const templateID = 'template_ft1e5ho'; // À remplacer

    try {
        await emailjs.sendForm(serviceID, templateID, form);

        // Succès
        submitBtn.innerHTML = `
            <span>Message envoyé !</span>
            <i class="fas fa-check"></i>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';

        // Réinitialiser le formulaire
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            showNotification('Votre message a été envoyé avec succès !', 'success');
        }, 3000);

    } catch (error) {
        console.error('Erreur EmailJS:', error);
        // Erreur
        submitBtn.innerHTML = `
            <span>Erreur d'envoi</span>
            <i class="fas fa-exclamation"></i>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            showNotification(`Une erreur est survenue: ${error.text || 'Veuillez réessayer.'}`, 'error');
        }, 5000);
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

/**
 * Compteurs animés
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Back to Top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scroll fluide pour les ancres
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Chargement différé
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Analytics et tracking
 */
function initAnalytics() {
    // Tracking des CTA
    document.querySelectorAll('.btn-primary, .btn-nav').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('cta_click', btn.textContent.trim());
        });
    });
    
    // Tracking des formulaires
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', () => {
            trackEvent('form_submission', 'contact_form');
        });
    }
    
    // Tracking du temps passé
    let pageStartTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
        trackEvent('time_spent', `${timeSpent}s`);
    });
}

function trackEvent(action, label) {
    // À remplacer par votre code analytics (GA4, etc.)
    console.log('Event tracked:', { action, label });
    
    // Exemple avec gtag
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_label': label
        });
    }
}

/**
 * Mise à jour de l'année dans le footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Gestion des erreurs
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('error', e.message);
});

/**
 * Optimisation de la performance
 */
if ('PerformanceObserver' in window) {
    // Mesure LCP
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                trackEvent('performance', `lcp_${Math.round(entry.startTime)}ms`);
            }
        });
    });
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
}