import { Router } from 'express';
import { BikeControllers } from './bike.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BikeValidationSchemas } from './bike.validation';

const router = Router();

router.post(
  '/',
  validateRequest(BikeValidationSchemas.createSchema),
  BikeControllers.create,
);

export const BikeRoutes = router;
