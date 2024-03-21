import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RutinesxRutines } from '../entity/rutinesxrutines.entity';

@Injectable()
export class RutinesxRutinesRepository extends Repository<RutinesxRutines> {
  constructor(@InjectRepository(RutinesxRutines) private readonly _: Repository<RutinesxRutines>) {
    super(_.target, _.manager, _.queryRunner);
  }
}
