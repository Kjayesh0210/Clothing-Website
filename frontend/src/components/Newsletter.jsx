function Newsletter() {
  return (
    <section className="flex min-h-[320px] w-full items-center justify-center bg-[#F8F8F8]">
      <div className="px-[80px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[44px] font-black uppercase tracking-tight text-black">
            Stay Updated
          </h2>

          <p className="mt-5 text-lg leading-8 text-neutral-500">
            Be the first to know about new arrivals, exclusive collections, and
            special offers delivered straight to your inbox.
          </p>
          <div className="flex">
            <div className="w-22"></div>
            <form className="mx-auto mt-12 flex w-150 flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                h-14
                flex-1
                rounded-full
                border
                border-neutral-300
                bg-white
                px-6
                text-base
                outline-none
                transition
                focus:border-black
              "
              />

              <button
                type="submit"
                className="
                h-14
                w-30
                rounded-full
                bg-black
                px-8
                font-semibold
                text-white
                transition
                hover:bg-neutral-800
              "
              >
                Subscribe
              </button>
            </form>
          </div>
          <p className="mt-5 text-sm text-neutral-400">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
