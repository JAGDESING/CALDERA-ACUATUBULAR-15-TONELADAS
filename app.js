// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initInteractiveElements();
    initAnimations();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Active Navigation
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    
    // Navbar background on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Active navigation highlighting
    function updateActiveNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        updateNavbar();
        updateActiveNavigation();
        animateOnScroll();
    });
    
    // Initial calls
    updateNavbar();
    updateActiveNavigation();
}

// Interactive Elements
function initInteractiveElements() {
    // Table row hover effects
    const tableRows = document.querySelectorAll('.table-row-interactive');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Price card interactions
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Manufacturer and distributor card effects
    const manufacturerCards = document.querySelectorAll('.manufacturer-card, .distributor-card');
    manufacturerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '8px';
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '5px';
            this.style.transform = 'translateY(-3px)';
        });
    });
    
    // Fuel type items animation
    const fuelItems = document.querySelectorAll('.fuel-item');
    fuelItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.querySelector('.fuel-icon').style.transform = 'rotate(360deg)';
            this.querySelector('.fuel-icon').style.transition = 'transform 0.6s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.querySelector('.fuel-icon').style.transform = 'rotate(0deg)';
        });
    });
    
    // Summary card enhanced interactions
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const highlight = this.querySelector('.highlight');
            if (highlight) {
                highlight.style.transform = 'scale(1.1)';
                highlight.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const highlight = this.querySelector('.highlight');
            if (highlight) {
                highlight.style.transform = 'scale(1)';
            }
        });
    });
}

// Animation on Scroll
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('summary-grid') || 
                    entry.target.classList.contains('price-grid') ||
                    entry.target.classList.contains('manufacturer-grid')) {
                    animateGridChildren(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.summary-card, .spec-card, .price-card, .manufacturer-card, .distributor-card, .source-card, .factor-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(title);
    });
}

// Animate grid children with stagger
function animateGridChildren(gridContainer) {
    const children = gridContainer.children;
    Array.from(children).forEach((child, index) => {
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Additional scroll-based animations
function animateOnScroll() {
    // Parallax effect for hero decoration
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroDecoration.style.transform = `translateY(${rate}px)`;
    }
    
    // Progress indicator (optional enhancement)
    updateProgressIndicator();
}

// Progress indicator
function updateProgressIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: linear-gradient(to right, rgba(76, 175, 80, 0.8), rgba(233, 30, 99, 0.8), rgba(255, 152, 0, 0.8));
            z-index: 999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrolled + '%';
    }
}

// Enhanced table interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add click-to-highlight functionality for table rows
    const tableRows = document.querySelectorAll('.dimensions-table tbody tr, .recommendation-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove previous highlights
            tableRows.forEach(r => r.classList.remove('highlighted'));
            
            // Add highlight to clicked row
            this.classList.add('highlighted');
            
            // Add CSS for highlight if not exists
            if (!document.getElementById('table-highlight-style')) {
                const style = document.createElement('style');
                style.id = 'table-highlight-style';
                style.textContent = `
                    .highlighted {
                        background: rgba(76, 175, 80, 0.1) !important;
                        border-left: 4px solid rgba(76, 175, 80, 0.8) !important;
                        transform: scale(1.01);
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                `;
                document.head.appendChild(style);
            }
        });
    });
});

// Print functionality (future enhancement)
function initPrintFunctionality() {
    // Add print button if needed
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Imprimir';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(76, 175, 80, 0.8);
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
}

// Initialize print functionality
document.addEventListener('DOMContentLoaded', function() {
    initPrintFunctionality();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const sections = ['inicio', 'resumen', 'especificaciones', 'dimensiones', 'precios', 'fabricantes', 'recomendaciones', 'fuentes'];
    const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href')?.substring(1);
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1]);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1]);
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection('inicio');
    } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection('fuentes');
    }
});

// Dynamic content loading effect
function addLoadingEffects() {
    const cards = document.querySelectorAll('.summary-card, .spec-card, .price-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    // Add CSS animation if not exists
    if (!document.getElementById('loading-animations')) {
        const style = document.createElement('style');
        style.id = 'loading-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.7;
                }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize loading effects after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addLoadingEffects, 100);
});

// Enhanced source link interactions
document.addEventListener('DOMContentLoaded', function() {
    const sourceLinks = document.querySelectorAll('.source-list a');
    
    sourceLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
        
        // Add external link indicator
        if (this.getAttribute('target') === '_blank') {
            this.innerHTML += ' ↗️';
        }
    });
});