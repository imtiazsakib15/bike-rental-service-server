import httpStatus from 'http-status';
import { IErrorSource, IGenericErrorResponse } from '../interfaces/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const path = err.message.match(/: \{\s*([^:]+)\s*:/);
  const value = err.message.match(/"([^"]*)"/);

  const errorMessages: IErrorSource[] = [
    {
      path: path[1],
      message: `'${value[1]}' is already exists`,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Already exists',
    errorMessages,
  };
};

export default handleDuplicateError;
