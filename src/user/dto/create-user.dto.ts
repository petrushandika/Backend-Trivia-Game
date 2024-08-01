import { IsNumber, IsString } from 'class-validator';

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
