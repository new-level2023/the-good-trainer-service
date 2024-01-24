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

@Entity()
export class User extends EntityBase {
  @ApiProperty({
    description: 'Email of User',
    required: true,
    default: 'email@user.com',
  })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'email not valid' })
  email!: string;

  @ApiProperty({
    description: 'Username of User',
    required: true,
    default: 'john.doe',
  })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({
    description: 'First name of User',
    required: true,
    example: 'John',
  })
  @Column({ default: '' })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty({
    description: 'Last name of User',
    required: true,
    example: 'Doe',
  })
  @Column({ default: '' })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({
    description: 'Password of User',
    required: true,
    default: 'pwd_user',
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  stripeCustomerId: string;

  @ApiProperty({
    description: 'Role of User',
    required: false,
  })
  @Column({ type: 'simple-enum', enum: Role })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({
    description: 'Enabled status of of User',
    required: true,
  })
  @Column('boolean', { default: false })
  @IsBoolean()
  enabled = false;

  // @ManyToOne(() => Level, (level: Level) => level.users)
  // level: Level;

  @Type(() => UserAddress)
  @OneToMany(() => UserAddress, (entity) => entity.user, { eager: false })
  @JoinColumn([{ name: 'client_id' }, { name: 'id' }])
  @ValidateNested()
  @IsArray()
  UserAddress?: UserAddress[];

  @Column({ nullable: true })
  lastActiveAt?: Date;

  @Exclude({ toPlainOnly: true })
  private tempPassword: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  private async hashPasswordOnInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  private setDefaultEnabledValue(): void {
    if (this.enabled === undefined) {
      this.enabled = false;
    }
  }

  @BeforeUpdate()
  private async hashPasswordOnUpdate(): Promise<void> {
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
