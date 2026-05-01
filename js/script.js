document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Custom Cursor Glow
    ========================================== */
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Enlarge cursor on interactive elements
    const interactables = document.querySelectorAll('a, button, .impact-card, .diff-card, .project-card, .flow-step, .strength-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '400px';
            cursorGlow.style.height = '400px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0) 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '300px';
            cursorGlow.style.height = '300px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)';
        });
    });

    /* ==========================================
       2. Intersection Observer (Animations & Counters)
    ========================================== */
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the impact grid, trigger counter animation
                if(entry.target.classList.contains('impact-grid')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const prefix = counter.getAttribute('data-prefix') || '';
                        const suffix = counter.getAttribute('data-suffix') || '';
                        const duration = 2000; 
                        const stepTime = Math.abs(Math.floor(duration / target));
                        
                        let current = 0;
                        const timer = setInterval(() => {
                            current += Math.ceil(target / 50) || 1;
                            if (current >= target) {
                                counter.innerText = prefix + target + suffix;
                                clearInterval(timer);
                            } else {
                                counter.innerText = prefix + current + suffix;
                            }
                        }, stepTime);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* ==========================================
       3. Smooth Scrolling
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    /* ==========================================
       4. 3D Tilt Effect
    ========================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

});

/* ==========================================
   5. Form Handling
========================================== */
function sendEmail(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const body = document.getElementById('message').value;
    window.location.href = `mailto:sugandha811@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(body)}`;
}
