import './styles/main.css';
import './styles/stars.css';
import { initStarField } from './effects/starfield';
import ThemeManager from './modules/themeManager';
import AnimationsManager from './modules/animations';

// Initialize star field in home section
const homeSection = document.getElementById('home');
let starField = null;

function updateStarField() {
    // Error handling for DOM element selection
    if (!homeSection) {
        console.error('Home section not found');
        return;
    }
    
    const starContainer = homeSection.querySelector('.absolute.inset-0');
    if (!starContainer) {
        console.error('Star container not found in home section');
        return;
    }
    
    // Toggle visibility instead of recreating elements
    if (document.documentElement.classList.contains('dark')) {
        // Create starfield if it doesn't exist yet
        if (!starField) {
            const newStarField = initStarField();
            if (newStarField) {
                starField = newStarField;
                starContainer.appendChild(starField);
            }
        } else if (starField.parentNode !== starContainer) {
            // Re-append if it exists but was removed
            starContainer.appendChild(starField);
        }
        // Make sure it's visible
        if (starField) {
            starField.style.display = 'block';
        }
    } else if (starField) {
        // Hide starfield in light mode instead of removing
        starField.style.display = 'none';
    }
}

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme management
    new ThemeManager();
    
    // Initialize animations and interactive elements
    new AnimationsManager();

    // Initial starfield setup
    if (homeSection) {
        updateStarField();
        // Listen for theme changes
        document.addEventListener('themeChanged', updateStarField);
    } else {
        console.error('Home section not found, starfield initialization skipped');
    }
});

// Add page transition effect
window.addEventListener('load', () => {
    // Use class toggling instead of direct DOM manipulation
    document.body.classList.add('page-transition', 'loaded');
});
