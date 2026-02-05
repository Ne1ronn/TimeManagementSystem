const express = require("express");
const bcrypt = require("bcrypt");
const { getDB } = require("../database/mongo_db");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const exists = await getDB()
        .collection("users")
        .findOne({ username });

    if (exists) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await getDB().collection("users").insertOne({
        username,
        passwordHash
    });

    req.session.userId = result.insertedId;

    res.status(201).json({ success: true });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await getDB()
        .collection("users")
        .findOne({ username });

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.status(200).json({ success: true });
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ success: true });
    });
});

module.exports = router;