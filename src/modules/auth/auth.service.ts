import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { USER_ROLE } from '../user/user.constant';

const register = async (payload: IUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'Email already in use');
  }

  payload.role = USER_ROLE.USER;

  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to register');
  }
  return newUser;
};

export const AuthServices = { register };
