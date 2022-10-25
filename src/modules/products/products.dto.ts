export class UpdateProductsDto {
  name?: string;
  description?: string;
  retailPrice?: number;
  wholesalePrice?: number;
  discount?: number;
}
export class CreateProductsDto {
  name: string;
  description: string;
  retailPrice: number;
  wholesalePrice: number;
  discount: number;
}
