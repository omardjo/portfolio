class CustomFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const currentYear = new Date().getFullYear();
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                footer {
                    background: rgba(15, 23, 42, 0.8);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    position: relative;
                    z-index: 10;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 3rem 1rem;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                
                .footer-section h3 {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    color: white;
                }
                
                .footer-section p {
                    color: #cbd5e1;
                    line-height: 1.6;
                }
                
                .quick-links {
                    list-style: none;
                    padding: 0;
                }
                
                .quick-links li {
                    margin-bottom: 0.75rem;
                }
                
                .quick-links a {
                    color: #cbd5e1;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .quick-links a:hover {
                    color: #6366f1;
                    padding-left: 5px;
                }
                
                .contact-info {
                    list-style: none;
                    padding: 0;
                }
                
                .contact-info li {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    color: #cbd5e1;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                
                .social-link:hover {
                    background: #6366f1;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
                }
                
                /* SVG Icon Styles inside Shadow DOM */
                .feather {
                    width: 24px;
                    height: 24px;
                    stroke: currentColor;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    fill: none;
                }
                
                .social-link .feather {
                    width: 20px;
                    height: 20px;
                }

                .footer-bottom {
                    text-align: center;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                    font-size: 0.875rem;
                }
                
                .heart {
                    color: #ef4444;
                    display: inline-block;
                    animation: heartbeat 1.5s ease-in-out infinite;
                }
                
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            </style>
            
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>Omar Djebbi</h3>
                            <p>
                                Mobile developer specialized in Flutter and Node.js, 
                                creating exceptional digital experiences with focus on 
                                performance and user satisfaction.
                            </p>
                            <div class="social-links">
                                <a href="https://linkedin.com/in/djebbi-omar" target="_blank" class="social-link" title="LinkedIn">
                                    <i data-feather="linkedin"></i>
                                </a>
                                <a href="https://github.com/omardjo" target="_blank" class="social-link" title="GitHub">
                                    <i data-feather="github"></i>
                                </a>
                                <a href="https://x.com/OmarDjebbi5" target="_blank" class="social-link" title="X (Twitter)">
                                    <i data-feather="twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/nagging_boi/" target="_blank" class="social-link" title="Instagram">
                                    <i data-feather="instagram"></i>
                                </a>
                                <a href="mailto:omar.djebbi@tijari.biz" class="social-link" title="Email">
                                    <i data-feather="mail"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <ul class="quick-links">
                                <li>
                                    <a href="index.html#about">
                                        <i data-feather="chevron-right"></i>
                                        About Me
                                    </a>
                                </li>
                                <li>
                                    <a href="projects.html">
                                        <i data-feather="chevron-right"></i>
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="experience.html">
                                        <i data-feather="chevron-right"></i>
                                        Experience
                                    </a>
                                </li>
                                <li>
                                    <a href="index.html#contact">
                                        <i data-feather="chevron-right"></i>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Contact Info</h3>
                            <ul class="contact-info">
                                <li>
                                    <i data-feather="mail"></i>
                                    omar.djebbi@tijari.biz
                                </li>
                                <li>
                                    <i data-feather="phone"></i>
                                    +216 53 115 231
                                </li>
                                <li>
                                    <i data-feather="map-pin"></i>
                                    El-Hrairia, Tunis, Tunisia
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>
                            © ${currentYear} Omar Djebbi. All rights reserved.
                            <br>
                            Made with <span class="heart">❤️</span> using HTML, CSS, JavaScript, Node.js, and passion.
                        </p>
                    </div>
                </div>
            </footer>
        `;
        
        // Replace feather icons manually inside Shadow DOM
        this.replaceIcons();
    }

    replaceIcons() {
        // Wait for feather to load globally
        if (window.feather) {
            const icons = this.shadowRoot.querySelectorAll('i[data-feather]');
            icons.forEach(icon => {
                const iconName = icon.getAttribute('data-feather');
                if (window.feather.icons[iconName]) {
                    // Convert the feather icon to an SVG string
                    const svg = window.feather.icons[iconName].toSvg({
                        class: icon.getAttribute('class') || 'feather',
                        width: icon.getAttribute('width') || 24,
                        height: icon.getAttribute('height') || 24
                    });
                    // Replace the <i> tag with the SVG
                    icon.outerHTML = svg;
                }
            });
        } else {
            // Retry if feather hasn't loaded yet
            setTimeout(() => this.replaceIcons(), 100);
        }
    }
}

customElements.define('custom-footer', CustomFooter);