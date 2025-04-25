import './styles/main.css';
import './styles/stars.css';
import ThemeManager from './modules/themeManager';
import { showStarField, hideStarField } from './effects/starfield.js';
// SEO is imported dynamically later to improve initial load time

// Initialize theme management early as it's critical for UX
const themeManager = new ThemeManager();

// Global reference for animations manager
let animationsManager = null;

// Function to update starfield visibility based on theme
function updateStarFieldVisibility() {
    if (document.documentElement.classList.contains('dark')) {
        showStarField();
    } else {
        hideStarField();
    }
}

// Lazy-load animations only when needed - optimized loading
const loadAnimations = () => {
    if (animationsManager) {
        return Promise.resolve(animationsManager);
    }
    
    return import(
      /* webpackChunkName: "animations" */
      './modules/animations.js'
    ).then(module => {
        const AnimationsManager = module.default;
        animationsManager = new AnimationsManager();
        return animationsManager;
    }).catch(error => {
        console.error('Error loading animations module:', error);
        return null;
    });
};

// Use requestIdleCallback to initialize non-critical features
function initializeWhenIdle() {
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    idleCallback(() => {
        // Initialize SEO functionality (lower priority)
        import('./modules/seo.js').then(module => {
            const SEO = module.default;
            new SEO();
        });
        
        // Load animations when the user has interacted with the page or after a timeout
        const handleInteraction = () => {
            loadAnimations();
            // Remove event listener after animations are loaded
            ['scroll', 'click', 'keydown'].forEach(event => {
                window.removeEventListener(event, handleInteraction);
            });
        };
        
        // Load animations on user interaction or after timeout
        ['scroll', 'click', 'keydown'].forEach(event => {
            window.addEventListener(event, handleInteraction, { passive: true });
        });
        setTimeout(handleInteraction, 3000);
    });
}

// Initialize essential features when DOM is ready, using faster listener method
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
} else {
    onDocumentReady();
}

function onDocumentReady() {
    // Initial starfield setup (important for dark mode)
    updateStarFieldVisibility(); // Call initially to show/hide based on current theme
    
    // Listen for theme changes
    document.addEventListener('themeChanged', updateStarFieldVisibility);
    
    // Initialize non-critical features when browser is idle
    initializeWhenIdle();
}

// Add page transition effect
window.addEventListener('load', () => {
    // Use class toggling instead of direct DOM manipulation
    document.body.classList.add('page-transition', 'loaded');
});

// Add support for native lazy-loading images
if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    // Load a small lazy-loading library only if needed
    import(
      /* webpackChunkName: "lazyload" */
      './utils/lazyload-polyfill.js'
    ).catch(error => 
        console.warn('Could not load lazy loading polyfill:', error)
    );
}

// Cleanup function to prevent memory leaks
window.addEventListener('beforeunload', () => {
    if (animationsManager && typeof animationsManager.cleanup === 'function') {
        animationsManager.cleanup();
    }
});
