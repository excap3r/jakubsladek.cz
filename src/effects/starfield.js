let starFieldElement = null;
let starContainer = null;

function createStarFieldElement() {
    const element = document.createElement('div');
    element.classList.add('star-field');
    element.style.display = 'none'; // Initially hidden

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
        element.appendChild(star);
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
        element.appendChild(meteor);
    });

    return element;
}

function ensureStarFieldExists(containerSelector = '#home .absolute.inset-0') {
    if (!starFieldElement) {
        starContainer = document.querySelector(containerSelector);
        if (starContainer) {
            starFieldElement = createStarFieldElement();
            starContainer.appendChild(starFieldElement);
        } else {
            console.error('Starfield container not found:', containerSelector);
        }
    }
    // Ensure it's appended if it was somehow removed but still exists
    else if (starContainer && starFieldElement.parentNode !== starContainer) {
         starContainer.appendChild(starFieldElement);
    }
}

function showStarField() {
    ensureStarFieldExists();
    if (starFieldElement) {
        starFieldElement.style.display = 'block';
    }
}

function hideStarField() {
    if (starFieldElement) {
        starFieldElement.style.display = 'none';
    }
}

// Optional: Function to completely remove the starfield if needed
function removeStarField() {
    if (starFieldElement && starFieldElement.parentNode) {
        starFieldElement.parentNode.removeChild(starFieldElement);
        starFieldElement = null;
        starContainer = null;
    }
}

export { showStarField, hideStarField, removeStarField };