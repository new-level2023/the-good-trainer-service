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
import { Rutines } from 'src/modules/rutines/entity/rutines.entity';

@Entity()
export class RutinesxChamps extends EntityBase {
  @ManyToOne(() => User) @JoinColumn({ name: 'userId' }) user: User;

  @ManyToOne(() => Rutines) @JoinColumn({ name: 'rutineId' }) rutine: Rutines;
}
