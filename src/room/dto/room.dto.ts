import { BaseModelDto } from '../../shared/dto/base-model.dto'

export class RoomDto extends BaseModelDto {
  id: string

  name: string

  userIds?: string[]
}
