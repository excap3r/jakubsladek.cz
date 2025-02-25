import './style.css';

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const lightIcon = themeToggle.querySelector('.theme-toggle-light');
const darkIcon = themeToggle.querySelector('.theme-toggle-dark');

// Check for saved theme preference, otherwise use system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.add('hidden');
    lightIcon.classList.remove('hidden');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    
    // Toggle icons
    lightIcon.classList.toggle('hidden');
    darkIcon.classList.toggle('hidden');
    
    // Add smooth transition effect
    document.documentElement.style.transition = 'background-color 0.3s ease';
});

// Smooth scroll for navigation links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // Added 20px extra padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});