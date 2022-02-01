import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsuarioInterface } from 'src/core/interfaces/usuario.interface';

@Injectable()
export class MailService {
  
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation( { name, email }: UsuarioInterface, token: string ) {
    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
    try{
      await this.mailerService.sendMail({
        to: email,
        subject: 'Bienvenido a Medicitate',
        template: '/confimacion-correo',
        context: {
          url
        }
      });
    }catch (error) {
      return error;
    }
  }
}
