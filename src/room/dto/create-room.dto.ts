import { ApiProperty } from '@nestjs/swagger'

import { CheckString } from '../../shared/decorators/validation.decorator'

export class CreateRoomDto {
  @ApiProperty()
  @CheckString({
    minMaxLength: [1, 200],
    minLengthMessage: 'name is too short',
    maxLengthMessage: 'name is too long',
    patternMessage: 'name is invalid',
    typeMessage: 'name is invalid',
  })
  readonly name: string
}
