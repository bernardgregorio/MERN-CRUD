import passport from "passport";
import { clearCookie } from "../utils/cookieUtils.js";

const authJWT = (req, res, next) => {
  passport.authenticate(
    "access-token",
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      if (info && info.name === "Error") {
        return res.status(403).json({ message: "No Auth Token" });
      }

      if (info && info.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Access Token expired" });
      }
      if (info && info.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user; // Attach the user to the request object
      next();
    }
  )(req, res, next);
};

const authRefreshJWT = (req, res, next) => {
  passport.authenticate(
    "refresh-token",
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      if (info && info.name === "Error") {
        return res.status(403).json({ message: "No Auth Token" });
      }

      if (info && info.name === "TokenExpiredError") {
        clearCookie("jwt", res);
        return res.status(403).json({ message: "Access Token expired" });
      }
      if (info && info.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user; // Attach the user to the request object
      next();
    }
  )(req, res, next);
};

const authVerifyJWT = (req, res, next) => {
  passport.authenticate(
    "verify-token",
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      if (info && info.name === "Error") {
        return res.status(403).json({ message: "No Auth Token" });
      }

      if (info && info.name === "TokenExpiredError") {
        clearCookie("jwt", res);
        return res.status(403).json({ message: "Access Token expired" });
      }
      if (info && info.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user; // Attach the user to the request object
      next();
    }
  )(req, res, next);
};

const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
    accessType: "offline",
    prompt: "consent",
    passReqToCallback: true,
    session: false,
  })(req, res, next);
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  })(req, res, next);
};

export {
  authJWT,
  authRefreshJWT,
  authVerifyJWT,
  googleAuth,
  googleAuthCallback,
};
