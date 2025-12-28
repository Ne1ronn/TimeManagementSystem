const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.get("/search", (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).sendFile(
            path.join(__dirname, "views", "400.html")
        );
    }

    res.sendFile(path.join(__dirname, "views", "search.html"));
});

app.get("/item/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "item.html"));
});

app.post("/contact", (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    };

    fs.writeFileSync("messages.json", JSON.stringify(data, null, 2));

    res.send(`<h2>Thanks, ${data.name}! Your message has been received.</h2>`);
});

app.get("/api/info", (req, res) => {
    res.json({
        project: "Time Management System",
        team: "SE-2427",
        assignment: "Assignment 2 Part 1",
        status: "Development"
    });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
