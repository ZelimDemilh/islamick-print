import { Document, Schema } from "mongoose";

export type sizes = {
  width: string;
  height: string;
};

export interface ProductDocument extends Document {
  image: string;
  name: string;
  category: string;
  description: string;
  retailPrice: number;
  wholesalePrice: number;
  discount: number;
  sizes: sizes[];
}

export const ProductSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: "Categories",
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
    required: false,
  },
  sizes: {
    type: Array,
    required: false,
  },
});

ProductSchema.virtual("Products");
