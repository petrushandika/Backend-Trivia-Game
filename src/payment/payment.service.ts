import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/create-payment.dto';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import CONFIG from 'src/config/config';

@Injectable()
export class PaymentService {
  async create(paymentDto: PaymentDto) {
    const snap = new Midtrans.Snap({
      clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
      serverKey: CONFIG.MIDTRANS_SERVER_KEY,
      isProduction: false,
    });

    const midtransParameter = {
      transaction_details: {
        order_id: paymentDto.userId,
        gross_amount: paymentDto.price,
      },
      item_details: [
        {
          name: 'Diamond Pack',
          price: paymentDto.price,
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
