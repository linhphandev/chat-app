import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User, UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.username }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async me(sub: string): Promise<User | undefined> {
    return await this.usersService.findOneById(sub)
  }
}
