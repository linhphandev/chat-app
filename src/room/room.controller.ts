import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { RequestSession, Session } from '../shared/decorators/request-session.decorator'
import { PagingDto } from '../shared/dto/paging.dto'
import { AuthGuard } from '../shared/guards/auth.guard'
import { CreateRoomDto } from './dto/create-room.dto'
import { PaginatedRoomDto } from './dto/list-room-res.dto'
import { RoomDto } from './dto/room.dto'
import { RoomService } from './room.service'

@ApiTags('Room')
@Controller('room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  @ApiResponse({ type: RoomDto })
  @ApiOperation({
    summary: 'create room',
  })
  async create(@RequestSession() session: Session, @Body() body: CreateRoomDto) {
    return this.roomService.create(body.name, session.sub)
  }

  @HttpCode(HttpStatus.OK)
  @Put(':roomId')
  @ApiResponse({ type: RoomDto })
  @ApiOperation({
    summary: 'join a room',
  })
  async join(@RequestSession() session: Session, @Param('roomId') id: string) {
    return this.roomService.join(id, session.sub)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':roomId')
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
  @ApiOperation({
    summary: 'leave a room',
  })
  async leave(@RequestSession() session: Session, @Param('roomId') id: string) {
    await this.roomService.leave(id, session.sub)
    return {
      result: 'success',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  @ApiOperation({
    summary: 'get list room that user joined',
  })
  @ApiResponse({ type: PaginatedRoomDto })
  async list(@RequestSession() session: Session, @Query() query: PagingDto) {
    return this.roomService.listByUser(session.sub, query)
  }
}
