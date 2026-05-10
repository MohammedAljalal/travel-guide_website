document.addEventListener('DOMContentLoaded', () => {

    // 1. Live Date & Time
    const clockElements = document.querySelectorAll('.live-clock');
    if (clockElements.length > 0) {
        setInterval(() => {
            const now = new Date();
            clockElements.forEach(el => {
                el.textContent = now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
            });
        }, 1000);
    }

    // 2. Active Navigation Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Sticky Navbar & Scroll Events
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            scrollTopBtn?.classList.add('show');
        } else {
            scrollTopBtn?.classList.remove('show');
        }
    });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // 4. Reveal on Scroll (Smooth & Calm)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 5. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const speed = 150; // Slower, calmer counter
                const inc = target / speed;
                
                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 6. Calm Typing Animation
    const typeText = document.getElementById('typewriter');
    if (typeText) {
        const words = ['Tranquility.', 'Heritage.', 'Elegance.', 'Discovery.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 60 : 120; // Slower typing

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 3000; // Longer pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 800; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1500);
    }

    // 7. Lightbox Gallery
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    if (galleryImgs.length > 0 && lightbox) {
        const lbImg = document.getElementById('lightbox-img');
        const lbClose = document.querySelector('.lightbox-close');
        const lbPrev = document.querySelector('.lightbox-prev');
        const lbNext = document.querySelector('.lightbox-next');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            lbImg.src = galleryImgs[currentIndex].src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        galleryImgs.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox(index));
        });

        lbClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        lbPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImgs.length - 1;
            lbImg.src = galleryImgs[currentIndex].src;
        });

        lbNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex < galleryImgs.length - 1) ? currentIndex + 1 : 0;
            lbImg.src = galleryImgs[currentIndex].src;
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lbImg && e.target !== lbPrev && e.target !== lbNext) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 8. Destination Filtering (Fade effect)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');
    if (filterBtns.length > 0 && destCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                destCards.forEach(card => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 400); // Wait for fade out
                });
            });
        });
    }

    // 9. Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                this.classList.add('active');
                const body = this.nextElementSibling;
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 10. Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const fields = [
                { id: 'name', msg: 'Please provide your full name.', validate: val => val.trim().length > 0 },
                { id: 'email', msg: 'A valid email address is required.', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
                { id: 'phone', msg: 'Please enter a valid phone number.', validate: val => /^\d{10,}$/.test(val.replace(/\D/g,'')) },
                { id: 'message', msg: 'Kindly provide a more detailed inquiry.', validate: val => val.trim().length >= 20 }
            ];

            fields.forEach(field => {
                const el = document.getElementById(field.id);
                const errorEl = el.nextElementSibling;
                if (!field.validate(el.value)) {
                    isValid = false;
                    el.style.borderColor = '#E25E5E';
                    errorEl.textContent = field.msg;
                    errorEl.style.display = 'block';
                } else {
                    el.style.borderColor = 'var(--glass-border)';
                    errorEl.style.display = 'none';
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 8px;"></i> Request Sent';
                btn.style.background = 'var(--primary)';
                btn.style.color = 'var(--bg-main)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    contactForm.reset();
                }, 4000);
            }
        });

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = 'var(--glass-border)';
                const errorEl = input.nextElementSibling;
                if(errorEl && errorEl.classList.contains('error-msg')) {
                    errorEl.style.display = 'none';
                }
            });
        });
    }
});
