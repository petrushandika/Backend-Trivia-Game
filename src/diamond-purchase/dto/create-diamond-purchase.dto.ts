import { IsNumber } from 'class-validator';

export class CreateDiamondPurchaseDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  diamondPackageId: number;
}
