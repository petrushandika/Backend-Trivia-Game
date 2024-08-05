import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';
import { ItemDetailDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() itemDetailDto: ItemDetailDto, @Res() res: Response) {
    const response = await this.paymentService.create(itemDetailDto);

    res.status(200).json(response);
  }
}
