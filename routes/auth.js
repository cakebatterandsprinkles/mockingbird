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

// @route  POST /reset-request
// @desc   Make a password reset request
// @access public

router.post("/reset-request", authController.postResetPequest);

// @route  POST /reset-password
// @desc   Reset User Password
// @access public

router.post("/reset-password", authController.postResetPassword);

// @route  POST /logout
// @desc   Logout User
// @access private

router.post("/logout", verifyToken, authController.postLogout);

// @route  POST /settings
// @desc   Change name and/or password of the User
// @access private

router.post("/settings", verifyToken, authController.postSettings);

// @route  GET /me
// @desc   Get current user
// @access private

router.get("/me", verifyToken, authController.getMe);

module.exports = router;
