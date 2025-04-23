 // Theme Selector
 const themeButtons = document.querySelectorAll('.theme-button');
 const mainContainer = document.getElementById('main-container');

 themeButtons.forEach(button => {
     button.addEventListener('click', () => {
         const theme = button.getAttribute('data-theme');
         if (theme === 'dark') {
             mainContainer.setAttribute('data-theme', 'dark');
         } else {
             mainContainer.removeAttribute('data-theme');
         }
     });
 });

 // Mobile Navigation
 const burgerMenu = document.getElementById('burger-menu');
 const navLinks = document.getElementById('nav-links');

 burgerMenu.addEventListener('click', () => {
     navLinks.classList.toggle('active');
     burgerMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
 });

 document.querySelectorAll('#nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
         burgerMenu.textContent = '☰';
     });
 });

 // Scroll to Top
 const scrollTopBtn = document.getElementById('scrollTopBtn');

 window.addEventListener('scroll', () => {
     if (window.scrollY > 300) {
         scrollTopBtn.classList.add('show');
     } else {
         scrollTopBtn.classList.remove('show');
     }
 });

 scrollTopBtn.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // Initialize Swiper
 const swiper = new Swiper('.swiper-container', {
     slidesPerView: 1,
     spaceBetween: 30,
     loop: true,
     centeredSlides: true,
     autoplay: {
         delay: 5000,
         disableOnInteraction: false,
     },
     pagination: {
         el: '.swiper-pagination',
         clickable: true,
     },
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     },
     breakpoints: {
         768: {
             slidesPerView: 2,
         },
         992: {
             slidesPerView: 3,
         }
     }
 });

 // Create floating shapes
 const floatingShapes = document.getElementById('floating-shapes');
 for (let i = 0; i < 15; i++) {
     const shape = document.createElement('div');
     shape.classList.add('shape');
     shape.style.width = `${Math.random() * 100 + 20}px`;
     shape.style.height = shape.style.width;
     shape.style.left = `${Math.random() * 100}%`;
     shape.style.animationDuration = `${Math.random() * 20 + 10}s`;
     shape.style.animationDelay = `${Math.random() * 5}s`;
     floatingShapes.appendChild(shape);
 }

 // Skills Chart
 const ctx = document.getElementById('programmingSkillsChart').getContext('2d');
 const programmingSkillsChart = new Chart(ctx, {
     type: 'radar',
     data: {
         labels: [
             'HTML/CSS',
             'JavaScript',
             'React',
             'PHP/Laravel',
             'Node.js',
             'Database',
             'UI/UX',
             'Mobile Development'
         ],
         datasets: [{
             label: 'Skill Level',
             data: [95, 90, 85, 80, 75, 85, 90, 70],
             backgroundColor: 'rgba(78, 84, 200, 0.2)',
             borderColor: 'rgb(78, 84, 200)',
             pointBackgroundColor: 'rgb(255, 107, 107)',
             pointBorderColor: '#fff',
             pointHoverBackgroundColor: '#fff',
             pointHoverBorderColor: 'rgb(255, 107, 107)'
         }]
     },
     options: {
         scales: {
             r: {
                 angleLines: {
                     color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') + '20'
                 },
                 grid: {
                     color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') + '20'
                 },
                 pointLabels: {
                     color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
                 },
                 ticks: {
                     backdropColor: 'transparent',
                     color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
                 }
             }
         },
         plugins: {
             legend: {
                 labels: {
                     color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
                 }
             }
         }
     }
 });

 // Update chart colors when theme changes
 themeButtons.forEach(button => {
     button.addEventListener('click', () => {
         setTimeout(() => {
             programmingSkillsChart.options.scales.r.angleLines.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color') + '20';
             programmingSkillsChart.options.scales.r.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color') + '20';
             programmingSkillsChart.options.scales.r.pointLabels.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
             programmingSkillsChart.options.scales.r.ticks.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
             programmingSkillsChart.options.plugins.legend.labels.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
             programmingSkillsChart.update();
         }, 100);
     });
 });

 // Form Submission
 const contactForm = document.getElementById('contact-form');
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     // Here you would typically handle the form submission via AJAX
     alert('Terima kasih! Pesan Anda telah dikirim.');
     contactForm.reset();
 });

 // Add animation to elements when they come into view
 const observerOptions = {
     threshold: 0.2,
     rootMargin: "0px 0px -100px 0px"
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('animate__animated', 'animate__fadeInUp');
             observer.unobserve(entry.target);
         }
     });
 }, observerOptions);

 document.querySelectorAll('.section h2, .skill-item, .project-card, .contact-item').forEach(el => {
     observer.observe(el);
 });


 // Animasi scroll reveal
