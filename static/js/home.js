function login(){
    window.location.href = "login.html";
    
}

function signup(){
    window.location.href = "signup.html";
}


document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navigation-bar');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileNavToggle.querySelector('i').classList.toggle('fa-bars');
        mobileNavToggle.querySelector('i').classList.toggle('fa-times');
    });

    navLinks.querySelectorAll('.navigation-bar__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileNavToggle.querySelector('i').classList.add('fa-bars');
                mobileNavToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    const featureCards = document.querySelectorAll('.features__card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.features__card, .about__content, .contact__content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (element.classList.contains('features__card')) {
                    const delay = element.dataset.aosDelay ? parseInt(element.dataset.aosDelay) / 1000 : 0;
                    element.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else {
                    element.style.animation = 'zoomIn 0.8s forwards';
                }
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            const formData = {
                name,
                email,
                subject,
                message
            };
            
            console.log('Form data:', formData);
            showFormMessage('Your message has been sent. Thank you!', 'success');
            
            contactForm.reset();
        });
    }

    function showFormMessage(text, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type === 'error' ? 'form-error' : 'form-success'}`;
        messageElement.textContent = text;
        
        messageElement.style.padding = '10px 15px';
        messageElement.style.marginTop = '15px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.fontWeight = '500';
        
        if (type === 'error') {
            messageElement.style.backgroundColor = '#fee2e2';
            messageElement.style.color = '#b91c1c';
            messageElement.style.border = '1px solid #fecaca';
        } else {
            messageElement.style.backgroundColor = '#dcfce7';
            messageElement.style.color = '#166534';
            messageElement.style.border = '1px solid #bbf7d0';
        }
        
        const submitButton = document.querySelector('.contact__form button[type="submit"]');
        submitButton.parentNode.insertBefore(messageElement, submitButton.nextSibling);
        
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.style.opacity === '1') {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-small)';
            }
        });
    });

    const socialLinks = document.querySelectorAll('.contact__social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

    });
    
});
