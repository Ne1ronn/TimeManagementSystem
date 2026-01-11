const express = require("express");
const pool = require("../database/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM items ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM items WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO items (title, description) VALUES ($1, $2) RETURNING id",
            [title, description]
        );

        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    if (!title || !description) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await pool.query(
            "UPDATE items SET title = $1, description = $2 WHERE id = $3",
            [title, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const result = await pool.query(
            "DELETE FROM items WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
