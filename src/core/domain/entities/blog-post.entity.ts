// Blog yazısı domain varlığı — Clean Architecture Domain Layer

export interface BlogPostSection {
  heading: string;
  text: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  content: BlogPostSection[];
}
