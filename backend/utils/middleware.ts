import { NextFunction, Response, Request } from 'express';
import logger from './logger';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  logger.error(error);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'SequelizeValidationError') {
    //console.log(error)
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

export default {
  errorHandler
};
