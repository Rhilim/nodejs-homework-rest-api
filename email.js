require("dotenv").config();
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const message = {
  to: "arhilim@gmail.com",
  from: "arhilim@gmail.com",
  subject: "Hello from NodeJS",
  html: "<h1>NodeJS - I like it</h1>",
  text: "NodeJS - I like it",
};

transport
  .sendMail(message)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
