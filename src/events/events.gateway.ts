import { Socket, Server } from 'socket.io'

import { UseFilters, UseGuards } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets'

import { CreateMessageDto } from '../message/dto/create-message.dto'
import { MessageService } from '../message/message.service'
import { Session } from '../shared/decorators/request-session.decorator'
import { WsExceptionFilter } from '../shared/filters/ws-exceptions.filter'
import { WsAuthGuard } from '../shared/guards/ws-auth.guard'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server

  @UseGuards(WsAuthGuard)
  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomId') roomId: string,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<void> {
    if (!roomId) {
      console.log('Room not found')
      throw new WsException('Room not found')
    }
    const session = (<any>client).session as Session
    const message = await this.messageService.create(roomId, session.sub, payload)
    this.server.emit(`recMessage_${roomId}`, message)
    console.log('message created')
  }

  afterInit(server: Server) {
    console.log(server)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`)
  }
}
