import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import { forecast } from "./utils/forecast.js";

const app = express();

//Create variable to store path of the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirrectoryPath = path.join(__dirname, "/templates/views");
const partialsDirectoryPath = path.join(__dirname, "/templates/partials");

//Setup handlebars engine and view
app.set("views", viewsDirrectoryPath);
app.set("view engine", "hbs");

//Setup partials
hbs.registerPartials(partialsDirectoryPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Set up routes for HTML pages
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    message: "This is a Home page",
    name: "Faraz Ahmad",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    message: "This is an about page",
    name: "Faraz Ahmad",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Faraz Ahmad",
    message: "This is a help page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  forecast(req.query.address, (error, data, response) => {
    if (error) {
      res.send({
        error: error,
      });
    } else {
      res.send({
        forecast: data,
        location: `${response.body.location.name}, ${response.body.location.country}`,
        address: req.query.address,
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Faraz Ahmad",
    message: "404 help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Faraz Ahmad",
    message: "404 page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
