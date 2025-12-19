/**
 * Main JavaScript file for Blood Donation Website
 * Initializes all components and establishes communication between them
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeComponents();
    
    // Set up event listeners for inter-component communication
    setupEventListeners();
});

/**
 * Initialize all components by loading their HTML content
 */
function initializeComponents() {
    // Load component HTML into their respective containers
    loadComponent('navbar-container', 'features/navbar/navbar.html');
    loadComponent('hero-container', 'features/hero/hero.html');
    loadComponent('info-cards-container', 'features/info-cards/info-cards.html');
    loadComponent('request-form-container', 'features/request-form/request-form.html');
    loadComponent('find-location-container', 'features/find-location/find-location.html');
    loadComponent('testimonials-container', 'features/testimonials/testimonials.html');
    loadComponent('footer-container', 'features/footer/footer.html');
}

/**
 * Load component HTML from file and inject it into container
 * @param {string} containerId - ID of the container element
 * @param {string} filePath - Path to the HTML file
 */
function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            // Dispatch event to notify that component has been loaded
            const event = new CustomEvent('componentLoaded', { 
                detail: { containerId, filePath } 
            });
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error(`Error loading component from ${filePath}:`, error);
            container.innerHTML = `<div class="error-message">Failed to load component. Please refresh the page.</div>`;
        });
}

/**
 * Set up event listeners for inter-component communication
 */
function setupEventListeners() {
    // Example: Navigate to request form when "Get Started" button is clicked
    document.addEventListener('navigateToRequestForm', function() {
        document.getElementById('request-form-container').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Listen for form submission events
    document.addEventListener('formSubmitted', function(event) {
        const formData = event.detail;
        console.log('Form submitted with data:', formData);
        // Here you could send the data to a server or handle it in another way
    });
    
    // Listen for location search events
    document.addEventListener('locationSearched', function(event) {
        const zipCode = event.detail.zipCode;
        console.log('Searching for donation centers near:', zipCode);
        // Here you would typically fetch location data from a server
    });
}
