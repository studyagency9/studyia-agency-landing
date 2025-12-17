/**
 * Animations premium pour Studyia
 * Effets visuels élégants et performants
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les animations
    initFloatingElements();
    initScrollAnimations();
    initParallaxEffect();
    initHoverEffects();
    
    // Animation de l'œil Studyia
    initEyeAnimation();
});

/**
 * Animation des éléments flottants
 */
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((el, index) => {
        // Animation aléatoire pour chaque élément
        const duration = 6 + Math.random() * 4;
        const delay = index * 0.5;
        
        el.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        // Ajouter une rotation subtile
        el.addEventListener('mouseenter', () => {
            el.style.transform += ' rotate(15deg) scale(1.1)';
            el.style.transition = 'transform 0.3s ease';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = el.style.transform.replace(' rotate(15deg) scale(1.1)', '');
        });
    });
}

/**
 * Animations au scroll
 */
function initScrollAnimations() {
    // Animation des sections
    const sections = document.querySelectorAll('section, header');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animation spécifique pour chaque section
                if (entry.target.id === 'services') {
                    animateServiceCards();
                }
                
                if (entry.target.id === 'projets') {
                    animateProjectCards();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Animation des cartes services
 */
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

/**
 * Animation des cartes projets
 */
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100);
    });
}

/**
 * Effet parallaxe léger
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

/**
 * Effets de survol avancés
 */
function initHoverEffects() {
    // Effet sur les cartes de services
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#FFFFFF';
                
                const iconBg = this.querySelector('.icon-bg');
                if (iconBg) {
                    iconBg.style.background = 'linear-gradient(135deg, #D4AF37 0%, #8B0000 100%)';
                }
            }
            
            // Effet de brillance
            this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.color = '#D4AF37';
                
                const iconBg = this.querySelector('.icon-bg');
                if (iconBg) {
                    iconBg.style.background = '';
                }
            }
            
            this.style.boxShadow = '';
        });
    });
    
    // Effet sur les liens
    const links = document.querySelectorAll('a:not(.btn):not(.social-link)');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Effet sur les boutons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 12px 40px rgba(212, 175, 55, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Animation de l'œil Studyia
 */
function initEyeAnimation() {
    const eyeIcon = document.querySelector('.logo-icon i.fa-eye');
    
    if (!eyeIcon) return;
    
    // Animation de clignement
    function blink() {
        eyeIcon.style.animation = 'blink 0.3s ease';
        
        setTimeout(() => {
            eyeIcon.style.animation = '';
            setTimeout(blink, 3000 + Math.random() * 4000);
        }, 300);
    }
    
    // Démarrer après le chargement
    setTimeout(blink, 2000);
    
    // Suivi de la souris sur le logo
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            eyeIcon.style.transform = 'scale(1.2)';
            eyeIcon.style.color = '#8B0000';
        });
        
        logo.addEventListener('mouseleave', () => {
            eyeIcon.style.transform = 'scale(1)';
            eyeIcon.style.color = '';
        });
    }
}

/**
 * Effet de particules légères pour le hero
 */
function initParticles() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Créer quelques particules pour l'effet premium
    for (let i = 0; i < 15; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--color-secondary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.3;
    `;
    
    // Position aléatoire
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    // Animation
    const duration = 3 + Math.random() * 4;
    particle.style.animation = `
        float ${duration}s infinite ease-in-out,
        pulse ${duration}s infinite ease-in-out
    `;
    
    container.appendChild(particle);
}

/**
 * Gestion des transitions de page
 */
function initPageTransitions() {
    // Ajouter une classe pour les transitions
    document.documentElement.classList.add('transitions-enabled');
    
    // Smooth transition pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                document.documentElement.style.opacity = '0.7';
                document.documentElement.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Initialiser après le chargement complet
window.addEventListener('load', function() {
    // Ajouter des classes pour les animations
    document.documentElement.classList.add('loaded');
    
    // Démarrer les particules
    initParticles();
    
    // Initialiser les transitions (désactivé pour corriger le bug de contraste)
    // initPageTransitions();
});

// Styles d'animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.1); }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animated {
        animation-play-state: running !important;
    }
    
    .in-view {
        animation: fadeInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(style);