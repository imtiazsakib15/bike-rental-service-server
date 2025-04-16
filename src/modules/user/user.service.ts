import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from './user.model';
import { decodeUserFromAccessToken } from '../auth/auth.utils';
import QueryBuilder from '../../builder/QueryBuilder';

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
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, phone, address } = payload;

  const result = await User.findByIdAndUpdate(
    { _id: user._id },
    { name, phone, address },
    {
      new: true,
      runValidators: true,
    },
  ).select('-password');

  return result;
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  if (query?.role == '') delete query.role;

  const userQuery = new QueryBuilder(User.find(), query)
    .search(['name', 'email'])
    .filter();

  const result = await userQuery.modelQuery;
  return result;
};

const updateUserRoleFromDB = async (id: string, role: string) => {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { role },
    {
      new: true,
      runValidators: true,
    },
  ).select('-password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

export const UserServices = {
  getProfileFromDB,
  updateProfileFromDB,
  getAllUserFromDB,
  updateUserRoleFromDB,
};
