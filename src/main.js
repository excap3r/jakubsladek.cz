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
    
    // Setup direct scroll handling for navigation links
    setupDirectScrolling();

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

// Function to handle direct scrolling to sections addressing the root cause of scroll issues
function setupDirectScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            
            // Handle case when targetId is just '#'
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'instant'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Force layout calculations to complete before scrolling
            // This ensures all animations and layout changes are applied
            // before we calculate the scroll position
            document.body.offsetHeight;
            
            // Get accurate measurements after layout is stable
            const headerHeight = document.querySelector('nav')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight - 16; // Extra space
            
            // Prevent any in-progress animations from affecting scroll position
            const animatingElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2');
            animatingElements.forEach(el => {
                // Temporarily pause animations
                el.style.animationPlayState = 'paused';
            });
            
            // Scroll directly to the position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'instant'
            });
            
            // Resume animations after scroll is complete
            requestAnimationFrame(() => {
                animatingElements.forEach(el => {
                    el.style.animationPlayState = '';
                });
            });
        });
    });
}