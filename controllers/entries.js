const Entry = require("../models/JournalEntry.js");

exports.postToday = (req, res, next) => {
  const { entry, date } = req.body;
  const newEntry = { ...entry, date, user: req.user.id };

  Entry.findOneAndUpdate(
    {
      user: req.user.id,
      date: req.body.date,
    },
    newEntry
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
