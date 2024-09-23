import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] as string;

  const result = await UserServices.getProfileFromDB(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] as string;

  const result = await UserServices.updateProfileFromDB(token, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const UserControllers = { getProfile, updateProfile };
