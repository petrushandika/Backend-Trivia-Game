import { Injectable } from '@nestjs/common';
import { ItemDetailDto } from './dto/create-payment.dto';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import CONFIG from 'src/config/config';

@Injectable()
export class PaymentService {
  async create(itemDetailDto: ItemDetailDto) {
    const snap = new Midtrans.Snap({
      clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
      serverKey: CONFIG.MIDTRANS_SERVER_KEY,
      isProduction: false,
    });

    const midtransParameter = {
      transaction_details: {
        order_id: Date.now(),
        gross_amount: itemDetailDto.price,
      },
      item_details: [
        {
          name: 'Diamond Pack',
          price: itemDetailDto.price,
          quantity: 1,
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    const midtrans = await snap.createTransaction(midtransParameter);
    return midtrans;
  }
}
