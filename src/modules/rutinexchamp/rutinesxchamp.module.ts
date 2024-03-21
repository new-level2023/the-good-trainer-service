import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinesxChamps } from './entity/rutinexchamp.entity';
import { RutinesxChampsRepository } from './repository/rutinexchamp.repository';
import { RutinesxChampsController } from './controller/rutinexchamp.controller';
import { RutinesxChampsService } from './service/rutinexchamp.service';

@Module({
  imports: [TypeOrmModule.forFeature([RutinesxChamps])],
  providers: [RutinesxChampsRepository, RutinesxChampsService],
  controllers: [RutinesxChampsController],
  exports: [RutinesxChampsRepository, RutinesxChampsService],
})
export class RutinesxChampsModule {}
