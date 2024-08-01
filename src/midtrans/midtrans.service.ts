import { Injectable } from '@nestjs/common';
import { CreateMidtranDto } from './dto/create-midtrans.dto';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import CONFIG from 'src/config/config';

@Injectable()
export class MidtransService {
  async create(createMidtranDto: CreateMidtranDto) {
    const snap = new Midtrans.Snap({
      clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
      serverKey: CONFIG.MIDTRANS_SERVER_KEY,
      isProduction: false,
    });

    const midtransParameter = {
      ...createMidtranDto,
      credit_card: {
        secure: true,
      },
    };

    const midtrans = await snap.createTransaction(midtransParameter);
    return midtrans;
  }
}
