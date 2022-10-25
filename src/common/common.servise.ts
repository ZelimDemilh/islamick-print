import { Model, Document, FilterQuery } from "mongoose";
import { BadRequestException } from "@nestjs/common";

export class CommonService<D = Document> {
  constructor(protected readonly model: Model<D>) {}

  async save(dto: FilterQuery<D> = {}) {
    const res = await this.model.findOne(dto);
    if (res) {
      throw new BadRequestException("Ошибка при сохранении");
    }
    return await this.model.create(dto);
  }

  async getList() {
    const res = await this.model.find();
    if (!res) {
      throw new BadRequestException("Ошибка при выдаче");
    }
    return res;
  }

  async getOnly(id: string) {
    const res = await this.model.findById(id);
    if (!res) {
      throw new BadRequestException("Ошибка при выдаче");
    }
    return res;
  }

  async delete(id: string) {
    const res = await this.model.findByIdAndRemove(id);
    if (!res) {
      throw new BadRequestException("Ошибка при удалении");
    }
    return "Удаление прошло успешно";
  }
  async update(id: string, updateDate: FilterQuery<D> = {}) {
    const res = await this.model.findByIdAndUpdate(id, updateDate);
    if (!res) {
      throw new BadRequestException("Ошибка при обновлении данных");
    }
    return "Изменения вступли в силу";
  }
}
