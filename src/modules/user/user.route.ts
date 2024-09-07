import { Router } from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidationSchemas } from './user.validation';

const router = Router();

router.get(
  '/me',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getProfile,
);

router.put(
  '/me',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(UserValidationSchemas.updateUserSchema),
  UserControllers.updateProfile,
);

export const UserRoutes = router;
