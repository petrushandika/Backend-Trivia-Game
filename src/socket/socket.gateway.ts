import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.socketService.removePlayerFromRoom(client.id);

    const playerRoom = this.socketService.findRoomByPlayerId(client.id);

    if (playerRoom) {
      if (playerRoom.players.length === 0) {
        // Menghapus room jika kosong
        this.socketService
          .getRooms()
          .filter((room) => room.id !== playerRoom.id);
      } else {
        // Mengupdate room jika masih ada player
        this.server.to(playerRoom.id).emit('updatePlayers', playerRoom.players);
      }
    }
  }

  @SubscribeMessage('matchMaking')
  async handleMatchMaking(
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { id } = data;
    let room = this.socketService.findOrCreateRoom();

    const newPlayer = await this.socketService.addPlayerToRoom(id, client.id);

    if (!newPlayer) {
      return;
    }

    // Jika player belum ada di room
    if (
      !room.players.some((player) => player.clientId === newPlayer.clientId)
    ) {
      room.players.push(newPlayer);
      client.join(room.id);
    }

    if (this.socketService.isRoomFull(room)) {
      this.server
        .to(room.id)
        .emit('startGame', { room: room.id, players: room.players });
      this.socketService.getRooms().filter((r) => r.id !== room.id);
    } else {
      this.server.to(room.id).emit('updatePlayers', room.players);
    }

    console.log(this.socketService.getRooms());
  }
}
