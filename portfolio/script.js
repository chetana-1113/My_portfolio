document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // Theme Toggle
    // =========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme or user preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        // Default is dark mode in HTML, switch if prefers light
        htmlElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // =========================================================================
    // Mobile Navigation
    // =========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-link');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // Toggle icon between list and x
        if (navLinks.classList.contains('nav-active')) {
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
        } else {
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                menuIcon.classList.remove('ph-x');
                menuIcon.classList.add('ph-list');
            }
        });
    });

    // =========================================================================
    // Sticky Navbar & Active Link Update
    // =========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Link Update
        let current = '';
        const scrollPosition = window.scrollY + 100; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${current}`) {
                anchor.classList.add('active');
            }
        });
    });

    // =========================================================================
    // Intersection Observer for Scroll Animations
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-right');
    const progressBars = document.querySelectorAll('.progress');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            
            // Animate progress bars if they exist inside this target
            if (entry.target.classList.contains('skills-grid')) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('style').match(/--width:\s*([^;]+)/)[1];
                    bar.style.width = width;
                });
            }
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Explicitly observe skills section for progress bar animation
    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) {
        revealObserver.observe(skillsSection);
    }
});

// =========================================================================
// Education Timeline Accordion Click logic
// =========================================================================
window.toggleDetails = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.classList.contains('show')) {
        el.classList.remove('show');
    } else {
        el.classList.add('show');
    }
}
