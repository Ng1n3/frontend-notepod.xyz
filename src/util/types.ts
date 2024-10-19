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
  username: z.string().min(4, 'username must be at least 4 characters'),
});

export const createSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 4 characters'),
});

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must have at least 1 character')
    .max(256, 'Title can only have maximum of 256 characters'),
  body: z.string().optional(),
  isDeleted: z.boolean().default(false),
  deletedAt: z.date().optional().nullable(),
});

export const updateNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must have at least 1 character')
    .max(256, 'Title can only have maximum of 256 characters')
    .optional(),
  body: z.string().optional(),
});

export type CreatePasswordSchema = z.infer<typeof createPasswordSchema>;
export type CreateSignupSchema = z.infer<typeof createSignupSchema>;
export type CreateSigninSchema = z.infer<typeof createSigninSchema>;
export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema>;
