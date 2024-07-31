import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
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
