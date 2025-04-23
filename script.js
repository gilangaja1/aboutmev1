// Theme Selector Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-button');
    const themeSelector = document.getElementById('theme-selector');
    const body = document.body;

    // Create Dark Mode Toggle Button if it doesn't exist
    let darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) {
        darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'darkModeToggle';
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.title = 'Toggle Dark Mode';
        
        // Insert after theme selector
        if (themeSelector) {
            themeSelector.parentNode.insertBefore(darkModeToggle, themeSelector.nextSibling);
        } else {
            // Fallback: insert at the beginning of the body
            document.body.insertBefore(darkModeToggle, document.body.firstChild);
        }
    }

    // Fungsi untuk mengubah tema
    function setTheme(theme) {
        body.classList.remove('theme-default', 'theme-dark', 'theme-vibrant');
        
        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }

        localStorage.setItem('portfolioTheme', theme);
    }

    // Event listener untuk perangkat sentuh dan desktop
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            setTheme(selectedTheme);
        });

        // Untuk perangkat layar sentuh
        button.addEventListener('touchstart', () => {
            const selectedTheme = button.getAttribute('data-theme');
            setTheme(selectedTheme);
        });
    });

    // Fixed Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon based on mode
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Cek tema tersimpan di localStorage
    const savedTheme = localStorage.getItem('portfolioTheme') || 'default';
    setTheme(savedTheme);

    // Progress Bar Scroll
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// --- Ripple Button Effect ---
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX - this.offsetLeft}px`;
            ripple.style.top = `${e.clientY - this.offsetTop}px`;
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Particle System for Header
function createParticles() {
    const header = document.querySelector('#header');
    if (!header) return;  // Prevent error if header is not found

    const particleCount = 50;
    const floatingShapes = header.querySelector('.floating-shapes');

    if (floatingShapes) {
        floatingShapes.innerHTML = ''; // Clear existing particles
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Random animation
            particle.style.animation = `
                float ${5 + Math.random() * 10}s linear infinite,
                fade ${3 + Math.random() * 2}s ease-in-out infinite alternate
            `;

            floatingShapes.appendChild(particle);
        }
    }
}

// Smooth Reveal for Skills
function revealSkills() {
    const skills = document.querySelectorAll('.skill-item');
    if (!skills.length) return;  // Prevent error if no skill items found

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 }); 

    skills.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(50px)';
        skill.style.transition = 'all 0.6s ease-out';
        observer.observe(skill);
    });
}

// Typing Effect for Header Title
function typeEffect() {
    const title = document.querySelector('.title-toggle');
    if (!title) return;  // Prevent error if title is not found

    // Clear any existing text
    const originalText = title.textContent;
    title.textContent = '';
    title.style.borderRight = '0.15em solid #3498db';

    let i = 0;
    const typing = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            title.style.borderRight = 'none';
            
            // Start the blinking cursor after typing is complete
            setTimeout(() => {
                startTextGlitch(title, originalText);
            }, 1000);
        }
    }, 100);
}

// NEW: Text Glitch Effect for header title
function startTextGlitch(element, originalText) {
    if (!element) return;
    
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
    let iteration = 0;
    
    const glitchInterval = setInterval(() => {
        element.textContent = originalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join("");
        
        if (iteration >= originalText.length) {
            clearInterval(glitchInterval);
            element.textContent = originalText;
            
            // Repeat the effect after a delay
            setTimeout(() => {
                iteration = 0;
                startTextGlitch(element, originalText);
            }, 5000);
        }
        
        iteration += 1/3;
    }, 30);
}

// Tilt effect for project cards
function addTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;  // Prevent error if no project cards found

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add shine effect
            const shine = card.querySelector('.card-shine') || document.createElement('div');
            if (!card.querySelector('.card-shine')) {
                shine.classList.add('card-shine');
                card.appendChild(shine);
            }
            
            shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.backgroundImage = 'none';
            }
        });
    });
}

// NEW: Animated cursor follower
function createCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Add interaction effects on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .btn, .project-card');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Initialize Enhancements
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    revealSkills();
    typeEffect();
    addTiltEffect();
    createCursorFollower(); // NEW
    
    // Add animated background
    createAnimatedBackground(); // NEW

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// NEW: Create animated background
function createAnimatedBackground() {
    const backgroundCanvas = document.createElement('div');
    backgroundCanvas.className = 'animated-background';
    document.body.insertBefore(backgroundCanvas, document.body.firstChild);
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'background-bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.width = `${Math.random() * 100 + 50}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
        backgroundCanvas.appendChild(bubble);
    }
}

