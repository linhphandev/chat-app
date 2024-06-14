import { ModuleMetadata } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { getModelToken } from '@nestjs/mongoose'

import { Message } from '../../message/schemas/message.schema'
import { TestMessageModel } from '../../message/test/test-message-model'
import { Room } from '../../room/schemas/room.schema'
import { TestRoomModel } from '../../room/test/test-room-model'

export function getTestingGlobalModule(metadata?: ModuleMetadata) {
  const { imports = [], providers = [], controllers = [] } = metadata || {}
  return {
    imports: [
      JwtModule.register({
        global: true,
        secret: 'test',
        signOptions: { expiresIn: '1d' },
      }),
      ...imports,
    ],
    providers: [
      {
        provide: getModelToken(Room.name),
        useValue: TestRoomModel,
      },
      {
        provide: getModelToken(Message.name),
        useValue: TestMessageModel,
      },
      ...providers,
    ],
    controllers,
  }
}
