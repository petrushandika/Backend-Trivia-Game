import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class UpdateAnswerDto {
  @IsInt()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsBoolean()
  readonly isCorrect?: boolean;
}
