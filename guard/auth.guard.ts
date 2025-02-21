
import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

//xac thuc token
@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly jwtService : JwtService,
               private readonly userService : UserService
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization?.split(' ')[1]// tach bearer
      if(!token){throw new ForbiddenException("Login or register")}

      const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET})

      const user = await this.userService.findByEmail(payload.email)

      if(!user){throw new BadRequestException("token invalid")}

      request.currentUser = user
    } catch (error) {
      if(error instanceof ForbiddenException || error instanceof BadRequestException){
        throw error
      }

      throw new UnauthorizedException("Login or register again!")
    }
    return true;
  }
}
