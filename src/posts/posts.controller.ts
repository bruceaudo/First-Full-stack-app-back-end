import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/AuthGuard';
import { User } from 'src/auth/decorators';
import { postsDTO, updatePostDTO } from './DTO';
import { PostsService } from './posts.service';
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService, private authService: AuthService) { }
    
    //Create post
    @Post()
    createPost(@User() user, @Body() dto: postsDTO) {
        const id: number = user.userId
        return this.postsService.createPost(id, dto)
    }
    //Get all post
    @Get()
    getPosts(@User() user) {
        const id: number = user.userId
        return this.postsService.getPosts(id)
    }
    //Get post by id
    @Get(':pid')
    getPost(@User() user, @Param('pid', ParseIntPipe) pid: number) {
        const userId: number = user.userId
        return this.postsService.getPost(userId, pid)
    }

    
    //Update post by id
    @Patch(':pid')
    updatePosts(@User() user, @Param('pid', ParseIntPipe) pid: number, @Body() dto:updatePostDTO) {
        const userId: number = user.userId
        return this.postsService.updatePosts(userId, pid, dto)
    }
    //Delete post
    @Delete(':pid')
    deletePost(@User() user, @Param('pid', ParseIntPipe) pid: number) {
        const id: number = user.userId
        return this.postsService.deletePost(id, pid)
     }
    
}   
