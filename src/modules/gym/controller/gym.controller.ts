import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IdParams } from '../../../utils/dtos/Commons.dto';
import { RutinesService } from '../service/gym.service';
import { TransformClassToPlain } from '@nestjs/class-transformer';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { Roles } from 'src/utils/decorator/role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { CreateRutinesDto, RutinesDto } from '../dto/gym.dto';

@Controller('/rutines')
@ApiTags('Rutines')
@ApiBearerAuth()
@UseInterceptors(TransformClassToPlain)
export class RutinesController {
  constructor(@Inject(RutinesService) private readonly rutinesService: RutinesService) {}

  getService(): RutinesService {
    return this.rutinesService;
  }

  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TRAINER, Role.CHAMP)
  // @ApiOkResponse({ type: UserPaginationDto })
  async findAll(@Request() req) {
    const userId = req.user;
    return this.rutinesService.findAll(userId);
  }

  @Post('/')
  @ApiBody({ type: CreateRutinesDto })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TRAINER)
  //@ApiCreatedResponse({ type: UserDto, description: 'User created' })
  async save(
    @Request() req,
    @Body() rutineData: CreateRutinesDto,
  ): Promise<{ status: string; message: string }> {
    const userId = req.user;
    return await this.rutinesService.createRutine(userId, rutineData);
    // return { status: 'success', message: 'Rutine created successfully' };
  }

  // @Delete('/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // @ApiNoContentResponse({ description: 'User deleted' })
  // @ApiNotFoundResponse({ description: 'The user you want to delete does not exist' })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param() params: IdParams) {
  //   await this.getService().deleteUser(params.id);
  // }

  // @Put('/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // @ApiNoContentResponse({ description: 'User updated' })
  // @ApiNotFoundResponse({ description: 'The user you want to update does not exist' })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async update(@Param() params: IdParams, @Body() entity: UpdateUserDto) {
  //   await this.getService().update(params.id, entity);
  // }

  // @Put('status/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // @ApiOkResponse({ description: 'User status updated' })
  // @ApiNotFoundResponse({ description: 'The user you want to update does not exist' })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async updateStatus(@Param() params: IdParams, @Body() entity: UpdateUserStatusDto) {
  //   const { id } = params;
  //   await this.getService().updateById(id, entity);
  // }
}
