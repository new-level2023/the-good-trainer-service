import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RutinesController } from './controller/gym.controller';
import { RutinesRepository } from './repository/gym.repository';
import { RutinesService } from './service/gym.service';
import { Rutines } from './entity/gym.entity';
import { RutinesxRutinesModule } from '../rutinesxrutines/rutinesxrutines.module';
import { UserModule } from '../user/user.module';
import { RutinesxChampsModule } from '../rutinexchamp/rutinesxchamp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rutines]),
    RutinesxRutinesModule,
    UserModule,
    RutinesxChampsModule,
  ],
  providers: [RutinesRepository, RutinesService],
  controllers: [RutinesController],
  exports: [RutinesService],
})
export class RutinesModule {}
