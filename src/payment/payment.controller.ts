import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpStatus,
  HttpException,
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

  // @Post('notification')
  // async handleNotification(
  //   @Body() paymentDto: PaymentDto,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const status = await this.paymentService.handleNotification(req.body);
  //     res.status(HttpStatus.OK).json({ status });
  //   } catch (error) {
  //     throw new HttpException(
  //       'Failed to handle notification',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
