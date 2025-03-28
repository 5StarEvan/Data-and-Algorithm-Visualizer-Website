function login(){
    window.location.href = "login.html";
}

function signup(){
    window.location.href = "signup.html";
}

function logout() {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userSession');
    
    window.location.href = '/logout.html';
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
        showFlashMessage('You have been logged out successfully!');
        
        history.replaceState(null, '', window.location.pathname);
    }
};

function showFlashMessage(message) {
        const existingFlashMsg = document.querySelector('.flash-message');
    if (existingFlashMsg) {
        existingFlashMsg.remove();
    }
    const flashMsg = document.createElement('div');
    flashMsg.className = 'flash-message';
    flashMsg.textContent = message;
    flashMsg.style.position = 'fixed';
    flashMsg.style.top = '20px';
    flashMsg.style.left = '50%';
    flashMsg.style.transform = 'translateX(-50%)';
    flashMsg.style.backgroundColor = '#44b377';
    flashMsg.style.color = 'white';
    flashMsg.style.padding = '15px 25px';
    flashMsg.style.borderRadius = '4px';
    flashMsg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    flashMsg.style.zIndex = '1000';
    flashMsg.style.opacity = '0';
    flashMsg.style.transition = 'opacity 0.5s ease-in-out';    
    document.body.appendChild(flashMsg);
    flashMsg.offsetHeight;
    flashMsg.style.opacity = '1';
    setTimeout(() => {
        flashMsg.style.opacity = '0';
        setTimeout(() => {
            flashMsg.remove();
        }, 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.nav-bar');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.transform = `translateY(${scrollY > 100 ? '-5px' : '0'})`;
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = 'none';
        }
    });


    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        

        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');


        if (navLinks.classList.contains('active')) {
            navLinks.style.transform = 'translateX(0)';
            navLinks.style.opacity = '1';
        } else {
            navLinks.style.transform = 'translateX(100%)';
            navLinks.style.opacity = '0';
        }
    });

    const featureCards = document.querySelectorAll('.features__card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'perspective(500px) rotateX(10deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    });


    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.features__card, .about__content, .contact__content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (element.classList.contains('features__card')) {
                    const delay = element.dataset.aosDelay ? parseInt(element.dataset.aosDelay) / 1000 : 0;
                    element.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`;
                    element.style.opacity = '1';
                    element.style.transform = 'perspective(500px) rotateX(0deg)';
                } else {
                    // Advanced zoom and slide animation
                    element.style.animation = 'zoomInSlide 0.8s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            }
        });
    };


    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'var(--shadow-small)';
        });
    });

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

    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);


    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg)';
        }, 100);
    }


    const socialLinks = document.querySelectorAll('.contact__social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1) rotate(5deg)';
            this.style.color = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.color = 'inherit';
        });
    });
});