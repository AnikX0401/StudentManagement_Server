import User from "../models/user.mjs";
import passport from "passport";
import passportJWT from "passport-jwt";
import config from "../config.mjs";

const { ExtractJwt, Strategy } = passportJWT;

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default function () {
  const strategy = new Strategy(params, function (payload, done) {
    User.findById(payload.id).then(function (user, err) {
      if (err) {
        return done(new Error("UserNotFound"), null);
      } else if (payload.expire <= Date.now()) {
        return done(new Error("TokenExpired"), null);
      } else {
        return done(null, user);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
  };
}
