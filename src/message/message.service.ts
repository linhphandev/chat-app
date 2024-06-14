import * as _ from 'lodash'

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { RoomRepository } from '../room/room.repository'
import { PagingDto } from '../shared/dto/paging.dto'
import { CreateMessageDto } from './dto/create-message.dto'
import { DeleteMessageDto } from './dto/delete-message.dto'
import { PaginatedMessageDto } from './dto/list-message-res.dto'
import { MessageRepository } from './message.repository'
import { Message } from './schemas/message.schema'

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository, private readonly roomRepository: RoomRepository) {}

  async getDetail(id: string): Promise<Message> {
    const message = await this.messageRepository.findById(id)
    if (!message) {
      throw new NotFoundException('Message not found')
    }
    return message
  }

  async list(roomId: string, userId: string, paging: PagingDto): Promise<PaginatedMessageDto> {
    const room = await this.roomRepository.findOneByUser(roomId, userId)
    if (!room) {
      throw new UnauthorizedException('Access denied')
    }

    return await this.messageRepository.list({ roomId, deleted: false, deletedUserIds: { $ne: userId } }, paging)
  }

  async create(roomId: string, userId: string, body: CreateMessageDto): Promise<Message> {
    const room = await this.roomRepository.findOneByUser(roomId, userId)
    if (!room) {
      throw new UnauthorizedException('Access denied')
    }

    const { content } = body
    return this.messageRepository.create({ createdBy: userId, roomId, content })
  }

  async delete(messageId: string, userId: string, deleteMessage: DeleteMessageDto): Promise<void> {
    const message = await this.getDetail(messageId)

    if (message.createdBy === userId && deleteMessage.everyone) {
      await this.messageRepository.deleteEveryone(message._id)
      return
    }

    if (message.deletedUserIds.find((m) => m === userId)) {
      // User has been deleted
      return
    }

    await this.messageRepository.delete(message._id, userId)
    return
  }
}
