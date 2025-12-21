const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/views/about.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
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

app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/views/404.html");
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
