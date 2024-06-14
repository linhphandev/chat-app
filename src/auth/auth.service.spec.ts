import { Test, TestingModule } from '@nestjs/testing'

import { getTestingGlobalModule } from '../shared/test/util'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [AuthService],
      }),
    ).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe('Hello World!')
    })
  })
})
