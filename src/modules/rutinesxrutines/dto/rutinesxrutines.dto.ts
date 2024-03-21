import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { RutinesxRutines } from '../entity/rutinesxrutines.entity';
import { Role } from '../../../utils/enum/role.enum';
import { PaginationDto, RequestPaginationDto } from '../../../utils/dtos/Pagination.dto';

export class RutinesDto extends OmitType(RutinesxRutines, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
] as const) {}

// export class UserPaginationDto extends PaginationDto<User> {
//   @ApiProperty({ type: User, isArray: true })
//   data: User[];
// }
