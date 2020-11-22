const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const userDB = require("./config/userDB");
const User = require("./models/userModel");
const PostProject = require("./models/postProjectModel");

const app = express();

// Creating handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials")
});

// Let express know to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(__dirname + "/views/Images"));
//body-parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(req.path);
  res.status(200).render("home", {
    layout: "hero"
  });
});

app.get("/register", (req, res) => {
  console.log(req.path);
  res.status(200).render("register", {
    layout: "hero"
  });
});

app.get("/login", (req, res) => {
  console.log(req.path);
  res.status(200).render("login", {
    layout: "hero"
  });
});

app.get("/postOrSearch", (req, res) => {
  console.log(req.path);
  res.status(200).render("postOrSearch", {
    layout: "hero"
  });
});

app.post("/postOrSearch", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.email) {
      const rr = await User.create(req.body);
      res.status(200).render("postOrSearch", {
        layout: "hero.hbs"
      });
    } else {
      res.status(400).send("Invalid User");
    }
  } catch (e) {
    console.log("error: " + e);
  }
});

app.get("/post-a-project", (req, res) => {
  console.log(req.path);
  res.status(200).render("post", {
    layout: "hero"
  });
});

app.post("/post-project", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.email) {
      const rr = await PostProject.create(req.body);
      res.status(200).render("home", {
        layout: "hero.hbs"
      });
    } else {
      res.status(400).send("Invalid User");
    }
  } catch (e) {
    console.log("error: " + e);
  }
});

app.get("/search-a-partner", (req, res) => {
  res.status(200).render("search", {
    layout: "hero"
  });
});

let PORT = process.env.PORT || 5000;
app.listen(PORT);
