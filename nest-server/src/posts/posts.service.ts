import { AppLogger } from './../logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Comment } from './comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly logger: AppLogger,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    sort: 'newest' | 'comments' = 'newest'
  ): Promise<{ posts: Post[]; total: number }> {
    try {
      this.logger.debug('Fetching posts with filters', 'PostsService');

      const query = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.comments', 'comment')
        .take(limit)
        .skip((page - 1) * limit);

      if (search) {
        query.where(
          '(post.title ILIKE :search OR post.content ILIKE :search)',
          { search: `%${search}%` }
        );
      }

      if (sort === 'comments') {
        query
          .addSelect((subQuery) => {
            return subQuery
              .select('COUNT(c.id)', 'commentcount')
              .from(Comment, 'c')
              .where('c.postId = post.id');
          }, 'commentcount')
          .orderBy('commentcount', 'DESC');
      } else {
        query.orderBy('post.createdAt', 'DESC');
      }

      const [posts, total] = await query.getManyAndCount();
      
      return { posts, total };
    } catch (error) {
      this.logger.error(`Failed to fetch posts: ${error.message}`, error.stack, 'PostsService');
      throw error;
    }
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['comments']
    });
  
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  
    return post;
  }
  
  async create(postData: CreatePostDto): Promise<Post> {
    try {
      this.logger.log('Creating new post', 'PostsService');
      const post = this.postsRepository.create(postData);
      return await this.postsRepository.save(post);
    } catch (error) {
      this.logger.error(`Failed to create post: ${error.message}`, error.stack, 'PostsService');
      throw error;
    }
  }

  async update(id: number, postData: UpdatePostDto): Promise<Post> {
    try {
      const result = await this.postsRepository.update(id, postData);
  
      if (result.affected === 0) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
  
      const updatedPost = await this.postsRepository.findOne({
        where: { id },
        relations: ['comments']
      });
  
      if (!updatedPost) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
  
      return updatedPost;
    } catch (error) {
      this.logger.error(`Update failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.postsRepository.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Delete failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}