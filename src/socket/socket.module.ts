import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [SocketGateway, SocketService, PrismaService, UserService],
  // imports: [UserService],
})
export class SocketModule {}
