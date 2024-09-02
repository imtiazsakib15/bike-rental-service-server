import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const register = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const newUser = await AuthServices.register(userInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: newUser,
  });
});

const login = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const { user, accessToken, refreshToken } =
    await AuthServices.login(userInfo);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = { register, login };
