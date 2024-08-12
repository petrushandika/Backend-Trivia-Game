export interface IRoom {
  id: string;
  players: IPlayer[];
  currentQuestion: number;
  questionIds: number[];
}

export interface IPlayer {
  id: string;
  username: string;
  userAvatar?: {
    avatar: {
      image: string;
    };
  }[];
  score: number;
}

export interface IQuestion {
  content: string;
  maxScore: number;
  timer: number;
  answers: {
    content: string;
    isCorrect: boolean;
    questionId: number;
  }[];
}
