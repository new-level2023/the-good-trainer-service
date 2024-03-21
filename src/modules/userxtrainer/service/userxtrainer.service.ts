import * as bcrypt from 'bcrypt';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { UtilsService } from '../../../utils/services/utils.service';
import { UserTrainerRepository } from '../repository/userxtrainer.repository';
import { UserTrainer } from '../entity/userxtrainer.entity';
import { CreatedUserTrainerDto, UpdatedUserTrainerDto } from '../dto/userxtrainer.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { UserDto } from 'src/modules/user/dto/user.dto';

@Injectable()
export class UserTrainerService extends UtilsService<UserTrainer> {
  constructor(
    @Inject(UserTrainerRepository) private readonly repository: UserTrainerRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {
    super();
  }

  protected getRepository() {
    return this.repository;
  }

  async createUserTrainerRelation(trainer: CreatedUserTrainerDto, user: any) {
    const relationalreadyExists = await this.getRepository().findOneBy({
      userId: user.id,
    });

    if (relationalreadyExists) throw new ForbiddenException(`User-Trainer relation already exists`);

    const createdUserTrainer = await this.create({
      trainerId: trainer.trainerId,
      userId: user.id,
    });
    return createdUserTrainer;
  }

  async getUsersSuscribted(user: any) {
    const getChamps = await this.getRepository().find({
      where: { trainerId: user.id },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });

    return getChamps;
  }

  async aprovedUserTrainerRelation(relationId: any) {
    const userTrainer = await this.getRepository().findOneBy({
      id: relationId.id,
    });

    console.log(userTrainer, 'userTraineruserTrainer');

    if (!userTrainer) throw new ForbiddenException(`User-Trainer relation not found`);

    if (userTrainer.enabled) throw new ForbiddenException(`User-Trainer relation already aproved`);

    userTrainer.enabled = true;
    return await this.getRepository().save(userTrainer);
  }

  async getUserInfo(userId: any) {
    const user = await this.repository.findOne({
      where: { userId },
      relations: ['user'],
      // select: ['id', 'username', 'email', 'firstName', 'lastName', 'createdAt'],
    });

    if (!user) throw new ForbiddenException(`User not found`);

    return user;
  }

  // async create(user: UserDto) {
  //   const userDb = await this.findOneByFilter({
  //     where: [{ username: user.username }, { email: user.email }],
  //   });
  //   if (userDb) throw new ForbiddenException(`User already exists`);
  //   // const level = await this.levelService.findOneByFilter({ where: [{ level: levelNumber }] });
  //   // user.level = level;
  //   const createdUser = await super.create(user);
  //   return createdUser;
  // }
}
