const sendEmail = require('../emailService');

(async () => {
    try {
        await sendEmail(
            'omkar@fancraze.com', // Replace with recipient's email
            'Test Email',
            'email', // Name of the EJS template without extension
            { name: 'John Doe' } // Data to be injected into the template
        );
    } catch (error) {
        console.error('Error sending email:', error);
    }
})();
