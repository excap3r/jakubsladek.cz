/**
 * Minimal lazy loading polyfill for browsers that don't support native lazy loading
 * Only loaded when needed via dynamic import
 */

export default function lazyLoadImages() {
  let lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute('data-src');
          imageObserver.unobserve(lazyImage);
        }
      });
    }, {
      rootMargin: '200px 0px' // Start loading 200px before the image is visible
    });

    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let active = false;

    const lazyLoad = () => {
      if (active === false) {
        active = true;

        setTimeout(() => {
          lazyImages.forEach(lazyImage => {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && 
                getComputedStyle(lazyImage).display !== 'none') {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');

              lazyImages = lazyImages.filter(image => image !== lazyImage);
              
              if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationchange', lazyLoad);
              }
            }
          });
          
          active = false;
        }, 200);
      }
    };

    document.addEventListener('scroll', lazyLoad, { passive: true });
    window.addEventListener('resize', lazyLoad, { passive: true });
    window.addEventListener('orientationchange', lazyLoad);
    lazyLoad(); // Initial load
  }
}

// Auto-initialize when imported
lazyLoadImages(); 