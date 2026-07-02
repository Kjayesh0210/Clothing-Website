import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";

function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div className="h-16"></div>
      <Categories />
      <div className="h-16"></div>
      <FeaturedProducts />
      <div className="h-16"></div>
      <WhyChooseUs />
      <div className="bg-[#F8F8F8] h-16"></div>
      <Newsletter />
    </main>
  );
}

export default Home;
