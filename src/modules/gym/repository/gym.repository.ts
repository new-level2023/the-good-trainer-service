import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Rutines } from '../entity/gym.entity';
@Injectable()
export class RutinesRepository extends Repository<Rutines> {
  constructor(@InjectRepository(Rutines) private readonly _: Repository<Rutines>) {
    super(_.target, _.manager, _.queryRunner);
  }



}
