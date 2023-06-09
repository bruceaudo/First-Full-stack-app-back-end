import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class authDTO {
  @IsNotEmpty()
  @IsString()
  name?: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @IsString()
  password: string
}

export class loginAuthDTO {
  @IsOptional()
  @IsString()
  name?: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @IsString()
  password: string
}

export class updateAuthDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string
}

export class resetPasswordDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string
}
