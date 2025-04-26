import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  userID: string;
  firstName?: string;
  lastName?: string;
  isAdministrator: boolean;
  password: string;

}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  userID: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  isAdministrator: { type: Boolean, default: false },
  password: { type: String, required: true },
});

// 3. Create a Model.
export const User = model<IUser>('User', userSchema);
