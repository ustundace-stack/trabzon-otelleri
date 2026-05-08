import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/shared/PageHero";
import { Metadata } from "next";
import { PrismaBlogPostRepository } from "@/infrastructure/data/repositories/prisma-blog-post.repository";
import { GetAllBlogPostsUseCase } from "@/core/application/use-cases/blog/get-all-blog-posts.use-case";

export const metadata: Metadata = {
  title: "Trabzon Gezi Rehberi | Blog | Trabzon Otelleri",
  description: "Trabzon'da gezilecek yerler, yöresel lezzetler ve seyahat ipuçları hakkında en güncel yazılar.",
};

export default async function BlogPage() {
  // Use Case katmanı üzerinden blog yazılarını çek
  const blogRepo = new PrismaBlogPostRepository();
  const blogPosts = await new GetAllBlogPostsUseCase(blogRepo).execute();

  return (
    <div className="bg-background min-h-screen pb-20">
      <PageHero
        title="Gezi Rehberi & Blog"
        description="Trabzon seyahatiniz öncesinde bilmeniz gereken her şey, ipuçları ve yöresel rehberler."
      />

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                <CardHeader className="p-0 relative h-60 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-primary border-none shadow-md">
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="text-primary font-semibold group-hover:text-accent transition-colors mt-auto flex items-center gap-2">
                    Devamını Oku →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
