import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserTrucktDto } from './dto/create-userTruck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTruck } from './entity/userTruck.entity';
import { UpdateUserTrucktDto } from './dto/update-userTruck.dto';
@Injectable()
export class UserTruckService {
  constructor(
    @InjectRepository(UserTruck)
    private readonly userTruck: Repository<UserTruck>,
  ) {}

  async create(body: UserTrucktDto): Promise<UserTruck> {
    // console.log(user, 'useruseruser');

    try {
      const data = {
        ...body,
      };

      const entity: UserTruck = await this.userTruck.create(data);
      return await this.userTruck.save(entity);
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<UserTruck[]> {
    try {
      return await this.userTruck.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<UserTruck> {
    try {
      const entity: UserTruck = await this.userTruck.findOne({
        where: {
          clientId: id,
        },
      });
      if (!entity) {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      }
      return entity;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: UpdateUserTrucktDto): Promise<UserTruck> {
    try {
      const entity: UserTruck = await this.userTruck.preload({
        id,
        ...data,
      });
      return await this.userTruck.save(entity);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async remove(id: string): Promise<UserAddress> {
  //   try {
  //     const entity: UserAddress = await this.userAddress.findOne(id);

  //     if (!entity) {
  //       throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
  //     }
  //     return this.userAddress.remove(entity);
  //   } catch (e) {
  //     throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
