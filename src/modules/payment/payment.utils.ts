import axios from 'axios';
import config from '../../config';

type TPaymentInfo = {
  transactionId: string;
  amount: number;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

export const initiatePayment = async (paymentInfo: TPaymentInfo) => {
  try {
    const paymentData = {
      store_id: config.STORE_ID,
      tran_id: paymentInfo.transactionId,
      success_url: `${config.SERVER_URL}/api/payment?status=success&transactionId=${paymentInfo.transactionId}`,
      fail_url: `${config.SERVER_URL}/api/payment?status=failed`,
      cancel_url: `${config.CLIENT_URL}`,
      amount: paymentInfo.amount,
      currency: 'BDT',
      signature_key: config.SIGNATURE_KEY,
      desc: paymentInfo.description,
      cus_name: paymentInfo.customerName,
      cus_email: paymentInfo.customerEmail,
      cus_phone: paymentInfo.customerPhone,
      type: 'json',
    };
    const result = await axios.post(
      `${config.AAMAR_PAY_BASE_URL}/jsonpost.php`,
      paymentData,
    );

    return result.data;
  } catch (error) {
    throw new Error('Payment initiation failed');
  }
};

export const verifyPayment = async (transactionId: string) => {
  try {
    const response = await axios.get(
      `${config.AAMAR_PAY_BASE_URL}/api/v1/trxcheck/request.php`,
      {
        params: {
          request_id: transactionId,
          store_id: config.STORE_ID,
          signature_key: config.SIGNATURE_KEY,
          type: 'json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Payment verification failed');
  }
};
