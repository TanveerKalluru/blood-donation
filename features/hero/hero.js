
document.addEventListener('componentLoaded', function(event) {
    if (event.detail.containerId === 'hero-container') {
        initHero();
    }
});

function initHero() {
    
    const getStartedBtn = document.getElementById('get-started-btn');
    
    if (getStartedBtn) {
        
        getStartedBtn.addEventListener('click', function() {
            
            const navigateEvent = new CustomEvent('navigateToRequestForm');
            document.dispatchEvent(navigateEvent);
        });
    }
    
    
    animateHeroContent();
}

function animateHeroContent() {
   
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
}