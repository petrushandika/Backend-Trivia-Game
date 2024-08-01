import { IsInt } from 'class-validator';

export class CreateDiamondPackageDto {
  @IsInt()
  price: number;

  @IsInt()
  quantity: number;

  @IsInt()
  userId: number;
}

export class UpdateDiamondPackageDto {
  @IsInt()
  price?: number;

  @IsInt()
  quantity?: number;
}
