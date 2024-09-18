import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from './user.model';

const getProfileFromDB = async (payload: Record<string, unknown>) => {
  const user = payload;
  user.password = '';
  return user;
};

const updateProfileFromDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const { ...profileInfo } = payload;
  delete profileInfo.email;
  delete profileInfo.password;

  const result = await User.findByIdAndUpdate(id, profileInfo, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

export const UserServices = { getProfileFromDB, updateProfileFromDB };
