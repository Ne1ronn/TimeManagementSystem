const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
    res.json({
        project: "Time Management System",
        team: "SE-2427",
        assignment: "Assignment 2 Part 2",
        status: "Development"
    });
});

module.exports = router;