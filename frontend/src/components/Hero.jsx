import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="
      relative
      h-[85vh]
      flex
      items-center
      "
    >
      <div
        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-black
        via-gray-900
        to-gray-800
        "
      />

      <div
        className="
        relative
        max-w-7xl
        mx-auto
        px-6
        w-full
        "
      >
        <div className="max-w-2xl text-white">
          <p
            className="
            uppercase
            tracking-[4px]
            text-sm
            text-gray-300
            mb-4
            "
          >
            New Collection 2026
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            mb-6
            "
          >
            Wear Your
            <br />
            Style With Confidence
          </h1>

          <p
            className="
            text-lg
            text-gray-300
            mb-8
            max-w-lg
            "
          >
            Discover premium fashion designed for comfort, confidence and
            everyday style.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to="/products"
              className="
              bg-white
              text-black
              px-8
              py-4
              rounded-lg
              font-semibold
              hover:bg-gray-200
              transition
              "
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="
              border
              border-white
              px-8
              py-4
              rounded-lg
              hover:bg-white
              hover:text-black
              transition
              "
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
