function Newsletter() {
  return (
    <section
      className="
      bg-black
      text-white
      py-16
      text-center
      "
    >
      <h2 className="text-3xl mb-3">Stay Updated</h2>

      <p className="mb-5">Get updates on new arrivals.</p>

      <input
        placeholder="Email"
        className="
        p-3
        text-black
        w-72
        "
      />
    </section>
  );
}

export default Newsletter;
