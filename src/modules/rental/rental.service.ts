import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import User from '../user/user.model';
import { IRental } from './rental.interface';
import Rental from './rental.model';
import mongoose from 'mongoose';

const createIntoDB = async (userEmail: string, payload: IRental) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const requestedBike = await Bike.findById({ _id: payload.bikeId });
    if (!requestedBike)
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid bike ID');
    if (!requestedBike.isAvailable)
      throw new AppError(httpStatus.BAD_REQUEST, 'Bike is not available');

    const user = await User.findOne({ email: userEmail });
    const rentalDetails = {
      userId: user?._id,
      bikeId: payload.bikeId,
      startTime: payload.startTime,
    };
    const [rental] = await Rental.create([rentalDetails], { session });
    if (!rental)
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to rent bike',
      );

    const updateBikeAvailability = await Bike.findByIdAndUpdate(
      { _id: payload.bikeId },
      { isAvailable: false },
      { new: true, runValidators: true, session },
    );
    if (!updateBikeAvailability)
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid bike ID');

    await session.commitTransaction();
    return rental;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to rent bike');
  } finally {
    await session.endSession();
  }
};

export const RentalServices = { createIntoDB };
