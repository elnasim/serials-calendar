import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public registration(): void {
    this.mailerService
      .sendMail({
        to: 'seregaktun@gmail.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((res) => {
        console.log('-->', res);
      })
      .catch((e) => {
        console.log('-->', e);
      });
  }
}
