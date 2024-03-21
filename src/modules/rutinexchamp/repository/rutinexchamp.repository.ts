import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RutinesxChamps } from '../entity/rutinexchamp.entity';


@Injectable()
export class RutinesxChampsRepository extends Repository<RutinesxChamps> {
  constructor(@InjectRepository(RutinesxChamps) private readonly _: Repository<RutinesxChamps>) {
    super(_.target, _.manager, _.queryRunner);
  }
}
