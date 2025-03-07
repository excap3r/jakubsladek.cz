// Smooth scroll module
import Lenis from '@studio-freight/lenis';

class SmoothScroll {
    constructor() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 5),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 1.5,
            wheelMultiplier: 0.8,
            lerp: 0.08
        });

        this.viewWorkClickCount = 0;
        this.init();
    }

    init() {
        this.setupRAF();
        this.setupNavigationLinks();
    }

    setupRAF() {
        const raf = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }

    setupNavigationLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e, anchor));
        });
    }

    handleAnchorClick(e, anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');

        if (anchor.classList.contains('view-work-btn')) {
            this.handleViewWorkButton();
            return;
        }

        this.scrollToTarget(targetId);
    }

    handleViewWorkButton() {
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
        const headerHeight = document.querySelector('nav').offsetHeight;
        this.lenis.scrollTo(element, {
            offset: -headerHeight - 20,
            duration: 1.2
        });
    }
}

export default SmoothScroll;