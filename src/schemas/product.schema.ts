import { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
  image: string;
  name: string;
  description: string;
  retailPrice: number;
  wholesalePrice: number;
  discount: number;
}

export const ProductSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  retailPrice: {
    type: Number,
    required: true,
  },
  wholesalePrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    required: true,
  },
});

ProductSchema.virtual("Products");
