import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { RequestSession, Session } from '../shared/decorators/request-session.decorator'
import { PagingDto } from '../shared/dto/paging.dto'
import { AuthGuard } from '../shared/guards/auth.guard'
import { CreateMessageDto } from './dto/create-message.dto'
import { DeleteMessageDto } from './dto/delete-message.dto'
import { PaginatedMessageDto } from './dto/list-message-res.dto'
import { MessageService } from './message.service'
import { Message } from './schemas/message.schema'

@ApiTags('Message')
@Controller('message')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':roomId')
  @ApiResponse({ type: PaginatedMessageDto })
  list(@Param('roomId') roomId: string, @RequestSession() session: Session, @Query() query: PagingDto) {
    return this.messageService.list(roomId, session.sub, query)
  }

  @HttpCode(HttpStatus.OK)
  @Post(':roomId')
  create(@Param('roomId') roomId: string, @RequestSession() session: Session, @Body() body: CreateMessageDto) {
    return this.messageService.create(roomId, session.sub, body)
  }

  @Delete(':messageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    schema: {
      properties: {
        result: {
          type: 'string',
          example: 'success',
        },
      },
    },
  })
  async delete(@RequestSession() session: Session, @Param('messageId') id: string, @Body() deleteMessage: DeleteMessageDto) {
    await this.messageService.delete(id, session.sub, deleteMessage)
    return {
      result: 'success',
    }
  }
}
