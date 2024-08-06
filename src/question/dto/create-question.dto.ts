import { IsString, IsInt, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';

export class CreateQuestionDto {
  @IsString()
  readonly content: string;

  @IsInt()
  readonly maxScore: number;

  @IsInt()
  readonly timer: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  readonly answers?: CreateAnswerDto[];
}
