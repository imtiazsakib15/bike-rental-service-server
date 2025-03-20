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

router.get('/', auth(USER_ROLE.ADMIN), UserControllers.getAllUser);

router.put(
  '/:id/update-role',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidationSchemas.updateUserRoleSchema),
  UserControllers.updateUserRole,
);

export const UserRoutes = router;
