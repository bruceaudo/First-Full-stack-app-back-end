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
import { resetPasswordDTO, updateAuthDTO } from 'src/auth/DTO'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor (
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  //Get all user
  @Get('all')
  getUsers () {
    return this.usersService.getUsers()
  }
  //Get user by id
  @UseGuards(JwtAuthGuard)
  @Get()
  getUser (@User() user) {
    const id: number = user.userId

    return this.usersService.getUser(id)
  }

  //Update user by id
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser (@User() user, @Body() dto: updateAuthDTO) {
    const userId: number = user.userId
    return this.usersService.updateUser(userId, dto)
  }

  //Delete user by id
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser (@User() user) {
    const id: number = user.userId
    return this.usersService.deleteUser(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset')
  resetPassword(@User() user, @Body() dto: resetPasswordDTO) {
    const userId: number = user.userId
    return this.usersService.resetPassword(dto, userId)
  }
}
