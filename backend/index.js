import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";

import corsOptions from "./config/corsOption.js";
import db from "./config/db.js";

import AuthRoute from "./routes/auth.js";
import UserRoute from "./routes/user.js";
import StatusRoute from "./routes/status.js";
import { authJWT } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/loggerUtils.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Connect to database
db();

// Cookie parser and passport middleware
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", async function (req, res) {
  res.send("Hello World");
});

// Log incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Auth routes
app.use("/api/auth", AuthRoute);

// Middleware for auth
app.use(authJWT);

// User routes
app.use("/api/users", UserRoute);

// Status routes
app.use("/api/status", StatusRoute);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ errors: "Route not found" });
});

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info(`Server running on:`);
  logger.info(`- Local: http://localhost:${process.env.PORT}`);
});
