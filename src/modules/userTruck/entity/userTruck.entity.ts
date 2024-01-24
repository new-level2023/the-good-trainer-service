import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityBase } from 'src/utils/entity/entity-base';
import { User } from 'src/modules/user/entity/user.entity';

@Entity()
export class UserTruck extends EntityBase {
  @Column({ nullable: false, name: 'client_id' })
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  brandTruck!: string;

  @Column({ nullable: false, name: 'truck_model' })
  @IsString()
  @IsNotEmpty()
  model!: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  predeterminated?: boolean;

  // @ManyToOne(() => Client, (client) => client, {eager: true})
  // @JoinColumn([{ name: 'client_id' }, { name: 'id' }])
  // Client?: Client;

  @ManyToOne(() => User, (entity) => entity.UserAddress)
  @JoinColumn([{ name: 'client_id' }, { name: 'id' }])
  user?: User;
}
