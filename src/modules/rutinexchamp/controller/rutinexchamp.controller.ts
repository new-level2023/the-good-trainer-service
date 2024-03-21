import {
  Controller,
  Get,
  Inject,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { IdParams } from '../../../utils/dtos/Commons.dto';
import { RutinesxChampsService } from '../service/rutinexchamp.service';
import { TransformClassToPlain } from '@nestjs/class-transformer';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { Roles } from 'src/utils/decorator/role.decorator';
import { Role } from 'src/utils/enum/role.enum';

@Controller('/rutinesxchamps')
@ApiTags('Rutines x Champs')
@ApiBearerAuth()
@UseInterceptors(TransformClassToPlain)
export class RutinesxChampsController {
  constructor(
    @Inject(RutinesxChampsService) private readonly rutinesxchamps: RutinesxChampsService,
  ) {}
  getService(): RutinesxChampsService {
    return this.rutinesxchamps;
  }

  @Get('/champs-rutines/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CHAMP, Role.TRAINER)
  async get(@Request() req, @Param('id') id): Promise<any> {
    const created = await this.getService().getRutinesxChamps(id);
    return created;
  }
}
