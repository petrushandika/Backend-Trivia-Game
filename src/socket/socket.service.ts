import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';
import { RoomDto } from './dto/room.dto';
import { UserService } from 'src/user/user.service';
import { IPlayer, IRoom } from './types';
import { Server, Socket } from 'socket.io';

// @Injectable()
// export class SocketService {
//   private rooms: IRoom[] = [];

//   constructor(private readonly userService: UserService) {}

//   // findRoomByPlayerId(clientId: string): RoomDto {
//   //   return this.rooms.find((room) =>
//   //     room.players.some((player) => player.clientId === clientId),
//   //   );
//   // }

//   findOrCreateRoom() {
//     let room = this.rooms.find((r) => r.players.length < 5);

//     if (!room) {
//       room = {
//         id: `room-${this.rooms.length + 1}`,
//         players: [],
//         currentQuestion: 0,
//       };
//       this.rooms.push(room);
//     }

//     return room;
//   }

//   async addPlayerToRoom(
//     id: number,
//     clientId: string,
//   ): Promise<PlayerDto | null> {
//     const user = await this.userService.findOne(id);

//     if (!user) {
//       console.log('User not found');
//       return null;
//     }

//     const newPlayer: PlayerDto = {
//       id: user.id,
//       username: user.username,
//       avatar: user.userAvatar[0].avatar,
//       clientId: clientId,
//     };

//     return newPlayer;
//   }

//   removePlayerFromRoom(clientId: string): void {
//     const playerRoom = this.findRoomByPlayerId(clientId);

//     if (playerRoom) {
//       playerRoom.players = playerRoom.players.filter(
//         (player) => player.clientId !== clientId,
//       );

//       if (playerRoom.players.length === 0) {
//         this.rooms = this.rooms.filter((room) => room.id !== playerRoom.id);
//       }
//     }
//   }

//   isRoomFull(room: RoomDto): boolean {
//     return room.players.length === 5;
//   }

//   updateRoom(roomId: string, updatedPlayers: PlayerDto[]): void {
//     const room = this.rooms.find((r) => r.id === roomId);
//     if (room) {
//       room.players = updatedPlayers;
//     }
//   }

//   getRooms(): RoomDto[] {
//     return this.rooms;
//   }
// }

@Injectable()
export class SocketService {
  private rooms: Record<string, IRoom> = {};

  createRoom = (roomId: string) => {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        id: roomId,
        players: [],
        currentQuestion: 0,
      };
    }
  };

  addPlayerToRoom(roomId, player) {
    if (this.rooms[roomId]) {
      this.rooms[roomId].players.push(player);
    }
  }

  removePlayerFromRoom(playerId) {}

  getRoomInfo(roomId) {}

  getPlayerInfo(playerId) {}

  getAllRoomIds() {}

  getAllPlayerIds() {}

  handleMatchmaking(socket: Socket, user) {
    const availableRoomId = Object.keys(this.rooms).find(
      (roomId) => this.rooms[roomId].players.length < 4,
    );

    const player: IPlayer = {
      ...user,
      id: socket.id,
    };

    if (!availableRoomId) {
      const newRoomId = `room_${Math.random().toString(36).substring(7)}`;
      this.createRoom(newRoomId);
      return this.handleMatchmaking(socket, user);
    }
    socket.join(availableRoomId);
    this.addPlayerToRoom(availableRoomId, player);
    this.startGameIfFull(availableRoomId);
    return this.rooms[availableRoomId];
  }

  startGameIfFull(roomId: string) {
    const room = this.rooms[roomId];
    if (room && room.players.length === 4) {
      // Implement your own logic to start the game
      this.startNextQuestion(roomId);
    }
    console.log(room);
  }

  startNextQuestion(roomId) {}

  broadcastQuestion(roomId) {}

  resetPlayerScores(roomId) {}

  handleTimeUp(roomId) {}

  handleAnswer(roomId, playerId, answer) {}

  calculateScores(roomId) {}

  endGame(roomId) {}
}
