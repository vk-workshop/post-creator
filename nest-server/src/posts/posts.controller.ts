import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('api/posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService, 
    private readonly commentsService: CommentsService 
  ) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('sort') sort: 'newest' | 'comments'
  ): Promise<{ posts: PostEntity[]; total: number }> {
    return this.postsService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      search,
      sort
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postsService.findOne(+id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<PostEntity> {
    try {
      return await this.postsService.update(+id, updatePostDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update post',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.postsService.remove(+id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete post',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body() commentData: CreateCommentDto
  ) {
    const comment = await this.commentsService.create(+id, commentData);
    const post = await this.postsService.findOne(+id);
    return { post, comment };
  }
}