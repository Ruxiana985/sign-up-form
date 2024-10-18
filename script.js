// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector("#phone-number");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto", // Automatically select the user's country based on their IP address
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io?token=YOUR_TOKEN_HERE') // Replace 'YOUR_TOKEN_HERE' with your API token from ipinfo.io
                .then(response => response.json())
                .then(data => callback(data.country.toLowerCase()))
                .catch(() => callback('us')); // Fallback country if detection fails
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // For formatting/validation
    });

    // Selecting the password and confirmation fields
    const password = document.getElementById('password');
    const confirmation = document.getElementById('confirmation');
    const forms1 = document.querySelector('.form-group3');
    const forms2 = document.querySelector('.form-group2');

    function passwordMessage() {
        // Clear previous messages if they exist
        const existingMessages = forms2.querySelectorAll('.password-message');
        existingMessages.forEach(message => message.remove());

        // Array of password requirements
        const requirements = [
            "Must contain letters",
            "Must contain at least one uppercase letter",
            "Must contain at least one number",
            "Must contain at least one special character"
        ];

        // Create and append each message
        requirements.forEach(req => {
            const passMessage = document.createElement('div');
            passMessage.classList.add('password-message'); // Add a class for styling or future reference
            passMessage.innerHTML = `<p><span style="color: red; font-size: 1.3rem;">x</span> ${req}</p>`;
            forms2.appendChild(passMessage);
        });
    }

    // Add event listener to the password input
    password.addEventListener('mouseenter', passwordMessage);

    // Function to check if passwords match
    function validatePasswords() {
        if (confirmation.value !== password.value) {
            const message = document.createElement('div');
            message.classList.add('password-error'); // Add a class for styling or future reference
            forms1.appendChild(message);
            message.style.marginTop = "20px";
            message.style.color="red";
            message.textContent = "Passwords don't match!";
            
            return false; // Prevents form submission
        }
        return true; // Allows form submission if passwords match
    }

    // Add an event listener to the form submit button
    const form = document.querySelector('form');
    let count=0;
    form.addEventListener('submit', function (e) {

        if (!validatePasswords()) {
            
            e.preventDefault(); // Prevents form submission if passwords don't match
        }
    });
});
