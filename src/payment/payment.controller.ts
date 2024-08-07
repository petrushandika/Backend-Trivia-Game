import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Req,
  Get,
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
      const user = res.locals.user;
      // console.log('user payment', user)
      // console.log('paymendDto', paymentDto)
      const response = await this.paymentService.create(paymentDto, +user.id);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(
        'Failed to create payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('finish')
  async finish(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('req.body', req.body);
      const finishData = req.body;
      console.log('ini dari finishData', finishData);
      const status = await this.paymentService.handleFinish(finishData);
      res.status(HttpStatus.OK).json(status);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to process finish',
        error: error.message,
      });
    }
  }

  @Post('notification')
  async notification(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
  ) {
    try {
      console.log('console notification', req.body);
      console.log('console noficitaion respon', res);
      const notification = req.body;
      const status = await this.paymentService.handleNotification(body);
      res.status(HttpStatus.OK).json(status);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to process notification',
        error: error.message,
      });
    }
  }
}
