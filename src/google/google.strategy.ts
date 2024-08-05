import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    // Periksa apakah semua properti yang diperlukan ada
    if (!emails || !emails.length) {
      done(new Error('Google did not return an email'), null);
      return;
    }

    const UserData: Prisma.UserCreateInput = {
      email: emails[0].value,
      googleId: profile.id,
      username: null,
      diamond: 0,
    };

    try {
      // Buat entri pengguna baru atau update jika sudah ada
      const user = await this.prisma.user.upsert({
        where: { email: emails[0].value },
        update: UserData,
        create: UserData,
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
