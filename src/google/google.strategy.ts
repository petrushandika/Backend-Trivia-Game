import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { Request } from 'express';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        'https://789b-2404-8000-1005-37ac-89f4-7b8-b968-f52f.ngrok-free.app/google/redirect',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const state: { redirectTo: string } = JSON.parse(
      (request.query.state as string) ?? '{}',
    );

    request['googleState'] = {};
    request['googleState']['redirectTo'] = state.redirectTo;
    const { name, emails, photos } = profile;

    // Periksa apakah semua properti yang diperlukan ada
    if (!emails || !emails.length) {
      done(new Error('Google did not return an email'), null);
      return;
    }

    const UserData = {
      email: emails[0].value,
      googleId: profile.id,
      username: null,
      diamond: 0,
      accessToken,
    };

    try {
      // Buat entri pengguna baru atau update jika sudah ada
      const user = await this.prisma.user.upsert({
        where: { email: emails[0].value },
        update: { email: UserData.email, googleId: UserData.googleId },
        create: {
          email: UserData.email,
          googleId: UserData.googleId,
          diamond: UserData.diamond,
          username: UserData.username,
        },
      });

      done(null, UserData);
      return user;
    } catch (error) {
      done(error, null);
    }
  }
}
