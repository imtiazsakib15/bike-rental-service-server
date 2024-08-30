import { Schema } from 'mongoose';
import { IBooking } from './booking.interface';
import { model } from 'mongoose';

const bookingSchema = new Schema<IBooking>(
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

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
