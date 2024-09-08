import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { RentalServices } from './rental.service';

const create = catchAsync(async (req, res) => {
  const rentalInfo = req.body;
  const userEmail = req.user?.email;
  const result = await RentalServices.createIntoDB(userEmail, rentalInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Rental created successfully',
    data: result,
  });
});

export const RentalControllers = { create };
