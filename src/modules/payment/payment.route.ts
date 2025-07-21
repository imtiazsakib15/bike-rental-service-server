import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/', PaymentControllers.paymentConfirmation);

export const PaymentRoutes = router;