// Handle Submit Button for WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const message = document.querySelector('textarea[name="message"]').value;

            if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
                // Improved form validation with animation
                const formElements = document.querySelectorAll('#contact-form input, #contact-form textarea');
                formElements.forEach(el => {
                    if (el.value.trim() === "") {
                        el.classList.add('validation-error');
                        el.addEventListener('input', function() {
                            this.classList.remove('validation-error');
                        }, {once: true});
                    }
                });
                
                showNotification('Mohon lengkapi semua field sebelum mengirim.', 'error');
                return;
            }

            const whatsappMessage = `Halo, saya ${name} (${email}). ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const phoneNumber = "6285163011367";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
            
            // Show success notification
            showNotification('Pesan berhasil dikirim!', 'success');
            document.querySelector('#contact-form').reset();
        });
    }
});

// NEW: Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax effect for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('#header');
    if (header) {
        const scrollPosition = window.pageYOffset;
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// --- Skill Chart (Chart.js) ---
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('programmingSkillsChart');
    if (ctx) {
        const programmingSkillsChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'React', 'SQL'],
                datasets: [{
                    label: 'Tingkat Keahlian',
                    data: [90, 80, 85, 70, 75, 65],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Skor: ${context.raw}/100`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            display: true,
                            color: 'rgba(200, 200, 200, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
});

// --- Scroll Animations ---
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll(); // Initial check on load
    
    // Add animate-on-scroll class to elements that should be animated
    document.querySelectorAll('section > .container > h2').forEach(el => {
        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });
});

// Burger Menu Toggle (Improved for Mobile)
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Add smooth slide-in animation for mobile
            if (typeof gsap !== 'undefined') {
                if (navLinks.classList.contains('active')) {
                    gsap.fromTo(navLinks, 
                        { x: '-100%', opacity: 0 }, 
                        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.inOut' }
                    );
                }
            }
            
            // Toggle burger animation
            burgerMenu.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });
    }
});

// Animasi untuk chart saat muncul (GSAP + ScrollTrigger)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('#programmingSkillsChart', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#skills-chart',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
});

// Data Proyek
const projects = [
    { 
        title: "C++", 
        description: "Saya pertama kali belajar bahasa pemrograman C++ di sekolah saya dan saya semakin tertarik belajar tentang pemrograman.",
        image: "c++.jpg" // Gambar untuk C++ misalnya cpp.jpg di folder images
    },
    { 
        title: "PHP", 
        description: "Ini adalah bahasa pemrograman ke-2 yang saya latih pada saat saya mengikuti program PKL di Telkom Renon.",
        image: "php.jpg" // Gambar untuk PHP misalnya php.jpg di folder images
    },
    { 
        title: "JavaScript", 
        description: "JavaScript adalah bahasa pemograman yang memungkinkan saya untuk membuat website yang interaktif dan dinamis.",
        image: "javascript.jpg" // Gambar untuk JavaScript misalnya javascript.jpg di folder images
    }
];

// Fungsi untuk menampilkan proyek
function displayProjects() {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;
    
    // Clear existing projects
    projectList.innerHTML = '';

    // Menambahkan setiap proyek sebagai slide
    projects.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        slide.innerHTML = `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay"></div>
                </div>
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <button class="btn project-btn">Lihat Detail</button>
                </div>
            </div>
        `;
        projectList.appendChild(slide);
    });

    // Initialize Swiper
    setTimeout(() => {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }, 100);
}

// Create Floating Shapes
function createFloatingShapes() {
    const shapes = ['circle', 'square', 'triangle', 'hexagon', 'diamond'];
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    const floatingShapes = document.querySelector('.floating-shapes');

    if (!floatingShapes) return;
    
    // Clear existing shapes
    floatingShapes.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape', shapes[Math.floor(Math.random() * shapes.length)]);
        shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.width = `${Math.random() * 30 + 10}px`;
        shape.style.height = shape.style.width;
        
        // Random blur for depth effect
        shape.style.filter = `blur(${Math.random() * 2}px)`;
        shape.style.opacity = 0.2 + Math.random() * 0.6;
        
        floatingShapes.appendChild(shape);
    }
}

// Animate Navbar Scroll (Sticky Navbar for Mobile)
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled', 'sticky');
    } else {
        navbar.classList.remove('scrolled', 'sticky');
    }
}

// Scroll to Top Button
function handleScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = 'block';
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (document.body.scrollTop <= 20 && document.documentElement.scrollTop <= 20) {
                scrollTopBtn.style.display = 'none';
            }
        }, 300);
    }
}

// Scroll Event Listener
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleScrollToTop();
});

// Scroll to Top Button Action
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Form Submission Animation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Add focus effects to form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.parentElement.classList.remove('input-focused');
                }
            });
            
            // Check if input already has value on page load
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('input-focused');
            }
        });
    }
});

