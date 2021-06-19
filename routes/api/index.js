const router = require("express").Router();

router.use("/products", require("./products.js"));
router.use("/user", require("./user.js"));
router.use("/cart", require("./cart.js"));
router.use("/auth", require("./auth.js"));

module.exports = router;