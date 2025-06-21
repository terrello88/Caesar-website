const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "management@caesarpool.com",
        pass: process.env.ZOHO_PASS
      }
    });

    await transporter.sendMail({
      from: '"Website Contact" <management@caesarpool.com>',
      to: "management@caesarpool.com",
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent successfully!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email failed: " + error.message })
    };
  }
};