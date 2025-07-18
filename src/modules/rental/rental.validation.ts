import { z } from 'zod';

const paymentSchema = z.object({
  transactionId: z.string().nullable().default(null),
  isPaid: z.boolean().nullable().default(null),
});

const createRentalSchema = z.object({
  bikeId: z.string({
    required_error: 'Bike ID is required',
  }),
  startTime: z.string().datetime(),
  returnTime: z.string().datetime().nullable().default(null),
  totalCost: z
    .number({
      required_error: 'Total cost is required',
    })
    .default(0),
  isReturned: z.boolean().default(false),
  serviceCharge: paymentSchema.optional(),
  rent: paymentSchema.optional(),
});

export const RentalValidationSchemas = { createRentalSchema };
