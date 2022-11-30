import { sizes } from "../../schemas/product.schema";

export class UpdateProductsDto {
  name?: string;
  category: string;
  description?: string;
  retailPrice?: number;
  wholesalePrice?: number;
  discount?: number;
  sizes?: sizes[];
}
export class CreateProductsDto {
  name: string;
  category: string;
  description?: string;
  retailPrice: number;
  wholesalePrice: number;
  discount?: number;
  sizes?: sizes[];
}
