// Script for Fabrizio Santini Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Language Toggle Functionality
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');
    let currentLang = 'es';

    function switchLanguage(lang) {
        currentLang = lang;
        document.body.className = lang === 'en' ? 'lang-en' : '';
        
        // Update button states
        langEs.classList.toggle('active', lang === 'es');
        langEn.classList.toggle('active', lang === 'en');
        
        // Update all elements with data-es and data-en attributes
        const elementsWithLang = document.querySelectorAll('[data-es], [data-en]');
        elementsWithLang.forEach(element => {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'es';
    switchLanguage(savedLang);

    // Event listeners for language buttons
    langEs.addEventListener('click', () => switchLanguage('es'));
    langEn.addEventListener('click', () => switchLanguage('en'));

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Filmography Filter Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const filmItems = document.querySelectorAll('.film-item');

    function filterFilmography(category) {
        filmItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'flex';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    }

    // Add event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter content
            const category = btn.getAttribute('data-tab');
            filterFilmography(category);
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // Hero Section Parallax Effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero && window.innerWidth > 768) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
        
        if (heroContent && window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.film-item, .gallery-item, .press-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Gallery Image Loading
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/600x400/1a1a1a/c4873a?text=Image+Not+Available';
            this.alt = 'Image not available';
        });
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Form Handling (if contact form is added later)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert(currentLang === 'es' ? 
                    '¡Mensaje enviado! Te contactaremos pronto.' : 
                    'Message sent! We\'ll contact you soon.'
                );
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    // Style the back to top button
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #c4873a, #d4984a);
        color: #0a0a0a;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(196, 135, 58, 0.3);
    `;

    // Show/hide back to top button
    function toggleBackToTopBtn() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', toggleBackToTopBtn);

    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Typing Animation for Hero Quote
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation after a delay
    setTimeout(() => {
        const heroQuote = document.querySelector('.hero-quote');
        if (heroQuote) {
            const quoteText = heroQuote.textContent;
            typeWriter(heroQuote, quoteText, 40);
        }
    }, 2000);

    // Performance Optimization: Throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(updateNavbar, 10));
    window.addEventListener('scroll', throttle(parallaxEffect, 10));
    window.addEventListener('scroll', throttle(updateActiveNavLink, 10));
    window.addEventListener('scroll', throttle(toggleBackToTopBtn, 10));

    // Initialize
    updateNavbar();
    updateActiveNavLink();
    
    console.log('🎬 Fabrizio Santini Portfolio Website Loaded Successfully!');
});