import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserAddresstDto } from './dto/update-userAddress.dto';
import { CreateUserAddresstDto, UserAddresstDto } from './dto/create-userAddress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from './entity/userAddress.entity';
@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddress: Repository<UserAddress>,
  ) {}

  async create(body: UserAddresstDto): Promise<UserAddress> {
    // console.log(user, 'useruseruser');

    try {
      const data = {
        ...body,
      };

      const entity: UserAddress = await this.userAddress.create(data);
      return await this.userAddress.save(entity);
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<UserAddress[]> {
    try {
      return await this.userAddress.find({ where: { isActive: true } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<UserAddress> {
    try {
      const entity: UserAddress = await this.userAddress.findOne({
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

  async update(id: string, data: UpdateUserAddresstDto): Promise<UserAddress> {
    try {
      const entity: UserAddress = await this.userAddress.preload({
        id,
        ...data,
      });
      return await this.userAddress.save(entity);
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
