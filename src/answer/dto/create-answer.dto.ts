import { IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateAnswerDto {

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isCorrect: boolean;

  @IsInt()
  readonly questionId: number;
}
