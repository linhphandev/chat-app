import { Test, TestingModule } from '@nestjs/testing'

import { getTestingGlobalModule } from 'libs/test/util'

import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [UsersService],
      }),
    ).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOneById', () => {
    it('should return "john"', async () => {
      const user = await service.findOneById('test-user-id-1')
      expect(user).toBeDefined()
      expect(user?.username).toBe('john')
    })
  })

  describe('findOneByUsername', () => {
    it('should return "john"', async () => {
      const user = await service.findOneByUsername('john')
      expect(user).toBeDefined()
      expect(user?.username).toBe('john')
    })
  })
})
