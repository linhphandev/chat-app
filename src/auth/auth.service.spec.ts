import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { getTestingGlobalModule } from '../shared/test/util'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [
          AuthService,
          UsersService,
          {
            provide: JwtService,
            useValue: {
              signAsync: jest.fn().mockResolvedValue('token-test'),
            },
          },
        ],
      }),
    ).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('signIn', () => {
    it('should login success', async () => {
      const result = await service.signIn('john', 'john123')
      expect(result).toHaveProperty('access_token')
    })
    it('should login failed with wrong password', async () => {
      await expect(service.signIn('john', 'test')).rejects.toThrow(UnauthorizedException)
    })
    it('should login failed with user is null', async () => {
      await expect(service.signIn('john1', 'test')).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('me', () => {
    it('should get success', async () => {
      const result = await service.me('test-user-id-john')
      expect(result).toBeDefined()
    })
  })
})
