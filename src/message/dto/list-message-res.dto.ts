import { PaginateResultDto } from '../../shared/dto/paginate-result.dto'
import { Message } from '../schemas/message.schema'

export class PaginatedMessageDto extends PaginateResultDto(Message) {}
