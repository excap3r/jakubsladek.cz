// Theme management module

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.lightIcon = this.themeToggle.querySelector('.theme-toggle-light');
        this.darkIcon = this.themeToggle.querySelector('.theme-toggle-dark');
        this.boundToggleTheme = this.toggleTheme.bind(this);
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setInitialTheme();
        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', this.boundToggleTheme);
        
        // Add transition class to document element for CSS-based transitions
        document.documentElement.classList.add('theme-transition');
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
        
        // Dispatch custom event for other components to react to theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
    }
    
    // Cleanup method to prevent memory leaks
    cleanup() {
        if (this.themeToggle) {
            this.themeToggle.removeEventListener('click', this.boundToggleTheme);
        }
    }
}

export default ThemeManager;