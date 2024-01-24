import { Controller, Get, Body, Post, Patch, Param, Delete } from '@nestjs/common';
import { UserAddressService } from './userAddress.service';
import { UpdateUserAddresstDto } from './dto/update-userAddress.dto';
import { CreateUserAddresstDto, UserAddresstDto } from './dto/create-userAddress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { IdParams } from 'src/utils/dtos/Commons.dto';

@Controller('user-address')
@ApiTags('Users Address')
@ApiBearerAuth()
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}
  @Post('')
  create(@Body() body: UserAddresstDto) {
    return this.userAddressService.create(body);
  }

  @Get()
  findAll() {
    return this.userAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserAddresstDto) {
    return this.userAddressService.update(id, body);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userAddressService.remove(id);
  // }
}
