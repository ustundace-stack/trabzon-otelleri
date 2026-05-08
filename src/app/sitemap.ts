import { MetadataRoute } from 'next';
import { hotelRepository, blogPostRepository } from '@/lib/repository-factory';
import { GetAllHotelsUseCase } from '@/core/application/use-cases/hotel/get-all-hotels.use-case';
import { GetAllBlogPostsUseCase } from '@/core/application/use-cases/blog/get-all-blog-posts.use-case';

// Dinamik sitemap — Use Case katmanından beslenir
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.trabzonotelleri.com';

  const hotels = await new GetAllHotelsUseCase(hotelRepository).execute();
  const blogPosts = await new GetAllBlogPostsUseCase(blogPostRepository).execute();

  const hotelUrls = hotels.map((hotel) => ({
    url: `${baseUrl}/oteller/${hotel.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/oteller`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/oteller/termal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/sss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...hotelUrls,
    ...blogUrls,
  ];
}
