// Theme management module

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.lightIcon = this.themeToggle.querySelector('.theme-toggle-light');
        this.darkIcon = this.themeToggle.querySelector('.theme-toggle-dark');
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setInitialTheme();
        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setInitialTheme() {
        const isDarkMode = localStorage.theme === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            this.lightIcon.classList.add('hidden');
            this.darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            this.darkIcon.classList.add('hidden');
            this.lightIcon.classList.remove('hidden');
        }
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        
        // Toggle icons
        this.lightIcon.classList.toggle('hidden');
        this.darkIcon.classList.toggle('hidden');
        
        // Add smooth transition effect
        document.documentElement.style.transition = 'background-color 0.3s ease';
        
        // Dispatch custom event for other components to react to theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
    }
}

export default ThemeManager;