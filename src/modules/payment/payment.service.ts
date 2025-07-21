import path from 'path';
import Rental from '../rental/rental.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const paymentConfirmation = async (status: string, transactionId: string) => {
  const paymentInfo = await verifyPayment(transactionId);

  const successfullyPaid =
    paymentInfo?.pay_status === 'Successful' && status === 'success';
  if (successfullyPaid) {
    const updatedRentalInfo = await Rental.findOneAndUpdate(
      { 'serviceCharge.transactionId': transactionId },
      { 'serviceCharge.isPaid': true },
    );
    if (!updatedRentalInfo)
      throw new AppError(httpStatus.NOT_FOUND, 'Rental not found');
  }
  const filePath = successfullyPaid
    ? path.join(__dirname, '../../views/success-payment.html')
    : path.join(__dirname, '../../views/failed-payment.html');
  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message}}', 'Payment Successful');
  template = template.replace('{{transactionId}}', transactionId);
  template = template.replace('{{date}}', new Date().toString());
  template = template.replace('{{amount}}', paymentInfo?.amount?.toString());
  template = template.replace('{{paymentMethod}}', paymentInfo?.payment_type);
  template = template.replace('{{email}}', paymentInfo?.cus_email);
  template = template.replace('{{homePage}}', config.CLIENT_URL!);
  return template;
};
export const PaymentServices = { paymentConfirmation };
