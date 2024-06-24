import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
    name: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
