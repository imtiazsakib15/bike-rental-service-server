import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import config from '../../config';

const register = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const { user, accessToken, refreshToken } =
    await AuthServices.register(userInfo);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    token: accessToken,
    data: user,
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
