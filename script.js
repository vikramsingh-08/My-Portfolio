// Typed.js initialization
document.addEventListener('DOMContentLoaded', function() {
    new Typed('#typed-text', {
        strings: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
        }
    });
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');
    
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('https://formspree.io/f/mandzepn', {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            successMsg.classList.remove('hidden');
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        errorMsg.classList.remove('hidden');
    } finally {
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
    navbar.classList.toggle('shadow-2xl', window.scrollY > 50);
});