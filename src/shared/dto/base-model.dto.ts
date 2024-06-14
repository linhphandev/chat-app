import { BaseModel } from '../base-model'

export class BaseModelDto {
  /**
   * When to create document
   */
  createdAt?: Date

  /**
   * When to update document
   */
  updatedAt?: Date

  /**
   * When to delete document
   */
  deletedAt?: Date

  /**
   * Indicate document is soft-deleted or not
   */
  deleted?: boolean

  constructor(model: BaseModel) {
    if (!model) return
    this.createdAt = model.createdAt
    this.updatedAt = model.updatedAt
    this.deleted = model.deleted
    this.deletedAt = model.deletedAt
  }
}
