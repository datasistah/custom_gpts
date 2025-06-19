// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe cards and sections
    document.querySelectorAll('.gpt-card, .practice-card, .step, .service').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Form handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple form validation
        const requiredFields = ['name', 'email', 'subject'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!formObject[field] || formObject[field].trim() === '') {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#d1d5db';
            }
        });
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = this.querySelector('[name="email"]');
        if (!emailRegex.test(formObject.email)) {
            emailInput.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            // Add loading state for form submission
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add hover effects to resource links
document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('This resource will be available soon!', 'info');
    });
});

// Copy prompt functionality
function copyPrompt() {
    const promptText = document.querySelector('.prompt-text').textContent;
    navigator.clipboard.writeText(promptText).then(() => {
        showNotification('Meta-prompt copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy prompt', 'error');
    });
}

// Add interactive animations to stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const text = stat.textContent;
        if (text === '$0') {
            stat.style.animation = 'price-flash 2s ease-in-out infinite';
        } else if (text === '100%') {
            stat.style.animation = 'percentage-grow 2s ease-in-out infinite';
        } else if (text === '∞') {
            stat.style.animation = 'infinity-rotate 3s linear infinite';
        }
    });
}

// Add hover effects to neural nodes
function initializeNeuralNetwork() {
    const nodes = document.querySelectorAll('.neural-node');
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
            nodes.forEach(n => n.style.animationPlayState = 'paused');
            node.style.transform = 'scale(1.5)';
            node.style.boxShadow = `0 0 30px var(--primary-accent)`;
        });
        
        node.addEventListener('mouseleave', () => {
            nodes.forEach(n => n.style.animationPlayState = 'running');
            node.style.transform = 'scale(1)';
            node.style.boxShadow = `0 0 20px var(--primary-accent)`;
        });
    });
}

// Add interactive card effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.gpt-card, .revelation-card, .technique-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add typing effect to hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Add cursor blink effect
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                heroTitle.appendChild(cursor);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Add price comparison animation
function initializePriceComparison() {
    const priceItems = document.querySelectorAll('.price-item');
    priceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('expensive')) {
                item.style.transform = 'scale(1.1) rotate(-2deg)';
            } else {
                item.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    observeElements();
    addSearchFunctionality();
    
    // Add loading animation to the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize new features
    animateStats();
    initializeNeuralNetwork();
    initializeCardEffects();
    initializePriceComparison();
    
    // Add typing effect after a delay
    setTimeout(initializeTypingEffect, 1000);
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes price-flash {
        0%, 100% { color: var(--success-color); }
        50% { color: var(--primary-accent); }
    }
    
    @keyframes percentage-grow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes infinity-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .hero-badge {
        animation: badge-pulse 3s ease-in-out infinite;
    }
    
    @keyframes badge-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;

document.head.appendChild(style);
