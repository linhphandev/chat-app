import * as _ from 'lodash'

import { Injectable } from '@nestjs/common'

export type User = {
  id: string
  username: string
  password?: string
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 'test-user-id-1',
      username: 'john',
      password: 'john123',
    },
    {
      id: 'test-user-id-2',
      username: 'maria',
      password: 'maria123',
    },
  ]

  async findOneById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
