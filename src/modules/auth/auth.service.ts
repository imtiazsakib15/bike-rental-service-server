import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { isPasswordMatch } from './auth.utils';
import jwt from 'jsonwebtoken';
import config from '../../config';

const register = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'Email already in use');
  }

  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to register');
  }
  return newUser;
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'No user found');

  const isUserPasswordMatch = await isPasswordMatch(
    payload.password,
    user.password,
  );
  if (!isUserPasswordMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    config.ACCESS_TOKEN_SECRET as string,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN },
  );
  const refreshToken = jwt.sign(
    jwtPayload,
    config.REFRESH_TOKEN_SECRET as string,
    { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN },
  );

  return { user, accessToken, refreshToken };
};

export const AuthServices = { register, login };
