import { IsNumber, IsString } from 'class-validator';
export class ItemDetailDto {
  @IsString()
  userId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
