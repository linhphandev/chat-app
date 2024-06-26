import { MongooseModel } from 'mongoose'

import { InjectModel } from '@nestjs/mongoose'

import { PagingDto } from '../shared/dto/paging.dto'
import { PaginatedMessageDto } from './dto/list-message-res.dto'
import { Message, MessageDocument } from './schemas/message.schema'

export class MessageRepository {
  constructor(@InjectModel(Message.name) private readonly MessageModel: MongooseModel<MessageDocument>) {}

  async findById(id: string): Promise<Message | null> {
    return await this.MessageModel.findOne({ _id: id, deleted: false })
  }

  async findOneByUser(id: string, userId: string): Promise<Message | null> {
    return await this.MessageModel.findOne({ _id: id, userIds: userId, deleted: false })
  }

  async list(condition: Record<string, any>, paging: PagingDto): Promise<PaginatedMessageDto> {
    const { page = 1, limit = 30 } = paging

    return await this.MessageModel.paginate(
      { ...condition, deleted: false },
      {
        page,
        limit,
        sort: '-createdAt',
      },
    )
  }

  async create(data: any): Promise<Message> {
    const message = new this.MessageModel(data)
    return await message.save()
  }

  async update(condition: Record<string, any>, data: Record<string, any>): Promise<Message | null> {
    return this.MessageModel.findByIdAndUpdate(condition, data, { new: true })
  }

  async deleteEveryone(id: string): Promise<boolean> {
    const result = await this.MessageModel.updateOne(
      { _id: id },
      {
        deleted: true,
      },
    )
    return result.matchedCount > 0
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const message = await this.findById(id)
    if (!message) return false

    const result = await this.MessageModel.updateOne(
      { _id: id },
      {
        deletedUserIds: [...message.deletedUserIds, userId],
      },
    )
    return result.matchedCount > 0
  }
}
