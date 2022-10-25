import { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
}

export const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

CategorySchema.virtual("Categories");
