import { z } from 'zod';

export const createPasswordSchema = z.object({
  // id: z.number(),
  email: z.string().email(),
  fieldname: z.string().min(1, 'field must have at least 1 character'),
  username: z.string().optional(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export const createSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 4 characters'),
  username: z.string().min(4, 'username must be at least 4 characters')
});

export const createSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 4 characters'),
});

export type CreatePasswordSchema = z.infer<typeof createPasswordSchema>;
export type CreateSignupSchema = z.infer<typeof createSignupSchema>;
export type CreateSigninSchema = z.infer<typeof createSigninSchema>