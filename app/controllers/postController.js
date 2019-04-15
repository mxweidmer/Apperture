

var express = require("express");

var router = express.Router();

var db = require("../models");

router.post("/api/posts", function (req, res) {
    db.Post.create({
        title: req.body.title,
        body: req.body.body,
        imgLink: req.body.imgLink,
        location: req.body.location,
        season: req.body.season
    }, function (result) {
        console.log(result, "Post created")
    })
})

router.get("/api/posts/:location", function (req, res) {
    var condition;

    d

    db.Post.findAll({ include: [db.Location] })
})

router.get("/api/posts/:season", function (req, res) {

    db.Post.findAll({
        where: {
            id: req.params.season
        }
    }).then(function (dbPost) {
        res.render("search", { table: dbPost })
    })
})


module.exports = router;