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

router.get('/', BikeControllers.getAll);

router.get('/:id', BikeControllers.getById);

router.put(
  '/:id',
  validateRequest(BikeValidationSchemas.updateSchema),
  BikeControllers.updateById,
);

export const BikeRoutes = router;
