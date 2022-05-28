import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagDto } from './dto/manag.dto';
import { ManagEntity } from './entity/manag.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ManagEntity) private readonly loanRepository: Repository<ManagEntity>,
    @Inject('MANAGEMENT_LOAN') private loanProxy: ClientProxy
) {}

loanApproval(dto: ManagDto) {
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
  this.loanProxy.send('loan-approved', {body: dto});
  return loan;
}
}
