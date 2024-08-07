import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserAvatarDTO {
  @IsString()
  image: string;
}

export class AvatarDTO {
  @IsOptional()
  avatar?: UserAvatarDTO;
}

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password?: string;

  @IsNumber()
  diamond: number;

  @IsString()
  googleId: string;
}
