import { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  firstName: string;
  secondName: string;
  mail: string;
  password: string;
  phone: string;
  favourites: string[];
  role: string;
  isActivated: boolean;
  activationLink: string;
}

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  favourites: {
    type: [String],
    default: [],
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
    required: true,
  },
  activationLink: {
    type: String,
    required: true,
  },
});

UserSchema.virtual("Users");
