import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BusModule } from './bus/bus.module';
import { TiketModule } from './tiket/tiket.module';

@Module({
  imports: [AuthModule, BusModule, TiketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
