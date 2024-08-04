import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  content: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  questionId: number;
}
