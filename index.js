import { resolveInclude } from "ejs";
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import "dotenv/config"

const app = express();
const port = 3000;
const email = process.env.EMAIL;

let active = 1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function sendEmail(to, subject, body) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: email, pass: process.env.PASSWORD }
  });
  
  var mailOptions = {
    from: email, to: to,
    subject: subject, text: body
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return [true, null];
  } catch (error) {
    return [false, error];
  }
};

app.get("/", (req, res) => {
  res.render("about.ejs", { active: 1 });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { active: 1 });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { active: 2 });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { active: 3 });
});

app.post("/email", async (req, res) => {
  var [success, error] = await sendEmail(
    email, 
    "Message From Your Portfolio", 
    `Name: ${req.body.name} \nEmail Address: ${req.body.email} \nMessage: ${req.body.text}`
  );
  res.render("email-sent.ejs", {sent: success, error: error});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
