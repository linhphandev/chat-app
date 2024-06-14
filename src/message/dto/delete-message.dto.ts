import { IsBoolean, IsOptional } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class DeleteMessageDto {
  /**
   * Delete message for all users
   */
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly everyone?: boolean
}
