class CustomChatbot extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' }); // Use Shadow DOM
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Chatbot CSS enclosed within the component */
                :host {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 9999;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .chatbot-toggle {
                    width: 60px;
                    height: 60px;
                    background: #6366f1;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    border: none;
                    color: white;
                    transition: transform 0.3s ease, background 0.3s;
                }
                
                .chatbot-toggle:hover {
                    transform: scale(1.1);
                    background: #8b5cf6;
                }

                .chatbot-container {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: #0f172a;
                    border-radius: 16px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s, transform 0.3s;
                }

                .chatbot-container.active {
                    display: flex;
                    opacity: 1;
                    transform: translateY(0);
                }

                .chatbot-header {
                    background: #6366f1;
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chatbot-header h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0;
                }

                .chatbot-close {
                    background: transparent;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 5px;
                }

                .chatbot-messages {
                    flex: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    background: #1e293b;
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }

                .message {
                    display: flex;
                    max-width: 85%;
                }

                .message.user {
                    align-self: flex-end;
                    justify-content: flex-end;
                }

                .message-content {
                    padding: 0.6rem 1rem;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                .message.bot .message-content {
                    background: #334155;
                    color: #f8fafc;
                    border-radius: 12px 12px 12px 0;
                }

                .message.user .message-content {
                    background: #6366f1;
                    color: white;
                    border-radius: 12px 12px 0 12px;
                }

                .chatbot-input-area {
                    padding: 0.8rem;
                    background: #0f172a;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    gap: 0.5rem;
                }

                .chatbot-input {
                    flex: 1;
                    padding: 0.6rem;
                    background: #1e293b;
                    border: 1px solid #334155;
                    border-radius: 20px;
                    color: white;
                    outline: none;
                    font-size: 0.9rem;
                }

                .chatbot-send {
                    background: #6366f1;
                    color: white;
                    border: none;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* SVG Styles */
                svg {
                    width: 24px;
                    height: 24px;
                    stroke: currentColor;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    fill: none;
                }
            </style>

            <button class="chatbot-toggle" id="chatbotToggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </button>
            
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <h3>Omar's AI Assistant</h3>
                    <button class="chatbot-close" id="chatbotClose">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="message bot">
                        <div class="message-content">Hello! Ask me about Omar's CV, skills, or projects.</div>
                    </div>
                </div>
                <div class="chatbot-input-area">
                    <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask a question...">
                    <button class="chatbot-send" id="chatbotSend">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const toggle = this.shadowRoot.querySelector('#chatbotToggle');
        const container = this.shadowRoot.querySelector('#chatbotContainer');
        const close = this.shadowRoot.querySelector('#chatbotClose');
        const send = this.shadowRoot.querySelector('#chatbotSend');
        const input = this.shadowRoot.querySelector('#chatbotInput');
        const messages = this.shadowRoot.querySelector('#chatbotMessages');

        const BACKEND_URL = 'https://omar-portfolio-backend.onrender.com';

        toggle.addEventListener('click', () => {
            container.classList.add('active');
            toggle.style.opacity = '0'; // Hide button visually but keep layout
            toggle.style.pointerEvents = 'none';
        });

        close.addEventListener('click', () => {
            container.classList.remove('active');
            toggle.style.opacity = '1';
            toggle.style.pointerEvents = 'all';
        });

        const sendMessage = async () => {
            const txt = input.value.trim();
            if(!txt) return;

            // User Message
            appendMsg(txt, 'user');
            input.value = '';
            input.disabled = true;

            // Loading Indicator
            const loadingId = 'loading-' + Date.now();
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot';
            loadingDiv.id = loadingId;
            loadingDiv.innerHTML = `<div class="message-content">Thinking...</div>`;
            messages.appendChild(loadingDiv);
            messages.scrollTop = messages.scrollHeight;

            try {
                const response = await fetch(`${BACKEND_URL}/api/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: txt })
                });

                const data = await response.json();
                
                // Remove loading
                const loadingEl = messages.querySelector(`#${loadingId}`);
                if(loadingEl) loadingEl.remove();

                if (data.message) {
                    appendMsg(data.message, 'bot');
                } else {
                    appendMsg("I'm currently offline, but you can email Omar directly!", 'bot');
                }
            } catch (error) {
                console.error(error);
                const loadingEl = messages.querySelector(`#${loadingId}`);
                if(loadingEl) loadingEl.remove();
                appendMsg("Connection error. Please try again later.", 'bot');
            } finally {
                input.disabled = false;
                input.focus();
            }
        };

        const appendMsg = (txt, type) => {
            const d = document.createElement('div');
            d.className = `message ${type}`;
            d.innerHTML = `<div class="message-content">${txt}</div>`;
            messages.appendChild(d);
            messages.scrollTop = messages.scrollHeight;
        };

        send.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

customElements.define('custom-chatbot', CustomChatbot);