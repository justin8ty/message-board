const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const PORT = 3000;

// configs

app.set("view engine", "ejs");
const views = path.join(__dirname, "views");
const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use(express.urlencoded({ extended: true }));

// data

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "Send a New Message" },
];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// logic

app.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
    links: links,
  });
});

app.get("/new", (req, res) => {
  res.render("form", { title: "Send a New Message: " });
});

app.post("/new", (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    messages.push({
      text: message,
      user: name,
      added: new Date(),
    });
  }
  console.log(`New msg -> ${name}: ${message}`);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
