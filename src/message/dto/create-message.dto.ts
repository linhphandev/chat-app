import { CheckString } from '../../shared/decorators/validation.decorator'

export class CreateMessageDto {
  @CheckString({
    minMaxLength: [1, 200],
    minLengthMessage: 'content is too short',
    maxLengthMessage: 'content is too long',
    patternMessage: 'content is invalid',
    typeMessage: 'content is invalid',
  })
  readonly content: string
}
