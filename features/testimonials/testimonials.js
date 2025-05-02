/**
 * Testimonials Component
 */
document.addEventListener('componentLoaded', function(event) {
    if (event.detail.containerId === 'testimonials-container') {
        initTestimonials();
    }
});

// Global variables
let currentTestimonialIndex = 0;
let testimonials;
let dots;
let autoplayInterval;

function initTestimonials() {
    // Get testimonials and dots
    testimonials = document.querySelectorAll('.testimonial');
    dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;
    
    // Set first testimonial as active
    showTestimonial(0);
    
    // Add event listeners to controls
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigateTestimonial(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigateTestimonial(1);
        });
    }
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
    }
}

function showTestimonial(index) {
    // Remove active class from all testimonials and dots
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Set current index
    currentTestimonialIndex = index;
    
    // Add active class to current testimonial and dot
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
}

function navigateTestimonial(direction) {
    // Calculate new index
    let newIndex = currentTestimonialIndex + direction;
    
    // Handle index boundaries
    if (newIndex < 0) {
        newIndex = testimonials.length - 1;
    } else if (newIndex >= testimonials.length) {
        newIndex = 0;
    }
    
    // Show testimonial at new index
    showTestimonial(newIndex);
    
    // Reset autoplay
    if (autoplayInterval) {
        stopAutoplay();
        startAutoplay();
    }
}

function startAutoplay() {
    // Start autoplay with 5 second interval
    autoplayInterval = setInterval(() => {
        navigateTestimonial(1);
    }, 5000);
}

function stopAutoplay() {
    // Clear autoplay interval
    clearInterval(autoplayInterval);
    autoplayInterval = null;
}

// Add touch swipe capability for mobile devices
function setupSwipe() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance to be considered a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next
            navigateTestimonial(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous
            navigateTestimonial(-1);
        }
    }
}