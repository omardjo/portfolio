// Main JavaScript for Omar's Portfolio

// Initialize EmailJS immediately
(function(){
    // Initialize EmailJS with your Public Key
    if(typeof emailjs !== 'undefined') {
        emailjs.init("ArSp_jvOyAPn-eywl");
    } else {
        console.error("EmailJS SDK not loaded");
    }
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize theme
    initTheme();

    // Initialize Contact Form
    initContactForm();
});

// --- EMAILJS CONTACT FORM LOGIC ---
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get button and save original state
            const btn = this.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            // Set loading state
            btn.innerHTML = 'Sending... <i data-feather="loader" class="animate-spin inline ml-2"></i>';
            if(window.feather) feather.replace();
            btn.disabled = true;

            // Get form values
            const nameInput = document.getElementById('name') || document.getElementById('contactName');
            const emailInput = document.getElementById('email') || document.getElementById('contactEmail');
            const messageInput = document.getElementById('message') || document.getElementById('contactMessage');

            // Prepare parameters matching your EmailJS template
            const templateParams = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                title: "Portfolio Inquiry", // Default context
                date: new Date().toLocaleDateString()
            };

            const SERVICE_ID = "service_eagsj3e";
            const TEMPLATE_ADMIN_ID = "template_admin";
            const TEMPLATE_AUTOREPLY_ID = "template_autoreply";

            // 1. Send Notification to YOU (Admin)
            emailjs.send(SERVICE_ID, TEMPLATE_ADMIN_ID, templateParams)
                .then(function() {
                    // 2. If successful, send Auto-Reply to USER
                    return emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY_ID, templateParams);
                })
                .then(function() {
                    // Success handling
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Error handling
                    console.error('FAILED...', error);
                    alert('Failed to send message. Please try again later or contact me directly at omar.djebbi@tijari.biz');
                })
                .finally(function() {
                    // Reset button state
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    if(window.feather) feather.replace();
                });
        });
    }
}

// Initialize animations using Intersection Observer
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and specific elements
    document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('custom-navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow/background to navbar on scroll
        if (currentScroll > 50) {
            navbar?.setAttribute('scrolled', 'true');
        } else {
            navbar?.setAttribute('scrolled', 'false');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // This assumes your custom-navbar has logic to highlight links, 
            // or you are accessing the shadow DOM of the navbar if it's open.
            // Since it's a web component, we usually handle state inside it,
            // but we can trigger attributes.
        }
    });
}

// Initialize tooltips (Simple implementation)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white text-xs px-2 py-1 rounded z-50 -mt-8 whitespace-nowrap';
            tooltip.textContent = tooltipText;
            e.target.parentNode.appendChild(tooltip);
            e.target.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', (e) => {
            if (e.target.tooltipElement) {
                e.target.tooltipElement.remove();
                e.target.tooltipElement = null;
            }
        });
    });
}

// Initialize theme (Force dark mode for space theme)
function initTheme() {
    document.documentElement.classList.add('dark');
}

// Export functions if needed globally
window.PortfolioUtils = {
    initContactForm,
    initAnimations
};