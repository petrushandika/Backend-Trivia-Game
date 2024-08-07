import { IsNumber, IsString } from 'class-validator';
export class PaymentDto {
  @IsNumber()
  price: number;

  @IsNumber()
  packageId: number;
}
