import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTrainer } from '../entity/userxtrainer.entity';

@Injectable()
export class UserTrainerRepository extends Repository<UserTrainer> {
  constructor(@InjectRepository(UserTrainer) private readonly _: Repository<UserTrainer>) {
    super(_.target, _.manager, _.queryRunner);
  }
}
