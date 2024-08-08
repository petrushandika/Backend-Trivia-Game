import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { UserService } from 'src/user/user.service';
import { QuestionsService } from 'src/question/question.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly userService: UserService,
    private readonly questionService: QuestionsService,
  ) {
    this.socketService.setServer(this.server);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.socketService.removePlayerFromRoom(client.id);
  }

  // @SubscribeMessage('matchMaking')
  // async handleMatchMaking(
  //   @MessageBody() data: { id: number },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const { id } = data;
  //   console.log('MATCH MAKING');

  //   let room = this.socketService.findOrCreateRoom();

  //   const newPlayer = await this.socketService.addPlayerToRoom(id, client.id);

  //   if (!newPlayer) {
  //     return;
  //   }

  //   // Jika player belum ada di room
  //   if (
  //     !room.players.some((player) => player.clientId === newPlayer.clientId)
  //   ) {
  //     room.players.push(newPlayer);
  //     client.join(room.id);
  //   }

  //   if (this.socketService.isRoomFull(room)) {
  //     this.server
  //       .to(room.id)
  //       .emit('startGame', { room: room.id, players: room.players });
  //     this.socketService.getRooms().filter((r) => r.id !== room.id);
  //   } else {
  //     this.server.to(room.id).emit('updatePlayers', room.players);
  //   }

  //   console.log(this.socketService.getRooms());
  // }

  @SubscribeMessage('joinQueue')
  async joinQueue(
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('JOIN QUEUE ACTIVE');

    const user = await this.userService.findOne(data.id);
    await this.socketService.handleMatchmaking(
      client,
      {
        username: user.username,
        userAvatar: user.userAvatar,
      },
      this.server,
    );
  }

  @SubscribeMessage('requestQuestion')
  async requestQuestion(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; currentIndex: number },
  ) {
    await this.socketService.startNextQuestion(
      data.roomId,
      data.currentIndex,
      this.server,
    );
    // const question = await this.questionService.findOne(+data.roomId);
    // console.log('test', question)
  }

  @SubscribeMessage('submitAnswer')
  async handleAnswer(
    @MessageBody() data: { roomId: string; answer: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, answer } = data;
    this.socketService.handleAnswer(roomId, client.id, answer, client);
  }

  @SubscribeMessage('ping')
  pong(@ConnectedSocket() socket: Socket): WsResponse<string> {
    console.log('pong');
    return { event: 'pong', data: 'pong' };
  }
}
