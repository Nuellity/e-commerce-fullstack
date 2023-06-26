const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.error("Error verifying email server:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    // Send Email
    await new Promise((resolve, reject) => {
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.error("Error sending email:", err);
          reject(err);
        } else {
          console.log("Email sent successfully:", info.response);
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;

module.exports = sendEmail;
