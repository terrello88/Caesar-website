const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const data = JSON.parse(event.body);
  const { name, email, message } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: '8035876473',
      pass: 'tD9q EnBH h80K' // replace this with your actual Zoho app password
    }
  });

  try {
    // Email to Caesar Blue Pools (admin notification)
    await transporter.sendMail({
      from: 'management@caesarpool.com',
      to: 'management@caesarpool.com',
      subject: `New Inquiry from ${name}`,
      text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    // Auto-reply to customer with logo
    await transporter.sendMail({
      from: 'management@caesarpool.com',
      to: email,
      subject: 'Thanks for contacting Caesar Blue Pools!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <img src="https://caesarpool.com/img_4458.jpeg" alt="Caesar Blue Pools Logo" style="max-width: 200px; margin: 20px auto; display: block;" />
          <h2 style="color: #008cba;">Hi ${name},</h2>
          <p>Thanks for reaching out to <strong>Caesar Blue Pools</strong>.</p>
          <p>We’ve received your message and will get back with you within 48 hours.</p>
          <p style="margin-top: 30px;">Thanks again,<br><strong>Caesar Blue Pools Mgmt</strong></p>
          <hr style="margin-top: 40px;" />
          <p style="font-size: 0.9em; color: #777;">This is an automated email. Please do not reply.</p>
        </div>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send emails' })
    };
  }
};