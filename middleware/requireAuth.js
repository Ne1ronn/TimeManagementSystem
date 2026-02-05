function requireAuth(req, res, next) {
    console.log("SESSION:", req.session);
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}


module.exports = requireAuth;