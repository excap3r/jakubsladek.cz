// Animations and typewriter effect module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class AnimationsManager {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        this.observers = [];
        this.scrollTriggers = [];
        this.loadEventListener = null;
        this.init();
    }

    init() {
        this.setupTypewriterEffect();
        this.setupScrollAnimations();
        this.setupPageTransitions();
    }

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typing')) {
                    this.handleTypewriterElement(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        typewriterElements.forEach(element => observer.observe(element));
        
        // Store observer for cleanup
        this.observers.push(observer);
    }

    handleTypewriterElement(element) {
        const text = element.getAttribute('data-text');
        const isMotto = element.classList.contains('italic');
        
        if (isMotto) {
            this.applyTypewriterEffect(element, text);
        } else {
            element.innerHTML = text;
            element.classList.add('typing');
        }
    }

    applyTypewriterEffect(element, text) {
        // Prevent repeated DOM element creation by checking if already typing
        if (element.classList.contains('typing-in-progress')) {
            return;
        }
        
        element.innerHTML = '';
        element.classList.add('typing', 'typing-in-progress');
        
        // Create cursor element only once
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.innerHTML = '|';
        element.appendChild(cursor);
        
        let charIndex = 0;
        const typeSpeed = 50;
        
        const typeCharacter = () => {
            if (charIndex < text.length) {
                // Optimize by updating text content directly instead of recreating DOM elements
                const currentText = text.substring(0, charIndex + 1);
                cursor.remove(); // Temporarily remove cursor
                element.textContent = currentText; // Set text directly
                element.appendChild(cursor); // Re-add cursor at the end
                
                charIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else {
                cursor.remove();
                element.classList.remove('typing-in-progress');
            }
        };
        
        setTimeout(typeCharacter, 200);
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            const trigger = ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => element.classList.add('animated')
            });
            
            // Store ScrollTrigger instances for cleanup
            this.scrollTriggers.push(trigger);
        });
    }

    setupPageTransitions() {
        this.loadEventListener = () => {
            document.body.classList.add('page-transition', 'loaded');
        };
        
        window.addEventListener('load', this.loadEventListener);
    }

    // Cleanup method to prevent memory leaks
    cleanup() {
        // Kill all ScrollTrigger instances
        this.scrollTriggers.forEach(trigger => {
            trigger.kill();
        });
        this.scrollTriggers = [];
        
        // Disconnect all IntersectionObserver instances
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
        
        // Remove event listeners
        if (this.loadEventListener) {
            window.removeEventListener('load', this.loadEventListener);
            this.loadEventListener = null;
        }
    }
}

export default AnimationsManager;