document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error message
    errorMessage.textContent = '';

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Password match validation
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // If all validations pass
    errorMessage.style.color = 'green';
    errorMessage.textContent = 'Form submitted successfully!';
    console.log({
        firstName,
        lastName,
        email,
        password
    });
});
