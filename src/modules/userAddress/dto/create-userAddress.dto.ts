import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserAddress } from '../entity/userAddress.entity';

export class UserAddresstDto extends OmitType(UserAddress, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'isActive',
] as const) {}
export class CreateUserAddresstDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '12122',
    description: 'Id client',
  })
  readonly clientId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'viamonte',
    description: 'Direccion de localizacion',
  })
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '4567',
    description: 'Codigo postal',
  })
  readonly zipCode: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '-38.416097',
    description: 'Latitud',
  })
  readonly lat: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '-63.616672',
    description: 'Longitud',
  })
  readonly lon: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Moreno valley',
    description: 'City',
  })
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Buenos aires',
    description: 'Provincia',
  })
  readonly province: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'viamonte',
    description: 'Direccion de la calle',
  })
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1771',
    description: 'Altura de localidad',
  })
  readonly streetHeigth: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2d',
    description: 'numero de departamento',
  })
  readonly departamentNumber: string;
}
