import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { postsDTO, updatePostDTO } from './DTO'

@Injectable()
export class PostsService {
  constructor (private prisma: PrismaService) {}
  //Create post
  async createPost (id: number, dto: postsDTO) {
    try {
      const post = await this.prisma.post.create({
        data: {
          ...dto,
          authorId: id,
        },
      })
      return post
    } catch (error) {
      throw error
    }
  }
  //Get all post
  async getPosts (id: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId: id,
        },
      })
      return posts
    } catch (error) {
      throw error
    }
  }
  //Get post by id
  async getPost (userId: number, pid: number) {
    try {
      const post = await this.prisma.post.findFirst({
        where: {
          id: pid,
          authorId: userId,
        },
      })

      return post
    } catch (error) {
      throw error
    }
  }

  //Update post by id
  async updatePosts (userId: number, pid: number, dto: updatePostDTO) {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: pid,
        },
      })

      if (!post) throw new ForbiddenException('Post not found')

      if (post.authorId !== userId)
        throw new ForbiddenException('You are not authorized to perfom this action')

      return this.prisma.post.update({
        where: {
          id: pid,
        },
        data: {
          ...dto,
        },
      })
    } catch (error) {
      throw error
    }
  }

  //Delete post
  async deletePost (id: number, pid: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: pid,
        },
      })

      if (!post) throw new ForbiddenException('Post not found')

      if (post.authorId !== id) throw new ForbiddenException('You are not authorized to perfom this action')

      return this.prisma.post.delete({
        where: {
          id: pid,
        },
      })
    } catch (error) {
      throw error
    }
  }
}
