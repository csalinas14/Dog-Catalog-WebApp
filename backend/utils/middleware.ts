import { NextFunction, Response, Request } from 'express';
import logger from './logger';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../utils/config';
import { Session } from '../models';
import { UserToken } from '../types';

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

const tokenExtractor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.get('authorization');
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET);
      console.log(decodedToken);

      //check if this token is an active session in our db

      //####fix up error checking for active sessions. If not found its triggering 'token invalid'
      const activeSession = await Session.findOne({
        where: {
          token: authorization.substring(7)
        }
      });
      console.log(activeSession);
      if (!activeSession) {
        return response.status(401).json({ error: 'active session not found' });
      }

      console.log(decodedToken);
      request.user = decodedToken as UserToken;
    } catch {
      return response.status(401).json({ error: 'token invalid' });
    }
  } else {
    return response.status(401).json({ error: 'token missing' });
  }
  return next();
};

export default {
  errorHandler,
  tokenExtractor
};
