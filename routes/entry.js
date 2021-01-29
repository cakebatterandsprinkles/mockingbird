const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entries");
const verifyToken = require("../middleware/verifyToken");

// @route  GET /today
// @desc   Get Journal Entries of today, if they are already logged, and you can change them too.
// @access private

router.get("/today", verifyToken, entryController.getToday);

// @route  POST /today
// @desc   Create or update new journal entry of the day
// @access private

router.post("/today", verifyToken, entryController.postToday);

// @route  GET /calendar
// @desc   Get the user's all entries so far
// @access private

router.get("/calendar", verifyToken, entryController.getCalendar);

module.exports = router;
