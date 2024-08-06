import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private rooms: Map<string, string[]> = new Map();
  private queue: string[] = [];

  getAvailableRoomId(): string | null {
    for (const [roomId, clients] of this.rooms.entries()) {
      if (clients.length < 5) {
        return roomId;
      }
    }
    return null;
  }

  leaveRoom(client: Socket): void {
    for (const [roomId, clients] of this.rooms.entries()) {
      const index = clients.indexOf(client.id);
      if (index !== -1) {
        clients.splice(index, 1);
        client.leave(roomId);
        if (clients.length === 0) {
          this.rooms.delete(roomId);
        }
        break;
      }
    }

    const queueIndex = this.queue.indexOf(client.id);
    if (queueIndex !== -1) {
      this.queue.splice(queueIndex, 1);
    }
  }

  addToQueue(clientId: string): void {
    if (!this.queue.includes(clientId)) {
      this.queue.push(clientId);
    }
  }

  processQueue(server: any): void {
    while (this.queue.length > 0) {
      let roomId = this.getAvailableRoomId();
      if (!roomId) {
        roomId = this.queue.shift();
        this.rooms.set(roomId, []);
      }

      const nextClientId = this.queue.shift();
      const nextClient = server.sockets.sockets.get(nextClientId);

      if (nextClient) {
        nextClient.join(roomId);
        this.rooms.get(roomId).push(nextClient.id);

        server.to(roomId).emit('matchFound', { roomId, userId: nextClient.id });

        if (this.rooms.get(roomId).length === 5) {
          server.to(roomId).emit('roomFull', roomId);
        }
      } else {
        this.queue.push(roomId);
      }
    }
  }
}
