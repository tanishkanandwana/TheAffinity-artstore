const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // create transporter - configure with your email service and credentials
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",   // Gmail SMTP
      port: 465,                // port 465 requires secure: true
      secure: true,             // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password or app password
      },
      debug: true,  // enable debug output
      logger: true, // log info to console
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
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // re-throw error for upstream handling if needed
  }
};

module.exports = sendEmail;


