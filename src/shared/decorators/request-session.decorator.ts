import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type Session = {
  readonly sub: string
  readonly username: string
  readonly iat: number
  readonly exp: number
}

export const RequestSession = createParamDecorator((data: unknown, ctx: ExecutionContext): Session | undefined => {
  const request = ctx.switchToHttp().getRequest()
  const session = request.session as Session
  return session
})
