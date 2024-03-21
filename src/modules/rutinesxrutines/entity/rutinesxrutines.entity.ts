import * as bcrypt from 'bcrypt';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { EntityBase } from '../../../utils/entity/entity-base';
import { Role } from '../../../utils/enum/role.enum';
import { UserAddress } from 'src/modules/userAddress/entity/userAddress.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { ValidRutines } from '../enum/valid-rutine.enum';
import { Rutines } from 'src/modules/rutines/entity/rutines.entity';

@Entity()
export class RutinesxRutines extends EntityBase {
  @ApiProperty({
    description: 'Rutine Id',
    required: false,
  })
  @Column({ nullable: false, name: 'rutine_id' })
  @IsString()
  @IsNotEmpty()
  rutineId!: string;

  @ApiProperty({
    description: 'Rutine',
    required: false,
  })
  @ManyToOne(() => Rutines, (entity) => entity.rutine)
  @JoinColumn([{ name: 'rutine_id' }, { name: 'id' }])
  rutine?: Rutines;

  @ApiProperty({
    description: 'Enabled Rutine',
    required: false,
  })
  @Column('boolean', { default: true })
  @IsBoolean()
  enabled;

  @ApiProperty({
    description: 'Rest Time Set',
    required: false,
  })
  @Column({ default: 'active' })
  restTime: string;

  @ApiProperty({
    description: 'Intensity Set',
    required: false,
  })
  @Column({ default: 'active' })
  intensity: string;

  @ApiProperty({
    description: 'Rest Comment Trainer',
    required: false,
  })
  @Column({ default: 'active' })
  comments_by_trainer: string;

  @ApiProperty({
    description: 'Weight Set',
    required: false,
  })
  @Column({ default: 0 })
  weightSet: number;

  @ApiProperty({
    description: 'Video URL',
    required: false,
  })
  @Column({ default: 'active' })
  videoUrl: string;

  @ApiProperty({
    description: 'repetition',
    required: false,
  })
  @Column({ nullable: true })
  repetition: number;

  @ApiProperty({
    description: 'Set',
    required: false,
  })
  @Column({ nullable: true })
  set: number;

  @ApiProperty({
    description: 'Exercise name',
    required: false,
  })
  @Column({ nullable: true })
  exerciseName: string;
}
