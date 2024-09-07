import { Schema } from 'mongoose';
import { IRental } from './rental.interface';
import { model } from 'mongoose';

const rentalSchema = new Schema<IRental>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'Bike ID is required'],
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
      default: Date.now,
    },
    returnTime: {
      type: Date,
      required: [true, 'Start time is required'],
      default: null,
    },
    totalCost: {
      type: Number,
      required: [true, 'Total cost is required'],
      min: [0, 'Total cost must be a positive number'],
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Rental = model<IRental>('Rental', rentalSchema);

export default Rental;
