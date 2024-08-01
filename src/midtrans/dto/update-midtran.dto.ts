import { PartialType } from '@nestjs/mapped-types';
import { CreateMidtranDto } from './create-midtrans.dto';

export class UpdateMidtranDto extends PartialType(CreateMidtranDto) {}
