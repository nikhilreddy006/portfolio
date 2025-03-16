// Initialize EmailJS
(function() {
    emailjs.init('6btR1A8FYnkYulXxc');
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const button = this.querySelector('button');
    
    // Validate inputs
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Nikhil' // Add recipient name
    };

    // Disable button and show loading state
    const originalText = button.innerText;
    button.innerText = 'Sending...';
    button.disabled = true;

    // Send email using EmailJS
    emailjs.send('service_6pngcle', 'template_z99xjcv', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
            this.reset();
        })
        .catch((error) => {
            console.error('FAILED...', error);
            alert('Failed to send message. Please try again or contact directly via email.');
        })
        .finally(() => {
            button.innerText = originalText;
            button.disabled = false;
        });
});
