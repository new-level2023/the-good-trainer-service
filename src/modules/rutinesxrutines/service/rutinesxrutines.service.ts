import * as bcrypt from 'bcrypt';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { UtilsService } from '../../../utils/services/utils.service';
import { RutinesxRutinesRepository } from '../repository/rutinesxrutines.repository';
import { RutinesxRutines } from '../entity/rutinesxrutines.entity';


@Injectable()
export class RutinesxRutinesService extends UtilsService<RutinesxRutines> {
  constructor(@Inject(RutinesxRutinesRepository) private readonly repository: RutinesxRutinesRepository) {
    super();
  }

  protected getRepository() {
    return this.repository;
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

  // findByUsername(username: string) {
  //   return this.getRepository().findByUsername(username);
  // }

  // findByUsernameWithDeleteAt(username: string) {
  //   return this.getRepository().findByUsernameWithDeleteAt(username);
  // }

  // async update(id: string, userDto: UpdateUserDto) {
  //   if (userDto.email) await this.checkEmailExists(id, userDto.email);
  //   // if (userDto.levelId) {
  //   //   const level = await this.levelService.findByIdOrFail(userDto.levelId);
  //   //   userDto.level = level;
  //   // }
  //   return this.updateById(id, userDto);
  // }

  // async deleteUser(id: string) {
  //   return this.deleteOrFail(id);
  // }

  // async findWithFiltersAndPagination(payload: UserQueryDto) {
  //   return this.getRepository().findUsersByFiltersPaginated(payload);
  // }

  // async checkEmailExists(userId: string, email: string) {
  //   const userDB = await this.findById(userId);
  //   if (userDB?.email !== email) {
  //     const emailExists = await this.findOneByFilter({ where: { email: email } });
  //     if (emailExists) throw new ForbiddenException(`Email already in use`);
  //   }
  // }
}
