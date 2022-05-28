import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CommDto } from './dto/comm.dto';

@Controller('commercial')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'loan-demand'})
  getLoanApproval(body: CommDto): any {
    return this.appService.loanDemand(body)
  }
}
