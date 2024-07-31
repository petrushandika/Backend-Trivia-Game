import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy, PrismaService],
})
export class GoogleModule {}
