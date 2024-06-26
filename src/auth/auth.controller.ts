import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { RequestSession, Session } from '../shared/decorators/request-session.decorator'
import { AuthGuard } from '../shared/guards/auth.guard'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'login',
  })
  @ApiResponse({
    schema: {
      properties: {
        access_token: {
          type: 'string',
        },
      },
    },
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'get user profile',
  })
  getProfile(@RequestSession() session: Session) {
    return this.authService.me(session?.sub)
  }
}
