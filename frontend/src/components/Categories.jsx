import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Men",
      description: "Trendy styles for every occasion",
      link: "/products?gender=Male",
      image:
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      position: "center 18%",
    },
    {
      name: "Women",
      description: "Fashion that defines confidence",
      link: "/products?gender=Female",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      position: "center 30%",
    },
  ];

  return (
    <section className="relative py-20 bg-white">
      {/* Section Heading */}
      <div className="mx-auto w-[95%] max-w-7xl">
        <div className="mb-16 text-center">
          <span
            className="
            inline-block
            text-xs
            uppercase
            tracking-[0.35em]
            text-neutral-500
            mb-4
          "
          >
            Curated Collections
          </span>

          <h2
            className="
            text-4xl
            md:text-4xl md:text-5xl
            font-black
            tracking-tight
            text-neutral-900
          "
          >
            Shop By Category
          </h2>

          <p
            className="
              mt-5
              max-w-3xl
              mx-auto
              text-lg
              leading-8
              text-neutral-500
            "
          >
            Explore carefully curated collections crafted for every style,
            season, and occasion.
          </p>
        </div>

        {/* Categories */}

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="
              group
              relative
              aspect-[4/5]
              w-full
              overflow-hidden
              rounded-[32px]
              bg-black
              shadow-xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-2xl
              "
            >
              {/* Image */}

              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                style={{
                  objectPosition: category.position,
                }}
                className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
              />

              {/* Gradient */}

              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/20
                to-transparent
              "
              />

              {/* Decorative Overlay */}

              <div
                className="
                absolute
                inset-0
                bg-black/20
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
              "
              />

              {/* Content */}

              <div
                className="
                absolute
                inset-0
                flex
                flex-col
                justify-end
                p-8 md:p-10
                text-white
              "
              >
                <span
                  className="
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-neutral-300
                  mb-4
                "
                >
                  Premium Collection
                </span>

                <h3
                  className="
                  text-4xl md:text-5xl
                  font-black
                  tracking-tight
                  mb-4
                "
                >
                  {category.name}
                </h3>

                <p
                  className="
                  max-w-sm
                  text-neutral-300
                  leading-7
                  mb-8
                "
                >
                  {category.description}
                </p>

                <div
                  className="
                  flex
                  items-center
                  gap-4
                "
                >
                  <span
                    className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-white
                    text-black
                    px-7
                    py-3
                    font-semibold
                    transition-all
                    duration-300
                    group-hover:scale-105
                  "
                  >
                    Explore
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
                  </span>

                  <span
                    className="
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-neutral-300
                  "
                  >
                    View Collection
                  </span>
                </div>
              </div>

              {/* Border */}

              <div
                className="
                absolute
                inset-0
                rounded-3xl
                ring-1
                ring-white/10
              "
              />
            </Link>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link
            to="/products"
            className="rounded-full border border-neutral-300 px-8 py-4 font-semibold transition hover:border-black hover:bg-black hover:text-white"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categories;
