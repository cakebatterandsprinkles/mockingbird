require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const entryRoutes = require("./routes/entry");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASS = process.env.MONGODB_PASS;

// connect db
mongoose.connect(
  MONGODB_URI,
  {
    auth: {
      user: MONGODB_USERNAME,
      password: MONGODB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    console.log(error);
  }
);

// parse incoming request bodies and stick them in req.body
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse application/json
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser());

// allow cookies
app.use(cors({ credentials: true }));

// routes
app.use(authRoutes);
app.use(entryRoutes);

// serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`Backend server started on port: ${PORT}`));
