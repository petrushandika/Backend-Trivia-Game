import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDiamondPurchaseDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  diamondPackageId: number;
}
