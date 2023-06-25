import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../auth/types';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Movies')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Создаёт фильм' })
  @Post()
  public create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Возвращает фильмы с пагинацией' })
  @Get()
  public findByOffset(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.moviesService.findByOffset(limit, skip);
  }

  @Public()
  @ApiOperation({ summary: 'Возвращает фильм по id' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Обновляет фильм по id' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  public update(
    @Param('id') id: ObjectId,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Удаляет фильм по id' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  public remove(@Param('id') id: ObjectId) {
    return this.moviesService.remove(id);
  }

  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Загружает постер фильма по id' })
  @Post(':id/upload-poster')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/movies',
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
