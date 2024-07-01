import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  employeeNumber: number;

  @IsNotEmpty()
  service: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  companyType: string;
}
