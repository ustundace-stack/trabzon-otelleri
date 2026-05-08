// Slug'a göre blog yazısı bulan kullanım senaryosu
import { BlogPost } from '../../../domain/entities/blog-post.entity';
import { IBlogPostRepository } from '../../repositories/blog-post.repository.interface';

export class GetBlogPostBySlugUseCase {
  constructor(private blogPostRepository: IBlogPostRepository) {}

  async execute(slug: string): Promise<BlogPost | null> {
    return this.blogPostRepository.findBySlug(slug);
  }
}
