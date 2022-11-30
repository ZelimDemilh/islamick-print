import { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  image: string;
}

export const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

CategorySchema.virtual("Categories");
