document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        if(navLinksContainer.classList.contains('active')) {
            menuBtn.innerHTML = '<i data-feather="x"></i>';
        } else {
            menuBtn.innerHTML = '<i data-feather="menu"></i>';
        }
        feather.replace(); 
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinksContainer.classList.contains('active')){
                navLinksContainer.classList.remove('active');
                menuBtn.innerHTML = '<i data-feather="menu"></i>';
                feather.replace();
            }
        });
    });


    // --- 2. Parallax Blobs ---
    const blobWrapper = document.getElementById('blobWrapper');
    let rafId;

    window.addEventListener('scroll', () => {
        if(blobWrapper) {
            // Use requestAnimationFrame for smoother performance
            if(rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                // Sangat lambat dan halus
                blobWrapper.style.transform = `translateY(${scrolled * 0.15}px)`;
            });
        }
    });

    // --- 3. Enhanced Reveal Animation (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-stagger');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // Biarkan elemen "menjauh" (pudar) saat tidak terlihat
                // Ini memberikan efek mengalir saat scrolling
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    revealElements.forEach((el) => {
        // Otomatisasi stagger delay berdasarkan posisi dalam grup
        if (el.parentElement.classList.contains('fluid-icons') || 
            el.parentElement.classList.contains('bento-grid') || 
            el.parentElement.classList.contains('minimal-book-list')) {
            const index = Array.from(el.parentElement.children).indexOf(el);
            el.style.transitionDelay = `${index * 0.1}s`;
        }

        revealObserver.observe(el);
    });

    // Trigger hero animation immediately since it's above fold
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .reveal-stagger');
        heroElements.forEach(el => el.classList.add('in-view'));
    }, 100);


    // --- 4. Magnetic Hover Effect (Interactive Response) ---
    // Only apply for non-touch devices
    if(window.matchMedia("(pointer: fine)").matches) {
        const magneticElements = document.querySelectorAll('.magnetic, .magnetic-row');
        
        magneticElements.forEach(elem => {
            elem.addEventListener('mousemove', (e) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Hitung arah tarikan. Untuk fluid icons tarikan agak lebih kuat.
                const strength = elem.classList.contains('magnetic-row') ? 0.05 : 0.3;
                
                const deltaX = (x - centerX) * strength; 
                const deltaY = (y - centerY) * strength;
                
                let scale = elem.classList.contains('fluid-icon') ? 1.1 : 1.0;

                elem.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            });

            elem.addEventListener('mouseleave', () => {
                // Reset transform (biarkan animasi css mengambil alih kembali)
                elem.style.transform = ``;
            });
        });
    }

    // --- 5. Sticky Nav Background on Scroll ---
    const nav = document.querySelector('.sticky-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 6. Scroll Spy for Active Link Highlight ---
    const sections = document.querySelectorAll('.section-scroll');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add slight offset for better detection while scrolling
            if(window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });


});