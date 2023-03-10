import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SerialsService } from './serials.service';
import { SerialsController } from './serials.controller';
import { Serial, SerialSchema } from './schema/serial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Serial.name,
        schema: SerialSchema,
      },
    ]),
  ],
  controllers: [SerialsController],
  providers: [SerialsService],
  exports: [SerialsService],
})
export class SerialsModule {}
