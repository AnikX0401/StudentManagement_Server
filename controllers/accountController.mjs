import User from "../models/user.mjs";
import config from "../config.mjs";
import jwt from "jwt-simple";

export function login(req, res) {
  User.findOne({ username: req.body.username }).then((user, err) => {
    if (err) {
      // console.log("Error");
    } else {
      const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };
      const token = jwt.encode(payload, config.jwtSecret);
      res.json({ token });
    }
  });
}

export function register(req, res) {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
      role: req.body.role
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
}

export function profile(req, res) {
  res.json({
    message: "You made it to the secured profile",
    user: req.user,
    token: req.query.secret_token,
  });
}
