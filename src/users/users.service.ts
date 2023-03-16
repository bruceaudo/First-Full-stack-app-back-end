import { Injectable } from '@nestjs/common';
import { updateAuthDTO } from 'src/auth/DTO';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'

@Injectable()
export class UsersService {
constructor(private prisma: PrismaService){}
     //Get user by id

    async getUser(id: number) {
        
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            }
        })
        return user
    }

    //Update user by id

    async updateUser(id: number, dto: updateAuthDTO) {

        const updatedUser = await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        })
        return updatedUser
    }

    //Delete user by id

    async deleteUser(id: number) {
        const user = await this.prisma.user.delete({
            where: {
                id:id
            }
        })
        return user
    }
}
