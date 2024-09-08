import { Router } from 'express';
import { IModuleRoute } from '../interfaces/route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { RentalRoutes } from '../modules/rental/rental.route';

const router = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/rentals',
    route: RentalRoutes,
  },
];

moduleRoutes.forEach((route: IModuleRoute) =>
  router.use(route.path, route.route),
);

export default router;
