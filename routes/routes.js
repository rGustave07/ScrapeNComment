const router = require('express').Router();
const db = require('../models');
const request = require('request');
const cheerio = require('cheerio');

router.get("/scrape", (req,res) => {
    request("https://www.reddit.com/r/AnaheimDucks/", (error, response, html) => {
        let $ = cheerio.load(html);
        $("a.title").each( (i, element) =>{
            let articleEntry = {};
            articleEntry.title = $(element).text();
            articleEntry.link  = $(element).attr("href");

            db.Article
              .create(articleEntry)
              .then((dbArticle) => {
                  console.log("scrape complete");
              });
        })
    })
});

router.get("/articles", (req,res) => {
    db.Article.find({})
                .then( (result) => {
                    res.render("index", { data: result});
                })
});

router.get("/", (req, res) => {
    res.redirect("/articles");
});


module.exports = router;
