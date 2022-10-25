import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryDocument } from "../../schemas/category.schema";
import { CommonService } from "../../common/common.servise";

@Injectable()
export class CategoriesService extends CommonService<CategoryDocument> {
  constructor(
    @InjectModel("Category") private categoryModel: Model<CategoryDocument>
  ) {
    super(categoryModel);
  }
}
