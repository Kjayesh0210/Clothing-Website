function Categories() {
  const categories = ["Men", "Women", "Oversized", "Accessories"];

  return (
    <section className="py-16">
      <h2
        className="
        text-4xl
        font-bold
        text-center
        mb-10
        "
      >
        Shop By Category
      </h2>

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-5
        "
      >
        {categories.map((category) => (
          <div
            key={category}
            className="
              border
              p-10
              text-center
              rounded
              hover:shadow-lg
              cursor-pointer
              "
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
