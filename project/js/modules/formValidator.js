/*document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.style.display = 'none');
    
    // Validate form
    let isValid = true;
    
    // First Name validation
    const firstName = document.getElementById('firstName');
    if (!firstName.value || firstName.value.length < 2) {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
    }
    
    // Last Name validation
    const lastName = document.getElementById('lastName');
    if (!lastName.value || lastName.value.length < 2) {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Address validation
    const street = document.getElementById('street');
    if (!street.value) {
        document.getElementById('streetError').style.display = 'block';
        isValid = false;
    }
    
    // City validation
    const city = document.getElementById('city');
    if (!city.value) {
        document.getElementById('cityError').style.display = 'block';
        isValid = false;
    }
    
    // State validation
    const state = document.getElementById('state');
    if (!state.value) {
        document.getElementById('stateError').style.display = 'block';
        isValid = false;
    }
    
    // Country validation
    const country = document.getElementById('country');
    if (!country.value) {
        document.getElementById('countryError').style.display = 'block';
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        // Here you would typically send the data to a server
        // For demo, we'll just reset the form after 3 seconds
        setTimeout(() => {
            this.reset();
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
});

// Real-time validation for better UX
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
        const errorElement = document.getElementById(`${this.id}Error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    });
});
*/
export class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.validateForm(e));
        this.form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const errorElement = document.getElementById(`${field.id}Error`);
        
        if (field.validity.valid) {
            errorElement.style.display = 'none';
            return true;
        } else {
            errorElement.style.display = 'block';
            return false;
        }
    }

    validateForm(e) {
        e.preventDefault();
        
        let isValid = true;
        this.form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.handleSuccess();
        }
    }

    handleSuccess() {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        this.form.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
}