// Initialize All Functions
window.onload = function() {
    displayProjects();
    createFloatingShapes();
    
    // Initialize chatbot if the function exists
    if (typeof initChatbot === 'function') {
        initChatbot();
    }
};

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Mobile-specific animations
        const isMobile = window.innerWidth <= 768;

        // Header elements animation
        gsap.from('#header h1, #header p, #header .btn', {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.2,
        });

        // Floating Shapes Animation (Slower for mobile to reduce performance impact)
        const shapeSpeed = isMobile ? 15 : 10;

        gsap.to('.floating-shapes .shape', {
            y: 'random(-20, 20)',
            x: 'random(-20, 20)',
            rotation: 'random(-15, 15)',
            duration: shapeSpeed,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            stagger: 0.1
        });

        // Animate sections on scroll
        gsap.utils.toArray('section').forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }
});

// NEW: Snow effect
function createSnowfall() {
    const header = document.querySelector('#header');
    if (!header) return;

    const snowflakeCount = 30;
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        snowflake.style.fontSize = `${Math.random() * 10 + 5}px`;
        header.appendChild(snowflake);
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-item .progress');
    skillBars.forEach((bar) => {
        const width = bar.getAttribute('data-skill');
        bar.style.width = `${width}%`;
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.5)';
    });
}

// Initialize snow effect if enabled
document.addEventListener('DOMContentLoaded', () => {
    createSnowfall();
    
    // Set up skill bars animation when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// Chatbot Implementation
function initChatbot() {
    const chatbotButton = document.createElement('div');
    chatbotButton.className = 'chatbot-button';
    chatbotButton.innerHTML = '<i class="fas fa-comment"></i>';
    document.body.appendChild(chatbotButton);
    
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    chatbotContainer.innerHTML = `
        <div class="chatbot-header">
            <h3>Portfolio Assistant</h3>
            <button class="close-chat"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages"></div>
        <div class="chatbot-input">
            <input type="text" placeholder="Ask me anything...">
            <button class="send-message"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatbotContainer);
    
    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        chatbotButton.classList.toggle('active');
        chatbotContainer.classList.toggle('active');
        
        // Send welcome message if first time opening
        if (!chatbotContainer.querySelector('.chatbot-messages').children.length) {
            addChatbotMessage("Hello! I'm your portfolio assistant. How can I help you today?", 'bot');
        }
    });
    
    // Close chatbot
    chatbotContainer.querySelector('.close-chat').addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotButton.classList.remove('active');
    });
    
    // Send message functionality
    const sendButton = chatbotContainer.querySelector('.send-message');
    const inputField = chatbotContainer.querySelector('input');
    
    function sendMessage() {
        const message = inputField.value.trim();
        if (message) {
            addChatbotMessage(message, 'user');
            inputField.value = '';
            
            // Process message (simple responses for demonstration)
            setTimeout(() => {
                processChatbotMessage(message);
            }, 500);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Add message to chatbot
function addChatbotMessage(message, sender) {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    if (!chatbotMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Process chatbot messages with simple responses
function processChatbotMessage(message) {
    message = message.toLowerCase();
    
    // Simple response logic
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        addChatbotMessage("Hi there! How can I help you with this portfolio?", 'bot');
    } else if (message.includes('project') || message.includes('work')) {
        addChatbotMessage("I've worked on several projects including web development, UI/UX design, and mobile applications. You can see them in the Projects section.", 'bot');
    } else if (message.includes('contact') || message.includes('hire') || message.includes('email')) {
        addChatbotMessage("You can contact me through the form in the Contact section or directly via email. I'd be happy to discuss any opportunities!", 'bot');
    } else if (message.includes('skill') || message.includes('technology')) {
        addChatbotMessage("My main skills include HTML, CSS, JavaScript, PHP, React, and SQL. I'm always learning new technologies to stay up-to-date.", 'bot');
    } else if (message.includes('thank')) {
        addChatbotMessage("You're welcome! Let me know if you need anything else.", 'bot');
    } else {
        addChatbotMessage("I'm not sure I understand. Could you rephrase that or ask about my projects, skills, or contact information?", 'bot');
    }
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                    
                    // Add fade-in effect
                    img.style.opacity = 0;
                    img.onload = () => {
                        img.style.transition = 'opacity 0.5s ease-in';
                        img.style.opacity = 1;
                    };
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Theme preference detection
document.addEventListener('DOMContentLoaded', () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // If user hasn't set a theme preference in localStorage but prefers dark mode
    if (!localStorage.getItem('portfolioTheme') && !localStorage.getItem('darkMode')) {
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
        }
    }
    
    // Listen for changes in color scheme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem('portfolioTheme') && !localStorage.getItem('darkMode')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.classList.remove('dark-mode');
                document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    });
});

// Project modal functionality
document.addEventListener('DOMContentLoaded', () => {
    // This creates the modal container if it doesn't exist
    let projectModal = document.getElementById('project-modal');
    if (!projectModal) {
        projectModal = document.createElement('div');
        projectModal.id = 'project-modal';
        projectModal.className = 'modal';
        projectModal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                </div>
                <div class="modal-body">
                    <img class="modal-image" src="" alt="Project Image">
                    <div class="modal-description"></div>
                    <div class="modal-technologies"></div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn modal-link" target="_blank">View Project</a>
                </div>
            </div>
        `;
        document.body.appendChild(projectModal);
        
        // Close modal on click
        projectModal.querySelector('.modal-close').addEventListener('click', () => {
            projectModal.classList.remove('show');
        });
        
        // Close modal when clicking outside the content
        window.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('show');
            }
        });
    }
    
    // Add event listeners to project cards
    document.addEventListener('click', (e) => {
        const projectBtn = e.target.closest('.project-btn');
        if (projectBtn) {
            const projectCard = projectBtn.closest('.project-card');
            const title = projectCard.querySelector('h3').textContent;
            const description = projectCard.querySelector('p').textContent;
            const imageSrc = projectCard.querySelector('img').src;
            
            // Find the corresponding project in our array
            const project = projects.find(p => p.title === title);
            
            // Update modal content
            projectModal.querySelector('.modal-title').textContent = title;
            projectModal.querySelector('.modal-description').textContent = description;
            projectModal.querySelector('.modal-image').src = imageSrc;
            
            // Show modal with animation
            projectModal.classList.add('show');
        }
    });
});

