import { logger } from "../utils/loggerUtils.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`${err.statusCode || 500} - ${err.message}`);
  res.status(err.statusCode || 500).json({ message: err.message });
};
