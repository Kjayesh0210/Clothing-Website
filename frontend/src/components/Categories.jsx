import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Men",
      description: "Trendy styles for every occasion",
      link: "/products?gender=Male",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    },
    {
      name: "Women",
      description: "Fashion that defines confidence",
      link: "/products?gender=Female",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Shop By Category</h2>

        <p className="text-gray-500 mt-3">
          Discover collections tailored for your style
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="
            group
            relative
            h-[420px]
            overflow-hidden
            rounded-2xl
            "
          >
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              decoding="async"
              className="
              w-full
              h-full
              object-cover
              transition
              duration-700
              group-hover:scale-110
              "
            />

            <div
              className="
              absolute
              inset-0
              bg-black/40
              group-hover:bg-black/50
              transition
              "
            />

            <div
              className="
              absolute
              inset-0
              flex
              flex-col
              justify-end
              p-8
              text-white
              "
            >
              <h3
                className="
                text-4xl
                font-bold
                mb-2
                "
              >
                {category.name}
              </h3>

              <p className="text-gray-200 mb-4">{category.description}</p>

              <span
                className="
                inline-block
                w-fit
                border
                border-white
                px-5
                py-2
                rounded-lg
                group-hover:bg-white
                group-hover:text-black
                transition
                "
              >
                Explore Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
