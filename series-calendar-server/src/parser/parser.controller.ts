import { Body, Controller, Post, Query } from '@nestjs/common';
import { ParserService } from './parser.service';
import {ApiBody, ApiOperation, ApiQuery} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@Controller('parse')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post()
  public parseById(@Query('id') id: string) {
    return this.parserService.parseById(id);
  }

  // TODO Убрать public
  @Public()
  @ApiOperation({ summary: 'Добавляет в базу данные на основе входящего JSON' })
  @ApiBody({ description: 'jsonString' })
  @Post('parse-json')
  public parseJSON(@Body() json: any) {
    return this.parserService.parseJSON(json);
  }
}
