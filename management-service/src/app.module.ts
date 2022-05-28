import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'loanapproval',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  ClientsModule.register([
    {name: 'LOAN_APPROVAL',transport: Transport.REDIS,
    options : {
      url: 'redis://localhost:6379',
    }
  }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
