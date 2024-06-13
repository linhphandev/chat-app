import { ApiProperty } from '@nestjs/swagger'

import { ClassType } from '../base-model'

export function PaginateResultDto<TItem>(ItemClass: ClassType<TItem>): any {
  class Paginated {
    /**
     * The list of items in the current page
     */
    @ApiProperty({ type: ItemClass })
    readonly docs: Array<TItem>

    /**
     * The current page
     */
    readonly page?: number

    /**
     * The number of items per page
     */
    readonly limit?: number

    /**
     * Total number of items
     */
    readonly total?: number

    /**
     * Total number of pages
     */
    readonly pages?: number
  }

  return Paginated
}
