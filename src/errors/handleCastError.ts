import httpStatus from 'http-status';
import { IErrorSource, IGenericErrorResponse } from '../interfaces/error';
import mongoose from 'mongoose';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorMessages: IErrorSource[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid ID',
    errorMessages,
  };
};

export default handleCastError;
