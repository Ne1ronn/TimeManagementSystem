const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../database/mongo_db");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
    try {
        const { title, day, sortBy, order, fields } = req.query;

        const filter = {
            userId: new ObjectId(req.session.userId)
        };

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }

        if (day) {
            filter.day = day;
        }

        const options = {};

        if (fields) {
            options.projection = { _id: 1 };
            fields.split(",").forEach(f => {
                options.projection[f] = 1;
            });
        }

        let cursor = getDB()
            .collection("time_blocks")
            .find(filter, options);

        if (sortBy) {
            cursor = cursor.sort({
                [sortBy]: order === "desc" ? -1 : 1
            });
        }

        const time_blocks = await cursor.toArray();
        res.status(200).json(time_blocks);

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", requireAuth, async (req, res) => {
    try {
        const block = await getDB()
            .collection("time_blocks")
            .findOne({
                _id: new ObjectId(req.params.id),
                userId: new ObjectId(req.session.userId)
            });

        if (!block) {
            return res.status(404).json({ error: "Not found" });
        }

        res.status(200).json(block);
    } catch {
        res.status(400).json({ error: "Invalid id" });
    }
});

router.post("/", requireAuth, async (req, res) => {
    const { title, description, day, startTime, endTime, priority } = req.body;

    if (!title || !day || !startTime || !endTime) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const block = {
        title,
        description: description || "",
        day,
        startTime,
        endTime,
        priority: Number(priority) || 2,
        userId: new ObjectId(req.session.userId),
        createdAt: new Date()
    };

    const result = await getDB()
        .collection("time_blocks")
        .insertOne(block);

    res.status(201).json({ id: result.insertedId });
});

router.put("/:id", requireAuth, async (req, res) => {
    try {
        const result = await getDB()
            .collection("time_blocks")
            .updateOne(
                { _id: new ObjectId(req.params.id), userId: new ObjectId(req.session.userId) },
                { $set: req.body }
            );

        if (!result.matchedCount) {
            return res.status(404).json({ error: "Not found" });
        }

        res.status(200).json({ success: true });
    } catch {
        res.status(400).json({ error: "Invalid id" });
    }
});

router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const result = await getDB()
            .collection("time_blocks")
            .deleteOne({
                _id: new ObjectId(req.params.id),
                userId: new ObjectId(req.session.userId)
            });

        if (!result.deletedCount) {
            return res.status(404).json({ error: "Not found" });
        }

        res.status(200).json({ success: true });
    } catch {
        res.status(400).json({ error: "Invalid id" });
    }
});

module.exports = router;