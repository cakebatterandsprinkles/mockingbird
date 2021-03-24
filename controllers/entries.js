const Entry = require("../models/JournalEntry.js");
const Reminder = require("../models/Reminder.js");

exports.postToday = (req, res, next) => {
  const { entry, date } = req.body;
  const newEntry = { ...entry, date, user: req.user.id };

  Entry.findOneAndUpdate(
    {
      user: req.user.id,
      date: req.body.date,
    },
    newEntry,
    {
      new: true,
      setDefaultsOnInsert: true,
      upsert: true,
      useFindAndModify: false,
    }
  )
    .then((entry) => {
      res.json(entry);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};

exports.getToday = (req, res, next) => {
  Entry.findOne({
    user: req.user.id,
    date: req.query.date,
  })
    .then((entry) => res.json(entry))
    .catch((err) => res.status(500).send(err));
};

exports.getCalendar = (req, res, next) => {
  Entry.find({
    user: req.user.id,
    date: {
      $gte: new Date(`${req.query.year}-${req.query.month}-01`),
      $lte: new Date(
        `${req.query.year}-${req.query.month}-${req.query.daysInMonth}`
      ),
    },
  })
    .then((entries) => res.json(entries))
    .catch((err) => res.status(500).send(err));
};

exports.getReminders = (req, res, next) => {
  Reminder.find({
    user: req.user.id,
  })
    .then((reminders) => res.json(reminders))
    .catch((err) => res.status(500).send(err));
};

exports.postReminders = (req, res, next) => {
  const { label, ...reminderDetails } = req.body;
  const newReminder = { label, ...reminderDetails, user: req.user.id };
  Reminder.findOneAndUpdate({ user: req.user.id, label: label }, newReminder, {
    new: true,
    setDefaultsOnInsert: true,
    upsert: true,
    useFindAndModify: false,
  })
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};
