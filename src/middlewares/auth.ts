import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import User from '../modules/user/user.model';
import { USER_ROLE } from '../modules/user/user.constant';

export const auth = (
  ...checkedRoles: (typeof USER_ROLE)[keyof typeof USER_ROLE][]
) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers?.authorization?.split(' ')[1];
    const decodedUser = jwt.verify(
      accessToken as string,
      config.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    if (!decodedUser)
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid access token');

    const user = await User.findOne({ email: decodedUser.email });
    if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');

    if (!checkedRoles.includes(user.role) || user.role !== decodedUser.role)
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Unauthorized to perform this action',
      );

    req.user = user;
    next();
  });
};
