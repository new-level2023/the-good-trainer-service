import { Controller, Get, Body, Post, Patch, Param, Delete } from '@nestjs/common';
import { UserTruckService } from './userTruck.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserTrucktDto } from './dto/create-userTruck.dto';
import { UpdateUserTrucktDto } from './dto/update-userTruck.dto';

@Controller('user-address')
@ApiTags('Users Address')
@ApiBearerAuth()
export class UserTruckController {
  constructor(private readonly userTruckService: UserTruckService) {}
  @Post('')
  create(@Body() body: UserTrucktDto) {
    return this.userTruckService.create(body);
  }

  @Get()
  findAll() {
    return this.userTruckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTruckService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserTrucktDto) {
    return this.userTruckService.update(id, body);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userAddressService.remove(id);
  // }
}
