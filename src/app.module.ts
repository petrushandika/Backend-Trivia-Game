import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GoogleModule } from './google/google.module';
import { SocketModule } from './socket/socket.module';
import { AvatarModule } from './avatar/avatar.module';
import { DiamondPackageModule } from './diamond-package/diamond-package.module';
import { DiamondPurchaseModule } from './diamond-purchase/diamond-purchase.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    GoogleModule,
    SocketModule,
    AvatarModule,
    DiamondPackageModule,
    DiamondPurchaseModule,
    QuestionModule,
    AnswerModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
