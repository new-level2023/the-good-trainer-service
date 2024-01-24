import { PartialType } from '@nestjs/swagger';
import { CreateUserAddresstDto } from './create-userAddress.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserAddresstDto extends PartialType(CreateUserAddresstDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Indice que indica la direccion predeterminada',
  })
  readonly predeterminated: boolean;
}
