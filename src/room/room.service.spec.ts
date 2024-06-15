import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { getTestingGlobalModule } from '../shared/test/util'
import { RoomRepository } from './room.repository'
import { RoomService } from './room.service'

describe('RoomService', () => {
  let service: RoomService
  let roomRepository: RoomRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [RoomService, RoomRepository],
      }),
    ).compile()

    service = module.get<RoomService>(RoomService)
    roomRepository = module.get<RoomRepository>(RoomRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('get room by room name', () => {
    it('should get room success', async () => {
      const room = await service.findOneByName('test-room-name-1')
      expect(room).toBeDefined()
      expect(room?.name).toBe('test-room-name-1')
    })
  })

  describe('get list rooms by user', () => {
    it('should fetch list rooms success', async () => {
      const roomRes = await service.listByUser('test-user-id-1', { page: 1, limit: 30 })
      expect(roomRes).toBeDefined()
      expect(roomRes?.docs?.length).toBeGreaterThan(0)
    })
  })

  describe('get room detail', () => {
    it('should get success', async () => {
      const result = await service.getDetail('test-room-id-1')
      expect(result._id).toBe('test-room-id-1')
    })
    it('should get not found failed', async () => {
      await expect(service.getDetail('test-room-id-2')).rejects.toThrow(NotFoundException)
    })
  })

  describe('create room', () => {
    it('should create room success', async () => {
      const room = await service.create('test')
      expect(room).toBeDefined()
      expect(room?.name).toBe('test')
    })
  })

  describe('join room', () => {
    it('should join room success', async () => {
      const room = await service.join('test-room-id-1', 'test-user-id-2')
      expect(room).toBeDefined()
      expect(room?._id).toBe('test-room-id-1')
    })
    it('should join room failed with not found', async () => {
      await expect(service.join('test-room-id-2', 'test-user-id-1')).rejects.toThrow(NotFoundException)
    })
    it('should join room failed with reason already joined', async () => {
      await expect(service.join('test-room-id-1', 'test-user-id-1')).rejects.toThrow(BadRequestException)
    })
    it('should join room failed when update room data failed', async () => {
      jest.spyOn(roomRepository, 'update').mockResolvedValue(null)
      await expect(service.join('test-room-id-1', 'test-user-id-2')).rejects.toThrow(BadRequestException)
    })
  })

  describe('leave room', () => {
    it('should leave room success', async () => {
      await expect(service.leave('test-room-id-1', 'test-user-id-1')).resolves.not.toThrow()
    })
    it('should leave room failed with not found', async () => {
      await expect(service.leave('test-room-id-2', 'test-user-id-1')).rejects.toThrow(NotFoundException)
    })
  })
})
