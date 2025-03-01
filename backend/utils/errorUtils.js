import { logger } from "./loggerUtils.js";

export const createError = (message, status) => {
  const error = new Error(message);
  error.statusCode = status;
  logger.error(`${error.statusCode} - ${error.message}`);
  return error;
};
