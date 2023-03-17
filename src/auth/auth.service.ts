import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { authDTO, loginAuthDTO } from './DTO'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor (
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async registerUser (dto: authDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (userExists) throw new ForbiddenException('User already exists')

    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      })

      const access_token = await this.signToken(user.id, user.email)

      delete user.password

      return { user, access_token }
    } catch (error) {
      if (error === 'P2002') throw new ForbiddenException('Email already taken')

      throw error
    }
  }

  async loginUser (dto: loginAuthDTO) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })

      if (!userExists) throw new ForbiddenException('User does not exist')

      const access_token = await this.signToken(userExists.id, userExists.email)

      delete userExists.password

      return { userExists, access_token }
    } catch (error) {
      throw error
    }
  }

  signToken (id: number, email: string) {
    try {
      const payload = {
        sub: id,
        email: email,
      }

      return this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret: this.config.get('SECRET_KEY'),
      })
    } catch (error) {
      throw error
    }
  }
}
