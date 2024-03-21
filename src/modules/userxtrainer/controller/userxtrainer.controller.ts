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
} from '@nestjs/swagger';

import { IdParams } from '../../../utils/dtos/Commons.dto';
import { TransformClassToPlain } from '@nestjs/class-transformer';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { UserTrainerService } from '../service/userxtrainer.service';
import {
  CreatedUserTrainerDto,
  UpdatedUserTrainerDto,
  UserTrainerDto,
} from '../dto/userxtrainer.dto';
import { Roles } from 'src/utils/decorator/role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { UserDto } from 'src/modules/user/dto/user.dto';

@Controller('/userxtrainer')
@ApiTags('User x Trainer')
@ApiBearerAuth()
@UseInterceptors(TransformClassToPlain)
export class UserTrainerController {
  constructor(
    @Inject(UserTrainerService) private readonly usertrainerService: UserTrainerService,
  ) {}

  getService(): UserTrainerService {
    return this.usertrainerService;
  }

  @Post('/user-trainer')
  @ApiBody({ type: CreatedUserTrainerDto, required: true })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CHAMP)
  @ApiCreatedResponse({ type: UserDto, description: 'User-Trainer Relation' })
  async save(@Request() req, @Body() entity: CreatedUserTrainerDto): Promise<any> {
    const userId = await req.user;
    const created = await this.getService().createUserTrainerRelation(entity, userId);
    return created;
  }

  @Get('/users-by-trainer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TRAINER)
  async get(@Request() req): Promise<any> {
    const user = await req.user;
    const created = await this.getService().getUsersSuscribted(user);
    return created;
  }

  @Put('/aproved-trainer-user')
  // @ApiBody({ type: UpdatedUserTrainerDto, required: true })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TRAINER)
  async put(@Body() entity: UpdatedUserTrainerDto): Promise<any> {
    const userAproved = await this.getService().aprovedUserTrainerRelation(entity);
    return userAproved;
  }

  @Get('/user-info/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TRAINER)
  async getUserInfo(@Param('id') id): Promise<any> {
    const userAproved = await this.getService().getUserInfo(id);
    return userAproved;
  }
}
