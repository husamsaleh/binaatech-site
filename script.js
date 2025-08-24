
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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.binaatech-service-card, .binaatech-partner-logo, .binaatech-stat-item').forEach(el => {
    el.classList.add('binaatech-fade-in');
    observer.observe(el);
});

const platformItems = document.querySelectorAll('.binaatech-platform-item');
platformItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
        item.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

const partnerLogos = document.querySelectorAll('.binaatech-partner-logo');
partnerLogos.forEach(logo => {
    logo.addEventListener('click', () => {
        logo.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            logo.style.animation = '';
        }, 600);
    });
});

const serviceCards = document.querySelectorAll('.binaatech-service-card');
serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

const statNumbers = document.querySelectorAll('.binaatech-stat-number');
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.binaatech-stat-number');
            const text = number.textContent;
            let targetValue;
            
            if (text.includes('+')) {
                targetValue = parseInt(text.replace(/[^\d]/g, ''));
            } else if (text.includes('%')) {
                targetValue = parseInt(text.replace('%', ''));
            } else {
                targetValue = parseInt(text);
            }
            
            if (text.includes('M+')) {
                animateCounter(number, targetValue, 2000);
                setTimeout(() => {
                    number.textContent = targetValue + 'M+';
                }, 2000);
            } else if (text.includes('%')) {
                animateCounter(number, targetValue, 2000);
                setTimeout(() => {
                    number.textContent = targetValue + '%';
                }, 2000);
            } else if (text.includes('+')) {
                animateCounter(number, targetValue, 2000);
                setTimeout(() => {
                    number.textContent = targetValue + '+';
                }, 2000);
            } else {
                number.textContent = text;
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.binaatech-stat-item').forEach(item => {
    statObserver.observe(item);
});

const emailInput = document.querySelector('.binaatech-form-input');
const formBtn = document.querySelector('.binaatech-form-btn');

emailInput.addEventListener('input', (e) => {
    const email = e.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (isValid) {
        emailInput.style.borderColor = '#28a745';
        formBtn.style.opacity = '1';
        formBtn.disabled = false;
    } else {
        emailInput.style.borderColor = '#dc3545';
        formBtn.style.opacity = '0.7';
        formBtn.disabled = true;
    }
});

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formBtn.textContent = 'Processing...';
        formBtn.disabled = true;
        
        setTimeout(() => {
            formBtn.textContent = 'Success! ✓';
            formBtn.style.background = '#28a745';
            
            setTimeout(() => {
                formBtn.textContent = 'Get Started Free';
                formBtn.style.background = 'linear-gradient(135deg, #123662 0%, #2A4A7A 100%)';
                formBtn.disabled = false;
                emailInput.value = '';
            }, 2000);
        }, 1500);
    }
});



const contactItems = document.querySelectorAll('.binaatech-contact-item');
contactItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.textContent.trim();
        
        if (text.includes('@')) {
            window.location.href = `mailto:${text}`;
        } else if (text.includes('+')) {
            window.location.href = `tel:${text.replace(/\s/g, '')}`;
        } else if (text.includes('Schedule')) {
            window.open('https://calendly.com', '_blank');
        }
    });
});

const buttons = document.querySelectorAll('.binaatech-btn');
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
        ripple.classList.add('binaatech-ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


const rippleStyles = `
    .binaatech-btn {
        position: relative;
        overflow: hidden;
    }
    
    .binaatech-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: binaatech-rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes binaatech-rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);


const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #123662 0%, #2A4A7A 100%);
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});




const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    const hoverElements = document.querySelectorAll('.binaatech-platform-item, .binaatech-service-card, .binaatech-partner-logo, .binaatech-stat-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('mobile-touched');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('mobile-touched');
            }, 150);
        }, { passive: true });
    });
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    const parallaxElements = document.querySelectorAll('.binaatech-floating-shapes .binaatech-shape');
                    parallaxElements.forEach((element, index) => {
                        const speed = 0.3 + (index * 0.05);
                        element.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
} else {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.binaatech-floating-shapes .binaatech-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}


