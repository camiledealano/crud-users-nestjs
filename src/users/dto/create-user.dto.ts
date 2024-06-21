import {IsString, MinLength, MaxLength, Max } from 'class-validator'

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
}
