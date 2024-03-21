import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RutinesController } from './controller/rutines.controller';
import { RutinesRepository } from './repository/rutines.repository';
import { RutinesService } from './service/rutines.service';
import { Rutines } from './entity/rutines.entity';
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
