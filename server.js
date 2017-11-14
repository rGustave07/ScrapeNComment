const express    = require('express');
const cheerio    = require('cheerio');
const mongoose   = require('mongoose');
const request    = require('request');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/WebScrape", {
  useMongoClient: true
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));

app.engine("handlebars", expressHandlebars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

let routes = require('./routes/routes.js');
app.use("/", routes);

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
})
