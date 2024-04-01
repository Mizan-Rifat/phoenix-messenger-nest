import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import mongoose from 'mongoose';
import { UserSchema } from 'src/users/users.schema';

@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidationConstraint
  implements ValidatorConstraintInterface
{
  async validate(text: string, args: ValidationArguments) {
    const { constraints, property } = args;
    // console.log({ args });
    //@ts-ignore
    // const model = mongoose.model(constraints[0].name, constraints[0].schema);
    // console.log({ property, text, model });
    // const exist = await model.exists({ [property]: text });

    const model = mongoose.model('User', UserSchema);
    const exist = await model.exists({ email: 'rifat1@mail.com' });

    console.log({ exist });

    return !!exist;
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}

export function UniqueValidation(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [validationOptions],
      validator: UniqueValidationConstraint,
    });
  };
}
