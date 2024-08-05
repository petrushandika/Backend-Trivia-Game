import { IsString, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  content: string;

  @IsNumber()
  maxScore: number;

  @IsNumber()
  timer: number;
}
