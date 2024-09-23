import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from './user.model';
import { decodeUserFromAccessToken } from '../auth/auth.utils';

const getProfileFromDB = async (token: string) => {
  const decodedUserInfo = decodeUserFromAccessToken(token);

  const user = await User.findOne({
    email: decodedUserInfo.email,
  });
  if (user) user.password = '';
  return user;
};

const updateProfileFromDB = async (
  token: string,
  payload: Record<string, unknown>,
) => {
  const decodedUserInfo = decodeUserFromAccessToken(token);

  const user = await User.findOne({
    email: decodedUserInfo.email,
  });

  const { ...profileInfo } = payload;
  delete profileInfo.email;
  delete profileInfo.password;

  const result = await User.findByIdAndUpdate({ _id: user?._id }, profileInfo, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

export const UserServices = { getProfileFromDB, updateProfileFromDB };
