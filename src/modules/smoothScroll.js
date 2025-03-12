// Smooth scroll module
import Lenis from '@studio-freight/lenis';

class SmoothScroll {
    constructor() {
        this.lenis = new Lenis({
            duration: 1.0,
            easing: (t) => 1 - Math.pow(1 - t, 5),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false, // Disable smooth touch for better performance on mobile
            touchMultiplier: 1.5,
            wheelMultiplier: 0.6, // Reduced multiplier for smoother scrolling
            lerp: 0.05 // Lower lerp value for smoother interpolation
        });

        this.viewWorkClickCount = 0;
        this.animationFrameId = null;
        this.boundHandleAnchorClick = this.handleAnchorClick.bind(this);
        this.init();
    }

    init() {
        this.setupRAF();
        this.setupNavigationLinks();
    }

    setupRAF() {
        const raf = (time) => {
            this.lenis.raf(time);
            this.animationFrameId = requestAnimationFrame(raf);
        };
        this.animationFrameId = requestAnimationFrame(raf);
    }

    setupNavigationLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.boundHandleAnchorClick);
        });
    }

    handleAnchorClick(e) {
        e.preventDefault();
        const anchor = e.currentTarget;
        const targetId = anchor.getAttribute('href');

        if (anchor.classList.contains('view-work-btn')) {
            this.handleViewWorkButton();
            return;
        }

        this.scrollToTarget(targetId);
    }

    handleViewWorkButton() {
        // Reset counter if it exceeds a reasonable value
        if (this.viewWorkClickCount >= 2) {
            this.viewWorkClickCount = 0;
        }
        
        this.viewWorkClickCount++;
        const targetElement = this.viewWorkClickCount === 1 ?
            document.querySelector('#skills') :
            document.querySelector('#projects');

        if (targetElement) {
            this.scrollToElement(targetElement);
        }
    }

    scrollToTarget(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            this.scrollToElement(targetElement);
        }
    }

    scrollToElement(element) {
        const headerElement = document.querySelector('nav');
        if (!headerElement) {
            console.error('Navigation element not found');
            return;
        }
        
        const headerHeight = headerElement.offsetHeight;
        this.lenis.scrollTo(element, {
            offset: -headerHeight - 20,
            duration: 1.2
        });
    }
    
    // Cleanup method to prevent memory leaks and stop animation frames
    cleanup() {
        // Cancel the animation frame
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // Remove event listeners
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.removeEventListener('click', this.boundHandleAnchorClick);
        });
        
        // Destroy Lenis instance if it exists
        if (this.lenis) {
            this.lenis.destroy();
            this.lenis = null;
        }
    }
}

export default SmoothScroll;