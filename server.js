const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter using your email service and credentials
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with your email provider
        auth: {
            user: 'your-email@gmail.com', // Replace with your email address
            pass: 'your-email-password' // Replace with your email password or app-specific password
        }
    });

    let mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Your email address to receive messages
        subject: `Contact Form Message from ${name}`,
        text: `You have received a new message from your website contact form.\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n\n` +
              `Message:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending message.');
        } else {
            console.log('Message sent: %s', info.messageId);
            res.status(200).send('Message sent successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
