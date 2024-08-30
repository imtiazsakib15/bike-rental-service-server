import { z } from 'zod';

const currentYear = new Date().getFullYear();

const createSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Bike name must be at least 2 characters long' })
    .max(100, { message: 'Bike name must be at most 100 characters long' })
    .trim(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(500, { message: 'Description must be at most 500 characters long' })
    .trim(),
  pricePerHour: z
    .number()
    .positive({ message: 'Price per hour must be a positive number' }),
  isAvailable: z.boolean().default(true),
  cc: z.number().min(50, { message: 'Engine capacity must be at least 50 cc' }),
  year: z
    .number()
    .min(1885, {
      message: 'Year must be after the invention of motorcycles (1885)',
    })
    .max(currentYear, { message: `Year cannot be later than ${currentYear}` }),
  model: z
    .string()
    .min(1, { message: 'Model name must be at least 1 character long' })
    .max(50, { message: 'Model name must be at most 50 characters long' })
    .trim(),
  brand: z
    .string()
    .min(1, { message: 'Brand name must be at least 1 character long' })
    .max(50, { message: 'Brand name must be at most 50 characters long' })
    .trim(),
});

export const BikeValidationSchemas = { createSchema };
