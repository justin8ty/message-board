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
    id: 1,
    text: "Hi there!",
    user: "Warren",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Connor",
    added: new Date(),
  },
  {
    id: 3,
    text: "Goodbye Darkness...",
    user: "Liebert",
    added: new Date(),
  },
];

// routes and logic

let nextId = messages.length + 1;

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
  const { name, msg } = req.body;
  if (name && msg) {
    messages.push({
      id: nextId++,
      text: msg,
      user: name,
      added: new Date(),
    });

    console.log(`New msg -> ${name}: ${msg}`);
    res.redirect("/");
  } else {
    res.status(404).send("Uh-oh, message does not exist.");
  }
});

app.get("/message/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);
  if (message) {
    res.render("message", { title: "Message Details", message });
  } else {
    res.status(404).send("Uh-oh, message does not exist.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
