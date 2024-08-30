import { model, Schema } from 'mongoose';
import { IBike } from './bike.interface';

const bikeSchema = new Schema<IBike>(
  {
    name: {
      type: String,
      required: [true, 'Bike name is required'],
      trim: true,
      minlength: [2, 'Bike name must be at least 2 characters long'],
      maxlength: [100, 'Bike name must be at most 100 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [500, 'Description must be at most 500 characters long'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      min: [0, 'Price per hour must be a positive number'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      required: [true, 'Engine capacity (cc) is required'],
      min: [50, 'Engine capacity must be at least 50 cc'],
    },
    year: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
      min: [1885, 'Year must be after the invention of motorcycles (1885)'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
      minlength: [1, 'Model name must be at least 1 character long'],
      maxlength: [50, 'Model name must be at most 50 characters long'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      minlength: [1, 'Brand name must be at least 1 character long'],
      maxlength: [50, 'Brand name must be at most 50 characters long'],
    },
  },
  {
    timestamps: true,
  },
);

export const Bike = model<IBike>('Bike', bikeSchema);
