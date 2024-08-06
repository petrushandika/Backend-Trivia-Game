import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/google/google.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: 'secretkey',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
