import { MongooseModel } from 'mongoose'
import { PagingDto } from 'src/shared/dto/paging.dto'

import { InjectModel } from '@nestjs/mongoose'

import { PaginatedRoomDto } from './dto/list-room-res.dto'
import { Room, RoomDocument } from './schemas/room.schema'

export class RoomRepository {
  constructor(@InjectModel(Room.name) private readonly RoomModel: MongooseModel<RoomDocument>) {}

  async findOneByName(name: string): Promise<Room | null> {
    return await this.RoomModel.findOne({ name, deleted: false })
  }

  async findById(id: string): Promise<Room | null> {
    return await this.RoomModel.findOne({ _id: id, deleted: false })
  }

  async findOneByUser(id: string, userId: string): Promise<Room | null> {
    return await this.RoomModel.findOne({ _id: id, userIds: userId, deleted: false })
  }

  async list(condition: Record<string, any>, paging: PagingDto): Promise<PaginatedRoomDto> {
    const { page = 1, limit = 30 } = paging

    return await this.RoomModel.paginate(
      { ...condition, deleted: false },
      {
        page,
        limit,
        sort: '-createdAt',
      },
    )
  }

  async create(data: Record<string, any>): Promise<Room> {
    const room = new this.RoomModel(data)
    return await room.save()
  }

  async update(condition: Record<string, any>, data: Record<string, any>): Promise<Room | null> {
    return await this.RoomModel.findByIdAndUpdate(condition, data, { new: true })
  }
}
