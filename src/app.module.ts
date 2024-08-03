import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleModule } from './google/google.module';
import { SocketModule } from './socket/socket.module';
import { AvatarModule } from './avatar/avatar.module';
import { MidtransModule } from './midtrans/midtrans.module';
import { DiamondPackageModule } from './diamond-package/diamond-package.module';
import { DiamondPurchaseModule } from './diamond-purchase/diamond-purchase.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    GoogleModule,
    SocketModule,
    AvatarModule,
    MidtransModule,
    DiamondPackageModule,
    DiamondPurchaseModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
