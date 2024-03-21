import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Rutines } from '../entity/gym.entity';
import { Role } from '../../../utils/enum/role.enum';
import { PaginationDto, RequestPaginationDto } from '../../../utils/dtos/Pagination.dto';
import { IsArray, IsNotEmpty } from '@nestjs/class-validator';
import { Column } from 'typeorm';

export interface RutinesxRutines {
  map(
    arg0: (item: any) => Promise<{
      restTime: number;
      intensity: string;
      comments_by_trainer: string;
      weightSet: number;
      repetition: number;
      set: number;
      exerciseName: string;
    }>,
  ): any;
  restTime: number;
  intensity: string;
  comments_by_trainer: string;
  weightSet: number;
  repetition: number;
  set: number;
  exerciseName: string;
}

export class RutinesDto extends OmitType(Rutines, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'trainerId',
] as const) {}

export class CreateRutinesDto extends PartialType(RutinesDto) {

  @ApiProperty({
    description: 'Category of Rutine',
    required: false,
  })
  public trainerId: string;

  @ApiProperty({
    isArray: true,
    example: [
      {
        restTime: 1,
        intensity: 'ALTA',
        comments_by_trainer: 'Comentario',
        weightSet: 1,
        repetitions: 1,
        set: 1,
        exerciseName: 'CURL BICEPS CON BARRA',
      },
    ],
    description: 'Array de objetos de ejercicios',
  })
  @IsNotEmpty()
  @IsArray()
  public exercises: RutinesxRutines;

  @ApiProperty({
    description: 'Enabled Rutine',
    required: false,
  })
  @Column({ nullable: true, name: 'client_id' })
  @IsString()
  @IsNotEmpty()
  clientId!: string;
}

// export class UserPaginationDto extends PaginationDto<User> {
//   @ApiProperty({ type: User, isArray: true })
//   data: User[];
// }
