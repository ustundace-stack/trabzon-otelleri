// Yeniden kullanılabilir sayfa başlığı bileşeni — Presentation Layer
// Tüm iç sayfalarda tutarlı başlık bloğu sağlar.

import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description?: string;
  children?: ReactNode;
  badge?: ReactNode;
}

export default function PageHero({ title, description, children, badge }: PageHeroProps) {
  return (
    <div className="bg-primary text-primary-foreground py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {badge && <div className="mb-4 flex justify-center">{badge}</div>}
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
