/* ============================================
   THE GREGORY APP - JAVASCRIPT
   Fun animations and interactivity!
   ============================================ */

// ============================================
// FLOATING PAW PRINTS
// ============================================

function createPawPrints() {
    const container = document.getElementById('pawContainer');
    const pawEmojis = ['🐾', '🦴', '❤️', '⭐'];

    for (let i = 0; i < 15; i++) {
        const paw = document.createElement('div');
        paw.className = 'paw';
        paw.textContent = pawEmojis[Math.floor(Math.random() * pawEmojis.length)];
        paw.style.left = `${Math.random() * 100}%`;
        paw.style.animationDelay = `${Math.random() * 15}s`;
        paw.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(paw);
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================

function animateCounter(element, target) {
    const start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// NAP COUNTER (Updates randomly for fun)
// ============================================

function updateNapCounter() {
    const napCounter = document.getElementById('napCounter');
    const naps = Math.floor(Math.random() * 8) + 1;
    napCounter.textContent = naps;
}

// ============================================
// GOOGLE PHOTOS LINK HANDLER
// ============================================

function setupGooglePhotosLink() {
    const btn = document.getElementById('googlePhotosBtn');

    btn.addEventListener('click', (e) => {
        // If no link is set, show instructions
        if (btn.getAttribute('href') === '#') {
            e.preventDefault();
            alert('📸 To add your Google Photos album:\n\n1. Open your shared album in Google Photos\n2. Click "Share" and copy the link\n3. Update the href in index.html\n\nExample: https://photos.app.goo.gl/YOUR_ALBUM_LINK');
        }
    });
}

// ============================================
// PWA INSTALL PROMPT
// ============================================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Could show a custom install button here
    console.log('📲 PWA install available!');
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// EASTER EGG: Click the hero image for a bark!
// ============================================

function setupEasterEgg() {
    const heroImage = document.getElementById('heroImage');
    const barkSounds = ['Woof! 🐕', 'Bark bark! 🎉', 'Arf arf! ❤️', '*happy tail wagging* 🐾'];

    heroImage.addEventListener('click', () => {
        const bark = barkSounds[Math.floor(Math.random() * barkSounds.length)];

        // Create floating text
        const text = document.createElement('div');
        text.textContent = bark;
        text.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
            z-index: 1000;
            animation: barkPop 1s ease forwards;
            pointer-events: none;
        `;
        document.body.appendChild(text);

        setTimeout(() => text.remove(), 1000);
    });

    // Add bark animation
    const barkStyle = document.createElement('style');
    barkStyle.textContent = `
        @keyframes barkPop {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -100%) scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(barkStyle);
}

// ============================================
// SLIDESHOW
// ============================================

let currentSlide = 0;
let slideInterval;

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slides.length || !dotsContainer) return;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `slide-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    // Button controls
    prevBtn?.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetInterval();
    });

    nextBtn?.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetInterval();
    });

    // Auto-play
    startInterval();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');

    // Wrap around
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
}

function startInterval() {
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 4000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🐕 The Gregory App is loading...');

    // Create floating paw prints
    createPawPrints();

    // Animate the treat counter
    const treatCounter = document.getElementById('treatCounter');
    animateCounter(treatCounter, 1247);

    // Setup nap counter (updates every 30 seconds for fun)
    updateNapCounter();
    setInterval(updateNapCounter, 30000);

    // Setup Google Photos button
    setupGooglePhotosLink();

    // Setup scroll animations
    setupScrollAnimations();

    // Setup easter egg
    setupEasterEgg();

    // Initialize slideshow
    initSlideshow();

    console.log('🕵️ Detective Gregory is on the case! Woof!');
});

// ============================================
// SERVICE WORKER REGISTRATION
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('📱 Service Worker registered!'))
            .catch(err => console.log('Service Worker not registered:', err));
    });
}
