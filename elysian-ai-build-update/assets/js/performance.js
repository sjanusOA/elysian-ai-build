/* Performance Optimization Script */
(function() {
    'use strict';
    
    // Enhanced image loading with lazy loading and optimization
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Optimize all images on page load
    function optimizeAllImages() {
        const images = document.querySelectorAll('img[src]');
        
        images.forEach(img => {
            // Add loading event listener
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            // Add error handling
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
            
            // If image is already loaded (cached), add loaded class immediately
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            }
        });
    }

    // Preload images that are likely to be viewed soon
    function preloadVisibleImages() {
        const images = document.querySelectorAll('img[src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Force load the image
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image comes into view
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'assets/images/portfolio/project1/hero-slide-1.jpg',
            'assets/images/elysian-logo-color.avif'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Optimize animations for better performance
    function optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.animation = 'none';
            });
        }
    }
    
    // Service Worker registration for caching
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    // Initialize all optimizations
    function init() {
        lazyLoadImages();
        optimizeAllImages();
        preloadVisibleImages();
        preloadCriticalImages();
        optimizeAnimations();
        registerServiceWorker();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
