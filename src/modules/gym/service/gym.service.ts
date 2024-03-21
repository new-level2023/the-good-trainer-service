import * as bcrypt from 'bcrypt';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { UtilsService } from '../../../utils/services/utils.service';
import { Rutines } from '../entity/gym.entity';
import { RutinesRepository } from '../repository/gym.repository';
import { CreateRutinesDto } from '../dto/gym.dto';
import { RutinesxRutinesRepository } from 'src/modules/rutinesxrutines/repository/rutinesxrutines.repository';
import { RutinesxChamps } from 'src/modules/rutinexchamp/entity/rutinexchamp.entity';
import { RutinesxChampsRepository } from 'src/modules/rutinexchamp/repository/rutinexchamp.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';

@Injectable()
export class RutinesService extends UtilsService<Rutines> {
  constructor(
    @Inject(RutinesRepository) private readonly repository: RutinesRepository,
    @Inject(RutinesxRutinesRepository)
    private readonly rutinesxrutinesRepository: RutinesxRutinesRepository,
    @Inject(RutinesxChampsRepository)
    private readonly rutinesxchampsRepository: RutinesxChampsRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {
    super();
  }

  protected getRepository() {
    return this.repository;
  }

  async findAll(userId: any) {
    const rutines = await this.repository.find({
      where: { trainerId: userId.id },
      relations: ['rutine'],
    });
    return rutines;
  }

  async createRutine(
    userId: any,
    rutineData: CreateRutinesDto,
  ): Promise<{ status: string; message: string }> {
    rutineData.trainerId = userId.id;
    const rutine = await this.repository.create(rutineData);
    const rutineId = await this.repository.save(rutine);

    if (rutineData.clientId) {
      const cliendId = rutineData.clientId;

      const client = await this.userRepository.findOne({
        where: { id: cliendId },
      });

      await this.rutinesxchampsRepository.save({
        rutine: rutineId,
        user: client,
      });
    }

    const exercisesRutines = rutineData.exercises.map((item) => {
      console.log(item, 'itemitem');

      return {
        ...item,
        rutineId,
      };
    });
    await this.rutinesxrutinesRepository.save(exercisesRutines);
    return { status: 'success', message: 'Rutine created successfully' };
  }
}
