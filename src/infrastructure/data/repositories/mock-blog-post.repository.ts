// Mock blog yazısı repository implementasyonu — Infrastructure Data Layer
// IBlogPostRepository arayüzünü uygular; veriyi mock datadan sağlar.

import { BlogPost } from '../../../core/domain/entities/blog-post.entity';
import { IBlogPostRepository } from '../../../core/application/repositories/blog-post.repository.interface';
import { blogPostsData } from '../mock/blog-posts-data';

export class MockBlogPostRepository implements IBlogPostRepository {
  async findAll(): Promise<BlogPost[]> {
    return blogPostsData;
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    return blogPostsData.find((p) => p.slug === slug) ?? null;
  }
}
