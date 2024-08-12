import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { QuestionsModule } from 'src/question/question.module';
import { QuestionsService } from 'src/question/question.service';

@Module({
  providers: [
    SocketGateway,
    SocketService,
    PrismaService,
    UserService,
    QuestionsService,
  ],
  imports: [QuestionsModule],
  // imports: [UserService],
})
export class SocketModule {}
