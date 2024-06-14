import { ApiProperty } from '@nestjs/swagger'

import { BaseModelDto } from '../../shared/dto/base-model.dto'

export class RoomDto extends BaseModelDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  userIds?: string[]
}
