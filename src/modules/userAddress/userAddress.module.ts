import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressService } from './userAddress.service';
import { UserAddress } from './entity/userAddress.entity';
import { User } from '../user/entity/user.entity';
import { UserController } from '../user/controller/user.controller';
import { UserAddressController } from './userAddress.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
