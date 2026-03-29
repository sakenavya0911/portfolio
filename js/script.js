/* Toggle Icon Navbar */
let menuIcon = document.querySelector('.hamburger i'); // Adjusted selector to match HTML icon
let navbar = document.querySelector('.navbar');

const hamburger = document.querySelector('.hamburger');

hamburger.onclick = () => {
    // Toggle icon class between bars and x
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

/* Scroll Sections Active Link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Sticky Navbar */
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove toggle icon and navbar when click navbar link (scroll) */
    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};

/* Scroll Reveal */
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* Typed JS */
const typed = new Typed('.multiple-text', {
    strings: ['Cyber Security Student', 'Ethical Hacker', 'Network Defender', 'Tech Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


/* Custom Cursor Logic */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor exactly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay/animation (handled by CSS transition)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

/* Contact Form Handling */
const contactForm = document.querySelector('form');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalBtnText = submitBtn.value;

        // precise UI state management
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        formMessage.textContent = '';
        formMessage.style.color = 'var(--text-color)';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = '#0ef'; // Main color or green
                contactForm.reset();
            } else {
                formMessage.textContent = result.error || 'Failed to send message.';
                formMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.style.color = 'red';
        } finally {
            submitBtn.value = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
