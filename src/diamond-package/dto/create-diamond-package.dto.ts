import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDiamondPackageDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  userId: number;
}

export class UpdateDiamondPackageDto {
  @IsNumber()
  price?: number;

  @IsNumber()
  quantity?: number;
}
