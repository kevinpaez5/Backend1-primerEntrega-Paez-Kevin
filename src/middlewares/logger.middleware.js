import { logger } from "../utils/logger.js";

export const addLogger = (req, res, next) => {

  logger.http(`${req.method} ${req.url}`);

  next();
};