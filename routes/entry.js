const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entries");
const verifyToken = require("../middleware/verifyToken");

// @route  GET /api/today
// @desc   Get Journal Entries of today, if they are already logged, and you can change them too.
// @access private

router.get("/api/today", verifyToken, entryController.getToday);

// @route  POST /today
// @desc   Create or update new journal entry of the day
// @access private

router.post("/today", verifyToken, entryController.postToday);

// @route  GET /api/calendar
// @desc   Get the user's all entries so far
// @access private

router.get("/api/calendar", verifyToken, entryController.getCalendar);

// @route  GET /api/reminders
// @desc   Get the user's reminders
// @access private

router.get("/api/reminders", verifyToken, entryController.getReminders);

// @route  POST /reminders
// @desc   Create or update a reminder
// @access private

router.post("/reminders", verifyToken, entryController.postReminders);

// @route  DELETE /reminders
// @desc   Delete the reminder with the id
// @access private

router.delete("/reminders", verifyToken, entryController.deleteReminders);

module.exports = router;
