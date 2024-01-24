import { PartialType } from '@nestjs/swagger';
import { CreateUserTrucktDto } from './create-userTruck.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserTrucktDto extends PartialType(CreateUserTrucktDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Indice que indica la direccion predeterminada',
  })
  readonly predeterminated: boolean;
}
