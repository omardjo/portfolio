class CustomAudioPlayer extends HTMLElement {
    connectedCallback() {
        this.render();
        this.initAudioLogic();
    }

    render() {
        this.innerHTML = `
            <audio id="bgMusic" loop preload="auto">
                <source src="./assets/audio/space.mp3" type="audio/mpeg">
            </audio>

            <button id="audioToggle" class="fixed bottom-6 left-6 z-[9990] w-14 h-14 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:border-primary transition-all duration-300 group">
                
                <div id="iconOn" class="hidden relative z-10 transition-transform duration-300 group-hover:scale-110">
                    <i data-feather="volume-2" class="w-6 h-6 text-primary"></i>
                </div>

                <div id="iconOff" class="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    <i data-feather="volume-x" class="w-6 h-6 text-gray-400"></i>
                </div>
                
                <div class="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        `;
        
        // We must re-run feather.replace() because we just injected new icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    initAudioLogic() {
        const audio = this.querySelector('#bgMusic');
        const toggleBtn = this.querySelector('#audioToggle');
        const iconOn = this.querySelector('#iconOn');
        const iconOff = this.querySelector('#iconOff');

        // 1. RECOVER STATE (Mute preference & Time position)
        const userPrefersMute = localStorage.getItem('audioMuted') === 'true';
        const savedTime = parseFloat(localStorage.getItem('audioTime'));

        // Restore the time position immediately
        if (savedTime && !isNaN(savedTime)) {
            audio.currentTime = savedTime;
        }

        let isPlaying = false;

        // UI Updater Function
        const updateUI = (playing) => {
            if (playing) {
                iconOn.classList.remove('hidden');
                iconOff.classList.add('hidden');
            } else {
                iconOn.classList.add('hidden');
                iconOff.classList.remove('hidden');
            }
        };

        // 2. SAVE STATE ON NAVIGATION
        // This saves the current timestamp right before the user leaves the page
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('audioTime', audio.currentTime);
        });

        // 3. Initial Play Attempt (if not muted by preference)
        if (!userPrefersMute) {
            audio.volume = 0.2;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    updateUI(true);
                }).catch(() => {
                    // Auto-play blocked by browser
                    updateUI(false);
                    // Add "Click Anywhere" listener to force start
                    const forceStart = () => {
                        audio.play();
                        isPlaying = true;
                        updateUI(true);
                        document.removeEventListener('click', forceStart);
                    };
                    document.addEventListener('click', forceStart);
                });
            }
        } else {
            // If user prefers mute, show mute icon initially
            updateUI(false);
        }

        // 4. Button Click Listener
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updateUI(false);
                localStorage.setItem('audioMuted', 'true'); // Save preference
            } else {
                audio.volume = 0.2;
                audio.play();
                isPlaying = true;
                updateUI(true);
                localStorage.setItem('audioMuted', 'false'); // Save preference
            }
        });
    }
}

customElements.define('custom-audio-player', CustomAudioPlayer);