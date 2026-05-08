// Tüm blog yazılarını getiren kullanım senaryosu
import { BlogPost } from '../../../domain/entities/blog-post.entity';
import { IBlogPostRepository } from '../../repositories/blog-post.repository.interface';

export class GetAllBlogPostsUseCase {
  constructor(private blogPostRepository: IBlogPostRepository) {}

  async execute(): Promise<BlogPost[]> {
    return this.blogPostRepository.findAll();
  }
}
