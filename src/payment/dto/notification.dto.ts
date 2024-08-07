import { IsNumber, IsString } from 'class-validator';
export class notificationDto {
  @IsString()
  order_id: string;

  @IsString()
  transaction_status: string;
}
