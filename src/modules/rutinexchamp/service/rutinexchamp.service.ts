import * as bcrypt from 'bcrypt';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { UtilsService } from '../../../utils/services/utils.service';
import { RutinesxChamps } from '../entity/rutinexchamp.entity';
import { RutinesxChampsRepository } from '../repository/rutinexchamp.repository';

@Injectable()
export class RutinesxChampsService extends UtilsService<RutinesxChamps> {
  constructor(
    @Inject(RutinesxChampsRepository) private readonly repository: RutinesxChampsRepository,
  ) {
    super();
  }

  protected getRepository() {
    return this.repository;
  }

  async getRutinesxChamps(id: any) {
    const getRutinesxChamps = await this.getRepository().find({
      where: { user: { id } },
      relations: ['rutine'],
    });

    return getRutinesxChamps;
  }
}
