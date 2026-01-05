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
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = configService.get<string>('NODE_ENV') || 'development';

        let dbUrl = '';
        if (env === 'production') {
          // Pakai MongoDB Atlas di production
          dbUrl = configService.get<string>('PROD_DATABASE_URL') || '';
          if (!dbUrl) {
            throw new Error('PROD_DATABASE_URL must be set in environment variables!');
          }
        } else {
          // Dev lokal pakai MongoDB Compass / localhost
          dbUrl = configService.get<string>('DEV_DATABASE_URL') || 'mongodb://127.0.0.1:27017/securehub';
        }

        return {
          uri: dbUrl,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
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
