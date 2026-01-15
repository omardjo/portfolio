class CustomNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['scrolled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'scrolled') {
            this.updateStyles();
        }
    }

    updateStyles() {
        const scrolled = this.getAttribute('scrolled') === 'true';
        const nav = this.shadowRoot.querySelector('nav');
        if (scrolled) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    render() {
        // Determine current page to fix links
        const path = window.location.pathname;
        const isHome = path.endsWith('index.html') || path === '/' || path.endsWith('/');
        
        // Helper to format links
        const getLink = (hash) => isHome ? hash : `index.html${hash}`;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                }
                nav {
                    transition: all 0.3s ease;
                    padding: 1rem 0;
                }
                nav.scrolled {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.5rem 0;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: bold;
                    font-size: 1.5rem;
                    text-decoration: none;
                    color: white;
                }
                .logo:hover { color: #6366f1; }
                .logo-icon { color: #6366f1; }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                .nav-link {
                    color: #cbd5e1;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }
                .nav-link:hover { color: white; }
                .nav-link.active { color: #6366f1; }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(to right, #6366f1, #8b5cf6);
                    border-radius: 1px;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(15, 23, 42, 0.98);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    flex-direction: column;
                    gap: 1rem;
                }
                .mobile-menu.active { display: flex; }
                .mobile-nav-link {
                    color: #cbd5e1;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }
                .mobile-nav-link:hover {
                    background: rgba(99, 102, 241, 0.1);
                    color: white;
                }
                
                @media (max-width: 768px) {
                    .nav-links { display: none; }
                    .mobile-menu-btn { display: block; }
                }
            </style>
            
            <nav>
                <div class="container">
                    <div class="nav-content">
                        <a href="index.html" class="logo">
                            <i data-feather="code" class="logo-icon"></i>
                            <span>Portfolio</span>
                        </a>
                        
                        <div class="nav-links">
                            <a href="${getLink('#about')}" class="nav-link">About</a>
                            <a href="projects.html" class="nav-link">Projects</a>
                            <a href="${getLink('#experience')}" class="nav-link">Experience</a>
                            <a href="${getLink('#certifications')}" class="nav-link">Certificates</a>
                            <a href="${getLink('#contact')}" class="nav-link">Contact</a>
                        </div>
                        
                        <button class="mobile-menu-btn">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                    
                    <div class="mobile-menu">
                        <a href="${getLink('#about')}" class="mobile-nav-link">About</a>
                        <a href="projects.html" class="mobile-nav-link">Projects</a>
                        <a href="${getLink('#experience')}" class="mobile-nav-link">Experience</a>
                        <a href="${getLink('#certifications')}" class="mobile-nav-link">Certificates</a>
                        <a href="${getLink('#contact')}" class="mobile-nav-link">Contact</a>
                    </div>
                </div>
            </nav>
        `;
        
        setTimeout(() => {
            if (window.feather) window.feather.replace();
        }, 100);
    }

    setupEventListeners() {
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        const mobileLinks = this.shadowRoot.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);