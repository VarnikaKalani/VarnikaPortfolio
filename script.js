function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Custom cursor with reduced smoothing
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

// Enhanced hover effect - excluding images
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a:not(a img), button, .project:not(img)')) {
        cursor.classList.add('hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a:not(a img), button, .project:not(img)')) {
        cursor.classList.remove('hover');
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('about-image')) {
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('section, .project, h2, .about-image').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Enhanced scroll animations with zoom effect
const scrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add zoom effect to hero image
                if (entry.target.classList.contains('hero-image')) {
                    entry.target.style.transform = 'translateZ(-0.5px) scale(1.25)';
                }
            } else {
                // Reset zoom on hero image when out of view
                if (entry.target.classList.contains('hero-image')) {
                    entry.target.style.transform = 'translateZ(-0.5px) scale(1)';
                }
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px'
    }
);

// Observe elements for scroll animations
document.querySelectorAll('.project, .hero-image, .scroll-section').forEach(el => {
    scrollObserver.observe(el);
});

// Smooth parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const speed = section.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        if (section.querySelector('.parallax-bg')) {
            section.querySelector('.parallax-bg').style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    });

    // Add scale effect to visible sections
    const viewportHeight = window.innerHeight;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const viewportMiddle = viewportHeight / 2;
        const distanceFromCenter = Math.abs(sectionMiddle - viewportMiddle);
        const maxDistance = viewportHeight / 2;
        
        // Calculate scale based on distance from viewport center
        const scale = Math.max(0.95, 1 - (distanceFromCenter / maxDistance) * 0.1);
        
        if (rect.top < viewportHeight && rect.bottom > 0) {
            section.style.transform = `scale(${scale})`;
            section.style.opacity = Math.max(0.5, 1 - (distanceFromCenter / maxDistance));
        }
    });
});

// Page transition effect
window.addEventListener('load', () => {
    document.body.classList.add('smooth-transition');
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const updateActiveSection = () => {
    const currentScroll = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentScroll >= sectionTop && currentScroll <= sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveSection);

// Smooth scale effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elemCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportHeight / 2 - elemCenter);
        const scale = Math.max(0.95, 1 - (distanceFromCenter / viewportHeight) * 0.15);
        
        if (rect.top < viewportHeight && rect.bottom > 0) {
            section.style.transform = `scale(${scale})`;
            section.style.opacity = Math.max(0.5, 1 - (distanceFromCenter / viewportHeight));
        }
    });
});

// Project hover effect enhancement
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mousemove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        project.style.setProperty('--mouse-x', `${x}px`);
        project.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Improved typing effect with proper cursor timing
async function typeText() {
    const element = document.querySelector('.typing-effect');
    const text = "Hi, I'm Varnika Kalani —";
    const typingSpeed = 80; // slightly faster typing speed
    
    element.textContent = '';
    element.classList.add('typing');
    
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
    
    // Keep cursor visible for a moment after typing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    element.classList.remove('typing');
    element.classList.add('done');
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    
    // Observe elements for scroll animations
    document.querySelectorAll('.scroll-reveal, .scroll-section, .project, .about-image').forEach(el => {
        observer.observe(el);
    });
});