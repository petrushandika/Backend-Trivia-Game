import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMidtranDto } from './dto/create-midtrans.dto';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import { uuid } from 'uuidv4';

@Injectable()
export class MidtransService {
  async create(createMidtranDto: CreateMidtranDto) {
    try {
      const snap = new Midtrans.Snap({
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        isProduction: false,
      });

      // Contoh data transaksi yang dikirim ke Midtrans
      const transactionDetails = {
        transaction_details: {
          order_id: 'ORDER-' + uuid(),
          gross_amount: 800000,
        },
        credit_card: {
          secure: true,
        },
        item_details: 
          {
            id: 'ITEM-001',
            name: 'Trivia Diamond',
            price: 800000,
            quantity: 1,
          }
        ,
        customer_details: {
          first_name: 'Booby',
          last_name: 'Djangko',
          email: '2HwKu@example.com',
        },
      };

      const midtransResponse = await snap.createTransaction(transactionDetails);

      // Cek dan akses respon dengan benar
      const { token, redirect_url } = midtransResponse;

      console.log(token, redirect_url);
      return { token, redirect_url };
    } catch (error) {
      console.error('Error creating transaction with Midtrans:', error);
      throw new InternalServerErrorException(
        'Failed to create transaction with Midtrans',
      );
    }
  }
}
