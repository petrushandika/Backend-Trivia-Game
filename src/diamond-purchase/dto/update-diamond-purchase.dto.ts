import { PartialType } from '@nestjs/mapped-types';
import { CreateDiamondPurchaseDto } from './create-diamond-purchase.dto';

export class UpdateDiamondPurchaseDto extends PartialType(CreateDiamondPurchaseDto) {}
