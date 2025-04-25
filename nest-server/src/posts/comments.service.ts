import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(postId: number, commentData: Partial<Comment>): Promise<Comment> {
    const comment = this.commentsRepository.create({
      ...commentData,
      post: { id: postId }
    });
    return this.commentsRepository.save(comment);
  }
}