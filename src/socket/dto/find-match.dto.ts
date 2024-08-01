import { IsString } from 'class-validator';

export class FindMatchDto {
  @IsString()
  clientId: string;
}
