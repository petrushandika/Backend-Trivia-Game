import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() paymentDto: PaymentDto, @Res() res: Response) {
    try {
      const response = await this.paymentService.create(paymentDto);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(
        'Failed to create payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('finish')
  async finish(@Req() req: Request, @Res() res: Response) {
    try {
      const finishData = req.body;
      const status = await this.paymentService.handleFinish(finishData);
      res.status(HttpStatus.OK).json(status);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to process finish',
        error: error.message,
      });
    }
  }
}
