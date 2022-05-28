import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommDto } from './dto/comm.dto';
import { CommEntity } from './entity/comm.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CommEntity) private readonly loanRepository: Repository<CommEntity>,
    @Inject('COMMERCIAL_LOAN') private loanProxy: ClientProxy
) {}

loanDemand(dto: CommDto) {
  if (dto.eligible == true) {
    dto.eligible = false;
  }
  else {
    dto.eligible = true;
  }
  const loan = this.loanRepository.save({
    name: dto.name,
    email: dto.email,
    amount: dto.amount,
    eligible: dto.eligible
});
  this.loanProxy.send('loan-Approval', {body: dto});
  return loan;
}
}
