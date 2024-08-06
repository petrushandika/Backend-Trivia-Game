import { IsNumber, IsString } from 'class-validator';
export class PaymentDto {
  @IsString()
  userId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
