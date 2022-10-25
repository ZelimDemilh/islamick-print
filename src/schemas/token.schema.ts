import { Document, Schema } from "mongoose";

export interface TokenDocument extends Document {
  user: string;
  refreshToken: string
}

export const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  refreshToken:{
    type: String,
    required: true
  }
});

TokenSchema.virtual("Tokens");