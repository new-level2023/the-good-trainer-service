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
import { RutinesxRutinesService } from '../service/rutinesxrutines.service';
import { TransformClassToPlain } from '@nestjs/class-transformer';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';

@Controller('/rutinesxrutines')
@ApiTags('Rutines')
@ApiBearerAuth()
@UseInterceptors(TransformClassToPlain)
export class RutinesxRutinesController {
  constructor(
    @Inject(RutinesxRutinesService) private readonly rutinesxRutinesService: RutinesxRutinesService,
  ) {}

  getService(): RutinesxRutinesService {
    return this.rutinesxRutinesService;
  }
}
