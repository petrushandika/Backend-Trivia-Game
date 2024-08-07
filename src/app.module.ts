import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GoogleModule } from './google/google.module';
import { SocketModule } from './socket/socket.module';
import { AvatarModule } from './avatar/avatar.module';
import { DiamondPackageModule } from './diamond-package/diamond-package.module';
import { DiamondPurchaseModule } from './diamond-purchase/diamond-purchase.module';
import { QuestionsModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { PaymentModule } from './payment/payment.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { GoogleController } from './google/google.controller';
import { GoogleStrategy } from './google/google.strategy';
import { GoogleService } from './google/google.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    GoogleModule,
    SocketModule,
    AvatarModule,
    DiamondPackageModule,
    DiamondPurchaseModule,
    QuestionsModule,
    AnswerModule,
    PaymentModule,
  ],
  controllers: [AppController, GoogleController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    GoogleStrategy,
    GoogleService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'user/check',
        'user/user-avatar/:id',
        'user/getUser',
        'user/update-user/:id',
        'user/buy-avatar/:id',
        'payment/create',
      );
  }
}
