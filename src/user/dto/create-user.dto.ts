import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MaxLength(6, { message: 'Password must no more then 6 symbols' })
  password: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  position: string;
}
