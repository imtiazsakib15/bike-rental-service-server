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

const getAllFromDB = async () => {
  const result = await Bike.find();

  return result;
};

const getByIdFromDB = async (id: string) => {
  const result = await Bike.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }
  return result;
};

const updateByIdFromDB = async (id: string, payload: Partial<IBike>) => {
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }
  return result;
};

const deleteByIdFromDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }
  return result;
};

export const BikeServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
  deleteByIdFromDB,
};
