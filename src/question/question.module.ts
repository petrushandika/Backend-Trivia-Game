import { Module } from '@nestjs/common';
import { QuestionsService } from './question.service';
import { QuestionsController } from './question.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService],
})
export class QuestionsModule {}
