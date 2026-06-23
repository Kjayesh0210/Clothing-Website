import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />

      <main
        className="
        max-w-7xl
        mx-auto
        px-4
        md:px-6
        lg:px-8
        "
      >
        <section className="py-12">
          <Categories />
        </section>

        <section className="py-12">
          <FeaturedProducts />
        </section>

        <section className="py-12">
          <WhyChooseUs />
        </section>
      </main>

      <section className="mt-10">
        <Newsletter />
      </section>
    </div>
  );
}

export default Home;
