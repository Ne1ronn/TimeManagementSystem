const express = require("express");
const path = require("path");
const { connectDB } = require("./database/mongo_db");

const pagesRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");
const itemsRoutes = require("./routes/items");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/", pagesRoutes);
app.use("/api", apiRoutes);
app.use("/api/items", itemsRoutes);

app.use((req, res) => {
    if (req.url.startsWith("/api")) {
        res.status(404).json({ error: "Not found" });
    } else {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
});

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
});