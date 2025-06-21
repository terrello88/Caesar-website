const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port:
