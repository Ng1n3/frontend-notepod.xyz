import { z } from "zod";

export const signUpSchema = z.object({
  // id: z.number(),
  email: z.string().email(),
  fieldname: z.string().min(1, 'field must have at least 1 character'),
  username: z.string().optional(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type SignupSchema = z.infer<typeof signUpSchema>;