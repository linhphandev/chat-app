import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { RoomRepository } from '../room/room.repository'
import { getTestingGlobalModule } from '../shared/test/util'
import { MessageRepository } from './message.repository'
import { MessageService } from './message.service'

describe('MessageService', () => {
  let service: MessageService
  let messageRepository: MessageRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [MessageService, MessageRepository, RoomRepository],
      }),
    ).compile()

    service = module.get<MessageService>(MessageService)
    messageRepository = module.get<MessageRepository>(MessageRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('get message detail', () => {
    it('should get success', async () => {
      const result = await service.getDetail('test-message-id-1')
      expect(result._id).toBe('test-message-id-1')
    })
    it('should get not found failed', async () => {
      await expect(service.getDetail('test-message-id-2')).rejects.toThrow(NotFoundException)
    })
  })

  describe('fetch the room messages', () => {
    it('should get list success', async () => {
      const result = await service.list('test-room-id-1', 'test-user-id-1', { page: 1, limit: 30 })
      expect(result.docs?.length).toBeGreaterThan(0)
    })
    it('should get list failed with access denied', async () => {
      await expect(service.list('test-room-id-2', 'test-user-id-2', { page: 1, limit: 30 })).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('create message', () => {
    it('should create message success', async () => {
      const result = await service.create('test-room-id-1', 'test-user-id-1', { content: 'test' })
      expect(result.content).toBe('test')
    })
    it('should create message failed with access denied', async () => {
      await expect(service.create('test-room-id-2', 'test-user-id-2', { content: 'test' })).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('delete message', () => {
    it('should delete message success with everyone is true', async () => {
      await expect(service.delete('test-message-id-1', 'test-user-id-1', { everyone: true })).resolves.not.toThrow()
    })
    it('should delete message success with everyone is false', async () => {
      await expect(service.delete('test-message-id-1', 'test-user-id-1', { everyone: false })).resolves.not.toThrow()
    })
    it('should delete message failed with not found message', async () => {
      await expect(service.delete('test-message-id-2', 'test-user-id-2', { everyone: false })).rejects.toThrow(NotFoundException)
    })
    it('should delete message failed with exists deleted', async () => {
      await expect(service.delete('test-message-id-1', 'test-user-id-2', { everyone: false })).resolves.not.toThrow()
    })
  })
})
