function initStarField() {
    // Only create starfield if in dark mode
    if (!document.documentElement.classList.contains('dark')) {
        return null;
    }

    const starField = document.createElement('div');
    starField.classList.add('star-field');

    // Pre-calculate random values for better performance
    const randomPositions = Array.from({ length: 100 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5
    }));

    // Generate stars using pre-calculated values
    randomPositions.forEach(position => {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${position.top}%`;
        star.style.left = `${position.left}%`;
        star.style.animationDelay = `${position.delay}s`;
        starField.appendChild(star);
    });

    // Pre-calculate random values for meteors
    const meteorPositions = Array.from({ length: 10 }, () => ({
        top: Math.random() * -50,
        left: Math.random() * 150,
        delay: Math.random() * 10
    }));

    // Generate meteors using pre-calculated values
    meteorPositions.forEach(position => {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        meteor.style.top = `${position.top}%`;
        meteor.style.left = `${position.left}%`;
        meteor.style.animationDelay = `${position.delay}s`;
        starField.appendChild(meteor);
    });

    return starField;
}

export { initStarField };