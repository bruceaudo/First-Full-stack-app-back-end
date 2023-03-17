import { ForbiddenException, Injectable } from '@nestjs/common'
import { updateAuthDTO } from 'src/auth/DTO'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon from 'argon2'

@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}

  //Get users
  async getUsers () {
    try {
      const users = await this.prisma.user.findMany({})

      return users
    } catch (error) {
      throw error
    }
  }
  //Get user by id

  async getUser (id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      })
      return user
    } catch (error) {
      throw error
    }
  }

  //Update user by id

  async updateUser (id: number, dto: updateAuthDTO) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      })

      return updatedUser
    } catch (error) {
      throw error
    }
  }

  //Delete user by id

  async deleteUser (id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      })
      return user
    } catch (error) {
      throw error
    }
  }
}
