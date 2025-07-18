import { Types } from 'mongoose';

export interface IRental {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date | null;
  totalCost?: number;
  isReturned?: boolean;
  serviceCharge?: IPayment;
  rent?: IPayment;
}

interface IPayment {
  transactionId?: string;
  isPaid?: boolean;
}
