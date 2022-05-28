import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ManagDto } from './dto/manag.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'loan-demand'})
  getLoanApproval(body: ManagDto): any {
    return this.appService.loanApproval(body)
  }
}
