const nodemailer = require('nodemailer');

// Create transporter using Gmail + App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email server error:', error);
    } else {
        console.log('✅ Email server ready');
    }
});


// Common send email function
const sendEmail = async (to, subject, text, html) => {
    console.log("🔥 sendEmail function called");

    try {
        const info = await transporter.sendMail({
            from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log(`✅ Email sent successfully: ${info.messageId}`);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};

// Registration Email
const sendRegistrationEmail = async (userEmail, name) => {
    const subject = 'Welcome to Backend Ledger!';
    const text = `Hello ${name}, Thank you for registering.`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering.</p>`;

    await sendEmail(userEmail, subject, text, html);
};

// Success Email
const sendTransactionEmail = async (userEmail, name, amount, toAccount) => {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name}, Transaction of ₹${amount} to ${toAccount} successful.`;
    const html = `<p>Hello ${name},</p><p>Transaction of <b>₹${amount}</b> to <b>${toAccount}</b> successful.</p>`;

    await sendEmail(userEmail, subject, text, html);
};

// Failure Email
const sendTransactionFailureEmail = async (userEmail, name, amount, toAccount) => {
    const subject = 'Transaction Failed';
    const text = `Hello ${name}, Transaction of ₹${amount} failed.`;
    const html = `<p>Hello ${name},</p><p>Transaction of <b>₹${amount}</b> to <b>${toAccount}</b> failed.</p>`;

    await sendEmail(userEmail, subject, text, html);
};

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail,
};