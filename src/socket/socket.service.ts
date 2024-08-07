import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';
import { RoomDto } from './dto/room.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SocketService {
  private rooms: RoomDto[] = [];

  constructor(private readonly userService: UserService) {}

  findRoomByPlayerId(clientId: string): RoomDto {
    return this.rooms.find((room) =>
      room.players.some((player) => player.clientId === clientId),
    );
  }

  findOrCreateRoom(): RoomDto {
    let room = this.rooms.find((r) => r.players.length < 5);

    if (!room) {
      room = { id: `room-${this.rooms.length + 1}`, players: [] };
      this.rooms.push(room);
    }

    return room;
  }

  async addPlayerToRoom(
    id: number,
    clientId: string,
  ): Promise<PlayerDto | null> {
    const user = await this.userService.findOne(id);

    if (!user) {
      console.log('User not found');
      return null;
    }

    const newPlayer: PlayerDto = {
      id: user.id,
      username: user.username,
      avatar: user.userAvatar[0].avatar,
      clientId: clientId,
    };

    return newPlayer;
  }

  removePlayerFromRoom(clientId: string): void {
    const playerRoom = this.findRoomByPlayerId(clientId);

    if (playerRoom) {
      playerRoom.players = playerRoom.players.filter(
        (player) => player.clientId !== clientId,
      );

      if (playerRoom.players.length === 0) {
        this.rooms = this.rooms.filter((room) => room.id !== playerRoom.id);
      }
    }
  }

  isRoomFull(room: RoomDto): boolean {
    return room.players.length === 5;
  }

  updateRoom(roomId: string, updatedPlayers: PlayerDto[]): void {
    const room = this.rooms.find((r) => r.id === roomId);
    if (room) {
      room.players = updatedPlayers;
    }
  }

  getRooms(): RoomDto[] {
    return this.rooms;
  }
}
