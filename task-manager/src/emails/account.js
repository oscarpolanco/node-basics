const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Goal: Pull JWT secret and database URL into env vars
//
// 1. Create two new env vars: JWT_SECRET and MONGODB_URL
// 2. Setup values for each in the development env files
// 3. Swap out three hardcoded values
// 4. Test your work. Create new user and get their profile

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
}

// Goal: Send email to user on cancelation
//
// 1. Setup a new function for sending an email on cancelation
//  - email and name as args
// 2. Include their name in the email and ask why they canceled
// 3. Call it just after the account iis remove
// 4. Run the request and check your check your inbox!

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Sorry to see you go',
        text:  `Goodbye, ${name}. I hope to see you back soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
