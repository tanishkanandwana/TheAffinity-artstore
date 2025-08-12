const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  // create transporter - configure with your email service and credentials
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",      // example: Gmail SMTP
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // your email password or app password
    },
  });

  // send mail options
  let info = await transporter.sendMail({
    from: `"The Affinity" <${process.env.EMAIL_USER}>`, 
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
