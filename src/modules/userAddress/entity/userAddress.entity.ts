import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityBase } from 'src/utils/entity/entity-base';
import { User } from 'src/modules/user/entity/user.entity';

@Entity()
export class UserAddress extends EntityBase {
  @Column({ nullable: false, name: 'client_id' })
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @Column({ nullable: false, name: 'zip_code' })
  @IsString()
  @IsNotEmpty()
  zipCode!: string;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  lat?: string;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  lon?: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  province!: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  street!: string;

  @Column({ nullable: true, name: 'street_heigth' })
  @IsString()
  @IsOptional()
  streetHeigth?: string;

  @Column({ nullable: true, name: 'isActive', default: true })
  @IsString()
  @IsOptional()
  isActive!: boolean;

  @Column({ nullable: true, name: 'departament_number' })
  @IsString()
  @IsOptional()
  departamentNumber?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  predeterminated?: boolean;

  // @ManyToOne(() => Client, (client) => client, {eager: true})
  // @JoinColumn([{ name: 'client_id' }, { name: 'id' }])
  // Client?: Client;

  @ManyToOne(() => User, (entity) => entity.UserAddress)
  @JoinColumn([{ name: 'client_id' }, { name: 'id' }])
  user?: User;
}
