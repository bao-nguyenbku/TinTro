import { Module } from '@nestjs/common';
import { Utils } from './utils';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';

@Module({
  controllers: [UtilsController],
  providers: [Utils, UtilsService],
})
export class UtilsModule {}
