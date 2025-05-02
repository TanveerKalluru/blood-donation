document.addEventListener('DOMContentLoaded', function() {
    const aboutContainer = document.getElementById('about-container');
    
    if (aboutContainer) {
        
        fetch('features/about/about.html')
            .then(response => response.text())
            .then(html => {
                aboutContainer.innerHTML = html;
                
                
                initCounters();
            })
            .catch(error => {
                console.error('Error loading About section:', error);
            });
    }
});

function initCounters() {
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        
        const targetValue = stat.textContent;
        stat.setAttribute('data-target', targetValue);
        stat.textContent = '0';
        
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const target = element.getAttribute('data-target');
    
    const numericTarget = parseInt(target.replace(/\D/g, ''));
    const suffix = target.replace(/[0-9]/g, '');
    const duration = 2000;
    const start = 0;
    const increment = numericTarget / (duration / 16);
    
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericTarget) {
            clearInterval(timer);
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}