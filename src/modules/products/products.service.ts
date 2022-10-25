import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductDocument } from "../../schemas/product.schema";
import { CommonService } from "../../common/common.servise";

@Injectable()
export class ProductsService extends CommonService<ProductDocument> {
  constructor(
    @InjectModel("Product") private productModel: Model<ProductDocument>
  ) {
    super(productModel);
  }
}
