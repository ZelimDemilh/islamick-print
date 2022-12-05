import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategory, UpdateCategory } from "./categories.dto";
import { AuthGuard } from "../auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "../../common/strogeFileInterceptor";
import {AdminGuard} from "../auth/admin.guard";

@Controller("/category")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get("/list")
  getListCategories() {
    return this.categoriesService.getList();
  }

  @Get("/category/:id")
  getCategory(@Param("id") idCategory: string) {
    return this.categoriesService.getOnly(idCategory);
  }

  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("img", storage))
  @Post("/create")
  createCategory(@Body() categoryDto: CreateCategory, @UploadedFile() file) {
    return this.categoriesService.save({ ...categoryDto, image: `/image/${file.name}` });
  }

  @UseGuards(AdminGuard)
  @Delete("/remove/:id")
  removeCategory(@Param("id") idCategory: string) {
    return this.categoriesService.delete(idCategory);
  }

  @UseGuards(AdminGuard)
  @Patch("/patch/:id")
  @UseInterceptors(FileInterceptor("img", storage))
  patchCategory(
    @Param("id") idCategory: string,
    @Body() updateCategory: UpdateCategory,
    @UploadedFile() file
  ) {
    return this.categoriesService.update(idCategory, {...updateCategory, image: `/image/${file.name}`});
  }
}
