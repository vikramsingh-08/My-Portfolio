// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js for animated text
    new Typed('#typed-text', {
        strings: [
            'Full Stack Developer',
            'UI/UX Designer', 
            'Problem Solver',
            'Tech Enthusiast'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function() {
    // Toggle mobile menu visibility
    mobileMenu.classList.toggle('hidden');
    
    // Toggle hamburger/close icon
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Smooth scroll to target with offset for fixed navbar
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
        }
    });
});

// Contact form handling with Formspree
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form elements
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    
    // Hide any existing messages
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        // Submit form to Formspree
        const response = await fetch('https://formspree.io/f/mandzepn', {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message and reset form
            successMsg.classList.remove('hidden');
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error message
        errorMsg.classList.remove('hidden');
    } finally {
        // Reset button state after 2 seconds
        setTimeout(() => {
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            submitBtn.disabled = false;
        }, 2000);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    
    // Add enhanced shadow when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-2xl');
    } else {
        navbar.classList.remove('shadow-2xl');
    }
});