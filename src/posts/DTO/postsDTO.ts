import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class postsDTO {
  @IsString()
  @IsNotEmpty()
  content: string
  @IsString()
  @IsOptional()
  imageURL?: string
}

export class updatePostDTO {
  @IsString()
  @IsOptional()
  content?: string
  @IsString()
  @IsOptional()
  imageURL?:string
}
