import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat-app'),
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
  ],
  providers: [],
})
export class AppModule {}
