import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';
import { Request, Response } from 'express';
import { GoogleState } from './google-state.decorator';
import { GoogleAuthGuard } from './google.auth.guard';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @GoogleState('redirectTo') redirectTo : string,
  ) {
    console.log('tesT', redirectTo);
    res.redirect(`${redirectTo}?accessToken=${(req.user as unknown as any).accessToken}`
  );
    return this.googleService.googleLogin(req);
  }
}
