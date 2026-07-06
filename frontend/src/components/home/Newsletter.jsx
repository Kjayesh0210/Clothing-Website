function Newsletter() {
  return (
    <section className="flex min-h-[320px] w-full items-center justify-center bg-[#F8F8F8]">
      <div className="w-full px-5 sm:px-8 lg:px-[80px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl lg:text-[44px]">
            Stay Updated
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
            Be the first to know about new arrivals, exclusive collections, and
            special offers delivered straight to your inbox.
          </p>

          <form className="mx-auto mt-10 flex w-full max-w-[600px] flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="
              h-16
              sm:h-16
              w-full
              rounded-full
              border
              border-neutral-300
              bg-white
              px-7
              text-[16px]
              leading-none
              outline-none
              transition
              focus:border-black
            "
            />
            <button
              type="submit"
              className="
              h-14
              w-full
              rounded-full
              bg-black
              px-8
              font-semibold
              text-white
              transition
              hover:bg-neutral-800
              sm:w-auto
            "
            >
              Subscribe
            </button>
          </form>

          <p className="mt-5 text-sm text-neutral-400">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
