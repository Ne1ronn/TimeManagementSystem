const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../database/mongo_db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const items = await getDB()
            .collection("items")
            .find()
            .toArray();

        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await getDB()
            .collection("items")
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(item);
    } catch {
        res.status(400).json({ error: "Invalid id" });
    }
});

router.post("/", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await getDB()
            .collection("items")
            .insertOne({ title, description });

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await getDB()
            .collection("items")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { title, description } }
            );

        if (!result.matchedCount) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({ success: true });
    } catch {
        res.status(400).json({ error: "Invalid id" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await getDB()
            .collection("items")
            .deleteOne({ _id: new ObjectId(req.params.id) });

        if (!result.deletedCount) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({ success: true });
    } catch {
        res.status(400).json({ error: "Invalid id" });
    }
});

module.exports = router;