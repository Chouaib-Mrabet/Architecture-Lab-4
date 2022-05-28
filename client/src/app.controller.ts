import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoanDto } from './dto/loan.dto';

@Controller('client')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('loan')
  async createLoan(@Body() dto: LoanDto) {
    return this.appService.createLoan(dto);
  }

  @MessagePattern({cmd: 'loan-approved'})
  getLoanApproval(body: string): any {
    console.log(`Your chances of taking a loan are: ${body}`);
  }

}
