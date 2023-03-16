import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { postsDTO, updatePostDTO } from './DTO'

@Injectable()
export class PostsService {
  constructor (private prisma: PrismaService) {}
  //Create post
    async createPost(id: number, dto: postsDTO) {
        const post = await this.prisma.post.create({
            data: {
                ...dto,
                authorId:id
            }
        })
        return post
  }
  //Get all post
    async getPosts(id: number) {
        const posts = await this.prisma.post.findMany({
            where: {
              authorId: id
          }
        })
        return posts
  }
  //Get post by id
    async getPost(userId: number, pid: number) {
        const post = await this.prisma.post.findFirst({
            where: {
                id: pid,
                authorId: userId
            }
        })

        return post
     }
    

  //Update post by id
    async updatePosts(userId: number, pid: number, dto: updatePostDTO) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: pid
            }
        })

        if (!post || post.authorId !== userId) {
            throw new ForbiddenException("Access Denied")
        }

        return this.prisma.post.update({
            where: {
                id: pid
            },
            data: {
                ...dto
            }
        })
    }
    

  //Delete post
    async deletePost(id: number, pid: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: pid,
          }
        })
        
        if(!post || post.authorId !== id) throw new ForbiddenException("Access denied")
    
        return this.prisma.post.delete({
            where: {
                id: pid
            }
        })
  }
}
