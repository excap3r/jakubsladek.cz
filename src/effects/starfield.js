function initStarField() {
    // Only create starfield if in dark mode
    if (!document.documentElement.classList.contains('dark')) {
        return null;
    }

    const starField = document.createElement('div');
    starField.classList.add('star-field');

    // Generate stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starField.appendChild(star);
    }

    // Generate meteors
    for (let i = 0; i < 10; i++) {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        meteor.style.top = `${Math.random() * -50}%`;
        meteor.style.left = `${Math.random() * 150}%`;
        meteor.style.animationDelay = `${Math.random() * 10}s`;
        starField.appendChild(meteor);
    }

    return starField;
}

export { initStarField };