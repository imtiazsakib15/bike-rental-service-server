import httpStatus from 'http-status';
import { BikeServices } from './bike.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const create = catchAsync(async (req, res) => {
  const bikeInfo = req.body;
  const result = await BikeServices.createIntoDB(bikeInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Bike added successfully',
    data: result,
  });
});

export const BikeControllers = { create };
