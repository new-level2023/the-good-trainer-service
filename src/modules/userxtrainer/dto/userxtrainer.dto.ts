import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { UserTrainer } from '../entity/userxtrainer.entity';
import { Role } from '../../../utils/enum/role.enum';
import { PaginationDto, RequestPaginationDto } from '../../../utils/dtos/Pagination.dto';
import { User } from 'src/modules/user/entity/user.entity';

export class UserTrainerDto extends OmitType(UserTrainer, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
] as const) {}

export class CreatedUserTrainerDto extends OmitType(UserTrainerDto, [
  'enabled',
  'userId',
] as const) {
  @ApiProperty({
    description: 'trainer id',
    required: true,
    example: 'user-id',
  })
  @IsOptional()
  trainerId: string;
}
export class UpdatedUserTrainerDto extends OmitType(UserTrainer, [
  'userId',
  'trainerId',
  'enabled',
  'createdAt',
  'deletedAt',
  'updatedAt',
] as const) {
  @ApiProperty({
    description: 'id of the relation',
    required: true,
    example: 'user-id',
  })
  @IsString()
  id: string;
}

// export class UserPaginationDto extends PaginationDto<User> {
//   @ApiProperty({ type: User, isArray: true })
//   data: User[];
// }
