import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AccommodationModule } from './accommodation/accommodation.module';
import { UtilsController } from './utils/utils.controller';
import { UtilsModule } from './utils/utils.module';
import { ReviewModule } from './review/review.module';
import { MessageSectionModule } from './message-section/message-section.module';
import { MessageModule } from './message/message.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MessageSectionModule,
    MessageModule,
    AccommodationModule,
    UtilsModule,
    ReviewModule,
    MulterModule,
    StatisticsModule,
  ],
  controllers: [AppController, UtilsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
