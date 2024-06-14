import { IsBoolean, IsOptional } from 'class-validator'

export class DeleteMessageDto {
  /**
   * Delete message for all users
   */
  @IsBoolean()
  @IsOptional()
  readonly everyone?: boolean
}
