document.addEventListener('DOMContentLoaded', function() {
    const howItWorksContainer = document.getElementById('how-it-works-container');
    
    if (howItWorksContainer) {
        
        fetch('features/how-it-works/how-it-works.html')
            .then(response => response.text())
            .then(html => {
                howItWorksContainer.innerHTML = html;
                
                
                animateSteps();
            })
            .catch(error => {
                console.error('Error loading How It Works section:', error);
            });
    }
});

function animateSteps() {
    
    const steps = document.querySelectorAll('.step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    steps.forEach(step => {
        step.style.opacity = 0;
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
}