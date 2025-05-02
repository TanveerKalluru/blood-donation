/**
 * Request Form Component
 */
document.addEventListener('componentLoaded', function(event) {
    if (event.detail.containerId === 'request-form-container') {
        initRequestForm();
    }
});

// Check if already initialized to prevent double initialization
let isRequestFormInitialized = false;

function initRequestForm() {
    // Avoid double initialization
    if (isRequestFormInitialized) {
        return;
    }
    
    // Get the form element
    const form = document.getElementById('blood-request-form');
    
    if (form) {
        // Add submit event listener
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmission(form);
        });
    } else {
        console.error('Blood request form not found in the DOM');
        return; // Exit if form not found
    }
    
    // Initialize date picker for availability check
    initDatePicker();
    
    // Add input validation
    addInputValidation();
    
    // Mark as initialized
    isRequestFormInitialized = true;
    
    // Add debug logging in development only
    if (process.env.NODE_ENV !== 'production') {
        console.log('Request form initialized successfully');
    }
}

function handleFormSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const formDataObj = {};
    
    // Convert FormData to regular object
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });
    
    // Validate form data
    if (validateFormData(formDataObj)) {
        // Display success message
        showSubmissionMessage(true, "Your request has been submitted successfully!");
        
        // Dispatch custom event with form data
        const formSubmitEvent = new CustomEvent('formSubmitted', {
            detail: formDataObj
        });
        document.dispatchEvent(formSubmitEvent);
        
        // Reset form
        form.reset();
    } else {
        // Display error message
        showSubmissionMessage(false, "Please check your information and try again.");
    }
}

function validateFormData(data) {
    // Create an array of validation errors
    const errors = [];
    
    // Basic validation
    if (!data.fullName || data.fullName.trim() === '') {
        errors.push('Full name is required');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Valid phone number is required');
    }
    
    if (!data.unitsNeeded || isNaN(data.unitsNeeded) || data.unitsNeeded < 1) {
        errors.push('Number of units needed must be 1 or more');
    }
    
    // Check if we have any errors
    if (errors.length > 0) {
        // In development, log the specific errors
        if (process.env.NODE_ENV !== 'production') {
            console.error('Form validation errors:', errors);
        }
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation (adjust for your country format)
    // This accepts various formats but requires at least 10 digits
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phoneDigits);
}

function showSubmissionMessage(isSuccess, message) {
    // Check if message element already exists
    let messageElement = document.querySelector('.submission-message');
    
    // If not, create it
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'submission-message';
        const form = document.getElementById('blood-request-form');
        
        if (form && form.parentNode) {
            form.parentNode.insertBefore(messageElement, form.nextSibling);
        } else {
            // Fallback if form not found or has no parent
            console.error('Cannot find form to append message');
            return;
        }
    }
    
    // Set message content and style
    messageElement.textContent = message;
    messageElement.className = isSuccess ? 
        'submission-message success-message' : 
        'submission-message error-message';
    
    // Show message
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

function initDatePicker() {
    const datePicker = document.getElementById('availability-date');
    
    if (datePicker) {
        // Set min date to today
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        datePicker.min = `${year}-${month}-${day}`;
        
        // Set max date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxYear = maxDate.getFullYear();
        const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxDay = String(maxDate.getDate()).padStart(2, '0');
        datePicker.max = `${maxYear}-${maxMonth}-${maxDay}`;
        
        // Add change event listener
        datePicker.addEventListener('change', function() {
            const selectedDate = this.value;
            // Only log in development
            if (process.env.NODE_ENV !== 'production') {
                console.log('Selected date:', selectedDate);
            }
            // Check availability for selected date
            checkAvailability(selectedDate);
        });
    } else {
        console.error('Date picker element not found');
    }
}

function checkAvailability(date) {
    // This would typically be an API call to check blood availability
    // For demo purposes, we'll just log a message in development
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Checking blood availability for ${date}`);
    }
    
    // Show loading message
    showAvailabilityMessage('loading', 'Checking availability...');
    
    // Simulate API response
    setTimeout(() => {
        const isAvailable = Math.random() > 0.3; // 70% chance of availability
        showAvailabilityMessage(isAvailable ? 'available' : 'unavailable', date);
    }, 1000);
}

function showAvailabilityMessage(status, date) {
    // Format date for display if it's a date string
    let displayDate = date;
    if (status !== 'loading' && typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        displayDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Create or get message element
    let messageElement = document.querySelector('.availability-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'availability-message';
        const datePickerSection = document.querySelector('.date-picker');
        
        if (datePickerSection) {
            datePickerSection.appendChild(messageElement);
        } else {
            console.error('Date picker section not found');
            return;
        }
    }
    
    // Set message content
    switch (status) {
        case 'loading':
            messageElement.textContent = 'Checking availability...';
            messageElement.className = 'availability-message';
            break;
        case 'available':
            messageElement.textContent = `Blood is available on ${displayDate}. Please proceed with your request.`;
            messageElement.className = 'availability-message available';
            break;
        case 'unavailable':
            messageElement.textContent = `Sorry, blood is not available on ${displayDate}. Please select another date.`;
            messageElement.className = 'availability-message unavailable';
            break;
        default:
            console.error('Unknown availability status:', status);
            return;
    }
    
    // Show message
    messageElement.style.display = 'block';
}

function addInputValidation() {
    // Add real-time validation to inputs
    const inputs = document.querySelectorAll('.request-form input, .request-form select');
    
    if (inputs.length === 0) {
        console.error('No form inputs found for validation');
        return;
    }
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

function validateInput(input) {
    // Skip validation if input is empty (will be caught on submit)
    if (!input.value.trim()) {
        input.classList.remove('invalid');
        return;
    }
    
    let isValid = true;
    
    // Different validation for different input types
    switch(input.name) {
        case 'email':
            isValid = isValidEmail(input.value);
            break;
        case 'phone':
            isValid = isValidPhone(input.value);
            break;
        case 'unitsNeeded':
            isValid = !isNaN(input.value) && input.value > 0 && input.value <= 10;
            break;
        default:
            // Default validation for other fields - just check it's not empty
            isValid = input.value.trim() !== '';
    }
    
    // Add or remove validation classes
    if (isValid) {
        input.classList.remove('invalid');
    } else {
        input.classList.add('invalid');
    }
}

// For non-browser environments or when process.env is not available
if (typeof process === 'undefined' || !process.env) {
    process = { env: { NODE_ENV: 'development' } };
}