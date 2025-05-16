import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import UserService from "../services/user.js";
dotenv.config();

// JWT Access Token Strategy
const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  "access-token",
  new JWTStrategy(accessTokenOptions, async (jwtPayload, done) => {
    try {
      const user = await UserService.findUserById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

// JWT Refresh Token Strategy
const refreshTokenOptions = {
  jwtFromRequest: (req) => {
    if (req && req.cookies) {
      return req.cookies.jwt;
    } else {
      return null;
    }
  },
  secretOrKey: process.env.REFRESH_TOKEN_SECRET,
};

passport.use(
  "refresh-token",
  new JWTStrategy(refreshTokenOptions, async (jwtPayload, done) => {
    try {
      const user = await UserService.findUserById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

/**
 * JWT Verify Token Strategy
 * This strategy is used to verify the token
 * that was created during google authentication
 * This token is only last for a minute
 */
const verifyTokenOptions = {
  jwtFromRequest: (req) => {
    if (req && req.cookies) {
      return req.cookies.verifyToken;
    } else {
      return null;
    }
  },
  secretOrKey: process.env.REFRESH_TOKEN_SECRET,
};

passport.use(
  "verify-token",
  new JWTStrategy(verifyTokenOptions, async (jwtPayload, done) => {
    try {
      const user = await UserService.findUserById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
