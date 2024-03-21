import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { EntityBase } from '../../../utils/entity/entity-base';
import { User } from 'src/modules/user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

// @Entity()
// export class UserTrainer extends EntityBase {
//   @ApiProperty({
//     description: 'Enabled status of of User',
//     required: false,
//     default: false,
//   })
//   @Column({ type: 'boolean', default: false })
//   @IsBoolean()
//   enabled: boolean;

//   @ManyToOne(() => User) @JoinColumn({ name: 'userId', }) userId: User;

//   @ManyToOne(() => User) @JoinColumn({ name: 'trainerId' }) trainerId: User;
// }
@Entity()
export class UserTrainer extends EntityBase {
  @ApiProperty({
    description: 'Enabled status of of User',
    required: false,
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  enabled: boolean;

  @Column({ nullable: true, name: 'user_id' })
  @IsString()
  userId: string;

  @OneToOne(() => User, (rutines) => rutines.userTrainer)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ nullable: true, name: 'trainer_id' })
  @IsString()
  trainerId: string;
}
