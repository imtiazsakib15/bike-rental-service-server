import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { RentalServices } from './rental.service';

const create = catchAsync(async (req, res) => {
  const rentalInfo = req.body;
  const token = req.headers.authorization?.split(' ')[1] as string;
  const result = await RentalServices.createIntoDB(token, rentalInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Rental created successfully',
    data: result,
  });
});

const updateReturnStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RentalServices.updateReturnStatusIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getRentalOfUsers = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] as string;
  const result = await RentalServices.getRentalOfUsersFromDB(token);
  if (result?.length === 0)
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: 'No Data Found', data: result });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const RentalControllers = {
  create,
  updateReturnStatus,
  getRentalOfUsers,
};
