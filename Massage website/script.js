// ===== SMOOTH SCROLLING & ACTIVE NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== SCROLL ANIMATION TRIGGER =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .info-item');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        const triggerAnimation = () => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.transition = 'all 0.6s ease';
                }, index * 100);
            }
        };
        
        window.addEventListener('scroll', triggerAnimation);
        triggerAnimation();
    });
};

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
        
        // Clear form
        contactForm.reset();
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #d4a574, #8b7355)';
        }, 3000);
        
        console.log('Form submitted:', { name, email, message });
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===== COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        navbar.style.padding = '0.5rem 20px';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '1rem 20px';
    }
    
    lastScrollTop = scrollTop;
});

// ===== SERVICE CARD HOVER ANIMATION =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.cta-button, .submit-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        this.appendChild(ripple);
    });
});

// ===== LIGHT BOX EFFECT ON ICONS =====
const icons = document.querySelectorAll('.service-icon');
icons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #d4a574, #8b7355);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    animateOnScroll();
});

// ===== INTERSECTION OBSERVER FOR SERVICE CARDS =====
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `scaleIn 0.6s ease forwards`;
            entry.target.style.animationDelay = `${index * 0.1}s`;
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
    serviceObserver.observe(card);
});

// ===== TESTIMONIAL CARD ANIMATION =====
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
            entry.target.style.animationDelay = `${index * 0.2}s`;
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    testimonialObserver.observe(card);
});

// ===== DYNAMIC TEXT ANIMATION =====
const animateText = (element, text, speed = 100) => {
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, speed);
};

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    const loaders = document.querySelectorAll('.loader');
    loaders.forEach(loader => {
        loader.style.display = 'none';
    });
});

// ===== MOBILE MENU CLOSE ON LINK CLICK =====
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ===== CUSTOM MOUSE EFFECT =====
const createMouseEffect = () => {
    const mouseTrail = document.createElement('div');
    mouseTrail.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(212, 165, 116, 0.6);
        border-radius: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        z-index: 9999;
    `;
    document.body.appendChild(mouseTrail);
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.style.left = e.clientX + 'px';
        mouseTrail.style.top = e.clientY + 'px';
        mouseTrail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        mouseTrail.style.opacity = '0';
    });
};

createMouseEffect();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Massage website loaded successfully!');
});
