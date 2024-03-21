import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinesxRutines } from './entity/rutinesxrutines.entity';
import { RutinesxRutinesRepository } from './repository/rutinesxrutines.repository';
import { RutinesxRutinesService } from './service/rutinesxrutines.service';
import { RutinesxRutinesController } from './controller/rutinesxrutines.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RutinesxRutines])],
  providers: [RutinesxRutinesRepository, RutinesxRutinesService],
  controllers: [RutinesxRutinesController],
  exports: [RutinesxRutinesService, RutinesxRutinesRepository],
})
export class RutinesxRutinesModule {}
