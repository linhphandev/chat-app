import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient()
    try {
      const token = this.extractTokenFromHeader(client)
      if (!token) {
        throw new WsException('Invalid credentials.')
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY || '',
      })

      client['session'] = payload
    } catch (ex) {
      console.log(ex)
      throw new WsException('Invalid credentials.')
    }
    return true
  }

  private extractTokenFromHeader(client: any): string | undefined {
    const [type, token] = client.handshake?.headers?.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
