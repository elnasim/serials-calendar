import { Controller, Post, Query } from '@nestjs/common';
import { ParserService } from './parser.service';

@Controller('parse')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post()
  public parseById(@Query('id') id: string) {
    return this.parserService.parseById(id);
  }
}
