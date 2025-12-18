// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
    return password.length >= 6;
};

// Form validation
export const validateLoginForm = (email, password) => {
    const errors = {};

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return errors;
};

export const validateRegisterForm = (name, email, password, confirmPassword) => {
    const errors = {};

    if (!name || name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

export const validateCheckoutForm = (formData) => {
    const errors = {};

    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.fullName = 'Full name is required';
    }

    if (!formData.address || formData.address.trim().length < 5) {
        errors.address = 'Address is required';
    }

    if (!formData.city || formData.city.trim().length < 2) {
        errors.city = 'City is required';
    }

    if (!formData.state || formData.state.trim().length < 2) {
        errors.state = 'State is required';
    }

    if (!formData.zipCode || formData.zipCode.trim().length < 5) {
        errors.zipCode = 'Valid zip code is required';
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
        errors.phone = 'Valid phone number is required';
    }

    return errors;
};
