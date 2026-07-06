import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MEN from "../../assets/photos/MEN.png";
import WOMEN from "../../assets/photos/WOMEN.png";
function Categories() {
  const categories = [
    {
      name: "Men",
      description: "Trendy styles for every occasion",
      link: "/products?gender=Male",
      image: MEN,
      position: "center 18%",
    },
    {
      name: "Women",
      description: "Fashion that defines confidence",
      link: "/products?gender=Female",
      image: WOMEN,
      position: "center 30%",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-[76px]">
        {/* Heading */}

        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-800 sm:text-4xl lg:text-5xl">
            Explore Collections
          </h2>

          <p className="mt-3 text-base text-neutral-500 sm:text-lg">
            Discover collections designed for every style.
          </p>
        </div>

        <div className="h-10 lg:h-12" />

        {/* Categories */}

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-14">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="
              group
              relative
              w-full
              max-w-[628px]
              h-[420px]
              overflow-hidden
              rounded-[24px]
              sm:h-[500px]
              lg:h-[600px]
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
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
              />

              {/* Gradient */}

              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                via-black/10
                to-transparent
              "
              />

              {/* Content */}

              <div
                className="
                absolute
                bottom-6
                left-6
                z-10
                text-white
                sm:bottom-8
                sm:left-8
              "
              >
                <h3
                  className="
                  text-3xl
                  font-extrabold
                  uppercase
                  sm:text-4xl
                  lg:text-5xl
                "
                >
                  {category.name}
                </h3>

                <div
                  className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  sm:text-base
                "
                >
                  <span>Explore Collection</span>

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
