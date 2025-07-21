import { catchAsync } from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

const paymentConfirmation = catchAsync(async (req, res) => {
  const { status, transactionId } = req.query;

  const result = await PaymentServices.paymentConfirmation(
    status as string,
    transactionId as string,
  );

  res.send(result);
});

export const PaymentControllers = { paymentConfirmation };
