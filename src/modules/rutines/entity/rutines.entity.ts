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
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { EntityBase } from '../../../utils/entity/entity-base';
import { Role } from '../../../utils/enum/role.enum';
import { UserAddress } from 'src/modules/userAddress/entity/userAddress.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { ValidRutines } from '../enum/valid-rutine.enum';
import { RutinesxRutines } from 'src/modules/rutinesxrutines/entity/rutinesxrutines.entity';

@Entity()
export class Rutines extends EntityBase {
  @Column({ nullable: false, name: 'trainer_id' })
  @IsString()
  trainerId!: string;

  @ManyToOne(() => User, (user) => user.Rutines)
  @JoinColumn({ name: 'trainer_id' })
  trainer?: User;

  @OneToMany(() => RutinesxRutines, (entity) => entity.rutine)
  @JoinColumn([{ name: 'rutine_id' }, { name: 'id' }])
  rutine?: RutinesxRutines;

  @ApiProperty({
    description: 'Category name',
    type: String,
    enum: ValidRutines,
  })
  @Column({
    enum: ValidRutines,
    nullable: true,
  })
  @IsNotEmpty()
  @IsEnum(ValidRutines, { message: 'Invalid category name' })
  @MaxLength(255)
  rutineType!: string;

  @ApiProperty({
    description: 'Enabled Rutine',
    required: false,
  })
  @Column('boolean', { default: false })
  @IsBoolean()
  enabled = false;

  @ApiProperty({
    description: 'Rutine status',
    required: false,
  })
  @Column({ default: 'active' })
  status: string;

  @ApiProperty({
    description: 'Rutine Time',
    required: false,
  })
  @Column({ nullable: true })
  estimatedDuration: number;

  @ApiProperty({
    description: 'Review Rutine',
    required: false,
  })
  @Column({ nullable: true })
  stars: number;

  @ApiProperty({
    description: 'Premium Rutine',
    required: false,
  })
  @Column({ nullable: true, default: false })
  isPremium: boolean;

  @ApiProperty({
    description: 'Rutine description',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Rutine short description',
    required: false,
  })
  @Column({ nullable: true })
  shortDescription: string;

  @ApiProperty({
    description: 'Rutine name',
    required: false,
  })
  @Column({ nullable: true })
  name: string;
}
