import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsEmail, isNotEmpty, IsBoolean } from "class-validator";
import { Double } from "typeorm";

export class LoanDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDecimal()
    amount: Double;
 
    @IsNotEmpty()
    @IsBoolean()
    eligible: boolean;
} 