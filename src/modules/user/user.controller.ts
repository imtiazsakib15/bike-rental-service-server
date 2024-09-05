import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getMe = catchAsync(async (req, res) => {
  const userInfo = req.user;

  const result = await UserServices.getMeFromDB(userInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const UserControllers = { getMe };
