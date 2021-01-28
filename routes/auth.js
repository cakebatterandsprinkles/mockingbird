const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authController = require("../controllers/auth");

// @route  POST /signup
// @desc   Register User
// @access public

router.post("/signup", authController.postSignup);

// @route  POST /login
// @desc   Login User
// @access public

router.post("/login", authController.postLogin);

// @route  POST /confirm
// @desc   Confirm user email
// @access private

router.post("/confirm", authController.postConfirm);

// @route  POST /logout
// @desc   Logout User
// @access private

router.post("/logout", verifyToken, authController.postLogout);

// @route  POST /settings
// @desc   Change name and/or password of the User
// @access private

router.post("/settings", verifyToken, authController.postSettings);

module.exports = router;
