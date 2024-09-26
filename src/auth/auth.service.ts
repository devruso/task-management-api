import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    private jwtExpirationTimeInSeconds: number;

    constructor( 
        private readonly usersService : UsersService,
        private readonly jwtService : JwtService,
        // ConfigService acessa as variáveis de ambiente
        private readonly configService : ConfigService,
    ) {
        this.jwtExpirationTimeInSeconds = this.configService.get('JWT_EXPIRATION_TIME');
    }
    
    signIn(username: string, password: string) : AuthResponseDto{

        const foundUser = this.usersService.findByUserName(username);

        if(!foundUser || !bcryptCompareSync(password, foundUser.password)){
            throw new UnauthorizedException('Invalid username or password');
        }

        const payload = {sub: foundUser.id, username: foundUser.username};

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTimeInSeconds };
    }




}
