import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/AuthGuard'
import { User } from 'src/auth/decorators'
import { updateAuthDTO } from 'src/auth/DTO'
import { UsersService } from './users.service'
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor (
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  //Get user by id

  @Get()
  getUser (@User() user) {
    const id: number = user.userId

    return this.usersService.getUser(id)
  }

  //Update user by id

  
  @Patch()
  updateUser(@User() user, @Body() dto:updateAuthDTO) {
      
      const id: number = user.userId

    return this.usersService.updateUser(id, dto)
  }

  //Delete user by id
  
  @Delete()
  deleteUser(@User() user) {
      const id: number = user.userId
    return this.usersService.deleteUser(id)
  }
}
