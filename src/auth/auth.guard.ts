import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  
  private jwtSecret : string;
  constructor( 
    private readonly jwtService : JwtService,
    private readonly configService : ConfigService,
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET');
  }
  
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    // Acessa a requisição que é processada no express  
    const request = context.switchToHttp().getRequest();
    // Verifica se o token é válido
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException('Invalid token');
    }

    try{
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      request['user'] = payload;

    }catch{
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
    private extractTokenFromHeader(request: Request): string | undefined{
      const [ type, token ] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;

  }

}
