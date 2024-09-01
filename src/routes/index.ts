import { Router } from 'express';
import { IModuleRoute } from '../interfaces/route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
];

moduleRoutes.forEach((route: IModuleRoute) =>
  router.use(route.path, route.route),
);

export default router;
