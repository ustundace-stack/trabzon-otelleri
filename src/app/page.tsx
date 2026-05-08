import HeroSection from "@/components/home/HeroSection";
import FeaturedHotels from "@/components/home/FeaturedHotels";
import Categories from "@/components/home/Categories";
import TrabzonInfo from "@/components/home/TrabzonInfo";
import Testimonials from "@/components/home/Testimonials";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <Categories />
      <FeaturedHotels />
      <Testimonials />
      <TrabzonInfo />
      <NewsletterCTA />
    </div>
  );
}
