
document.addEventListener('DOMContentLoaded', function() {
    initInfoCards();
});

function initInfoCards() {
    
    const infoCards = document.querySelectorAll('.info-card');
    
   
    infoCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.getAttribute('data-card');
            handleCardClick(cardType);
        });
    });
    
    
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    
    animateInfoCards();
}

function handleCardClick(cardType) {
    
    const modalId = `${cardType}-modal`;
    const modal = document.getElementById(modalId);
    
    if (modal) {
        showModal(modal);
    } else {
        console.error(`Modal with ID ${modalId} not found`);
    }
}

function showModal(modalElement) {
    
    if (typeof modalElement === 'string') {
        modalElement = document.getElementById(modalElement);
    }
    
    if (modalElement) {
        modalElement.style.display = 'block';
        
        window.addEventListener('click', function closeOnOutsideClick(event) {
            if (event.target === modalElement) {
                hideModal(modalElement);
                window.removeEventListener('click', closeOnOutsideClick);
            }
        });
    }
}

function hideModal(modalElement) {
    
    if (typeof modalElement === 'string') {
        modalElement = document.getElementById(modalElement);
    }
    
    if (modalElement) {
        modalElement.style.display = 'none';
    }
}

function animateInfoCards() {
    
    const cards = document.querySelectorAll('.info-card');
    
    cards.forEach((card, index) => {
        
        card.classList.add('card-hidden');
        
        
        setTimeout(() => {
            card.classList.add('card-visible');
        }, 200 + (index * 150)); 
    });
}