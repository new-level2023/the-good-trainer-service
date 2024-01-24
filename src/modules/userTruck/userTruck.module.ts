import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTruckService } from './userTruck.service';
import { UserTruck } from './entity/userTruck.entity';
import { User } from '../user/entity/user.entity';
import { UserTruckController } from './userTruck.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserTruck])],
  controllers: [UserTruckController],
  providers: [UserTruckService],
  exports: [UserTruckService],
})
export class UserTruckModule {}
