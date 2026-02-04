const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../database/mongo_db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { title, day, sortBy, order, fields } = req.query;

        const filter = {};

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }

        if (day) {
            filter.day = day;
        }

        const options = {};

        // PROJECTION
        if (fields) {
            options.projection = {};
            fields.split(",").forEach(f => options.projection[f] = 1);
        }

        let cursor = getDB().collection("items").find(filter, options);

        // SORTING
        if (sortBy) {
            cursor = cursor.sort({
                [sortBy]: order === "desc" ? -1 : 1
            });
        }

        const items = await cursor.toArray();
        res.status(200).json(items);

    } catch (err) {
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
    const { title, description, day, startTime, endTime, priority } = req.body;

    if (!title || !day || !startTime || !endTime) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const item = {
        title,
        description: description || "",
        day,
        startTime,
        endTime,
        priority: Number(priority) || 2,
        createdAt: new Date()
    };

    const result = await getDB().collection("items").insertOne(item);
    res.status(201).json({ id: result.insertedId });
});

router.put("/:id", async (req, res) => {
    try {
        const result = await getDB()
            .collection("items")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
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