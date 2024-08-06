import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { UpdateAnswerDto } from '../../answer/dto/update-answer.dto';

export class UpdateQuestionDto {
  @IsInt()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsInt()
  readonly maxScore?: number;

  @IsOptional()
  @IsInt()
  readonly timer?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  readonly answers?: UpdateAnswerDto[];
}


