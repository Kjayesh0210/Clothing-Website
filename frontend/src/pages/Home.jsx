import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";

function Home() {
  return (
    <main className="overflow-x-hidden">
      <section className="pb-10 md:pb-14 lg:pb-16">
        <Hero />
      </section>

      <section className="pb-10 md:pb-14 lg:pb-16">
        <Categories />
      </section>

      <section className="pb-10 md:pb-14 lg:pb-16">
        <FeaturedProducts />
      </section>

      <section className="bg-[#F8F8F8] pb-10 md:pb-14 lg:pb-16">
        <WhyChooseUs />
      </section>

      <Newsletter />
    </main>
  );
}

export default Home;
