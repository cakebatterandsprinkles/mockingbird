const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const {
  generateTokenAndSetCookie,
  generateRandomString,
} = require("../util/generateToken");
const { validationSignUp, validationLogin } = require("../util/validation");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.postSignup = (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  const validationResult = validationSignUp(email, password, repeatPassword);

  if (validationResult !== "Success") {
    return res.status(400).send(validationResult);
  }

  User.findOne({
    email: email,
  })
    .then((userInfo) => {
      if (userInfo) {
        return res.status(400).send("User already exists.");
      }

      const confirmToken = generateRandomString(30);
      const SALT_WORK_FACTOR = 10;
      bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((hashedPassword) => {
            const user = new User({
              email: email,
              password: hashedPassword,
              confirmToken: confirmToken,
            });
            return user.save();
          })
          .then(() => {
            const confirmationLinkURL = `http://localhost:3000/confirm?email=${encodeURIComponent(
              email
            )}&token=${confirmToken}`;

            sgMail
              .send({
                from: "mockingbird@yagmurcetintas.com",
                personalizations: [
                  {
                    to: { email: email },
                    dynamicTemplateData: {
                      linkURL: confirmationLinkURL,
                    },
                  },
                ],
                templateId: "d-91eed88622a64a27970248ff2777fc26",
              })
              .then(
                () => {},
                (error) => {
                  console.error(error);

                  if (error.response) {
                    console.error(error.response.body);
                  }
                }
              );
            return res.status(200).send("User successfully signed up!");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

exports.postRequestReset = (req, res, next) => {
  const { email } = req.body;

  if (email === "") {
    return res.status(400).send("Email cannot be empty");
  }

  User.findOne({
    email: email,
  }).then((userInfo) => {
    if (!userInfo) {
      return res.status(400).send("User does not exist.");
    }

    const resetToken = generateRandomString(30);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    userInfo.resetToken = resetToken;
    userInfo.resetTokenExpiration = expirationDate;
    userInfo
      .save()
      .then(() => {
        const resetLinkURL = `http://localhost:3000/reset-password?email=${encodeURIComponent(
          email
        )}&token=${resetToken}`;

        sgMail
          .send({
            from: "mockingbird@yagmurcetintas.com",
            personalizations: [
              {
                to: { email: email },
                dynamicTemplateData: {
                  linkURL: resetLinkURL,
                },
              },
            ],
            templateId: "d-dd01d0c5f77c4efda65a0c8d26edd4e9 ",
          })
          .then(
            () => {},
            (error) => {
              console.error(error);

              if (error.response) {
                console.error(error.response.body);
              }
            }
          );
        return res.status(200).send("An email has been sent!");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server Error");
      });
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const validationResult = validationLogin(email, password);

  if (validationResult !== "Success") {
    return res.status(400).send(validationResult);
  }

  try {
    User.findOne({
      email: email,
    })
      .then((userInfo) => {
        if (!userInfo) {
          return res
            .status(400)
            .send("User with this email address does not exist.");
        }

        if (!userInfo.emailConfirmed) {
          return res
            .status(400)
            .send(
              "We have sent you an email. Confirm your email address to login."
            );
        }

        bcrypt.compare(password, userInfo.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).send("Wrong password.");
          }

          generateTokenAndSetCookie(res, userInfo.id, userInfo.name);
          res.json({ id: userInfo.id, name: userInfo.name });
        });
      })
      .catch((err) => {
        return res.status(500).json(err.toString());
      });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.postLogout = (req, res, next) => {
  try {
    res.clearCookie("token").end();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.postConfirm = (req, res, next) => {
  const { email, token } = req.body;

  if (email === "" || token === "") {
    return res.status(400).send("Missing email or token.");
  }

  try {
    User.findOne({
      email: email,
    }).then((userInfo) => {
      if (!userInfo) {
        return res.status(400).send("User with this email does not exist.");
      }

      if (userInfo.confirmToken !== token) {
        return res.status(400).send("Token mismatch.");
      }

      if (!userInfo.emailConfirmed) {
        userInfo.emailConfirmed = true;
        userInfo.save().then(() => res.status(200).end());
      } else {
        return res.status(200).end();
      }
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.postResetPassword = (req, res, next) => {
  const { email, token, password, repeatPassword } = req.body;

  if (email === "" || token === "") {
    return res.status(400).send("Missing email or token.");
  }

  if (password !== repeatPassword) {
    return res.status(400).send("New passwords do not match.");
  }

  if (password.length < 8) {
    return res.status(400).send("Password must have at least 8 characters.");
  }

  try {
    User.findOne({
      email: email,
    }).then((userInfo) => {
      if (!userInfo) {
        return res.status(400).send("User with this email does not exist.");
      }

      if (userInfo.resetToken !== token) {
        return res.status(400).send("Token mismatch.");
      }

      const now = new Date();
      if (
        !userInfo.resetTokenExpiration ||
        userInfo.resetTokenExpiration < now
      ) {
        return res.status(400).send("Reset link expired");
      }

      const SALT_WORK_FACTOR = 10;
      bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((hashedPassword) => {
            userInfo.password = hashedPassword;
            userInfo.resetTokenExpiration = null;
            userInfo.resetToken = null;
            return userInfo.save();
          })
          .then(() => {
            return res.status(200).end();
          })
          .catch((err) => {
            return res.status(500).json(err.toString());
          });
      });

      return res.status(200).end();
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.postSettings = (req, res, next) => {
  const { name, currentPassword, newPassword, repeatNewPassword } = req.body;

  if (repeatNewPassword !== "" || currentPassword !== "") {
    if (newPassword !== repeatNewPassword) {
      return res.status(400).send("New passwords do not match.");
    }

    if (newPassword.length < 8) {
      return res.status(400).send("Password must have at least 8 characters.");
    }
  }

  try {
    User.findOne({
      _id: req.user.id,
    }).then((userInfo) => {
      if (!userInfo) {
        return res.status(400).send("User with this id does not exist.");
      }

      if (
        newPassword === "" ||
        repeatNewPassword === "" ||
        currentPassword === ""
      ) {
        userInfo.save();
        return res.status(200).end();
      }

      bcrypt.compare(currentPassword, userInfo.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).send("Your current password is wrong.");
        }

        const SALT_WORK_FACTOR = 10;
        bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
          bcrypt
            .hash(newPassword, salt)
            .then((hashedPassword) => {
              userInfo.name = name;
              userInfo.password = hashedPassword;
              userInfo.save();
            })
            .then(() => {
              return res.status(200).end();
            })
            .catch((err) => {
              return res.status(500).json(err.toString());
            });
        });
      });
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.getMe = (req, res, next) => {
  User.findById({ _id: req.user.id }, "name", function (err, user) {
    if (err) {
      return res.status(500).json(err.toString());
    }
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  });
};
