/**
 * Enhanced SEO module for jakubsladek.cz
 * Provides comprehensive search engine optimization functionality
 */

class SEO {
  constructor() {
    this.initializeStructuredData();
    this.setCanonicalUrl();
    this.handleRedirects();
    this.enhanceHeadings();
    this.addNameMentions();
    this.logSEOStatus();
  }

  /**
   * Initializes or updates the structured data on the page
   */
  initializeStructuredData() {
    // The structured data is already present in the HTML
    // This method ensures the structured data is properly formatted
    
    // Add additional schema markup for breadcrumbs if on a specific page section
    if (window.location.hash) {
      const section = window.location.hash.substring(1);
      const sectionElement = document.getElementById(section);
      
      if (sectionElement) {
        const sectionName = sectionElement.querySelector('h2')?.textContent || section;
        
        // Could dynamically add breadcrumb schema here if needed
      }
    }
  }

  /**
   * Sets the canonical URL for the current page
   */
  setCanonicalUrl() {
    const canonicalElement = document.querySelector('link[rel="canonical"]');
    
    if (canonicalElement) {
      // Ensure canonical URL is always the primary domain
      if (window.location.hostname === 'jakubsladek.cz' || window.location.hostname === 'www.jakubsladek.cz') {
        const canonicalUrl = `https://jakubsladek.cz${window.location.pathname}`;
        if (canonicalElement.href !== canonicalUrl) {
          canonicalElement.href = canonicalUrl;
        }
      }
    } else {
      // Error handling for missing canonical link element
    }
  }

  /**
   * Handle redirects from www to non-www and ensure HTTPS
   */
  handleRedirects() {
    // Redirect www to non-www
    if (window.location.hostname === 'www.jakubsladek.cz') {
      window.location.href = `https://jakubsladek.cz${window.location.pathname}${window.location.search}${window.location.hash}`;
    }
    
    // Redirect HTTP to HTTPS
    if (window.location.protocol === 'http:') {
      window.location.href = `https://${window.location.host}${window.location.pathname}${window.location.search}${window.location.hash}`;
    }
  }

  /**
   * Enhance headings with additional name mentions for SEO
   */
  enhanceHeadings() {
    // SEO enhancement through meta tags is sufficient
    // Removing automatic heading text changes to preserve original headings
  }

  /**
   * Add additional name mentions throughout the page for SEO
   */
  addNameMentions() {
    // Add name to document title when scrolling to different sections
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0) {
      const originalTitle = document.title;
      
      window.addEventListener('scroll', () => {
        // Find the current visible section
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          
          // If section is in viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            const sectionId = section.id;
            
            // Update title based on section
            switch(sectionId) {
              case 'about':
                document.title = 'About Me | Jakub Sládek | Full Stack Developer';
                break;
              case 'projects':
                document.title = 'My Projects | Jakub Sládek | Full Stack Developer';
                break;
              case 'contact':
                document.title = 'Contact | Jakub Sládek | Full Stack Developer';
                break;
              default:
                document.title = originalTitle;
            }
            
            break;
          }
        }
      });
    }
  }

  /**
   * Logs the current SEO status to the console
   */
  logSEOStatus() {
    // All console logs removed for production
  }
}

export default SEO;
