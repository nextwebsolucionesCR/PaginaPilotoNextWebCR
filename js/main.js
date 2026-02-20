/* 
   MAIN JS - PILOT PORTFOLIO
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // --- CLOSE MENU ON LINK CLICK ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // --- STICKY NAVBAR EFFECT ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- COCKPIT 3D PARALLAX (Desktop Only) ---
    const heroSection = document.getElementById('hero');

    // Check for Desktop AND Hero existence to save resources
    if (heroSection && window.matchMedia("(min-width: 992px)").matches) {
        const bgLayer = heroSection.querySelector('.hero-layer.bg');
        const hudLayer = heroSection.querySelector('.hero-layer.hud');

        // 1. MOUSE TILT (Horizon Effect)
        heroSection.addEventListener('mousemove', (e) => {
            // Lightweight calculation
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            requestAnimationFrame(() => {
                if (bgLayer) bgLayer.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
                // HUD moves slightly opposite for depth
                if (hudLayer) hudLayer.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
            });
        });

        // 2. SCROLL DEPARTURE (Takeoff Blur/Zoom)
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Only run if hero is in view
            if (scrollY < window.innerHeight) {
                requestAnimationFrame(() => {
                    if (bgLayer) {
                        // Zoom out slightly and blur
                        bgLayer.style.filter = `blur(${scrollY * 0.02}px)`;
                    }
                    if (hudLayer) {
                        // Text moves faster (Parallax) and fades
                        hudLayer.style.transform = `translateY(${scrollY * 0.4}px)`;
                        hudLayer.style.opacity = 1 - (scrollY * 0.003);
                    }
                });
            }
        });
    }

    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- MANIFEST INTERACTION (EXPERIENCE SECTION) ---
    const manifestItems = document.querySelectorAll('.manifest-item');
    const manifestVisual = document.getElementById('manifest-visual');

    if (manifestItems.length > 0 && manifestVisual) {
        manifestItems.forEach(item => {
            const activateItem = () => {
                // Update active class
                manifestItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update Background Image
                const imgUrl = item.getAttribute('data-img');
                manifestVisual.style.backgroundImage = `url('${imgUrl}')`;
            };

            item.addEventListener('mouseenter', activateItem);
            item.addEventListener('click', activateItem);
        });
    }


    // --- PRECISION RADAR SCAN (CSS-Only, No JS Required) ---
    // The previous particle system has been removed for a cleaner, technical look.

    // --- ANTI-INSPECTION (DISABLE RIGHT CLICK & DEV TOOLS) ---
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.onkeydown = function (e) {
        // F12
        if (e.keyCode == 123) {
            return false;
        }
        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+U
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    };
});
