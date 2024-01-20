import { resolveInclude } from "ejs";
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import "dotenv/config"

const app = express();
const port = 3000;
const email = process.env.EMAIL;

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
  res.render("work.ejs", { active: 2, projects: projects });
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

const projects = [
  {
    name: "Codermint's Oasis", 
    desc: "It is a sleek and modern website that showcases my skills and expertise. The website features a brief description of my work as a developer and information about my skills in Python and web development, as well as my skills in app/game development and website development using HTML, CSS, and JavaScript. Overall, this website is a great example of a portfolio website that showcases my skills and expertise as a developer.",
    img: 'custom-ptfolio',
    add: '',
    url: 'https://coder-mint.github.io/custom-ptfolio/'
  },
  {
    name: "TiniBird", 
    desc: "One of my websites that has the best styling. It is a website for a phone app dedicated to birds that has a similar concept as the popular app Tinder. I actually haven't made the app yet though, this website is just sort of a website design.",
    img: 'tinibird',
    add: '',
    url: 'https://tinibird.netlify.app/'
  },
  {
    name: "Codermint's Workshop", 
    desc: "It is a sleek and modern website that also showcases my skills and expertise as its creator. The website includes information about my skills in Python, HTML, CSS, Bootstrap, JavaScript, and Flask development. The website is visually appealing and easy to navigate, making it a great resource for anyone interested in learning more about my work.",
    img: 'techy-ptfolio',
    add: '',
    url: 'https://codermint-portfolio.netlify.app/'
  },
  {
    name: "Di-C!", 
    desc: "Refresh to roll the dice again. If the dice of player 1 rolls on a greater number than the dice of player 2, player 1 wins. However, If the dice of player 2 rolls on a greater number than the dice of player 1, then player 2 wins. If they both roll on the same number, it is a draw. A simple, randomized game.",
    img: 'dicee',
    add: '',
    url: 'https://coder-mint.github.io/dicee/'
  },
  {
    name: "Drum Kit", 
    desc: "Press the buttons or the respective keys on your keyboard to make drum sounds! Works like a real drum kit, there are 4 drums, a snare, a crash cymbal and a bass. You could make lots of sounds you would normally make with a real ordinary drum kit.",
    img: 'drum-kit',
    add: '',
    url: 'https://coder-mint.github.io/drum-kit/'
  },
  {
    name: "Simon", 
    desc: "Simon is a popular electronic game that challenges players to memorize and reproduce a series of musical tones and lights on a surface with four large, illuminated buttons: red, green, blue, and yellow. The pattern won't be shown again, only 1 color at a time.",
    img: 'simon',
    add: '',
    url: 'https://coder-mint.github.io/simon/'
  },
  {
    name: "Image Generator", 
    desc: "Get a random image by pressing 'Random' or search for an image in the search bar and hit search, and get beautiful pictures back! These images are taken from Unsplash.",
    img: 'img-gen',
    add: 'P.S. There are a few flaws in the search functionality as the Unsplash API gives the wrong image for some searches, and the download button will redirect to the image, which you have to download manually.',
    url: 'https://image-generator-ew43.onrender.com/'
  },
  {
    name: "Band Name Generator", 
    desc: "Get a random band name by clicking 'Generate Name' and get really creative band names back, like Anxious Semicircle, Trustworthy Breeze, Hearty Bestseller, Athletic Sundial, Productive Month, and much, much more!",
    img: 'band-name-gen',
    add: '',
    url: 'https://band-name-generator-kjft.onrender.com/'
  },
  {
    name: "Activity Hub", 
    desc: "This website gives you the perfect recommendations for what to do, especially when you are bored. You can specify the type of activity you want to do, or you can even get results based on the number of people involved.",
    img: 'activity-hub',
    add: '',
    url: 'https://activity-hub.onrender.com/'
  },
  {
    name: "Birthday Invite", 
    desc: "Instead of the exhausting process of printing out every birthday invite and giving your friends these invites, you can simply send the link to your friends and family.",
    img: 'birthday-invite',
    add: '',
    url: 'https://coder-mint.github.io/birthday-invite/'
  },
  {
    name: "Multilingual Color Vocabulary", 
    desc: "With this website you can learn what is the name for a color in a language. The colors that are used are red, orange, yellow, green, blue, purple, black and white Currently available for Spanish, French, Arabic and Japanese.",
    img: 'color-vocab',
    add: '',
    url: 'https://multilingual-color-vocabulary.onrender.com/'
  },
];