document.addEventListener('DOMContentLoaded', function() {
// Fade-in elements when scrolled into view
const fadeElements = document.querySelectorAll('.section h2, .skill-item, .project-card, .contact-item, .about-info');
fadeElements.forEach(element => {
 element.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
     if (entry.isIntersecting) {
         entry.target.classList.add('visible');
     }
 });
}, {threshold: 0.1});

document.querySelectorAll('.fade-in').forEach(element => {
 observer.observe(element);
});

// Navbar shrink on scroll
window.addEventListener('scroll', function() {
 const navbar = document.getElementById('navbar');
 if (window.scrollY > 100) {
     navbar.classList.add('scrolled');
 } else {
     navbar.classList.remove('scrolled');
 }
});

// Custom cursor effect
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', function(e) {
 cursor.style.left = e.clientX + 'px';
 cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-item, .project-card').forEach(item => {
 item.addEventListener('mouseenter', function() {
     cursor.classList.add('hover');
 });
 item.addEventListener('mouseleave', function() {
     cursor.classList.remove('hover');
 });
});

// Check if device supports custom cursor
if (window.matchMedia('(pointer: fine)').matches) {
 cursor.classList.add('active');
}

// 3D tilt effect for cards
document.querySelectorAll('.tilt-effect').forEach(card => {
 card.addEventListener('mousemove', function(e) {
     const cardRect = card.getBoundingClientRect();
     const cardCenterX = cardRect.left + cardRect.width / 2;
     const cardCenterY = cardRect.top + cardRect.height / 2;
     const angleY = (e.clientX - cardCenterX) / 15;
     const angleX = (cardCenterY - e.clientY) / 15;
     
     card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
 });
 
 card.addEventListener('mouseleave', function() {
     card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
 });
});

// Loading screen
const loadingScreen = document.querySelector('.loading-screen');
window.addEventListener('load', function() {
 setTimeout(function() {
     loadingScreen.classList.add('hidden');
 }, 1000);
});
});

function animateNameText(selector, fullText, options = {}) {
    const element = document.querySelector(selector);
    const {
        deleteSpeed = 100,
        typeSpeed = 100,
        glitchDuration = 200,
        glitchSteps = 3,
        glitchChars = "!@#$%^&*()_+-=[]{}|;:',.<>?~",
        startDelay = 1000,
        loopDelay = 2000
    } = options;

    function deleteText(text, onComplete) {
        let current = text.length;
        function step() {
            if (current > 0) {
                current--;
                element.textContent = text.slice(0, current);
                setTimeout(step, deleteSpeed);
            } else {
                setTimeout(onComplete, 500);
            }
        }
        step();
    }

    function typeWithGlitch(index = 0, onComplete) {
        if (index >= fullText.length) {
            setTimeout(onComplete, loopDelay);
            return;
        }

        let glitchCount = 0;
        function glitchStep() {
            if (glitchCount < glitchSteps) {
                const randChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                element.textContent = fullText.slice(0, index) + randChar;
                glitchCount++;
                setTimeout(glitchStep, glitchDuration / glitchSteps);
            } else {
                element.textContent = fullText.slice(0, index + 1);
                setTimeout(() => typeWithGlitch(index + 1, onComplete), typeSpeed);
            }
        }
        glitchStep();
    }

    function startLoop() {
        deleteText(fullText, () => {
            typeWithGlitch(0, startLoop); // Recursive loop
        });
    }

    setTimeout(startLoop, startDelay);
}

document.addEventListener('DOMContentLoaded', () => {
    animateNameText('.title-toggle', 'Gilang Aditya');
});
