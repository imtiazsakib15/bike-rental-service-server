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

const getAll = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllFromDB();

  if (result?.length === 0)
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.getByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

export const BikeControllers = { create, getAll, getById };
