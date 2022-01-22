import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation( { name, email }: UsuarioInterface ) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenido a Medicitate',
      template: './correo-bienvenida', // `.hbs` extension is appended automatically
      context: {
        name
      }
    });
  }
}
