import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarModule } from './avatar/avatar.module';
import { PrismaModule } from './prisma/prisma.module';
import { MatchModule } from './match/match.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    GoogleModule,
    MatchModule,
    AvatarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
