require("dotenv").config();

const express = require("express");
const path = require("path");
const { connectDB } = require("./database/mongo_db");
const PORT = process.env.PORT || 3000;
const pagesRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");
const timeBlocksRoutes = require("./routes/time_blocks");
const authRoutes = require("./routes/auth");
const session = require("express-session");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}));

app.use("/", pagesRoutes);
app.use("/api", apiRoutes);
app.use("/api/time-blocks", timeBlocksRoutes);
app.use("/auth", authRoutes);

app.use((req, res) => {
    if (req.url.startsWith("/api")) {
        res.status(404).json({ error: "Not found" });
    } else {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});