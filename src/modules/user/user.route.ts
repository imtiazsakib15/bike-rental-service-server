import { Router } from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.USER), UserControllers.getMe);

export const UserRoutes = router;
