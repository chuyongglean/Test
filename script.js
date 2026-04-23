// Landing Page JavaScript
class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupCounters();
        this.setupFormHandlers();
        this.setupScrollEffects();
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.feature-item, .testimonial').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    setupCounters() {
        // Animate statistics numbers
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isMillions = target.includes('M');
            const numericValue = parseFloat(target.replace(/[^d.]/g, ''));
            
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                if (isMillions) {
                    counter.textContent = current.toFixed(1) + 'M+';
                } else if (isPercentage) {
                    counter.textContent = current.toFixed(1) + '%';
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    setupFormHandlers() {
        // CTA button handlers
        const ctaButtons = document.querySelectorAll('.btn-primary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.textContent.includes('Trial')) {
                    this.showSignupModal();
                } else if (button.textContent.includes('Demo')) {
                    this.playDemo();
                }
            });
        });

        // Add ripple effect to buttons
        this.addRippleEffect();
    }

    setupScrollEffects() {
        // Parallax effect for hero particles
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelector('.hero-particles');
            if (particles) {
                particles.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);
    }

    addRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    showSignupModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Start Your Free Trial</h3>
                <form class="signup-form">
                    <input type="text" placeholder="Full Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit" class="btn-primary btn-full">Start Free Trial</button>
                </form>
                <button class="modal-close">&times;</button>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        // Form submission
        modal.querySelector('.signup-form').onsubmit = (e) => {
            e.preventDefault();
            this.showNotification('Welcome aboard! Check your email to get started.');
            modal.remove();
        };
    }

    playDemo() {
        this.showNotification('Demo video starting...');
        // Here you would typically open a video modal or navigate to demo page
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1B4332, #2D6A4F);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 400px;
        width: 90%;
        position: relative;
        animation: slideUp 0.3s ease;
    }
    
    .modal-content h3 {
        margin-bottom: 1.5rem;
        text-align: center;
        color: var(--text-primary);
    }
    
    .signup-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .signup-form input {
        padding: 1rem;
        border: 2px solid var(--gray-100);
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .signup-form input:focus {
        outline: none;
        border-color: var(--primary);
    }
    
    .btn-full {
        width: 100%;
        justify-content: center;
    }
    
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(modalStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LandingPage();
});

console.log('Landing Page initialized successfully!');