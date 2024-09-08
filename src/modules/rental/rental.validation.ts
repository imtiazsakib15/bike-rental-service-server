import { z } from 'zod';

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
});

export const RentalValidationSchemas = { createRentalSchema };
