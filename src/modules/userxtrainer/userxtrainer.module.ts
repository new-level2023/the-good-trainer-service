import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrainer } from './entity/userxtrainer.entity';
import { UserTrainerService } from './service/userxtrainer.service';
import { UserTrainerRepository } from './repository/userxtrainer.repository';
import { UserTrainerController } from './controller/userxtrainer.controller';
import { UserRepository } from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTrainer]), UserModule],
  providers: [UserTrainerRepository, UserTrainerService],
  controllers: [UserTrainerController],
  exports: [UserTrainerService, UserTrainerRepository],
})
export class UserTrainerModule {}
