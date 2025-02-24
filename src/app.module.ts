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
import { SensitiveWordModule } from './modules/sensitive_word/sensitive_word.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    StudentModule,
    SensitiveWordModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"Công ty TNHH SPAMTIFY" <no-reply@localhost>',
      },
      // preview: true,
      template: {
        dir: process.cwd() + '/src/mail_handlebar',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }), 
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
