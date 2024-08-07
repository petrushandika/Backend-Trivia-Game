import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaymentDto } from './dto/create-payment.dto';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import CONFIG from 'src/config/config';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { notificationDto } from './dto/notification.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
  //harus pakai id diamond
  async create(paymentDto: PaymentDto, userId: number) {
    const snap = new Midtrans.Snap({
      clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
      serverKey: CONFIG.MIDTRANS_SERVER_KEY,
      isProduction: false,
    });

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    const diamond = await this.prismaService.diamondPackage.findUnique({
      where : {id : paymentDto.packageId}
    })

    console.log('data diamond', diamond);

    const order_id = `ORDER-${uuidv4()}`;
    console.log(order_id);
    const midtransParameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: diamond.price
      },
      item_details: [
        {
          name: 'Diamond Pack',
          price: diamond.price,
          quantity: 1,
        },
      ],
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: user.username,
        email: user.email,
      },
    };

    await this.prismaService.invoice.create({
      data: {
        orderId: order_id,
        status: 'pending',
        user : {connect : {id : userId}},
        amount: diamond.price,
        diamondPackage : {
          connect : {id : diamond.id}}
      },
    });

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

  async handleNotification(notificationData: notificationDto) {

  //   const snap = new Midtrans.Snap({
  //     clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
  //     serverKey: CONFIG.MIDTRANS_SERVER_KEY,
  //     isProduction: false,
  //   });

  //   const statusResponse = (await snap.transaction.notification(
  //     notificationData,
  //   )) as any;
  //   console.log(statusResponse);

  //   const transactionStatus = notificationData.transaction_status;
  //   const orderId = notificationData.order_id;

  //   const invoice = await this.prismaService.invoice.findUnique({
  //     where : {orderId: orderId}
  //   })

  //   if(!invoice){
  //     throw new Error('Invoice not found');
  //   }

  //   await this.prismaService.invoice.update({
  //     where: { orderId: invoice.orderId },
  //     data: { status: transactionStatus },
  //   });

  //  const diamondPackage = await this.prismaService.diamondPackage.findUnique({
  //     where : {id : invoice.diamondPackageId}
  //   })

  //   if(!diamondPackage){
  //     throw new Error('Diamond package not found');
  //   }

  //   if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
  //     return await this.prismaService.user.update({
  //         where : {id : invoice.userId},
  //         data : {diamond : {increment : diamondPackage.quantity}}         
  //      })
  //   }

    try {
      const snap = new Midtrans.Snap({
        clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
        serverKey: CONFIG.MIDTRANS_SERVER_KEY,
        isProduction: false,
      });

      const statusResponse = (await snap.transaction.notification(
        notificationData,
      )) as any;
      console.log('Midtrans Notification Status:', statusResponse);

      const transactionStatus = statusResponse.transaction_status;
      const orderId = statusResponse.order_id;

      const invoice = await this.prismaService.invoice.findUnique({
        where: { orderId: orderId },
      });

      if (!invoice) {
        throw new NotFoundException('Invoice not found');
      }

      await this.prismaService.invoice.update({
        where: { orderId: invoice.orderId },
        data: { status: transactionStatus },
      });

      const diamondPackage = await this.prismaService.diamondPackage.findUnique(
        {
          where: { id: invoice.diamondPackageId },
        },
      );

      if (!diamondPackage) {
        throw new NotFoundException('Diamond package not found');
      }

      if (
        transactionStatus === 'capture' ||
        transactionStatus === 'settlement'
      ) {
        await this.prismaService.user.update({
          where: { id: invoice.userId },
          data: { diamond: { increment: diamondPackage.quantity } },
        });
      }

      return { message: 'Notification handled successfully' };
    } catch (error) {
      console.error('Error handling Midtrans notification:', error);
      throw new InternalServerErrorException(
        'Failed to handle Midtrans notification',
      );
    }

  }

}
