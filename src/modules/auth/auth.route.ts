import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidationSchemas } from '../user/user.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidationSchemas.createUserSchema),
  AuthControllers.register,
);

router.post('/login', AuthControllers.login);

export const AuthRoutes = router;
