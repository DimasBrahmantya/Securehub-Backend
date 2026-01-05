import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AntiPhishingModule } from './modules/antiphishing/antiphishing.module';
import { BackupModule } from './modules/backup/backup.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { AdminModule } from './modules/admin/admin.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { URLModule } from './modules/url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        if (!uri) {
          throw new Error('MONGO_URI is not defined');
        }

        return { uri };
      },
    }),

    AuthModule,
    DashboardModule,
    AntiPhishingModule,
    BackupModule,
    MonitoringModule,
    AdminModule,
    StatisticsModule,
    URLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
