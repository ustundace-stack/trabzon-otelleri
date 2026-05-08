// Blog yazısı repository soyut arayüzü — Application Layer (Dependency Inversion)

import { BlogPost } from '../../domain/entities/blog-post.entity';

export interface IBlogPostRepository {
  findAll(): Promise<BlogPost[]>;
  findBySlug(slug: string): Promise<BlogPost | null>;
}
