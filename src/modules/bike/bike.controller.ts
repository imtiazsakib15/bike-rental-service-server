import httpStatus from 'http-status';
import { BikeServices } from './bike.service';

const create = async (req, res) => {
  const bikeInfo = req.body;
  const result = await BikeServices.createIntoDB(bikeInfo);

  return res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Bike added successfully',
    data: result,
  });
};

export const BikeControllers = { create };
