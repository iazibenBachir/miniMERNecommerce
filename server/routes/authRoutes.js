const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();



router.get("/login", authController.login_user);
router.post("/register", authController.register_user);

module.exports = router;
