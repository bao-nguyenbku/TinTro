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
import { AdminAccommodationController } from './admin-accommodation/admin-accommodation.controller';
import { AdminAccommodationModule } from './admin-accommodation/admin-accommodation.module';
import { AdminAccommodationService } from './admin-accommodation/admin-accommodation.service';
import { UtilsService } from './utils/utils.service';

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
    AdminAccommodationModule,
  ],
  controllers: [AppController, UtilsController, AdminAccommodationController],
  providers: [AppService, PrismaService, AdminAccommodationService, UtilsService],
})
export class AppModule {}
