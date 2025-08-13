/**
 * Mwecau Living Lab - Main JavaScript
 * This file contains all custom JavaScript functionality for this  website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Log welcome message
    console.log("Welcome to Mwecau Living Lab website!");

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
            } else {
                // Form is valid, show success message
                document.getElementById('formSuccess').classList.remove('d-none');
                contactForm.classList.remove('was-validated');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    document.getElementById('formSuccess').classList.add('d-none');
                }, 5000);
            }
        });
    }

    // Gallery lightbox configuration (if using lightbox2)
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'albumLabel': "Image %1 of %2",
            'fadeDuration': 300
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#' && anchor.getAttribute('href') !== '#navbarNav') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Sticky navbar behavior
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        });
    }

    // Filter functionality for gallery (if needed)
    const galleryTabs = document.getElementById('galleryTab');
    if (galleryTabs) {
        galleryTabs.addEventListener('shown.bs.tab', function (event) {
            // Reinitialize lightbox when tab changes to ensure proper functionality
            if (typeof lightbox !== 'undefined') {
                lightbox.reload();
            }
        });
    }

    // Publication tabs functionality
    const publicationTabs = document.getElementById('publicationTab');
    if (publicationTabs) {
        publicationTabs.addEventListener('shown.bs.tab', function (event) {
            // Any specific actions when changing publication tabs
            console.log('Publication tab changed to: ' + event.target.getAttribute('aria-controls'));
        });
    }
    
    // Back to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // If there's a species tab with hash in URL, activate it
    if (window.location.hash && document.querySelector('.nav-link[href="' + window.location.hash + '"]')) {
        const tabToActivate = new bootstrap.Tab(document.querySelector('.nav-link[href="' + window.location.hash + '"]'));
        tabToActivate.show();
        
        // Scroll to the element after a short delay to ensure tab content is visible
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }

    // Console welcome message
    console.log('Welcome to Mwecau Living Lab website!');
});
