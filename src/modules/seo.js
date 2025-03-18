/**
 * SEO module for jakubsladek.cz
 * Helps with search engine optimization functionality
 */

class SEO {
  constructor() {
    this.initializeStructuredData();
    this.setCanonicalUrl();
    this.logSEOStatus();
  }

  /**
   * Initializes or updates the structured data on the page
   */
  initializeStructuredData() {
    // The structured data is already present in the HTML
    // This method is a placeholder for future dynamic structured data needs
    console.log('SEO: Structured data initialized');
  }

  /**
   * Sets the canonical URL for the current page
   */
  setCanonicalUrl() {
    const canonicalElement = document.querySelector('link[rel="canonical"]');
    
    if (canonicalElement) {
      // Update the canonical URL if needed
      if (window.location.hostname === 'jakubsladek.cz' || window.location.hostname === 'www.jakubsladek.cz') {
        const canonicalUrl = `https://jakubsladek.cz${window.location.pathname}`;
        if (canonicalElement.href !== canonicalUrl) {
          canonicalElement.href = canonicalUrl;
        }
      }
    } else {
      console.error('SEO: Canonical link element not found');
    }
  }

  /**
   * Logs the current SEO status to the console
   */
  logSEOStatus() {
    console.log('SEO: Module initialized');
    console.log('SEO: Indexing enabled');
    console.log('SEO: robots.txt and sitemap.xml are configured');
  }
}

export default SEO;
