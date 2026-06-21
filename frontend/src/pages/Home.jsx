import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <>
      <Hero />

      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        "
      >
        <Categories />

        <FeaturedProducts />

        <WhyChooseUs />
      </div>

      <Newsletter />
    </>
  );
}

export default Home;