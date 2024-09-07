import { z } from 'zod';

const createRentalSchema = z
  .object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    bikeId: z.string({
      required_error: 'Bike ID is required',
    }),
    startTime: z.date({
      required_error: 'Start time is required',
    }),
    returnTime: z.date().nullable().default(null),
    totalCost: z
      .number({
        required_error: 'Total cost is required',
      })
      .positive({ message: 'Total cost must be a positive number' }),
    isReturned: z.boolean().default(false),
  })
  .refine(
    (rental) => {
      if (rental.returnTime === null) return true;
      return rental.returnTime >= rental.startTime;
    },
    {
      message: 'Return time must be on or after the start time',
      path: ['returnTime'],
    },
  );

export const RentalValidationSchemas = { createRentalSchema };
