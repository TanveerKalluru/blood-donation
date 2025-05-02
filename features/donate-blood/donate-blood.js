document.addEventListener('DOMContentLoaded', function() {
    const donateBloodContainer = document.getElementById('donate-blood-container');
    
    if (donateBloodContainer) {
        
        fetch('features/donate-blood/donate-blood.html')
            .then(response => response.text())
            .then(html => {
                donateBloodContainer.innerHTML = html;
                
                
                initEligibilityChecker();
                
                initBloodTypeCards();
            })
            .catch(error => {
                console.error('Error loading Donate Blood section:', error);
            });
    }
});

function initEligibilityChecker() {
    const checkButton = document.getElementById('check-eligibility');
    
    if (!checkButton) return;
    
    checkButton.addEventListener('click', function() {
        
        const age = document.querySelector('input[name="age"]:checked')?.value || '';
        const weight = document.querySelector('input[name="weight"]:checked')?.value || '';
        const health = document.querySelector('input[name="health"]:checked')?.value || '';
        const lastDonation = document.querySelector('input[name="lastDonation"]:checked')?.value || '';
        
        
        if (!age || !weight || !health || !lastDonation) {
            showEligibilityResult(false, 'Please answer all questions to check your eligibility.');
            return;
        }
        
        
        const isEligible = age === 'yes' && weight === 'yes' && health === 'yes' && 
                         (lastDonation === 'yes' || lastDonation === 'firstTime');
        
        if (isEligible) {
            showEligibilityResult(true, `
                <h4>Great news! You appear to be eligible to donate blood.</h4>
                <p>Remember, this is just a preliminary check. The donation center will perform a more thorough health screening before your donation.</p>
                <a href="#request-form-container" class="cta-button">Schedule Your Donation</a>
            `);
        } else {
            let message = `
                <h4>Based on your answers, you may not be eligible to donate at this time.</h4>
                <p>Common reasons for ineligibility include:</p>
                <ul>
            `;
            
            if (age === 'no') message += '<li>Age requirement not met (must be 17-65 years old)</li>';
            if (weight === 'no') message += '<li>Weight requirement not met (must be at least 110 lbs/50kg)</li>';
            if (health === 'no') message += '<li>Current health condition</li>';
            if (lastDonation === 'no') message += '<li>Insufficient time since last donation (need to wait 8 weeks)</li>';
            
            message += `
                </ul>
                <p>If you have questions about your eligibility, please contact our donor helpline.</p>
            `;
            
            showEligibilityResult(false, message);
        }
    });
}

function showEligibilityResult(isEligible, message) {
    const resultElement = document.getElementById('eligibility-result');
    
    if (resultElement) {
        resultElement.innerHTML = message;
        resultElement.className = isEligible 
            ? 'eligibility-result eligible' 
            : 'eligibility-result not-eligible';
    }
}

function initBloodTypeCards() {
    const bloodTypeCards = document.querySelectorAll('.blood-type-card');
    
    bloodTypeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}