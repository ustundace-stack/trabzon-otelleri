import { BlogPost } from '../../../core/domain/entities/blog-post.entity';
import { IBlogPostRepository } from '../../../core/application/repositories/blog-post.repository.interface';
import { prisma } from '../../../lib/prisma';

export class PrismaBlogPostRepository implements IBlogPostRepository {
  async findAll(): Promise<BlogPost[]> {
    const posts = await prisma.blogPost.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map(this.mapToEntity);
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        content: true,
      },
    });

    if (!post) return null;
    return this.mapToEntity(post);
  }

  private mapToEntity(dbPost: any): BlogPost {
    return {
      id: dbPost.id,
      title: dbPost.title,
      slug: dbPost.slug,
      excerpt: dbPost.excerpt,
      category: dbPost.category,
      image: dbPost.image,
      date: dbPost.date,
      readTime: dbPost.readTime,
      content: dbPost.content.map((c: any) => ({
        heading: c.heading,
        text: c.text,
      })),
    };
  }
}
