import { Column, Double, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('loan')
export class LoanEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    name: String;

    @Column()
    amount: Double;

    @Column()
    eligible: boolean; 
}