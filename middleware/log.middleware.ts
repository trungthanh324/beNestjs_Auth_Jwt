import { HttpCode, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.url)
    const isAuth = true
    if(!isAuth){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: "unauthorized!"
      })
    }
    next();
  }
}