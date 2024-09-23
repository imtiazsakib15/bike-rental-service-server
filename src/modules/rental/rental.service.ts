import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import User from '../user/user.model';
import { IRental } from './rental.interface';
import Rental from './rental.model';
import mongoose from 'mongoose';
import { decodeUserFromAccessToken } from '../auth/auth.utils';

const createIntoDB = async (token: string, payload: IRental) => {
  const decodedUserInfo = decodeUserFromAccessToken(token);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const requestedBike = await Bike.findById({ _id: payload.bikeId });
    if (!requestedBike)
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid bike ID');
    if (!requestedBike.isAvailable)
      throw new AppError(httpStatus.BAD_REQUEST, 'Bike is not available');

    const user = await User.findOne({ email: decodedUserInfo.email });
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
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to rent bike',
      );

    await session.commitTransaction();
    return rental;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    await session.endSession();
  }
};

const updateReturnStatusIntoDB = async (rentalId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const rentalInfo = await Rental.findById({ _id: rentalId });
    if (!rentalInfo)
      throw new AppError(httpStatus.NOT_FOUND, 'Rental not found');
    if (rentalInfo.isReturned)
      throw new AppError(httpStatus.BAD_REQUEST, 'Rental is already returned');

    const updateBikeAvailability = await Bike.findByIdAndUpdate(
      { _id: rentalInfo.bikeId },
      { isAvailable: true },
      { new: true, runValidators: true, session },
    );
    if (!updateBikeAvailability)
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid bike ID');

    const returnTime = new Date().toISOString();
    const bikeRentedHour =
      (new Date(returnTime).getTime() -
        new Date(rentalInfo?.startTime as Date).getTime()) /
      (1000 * 60 * 60);
    const totalCost = Number(
      (bikeRentedHour * updateBikeAvailability.pricePerHour).toFixed(2),
    );

    const rentalDetails = {
      returnTime,
      totalCost,
      isReturned: true,
    };
    const updatedRentalInfo = await Rental.findByIdAndUpdate(
      { _id: rentalId },
      rentalDetails,
      { new: true, runValidators: true, session },
    );
    if (!updatedRentalInfo)
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to return');

    await session.commitTransaction();
    return updatedRentalInfo;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    await session.endSession();
  }
};

const getRentalOfUsersFromDB = async (token: string) => {
  const decodedUserInfo = decodeUserFromAccessToken(token);

  const user = await User.findOne({
    email: decodedUserInfo.email,
  });
  const rentals = await Rental.find({ userId: user?._id });

  return rentals;
};

export const RentalServices = {
  createIntoDB,
  updateReturnStatusIntoDB,
  getRentalOfUsersFromDB,
};
