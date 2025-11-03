/* ==========================================
   PREMIUM JAVASCRIPT - ST. JOHNS PUBLIC SCHOOL
   OVERPOWERED INTERACTIONS!
   ========================================== */

// ==========================================
// INITIALIZE AOS
// ==========================================
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
});

// ==========================================
// PRELOADER - ENHANCED & BULLETPROOF
// ==========================================
(function() {
    'use strict';
    
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Immediately lock body scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Ensure preloader is visible
    preloader.style.display = 'flex';
    preloader.style.opacity = '1';
    preloader.style.visibility = 'visible';
    preloader.style.pointerEvents = 'all';
    preloader.classList.remove('hidden');
    
    let isLoaded = false;
    let minTimeElapsed = false;
    const minDisplayTime = 2000; // 2 seconds minimum
    const maxWaitTime = 5000; // 5 seconds max wait
    
    const startTime = Date.now();
    
    function hidePreloader() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            
            // Allow scroll after fade out
            setTimeout(() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                // Remove completely after animation
                setTimeout(() => {
                    if (preloader && preloader.classList.contains('hidden')) {
                        preloader.style.display = 'none';
                        preloader.remove();
                    }
                }, 1000);
            }, 100);
        }
    }
    
    function checkAndHide() {
        const elapsed = Date.now() - startTime;
        const ready = isLoaded && (elapsed >= minDisplayTime || elapsed >= maxWaitTime);
        
        if (ready && !preloader.classList.contains('hidden')) {
            hidePreloader();
            return true;
        }
        return false;
    }
    
    // Wait for page load
    if (document.readyState === 'complete') {
        isLoaded = true;
    } else {
        window.addEventListener('load', () => {
            isLoaded = true;
            if (!checkAndHide()) {
                setTimeout(checkAndHide, minDisplayTime);
            }
        }, { once: true });
    }
    
    // Ensure minimum display time
    setTimeout(() => {
        minTimeElapsed = true;
        if (isLoaded) checkAndHide();
    }, minDisplayTime);
    
    // Force hide after max wait (fallback)
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, maxWaitTime);
    
    // Also hide on DOMContentLoaded if everything is ready
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (document.readyState === 'complete' && Date.now() - startTime >= minDisplayTime) {
                isLoaded = true;
                checkAndHide();
            }
        }, minDisplayTime);
    }, { once: true });
})();

// ==========================================
// CUSTOM CURSOR (Desktop Only)
// ==========================================
if (window.innerWidth > 1024) {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursor() {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        outlineX += distX * 0.1;
        outlineY += distY * 0.1;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Scale cursor on hover
    const interactives = document.querySelectorAll('a, button, input, textarea');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ==========================================
// PROGRESS BAR
// ==========================================
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
    progressBar.style.width = scrollProgress + '%';
}

window.addEventListener('scroll', updateProgressBar, { passive: true });

// ==========================================
// NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Navbar scroll effect - Enhanced & Always Visible
if (navbar) {
    // Function to show navbar
    function showNavbar() {
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        navbar.style.transform = 'translateY(0)';
        navbar.style.pointerEvents = 'all';
        navbar.style.display = 'block';
    }
    
    // Check if preloader exists and hide accordingly
    const preloader = document.getElementById('preloader');
    
    // If preloader doesn't exist or is already hidden, show navbar immediately
    if (!preloader || preloader.classList.contains('hidden')) {
        showNavbar();
    } else {
        // Wait for preloader to hide
        setTimeout(showNavbar, 2100);
        
        // Also watch for preloader class changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (preloader.classList.contains('hidden')) {
                        setTimeout(showNavbar, 100);
                    }
                }
            });
        });
        
        observer.observe(preloader, { attributes: true });
    }
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Always show navbar (don't hide on scroll down)
        showNavbar();
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Ensure navbar is visible on load
    window.addEventListener('load', () => {
        setTimeout(showNavbar, 500);
    });
    
    // Fallback - show navbar after 3 seconds regardless
    setTimeout(showNavbar, 3000);
}

// Mobile menu toggle
let menuOpen = false;
mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    if (menuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Mobile dropdowns
const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.closest('.mobile-dropdown');
        dropdown.classList.toggle('active');
    });
});

// Close mobile menu on link click
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-dropdown-content a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        menuOpen = false;
        document.body.style.overflow = 'auto';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// HERO SWIPER SLIDER
// ==========================================
const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 1500,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stats => {
    statObserver.observe(stats);
});

// ==========================================
// FEATURE NAVIGATION
// ==========================================
const featureBtns = document.querySelectorAll('.feature-btn');
const featurePanels = document.querySelectorAll('.feature-panel');

featureBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Remove active class
        featureBtns.forEach(b => b.classList.remove('active'));
        featurePanels.forEach(p => p.classList.remove('active'));
        
        // Add active class
        btn.classList.add('active');
        const targetPanel = document.querySelector(`.feature-panel[data-panel="${index}"]`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// PARTICLE EFFECT
// ==========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(212, 175, 55, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// ==========================================
// PARALLAX EFFECT - ENHANCED
// ==========================================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax for blobs
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.1;
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ==========================================
// SMOOTH IMAGE REVEAL
// ==========================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.image-frame img, .feature-image-box img').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    imageObserver.observe(img);
});

// ==========================================
// TILT EFFECT ON CARDS (Desktop Only)
// ==========================================
if (window.innerWidth > 1024) {
    const tiltCards = document.querySelectorAll('.quick-card, .why-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// TYPING EFFECT (Optional)
// ==========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🎓 St. Johns Public School', 'color: #d4af37; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%c✨ Premium Website - Where Excellence Meets Innovation', 'color: #fbbf24; font-size: 14px; font-style: italic;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%c📞 Contact: 06324-273356, 7033872656', 'color: #999; font-size: 12px;');
console.log('%c📧 Email: sjps754wrs@gmail.com', 'color: #999; font-size: 12px;');
console.log('%c📍 Location: K. N. Market, Warisaliganj, Nawada', 'color: #999; font-size: 12px;');

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully!');
    
    // Refresh AOS
    setTimeout(() => {
        AOS.refresh();
    }, 500);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function
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

// Throttle scroll events
const throttledScroll = debounce(() => {
    updateProgressBar();
    updateActiveNav();
}, 10);

window.addEventListener('scroll', throttledScroll);
