import { z } from 'zod';

const createUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name must be at most 100 characters long' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, {
      message: 'Phone number must be a valid number between 10 to 15 digits',
    })
    .trim(),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .trim(),
  role: z
    .enum(['admin', 'user'], {
      invalid_type_error: 'Role must be either admin or user',
    })
    .default('user'),
  isActive: z.boolean().default(true),
});

const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name must be at most 100 characters long' })
    .trim()
    .optional(),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, {
      message: 'Phone number must be a valid number between 10 to 15 digits',
    })
    .trim()
    .optional(),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .trim()
    .optional(),
});

const updateUserRoleSchema = z.object({
  role: z.enum(['admin', 'user'], {
    required_error: 'Role is required',
    invalid_type_error: 'Role must be either admin or user',
  }),
});

export const UserValidationSchemas = {
  createUserSchema,
  updateUserSchema,
  updateUserRoleSchema,
};
