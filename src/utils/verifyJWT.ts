import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET as string);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, ' Unauthorized');
  }
};
