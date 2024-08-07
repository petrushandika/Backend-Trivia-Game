import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserAvatarDTO {
  @IsString()
  image: string;
}

export class PlayerDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @ValidateNested()
  @Type(() => UserAvatarDTO)
  avatar: UserAvatarDTO;

  @IsString()
  clientId: string;
}
