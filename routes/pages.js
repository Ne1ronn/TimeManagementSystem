const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "register.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "about.html"));
});

router.get("/time-blocks", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "time_block.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "contact.html"));
});

router.get("/search", (req, res) => {
    if (!req.query.q) {
        return res.status(400).sendFile(
            path.join(__dirname, "..", "views", "400.html")
        );
    }
    res.sendFile(path.join(__dirname, "..", "views", "search.html"));
});

router.get("/item/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "item.html"));
});

router.post("/contact", (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    };

    fs.writeFileSync("messages.json", JSON.stringify(data, null, 2));
    res.send(`<h2>Thanks, ${data.name}! Your message has been received.</h2>`);
});

module.exports = router;