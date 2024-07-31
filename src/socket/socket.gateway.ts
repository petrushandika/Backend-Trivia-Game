import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private rooms: Map<string, string[]> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.leaveAllRooms(client);
  }

  @SubscribeMessage('findMatch')
  handleFindMatch(client: Socket): void {
    let roomId = this.getAvailableRoomId();

    if (!roomId) {
      roomId = client.id;
      this.rooms.set(roomId, []);
    }

    client.join(roomId);
    this.rooms.get(roomId).push(client.id);

    this.server.to(roomId).emit('matchFound', { roomId, userId: client.id });

    if (this.rooms.get(roomId).length === 5) {
      this.server.to(roomId).emit('roomFull', roomId);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket): void {
    this.leaveAllRooms(client);
  }

  private getAvailableRoomId(): string | null {
    for (const [roomId, clients] of this.rooms.entries()) {
      if (clients.length < 5) {
        return roomId;
      }
    }
    return null;
  }

  private leaveAllRooms(client: Socket): void {
    for (const [roomId, clients] of this.rooms.entries()) {
      const index = clients.indexOf(client.id);
      if (index !== -1) {
        clients.splice(index, 1);
        client.leave(roomId);
        this.server.to(roomId).emit('userLeft', client.id);
        if (clients.length === 0) {
          this.rooms.delete(roomId);
        }
        break;
      }
    }
  }
}
