import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import {
  UniqueValidation,
  UniqueValidationConstraint,
} from 'src/validation/UniqueValidation';
import { User, UserSchema } from '../users.schema';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  //@ts-ignore
  @Validate(UniqueValidationConstraint, { name: 'User', schema: UserSchema })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
