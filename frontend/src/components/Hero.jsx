import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="
    relative
    min-h-[calc(100vh-80px)]
    flex
    items-center
    overflow-hidden
    bg-black
    pt-10
"
    >
      {/* Background */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-black
          via-neutral-900
          to-neutral-800
        "
      />

      {/* Decorative Blur */}

      <div
        className="
          absolute
          -top-40
          -right-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/5
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          -bottom-48
          -left-24
          h-[420px]
          w-[420px]
          rounded-full
          bg-white/5
          blur-[130px]
        "
      />

      {/* Grid Pattern */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Content */}

      <div className="relative mx-auto w-[95%] max-w-7xl">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-xl">
            {/* Badge */}
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.35em] text-neutral-300 backdrop-blur">
              New Collection • 2026
            </span>

            {/* Heading */}

            <h1
              className="
              mt-8
              text-5xl
              sm:text-6xl
              lg:text-6xl
              font-black
              leading-[0.95]
              tracking-tight
              text-white
            "
            >
              Wear Your
              <br />
              <span className="text-neutral-300">Style</span> With
              <br />
              Confidence
            </h1>

            {/* Description */}

            <p
              className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-neutral-400
            "
            >
              Discover premium fashion designed for confidence, comfort, and
              everyday sophistication. Timeless essentials crafted to elevate
              every wardrobe.
            </p>

            {/* Buttons */}

            <div
              className="
              mt-8
              flex
              flex-wrap
              gap-5
            "
            >
              <Link
                to="/products"
                className="
                group
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-white
                px-8
                py-4
                text-black
                font-semibold
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
              "
              >
                Shop Now
                <span
                  className="
                  ml-3
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                >
                  →
                </span>
              </Link>

              <Link
                to="/products"
                className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/5
                px-8
                py-4
                text-white
                backdrop-blur
                transition-all
                duration-300
                hover:bg-white
                hover:text-black
                hover:-translate-y-1
              "
              >
                Explore Collection
              </Link>
            </div>
            {/* Bottom Stats */}

            <div
              className="
              mt-12
              grid
              grid-cols-3
              gap-8
              max-w-xl
              text-white
            "
            >
              <div>
                <h3 className="text-3xl font-bold">500+</h3>

                <p className="mt-1 text-sm text-neutral-400 uppercase tracking-wider">
                  Premium Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">50K+</h3>

                <p className="mt-1 text-sm text-neutral-400 uppercase tracking-wider">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">4.9★</h3>

                <p className="mt-1 text-sm text-neutral-400 uppercase tracking-wider">
                  Customer Rating
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-6 hidden lg:flex items-center justify-end">
            <div className="relative h-[620px] w-full max-w-[500px] overflow-hidden rounded-[32px]">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                alt="Fashion Model"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-300">
                  Premium Collection
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Crafted For Modern Fashion
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
