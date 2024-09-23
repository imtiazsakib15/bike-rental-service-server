import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IJwtPayload } from './auth.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import config from '../../config';

export const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword);

export const createToken = (
  jwtPayload: IJwtPayload,
  tokenSecret: string,
  tokenExpiresIn: string,
) => jwt.sign(jwtPayload, tokenSecret, { expiresIn: tokenExpiresIn });

export const verifyToken = (token: string, tokenSecret: string) => {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, ' Unauthorized');
  }
};

export const decodeUserFromAccessToken = (token: string) =>
  verifyToken(token, config.ACCESS_TOKEN_SECRET as string) as JwtPayload;
