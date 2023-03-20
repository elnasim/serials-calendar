import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SerialsService } from './serials.service';
import { CreateSerialDto } from './dto/create-serial.dto';
import { UpdateSerialDto } from './dto/update-serial.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../auth/types';
import {Public} from "../auth/decorators/public.decorator";

@ApiTags('Serials')
@Controller('api/serials')
export class SerialsController {
  constructor(private readonly serialsService: SerialsService) {}

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Создаёт сериал' })
  @Post()
  public create(@Body() createSerialDto: CreateSerialDto) {
    return this.serialsService.create(createSerialDto);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Возвращает сериалы с пагинацией' })
  @Get()
  public findByOffset(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.serialsService.findByOffset(limit, skip);
  }

  @Public()
  @ApiOperation({ summary: 'Возвращает сериал по id' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  public findOne(@Param('id') id: ObjectId) {
    return this.serialsService.findOne(id);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Обновляет сериал по id' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  public update(
    @Param('id') id: ObjectId,
    @Body() updateSerialDto: UpdateSerialDto,
  ) {
    return this.serialsService.update(id, updateSerialDto);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Удаляет сериал по id' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  public remove(@Param('id') id: ObjectId) {
    return this.serialsService.remove(id);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Загружает постер сериала по id' })
  @Post(':id/upload-poster')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/serials',
        filename: (req, file, callback) => {
          callback(null, `${req.params.id}.jpg`);
        },
      }),
    }),
  )
  uploadPoster(@UploadedFile() file) {
    return { file };
  }
}
