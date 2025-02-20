
import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService
    ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // console.log('1')
    const request = context.switchToHttp().getRequest();
    try {
       //XAC THUC:
    //B1: lay token tu headers
    const token = request.headers.authorization.split(' ')[1] // tach bearer
    // console.log(token)
    if(!token){
        throw new ForbiddenException("provide accesstoken login or register ")
    }

    //B2: gia ma jwtverifyAsync token  de lay payload(data)
    const payload = await this.jwtService.verifyAsync(token,
        {secret: process.env.JWT_SECRET}
    )
    // console.log(payload)

    //B3: tim user ma vua verify ra dc trong db
    const user = await this.userService.findByEmail(payload.email)
    if(!user){throw new BadRequestException("token invalid")}

    //B4: dinh kem user vao cai request gui xuong be de truy cap vao 1 protected route 
    request.currentUser = user //currentUser trong auth.guard la bien tu gan de luu tt user vao request
    } catch (error) {
        if(error instanceof ForbiddenException || error instanceof BadRequestException){
            throw error
        }
        throw new ForbiddenException("Invalid or expire token")
    }
    return true; 
  }
}


