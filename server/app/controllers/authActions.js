const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);

    if (!user) {
      res.status(422).json({
        message:
          "We couldn't find an account matching the email and password you entered. Please check your email and password and try again.",
      });
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      delete user.hashed_password;
      const token = jwt.sign(
        {
          sub: user.id,
          isAdmin: user.is_admin,
        },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      });

      res.json({ user });
    } else {
      res.status(422).json({
        message:
          "We couldn't find an account matching the email and password you entered. Please check your email and password and try again.",
      });
    }
  } catch (err) {
    next(err);
  }
};

const isLoggedIn = ({ res }) => res.sendStatus(200);

const logout = ({ res }) => res.clearCookie("token").sendStatus(200);

module.exports = { login, isLoggedIn, logout };
