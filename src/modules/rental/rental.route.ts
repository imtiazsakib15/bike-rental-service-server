import { Router } from 'express';
import { RentalControllers } from './rental.controllers';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { RentalValidationSchemas } from './rental.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(RentalValidationSchemas.createRentalSchema),
  RentalControllers.create,
);

export const RentalRoutes = router;
