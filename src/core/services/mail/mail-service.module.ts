import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.mailtrap.io',
                secure: false,
                auth: {
                    user: "0097f5c3b56995",
                    pass: "decab09bf1cd21"
                }
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                  strict: true,
                },
            },
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailServiceModule {}
