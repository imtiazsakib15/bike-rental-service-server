import { Response } from 'express';

interface IData<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: object;
  data: T;
}

export const sendResponse = <T>(res: Response, data: IData<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
