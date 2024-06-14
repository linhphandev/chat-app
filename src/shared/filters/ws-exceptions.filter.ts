import { Catch, ArgumentsHost } from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception)
    super.catch(exception, host)
  }
}
