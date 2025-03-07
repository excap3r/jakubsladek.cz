import './styles/main.css';
import './styles/stars.css';
import { initStarField } from './effects/starfield';
import ThemeManager from './modules/themeManager';
import SmoothScroll from './modules/smoothScroll';
import AnimationsManager from './modules/animations';

// Initialize star field in home section
const homeSection = document.getElementById('home');
let starField = null;

function updateStarField() {
    const starContainer = homeSection.querySelector('.absolute.inset-0');
    // Remove existing starfield if any
    if (starField) {
        starField.remove();
        starField = null;
    }
    // Create new starfield if in dark mode
    const newStarField = initStarField();
    if (newStarField) {
        starField = newStarField;
        starContainer.appendChild(starField);
    }
}

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme management
    new ThemeManager();

    // Initialize smooth scroll
    new SmoothScroll();

    // Initialize animations and interactive elements
    new AnimationsManager();

    // Initial starfield setup
    if (homeSection) {
        updateStarField();
        // Listen for theme changes
        document.addEventListener('themeChanged', updateStarField);
    }
});

// Add page transition effect
window.addEventListener('load', () => {
    console.log('Window load event triggered');
    document.body.style.opacity = '1';
    document.body.classList.add('page-transition', 'loaded');
});