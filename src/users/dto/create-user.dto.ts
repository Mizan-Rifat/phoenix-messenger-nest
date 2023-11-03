import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createUserSchema = z
  .object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z.string({ required_error: 'Email field is required' }).email({
      message: 'Email filed must be a valid email address',
    }),
    password: z.string(),
  })
  .required();

export class CreateUserDto extends createZodDto(createUserSchema) {}
