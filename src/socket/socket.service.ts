import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';
import { RoomDto } from './dto/room.dto';
import { UserService } from 'src/user/user.service';
import { IPlayer, IRoom } from './types';
import { Server, Socket } from 'socket.io';
import { QuestionsService } from 'src/question/question.service';

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
  private server: Server;
  private count: number = 0;
  constructor(private readonly questionService: QuestionsService) {}

  setServer(server: Server) {
    this.server = server;
  }

  createRoom = async (roomId: string) => {
    this.count += 1;
    const questionIds: number[] = [];
    const total = await this.questionService.findAll();

    while (questionIds.length < 10) {
      const randomId = Math.ceil(Math.random() * total.length);
      if (!questionIds.includes(randomId)) {
        questionIds.push(randomId);
      }
    }

    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        id: roomId,
        players: [],
        currentQuestion: 0,
        questionIds: questionIds,
      };
    }
    console.log(this.count);
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

  async handleMatchmaking(socket: Socket, user, server: Server) {
    let availableRoomId = Object.keys(this.rooms).find(
      (roomId) => this.rooms[roomId].players.length < 2,
    );

    // check is user already entered a room before
    const userRoom = Object.keys(this.rooms).find((key) => {
      const entered = this.rooms[key].players.find(
        (item) => item.username === user.username,
      );
      if (entered) {
        return key;
      }
    });

    if (userRoom) {
      server.to(userRoom).emit('waiting', this.rooms[userRoom]);
      await this.startGameIfFull(availableRoomId, server);
      return;
    }

    const player: IPlayer = {
      ...user,
      id: socket.id,
      score: 0,
    };

    if (!availableRoomId) {
      availableRoomId = `room_${Object.keys(this.rooms).length}`;
      await this.createRoom(availableRoomId);
    }

    await socket.join(availableRoomId);
    this.addPlayerToRoom(availableRoomId, player);

    await this.startGameIfFull(availableRoomId, server);
  }

  async startGameIfFull(roomId: string, server: Server) {
    const room = this.rooms[roomId];

    if (room && room.players.length === 2) {
      await server.to(roomId).emit('matchFound', roomId);
    } else {
      await server.to(roomId).emit('waiting', room);
    }
  }

  async startNextQuestion(
    roomId: string,
    currentQuestion: number,
    server: Server,
  ) {
    console.log('ROOMs 193', this.rooms);
    const room = this.rooms[roomId];

    const questionId = room?.questionIds[currentQuestion];

    const question = await this.questionService.findOne(questionId);

    server.to(roomId).emit('questionData', question);

    // await new Promise((resolve) => setTimeout(resolve, 30000));

    // if (room?.currentQuestion < 9) {
    //   room.currentQuestion = room?.currentQuestion + 1;
    //   this.startNextQuestion(roomId, server);
    // } else {
    // }
  }

  broadcastQuestion(socket: Socket, roomId: string) {
    const question = this.getCurrentQuestion(roomId);
    // socket.emit('questionData', question);
  }

  getCurrentQuestion(roomId: string) {
    return {
      content: 'Testing?',
      answers: [
        { content: 'Yes', isCorrect: true },
        { content: 'No', isCorrect: false },
        { content: 'Maybe', isCorrect: false },
      ],
    };
  }

  handleTimeUp(roomId: string) {
    const room = this.rooms[roomId];
    if (room) {
      this.server.to(roomId).emit('questionTimeout');
    }
  }

  handleAnswer(
    roomId: string,
    playerId: string,
    answer: string,
    socket: Socket,
  ) {
    const room = this.rooms[roomId];
    if (room) {
      const player = room.players.find((p) => p.id == playerId);
      if (player) {
        const question = this.getCurrentQuestion(roomId);
        const selectedAnswer = question.answers.find(
          (a) => a.content === answer,
        );
        const isCorrect = selectedAnswer?.isCorrect ?? false;
        if (isCorrect) {
          player.score += 1;
        }
        socket.emit('answerResult', { isCorrect });
      }
    }
  }

  resetPlayerScores(roomId) {}

  calculateScores(roomId) {}

  endGame(roomId) {}
}
