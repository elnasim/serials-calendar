import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Public()
  @Post('registration')
  public async registration() {
    return this.mailService.registration();
  }
}
