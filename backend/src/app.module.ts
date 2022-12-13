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
import { AccommodationService } from './accommodation/accommodation.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { StatisticsModule } from './statistics/statistics.module';
import { RentingController } from './renting/renting.controller';
import { RentingModule } from './renting/renting.module';
import { RentingService } from './renting/renting.service';
import { WifiController } from './wifi/wifi.controller';
import { WifiService } from './wifi/wifi.service';
import { WifiModule } from './wifi/wifi.module';
import { ParkingController } from './parking/parking.controller';
import { ParkingService } from './parking/parking.service';
import { ParkingModule } from './parking/parking.module';

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
    MulterModule,
    StatisticsModule,
    RentingModule,
    WifiModule,
    ParkingModule,
  ],
  controllers: [
    AppController,
    UtilsController,
    AdminAccommodationController,
    RentingController,
    WifiController,
    ParkingController,
  ],
  providers: [
    AppService,
    PrismaService,
    AdminAccommodationService,
    UtilsService,
    AccommodationService,
    RentingService,
    WifiService,
    ParkingService,
  ],
})
export class AppModule {}
