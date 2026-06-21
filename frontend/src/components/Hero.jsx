import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="
      h-[80vh]
      flex
      items-center
      justify-center
      text-center
      bg-gray-100
      "
    >
      <div>
        <h1
          className="
          text-5xl
          md:text-7xl
          font-bold
          mb-5
          "
        >
          Wear Your Style
        </h1>

        <p
          className="
          text-gray-600
          text-lg
          mb-6
          "
        >
          Discover premium fashion for every occasion.
        </p>

        <Link
          to="/products"
          className="
          bg-black
          text-white
          px-8
          py-4
          rounded
          "
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export default Hero;
