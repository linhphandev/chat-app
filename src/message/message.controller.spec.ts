import { Test, TestingModule } from '@nestjs/testing'

import { MessageController } from './message.controller'
import { MessageService } from './message.service'

describe('MessageController', () => {
  let messageController: MessageController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService],
    }).compile()

    messageController = app.get<MessageController>(MessageController)
  })

  it('should be defined', () => {
    expect(messageController).toBeDefined()
  })
})
