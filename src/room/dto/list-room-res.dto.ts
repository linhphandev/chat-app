import { PaginateResultDto } from '../../shared/dto/paginate-result.dto'
import { Room } from '../schemas/room.schema'

export class PaginatedRoomDto extends PaginateResultDto(Room) {}
