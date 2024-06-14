import { Test, TestingModule } from '@nestjs/testing'

import { getTestingGlobalModule } from '../shared/test/util'
import { MessageService } from './message.service'

describe('MessageService', () => {
  let service: MessageService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getTestingGlobalModule({
        providers: [MessageService],
      }),
    ).compile()

    service = module.get<MessageService>(MessageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
