// import {
//   Injectable,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import * as jwksClient from 'jwks-rsa';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   private client = jwksClient({
//     jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
//   });

//   private getKey(header, callback) {
//     this.client.getSigningKey(header.kid, (err, key) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         const signingKey = key.getPublicKey();
//         callback(null, signingKey);
//       }
//     });
//   }

//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('No token provided');
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(
//       token,
//       this.getKey.bind(this),
//       { algorithms: ['RS256'] },
//       (err, decoded) => {
//         if (err) {
//           throw new UnauthorizedException('Invalid token');
//         }

//         // Menyimpan token ke dalam objek request
//         req['accessToken'] = token; // Simpan token di request object
//         req['user'] = decoded; // Simpan informasi pengguna yang terverifikasi dalam request

//         next();
//       },
//     );
//   }
// }

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private client: OAuth2Client;

  constructor(private readonly userService: UserService) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization;
    // console.log('header', headers);
    if (!headers || !headers.startsWith('Bearer')) {
      return res.sendStatus(401);
    }

    const token = headers && headers.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }
    console.log('token', token);
    try {
      const ticket = await this.client.getTokenInfo(token);
      const email = ticket.email;
      const user = await this.userService.findOneByEmail(email);
      res.locals.user = user;
      console.log('user middleware', user);

      next();
    } catch (error) {
      console.error('Error verifikasi token:', error);
      throw new UnauthorizedException('Token tidak valid');
    }
  }
}