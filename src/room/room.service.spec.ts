import { Test, TestingModule } from '@nestjs/testing'

import { getTestingGlobalModule } from '../shared/test/util'
import { RoomService } from './room.service'

describe('RoomService', () => {
  let service: RoomService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [RoomService],
      }),
    ).compile()

    service = module.get<RoomService>(RoomService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOneByName', () => {
    it('should return "test" room', async () => {
      const room = await service.findOneByName('test')
      expect(room).toBeDefined()
      expect(room?.name).toBe('test')
    })
  })

  describe('create', () => {
    it('should return "test" room', async () => {
      const room = await service.create('test')
      expect(room).toBeDefined()
      expect(room?.name).toBe('test')
    })
  })
})
