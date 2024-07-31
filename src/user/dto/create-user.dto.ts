import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password?: string;

  @IsNumber()
  diamond: number;

  @IsNumber()
  googleId: number;
}
