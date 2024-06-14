import * as _ from 'lodash'

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { PagingDto } from '../shared/dto/paging.dto'
import { PaginatedRoomDto } from './dto/list-room-res.dto'
import { RoomRepository } from './room.repository'
import { Room } from './schemas/room.schema'

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async findOneByName(name: string): Promise<Room | null> {
    return this.roomRepository.findOneByName(name)
  }

  async listByUser(userId: string, query: PagingDto): Promise<PaginatedRoomDto> {
    return this.roomRepository.list({ userIds: userId }, query)
  }

  async getDetail(id: string): Promise<Room> {
    const room = await this.roomRepository.findById(id)
    if (!room) {
      throw new NotFoundException('Room not found')
    }
    return room
  }

  async create(name: string, createdBy?: string): Promise<Room> {
    return this.roomRepository.create({ name, createdBy, userIds: [createdBy] })
  }

  async join(id: string, userId: string): Promise<Room> {
    const room = await this.getDetail(id)
    if (room.userIds.includes(userId)) {
      throw new BadRequestException('User has joined room')
    }
    const roomResult = await this.roomRepository.update(
      { _id: room._id },
      {
        userIds: [...room.userIds, userId],
      },
    )
    if (!roomResult) {
      throw new BadRequestException('join failed')
    }
    return roomResult
  }

  async leave(id: string, userId: string): Promise<void> {
    const room = await this.getDetail(id)
    await this.roomRepository.update(
      { _id: room._id },
      {
        userIds: room.userIds.filter((m) => m !== userId),
      },
    )
  }
}
