require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const sendEmail = async (to, subject, templateName, templateData) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    const baseDir = path.join(__dirname, 'emailTemplates');
    // Read and render the EJS template
    const templatePath = `${baseDir}/${templateName}.ejs`;
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateData, { views: [baseDir] });

    // Setup email options
    const mailOptions = {
        from: `"Fancraze" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
};

module.exports = sendEmail;
