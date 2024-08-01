import { Type } from '@nestjs/class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class TransactionDetailDto {
  @IsString()
  order_id: string;

  @IsNumber()
  gross_amount: number;
}

class ItemDetailDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}

export class CreateMidtranDto {
  @ValidateNested({ each: true })
  @Type(() => TransactionDetailDto)
  transaction_details: TransactionDetailDto;

  @ValidateNested({ each: true })
  @Type(() => ItemDetailDto)
  item_details: ItemDetailDto;
}
