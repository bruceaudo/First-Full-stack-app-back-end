import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PostsModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), UsersModule
],
})
export class AppModule {}
