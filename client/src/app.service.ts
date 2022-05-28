import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanDto } from './dto/loan.dto';
import { LoanEntity } from './entity/loan.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(LoanEntity) private readonly commRepository: Repository<LoanEntity>,
    @Inject('COMMERCIAL_LOAN') private commProxy: ClientProxy
) {}

  getHello(): string {
    return 'Hello World!';
  }

  createLoan(dto: LoanDto) {
    const loan = this.commRepository.save({
      name: dto.name,
      email: dto.email,
      amount: dto.amount,
      eligible: dto.eligible
  });
    this.commProxy.send('loan-demand', {body: dto});
    return loan;
  }
}
 