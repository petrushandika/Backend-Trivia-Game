export interface IRoom {
  id: string;
  players: IPlayer[];
  currentQuestion: number;
}

export interface IPlayer {
  id: string;
  username: string;
  userAvatar?: {
    avatar: {
      image: string;
    };
  }[];
}
