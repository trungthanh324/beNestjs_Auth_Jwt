import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NoteModule } from './modules/note/note.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { StudentModule } from './modules/student/student.module';
import { LoggerMiddleware } from 'middleware/log.middleware';
import { RoleMiddleware } from 'middleware/role.middleware';

@Module({
  imports: [AuthModule, UserModule, NoteModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
      isGlobal : true
    }),
    DatabaseModule,
    StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, RoleMiddleware)
      .forRoutes({
        path: "/student",
        method : RequestMethod.GET
      });

    // consumer.apply(RoleMiddleware)
    // .forRoutes({
    //   path: '/student',
    //   method: RequestMethod.GET
    // })
  }
}
