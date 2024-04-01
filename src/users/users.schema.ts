import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as any; // Ensure 'this' is interpreted as a user document

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(user.password, salt); // Hash the password
    user.password = hashedPassword; // Set the hashed password
    return next();
  } catch (error) {
    return next(error); // Pass any errors to the next middleware
  }
});

UserSchema.post('save', function (error, doc, next) {
  next(
    error.code === 11000
      ? new Error('The email has already been taken.')
      : error,
  );
});
