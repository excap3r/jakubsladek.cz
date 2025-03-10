// Animations and typewriter effect module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class AnimationsManager {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
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
        element.innerHTML = '';
        element.classList.add('typing');
        
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.innerHTML = '|';
        element.appendChild(cursor);
        
        let charIndex = 0;
        const typeSpeed = 50;
        
        const typeCharacter = () => {
            if (charIndex < text.length) {
                const currentText = text.substring(0, charIndex + 1);
                element.innerHTML = '';
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = currentText;

                while (tempDiv.firstChild) {
                    element.appendChild(tempDiv.firstChild);
                }
                if (charIndex < text.length - 1) {
                    element.appendChild(cursor);
                }
                charIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else {
                cursor.remove();
            }
        };
        
        setTimeout(typeCharacter, 200);
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => element.classList.add('animated')
            });
        });
    }

    setupPageTransitions() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            document.body.classList.add('page-transition', 'loaded');
        });
    }

    setupInteractiveElements() {
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
            });
        });
    }
}

export default AnimationsManager;