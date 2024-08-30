import { Router } from 'express';
import { BikeControllers } from './bike.controller';

const router = Router();

router.post('/', BikeControllers.create);

export const BikeRoutes = router;
