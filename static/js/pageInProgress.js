
function home() {
    window.location.href = "home.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }

    const heading = document.querySelector('h1');
    heading.addEventListener('mouseover', function() {
        this.style.color = getRandomBlueShade();
    });

    heading.addEventListener('mouseout', function() {
        this.style.color = '#3498db';
        this.style.transition = 'color 1s ease';
    });

    const comingSoon = document.querySelector('.coming-soon');
    let percentage = 0;

    const progressInterval = setInterval(() => {
        percentage++;
        if (percentage <= 99) {
            comingSoon.textContent = `Coming Soon: ${percentage}% Complete`;
        } else {
            clearInterval(progressInterval);
            comingSoon.textContent = `Coming Soon: 99% Complete`;
        }
    }, 100);
});

function createParticle(container) {
    const particle = document.createElement('div');

    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 10 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = getRandomBlueShade(0.3);
    particle.style.borderRadius = '50%';

    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;

    const duration = Math.random() * 20 + 10;
    const xMovement = Math.random() * 50 - 25;
    const yMovement = Math.random() * 50 - 25;

    particle.style.transition = `transform ${duration}s linear, opacity 1s ease`;
    particle.style.opacity = '0';

    container.appendChild(particle);

    setTimeout(() => {
        particle.style.opacity = '0.6';
        particle.style.transform = `translate(${xMovement}vw, ${yMovement}vh) rotate(360deg)`;
    }, 10);

    setTimeout(() => {
        container.removeChild(particle);
        createParticle(container);
    }, duration * 1000);
}

function getRandomBlueShade(opacity = 1) {
    const blueShades = [
        '#3498db',
        '#2980b9',
        '#64a7e0',
        '#1f618d',
        '#5dade2'
    ];

    const selectedColor = blueShades[Math.floor(Math.random() * blueShades.length)];

    const r = parseInt(selectedColor.slice(1, 3), 16);
    const g = parseInt(selectedColor.slice(3, 5), 16);
    const b = parseInt(selectedColor.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}