// Advanced Analytics (simplified for portfolio purposes)
function initAnalytics() {
    // This is a simplified analytics implementation
    // In a real-world scenario, you would use a proper analytics service
    
    let pageVisits = localStorage.getItem('pageVisits') || 0;
    pageVisits = parseInt(pageVisits) + 1;
    localStorage.setItem('pageVisits', pageVisits);
    
    // Track page sections viewed
    const sections = document.querySelectorAll('section');
    const viewedSections = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId && !viewedSections.has(sectionId)) {
                    viewedSections.add(sectionId);
                    // In a real implementation, you would send this data to your analytics service
                    console.log(`Section viewed: ${sectionId}`);
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Call analytics on page load
document.addEventListener('DOMContentLoaded', initAnalytics);

// Add print styles dynamically
function addPrintStyles() {
    const printStyles = document.createElement('style');
    printStyles.media = 'print';
    printStyles.textContent = `
        @media print {
            body {
                font-size: 12pt;
                line-height: 1.5;
                color: #000;
                background: #fff;
            }
            
            nav, footer, button, .chatbot-button, .chatbot-container,
            #burger-menu, #scrollTopBtn, .theme-selector, #darkModeToggle,
            .animated-background, .floating-shapes, .particle {
                display: none !important;
            }
            
            header, section {
                margin: 20pt 0;
                padding: 10pt 0;
                page-break-inside: avoid;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
            }
            
            img {
                max-width: 100% !important;
                page-break-inside: avoid;
            }
            
            a {
                color: #000;
                text-decoration: underline;
            }
            
            a[href]:after {
                content: " (" attr(href) ")";
                font-size: 90%;
            }
            
            .project-card {
                page-break-inside: avoid;
                border: 1pt solid #ccc;
                padding: 10pt;
                margin-bottom: 15pt;
                box-shadow: none !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

// Call print styles on load
document.addEventListener('DOMContentLoaded', addPrintStyles);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Pause intensive animations to save resources
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Replace direct scroll handlers with throttled versions
const throttledHandleScroll = throttle(() => {
    handleNavbarScroll();
    handleScrollToTop();
    animateOnScroll();
}, 100);

// Remove previous scroll listeners and add throttled one
window.removeEventListener('scroll', handleNavbarScroll);
window.removeEventListener('scroll', handleScrollToTop);
window.removeEventListener('scroll', animateOnScroll);
window.addEventListener('scroll', throttledHandleScroll);

// Content loaded optimization
const loaded = {};

function lazyLoadSection(sectionId) {
    if (loaded[sectionId]) return;
    
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    switch(sectionId) {
        case 'projects':
            displayProjects();
            break;
        case 'skills':
            animateSkillBars();
            break;
        // Add other sections as needed
    }
    
    loaded[sectionId] = true;
}

// Set up intersection observers for lazy loading sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['about', 'projects', 'skills', 'contact'];
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoadSection(entry.target.id);
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            sectionObserver.observe(section);
        }
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setTheme,
        createParticles,
        revealSkills,
        typeEffect,
        addTiltEffect,
        displayProjects,
        animateSkillBars
    };
}
