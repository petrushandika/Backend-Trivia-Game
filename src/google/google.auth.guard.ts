import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard, IAuthModuleOptions} from "@nestjs/passport";
import {Request} from "express";

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any>{
        const request = context.switchToHttp().getRequest() as Request;
        const redirectTo = request.query.redirectTo;
        return {
            state : JSON.stringify({redirectTo})
        }
    }
}