import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { MidtransService } from './midtrans.service';
import { CreateMidtranDto } from './dto/create-midtrans.dto';

@Controller('midtrans')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post()
  async create(
    @Body() createMidtranDto: CreateMidtranDto,
    @Res() res: Response,
  ) {
    const response = await this.midtransService.create(createMidtranDto);

    res.status(200).json(response);
  }
}
