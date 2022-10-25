import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseGuards
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategory, UpdateCategory } from "./categories.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("/category")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get("/list")
  getListCategories() {
    return this.categoriesService.getList();
  }

  @Get("/:id")
  getCategory(@Param("id") idCategory: string) {
    return this.categoriesService.getOnly(idCategory);
  }

  @UseGuards(AuthGuard)
  @Post("/create")
  createCategory(@Body() categoryDto: CreateCategory) {
    return this.categoriesService.save(categoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete("/remove/:id")
  removeCategory(@Param("id") idCategory: string) {
    return this.categoriesService.delete(idCategory);
  }

  @UseGuards(AuthGuard)
  @Patch("/patch/:id")
  patchCategory(
    @Param("id") idCategory: string,
    @Body() updateDate: UpdateCategory
  ) {
    return this.categoriesService.update(idCategory, updateDate);
  }
}
