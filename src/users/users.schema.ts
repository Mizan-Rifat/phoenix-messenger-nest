import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
});

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
