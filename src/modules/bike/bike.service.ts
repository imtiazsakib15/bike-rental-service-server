import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IBike } from './bike.interface';
import { Bike } from './bike.model';

const createIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create bike',
    );
  }
  return result;
};

export const BikeServices = { createIntoDB };
