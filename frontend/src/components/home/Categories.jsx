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
    <section className="bg-white h-[703px]">
      <div className="mx-auto w-full] px-[76px]">
        {/* Heading */}

        <div className="flex">
          <div className="w-26"></div>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-neutral-800 md:text-5xl">
              Explore Collections
            </h2>

            <p className="mt-3 text-lg text-neutral-500">
              Discover collections designed for every style.
            </p>
          </div>
        </div>
        <div className="h-4"></div>

        {/* Categories */}

        <div className="flex justify-center gap-14">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="
              group
              relative
              w-[628px]
              h-[600px]
              overflow-hidden
              rounded-[24px]
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
                  bottom-8
                  left-8
                  z-10
                  text-white
                "
              >
                <h3
                  className="
                    text-4xl
                    font-extrabold
                    uppercase
                    md:text-5xl
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
                    text-base
                    font-medium
                    transition-all
                    duration-300
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
