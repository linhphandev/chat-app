import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'
import { EventsModule } from './events/events.module'
import { MessageModule } from './message/message.module'
import { RoomModule } from './room/room.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || '',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async () => ({
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chat-app',
        maxPoolSize: 10,
        autoIndex: true,
        connectionFactory: (connection) => {
          connection.once('open', async () => {
            console.log('Connected to MongoDB successfully')
          })
          connection.on('error', (error) => {
            console.error(`Failed to connect to MongoDB at ${connection.host}:${connection.port}`, error)
          })
          return connection
        },
      }),
      inject: [],
    }),
    AuthModule,
    RoomModule,
    MessageModule,
    EventsModule,
  ],
  providers: [],
})
export class AppModule {}
