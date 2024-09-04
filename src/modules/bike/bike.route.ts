import { Router } from 'express';
import { BikeControllers } from './bike.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BikeValidationSchemas } from './bike.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(BikeValidationSchemas.createSchema),
  BikeControllers.create,
);

router.get('/', BikeControllers.getAll);

router.get('/:id', BikeControllers.getById);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(BikeValidationSchemas.updateSchema),
  BikeControllers.updateById,
);

router.delete('/:id', auth(USER_ROLE.ADMIN), BikeControllers.deleteById);

export const BikeRoutes = router;
