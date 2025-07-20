import { AnyZodObject } from 'zod';
import { catchAsync } from '../utils/catchAsync';

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    req.body = await schema.parseAsync({ ...req.body });
    next();
  });
};
