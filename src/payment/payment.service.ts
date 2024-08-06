import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/create-payment.dto';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import CONFIG from 'src/config/config';
import { v4 as uuidv4 } from 'uuid';

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
        order_id: uuidv4(),
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

  async handleFinish(finishData: any) {
    const { transaction_status, order_id, payment_type, fraud_status } =
      finishData;

    switch (transaction_status) {
      case 'capture':
        if (payment_type === 'credit_card') {
          return fraud_status === 'challenge'
            ? 'Transaction is challenged'
            : 'Transaction is approved';
        }
        break;
      case 'settlement':
        return 'Transaction is settled';
      case 'deny':
        return 'Transaction is denied';
      case 'pending':
        return 'Transaction is pending';
      case 'cancel':
        return 'Transaction is canceled';
      case 'refund':
        return 'Transaction is refunded';
      case 'partial_refund':
        return 'Transaction is partially refunded';
      case 'chargeback':
        return 'Transaction is charged back';
      case 'partial_chargeback':
        return 'Transaction is partially charged back';
      case 'expire':
        return 'Transaction is expired';
      case 'failure':
        return 'Transaction has failed';
      default:
        return 'Unknown transaction status';
    }
  }
}
