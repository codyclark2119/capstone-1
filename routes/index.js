const router = require("express").Router();

// API Routes
router.use("/api", require("./api/index.js"));

module.exports = router;