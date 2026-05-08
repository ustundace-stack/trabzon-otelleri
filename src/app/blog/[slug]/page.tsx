import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { PrismaBlogPostRepository } from "@/infrastructure/data/repositories/prisma-blog-post.repository";
import { GetBlogPostBySlugUseCase } from "@/core/application/use-cases/blog/get-blog-post-by-slug.use-case";

// Tekil Use Case instance'ı — module-level singleton
const getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(new PrismaBlogPostRepository());

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugUseCase.execute(slug);
  if (!post) return { title: "Yazı Bulunamadı | Trabzon Otelleri Blog" };
  return {
    title: `${post.title} | Trabzon Otelleri Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlugUseCase.execute(slug);

  if (!post) notFound();

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Görsel */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <Badge className="bg-accent text-primary border-none mb-4 text-sm font-semibold px-4 py-1">
            {post.category}
          </Badge>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 mt-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        {/* Geri Dön */}
        <Link
          href="/blog"
          className={buttonVariants({ variant: "outline", className: "mb-10 flex items-center gap-2 w-fit" })}
        >
          <ChevronLeft className="w-4 h-4" />
          Tüm Yazılar
        </Link>

        {/* Makale İçeriği */}
        <article className="prose prose-lg max-w-none">
          {post.content.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {section.text}
              </p>
            </div>
          ))}
        </article>

        {/* İlgili Yazılar Bağlantısı */}
        <div className="mt-16 pt-10 border-t border-border/50">
          <h3 className="font-heading text-xl font-bold mb-4">Diğer Yazılar</h3>
          <Link
            href="/blog"
            className={buttonVariants({ className: "bg-primary hover:bg-primary/90" })}
          >
            Tüm Blog Yazılarını Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
