import * as request from 'supertest'

import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ConsumerModule } from '../src/socket.module'

describe('ConsumerController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConsumerModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'))
})
